import React, { useState, useRef } from 'react';
import { Upload, Download, Image as ImageIcon, Zap, ShieldCheck, RefreshCw } from 'lucide-react';

export const ImageCompressorTool: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [originalName, setOriginalName] = useState<string>('image');
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(80);
  const [format, setFormat] = useState<'image/webp' | 'image/jpeg' | 'image/png'>('image/webp');
  const [maxWidth, setMaxWidth] = useState<number>(1920);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalSize(file.size);
    setOriginalName(file.name.replace(/\.[^/.]+$/, ''));

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setSelectedImage(src);
      compressImage(src, quality, format, maxWidth);
    };
    reader.readAsDataURL(file);
  };

  const compressImage = (
    src: string,
    targetQuality: number,
    targetFormat: string,
    targetMaxWidth: number
  ) => {
    setIsProcessing(true);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > targetMaxWidth) {
        height = Math.round((height * targetMaxWidth) / width);
        width = targetMaxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      // Draw image
      ctx.drawImage(img, 0, 0, width, height);

      // Export to blob
      const exportQuality = targetFormat === 'image/png' ? undefined : targetQuality / 100;
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedSize(blob.size);
            const compressedUrl = URL.createObjectURL(blob);
            setCompressedImage(compressedUrl);
          }
          setIsProcessing(false);
        },
        targetFormat,
        exportQuality
      );
    };
  };

  const handleQualityChange = (newVal: number) => {
    setQuality(newVal);
    if (selectedImage) {
      compressImage(selectedImage, newVal, format, maxWidth);
    }
  };

  const handleFormatChange = (newFormat: 'image/webp' | 'image/jpeg' | 'image/png') => {
    setFormat(newFormat);
    if (selectedImage) {
      compressImage(selectedImage, quality, newFormat, maxWidth);
    }
  };

  const handleMaxWidthChange = (newWidth: number) => {
    setMaxWidth(newWidth);
    if (selectedImage) {
      compressImage(selectedImage, quality, format, newWidth);
    }
  };

  const handleDownload = () => {
    if (!compressedImage) return;
    const ext = format === 'image/webp' ? 'webp' : format === 'image/png' ? 'png' : 'jpg';
    const link = document.createElement('a');
    link.href = compressedImage;
    link.download = `${originalName}-compressed.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const savedPercent =
    originalSize > 0 && compressedSize > 0
      ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
      : 0;

  return (
    <div className="space-y-6">
      {/* Privacy & Speed Notice */}
      <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Client-Side Processing: Photos never leave your browser. Zero privacy risk.</span>
        </div>
        <span className="font-semibold hidden sm:inline">Core Web Vitals Booster</span>
      </div>

      {/* Upload Zone */}
      {!selectedImage ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-2xl p-10 text-center cursor-pointer transition-colors bg-white dark:bg-slate-900"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Upload className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base mb-1">
            Click to upload or drag and drop an image
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Supports JPEG, PNG, and WebP (up to 25MB)
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            {/* Format Picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Format (WebP = Best SEO)
              </label>
              <select
                value={format}
                onChange={(e) => handleFormatChange(e.target.value as any)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium"
              >
                <option value="image/webp">WebP (Recommended by Google)</option>
                <option value="image/jpeg">JPEG / JPG</option>
                <option value="image/png">PNG</option>
              </select>
            </div>

            {/* Quality Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Quality ({quality}%)</span>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400">
                  {quality > 85 ? 'High Fidelity' : quality > 65 ? 'Balanced' : 'Max Compression'}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => handleQualityChange(parseInt(e.target.value))}
                disabled={format === 'image/png'}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* Max Width */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Max Width Resize
              </label>
              <select
                value={maxWidth}
                onChange={(e) => handleMaxWidthChange(parseInt(e.target.value))}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium"
              >
                <option value={1920}>1920px (Full HD)</option>
                <option value={1200}>1200px (Blog Header)</option>
                <option value={800}>800px (Content)</option>
                <option value={400}>400px (Thumbnail)</option>
              </select>
            </div>
          </div>

          {/* Side by side comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 text-center shadow-xs">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                <span>Original Image</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">{formatBytes(originalSize)}</span>
              </div>
              <div className="h-60 flex items-center justify-center bg-slate-100 dark:bg-slate-950 rounded-lg overflow-hidden p-2">
                <img
                  src={selectedImage}
                  alt="Original Preview"
                  className="max-h-full max-w-full object-contain rounded"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 text-center shadow-xs">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Compressed Result</span>
                </span>
                <span className="font-mono text-emerald-600 font-bold">
                  {formatBytes(compressedSize)} (-{savedPercent}%)
                </span>
              </div>
              <div className="h-60 flex items-center justify-center bg-slate-100 dark:bg-slate-950 rounded-lg overflow-hidden p-2">
                {compressedImage ? (
                  <img
                    src={compressedImage}
                    alt="Compressed Preview"
                    className="max-h-full max-w-full object-contain rounded"
                  />
                ) : (
                  <span className="text-xs text-slate-400">Compressing...</span>
                )}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-100 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-600 dark:text-slate-300">
              <span className="font-bold text-slate-900 dark:text-white">Savings: </span>
              Reduced file size by {savedPercent}% ({formatBytes(originalSize - compressedSize)} saved)
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setCompressedImage(null);
                }}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 cursor-pointer"
              >
                Upload Another
              </button>
              <button
                onClick={handleDownload}
                disabled={!compressedImage}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 text-xs font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>Download Optimized</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
