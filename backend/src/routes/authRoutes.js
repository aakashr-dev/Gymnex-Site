import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyEmail
} from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import {
  registerValidation,
  loginValidation,
  changePasswordValidation,
  resetPasswordValidation
} from '../middlewares/validators.js';

const router = express.Router();

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);
router.post('/logout', verifyToken, logoutUser);
router.post('/refresh-token', refreshToken);
router.post('/refresh', refreshToken);
router.get('/profile', verifyToken, getProfile);
router.get('/me', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);
router.put('/change-password', verifyToken, changePasswordValidation, changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPasswordValidation, resetPassword);
router.post('/verify-email', verifyEmail);

export default router;
