import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass, ShieldAlert, CheckCircle2, XCircle, ArrowRight,
  User, Stethoscope, ShieldCheck, AlertTriangle, Eye, ChevronUp, ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { patientsAPI } from '../services/api';
import { Modal } from './Modal';

export const HackathonDemoGuide = () => {
  const { currentUser, switchRole, showToast } = useApp();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [showAccessDeniedModal, setShowAccessDeniedModal] = useState(false);
  const [probing, setProbing] = useState(false);

  // Step 1: Switch to Patient
  const handleStep1 = () => {
    switchRole('patient');
    navigate('/patient/dashboard');
    setActiveStep(2);
    showToast('Step 1: Authenticated as Patient. Viewing own appointments and health records.', 'info');
  };

  // Step 2: Switch to Doctor
  const handleStep2 = () => {
    switchRole('doctor');
    navigate('/doctor/dashboard');
    setActiveStep(3);
    showToast('Step 2: Authenticated as Doctor. Viewing assigned appointments and authorized patients.', 'info');
  };

  // Step 3: Trigger Access Denied (IDOR unauthorized probe)
  const handleStep3 = async () => {
    setProbing(true);
    try {
      // Attempt to access an unauthorized patient ID (e.g. pat-3 if user is doc-1 without assignment)
      await patientsAPI.getPatientProfile('pat-3');
    } catch (err) {
      // Expected HTTP 403 Forbidden!
      setShowAccessDeniedModal(true);
      setActiveStep(4);
      showToast('Step 3: Unauthorized patient access blocked by server-side RBAC barrier!', 'warning');
    } finally {
      setProbing(false);
    }
  };

  // Step 4: Switch to Admin Security Center
  const handleStep4 = () => {
    switchRole('admin');
    navigate('/security-center');
    setActiveStep(5);
    showToast('Step 4: Switched to Admin. Inspecting CareGuard Security Watch threat detection.', 'info');
  };

  // Step 5: View Audit Log
  const handleStep5 = () => {
    navigate('/admin/audit-logs');
    setActiveStep(1);
    showToast('Step 5: Inspecting immutable security audit log with recorded authorization failure.', 'success');
  };

  return (
    <>
      {/* Floating Demo Launcher Pill at Bottom Right */}
      <div className="fixed bottom-20 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white font-bold text-xs shadow-2xl border border-indigo-500/40 hover:border-indigo-400 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 group"
        >
          <Compass className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform" />
          <span>Evaluation Demo Flow</span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400" />}
        </button>

        {/* Guided Steps Flyout Drawer */}
        {isOpen && (
          <div className="absolute bottom-12 right-0 w-84 sm:w-96 rounded-3xl bg-white border border-slate-200/90 shadow-2xl p-5 text-slate-800 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <div>
                  <h4 className="font-black text-xs text-slate-900">CareGuard Security Flow</h4>
                  <p className="text-[10px] text-slate-500">5-Step Hackathon Judge Demonstration</p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-blue-50 text-primary px-2 py-0.5 rounded-full border border-blue-200">
                Step {activeStep} of 5
              </span>
            </div>

            {/* Step List */}
            <div className="space-y-2 text-xs">
              
              {/* Step 1 */}
              <div className={`p-2.5 rounded-2xl border transition-all ${
                activeStep === 1 ? 'bg-blue-50/80 border-blue-300 shadow-xs' : 'bg-slate-50 border-slate-200/60 opacity-80'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">1. Patient Experience</span>
                  <button
                    onClick={handleStep1}
                    className="px-2.5 py-1 rounded-xl bg-primary text-white font-bold text-[11px] shadow-xs hover:bg-blue-600 transition-colors"
                  >
                    Launch Patient
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Examine patient's own appointments and private health indicators.
                </p>
              </div>

              {/* Step 2 */}
              <div className={`p-2.5 rounded-2xl border transition-all ${
                activeStep === 2 ? 'bg-blue-50/80 border-blue-300 shadow-xs' : 'bg-slate-50 border-slate-200/60 opacity-80'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">2. Doctor Authorization</span>
                  <button
                    onClick={handleStep2}
                    className="px-2.5 py-1 rounded-xl bg-slate-900 text-white font-bold text-[11px] shadow-xs hover:bg-slate-800 transition-colors"
                  >
                    Launch Doctor
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Physician only sees explicitly assigned appointments and patients.
                </p>
              </div>

              {/* Step 3 */}
              <div className={`p-2.5 rounded-2xl border transition-all ${
                activeStep === 3 ? 'bg-rose-50/80 border-rose-300 shadow-xs' : 'bg-slate-50 border-slate-200/60 opacity-80'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-800">3. Trigger Access Denied</span>
                  <button
                    onClick={handleStep3}
                    disabled={probing}
                    className="px-2.5 py-1 rounded-xl bg-rose-600 text-white font-bold text-[11px] shadow-xs hover:bg-rose-700 transition-colors"
                  >
                    {probing ? 'Probing...' : 'Trigger IDOR'}
                  </button>
                </div>
                <p className="text-[11px] text-rose-600 mt-1">
                  Attempt to query unassigned patient (pat-3) to witness server-side rejection.
                </p>
              </div>

              {/* Step 4 */}
              <div className={`p-2.5 rounded-2xl border transition-all ${
                activeStep === 4 ? 'bg-amber-50/80 border-amber-300 shadow-xs' : 'bg-slate-50 border-slate-200/60 opacity-80'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-900">4. Security Watch Alert</span>
                  <button
                    onClick={handleStep4}
                    className="px-2.5 py-1 rounded-xl bg-amber-600 text-white font-bold text-[11px] shadow-xs hover:bg-amber-700 transition-colors"
                  >
                    Open Admin
                  </button>
                </div>
                <p className="text-[11px] text-amber-700 mt-1">
                  Admin portal surfaces real-time suspicious activity anomaly alert.
                </p>
              </div>

              {/* Step 5 */}
              <div className={`p-2.5 rounded-2xl border transition-all ${
                activeStep === 5 ? 'bg-emerald-50/80 border-emerald-300 shadow-xs' : 'bg-slate-50 border-slate-200/60 opacity-80'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900">5. Audit Trail Verification</span>
                  <button
                    onClick={handleStep5}
                    className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white font-bold text-[11px] shadow-xs hover:bg-emerald-700 transition-colors"
                  >
                    View Log
                  </button>
                </div>
                <p className="text-[11px] text-emerald-700 mt-1">
                  Inspect the permanent chronology record of the blocked probe.
                </p>
              </div>

            </div>

            <div className="p-2 rounded-xl bg-slate-100 text-[10px] text-slate-500 text-center">
              "Never trust the request. Always verify authorization before data access."
            </div>
          </div>
        )}
      </div>

      {/* Access Denied Modal (Section 10 of Prompt) */}
      <Modal
        isOpen={showAccessDeniedModal}
        onClose={() => setShowAccessDeniedModal(false)}
        title="Security Access Denied"
        size="md"
      >
        <div className="space-y-4 text-center py-2">
          <div className="w-16 h-16 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
            <XCircle className="w-9 h-9 stroke-[2.2]" />
          </div>

          <div>
            <h3 className="text-xl font-black text-slate-900">
              Access Denied
            </h3>
            <p className="text-xs text-rose-700 font-semibold mt-1">
              "You are not authorized to access this patient's information."
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Security Event:</span>
              <span className="font-mono font-bold text-rose-600">UNASSIGNED_PATIENT_ACCESS_BLOCKED</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Enforcement Layer:</span>
              <span className="font-bold text-slate-900">Backend Express RBAC Barrier</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Security Status:</span>
              <span className="font-bold text-emerald-600">Logged to Audit Trail</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed max-w-sm mx-auto">
            CareGuard does not expose whether this patient record exists or any clinical telemetry without verified clinical assignment.
          </p>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => {
                setShowAccessDeniedModal(false);
                navigate('/doctor/dashboard');
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
            >
              Return to Safe Dashboard
            </button>
            <button
              onClick={() => {
                setShowAccessDeniedModal(false);
                handleStep4();
              }}
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-blue-600 text-white font-bold text-xs transition-colors"
            >
              Inspect in Admin Center &rarr;
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
