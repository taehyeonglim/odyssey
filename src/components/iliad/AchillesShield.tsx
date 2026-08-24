import React, { useState } from 'react';
import { SHIELD_OF_ACHILLES_DATA, ShieldZone } from '../../data/shieldData';
import { Shield, Sparkles, Sun, HeartHandshake, Swords, Tractor, Wheat, Grape, Flame, Waves, Info } from 'lucide-react';
import { audioEngine } from '../../utils/soundSynth';

export const AchillesShield: React.FC = () => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>("cosmos");

  const selectedZone: ShieldZone = SHIELD_OF_ACHILLES_DATA.find(z => z.id === selectedZoneId) || SHIELD_OF_ACHILLES_DATA[0];

  const handleSelectZone = (id: string) => {
    audioEngine.playChime();
    setSelectedZoneId(id);
  };

  const getZoneIcon = (sym: string) => {
    switch (sym) {
      case 'Sun': return <Sun className="w-4 h-4 text-amber-400" />;
      case 'HeartHandshake': return <HeartHandshake className="w-4 h-4 text-sky-400" />;
      case 'Swords': return <Swords className="w-4 h-4 text-rose-400" />;
      case 'Tractor': return <Tractor className="w-4 h-4 text-emerald-400" />;
      case 'Wheat': return <Wheat className="w-4 h-4 text-yellow-400" />;
      case 'Grape': return <Grape className="w-4 h-4 text-purple-400" />;
      case 'Flame': return <Flame className="w-4 h-4 text-orange-400" />;
      case 'Waves': return <Waves className="w-4 h-4 text-blue-400" />;
      default: return <Sparkles className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="my-12 bg-[#15110d] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-serif font-bold">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>《일리아드》 제18권: 헤파이토스의 신성한 걸작</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-black text-amber-100">
          아킬레우스의 방패 (The Shield of Achilles)
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
          대장장이 신 헤파이토스가 은, 금, 청동을 녹여 조각한 8개 영역의 우주와 인간 세계. 방패의 각 층위를 클릭하여 탐색해 보세요.
        </p>
      </div>

      {/* Main Grid: Interactive Circular SVG Shield + Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive SVG Concentric Shield */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          <div className="w-full max-w-[380px] aspect-square relative">
            <svg viewBox="0 0 400 400" className="w-full h-full select-none drop-shadow-2xl">
              <defs>
                <radialGradient id="shieldCenterGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#b45309" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#78350f" stopOpacity="0.5" />
                </radialGradient>
                <radialGradient id="shieldRimGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="85%" stopColor="#0369a1" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
                </radialGradient>
              </defs>

              {/* Layer 5: Rim - Oceanus River (R: 195 to 165) */}
              <circle
                cx="200" cy="200" r="185"
                fill="none" stroke="#0284c7" strokeWidth="24"
                className={`cursor-pointer transition-all duration-300 ${selectedZoneId === 'oceanus' ? 'stroke-sky-300 filter drop-shadow' : 'opacity-60 hover:opacity-100'}`}
                onClick={() => handleSelectZone('oceanus')}
              />

              {/* Layer 4: Outer - Lion Hunt (R: 152) */}
              <circle
                cx="200" cy="200" r="150"
                fill="none" stroke="#fb923c" strokeWidth="20"
                strokeDasharray="6,4"
                className={`cursor-pointer transition-all duration-300 ${selectedZoneId === 'lion_hunt' ? 'stroke-orange-300' : 'opacity-50 hover:opacity-90'}`}
                onClick={() => handleSelectZone('lion_hunt')}
              />

              {/* Layer 3: Middle - Agriculture (Harvest, Vintage, Plowing) (R: 120, 100, 80) */}
              <circle
                cx="200" cy="200" r="122"
                fill="none" stroke="#a855f7" strokeWidth="18"
                className={`cursor-pointer transition-all duration-300 ${selectedZoneId === 'vintage' ? 'stroke-purple-300' : 'opacity-40 hover:opacity-80'}`}
                onClick={() => handleSelectZone('vintage')}
              />
              <circle
                cx="200" cy="200" r="102"
                fill="none" stroke="#eab308" strokeWidth="18"
                className={`cursor-pointer transition-all duration-300 ${selectedZoneId === 'harvest' ? 'stroke-yellow-200' : 'opacity-40 hover:opacity-80'}`}
                onClick={() => handleSelectZone('harvest')}
              />
              <circle
                cx="200" cy="200" r="82"
                fill="none" stroke="#10b981" strokeWidth="18"
                className={`cursor-pointer transition-all duration-300 ${selectedZoneId === 'plowing' ? 'stroke-emerald-300' : 'opacity-40 hover:opacity-80'}`}
                onClick={() => handleSelectZone('plowing')}
              />

              {/* Layer 2: Inner - Two Cities (Peace & War) (R: 60) */}
              {/* Left semi-circle: Peace City */}
              <path
                d="M 200 142 A 58 58 0 0 0 200 258 Z"
                fill="#0284c7"
                fillOpacity={selectedZoneId === 'peace_city' ? "0.8" : "0.35"}
                stroke="#38bdf8"
                strokeWidth={selectedZoneId === 'peace_city' ? "3" : "1.5"}
                className="cursor-pointer hover:fill-opacity-70 transition duration-300"
                onClick={() => handleSelectZone('peace_city')}
              />
              {/* Right semi-circle: War City */}
              <path
                d="M 200 142 A 58 58 0 0 1 200 258 Z"
                fill="#b91c1c"
                fillOpacity={selectedZoneId === 'war_city' ? "0.8" : "0.35"}
                stroke="#f87171"
                strokeWidth={selectedZoneId === 'war_city' ? "3" : "1.5"}
                className="cursor-pointer hover:fill-opacity-70 transition duration-300"
                onClick={() => handleSelectZone('war_city')}
              />

              {/* Layer 1: Center - Cosmos (R: 35) */}
              <circle
                cx="200" cy="200" r="32"
                fill="url(#shieldCenterGrad)"
                stroke="#fde68a"
                strokeWidth={selectedZoneId === 'cosmos' ? "3" : "1.5"}
                className="cursor-pointer hover:scale-105 transition duration-300"
                onClick={() => handleSelectZone('cosmos')}
              />
              <circle cx="200" cy="200" r="6" fill="#ffffff" />
            </svg>
          </div>

          <span className="text-[11px] font-serif text-slate-400 mt-2 flex items-center gap-1">
            <Info className="w-3 h-3 text-amber-400" /> 원형 방패의 각 링과 구역을 클릭하여 탐색하세요.
          </span>
        </div>

        {/* Right: Detailed Description Panel */}
        <div className="lg:col-span-6 space-y-4">
          {/* Quick Zone Selector Pills */}
          <div className="flex flex-wrap gap-1.5 pb-2 border-b border-slate-800">
            {SHIELD_OF_ACHILLES_DATA.map((z) => (
              <button
                key={z.id}
                onClick={() => handleSelectZone(z.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-serif font-bold transition flex items-center space-x-1.5 ${
                  selectedZoneId === z.id
                    ? 'bg-amber-950 border border-amber-400 text-amber-200 shadow'
                    : 'bg-[#0c0a08] border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {getZoneIcon(z.symbol)}
                <span>{z.titleKo.split('.')[1]}</span>
              </button>
            ))}
          </div>

          {/* Active Zone Detail Card */}
          <div className="bg-[#0c0a08] border border-amber-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg animate-fadeIn">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-serif font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-950 border border-amber-500/30">
                  {selectedZone.titleGr}
                </span>
                <span className="text-xs text-slate-400 font-serif capitalize">
                  위치: {selectedZone.layer}
                </span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-black text-slate-100">
                {selectedZone.titleKo}
              </h4>
              <p className="text-xs sm:text-sm text-amber-300/80 font-serif">
                {selectedZone.subtitle}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed bg-[#15110d] p-4 rounded-xl border border-slate-800">
              {selectedZone.description}
            </p>

            {/* Greek & Korean Quote */}
            <div className="bg-amber-950/20 border-l-3 border-amber-500 p-3.5 rounded-r-xl space-y-1">
              <p className="text-xs font-mono text-amber-400/70 italic">
                {selectedZone.greekQuote}
              </p>
              <p className="text-xs sm:text-sm font-serif italic text-slate-200">
                "{selectedZone.homerQuote}"
              </p>
            </div>

            {/* Symbolism */}
            <div className="text-xs font-sans text-slate-300 bg-black/40 p-3 rounded-xl border border-slate-800">
              <strong className="text-amber-400 block font-serif text-[11px] mb-0.5">문학적·철학적 상징</strong>
              {selectedZone.symbolism}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
