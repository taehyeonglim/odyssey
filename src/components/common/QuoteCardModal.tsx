import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Volume2, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { audioEngine } from '../../utils/soundSynth';
import { speechSynth } from '../../utils/speechSynth';

export interface EpicQuoteItem {
  id?: string;
  korean: string;
  greek?: string;
  speaker: string;
  source: string;
}

export const PRESET_EPIC_QUOTES: EpicQuoteItem[] = [
  {
    id: "achilles_kleos",
    korean: "내 귀향의 길은 사라졌으나, 나의 영광(클레오스)은 영원히 시들지 않으리라.",
    greek: "ὤλε토 μέν μοι νόστος, ἀτὰρ κλέος ἄφθιτον ἔσται.",
    speaker: "아킬레우스",
    source: "《일리아드》 제9권 413행"
  },
  {
    id: "hector_patriot",
    korean: "오직 하나뿐인 최상의 길조는 조국을 지키기 위해 당당히 싸우는 것이오.",
    greek: "εἷς οἰωνὸς ἄριστος ἀμύνεσθαι περὶ πάτρης.",
    speaker: "헥토르",
    source: "《일리아드》 제12권 243행"
  },
  {
    id: "priam_plea",
    korean: "나는 세상 그 어떤 필멸의 인간도 감히 하지 못한 일을 견뎌내고 있소. 내 자식을 죽인 자의 손에 입을 맞추고 있으니 말이오.",
    greek: "ἔτλην δ' οἷ' οὔ πώ τις ἐπιχθόνιος βροτὸς ἄλλος, ἀνδρὸς παιδοφό노ιο ποτὶ στόμα χεῖρ' ὀρέγεσθαι.",
    speaker: "프리아모스 노왕",
    source: "《일리아드》 제24권 505행"
  },
  {
    id: "odysseus_outis",
    korean: "키클롭스여, 내 이름이 무엇인지 묻는가? 내 이름은 '아무도 아니다(Outis)'이다.",
    greek: "Οὖτις ἐμοί γ' ὄνομα: Οὖτιν δέ με κικλήσκουσι μήτηρ ἠδὲ πατήρ...",
    speaker: "오디세우스",
    source: "《오디세이아》 제9권 366행"
  },
  {
    id: "odysseus_nostos",
    korean: "고향 땅에서 피어오르는 연기라도 바라보다가 죽기를 갈망하도다.",
    greek: "ἱέμενος καὶ καπνὸν ἀποθρῴσκοντα νοῆσαι ἧς γαίης θανέειν ἱμείρεται...",
    speaker: "오디세우스",
    source: "《오디세이아》 제1권 58행"
  },
  {
    id: "athena_wisdom",
    korean: "어떤 고난 속에서도 굴하지 않는 자에게 지혜의 여신이 언제나 함께할 것이다.",
    greek: "αἰεὶ γάρ τοι τοιοῦτον ἐνὶ στήθεσσι νόημα...",
    speaker: "아테나 여신",
    source: "《오디세이아》 제13권 330행"
  }
];

interface QuoteCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote?: EpicQuoteItem | null;
}

export const QuoteCardModal: React.FC<QuoteCardModalProps> = ({ isOpen, onClose, quote: initialQuote }) => {
  const [copied, setCopied] = useState(false);
  const [selectedQuoteIndex, setSelectedQuoteIndex] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!isOpen) return null;

  const currentQuote: EpicQuoteItem = initialQuote || PRESET_EPIC_QUOTES[selectedQuoteIndex];

  const handleCopy = () => {
    const textToCopy = `"${currentQuote.korean}"\n\n— ${currentQuote.speaker} (${currentQuote.source})\n${currentQuote.greek ? `[그리스어 원문: ${currentQuote.greek}]` : ''}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    audioEngine.playChime();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    audioEngine.playChime();
    setIsSpeaking(true);
    speechSynth.speak(
      `"${currentQuote.korean}" — ${currentQuote.speaker}, ${currentQuote.source}`,
      'ko-KR',
      () => setIsSpeaking(false)
    );
  };

  const handlePrev = () => {
    audioEngine.playChime();
    setSelectedQuoteIndex(prev => (prev === 0 ? PRESET_EPIC_QUOTES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    audioEngine.playChime();
    setSelectedQuoteIndex(prev => (prev === PRESET_EPIC_QUOTES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-xl w-full bg-[#15110d] border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-amber-950/60 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h4 className="font-serif text-lg font-bold text-amber-200">호메로스 불멸의 명대사 카드</h4>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Canvas Preview */}
        <div className="relative bg-gradient-to-b from-[#1c140d] via-[#15100a] to-[#0c0a08] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
          <Quote className="w-8 h-8 text-amber-500/40 mx-auto" />

          {currentQuote.greek && (
            <p className="text-xs font-mono text-amber-300/80 italic leading-relaxed px-4">
              {currentQuote.greek}
            </p>
          )}

          <blockquote className="font-serif text-base sm:text-lg text-slate-100 font-medium italic leading-relaxed">
            "{currentQuote.korean}"
          </blockquote>

          <div className="pt-3 border-t border-amber-500/20">
            <span className="font-serif text-base font-bold text-amber-300 block">{currentQuote.speaker}</span>
            <span className="text-xs text-slate-400 font-sans">{currentQuote.source}</span>
          </div>
        </div>

        {/* Preset Selector Stepper (When viewing presets) */}
        {!initialQuote && (
          <div className="flex items-center justify-between px-2">
            <button
              onClick={handlePrev}
              className="px-3 py-1.5 rounded-lg bg-[#0c0a08] border border-slate-800 hover:border-amber-500 text-xs font-serif text-slate-300 flex items-center space-x-1 transition"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>이전 명대사</span>
            </button>

            <span className="text-xs font-serif text-slate-400">
              {selectedQuoteIndex + 1} / {PRESET_EPIC_QUOTES.length}
            </span>

            <button
              onClick={handleNext}
              className="px-3 py-1.5 rounded-lg bg-[#0c0a08] border border-slate-800 hover:border-amber-500 text-xs font-serif text-slate-300 flex items-center space-x-1 transition"
            >
              <span>다음 명대사</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            onClick={handleSpeak}
            className={`px-3 py-2 rounded-xl text-xs font-serif font-bold border transition flex items-center space-x-1.5 ${
              isSpeaking ? 'bg-amber-600 text-white animate-pulse' : 'bg-[#0c0a08] border-slate-800 text-slate-300 hover:text-white'
            }`}
            title="명대사 음성 낭독 듣기"
          >
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span>낭독 듣기</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-serif font-bold flex items-center space-x-1.5 transition shadow"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "클립보드 복사 완료!" : "명대사 카드 복사"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
