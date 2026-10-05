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
MediDesk is engineered using a modular, decoupled Single Page Application (SPA) architecture built on **React 18** and **Vite**, with high-performance responsive styling powered by **Tailwind CSS**.

```
┌───────────────────────────────────────────────────────────────┐
│                    MediDesk Client Interface                  │
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
| **Phase 4: Admin, Assistant & Polish** | 16h – 22h | Admin registry tables, MediDesk AI FAQ assistant, notification engine, responsive polish | Build verification & zero console errors | `Completed` |
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

---

## 6. Testing, Security Verification & Deployment Record

### 6.1 Testing & Security Verification Strategy
- **Build Verification:** Tested with `npm run build` using Vite production bundler.
- **State Integrity:** LocalStorage sync validated for appointment creation, rescheduling, cancellation, and medical record saving.
- **Access Audit Verification:** Confirmed that every medical record contains tamper-evident access log history.
