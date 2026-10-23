import React from 'react';
import {
  Wrench,
  CheckCircle,
  FileCode,
  Globe,
  Shield,
  Heart,
  TrendingUp,
} from 'lucide-react';
import { TOOLS_DATA } from '../data/tools';
import { ToolCategory } from '../types';

interface FooterProps {
  onSelectTool: (id: string) => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'disclaimer' | 'about' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTool, onOpenLegal }) => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand & Crawler Summary */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white">
                OmniTools Pro
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Fast, privacy-focused, zero-install web utilities suite designed for digital marketers, webmasters, developers, and students. All calculations run client-side with 100% data security.
            </p>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
              <div className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>Search Engine Crawler Status</span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 flex flex-col gap-1 font-mono">
                <span>• Indexing: Allowed (index, follow)</span>
                <span>• XML Sitemap: Automated &amp; Validated</span>
                <span>• Structured Data: Schema.org WebApplication</span>
              </div>
            </div>
          </div>

          {/* Quick Tool Links by Category */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              SEO &amp; Webmaster Tools
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              {TOOLS_DATA.filter((t) => t.category === 'seo').map((tool) => (
                <li key={tool.id}>
                  <button
                    onClick={() => {
                      onSelectTool(tool.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer text-left transition-colors"
                  >
                    {tool.shortName}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Popular Utilities
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              {TOOLS_DATA.filter((t) => t.category !== 'seo').slice(0, 6).map((tool) => (
                <li key={tool.id}>
                  <button
                    onClick={() => {
                      onSelectTool(tool.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer text-left transition-colors"
                  >
                    {tool.shortName}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Google AdSense & Webmaster Compliance */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Compliance &amp; Legal
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('disclaimer')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                >
                  AdSense Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('about')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('contact')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-mono text-[11px] hover:underline"
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>sitemap.xml</span>
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-mono text-[11px] hover:underline"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>robots.txt</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <div>
            &copy; {new Date().getFullYear()} OmniTools Pro. All rights reserved. Free high-traffic web tools.
          </div>
          <div className="flex items-center gap-1">
            <span>Optimized for Google Crawlers &amp; AdSense RPM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
