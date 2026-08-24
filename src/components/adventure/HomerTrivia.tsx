import React, { useState } from 'react';
import { HOMERIC_TRIVIA, TriviaQuestion } from '../../data/triviaData';
import { BookOpen, CheckCircle2, XCircle, Trophy, RotateCcw, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../../utils/soundSynth';

export const HomerTrivia: React.FC = () => {
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const q: TriviaQuestion = HOMERIC_TRIVIA[currentQIndex];

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    audioEngine.playChime();
    setSelectedOption(idx);
    setHasAnswered(true);

    if (idx === q.correctIndex) {
      setScore(prev => prev + 10);
      audioEngine.playChime();
    } else {
      audioEngine.playWarDrum(0.3);
    }
  };

  const handleNext = () => {
    if (currentQIndex < HOMERIC_TRIVIA.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
      audioEngine.playChime();
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
    setIsCompleted(false);
    audioEngine.playChime();
  };

  const getRank = (finalScore: number) => {
    if (finalScore >= 90) return { title: "“올림포스의 현자 (Sophos)”", desc: "호메로스 서사시의 모든 디테일과 그리스어 어원을 완벽히 통달했습니다!" };
    if (finalScore >= 70) return { title: "“음유시인 랩소도스 (Rhapsodos)”", desc: "영웅들의 서사와 고대 그리스의 법도를 깊이 있게 이해하고 있습니다." };
    if (finalScore >= 40) return { title: "“에게해의 항해자 (Nautes)”", desc: "기본적인 신화와 이야기의 줄거리를 잘 파악하고 있습니다." };
    return { title: "“신화의 견습생 (Mathetes)”", desc: "다시 도전하여 호메로스의 위대한 지혜를 탐험해 보세요!" };
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Academy Title Banner */}
      <div className="text-center space-y-2 border-b border-amber-500/20 pb-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-serif font-bold">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>호메로스 학당 (Homeric Academy)</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-black text-amber-100">
          서사시 지식 챌린지 퀴즈
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 font-sans">
          《일리아드》와 《오디세이아》의 상징, 어원, 명장면에 관한 10가지 지식 검증
        </p>
      </div>

      {!isCompleted ? (
        <div className="bg-[#15110d] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Progress Bar & Header */}
          <div className="flex items-center justify-between text-xs font-serif text-amber-400">
            <span>문항 {currentQIndex + 1} / {HOMERIC_TRIVIA.length}</span>
            <span className="font-bold text-amber-300">현재 점수: {score}점</span>
          </div>

          <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300"
              style={{ width: `${((currentQIndex + 1) / HOMERIC_TRIVIA.length) * 100}%` }}
            />
          </div>

          {/* Question Box */}
          <div className="space-y-2">
            <span className="text-[11px] font-serif text-slate-400 uppercase tracking-wider block">
              {q.epic === 'iliad' ? '일리아드 부문' : q.epic === 'odyssey' ? '오디세이아 부문' : '통합 부문'}
            </span>
            <h4 className="font-serif text-lg sm:text-xl font-black text-slate-100 leading-snug">
              {q.question}
            </h4>
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === q.correctIndex;

              let btnStyle = 'bg-[#0c0a08] border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white';
              if (hasAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-1 ring-emerald-400';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                } else {
                  btnStyle = 'bg-[#0c0a08] border-slate-800 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasAnswered}
                  className={`w-full p-4 rounded-2xl border text-left transition duration-200 flex items-center justify-between text-xs sm:text-sm font-serif ${btnStyle}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {hasAnswered && (
                    <div>
                      {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation Box */}
          {hasAnswered && (
            <div className="bg-[#0c0a08] border border-amber-500/40 rounded-2xl p-5 space-y-3 animate-fadeIn">
              <div className="flex items-center space-x-2 text-xs font-serif font-bold text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>해설 및 원전 배경</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                {q.explanation}
              </p>
              <div className="border-l-2 border-amber-500 pl-3 text-xs italic font-serif text-amber-300/80">
                "{q.quoteOrContext}"
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 text-white font-serif font-bold text-xs tracking-wide flex items-center justify-center space-x-1.5 transition mt-2 shadow-lg"
              >
                <span>{currentQIndex < HOMERIC_TRIVIA.length - 1 ? "다음 문항으로" : "최종 결과 보기"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Complete Screen */
        <div className="bg-[#15110d] border border-amber-500/40 rounded-3xl p-8 shadow-2xl text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center mx-auto text-amber-400">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h4 className="font-serif text-2xl sm:text-3xl font-black text-amber-100 mb-2">
              호메로스 지식 챌린지 완료!
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-sans">
              총 10개 문항 중 <strong>{score / 10}개</strong> 정답 ({score}점)
            </p>
          </div>

          <div className="bg-[#0c0a08] p-6 rounded-2xl border border-amber-500/30 max-w-md mx-auto space-y-2">
            <span className="text-xs font-serif text-amber-400 uppercase tracking-widest block">부여된 서사시 칭호</span>
            <div className="font-serif text-2xl font-black text-amber-300">
              {getRank(score).title}
            </div>
            <p className="text-xs text-slate-400 font-sans pt-1">
              {getRank(score).desc}
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-xl bg-[#0c0a08] border border-slate-700 hover:border-amber-500 text-slate-200 font-serif font-bold text-xs flex items-center space-x-2 mx-auto transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>퀴즈 다시 풀기</span>
          </button>
        </div>
      )}
    </div>
  );
};
