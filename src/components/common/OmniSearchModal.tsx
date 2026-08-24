import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Compass, Shield, Users, Sparkles, ChevronRight } from 'lucide-react';
import { ILIAD_BOOKS } from '../../data/iliadData';
import { ODYSSEY_STATIONS } from '../../data/odysseyData';
import { CHARACTERS_DATA } from '../../data/charactersData';
import { HOMERIC_LEXICON } from '../../data/lexiconData';
import { SHIELD_OF_ACHILLES_DATA } from '../../data/shieldData';
import { TabType } from '../layout/Navbar';
import { audioEngine } from '../../utils/soundSynth';

interface OmniSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: TabType, extraId?: string) => void;
}

export const OmniSearchModal: React.FC<OmniSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle if parent supports, or just close on Escape
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  // Search aggregations
  const filteredIliad = query.trim() ? ILIAD_BOOKS.filter(b => 
    b.title.includes(query) || b.summary.includes(query) || b.keyQuote.includes(query)
  ) : [];

  const filteredOdyssey = query.trim() ? ODYSSEY_STATIONS.filter(s => 
    s.nameKo.includes(query) || s.summary.includes(query) || s.detail.includes(query)
  ) : [];

  const filteredCharacters = query.trim() ? CHARACTERS_DATA.filter(c => 
    c.nameKo.includes(query) || c.nameGr.includes(query) || c.description.includes(query)
  ) : [];

  const filteredLexicon = query.trim() ? HOMERIC_LEXICON.filter(l => 
    l.korean.includes(query) || l.greek.includes(query) || l.shortDef.includes(query)
  ) : [];

  const filteredShield = query.trim() ? SHIELD_OF_ACHILLES_DATA.filter(z => 
    z.titleKo.includes(query) || z.description.includes(query)
  ) : [];

  const totalResults = filteredIliad.length + filteredOdyssey.length + filteredCharacters.length + filteredLexicon.length + filteredShield.length;

  const handleSelectResult = (tab: TabType, extraId?: string) => {
    audioEngine.playChime();
    onNavigate(tab, extraId);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-2xl w-full bg-[#15110d] border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-black flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-amber-500/20 bg-[#0c0a08]">
          <Search className="w-5 h-5 text-amber-400 shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="인물, 사건, 기착지, 그리스어 개념 검색 (예: 아킬레우스, 키클롭스, 노스토스)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm font-serif text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-slate-400 space-y-2">
              <Sparkles className="w-8 h-8 text-amber-500/40 mx-auto" />
              <p className="text-xs font-serif">
                찾으시는 인물, 권별 스토리, 항해 기착지, 그리스어 단어를 입력하세요.
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                {['아킬레우스', '키클롭스', '방패', '세이렌', '클레오스', '헥토르'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-lg bg-[#0c0a08] border border-slate-800 text-[11px] font-serif text-amber-300 hover:border-amber-500/40"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs font-serif">
              "{query}"에 대한 검색 결과가 없습니다.
            </div>
          ) : (
            <div className="space-y-4">
              {/* Iliad Books */}
              {filteredIliad.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-serif font-bold text-rose-400 uppercase tracking-wider block px-2">
                    일리아드 권별 서사 ({filteredIliad.length})
                  </span>
                  {filteredIliad.map(b => (
                    <div
                      key={b.book}
                      onClick={() => handleSelectResult('iliad')}
                      className="p-3 rounded-xl bg-[#0c0a08] border border-slate-800 hover:border-rose-500/50 cursor-pointer flex items-center justify-between transition"
                    >
                      <div>
                        <div className="font-serif text-xs font-bold text-slate-200">{b.title}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-md">{b.summary}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </div>
                  ))}
                </div>
              )}

              {/* Odyssey Stations */}
              {filteredOdyssey.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-serif font-bold text-sky-400 uppercase tracking-wider block px-2">
                    오디세이아 항해 기착지 ({filteredOdyssey.length})
                  </span>
                  {filteredOdyssey.map(s => (
                    <div
                      key={s.id}
                      onClick={() => handleSelectResult('odyssey')}
                      className="p-3 rounded-xl bg-[#0c0a08] border border-slate-800 hover:border-sky-500/50 cursor-pointer flex items-center justify-between transition"
                    >
                      <div>
                        <div className="font-serif text-xs font-bold text-slate-200">{s.nameKo}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-md">{s.summary}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </div>
                  ))}
                </div>
              )}

              {/* Characters */}
              {filteredCharacters.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-serif font-bold text-amber-400 uppercase tracking-wider block px-2">
                    영웅 및 신화 인물 ({filteredCharacters.length})
                  </span>
                  {filteredCharacters.map(c => (
                    <div
                      key={c.id}
                      onClick={() => handleSelectResult('codex')}
                      className="p-3 rounded-xl bg-[#0c0a08] border border-slate-800 hover:border-amber-500/50 cursor-pointer flex items-center justify-between transition"
                    >
                      <div>
                        <div className="font-serif text-xs font-bold text-amber-200">{c.nameKo} ({c.nameGr})</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-md">{c.description}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </div>
                  ))}
                </div>
              )}

              {/* Lexicon */}
              {filteredLexicon.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-serif font-bold text-purple-400 uppercase tracking-wider block px-2">
                    그리스어 개념 사전 ({filteredLexicon.length})
                  </span>
                  {filteredLexicon.map(l => (
                    <div
                      key={l.id}
                      onClick={() => handleSelectResult('lexicon')}
                      className="p-3 rounded-xl bg-[#0c0a08] border border-slate-800 hover:border-purple-500/50 cursor-pointer flex items-center justify-between transition"
                    >
                      <div>
                        <div className="font-serif text-xs font-bold text-purple-200">{l.greek} - {l.korean}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-md">{l.shortDef}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </div>
                  ))}
                </div>
              )}

              {/* Shield Zones */}
              {filteredShield.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-serif font-bold text-yellow-400 uppercase tracking-wider block px-2">
                    아킬레우스 방패 영역 ({filteredShield.length})
                  </span>
                  {filteredShield.map(z => (
                    <div
                      key={z.id}
                      onClick={() => handleSelectResult('iliad')}
                      className="p-3 rounded-xl bg-[#0c0a08] border border-slate-800 hover:border-yellow-500/50 cursor-pointer flex items-center justify-between transition"
                    >
                      <div>
                        <div className="font-serif text-xs font-bold text-yellow-200">{z.titleKo}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-md">{z.description}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 bg-[#0c0a08] border-t border-slate-800 text-[11px] font-sans text-slate-500 flex items-center justify-between">
          <span>Esc 키로 닫기</span>
          <span>총 {totalResults}개 검색됨</span>
        </div>
      </div>
    </div>
  );
};
