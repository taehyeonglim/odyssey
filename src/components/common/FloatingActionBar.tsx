import React, { useState, useEffect } from 'react';
import { ArrowUp, Search, Quote, Sparkles } from 'lucide-react';
import { audioEngine } from '../../utils/soundSynth';

interface FloatingActionBarProps {
  onOpenSearch: () => void;
  onOpenQuoteModal: () => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
  onOpenSearch,
  onOpenQuoteModal
}) => {
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    audioEngine.playChime();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center space-x-2 animate-fadeIn">
      {/* Quick Search Button */}
      <button
        onClick={() => {
          audioEngine.playChime();
          onOpenSearch();
        }}
        className="p-3 rounded-full bg-[#15110d]/90 backdrop-blur-md border border-amber-500/40 text-amber-300 hover:text-white hover:bg-amber-950 shadow-xl transition"
        title="통합 검색 (Cmd+K)"
        aria-label="통합 검색"
      >
        <Search className="w-4 h-4" />
      </button>

      {/* Quick Quote Card Modal Trigger */}
      <button
        onClick={() => {
          audioEngine.playChime();
          onOpenQuoteModal();
        }}
        className="p-3 rounded-full bg-[#15110d]/90 backdrop-blur-md border border-amber-500/40 text-amber-300 hover:text-white hover:bg-amber-950 shadow-xl transition"
        title="명대사 카드 모음"
        aria-label="명대사 카드 모음"
      >
        <Quote className="w-4 h-4" />
      </button>

      {/* Back to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-amber-600 hover:bg-amber-500 text-white shadow-xl shadow-amber-950/80 transition animate-fadeIn"
          title="페이지 최상단으로 이동"
          aria-label="최상단으로 이동"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
