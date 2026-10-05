export const INITIAL_MEDICAL_RECORDS = [
  {
    id: "rec-101",
    patientId: "pat-1",
    patientName: "Rahul Kumar",
    doctorId: "doc-1",
    doctorName: "Dr. Arjun Mehta",
    doctorSpecialty: "General Physician",
    recordType: "Lab Report",
    subType: "Blood Test",
    date: "Oct 05, 2026",
    title: "Complete Blood Count (CBC) Panel",
    summary: "Hemoglobin: 13.8 g/dL (Normal). Platelets: 245,000 /uL. WBC count: 6,400 /uL. No signs of systemic infection.",
    details: {
      hemoglobin: "13.8 g/dL",
      rbc: "4.8 mil/uL",
      platelets: "245,000 /uL",
      wbc: "6,400 /uL",
      esr: "12 mm/hr",
      bloodGlucoseFasting: "94 mg/dL",
    },
    diagnosis: "Healthy Hematologic Profile — Normal Reference Ranges",
    symptoms: "Fatigue following seasonal weather shift",
    prescription: [
      { medicine: "Multivitamin + Zinc Capsule", dosage: "1 cap daily after breakfast", duration: "30 days" },
      { medicine: "Vitamin D3 60,000 IU", dosage: "1 sachet weekly in warm milk", duration: "8 weeks" }
    ],
    recommendedTests: ["Annual Lipid Profile in 6 months"],
    followUpDate: "2026-11-05",
    accessStatus: "Authorized Access",
    authorizedDoctors: ["doc-1", "doc-2"],
    accessLogs: [
      { doctorName: "Dr. Arjun Mehta", action: "Viewed medical record", timestamp: "Today, 10:32 AM", ip: "192.168.1.42 (Internal Clinic VLAN)" },
      { doctorName: "Dr. Arjun Mehta", action: "Created CBC lab review entry", timestamp: "Today, 09:45 AM", ip: "192.168.1.42 (Internal Clinic VLAN)" }
    ]
  },
  {
    id: "rec-102",
    patientId: "pat-2",
    patientName: "Priya Sharma",
    doctorId: "doc-1",
    doctorName: "Dr. Arjun Mehta",
    doctorSpecialty: "General Physician",
    recordType: "Prescription",
    subType: "Follow-up",
    date: "Oct 04, 2026",
    title: "Post-Viral Bronchial Recovery Prescription",
    summary: "Prescription • Follow-up. Amoxicillin course completed. Residual airway sensitivity being managed with inhalant.",
    details: {
      peakFlow: "390 L/min",
      chestAuscultation: "Bilateral vesicular breath sounds, no rales",
      temperature: "98.6 °F",
    },
    diagnosis: "Convalescent Stage Acute Bronchitis — Resolving",
    symptoms: "Mild dry cough upon exertion",
    prescription: [
      { medicine: "Levocetirizine 5mg", dosage: "1 tablet at bedtime", duration: "5 days" },
      { medicine: "Steam Inhalation with Menthol", dosage: "Twice daily", duration: "7 days" }
    ],
    recommendedTests: ["Spirometry review if cough exceeds 2 weeks"],
    followUpDate: "2026-10-18",
    accessStatus: "Authorized Access",
    authorizedDoctors: ["doc-1", "doc-3"],
    accessLogs: [
      { doctorName: "Dr. Arjun Mehta", action: "Viewed medical record", timestamp: "Oct 04, 2026, 04:15 PM", ip: "192.168.1.42 (Internal Clinic VLAN)" }
    ]
  },
  {
    id: "rec-103",
    patientId: "pat-3",
    patientName: "Aditya Rao",
    doctorId: "doc-1",
    doctorName: "Dr. Arjun Mehta",
    doctorSpecialty: "General Physician",
    recordType: "Consultation Notes",
    subType: "Cardiovascular Screen",
    date: "Oct 03, 2026",
    title: "Hypertension Routine Maintenance Examination",
    summary: "Consultation Notes. BP 128/84 mmHg. Resting heart rate 74 bpm. Lifestyle and low-sodium dietary counseling provided.",
    details: {
      bloodPressure: "128/84 mmHg",
      bmi: "25.1 kg/m²",
      serumCreatinine: "0.9 mg/dL",
      potassium: "4.3 mEq/L"
    },
    diagnosis: "Stage 1 Essential Hypertension (Well Controlled)",
    symptoms: "None reported. Asymptomatic checkup.",
    prescription: [
      { medicine: "Telmisartan 40mg", dosage: "1 tablet early morning", duration: "90 days" },
      { medicine: "Amlodipine 2.5mg (Emergency PRN)", dosage: "If systolic > 150 mmHg", duration: "PRN" }
    ],
    recommendedTests: ["Quarterly Kidney Function Test", "Lipid Panel"],
    followUpDate: "2026-12-03",
    accessStatus: "Authorized Access",
    authorizedDoctors: ["doc-1", "doc-2"],
    accessLogs: [
      { doctorName: "Dr. Arjun Mehta", action: "Viewed medical record", timestamp: "Oct 03, 2026, 02:40 PM", ip: "192.168.1.42 (Internal Clinic VLAN)" }
    ]
  },
  {
    id: "rec-104",
    patientId: "pat-1",
    patientName: "Rahul Kumar",
    doctorId: "doc-2",
    doctorName: "Dr. Priya Sharma",
    doctorSpecialty: "Cardiologist",
    recordType: "Diagnosis",
    subType: "Cardiology",
    date: "Sep 28, 2026",
    title: "Baseline Resting 12-Lead Electrocardiogram",
    summary: "Resting ECG demonstrates normal sinus rhythm at 72 bpm, normal axis, no ischemic ST-T abnormalities.",
    details: {
      prInterval: "152 ms",
      qrsDuration: "86 ms",
      qtcBazzet: "412 ms",
      ejectionFraction: "64%"
    },
    diagnosis: "Normal Electrocardiogram — Healthy Cardiac Function",
    symptoms: "Pre-gym workout fitness assessment",
    prescription: [
      { medicine: "Omega-3 Fatty Acids 1000mg", dosage: "1 softgel daily with lunch", duration: "60 days" }
    ],
    recommendedTests: ["Treadmill Stress Test (TMT) elective in 12 months"],
    followUpDate: "2027-03-28",
    accessStatus: "Authorized Access",
    authorizedDoctors: ["doc-1", "doc-2"],
    accessLogs: [
      { doctorName: "Dr. Priya Sharma", action: "Uploaded ECG diagnostic report", timestamp: "Sep 28, 2026, 03:10 PM", ip: "192.168.1.18 (Cardiology VLAN)" }
    ]
  },
  {
    id: "rec-105",
    patientId: "pat-5",
    patientName: "Kiran Patel",
    doctorId: "doc-3",
    doctorName: "Dr. Rahul Verma",
    doctorSpecialty: "Dermatologist",
    recordType: "Lab Report",
    subType: "Dermatology",
    date: "Sep 22, 2026",
    title: "Skin Allergen Patch Test Evaluation",
    summary: "Contact sensitivity screening revealed localized reactivity to rubber accelerators; negative to nickel and fragrances.",
    details: {
      patchTestResult: "Positive (+1) to Mercapto Mix",
      erythemaGrade: "Mild",
      induration: "Absent"
    },
    diagnosis: "Mild Contact Dermatitis secondary to Synthetic Rubber / Latex",
    symptoms: "Erythematous pruritic macules on volar forearms",
    prescription: [
      { medicine: "Hydrocortisone 1% Cream", dosage: "Apply thin film twice daily for 5 days", duration: "5 days" },
      { medicine: "Ceramide Moisturizing Lotion", dosage: "Apply generously post bathing", duration: "Ongoing" }
    ],
    recommendedTests: ["Follow-up review in 4 weeks"],
    followUpDate: "2026-10-22",
    accessStatus: "Authorized Access",
    authorizedDoctors: ["doc-3"],
    accessLogs: [
      { doctorName: "Dr. Rahul Verma", action: "Viewed medical record", timestamp: "Sep 22, 2026, 05:00 PM", ip: "192.168.1.75 (Dermatology VLAN)" }
    ]
  }
];
