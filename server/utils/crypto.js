import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { SECURITY_CONFIG } from '../config/security.js';

/**
 * Validate password complexity based on NIST / healthcare standards
 */
export const validatePasswordStrength = (password) => {
  if (!password || typeof password !== 'string') {
    return { valid: false, message: 'Password is required.' };
  }
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long.' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter.' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter.' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one numeric digit.' };
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one special character.' };
  }
  return { valid: true };
};

/**
 * Hash password securely using bcrypt with 12 salt rounds
 */
export const hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(SECURITY_CONFIG.BCRYPT_SALT_ROUNDS);
  return await bcrypt.hash(plainPassword, salt);
};

/**
 * Compare plain password against bcrypt hash safely (timing-safe comparison)
 */
export const comparePassword = async (plainPassword, hashedPassword) => {
  if (!plainPassword || !hashedPassword) return false;
  return await bcrypt.compare(plainPassword, hashedPassword);
};

/**
 * Generate cryptographically secure random token (e.g. for password resets or MFA)
 */
export const generateSecureToken = (bytes = 32) => {
  return crypto.randomBytes(bytes).toString('hex');
};

/**
 * Hash a reset token before storing in data store
 */
export const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};
