import React from 'react';
import { Activity, ShieldCheck, HeartHandshake, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-slate-200/80 bg-white/60 backdrop-blur-md pt-10 pb-8 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-xs">
                <Activity className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-base text-slate-900 tracking-tight">
                Medi<span className="text-primary">Desk</span>
              </span>
            </div>
            <p className="text-slate-500 text-xs max-w-md leading-relaxed">
              Secure Clinic & Appointment Management platform engineered with modern glassmorphism, responsive role-based access, and synthetic anatomical biometrics.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/60 w-fit">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Designed with privacy-focused access controls for demonstration.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">
              Application
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/doctor/dashboard" className="hover:text-primary transition-colors">Doctor Dashboard</Link></li>
              <li><Link to="/patient/dashboard" className="hover:text-primary transition-colors">Patient Portal</Link></li>
              <li><Link to="/patient/doctors" className="hover:text-primary transition-colors">Find a Doctor</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-primary transition-colors">Clinic Administration</Link></li>
            </ul>
          </div>

          {/* Compliance & Demo Legal */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">
              Prototype Notice
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
              This application is a prototype for demonstration purposes and does not store or process real patient information.
            </p>
            <div className="flex gap-3 text-[11px] text-slate-400">
              <Link to="/settings" className="hover:text-primary">Privacy</Link>
              <span>•</span>
              <Link to="/settings" className="hover:text-primary">Security</Link>
              <span>•</span>
              <Link to="/settings" className="hover:text-primary">Terms</Link>
              <span>•</span>
              <Link to="/settings" className="hover:text-primary">Support</Link>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>© 2026 MediDesk • Build Secure 24 Hackathon Edition • Team SecureForge (23A)</p>
          <p className="flex items-center gap-1">
            <span>Built live with React & Tailwind CSS</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
