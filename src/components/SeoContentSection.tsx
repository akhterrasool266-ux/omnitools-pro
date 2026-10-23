import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, HelpCircle, TrendingUp, Sparkles, Hash } from 'lucide-react';
import { ToolMetadata } from '../types';

interface SeoContentSectionProps {
  tool: ToolMetadata;
}

export const SeoContentSection: React.FC<SeoContentSectionProps> = ({ tool }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <article className="mt-10 border-t border-slate-200 dark:border-slate-800/80 pt-8 space-y-8">
      {/* Search & High-CPC stats badge */}
      <div className="bg-slate-100/80 dark:bg-slate-900/60 rounded-xl p-4 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Estimated Monthly Search Volume</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100">{tool.searchVolume}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">AdSense CPC Potential</div>
            <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{tool.estimatedCpc} per click</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            Category: {tool.category.toUpperCase()}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            Google Indexed
          </span>
        </div>
      </div>

      {/* About & Purpose */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
          <span>About {tool.name}</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {tool.description} Designed for digital marketers, webmasters, SEO experts, developers, and everyday users who require rapid, client-side execution with zero latency and 100% data privacy.
        </p>
      </div>

      {/* How To Steps */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>Step-by-Step: How to Use this Tool</span>
        </h3>
        <ol className="grid sm:grid-cols-2 gap-3">
          {tool.howToSteps.map((step, idx) => (
            <li
              key={idx}
              className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-3 shadow-xs"
            >
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-snug">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* High-Intent SEO Keywords for Crawlers */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
          <Hash className="w-3.5 h-3.5" />
          <span>Target High-Search Keywords (SEO Intent)</span>
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {tool.highIntentKeywords.map((kw, i) => (
            <span
              key={i}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions (FAQ) with Schema Microdata */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>Frequently Asked Questions (FAQ)</span>
        </h3>
        <div className="space-y-2.5">
          {tool.faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 text-left font-medium text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <span className="text-left font-semibold">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-indigo-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
};
