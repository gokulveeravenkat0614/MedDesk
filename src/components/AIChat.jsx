import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare, Sparkles, X, Send, Bot, User,
  HelpCircle, ShieldAlert, ArrowRight, ShieldCheck, Shield
} from 'lucide-react';
import { CareGuardLogo } from './CareGuardLogo';

const PREDEFINED_QA = [
  {
    trigger: "How do I book an appointment?",
    answer: "To book an appointment: Navigate to 'Find Doctors' or click 'Book Appointment' from your dashboard. Select your physician, choose an available date and time slot, choose your consultation type, and confirm!"
  },
  {
    trigger: "How do I reschedule?",
    answer: "Go to 'Appointments' from your sidebar or dashboard, locate the scheduled visit, click 'Reschedule', pick a new available clinical slot from the calendar, and save your update."
  },
  {
    trigger: "Where can I find my medical records?",
    answer: "Visit the 'Medical Records' tab from the navigation sidebar. You can inspect your consultation notes, diagnostic findings, and prescriptions under verified access controls."
  },
  {
    trigger: "How do I find a doctor?",
    answer: "Open 'Find Doctors' from the sidebar to browse available clinicians by medical specialty (General Medicine, Cardiology, Dermatology, Pediatrics, etc.) and inspect their real-time availability."
  },
  {
    trigger: "How do I cancel an appointment?",
    answer: "Go to 'Appointments', locate the upcoming appointment, and click 'Cancel'. You will receive immediate confirmation and the clinic schedule will be updated automatically."
  }
];

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I am CareGuard AI, your CareGuard assistant. How can I help you today?",
      time: 'Just now'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    // Predefined AI response matching logic
    setTimeout(() => {
      let botResponse = "I can guide you through CareGuard! Ask me how to book appointments, reschedule visits, view medical records, or find authorized doctors.";
      
      const qLower = query.toLowerCase();
      if (qLower.includes('book') || qLower.includes('new appointment')) {
        botResponse = PREDEFINED_QA[0].answer;
      } else if (qLower.includes('reschedule') || qLower.includes('change date') || qLower.includes('change time')) {
        botResponse = PREDEFINED_QA[1].answer;
      } else if (qLower.includes('record') || qLower.includes('report') || qLower.includes('prescription') || qLower.includes('lab')) {
        botResponse = PREDEFINED_QA[2].answer;
      } else if (qLower.includes('find') || qLower.includes('doctor') || qLower.includes('specialist')) {
        botResponse = PREDEFINED_QA[3].answer;
      } else if (qLower.includes('cancel')) {
        botResponse = PREDEFINED_QA[4].answer;
      } else if (qLower.includes('diagnos') || qLower.includes('pain') || qLower.includes('illness') || qLower.includes('symptom')) {
        botResponse = "CareGuard AI is strictly an application navigation assistant and cannot provide medical diagnoses or treatment advice. Please consult an authorized physician for clinical concerns.";
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 350);
  };

  return (
    <>
      {/* Floating CTA Button (CareGuard AI with Shield + Sparkle) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-primary via-blue-600 to-[#06B6D4] hover:from-blue-600 hover:to-sky-500 text-white font-bold text-xs shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-200 border border-white/30"
          aria-label="CareGuard AI"
        >
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-cyan-200" />
            <Sparkles className="w-3.5 h-3.5 text-white animate-spin-slow" />
          </div>
          <span>CareGuard AI</span>
        </button>
      </div>

      {/* Floating Chat Modal Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 max-h-[580px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-primary to-blue-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
                <Shield className="w-4 h-4 text-cyan-200" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-none">CareGuard AI</h4>
                <span className="text-[10px] text-blue-100 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Your CareGuard Assistant
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl hover:bg-white/10 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Medical Disclaimer Banner */}
          <div className="px-3.5 py-2.5 bg-amber-50 border-b border-amber-200/60 flex items-center gap-2 text-[10px] text-amber-800 font-medium">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>
              CareGuard AI provides general application assistance and is not a medical diagnosis tool.
            </span>
          </div>

          {/* Chat Messages Stream */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-50/50 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-blue-100 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-primary text-white rounded-tr-none shadow-sm shadow-blue-500/20'
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-100 shadow-xs'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                  <span
                    className={`text-[9px] mt-1 block ${
                      m.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                    }`}
                  >
                    {m.time}
                  </span>
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestions (5 Requested Questions) */}
          <div className="p-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto scrollbar-none">
            {PREDEFINED_QA.map((qa, i) => (
              <button
                key={i}
                onClick={() => handleSend(qa.trigger)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-primary text-[10px] font-medium text-slate-600 whitespace-nowrap transition-colors"
              >
                {qa.trigger}
              </button>
            ))}
          </div>

          {/* Message Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask CareGuard AI about appointments..."
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-primary hover:bg-primary-hover text-white transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
