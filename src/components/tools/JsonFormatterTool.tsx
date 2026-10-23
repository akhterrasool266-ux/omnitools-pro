import React, { useState } from 'react';
import { Copy, Check, Trash2, CheckCircle, AlertTriangle, Code2, Minimize2 } from 'lucide-react';
import { formatJson } from '../../utils/seo-tools';

export const JsonFormatterTool: React.FC = () => {
  const sample = JSON.stringify(
    {
      appName: 'OmniTools Pro',
      version: '2.5.0',
      active: true,
      features: ['Automated Sitemap', 'Image Compressor', 'Loan EMI', 'SEO Meta Simulator'],
      stats: { monthlyTraffic: 500000, indexedPages: 120 },
    },
    null,
    2
  );

  const [input, setInput] = useState(sample);
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState<number>(2);

  const result = formatJson(input, indent);

  const handleFormat = (spaces: number) => {
    setIndent(spaces);
    const res = formatJson(input, spaces);
    if (res.success) {
      setInput(res.formatted);
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
    } catch {
      // Keep input as is
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Action Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          {result.success ? (
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <CheckCircle className="w-4 h-4" />
              <span>Valid JSON Syntax</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-rose-500 font-semibold truncate max-w-xs">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span className="truncate">{result.error}</span>
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleFormat(2)}
            className="px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 font-medium cursor-pointer"
          >
            Format (2 Spaces)
          </button>
          <button
            onClick={() => handleFormat(4)}
            className="px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 font-medium cursor-pointer"
          >
            Format (4 Spaces)
          </button>
          <button
            onClick={handleMinify}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 font-medium cursor-pointer"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Minify</span>
          </button>
          <button
            onClick={() => setInput('')}
            className="p-1.5 text-slate-400 hover:text-rose-500 cursor-pointer"
            title="Clear"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy JSON'}</span>
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-md">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={16}
          placeholder="Paste or type raw JSON here..."
          className="w-full p-4 font-mono text-xs sm:text-sm text-emerald-300 bg-transparent focus:outline-hidden leading-relaxed resize-y selection:bg-indigo-600 selection:text-white"
        />
      </div>
    </div>
  );
};
