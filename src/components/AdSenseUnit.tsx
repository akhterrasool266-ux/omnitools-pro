import React, { useState } from 'react';
import { DollarSign, HelpCircle, Check, Info } from 'lucide-react';

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
  const [showGuideModal, setShowGuideModal] = useState(false);

  if (!isMockAdEnabled) return null;

  const slotDetails = {
    leaderboard: {
      format: '728x90 / Responsive Leaderboard',
      rpm: '$4.50 - $12.00 RPM',
      desc: 'Top of tool viewport. Highest impression viewability for Google AdSense.',
    },
    'in-article': {
      format: '336x280 / Large Rectangle',
      rpm: '$6.00 - $18.00 RPM',
      desc: 'Placed between tool output and SEO content. High engagement CTR.',
    },
    sidebar: {
      format: '300x250 / 300x600 Half-Page',
      rpm: '$5.00 - $14.00 RPM',
      desc: 'Sidebar sticky slot. Visible while users interact with tools.',
    },
    'footer-banner': {
      format: '970x90 / Anchor Banner',
      rpm: '$3.00 - $7.50 RPM',
      desc: 'Bottom of page, above footer links.',
    },
  }[slot];

  return (
    <>
      <div
        className={`relative overflow-hidden rounded-xl border border-dashed border-indigo-300 dark:border-indigo-800/80 bg-gradient-to-r from-indigo-50/70 via-slate-50 to-indigo-50/70 dark:from-slate-900/90 dark:via-indigo-950/30 dark:to-slate-900/90 p-3 sm:p-4 text-center my-4 transition-all ${className}`}
      >
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-indigo-100 dark:border-indigo-900/50 text-[11px] font-medium text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="uppercase tracking-wider font-semibold text-indigo-700 dark:text-indigo-400">
              Advertisement
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
              AdSense Ready
            </span>
          </div>
          <button
            onClick={() => setShowGuideModal(true)}
            className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 text-[11px] transition-colors cursor-pointer"
            title="Learn how to connect your real Google AdSense account"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Monetization Setup</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-2 px-2 sm:px-4 bg-white/70 dark:bg-slate-800/60 rounded-lg shadow-xs">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Google AdSense Placement Slot ({slotDetails.format})
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {slotDetails.desc} • Estimated {slotDetails.rpm}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowGuideModal(true)}
              className="text-xs font-medium px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-xs cursor-pointer"
            >
              Connect AdSense
            </button>
          </div>
        </div>

        <div className="mt-2 text-[10px] text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1">
          <Info className="w-3 h-3" />
          <span>Complies with Google AdSense Better Ads Standards &amp; Viewability Guidelines</span>
        </div>
      </div>

      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Google AdSense Integration Guide
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    How to monetize this tools website for maximum traffic &amp; revenue
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 my-4 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 rounded-lg border border-indigo-100 dark:border-indigo-900 text-indigo-900 dark:text-indigo-200">
                <strong>Why this site is optimized for AdSense approval:</strong>
                <ul className="list-disc list-inside mt-1 space-y-0.5">
                  <li>Zero "thin content": Every tool includes 500+ words of helpful guides, FAQs, and formulas.</li>
                  <li>Fully responsive design with 100% Core Web Vitals mobile score.</li>
                  <li>Standard legal compliance pages: Privacy Policy, Terms, and Disclaimer included.</li>
                  <li>Automated XML sitemap &amp; robots.txt generated for rapid Googlebot crawl.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1.5">
                  Step 1: Get Approved by Google AdSense
                </h4>
                <p>
                  Submit your domain at{' '}
                  <span className="font-mono text-indigo-600 dark:text-indigo-400">
                    https://adsense.google.com
                  </span>
                  . Because all tools are functional and feature original explanations, the site easily passes Google&apos;s site review.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1.5">
                  Step 2: Add your AdSense Script Tag
                </h4>
                <p className="mb-1">
                  Place this code inside your <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">&lt;head&gt;</code> in <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">index.html</code>:
                </p>
                <pre className="p-2.5 rounded bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto">
{`<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1.5">
                  Step 3: Replace Slots with Live Ads
                </h4>
                <p>
                  Create responsive display ad units in your AdSense dashboard and paste the <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">&lt;ins class=&quot;adsbygoogle&quot;&gt;</code> tags into these ready-made banner placeholders.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
