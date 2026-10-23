import React, { useState } from 'react';
import { Copy, Check, Type, ArrowDownUp, Trash2 } from 'lucide-react';
import { convertCase, CaseMode } from '../../utils/seo-tools';

export const CaseConverterTool: React.FC = () => {
  const [text, setText] = useState('Build fast, responsive web tools optimized for Google crawlers and SEO.');
  const [copied, setCopied] = useState(false);

  const handleTransform = (mode: CaseMode) => {
    setText(convertCase(text, mode));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Transformation Action Buttons */}
      <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap gap-2">
        <button
          onClick={() => handleTransform('upper')}
          className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-xs font-semibold cursor-pointer"
        >
          UPPERCASE
        </button>
        <button
          onClick={() => handleTransform('lower')}
          className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-xs font-semibold cursor-pointer"
        >
          lowercase
        </button>
        <button
          onClick={() => handleTransform('title')}
          className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-xs font-semibold cursor-pointer"
        >
          Title Case
        </button>
        <button
          onClick={() => handleTransform('sentence')}
          className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-xs font-semibold cursor-pointer"
        >
          Sentence case
        </button>
        <button
          onClick={() => handleTransform('camel')}
          className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-mono font-semibold cursor-pointer"
        >
          camelCase
        </button>
        <button
          onClick={() => handleTransform('kebab')}
          className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-mono font-semibold cursor-pointer"
        >
          kebab-case
        </button>
        <button
          onClick={() => handleTransform('snake')}
          className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-mono font-semibold cursor-pointer"
        >
          snake_case
        </button>
      </div>

      {/* Editor Box */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={7}
          placeholder="Type or paste your text to change cases..."
          className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 font-sans"
        />

        <div className="flex items-center justify-between">
          <button
            onClick={() => setText('')}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-500 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Text</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium cursor-pointer transition-colors shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Converted Text'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
