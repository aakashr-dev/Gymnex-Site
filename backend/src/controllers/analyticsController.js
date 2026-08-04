import { Member } from '../models/Member.js';
import { Trainer } from '../models/Trainer.js';
import { Branch } from '../models/Branch.js';
import { Membership } from '../models/Membership.js';
import { Equipment } from '../models/Equipment.js';
import { Attendance } from '../models/Attendance.js';
import { LeaveRequest } from '../models/LeaveRequest.js';
import { Notification } from '../models/Notification.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export const getAnalyticsOverview = async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments();
    const totalTrainers = await Trainer.countDocuments();
    const totalBranches = await Branch.countDocuments();
    const activeMemberships = await Membership.countDocuments({ status: 'Active' });
    const equipmentCount = await Equipment.countDocuments();
    const operationalEquipment = await Equipment.countDocuments({ status: 'Operational' });

    const todayStr = new Date().toISOString().split('T')[0];
    const todayCheckIns = await Attendance.countDocuments({ date: todayStr });

    const monthlyRevenue = '$148,920';
    const equipmentHealth = equipmentCount > 0 ? `${Math.round((operationalEquipment / equipmentCount) * 100)}%` : '98%';

    return sendSuccess(res, 'Dashboard overview telemetry fetched successfully.', {
      totalMembers,
      totalTrainers,
      totalBranches,
      todayCheckIns,
      monthlyRevenue,
      activeMemberships,
      equipmentHealth,
      chartData: [
        { month: 'Jan', revenue: 98000, members: 840, attendance: 3200 },
        { month: 'Feb', revenue: 112000, members: 920, attendance: 3800 },
        { month: 'Mar', revenue: 125000, members: 1050, attendance: 4200 },
        { month: 'Apr', revenue: 134000, members: 1150, attendance: 4600 },
        { month: 'May', revenue: 142000, members: 1210, attendance: 4900 },
        { month: 'Jun', revenue: 148920, members: 1245, attendance: 5400 }
      ]
    });
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};

export const getAdminSummary = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // 1. Member Stats
    const totalMembers = await Member.countDocuments();
    const activeMembers = await Member.countDocuments({ status: 'Active' });
    const newRegistrations = await Member.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
    const expiringMemberships = await Member.countDocuments({ status: { $in: ['Expired', 'Frozen'] } });

    // 2. Trainer Stats
    const totalTrainers = await Trainer.countDocuments();
    const activeTrainers = await Trainer.countDocuments({ status: { $ne: 'Inactive' } });
    const availableTrainers = await Trainer.countDocuments({ availabilityStatus: 'Available' });
    const busyTrainers = await Trainer.countDocuments({ availabilityStatus: 'Busy' });
    const onLeaveTrainers = await Trainer.countDocuments({ availabilityStatus: 'On Leave' });

    // 3. Equipment Stats
    const totalEquipment = await Equipment.countDocuments();
    const operationalEquipment = await Equipment.countDocuments({ status: 'Operational' });
    const pendingMaintenance = await Equipment.countDocuments({ status: { $in: ['Schedule Maintenance', 'Under Maintenance'] } });
    const equipmentUnderService = await Equipment.countDocuments({ status: 'Under Maintenance' });
    const healthIndex = totalEquipment > 0 ? Math.round((operationalEquipment / totalEquipment) * 100) : 100;

    // 4. Membership Plan Stats
    const totalPlans = await Membership.countDocuments();
    const activePlans = await Membership.countDocuments({ status: 'Active' });
    const expiringOffers = await Membership.countDocuments({ isSeasonalOffer: true });

    // 5. Unassigned Members (Members Waiting For Trainer Assignment)
    const unassignedMembers = await Member.find({
      $or: [
        { assignmentStatus: 'Pending Assignment' },
        { personalTrainer: null },
        { assignedTrainer: null }
      ]
    })
      .populate('membership branch')
      .limit(10);

    // 6. Trainer Attendance & Leave Requests
    const leaveRequests = await LeaveRequest.find({ status: 'Pending' }).populate('trainer').sort('-createdAt');
    const recentLeaves = await LeaveRequest.find().populate('trainer').sort('-createdAt').limit(5);

    // 7. Recent Maintenance Requests
    const maintenanceRequests = await Equipment.find({
      status: { $in: ['Schedule Maintenance', 'Under Maintenance', 'Out of Service'] }
    }).populate('branch').limit(10);

    // 8. Notifications
    const notifications = await Notification.find().sort('-createdAt').limit(10);

    return sendSuccess(res, 'Admin Operations Dashboard summary fetched successfully.', {
      stats: {
        members: {
          total: totalMembers,
          active: activeMembers,
          newRegistrations,
          expiring: expiringMemberships
        },
        trainers: {
          total: totalTrainers,
          active: activeTrainers,
          available: availableTrainers,
          busy: busyTrainers,
          onLeave: onLeaveTrainers
        },
        equipment: {
          healthIndex,
          total: totalEquipment,
          operational: operationalEquipment,
          pendingMaintenance,
          underService: equipmentUnderService
        },
        memberships: {
          total: totalPlans,
          active: activePlans,
          seasonalOffers: expiringOffers
        }
      },
      unassignedMembers,
      pendingLeaveRequests: leaveRequests,
      recentLeaves,
      maintenanceRequests,
      notifications
    });
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};
