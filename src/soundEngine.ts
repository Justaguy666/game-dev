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
    } else if (this.currentTheme === 'inkwell') {
      // 1930s Cartoon: Wooden pop / slide whistle click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.05);

      gain.gain.setValueAtTime(0.28 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    } else if (this.currentTheme === 'synthwave') {
      // 80s Outrun Synthwave: Electronic analog synth tom / laser tap
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.06);

      gain.gain.setValueAtTime(0.24 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (this.currentTheme === 'gothic') {
      // Gothic Eldritch: Heavy iron latch snap & guillotine clank
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.08);

      gain.gain.setValueAtTime(0.35 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      // Cold metallic clink overtone
      const clink = ctx.createOscillator();
      const clinkGain = ctx.createGain();
      clink.type = 'sine';
      clink.frequency.setValueAtTime(1850, now);
      clink.frequency.exponentialRampToValueAtTime(800, now + 0.03);
      clinkGain.gain.setValueAtTime(0.18 * vol, now);
      clinkGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(gain);
      clink.connect(clinkGain);
      gain.connect(ctx.destination);
      clinkGain.connect(ctx.destination);
      osc.start(now);
      clink.start(now);
      osc.stop(now + 0.1);
      clink.stop(now + 0.04);
    } else if (this.currentTheme === 'blueprint') {
      // Blueprint Architect: Crisp mechanical drafting pencil / technical compass click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.035);

      gain.gain.setValueAtTime(0.3 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.045);
    } else if (this.currentTheme === 'ghibli') {
      // Ghibli Cozy Forest: Gentle bamboo water-dropper clack & wood marimba pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(261.63, now + 0.05);

      gain.gain.setValueAtTime(0.3 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      // Soft water drop harmonic pop
      const drop = ctx.createOscillator();
      const dropGain = ctx.createGain();
      drop.type = 'sine';
      drop.frequency.setValueAtTime(1046.50, now);
      drop.frequency.exponentialRampToValueAtTime(659.25, now + 0.04);
      dropGain.gain.setValueAtTime(0.15 * vol, now);
      dropGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(gain);
      drop.connect(dropGain);
      gain.connect(ctx.destination);
      dropGain.connect(ctx.destination);
      osc.start(now);
      drop.start(now);
      osc.stop(now + 0.07);
      drop.stop(now + 0.05);
    } else if (this.currentTheme === 'psx') {
      // PSX 32-Bit: Optical lens stepper seek tap & CD-ROM spindle click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(350, now + 0.025);

      gain.gain.setValueAtTime(0.3 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      const stepper = ctx.createOscillator();
      const stepperGain = ctx.createGain();
      stepper.type = 'triangle';
      stepper.frequency.setValueAtTime(700, now);
      stepper.frequency.exponentialRampToValueAtTime(120, now + 0.04);
      stepperGain.gain.setValueAtTime(0.2 * vol, now);
      stepperGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(gain);
      stepper.connect(stepperGain);
      gain.connect(ctx.destination);
      stepperGain.connect(ctx.destination);
      osc.start(now);
      stepper.start(now);
      osc.stop(now + 0.035);
      stepper.stop(now + 0.05);
    } else if (this.currentTheme === 'persona') {
      // Persona Acid Pop: Snappy electric bass slap pop & comic rimshot
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(75, now + 0.05);

      gain.gain.setValueAtTime(0.35 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);

      // Bright comic slap transient
      const slap = ctx.createOscillator();
      const slapGain = ctx.createGain();
      slap.type = 'sine';
      slap.frequency.setValueAtTime(1760, now);
      slap.frequency.exponentialRampToValueAtTime(440, now + 0.02);
      slapGain.gain.setValueAtTime(0.25 * vol, now);
      slapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      osc.connect(gain);
      slap.connect(slapGain);
      gain.connect(ctx.destination);
      slapGain.connect(ctx.destination);
      osc.start(now);
      slap.start(now);
      osc.stop(now + 0.06);
      slap.stop(now + 0.03);
    } else if (this.currentTheme === 'ukiyoe') {
      // Ukiyo-e Sumi-e: Hyoshigi Japanese hardwood / bamboo Kabuki clack
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);

      gain.gain.setValueAtTime(0.35 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      const hollow = ctx.createOscillator();
      const hollowGain = ctx.createGain();
      hollow.type = 'sine';
      hollow.frequency.setValueAtTime(440, now);
      hollow.frequency.exponentialRampToValueAtTime(160, now + 0.06);
      hollowGain.gain.setValueAtTime(0.2 * vol, now);
      hollowGain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);

      osc.connect(gain);
      hollow.connect(hollowGain);
      gain.connect(ctx.destination);
      hollowGain.connect(ctx.destination);
      osc.start(now);
      hollow.start(now);
      osc.stop(now + 0.05);
      hollow.stop(now + 0.07);
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
    osc.type = this.currentTheme === 'ukiyoe' ? 'sine' : (this.currentTheme === 'persona' ? 'sine' : (this.currentTheme === 'psx' ? 'triangle' : (this.currentTheme === 'ghibli' ? 'sine' : (this.currentTheme === 'gothic' || this.currentTheme === 'blueprint' ? 'sine' : (this.currentTheme === 'synthwave' ? 'sawtooth' : (this.currentTheme === 'fantasy' || this.currentTheme === 'inkwell' ? 'sine' : 'triangle'))))));
    osc.frequency.setValueAtTime(this.currentTheme === 'ukiyoe' ? 1567.98 : (this.currentTheme === 'persona' ? 987.77 : (this.currentTheme === 'psx' ? 1200 : (this.currentTheme === 'ghibli' ? 880 : (this.currentTheme === 'blueprint' ? 1046.50 : (this.currentTheme === 'gothic' ? 146.83 : (this.currentTheme === 'synthwave' ? 740 : (this.currentTheme === 'cyber' ? 880 : (this.currentTheme === 'inkwell' ? 620 : 330)))))))), now);

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

    const notes = this.currentTheme === 'ukiyoe'
      ? [293.66, 311.13, 392.00, 440.00, 466.16, 587.33] // In-sen Sakura traditional Koto pentatonic sweep (D4, Eb4, G4, A4, Bb4, D5)
      : (this.currentTheme === 'persona'
        ? [349.23, 415.30, 523.25, 622.25, 783.99] // Persona Acid Funk Brass / Electric Organ 9th chord (F4, Ab4, C5, Eb5, G5)
        : (this.currentTheme === 'psx'
          ? [220.00, 440.00, 659.25, 880.00, 1318.51] // PS1 BIOS celestial ambient overtone chime
          : (this.currentTheme === 'ghibli'
            ? [523.25, 587.33, 659.25, 783.99, 880.00] // Joe Hisaishi C Major Pentatonic music box arpeggio (C5, D5, E5, G5, A5)
            : (this.currentTheme === 'blueprint'
              ? [440.00, 554.37, 659.25, 880.00] // Pure harmonic blueprint chime (A4, C#5, E5, A5)
              : (this.currentTheme === 'gothic'
                ? [146.83, 220.00, 261.63, 349.23] // D minor cathedral bell chime / organ toll (D3, A3, C4, F4)
                : (this.currentTheme === 'synthwave'
                  ? [293.66, 369.99, 440.00, 554.37] // 80s D Major 7th synthwave chord (D4, F#4, A4, C#5)
                  : (this.currentTheme === 'cyber' 
                    ? [600, 900, 1200]
                    : (this.currentTheme === 'fantasy' 
                        ? [330, 440, 550] 
                        : (this.currentTheme === 'inkwell' ? [440, 554, 659, 880] : [523, 659, 784])))))))));

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = this.currentTheme === 'ukiyoe' ? 'triangle' : (this.currentTheme === 'persona' ? 'sawtooth' : (this.currentTheme === 'psx' ? 'sine' : (this.currentTheme === 'ghibli' ? 'sine' : (this.currentTheme === 'blueprint' ? 'sine' : (this.currentTheme === 'gothic' ? 'triangle' : (this.currentTheme === 'synthwave' ? 'sawtooth' : (this.currentTheme === 'arcade' ? 'square' : 'triangle')))))));
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
