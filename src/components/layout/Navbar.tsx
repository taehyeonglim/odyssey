import React, { useState } from 'react';
import { Compass, Users, Swords, Award, Menu, X, Shield, BookOpen, GitFork, BookMarked, Search } from 'lucide-react';
import { audioEngine } from '../../utils/soundSynth';

export type TabType = 'home' | 'iliad' | 'odyssey' | 'codex' | 'genealogy' | 'lexicon' | 'adventure';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as const, label: '개요', icon: BookOpen, sublabel: 'Home' },
    { id: 'iliad' as const, label: '일리아드', icon: Swords, sublabel: 'Iliad (전쟁·방패·전장)' },
    { id: 'odyssey' as const, label: '오디세이아', icon: Compass, sublabel: 'Odyssey (14개 항해)' },
    { id: 'codex' as const, label: '영웅 도감', icon: Users, sublabel: 'Characters' },
    { id: 'genealogy' as const, label: '가계도', icon: GitFork, sublabel: 'Genealogy' },
    { id: 'lexicon' as const, label: '그리스어 사전', icon: BookMarked, sublabel: 'Lexicon' },
    { id: 'adventure' as const, label: '영웅 결투·시련', icon: Award, sublabel: 'Adventure' },
  ];

  const handleTabChange = (tabId: TabType) => {
    audioEngine.playChime();
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c0a08]/90 backdrop-blur-md border-b border-amber-500/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div 
            onClick={() => handleTabChange('home')}
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-500/30 to-amber-900/50 border border-amber-500/40 flex items-center justify-center group-hover:scale-105 transition shadow-lg shadow-amber-950/40">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 group-hover:rotate-6 transition" />
            </div>
            <div>
              <div className="font-serif text-lg sm:text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 flex items-center gap-1.5">
                HOMER'S EPICS
              </div>
              <div className="text-[10px] sm:text-[11px] font-serif text-amber-500/80 tracking-widest uppercase">
                일리아드 & 오디세이아
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-serif font-semibold tracking-wide transition-all duration-200 flex items-center space-x-1.5 ${
                    isActive
                      ? 'text-amber-300 bg-amber-950/60 border border-amber-500/40 shadow-inner'
                      : 'text-slate-300 hover:text-amber-200 hover:bg-[#1a140f]/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Search Button & Right Action */}
          <div className="hidden sm:flex items-center space-x-2">
            <button
              onClick={() => {
                audioEngine.playChime();
                onOpenSearch();
              }}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-slate-800 bg-[#15110d] hover:border-amber-500/40 text-slate-300 hover:text-white transition"
              title="전역 검색 (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-serif">통합 검색</span>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/60 border border-slate-700 text-slate-400">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden flex items-center space-x-2">
            <button
              onClick={() => {
                audioEngine.playChime();
                onOpenSearch();
              }}
              className="p-2 rounded-lg text-slate-300 hover:text-amber-300 bg-[#15110d] border border-slate-800"
              aria-label="검색 열기"
            >
              <Search className="w-4 h-4 text-amber-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-amber-300 hover:bg-[#15110d] focus:outline-none"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-amber-500/20 bg-[#0c0a08]/98 backdrop-blur-xl px-4 pt-2 pb-6 space-y-1.5 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-serif font-semibold transition ${
                  isActive
                    ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                    : 'text-slate-300 hover:bg-[#15110d] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                <span className="text-[11px] text-slate-400 font-sans">{item.sublabel}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
