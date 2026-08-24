import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Waves } from 'lucide-react';
import { audioEngine } from '../../utils/soundSynth';

export const SoundPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = () => {
    if (isPlaying) {
      audioEngine.stopSoundtrack();
      setIsPlaying(false);
    } else {
      audioEngine.startSoundtrack();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={toggleSound}
        className={`group flex items-center space-x-3 px-4 py-2.5 rounded-full backdrop-blur-md border shadow-xl transition-all duration-300 ${
          isPlaying
            ? 'bg-amber-950/80 border-amber-500/50 text-amber-300 shadow-amber-950/40 ring-2 ring-amber-500/30'
            : 'bg-parchment-900/80 border-slate-700 text-slate-300 hover:text-white hover:border-amber-500/30'
        }`}
        title={isPlaying ? "사운드 끄기" : "고대 그리스 풍 사운드스케이프 켜기 (바다 & 리라 선율)"}
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
            {isPlaying ? "고대 앰비언트 재생 중" : "사운드스케이프"}
          </div>
          <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
            <Waves className="w-2.5 h-2.5" />
            {isPlaying ? "지중해 파도 & 리라 하프" : "클릭하여 소리 켜기"}
          </div>
        </div>
      </button>
    </div>
  );
};
