import express from 'express';
import {
  getAppointments,
  bookAppointment,
  cancelAppointment,
  rescheduleAppointment
} from '../controllers/appointmentController.js';
import { authenticate } from '../middleware/auth.js';
import { authorizeAppointmentAccess } from '../middleware/rbac.js';
import { sanitizeRequestBody, validateAppointmentPayload } from '../middleware/validator.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getAppointments);
router.post('/', sanitizeRequestBody, validateAppointmentPayload, bookAppointment);
router.put('/:id/cancel', authorizeAppointmentAccess, sanitizeRequestBody, cancelAppointment);
router.put('/:id/reschedule', authorizeAppointmentAccess, sanitizeRequestBody, rescheduleAppointment);

export default router;
