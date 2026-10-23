import React, { useState } from 'react';
import { DollarSign, Clock, Calendar, Percent, ArrowRight, ShieldCheck } from 'lucide-react';
import { calculateSalary } from '../../utils/seo-tools';

export const SalaryTaxTool: React.FC = () => {
  const [annualSalary, setAnnualSalary] = useState<number>(85000);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [taxRate, setTaxRate] = useState<number>(22);

  const breakdown = calculateSalary(annualSalary, hoursPerWeek, 52, taxRate);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <span>Annual Gross Salary (USD)</span>
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700">
                <span className="text-slate-400 mr-1">$</span>
                <input
                  type="number"
                  value={annualSalary}
                  onChange={(e) => setAnnualSalary(Math.max(0, Number(e.target.value)))}
                  className="w-24 text-right font-bold text-slate-900 dark:text-white bg-transparent focus:outline-hidden"
                />
              </div>
            </div>
            <input
              type="range"
              min="15000"
              max="500000"
              step="2500"
              value={annualSalary}
              onChange={(e) => setAnnualSalary(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Hours Per Week</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{hoursPerWeek} hrs</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Estimated Tax Rate</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{taxRate}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="45"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Big Results Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 rounded-2xl p-5 text-white shadow-md flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-indigo-300 font-semibold mb-1">
              Hourly Equivalent Rate
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              ${breakdown.hourlyWage.toFixed(2)}
              <span className="text-sm font-normal text-indigo-300 ml-1">/ hour</span>
            </div>
            <div className="text-xs text-indigo-300/80 mt-1">
              Based on {hoursPerWeek} hrs/week ({hoursPerWeek * 52} annual work hours)
            </div>

            <div className="mt-5 pt-4 border-t border-indigo-800/60 grid grid-cols-2 gap-3">
              <div>
                <div className="text-[11px] text-indigo-300">Bi-Weekly Paycheck</div>
                <div className="text-base font-bold text-white">
                  ${(breakdown.weeklyPay * 2).toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-indigo-300">Monthly Net (After Tax)</div>
                <div className="text-base font-bold text-emerald-300">
                  ${breakdown.monthlyNet.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-indigo-800/40 text-[11px] text-indigo-300/70 text-center">
            Estimated annual take-home: ${breakdown.annualNet.toLocaleString()} (${breakdown.annualTax.toLocaleString()} paid in tax)
          </div>
        </div>
      </div>

      {/* Detailed Pay Schedule Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 font-semibold text-xs text-slate-700 dark:text-slate-200">
          Complete Earnings Conversion Breakdown
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          <div className="p-3 flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400">Hourly Wage</span>
            <span className="font-bold text-slate-900 dark:text-white font-mono">${breakdown.hourlyWage.toFixed(2)} / hr</span>
          </div>
          <div className="p-3 flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400">Daily Earnings (8 hrs)</span>
            <span className="font-bold text-slate-900 dark:text-white font-mono">${breakdown.dailyPay.toFixed(2)} / day</span>
          </div>
          <div className="p-3 flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400">Weekly Gross Pay</span>
            <span className="font-bold text-slate-900 dark:text-white font-mono">${breakdown.weeklyPay.toFixed(2)} / wk</span>
          </div>
          <div className="p-3 flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400">Monthly Gross Income</span>
            <span className="font-bold text-slate-900 dark:text-white font-mono">${breakdown.monthlyGross.toFixed(2)} / mo</span>
          </div>
          <div className="p-3 flex items-center justify-between bg-emerald-50/50 dark:bg-emerald-950/20">
            <span className="font-semibold text-emerald-800 dark:text-emerald-300">Monthly Net (Take-Home)</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">${breakdown.monthlyNet.toFixed(2)} / mo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
