import React from 'react';
import { ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import { Heart, Activity, TrendingUp, CheckCircle2 } from 'lucide-react';

export const VitalCard = ({
  title,
  value,
  unit,
  status = "Normal",
  statusColor = "text-emerald-700 bg-emerald-50 border-emerald-200",
  data,
  dataKey,
  strokeColor = "#0B63F6",
  icon: Icon = Heart,
  iconBg = "bg-blue-50 text-[#0B63F6]",
  trend = "+1.4% steady",
  subtitle = "Continuous biometrics"
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
            <Icon className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {title}
            </h4>
            <span className="text-[11px] text-slate-400">{subtitle}</span>
          </div>
        </div>

        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusColor} flex items-center gap-1`}>
          <CheckCircle2 className="w-3 h-3" />
          {status}
        </span>
      </div>

      <div className="flex items-baseline justify-between mt-2 mb-3">
        <div>
          <span className="text-2xl sm:text-3xl font-black text-[#0B1736] tracking-tight">
            {value}
          </span>
          {unit && (
            <span className="text-xs font-bold text-slate-400 ml-1.5">
              {unit}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
          <TrendingUp className="w-3 h-3" />
          <span>{trend}</span>
        </div>
      </div>

      {/* Mini Sparkline Chart with Recharts */}
      <div className="h-16 w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#0B1736] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md">
                      {payload[0].payload.day || 'Reading'}: {payload[0].value} {unit}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={strokeColor}
              strokeWidth={2.4}
              dot={false}
              activeDot={{ r: 4, stroke: strokeColor, strokeWidth: 2, fill: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
