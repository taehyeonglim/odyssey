import React, { useState } from 'react';
import { CHARACTERS_DATA, EpicCharacter } from '../../data/charactersData';
import { Users, ZoomIn, Shield, Filter } from 'lucide-react';
import { audioEngine } from '../../utils/soundSynth';

interface CharacterCodexProps {
  onOpenImageModal: (src: string, title: string, caption?: string) => void;
}

export const CharacterCodex: React.FC<CharacterCodexProps> = ({ onOpenImageModal }) => {
  const [filterEpic, setFilterEpic] = useState<'all' | 'iliad' | 'odyssey'>('all');
  const [filterSide, setFilterSide] = useState<'all' | 'greek' | 'trojan' | 'olympian' | 'mythical'>('all');

  const filteredCharacters = CHARACTERS_DATA.filter((char) => {
    const epicMatch = filterEpic === 'all' || char.epic === filterEpic || char.epic === 'both';
    const sideMatch = filterSide === 'all' || char.side === filterSide;
    return epicMatch && sideMatch;
  });

  const getSideBadge = (side: EpicCharacter['side']) => {
    switch (side) {
      case 'greek':
        return <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[10px] font-serif font-bold">아카이아 (그리스)</span>;
      case 'trojan':
        return <span className="px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/40 text-rose-300 text-[10px] font-serif font-bold">트로이아</span>;
      case 'olympian':
        return <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300 text-[10px] font-serif font-bold">올림포스 신</span>;
      case 'mythical':
        return <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-serif font-bold">신화적 존재</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header and Category Filters */}
      <div className="border-b border-amber-500/20 pb-6 space-y-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-amber-200 flex items-center gap-2.5">
            <Users className="w-7 h-7 text-amber-400" />
            <span>호메로스 영웅 & 신화 인물 도감</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            불멸의 명예를 갈망한 전사들과 지혜로 시련을 이겨낸 자들의 전설적인 초상
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 items-center justify-between">
          {/* Epic Filter */}
          <div className="flex items-center space-x-1.5 bg-parchment-950 p-1.5 rounded-xl border border-slate-800">
            <span className="text-[11px] font-serif text-slate-400 px-2 flex items-center gap-1">
              <Filter className="w-3 h-3 text-amber-400" /> 서사시:
            </span>
            {(['all', 'iliad', 'odyssey'] as const).map((epic) => (
              <button
                key={epic}
                onClick={() => {
                  audioEngine.playChime();
                  setFilterEpic(epic);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-serif font-bold transition ${
                  filterEpic === epic
                    ? 'bg-amber-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {epic === 'all' ? '전체' : epic === 'iliad' ? '일리아드' : '오디세이아'}
              </button>
            ))}
          </div>

          {/* Side Filter */}
          <div className="flex items-center space-x-1.5 bg-parchment-950 p-1.5 rounded-xl border border-slate-800 overflow-x-auto">
            <span className="text-[11px] font-serif text-slate-400 px-2 flex items-center gap-1">
              진영:
            </span>
            {(['all', 'greek', 'trojan', 'olympian', 'mythical'] as const).map((side) => (
              <button
                key={side}
                onClick={() => {
                  audioEngine.playChime();
                  setFilterSide(side);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-serif font-bold transition whitespace-nowrap ${
                  filterSide === side
                    ? 'bg-amber-950 border border-amber-500/50 text-amber-300 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {side === 'all' ? '전체' : side === 'greek' ? '그리스' : side === 'trojan' ? '트로이' : side === 'olympian' ? '올림포스 신' : '신화/괴물'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Characters Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCharacters.map((char) => (
          <div
            key={char.id}
            className="bg-parchment-900 border border-amber-500/20 rounded-3xl overflow-hidden shadow-xl hover:border-amber-500/40 transition duration-300 flex flex-col group"
          >
            {/* Portrait Header */}
            {char.image ? (
              <div 
                className="relative h-64 overflow-hidden cursor-pointer"
                onClick={() => {
                  audioEngine.playChime();
                  onOpenImageModal(char.image!, `${char.nameKo} (${char.nameGr})`, char.epithet);
                }}
              >
                <img
                  src={char.image}
                  alt={char.nameKo}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-parchment-900 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur px-2.5 py-1 rounded text-[11px] text-amber-300 flex items-center gap-1 border border-amber-500/30">
                  <ZoomIn className="w-3 h-3" /> 크게 보기
                </div>
              </div>
            ) : (
              <div className="h-28 bg-gradient-to-b from-amber-950/40 to-parchment-900 flex items-center justify-center border-b border-slate-800">
                <Shield className="w-10 h-10 text-amber-500/40" />
              </div>
            )}

            {/* Character Info */}
            <div className="p-6 flex-1 flex flex-col space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  {getSideBadge(char.side)}
                  <span className="text-xs font-serif text-slate-400">{char.title}</span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <h3 className="font-serif text-2xl font-black text-amber-100">{char.nameKo}</h3>
                  <span className="text-xs font-serif text-amber-500/80 font-mono">{char.nameGr}</span>
                </div>
                <p className="text-xs font-serif text-amber-400/90 italic mt-0.5">
                  "{char.epithet}"
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed flex-1">
                {char.description}
              </p>

              {/* Significance Box */}
              <div className="bg-parchment-950/70 p-3 rounded-xl border border-slate-800 text-xs font-sans text-slate-300">
                <strong className="text-amber-400 block font-serif text-[11px] uppercase mb-0.5">문학적 의의</strong>
                {char.significance}
              </div>

              {/* Stats Bar Meter */}
              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-[11px] font-serif">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-0.5">
                      <span>용맹 (Bravery)</span>
                      <span className="text-amber-400 font-bold">{char.stats.bravery}</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full" style={{ width: `${char.stats.bravery}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-0.5">
                      <span>지혜 (Wisdom)</span>
                      <span className="text-sky-400 font-bold">{char.stats.wisdom}</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full" style={{ width: `${char.stats.wisdom}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-0.5">
                      <span>운명 (Destiny)</span>
                      <span className="text-purple-400 font-bold">{char.stats.destiny}</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full" style={{ width: `${char.stats.destiny}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-0.5">
                      <span>신의 가호 (Favor)</span>
                      <span className="text-amber-300 font-bold">{char.stats.divineFavor}</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full" style={{ width: `${char.stats.divineFavor}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
