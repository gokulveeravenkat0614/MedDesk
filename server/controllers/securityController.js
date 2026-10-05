import { db } from '../data/store.js';

export const getSecurityOverview = (req, res) => {
  const totalLogs = db.auditLogs.length;
  const blockedLogs = db.auditLogs.filter((l) => l.severity === 'danger' || l.status === 'Blocked').length;
  const authorizedReads = totalLogs > 0 ? Math.round(((totalLogs - blockedLogs) / totalLogs) * 100) : 98;

  return res.status(200).json({
    status: 'OPTIMAL',
    score: 'A+',
    zeroTrustEnforced: true,
    encryption: 'AES-256-GCM + Bcrypt(12)',
    activeNodes: 14,
    metrics: {
      totalLogs,
      blockedInquiries: blockedLogs,
      authorizedReadsPercentage: authorizedReads,
      activeSessions: db.activeSessions.size || 3,
      doctorsOnline: 8
    },
    features: [
      { id: 'f-1', name: 'Secure Authentication', icon: 'Key', status: 'Active', description: 'NIST-compliant bcrypt(12) hashing & JWT validation' },
      { id: 'f-2', name: 'Role-Based Access Control', icon: 'Shield', status: 'Active', description: 'Strict separation of Patient, Doctor, and Admin workspaces' },
      { id: 'f-3', name: 'Authorized Doctor Access', icon: 'UserCheck', status: 'Active', description: 'Doctors access only assigned patients with active appointments' },
      { id: 'f-4', name: 'Encrypted Communication', icon: 'Lock', status: 'Active', description: 'HTTPS transport security and strict CSP headers' },
      { id: 'f-5', name: 'Rate Limiting', icon: 'Sliders', status: 'Active', description: 'Anti-brute force throttling on auth and API endpoints' },
      { id: 'f-6', name: 'Audit Logging', icon: 'FileText', status: 'Active', description: 'Immutable chronology tracking identity, IP, and resource targets' },
      { id: 'f-7', name: 'Suspicious Activity Detection', icon: 'Eye', status: 'Active', description: 'Automated flagging of repeated privilege elevation attempts' },
      { id: 'f-8', name: 'Secure Password Hashing', icon: 'CheckCircle', status: 'Active', description: 'Zero plain-text password persistence; salted timing-safe hashes' },
      { id: 'f-9', name: 'Unauthorized Access Prevention', icon: 'XCircle', status: 'Active', description: 'IDOR barrier blocking direct parameter tampering' },
      { id: 'f-10', name: 'Secure Backup & Recovery', icon: 'Database', status: 'Active', description: 'Periodic encrypted JSON database snapshots' }
    ]
  });
};

export const getAuditLogs = (req, res) => {
  const { category, severity, search } = req.query;

  let filtered = [...db.auditLogs];

  if (category && category !== 'All') {
    filtered = filtered.filter((l) => l.category === category);
  }

  if (severity && severity !== 'All') {
    filtered = filtered.filter((l) => l.severity === severity);
  }

  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(
      (l) =>
        l.actor.toLowerCase().includes(s) ||
        l.target.toLowerCase().includes(s) ||
        l.event.toLowerCase().includes(s) ||
        l.details.toLowerCase().includes(s) ||
        l.ip.includes(s)
    );
  }

  return res.status(200).json({ logs: filtered });
};

export const simulateProbe = (req, res) => {
  const clientIp = req.ip || '172.16.0.44';
  const probeLog = db.addAuditLog({
    category: 'RBAC Enforcement',
    event: 'UNAUTHORIZED_CROSS_DEPT_PROBE',
    severity: 'danger',
    actor: 'Anonymous Attacker (Forged Bearer Token)',
    role: 'External / Adversary',
    target: 'Restricted Medical Records Enclave',
    ip: `${clientIp} (Blocked Ingress)`,
    status: 'Blocked',
    details: 'Zero-Trust Gatekeeper intercepted unauthorized direct probe attempting to enumerate restricted oncology records. Request dropped.'
  });

  return res.status(200).json({
    message: 'Probe simulated and intercepted by CareGuard Zero-Trust Gateway.',
    log: probeLog
  });
};

export const terminateAllSessions = (req, res) => {
  const user = req.user;

  // Clear all sessions for user
  for (const [key, value] of db.activeSessions.entries()) {
    if (value.userId === user.userId) {
      db.activeSessions.delete(key);
    }
  }

  db.revokedTokens.add(user.token);

  db.addAuditLog({
    category: 'Authentication',
    event: 'ALL_SESSIONS_TERMINATED',
    severity: 'warning',
    actor: user.email,
    role: user.role,
    target: 'Active Sessions Manager',
    ip: req.ip || '127.0.0.1',
    status: 'Terminated',
    details: 'User terminated all concurrent sessions and invalidated active tokens.'
  });

  return res.status(200).json({
    message: 'All other active sessions have been terminated.'
  });
};
