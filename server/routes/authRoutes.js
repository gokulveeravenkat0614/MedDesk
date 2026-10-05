import express from 'express';
import {
  login,
  register,
  logout,
  forgotPassword,
  getMe
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { authRateLimiter, passwordResetLimiter } from '../middleware/rateLimiter.js';
import { sanitizeRequestBody } from '../middleware/validator.js';

const router = express.Router();

router.post('/login', authRateLimiter, sanitizeRequestBody, login);
router.post('/register', authRateLimiter, sanitizeRequestBody, register);
router.post('/logout', authenticate, logout);
router.post('/forgot-password', passwordResetLimiter, sanitizeRequestBody, forgotPassword);
router.get('/me', authenticate, getMe);

export default router;
