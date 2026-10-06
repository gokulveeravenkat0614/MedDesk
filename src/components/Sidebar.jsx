import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, Users, FileText, UserCheck,
  Stethoscope, ShieldAlert, Settings, LogOut, Clock,
  ShieldCheck, ChevronRight, X, Shield, Lock, Activity,
  User, CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar = ({ isMobileOpen, onCloseMobile }) => {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const getNavigationGroups = () => {
    if (currentUser?.role === 'patient') {
      return [
        {
          group: 'MAIN',
          links: [
            { name: 'Dashboard', path: '/patient/dashboard', icon: LayoutDashboard },
            { name: 'Appointments', path: '/patient/appointments', icon: Calendar },
            { name: 'Find Doctors', path: '/patient/doctors', icon: Stethoscope },
          ]
        },
        {
          group: 'HEALTH',
          links: [
            { name: 'Medical Records', path: '/patient/records', icon: FileText },
            { name: 'Health Overview', path: '/patient/profile', icon: Activity },
          ]
        },
        {
          group: 'SECURITY',
          links: [
            { name: 'Access History', path: '/security-center', icon: ShieldCheck },
          ]
        },
        {
          group: 'ACCOUNT',
          links: [
            { name: 'Profile', path: '/patient/profile', icon: User },
            { name: 'Settings', path: '/settings', icon: Settings },
          ]
        }
      ];
    }

    if (currentUser?.role === 'admin') {
      return [
        {
          group: 'MAIN',
          links: [
            { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
            { name: 'Doctors', path: '/admin/doctors', icon: Stethoscope },
            { name: 'Patients', path: '/admin/patients', icon: Users },
            { name: 'Appointments', path: '/admin/appointments', icon: Calendar },
          ]
        },
        {
          group: 'SECURITY',
          links: [
            { name: 'Audit Logs', path: '/admin/audit-logs', icon: ShieldAlert },
            { name: 'Access Control', path: '/security-center', icon: Lock },
            { name: 'Security Status', path: '/admin/dashboard', icon: ShieldCheck },
          ]
        },
        {
          group: 'SYSTEM',
          links: [
            { name: 'Settings', path: '/settings', icon: Settings },
          ]
        }
      ];
    }

    // Default: Doctor
    return [
      {
        group: 'MAIN',
        links: [
          { name: 'Dashboard', path: '/doctor/dashboard', icon: LayoutDashboard },
          { name: 'Appointments', path: '/doctor/appointments', icon: Calendar },
          { name: 'Patients', path: '/doctor/patients', icon: Users },
        ]
      },
      {
        group: 'CLINICAL',
        links: [
          { name: 'Medical Records', path: '/doctor/records', icon: FileText },
          { name: 'Schedule', path: '/doctor/schedule', icon: Clock },
        ]
      },
      {
        group: 'SECURITY',
        links: [
          { name: 'Authorized Access', path: '/doctor/records', icon: ShieldCheck },
          { name: 'Activity Log', path: '/security-center', icon: Activity },
        ]
      },
      {
        group: 'ACCOUNT',
        links: [
          { name: 'Profile', path: '/doctor/dashboard', icon: User },
          { name: 'Settings', path: '/settings', icon: Settings },
        ]
      }
    ];
  };

  const navGroups = getNavigationGroups();

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

      {/* Sidebar Container: Width ~240-250px, subtle border, compact and organized */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[245px] bg-white border-r border-slate-200 shadow-xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:w-[245px] lg:shrink-0 lg:self-start lg:sticky lg:top-[90px] lg:rounded-2xl lg:border lg:border-slate-200 lg:shadow-xs lg:overflow-hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col`}
      >
        {/* Mobile Header with close button */}
        <div className="flex items-center justify-between p-3.5 lg:hidden border-b border-slate-100">
          <span className="font-extrabold text-base text-slate-800">
            Care<span className="text-[#1677FF]">Guard</span>
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
              className="w-9 h-9 rounded-lg object-cover ring-2 ring-[#1677FF]/20 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 truncate">
                {currentUser?.name || 'Rahul Kumar'}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 security-dot-active shrink-0"></span>
                <span className="text-[10px] font-bold text-[#1677FF] uppercase tracking-wider truncate">
                  {currentUser?.role === 'patient' ? 'Patient Portal' : currentUser?.role === 'doctor' ? 'Doctor Portal' : 'Admin Portal'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Grouped Navigation Links */}
        <nav className="px-2 py-1 space-y-3 overflow-y-auto max-h-[calc(100vh-280px)]">
          {navGroups.map((group) => (
            <div key={group.group} className="space-y-0.5">
              <div className="px-2.5 py-0.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                {group.group}
              </div>
              {group.links.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name + item.path}
                    to={item.path}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      `relative flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 ${
                        isActive
                          ? 'bg-[#EAF4FF] text-[#1677FF] shadow-xs pl-3.5 font-extrabold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-[#1677FF]'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Small Left Blue Indicator for active state */}
                        {isActive && (
                          <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#1677FF] rounded-r-full" />
                        )}
                        <div className="flex items-center gap-2.5 truncate">
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#1677FF]' : 'text-slate-400'}`} />
                          <span className="truncate">{item.name}</span>
                        </div>
                        {isActive && <ChevronRight className="w-3 h-3 text-[#1677FF]/80 shrink-0" />}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom Section: Secure Session / Admin Access + Logout */}
        <div className="mt-auto p-2.5 border-t border-slate-100 space-y-2 bg-slate-50/50">
          <div className="px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 flex items-center justify-between text-[10px] font-bold text-emerald-800">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{currentUser?.role === 'admin' ? 'Admin Access' : 'Secure Session'}</span>
            </div>
            <span className="text-[9px] text-emerald-600 bg-emerald-100/80 px-1.5 py-0.5 rounded">Active</span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors border border-transparent hover:border-rose-200/60"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
