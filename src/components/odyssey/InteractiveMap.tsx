import React, { useState, useEffect } from 'react';
import { ODYSSEY_STATIONS, OdysseyStation } from '../../data/odysseyData';
import { StationDetailModal } from './StationDetailModal';
import { Compass, Play, Pause, RotateCcw, MapPin, ChevronRight, ChevronLeft, Sparkles, Navigation, Info } from 'lucide-react';
import { audioEngine } from '../../utils/soundSynth';

interface InteractiveMapProps {
  onOpenImageModal: (src: string, title: string, caption?: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onOpenImageModal }) => {
  const [selectedStationIndex, setSelectedStationIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);

  const currentStation = ODYSSEY_STATIONS[selectedStationIndex];

  // Auto-play journey animation
  useEffect(() => {
    let timer: number;
    if (isPlayingAuto) {
      timer = window.setInterval(() => {
        setSelectedStationIndex((prev) => {
          if (prev >= ODYSSEY_STATIONS.length - 1) {
            setIsPlayingAuto(false);
            return prev;
          }
          audioEngine.playChime();
          return prev + 1;
        });
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlayingAuto]);

  const handleSelectStation = (index: number) => {
    audioEngine.playChime();
    setSelectedStationIndex(index);
    setIsPlayingAuto(false);
  };

  const handleOpenDetail = (index: number) => {
    setSelectedStationIndex(index);
    setIsModalOpen(true);
    setIsPlayingAuto(false);
  };

  const handlePrevStation = () => {
    if (selectedStationIndex > 0) {
      handleSelectStation(selectedStationIndex - 1);
    }
  };

  const handleNextStation = () => {
    if (selectedStationIndex < ODYSSEY_STATIONS.length - 1) {
      handleSelectStation(selectedStationIndex + 1);
    }
  };

  // Build SVG path string connecting all stations up to current
  const fullPathD = ODYSSEY_STATIONS.reduce((acc, station, idx) => {
    if (idx === 0) return `M ${station.mapPos.x} ${station.mapPos.y}`;
    return `${acc} L ${station.mapPos.x} ${station.mapPos.y}`;
  }, '');

  const traveledPathD = ODYSSEY_STATIONS.slice(0, selectedStationIndex + 1).reduce((acc, station, idx) => {
    if (idx === 0) return `M ${station.mapPos.x} ${station.mapPos.y}`;
    return `${acc} L ${station.mapPos.x} ${station.mapPos.y}`;
  }, '');

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-aegean-500/20 pb-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2.5">
            <Compass className="w-7 h-7 text-aegean-400 animate-spin-slow" />
            <span>오디세우스의 10년 지중해 항해 지도</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            트로이에서 이타카까지, 14개 스테이션을 클릭하거나 재생 버튼을 눌러 여정을 따라가 보세요.
          </p>
        </div>

        {/* Map Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPlayingAuto(!isPlayingAuto)}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-serif font-bold transition shadow-lg ${
              isPlayingAuto
                ? 'bg-amber-600 text-white animate-pulse'
                : 'bg-aegean-900/80 hover:bg-aegean-800 text-aegean-200 border border-aegean-500/40'
            }`}
          >
            {isPlayingAuto ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlayingAuto ? "자동 재생 정지" : "항해 자동 재생"}</span>
          </button>

          <button
            onClick={() => handleSelectStation(0)}
            className="p-2 rounded-xl bg-parchment-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition"
            title="처음(트로이)으로 리셋"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SVG Interactive Map Container */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#091522] via-[#0d1e30] to-[#07111c] border border-aegean-500/30 overflow-hidden shadow-2xl p-2 sm:p-4">
        {/* Subtle Map Background Grid and Compass Decor */}
        <div className="absolute top-4 right-4 text-aegean-500/20 pointer-events-none hidden sm:block">
          <svg className="w-32 h-32" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
            <path d="M50 5 L55 45 L95 50 L55 55 L50 95 L45 55 L5 50 L45 45 Z" fill="currentColor" opacity="0.3"/>
            <text x="50" y="15" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="serif" fontWeight="bold">N</text>
            <text x="50" y="93" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="serif" fontWeight="bold">S</text>
            <text x="90" y="53" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="serif" fontWeight="bold">E</text>
            <text x="12" y="53" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="serif" fontWeight="bold">W</text>
          </svg>
        </div>

        {/* The Main SVG Canvas */}
        <div className="w-full aspect-[16/10] sm:aspect-[16/9] min-h-[360px] max-h-[560px]">
          <svg viewBox="0 0 1000 600" className="w-full h-full select-none">
            <defs>
              <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0a192f" />
                <stop offset="100%" stopColor="#071220" />
              </linearGradient>
              <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Stylized Mediterranean Landmass Outlines */}
            <g className="fill-[#1a2b3c]/80 stroke-[#2c4760] stroke-1">
              {/* Greece & Peloponnese */}
              <path d="M 540 100 Q 590 120 630 140 Q 670 170 660 220 Q 620 280 610 320 Q 580 340 550 310 Q 560 270 540 240 Q 510 220 530 180 Z" />
              {/* Italy Peninsula & Boot */}
              <path d="M 320 60 Q 360 80 400 120 Q 430 180 450 250 Q 480 300 510 310 Q 480 340 450 330 Q 410 270 370 200 Q 330 150 300 100 Z" />
              {/* Sicily */}
              <path d="M 390 330 Q 480 320 460 380 Q 400 400 370 360 Z" />
              {/* Corsica & Sardinia */}
              <path d="M 300 140 Q 320 150 310 210 Q 290 200 300 140 Z" />
              <path d="M 290 220 Q 320 230 310 300 Q 280 290 290 220 Z" />
              {/* Asia Minor / Anatolia Coast */}
              <path d="M 720 80 Q 820 100 850 200 Q 800 280 750 300 Q 730 240 710 180 Z" />
              {/* North Africa Coastline */}
              <path d="M 150 520 Q 350 480 500 510 Q 700 500 880 530 L 880 590 L 150 590 Z" />
            </g>

            {/* Sea Label Watermarks */}
            <text x="730" y="240" fill="#38bdf8" opacity="0.15" fontSize="18" fontFamily="serif" letterSpacing="4">AEGEAN SEA</text>
            <text x="360" y="240" fill="#38bdf8" opacity="0.15" fontSize="18" fontFamily="serif" letterSpacing="4">TYRRHENIAN SEA</text>
            <text x="520" y="420" fill="#38bdf8" opacity="0.15" fontSize="18" fontFamily="serif" letterSpacing="4">IONIAN SEA</text>

            {/* Full Voyage Ghost Path */}
            <path
              d={fullPathD}
              fill="none"
              stroke="#334155"
              strokeWidth="2"
              strokeDasharray="4,6"
              opacity="0.6"
            />

            {/* Traveled Animated Path */}
            <path
              d={traveledPathD}
              fill="none"
              stroke="url(#routeGrad)"
              strokeWidth="3.5"
              filter="url(#glow)"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Station Nodes / Waypoint Pins */}
            {ODYSSEY_STATIONS.map((station, idx) => {
              const isSelected = idx === selectedStationIndex;
              const isPassed = idx <= selectedStationIndex;

              return (
                <g
                  key={station.id}
                  className="cursor-pointer transition duration-300"
                  onClick={() => handleOpenDetail(idx)}
                >
                  {/* Outer Ripple for selected pin */}
                  {isSelected && (
                    <circle
                      cx={station.mapPos.x}
                      cy={station.mapPos.y}
                      r="16"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      className="animate-ping opacity-75"
                    />
                  )}

                  {/* Pin Circle */}
                  <circle
                    cx={station.mapPos.x}
                    cy={station.mapPos.y}
                    r={isSelected ? "11" : "7"}
                    fill={isSelected ? "#f59e0b" : isPassed ? "#38bdf8" : "#1e293b"}
                    stroke={isSelected ? "#ffffff" : isPassed ? "#0284c7" : "#475569"}
                    strokeWidth={isSelected ? "2.5" : "1.5"}
                    className="transition-all duration-300"
                  />

                  {/* Order Number on Pin */}
                  <text
                    x={station.mapPos.x}
                    y={station.mapPos.y + (isSelected ? 3.5 : 2.5)}
                    textAnchor="middle"
                    fill={isSelected ? "#000000" : isPassed ? "#ffffff" : "#94a3b8"}
                    fontSize={isSelected ? "10" : "7"}
                    fontFamily="sans-serif"
                    fontWeight="bold"
                  >
                    {station.order}
                  </text>

                  {/* Label on Map */}
                  <text
                    x={station.mapPos.x}
                    y={station.mapPos.y - (isSelected ? 16 : 11)}
                    textAnchor="middle"
                    fill={isSelected ? "#fbbf24" : isPassed ? "#e2e8f0" : "#64748b"}
                    fontSize={isSelected ? "12" : "9"}
                    fontFamily="serif"
                    fontWeight={isSelected ? "bold" : "normal"}
                    className="drop-shadow"
                  >
                    {station.nameKo.split(' ')[1]}
                  </text>
                </g>
              );
            })}

            {/* Current Ship Icon at current location */}
            <g
              transform={`translate(${currentStation.mapPos.x}, ${currentStation.mapPos.y})`}
              className="transition-all duration-700 ease-out"
            >
              <circle cx="0" cy="0" r="18" fill="rgba(245, 158, 11, 0.2)" />
              {/* Mini Ancient Galley Ship SVG */}
              <g transform="translate(-10, -10) scale(0.8)">
                <path d="M 3 15 Q 12 22 21 15 L 18 10 L 6 10 Z" fill="#b45309" stroke="#fde68a" strokeWidth="1" />
                <path d="M 12 3 L 12 12 M 7 6 L 12 3 L 17 6 Z" fill="#f8fafc" stroke="#b45309" strokeWidth="0.8" />
              </g>
            </g>
          </svg>
        </div>

        {/* Legend / Guide Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-black/50 backdrop-blur rounded-2xl mt-2 text-xs font-serif text-slate-300 border border-aegean-500/20">
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1 text-amber-300 font-bold">
              <Navigation className="w-3.5 h-3.5" /> 현재 기착지: {currentStation.nameKo}
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400">{currentStation.region}</span>
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> 현재 위치
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" /> 지나온 곳
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" /> 남은 여정
            </span>
          </div>
        </div>
      </div>

      {/* Active Station Spotlight Card */}
      <div className="bg-parchment-900 border border-aegean-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden transition-all duration-300">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Thumbnail / Image Preview */}
          {currentStation.image && (
            <div 
              className="w-full lg:w-72 h-44 rounded-2xl overflow-hidden border border-aegean-500/30 shrink-0 relative group cursor-pointer"
              onClick={() => handleOpenDetail(selectedStationIndex)}
            >
              <img
                src={currentStation.image}
                alt={currentStation.nameKo}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-amber-200">
                <span className="flex items-center gap-1 font-serif">
                  <Sparkles className="w-3 h-3 text-amber-400" /> Gemini 생성 아트
                </span>
                <span className="bg-black/60 px-2 py-0.5 rounded border border-amber-500/30">상세보기</span>
              </div>
            </div>
          )}

          {/* Text Summary */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full bg-aegean-950 border border-aegean-400/40 text-aegean-300 font-serif font-black text-xs">
                  제 {currentStation.order} 장
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-100">
                  {currentStation.nameKo}
                </h3>
              </div>
              <span className="text-xs font-serif text-slate-400 px-2.5 py-1 rounded bg-parchment-950 border border-slate-800">
                {currentStation.region}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              {currentStation.summary}
            </p>

            <blockquote className="border-l-2 border-amber-500 pl-3 text-xs italic font-serif text-amber-300/90">
              "{currentStation.quote}"
            </blockquote>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => handleOpenDetail(selectedStationIndex)}
                className="px-4 py-2 rounded-xl bg-aegean-900 hover:bg-aegean-800 text-aegean-200 text-xs font-serif font-bold border border-aegean-500/40 flex items-center space-x-1.5 transition"
              >
                <Info className="w-4 h-4 text-aegean-400" />
                <span>스토리 및 지략 분석 전체 보기</span>
              </button>

              {/* Stepper Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrevStation}
                  disabled={selectedStationIndex === 0}
                  className={`p-2 rounded-lg border text-xs transition ${
                    selectedStationIndex === 0 ? 'border-slate-800 text-slate-600 cursor-not-allowed' : 'border-slate-700 text-slate-300 hover:bg-parchment-800'
                  }`}
                  aria-label="이전 스테이션"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-serif text-slate-400 px-2">
                  {selectedStationIndex + 1} / {ODYSSEY_STATIONS.length}
                </span>
                <button
                  onClick={handleNextStation}
                  disabled={selectedStationIndex === ODYSSEY_STATIONS.length - 1}
                  className={`p-2 rounded-lg border text-xs transition ${
                    selectedStationIndex === ODYSSEY_STATIONS.length - 1 ? 'border-slate-800 text-slate-600 cursor-not-allowed' : 'border-slate-700 text-slate-300 hover:bg-parchment-800'
                  }`}
                  aria-label="다음 스테이션"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <StationDetailModal
        station={isModalOpen ? currentStation : null}
        onClose={() => setIsModalOpen(false)}
        onPrev={selectedStationIndex > 0 ? () => setSelectedStationIndex(selectedStationIndex - 1) : undefined}
        onNext={selectedStationIndex < ODYSSEY_STATIONS.length - 1 ? () => setSelectedStationIndex(selectedStationIndex + 1) : undefined}
        onOpenImageModal={onOpenImageModal}
      />
    </div>
  );
};
