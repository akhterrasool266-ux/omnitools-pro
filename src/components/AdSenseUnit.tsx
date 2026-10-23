import React from 'react';
import { ExternalLink, ShieldCheck, Zap } from 'lucide-react';

interface AdSenseUnitProps {
  slot: 'leaderboard' | 'in-article' | 'sidebar' | 'footer-banner';
  className?: string;
  isMockAdEnabled?: boolean;
}

export const AdSenseUnit: React.FC<AdSenseUnitProps> = ({
  slot,
  className = '',
  isMockAdEnabled = true,
}) => {
  if (!isMockAdEnabled) return null;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs my-4 transition-all ${className}`}
    >
      {/* Discreet Google-Compliant Advertisement Label */}
      <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-800/40 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
        <span>Sponsored • Advertisement</span>
        <span>Ad</span>
      </div>

      {slot === 'leaderboard' && (
        <div className="p-3.5 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                Ultra-Fast Global Edge Cloud &amp; Web Security
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Accelerate page load speeds, secure DNS, and boost Google Core Web Vitals worldwide.
              </div>
            </div>
          </div>
          <span className="shrink-0 text-xs font-semibold px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer">
            <span>Learn More</span>
            <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      )}

      {slot === 'sidebar' && (
        <div className="p-4 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
              Secure Web Hosting &amp; Domain SSL
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              High-bandwidth NVMe hosting with automated SSL encryption and 99.99% uptime guarantee.
            </p>
          </div>
          <button className="w-full text-xs font-semibold py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white transition-colors cursor-pointer">
            Explore Plans
          </button>
        </div>
      )}

      {slot === 'in-article' && (
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left bg-gradient-to-r from-slate-50/50 via-white to-slate-50/50 dark:from-slate-900 dark:via-slate-800/40 dark:to-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                Enterprise Cloud Security &amp; DDoS Protection
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Block malicious bots, safeguard API traffic, and prevent downtime.
              </div>
            </div>
          </div>
          <span className="shrink-0 text-xs font-semibold px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer">
            <span>Get Started</span>
            <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      )}

      {slot === 'footer-banner' && (
        <div className="p-3 text-center text-xs text-slate-500">
          Google-compliant responsive banner unit
        </div>
      )}
    </div>
  );
};
