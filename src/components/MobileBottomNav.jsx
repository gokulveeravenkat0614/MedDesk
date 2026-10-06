import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Stethoscope, FileText, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MobileBottomNav = () => {
  const { currentUser } = useApp();

  // Only render for patients on mobile devices
  if (currentUser?.role !== 'patient') return null;

  const navItems = [
    { name: 'Home', path: '/patient/dashboard', icon: LayoutDashboard },
    { name: 'Appointments', path: '/patient/appointments', icon: Calendar },
    { name: 'Doctors', path: '/patient/doctors', icon: Stethoscope },
    { name: 'Records', path: '/patient/records', icon: FileText },
    { name: 'Profile', path: '/patient/profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-lg lg:hidden px-2 py-1.5 transition-all">
      <div className="max-w-md mx-auto grid grid-cols-5 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
                  isActive
                    ? 'text-[#1677FF] font-bold'
                    : 'text-slate-400 hover:text-slate-600 font-medium'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 transition-transform ${
                      isActive ? 'text-[#1677FF] scale-110' : 'text-slate-400'
                    }`}
                  />
                  <span
                    className={`text-[10px] mt-0.5 leading-tight ${
                      isActive ? 'text-[#1677FF] font-bold' : 'text-slate-500'
                    }`}
                  >
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
