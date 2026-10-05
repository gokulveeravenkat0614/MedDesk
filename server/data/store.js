import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = __dirname;

const DEFAULT_HASH = '$2b$12$pzPcaB0c7myXVsOrpXJs5enzb0Wqhjz7VusKy9f4ZIerNqu2l0bai'; // "CareGuard@2026!"

// Initial synthetic user accounts
const INITIAL_USERS = [
  {
    id: 'usr-pat-1',
    email: 'patient@careguard.demo',
    passwordHash: DEFAULT_HASH,
    name: 'Gokul',
    role: 'patient',
    patientId: 'pat-1',
    mfaEnabled: true,
    mfaSecret: 'CGMFA2026',
    failedAttempts: 0,
    lockUntil: null,
    createdAt: '2026-10-05T08:00:00Z',
    lastLogin: '2026-10-05T11:30:00Z'
  },
  {
    id: 'usr-doc-1',
    email: 'doctor@careguard.demo',
    passwordHash: DEFAULT_HASH,
    name: 'Dr. Arjun Mehta',
    role: 'doctor',
    doctorId: 'doc-1',
    specialty: 'General Physician',
    mfaEnabled: true,
    mfaSecret: 'CGMFA2026',
    failedAttempts: 0,
    lockUntil: null,
    createdAt: '2026-10-05T08:00:00Z',
    lastLogin: '2026-10-05T11:40:00Z'
  },
  {
    id: 'usr-adm-1',
    email: 'admin@careguard.demo',
    passwordHash: DEFAULT_HASH,
    name: 'SecOps Administrator',
    role: 'admin',
    adminId: 'adm-1',
    mfaEnabled: true,
    mfaSecret: 'CGMFA2026',
    failedAttempts: 0,
    lockUntil: null,
    createdAt: '2026-10-05T08:00:00Z',
    lastLogin: '2026-10-05T11:45:00Z'
  }
];

const INITIAL_PATIENTS = [
  {
    id: 'pat-1',
    name: 'Gokul',
    email: 'patient@careguard.demo',
    phone: '+91 98765 43210',
    dob: '1998-04-12',
    gender: 'Male',
    bloodGroup: 'O+',
    emergencyContact: 'Demo Emergency Contact (+91 98765 00000)',
    address: 'VBIT Academic Campus, Hyderabad',
    allergies: ['Penicillin', 'Peanuts'],
    chronicConditions: ['None'],
    assignedDoctors: ['doc-1', 'doc-2']
  },
  {
    id: 'pat-2',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@synthetic.demo',
    phone: '+91 98765 43211',
    dob: '1996-08-15',
    gender: 'Male',
    bloodGroup: 'B+',
    emergencyContact: 'Demo Guardian (+91 98765 11111)',
    address: 'Madhapur Healthcare District, Hyderabad',
    allergies: ['Dust mites'],
    chronicConditions: ['Mild Asthma'],
    assignedDoctors: ['doc-1']
  },
  {
    id: 'pat-3',
    name: 'Priya Sharma',
    email: 'priya.sharma@synthetic.demo',
    phone: '+91 98765 43212',
    dob: '1994-11-22',
    gender: 'Female',
    bloodGroup: 'A+',
    emergencyContact: 'Demo Spouse (+91 98765 22222)',
    address: 'Gachibowli Cyber Enclave, Hyderabad',
    allergies: ['Sulfa drugs'],
    chronicConditions: ['None'],
    assignedDoctors: ['doc-2']
  },
  {
    id: 'pat-4',
    name: 'Aditya Rao',
    email: 'aditya.rao@synthetic.demo',
    phone: '+91 98765 43213',
    dob: '1988-01-30',
    gender: 'Male',
    bloodGroup: 'AB+',
    emergencyContact: 'Demo Brother (+91 98765 33333)',
    address: 'Banjara Hills, Hyderabad',
    allergies: ['None'],
    chronicConditions: ['Hypertension'],
    assignedDoctors: ['doc-1', 'doc-3']
  }
];

const INITIAL_DOCTORS = [
  {
    id: 'doc-1',
    name: 'Dr. Arjun Mehta',
    specialty: 'General Physician',
    experience: '8 years',
    qualification: 'MBBS, MD (Internal Medicine)',
    languages: ['English', 'Hindi', 'Telugu'],
    availability: 'Available Today',
    rating: 4.9,
    status: 'active',
    department: 'Outpatient Care',
    consultationFee: '$60'
  },
  {
    id: 'doc-2',
    name: 'Dr. Priya Sharma',
    specialty: 'Cardiologist',
    experience: '10 years',
    qualification: 'MBBS, DM (Cardiology)',
    languages: ['English', 'Hindi'],
    availability: 'Available Tomorrow',
    rating: 4.8,
    status: 'active',
    department: 'Cardiology',
    consultationFee: '$90'
  },
  {
    id: 'doc-3',
    name: 'Dr. Rahul Verma',
    specialty: 'Dermatologist',
    experience: '6 years',
    qualification: 'MBBS, MD (Dermatology)',
    languages: ['English', 'Hindi'],
    availability: 'Available Today',
    rating: 4.7,
    status: 'active',
    department: 'Dermatology',
    consultationFee: '$75'
  }
];

