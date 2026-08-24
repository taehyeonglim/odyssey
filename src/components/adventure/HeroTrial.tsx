import React, { useState } from 'react';
import { TRIAL_SCENARIOS, TrialScenario, TrialChoice } from '../../data/trialScenarios';
import { Award, Compass, ShieldAlert, CheckCircle2, XCircle, RotateCcw, Sparkles, Trophy, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../../utils/soundSynth';

interface HeroTrialProps {
  onOpenImageModal: (src: string, title: string, caption?: string) => void;
}

export const HeroTrial: React.FC<HeroTrialProps> = ({ onOpenImageModal }) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<TrialChoice | null>(null);
  const [hasConfirmed, setHasConfirmed] = useState<boolean>(false);
  const [stats, setStats] = useState({
    wisdom: 0,
    bravery: 0,
    crewRemaining: 50,
  });
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const scenario: TrialScenario = TRIAL_SCENARIOS[currentScenarioIndex];

  const handleSelectChoice = (choice: TrialChoice) => {
    if (hasConfirmed) return;
    audioEngine.playChime();
    setSelectedChoice(choice);
  };

  const handleConfirmDecision = () => {
    if (!selectedChoice) return;
    setHasConfirmed(true);

    // Apply bonuses
    setStats((prev) => ({
      wisdom: prev.wisdom + selectedChoice.scoreBonus.wisdom,
      bravery: prev.bravery + selectedChoice.scoreBonus.bravery,
      crewRemaining: Math.max(0, prev.crewRemaining - selectedChoice.scoreBonus.crewLoss),
    }));

    if (selectedChoice.historicalAccuracy) {
      audioEngine.playChime();
    } else {
      audioEngine.playWarDrum();
    }
  };

  const handleNextScenario = () => {
    if (currentScenarioIndex < TRIAL_SCENARIOS.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setSelectedChoice(null);
      setHasConfirmed(false);
      audioEngine.playChime();
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentScenarioIndex(0);
    setSelectedChoice(null);
    setHasConfirmed(false);
    setStats({ wisdom: 0, bravery: 0, crewRemaining: 50 });
    setIsCompleted(false);
    audioEngine.playChime();
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 border-b border-amber-500/20 pb-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-serif font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>오디세우스의 결단 시뮬레이터</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-black text-amber-100">
          영웅의 선택: 운명의 갈림길
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-xl mx-auto">
          만약 당신이 험난한 고난의 바다에 던져진 영웅 오디세우스라면 어떤 선택을 내리겠습니까?
        </p>
      </div>

      {/* Score Dashboard */}
      <div className="grid grid-cols-3 gap-3 bg-parchment-900 border border-amber-500/30 rounded-2xl p-4 shadow-xl">
        <div className="text-center">
          <span className="text-[11px] font-serif text-slate-400 block">지혜 (Wisdom)</span>
          <span className="text-lg sm:text-2xl font-black text-sky-400 font-serif">{stats.wisdom} pt</span>
        </div>
        <div className="text-center border-l border-r border-slate-800">
          <span className="text-[11px] font-serif text-slate-400 block">용맹 (Bravery)</span>
          <span className="text-lg sm:text-2xl font-black text-rose-400 font-serif">{stats.bravery} pt</span>
        </div>
        <div className="text-center">
          <span className="text-[11px] font-serif text-slate-400 block">생존 선원</span>
          <span className="text-lg sm:text-2xl font-black text-amber-300 font-serif">{stats.crewRemaining} 명</span>
        </div>
      </div>

      {/* Main Trial Card or Victory Screen */}
      {!isCompleted ? (
        <div className="bg-parchment-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Scenario Info */}
          <div>
            <div className="flex items-center justify-between text-xs font-serif text-amber-400 mb-2">
              <span>단계 {currentScenarioIndex + 1} / {TRIAL_SCENARIOS.length}</span>
              <span className="px-2.5 py-0.5 rounded bg-amber-950 border border-amber-500/30">
                {scenario.subtitle}
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-100 mb-3">
              {scenario.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed bg-parchment-950 p-4 rounded-xl border border-slate-800">
              {scenario.situation}
            </p>
          </div>

          {/* Gemini Image if exists */}
          {scenario.image && (
            <div 
              className="relative h-48 sm:h-64 rounded-2xl overflow-hidden border border-amber-500/30 cursor-pointer group"
              onClick={() => onOpenImageModal(scenario.image!, scenario.title, scenario.situation)}
            >
              <img
                src={scenario.image}
                alt={scenario.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 text-xs font-serif text-amber-200 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Gemini AI 재현 장면 (클릭하여 확대)
              </div>
            </div>
          )}

          {/* Choices Options */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-bold font-serif block">
              당신의 결단을 선택하십시오:
            </span>

            {scenario.choices.map((choice) => {
              const isSelected = selectedChoice?.id === choice.id;
              return (
                <div
                  key={choice.id}
                  onClick={() => handleSelectChoice(choice)}
                  className={`p-4 rounded-2xl border transition duration-200 cursor-pointer flex items-start space-x-3 ${
                    isSelected
                      ? 'bg-amber-950/70 border-amber-400 text-amber-100 ring-2 ring-amber-500/30 shadow-lg'
                      : 'bg-parchment-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-amber-400 bg-amber-500 text-black font-bold text-xs' : 'border-slate-600'
                  }`}>
                    {isSelected && '✓'}
                  </div>
                  <div className="text-xs sm:text-sm font-serif leading-relaxed">
                    {choice.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Confirm Button or Narrative Result */}
          {!hasConfirmed ? (
            <button
              onClick={handleConfirmDecision}
              disabled={!selectedChoice}
              className={`w-full py-3.5 rounded-xl font-serif font-bold text-sm tracking-wide transition shadow-lg ${
                selectedChoice
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-amber-950/50'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              결단 확정하기
            </button>
          ) : (
            <div className="bg-parchment-950 border border-amber-500/40 rounded-2xl p-5 space-y-4 animate-fadeIn">
              <div className="flex items-center space-x-2">
                {selectedChoice?.historicalAccuracy ? (
                  <div className="flex items-center space-x-2 text-emerald-400 font-serif font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>호메로스 원전의 영웅적 선택과 일치합니다!</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-rose-400 font-serif font-bold text-sm">
                    <XCircle className="w-5 h-5" />
                    <span>원전과 다른 선택: 대체 역사가 펼쳐집니다!</span>
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                {selectedChoice?.narrativeOutcome}
              </p>

              <div className="bg-black/40 p-3.5 rounded-xl border border-slate-800 text-xs font-serif text-amber-300/90">
                <strong className="text-amber-400 block text-[11px] mb-0.5">역사 및 신화 해설</strong>
                {selectedChoice?.historicalNote}
              </div>

              <button
                onClick={handleNextScenario}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-aegean-600 to-aegean-700 hover:from-aegean-500 hover:to-aegean-600 text-white font-serif font-bold text-sm transition"
              >
                {currentScenarioIndex < TRIAL_SCENARIOS.length - 1 ? "다음 시련으로 나아가기" : "최종 영웅 평가 확인하기"}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Completion / Ending Report */
        <div className="bg-parchment-900 border border-amber-500/40 rounded-3xl p-8 shadow-2xl text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center mx-auto text-amber-400">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-amber-200 mb-2">
              시련의 여정을 완수한 영웅이여!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-md mx-auto">
              당신은 운명의 소용돌이 속에서 결단을 내리고 무사히 이타카의 해변에 닿았습니다.
            </p>
          </div>

          {/* Final Rank */}
          <div className="bg-parchment-950 p-6 rounded-2xl border border-amber-500/30 max-w-md mx-auto space-y-2">
            <span className="text-xs font-serif text-amber-400 uppercase tracking-widest block">부여된 호메로스 칭호</span>
            <div className="font-serif text-2xl font-black text-amber-300">
              {stats.wisdom >= 250
                ? "“지혜의 화신 폴뤼메티스 (Polymetis)”"
                : stats.bravery >= 200
                ? "“불굴의 용사 안드레아 (Andreia)”"
                : "“파도를 넘은 방랑자 (Polytropos)”"}
            </div>
            <p className="text-xs text-slate-400 font-sans pt-1">
              최종 지혜 {stats.wisdom}점 • 용맹 {stats.bravery}점 • 생존 선원 {stats.crewRemaining}명
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-xl bg-parchment-950 border border-slate-700 hover:border-amber-500 text-slate-200 font-serif font-bold text-xs flex items-center space-x-2 mx-auto transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>처음부터 다시 도전하기</span>
          </button>
        </div>
      )}
    </div>
  );
};
