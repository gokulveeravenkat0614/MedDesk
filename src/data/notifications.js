export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    userId: "pat-1",
    role: "patient",
    title: "Appointment Reminder",
    message: "Your appointment with Dr. Arjun Mehta is tomorrow at 10:30 AM.",
    time: "10 minutes ago",
    read: false,
    type: "reminder",
    link: "/patient/appointments"
  },
  {
    id: "notif-2",
    userId: "pat-1",
    role: "patient",
    title: "Appointment Confirmed",
    message: "Your appointment with Dr. Arjun Mehta (MD-2026-00101) has been confirmed.",
    time: "2 hours ago",
    read: false,
    type: "confirmation",
    link: "/patient/appointments"
  },
  {
    id: "notif-3",
    userId: "pat-1",
    role: "patient",
    title: "Medical Record Updated",
    message: "Your Complete Blood Count (CBC) lab review was updated by Dr. Arjun Mehta.",
    time: "Today, 09:45 AM",
    read: true,
    type: "record",
    link: "/patient/records"
  },
  {
    id: "notif-4",
    userId: "pat-1",
    role: "patient",
    title: "Doctor Availability",
    message: "Dr. Priya Sharma is now available for consultations tomorrow.",
    time: "Yesterday",
    read: true,
    type: "availability",
    link: "/patient/doctors"
  },
  {
    id: "notif-5",
    userId: "doc-1",
    role: "doctor",
    title: "New Patient Booked",
    message: "Rahul Kumar booked a General Consultation for 10:30 AM.",
    time: "1 hour ago",
    read: false,
    type: "booking",
    link: "/doctor/appointments"
  },
  {
    id: "notif-6",
    userId: "admin-1",
    role: "admin",
    title: "Security Audit Event",
    message: "Privacy Access Log verified: 24 patient records accessed under strict RBAC.",
    time: "30 minutes ago",
    read: false,
    type: "security",
    link: "/admin/dashboard"
  }
];
