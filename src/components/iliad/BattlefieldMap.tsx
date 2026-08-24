import React, { useState } from 'react';
import { BATTLEFIELD_ZONES, BattleZone } from '../../data/battlefieldData';
import { Swords, ShieldAlert, Sparkles, Navigation, ChevronRight, ChevronLeft } from 'lucide-react';
import { audioEngine } from '../../utils/soundSynth';

export const BattlefieldMap: React.FC = () => {
  const [selectedZoneIndex, setSelectedZoneIndex] = useState<number>(0);

  const currentZone: BattleZone = BATTLEFIELD_ZONES[selectedZoneIndex];

  const handleSelectZone = (idx: number) => {
    audioEngine.playWarDrum(0.35);
    setSelectedZoneIndex(idx);
  };

  const getTideBadge = (tide: BattleZone['tideOfWar']) => {
    switch (tide) {
      case 'greeks_advancing':
        return <span className="px-2.5 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-serif font-bold">그리스 연합군 우세</span>;
      case 'trojans_advancing':
        return <span className="px-2.5 py-0.5 rounded bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-serif font-bold">트로이 방어군 역습</span>;
      case 'stalemate':
        return <span className="px-2.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 text-xs font-serif font-bold">격렬한 백병전 공방</span>;
    }
  };

  return (
    <div className="my-12 bg-[#15110d] border border-rose-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-rose-500/20 pb-4">
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl font-black text-rose-100 flex items-center gap-2.5">
            <Swords className="w-7 h-7 text-rose-400" />
            <span>트로이아 전장 전술 맵 (Battlefield of Troy)</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            해변의 그리스 함선 진지부터 트로이 성채까지 10년간의 주요 격전지 전술 분석
          </p>
        </div>
      </div>

      {/* SVG Tactical Battlefield Map */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#1a120b] via-[#24130d] to-[#120a06] border border-rose-500/30 p-2 sm:p-4 overflow-hidden shadow-inner">
        <div className="w-full aspect-[16/8] min-h-[260px] max-h-[420px]">
          <svg viewBox="0 0 1000 500" className="w-full h-full select-none">
            {/* Background Terrain */}
            {/* Sea on left */}
            <path d="M 0 0 L 220 0 L 220 500 L 0 500 Z" fill="#0f1f38" opacity="0.6" />
            <text x="70" y="250" fill="#38bdf8" opacity="0.2" fontSize="20" fontFamily="serif" letterSpacing="4">HELLENIC SEA</text>

            {/* Shoreline Beach */}
            <path d="M 220 0 L 250 500" stroke="#d97706" strokeWidth="4" strokeDasharray="8,4" opacity="0.5" />

            {/* Plain Terrain */}
            <rect x="250" y="0" width="750" height="500" fill="#231812" opacity="0.4" />

            {/* Scamander River S-curve */}
            <path
              d="M 380 0 Q 460 200 400 350 Q 360 440 430 500"
              fill="none"
              stroke="#0284c7"
              strokeWidth="14"
              opacity="0.7"
            />
            <text x="410" y="230" fill="#7dd3fc" opacity="0.4" fontSize="13" fontFamily="serif">스카만드로스 강</text>

            {/* Troy Stone Walls on Right */}
            <path
              d="M 800 60 L 800 440 L 980 440 L 980 60 Z"
              fill="#3e271a"
              stroke="#991b1b"
              strokeWidth="6"
              opacity="0.8"
            />
            <text x="890" y="250" fill="#fca5a5" opacity="0.5" fontSize="18" fontFamily="serif" textAnchor="middle">트로이아 성채</text>

            {/* Frontline Arrows */}
            <line x1="280" y1="250" x2="740" y2="250" stroke="#ef4444" strokeWidth="2" strokeDasharray="6,6" opacity="0.4" />

            {/* Interactive Zone Pins */}
            {BATTLEFIELD_ZONES.map((zone, idx) => {
              const isSelected = selectedZoneIndex === idx;
              return (
                <g
                  key={zone.id}
                  className="cursor-pointer transition duration-300"
                  onClick={() => handleSelectZone(idx)}
                >
                  {isSelected && (
                    <circle
                      cx={zone.coords.x}
                      cy={zone.coords.y}
                      r="22"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2.5"
                      className="animate-ping opacity-75"
                    />
                  )}
                  <circle
                    cx={zone.coords.x}
                    cy={zone.coords.y}
                    r={isSelected ? "14" : "10"}
                    fill={isSelected ? "#ef4444" : "#991b1b"}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? "3" : "1.5"}
                  />
                  <text
                    x={zone.coords.x}
                    y={zone.coords.y + 4}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="11"
                    fontFamily="sans-serif"
                    fontWeight="bold"
                  >
                    {zone.order}
                  </text>
                  <text
                    x={zone.coords.x}
                    y={zone.coords.y - 20}
                    textAnchor="middle"
                    fill={isSelected ? "#fef08a" : "#fca5a5"}
                    fontSize={isSelected ? "13" : "10"}
                    fontFamily="serif"
                    fontWeight={isSelected ? "bold" : "normal"}
                    className="drop-shadow"
                  >
                    {zone.nameKo.split(' ')[1]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Selected Battlefield Detail Card */}
      <div className="bg-[#0c0a08] border border-rose-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-serif font-bold text-rose-400 px-2 py-0.5 rounded bg-rose-950 border border-rose-500/30">
                {currentZone.nameGr}
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-black text-slate-100">
                {currentZone.nameKo}
              </h4>
            </div>
            <span className="text-xs text-slate-400 font-sans">{currentZone.location}</span>
          </div>

          <div>
            {getTideBadge(currentZone.tideOfWar)}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed bg-[#15110d] p-4 rounded-xl border border-slate-800">
          {currentZone.description}
        </p>

        {/* Tactical 2-Column Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-parchment-950 p-4 rounded-xl border border-rose-500/20">
            <span className="text-xs font-serif font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1 mb-1">
              <Swords className="w-3.5 h-3.5" /> 대표적인 일대일 결투
            </span>
            <p className="text-xs text-slate-300 font-sans">
              {currentZone.keyDuel}
            </p>
          </div>

          <div className="bg-parchment-950 p-4 rounded-xl border border-purple-500/20">
            <span className="text-xs font-serif font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> 올림포스 신들의 개입
            </span>
            <p className="text-xs text-slate-300 font-sans">
              {currentZone.godIntervention}
            </p>
          </div>
        </div>

        {/* Stepper Navigation */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => handleSelectZone(selectedZoneIndex - 1)}
            disabled={selectedZoneIndex === 0}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition ${
              selectedZoneIndex === 0 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>이전 전장</span>
          </button>

          <span className="text-xs font-serif text-slate-400">
            전선 구역 {selectedZoneIndex + 1} / {BATTLEFIELD_ZONES.length}
          </span>

          <button
            onClick={() => handleSelectZone(selectedZoneIndex + 1)}
            disabled={selectedZoneIndex === BATTLEFIELD_ZONES.length - 1}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition ${
              selectedZoneIndex === BATTLEFIELD_ZONES.length - 1 ? 'text-slate-600 cursor-not-allowed' : 'text-rose-300 hover:text-white hover:bg-rose-950'
            }`}
          >
            <span>다음 전장</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
