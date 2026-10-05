import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Activity, Search, Bell, User, LogOut, Settings,
  ShieldCheck, Stethoscope, Menu, X, ChevronDown, Check,
  Calendar, FileText, UserPlus, Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NotificationDropdown } from './NotificationDropdown';

export const Navbar = ({ onToggleMobileSidebar }) => {
  const { currentUser, logout, switchRole, patients, doctors, appointments, medicalRecords } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Search logic across patients, doctors, appointments, medical records
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matchedPatients = patients.filter(p => p.name.toLowerCase().includes(q) || p.phone.includes(q));
    const matchedDoctors = doctors.filter(d => d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q));
    const matchedAppointments = appointments.filter(a =>
      a.id.toLowerCase().includes(q) ||
      a.patientName.toLowerCase().includes(q) ||
      a.doctorName.toLowerCase().includes(q)
    );
    const matchedRecords = medicalRecords.filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.patientName.toLowerCase().includes(q) ||
      r.recordType.toLowerCase().includes(q)
    );

    setSearchResults({
      patients: matchedPatients,
      doctors: matchedDoctors,
      appointments: matchedAppointments,
      records: matchedRecords
    });
  }, [searchQuery, patients, doctors, appointments, medicalRecords]);

  // Click outside listener for search & profile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (!currentUser) return '/login';
    if (currentUser.role === 'patient') return '/patient/dashboard';
    if (currentUser.role === 'admin') return '/admin/dashboard';
    return '/doctor/dashboard';
  };

  return (
    <header className="glass-panel sticky top-[33px] z-40 border-b border-white/80 bg-white/75 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left: Mobile hamburger & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-primary hover:bg-blue-50/80 transition-colors"
              aria-label="Toggle Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to={getDashboardLink()} className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
                <Activity className="w-5 h-5 text-white stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 leading-none">
                  Medi<span className="text-primary font-black">Desk</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase mt-0.5">
                  Secure Clinic Management
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Global Search Bar */}
          <div className="flex-1 max-w-md hidden md:block relative" ref={searchRef}>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setShowSearchModal(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchModal(true);
                }}
                placeholder="Search patients, doctors, appointments, records..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-slate-100/80 border border-slate-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 placeholder:text-slate-400 text-slate-700"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {showSearchModal && searchResults && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 p-3 z-50 max-h-96 overflow-y-auto">
                {searchResults.patients.length === 0 &&
                 searchResults.doctors.length === 0 &&
                 searchResults.appointments.length === 0 &&
                 searchResults.records.length === 0 ? (
                  <div className="py-4 text-center text-xs text-slate-500">
                    No results found for "{searchQuery}"
                  </div>
                ) : (
                  <div className="space-y-3">
                    {searchResults.patients.length > 0 && (
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Patients</span>
                        <div className="mt-1 space-y-1">
                          {searchResults.patients.slice(0, 3).map(p => (
                            <div
                              key={p.id}
                              onClick={() => {
                                setShowSearchModal(false);
                                navigate('/doctor/patients');
                              }}
                              className="px-2.5 py-1.5 rounded-lg hover:bg-blue-50 text-xs flex items-center justify-between cursor-pointer"
                            >
                              <span className="font-semibold text-slate-800">{p.name}</span>
                              <span className="text-slate-400 text-[11px]">{p.bloodGroup} • {p.phone}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {searchResults.doctors.length > 0 && (
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Doctors</span>
                        <div className="mt-1 space-y-1">
                          {searchResults.doctors.map(d => (
                            <div
                              key={d.id}
                              onClick={() => {
                                setShowSearchModal(false);
                                navigate('/patient/doctors');
                              }}
                              className="px-2.5 py-1.5 rounded-lg hover:bg-blue-50 text-xs flex items-center justify-between cursor-pointer"
                            >
                              <span className="font-semibold text-primary">{d.name}</span>
                              <span className="text-slate-500 text-[11px]">{d.specialty}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {searchResults.appointments.length > 0 && (
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Appointments</span>
                        <div className="mt-1 space-y-1">
                          {searchResults.appointments.slice(0, 3).map(a => (
                            <div
                              key={a.id}
                              onClick={() => {
                                setShowSearchModal(false);
                                navigate(currentUser?.role === 'patient' ? '/patient/appointments' : '/doctor/appointments');
                              }}
                              className="px-2.5 py-1.5 rounded-lg hover:bg-blue-50 text-xs flex items-center justify-between cursor-pointer"
                            >
                              <span className="font-medium text-slate-700">{a.id} • {a.patientName}</span>
                              <span className="text-emerald-600 font-semibold text-[11px]">{a.time} ({a.status})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Quick actions, notifications, user avatar */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Notification Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:text-primary hover:bg-blue-50/80 transition-colors relative"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary ring-2 ring-white"></span>
              </button>
              {showNotifications && (
                <NotificationDropdown onClose={() => setShowNotifications(false)} />
              )}
            </div>

            {/* Quick Profile Dropdown */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    setShowNotifications(false);
                  }}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-2xl hover:bg-slate-100/70 border border-transparent hover:border-slate-200 transition-all text-left"
                >
                  <img
                    src={currentUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-xl object-cover ring-2 ring-primary/20"
                  />
                  <div className="hidden sm:flex flex-col">
                    <span className="text-xs font-semibold text-slate-800 leading-tight">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-primary font-medium capitalize">
                      {currentUser.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 p-2 z-50">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-primary uppercase">
                        {currentUser.role} mode
                      </span>
                    </div>

                    <div className="py-1">
                      {currentUser.role === 'patient' && (
                        <Link
                          to="/patient/profile"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          My Health Profile
                        </Link>
                      )}
                      <Link
                        to="/settings"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <Settings className="w-3.5 h-3.5 text-slate-400" />
                        Settings & Privacy
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-sm transition-all"
              >
                Sign In
              </Link>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
