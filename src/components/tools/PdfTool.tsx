import React, { useState } from 'react';
import { Upload, Download, FileText, Trash2, ShieldCheck, Check, Layers, AlertCircle } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

interface PdfFileItem {
  name: string;
  size: number;
  arrayBuffer: ArrayBuffer;
  pageCount?: number;
}

export const PdfTool: React.FC = () => {
  const [files, setFiles] = useState<PdfFileItem[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0) return;
    setErrorMsg(null);

    const newItems: PdfFileItem[] = [];
    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        continue;
      }
      try {
        const buffer = await file.arrayBuffer();
        const doc = await PDFDocument.load(buffer);
        newItems.push({
          name: file.name,
          size: file.size,
          arrayBuffer: buffer,
          pageCount: doc.getPageCount(),
        });
      } catch (err) {
        console.error('Error loading PDF', err);
      }
    }

    if (newItems.length === 0) {
      setErrorMsg('Please select valid PDF files.');
    } else {
      setFiles((prev) => [...prev, ...newItems]);
      setMergedPdfUrl(null);
    }
  };

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setMergedPdfUrl(null);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setErrorMsg('Please upload at least 2 PDF documents to combine them.');
      return;
    }
    setErrorMsg(null);
    setIsMerging(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        const doc = await PDFDocument.load(item.arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(doc, doc.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
    } catch (err: unknown) {
      setErrorMsg('Failed to merge PDFs. Please ensure documents are unencrypted.');
    } finally {
      setIsMerging(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const totalPages = files.reduce((acc, f) => acc + (f.pageCount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Privacy guarantee */}
      <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Client-Side Privacy: PDFs are merged in your device RAM. Never uploaded to any server.</span>
        </div>
      </div>

      {/* File Upload Zone */}
      <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 rounded-2xl p-6 sm:p-8 text-center bg-white dark:bg-slate-900 transition-colors">
        <input
          type="file"
          id="pdf-upload"
          multiple
          accept="application/pdf"
          onChange={handleFileUpload}
          className="hidden"
        />
        <label htmlFor="pdf-upload" className="cursor-pointer block">
          <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Upload className="w-6 h-6" />
          </div>
          <div className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
            Select or Drop PDF Files to Merge
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Choose 2 or more PDF documents to join into one file
          </div>
        </label>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Uploaded Documents List */}
      {files.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200">
            <span>Uploaded Documents ({files.length} files • {totalPages} total pages)</span>
            <button
              onClick={() => {
                setFiles([]);
                setMergedPdfUrl(null);
              }}
              className="text-slate-400 hover:text-rose-500 cursor-pointer font-normal"
            >
              Clear All
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-60 overflow-y-auto">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="p-3 flex items-center justify-between gap-3 text-xs hover:bg-slate-50 dark:hover:bg-slate-800/40"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="font-mono text-slate-400 w-5">{idx + 1}.</span>
                  <FileText className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span className="font-medium text-slate-800 dark:text-slate-200 truncate">{file.name}</span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-500">
                    {file.pageCount} pages ({formatSize(file.size)})
                  </span>
                  <button
                    onClick={() => handleRemove(idx)}
                    className="p-1 text-slate-400 hover:text-rose-500 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              Ready to merge {files.length} PDFs into 1 continuous document.
            </span>

            <button
              onClick={handleMerge}
              disabled={isMerging || files.length < 2}
              className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              <Layers className="w-4 h-4" />
              <span>{isMerging ? 'Merging Documents...' : 'Merge PDFs into Single File'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Merged File Download Ready */}
      {mergedPdfUrl && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-indigo-500/10 to-emerald-500/10 border border-emerald-300 dark:border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">
                PDF Merge Complete!
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Your merged document with {totalPages} pages is ready for download.
              </div>
            </div>
          </div>

          <a
            href={mergedPdfUrl}
            download="merged-documents.pdf"
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Merged PDF</span>
          </a>
        </div>
      )}
    </div>
  );
};
