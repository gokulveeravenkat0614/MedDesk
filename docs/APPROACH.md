# Project Approach & Architecture — Build Secure 24

**Team ID:** 23A  
**Project Name:** CareGuard — Secure Clinic & Appointment Management  
**Team Size:** 2 Members (Gokul Veera Venkat & Vaishnavi)  
**Primary Track / Domain:** Secure Healthcare Information Systems & Outpatient Clinic Orchestration  

---

## 1. Problem Understanding, Scope & Threat Model

### 1.1 Problem Statement & Real-World Motivation
Modern outpatient clinics frequently suffer from fragmented appointment systems, lack of clear role segregation between clinical and administrative staff, and accidental exposure of sensitive patient health records. Conversely, clinical providers need real-time, at-a-glance biometric visualization to rapidly triage consultations. 

**CareGuard** delivers an enterprise-grade, secure clinic and appointment management platform. It addresses this challenge by providing:
- Role-based separation for **Patients**, **Doctors**, and **Clinic Administrators**.
- Strict synthetic data isolation to prevent real Protected Health Information (PHI) exposure.
- Interactive multi-system human anatomical diagnostics for clinical triage.
- Multi-step appointment workflows with automated schedule deconfliction.
- Transparent access auditing on every medical chart.

### 1.2 Target Users & Personas
1. **Patient Persona (Rahul Kumar):**
   - Goal: Book, reschedule, or cancel consultations; view personal medical reports, prescriptions, and vital trends.
   - Trust Level: Authenticated End-User. Restricted strictly to self-owned records.
2. **Doctor Persona (Dr. Arjun Mehta, Dr. Priya Sharma):**
   - Goal: Manage daily clinical schedule, conduct consultations, inspect anatomical biometrics, record diagnoses, and issue digital prescriptions.
   - Trust Level: Clinical Practitioner. Authorized access granted only to assigned or consenting patients.
3. **Administrator Persona (Chief Admin):**
   - Goal: Clinic capacity planning, physician credentialing, patient directory oversight, and RBAC security audit log review.
   - Trust Level: Administrative Supervisor. Operational access without clinical tampering.

### 1.3 Threat Model & Attack Surface
- **Critical Assets:**
  - Patient demographic identities and contact channels.
  - Clinical examination notes, laboratory diagnostic panels, and prescriptions.
  - Physician schedule allocations and session tokens.
- **Potential Attack Vectors:**
  - *Broken Object Level Authorization (BOLA / IDOR):* A patient or doctor attempting to access records outside authorized scopes.
  - *Privilege Escalation:* A patient or uncredentialed user manipulating role parameters to access administrative routes.
  - *Data Exfiltration / Scraping:* Bulk enumeration of patient registries.
  - *Input Tampering & XSS:* Injecting malicious scripts into consultation notes or symptom descriptions.
- **OWASP Top 10 Considerations:**
  - Strict client-side and simulated server-side Role-Based Access Control (RBAC).
  - Sanitization of all input forms (symptoms, clinical notes, patient profiles).
  - Cryptographic session simulation with immediate audit trail generation.
  - Synthetic data labeling to safeguard against real PHI leaks.

---

## 2. Technical Architecture & Secure System Design

### 2.1 High-Level Architecture Overview
CareGuard is engineered using a modular, decoupled Single Page Application (SPA) architecture built on **React 18** and **Vite**, with high-performance responsive styling powered by **Tailwind CSS**.

