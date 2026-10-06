import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const ErrorState = ({
  title = "Something went wrong",
  message = "Please try again",
  onRetry
}) => {
  return (
    <div className="py-12 px-6 text-center rounded-3xl bg-white border border-slate-200/80 shadow-glass flex flex-col items-center justify-center max-w-md mx-auto my-6">
      <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mb-3 border border-rose-100 shadow-xs">
        <AlertCircle className="w-7 h-7 stroke-[2]" />
      </div>
      <h3 className="text-base font-black text-slate-900 tracking-tight">
        {title}
      </h3>
      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-5 py-2.5 rounded-xl bg-[#1677FF] hover:bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};
