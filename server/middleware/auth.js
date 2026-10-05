import jwt from 'jsonwebtoken';
import { SECURITY_CONFIG } from '../config/security.js';
import { db } from '../data/store.js';

export const authenticate = (req, res, next) => {
  try {
    let token = null;

    // Check Authorization header (Bearer token)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.careguard_token) {
      token = req.cookies.careguard_token;
    }

    if (!token) {
      return res.status(401).json({
        error: 'Authentication required. Please provide a valid authorization token.',
        code: 'AUTH_REQUIRED'
      });
    }

    // Check if token has been revoked / logged out
    if (db.revokedTokens.has(token)) {
      return res.status(401).json({
        error: 'Session has been invalidated or logged out. Please sign in again.',
        code: 'TOKEN_REVOKED'
      });
    }

    // Verify cryptographic signature and expiration
    jwt.verify(token, SECURITY_CONFIG.JWT.SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({
            error: 'Session expired. Please log in again to continue.',
            code: 'TOKEN_EXPIRED'
          });
        }
        return res.status(401).json({
          error: 'Invalid or forged authentication token.',
          code: 'TOKEN_INVALID'
        });
      }

      // Check if user still exists
      const user = db.users.find((u) => u.id === decoded.userId);
      if (!user) {
        return res.status(401).json({
          error: 'User account associated with this token no longer exists.',
          code: 'USER_NOT_FOUND'
        });
      }

      req.user = {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        patientId: user.patientId,
        doctorId: user.doctorId,
        adminId: user.adminId,
        token
      };

      next();
    });
  } catch (error) {
    return res.status(500).json({
      error: 'An internal authentication error occurred.',
      code: 'AUTH_INTERNAL_ERROR'
    });
  }
};