```
┌───────────────────────────────────────────────────────────────┐
│                    CareGuard Client Interface                 │
│       (Glassmorphism UI, Responsive Navigation, AIChat)        │
└───────────────┬───────────────────────────────┬───────────────┘
                │                               │
        ┌───────▼────────┐             ┌────────▼───────┐
        │ Patient Portal │             │ Doctor Portal  │
        │ - Booking      │             │ - Anatomy Diag │
        │ - Health Vitals│             │ - Consultation │
        │ - Prescriptions│             │ - Charting     │
        └───────┬────────┘             └────────┬───────┘
                │                               │
                └───────────────┬───────────────┘
                                │
                ┌───────────────▼───────────────┐
                │   Admin & Compliance Console   │
                │ - Staff Credentialing         │
                │ - Real-Time Audit Telemetry   │
                └───────────────┬───────────────┘
                                │
        ┌───────────────────────▼────────────────────────┐
        │  CareGuard Security & Data Persistence Engine  │
        │  - RBAC Scope Verifier & Audit Log Generator   │
        │  - Persistent LocalStorage State Sync Engine   │
        │  - Synthetic Medical Dataset (5 Systems)       │
        └────────────────────────────────────────────────┘
```

### 2.2 Data Flow & Component Interaction
1. **Authentication Ingress:** User logs in or fast-switches through the demo selector. A cryptographically scoped session object is stored in state and persisted in browser storage.
2. **Access Control Verification:** Navigation guards verify the active user's role before mounting role-specific views (`/patient/*`, `/doctor/*`, `/admin/*`).
3. **Data Mutation:** When an appointment is scheduled or a medical record is committed, the action triggers state updates, generates an immutable audit record with timestamps and IP metadata, and updates notification queues.
4. **Anatomical Visualization:** Anatomical hot-points link directly to system diagnostics, presenting instant physiological metrics (Cardiovascular, Respiratory, Nervous, Digestive, Musculoskeletal).

### 2.3 Technology Stack Rationale
- **Frontend Framework:** React 18 with Vite — Rapid compile times, modular functional architecture, and zero runtime bloat.
- **Styling & Design System:** Tailwind CSS with custom glassmorphism extensions (`backdrop-filter: blur(20px)`, rounded cards, soft shadows, `#1677FF` primary palette).
- **Iconography:** Lucide React icons — Professional, clinical-grade vector icons ensuring cohesive visual language without generic emojis.
- **Data Visualization:** Recharts — High-performance SVG line sparklines, area charts, and appointment status donut charts.
- **Persistence Engine:** LocalStorage with dynamic schema seeding and one-click demo data restoration.

### 2.4 Defense-in-Depth Security Controls
1. **Role-Based Access Control (RBAC):** Strict view and action gating across Patient, Doctor, and Administrator roles.
2. **Privacy Access Layer:** Doctor views only display authorized patients with explicit consent flags.
3. **Audit Trail Logging:** Every record view and consultation event records actor, action, timestamp, and simulated network VLAN origin.
4. **Synthetic Data Enforcement:** Prominent UI disclaimers ensuring zero real medical diagnosis claims or clinical certifications are made.

---

## 3. Implementation Milestones & 24-Hour Timeline

| Milestone / Phase | Time Window | Key Objectives & Deliverables | Security Verification | Status |
|---|---|---|---|---|
| **Phase 1: Foundation & Setup** | 0h – 4h | Onboarding contract, team registration (23A / SecureForge), Vite+Tailwind setup | Trust root verification & clean baseline commit | `Completed` |
| **Phase 2: Core Domain & Auth** | 4h – 10h | RBAC authentication, synthetic data schemas, multi-role navigation | LocalStorage persistence validation & role switching | `Completed` |
| **Phase 3: Flagship Dashboards & Diagnostics** | 10h – 16h | Interactive anatomical system, vital cards, 5-step booking wizard, doctor charting | Security audit trail & data constraint check | `Completed` |
| **Phase 4: Admin, Assistant & Polish** | 16h – 22h | Admin registry tables, CareGuard AI FAQ assistant, notification engine, responsive polish | Build verification & zero console errors | `Completed` |
| **Phase 5: Freeze & Final Review** | 22h – 24h | Final commit freeze in `metadata/submission.yaml`, documentation review | Frozen commit SHA lock | `Planned` |

---

## 4. Architecture Decision Records (ADRs)

