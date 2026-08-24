import React from 'react';
import { X, Sparkles, ZoomIn } from 'lucide-react';

export interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  caption?: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  title,
  caption
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full bg-[#15110d] border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-amber-950/50 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/20 bg-[#0c0a08]">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif text-lg md:text-xl font-bold text-amber-200">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Image Display */}
        <div className="relative flex-1 bg-black/60 flex items-center justify-center overflow-hidden min-h-[300px]">
          <img
            src={imageSrc}
            alt={title}
            className="max-h-[65vh] w-auto object-contain rounded transition duration-300 select-none shadow-lg"
          />
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur px-3 py-1 rounded text-xs text-amber-300 flex items-center gap-1 border border-amber-500/20">
            <ZoomIn className="w-3.5 h-3.5" /> Gemini AI Generated Masterpiece
          </div>
        </div>

        {/* Caption */}
        {caption && (
          <div className="px-6 py-4 bg-[#0c0a08] border-t border-amber-500/20 text-slate-300 text-sm font-serif italic leading-relaxed">
            "{caption}"
          </div>
        )}
      </div>
    </div>
  );
};
