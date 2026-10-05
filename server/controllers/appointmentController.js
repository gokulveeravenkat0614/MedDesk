import { db } from '../data/store.js';

/**
 * GET /api/appointments
 * Scoped appointment retrieval according to authenticated user role
 */
export const getAppointments = (req, res) => {
  const user = req.user;

  if (user.role === 'patient') {
    const list = db.appointments.filter(
      (a) => a.patientId === user.patientId || a.patientName === user.name
    );
    return res.status(200).json({ appointments: list });
  }

  if (user.role === 'doctor') {
    const list = db.appointments.filter((a) => a.doctorId === user.doctorId);
    return res.status(200).json({ appointments: list });
  }

  // Admin gets all clinic appointments
  return res.status(200).json({ appointments: db.appointments });
};

/**
 * POST /api/appointments
 * Create appointment with time slot conflict prevention and input verification
 */
export const bookAppointment = (req, res) => {
  try {
    const user = req.user;
    const { doctorId, date, time, type, symptoms, notes, priority } = req.body;

    const doctor = db.doctors.find((d) => d.id === doctorId);
    if (!doctor) {
      return res.status(404).json({
        error: 'Selected doctor could not be found.',
        code: 'DOCTOR_NOT_FOUND'
      });
    }

    // Schedule deconfliction: Check if doctor is already booked at that date and time
    const conflict = db.appointments.find(
      (a) => a.doctorId === doctorId && a.date === date && a.time === time && a.status === 'Upcoming'
    );
    if (conflict) {
      return res.status(409).json({
        error: 'This consultation time slot is already reserved. Please select another time.',
        code: 'SCHEDULE_CONFLICT'
      });
    }

    const patientId = user.role === 'patient' ? user.patientId : (req.body.patientId || 'pat-1');
    const patientName = user.role === 'patient' ? user.name : (req.body.patientName || 'Gokul');

    const newAppointment = {
      id: `MD-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      patientId,
      patientName,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      date,
      time,
      type: type || 'General Consultation',
      status: 'Upcoming',
      symptoms: symptoms || 'General review',
      notes: notes || 'Booked via CareGuard Security Gateway',
      priority: priority || 'Normal',
      fee: doctor.consultationFee || '$60',
      createdAt: new Date().toISOString()
    };

    db.appointments.unshift(newAppointment);
    db.save('appointments.json', db.appointments);

    db.addAuditLog({
      category: 'Appointment Management',
      event: 'APPOINTMENT_CREATED',
      severity: 'info',
      actor: user.email || user.name,
      role: user.role,
      target: `Appointment ${newAppointment.id}`,
      ip: req.ip || '127.0.0.1',
      status: 'Confirmed',
      details: `Appointment created for patient '${patientName}' with '${doctor.name}' on ${date} at ${time}.`
    });

    return res.status(201).json({
      message: 'Appointment booked successfully.',
      appointment: newAppointment
    });
  } catch (error) {
    console.error('Booking error:', error);
    return res.status(500).json({
      error: 'An internal error occurred while processing appointment booking.',
      code: 'BOOKING_ERROR'
    });
  }
};

/**
 * PUT /api/appointments/:id/cancel
 * Cancel appointment with authorization check
 */
export const cancelAppointment = (req, res) => {
  const appt = req.targetAppointment;
  const user = req.user;
  const { reason } = req.body;

  appt.status = 'Cancelled';
  appt.cancellationReason = reason || 'Cancelled by user request';
  db.save('appointments.json', db.appointments);

  db.addAuditLog({
    category: 'Appointment Management',
    event: 'APPOINTMENT_CANCELLED',
    severity: 'warning',
    actor: user.email || user.name,
    role: user.role,
    target: `Appointment ${appt.id}`,
    ip: req.ip || '127.0.0.1',
    status: 'Cancelled',
    details: `Appointment ${appt.id} cancelled. Reason: ${appt.cancellationReason}`
  });

  return res.status(200).json({
    message: 'Appointment has been cancelled.',
    appointment: appt
  });
};

/**
 * PUT /api/appointments/:id/reschedule
 * Reschedule appointment with schedule collision check
 */
export const rescheduleAppointment = (req, res) => {
  const appt = req.targetAppointment;
  const user = req.user;
  const { newDate, newTime } = req.body;

  if (!newDate || !newTime) {
    return res.status(400).json({
      error: 'New date and time are required.',
      code: 'MISSING_RESCHEDULE_PARAMS'
    });
  }

  // Check collision for the doctor
  const conflict = db.appointments.find(
    (a) => a.id !== appt.id && a.doctorId === appt.doctorId && a.date === newDate && a.time === newTime && a.status === 'Upcoming'
  );
  if (conflict) {
    return res.status(409).json({
      error: 'The requested slot is already booked. Please choose an alternate slot.',
      code: 'SLOT_UNAVAILABLE'
    });
  }

  appt.date = newDate;
  appt.time = newTime;
  appt.status = 'Rescheduled';
  db.save('appointments.json', db.appointments);

  db.addAuditLog({
    category: 'Appointment Management',
    event: 'APPOINTMENT_RESCHEDULED',
    severity: 'info',
    actor: user.email || user.name,
    role: user.role,
    target: `Appointment ${appt.id}`,
    ip: req.ip || '127.0.0.1',
    status: 'Updated',
    details: `Appointment ${appt.id} rescheduled to ${newDate} at ${newTime}.`
  });

  return res.status(200).json({
    message: 'Appointment rescheduled successfully.',
    appointment: appt
  });
};
