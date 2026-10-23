import React, { useState } from 'react';
import { DollarSign, Percent, Calendar, PieChart, Table } from 'lucide-react';
import { calculateLoanEmi } from '../../utils/seo-tools';

export const LoanEmiTool: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(250000);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [tenureYears, setTenureYears] = useState<number>(15);
  const [tenureMode, setTenureMode] = useState<'years' | 'months'>('years');
  const [tenureMonthsInput, setTenureMonthsInput] = useState<number>(180);

  const totalMonths = tenureMode === 'years' ? tenureYears * 12 : tenureMonthsInput;
  const result = calculateLoanEmi(principal, interestRate, totalMonths);

  const principalRatio =
    result.totalPayment > 0 ? (principal / result.totalPayment) * 100 : 50;
  const interestRatio =
    result.totalPayment > 0 ? (result.totalInterest / result.totalPayment) * 100 : 50;

  return (
    <div className="space-y-6">
      {/* Input Form & Visual Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders & Inputs */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
          {/* Principal */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <span className="flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-indigo-500" />
                <span>Loan Amount (Principal)</span>
              </span>
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700">
                <span className="text-slate-400 mr-1">$</span>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Math.max(0, Number(e.target.value)))}
                  className="w-28 text-right font-bold text-slate-900 dark:text-white bg-transparent focus:outline-hidden"
                />
              </div>
            </div>
            <input
              type="range"
              min="1000"
              max="2000000"
              step="5000"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>$1,000</span>
              <span>$1,000,000</span>
              <span>$2,000,000</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <span className="flex items-center gap-1">
                <Percent className="w-3.5 h-3.5 text-indigo-500" />
                <span>Annual Interest Rate</span>
              </span>
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700">
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                  className="w-16 text-right font-bold text-slate-900 dark:text-white bg-transparent focus:outline-hidden"
                />
                <span className="text-slate-400 ml-1">%</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>1%</span>
              <span>12.5%</span>
              <span>25%</span>
            </div>
          </div>

          {/* Loan Tenure */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                <span>Loan Tenure</span>
              </span>
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-md border border-slate-300 dark:border-slate-700 text-xs">
                <button
                  type="button"
                  onClick={() => setTenureMode('years')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    tenureMode === 'years'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-500'
                  }`}
                >
                  Years
                </button>
                <button
                  type="button"
                  onClick={() => setTenureMode('months')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    tenureMode === 'months'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-500'
                  }`}
                >
                  Months
                </button>
              </div>
            </div>

            {tenureMode === 'years' ? (
              <>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>1 Year</span>
                  <span className="font-bold text-indigo-600">{tenureYears} Years</span>
                  <span>30 Years</span>
                </div>
              </>
            ) : (
              <>
                <input
                  type="range"
                  min="6"
                  max="360"
                  step="6"
                  value={tenureMonthsInput}
                  onChange={(e) => setTenureMonthsInput(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>6 Months</span>
                  <span className="font-bold text-indigo-600">{tenureMonthsInput} Months</span>
                  <span>360 Months</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Visual EMI Results Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 rounded-xl p-5 text-white shadow-md flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-indigo-300 font-semibold mb-1">
              Monthly Payment (EMI)
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              ${result.monthlyEmi.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-indigo-300/80 mt-1">
              Payable monthly for {totalMonths} months
            </div>

            {/* Split Progress Bar */}
            <div className="mt-6 space-y-2">
              <div className="h-3 rounded-full overflow-hidden flex bg-slate-800">
                <div
                  className="bg-emerald-400 h-full transition-all"
                  style={{ width: `${principalRatio}%` }}
                  title="Principal Share"
                />
                <div
                  className="bg-amber-400 h-full transition-all"
                  style={{ width: `${interestRatio}%` }}
                  title="Interest Share"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-indigo-200">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                  <span>Principal: {principalRatio.toFixed(1)}%</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                  <span>Interest: {interestRatio.toFixed(1)}%</span>
                </span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-indigo-800/60 grid grid-cols-2 gap-4">
              <div>
                <div className="text-[11px] text-indigo-300">Total Interest</div>
                <div className="text-base font-bold text-amber-300">
                  ${result.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-indigo-300">Total Loan Cost</div>
                <div className="text-base font-bold text-white">
                  ${result.totalPayment.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-indigo-800/40 text-[11px] text-indigo-300/70 text-center">
            Standard reducing balance amortization formula applied
          </div>
        </div>
      </div>

      {/* Amortization schedule preview table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200">
          <span className="flex items-center gap-1.5">
            <Table className="w-4 h-4 text-indigo-500" />
            <span>Monthly Payment Schedule Preview (First 24 Months)</span>
          </span>
          <span className="text-[11px] font-normal text-slate-400">Currency in USD</span>
        </div>

        <div className="max-h-60 overflow-y-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/60 dark:bg-slate-800 text-slate-500 dark:text-slate-400 sticky top-0">
              <tr>
                <th className="py-2 px-3">Month</th>
                <th className="py-2 px-3">Principal Paid</th>
                <th className="py-2 px-3">Interest Paid</th>
                <th className="py-2 px-3 text-right">Remaining Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-mono">
              {result.monthlyBreakdown.map((row) => (
                <tr key={row.month} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2 px-3 text-slate-500">#{row.month}</td>
                  <td className="py-2 px-3 text-emerald-600 dark:text-emerald-400 font-semibold">
                    ${row.principalPaid.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 text-amber-600 dark:text-amber-400">
                    ${row.interestPaid.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 text-right text-slate-800 dark:text-slate-200">
                    ${row.remainingBalance.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
