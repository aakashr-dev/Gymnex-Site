import express from 'express';
import { getAnalyticsOverview, getAdminSummary } from '../controllers/analyticsController.js';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/overview', verifyToken, authorizeRoles('Admin'), getAnalyticsOverview);
router.get('/admin-summary', verifyToken, authorizeRoles('Admin'), getAdminSummary);

export default router;
