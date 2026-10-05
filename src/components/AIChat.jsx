import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare, Sparkles, X, Send, Bot, User,
  HelpCircle, ShieldAlert, ArrowRight
} from 'lucide-react';

const PREDEFINED_QA = [
  {
    trigger: "How do I book an appointment?",
    answer: "To book an appointment: Navigate to 'Find Doctors' or click 'Book an Appointment' from the dashboard. Select your preferred physician, choose an available date and time slot, select your consultation type, and confirm!"
  },
  {
    trigger: "How can I cancel my appointment?",
    answer: "Go to 'My Appointments', locate the upcoming appointment, and click 'Cancel'. You will receive an instant confirmation and the clinic schedule will be updated automatically."
  },
  {
    trigger: "Where can I view my medical records?",
    answer: "Visit the 'Medical Records' tab from the sidebar. You can inspect your consultation notes, CBC blood tests, and doctor prescriptions. Each record displays verified RBAC access logs."
  },
  {
    trigger: "What does blood pressure 120/80 mean?",
    answer: "120/80 mmHg represents standard adult blood pressure. '120' is systolic pressure (arterial pressure when the heart beats) and '80' is diastolic pressure (pressure when resting between beats). Values within this range are generally considered clinically optimal."
  },
  {
    trigger: "Is my patient data private?",
    answer: "MediDesk operates strictly with synthetic simulated test data for hackathon demonstrations. Zero real protected health information (PHI) is collected or stored."
  }
];

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I am MediDesk AI, your clinic navigation assistant. How can I help you today?",
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
      let botResponse = "I can help guide you through MediDesk! You can ask about booking or cancelling appointments, finding doctors, or viewing synthetic medical records.";
      
      const qLower = query.toLowerCase();
      if (qLower.includes('book') || qLower.includes('schedule')) {
        botResponse = PREDEFINED_QA[0].answer;
      } else if (qLower.includes('cancel')) {
        botResponse = PREDEFINED_QA[1].answer;
      } else if (qLower.includes('record') || qLower.includes('report') || qLower.includes('lab')) {
        botResponse = PREDEFINED_QA[2].answer;
      } else if (qLower.includes('blood pressure') || qLower.includes('120/80') || qLower.includes('vitals')) {
        botResponse = PREDEFINED_QA[3].answer;
      } else if (qLower.includes('privacy') || qLower.includes('hipaa') || qLower.includes('security')) {
        botResponse = PREDEFINED_QA[4].answer;
      } else if (qLower.includes('diagnos') || qLower.includes('cure') || qLower.includes('pain') || qLower.includes('illness')) {
        botResponse = "MediDesk AI is strictly an administrative and informational assistant and cannot provide medical diagnosis or treatment advice. Please consult an authorized clinic physician for medical concerns.";
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 400);
  };

  return (
    <>
      {/* Floating CTA Button (Section 32 specification) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-blue-600 hover:to-sky-500 text-white font-bold text-xs shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-200 border border-white/30"
          aria-label="Ask MediDesk AI"
        >
          <Sparkles className="w-4 h-4 animate-spin-slow" />
          <span>Ask MediDesk AI</span>
        </button>
      </div>

      {/* Floating Chat Modal Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 max-h-[580px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-primary to-blue-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-none">MediDesk Assistant</h4>
                <span className="text-[10px] text-blue-100 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Online • Smart Guidance
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

          {/* Medical Disclaimer Banner (Strict Section 32 rule) */}
          <div className="px-3 py-2 bg-amber-50 border-b border-amber-200/60 flex items-center gap-2 text-[10px] text-amber-800 font-medium">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>
              MediDesk AI provides general navigation guidance. It is not a clinical diagnosis tool.
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
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-primary text-white rounded-br-none shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200/80 rounded-bl-none shadow-xs'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className={`text-[9px] mt-1 block text-right ${
                    m.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                  }`}>
                    {m.time}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Question Chips */}
          <div className="p-2 border-t border-slate-100 bg-white">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-1">
              Suggested Questions
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {PREDEFINED_QA.slice(0, 3).map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(item.trigger)}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-primary text-[11px] font-medium text-slate-600 whitespace-nowrap transition-colors shrink-0"
                >
                  {item.trigger}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputVal.trim()}
              className="p-2 rounded-xl bg-primary hover:bg-primary-hover disabled:opacity-50 text-white transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