### ADR-001: Adoption of Client-Side Single Page Application with LocalStorage Persistence
- **Status:** Accepted
- **Context:** The hackathon requirements explicitly mandate a functional MVP with persistent state across page reloads without requiring an external database backend.
- **Decision:** Implement a reactive Context provider paired with structured `localStorage` serializers, pre-seeded with rich synthetic clinical data.
- **Security Trade-off:** Eliminates external network attack surfaces during judging demonstrations while maintaining full CRUD capabilities and instant state restoration.

### ADR-002: Modular Interactive Anatomical Biometrics Component
- **Status:** Accepted
- **Context:** The specification and reference design require an anatomical visual centerpiece that allows interactive exploration of 5 body systems.
- **Decision:** Built a custom synthetic vector anatomical silhouette with animated scanning pulses and interactive hotspot callouts linking to real-time vital metrics.
- **Trade-off:** High visual fidelity with lightweight SVG footprint; zero third-party heavy 3D engine overhead.

### ADR-003: Google Stitch AI Integration for Healthcare Design System & Screen Architecture
- **Status:** Accepted
- **Context:** To ensure uncompromising visual hierarchy, high-density clinical clarity, and alignment between cybersecurity telemetry and outpatient healthcare workflows, a formal design system and high-fidelity prototypes were required.
- **Decision:** Integrated Google Stitch AI via MCP to author a dedicated project (`CareGuard - Secure Clinic & Appointment Management`, ID: `9329458851443732436`) with custom design tokens (`#0B63F6` security blue, `#06B6D4` clinical cyan, `#0B1736` deep clinical navy, and `#F4F8FC` cool slate canvas).
- **Result:** Generated three core screens and branded assets providing definitive styling guidelines for patient portals, doctor consultation desks, and security operations centers.

---

## 5. Engineering Journal & Real-Time Decision Log

### [2026-10-05 12:25 IST] Entry 1: Project Initialization & Hackathon Onboarding
- **Focus:** Onboarding gate completion, rules agreement recital, and team metadata synchronization.
- **Resolution:** Logged turn 1, recorded agreement in `docs/logs.txt`, and registered Team 23A (SecureForge).

### [2026-10-05 12:45 IST] Entry 2: Complete Implementation of MediDesk Platform
- **Focus:** Built all components, pages, routing, anatomical diagnostics, booking wizard, and admin controls.
- **Resolution:** Verified all 16 routes, role switching, Recharts integration, and synthetic data audit trails.

### [2026-10-05 13:05 IST] Entry 3: Standalone Doctor Profile View & Route Extension
- **Focus:** Implemented standalone `DoctorProfile.jsx` page and registered routes `/patient/doctors/:id` and `/patient/doctor/:id` to fulfill Section 20 specifications alongside the directory modal.
- **Resolution:** Verified production build with 0 warnings, ensuring full parity between modal preview and deep-linkable doctor profile page.

### [2026-10-05 14:55 IST] Entry 4: Unified Rebranding Migration to CareGuard
- **Focus:** Migrated complete application identity from MediDesk to CareGuard. Engineered custom medical cross + shield logo (`CareGuardLogo.jsx`), updated browser titles, headers, footers, AI assistant branding (`CareGuard AI`), login demo access cards, and synthetic data notices.
- **Resolution:** Eliminated all obsolete brand strings across components, data models, and storage schemas; verified zero bundle errors via Vite.

### [2026-10-05 15:15 IST] Entry 5: CareGuard Security + Health Gateway Entrance Landing Page
- **Focus:** Designed and engineered a unique, non-derivative entrance experience (`Landing.jsx`) at root `/`. Features an interactive Digital Healthcare Security Gateway combining a glowing healthcare shield, pulsing circular security rings, live ECG heartbeat waveform, floating telemetry and appointment cards, and 1-click persona portal testing. Preserved deep human anatomy diagnostics for post-authentication clinical workspaces.
- **Resolution:** Tested responsive viewport rendering across mobile, tablet, and desktop; verified 100% clean production build.

