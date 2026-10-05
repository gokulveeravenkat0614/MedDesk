export const ANATOMY_SYSTEMS = [
  {
    id: "brain",
    name: "Brain & Nervous System",
    shortName: "Nervous System",
    color: "#8B5CF6",
    status: "Optimal",
    position: { top: "12%", left: "15%", labelSide: "left" },
    pointerCoords: { x: 50, y: 15 },
    vitals: [
      { label: "Cognitive Status", value: "Alert & Oriented x4" },
      { label: "Reflex Response", value: "2+ Bilateral Normal" },
      { label: "Neurological Score", value: "15/15 (GCS)" },
      { label: "Cranial Nerves", value: "Intact (I - XII)" }
    ],
    summary: "Normal cerebral blood flow, zero reported syncope or sensory deficits. Synaptic and motor responses show unimpaired conduction.",
    lastAssessed: "Oct 05, 2026",
    doctor: "Dr. Ananya Rao"
  },
  {
    id: "respiratory",
    name: "Respiratory System",
    shortName: "Respiratory",
    color: "#06B6D4",
    status: "Clear",
    position: { top: "28%", left: "80%", labelSide: "right" },
    pointerCoords: { x: 50, y: 32 },
    vitals: [
      { label: "Oxygen Saturation (SpO2)", value: "98% on Ambient Air" },
      { label: "Respiratory Rate", value: "16 breaths/min" },
      { label: "Lung Sounds", value: "Clear Vesicular" },
      { label: "Peak Expiratory Flow", value: "520 L/min" }
    ],
    summary: "Bilateral air entry adequate without wheezing, crackles, or stridor. Diaphragmatic excursion symmetrical.",
    lastAssessed: "Oct 05, 2026",
    doctor: "Dr. Arjun Mehta"
  },
  {
    id: "cardiovascular",
    name: "Cardiovascular System",
    shortName: "Cardiovascular",
    color: "#EF4444",
    status: "Normal",
    position: { top: "38%", left: "12%", labelSide: "left" },
    pointerCoords: { x: 53, y: 37 },
    vitals: [
      { label: "Heart Rate", value: "72 BPM" },
      { label: "Blood Pressure", value: "120/80 mmHg" },
      { label: "Mean Arterial Pressure", value: "93 mmHg" },
      { label: "Rhythm", value: "Regular Sinus Rhythm" }
    ],
    summary: "S1/S2 audible, no murmurs, rubs, or gallops detected. Peripheral pulses 2+ strong and symmetrical bilaterally.",
    lastAssessed: "Oct 05, 2026",
    doctor: "Dr. Priya Sharma"
  },
  {
    id: "digestive",
    name: "Digestive System",
    shortName: "Digestive",
    color: "#F59E0B",
    status: "Normal",
    position: { top: "54%", left: "80%", labelSide: "right" },
    pointerCoords: { x: 50, y: 52 },
    vitals: [
      { label: "Bowel Sounds", value: "Normoactive (All 4 quadrants)" },
      { label: "Abdominal Palpation", value: "Soft, Non-tender" },
      { label: "Liver Span", value: "9.5 cm (Normal)" },
      { label: "Hydration Balance", value: "Optimal" }
    ],
    summary: "Zero organomegaly, no peritoneal signs or guarding. Synthetic metabolic panel enzymes within standard physiological thresholds.",
    lastAssessed: "Oct 04, 2026",
    doctor: "Dr. Arjun Mehta"
  },
  {
    id: "musculoskeletal",
    name: "Musculoskeletal System",
    shortName: "Musculoskeletal",
    color: "#10B981",
    status: "Healthy",
    position: { top: "72%", left: "15%", labelSide: "left" },
    pointerCoords: { x: 50, y: 70 },
    vitals: [
      { label: "Muscle Strength", value: "5/5 Full Against Resistance" },
      { label: "Range of Motion", value: "Full, Pain-free" },
      { label: "Joint Stability", value: "Stable, No Effusion" },
      { label: "Spine Alignment", value: "Physiological Curvature" }
    ],
    summary: "Normal posture and gait kinematics. Zero joint crepitus or inflammatory swelling observed in major axial and appendicular articulations.",
    lastAssessed: "Oct 03, 2026",
    doctor: "Dr. Arjun Mehta"
  }
];
