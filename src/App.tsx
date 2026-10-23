import React, { useState, useEffect } from 'react';
import {
  Wrench,
  Search,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Share2,
  CheckCircle2,
  Star,
  ExternalLink,
  Code2,
  Image as ImageIcon,
  Calculator,
  AlignLeft,
  FileCode,
  Network,
  BarChart2,
  QrCode,
  Lock,
  Type,
  Binary,
  DollarSign,
  Calendar,
  Activity,
} from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AdSenseUnit } from './components/AdSenseUnit';
import { SeoContentSection } from './components/SeoContentSection';
import { LegalModal, LegalModalType } from './components/Modals/LegalModal';
import { TOOLS_DATA } from './data/tools';
import { ToolCategory, ToolMetadata } from './types';
import { SupportedLang } from './utils/i18n';

// Tool interactive components
import { SitemapGeneratorTool } from './components/tools/SitemapGeneratorTool';
import { MetaSerpTool } from './components/tools/MetaSerpTool';
import { RobotsTxtTool } from './components/tools/RobotsTxtTool';
import { KeywordDensityTool } from './components/tools/KeywordDensityTool';
import { ImageCompressorTool } from './components/tools/ImageCompressorTool';
import { WordCounterTool } from './components/tools/WordCounterTool';
import { LoanEmiTool } from './components/tools/LoanEmiTool';
import { JsonFormatterTool } from './components/tools/JsonFormatterTool';
import { QrGeneratorTool } from './components/tools/QrGeneratorTool';
import { PasswordGeneratorTool } from './components/tools/PasswordGeneratorTool';
import { CaseConverterTool } from './components/tools/CaseConverterTool';
import { Base64Tool } from './components/tools/Base64Tool';
import { PdfTool } from './components/tools/PdfTool';
import { SalaryTaxTool } from './components/tools/SalaryTaxTool';
import { CryptoRoiTool } from './components/tools/CryptoRoiTool';
import { AgeMilestoneTool } from './components/tools/AgeMilestoneTool';
import { BmiCalorieTool } from './components/tools/BmiCalorieTool';

