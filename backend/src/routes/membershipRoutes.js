import express from 'express';
import {
  getAllMemberships,
  createMembership,
  updateMembership,
  toggleMembershipStatus,
  deleteMembership
} from '../controllers/membershipController.js';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllMemberships);
router.post('/', verifyToken, authorizeRoles('Admin'), createMembership);
router.put('/:id', verifyToken, authorizeRoles('Admin'), updateMembership);
router.patch('/:id/toggle-status', verifyToken, authorizeRoles('Admin'), toggleMembershipStatus);
router.delete('/:id', verifyToken, authorizeRoles('Admin'), deleteMembership);

export default router;
