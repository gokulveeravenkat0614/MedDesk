import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CareGuardLogo } from './CareGuardLogo';

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-slate-200/80 bg-white/60 backdrop-blur-md pt-10 pb-8 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <CareGuardLogo size="md" showText={true} />
            <p className="text-slate-500 text-xs max-w-sm leading-relaxed mt-2">
              Your Care. Your Appointments. Protected. Complete outpatient healthcare operations platform with simulated access controls and biometrics visualization.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/60 w-fit">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Designed with privacy-focused access controls for demonstration.</span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/doctor/dashboard" className="hover:text-primary transition-colors">Overview</Link></li>
              <li><Link to="/patient/appointments" className="hover:text-primary transition-colors">Appointments</Link></li>
              <li><Link to="/patient/doctors" className="hover:text-primary transition-colors">Doctors</Link></li>
              <li><Link to="/doctor/patients" className="hover:text-primary transition-colors">Patients</Link></li>
              <li><Link to="/patient/records" className="hover:text-primary transition-colors">Medical Records</Link></li>
            </ul>
          </div>

          {/* Security Links */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">
              Security
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/settings" className="hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link to="/settings" className="hover:text-primary transition-colors">Access Control</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-primary transition-colors">Audit Logs</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">
              Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/settings" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/settings" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Text (Section requirement) */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p className="font-medium text-slate-600">
            © 2026 CareGuard • Secure Clinic & Appointment Management
          </p>
          <p className="font-medium text-slate-500">
            Demo application using synthetic data only.
          </p>
        </div>

      </div>
    </footer>
  );
};
