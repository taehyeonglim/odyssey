import React, { useState } from 'react';
import { CHARACTERS_DATA, EpicCharacter } from '../../data/charactersData';
import { Swords, Shield, Trophy, RotateCcw, Sparkles, Flame, Heart, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../../utils/soundSynth';

interface CombatLog {
  round: number;
  attackerName: string;
  defenderName: string;
  actionText: string;
  damage: number;
  isCrit: boolean;
  godIntervened: boolean;
}

export const DuelArena: React.FC = () => {
  const fighters = CHARACTERS_DATA.filter(c => c.side === 'greek' || c.side === 'trojan');

  const [heroAId, setHeroAId] = useState<string>("achilles");
  const [heroBId, setHeroBId] = useState<string>("hector");
  const [isFighting, setIsFighting] = useState<boolean>(false);
  const [combatLogs, setCombatLogs] = useState<CombatLog[]>([]);
  const [hpA, setHpA] = useState<number>(100);
  const [hpB, setHpB] = useState<number>(100);
  const [winner, setWinner] = useState<EpicCharacter | null>(null);

  const heroA = CHARACTERS_DATA.find(c => c.id === heroAId) || CHARACTERS_DATA[0];
  const heroB = CHARACTERS_DATA.find(c => c.id === heroBId) || CHARACTERS_DATA[3];

  const handleStartDuel = () => {
    if (heroA.id === heroB.id) {
      alert("서로 다른 두 영웅을 선택해 주세요!");
      return;
    }

    audioEngine.playWarDrum(0.5);
    setIsFighting(true);
    setCombatLogs([]);
    setHpA(100);
    setHpB(100);
    setWinner(null);

    let currentHpA = 100;
    let currentHpB = 100;
    const logs: CombatLog[] = [];

    // Run 3-5 rounds of simulated combat
    let round = 1;
    const combatInterval = setInterval(() => {
      // Determine attacker (alternate or higher favor/bravery)
      const aAttacks = round % 2 === 1;
      const attacker = aAttacks ? heroA : heroB;
      const defender = aAttacks ? heroB : heroA;

      // Damage formula based on stats
      const baseDmg = Math.floor(attacker.stats.bravery * 0.25 + Math.random() * 15);
      const godChance = Math.random() < (attacker.stats.divineFavor / 200);
      const isCrit = Math.random() < 0.3;
      const finalDmg = Math.floor(baseDmg * (isCrit ? 1.5 : 1.0) * (godChance ? 1.3 : 1.0));

      if (aAttacks) {
        currentHpB = Math.max(0, currentHpB - finalDmg);
        setHpB(currentHpB);
      } else {
        currentHpA = Math.max(0, currentHpA - finalDmg);
        setHpA(currentHpA);
      }

      // Generate Homeric action flavor text
      let flavor = "";
      if (godChance) {
        flavor = `올림포스 신의 빛이 ${attacker.nameKo}의 무기를 감싸며 ${defender.nameKo}의 방패를 쪼개었습니다!`;
      } else if (isCrit) {
        flavor = `${attacker.nameKo}가 사자처럼 포효하며 던진 물푸레나무 창이 ${defender.nameKo}의 투구 깃을 날려버렸습니다!`;
      } else {
        flavor = `${attacker.nameKo}의 날카로운 청동검이 ${defender.nameKo}의 갑옷을 스치며 불꽃을 튀겼습니다.`;
      }

      logs.push({
        round,
        attackerName: attacker.nameKo,
        defenderName: defender.nameKo,
        actionText: flavor,
        damage: finalDmg,
        isCrit,
        godIntervened: godChance
      });
      setCombatLogs([...logs]);
      audioEngine.playWarDrum(0.35);

      if (currentHpA <= 0 || currentHpB <= 0 || round >= 6) {
        clearInterval(combatInterval);
        setIsFighting(false);
        const vict = currentHpA >= currentHpB ? heroA : heroB;
        setWinner(vict);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        audioEngine.playChime();
      }

      round++;
    }, 1200);
  };

  const handleReset = () => {
    setCombatLogs([]);
    setHpA(100);
    setHpB(100);
    setWinner(null);
    setIsFighting(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2 border-b border-rose-500/20 pb-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-serif font-bold">
          <Swords className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span>영웅 가상 결투장 (Epic Duel Arena)</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-black text-rose-100">
          트로이 평원의 영웅 결투 시뮬레이터
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 font-sans">
          영웅들의 4대 능력치를 바탕으로 펼쳐지는 가상 백병전 시뮬레이션
        </p>
      </div>

      {/* Hero Selectors & Arena VS Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center bg-[#15110d] border border-rose-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Fighter A */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-serif font-bold text-amber-400">선발 전사 A</span>
            <select
              value={heroAId}
              onChange={(e) => {
                setHeroAId(e.target.value);
                handleReset();
              }}
              disabled={isFighting}
              className="bg-[#0c0a08] border border-slate-700 text-xs font-serif text-amber-200 px-3 py-1.5 rounded-lg focus:outline-none"
            >
              {fighters.map(f => (
                <option key={f.id} value={f.id}>{f.nameKo} ({f.side === 'greek' ? '그리스' : '트로이'})</option>
              ))}
            </select>
          </div>

          <div className="bg-[#0c0a08] border border-amber-500/30 rounded-2xl p-4 text-center space-y-2">
            {heroA.image ? (
              <img src={heroA.image} alt={heroA.nameKo} className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-amber-400 shadow-md" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-amber-950/60 border-2 border-amber-400 mx-auto flex items-center justify-center font-serif text-2xl text-amber-300">
                {heroA.nameKo[0]}
              </div>
            )}
            <h4 className="font-serif text-xl font-black text-amber-200">{heroA.nameKo}</h4>
            <p className="text-[11px] font-serif text-amber-400/80 italic">"{heroA.epithet}"</p>

            {/* HP Bar */}
            <div className="pt-2">
              <div className="flex justify-between text-[11px] font-serif text-slate-400 mb-1">
                <span>체력 (Stamina)</span>
                <span className="text-rose-400 font-bold">{hpA}%</span>
              </div>
              <div className="w-full h-2.5 bg-black/80 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300" style={{ width: `${hpA}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* VS Divider */}
        <div className="md:col-span-1 text-center font-serif text-2xl font-black text-rose-500/60">
          VS
        </div>

        {/* Fighter B */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-serif font-bold text-rose-400">선발 전사 B</span>
            <select
              value={heroBId}
              onChange={(e) => {
                setHeroBId(e.target.value);
                handleReset();
              }}
              disabled={isFighting}
              className="bg-[#0c0a08] border border-slate-700 text-xs font-serif text-rose-200 px-3 py-1.5 rounded-lg focus:outline-none"
            >
              {fighters.map(f => (
                <option key={f.id} value={f.id}>{f.nameKo} ({f.side === 'greek' ? '그리스' : '트로이'})</option>
              ))}
            </select>
          </div>

          <div className="bg-[#0c0a08] border border-rose-500/30 rounded-2xl p-4 text-center space-y-2">
            {heroB.image ? (
              <img src={heroB.image} alt={heroB.nameKo} className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-rose-400 shadow-md" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-rose-950/60 border-2 border-rose-400 mx-auto flex items-center justify-center font-serif text-2xl text-rose-300">
                {heroB.nameKo[0]}
              </div>
            )}
            <h4 className="font-serif text-xl font-black text-rose-200">{heroB.nameKo}</h4>
            <p className="text-[11px] font-serif text-rose-400/80 italic">"{heroB.epithet}"</p>

            {/* HP Bar */}
            <div className="pt-2">
              <div className="flex justify-between text-[11px] font-serif text-slate-400 mb-1">
                <span>체력 (Stamina)</span>
                <span className="text-rose-400 font-bold">{hpB}%</span>
              </div>
              <div className="w-full h-2.5 bg-black/80 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300" style={{ width: `${hpB}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Start Button */}
      {!isFighting && !winner && (
        <button
          onClick={handleStartDuel}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 hover:from-rose-500 hover:to-rose-500 text-white font-serif font-black text-base tracking-wider flex items-center justify-center space-x-2 shadow-2xl shadow-rose-950/80 transition transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Swords className="w-5 h-5" />
          <span>신성한 결투 시작하기 (Begin Epic Duel)</span>
        </button>
      )}

      {/* Combat Live Narrative Feed */}
      {combatLogs.length > 0 && (
        <div className="bg-[#15110d] border border-slate-800 rounded-3xl p-6 space-y-3">
          <h4 className="font-serif text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <Flame className="w-4 h-4 text-rose-500" /> 전황 실시간 서사시 기록 (Homeric Battle Log)
          </h4>

          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-2">
            {combatLogs.map((log, idx) => (
              <div key={idx} className="bg-[#0c0a08] p-3.5 rounded-xl border border-slate-800/80 text-xs font-serif leading-relaxed animate-fadeIn space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>[라운드 {log.round}] <strong>{log.attackerName}</strong>의 맹공</span>
                  <span className="text-rose-400 font-bold">타격: -{log.damage}</span>
                </div>
                <p className="text-slate-200">{log.actionText}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Winner Victory Certificate */}
      {winner && (
        <div className="bg-[#15110d] border-2 border-amber-500/60 rounded-3xl p-8 text-center space-y-4 shadow-2xl animate-fadeIn">
          <Trophy className="w-12 h-12 text-amber-400 mx-auto" />
          <h4 className="font-serif text-2xl sm:text-3xl font-black text-amber-100">
            결투의 승자: {winner.nameKo}!
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 font-serif max-w-md mx-auto">
            올림포스 신들과 호메로스의 서사시가 <strong>{winner.nameKo}</strong>의 불멸할 영광(Kleos)을 영원히 기억하리라!
          </p>

          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-xl bg-[#0c0a08] border border-amber-500/40 hover:bg-amber-950 text-amber-200 font-serif font-bold text-xs flex items-center space-x-2 mx-auto transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>새로운 매치업 도전</span>
          </button>
        </div>
      )}
    </div>
  );
};
