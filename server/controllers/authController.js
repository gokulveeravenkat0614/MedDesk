import jwt from 'jsonwebtoken';
import { db } from '../data/store.js';
import { SECURITY_CONFIG } from '../config/security.js';
import {
  hashPassword,
  comparePassword,
  validatePasswordStrength,
  generateSecureToken,
  hashToken
} from '../utils/crypto.js';
import { validateEmail } from '../middleware/validator.js';

// Helper to sign access token
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
      patientId: user.patientId,
      doctorId: user.doctorId,
      adminId: user.adminId
    },
    SECURITY_CONFIG.JWT.SECRET,
    { expiresIn: SECURITY_CONFIG.JWT.EXPIRES_IN }
  );
};

// Helper to sign refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user.id },
    SECURITY_CONFIG.JWT.REFRESH_SECRET,
    { expiresIn: SECURITY_CONFIG.JWT.REFRESH_EXPIRES_IN }
  );
};

/**
 * POST /api/auth/login
 * Secure login with bcrypt hash verification, progressive throttling, and session logging
 */
export const login = async (req, res) => {
  try {
    const { email, password, mfaCode } = req.body;
    const clientIp = req.ip || req.connection?.remoteAddress || '127.0.0.1';

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required.',
        code: 'MISSING_CREDENTIALS'
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        error: 'Invalid email address format.',
        code: 'INVALID_EMAIL_FORMAT'
      });
    }

    const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    // Account lockout check (prevent brute force)
    if (user && user.lockUntil && new Date(user.lockUntil) > new Date()) {
      const waitMinutes = Math.ceil((new Date(user.lockUntil) - new Date()) / 60000);
      db.addAuditLog({
        category: 'Authentication',
        event: 'LOCKED_ACCOUNT_LOGIN_ATTEMPT',
        severity: 'danger',
        actor: email,
        role: user.role,
        target: 'Login Endpoint',
        ip: clientIp,
        status: 'Blocked',
        details: `Login attempt on locked account. Lock expires in ${waitMinutes} minutes.`
      });

      return res.status(423).json({
        error: `Account is temporarily locked due to multiple failed login attempts. Please try again in ${waitMinutes} minute(s).`,
        code: 'ACCOUNT_LOCKED'
      });
    }

    // Check credentials (timing-safe bcrypt comparison)
    const isPasswordMatch = user ? await comparePassword(password, user.passwordHash) : false;

    if (!user || !isPasswordMatch) {
      if (user) {
        user.failedAttempts = (user.failedAttempts || 0) + 1;
        if (user.failedAttempts >= 5) {
          user.lockUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // Lock for 15 minutes
        }
        db.save('users.json', db.users);
      }

      db.addAuditLog({
        category: 'Authentication',
        event: 'AUTH_LOGIN_FAILED',
        severity: 'warning',
        actor: email,
        role: user?.role || 'Guest',
        target: 'Login Endpoint',
        ip: clientIp,
        status: 'Failed',
        details: 'Invalid credentials provided during authentication.'
      });

      return res.status(401).json({
        error: 'Invalid email or password.',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Reset failed attempts on successful password check
    user.failedAttempts = 0;
    user.lockUntil = null;
    user.lastLogin = new Date().toISOString();
    db.save('users.json', db.users);

    // Optional MFA Check if user enabled MFA
    if (user.mfaEnabled && mfaCode) {
      // In this demo environment, standard OTP code '123456' or 'CGMFA2026' succeeds
      if (mfaCode !== '123456' && mfaCode !== user.mfaSecret) {
        db.addAuditLog({
          category: 'Authentication',
          event: 'MFA_CHALLENGE_FAILED',
          severity: 'warning',
          actor: user.email,
          role: user.role,
          target: 'MFA Verification',
          ip: clientIp,
          status: 'Failed',
          details: 'Incorrect 6-digit one-time password provided.'
        });

        return res.status(401).json({
          error: 'Invalid MFA verification code.',
          code: 'INVALID_MFA'
        });
      }
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Record Session
    const sessionId = `SES-${Date.now()}`;
    db.activeSessions.set(sessionId, {
      userId: user.id,
      role: user.role,
      ip: clientIp,
      userAgent: req.headers['user-agent'] || 'Unknown',
      createdAt: new Date().toISOString()
    });

    // Set secure HttpOnly cookie for refresh token
    res.cookie('careguard_refresh', refreshToken, {
      httpOnly: SECURITY_CONFIG.COOKIE.HTTP_ONLY,
      secure: SECURITY_CONFIG.COOKIE.SECURE,
      sameSite: SECURITY_CONFIG.COOKIE.SAME_SITE,
      maxAge: SECURITY_CONFIG.COOKIE.MAX_AGE
    });

    db.addAuditLog({
      category: 'Authentication',
      event: 'AUTH_LOGIN_SUCCESS',
      severity: 'success',
      actor: user.email,
      role: user.role,
      target: 'CareGuard Security Gateway',
      ip: clientIp,
      status: 'Authorized',
      details: `User authenticated successfully with cryptographic JWT token. Role: ${user.role}.`
    });

    return res.status(200).json({
      message: 'Login successful.',
      token: accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        patientId: user.patientId,
        doctorId: user.doctorId,
        adminId: user.adminId,
        mfaEnabled: user.mfaEnabled,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      error: 'An unexpected authentication error occurred.',
      code: 'AUTH_ERROR'
    });
  }
};

/**
 * POST /api/auth/register
 * Secure patient registration with password complexity enforcement
 */
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, dob, gender, bloodGroup } = req.body;
    const clientIp = req.ip || req.connection?.remoteAddress || '127.0.0.1';

    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'Name, email, and password are required.',
        code: 'MISSING_FIELDS'
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        error: 'Invalid email address format.',
        code: 'INVALID_EMAIL'
      });
    }

    // Password strength verification
    const passwordCheck = validatePasswordStrength(password);
    if (!passwordCheck.valid) {
      return res.status(400).json({
        error: passwordCheck.message,
        code: 'WEAK_PASSWORD'
      });
    }

    // Check if user already exists (avoid duplicate accounts)
    const existing = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(409).json({
        error: 'An account with this email address already exists.',
        code: 'USER_EXISTS'
      });
    }

    // Hash password with bcrypt
    const passwordHash = await hashPassword(password);
    const newPatientId = `pat-${Date.now().toString().slice(-4)}`;
    const newUserId = `usr-${newPatientId}`;

    // Create user record
    const newUser = {
      id: newUserId,
      email: email.toLowerCase(),
      passwordHash,
      name,
      role: 'patient',
      patientId: newPatientId,
      mfaEnabled: false,
      failedAttempts: 0,
      lockUntil: null,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    // Create corresponding patient demographic record
    const newPatient = {
      id: newPatientId,
      name,
      email: email.toLowerCase(),
      phone: phone || '+91 98765 00000',
      dob: dob || '1998-01-01',
      gender: gender || 'Not Specified',
      bloodGroup: bloodGroup || 'O+',
      emergencyContact: 'Demo Emergency Contact',
      address: 'Demo Address, Hyderabad',
      allergies: [],
      chronicConditions: [],
      assignedDoctors: ['doc-1']
    };

    db.users.push(newUser);
    db.patients.push(newPatient);
    db.save('users.json', db.users);
    db.save('patients.json', db.patients);

    const accessToken = generateAccessToken(newUser);

    db.addAuditLog({
      category: 'Authentication',
      event: 'PATIENT_REGISTERED',
      severity: 'success',
      actor: newUser.email,
      role: 'patient',
      target: `New Patient Record ${newPatientId}`,
      ip: clientIp,
      status: 'Created',
      details: 'New synthetic patient registered with NIST-compliant bcrypt password hash.'
    });

    return res.status(201).json({
      message: 'Account created successfully.',
      token: accessToken,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        patientId: newUser.patientId
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      error: 'An unexpected registration error occurred.',
      code: 'REGISTER_ERROR'
    });
  }
};

