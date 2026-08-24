import React, { useState } from 'react';
import { ROYAL_HOUSES, RoyalHouse, FamilyMember } from '../../data/genealogyData';
import { Users, Crown, Shield, Flame, Compass, Sparkles, ChevronRight, Info, Skull } from 'lucide-react';
import { audioEngine } from '../../utils/soundSynth';

export const GenealogyGraph: React.FC = () => {
  const [selectedHouseId, setSelectedHouseId] = useState<string>("atreus");
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  const currentHouse: RoyalHouse = ROYAL_HOUSES.find(h => h.id === selectedHouseId) || ROYAL_HOUSES[0];

  const handleSelectHouse = (id: string) => {
    audioEngine.playChime();
    setSelectedHouseId(id);
    setSelectedMember(null);
  };

  const handleSelectMember = (member: FamilyMember) => {
    audioEngine.playChime();
    setSelectedMember(member);
  };

  const getHouseIcon = (sigil: string) => {
    switch (sigil) {
      case 'Crown': return <Crown className="w-4 h-4 text-amber-400" />;
      case 'Shield': return <Shield className="w-4 h-4 text-rose-400" />;
      case 'Flame': return <Flame className="w-4 h-4 text-orange-400" />;
      case 'Compass': return <Compass className="w-4 h-4 text-sky-400" />;
      default: return <Sparkles className="w-4 h-4 text-amber-400" />;
    }
  };

  const getGenerationLabel = (gen: number) => {
    switch (gen) {
      case 2: return "선조 / 부모 세대 (1세대)";
      case 3: return "트로이 전쟁 영웅 세대 (2세대)";
      case 4: return "전후 자녀 세대 (3세대)";
      default: return "세대";
    }
  };

  // Group members by generation
  const gen2Members = currentHouse.members.filter(m => m.generation === 2);
  const gen3Members = currentHouse.members.filter(m => m.generation === 3);
  const gen4Members = currentHouse.members.filter(m => m.generation === 4);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="border-b border-amber-500/20 pb-6 space-y-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-amber-200 flex items-center gap-2.5">
            <Users className="w-7 h-7 text-amber-400" />
            <span>영웅 가계도 & 인물 관계망 (Homeric Lineage)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            신들의 피를 이어받은 4대 왕가의 혈통, 비극적인 운명의 대물림과 얽히고설킨 인간관계
          </p>
        </div>

        {/* House Switcher Tabs */}
        <div className="flex flex-wrap gap-2 pt-2">
          {ROYAL_HOUSES.map((house) => {
            const isSelected = selectedHouseId === house.id;
            return (
              <button
                key={house.id}
                onClick={() => handleSelectHouse(house.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-serif font-bold transition flex items-center space-x-2 border ${
                  isSelected
                    ? 'bg-amber-950 border-amber-400 text-amber-200 shadow-lg shadow-amber-950/60'
                    : 'bg-[#15110d] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {getHouseIcon(house.sigil)}
                <span>{house.nameKo.split('(')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* House Overview Banner */}
      <div className="bg-[#15110d] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-serif font-bold text-amber-400 px-2.5 py-0.5 rounded bg-amber-950 border border-amber-500/30">
                {currentHouse.nameGr}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-black text-slate-100 mt-1">
                {currentHouse.nameKo}
              </h3>
            </div>
            <span className="text-xs font-serif text-slate-400 px-3 py-1 rounded bg-[#0c0a08] border border-slate-800">
              영지: {currentHouse.region}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            {currentHouse.description}
          </p>

          <div className="bg-rose-950/40 border-l-3 border-rose-500 p-3 rounded-r-xl text-xs font-serif text-rose-300">
            <strong className="block text-[11px] uppercase tracking-wider text-rose-400 mb-0.5">가문의 숙명과 저주</strong>
            {currentHouse.curseOrDestiny}
          </div>
        </div>
      </div>

      {/* Interactive Family Tree Hierarchy View */}
      <div className="bg-[#15110d] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
        <h4 className="font-serif text-lg font-bold text-amber-300 flex items-center gap-2">
          <Crown className="w-5 h-5 text-amber-400" />
          <span>세대별 계보도 (클릭하여 인물 상세 및 최후 확인)</span>
        </h4>

        <div className="space-y-8 relative">
          {/* Generation 2: Parents */}
          {gen2Members.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-serif font-bold text-amber-400 tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                <span>{getGenerationLabel(2)}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {gen2Members.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => handleSelectMember(member)}
                    className={`p-4 rounded-2xl border transition duration-200 cursor-pointer space-y-1.5 ${
                      selectedMember?.id === member.id
                        ? 'bg-amber-950/80 border-amber-400 ring-2 ring-amber-500/30 shadow-lg'
                        : 'bg-[#0c0a08] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="font-serif text-base font-black text-amber-200">{member.nameKo}</h5>
                      <span className="text-[11px] font-mono text-amber-500/70">{member.nameGr}</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Line separator */}
          <div className="w-full h-px bg-slate-800" />

          {/* Generation 3: Heroes (Main Generation) */}
          <div className="space-y-3">
            <div className="text-xs font-serif font-bold text-rose-400 tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
              <span>{getGenerationLabel(3)}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {gen3Members.map((member) => (
                <div
                  key={member.id}
                  onClick={() => handleSelectMember(member)}
                  className={`p-4 rounded-2xl border transition duration-200 cursor-pointer space-y-1.5 relative overflow-hidden ${
                    selectedMember?.id === member.id
                      ? 'bg-amber-950/80 border-amber-400 ring-2 ring-amber-500/30 shadow-lg'
                      : 'bg-[#0c0a08] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h5 className="font-serif text-base font-black text-amber-100">{member.nameKo}</h5>
                    <span className="text-[11px] font-mono text-amber-500/70">{member.nameGr}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Generation 4: Children */}
          {gen4Members.length > 0 && (
            <>
              <div className="w-full h-px bg-slate-800" />
              <div className="space-y-3">
                <div className="text-xs font-serif font-bold text-sky-400 tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
                  <span>{getGenerationLabel(4)}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {gen4Members.map((member) => (
                    <div
                      key={member.id}
                      onClick={() => handleSelectMember(member)}
                      className={`p-4 rounded-2xl border transition duration-200 cursor-pointer space-y-1.5 ${
                        selectedMember?.id === member.id
                          ? 'bg-amber-950/80 border-amber-400 ring-2 ring-amber-500/30 shadow-lg'
                          : 'bg-[#0c0a08] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="font-serif text-base font-black text-sky-200">{member.nameKo}</h5>
                        <span className="text-[11px] font-mono text-sky-500/70">{member.nameGr}</span>
                      </div>
                      <p className="text-xs text-slate-300 font-sans">{member.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Selected Member Detail Modal / Card */}
        {selectedMember && (
          <div className="bg-[#0c0a08] border border-amber-500/40 rounded-2xl p-6 space-y-4 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-serif text-amber-400 font-mono">{selectedMember.nameGr}</span>
                <h4 className="font-serif text-2xl font-black text-amber-100">{selectedMember.nameKo}</h4>
                <p className="text-xs text-slate-400 font-sans">{selectedMember.role}</p>
              </div>
              <span className="text-xs font-serif text-slate-400 px-3 py-1 rounded bg-[#15110d] border border-slate-800">
                {getGenerationLabel(selectedMember.generation)}
              </span>
            </div>

            <div className="space-y-3">
              <div className="bg-[#15110d] p-4 rounded-xl border border-rose-500/20 text-xs font-sans leading-relaxed text-slate-200">
                <strong className="text-rose-400 block font-serif text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Skull className="w-3.5 h-3.5" /> 신화적 최후 및 결말
                </strong>
                {selectedMember.fate}
              </div>

              {/* Relationships */}
              <div className="flex flex-wrap gap-2 text-xs font-serif text-slate-300 pt-1">
                {selectedMember.relationships.marriedTo && (
                  <span className="px-3 py-1 rounded-lg bg-[#15110d] border border-slate-800">
                    💍 배우자: <strong>{selectedMember.relationships.marriedTo}</strong>
                  </span>
                )}
                {selectedMember.relationships.parentOf && (
                  <span className="px-3 py-1 rounded-lg bg-[#15110d] border border-slate-800">
                    👶 자녀: <strong>{selectedMember.relationships.parentOf.join(', ')}</strong>
                  </span>
                )}
                {selectedMember.relationships.rivalOf && (
                  <span className="px-3 py-1 rounded-lg bg-rose-950/60 border border-rose-500/30 text-rose-300">
                    ⚔️ 숙명의 라이벌: <strong>{selectedMember.relationships.rivalOf}</strong>
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
