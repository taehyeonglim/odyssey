import React from 'react';
import { Compass, BookOpen, Sparkles, Feather } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-parchment-950 border-t border-bronze-900/80 pt-16 pb-12 text-bronze-300 font-serif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Greek Wave border motif */}
        <div className="flex justify-center items-center gap-4 mb-10 opacity-40">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent flex-1 max-w-xs"></div>
          <div className="flex items-center gap-1 text-amber-400">
            <span>𐀀</span>
            <span>𐀁</span>
            <Feather className="w-5 h-5 mx-2 text-amber-400" />
            <span>𐀂</span>
            <span>𐀃</span>
          </div>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent flex-1 max-w-xs"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Compass className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-parchment-100 tracking-wider">호메로스 (Ὅμηρος)</h3>
            </div>
            <p className="text-xs leading-relaxed text-bronze-300/80 font-sans">
              기원전 8세기경 고대 그리스의 맹인 음유시인으로 전해지며, 서양 문학의 뿌리이자 최고의 고전인 대서사시 《일리아드》와 《오디세이아》를 구전 전승으로 정립하였습니다.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-parchment-100 tracking-wider">양대 서사시의 핵심</h3>
            </div>
            <ul className="text-xs space-y-2 text-bronze-300/80 font-sans">
              <li><strong className="text-terracotta-500 font-serif">일리아드(Iliad)</strong>: 분노(Menis), 명예(Kleos), 전쟁의 비극과 인간의 유한성</li>
              <li><strong className="text-aegean-400 font-serif">오디세이아(Odyssey)</strong>: 지혜(Metis), 인내(Polytlas), 귀향(Nostos)과 가정의 회복</li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-parchment-100 tracking-wider">디지털 서사시 아카이브</h3>
            </div>
            <p className="text-xs leading-relaxed text-bronze-300/80 font-sans mb-3">
              본 프로젝트의 모든 서사시 명장면 일러스트는 **Gemini**를 통해 고전 에픽 유화풍으로 생성되었으며, 인터랙티브 맵과 사운드스케이프를 결합하여 개발되었습니다.
            </p>
            <div className="inline-flex items-center gap-2 text-[11px] px-3 py-1 rounded bg-bronze-900/60 border border-bronze-800 text-amber-300">
              <span>GitHub Pages Deployed</span>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-bronze-900/50 flex flex-col sm:flex-row items-center justify-between text-xs text-bronze-500 font-sans gap-4">
          <p>© {new Date().getFullYear()} Homer Epic Universe &middot; Iliad & Odyssey Interactive</p>
          <p className="text-[11px] italic font-serif">
            "Ἄνδρα μοι ἔννεπε, Μοῦσα, πολύτροπον..."
          </p>
        </div>

      </div>
    </footer>
  );
};