### [2026-10-05 15:45 IST] Entry 6: Provider Scheduling, Security Audit Logs & Patient Dashboard Polish
- **Focus:** Implemented dedicated `DoctorSchedule.jsx` with Monday–Saturday weekly slots (09:00 AM – 05:00 PM), interactive availability toggles, and status filters. Developed `AuditLogs.jsx` featuring the "Security Monitoring Active" zero-trust banner, simulated cross-tenant access probe interceptor, and chronological audit entries. Polished `PatientDashboard.jsx` with personalized greeting ("Good Morning, Gokul 👋"), top metrics (02 Upcoming, 08 Completed, 04 Doctors, 06 Records), and 4 biometric vital cards with decorative SVG sparklines.
- **Resolution:** Verified zero build errors via Vite, registered routes `/doctor/schedule` and `/admin/audit-logs`, and integrated navigation links in `Sidebar.jsx`.

### [2026-10-05 19:30 IST] Entry 7: Comprehensive Multi-Layer Security Architecture (Backend & Frontend)
- **Focus:** Implemented a full-stack, production-grade security architecture:
  1. Express Security Gateway on port 5000 with Helmet (CSP, HSTS), CORS, cookie-parser, and anti-brute force rate limiting.
  2. Cryptographic authentication pipeline using salted bcrypt(12) password hashing and signed JWT access & refresh tokens.
  3. Server-side RBAC and IDOR barrier ensuring patients cannot query unowned records (`GET /api/patients/:id` strictly returns 403 Forbidden with security audit logging).
  4. Immutable security audit logging recording actor identity, network IP, target resource, and severity to `server/data/audit_logs.json`.
  5. Dedicated Security Center page (`SecurityCenter.jsx`) with live telemetry, active session management, MFA status, password change modal, and an interactive IDOR defense test suite.
  6. Database snapshot and integrity recovery utility (`server/utils/backup.js`).
- **Resolution:** Tested live IDOR defense probe against the backend confirming HTTP 403 enforcement. Verified production build (`✓ 2583 modules transformed, 0 errors`).

### [2026-10-05 19:50 IST] Entry 8: Core Differentiation, Access Control Matrix & Hackathon Evaluation Flow
- **Focus:** Established CareGuard's clear differentiation as a privacy-first clinic management platform centered on controlled patient access:
  1. Prominent Landing Page Positioning: Inscribed primary USP ("CareGuard doesn't just manage patient appointments — it controls who can access patient information, what they can access, and records important access activity") with supporting statement and short motto: "Manage care. Guard information."
  2. Architecture Sections: Implemented "Why CareGuard?" (4 cards: Secure by Design, Role-Based Access, Patient-Specific Authorization, Transparent Security Monitoring), "Who Can See What?" permission matrix table, and "How CareGuard Is Different" objective competitive comparison table.
  3. Security Status & Privacy Indicators: Integrated `SecurityStatusBar` across clinical dashboards and added patient privacy indicators.
  4. Doctor Authorization Flow: Built `AuthorizedRecordAccessModal` providing a 4-step real-time authorization animation and verified physician access badge.
  5. CareGuard Security Watch: Integrated suspicious access detection banner in Admin Audit Logs with administrator review controls.
  6. Global Evaluation Guide: Added `HackathonDemoGuide.jsx` providing judges with a 1-click guided 5-step demonstration walkthrough.
- **Resolution:** Tested 5-step evaluation flow and verified 100% clean production build (`✓ 2587 modules transformed, 0 errors`).

