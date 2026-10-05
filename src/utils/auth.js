import { getCurrentUser, setCurrentUser, clearCurrentUser } from './storage';

export const DEMO_ACCOUNTS = {
  patient: {
    id: "pat-1",
    name: "Rahul Kumar",
    email: "patient@careguard.demo",
    role: "patient",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80",
    phone: "+91 98765 43210",
    bloodGroup: "O+",
    age: 28,
  },
  doctor: {
    id: "doc-1",
    name: "Dr. Arjun Mehta",
    email: "doctor@careguard.demo",
    role: "doctor",
    specialty: "General Physician",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80",
    department: "Internal Medicine",
  },
  admin: {
    id: "adm-1",
    name: "Chief Admin (Superuser)",
    email: "admin@careguard.demo",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    title: "Clinic Operations Director",
  }
};

export const loginWithRole = (role) => {
  const account = DEMO_ACCOUNTS[role] || DEMO_ACCOUNTS.doctor;
  setCurrentUser(account);
  return account;
};

export const loginWithCredentials = (email, password, role) => {
  // Demo authentication allows any password
  if (role && DEMO_ACCOUNTS[role]) {
    const user = { ...DEMO_ACCOUNTS[role], email: email || DEMO_ACCOUNTS[role].email };
    setCurrentUser(user);
    return user;
  }
  
  // Match by email if role not explicitly matched
  const lowerEmail = (email || '').toLowerCase();
  if (lowerEmail.includes('admin')) {
    const user = DEMO_ACCOUNTS.admin;
    setCurrentUser(user);
    return user;
  } else if (lowerEmail.includes('doctor')) {
    const user = DEMO_ACCOUNTS.doctor;
    setCurrentUser(user);
    return user;
  } else {
    const user = { ...DEMO_ACCOUNTS.patient, email: email || DEMO_ACCOUNTS.patient.email };
    setCurrentUser(user);
    return user;
  }
};

export const logoutUser = () => {
  clearCurrentUser();
};
