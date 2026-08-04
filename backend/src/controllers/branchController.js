import { Branch } from '../models/Branch.js';
import { APIFeatures } from '../utils/apiFeatures.js';
import { sendSuccess, sendError, sendPaginated } from '../utils/apiResponse.js';

export const getAllBranches = async (req, res) => {
  try {
    const totalDocs = await Branch.countDocuments();
    const features = new APIFeatures(Branch.find(), req.query)
      .filter()
      .search(['name', 'city', 'address', 'description'])
      .sort()
      .limitFields()
      .paginate();

    const branches = await features.query;
    return sendPaginated(res, 'Branches fetched successfully.', branches, req.query.page || 1, req.query.limit || 20, totalDocs);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};

export const getBranchById = async (req, res) => {
  try {
    const branch = await Branch.findOne({ $or: [{ _id: req.params.id }, { branchId: req.params.id }] });
    if (!branch) return sendError(res, 'Branch not found.', 404);
    return sendSuccess(res, 'Branch fetched successfully.', branch);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};

export const createBranch = async (req, res) => {
  try {
    const branch = await Branch.create({ branchId: `BR-${Date.now()}`, ...req.body });
    return sendSuccess(res, 'Branch created successfully.', branch, 201);
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

export const updateBranch = async (req, res) => {
  try {
    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!branch) return sendError(res, 'Branch not found.', 404);
    return sendSuccess(res, 'Branch updated successfully.', branch);
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

export const deleteBranch = async (req, res) => {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.id);
    if (!branch) return sendError(res, 'Branch not found.', 404);
    return sendSuccess(res, 'Branch deleted successfully.');
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};
