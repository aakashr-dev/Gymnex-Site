import express from 'express';
import {
  getAllMembers,
  getUnassignedMembers,
  getMemberById,
  getMyMemberProfile,
  createMember,
  assignTrainer,
  updateMemberStatus,
  updateMember,
  deleteMember
} from '../controllers/memberController.js';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', verifyToken, getMyMemberProfile);
router.get('/', verifyToken, authorizeRoles('Admin', 'Trainer'), getAllMembers);
router.get('/unassigned', verifyToken, authorizeRoles('Admin'), getUnassignedMembers);
router.get('/:id', verifyToken, getMemberById);
router.post('/', verifyToken, authorizeRoles('Admin'), createMember);
router.post('/:memberId/assign-trainer', verifyToken, authorizeRoles('Admin'), assignTrainer);
router.patch('/:id/status', verifyToken, authorizeRoles('Admin'), updateMemberStatus);
router.put('/:id', verifyToken, authorizeRoles('Admin'), updateMember);
router.delete('/:id', verifyToken, authorizeRoles('Admin'), deleteMember);

export default router;
