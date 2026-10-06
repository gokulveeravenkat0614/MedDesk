import React, { useState } from 'react';
import {
  ShieldAlert, ShieldCheck, Activity, Search, Filter,
  Clock, Download, RefreshCw, AlertTriangle, CheckCircle2,
  Lock, Key, FileText, Calendar, User, Laptop, Database
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/Modal';
import { SecurityWatchAlert } from '../../components/SecurityWatchAlert';

const INITIAL_AUDIT_LOGS = [
  {
    id: 'LOG-8945',
    timestamp: 'Today, 10:42 AM',
    category: 'Record Access',
    event: 'Record Viewed',
    severity: 'success',
    actor: 'Dr. Sharma',
    role: 'Doctor',
    target: 'Patient record PT-1024',
    ip: '192.168.1.44 (Station A)',
    status: 'Authorized',
    details: 'Dr. Sharma viewed patient record PT-1024 under authorized clinical consultation session.'
  },
  {
    id: 'LOG-8944',
    timestamp: 'Today, 10:35 AM',
    category: 'Appointment Management',
    event: 'Appointment Updated',
    severity: 'info',
    actor: 'Patient',
    role: 'Patient',
    target: 'Appointment CG-APT-1001',
    ip: '10.20.4.15 (Mobile Portal)',
    status: 'Updated',
    details: 'Patient updated appointment CG-APT-1001 consultation schedule and notes.'
  },
  {
    id: 'LOG-8943',
    timestamp: 'Today, 10:21 AM',
    category: 'RBAC Enforcement',
    event: 'Doctor Verified',
    severity: 'success',
    actor: 'Admin',
    role: 'Admin',
    target: 'Dr. Arjun Mehta (DOC-04)',
    ip: '192.168.1.10 (Admin Node)',
    status: 'Verified',
    details: 'Admin verified doctor account credentials and approved clinical prescription privileges.'
  },
  {
    id: 'LOG-8942',
    timestamp: 'Today, 09:55 AM',
    category: 'Record Access',
    event: 'Record Updated',
    severity: 'info',
    actor: 'Doctor',
    role: 'Doctor',
    target: 'Consultation note PT-1024',
    ip: '192.168.1.44 (Station A)',
    status: 'Authorized',
    details: 'Doctor updated consultation note with diagnostic follow-up recommendations and prescription.'
  },
  {
    id: 'LOG-8941',
    timestamp: 'Today, 09:42 AM',
    category: 'Authentication',
    event: 'Login',
    severity: 'success',
    actor: 'Patient',
    role: 'Patient',
    target: 'CareGuard Patient Gateway',
    ip: '10.20.4.15 (Mobile Portal)',
    status: 'Authorized',
    details: 'Patient logged into CareGuard with secure session token and sanitized client environment.'
  },
  {
    id: 'LOG-8940',
    timestamp: 'Today, 09:30 AM',
    category: 'RBAC Enforcement',
    event: 'CROSS_PATIENT_ACCESS_BLOCKED',
    severity: 'danger',
    actor: 'Dr. Priya Sharma',
    role: 'Doctor',
    target: 'Patient Aditya Rao (PT-1092)',
    ip: '192.168.1.88 (Station B)',
    status: 'Blocked',
    details: 'RBAC policy denied access: Physician does not have an active consultation assignment or referral authorization for target patient.'
  },
  {
    id: 'LOG-8938',
    timestamp: 'Today, 08:55 AM',
    category: 'Authentication',
    event: 'SESSION_MFA_AUTHENTICATED',
    severity: 'success',
    actor: 'admin@careguard.demo',
    role: 'Admin',
    target: 'Admin Security Operations Console',
    ip: '192.168.1.10 (Management Node)',
    status: 'Authorized',
    details: 'Administrator session initiated with simulated biometric FIDO2 credential validation.'
  },
  {
    id: 'LOG-8935',
    timestamp: 'Today, 08:12 AM',
    category: 'System Config',
    event: 'SYNTHETIC_DATA_ENCLAVE_MOUNT',
    severity: 'info',
    actor: 'System Daemon',
    role: 'System',
    target: 'LocalStorage Vault (careguard_*)',
    ip: '127.0.0.1 (Local Runtime)',
    status: 'Enforced',
    details: 'Synthetic sandbox environment isolated. Zero Protected Health Information (PHI) egress detected.'
  }
];

export const AuditLogs = () => {
  const { showToast } = useApp();
  const [logs, setLogs] = useState(INITIAL_AUDIT_LOGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedLog, setSelectedLog] = useState(null);

  const handleSimulateProbe = () => {
    const probeLog = {
      id: `LOG-${Math.floor(9000 + Math.random() * 999)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      category: 'RBAC Enforcement',
      event: 'UNAUTHORIZED_CROSS_DEPT_PROBE',
      severity: 'danger',
      actor: 'Unknown Caller (Unverified Token)',
      role: 'External / Guest',
      target: 'Medical Records Enclave',
      ip: '172.16.0.44 (Blocked Ingress)',
      status: 'Blocked',
      details: 'Automatic CareGuard Gateway intercept: Unsigned bearer token attempted direct inspection of restricted oncology records. Dropped at ingress filter.'
    };
    setLogs([probeLog, ...logs]);
    showToast('Simulated security probe intercepted and logged to audit trail', 'warning');
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(logs, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `careguard-audit-logs-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Audit log records exported successfully');
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ip.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || log.category === selectedCategory;
    const matchesSeverity = selectedSeverity === 'All' || log.severity === selectedSeverity;

    return matchesSearch && matchesCategory && matchesSeverity;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/60 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-primary" />
              <span>Security Operations & Audit Trail</span>
            </span>
            <span className="text-xs text-slate-400">• Immutable Chronology</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1 leading-tight">
            Security Activity
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Real-time surveillance of patient records authorization, doctor access permissions, authentication challenges, and RBAC policy enforcement.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSimulateProbe}
            className="px-3.5 py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 shadow-xs transition-colors flex items-center gap-1.5"
          >
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Simulate Access Probe</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Log</span>
          </button>
        </div>
      </div>

      {/* Security Monitoring Active Banner (Exact Specification) */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-900 via-slate-900 to-indigo-950 text-white shadow-xl border border-emerald-500/30 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                  Security Monitoring Active
                </span>
                <span className="text-[10px] text-slate-400 bg-white/10 px-2 py-0.5 rounded-full">
                  Zero Trust Engine
                </span>
              </div>
              <h3 className="text-lg font-black text-white mt-1">
                CareGuard Clinical Threat Detection & RBAC Surveillance
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl mt-0.5 leading-relaxed">
                All patient records requests are verified against physician consultation rosters. Cross-department inquiries without explicit assignment are automatically blocked and logged.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-white/15 pt-3 md:pt-0 md:pl-6 shrink-0">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Active Nodes
              </span>
              <span className="text-xl font-black text-white block mt-0.5">
                14 Nodes
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold block">
                100% Operational
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Access Audit
              </span>
              <span className="text-xl font-black text-emerald-400 block mt-0.5">
                SHA-256
              </span>
              <span className="text-[10px] text-slate-400 font-semibold block">
                Encrypted Chain
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Security Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel rounded-3xl p-5 border border-white/90 shadow-glass flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Total Logged Events
            </span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">
              {logs.length}
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              Recorded in session
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center">
            <Activity className="w-6 h-6 stroke-[2.2]" />
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-white/90 shadow-glass flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Authorized Reads
            </span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">
              98.2%
            </span>
            <span className="text-[11px] text-emerald-700 mt-0.5 block font-medium">
              Verified clinical access
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-white/90 shadow-glass flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Blocked Inquiries
            </span>
            <span className="text-2xl font-black text-rose-600 mt-1 block">
              {logs.filter(l => l.severity === 'danger').length}
            </span>
            <span className="text-[11px] text-rose-700 mt-0.5 block font-medium">
              RBAC anomalies stopped
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-white/90 shadow-glass flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Active Doctor Nodes
            </span>
            <span className="text-2xl font-black text-indigo-600 mt-1 block">
              08 Online
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              Clinic internal VLAN
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Laptop className="w-6 h-6 stroke-[2.2]" />
          </div>
        </div>

      </div>

      {/* CareGuard Security Watch: Suspicious Access Detection (Section 9 Specification) */}
      <SecurityWatchAlert onInspectAudit={() => setSearchTerm('CROSS_PATIENT_ACCESS_BLOCKED')} />

      {/* Main Filter & Table Container */}
      <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-glass space-y-4">
        
        {/* Filters Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by actor, target, IP address, or event..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Category & Severity Selectors */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <Filter className="w-3.5 h-3.5" />
              <span>Category:</span>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="All">All Categories</option>
              <option value="Record Access">Record Access</option>
              <option value="RBAC Enforcement">RBAC Enforcement</option>
              <option value="Appointment Management">Appointment Management</option>
              <option value="Authentication">Authentication</option>
              <option value="System Config">System Config</option>
            </select>

            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="All">All Severities</option>
              <option value="success">Success / Authorized</option>
              <option value="info">Informational</option>
              <option value="warning">Warning / Updated</option>
              <option value="danger">Danger / Blocked</option>
            </select>
          </div>

        </div>

        {/* Audit Log Entries List / Table */}
        <div className="divide-y divide-slate-100">
          {filteredLogs.map((item) => {
            const isDanger = item.severity === 'danger';
            const isSuccess = item.severity === 'success';
            const isWarning = item.severity === 'warning';

            return (
              <div
                key={item.id}
                className="py-3.5 hover:bg-slate-50/70 transition-colors rounded-xl px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
                onClick={() => setSelectedLog(item)}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    isDanger
                      ? 'bg-rose-100 text-rose-600'
                      : isSuccess
                      ? 'bg-emerald-100 text-emerald-600'
                      : isWarning
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-blue-100 text-primary'
                  }`}>
                    {isDanger ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : isSuccess ? (
                      <ShieldCheck className="w-4 h-4" />
                    ) : isWarning ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      <Activity className="w-4 h-4" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-black text-slate-900">
                        {item.event}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isDanger
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : isSuccess
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : isWarning
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-blue-50 text-primary border-blue-200'
                      }`}>
                        {item.status}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {item.id}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                      {item.details}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mt-1">
                      <span className="font-semibold text-slate-700">
                        Actor: {item.actor} ({item.role})
                      </span>
                      <span>•</span>
                      <span>Target: {item.target}</span>
                      <span>•</span>
                      <span className="font-mono text-[10px] text-slate-400">{item.ip}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {item.timestamp}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLog(item);
                    }}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs transition-colors"
                    title="View Log Details"
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}

          {filteredLogs.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-xs">
              No audit records found matching your filter criteria.
            </div>
          )}
        </div>

      </div>

      {/* Modal: Detailed Audit Inspection */}
      <Modal
        isOpen={!!selectedLog}
        onClose={() => setSelectedLog(null)}
        title="Security Audit Inspection"
        size="md"
      >
        {selectedLog && (
          <div className="space-y-4 text-xs">
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${
              selectedLog.severity === 'danger'
                ? 'bg-rose-50 border-rose-200 text-rose-900'
                : 'bg-blue-50 border-blue-200 text-blue-900'
            }`}>
              <div>
                <span className="font-mono text-sm font-black block">{selectedLog.event}</span>
                <span className="text-[11px] opacity-80 block mt-0.5">{selectedLog.timestamp}</span>
              </div>
              <span className={`px-3 py-1 rounded-full font-black text-[11px] border ${
                selectedLog.severity === 'danger'
                  ? 'bg-rose-600 text-white border-rose-700'
                  : 'bg-emerald-600 text-white border-emerald-700'
              }`}>
                {selectedLog.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Actor Identity</span>
                <span className="text-slate-800 font-bold block mt-0.5">{selectedLog.actor}</span>
                <span className="text-slate-500 text-[11px] block">Role: {selectedLog.role}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Network Endpoint</span>
                <span className="font-mono text-slate-800 block mt-0.5">{selectedLog.ip}</span>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Target Resource</span>
                <span className="text-slate-800 font-bold block mt-0.5">{selectedLog.target}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-500 font-bold block mb-1">Audit Narrative & Telemetry:</span>
              <p className="p-3 bg-white rounded-xl border border-slate-200 text-slate-700 leading-relaxed font-mono text-[11px]">
                {selectedLog.details}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-100 text-slate-500 text-[10px] flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Immutable hash: sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069</span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
              >
                Close Inspector
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
