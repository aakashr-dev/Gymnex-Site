import { Attendance } from '../models/Attendance.js';
import { Member } from '../models/Member.js';
import { Trainer } from '../models/Trainer.js';
import { LeaveRequest } from '../models/LeaveRequest.js';
import { Notification } from '../models/Notification.js';
import { APIFeatures } from '../utils/apiFeatures.js';
import { sendSuccess, sendError, sendPaginated } from '../utils/apiResponse.js';

export const getAllAttendance = async (req, res) => {
  try {
    const totalDocs = await Attendance.countDocuments();
    const features = new APIFeatures(Attendance.find().populate('member branch'), req.query)
      .filter()
      .sort('-checkIn')
      .limitFields()
      .paginate();

    const logs = await features.query;
    return sendPaginated(res, 'Attendance logs fetched successfully.', logs, req.query.page || 1, req.query.limit || 50, totalDocs);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};

export const checkInMember = async (req, res) => {
  try {
    const { memberId, branchId } = req.body;
    const member = await Member.findById(memberId);
    if (!member) return sendError(res, 'Member not found.', 404);

    const log = await Attendance.create({
      member: member._id,
      branch: branchId || member.branch,
      date: new Date().toISOString().split('T')[0],
      checkIn: new Date()
    });

    member.attendance = (member.attendance || 0) + 1;
    member.visitStreak = (member.visitStreak || 0) + 1;
    await member.save();

    return sendSuccess(res, 'Member check-in logged successfully.', log, 201);
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

export const getTodayTrainerAttendance = async (req, res) => {
  try {
    const trainers = await Trainer.find().populate('branch');
    const todayStr = new Date().toISOString().split('T')[0];

    const leaveRequests = await LeaveRequest.find({
      status: 'Approved',
      startDate: { $lte: todayStr },
      endDate: { $gte: todayStr }
    });

    const leaveTrainerIds = new Set(leaveRequests.map(l => l.trainer.toString()));

    const result = trainers.map((t) => {
      const isOnLeave = leaveTrainerIds.has(t._id.toString()) || t.availabilityStatus === 'On Leave' || t.status === 'On Leave';
      let status = 'Present';
      if (isOnLeave) {
        status = 'On Leave';
      } else if (t.availabilityStatus === 'Busy') {
        status = 'In Session';
      }
      return {
        _id: t._id,
        trainerId: t.trainerId,
        name: t.name,
        specialization: t.specialization,
        branch: t.branch,
        status,
        checkInTime: status === 'Present' || status === 'In Session' ? '06:00 AM' : 'N/A',
        rating: t.rating
      };
    });

    const summary = {
      total: trainers.length,
      present: result.filter(r => r.status === 'Present' || r.status === 'In Session').length,
      absent: result.filter(r => r.status === 'Absent').length,
      onLeave: result.filter(r => r.status === 'On Leave').length
    };

    return sendSuccess(res, "Today's trainer attendance fetched successfully.", { summary, trainers: result });
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};

export const getLeaveRequests = async (req, res) => {
  try {
    const requests = await LeaveRequest.find().populate('trainer reviewedBy').sort('-createdAt');
    return sendSuccess(res, 'Leave requests fetched successfully.', requests);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};

export const submitLeaveRequest = async (req, res) => {
  try {
    const { trainerId, startDate, endDate, reason } = req.body;
    const trainer = await Trainer.findById(trainerId);
    if (!trainer) return sendError(res, 'Trainer not found.', 404);

    const leave = await LeaveRequest.create({
      trainer: trainer._id,
      trainerName: trainer.name,
      startDate,
      endDate,
      reason,
      status: 'Pending'
    });

    // Send notification to Admin
    await Notification.create({
      title: 'Trainer Leave Request',
      message: `Coach ${trainer.name} requested leave from ${startDate} to ${endDate}. Reason: ${reason}`,
      type: 'System'
    });

    return sendSuccess(res, 'Leave request submitted successfully.', leave, 201);
  } catch (err) {
    return sendError(res, err.message, 400);
  }
};

export const reviewLeaveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reviewNote } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return sendError(res, 'Status must be Approved or Rejected.', 400);
    }

    const leave = await LeaveRequest.findById(id).populate('trainer');
    if (!leave) return sendError(res, 'Leave request not found.', 404);

    leave.status = status;
    leave.reviewNote = reviewNote || '';
    leave.reviewedBy = req.user ? req.user._id : null;
    await leave.save();

    if (status === 'Approved' && leave.trainer) {
      await Trainer.findByIdAndUpdate(leave.trainer._id, {
        availabilityStatus: 'On Leave',
        status: 'On Leave'
      });
    }

    // Send notification to Trainer
    if (leave.trainer) {
      await Notification.create({
        title: `Leave Request ${status}`,
        message: `Your leave request for ${leave.startDate} to ${leave.endDate} has been ${status.toLowerCase()}.${reviewNote ? ` Note: ${reviewNote}` : ''}`,
        receiver: leave.trainer.user || null,
        type: 'System'
      });
    }

    return sendSuccess(res, `Leave request ${status.toLowerCase()} successfully.`, leave);
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};

export const getMonthlyAttendanceSummary = async (req, res) => {
  try {
    const totalMemberCheckins = await Attendance.countDocuments();
    const activeMembers = await Member.countDocuments({ status: 'Active' });
    const pendingLeaves = await LeaveRequest.countDocuments({ status: 'Pending' });

    return sendSuccess(res, 'Monthly summary fetched successfully.', {
      totalMemberCheckins,
      activeMembers,
      averageDailyCheckins: Math.round(totalMemberCheckins / 30) || 45,
      trainerAttendanceRate: 96.5,
      pendingLeaveRequests: pendingLeaves
    });
  } catch (err) {
    return sendError(res, err.message, 500);
  }
};
