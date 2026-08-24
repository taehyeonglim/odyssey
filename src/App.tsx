import React, { useState } from 'react';
import { Navbar, TabType } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SoundPlayer } from './components/common/SoundPlayer';
import { ImageModal } from './components/common/ImageModal';
import { QuoteCardModal } from './components/common/QuoteCardModal';
import { IliadHero } from './components/iliad/IliadHero';
import { IliadTimeline } from './components/iliad/IliadTimeline';
import { TrojanWarSides } from './components/iliad/TrojanWarSides';
import { AchillesShield } from './components/iliad/AchillesShield';
import { BattlefieldMap } from './components/iliad/BattlefieldMap';
import { OdysseyHero } from './components/odyssey/OdysseyHero';
import { InteractiveMap } from './components/odyssey/InteractiveMap';
import { CharacterCodex } from './components/codex/CharacterCodex';
import { HeroTrial } from './components/adventure/HeroTrial';
import { HomerTrivia } from './components/adventure/HomerTrivia';
import { Swords, Compass, Users, Award, Sparkles, ChevronRight, BookOpen, Shield } from 'lucide-react';
import { audioEngine } from './utils/soundSynth';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [adventureMode, setAdventureMode] = useState<'trial' | 'trivia'>('trial');
  const [modalImage, setModalImage] = useState<{ src: string; title: string; caption?: string } | null>(null);
  const [quoteCard, setQuoteCard] = useState<{ korean: string; greek?: string; speaker: string; source: string } | null>(null);

  const handleOpenImageModal = (src: string, title: string, caption?: string) => {
    setModalImage({ src, title, caption });
  };

  const handleNavigateTab = (tab: TabType) => {
    audioEngine.playChime();
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0c0a08] text-slate-100 font-sans flex flex-col selection:bg-amber-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ===================== TAB: HOME ===================== */}
        {activeTab === 'home' && (
          <div className="space-y-16 animate-fadeIn">
            {/* Grand Hero Section */}
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-[#15110d]">
              <div className="relative h-[480px] sm:h-[540px]">
                <img
                  src="./assets/images/hero_banner.jpg"
                  alt="호메로스의 서사시 세계관"
                  className="w-full h-full object-cover object-center cursor-pointer hover:scale-103 transition duration-700"
                  onClick={() => handleOpenImageModal(
                    './assets/images/hero_banner.jpg',
                    '호메로스의 대서사시 (The Homeric Epics)',
                    '에게해를 가로지르는 고대 그리스 함선과 황금빛 트로이 성채 — Gemini AI'
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a08] via-[#0c0a08]/60 to-black/30" />
                
                {/* Hero Overlay Content */}
                <div className="absolute bottom-8 left-6 right-6 sm:left-12 sm:right-12 max-w-3xl space-y-4">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950/90 border border-amber-500/40 text-amber-300 text-xs font-serif font-bold tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>서양 고전문학의 불멸의 원천</span>
                  </div>

                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-amber-100 leading-tight tracking-tight drop-shadow-md">
                    HOMER'S EPICS
                  </h1>
                  <p className="font-serif text-lg sm:text-xl text-amber-300/90 font-semibold drop-shadow">
                    《일리아드》 & 《오디세이아》 인터랙티브 아카이브
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed max-w-2xl drop-shadow">
                    인간의 운명과 비극적 분노를 노래한 <strong>《일리아드》</strong>부터 10년간의 험난한 파도를 딛고 이룩한 귀향의 승리 <strong>《오디세이아》</strong>까지, 호메로스의 위대한 두 서사시를 시각적·상호작용적으로 탐험해 보세요.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => handleNavigateTab('iliad')}
                      className="px-5 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-serif font-bold text-xs tracking-wide flex items-center space-x-2 shadow-lg shadow-rose-950/60 transition"
                    >
                      <Swords className="w-4 h-4" />
                      <span>일리아드 탐험</span>
                    </button>
                    <button
                      onClick={() => handleNavigateTab('odyssey')}
                      className="px-5 py-2.5 rounded-xl bg-aegean-600 hover:bg-aegean-500 text-white font-serif font-bold text-xs tracking-wide flex items-center space-x-2 shadow-lg shadow-aegean-950/60 transition"
                    >
                      <Compass className="w-4 h-4" />
                      <span>오디세이아 항해</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Dual Epic Showcase Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Iliad Card */}
              <div 
                onClick={() => handleNavigateTab('iliad')}
                className="group bg-gradient-to-b from-[#15110d] to-[#0c0a08] border border-amber-500/20 hover:border-rose-500/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 cursor-pointer flex flex-col"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src="./assets/images/iliad_hector_duel.jpg"
                    alt="일리아드"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15110d] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-rose-950/90 border border-rose-500/40 text-rose-300 text-xs font-serif font-bold">
                    제1부: 전쟁과 분노
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl font-black text-slate-100 group-hover:text-rose-300 transition">
                      일리아드 (Iliad)
                    </h3>
                    <p className="text-xs font-serif text-amber-400/80 mb-2">
                      트로이아 전쟁 10년차 50일간의 기록
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                      아킬레우스의 신성한 분노, 아킬레우스의 신성한 방패, 트로이아 전선 공방과 헥토르와의 비극적 결투.
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-serif text-rose-400 font-bold pt-4 border-t border-slate-800">
                    <span>24권 타임라인 & 아킬레우스 방패 보기</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </div>

              {/* Odyssey Card */}
              <div 
                onClick={() => handleNavigateTab('odyssey')}
                className="group bg-gradient-to-b from-[#15110d] to-[#0c0a08] border border-amber-500/20 hover:border-aegean-500/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 cursor-pointer flex flex-col"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src="./assets/images/odyssey_cyclops.jpg"
                    alt="오디세이아"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15110d] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-aegean-950/90 border border-aegean-500/40 text-aegean-300 text-xs font-serif font-bold">
                    제2부: 귀환과 지혜
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl font-black text-slate-100 group-hover:text-aegean-300 transition">
                      오디세이아 (Odyssey)
                    </h3>
                    <p className="text-xs font-serif text-amber-400/80 mb-2">
                      트로이 함락 후 10년간의 지중해 대모험
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                      외눈박이 거인 키클롭스, 마녀 키르케, 세이렌의 유혹과 스킬라의 절벽을 넘어 고향 이타카에서 아내 페넬로페와 왕권을 되찾는 지략의 승리.
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-serif text-aegean-400 font-bold pt-4 border-t border-slate-800">
                    <span>14개 스테이션 인터랙티브 항해 지도 보기</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Interactive Features Promo */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div 
                onClick={() => {
                  setAdventureMode('trial');
                  handleNavigateTab('adventure');
                }}
                className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/20 hover:border-amber-500/50 cursor-pointer transition flex items-center space-x-4"
              >
                <div className="p-3 rounded-xl bg-amber-900/40 text-amber-300 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-amber-200">영웅의 선택</h4>
                  <p className="text-xs text-slate-400 font-sans">키클롭스, 세이렌의 위기에서 당신의 결단을 내려보세요.</p>
                </div>
              </div>

              <div 
                onClick={() => {
                  setAdventureMode('trivia');
                  handleNavigateTab('adventure');
                }}
                className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/20 hover:border-amber-500/50 cursor-pointer transition flex items-center space-x-4"
              >
                <div className="p-3 rounded-xl bg-amber-900/40 text-amber-300 shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-amber-200">호메로스 학당 퀴즈</h4>
                  <p className="text-xs text-slate-400 font-sans">10단계 서사시 지식 챌린지에 도전하고 칭호를 획득하세요.</p>
                </div>
              </div>

              <div 
                onClick={() => handleNavigateTab('codex')}
                className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/20 hover:border-amber-500/50 cursor-pointer transition flex items-center space-x-4"
              >
                <div className="p-3 rounded-xl bg-amber-900/40 text-amber-300 shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-amber-200">호메로스 인물 도감</h4>
                  <p className="text-xs text-slate-400 font-sans">영웅들과 올림포스 신들의 능력치와 초상화.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB: ILIAD ===================== */}
        {activeTab === 'iliad' && (
          <div className="space-y-12 animate-fadeIn">
            <IliadHero
              onExploreClick={() => {
                const el = document.getElementById('iliad-timeline-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenImageModal={handleOpenImageModal}
            />

            {/* Tactical Battlefield Map */}
            <BattlefieldMap />

            {/* Shield of Achilles Concentric Interactive Viewer */}
            <AchillesShield />

            {/* Faction Comparison */}
            <TrojanWarSides />

            {/* 24-Book Interactive Timeline */}
            <div id="iliad-timeline-section">
              <IliadTimeline onOpenImageModal={handleOpenImageModal} />
            </div>
          </div>
        )}

        {/* ===================== TAB: ODYSSEY ===================== */}
        {activeTab === 'odyssey' && (
          <div className="space-y-12 animate-fadeIn">
            <OdysseyHero
              onExploreMap={() => {
                const el = document.getElementById('odyssey-map-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenImageModal={handleOpenImageModal}
            />

            <div id="odyssey-map-section">
              <InteractiveMap onOpenImageModal={handleOpenImageModal} />
            </div>
          </div>
        )}

        {/* ===================== TAB: CODEX ===================== */}
        {activeTab === 'codex' && (
          <div className="animate-fadeIn">
            <CharacterCodex onOpenImageModal={handleOpenImageModal} />
          </div>
        )}

        {/* ===================== TAB: ADVENTURE & ACADEMY ===================== */}
        {activeTab === 'adventure' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Mode Switcher */}
            <div className="flex justify-center">
              <div className="inline-flex p-1.5 rounded-2xl bg-[#15110d] border border-amber-500/30">
                <button
                  onClick={() => {
                    audioEngine.playChime();
                    setAdventureMode('trial');
                  }}
                  className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold transition flex items-center space-x-2 ${
                    adventureMode === 'trial'
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>영웅의 선택 시뮬레이터</span>
                </button>
                <button
                  onClick={() => {
                    audioEngine.playChime();
                    setAdventureMode('trivia');
                  }}
                  className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-serif font-bold transition flex items-center space-x-2 ${
                    adventureMode === 'trivia'
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>호메로스 학당 퀴즈</span>
                </button>
              </div>
            </div>

            {adventureMode === 'trial' ? (
              <HeroTrial onOpenImageModal={handleOpenImageModal} />
            ) : (
              <HomerTrivia />
            )}
          </div>
        )}
      </main>

      {/* Persistent Ambient Sound Player Widget */}
      <SoundPlayer />

      {/* Global Image Lightbox Modal */}
      <ImageModal
        isOpen={!!modalImage}
        onClose={() => setModalImage(null)}
        imageSrc={modalImage?.src || ''}
        title={modalImage?.title || ''}
        caption={modalImage?.caption}
      />

      {/* Quote Card Generator Modal */}
      <QuoteCardModal
        isOpen={!!quoteCard}
        onClose={() => setQuoteCard(null)}
        quote={quoteCard}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};
