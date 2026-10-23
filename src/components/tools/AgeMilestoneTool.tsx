import React, { useState } from 'react';
import { Calendar, Cake, Clock, Sparkles, Award } from 'lucide-react';
import { calculateAgeDetails } from '../../utils/seo-tools';

export const AgeMilestoneTool: React.FC = () => {
  const [birthDate, setBirthDate] = useState('1998-05-15');
  const [targetDate, setTargetDate] = useState('2026-10-23');

  const age = calculateAgeDetails(birthDate, targetDate);

  return (
    <div className="space-y-6">
      {/* Date Inputs Card */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Cake className="w-4 h-4 text-pink-500" />
            <span>Date of Birth</span>
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-medium text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span>Age on Date (Default Today)</span>
          </label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-medium text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Main Age Display */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-950 to-slate-900 rounded-2xl p-6 text-white text-center shadow-md">
        <div className="text-xs uppercase tracking-wider text-indigo-300 font-semibold mb-2">
          Your Chronological Age
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 my-2">
          <div className="p-3 bg-white/10 rounded-xl min-w-[90px]">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">{age.years}</div>
            <div className="text-xs text-indigo-200 font-medium mt-1">Years</div>
          </div>
          <div className="p-3 bg-white/10 rounded-xl min-w-[90px]">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">{age.months}</div>
            <div className="text-xs text-indigo-200 font-medium mt-1">Months</div>
          </div>
          <div className="p-3 bg-white/10 rounded-xl min-w-[90px]">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">{age.days}</div>
            <div className="text-xs text-indigo-200 font-medium mt-1">Days</div>
          </div>
        </div>
        <p className="text-xs text-indigo-200 mt-3">
          Born on a <strong>{age.dayOfWeekBorn}</strong>
        </p>
      </div>

      {/* Life Milestones Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-xs">
          <div className="text-xl sm:text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {age.totalDays.toLocaleString()}
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
            Total Days Lived
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-xs">
          <div className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-white">
            {age.totalWeeks.toLocaleString()}
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
            Total Weeks
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-xs">
          <div className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-white">
            {age.totalHours.toLocaleString()}
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
            Total Hours Lived
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-xs">
          <div className="text-xl sm:text-2xl font-extrabold text-pink-600 dark:text-pink-400">
            {age.daysUntilNextBirthday}
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
            Days To Next B&apos;Day
          </div>
        </div>
      </div>
    </div>
  );
};
