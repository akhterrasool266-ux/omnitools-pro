import React, { useState } from 'react';
import { Copy, Check, Trash2, Clock, Volume2, BookOpen, FileText } from 'lucide-react';
import { calculateWordStats } from '../../utils/seo-tools';

export const WordCounterTool: React.FC = () => {
  const sample = `Content is the cornerstone of search engine optimization. High quality, in-depth articles that directly answer user search queries earn top rankings on Google and Bing.

When writing content for web tools, clear instructions, clean readability, and thorough explanations maximize time on page. Search engines reward websites with high engagement signals. Ensure your paragraphs are concise, your sentences vary in length, and key terms appear naturally without forced repetition.`;

  const [text, setText] = useState(sample);
  const [copied, setCopied] = useState(false);

  const stats = calculateWordStats(text);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => setText('');
  const handleLoadSample = () => setText(sample);

  return (
    <div className="space-y-6">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {stats.words.toLocaleString()}
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
            Words
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white">
            {stats.characters.toLocaleString()}
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
            Characters
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            ({stats.charactersNoSpaces.toLocaleString()} no spaces)
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white">
            {stats.sentences}
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
            Sentences
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            ({stats.paragraphs} paragraphs)
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {stats.fleschScore}
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
            Readability
          </div>
          <div className="text-[10px] text-slate-400 truncate mt-0.5">
            {stats.fleschLabel}
          </div>
        </div>
      </div>

      {/* Editor Box */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3 text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>Reading time: ~{stats.readingTimeMinutes} min</span>
            </span>
            <span className="flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
              <span>Speaking time: ~{stats.speakingTimeMinutes} min</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadSample}
              className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Sample Text
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <button
              onClick={handleClear}
              className="text-slate-400 hover:text-rose-500 cursor-pointer flex items-center gap-0.5"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder="Start typing or paste your content here..."
          className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 leading-relaxed font-sans"
        />

        <div className="flex items-center justify-between pt-1">
          <div className="text-xs text-slate-400">
            Average sentence length: {stats.sentences > 0 ? Math.round(stats.words / stats.sentences) : 0} words
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Text' : 'Copy Text'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
