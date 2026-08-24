import React from 'react';
import { Compass, Sparkles, Wind } from 'lucide-react';
import { ODYSSEY_OVERVIEW } from '../../data/odysseyData';
import { audioEngine } from '../../utils/soundSynth';

export interface OdysseyHeroProps {
  onExploreMap: () => void;
  onOpenImageModal: (src: string, title: string, caption?: string) => void;
}

export const OdysseyHero: React.FC<OdysseyHeroProps> = ({ onExploreMap, onOpenImageModal }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#15110d] border border-aegean-500/30 shadow-2xl mb-12">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a08] via-[#0c0a08]/85 to-transparent z-10" />

      {/* Hero Image */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 h-full opacity-40 lg:opacity-85">
        <img
          src="./assets/images/odyssey_sirens.jpg"
          alt="세이렌의 유혹과 오디세우스"
          className="w-full h-full object-cover object-center cursor-pointer hover:scale-105 transition duration-700"
          onClick={() => {
            audioEngine.playChime();
            onOpenImageModal(
              './assets/images/odyssey_sirens.jpg',
              '세이렌의 유혹 (Odysseus & The Sirens)',
              '돛대에 몸을 묶은 채 영혼을 홀리는 천상의 노래를 듣는 오디세우스'
            );
          }}
        />
        <div className="absolute bottom-3 right-4 bg-black/60 backdrop-blur px-2.5 py-1 rounded text-[11px] text-aegean-300 flex items-center gap-1 z-20 border border-aegean-500/30">
          <Sparkles className="w-3 h-3" /> 클릭하여 확대 (Gemini AI)
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 p-6 sm:p-10 lg:p-12 max-w-2xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-aegean-950/90 border border-aegean-500/40 text-aegean-300 text-xs font-serif font-bold uppercase tracking-wider mb-4 shadow-sm">
          <Wind className="w-3.5 h-3.5 text-aegean-400 animate-spin" />
          <span>인간 승리와 10년 귀환의 대서사</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-amber-100 leading-tight mb-3">
          {ODYSSEY_OVERVIEW.title}
        </h1>
        <p className="text-base sm:text-lg text-aegean-300/90 font-serif font-semibold mb-6">
          {ODYSSEY_OVERVIEW.subtitle}
        </p>

        {/* Greek Invocation Quote Card */}
        <div className="bg-[#0c0a08]/90 border-l-4 border-aegean-500 p-4 rounded-r-xl mb-6 shadow-md backdrop-blur-sm">
          <p className="text-xs font-serif text-aegean-300/70 italic tracking-wider mb-1 font-mono">
            {ODYSSEY_OVERVIEW.greekMainQuote}
          </p>
          <p className="text-sm font-serif text-slate-200 leading-relaxed font-medium">
            "{ODYSSEY_OVERVIEW.mainQuote}"
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 text-xs font-serif">
          <div className="bg-[#0c0a08]/60 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-400 block text-[11px]">방랑 기간</span>
            <span className="text-aegean-300 font-bold">{ODYSSEY_OVERVIEW.duration}</span>
          </div>
          <div className="bg-[#0c0a08]/60 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-400 block text-[11px]">항해 규모</span>
            <span className="text-aegean-300 font-bold">14개 지중해 기착지</span>
          </div>
          <div className="bg-[#0c0a08]/60 p-3 rounded-lg border border-slate-800 col-span-2 sm:col-span-1">
            <span className="text-slate-400 block text-[11px]">핵심 가치</span>
            <span className="text-aegean-300 font-bold">귀향(Nostos)과 인내</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              audioEngine.playChime();
              onExploreMap();
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-aegean-600 to-aegean-800 hover:from-aegean-500 hover:to-aegean-700 text-white font-serif font-bold text-sm tracking-wide shadow-lg shadow-aegean-950/50 flex items-center space-x-2 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Compass className="w-4 h-4 text-aegean-200" />
            <span>지중해 항해 지도 탐험하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
