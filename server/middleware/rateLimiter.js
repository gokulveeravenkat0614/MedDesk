import rateLimit from 'express-rate-limit';
import { db } from '../data/store.js';

/**
 * Rate limiter for sensitive authentication endpoints (Login, Register)
 */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    db.addAuditLog({
      category: 'Authentication',
      event: 'BRUTE_FORCE_THROTTLED',
      severity: 'warning',
      actor: req.body?.email || 'Anonymous',
      role: 'Guest',
      target: req.originalUrl,
      ip: req.ip || req.connection?.remoteAddress || '127.0.0.1',
      status: 'Blocked',
      details: 'Repeated authentication requests exceeded maximum threshold. IP temporarily throttled.'
    });

    res.status(429).json({
      error: 'Too many authentication attempts. Please wait 15 minutes before trying again.',
      code: 'RATE_LIMIT_EXCEEDED'
    });
  }
});

/**
 * Strict limiter for password reset requests to prevent abuse / enumeration
 */
export const passwordResetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many password reset requests. Please wait a few minutes.',
    code: 'RATE_LIMIT_EXCEEDED'
  }
});

/**
 * General API rate limiter for clinical endpoints
 */
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests. Please slow down.',
    code: 'API_RATE_LIMIT_EXCEEDED'
  }
});
