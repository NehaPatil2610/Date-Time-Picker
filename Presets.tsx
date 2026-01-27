import * as React from 'react';
import { getPresetRange } from './timeUtils';
export const Presets = ({ onSelect, timezone }: { onSelect: (start: Date, end: Date) => void, timezone: string }) => {
  const getToday = () => {
    // Today in the target timezone
    // 1. Get "now"
    const now = new Date();
    // 2. Get start of today in target zone
    // Our utility startOfDayInZone(now, timezone) returns a Date representing 00:00:00 in that zone
    const start = startOfDayInZone(now, timezone);
    
    // 3. End of day is start + 24h - 1ms? 
    // Or just 23:59:59.
    // Let's simple add 1 day minus 1 ms.
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1);
    
    onSelect(start, end);
  };

  const getNextWeek = () => {
    const now = new Date();
    const start = startOfDayInZone(now, timezone);
    const end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000 - 1);
    onSelect(start, end);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <button 
        onClick={getToday}
        className="relative group p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-indigo-500/50 transition-all active:scale-95 shadow-xl hover:shadow-indigo-500/10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative z-10 text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Today</span>
        <span className="relative z-10 text-xs font-black text-white">Full Day</span>
      </button>
      <button 
        onClick={getNextWeek}
        className="relative group p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-fuchsia-500/50 transition-all active:scale-95 shadow-xl hover:shadow-fuchsia-500/10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative z-10 text-[10px] font-black text-fuchsia-400 uppercase tracking-widest block mb-1">Weekly</span>
        <span className="relative z-10 text-xs font-black text-white">7 Days</span>
      </button>
    </div>

  );
};



