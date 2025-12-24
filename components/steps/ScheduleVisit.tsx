import React, { useState, useEffect } from 'react';
import { FormData } from '../../types';
import { ChevronRight, CalendarCheck } from 'lucide-react';

interface Props {
  data: FormData;
  updateData: (fields: Partial<FormData>) => void;
}

const TIME_SLOTS = [
  "8:00 AM", "8:30 AM", "9:00 AM",
  "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM",
  "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM"
];

export const ScheduleVisit: React.FC<Props> = ({ data, updateData }) => {
  const [dates, setDates] = useState<{ day: string; date: number; fullDate: string }[]>([]);

  useEffect(() => {
    // Generate next 7 days
    const nextDays = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      nextDays.push({
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: d.getDate(),
        fullDate: d.toISOString().split('T')[0]
      });
    }
    setDates(nextDays);
    // Set default date if not set
    if (!data.visitDate && nextDays.length > 0) {
      updateData({ visitDate: nextDays[0].fullDate });
    }
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Schedule Visit</h2>
        <p className="text-gray-500">Pick a time for verification officer visit.</p>
      </div>

      {/* Date Scroller */}
      <div className="relative">
        <div className="flex overflow-x-auto space-x-3 pb-4 px-1 no-scrollbar scroll-smooth">
          {dates.map((d) => (
            <button
              key={d.fullDate}
              onClick={() => updateData({ visitDate: d.fullDate })}
              className={`flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-2xl border transition-all duration-200 ${
                data.visitDate === d.fullDate
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
              }`}
            >
              <span className="text-xs font-medium opacity-80">{d.day}</span>
              <span className="text-xl font-bold">{d.date}</span>
            </button>
          ))}
          <div className="flex-shrink-0 flex flex-col items-center justify-center w-10 h-20 text-gray-300">
             <ChevronRight />
          </div>
        </div>
      </div>

      {/* Time Grid */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-indigo-600"/> Available Slots
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {TIME_SLOTS.map((time) => (
            <button
              key={time}
              onClick={() => updateData({ visitTime: time })}
              className={`py-2 px-1 rounded-lg text-sm font-medium border transition-all ${
                data.visitTime === time
                  ? 'bg-indigo-100 text-indigo-700 border-indigo-200 ring-2 ring-indigo-500 ring-offset-1'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      
      {data.visitDate && data.visitTime && (
        <div className="bg-green-50 text-green-800 p-4 rounded-xl text-center text-sm font-medium border border-green-100 animate-in fade-in zoom-in-95">
            Confirming visit on {data.visitDate} at {data.visitTime}
        </div>
      )}
    </div>
  );
};