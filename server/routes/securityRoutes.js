import {
  getSecurityOverview,
  getAuditLogs,
  simulateProbe,
  terminateAllSessions,
  simulateFirewallRequest
} from '../controllers/securityController.js';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

router.use(authenticate);

// Public to authenticated users: security overview, firewall tester & session controls
router.get('/overview', getSecurityOverview);
router.post('/terminate-sessions', terminateAllSessions);
router.post('/firewall/simulate-request', simulateFirewallRequest);

// Admin-only: Audit log deep inspection & threat simulation
router.get('/audit-logs', requireRole(['admin']), getAuditLogs);
router.post('/simulate-probe', requireRole(['admin']), simulateProbe);

export default router;
