import React, { useState } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  AreaChart, Area, XAxis, YAxis
} from 'recharts';
import { Calendar, ChevronDown, Activity, Heart, Droplets } from 'lucide-react';

export const AppointmentSummaryDonut = ({ appointments }) => {
  const [filter, setFilter] = useState('This Week');

  // Compute breakdown from actual dataset or baseline
  const completed = appointments.filter(a => a.status === 'Completed').length || 12;
  const upcoming = appointments.filter(a => a.status === 'Upcoming').length || 8;
  const cancelled = appointments.filter(a => a.status === 'Cancelled').length || 2;
  const rescheduled = appointments.filter(a => a.status === 'Rescheduled').length || 2;
  const total = completed + upcoming + cancelled + rescheduled;

  const data = [
    { name: 'Completed', value: completed, color: '#10B981' },
    { name: 'Upcoming', value: upcoming, color: '#1677FF' },
    { name: 'Cancelled', value: cancelled, color: '#EF4444' },
    { name: 'Rescheduled', value: rescheduled, color: '#F59E0B' },
  ];

  return (
    <div className="glass-panel rounded-3xl p-5 border border-white/90 shadow-glass">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-800">
            Appointment Summary
          </h3>
          <span className="text-[11px] text-slate-400">Status Distribution</span>
        </div>

        {/* Dropdown filter */}
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-xs font-semibold text-slate-600 bg-slate-100/80 hover:bg-slate-200/80 px-2.5 py-1.5 rounded-xl border-none outline-none cursor-pointer"
          >
            <option>This Week</option>
            <option>This Month</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      {/* Donut Chart with Centered Total */}
      <div className="relative h-48 w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-xl shadow-lg">
                      {payload[0].name}: {payload[0].value} appointments
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={78}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-2xl font-black text-slate-900 leading-none">
            {total || 24}
          </span>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1 block">
            Total Appointments
          </span>
        </div>
      </div>

      {/* Legend Grid */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between p-2 rounded-xl bg-slate-50/70 border border-slate-100/60">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
              <span className="text-xs text-slate-600 font-medium">{item.name}</span>
            </div>
            <span className="text-xs font-bold text-slate-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PatientVitalsOverview = ({ history }) => {
  const [timeframe, setTimeframe] = useState('Last 7 Days');

  // Sample data fallback
  const chartData = history || [
    { day: 'Mon', bpSys: 118, hr: 70, o2: 99 },
    { day: 'Tue', bpSys: 121, hr: 74, o2: 98 },
    { day: 'Wed', bpSys: 119, hr: 71, o2: 98 },
    { day: 'Thu', bpSys: 122, hr: 75, o2: 97 },
    { day: 'Fri', bpSys: 120, hr: 72, o2: 98 },
    { day: 'Sat', bpSys: 119, hr: 70, o2: 99 },
    { day: 'Sun', bpSys: 120, hr: 72, o2: 98 },
  ];

  return (
    <div className="glass-panel rounded-3xl p-5 border border-white/90 shadow-glass">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-800">
            Patient Vitals Overview
          </h3>
          <span className="text-[11px] text-slate-400">Aggregate telemetry</span>
        </div>

        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="text-xs font-semibold text-slate-600 bg-slate-100/80 hover:bg-slate-200/80 px-2.5 py-1.5 rounded-xl border-none outline-none cursor-pointer"
        >
          <option>Last 7 Days</option>
          <option>Last 14 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      {/* Three mini cards specified in Section 14 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
        
        {/* 1. Blood Pressure: 122/78 mmHg */}
        <div className="p-3 rounded-2xl bg-white/80 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Blood Pressure</span>
            <Activity className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-base font-black text-slate-900 block">
            122/78 <span className="text-[10px] font-normal text-slate-400">mmHg</span>
          </span>
          <div className="h-8 mt-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <Area type="monotone" dataKey="bpSys" stroke="#1677FF" fill="#E6F4FF" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Heart Rate: 76 bpm */}
        <div className="p-3 rounded-2xl bg-white/80 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Heart Rate</span>
            <Heart className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <span className="text-base font-black text-slate-900 block">
            76 <span className="text-[10px] font-normal text-slate-400">bpm</span>
          </span>
          <div className="h-8 mt-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <Area type="monotone" dataKey="hr" stroke="#EF4444" fill="#FEE2E2" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Oxygen Level: 98% */}
        <div className="p-3 rounded-2xl bg-white/80 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Oxygen Level</span>
            <Droplets className="w-3.5 h-3.5 text-cyan-600" />
          </div>
          <span className="text-base font-black text-slate-900 block">
            98% <span className="text-[10px] font-normal text-slate-400">SpO2</span>
          </span>
          <div className="h-8 mt-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <Area type="monotone" dataKey="o2" stroke="#06B6D4" fill="#CFFAFE" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
