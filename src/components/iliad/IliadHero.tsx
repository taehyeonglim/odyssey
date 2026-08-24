import React from 'react';
import { Flame, Swords, Sparkles } from 'lucide-react';
import { ILIAD_OVERVIEW } from '../../data/iliadData';
import { audioEngine } from '../../utils/soundSynth';

export interface IliadHeroProps {
  onExploreClick: () => void;
  onOpenImageModal: (src: string, title: string, caption?: string) => void;
}

export const IliadHero: React.FC<IliadHeroProps> = ({ onExploreClick, onOpenImageModal }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#15110d] border border-amber-500/30 shadow-2xl mb-12">
      {/* Background Graphic Accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a08] via-[#0c0a08]/80 to-transparent z-10" />

      {/* Hero Image */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 h-full opacity-40 lg:opacity-80">
        <img
          src="./assets/images/iliad_achilles_rage.jpg"
          alt="아킬레우스의 분노"
          className="w-full h-full object-cover object-center cursor-pointer hover:scale-105 transition duration-700"
          onClick={() => {
            audioEngine.playChime();
            onOpenImageModal(
              './assets/images/iliad_achilles_rage.jpg',
              '아킬레우스의 분노 (Achilles\' Divine Wrath)',
              '트로이 해변 막사에서 분노와 비탄에 휩싸인 아킬레우스'
            );
          }}
        />
        <div className="absolute bottom-3 right-4 bg-black/60 backdrop-blur px-2.5 py-1 rounded text-[11px] text-amber-300 flex items-center gap-1 z-20">
          <Sparkles className="w-3 h-3" /> 클릭하여 확대 (Gemini AI)
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 p-6 sm:p-10 lg:p-12 max-w-2xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-serif font-bold uppercase tracking-wider mb-4 shadow-sm">
          <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span>전쟁 서사시의 절대적 기원</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-amber-100 leading-tight mb-3">
          {ILIAD_OVERVIEW.title}
        </h1>
        <p className="text-base sm:text-lg text-amber-400/90 font-serif font-semibold mb-6">
          {ILIAD_OVERVIEW.subtitle}
        </p>

        {/* Greek Invocation Quote Card */}
        <div className="bg-[#0c0a08]/90 border-l-4 border-rose-500 p-4 rounded-r-xl mb-6 shadow-md backdrop-blur-sm">
          <p className="text-xs font-serif text-amber-400/70 italic tracking-wider mb-1 font-mono">
            {ILIAD_OVERVIEW.greekMainQuote}
          </p>
          <p className="text-sm font-serif text-slate-200 leading-relaxed font-medium">
            "{ILIAD_OVERVIEW.mainQuote}"
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 text-xs font-serif">
          <div className="bg-[#0c0a08]/60 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-400 block text-[11px]">배경 기간</span>
            <span className="text-amber-300 font-bold">{ILIAD_OVERVIEW.duration}</span>
          </div>
          <div className="bg-[#0c0a08]/60 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-400 block text-[11px]">규모</span>
            <span className="text-amber-300 font-bold">{ILIAD_OVERVIEW.verses}</span>
          </div>
          <div className="bg-[#0c0a08]/60 p-3 rounded-lg border border-slate-800 col-span-2 sm:col-span-1">
            <span className="text-slate-400 block text-[11px]">핵심 화두</span>
            <span className="text-amber-300 font-bold">인간의 한계와 명예</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              audioEngine.playWarDrum();
              onExploreClick();
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-serif font-bold text-sm tracking-wide shadow-lg shadow-amber-900/40 flex items-center space-x-2 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Swords className="w-4 h-4" />
            <span>24권 타임라인 탐색하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
