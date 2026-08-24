// Pure Web Audio API Sound Generator (Zero external MP3 dependencies)

class EpicAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private seaGain: GainNode | null = null;
  private seaNoiseNode: AudioNode | null = null;
  private melodyInterval: number | null = null;

  // Ancient Greek Dorian scale frequencies (Hz): D, E, F, G, A, B, C, D
  private lyreNotes = [293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25];

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

  // Create ambient sea waves using filtered noise buffer & LFO
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

    // LFO for wave swelling
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.15, this.ctx.currentTime); // Wave period ~6.6s
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(250, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    this.seaGain = this.ctx.createGain();
    this.seaGain.gain.setValueAtTime(0.15, this.ctx.currentTime);

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
    
    // Warm triangular blend
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // Envelope for plucked string
    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.2, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration);
  }

  // Play an ancient war drum beat
  public playWarDrum() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.5);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.6);
  }

  // Play gentle chime UI sound
  public playChime() {
    this.playLyrePluck(523.25, 1.2);
    setTimeout(() => this.playLyrePluck(659.25, 1.5), 100);
  }

  // Start background ambient soundtrack (Sea + periodic Dorian Lyre arpeggios)
  public startSoundtrack() {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;

    this.startSeaAmbience();

    // Periodic gentle lyre notes
    const playRandomChord = () => {
      if (!this.isPlaying) return;
      const baseIdx = Math.floor(Math.random() * (this.lyreNotes.length - 3));
      const note1 = this.lyreNotes[baseIdx];
      const note2 = this.lyreNotes[baseIdx + 2];
      const note3 = this.lyreNotes[baseIdx + 4] || this.lyreNotes[this.lyreNotes.length - 1];

      this.playLyrePluck(note1, 3.0);
      setTimeout(() => { if (this.isPlaying) this.playLyrePluck(note2, 2.5); }, 300);
      setTimeout(() => { if (this.isPlaying) this.playLyrePluck(note3, 3.5); }, 650);
    };

    playRandomChord();
    this.melodyInterval = window.setInterval(playRandomChord, 5000);
  }

  public stopSoundtrack() {
    this.isPlaying = false;
    if (this.melodyInterval) {
      clearInterval(this.melodyInterval);
      this.melodyInterval = null;
    }
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
      this.masterGain = null;
    }
  }

  public isAudioActive(): boolean {
    return this.isPlaying;
  }
}

export const audioEngine = new EpicAudioEngine();
