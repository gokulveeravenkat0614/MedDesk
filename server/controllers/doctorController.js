import { db } from '../data/store.js';

export const getDoctors = (req, res) => {
  return res.status(200).json({ doctors: db.doctors });
};

export const getDoctorById = (req, res) => {
  const doctor = db.doctors.find((d) => d.id === req.params.id);
  if (!doctor) {
    return res.status(404).json({
      error: 'Doctor not found.',
      code: 'DOCTOR_NOT_FOUND'
    });
  }
  return res.status(200).json({ doctor });
};

export const toggleDoctorStatus = (req, res) => {
  const doctor = db.doctors.find((d) => d.id === req.params.id);
  if (!doctor) {
    return res.status(404).json({ error: 'Doctor not found.' });
  }

  doctor.status = doctor.status === 'active' ? 'inactive' : 'active';
  db.save('doctors.json', db.doctors);

  db.addAuditLog({
    category: 'System Config',
    event: 'DOCTOR_STATUS_TOGGLED',
    severity: 'warning',
    actor: req.user.email || req.user.name,
    role: req.user.role,
    target: `Doctor ${doctor.name} (${doctor.id})`,
    ip: req.ip || '127.0.0.1',
    status: 'Updated',
    details: `Doctor status modified to: ${doctor.status}`
  });

  return res.status(200).json({
    message: `Doctor status updated to ${doctor.status}`,
    doctor
  });
};
