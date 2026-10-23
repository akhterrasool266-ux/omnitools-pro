import React, { useState } from 'react';
import { BarChart, AlertCircle, CheckCircle, RefreshCw, FileText } from 'lucide-react';
import { calculateWordStats } from '../../utils/seo-tools';

export const KeywordDensityTool: React.FC = () => {
  const defaultSample = `Search engine optimization (SEO) is essential for online tools websites. A well-optimized SEO web tools site attracts high-intent organic search traffic from Google, Bing, and other search engines.

When building web tools, ensuring fast load speed, responsive mobile design, and automated sitemap generation significantly enhances search visibility.

Google crawlers look for comprehensive content, structured data, and high-quality user experience. Keyword density should remain between 1% and 2.5% to avoid keyword stuffing penalties. Use this keyword density tool to optimize your articles and web tool descriptions.`;

  const [text, setText] = useState(defaultSample);
  const stats = calculateWordStats(text);

  const handleClear = () => setText('');
  const handleLoadSample = () => setText(defaultSample);

  return (
    <div className="space-y-6">
      {/* Text Area */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Article / Webpage Content</span>
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadSample}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Load Sample Text
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <button
              onClick={handleClear}
              className="text-xs text-slate-400 hover:text-rose-500 cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={7}
          placeholder="Paste your blog post, landing page copy, or article here to analyze keyword densities..."
          className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 leading-relaxed"
        />

        {/* Quick metrics bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
          <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60">
            <div className="text-xs text-slate-500 dark:text-slate-400">Total Words</div>
            <div className="text-base font-bold text-slate-800 dark:text-white">{stats.words}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60">
            <div className="text-xs text-slate-500 dark:text-slate-400">Characters</div>
            <div className="text-base font-bold text-slate-800 dark:text-white">{stats.characters}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60">
            <div className="text-xs text-slate-500 dark:text-slate-400">Reading Time</div>
            <div className="text-base font-bold text-slate-800 dark:text-white">~{stats.readingTimeMinutes} min</div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60">
            <div className="text-xs text-slate-500 dark:text-slate-400">Readability</div>
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 truncate mt-1">
              {stats.fleschLabel}
            </div>
          </div>
        </div>
      </div>

      {/* Top Keywords & Density Breakdown */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between mb-4">
          <span className="flex items-center gap-1.5">
            <BarChart className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Keyword Frequency &amp; Density Analysis</span>
          </span>
          <span className="text-xs font-normal text-slate-500">
            Recommended: 1.0% - 2.5%
          </span>
        </h3>

        {stats.topKeywords.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400">
            No keywords detected yet. Paste text above to analyze frequency.
          </div>
        ) : (
          <div className="space-y-3">
            {stats.topKeywords.map((item, index) => {
              const isOverOptimized = item.density > 3.5;
              const isOptimal = item.density >= 1.0 && item.density <= 3.0;

              return (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-400 w-4">{index + 1}.</span>
                      <span className="font-mono">{item.word}</span>
                      <span className="text-slate-400 font-normal">({item.count}x)</span>
                    </span>

                    <span className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-800 dark:text-white">{item.density}%</span>
                      {isOverOptimized ? (
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-medium">
                          High Density
                        </span>
                      ) : isOptimal ? (
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-medium">
                          Optimal
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                          Low
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isOverOptimized
                          ? 'bg-rose-500'
                          : isOptimal
                          ? 'bg-emerald-500'
                          : 'bg-indigo-400'
                      }`}
                      style={{ width: `${Math.min(100, item.density * 20)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