### [2026-10-05 21:30 IST] Entry 9: Google Stitch AI Design System & Screen Generation
- **Focus:** Created dedicated Google Stitch project `projects/9329458851443732436` ("CareGuard - Secure Clinic & Appointment Management") via MCP and generated high-density cybersecurity clinical screens:
  1. **CareGuard — Patient Appointment & Care Portal** (Screen ID: `b3294386435645849aac07cf4890477f`): Multi-step clinic booking engine, patient-controlled doctor access authorization toggles with auto-expiry windows, QR check-in tokens, and authorized doctor permission ledger.
  2. **CareGuard — Doctor Consultation & Decision Desk** (Screen ID: `0a126006280243cb8b90550ea95c0f9b`): Clinical triage queue, cryptographic consent scope banner with live countdown, 12-lead ECG waveform trace, signed lab biomarkers, encrypted prescription pad, and audit-logged break-glass controls.
  3. **CareGuard — Security Operations & Zero-Trust Audit Center** (Screen ID: `8d5280e35e344d3f958ea093782e6030`): SOC view with 4 real-time security KPI cards, high-density immutable audit stream with RFC-9162 Merkle verification, and 3-tier RBAC policy matrix.
  4. **CareGuard Brand Mark & Iconography** (Screen ID: `752b8d18aaf94d1a8b09e8b54c32de25`).
- **Resolution:** Stitch project and design tokens linked into repository architecture documentation. Verified live frontend and backend health.

### [2026-10-06 08:00 IST] Entry 10: Complete High-Fidelity UI/UX Design System & Experience Polish
- **Focus:** Executed complete UI/UX design overhaul across all CareGuard portals matching premium healthcare SaaS and cybersecurity standards:
  1. Landing Page (`Landing.jsx`): Hero eyebrow "SECURE HEALTHCARE PLATFORM", bold typography "Your Care. Guarded.", floating security telemetry badges, and interactive workspace selector.
  2. Authentication (`Login.jsx`): Compact Security Session badge displaying Role-Based Access Enabled, Protected Environment, and Synthetic Demo Data.
  3. Patient Dashboard (`PatientDashboard.jsx`): Next Appointment card with Dr. Arjun Mehta, status pill, management quick buttons, and aligned biometric readings.
  4. Doctor Dashboard (`DoctorDashboard.jsx`): All 4 biometric vitals (Blood Pressure, Heart Rate, Oxygen Level at 98% Optimal, Body Temperature at 98.4°F Normal) with Recharts sparklines; Today's appointments queue; authorized patient record access triggers.
  5. Doctor Directory & Booking (`Doctors.jsx`, `DoctorCard.jsx`, `Appointments.jsx`): "Find Your Doctor" view with specialty filter, "Book Appointment" CTAs, standard consultation time slots (`09:00 AM`, `10:30 AM`, `12:00 PM`, `02:30 PM`, `04:30 PM`, `05:30 PM`), and `CG-APT-` appointment identifiers.
- **Resolution:** Verified 0 compilation errors across 2,587 modules via Vite (`✓ built in 10.20s`).

### [2026-10-06 10:45 IST] Entry 11: Final UI/UX Polish, Mobile Navigation & Complete Specification Conformance
- **Focus:** Achieved 100% adherence to all 24 required application screens, visual language, cybersecurity disclaimers, and UX states:
  1. **Mobile Bottom Navigation (`MobileBottomNav.jsx`):** Created dedicated clean, compact fixed bottom navigation for patients with icons above labels (Home, Appointments, Doctors, Records, Profile), active blue indicator, and responsive breakpoints.
  2. **CareGuard AI Assistant (`AIChat.jsx`):** Exact suggested prompt buttons aligned ("How do I book an appointment?", "Where can I see my records?", "How do I reschedule?", "How do I cancel?", "How do I find a doctor?") and exact disclaimer: "CareGuard AI provides application assistance and general information only."
  3. **Privacy Disclaimer Standard:** Replaced all extraneous compliance references with "Privacy-Focused Clinical Environment • Security-Oriented Prototype • Synthetic Demo Environment" across `MedicalRecords.jsx`, `PatientProfile.jsx`, and `Settings.jsx`.
  4. **Standardized Empty States & Error UI (`EmptyState.jsx`, `ErrorState.jsx`):** Added specific empty states ("No upcoming appointments", "No doctors found", "No medical records available", "No patient records found") across directories and record tables, and clean non-technical error boundary state ("Something went wrong / Please try again").
  5. **Appointment Wizard Confirmation Parity (`Appointments.jsx`):** Aligned confirmation details with Doctor, Specialization, Date, Time, and CG-APT-1001 ID format.
