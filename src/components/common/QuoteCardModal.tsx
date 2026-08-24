import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, BookOpen, Quote } from 'lucide-react';
import { audioEngine } from '../../utils/soundSynth';

interface QuoteCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: {
    korean: string;
    greek?: string;
    speaker: string;
    source: string;
  } | null;
}

export const QuoteCardModal: React.FC<QuoteCardModalProps> = ({ isOpen, onClose, quote }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !quote) return null;

  const handleCopy = () => {
    const textToCopy = `"${quote.korean}"\n\n— ${quote.speaker} (${quote.source})\n${quote.greek ? `[그리스어 원문: ${quote.greek}]` : ''}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    audioEngine.playChime();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-xl w-full bg-[#15110d] border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-amber-950/60 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h4 className="font-serif text-lg font-bold text-amber-200">호메로스 불멸의 명대사 카드</h4>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Canvas Preview */}
        <div className="relative bg-gradient-to-b from-[#1a140f] to-[#0c0a08] border-2 border-amber-500/40 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-xl">
          <Quote className="w-8 h-8 text-amber-500/40 mx-auto" />

          {quote.greek && (
            <p className="text-xs font-mono text-amber-300/70 italic leading-relaxed">
              {quote.greek}
            </p>
          )}

          <blockquote className="font-serif text-base sm:text-lg text-slate-100 font-medium italic leading-relaxed">
            "{quote.korean}"
          </blockquote>

          <div className="pt-2 border-t border-amber-500/20">
            <span className="font-serif text-sm font-bold text-amber-300 block">{quote.speaker}</span>
            <span className="text-[11px] text-slate-400 font-sans">{quote.source}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-400 font-sans">
            클립보드에 복사하여 인용구로 활용하세요.
          </span>

          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-serif font-bold flex items-center space-x-1.5 transition shadow"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "복사 완료!" : "명대사 복사"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