export default function App() {
  const [activeToolId, setActiveToolId] = useState<string>('sitemap-generator');
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMockAdEnabled, setIsMockAdEnabled] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<SupportedLang>('en');
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);

  const activeTool = TOOLS_DATA.find((t) => t.id === activeToolId) || TOOLS_DATA[0];

  // Update dynamic page title & meta when active tool changes
  useEffect(() => {
    document.title = `${activeTool.name} - Free Online Tool | OmniTools Pro`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', activeTool.metaDescription);
    }
  }, [activeTool]);

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const filteredTools = TOOLS_DATA.filter((tool) => {
    const matchesCategory =
      activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.highIntentKeywords.some((k) =>
        k.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'Network':
        return <Network className="w-5 h-5" />;
      case 'Search':
        return <Search className="w-5 h-5" />;
      case 'FileCode':
      case 'FileText':
        return <FileCode className="w-5 h-5" />;
      case 'BarChart2':
        return <BarChart2 className="w-5 h-5" />;
      case 'Image':
        return <ImageIcon className="w-5 h-5" />;
      case 'AlignLeft':
        return <AlignLeft className="w-5 h-5" />;
      case 'Calculator':
        return <Calculator className="w-5 h-5" />;
      case 'Code2':
        return <Code2 className="w-5 h-5" />;
      case 'QrCode':
        return <QrCode className="w-5 h-5" />;
      case 'Lock':
        return <Lock className="w-5 h-5" />;
      case 'Type':
        return <Type className="w-5 h-5" />;
      case 'Binary':
        return <Binary className="w-5 h-5" />;
      case 'DollarSign':
        return <DollarSign className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      case 'Calendar':
        return <Calendar className="w-5 h-5" />;
      case 'Activity':
        return <CheckCircle2 className="w-5 h-5" />;
      default:
        return <Wrench className="w-5 h-5" />;
    }
  };

  const renderActiveToolComponent = () => {
    switch (activeTool.id) {
      case 'sitemap-generator':
        return <SitemapGeneratorTool />;
      case 'meta-serp-previewer':
        return <MetaSerpTool />;
      case 'robots-txt-generator':
        return <RobotsTxtTool />;
      case 'keyword-density':
        return <KeywordDensityTool />;
      case 'image-compressor':
        return <ImageCompressorTool />;
      case 'word-counter':
        return <WordCounterTool />;
      case 'loan-emi-calculator':
        return <LoanEmiTool />;
      case 'json-formatter':
        return <JsonFormatterTool />;
      case 'qr-generator':
        return <QrGeneratorTool />;
      case 'password-generator':
        return <PasswordGeneratorTool />;
      case 'case-converter':
        return <CaseConverterTool />;
      case 'base64-converter':
        return <Base64Tool />;
      case 'pdf-tools':
        return <PdfTool />;
      case 'salary-tax-calculator':
        return <SalaryTaxTool />;
      case 'crypto-roi-calculator':
        return <CryptoRoiTool />;
      case 'age-calculator':
        return <AgeMilestoneTool />;
      case 'bmi-calorie-calculator':
        return <BmiCalorieTool />;
      default:
        return <SitemapGeneratorTool />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
      {/* Header */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          // If active tool not in category, pick first from category
          if (cat !== 'all') {
            const firstInCat = TOOLS_DATA.find((t) => t.category === cat);
            if (firstInCat) setActiveToolId(firstInCat.id);
          }
        }}
        activeToolId={activeToolId}
        onSelectTool={(id) => {
          setActiveToolId(id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isMockAdEnabled={isMockAdEnabled}
        onToggleMockAds={() => setIsMockAdEnabled(!isMockAdEnabled)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        onOpenLegal={setLegalModal}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top AdSense Leaderboard Slot */}
        <AdSenseUnit
          slot="leaderboard"
          isMockAdEnabled={isMockAdEnabled}
          className="mb-6"
        />

        {/* Breadcrumb Navigation for SEO & Crawlers */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-4 overflow-x-auto whitespace-nowrap"
        >
          <button
            onClick={() => {
              setActiveCategory('all');
              setActiveToolId(TOOLS_DATA[0].id);
            }}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-400 shrink-0" />
          <button
            onClick={() => setActiveCategory(activeTool.category)}
            className="capitalize hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
          >
            {activeTool.category} Tools
          </button>
          <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
            {activeTool.shortName}
          </span>
        </nav>

        {/* 2-Column Responsive Workspace: Active Tool (col-8/9) + High-intent Sidebar (col-4/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Active Tool Interactive Workspace */}
          <section className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* Tool Header Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-xs shrink-0">
                    {getToolIcon(activeTool.icon)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {activeTool.name}
                      </h1>
                      {activeTool.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                          {activeTool.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {activeTool.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Free &amp; Instant</span>
                  </span>
                </div>
              </div>

              {/* Active Tool Interactive Container */}
              <div className="pt-6">
                {renderActiveToolComponent()}
              </div>
            </div>

            {/* In-Article AdSense Banner (Positioned between tool and SEO guide for optimal CTR) */}
            <AdSenseUnit
              slot="in-article"
              isMockAdEnabled={isMockAdEnabled}
            />

            {/* Deep Original SEO Content, How-To, & FAQ Accordions */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
              <SeoContentSection tool={activeTool} />
            </div>
          </section>

          {/* Right Column: Sticky Sidebar with Tools Catalog & AdSense unit */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
            {/* Quick Tools Explorer Sidebar */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span>High-Search Tools Suite</span>
                </h3>
                <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                  {filteredTools.length} Available
                </span>
              </div>

              <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1">
                {filteredTools.map((tool) => {
                  const isCurrent = tool.id === activeTool.id;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => {
                        setActiveToolId(tool.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between gap-2 cursor-pointer ${
                        isCurrent
                          ? 'bg-indigo-600 text-white font-bold shadow-xs'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className={`p-1 rounded-md shrink-0 ${isCurrent ? 'bg-indigo-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                          {getToolIcon(tool.icon)}
                        </span>
                        <span className="truncate">{tool.shortName}</span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded ${
                            isCurrent
                              ? 'bg-indigo-700 text-indigo-100'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                          }`}
                        >
                          {tool.searchVolume.split(' ')[0]}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Sticky AdSense Slot */}
            <AdSenseUnit
              slot="sidebar"
              isMockAdEnabled={isMockAdEnabled}
              className="sticky top-24"
            />

            {/* High-CPC Niche Insights Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>SEO &amp; AdSense Strategy</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                Tools targeting financial calculators, XML sitemaps, and media compression enjoy 3x to 5x higher AdSense RPM compared to generic blogs.
              </p>
              <div className="pt-2 border-t border-indigo-200/60 dark:border-indigo-900/60 text-[11px] text-indigo-700 dark:text-indigo-400 font-semibold flex items-center justify-between">
                <span>Fast Indexation Active</span>
                <span className="font-mono">Googlebot 200 OK</span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <Footer
        onSelectTool={(id) => {
          setActiveToolId(id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLegal={setLegalModal}
      />

      {/* Compliance & Legal Modals */}
      <LegalModal
        type={legalModal}
        onClose={() => setLegalModal(null)}
      />
    </div>
  );
}
