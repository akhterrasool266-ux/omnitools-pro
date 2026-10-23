import React, { useState } from 'react';
import { Copy, Download, Check, Plus, Trash2, Shield, Bot } from 'lucide-react';
import { generateRobotsTxt } from '../../utils/sitemap';

export const RobotsTxtTool: React.FC = () => {
  const [domain, setDomain] = useState('https://omnitools.pro');
  const [allowAll, setAllowAll] = useState(true);
  const [disallowPaths, setDisallowPaths] = useState<string[]>(['/admin', '/private', '/tmp']);
  const [newDisallow, setNewDisallow] = useState('');
  const [sitemapPath, setSitemapPath] = useState('/sitemap.xml');
  const [crawlDelay, setCrawlDelay] = useState<number>(0);
  const [blockAiBots, setBlockAiBots] = useState(false);
  const [copied, setCopied] = useState(false);

  let output = generateRobotsTxt({
    domain,
    allowAll,
    disallowPaths,
    sitemapPath,
    crawlDelay: crawlDelay > 0 ? crawlDelay : undefined,
  });

  if (blockAiBots) {
    output += `\n\n# Disallow AI Scrapers while keeping Googlebot active\nUser-agent: GPTBot\nDisallow: /\nUser-agent: ClaudeBot\nDisallow: /\nUser-agent: CCBot\nDisallow: /`;
  }

  const handleAddPath = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDisallow.trim()) return;
    const formatted = newDisallow.startsWith('/') ? newDisallow.trim() : `/${newDisallow.trim()}`;
    if (!disallowPaths.includes(formatted)) {
      setDisallowPaths([...disallowPaths, formatted]);
    }
    setNewDisallow('');
  };

  const handleRemovePath = (index: number) => {
    setDisallowPaths(disallowPaths.filter((_, i) => i !== index));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'robots.txt';
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Website Domain
            </label>
            <input
              type="url"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="https://yourwebsite.com"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Sitemap Reference Path
            </label>
            <input
              type="text"
              value={sitemapPath}
              onChange={(e) => setSitemapPath(e.target.value)}
              placeholder="/sitemap.xml"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={allowAll}
              onChange={(e) => setAllowAll(e.target.checked)}
              className="rounded accent-indigo-600"
            />
            <span>Allow All Pages by Default (Allow: /)</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={blockAiBots}
              onChange={(e) => setBlockAiBots(e.target.checked)}
              className="rounded accent-indigo-600"
            />
            <span>Block AI Bots (GPTBot, ClaudeBot)</span>
          </label>

          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Crawl Delay:
            </label>
            <select
              value={crawlDelay}
              onChange={(e) => setCrawlDelay(parseInt(e.target.value))}
              className="px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
            >
              <option value={0}>No Delay (Standard)</option>
              <option value={2}>2 seconds</option>
              <option value={5}>5 seconds</option>
              <option value={10}>10 seconds</option>
            </select>
          </div>
        </div>

        {/* Disallow paths manager */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Disallowed Paths / Folders:
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {disallowPaths.map((path, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono"
              >
                <span>{path}</span>
                <button
                  type="button"
                  onClick={() => handleRemovePath(idx)}
                  className="text-slate-400 hover:text-rose-500 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <form onSubmit={handleAddPath} className="flex gap-2 max-w-md">
            <input
              type="text"
              value={newDisallow}
              onChange={(e) => setNewDisallow(e.target.value)}
              placeholder="/cart or /staging"
              className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-slate-800 dark:bg-slate-700 text-white rounded-lg text-xs font-medium cursor-pointer"
            >
              Add Path
            </button>
          </form>
        </div>
      </div>

      {/* Output Viewer */}
      <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-md">
        <div className="p-3 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2 font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block"></span>
            <span>robots.txt</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download robots.txt</span>
            </button>
          </div>
        </div>

        <pre className="p-4 text-xs font-mono text-emerald-300/90 overflow-x-auto leading-relaxed">
          {output}
        </pre>
      </div>
    </div>
  );
};
