import { ThemeId } from './types';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private volume: number = 0.35;
  private isMuted: boolean = false;
  private currentTheme: ThemeId = 'arcade';

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public getVolume(): number {
    return this.volume;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setTheme(theme: ThemeId) {
    this.currentTheme = theme;
  }

  private getContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // --- THEMED SOUND GENERATORS ---

  // 1. Button Click
  public playClick() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const vol = this.volume;

    if (this.currentTheme === 'arcade') {
      // 8-bit snappy square blip
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);

      gain.gain.setValueAtTime(0.2 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    } else if (this.currentTheme === 'gameboy') {
      // Crunchy low-frequency pulse
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.setValueAtTime(520, now + 0.03);

      gain.gain.setValueAtTime(0.3 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (this.currentTheme === 'cyber') {
      // High-tech laser chirp
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

      gain.gain.setValueAtTime(0.25 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } else {
      // Fantasy: Resonant wooden snap
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.07);

      gain.gain.setValueAtTime(0.25 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    }
  }

  // 2. Light Hover Tick
  public playHover() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const vol = this.volume * 0.4; // very subtle

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = this.currentTheme === 'fantasy' ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(this.currentTheme === 'cyber' ? 880 : 330, now);

    gain.gain.setValueAtTime(0.1 * vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.025);
  }

  // 3. Select / Open View
  public playSelect() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const vol = this.volume;

    const notes = this.currentTheme === 'cyber' 
      ? [600, 900, 1200]
      : (this.currentTheme === 'fantasy' ? [330, 440, 550] : [523, 659, 784]);

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = this.currentTheme === 'arcade' ? 'square' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      gain.gain.setValueAtTime(0.2 * vol, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.13);
    });
  }

  // 4. Quest Completed / Task Check (Coin Sound)
  public playQuestComplete() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const vol = this.volume;

    // Iconic 2-note Mario Coin (B5 -> E6)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';

    osc.frequency.setValueAtTime(987.77, now); // B5
    osc.frequency.setValueAtTime(1318.51, now + 0.07); // E6

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3 * vol, now + 0.01);
    gain.gain.setValueAtTime(0.3 * vol, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.36);
  }

  // 5. Level Up Fanfare
  public playLevelUp() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const vol = this.volume;

    const notes = [440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = this.currentTheme === 'fantasy' ? 'sine' : 'square';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.25 * vol, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + (idx === 4 ? 0.5 : 0.15));

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + (idx === 4 ? 0.55 : 0.16));
    });
  }

  // 6. Save / Checkpoint
  public playSave() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const vol = this.volume;

    const chords = [523.25, 659.25, 783.99, 1046.50];
    chords.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.2 * vol, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.26);
    });
  }

  // 7. Node Click on Skill Tree
  public playNodeClick() {
    this.playSelect();
  }

  // 8. Tab Switch
  public playTab() {
    this.playSelect();
  }
}

export const sound = new SoundEngine();
