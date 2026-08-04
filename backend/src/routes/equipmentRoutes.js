import express from 'express';
import {
  getAllEquipment,
  createEquipment,
  reportEquipmentIssue,
  updateEquipmentStatus,
  updateEquipment,
  deleteEquipment
} from '../controllers/equipmentController.js';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getAllEquipment);
router.post('/', verifyToken, authorizeRoles('Admin'), createEquipment);
router.post('/report-issue', verifyToken, reportEquipmentIssue);
router.patch('/:id/status', verifyToken, authorizeRoles('Admin'), updateEquipmentStatus);
router.put('/:id', verifyToken, authorizeRoles('Admin'), updateEquipment);
router.delete('/:id', verifyToken, authorizeRoles('Admin'), deleteEquipment);

export default router;
