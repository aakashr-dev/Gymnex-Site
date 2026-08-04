import express from 'express';
import { getAllBranches, getBranchById, createBranch } from '../controllers/branchController.js';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllBranches);
router.get('/:id', getBranchById);
router.post('/', verifyToken, authorizeRoles('Admin'), createBranch);

export default router;
