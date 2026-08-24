// Enhanced Pure Web Audio API Sound Synthesizer with 3 Distinct Epic Moods

export type SoundMood = 'calm' | 'battle' | 'mystic';

class EpicAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentMood: SoundMood = 'calm';
  private masterGain: GainNode | null = null;
  private seaGain: GainNode | null = null;
  private seaNoiseNode: AudioNode | null = null;
  private loopInterval: number | null = null;

  // Scales
  private dorianNotes = [293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33];
  private mysticNotes = [440.00, 466.16, 554.37, 587.33, 659.25, 698.46, 880.00];
  private battleNotes = [110.00, 130.81, 146.83, 164.81, 196.00, 220.00];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Sea Ambience
  private startSeaAmbience() {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * 4;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, this.ctx.currentTime);

    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.15, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(250, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    this.seaGain = this.ctx.createGain();
    this.seaGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(this.seaGain);
    this.seaGain.connect(this.masterGain);
    whiteNoise.start();

    this.seaNoiseNode = whiteNoise;
  }

  // Pluck a single lyre / harp string
  public playLyrePluck(freq: number, duration = 2.5) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.25, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration);
  }

  // Play an ancient war drum beat
  public playWarDrum(intensity = 0.4) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.5);

    gain.gain.setValueAtTime(intensity, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.6);
  }

  // Play brass-like horn swell for battle
  public playWarHorn(freq = 146.83) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(1200, now + 0.8);
    filter.frequency.exponentialRampToValueAtTime(300, now + 2.2);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 2.5);
  }

  // Play gentle chime UI sound
  public playChime() {
    this.playLyrePluck(523.25, 1.2);
    setTimeout(() => this.playLyrePluck(659.25, 1.5), 100);
  }

  // Set mood and restart ambient loop
  public setMood(mood: SoundMood) {
    this.currentMood = mood;
    if (this.isPlaying) {
      this.restartAmbientLoop();
    }
  }

  public getMood(): SoundMood {
    return this.currentMood;
  }

  private restartAmbientLoop() {
    if (this.loopInterval) {
      clearInterval(this.loopInterval);
      this.loopInterval = null;
    }

    if (this.currentMood === 'calm') {
      const playCalm = () => {
        if (!this.isPlaying) return;
        const idx = Math.floor(Math.random() * (this.dorianNotes.length - 3));
        this.playLyrePluck(this.dorianNotes[idx], 3.0);
        setTimeout(() => { if (this.isPlaying) this.playLyrePluck(this.dorianNotes[idx + 2], 2.5); }, 350);
        setTimeout(() => { if (this.isPlaying) this.playLyrePluck(this.dorianNotes[idx + 4] || 587.33, 3.5); }, 700);
      };
      playCalm();
      this.loopInterval = window.setInterval(playCalm, 5000);
    } else if (this.currentMood === 'battle') {
      const playBattle = () => {
        if (!this.isPlaying) return;
        this.playWarDrum(0.45);
        setTimeout(() => { if (this.isPlaying) this.playWarDrum(0.3); }, 280);
        setTimeout(() => { if (this.isPlaying) this.playWarDrum(0.4); }, 560);
        if (Math.random() > 0.5) {
          setTimeout(() => { if (this.isPlaying) this.playWarHorn(130.81); }, 1200);
        }
      };
      playBattle();
      this.loopInterval = window.setInterval(playBattle, 4000);
    } else if (this.currentMood === 'mystic') {
      const playMystic = () => {
        if (!this.isPlaying) return;
        const idx = Math.floor(Math.random() * (this.mysticNotes.length - 2));
        this.playLyrePluck(this.mysticNotes[idx], 4.0);
        setTimeout(() => { if (this.isPlaying) this.playLyrePluck(this.mysticNotes[idx + 1], 4.0); }, 500);
        setTimeout(() => { if (this.isPlaying) this.playLyrePluck(this.mysticNotes[idx + 2] || 880, 4.5); }, 1100);
      };
      playMystic();
      this.loopInterval = window.setInterval(playMystic, 5500);
    }
  }

  // Start background soundtrack
  public startSoundtrack() {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;

    this.startSeaAmbience();
    this.restartAmbientLoop();
  }

  public stopSoundtrack() {
    this.isPlaying = false;
    if (this.loopInterval) {
      clearInterval(this.loopInterval);
      this.loopInterval = null;
    }
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
      this.masterGain = null;
      this.seaNoiseNode = null;
    }
  }

  public isAudioActive(): boolean {
    return this.isPlaying;
  }
}

export const audioEngine = new EpicAudioEngine();
