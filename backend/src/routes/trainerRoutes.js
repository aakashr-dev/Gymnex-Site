import express from 'express';
import {
  getAllTrainers,
  getTrainerById,
  createTrainer,
  updateTrainer,
  deleteTrainer,
  getTrainerMembers
} from '../controllers/trainerController.js';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllTrainers);
router.get('/:id', getTrainerById);
router.get('/:id/members', verifyToken, getTrainerMembers);
router.post('/', verifyToken, authorizeRoles('Admin'), createTrainer);
router.put('/:id', verifyToken, authorizeRoles('Admin'), updateTrainer);
router.delete('/:id', verifyToken, authorizeRoles('Admin'), deleteTrainer);

export default router;
