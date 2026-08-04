import { Equipment } from '../models/Equipment.js';
import { Notification } from '../models/Notification.js';
import { APIFeatures } from '../utils/apiFeatures.js';
import { sendSuccess, sendError, sendPaginated } from '../utils/apiResponse.js';

export const getAllEquipment = async (req, res) => {
  try {
    const totalDocs = await Equipment.countDocuments();
    const features = new APIFeatures(Equipment.find().populate('branch'), req.query)
      .filter()
      .search(['name', 'category', 'status', 'equipmentId'])
      .sort()
      .limitFields()
      .paginate();

    const equipment = await features.query;

    const operationalCount = await Equipment.countDocuments({ status: 'Operational' });
    const underMaintenanceCount = await Equipment.countDocuments({
      status: { $in: ['Under Maintenance', 'Schedule Maintenance'] }
    });
    const outOfServiceCount = await Equipment.countDocuments({ status: 'Out of Service' });
    const healthIndex = totalDocs > 0 ? Math.round((operationalCount / totalDocs) * 100) : 100;

    return sendPaginated(res, 'Equipment roster fetched successfully.', equipment, req.query.page || 1, req.query.limit || 50, totalDocs, {
      summary: {
        total: totalDocs,
        operational: operationalCount,
        underMaintenance: underMaintenanceCount,
        outOfService: outOfServiceCount,
        healthIndex
      }
    });
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};

export const createEquipment = async (req, res) => {
  try {
    const item = await Equipment.create({ equipmentId: `EQ-${Date.now()}`, ...req.body });
    return sendSuccess(res, 'Equipment item created successfully.', item, 201);
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

export const reportEquipmentIssue = async (req, res) => {
  try {
    const { equipmentId, issueReported, reportedBy } = req.body;
    const item = await Equipment.findById(equipmentId);
    if (!item) return sendError(res, 'Equipment item not found.', 404);

    item.status = 'Schedule Maintenance';
    item.issueReported = issueReported;
    item.reportedBy = reportedBy || 'Gym Staff';
    await item.save();

    // Create Notification for Admin
    await Notification.create({
      title: 'Equipment Maintenance Request',
      message: `Maintenance requested for ${item.name} (${item.equipmentId}). Reported: "${issueReported}"`,
      type: 'System'
    });

    return sendSuccess(res, 'Equipment issue reported successfully.', item);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};

export const updateEquipmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Operational', 'Under Maintenance', 'Out of Service', 'Schedule Maintenance', 'Maintenance Completed'];
    if (!validStatuses.includes(status)) {
      return sendError(res, 'Invalid equipment status.', 400);
    }

    const updateObj = { status };
    if (status === 'Operational' || status === 'Maintenance Completed') {
      updateObj.status = 'Operational';
      updateObj.lastMaintenanceDate = new Date().toISOString().split('T')[0];
      updateObj.issueReported = '';
    }

    const item = await Equipment.findByIdAndUpdate(req.params.id, updateObj, { new: true });
    if (!item) return sendError(res, 'Equipment item not found.', 404);

    return sendSuccess(res, `Equipment status updated to ${item.status}.`, item);
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

export const updateEquipment = async (req, res) => {
  try {
    const item = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return sendError(res, 'Equipment item not found.', 404);
    return sendSuccess(res, 'Equipment item updated successfully.', item);
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

export const deleteEquipment = async (req, res) => {
  try {
    const item = await Equipment.findByIdAndDelete(req.params.id);
    if (!item) return sendError(res, 'Equipment item not found.', 404);
    return sendSuccess(res, 'Equipment item deleted successfully.');
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};
