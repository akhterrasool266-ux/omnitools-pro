import React, { useState } from 'react';
import {
  Wrench,
  Search,
  Sun,
  Moon,
  DollarSign,
  Menu,
  X,
  Sparkles,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { ToolCategory, ToolMetadata } from '../types';
import { TOOLS_DATA } from '../data/tools';
import { SupportedLang, TRANSLATIONS } from '../utils/i18n';

interface HeaderProps {
  activeCategory: ToolCategory | 'all';
  onSelectCategory: (cat: ToolCategory | 'all') => void;
  activeToolId: string;
  onSelectTool: (toolId: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isMockAdEnabled: boolean;
  onToggleMockAds: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  currentLang: SupportedLang;
  onSelectLang: (lang: SupportedLang) => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'disclaimer' | 'about' | 'contact') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  activeToolId,
  onSelectTool,
  searchQuery,
  onSearchChange,
  isMockAdEnabled,
  onToggleMockAds,
  isDarkMode,
  onToggleDarkMode,
  currentLang,
  onSelectLang,
  onOpenLegal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const t = TRANSLATIONS[currentLang];

  const categories: Array<{ id: ToolCategory | 'all'; label: string }> = [
    { id: 'all', label: t.allTools },
    { id: 'seo', label: t.seoCategory },
    { id: 'media', label: t.mediaCategory },
    { id: 'text', label: t.textCategory },
    { id: 'finance', label: t.financeCategory },
    { id: 'health', label: t.healthCategory },
    { id: 'developer', label: t.devCategory },
  ];

  const searchResults = searchQuery.trim()
    ? TOOLS_DATA.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.highIntentKeywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top Banner Notice: SEO & Crawler Indexation Status */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white text-[11px] font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Google Crawler Optimized • Live Automated Sitemap Generator • AdSense Monetization Ready</span>
        <button
          onClick={onToggleMockAds}
          className="ml-2 px-2 py-0.5 rounded-full bg-white/20 hover:bg-white/30 text-[10px] uppercase font-bold tracking-wider cursor-pointer"
        >
          {isMockAdEnabled ? 'Ad Placements: Active' : 'Ad Placements: Hidden'}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo */}
          <div
            onClick={() => {
              onSelectTool(TOOLS_DATA[0].id);
              onSelectCategory('all');
            }}
            className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                  OmniTools
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/70 dark:text-indigo-300">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block">
                High Search Free Web Tools Suite
              </p>
            </div>
          </div>

          {/* Search Box with Autocomplete Dropdown */}
          <div className="relative flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Instant Search Results Dropdown */}
            {searchFocused && searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden z-50 divide-y divide-slate-100 dark:divide-slate-800">
                {searchResults.length === 0 ? (
                  <div className="p-3 text-xs text-slate-500 text-center">
                    No tools match &quot;{searchQuery}&quot;
                  </div>
                ) : (
                  searchResults.slice(0, 5).map((tool) => (
                    <div
                      key={tool.id}
                      onMouseDown={() => {
                        onSelectTool(tool.id);
                        onSearchChange('');
                      }}
                      className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {tool.name}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate max-w-xs">
                          {tool.searchVolume} • {tool.estimatedCpc} CPC
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-2">
            {/* AdSense Mock Toggle */}
            <button
              onClick={onToggleMockAds}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors border ${
                isMockAdEnabled
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
              title="Toggle AdSense monetization preview"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>AdSense: {isMockAdEnabled ? 'ON' : 'OFF'}</span>
            </button>

            {/* Language Selector */}
            <div className="relative">
              <select
                value={currentLang}
                onChange={(e) => onSelectLang(e.target.value as SupportedLang)}
                aria-label="Language selection"
                className="px-2 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              >
                <option value="en">🇺🇸 EN</option>
                <option value="ur">🇵🇰 اردو</option>
                <option value="hi">🇮🇳 हिन्दी</option>
                <option value="es">🇪🇸 ES</option>
                <option value="ar">🇸🇦 العربية</option>
              </select>
            </div>

            {/* Dark Mode */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:hidden rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="sm:hidden pb-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-2.5 pt-0.5 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-4 shadow-xl">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            All Online Tools ({TOOLS_DATA.length})
          </div>
          <div className="grid grid-cols-1 gap-1 max-h-60 overflow-y-auto">
            {TOOLS_DATA.map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  onSelectTool(tool.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-lg text-left text-xs font-medium flex items-center justify-between cursor-pointer ${
                  activeToolId === tool.id
                    ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>{tool.name}</span>
                <span className="text-[10px] text-slate-400">{tool.searchVolume}</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => {
                onOpenLegal('privacy');
                setMobileMenuOpen(false);
              }}
              className="text-slate-500 hover:underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button
              onClick={() => {
                onOpenLegal('terms');
                setMobileMenuOpen(false);
              }}
              className="text-slate-500 hover:underline cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button
              onClick={() => {
                onOpenLegal('contact');
                setMobileMenuOpen(false);
              }}
              className="text-slate-500 hover:underline cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
