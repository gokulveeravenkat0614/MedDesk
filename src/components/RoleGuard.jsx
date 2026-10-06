import React, { useEffect } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShieldAlert, Lock, ArrowLeft, ShieldCheck, AlertTriangle } from 'lucide-react';

/**
 * RoleGuard Component
 * Enforces CareGuard Layer 3: Role-Based Access Control (RBAC) & Layer 4: Authorization
 * 
 * Intercepts unauthorized navigation (e.g. Patient accessing Admin or Doctor console,
 * Doctor accessing Admin controls) and renders standardized access restriction screens.
 */
export const RoleGuard = ({ allowedRoles = [], children }) => {
  const { currentUser, notify } = useApp();
  const location = useLocation();

  useEffect(() => {
    if (currentUser && allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
      console.warn(`[CareGuard Firewall Layer 3] RBAC Block: ${currentUser.role} attempted to access ${location.pathname}`);
      notify(`Firewall Warning: Unauthorized access attempt to ${location.pathname} was blocked.`, 'warning');
    }
  }, [currentUser, location.pathname, allowedRoles]);

  // If user is not authenticated, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If current role is not in allowedRoles, render Access Denied UI
  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    const isDoctorAccessingAdmin = currentUser.role === 'doctor' && location.pathname.startsWith('/admin');
    const isPatientAccessingAdmin = currentUser.role === 'patient' && location.pathname.startsWith('/admin');
    const isPatientAccessingDoctor = currentUser.role === 'patient' && location.pathname.startsWith('/doctor');

    let denialReason = 'Doctor or user role is not authorized for this resource.';
    if (isPatientAccessingAdmin) denialReason = 'Patient account attempted to access privileged Admin Controls.';
    else if (isDoctorAccessingAdmin) denialReason = 'Doctor account does not have clinic administrative privileges.';
    else if (isPatientAccessingDoctor) denialReason = 'Patient account cannot access physician clinical workstation.';

    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-white rounded-3xl border border-rose-200 shadow-2xl p-8 relative overflow-hidden">
          {/* Background watermark badge */}
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <ShieldAlert className="w-48 h-48 text-rose-600" />
          </div>

          <div className="relative z-10 text-center">
            {/* Red Security Shield */}
            <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-50 border-2 border-rose-200 flex items-center justify-center text-rose-600 shadow-inner mb-6">
              <ShieldAlert className="w-10 h-10 animate-pulse" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black uppercase tracking-wider mb-3">
              <span>● Access Denied</span>
              <span>•</span>
              <span>Firewall Layer 3 Blocked</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
              Access Restricted
            </h1>

            <p className="text-sm font-medium text-slate-600 max-w-md mx-auto mb-6">
              This clinical or administrative endpoint is protected by CareGuard Multi-Layer Firewall.
              Protected information was not displayed.
            </p>

            {/* Diagnostic Block */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left mb-6 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-500 pb-2 border-b border-slate-200">
                <span className="font-semibold text-slate-700">Attempted Resource:</span>
                <code className="font-mono bg-slate-200 px-2 py-0.5 rounded text-slate-800">{location.pathname}</code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Authenticated Identity:</span>
                <span className="font-semibold text-slate-800">{currentUser.name} ({currentUser.email})</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Current Role:</span>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold uppercase">{currentUser.role}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Required Role(s):</span>
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold uppercase">{allowedRoles.join(' or ')}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 text-rose-600 font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Reason: {denialReason}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to={currentUser.role === 'patient' ? '/patient/dashboard' : currentUser.role === 'doctor' ? '/doctor/dashboard' : '/admin/dashboard'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-sm shadow-md transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to My Workspace</span>
              </Link>
              <Link
                to="/security-center"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Inspect Firewall Logs</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
};
