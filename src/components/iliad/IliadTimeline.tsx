import React, { useState, useEffect } from 'react';
import { ILIAD_BOOKS, IliadBook } from '../../data/iliadData';
import { BookOpen, Sparkles, Filter, ChevronRight, CheckCircle2, Circle, Volume2 } from 'lucide-react';
import { audioEngine } from '../../utils/soundSynth';
import { speechSynth } from '../../utils/speechSynth';

interface IliadTimelineProps {
  onOpenImageModal: (src: string, title: string, caption?: string) => void;
}

export const IliadTimeline: React.FC<IliadTimelineProps> = ({ onOpenImageModal }) => {
  const [filterHighlightsOnly, setFilterHighlightsOnly] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<IliadBook>(ILIAD_BOOKS[0]);
  const [readBookNumbers, setReadBookNumbers] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('iliad_read_books');
      return saved ? JSON.parse(saved) : [1, 16, 22, 24]; // default milestones
    } catch {
      return [1, 16, 22, 24];
    }
  });
  const [speakingBookNum, setSpeakingBookNum] = useState<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('iliad_read_books', JSON.stringify(readBookNumbers));
    } catch {}
  }, [readBookNumbers]);

  const toggleReadBook = (num: number, e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.playChime();
    setReadBookNumbers(prev => 
      prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]
    );
  };

  const handleSpeakBook = (book: IliadBook, e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.playChime();
    setSpeakingBookNum(book.book);
    speechSynth.speak(
      `제 ${book.book}권. ${book.title}. ${book.summary}. 핵심 구절: "${book.keyQuote}"`,
      'ko-KR',
      () => setSpeakingBookNum(null)
    );
  };

  const filteredBooks = filterHighlightsOnly
    ? ILIAD_BOOKS.filter((b) => b.majorEvent)
    : ILIAD_BOOKS;

  const readPercent = Math.round((readBookNumbers.length / ILIAD_BOOKS.length) * 100);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-amber-200 flex items-center gap-2.5">
            <BookOpen className="w-7 h-7 text-amber-400" />
            <span>《일리아드》 24권 연대기 타임라인</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            아킬레우스의 분노에서부터 헥토르의 장례식까지 50일간의 트로이아 전쟁 기록
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              audioEngine.playChime();
              setFilterHighlightsOnly(!filterHighlightsOnly);
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-serif font-bold transition border ${
              filterHighlightsOnly
                ? 'bg-amber-950/80 border-amber-400 text-amber-200 shadow'
                : 'bg-[#15110d] border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{filterHighlightsOnly ? "전체 24권 보기" : "주요 명장면만 보기"}</span>
          </button>
        </div>
      </div>

      {/* Reading Progress Tracker Bar */}
      <div className="bg-[#15110d] border border-amber-500/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <div>
            <div className="text-xs font-serif font-bold text-slate-200">
              서사시 완독 현황: <span className="text-amber-300">총 24권 중 {readBookNumbers.length}권 완독</span>
            </div>
            <div className="text-[11px] text-slate-400 font-sans">각 권의 체크 아이콘을 눌러 완독 여부를 기록하세요.</div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="font-serif text-sm font-bold text-emerald-300">{readPercent}% 완독</span>
          <div className="w-32 sm:w-44 h-2 bg-black/60 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-300" style={{ width: `${readPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Main Grid: 24 Books Timeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => {
          const isSelected = selectedBook.book === book.book;
          const isRead = readBookNumbers.includes(book.book);

          return (
            <div
              key={book.book}
              onClick={() => {
                audioEngine.playChime();
                setSelectedBook(book);
              }}
              className={`group bg-[#15110d] border rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden shadow-xl hover:shadow-2xl ${
                isSelected
                  ? 'border-amber-400 ring-2 ring-amber-500/20 bg-[#1c1611]'
                  : book.majorEvent
                  ? 'border-rose-500/40 hover:border-rose-400/80'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Highlight Badge */}
              {book.majorEvent && (
                <div className="absolute top-0 right-0">
                  <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-bl-xl bg-rose-900/80 border-b border-l border-rose-500/40 text-[10px] font-serif font-bold text-rose-200">
                    <Sparkles className="w-3 h-3 text-rose-300" />
                    <span>명장면</span>
                  </span>
                </div>
              )}

              <div className="space-y-4">
                {/* Book Header */}
                <div className="flex items-center justify-between pr-8">
                  <div className="flex items-center space-x-2">
                    <span className="font-serif text-sm font-black text-amber-400 px-2.5 py-0.5 rounded-md bg-amber-950/80 border border-amber-500/30">
                      제 {book.book} 권
                    </span>
                    <button
                      onClick={(e) => toggleReadBook(book.book, e)}
                      className="p-1 text-slate-500 hover:text-emerald-400 transition"
                      title={isRead ? "완독 취소" : "완독으로 표시"}
                    >
                      {isRead ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Circle className="w-4 h-4" />}
                    </button>
                  </div>
                  <span className="text-xs font-serif text-slate-400">{book.greekTitle}</span>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-black text-slate-100 group-hover:text-amber-200 transition leading-snug">
                    {book.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed mt-2">
                    {book.summary}
                  </p>
                </div>

                {/* Key Quote Box */}
                <div className="bg-[#0c0a08] p-3.5 rounded-2xl border border-slate-800 space-y-1">
                  <p className="text-xs italic font-serif text-amber-300/90 leading-relaxed">
                    "{book.keyQuote}"
                  </p>
                  <p className="text-[11px] text-slate-400 font-sans text-right">
                    — {book.quoteSpeaker}
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <button
                  onClick={(e) => handleSpeakBook(book, e)}
                  className={`p-1.5 rounded-lg border transition flex items-center space-x-1 ${
                    speakingBookNum === book.book ? 'bg-amber-600 text-white animate-pulse' : 'bg-[#0c0a08] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title="서사 낭독 듣기"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-serif">낭독</span>
                </button>

                <div className="flex items-center space-x-1 font-serif text-amber-400 font-bold group-hover:translate-x-1 transition">
                  <span>상세 보기</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
