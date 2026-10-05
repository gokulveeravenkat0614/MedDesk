import React from 'react';

export const CareGuardLogo = ({
  size = 'md',
  showText = false,
  textLight = false,
  className = ''
}) => {
  const sizeMap = {
    sm: { box: 'w-8 h-8', icon: 18, text: 'text-base', sub: 'text-[9px]' },
    md: { box: 'w-10 h-10', icon: 22, text: 'text-xl', sub: 'text-[10px]' },
    lg: { box: 'w-12 h-12', icon: 26, text: 'text-2xl', sub: 'text-xs' },
    xl: { box: 'w-14 h-14', icon: 32, text: 'text-3xl', sub: 'text-xs' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Healthcare + Protection Shield-Cross Emblem */}
      <div
        className={`${currentSize.box} rounded-2xl bg-gradient-to-tr from-[#1677FF] via-[#1D82FF] to-[#38BDF8] flex items-center justify-center shadow-md shadow-blue-500/25 p-1 relative overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-200`}
      >
        {/* Ambient sheen */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

        <svg
          viewBox="0 0 32 32"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Protective Shield Base */}
          <path
            d="M16 3.5L6.5 7.5V15.5C6.5 21.8 10.6 27.6 16 29C21.4 27.6 25.5 21.8 25.5 15.5V7.5L16 3.5Z"
            fill="white"
            fillOpacity="0.18"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Medical Healthcare Cross in Center */}
          <path
            d="M16 10V22M10 16H22"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Core Security Node Dot */}
          <circle cx="16" cy="16" r="1.6" fill="#38BDF8" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-black tracking-tight leading-none ${currentSize.text} ${
              textLight ? 'text-white' : 'text-slate-900'
            }`}
          >
            Care<span className="text-[#1677FF]">Guard</span>
          </span>
          <span
            className={`font-medium tracking-wide uppercase mt-0.5 ${currentSize.sub} ${
              textLight ? 'text-blue-100' : 'text-slate-500'
            }`}
          >
            Secure Clinic & Appointment Management
          </span>
        </div>
      )}
    </div>
  );
};
