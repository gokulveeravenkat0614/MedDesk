import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, Users, FileText, UserCheck,
  Stethoscope, ShieldAlert, Settings, LogOut, Clock,
  ShieldCheck, ChevronRight, X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar = ({ isMobileOpen, onCloseMobile }) => {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const getNavigationLinks = () => {
    if (currentUser?.role === 'patient') {
      return [
        { name: 'Dashboard', path: '/patient/dashboard', icon: LayoutDashboard },
        { name: 'My Appointments', path: '/patient/appointments', icon: Calendar },
        { name: 'Find Doctors', path: '/patient/doctors', icon: Stethoscope },
        { name: 'Medical Records', path: '/patient/records', icon: FileText },
        { name: 'Health Profile', path: '/patient/profile', icon: UserCheck },
        { name: 'Security Center', path: '/security-center', icon: ShieldCheck },
        { name: 'Settings', path: '/settings', icon: Settings },
      ];
    }

    if (currentUser?.role === 'admin') {
      return [
        { name: 'Clinic Overview', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Patients Directory', path: '/admin/patients', icon: Users },
        { name: 'Doctors Directory', path: '/admin/doctors', icon: Stethoscope },
        { name: 'All Appointments', path: '/admin/appointments', icon: Calendar },
        { name: 'Audit Logs', path: '/admin/audit-logs', icon: ShieldAlert },
        { name: 'Security Center', path: '/security-center', icon: ShieldCheck },
        { name: 'Settings & Security', path: '/settings', icon: Settings },
      ];
    }

    // Default: Doctor
    return [
      { name: 'Overview', path: '/doctor/dashboard', icon: LayoutDashboard },
      { name: 'Appointments', path: '/doctor/appointments', icon: Calendar },
      { name: 'My Schedule', path: '/doctor/schedule', icon: Clock },
      { name: 'Patients', path: '/doctor/patients', icon: Users },
      { name: 'Records', path: '/doctor/records', icon: FileText },
      { name: 'Security Center', path: '/security-center', icon: ShieldCheck },
      { name: 'Settings', path: '/settings', icon: Settings },
    ];
  };

  const navLinks = getNavigationLinks();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container: Sleek, compact, sticky card without empty vertical void */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 shadow-xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:w-[220px] lg:shrink-0 lg:self-start lg:sticky lg:top-[90px] lg:rounded-2xl lg:border lg:border-slate-200/80 lg:shadow-xs lg:overflow-hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col`}
      >
        {/* Mobile Header with close button */}
        <div className="flex items-center justify-between p-3.5 lg:hidden border-b border-slate-100">
          <span className="font-extrabold text-base text-slate-800">
            Care<span className="text-[#0B63F6]">Guard</span>
          </span>
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Identity Card */}
        <div className="p-3 m-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
          <div className="flex items-center gap-2.5">
            <img
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
              alt={currentUser?.name || "User"}
              className="w-9 h-9 rounded-lg object-cover ring-2 ring-[#0B63F6]/20 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 truncate">
                {currentUser?.name || 'Rahul Kumar'}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 security-dot-active shrink-0"></span>
                <span className="text-[10px] font-bold text-[#0B63F6] uppercase tracking-wider truncate">
                  {currentUser?.role === 'patient' ? 'Authorized Patient' : currentUser?.role === 'doctor' ? 'Verified Physician' : 'Security Admin'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Navigation Links */}
        <nav className="px-2.5 py-1 space-y-0.5">
          <div className="px-2.5 py-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
            Navigation
          </div>
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 ${
                    isActive
                      ? 'bg-[#0B63F6] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-[#0B63F6]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span className="truncate">{item.name}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3 h-3 text-white/80 shrink-0" />}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Compact Role-Based Access Control Box */}
        <div className="p-2.5 m-2.5 mt-2 rounded-xl bg-slate-50 border border-slate-200/70">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800 mb-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0B63F6] shrink-0" />
            <span className="truncate">Role-Based Access Control</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            Protected patient workspace.
          </p>
        </div>

        {/* Sign Out Action */}
        <div className="px-2.5 pb-2.5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
