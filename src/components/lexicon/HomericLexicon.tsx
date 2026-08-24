import React, { useState } from 'react';
import { HOMERIC_LEXICON, HomericConcept } from '../../data/lexiconData';
import { BookOpen, Search, Volume2, Sparkles, Filter, RotateCw, Quote } from 'lucide-react';
import { audioEngine } from '../../utils/soundSynth';
import { speechSynth } from '../../utils/speechSynth';

export const HomericLexicon: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | HomericConcept['category']>('all');
  const [isFlashcardMode, setIsFlashcardMode] = useState<boolean>(false);
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const filteredConcepts = HOMERIC_LEXICON.filter((item) => {
    const matchSearch = item.korean.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.greek.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.shortDef.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleSpeak = (concept: HomericConcept) => {
    audioEngine.playChime();
    setSpeakingId(concept.id);
    speechSynth.speak(
      `${concept.korean}. ${concept.shortDef}. ${concept.fullExplanation}`,
      'ko-KR',
      () => setSpeakingId(null)
    );
  };

  const getCategoryBadge = (cat: HomericConcept['category']) => {
    switch (cat) {
      case 'heroism':
        return <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[10px] font-serif font-bold">영웅관</span>;
      case 'fate':
        return <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300 text-[10px] font-serif font-bold">운명관</span>;
      case 'society':
        return <span className="px-2 py-0.5 rounded bg-sky-950/80 border border-sky-500/40 text-sky-300 text-[10px] font-serif font-bold">사회 규범</span>;
      case 'divine':
        return <span className="px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/40 text-rose-300 text-[10px] font-serif font-bold">신성과 질서</span>;
    }
  };

  const currentFlashcard = HOMERIC_LEXICON[flashcardIndex];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-amber-500/20 pb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-amber-200 flex items-center gap-2.5">
              <BookOpen className="w-7 h-7 text-amber-400" />
              <span>호메로스 고대 그리스어 개념 사전 (Homeric Lexicon)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
              메니스(분노), 클레오스(영광), 노스토스(귀향) 등 서사시를 지탱하는 12대 핵심 사상과 어원
            </p>
          </div>

          {/* Flashcard Toggle */}
          <button
            onClick={() => {
              audioEngine.playChime();
              setIsFlashcardMode(!isFlashcardMode);
              setIsFlipped(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-serif font-bold border transition flex items-center space-x-2 shrink-0 ${
              isFlashcardMode
                ? 'bg-amber-600 border-amber-400 text-white shadow-lg'
                : 'bg-[#15110d] border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{isFlashcardMode ? "사전 목록 뷰로 전환" : "플래시카드 암기 모드"}</span>
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        {!isFlashcardMode && (
          <div className="flex flex-col md:flex-row gap-3 pt-2">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="그리스어 단어, 한국어 개념, 설명 검색 (예: 메니스, 영광, 노스토스)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#15110d] border border-slate-800 rounded-xl text-xs font-serif text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center space-x-1.5 bg-[#15110d] p-1.5 rounded-xl border border-slate-800 overflow-x-auto">
              <span className="text-[11px] font-serif text-slate-400 px-2 flex items-center gap-1">
                <Filter className="w-3 h-3 text-amber-400" /> 분야:
              </span>
              {(['all', 'heroism', 'fate', 'society', 'divine'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    audioEngine.playChime();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-serif font-bold transition whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-amber-950 border border-amber-500/40 text-amber-200 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? '전체' : cat === 'heroism' ? '영웅관' : cat === 'fate' ? '운명관' : cat === 'society' ? '사회 규범' : '신성과 질서'}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mode 1: Interactive Flashcard Mode */}
      {isFlashcardMode ? (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="text-center text-xs font-serif text-amber-400">
            카드 {flashcardIndex + 1} / {HOMERIC_LEXICON.length} (카드를 클릭하여 뒤집어보세요)
          </div>

          {/* Flip Card Container */}
          <div
            onClick={() => {
              audioEngine.playChime();
              setIsFlipped(!isFlipped);
            }}
            className="min-h-[320px] bg-gradient-to-b from-[#1a140f] to-[#0c0a08] border-2 border-amber-500/40 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center text-center cursor-pointer transition duration-300 transform hover:scale-102 select-none relative"
          >
            <div className="absolute top-4 right-4 text-slate-500 text-xs font-serif flex items-center gap-1">
              <RotateCw className="w-3.5 h-3.5" /> 뒤집기
            </div>

            {!isFlipped ? (
              /* Front of Card */
              <div className="space-y-4 animate-fadeIn">
                <span className="text-xs font-serif text-amber-500/80 tracking-widest uppercase block">
                  고대 그리스어 개념
                </span>
                <div className="font-serif text-4xl sm:text-5xl font-black text-amber-200">
                  {currentFlashcard.greek}
                </div>
                <div className="font-mono text-base text-amber-400/80">
                  [{currentFlashcard.transliteration}]
                </div>
                <p className="text-xs text-slate-400 font-sans pt-4">
                  클릭하여 한국어 의미 및 해설 확인
                </p>
              </div>
            ) : (
              /* Back of Card */
              <div className="space-y-4 animate-fadeIn">
                <div className="flex justify-center">{getCategoryBadge(currentFlashcard.category)}</div>
                <div className="font-serif text-2xl sm:text-3xl font-black text-amber-100">
                  {currentFlashcard.korean}
                </div>
                <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed max-w-md">
                  {currentFlashcard.shortDef}
                </p>
                <div className="bg-black/40 p-3 rounded-xl border border-slate-800 text-xs font-serif italic text-amber-300/90">
                  "{currentFlashcard.koreanCitation}"
                </div>
              </div>
            )}
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                audioEngine.playChime();
                setFlashcardIndex(prev => Math.max(0, prev - 1));
                setIsFlipped(false);
              }}
              disabled={flashcardIndex === 0}
              className={`px-4 py-2 rounded-xl text-xs font-serif font-bold border transition ${
                flashcardIndex === 0 ? 'border-slate-800 text-slate-600 cursor-not-allowed' : 'border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              이전 단어
            </button>

            <button
              onClick={() => {
                audioEngine.playChime();
                setFlashcardIndex(prev => Math.min(HOMERIC_LEXICON.length - 1, prev + 1));
                setIsFlipped(false);
              }}
              disabled={flashcardIndex === HOMERIC_LEXICON.length - 1}
              className={`px-4 py-2 rounded-xl text-xs font-serif font-bold border transition ${
                flashcardIndex === HOMERIC_LEXICON.length - 1 ? 'border-slate-800 text-slate-600 cursor-not-allowed' : 'bg-amber-950 border-amber-500/40 text-amber-200 hover:bg-amber-900'
              }`}
            >
              다음 단어
            </button>
          </div>
        </div>
      ) : (
        /* Mode 2: Dictionary Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConcepts.map((item) => (
            <div
              key={item.id}
              className="bg-[#15110d] border border-amber-500/20 rounded-3xl p-6 shadow-xl hover:border-amber-500/40 transition duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {getCategoryBadge(item.category)}
                  <button
                    onClick={() => handleSpeak(item)}
                    className={`p-1.5 rounded-lg border transition ${
                      speakingId === item.id ? 'bg-amber-600 text-white animate-pulse' : 'bg-[#0c0a08] border-slate-800 text-slate-400 hover:text-amber-300'
                    }`}
                    title="음성 낭독 듣기"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-serif text-2xl font-black text-amber-200">{item.greek}</span>
                    <span className="text-xs font-mono text-amber-500/70">[{item.transliteration}]</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-100">{item.korean}</h3>
                </div>

                <p className="text-xs font-serif text-amber-300/90 font-medium">
                  {item.shortDef}
                </p>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {item.fullExplanation}
                </p>
              </div>

              {/* Citations */}
              <div className="pt-3 border-t border-slate-800/80 space-y-1 bg-[#0c0a08] p-3 rounded-xl border border-slate-800">
                <p className="text-[11px] font-mono text-amber-400/70 italic">
                  {item.greekCitation}
                </p>
                <p className="text-xs font-serif italic text-slate-200">
                  "{item.koreanCitation}"
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