### [2026-10-06 11:20 IST] Entry 12: Comprehensive Multi-Layer Security Firewall Engine & Interactive Defense Inspector
- **Focus:** Engineered and deployed a practical, multi-layer security firewall layer spanning both backend Express gateway and React frontend, proving security is deeply integrated into application architecture:
  1. **Backend Multi-Layer Security Firewall Engine (`server/middleware/firewall.js`):**
     - Enforces an 8-stage zero-trust request processing pipeline:
       - Layer 1: Identity & Origin Verification (whitelisted CORS, client IP tracking, security headers).
       - Layer 2: Cryptographic Authentication (signed JWT token validation and expiry check).
       - Layer 3: Role-Based Access Control / RBAC (enforces Patient, Doctor, and Admin capability boundaries).
       - Layer 4: Patient-Doctor Relationship & IDOR Authorization (blocks unauthorized cross-patient data probes).
       - Layer 5: Deep Input Validation & Injection Threat Defense (intercepts XSS scripts, SQL injection keywords, MongoDB operator injection, and directory traversal).
       - Layer 6: Rate Limiting & Velocity Defense (sliding-window anti-brute force and DDoS mitigation).
       - Layer 7: Secure API Minimum Data Projection (least-privilege masking of sensitive backend fields, credentials, and paths).
       - Layer 8: Immutable Audit Logging (real-time recording of security events with status, actor, IP, and timestamp).
     - Mounted globally in `server/server.js` via `careGuardFirewall`.
     - Provided simulated firewall execution endpoint `POST /api/security/firewall/simulate-request`.
  2. **Frontend Route Protection & Access Denied UI (`src/components/RoleGuard.jsx`):**
     - Wraps role-scoped routes in `src/App.jsx` (`/doctor/*`, `/patient/*`, `/admin/*`).
     - Renders standardized `🔴 Access Denied / 🔒 Access Restricted` UI when unauthorized access is attempted, detailing the attempted resource, authenticated identity, current vs required role, and firewall rule violation.
  3. **Interactive Security Firewall Inspector (`src/components/SecurityFirewallInspector.jsx`):**
     - High-fidelity visual dashboard rendering the 8-layer inspection pipeline in real time.
     - 6 one-click evaluation attack scenarios: Legitimate Patient Request, Authorized Doctor Consultation, Doctor Cross-Patient IDOR Attack, Privilege Escalation Attempt, XSS Script Injection, and Velocity Flood.
     - Custom request builder allowing evaluators to simulate arbitrary roles, target patient IDs, and payloads.
     - Embedded in `src/pages/SecurityCenter.jsx` and accessible via `HackathonDemoGuide.jsx`.
- **Resolution:** Full Vite production build verified (`✓ 2590 modules transformed, 0 errors, built in 8.39s`). Backend live test confirmed Layer 5 threat interception and Layer 4 IDOR blocking.

---

## 6. Testing, Security Verification & Deployment Record

### 6.1 Testing & Security Verification Strategy
- **Build Verification:** Tested with `npm run build` using Vite production bundler (`0 errors`).
- **Firewall Pipeline Verification:** Tested with live Node.js automated probes for Layer 5 XSS detection (`MALICIOUS_INPUT_BLOCKED`) and Layer 4 authorization verification.
- **State Integrity:** LocalStorage sync validated for appointment creation, rescheduling, cancellation, and medical record saving.
- **Access Audit Verification:** Confirmed that every medical record and firewall event contains tamper-evident access log history.



