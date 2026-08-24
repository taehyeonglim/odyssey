import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Waves, Swords, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';
import { audioEngine, SoundMood } from '../../utils/soundSynth';

export const SoundPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMood, setCurrentMood] = useState<SoundMood>('calm');
  const [showMoodMenu, setShowMoodMenu] = useState(false);

  const toggleSound = () => {
    if (isPlaying) {
      audioEngine.stopSoundtrack();
      setIsPlaying(false);
      setShowMoodMenu(false);
    } else {
      audioEngine.startSoundtrack();
      setIsPlaying(true);
    }
  };

  const handleChangeMood = (mood: SoundMood) => {
    audioEngine.playChime();
    setCurrentMood(mood);
    audioEngine.setMood(mood);
    setShowMoodMenu(false);
  };

  const getMoodLabel = (m: SoundMood) => {
    switch (m) {
      case 'calm':
        return { name: '평온한 에게해', desc: '파도 & 리라 하프', icon: Waves, color: 'text-sky-400' };
      case 'battle':
        return { name: '트로이아 전운', desc: '전쟁 북소리 & 나팔', icon: Swords, color: 'text-rose-400' };
      case 'mystic':
        return { name: '세이렌의 미혹', desc: '신비의 화음', icon: Sparkles, color: 'text-purple-400' };
    }
  };

  const activeMoodInfo = getMoodLabel(currentMood);
  const MoodIcon = activeMoodInfo.icon;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2">
      {/* Mood Selector Dropup */}
      {isPlaying && showMoodMenu && (
        <div className="bg-[#15110d]/95 backdrop-blur-xl border border-amber-500/40 rounded-2xl p-2 shadow-2xl shadow-black/80 space-y-1 mb-1 min-w-[200px] animate-fadeIn">
          <div className="px-3 py-1 text-[11px] font-serif font-bold text-amber-400 border-b border-slate-800 uppercase tracking-wider">
            사운드스케이프 무드 선택
          </div>
          {(['calm', 'battle', 'mystic'] as const).map((m) => {
            const info = getMoodLabel(m);
            const Icon = info.icon;
            const isCurrent = currentMood === m;
            return (
              <button
                key={m}
                onClick={() => handleChangeMood(m)}
                className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-serif text-left transition ${
                  isCurrent ? 'bg-amber-950 border border-amber-500/40 text-amber-200' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${info.color}`} />
                <div>
                  <div className="font-bold">{info.name}</div>
                  <div className="text-[10px] text-slate-400">{info.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Sound Button */}
      <div className="flex items-center space-x-1.5">
        <button
          onClick={toggleSound}
          className={`group flex items-center space-x-3 px-4 py-2.5 rounded-full backdrop-blur-md border shadow-xl transition-all duration-300 ${
            isPlaying
              ? 'bg-amber-950/90 border-amber-500/50 text-amber-300 shadow-amber-950/50 ring-2 ring-amber-500/30'
              : 'bg-[#15110d]/90 border-slate-700 text-slate-300 hover:text-white hover:border-amber-500/30'
          }`}
          title={isPlaying ? "사운드 끄기" : "고대 그리스 풍 사운드스케이프 켜기"}
        >
          <div className="relative">
            {isPlaying ? (
              <Volume2 className="w-5 h-5 text-amber-400 animate-pulse" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400 group-hover:text-amber-300" />
            )}
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            )}
          </div>

          <div className="text-left hidden sm:block">
            <div className="text-xs font-serif font-bold leading-none flex items-center gap-1">
              <Music className="w-3 h-3 text-amber-400" />
              {isPlaying ? activeMoodInfo.name : "사운드스케이프"}
            </div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
              <MoodIcon className={`w-2.5 h-2.5 ${isPlaying ? activeMoodInfo.color : ''}`} />
              {isPlaying ? activeMoodInfo.desc : "클릭하여 소리 켜기"}
            </div>
          </div>
        </button>

        {/* Mood Switch Toggle Arrow (Visible when playing) */}
        {isPlaying && (
          <button
            onClick={() => setShowMoodMenu(!showMoodMenu)}
            className="p-2.5 rounded-full bg-[#15110d]/90 border border-amber-500/40 text-amber-300 hover:bg-amber-950 transition shadow-lg"
            title="무드 변경"
          >
            {showMoodMenu ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};
