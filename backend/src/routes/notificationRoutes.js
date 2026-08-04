import express from 'express';
import { getNotifications, markAsRead, createNotification } from '../controllers/notificationController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getNotifications);
router.patch('/:id/read', verifyToken, markAsRead);
router.post('/', verifyToken, createNotification);

export default router;
