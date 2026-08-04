import express from 'express';
import {
  getAllAttendance,
  checkInMember,
  getTodayTrainerAttendance,
  getLeaveRequests,
  submitLeaveRequest,
  reviewLeaveRequest,
  getMonthlyAttendanceSummary
} from '../controllers/attendanceController.js';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getAllAttendance);
router.post('/checkin', verifyToken, checkInMember);

// Trainer Attendance & Leave Routes
router.get('/trainers/today', verifyToken, authorizeRoles('Admin', 'Trainer'), getTodayTrainerAttendance);
router.get('/leave-requests', verifyToken, authorizeRoles('Admin', 'Trainer'), getLeaveRequests);
router.post('/leave-requests', verifyToken, submitLeaveRequest);
router.patch('/leave-requests/:id', verifyToken, authorizeRoles('Admin'), reviewLeaveRequest);
router.get('/summary', verifyToken, authorizeRoles('Admin'), getMonthlyAttendanceSummary);

export default router;
