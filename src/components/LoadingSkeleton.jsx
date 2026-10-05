import React from 'react';

export const LoadingSkeleton = ({ type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="glass-panel rounded-3xl p-5 border border-white/80 animate-pulse space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-2xl bg-slate-200" />
          <div className="w-16 h-5 rounded-full bg-slate-200" />
        </div>
        <div className="w-24 h-7 rounded-lg bg-slate-200 mt-3" />
        <div className="w-36 h-4 rounded-md bg-slate-200" />
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="glass-panel rounded-3xl p-5 border border-white/80 animate-pulse space-y-4">
        <div className="w-48 h-6 rounded-lg bg-slate-200" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 rounded-xl bg-slate-100 flex items-center justify-between px-4">
              <div className="w-32 h-4 rounded bg-slate-200" />
              <div className="w-24 h-4 rounded bg-slate-200" />
              <div className="w-16 h-4 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-2xl bg-slate-100 animate-pulse h-24" />
  );
};
