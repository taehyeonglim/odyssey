import React from 'react';
import { Shield, Swords, Crown, Sparkles } from 'lucide-react';
import { TROJAN_WAR_SIDES } from '../../data/iliadData';

export const TrojanWarSides: React.FC = () => {
  return (
    <div className="my-12">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h3 className="font-serif text-2xl font-black text-amber-200 flex items-center justify-center gap-2">
          <Swords className="w-6 h-6 text-amber-400" />
          <span>트로이 전쟁 진영 대치도</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
          인간 영웅들의 혈투와 올림포스 신들의 치열한 대리전
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Greek Side */}
        <div className="bg-gradient-to-b from-amber-950/40 to-parchment-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2.5 rounded-xl bg-amber-900/60 border border-amber-500/40 text-amber-300">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-xl font-black text-amber-200">{TROJAN_WAR_SIDES.greeks.name}</h4>
              <p className="text-xs text-amber-400/80 font-serif">총사령관: {TROJAN_WAR_SIDES.greeks.leader}</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 font-sans mb-5 leading-relaxed bg-black/30 p-3.5 rounded-xl border border-slate-800">
            <strong>대의명분:</strong> {TROJAN_WAR_SIDES.greeks.motivation}
          </p>

          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold font-serif block mb-2">
                대표 영웅들
              </span>
              <div className="flex flex-wrap gap-1.5">
                {TROJAN_WAR_SIDES.greeks.keyHeroes.map((hero, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-amber-950/70 border border-amber-500/30 text-xs font-serif text-amber-100 font-medium">
                    {hero}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold font-serif flex items-center gap-1 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 가호하는 올림포스 신들
              </span>
              <div className="flex flex-wrap gap-1.5">
                {TROJAN_WAR_SIDES.greeks.patronGods.map((god, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-parchment-950 border border-slate-700 text-xs font-serif text-slate-300">
                    {god}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trojan Side */}
        <div className="bg-gradient-to-b from-rose-950/40 to-parchment-900 border border-rose-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2.5 rounded-xl bg-rose-900/60 border border-rose-500/40 text-rose-300">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-xl font-black text-rose-200">{TROJAN_WAR_SIDES.trojans.name}</h4>
              <p className="text-xs text-rose-400/80 font-serif">지도부: {TROJAN_WAR_SIDES.trojans.leader}</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 font-sans mb-5 leading-relaxed bg-black/30 p-3.5 rounded-xl border border-slate-800">
            <strong>대의명분:</strong> {TROJAN_WAR_SIDES.trojans.motivation}
          </p>

          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-rose-400 font-bold font-serif block mb-2">
                대표 영웅들
              </span>
              <div className="flex flex-wrap gap-1.5">
                {TROJAN_WAR_SIDES.trojans.keyHeroes.map((hero, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-rose-950/70 border border-rose-500/30 text-xs font-serif text-rose-100 font-medium">
                    {hero}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider text-rose-400 font-bold font-serif flex items-center gap-1 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" /> 가호하는 올림포스 신들
              </span>
              <div className="flex flex-wrap gap-1.5">
                {TROJAN_WAR_SIDES.trojans.patronGods.map((god, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-parchment-950 border border-slate-700 text-xs font-serif text-slate-300">
                    {god}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
