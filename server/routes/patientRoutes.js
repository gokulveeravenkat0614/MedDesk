import express from 'express';
import {
  getPatients,
  getPatientProfile,
  updatePatientProfile,
  getPatientRecords
} from '../controllers/patientController.js';
import { authenticate } from '../middleware/auth.js';
import { authorizePatientAccess, requireRole } from '../middleware/rbac.js';
import { sanitizeRequestBody } from '../middleware/validator.js';

const router = express.Router();

router.use(authenticate);

// Directory access: only doctor or admin
router.get('/', requireRole(['doctor', 'admin']), getPatients);

// IDOR-protected single patient access
router.get('/:id', authorizePatientAccess, getPatientProfile);
router.put('/:id', authorizePatientAccess, sanitizeRequestBody, updatePatientProfile);
router.get('/:id/records', authorizePatientAccess, getPatientRecords);

export default router;