const INITIAL_APPOINTMENTS = [
  {
    id: 'MD-2026-00124',
    patientId: 'pat-1',
    patientName: 'Gokul',
    doctorId: 'doc-1',
    doctorName: 'Dr. Arjun Mehta',
    doctorSpecialty: 'General Physician',
    date: '2026-10-05',
    time: '10:30 AM',
    type: 'General Consultation',
    status: 'Upcoming',
    fee: '$60',
    symptoms: 'Routine cardiovascular and biometric health checkup',
    notes: 'Patient requesting telemetry vitals review'
  },
  {
    id: 'MD-2026-00125',
    patientId: 'pat-2',
    patientName: 'Rahul Kumar',
    doctorId: 'doc-1',
    doctorName: 'Dr. Arjun Mehta',
    doctorSpecialty: 'General Physician',
    date: '2026-10-05',
    time: '12:00 PM',
    type: 'Follow-up Visit',
    status: 'Upcoming',
    fee: '$60',
    symptoms: 'Mild respiratory allergy follow-up',
    notes: 'Prescription refill evaluation'
  },
  {
    id: 'MD-2026-00126',
    patientId: 'pat-4',
    patientName: 'Aditya Rao',
    doctorId: 'doc-1',
    doctorName: 'Dr. Arjun Mehta',
    doctorSpecialty: 'General Physician',
    date: '2026-10-05',
    time: '02:30 PM',
    type: 'Routine Checkup',
    status: 'Completed',
    fee: '$60',
    symptoms: 'Annual physical examination',
    notes: 'Normal sinus rhythm, BP stable'
  }
];

const INITIAL_MEDICAL_RECORDS = [
  {
    id: 'rec-2041',
    patientId: 'pat-1',
    patientName: 'Gokul',
    doctorId: 'doc-1',
    doctorName: 'Dr. Arjun Mehta',
    doctorSpecialty: 'General Physician',
    recordType: 'Lab Report',
    subType: 'Comprehensive Blood Chemistry',
    date: 'Oct 05, 2026',
    title: 'Routine Health Metabolic Panel',
    summary: 'Fasting glucose 92 mg/dL, Total Cholesterol 175 mg/dL, Kidney Function optimal.',
    diagnosis: 'Healthy Normal Assessment',
    accessStatus: 'Authorized Access',
    authorizedDoctors: ['doc-1', 'doc-2'],
    accessLogs: [
      {
        doctorName: 'Dr. Arjun Mehta',
        action: 'Authorized clinical review',
        timestamp: '2026-10-05 10:32 AM',
        ip: '192.168.1.42 (Clinic VLAN)'
      }
    ]
  },
  {
    id: 'rec-2042',
    patientId: 'pat-2',
    patientName: 'Rahul Kumar',
    doctorId: 'doc-1',
    doctorName: 'Dr. Arjun Mehta',
    doctorSpecialty: 'General Physician',
    recordType: 'Prescription',
    subType: 'Outpatient Prescription',
    date: 'Oct 04, 2026',
    title: 'Seasonal Allergy Relief',
    summary: 'Cetirizine 10mg once daily for 10 days.',
    diagnosis: 'Allergic Rhinitis',
    accessStatus: 'Authorized Access',
    authorizedDoctors: ['doc-1'],
    accessLogs: [
      {
        doctorName: 'Dr. Arjun Mehta',
        action: 'Prescription formulated',
        timestamp: '2026-10-04 03:15 PM',
        ip: '192.168.1.42 (Clinic VLAN)'
      }
    ]
  }
];

class DataStore {
  constructor() {
    this.users = this.loadOrCreate('users.json', INITIAL_USERS);
    this.patients = this.loadOrCreate('patients.json', INITIAL_PATIENTS);
    this.doctors = this.loadOrCreate('doctors.json', INITIAL_DOCTORS);
    this.appointments = this.loadOrCreate('appointments.json', INITIAL_APPOINTMENTS);
    this.medicalRecords = this.loadOrCreate('medical_records.json', INITIAL_MEDICAL_RECORDS);
    this.auditLogs = this.loadOrCreate('audit_logs.json', []);
    this.revokedTokens = new Set();
    this.resetTokens = new Map(); // tokenHash -> { userId, expiresAt }
    this.activeSessions = new Map(); // sessionId -> { userId, role, ip, userAgent, lastActive }
  }

  loadOrCreate(filename, defaultData) {
    const filePath = path.join(DATA_DIR, filename);
    try {
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
        return defaultData;
      }
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw);
    } catch (err) {
      console.error(`Error reading ${filename}, initializing fallback data:`, err.message);
      return defaultData;
    }
  }

  save(filename, data) {
    const filePath = path.join(DATA_DIR, filename);
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error(`Error writing ${filename}:`, err.message);
    }
  }

  // Audit Logging
  addAuditLog(entry) {
    const logItem = {
      id: `LOG-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      category: entry.category || 'Security Access',
      event: entry.event || 'UNKNOWN_EVENT',
      severity: entry.severity || 'info',
      actor: entry.actor || 'System',
      role: entry.role || 'Guest',
      target: entry.target || 'General Resource',
      ip: entry.ip || '127.0.0.1',
      status: entry.status || 'Logged',
      details: entry.details || ''
    };

    this.auditLogs.unshift(logItem);
    if (this.auditLogs.length > 500) this.auditLogs.pop(); // Keep last 500 logs
    this.save('audit_logs.json', this.auditLogs);
    return logItem;
  }
}

export const db = new DataStore();