/**
 * POST /api/auth/logout
 * Invalidate JWT token and clear cookies
 */
export const logout = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      db.revokedTokens.add(token);
    }

    res.clearCookie('careguard_refresh');

    db.addAuditLog({
      category: 'Authentication',
      event: 'AUTH_LOGOUT',
      severity: 'info',
      actor: req.user?.email || 'Anonymous',
      role: req.user?.role || 'Guest',
      target: 'CareGuard Session Manager',
      ip: req.ip || '127.0.0.1',
      status: 'Invalidated',
      details: 'User session logged out; authentication bearer token added to cryptographic revocation blacklist.'
    });

    return res.status(200).json({
      message: 'Logged out successfully.'
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to process logout.',
      code: 'LOGOUT_ERROR'
    });
  }
};

/**
 * POST /api/auth/forgot-password
 * Rate-limited password reset token generator without user enumeration
 */
export const forgotPassword = (req, res) => {
  try {
    const { email } = req.body;
    const clientIp = req.ip || '127.0.0.1';

    if (!email || !validateEmail(email)) {
      return res.status(400).json({
        error: 'Please enter a valid email address.',
        code: 'INVALID_EMAIL'
      });
    }

    const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (user) {
      const resetToken = generateSecureToken(32);
      const hashed = hashToken(resetToken);
      const expiresAt = Date.now() + 15 * 60 * 1000; // 15 mins expiry

      db.resetTokens.set(hashed, {
        userId: user.id,
        email: user.email,
        expiresAt
      });

      db.addAuditLog({
        category: 'Authentication',
        event: 'PASSWORD_RESET_REQUESTED',
        severity: 'info',
        actor: user.email,
        role: user.role,
        target: 'Password Reset Service',
        ip: clientIp,
        status: 'Token Issued',
        details: 'One-time 15-minute cryptographic password reset token generated.'
      });
    }

    // Always return generic response to prevent user enumeration
    return res.status(200).json({
      message: 'If an account with that email exists, password reset instructions have been generated.',
      demoTokenHint: user ? 'Use reset token code demo: careguard-reset-token-2026' : null
    });
  } catch (error) {
    return res.status(500).json({
      error: 'An internal error occurred during password reset processing.',
      code: 'RESET_REQUEST_ERROR'
    });
  }
};

/**
 * GET /api/auth/me
 * Returns current authenticated user and role permissions
 */
export const getMe = (req, res) => {
  const user = db.users.find((u) => u.id === req.user.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  return res.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      patientId: user.patientId,
      doctorId: user.doctorId,
      adminId: user.adminId,
      mfaEnabled: user.mfaEnabled,
      lastLogin: user.lastLogin
    }
  });
};
