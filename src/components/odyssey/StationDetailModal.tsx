import React from 'react';
import { X, MapPin, Compass, ShieldAlert, Sparkles, ZoomIn, Skull, ArrowRight, ArrowLeft } from 'lucide-react';
import { OdysseyStation } from '../../data/odysseyData';
import { audioEngine } from '../../utils/soundSynth';

interface StationDetailModalProps {
  station: OdysseyStation | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onOpenImageModal: (src: string, title: string, caption?: string) => void;
}

export const StationDetailModal: React.FC<StationDetailModalProps> = ({
  station,
  onClose,
  onPrev,
  onNext,
  onOpenImageModal
}) => {
  if (!station) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-parchment-900 border border-aegean-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-aegean-950/60 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-parchment-950 border-b border-aegean-500/20">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-full bg-aegean-950 border border-aegean-400/50 text-aegean-300 font-serif font-black flex items-center justify-center text-sm">
              {station.order}
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-100">{station.nameKo}</h3>
                <span className="text-xs font-serif text-aegean-400/80 px-2 py-0.5 rounded bg-aegean-950/60 border border-aegean-500/20">
                  {station.nameGr}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans flex items-center gap-1">
                <MapPin className="w-3 h-3 text-aegean-400" /> {station.region}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Gemini Artwork If Available */}
          {station.image && (
            <div className="relative rounded-2xl overflow-hidden border border-aegean-500/30 group">
              <img
                src={station.image}
                alt={station.nameKo}
                className="w-full h-56 sm:h-72 object-cover object-center cursor-pointer hover:scale-102 transition duration-500"
                onClick={() => {
                  audioEngine.playChime();
                  onOpenImageModal(station.image!, station.nameKo, station.quote);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="text-xs text-aegean-200 font-serif font-semibold drop-shadow flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Gemini AI 생성 일러스트
                </span>
                <span className="bg-black/70 backdrop-blur px-2.5 py-1 rounded text-[11px] text-amber-300 flex items-center gap-1 border border-amber-500/30">
                  <ZoomIn className="w-3 h-3" /> 크게 보기
                </span>
              </div>
            </div>
          )}

          {/* Narrative Detailed Story */}
          <div className="bg-parchment-950/70 p-5 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="font-serif text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-aegean-400" /> 서사 상세
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
              {station.detail}
            </p>
          </div>

          {/* 3-Column Analysis Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-parchment-950/90 p-4 rounded-xl border border-rose-500/20">
              <span className="text-[11px] font-serif uppercase tracking-wider text-rose-400 font-bold block mb-1 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> 마주한 시련
              </span>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {station.challenge}
              </p>
            </div>

            <div className="bg-parchment-950/90 p-4 rounded-xl border border-aegean-500/20">
              <span className="text-[11px] font-serif uppercase tracking-wider text-aegean-300 font-bold block mb-1 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" /> 오디세우스의 지략
              </span>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {station.odysseusStrategy}
              </p>
            </div>

            <div className="bg-parchment-950/90 p-4 rounded-xl border border-amber-500/20">
              <span className="text-[11px] font-serif uppercase tracking-wider text-amber-400 font-bold block mb-1 flex items-center gap-1">
                <Skull className="w-3.5 h-3.5" /> 피해 및 결과
              </span>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {station.lossOrGain}
              </p>
            </div>
          </div>

          {/* Homeric Quote */}
          <div className="bg-aegean-950/30 border-l-4 border-aegean-500 p-4 rounded-r-xl space-y-1">
            {station.greekQuote && (
              <p className="text-xs font-mono text-aegean-300/70 italic">
                {station.greekQuote}
              </p>
            )}
            <blockquote className="text-xs sm:text-sm font-serif italic text-slate-200 leading-relaxed">
              "{station.quote}"
            </blockquote>
          </div>
        </div>

        {/* Modal Footer Navigation */}
        <div className="px-6 py-4 bg-parchment-950 border-t border-aegean-500/20 flex items-center justify-between">
          <button
            onClick={() => {
              if (onPrev) {
                audioEngine.playChime();
                onPrev();
              }
            }}
            disabled={!onPrev}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition ${
              onPrev ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-600 cursor-not-allowed'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>이전 여정</span>
          </button>

          <span className="text-xs font-serif text-slate-400">
            {station.order} / 14 기착지
          </span>

          <button
            onClick={() => {
              if (onNext) {
                audioEngine.playChime();
                onNext();
              }
            }}
            disabled={!onNext}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition ${
              onNext ? 'text-amber-300 hover:text-amber-200 hover:bg-amber-950' : 'text-slate-600 cursor-not-allowed'
            }`}
          >
            <span>다음 여정</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
