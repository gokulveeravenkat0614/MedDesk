import { db } from '../data/store.js';

/**
 * GET /api/patients
 * List patients based on least privilege:
 * - Admin: Lists all synthetic patients
 * - Doctor: Lists ONLY patients assigned to this doctor or with upcoming consultations
 * - Patient: Blocked (403 Forbidden)
 */
export const getPatients = (req, res) => {
  const user = req.user;

  if (user.role === 'patient') {
    return res.status(403).json({
      error: 'Access Denied: Patients are not permitted to inspect clinical patient rosters.',
      code: 'FORBIDDEN_ROSTER_ACCESS'
    });
  }

  if (user.role === 'doctor') {
    const assigned = db.patients.filter((p) => {
      const isAssigned = (p.assignedDoctors || []).includes(user.doctorId);
      const hasAppointment = db.appointments.some(
        (a) => a.doctorId === user.doctorId && a.patientId === p.id
      );
      return isAssigned || hasAppointment;
    });

    db.addAuditLog({
      category: 'Record Access',
      event: 'DOCTOR_PATIENT_ROSTER_READ',
      severity: 'info',
      actor: user.name,
      role: 'doctor',
      target: 'Assigned Patient List',
      ip: req.ip || '127.0.0.1',
      status: 'Authorized',
      details: `Physician retrieved list of ${assigned.length} assigned patients.`
    });

    return res.status(200).json({ patients: assigned });
  }

  // Admin: Return all patients
  return res.status(200).json({ patients: db.patients });
};

/**
 * GET /api/patients/:id
 * Strict IDOR-protected patient retrieval
 */
export const getPatientProfile = (req, res) => {
  const patient = req.targetPatient;
  const user = req.user;

  db.addAuditLog({
    category: 'Record Access',
    event: 'PATIENT_PROFILE_READ',
    severity: 'info',
    actor: user.email || user.name,
    role: user.role,
    target: `Patient Profile ${patient.id}`,
    ip: req.ip || '127.0.0.1',
    status: 'Authorized',
    details: `Authorized read of patient demographic profile for '${patient.name}'.`
  });

  return res.status(200).json({ patient });
};

/**
 * PUT /api/patients/:id
 * Secure patient profile update
 */
export const updatePatientProfile = (req, res) => {
  const patient = req.targetPatient;
  const user = req.user;
  const { phone, emergencyContact, address, allergies } = req.body;

  if (phone) patient.phone = phone;
  if (emergencyContact) patient.emergencyContact = emergencyContact;
  if (address) patient.address = address;
  if (allergies && Array.isArray(allergies)) patient.allergies = allergies;

  db.save('patients.json', db.patients);

  db.addAuditLog({
    category: 'Record Access',
    event: 'PATIENT_PROFILE_UPDATED',
    severity: 'info',
    actor: user.email || user.name,
    role: user.role,
    target: `Patient Profile ${patient.id}`,
    ip: req.ip || '127.0.0.1',
    status: 'Updated',
    details: `Patient profile for '${patient.name}' updated successfully.`
  });

  return res.status(200).json({
    message: 'Profile updated successfully.',
    patient
  });
};

/**
 * GET /api/patients/:id/records
 * Authorizes access to diagnostic and medical records
 */
export const getPatientRecords = (req, res) => {
  const patient = req.targetPatient;
  const user = req.user;

  const records = db.medicalRecords.filter((r) => r.patientId === patient.id);

  db.addAuditLog({
    category: 'Record Access',
    event: 'MEDICAL_RECORDS_QUERY',
    severity: 'info',
    actor: user.email || user.name,
    role: user.role,
    target: `Medical Records for ${patient.id}`,
    ip: req.ip || '127.0.0.1',
    status: 'Authorized',
    details: `Retrieved ${records.length} authorized clinical records for '${patient.name}'.`
  });

  return res.status(200).json({ records });
};
