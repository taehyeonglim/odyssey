import React, { useState } from 'react';
import { ILIAD_BOOKS, IliadBook } from '../../data/iliadData';
import { BookOpen, Sparkles, User, MessageSquare, ChevronDown, ChevronUp, ZoomIn, Filter } from 'lucide-react';
import { audioEngine } from '../../utils/soundSynth';

interface IliadTimelineProps {
  onOpenImageModal: (src: string, title: string, caption?: string) => void;
}

export const IliadTimeline: React.FC<IliadTimelineProps> = ({ onOpenImageModal }) => {
  const [filterMajorOnly, setFilterMajorOnly] = useState(false);
  const [expandedBook, setExpandedBook] = useState<number | null>(1);

  const displayedBooks = filterMajorOnly 
    ? ILIAD_BOOKS.filter(b => b.majorEvent) 
    : ILIAD_BOOKS;

  const toggleExpand = (bookNum: number) => {
    audioEngine.playChime();
    setExpandedBook(expandedBook === bookNum ? null : bookNum);
  };

  return (
    <div className="space-y-6">
      {/* Section Header with Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-amber-200 flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-amber-400" />
            <span>일리아드 24권 타임라인</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            아킬레우스의 분노에서 시작하여 헥토르의 장례로 끝나는 50일간의 처절한 서사
          </p>
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => {
            audioEngine.playChime();
            setFilterMajorOnly(!filterMajorOnly);
          }}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-serif font-semibold border transition ${
            filterMajorOnly
              ? 'bg-amber-950 border-amber-500/60 text-amber-300 shadow-md'
              : 'bg-parchment-900 border-slate-700 text-slate-300 hover:text-white'
          }`}
        >
          <Filter className="w-3.5 h-3.5 text-amber-400" />
          <span>{filterMajorOnly ? "주요 명장면만 보는 중" : "모든 주요 권 보기"}</span>
        </button>
      </div>

      {/* Timeline Stream */}
      <div className="relative border-l-2 border-amber-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8 my-8">
        {displayedBooks.map((book: IliadBook) => {
          const isExpanded = expandedBook === book.book;
          return (
            <div key={book.book} className="relative group">
              {/* Timeline Pin/Node */}
              <div 
                className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center text-[11px] sm:text-xs font-serif font-black transition-all duration-300 ${
                  book.majorEvent
                    ? 'bg-rose-900 border-rose-400 text-rose-200 ring-4 ring-rose-950 shadow-lg shadow-rose-950/60'
                    : 'bg-parchment-900 border-amber-500/50 text-amber-300'
                }`}
              >
                {book.book}
              </div>

              {/* Book Card */}
              <div className={`bg-parchment-900/90 rounded-2xl border transition-all duration-300 overflow-hidden shadow-lg ${
                isExpanded
                  ? 'border-amber-500/50 shadow-amber-950/40 ring-1 ring-amber-500/30'
                  : 'border-slate-800 hover:border-slate-700'
              }`}>
                {/* Header (Clickable) */}
                <div 
                  onClick={() => toggleExpand(book.book)}
                  className="p-4 sm:p-6 cursor-pointer flex items-start justify-between gap-4 select-none hover:bg-parchment-800/40 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-serif font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30">
                        {book.greekTitle}
                      </span>
                      {book.majorEvent && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/40">
                          핵심 분기
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-black text-slate-100 group-hover:text-amber-300 transition">
                      {book.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 font-sans">
                      {book.subtitle}
                    </p>
                  </div>

                  <div className="p-2 text-slate-400 group-hover:text-amber-400 transition">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-6 sm:px-6 sm:pb-6 pt-2 border-t border-slate-800 space-y-5 animate-fadeIn">
                    {/* Gemini Artwork If Available */}
                    {book.image && (
                      <div className="relative rounded-xl overflow-hidden border border-amber-500/20 group/img">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-full h-56 sm:h-72 object-cover object-center cursor-pointer hover:scale-102 transition duration-500"
                          onClick={() => onOpenImageModal(book.image!, book.title, book.keyQuote)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none">
                          <span className="text-xs text-amber-200 font-serif font-semibold drop-shadow">
                            Gemini AI 에픽 아트워크
                          </span>
                          <span className="bg-black/70 backdrop-blur px-2 py-1 rounded text-[11px] text-amber-300 flex items-center gap-1 border border-amber-500/30">
                            <ZoomIn className="w-3 h-3" /> 클릭하여 확대
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Summary Narrative */}
                    <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans bg-parchment-950/60 p-4 rounded-xl border border-slate-800/80">
                      {book.summary}
                    </div>

                    {/* Key Quote Box */}
                    <div className="bg-amber-950/20 border-l-3 border-amber-500 p-4 rounded-r-xl space-y-1">
                      <div className="flex items-center space-x-1.5 text-amber-400 text-xs font-serif font-bold">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>명대사 — {book.quoteSpeaker}</span>
                      </div>
                      <p className="text-xs font-mono text-amber-300/60 italic">
                        {book.greekQuote}
                      </p>
                      <p className="text-xs sm:text-sm font-serif italic text-slate-200 leading-relaxed pt-1">
                        "{book.keyQuote}"
                      </p>
                    </div>

                    {/* Key Figures Badge List */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-xs text-slate-400 font-serif flex items-center gap-1">
                        <User className="w-3 h-3 text-amber-400" /> 주요 등장인물:
                      </span>
                      {book.keyFigures.map((fig, idx) => (
                        <span 
                          key={idx} 
                          className="px-2.5 py-1 rounded-md bg-parchment-950 text-xs font-serif text-amber-200 border border-slate-700"
                        >
                          {fig}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
