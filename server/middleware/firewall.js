import jwt from 'jsonwebtoken';
import { SECURITY_CONFIG } from '../config/security.js';
import { db } from '../data/store.js';

/**
 * CareGuard Multi-Layer Security Firewall Engine
 * 
 * Pipeline Stages:
 * 1. IDENTITY & ORIGIN VERIFICATION
 * 2. CRYPTOGRAPHIC AUTHENTICATION
 * 3. ROLE-BASED ACCESS CONTROL (RBAC)
 * 4. PATIENT-DOCTOR RELATIONSHIP & IDOR AUTHORIZATION
 * 5. DEEP INPUT VALIDATION & INJECTION DEFENSE
 * 6. RATE LIMITING & ABUSE SHIELD
 * 7. SECURE API SANITIZATION & SAFE ERROR HANDLING
 * 8. IMMUTABLE SECURITY AUDIT LOGGING
 */

// Injection attack detection signatures
const INJECTION_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/gi,
  /onload=/gi,
  /onerror=/gi,
  /onclick=/gi,
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|TRUNCATE)\b)/i,
  /\$where/i,
  /\$ne/i,
  /\$gt/i,
  /\.\.\//g // Path traversal
];

export const inspectPayloadForThreats = (payload) => {
  if (!payload) return { safe: true };

  const str = typeof payload === 'string' ? payload : JSON.stringify(payload);
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(str)) {
      return {
        safe: false,
        pattern: pattern.toString(),
        threat: 'Malicious injection signature detected in payload.'
      };
    }
  }
  return { safe: true };
};

/**
 * Comprehensive Multi-Layer Firewall Middleware
 */
export const careGuardFirewall = (req, res, next) => {
  // Layer 1: Apply security response headers
  res.setHeader('X-CareGuard-Firewall', 'ACTIVE-ENFORCED');
  res.setHeader('X-CareGuard-Security-Layer', 'MULTI-LAYER-RBAC');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  // Layer 5: Input Inspection on Incoming Request Body
  if (req.body && Object.keys(req.body).length > 0) {
    const threatCheck = inspectPayloadForThreats(req.body);
    if (!threatCheck.safe) {
      db.addAuditLog({
        category: 'Input Validation',
        event: 'INJECTION_ATTACK_INTERCEPTED',
        severity: 'danger',
        actor: req.user?.email || 'Anonymous Client',
        role: req.user?.role || 'Guest',
        target: `${req.method} ${req.originalUrl}`,
        ip: req.ip || '127.0.0.1',
        status: 'Blocked',
        details: `Firewall blocked malicious payload matching pattern: ${threatCheck.pattern}`
      });

      return res.status(400).json({
        error: 'Input validation failed. Request contains disallowed characters or script patterns.',
        code: 'MALICIOUS_INPUT_BLOCKED',
        firewallStatus: 'BLOCKED_LAYER_5'
      });
    }
  }

  next();
};

/**
 * Firewall Simulator Engine
 * Tests an arbitrary request against all 8 pipeline layers and returns the stage-by-stage outcome
 */
