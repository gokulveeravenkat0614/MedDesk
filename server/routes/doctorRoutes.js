import express from 'express';
import {
  getDoctors,
  getDoctorById,
  toggleDoctorStatus
} from '../controllers/doctorController.js';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getDoctors);
router.get('/:id', getDoctorById);
router.put('/:id/status', requireRole(['admin']), toggleDoctorStatus);

export default router;
