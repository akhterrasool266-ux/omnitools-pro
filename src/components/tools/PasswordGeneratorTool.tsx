import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Shield, KeyRound, Lock } from 'lucide-react';
import { generatePassword, evaluatePasswordStrength } from '../../utils/seo-tools';

export const PasswordGeneratorTool: React.FC = () => {
  const [length, setLength] = useState<number>(18);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [avoidAmbiguous, setAvoidAmbiguous] = useState(true);
  const [password, setPassword] = useState(() =>
    generatePassword(18, {
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
      avoidAmbiguous: true,
    })
  );
  const [copied, setCopied] = useState(false);

  const strength = evaluatePasswordStrength(password);

  const handleGenerate = () => {
    setPassword(
      generatePassword(length, {
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols,
        avoidAmbiguous,
      })
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strengthColors = {
    'Very Weak': 'bg-rose-500 text-rose-500',
    Weak: 'bg-orange-500 text-orange-500',
    Medium: 'bg-amber-500 text-amber-500',
    Strong: 'bg-emerald-500 text-emerald-500',
    'Very Strong': 'bg-emerald-600 text-emerald-600',
  }[strength.label];

  return (
    <div className="space-y-6">
      {/* Password Display Box */}
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-md">
        <div className="flex items-center justify-between gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <span className="font-mono text-base sm:text-xl text-emerald-400 break-all select-all font-semibold">
            {password}
          </span>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleGenerate}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
              title="Generate new password"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Strength & Entropy meter */}
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span>Strength: <strong>{strength.label}</strong></span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Entropy: {strength.entropy} bits (~trillions of years to crack)
            </span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex gap-1">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-full flex-1 transition-all rounded-xs ${
                  step <= strength.score ? strengthColors.split(' ')[0] : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Options Controls */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            <span>Password Length</span>
            <span className="text-base font-bold text-indigo-600 dark:text-indigo-400 font-mono">
              {length} characters
            </span>
          </div>
          <input
            type="range"
            min="8"
            max="64"
            value={length}
            onChange={(e) => {
              setLength(Number(e.target.value));
              setPassword(
                generatePassword(Number(e.target.value), {
                  includeUppercase,
                  includeLowercase,
                  includeNumbers,
                  includeSymbols,
                  avoidAmbiguous,
                })
              );
            }}
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="rounded accent-indigo-600 w-4 h-4"
            />
            <span>Include Uppercase Letters (A-Z)</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="rounded accent-indigo-600 w-4 h-4"
            />
            <span>Include Lowercase Letters (a-z)</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="rounded accent-indigo-600 w-4 h-4"
            />
            <span>Include Numbers (0-9)</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="rounded accent-indigo-600 w-4 h-4"
            />
            <span>Include Symbols (!@#$%^&amp;*)</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer sm:col-span-2">
            <input
              type="checkbox"
              checked={avoidAmbiguous}
              onChange={(e) => setAvoidAmbiguous(e.target.checked)}
              className="rounded accent-indigo-600 w-4 h-4"
            />
            <span>Avoid Ambiguous Characters (e.g. 0, O, l, 1, |)</span>
          </label>
        </div>
      </div>
    </div>
  );
};