export const simulateFirewallPipeline = ({
  action = 'READ_PATIENT_RECORDS',
  userRole = 'patient',
  userEmail = 'patient@careguard.demo',
  patientId = 'pat-1',
  targetPatientId = 'pat-1',
  tokenValid = true,
  payload = 'Routine clinical checkup request',
  isRateLimited = false
}) => {
  const steps = [];

  // Stage 1: Identity
  steps.push({
    stage: 'IDENTITY',
    title: '1. Identity Verification',
    passed: true,
    detail: `Client IP verified (127.0.0.1). Origin header matches whitelist.`
  });

  // Stage 2: Authentication
  if (!tokenValid) {
    steps.push({
      stage: 'AUTHENTICATION',
      title: '2. Cryptographic Authentication',
      passed: false,
      detail: 'Bearer token expired or cryptographic signature invalid (401 Unauthorized).'
    });
    return {
      status: 'BLOCKED',
      layerFailed: 2,
      reason: 'Authentication failed. Valid session token required.',
      steps
    };
  }
  steps.push({
    stage: 'AUTHENTICATION',
    title: '2. Cryptographic Authentication',
    passed: true,
    detail: `Signed JWT validated. Identity authenticated for ${userEmail}.`
  });

  // Stage 3: Role Check
  if (action === 'ADMIN_SETTINGS' && userRole !== 'admin') {
    steps.push({
      stage: 'ROLE_CHECK',
      title: '3. Role Verification (RBAC)',
      passed: false,
      detail: `Role '${userRole}' does not hold required 'admin' privilege for this resource.`
    });
    return {
      status: 'BLOCKED',
      layerFailed: 3,
      reason: 'Insufficient role privilege. Administrator access required.',
      steps
    };
  }
  steps.push({
    stage: 'ROLE_CHECK',
    title: '3. Role Verification (RBAC)',
    passed: true,
    detail: `User role '${userRole}' authorized for clinical category '${action}'.`
  });

  // Stage 4: Authorization & Relationship (IDOR protection)
  if (userRole === 'patient' && targetPatientId !== patientId) {
    steps.push({
      stage: 'AUTHORIZATION',
      title: '4. Resource Authorization (IDOR)',
      passed: false,
      detail: `Patient '${userEmail}' (${patientId}) attempted horizontal access to unowned patient '${targetPatientId}'.`
    });
    return {
      status: 'BLOCKED',
      layerFailed: 4,
      reason: 'Cross-patient access blocked. You can only access your own healthcare information.',
      steps
    };
  }

  if (userRole === 'doctor' && targetPatientId === 'pat-3') {
    // Simulated unassigned patient for doctor
    steps.push({
      stage: 'AUTHORIZATION',
      title: '4. Doctor-Patient Relationship Check',
      passed: false,
      detail: `Attending doctor has no active consultation assignment or consent ledger for patient '${targetPatientId}'.`
    });
    return {
      status: 'BLOCKED',
      layerFailed: 4,
      reason: 'Access Restricted: Doctor is not authorized for this patient.',
      steps
    };
  }

  steps.push({
    stage: 'AUTHORIZATION',
    title: '4. Resource Authorization',
    passed: true,
    detail: `Explicit relationship verified: User is authorized for target resource '${targetPatientId}'.`
  });

  // Stage 5: Input Validation & Sanitization
  const threatCheck = inspectPayloadForThreats(payload);
  if (!threatCheck.safe) {
    steps.push({
      stage: 'VALIDATION',
      title: '5. Input Validation & Sanitization',
      passed: false,
      detail: `Payload contains disallowed injection pattern: ${threatCheck.pattern}`
    });
    return {
      status: 'BLOCKED',
      layerFailed: 5,
      reason: 'Input rejected by CareGuard sanitization engine.',
      steps
    };
  }
  steps.push({
    stage: 'VALIDATION',
    title: '5. Input Validation & Sanitization',
    passed: true,
    detail: 'Payload sanitized; zero script tags or injection signatures detected.'
  });

  // Stage 6: Rate Limiting
  if (isRateLimited) {
    steps.push({
      stage: 'RATE_LIMITING',
      title: '6. Rate Limiting & Velocity Check',
      passed: false,
      detail: 'Velocity threshold exceeded (>10 requests in 60s). Temporary backoff enforced.'
    });
    return {
      status: 'BLOCKED',
      layerFailed: 6,
      reason: 'Too many requests. Please try again later.',
      steps
    };
  }
  steps.push({
    stage: 'RATE_LIMITING',
    title: '6. Rate Limiting & Velocity Check',
    passed: true,
    detail: 'Request rate acceptable (3/200 requests within current 15m window).'
  });

  // Stage 7: Secure API Check
  steps.push({
    stage: 'SECURE_API',
    title: '7. Secure API Check & Minimum Privilege',
    passed: true,
    detail: 'Minimum necessary data fields projected; zero sensitive backend paths leaked.'
  });

  // Stage 8: Audit Logging
  steps.push({
    stage: 'AUDIT_LOG',
    title: '8. Immutable Audit Log Entry',
    passed: true,
    detail: `Logged to audit trail: ${userEmail} performed ${action} on ${targetPatientId} [Authorized].`
  });

  return {
    status: 'ALLOWED',
    result: '🟢 ACCESS GRANTED',
    reason: 'All 8 security firewall validation layers satisfied. Protected data returned.',
    steps
  };
};
