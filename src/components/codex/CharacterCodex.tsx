import React, { useState } from 'react';
import { CHARACTERS_DATA, EpicCharacter } from '../../data/charactersData';
import { Shield, Sparkles, Filter, Swords, Brain, Flame, HeartHandshake, ArrowRightLeft, Users } from 'lucide-react';
import { audioEngine } from '../../utils/soundSynth';

interface CharacterCodexProps {
  onOpenImageModal: (src: string, title: string, caption?: string) => void;
}

export const CharacterCodex: React.FC<CharacterCodexProps> = ({ onOpenImageModal }) => {
  const [epicFilter, setEpicFilter] = useState<'all' | 'iliad' | 'odyssey' | 'both'>('all');
  const [sideFilter, setSideFilter] = useState<'all' | 'greek' | 'trojan' | 'olympian' | 'mythical'>('all');
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false);
  const [compareAId, setCompareAId] = useState<string>("achilles");
  const [compareBId, setCompareBId] = useState<string>("odysseus");

  const filteredCharacters = CHARACTERS_DATA.filter((char) => {
    const epicMatch = epicFilter === 'all' || char.epic === epicFilter || char.epic === 'both';
    const sideMatch = sideFilter === 'all' || char.side === sideFilter;
    return epicMatch && sideMatch;
  });

  const heroA = CHARACTERS_DATA.find(c => c.id === compareAId) || CHARACTERS_DATA[0];
  const heroB = CHARACTERS_DATA.find(c => c.id === compareBId) || CHARACTERS_DATA[1];

  const getSideBadge = (side: EpicCharacter['side']) => {
    switch (side) {
      case 'greek':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-serif font-bold bg-amber-950/80 border border-amber-500/40 text-amber-300">그리스 연합군</span>;
      case 'trojan':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-serif font-bold bg-rose-950/80 border border-rose-500/40 text-rose-300">트로이아 군</span>;
      case 'olympian':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-serif font-bold bg-purple-950/80 border border-purple-500/40 text-purple-300">올림포스 신</span>;
      case 'mythical':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-serif font-bold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">신화적 존재</span>;
    }
  };

  const getStatIcon = (type: string) => {
    switch (type) {
      case 'bravery': return <Swords className="w-3.5 h-3.5 text-rose-400" />;
      case 'wisdom': return <Brain className="w-3.5 h-3.5 text-sky-400" />;
      case 'destiny': return <Flame className="w-3.5 h-3.5 text-amber-400" />;
      case 'favor': return <HeartHandshake className="w-3.5 h-3.5 text-purple-400" />;
      default: return <Shield className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header and Controls */}
      <div className="border-b border-amber-500/20 pb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-amber-200 flex items-center gap-2.5">
              <Users className="w-7 h-7 text-amber-400" />
              <span>호메로스 인물 도감 (Character Codex)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
              영웅과 신들의 4대 능력치(용맹, 지혜, 운명, 신의 가호)와 서사시적 의의
            </p>
          </div>

          {/* Compare Mode Toggle Button */}
          <button
            onClick={() => {
              audioEngine.playChime();
              setIsCompareMode(!isCompareMode);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-serif font-bold border transition flex items-center space-x-2 shrink-0 ${
              isCompareMode
                ? 'bg-amber-600 border-amber-400 text-white shadow-lg'
                : 'bg-[#15110d] border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>{isCompareMode ? "전체 도감 보기" : "2인 영웅 스탯 비교 모드"}</span>
          </button>
        </div>

        {/* Filter Bar (When not in compare mode) */}
        {!isCompareMode && (
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center space-x-1.5 bg-[#15110d] p-1.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-serif text-slate-400 px-2 flex items-center gap-1">
                <Filter className="w-3 h-3 text-amber-400" /> 서사시:
              </span>
              {(['all', 'iliad', 'odyssey'] as const).map((ep) => (
                <button
                  key={ep}
                  onClick={() => {
                    audioEngine.playChime();
                    setEpicFilter(ep);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-serif font-bold transition ${
                    epicFilter === ep
                      ? 'bg-amber-950 border border-amber-500/40 text-amber-200 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {ep === 'all' ? '전체' : ep === 'iliad' ? '일리아드' : '오디세이아'}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-1.5 bg-[#15110d] p-1.5 rounded-xl border border-slate-800 overflow-x-auto">
              <span className="text-[11px] font-serif text-slate-400 px-2">진영:</span>
              {(['all', 'greek', 'trojan', 'olympian', 'mythical'] as const).map((sd) => (
                <button
                  key={sd}
                  onClick={() => {
                    audioEngine.playChime();
                    setSideFilter(sd);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-serif font-bold transition whitespace-nowrap ${
                    sideFilter === sd
                      ? 'bg-amber-950 border border-amber-500/40 text-amber-200 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {sd === 'all' ? '전체' : sd === 'greek' ? '그리스' : sd === 'trojan' ? '트로이' : sd === 'olympian' ? '올림포스' : '신화/기타'}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mode 1: 2-Hero Comparison Mode */}
      {isCompareMode ? (
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Hero Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#15110d] p-4 rounded-2xl border border-amber-500/40 space-y-2">
              <span className="text-xs font-serif font-bold text-amber-400">비교 대상 영웅 A</span>
              <select
                value={compareAId}
                onChange={(e) => setCompareAId(e.target.value)}
                className="w-full bg-[#0c0a08] border border-slate-700 text-xs font-serif text-amber-200 p-2 rounded-xl focus:outline-none"
              >
                {CHARACTERS_DATA.map(c => (
                  <option key={c.id} value={c.id}>{c.nameKo} ({c.nameGr})</option>
                ))}
              </select>
            </div>

            <div className="bg-[#15110d] p-4 rounded-2xl border border-sky-500/40 space-y-2">
              <span className="text-xs font-serif font-bold text-sky-400">비교 대상 영웅 B</span>
              <select
                value={compareBId}
                onChange={(e) => setCompareBId(e.target.value)}
                className="w-full bg-[#0c0a08] border border-slate-700 text-xs font-serif text-sky-200 p-2 rounded-xl focus:outline-none"
              >
                {CHARACTERS_DATA.map(c => (
                  <option key={c.id} value={c.id}>{c.nameKo} ({c.nameGr})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparative Cards Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[heroA, heroB].map((hero, idx) => (
              <div
                key={hero.id + idx}
                className="bg-[#15110d] border border-amber-500/30 rounded-3xl p-6 space-y-4 shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  {hero.image ? (
                    <img src={hero.image} alt={hero.nameKo} className="w-16 h-16 rounded-full object-cover border-2 border-amber-400" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-amber-950 border-2 border-amber-400 flex items-center justify-center font-serif text-xl font-bold text-amber-300">
                      {hero.nameKo[0]}
                    </div>
                  )}
                  <div>
                    <h3 className="font-serif text-xl font-black text-amber-200">{hero.nameKo}</h3>
                    <p className="text-xs font-mono text-amber-500/70">{hero.nameGr}</p>
                    <p className="text-[11px] font-serif text-slate-400 italic">"{hero.epithet}"</p>
                  </div>
                </div>

                <div className="space-y-3 bg-[#0c0a08] p-4 rounded-2xl border border-slate-800">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-serif text-slate-300">
                      <span className="flex items-center gap-1">{getStatIcon('bravery')} 용맹 (Bravery)</span>
                      <span className="font-bold text-rose-400">{hero.stats.bravery}</span>
                    </div>
                    <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500" style={{ width: `${hero.stats.bravery}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-serif text-slate-300">
                      <span className="flex items-center gap-1">{getStatIcon('wisdom')} 지혜 (Wisdom)</span>
                      <span className="font-bold text-sky-400">{hero.stats.wisdom}</span>
                    </div>
                    <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                      <div className="h-full bg-sky-500" style={{ width: `${hero.stats.wisdom}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-serif text-slate-300">
                      <span className="flex items-center gap-1">{getStatIcon('destiny')} 운명의 무게 (Destiny)</span>
                      <span className="font-bold text-amber-400">{hero.stats.destiny}</span>
                    </div>
                    <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: `${hero.stats.destiny}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-serif text-slate-300">
                      <span className="flex items-center gap-1">{getStatIcon('favor')} 신의 가호 (Divine Favor)</span>
                      <span className="font-bold text-purple-400">{hero.stats.divineFavor}</span>
                    </div>
                    <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: `${hero.stats.divineFavor}%` }} />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {hero.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Mode 2: Standard Character Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCharacters.map((char) => (
            <div
              key={char.id}
              className="bg-[#15110d] border border-amber-500/20 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-amber-500/50 transition duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Character Portrait */}
                {char.image ? (
                  <div 
                    className="relative h-60 overflow-hidden cursor-pointer bg-black/40"
                    onClick={() => onOpenImageModal(
                      char.image!,
                      `${char.nameKo} (${char.nameGr})`,
                      `호메로스 서사시 인물 초상 — Gemini AI 생성 유화`
                    )}
                  >
                    <img
                      src={char.image}
                      alt={char.nameKo}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#15110d] via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 flex items-center space-x-1">
                      {getSideBadge(char.side)}
                    </div>
                  </div>
                ) : (
                  <div className="h-28 bg-gradient-to-br from-amber-950/40 to-[#15110d] flex items-center justify-between px-6 border-b border-slate-800">
                    <span className="font-serif text-3xl font-black text-amber-500/40">🏛️</span>
                    {getSideBadge(char.side)}
                  </div>
                )}

                {/* Body Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-serif text-2xl font-black text-slate-100 group-hover:text-amber-200 transition">
                        {char.nameKo}
                      </h3>
                      <span className="text-xs font-mono text-amber-500/70">{char.nameGr}</span>
                    </div>
                    <p className="text-xs font-serif text-amber-400/90 italic mt-0.5">
                      "{char.epithet}"
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-3">
                    {char.description}
                  </p>

                  {/* 4 Stat Meters */}
                  <div className="space-y-2 pt-2 border-t border-slate-800 text-[11px] font-serif">
                    <div className="space-y-0.5">
                      <div className="flex justify-between text-slate-400">
                        <span className="flex items-center gap-1">{getStatIcon('bravery')} 용맹</span>
                        <span className="text-rose-400 font-bold">{char.stats.bravery}</span>
                      </div>
                      <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500" style={{ width: `${char.stats.bravery}%` }} />
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex justify-between text-slate-400">
                        <span className="flex items-center gap-1">{getStatIcon('wisdom')} 지혜</span>
                        <span className="text-sky-400 font-bold">{char.stats.wisdom}</span>
                      </div>
                      <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-500" style={{ width: `${char.stats.wisdom}%` }} />
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex justify-between text-slate-400">
                        <span className="flex items-center gap-1">{getStatIcon('destiny')} 운명</span>
                        <span className="text-amber-400 font-bold">{char.stats.destiny}</span>
                      </div>
                      <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500" style={{ width: `${char.stats.destiny}%` }} />
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex justify-between text-slate-400">
                        <span className="flex items-center gap-1">{getStatIcon('favor')} 신의 가호</span>
                        <span className="text-purple-400 font-bold">{char.stats.divineFavor}</span>
                      </div>
                      <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500" style={{ width: `${char.stats.divineFavor}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
