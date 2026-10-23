import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Percent, Zap } from 'lucide-react';
import { calculateCryptoRoi } from '../../utils/seo-tools';

export const CryptoRoiTool: React.FC = () => {
  const [investment, setInvestment] = useState<number>(1000);
  const [buyPrice, setBuyPrice] = useState<number>(2.5);
  const [sellPrice, setSellPrice] = useState<number>(7.5);
  const [feePercent, setFeePercent] = useState<number>(0.2);

  const result = calculateCryptoRoi(investment, buyPrice, sellPrice, feePercent);

  const handleApplyMultiplier = (multiplier: number) => {
    setSellPrice(Number((buyPrice * multiplier).toFixed(4)));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Inputs */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Total Investment Amount ($)
              </label>
              <input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-bold font-mono text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Exchange Fee (% per trade)
              </label>
              <input
                type="number"
                step="0.05"
                value={feePercent}
                onChange={(e) => setFeePercent(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-mono text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Entry / Buy Price ($)
              </label>
              <input
                type="number"
                step="0.0001"
                value={buyPrice}
                onChange={(e) => setBuyPrice(Math.max(0.000001, Number(e.target.value)))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-bold font-mono text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Exit / Sell Price ($)
              </label>
              <input
                type="number"
                step="0.0001"
                value={sellPrice}
                onChange={(e) => setSellPrice(Math.max(0.000001, Number(e.target.value)))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-bold font-mono text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Quick Target Multiplier Buttons */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="block text-[11px] font-semibold text-slate-500 mb-2">
              Quick Target Scenarios:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[1.25, 1.5, 2, 3, 5, 10].map((mult) => (
                <button
                  key={mult}
                  type="button"
                  onClick={() => handleApplyMultiplier(mult)}
                  className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 cursor-pointer transition-colors"
                >
                  {mult}x Target
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visual ROI Result Box */}
        <div
          className={`lg:col-span-5 rounded-2xl p-5 text-white shadow-md flex flex-col justify-between ${
            result.isProfit
              ? 'bg-gradient-to-br from-emerald-900 via-slate-900 to-indigo-950'
              : 'bg-gradient-to-br from-rose-950 via-slate-900 to-slate-950'
          }`}
        >
          <div>
            <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1 flex items-center justify-between">
              <span>Net Projected Return</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  result.isProfit ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                }`}
              >
                {result.isProfit ? 'PROFIT' : 'LOSS'}
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {result.isProfit ? '+' : ''}${result.netProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-sm font-bold mt-1 flex items-center gap-1.5">
              {result.isProfit ? (
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-rose-400" />
              )}
              <span className={result.isProfit ? 'text-emerald-400' : 'text-rose-400'}>
                {result.roiPercentage > 0 ? '+' : ''}{result.roiPercentage.toFixed(2)}% ROI
              </span>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="text-slate-400">Total Tokens Acquired</div>
                <div className="font-bold text-white font-mono text-sm">
                  {result.totalTokens.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-slate-400">Gross Exit Value</div>
                <div className="font-bold text-white font-mono text-sm">
                  ${result.exitGrossValue.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-400 text-center">
            Estimated exchange fees deducted: ${result.totalFeesPaid.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};
