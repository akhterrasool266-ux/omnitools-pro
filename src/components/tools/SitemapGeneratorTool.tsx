import React, { useState } from 'react';
import { Download, Copy, Check, Plus, Trash2, Globe, FileCode, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { generateSitemapXml, validateSitemapXml, SitemapItem } from '../../utils/sitemap';
import { TOOLS_DATA } from '../../data/tools';

export const SitemapGeneratorTool: React.FC = () => {
  const defaultUrls: SitemapItem[] = [
    { url: 'https://omnitools.pro/', changefreq: 'daily', priority: 1.0, lastmod: '2026-10-23' },
    ...TOOLS_DATA.map((tool) => ({
      url: `https://omnitools.pro/tool/${tool.slug}`,
      changefreq: 'weekly' as const,
      priority: 0.8,
      lastmod: '2026-10-23',
    })),
  ];

  const [items, setItems] = useState<SitemapItem[]>(defaultUrls);
  const [domainInput, setDomainInput] = useState('https://example.com');
  const [newUrl, setNewUrl] = useState('');
  const [defaultFreq, setDefaultFreq] = useState<'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly'>('weekly');
  const [defaultPriority, setDefaultPriority] = useState<number>(0.8);
  const [copied, setCopied] = useState(false);
  const [bulkInput, setBulkInput] = useState('');
  const [showBulkMode, setShowBulkMode] = useState(false);

  const xmlOutput = generateSitemapXml(items);
  const validation = validateSitemapXml(xmlOutput);

  const handleCopy = () => {
    navigator.clipboard.writeText(xmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([xmlOutput], { type: 'application/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sitemap.xml');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;
    const formattedUrl = newUrl.startsWith('http') ? newUrl.trim() : `https://${newUrl.trim()}`;
    setItems([
      ...items,
      {
        url: formattedUrl,
        changefreq: defaultFreq,
        priority: defaultPriority,
        lastmod: new Date().toISOString().split('T')[0],
      },
    ]);
    setNewUrl('');
  };

  const handleRemove = (index: number) => {
    setItems(items.filter((_, idx) => idx !== index));
  };

  const handleApplyDomainPrefix = () => {
    if (!domainInput.trim()) return;
    const cleanDomain = domainInput.trim().replace(/\/+$/, '');
    const samplePaths = [
      '',
      '/about',
      '/contact',
      '/privacy-policy',
      '/terms',
      '/blog',
      '/services',
      '/pricing',
    ];
    const generated: SitemapItem[] = samplePaths.map((p, idx) => ({
      url: `${cleanDomain}${p}`,
      changefreq: idx === 0 ? 'daily' : 'weekly',
      priority: idx === 0 ? 1.0 : 0.7,
      lastmod: '2026-10-23',
    }));
    setItems(generated);
  };

  const handleLoadBulkUrls = () => {
    if (!bulkInput.trim()) return;
    const rawLines = bulkInput.split('\n').map((l) => l.trim()).filter(Boolean);
    const newItems: SitemapItem[] = rawLines.map((line) => {
      const formatted = line.startsWith('http') ? line : `https://${line}`;
      return {
        url: formatted,
        changefreq: defaultFreq,
        priority: defaultPriority,
        lastmod: '2026-10-23',
      };
    });
    setItems(newItems);
    setShowBulkMode(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Automated Sitemap Features */}
      <div className="bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-600 text-white">
              <FileCode className="w-4 h-4" />
            </span>
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
              Automated Google-Compliant Sitemap XML Generator
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            Builds valid <code className="bg-white/80 dark:bg-slate-800 px-1 py-0.5 rounded text-indigo-700 dark:text-indigo-300">&lt;urlset&gt;</code> sitemaps accepted by Google Search Console, Bing Webmaster Tools, and Yandex.
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
          <button
            onClick={() => setItems(defaultUrls)}
            className="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-indigo-500 text-slate-700 dark:text-slate-200 font-medium transition-colors cursor-pointer"
          >
            Reset to OmniTools Map
          </button>
          <button
            onClick={() => setShowBulkMode(!showBulkMode)}
            className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors cursor-pointer"
          >
            {showBulkMode ? 'Single Add Mode' : 'Bulk Paste URLs'}
          </button>
        </div>
      </div>

      {/* Domain Quick Batch Builder */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Generate Instant Sitemap for Any Domain:
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="url"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              placeholder="https://yourwebsite.com"
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={handleApplyDomainPrefix}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            Auto-Populate Pages
          </button>
        </div>
      </div>

      {showBulkMode ? (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Bulk Paste Webpage URLs (One URL per line):
          </label>
          <textarea
            value={bulkInput}
            onChange={(e) => setBulkInput(e.target.value)}
            rows={5}
            placeholder={`https://example.com/\nhttps://example.com/about\nhttps://example.com/contact\nhttps://example.com/blog/my-post`}
            className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-indigo-500 mb-2"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowBulkMode(false)}
              className="px-3 py-1.5 rounded-lg text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleLoadBulkUrls}
              className="px-4 py-1.5 rounded-lg text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-medium cursor-pointer"
            >
              Import All URLs
            </button>
          </div>
        </div>
      ) : (
        /* Add Single URL Form */
        <form onSubmit={handleAddUrl} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
            <div className="md:col-span-6">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Add URL to Sitemap
              </label>
              <input
                type="text"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://example.com/new-page"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Changefreq
              </label>
              <select
                value={defaultFreq}
                onChange={(e) => setDefaultFreq(e.target.value as any)}
                className="w-full px-2 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="daily">daily</option>
                <option value="weekly">weekly</option>
                <option value="monthly">monthly</option>
                <option value="hourly">hourly</option>
                <option value="yearly">yearly</option>
                <option value="always">always</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Priority ({defaultPriority.toFixed(1)})
              </label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={defaultPriority}
                onChange={(e) => setDefaultPriority(parseFloat(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add URL</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* URL Table list preview */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <span>Sitemap Entries ({items.length})</span>
            {validation.valid ? (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Valid XML Schema</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-rose-500 text-[11px] font-medium">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{validation.error}</span>
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-500">Googlebot max: 50,000 URLs / file</span>
        </div>

        <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-2.5 sm:px-4 flex items-center justify-between gap-3 text-xs hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
            >
              <div className="min-w-0 flex-1 flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-400 w-6 shrink-0">{index + 1}.</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 truncate">{item.url}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
                  {item.changefreq}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[11px] font-semibold">
                  {item.priority?.toFixed(1)}
                </span>
                <button
                  onClick={() => handleRemove(index)}
                  className="p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                  title="Remove from sitemap"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* XML Code Output & Download */}
      <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-md">
        <div className="p-3 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2 font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
            <span>Generated sitemap.xml</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied XML!' : 'Copy XML'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download sitemap.xml</span>
            </button>
          </div>
        </div>

        <pre className="p-4 text-[11px] font-mono text-emerald-300/90 overflow-x-auto max-h-72 leading-relaxed selection:bg-indigo-600 selection:text-white">
          {xmlOutput}
        </pre>
      </div>

      {/* How to submit to Google Search Console Card */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-2">
        <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <span>Google Search Console Submission Tip:</span>
        </div>
        <p>
          1. Upload your <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">sitemap.xml</code> to your website root. (e.g. <span className="font-mono text-indigo-600 dark:text-indigo-400">https://yourdomain.com/sitemap.xml</span>).
        </p>
        <p>
          2. Log in to <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 underline inline-flex items-center gap-0.5">Google Search Console <ExternalLink className="w-3 h-3" /></a>, select your property, navigate to <strong>Sitemaps</strong> in the left sidebar, type <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">sitemap.xml</code> and click <strong>Submit</strong>. Googlebot will immediately queue your pages for rapid indexing.
        </p>
      </div>
    </div>
  );
};
