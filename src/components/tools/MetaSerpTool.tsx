import React, { useState } from 'react';
import { Copy, Check, Smartphone, Monitor, Share2, Sparkles, ExternalLink } from 'lucide-react';

export const MetaSerpTool: React.FC = () => {
  const [title, setTitle] = useState('Free Online Tools & Utilities Suite | Fast & Private');
  const [description, setDescription] = useState(
    'Access 100% free web utilities including XML sitemap generator, image compressor, JSON formatter, word counter, and loan EMI calculator. Fast and mobile-friendly.'
  );
  const [url, setUrl] = useState('https://omnitools.pro/best-free-tools');
  const [siteName, setSiteName] = useState('OmniTools Pro');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [tab, setTab] = useState<'serp' | 'social' | 'code'>('serp');
  const [copied, setCopied] = useState(false);

  const titleLength = title.length;
  const descLength = description.length;

  const generatedHtml = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}" />
<meta name="description" content="${description}" />
<link rel="canonical" href="${url}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:site_name" content="${siteName}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${url}" />
<meta property="twitter:title" content="${title}" />
<meta property="twitter:description" content="${description}" />`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Inputs Form */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              SEO Page Title
            </label>
            <span
              className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                titleLength > 60
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                  : titleLength >= 40
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
              }`}
            >
              {titleLength} / 60 chars {titleLength > 60 ? '(Will Truncate)' : ''}
            </span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Engaging page title targeting your primary keyword"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Meta Description
            </label>
            <span
              className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                descLength > 160
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                  : descLength >= 120
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
              }`}
            >
              {descLength} / 160 chars {descLength > 160 ? '(Will Truncate)' : ''}
            </span>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Accurate summary of content including a call-to-action to boost organic CTR"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Canonical URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Website / Brand Name
            </label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Tabs: SERP Preview vs Social Card vs Code Output */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setTab('serp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              tab === 'serp'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Google SERP Simulator
          </button>
          <button
            onClick={() => setTab('social')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              tab === 'social'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Social Card Preview
          </button>
          <button
            onClick={() => setTab('code')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              tab === 'code'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            HTML Meta Code
          </button>
        </div>

        {tab === 'serp' && (
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`p-1 rounded text-xs transition-colors cursor-pointer ${
                previewMode === 'desktop'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500'
              }`}
              title="Desktop SERP"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`p-1 rounded text-xs transition-colors cursor-pointer ${
                previewMode === 'mobile'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500'
              }`}
              title="Mobile SERP"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Tab 1: Google SERP Preview */}
      {tab === 'serp' && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Google Search Snippet ({previewMode === 'desktop' ? 'Desktop View' : 'Mobile View'})
          </div>

          <div
            className={`transition-all ${
              previewMode === 'mobile' ? 'max-w-sm mx-auto border border-slate-200 dark:border-slate-800 p-4 rounded-xl' : ''
            }`}
          >
            <div className="flex items-center gap-2 mb-1 text-xs text-slate-700 dark:text-slate-300">
              <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold text-[10px]">
                {siteName.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-slate-800 dark:text-slate-200 text-xs">{siteName}</span>
                <span className="text-[11px] text-slate-500 truncate max-w-xs">{url}</span>
              </div>
            </div>

            <h4 className="text-base sm:text-lg text-blue-700 dark:text-blue-400 font-medium hover:underline cursor-pointer leading-snug">
              {titleLength > 60 ? title.substring(0, 58) + '...' : title}
            </h4>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {descLength > 160 ? description.substring(0, 157) + '...' : description}
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Social Card Preview */}
      {tab === 'social' && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs max-w-md mx-auto">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
            OpenGraph Social Card (X / Twitter / Facebook / LinkedIn)
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="h-40 bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-800 flex items-center justify-center text-white p-6 text-center">
              <div>
                <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <div className="font-bold text-sm tracking-wide">{siteName}</div>
                <div className="text-xs opacity-90 line-clamp-1">{title}</div>
              </div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80">
              <div className="text-[10px] font-mono uppercase text-slate-400 truncate">{url}</div>
              <div className="font-semibold text-xs text-slate-900 dark:text-white truncate mt-0.5">{title}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{description}</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: HTML Meta Code */}
      {tab === 'code' && (
        <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
          <div className="p-3 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between text-xs text-slate-300">
            <span className="font-mono">Generated &lt;head&gt; tags</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
          <pre className="p-4 text-xs font-mono text-emerald-300/90 overflow-x-auto leading-relaxed">
            {generatedHtml}
          </pre>
        </div>
      )}
    </div>
  );
};
