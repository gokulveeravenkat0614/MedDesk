import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Calendar, FileText, CheckCircle, Clock, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationDropdown = ({ onClose }) => {
  const { notifications, markNotificationAsRead } = useApp();
  const navigate = useNavigate();

  const getIcon = (type) => {
    switch (type) {
      case 'reminder':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'confirmation':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'record':
        return <FileText className="w-4 h-4 text-blue-500" />;
      default:
        return <Calendar className="w-4 h-4 text-primary" />;
    }
  };

  const handleItemClick = (notif) => {
    markNotificationAsRead(notif.id);
    onClose();
    if (notif.link) {
      navigate(notif.link);
    }
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
      <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-slate-800">Notifications</span>
          <span className="bg-blue-100 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {notifications.filter(n => !n.read).length} new
          </span>
        </div>
        <button
          onClick={() => {
            notifications.forEach(n => markNotificationAsRead(n.id));
          }}
          className="text-[11px] text-slate-400 hover:text-primary transition-colors"
        >
          Mark all as read
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto space-y-1.5">
        {notifications.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-400">
            No notifications at this time
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleItemClick(notif)}
              className={`p-2.5 rounded-xl transition-all cursor-pointer flex gap-3 ${
                notif.read ? 'hover:bg-slate-50 opacity-75' : 'bg-blue-50/60 hover:bg-blue-50 border border-blue-100/60'
              }`}
            >
              <div className="mt-0.5 w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center shrink-0">
                {getIcon(notif.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs font-semibold text-slate-800 truncate">
                    {notif.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">
                    {notif.time}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug line-clamp-2">
                  {notif.message}
                </p>
              </div>
              {!notif.read && (
                <div className="w-2 h-2 rounded-full bg-primary shrink-0 self-center"></div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="pt-2 mt-2 border-t border-slate-100 text-center">
        <span className="text-[10px] text-slate-400">
          Synthetic Notifications • Encrypted Clinic Bus
        </span>
      </div>
    </div>
  );
};
