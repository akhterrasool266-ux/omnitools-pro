import React, { useState } from 'react';
import { Shield, FileText, Info, Mail, CheckCircle } from 'lucide-react';

export type LegalModalType = 'privacy' | 'terms' | 'disclaimer' | 'about' | 'contact' | null;

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  if (!type) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' && <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
            {type === 'terms' && <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
            {type === 'disclaimer' && <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
            {type === 'about' && <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
            {type === 'contact' && <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
              {type === 'privacy' && 'Privacy Policy & Cookie Disclosure'}
              {type === 'terms' && 'Terms of Service'}
              {type === 'disclaimer' && 'Google AdSense & Earnings Disclaimer'}
              {type === 'about' && 'About OmniTools Pro'}
              {type === 'contact' && 'Contact Us & Webmaster Support'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg cursor-pointer p-1"
          >
            ✕
          </button>
        </div>

        <div className="py-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
          {type === 'privacy' && (
            <>
              <p>
                <strong>Last Updated: October 2026</strong>
              </p>
              <p>
                At OmniTools Pro, accessible from our official domain, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information collected and how it is used, fully compliant with <strong>Google AdSense</strong> publisher requirements, GDPR, and CCPA.
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                1. Client-Side Processing &amp; Zero File Storage
              </h4>
              <p>
                All image compression, text conversions, sitemap generation, and calculation tools run entirely client-side inside your browser. No files, passwords, or personal documents are stored or uploaded to our servers.
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                2. Google AdSense &amp; DoubleClick Cookies
              </h4>
              <p>
                Google is a third-party vendor on our site. Google uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. Visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at{' '}
                <span className="font-mono text-indigo-600 dark:text-indigo-400">
                  https://policies.google.com/technologies/ads
                </span>
                .
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                3. Log Files &amp; Web Analytics
              </h4>
              <p>
                OmniTools Pro follows standard logging protocols. The information collected includes IP addresses, browser type, Internet Service Provider (ISP), date/time stamps, and referring/exit pages to analyze trends and optimize performance.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>
                Welcome to OmniTools Pro. By accessing or using our free web tools, you agree to comply with and be bound by the following terms and conditions.
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                1. Use of Services
              </h4>
              <p>
                All tools (XML Sitemap Generator, Image Compressor, EMI Calculator, JSON Formatter, etc.) are provided 100% free of charge for personal, commercial, and educational use without subscription requirements.
              </p>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                2. Disclaimer of Warranties
              </h4>
              <p>
                The materials and calculations provided on OmniTools Pro are provided on an &quot;as is&quot; basis. We make no warranties, expressed or implied, regarding financial decisions based on calculators.
              </p>
            </>
          )}

          {type === 'disclaimer' && (
            <>
              <p>
                <strong>Google AdSense &amp; Financial Calculations Disclaimer:</strong>
              </p>
              <p>
                This website contains advertisements served by Google AdSense and other advertising networks. OmniTools Pro may receive advertising fees when users click on or interact with sponsored placements.
              </p>
              <p>
                Our loan, EMI, and interest calculators provide estimates for informational purposes only and should not be construed as official financial advice or binding loan terms from financial institutions.
              </p>
            </>
          )}

          {type === 'about' && (
            <>
              <p>
                <strong>OmniTools Pro</strong> was created to solve a fundamental webmaster and creator problem: providing fast, zero-bloat, 100% private tools that deliver instant results directly in your web browser.
              </p>
              <p>
                Unlike slow, ad-cluttered tool sites that force file uploads to external servers, OmniTools Pro is engineered with modern Web APIs (Canvas, Crypto, Web Workers) to process all operations client-side in milliseconds.
              </p>
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-900">
                <span className="font-semibold text-indigo-900 dark:text-indigo-300">
                  Key Metrics:
                </span>
                <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                  <li>12+ High-demand webmaster and utility tools</li>
                  <li>100% Client-Side Privacy: No files leave your device</li>
                  <li>Automated XML sitemap &amp; crawler indexing optimization</li>
                  <li>Responsive layout tested across desktop, tablet, and mobile viewports</li>
                </ul>
              </div>
            </>
          )}

          {type === 'contact' && (
            <div>
              {contactSubmitted ? (
                <div className="p-6 text-center space-y-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
                  <CheckCircle className="w-8 h-8 mx-auto text-emerald-600" />
                  <div className="font-bold text-sm">Message Received!</div>
                  <div className="text-xs">Our webmaster team will review your inquiry within 24 hours.</div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <p className="text-xs text-slate-500">
                    Have a tool suggestion, feedback, or advertising partnership inquiry? Send us a note below.
                  </p>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your Email Address
                    </label>
                    <input
                      required
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Inquiry or Feedback
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      placeholder="Tell us what tool you would like added or provide feedback..."
                      className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium cursor-pointer shadow-xs"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
