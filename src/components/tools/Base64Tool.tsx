import React, { useState } from 'react';
import { Copy, Check, ArrowRightLeft, Trash2, Binary } from 'lucide-react';

export const Base64Tool: React.FC = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('OmniTools Pro: High Search Web Tools 🚀');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processOutput = () => {
    if (!input) return '';
    try {
      if (mode === 'encode') {
        // Safe UTF-8 Base64 encode
        const bytes = new TextEncoder().encode(input);
        const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
        return btoa(binString);
      } else {
        // Safe UTF-8 Base64 decode
        const binString = atob(input.trim());
        const bytes = Uint8Array.from(binString, (m) => m.charCodeAt(0));
        return new TextDecoder().decode(bytes);
      }
    } catch (err: unknown) {
      return 'Error: Invalid format for operation';
    }
  };

  const output = processOutput();

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setMode('encode')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
            mode === 'encode'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          Text → Base64 (Encode)
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
            mode === 'decode'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          Base64 → Text (Decode)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>{mode === 'encode' ? 'Plain Text Input (UTF-8)' : 'Base64 Encoded Input'}</span>
            <button
              onClick={() => setInput('')}
              className="text-slate-400 hover:text-rose-500 cursor-pointer"
            >
              Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            placeholder={mode === 'encode' ? 'Enter text here...' : 'Paste base64 string here...'}
            className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Output */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              <span>{mode === 'encode' ? 'Base64 Output' : 'Decoded Plain Text'}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium hover:underline cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={output}
              rows={8}
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-950 text-slate-800 dark:text-emerald-400 text-xs font-mono focus:outline-hidden"
            />
          </div>

          <button
            onClick={handleCopy}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium cursor-pointer transition-colors"
          >
            {copied ? 'Copied to Clipboard!' : 'Copy Converted Result'}
          </button>
        </div>
      </div>
    </div>
  );
};
