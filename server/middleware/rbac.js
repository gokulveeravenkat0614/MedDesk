import { db } from '../data/store.js';

/**
 * Restrict endpoint access to specific roles (least privilege)
 */
export const requireRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Unauthorized: Authentication required.',
        code: 'AUTH_REQUIRED'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      // Record security audit log for privilege violation attempt
      db.addAuditLog({
        category: 'RBAC Enforcement',
        event: 'INSUFFICIENT_ROLE_ACCESS_DENIED',
        severity: 'danger',
        actor: req.user.email || req.user.name,
        role: req.user.role,
        target: `${req.method} ${req.originalUrl}`,
        ip: req.ip || req.connection?.remoteAddress || '127.0.0.1',
        status: 'Blocked',
        details: `User with role '${req.user.role}' attempted to access restricted endpoint requiring [${allowedRoles.join(', ')}].`
      });

      return res.status(403).json({
        error: 'Access Denied: You do not have permission to perform this action.',
        code: 'INSUFFICIENT_PRIVILEGES'
      });
    }

    next();
  };
};

/**
 * IDOR Protection: Authorize patient access strictly
 * Pattern: "Authorized user + authorized patient + authorized purpose = access"
 */
export const authorizePatientAccess = (req, res, next) => {
  const patientId = req.params.id || req.params.patientId || req.body.patientId;
  const user = req.user;

  if (!patientId) {
    return res.status(400).json({
      error: 'Patient identifier is missing from request.',
      code: 'PATIENT_ID_REQUIRED'
    });
  }

  // Find target patient in synthetic store
  const targetPatient = db.patients.find((p) => p.id === patientId);
  if (!targetPatient) {
    return res.status(404).json({
      error: 'Patient record not found.',
      code: 'PATIENT_NOT_FOUND'
    });
  }

  // 1. If Patient Role: Can ONLY access their own account
  if (user.role === 'patient') {
    const isOwnRecord = user.patientId === patientId || user.email === targetPatient.email;
    if (!isOwnRecord) {
      db.addAuditLog({
        category: 'RBAC Enforcement',
        event: 'IDOR_CROSS_PATIENT_ACCESS_BLOCKED',
        severity: 'danger',
        actor: user.email,
        role: user.role,
        target: `Patient ID ${patientId}`,
        ip: req.ip || req.connection?.remoteAddress || '127.0.0.1',
        status: 'Blocked',
        details: `Patient '${user.email}' attempted unauthorized horizontal privilege escalation to inspect patient record '${patientId}'.`
      });

      return res.status(403).json({
        error: 'Access Denied: You are not authorized to access another patient\'s information.',
        code: 'IDOR_ACCESS_BLOCKED'
      });
    }
  }

  // 2. If Doctor Role: Can ONLY access patients assigned to them or with an active consultation
  if (user.role === 'doctor') {
    const isAssigned = (targetPatient.assignedDoctors || []).includes(user.doctorId);
    const hasAppointment = db.appointments.some(
      (a) => a.doctorId === user.doctorId && a.patientId === patientId
    );

    if (!isAssigned && !hasAppointment) {
      db.addAuditLog({
        category: 'RBAC Enforcement',
        event: 'CROSS_DOCTOR_ACCESS_BLOCKED',
        severity: 'danger',
        actor: user.name || user.email,
        role: user.role,
        target: `Patient ID ${patientId}`,
        ip: req.ip || req.connection?.remoteAddress || '127.0.0.1',
        status: 'Blocked',
        details: `Doctor '${user.name}' (${user.doctorId}) attempted to query unassigned patient '${patientId}' without active referral or consultation appointment.`
      });

      return res.status(403).json({
        error: 'Access Denied: Physician does not have an active consultation assignment for target patient.',
        code: 'UNASSIGNED_PATIENT_ACCESS_BLOCKED'
      });
    }
  }

  // 3. Admin: Allowed for general administrative overview (clinical diagnosis details masked downstream)
  req.targetPatient = targetPatient;
  next();
};

/**
 * IDOR Protection: Authorize appointment access strictly
 */
export const authorizeAppointmentAccess = (req, res, next) => {
  const apptId = req.params.id || req.body.appointmentId;
  const user = req.user;

  const appt = db.appointments.find((a) => a.id === apptId);
  if (!appt) {
    return res.status(404).json({
      error: 'Appointment not found.',
      code: 'APPOINTMENT_NOT_FOUND'
    });
  }

  if (user.role === 'patient') {
    if (appt.patientId !== user.patientId) {
      db.addAuditLog({
        category: 'RBAC Enforcement',
        event: 'IDOR_APPOINTMENT_ACCESS_BLOCKED',
        severity: 'danger',
        actor: user.email,
        role: user.role,
        target: `Appointment ID ${apptId}`,
        ip: req.ip || '127.0.0.1',
        status: 'Blocked',
        details: `Patient attempted to access or modify appointment belonging to another patient.`
      });

      return res.status(403).json({
        error: 'Access Denied: You do not own this appointment.',
        code: 'UNAUTHORIZED_APPOINTMENT_ACCESS'
      });
    }
  }

  if (user.role === 'doctor') {
    if (appt.doctorId !== user.doctorId) {
      return res.status(403).json({
        error: 'Access Denied: You are not the attending physician for this appointment.',
        code: 'UNAUTHORIZED_DOCTOR_APPOINTMENT'
      });
    }
  }

  req.targetAppointment = appt;
  next();
};
