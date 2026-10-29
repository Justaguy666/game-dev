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
    } else if (this.currentTheme === 'vaporwave') {
      // Windows 95: 1995 Ball Mouse Mechanical Microswitch Click
      const click = ctx.createOscillator();
      const clickGain = ctx.createGain();
      click.type = 'triangle';
      click.frequency.setValueAtTime(1800, now);
      click.frequency.exponentialRampToValueAtTime(600, now + 0.015);

      clickGain.gain.setValueAtTime(0.35 * vol, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      const plastic = ctx.createOscillator();
      const plasticGain = ctx.createGain();
      plastic.type = 'sine';
      plastic.frequency.setValueAtTime(320, now);
      plastic.frequency.exponentialRampToValueAtTime(120, now + 0.03);
      plasticGain.gain.setValueAtTime(0.2 * vol, now);
      plasticGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      click.connect(clickGain);
      plastic.connect(plasticGain);
      clickGain.connect(ctx.destination);
      plasticGain.connect(ctx.destination);
      click.start(now);
      plastic.start(now);
      click.stop(now + 0.025);
      plastic.stop(now + 0.04);
    } else if (this.currentTheme === 'pipboy') {
      // Pip-Boy 3000: Heavy Rotary Dial Notch & High-Voltage CRT Pulse
      const notch = ctx.createOscillator();
      const notchGain = ctx.createGain();
      notch.type = 'triangle';
      notch.frequency.setValueAtTime(260, now);
      notch.frequency.exponentialRampToValueAtTime(70, now + 0.03);

      notchGain.gain.setValueAtTime(0.35 * vol, now);
      notchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      const crt = ctx.createOscillator();
      const crtGain = ctx.createGain();
      crt.type = 'square';
      crt.frequency.setValueAtTime(2400, now);
      crt.frequency.exponentialRampToValueAtTime(800, now + 0.015);
      crtGain.gain.setValueAtTime(0.18 * vol, now);
      crtGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      notch.connect(notchGain);
      crt.connect(crtGain);
      notchGain.connect(ctx.destination);
      crtGain.connect(ctx.destination);
      notch.start(now);
      crt.start(now);
      notch.stop(now + 0.04);
      crt.stop(now + 0.025);
    } else if (this.currentTheme === 'claymation') {
      // Claymation: Squishy Plasticine Dough Squelch & Soft Clay Plop
      const plop = ctx.createOscillator();
      const plopGain = ctx.createGain();
      plop.type = 'sine';
      plop.frequency.setValueAtTime(360, now);
      plop.frequency.exponentialRampToValueAtTime(110, now + 0.04);

      plopGain.gain.setValueAtTime(0.35 * vol, now);
      plopGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      const squish = ctx.createOscillator();
      const squishGain = ctx.createGain();
      squish.type = 'triangle';
      squish.frequency.setValueAtTime(650, now);
      squish.frequency.exponentialRampToValueAtTime(220, now + 0.025);
      squishGain.gain.setValueAtTime(0.2 * vol, now);
      squishGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      plop.connect(plopGain);
      squish.connect(squishGain);
      plopGain.connect(ctx.destination);
      squishGain.connect(ctx.destination);
      plop.start(now);
      squish.start(now);
      plop.stop(now + 0.05);
      squish.stop(now + 0.035);
    } else if (this.currentTheme === 'papercraft') {
      // Papercraft Origami: Sharp Crisp Paper Fold Crease & Snip
      const crease = ctx.createOscillator();
      const creaseGain = ctx.createGain();
      crease.type = 'triangle';
      crease.frequency.setValueAtTime(2200, now);
      crease.frequency.exponentialRampToValueAtTime(700, now + 0.02);

      creaseGain.gain.setValueAtTime(0.35 * vol, now);
      creaseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      const friction = ctx.createOscillator();
      const frictionGain = ctx.createGain();
      friction.type = 'sine';
      friction.frequency.setValueAtTime(3200, now);
      friction.frequency.exponentialRampToValueAtTime(1200, now + 0.015);
      frictionGain.gain.setValueAtTime(0.2 * vol, now);
      frictionGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      crease.connect(creaseGain);
      friction.connect(frictionGain);
      creaseGain.connect(ctx.destination);
      frictionGain.connect(ctx.destination);
      crease.start(now);
      friction.start(now);
      crease.stop(now + 0.03);
      friction.stop(now + 0.025);
    } else if (this.currentTheme === 'solarpunk') {
      // Solarpunk Biophilic: Crystalline quartz prism tap & singing solarium glass tick
      const prism = ctx.createOscillator();
      const prismGain = ctx.createGain();
      prism.type = 'sine';
      prism.frequency.setValueAtTime(2400, now);
      prism.frequency.exponentialRampToValueAtTime(1200, now + 0.025);
      prismGain.gain.setValueAtTime(0.3 * vol, now);
      prismGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      const shimmer = ctx.createOscillator();
      const shimmerGain = ctx.createGain();
      shimmer.type = 'triangle';
      shimmer.frequency.setValueAtTime(3600, now);
      shimmer.frequency.exponentialRampToValueAtTime(1800, now + 0.015);
      shimmerGain.gain.setValueAtTime(0.18 * vol, now);
      shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      prism.connect(prismGain);
      shimmer.connect(shimmerGain);
      prismGain.connect(ctx.destination);
      shimmerGain.connect(ctx.destination);
      prism.start(now);
      shimmer.start(now);
      prism.stop(now + 0.04);
      shimmer.stop(now + 0.025);
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
    osc.type = this.currentTheme === 'solarpunk' ? 'sine' : (this.currentTheme === 'papercraft' ? 'triangle' : (this.currentTheme === 'claymation' ? 'sine' : (this.currentTheme === 'pipboy' ? 'sawtooth' : (this.currentTheme === 'vaporwave' ? 'square' : (this.currentTheme === 'ukiyoe' ? 'sine' : (this.currentTheme === 'persona' ? 'sine' : (this.currentTheme === 'psx' ? 'triangle' : (this.currentTheme === 'ghibli' ? 'sine' : (this.currentTheme === 'gothic' || this.currentTheme === 'blueprint' ? 'sine' : (this.currentTheme === 'synthwave' ? 'sawtooth' : (this.currentTheme === 'fantasy' || this.currentTheme === 'inkwell' ? 'sine' : 'triangle')))))))))));
    osc.frequency.setValueAtTime(this.currentTheme === 'solarpunk' ? 1760 : (this.currentTheme === 'papercraft' ? 1400 : (this.currentTheme === 'claymation' ? 440 : (this.currentTheme === 'pipboy' ? 1760 : (this.currentTheme === 'vaporwave' ? 1200 : (this.currentTheme === 'ukiyoe' ? 1567.98 : (this.currentTheme === 'persona' ? 987.77 : (this.currentTheme === 'psx' ? 1200 : (this.currentTheme === 'ghibli' ? 880 : (this.currentTheme === 'blueprint' ? 1046.50 : (this.currentTheme === 'gothic' ? 146.83 : (this.currentTheme === 'synthwave' ? 740 : (this.currentTheme === 'cyber' ? 880 : (this.currentTheme === 'inkwell' ? 620 : 330))))))))))))), now);

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

    const notes = this.currentTheme === 'solarpunk'
      ? [523.25, 659.25, 739.99, 987.77] // Glass Conservatory Prism Chime & Solar Lydian Mode Arpeggio (C5, E5, F#5, B5)
      : (this.currentTheme === 'papercraft'
      ? [523.25, 659.25, 783.99, 1046.50] // Origami Paper Crane Unfold & Japanese Furin Wind Chime (C5, E5, G5, C6)
      : (this.currentTheme === 'claymation'
      ? [392.00, 523.25, 659.25, 783.99] // Claymation Wooden Marimba / Xylophone Bounce Arpeggio (G4, C5, E5, G5)
      : (this.currentTheme === 'pipboy'
      ? [587.33, 880.00, 1174.66, 1760.00] // RobCo Terminal / V.A.T.S. Tactical Selection Chirp (D5, A5, D6, A6)
      : (this.currentTheme === 'vaporwave'
        ? [369.99, 554.37, 622.25, 830.61, 932.33, 1396.91] // Windows 95 Brian Eno Startup Sound / FM Synth chime (F#3, C#4, D#4, G#4, A#4, F5)
        : (this.currentTheme === 'ukiyoe'
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
                            : (this.currentTheme === 'inkwell' ? [440, 554, 659, 880] : [523, 659, 784]))))))))))))));

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = this.currentTheme === 'solarpunk' ? 'sine' : (this.currentTheme === 'papercraft' ? 'triangle' : (this.currentTheme === 'claymation' ? 'sine' : (this.currentTheme === 'pipboy' ? 'square' : (this.currentTheme === 'vaporwave' ? 'sine' : (this.currentTheme === 'ukiyoe' ? 'triangle' : (this.currentTheme === 'persona' ? 'sawtooth' : (this.currentTheme === 'psx' ? 'sine' : (this.currentTheme === 'ghibli' ? 'sine' : (this.currentTheme === 'blueprint' ? 'sine' : (this.currentTheme === 'gothic' ? 'triangle' : (this.currentTheme === 'synthwave' ? 'sawtooth' : (this.currentTheme === 'arcade' ? 'square' : 'triangle'))))))))))));
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      gain.gain.setValueAtTime(0.2 * vol, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.13);
    });
  }

  // 4. Quest Completed / Task Check (17 Unique Themed Rewards)
  public playQuestComplete() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const vol = this.volume;

    if (this.currentTheme === 'arcade') {
      // 16-Bit Arcade: Iconic 2-note Mario/Sonic coin (B5 -> E6)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.setValueAtTime(1318.51, now + 0.07);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.3 * vol, now + 0.01);
      gain.gain.setValueAtTime(0.3 * vol, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.36);
    } else if (this.currentTheme === 'gameboy') {
      // Game Boy DMG: Chunky 4-bit pulse coin (G5 -> C6)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(783.99, now);
      osc.frequency.setValueAtTime(1046.50, now + 0.06);
      gain.gain.setValueAtTime(0.28 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.24);
    } else if (this.currentTheme === 'cyber') {
      // Cyber Mecha: High-tech neural data-upload confirmation chirp
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760, now);
      osc.frequency.exponentialRampToValueAtTime(3520, now + 0.05);
      gain.gain.setValueAtTime(0.3 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.20);
    } else if (this.currentTheme === 'fantasy') {
      // Dark Fantasy RPG: Lute / acoustic harp quest strum
      const freqs = [440.00, 554.37, 659.25];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + i * 0.04);
        gain.gain.setValueAtTime(0.25 * vol, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.32);
      });
    } else if (this.currentTheme === 'inkwell') {
      // 1930s Inkwell: Vintage cartoon bicycle bell / cash register bell
      const bell = ctx.createOscillator();
      const gain = ctx.createGain();
      bell.type = 'sine';
      bell.frequency.setValueAtTime(1046.50, now);
      gain.gain.setValueAtTime(0.35 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      const overtone = ctx.createOscillator();
      const overGain = ctx.createGain();
      overtone.type = 'sine';
      overtone.frequency.setValueAtTime(2093.00, now);
      overGain.gain.setValueAtTime(0.2 * vol, now);
      overGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      bell.connect(gain);
      overtone.connect(overGain);
      gain.connect(ctx.destination);
      overGain.connect(ctx.destination);
      bell.start(now);
      overtone.start(now);
      bell.stop(now + 0.36);
      overtone.stop(now + 0.26);
    } else if (this.currentTheme === 'synthwave') {
      // Outrun 1984: 80s arcade neon laser power-up
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.16);
      gain.gain.setValueAtTime(0.25 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.30);
    } else if (this.currentTheme === 'gothic') {
      // Gothic Eldritch: Heavy cathedral sanctuary bell strike
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(146.83, now); // D3 fundamental
      gain.gain.setValueAtTime(0.4 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      const bell = ctx.createOscillator();
      const bellGain = ctx.createGain();
      bell.type = 'sine';
      bell.frequency.setValueAtTime(587.33, now); // D5 chime
      bellGain.gain.setValueAtTime(0.25 * vol, now);
      bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      bell.connect(bellGain);
      gain.connect(ctx.destination);
      bellGain.connect(ctx.destination);
      osc.start(now);
      bell.start(now);
      osc.stop(now + 0.56);
      bell.stop(now + 0.46);
    } else if (this.currentTheme === 'blueprint') {
      // Blueprint Architect: Technical compass lock & draftsman stamp
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1500, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.04);
      gain.gain.setValueAtTime(0.35 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      const table = ctx.createOscillator();
      const tableGain = ctx.createGain();
      table.type = 'triangle';
      table.frequency.setValueAtTime(330, now + 0.02);
      table.frequency.exponentialRampToValueAtTime(110, now + 0.09);
      tableGain.gain.setValueAtTime(0.25 * vol, now + 0.02);
      tableGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      table.connect(tableGain);
      gain.connect(ctx.destination);
      tableGain.connect(ctx.destination);
      osc.start(now);
      table.start(now + 0.02);
      osc.stop(now + 0.07);
      table.stop(now + 0.13);
    } else if (this.currentTheme === 'ghibli') {
      // Ghibli Cozy Forest: Magical Totoro acorn music-box chime
      const notes = [1046.50, 1318.51, 1567.98]; // C6, E6, G6
      notes.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.05);
        gain.gain.setValueAtTime(0.22 * vol, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.30);
      });
    } else if (this.currentTheme === 'psx') {
      // PSX 32-Bit: PS1 Memory Card "1 BLOCK SAVED" confirmation
      const bell1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      bell1.type = 'sine';
      bell1.frequency.setValueAtTime(880, now);
      gain1.gain.setValueAtTime(0.25 * vol, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      const bell2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      bell2.type = 'sine';
      bell2.frequency.setValueAtTime(1760, now + 0.06);
      gain2.gain.setValueAtTime(0.3 * vol, now + 0.06);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      bell1.connect(gain1);
      bell2.connect(gain2);
      gain1.connect(ctx.destination);
      gain2.connect(ctx.destination);
      bell1.start(now);
      bell2.start(now + 0.06);
      bell1.stop(now + 0.22);
      bell2.stop(now + 0.34);
    } else if (this.currentTheme === 'persona') {
      // Persona Acid Pop: Persona Confidant rank-up / All-Out Attack star chime
      const bass = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bass.type = 'sawtooth';
      bass.frequency.setValueAtTime(220, now);
      bass.frequency.exponentialRampToValueAtTime(80, now + 0.06);
      bassGain.gain.setValueAtTime(0.35 * vol, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      const star = ctx.createOscillator();
      const starGain = ctx.createGain();
      star.type = 'sine';
      star.frequency.setValueAtTime(1318.51, now + 0.04);
      star.frequency.exponentialRampToValueAtTime(2637.02, now + 0.12);
      starGain.gain.setValueAtTime(0.28 * vol, now + 0.04);
      starGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      bass.connect(bassGain);
      star.connect(starGain);
      bassGain.connect(ctx.destination);
      starGain.connect(ctx.destination);
      bass.start(now);
      star.start(now + 0.04);
      bass.stop(now + 0.08);
      star.stop(now + 0.32);
    } else if (this.currentTheme === 'vaporwave') {
      // Windows 95: Classic Win95 "Tada.wav" / Dialog Ding Chord
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 triumphant ding
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        gain.gain.setValueAtTime(0.26 * vol, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.38);
      });
    } else if (this.currentTheme === 'pipboy') {
      // Pip-Boy 3000: Vault-Tec "Quest Completed" Perk Fanfare & Bottle Cap Jingle
      const caps = [3520, 2793, 4186];
      caps.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.03);
        gain.gain.setValueAtTime(0.25 * vol, now + idx * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.03 + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.03);
        osc.stop(now + idx * 0.03 + 0.14);
      });

      const organ = [523.25, 659.25, 783.99, 1046.50];
      organ.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + 0.08 + idx * 0.05);
        gain.gain.setValueAtTime(0.22 * vol, now + 0.08 + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08 + idx * 0.05 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + 0.08 + idx * 0.05);
        osc.stop(now + 0.08 + idx * 0.05 + 0.38);
      });
    } else if (this.currentTheme === 'claymation') {
      // Claymation: Wallace & Gromit Accordion Fanfare & Clay Whistle
      const notes = [440.00, 554.37, 659.25, 880.00];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.045);
        gain.gain.setValueAtTime(0.28 * vol, now + idx * 0.045);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.045 + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.045);
        osc.stop(now + idx * 0.045 + 0.30);
      });
    } else if (this.currentTheme === 'papercraft') {
      // Papercraft Origami: Pop-up book unfolding flourish / paper confetti fanfare (A4, C#5, E5, A5, C#6)
      const notes = [440.00, 554.37, 659.25, 880.00, 1108.73];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        gain.gain.setValueAtTime(0.24 * vol, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.32);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.34);
      });
    } else if (this.currentTheme === 'solarpunk') {
      // Solarpunk Biophilic: Radiant crystalline glass harp cascade & solar flare chime (D5, F#5, A5, D6, F#6)
      const notes = [587.33, 739.99, 880.00, 1174.66, 1479.98];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        gain.gain.setValueAtTime(0.25 * vol, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.38);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.40);
      });
    } else {
      // Ukiyo-e Sumi-e: Zen Kagura Shinto temple bell ring & lingering bronze chime
      const bowl = ctx.createOscillator();
      const bowlGain = ctx.createGain();
      bowl.type = 'sine';
      bowl.frequency.setValueAtTime(587.33, now); // D5
      bowlGain.gain.setValueAtTime(0.35 * vol, now);
      bowlGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      const chime = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chime.type = 'triangle';
      chime.frequency.setValueAtTime(1174.66, now); // D6
      chimeGain.gain.setValueAtTime(0.22 * vol, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      bowl.connect(bowlGain);
      chime.connect(chimeGain);
      bowlGain.connect(ctx.destination);
      chimeGain.connect(ctx.destination);
      bowl.start(now);
      chime.start(now);
      bowl.stop(now + 0.52);
      chime.stop(now + 0.40);
    }
  }

  // 5. Level Up Fanfare (17 Distinct Art Style Victory Anthems)
  public playLevelUp() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const vol = this.volume;

    let notes: number[] = [];
    let oscType: OscillatorType = 'square';
    let stepTime = 0.06;

    if (this.currentTheme === 'arcade') {
      // 16-Bit Arcade: Fast staccato C major Capcom victory jingle
      notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50];
      oscType = 'square';
      stepTime = 0.06;
    } else if (this.currentTheme === 'gameboy') {
      // Game Boy 1989: Authentic DMG Pokemon/Zelda fanfare
      notes = [587.33, 783.99, 987.77, 1174.66, 1567.98];
      oscType = 'square';
      stepTime = 0.07;
    } else if (this.currentTheme === 'cyber') {
      // Cyber Mecha: Ascending futuristic synthesizer upgrade sweep
      notes = [440, 660, 880, 1320, 1760, 2640];
      oscType = 'sawtooth';
      stepTime = 0.045;
    } else if (this.currentTheme === 'fantasy') {
      // Dark Fantasy: Royal brass & triumphant trumpet anthem
      notes = [293.66, 369.99, 440.00, 587.33, 739.99, 880.00];
      oscType = 'triangle';
      stepTime = 0.07;
    } else if (this.currentTheme === 'inkwell') {
      // 1930s Inkwell: Bouncy swing jazz triad stinger
      notes = [261.63, 329.63, 392.00, 440.00, 523.25];
      oscType = 'sine';
      stepTime = 0.065;
    } else if (this.currentTheme === 'synthwave') {
      // Outrun 1984: D Major 7th analog synth anthem
      notes = [293.66, 369.99, 440.00, 554.37, 739.99];
      oscType = 'sawtooth';
      stepTime = 0.075;
    } else if (this.currentTheme === 'gothic') {
      // Gothic Eldritch: Cathedral pipe organ triumph
      notes = [146.83, 220.00, 293.66, 349.23, 440.00, 587.33];
      oscType = 'triangle';
      stepTime = 0.08;
    } else if (this.currentTheme === 'blueprint') {
      // Blueprint Architect: Golden ratio harmonic chime cascade
      notes = [440.00, 554.37, 659.25, 880.00, 1108.73, 1318.51];
      oscType = 'sine';
      stepTime = 0.055;
    } else if (this.currentTheme === 'ghibli') {
      // Ghibli Cozy Forest: Joe Hisaishi orchestral meadow flourish
      notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
      oscType = 'sine';
      stepTime = 0.06;
    } else if (this.currentTheme === 'psx') {
      // PSX 32-Bit: Final Fantasy VII / PS1 crystal victory fanfare
      notes = [392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51];
      oscType = 'triangle';
      stepTime = 0.06;
    } else if (this.currentTheme === 'persona') {
      // Persona Acid Pop: Funk brass 9th chord blast
      notes = [349.23, 415.30, 523.25, 622.25, 783.99, 932.33];
      oscType = 'sawtooth';
      stepTime = 0.05;
    } else if (this.currentTheme === 'vaporwave') {
      // Windows 95: 90s PC Sound Blaster 16 MIDI / Y2K Millennium Victory Fanfare
      notes = [392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // G4, C5, E5, G5, C6, E6, G6
      oscType = 'sawtooth';
      stepTime = 0.055;
    } else if (this.currentTheme === 'pipboy') {
      // Pip-Boy 3000: Vault Boy Post-War Radio Trumpet Fanfare
      notes = [392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51]; // G4, C5, E5, G5, C6, E6
      oscType = 'triangle';
      stepTime = 0.06;
    } else if (this.currentTheme === 'claymation') {
      // Claymation: Stop-Motion Marimba Glissando & Cartoon Whistle
      notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C4, E4, G4, C5, E5, G5, C6
      oscType = 'triangle';
      stepTime = 0.05;
    } else if (this.currentTheme === 'papercraft') {
      // Papercraft Origami: Paper Mario / Tearaway Pop-Up Theatre Victory Fanfare
      notes = [349.23, 440.00, 523.25, 698.46, 880.00, 1046.50]; // F4, A4, C5, F5, A5, C6
      oscType = 'triangle';
      stepTime = 0.055;
    } else if (this.currentTheme === 'solarpunk') {
      // Solarpunk Biophilic: Majestic Solarium Sunburst & Crystal Conservatory Fanfare
      notes = [440.00, 554.37, 659.25, 830.61, 880.00, 1108.73, 1318.51]; // A4, C#5, E5, G#5, A5, C#6, E6
      oscType = 'sine';
      stepTime = 0.055;
    } else {
      // Ukiyo-e Sumi-e: Imperial Gagaku Koto & Ryuteki flute flourish
      notes = [293.66, 392.00, 440.00, 466.16, 587.33, 783.99];
      oscType = 'triangle';
      stepTime = 0.065;
    }

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = oscType;
      osc.frequency.setValueAtTime(freq, now + idx * stepTime);

      const isLast = idx === notes.length - 1;
      const dur = isLast ? 0.45 : 0.12;
      gain.gain.setValueAtTime(0.24 * vol, now + idx * stepTime);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * stepTime + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * stepTime);
      osc.stop(now + idx * stepTime + dur + 0.02);
    });
  }

  // 6. Save / Checkpoint (17 Unique Themed Confirmations)
  public playSave() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const vol = this.volume;

    if (this.currentTheme === 'arcade') {
      // 16-Bit Arcade: Snappy C major checkpoint arpeggio
      const chords = [523.25, 659.25, 783.99, 1046.50];
      chords.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        gain.gain.setValueAtTime(0.2 * vol, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.20);
      });
    } else if (this.currentTheme === 'gameboy') {
      // Game Boy DMG: SRAM battery memory write beep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(880, now + 0.06);
      gain.gain.setValueAtTime(0.25 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (this.currentTheme === 'cyber') {
      // Cyber Mecha: Sub-bass sync hum + high frequency data pulse
      const hum = ctx.createOscillator();
      const humGain = ctx.createGain();
      hum.type = 'sine';
      hum.frequency.setValueAtTime(100, now);
      humGain.gain.setValueAtTime(0.3 * vol, now);
      humGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      const pulse = ctx.createOscillator();
      const pulseGain = ctx.createGain();
      pulse.type = 'sawtooth';
      pulse.frequency.setValueAtTime(1200, now + 0.04);
      pulse.frequency.exponentialRampToValueAtTime(2400, now + 0.12);
      pulseGain.gain.setValueAtTime(0.2 * vol, now + 0.04);
      pulseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      hum.connect(humGain);
      pulse.connect(pulseGain);
      humGain.connect(ctx.destination);
      pulseGain.connect(ctx.destination);
      hum.start(now);
      pulse.start(now + 0.04);
      hum.stop(now + 0.26);
      pulse.stop(now + 0.23);
    } else if (this.currentTheme === 'fantasy') {
      // Dark Fantasy RPG: Heavy book closure thud & magic shimmer
      const thud = ctx.createOscillator();
      const thudGain = ctx.createGain();
      thud.type = 'triangle';
      thud.frequency.setValueAtTime(180, now);
      thud.frequency.exponentialRampToValueAtTime(60, now + 0.08);
      thudGain.gain.setValueAtTime(0.3 * vol, now);
      thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      const shimmer = ctx.createOscillator();
      const shimmerGain = ctx.createGain();
      shimmer.type = 'sine';
      shimmer.frequency.setValueAtTime(880, now + 0.05);
      shimmer.frequency.exponentialRampToValueAtTime(1320, now + 0.25);
      shimmerGain.gain.setValueAtTime(0.18 * vol, now + 0.05);
      shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      thud.connect(thudGain);
      shimmer.connect(shimmerGain);
      thudGain.connect(ctx.destination);
      shimmerGain.connect(ctx.destination);
      thud.start(now);
      shimmer.start(now + 0.05);
      thud.stop(now + 0.14);
      shimmer.stop(now + 0.33);
    } else if (this.currentTheme === 'inkwell') {
      // 1930s Inkwell: Typewriter bell DING! & carriage return slide
      const bell = ctx.createOscillator();
      const bellGain = ctx.createGain();
      bell.type = 'sine';
      bell.frequency.setValueAtTime(1760, now);
      bellGain.gain.setValueAtTime(0.35 * vol, now);
      bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      const slide = ctx.createOscillator();
      const slideGain = ctx.createGain();
      slide.type = 'triangle';
      slide.frequency.setValueAtTime(400, now + 0.08);
      slide.frequency.exponentialRampToValueAtTime(200, now + 0.18);
      slideGain.gain.setValueAtTime(0.2 * vol, now + 0.08);
      slideGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      bell.connect(bellGain);
      slide.connect(slideGain);
      bellGain.connect(ctx.destination);
      slideGain.connect(ctx.destination);
      bell.start(now);
      slide.start(now + 0.08);
      bell.stop(now + 0.36);
      slide.stop(now + 0.23);
    } else if (this.currentTheme === 'synthwave') {
      // Outrun 1984: Analog tape-head lock & warm chorus chord
      const chords = [369.99, 440.00, 554.37, 739.99];
      chords.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.12 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.40);
      });
    } else if (this.currentTheme === 'gothic') {
      // Gothic Eldritch: Iron bolt sliding shut & dark covenant bound
      const bolt = ctx.createOscillator();
      const boltGain = ctx.createGain();
      bolt.type = 'triangle';
      bolt.frequency.setValueAtTime(90, now);
      bolt.frequency.exponentialRampToValueAtTime(30, now + 0.15);
      boltGain.gain.setValueAtTime(0.4 * vol, now);
      boltGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      const chime = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chime.type = 'sine';
      chime.frequency.setValueAtTime(220, now + 0.08);
      chimeGain.gain.setValueAtTime(0.25 * vol, now + 0.08);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      bolt.connect(boltGain);
      chime.connect(chimeGain);
      boltGain.connect(ctx.destination);
      chimeGain.connect(ctx.destination);
      bolt.start(now);
      chime.start(now + 0.08);
      bolt.stop(now + 0.32);
      chime.stop(now + 0.46);
    } else if (this.currentTheme === 'blueprint') {
      // Blueprint Architect: Drafting vellum roll & wax seal stamp
      const roll = ctx.createOscillator();
      const rollGain = ctx.createGain();
      roll.type = 'sine';
      roll.frequency.setValueAtTime(800, now);
      rollGain.gain.setValueAtTime(0.25 * vol, now);
      rollGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      const stamp = ctx.createOscillator();
      const stampGain = ctx.createGain();
      stamp.type = 'triangle';
      stamp.frequency.setValueAtTime(554.37, now + 0.06);
      stamp.frequency.exponentialRampToValueAtTime(1108.73, now + 0.2);
      stampGain.gain.setValueAtTime(0.25 * vol, now + 0.06);
      stampGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      roll.connect(rollGain);
      stamp.connect(stampGain);
      rollGain.connect(ctx.destination);
      stampGain.connect(ctx.destination);
      roll.start(now);
      stamp.start(now + 0.06);
      roll.stop(now + 0.12);
      stamp.stop(now + 0.3);
    } else if (this.currentTheme === 'ghibli') {
      // Ghibli Cozy Forest: Soft water drop harmonic & warm music box chord
      const chords = [523.25, 659.25, 783.99, 1046.50];
      chords.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.03);
        gain.gain.setValueAtTime(0.18 * vol, now + idx * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.03 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.03);
        osc.stop(now + idx * 0.03 + 0.37);
      });
    } else if (this.currentTheme === 'psx') {
      // PSX 32-Bit: Optical stepper seek chatter & memory card save beep
      const seek = ctx.createOscillator();
      const seekGain = ctx.createGain();
      seek.type = 'triangle';
      seek.frequency.setValueAtTime(1200, now);
      seek.frequency.exponentialRampToValueAtTime(300, now + 0.03);
      seekGain.gain.setValueAtTime(0.3 * vol, now);
      seekGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      const beep = ctx.createOscillator();
      const beepGain = ctx.createGain();
      beep.type = 'sine';
      beep.frequency.setValueAtTime(1046.50, now + 0.05);
      beep.frequency.setValueAtTime(1567.98, now + 0.12);
      beepGain.gain.setValueAtTime(0.28 * vol, now + 0.05);
      beepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      seek.connect(seekGain);
      beep.connect(beepGain);
      seekGain.connect(ctx.destination);
      beepGain.connect(ctx.destination);
      seek.start(now);
      beep.start(now + 0.05);
      seek.stop(now + 0.05);
      beep.stop(now + 0.3);
    } else if (this.currentTheme === 'persona') {
      // Persona Acid Pop: Calling card sealed with slap guitar & pop
      const guitar = ctx.createOscillator();
      const guitarGain = ctx.createGain();
      guitar.type = 'sawtooth';
      guitar.frequency.setValueAtTime(440, now);
      guitar.frequency.exponentialRampToValueAtTime(110, now + 0.08);
      guitarGain.gain.setValueAtTime(0.3 * vol, now);
      guitarGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      const pop = ctx.createOscillator();
      const popGain = ctx.createGain();
      pop.type = 'sine';
      pop.frequency.setValueAtTime(880, now + 0.06);
      pop.frequency.exponentialRampToValueAtTime(1760, now + 0.18);
      popGain.gain.setValueAtTime(0.25 * vol, now + 0.06);
      popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      guitar.connect(guitarGain);
      pop.connect(popGain);
      guitarGain.connect(ctx.destination);
      popGain.connect(ctx.destination);
      guitar.start(now);
      pop.start(now + 0.06);
      guitar.stop(now + 0.14);
      pop.stop(now + 0.3);
    } else if (this.currentTheme === 'vaporwave') {
      // Windows 95: 3.5-inch Floppy Disk Drive 1.44MB Seek & Head Step Chatter
      const motor = ctx.createOscillator();
      const motorGain = ctx.createGain();
      motor.type = 'triangle';
      motor.frequency.setValueAtTime(140, now);
      motorGain.gain.setValueAtTime(0.25 * vol, now);
      motorGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      const seek1 = ctx.createOscillator();
      const seek1Gain = ctx.createGain();
      seek1.type = 'square';
      seek1.frequency.setValueAtTime(1200, now + 0.04);
      seek1.frequency.exponentialRampToValueAtTime(300, now + 0.08);
      seek1Gain.gain.setValueAtTime(0.28 * vol, now + 0.04);
      seek1Gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      const seek2 = ctx.createOscillator();
      const seek2Gain = ctx.createGain();
      seek2.type = 'square';
      seek2.frequency.setValueAtTime(1600, now + 0.12);
      seek2Gain.gain.setValueAtTime(0.3 * vol, now + 0.12);
      seek2Gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      motor.connect(motorGain);
      seek1.connect(seek1Gain);
      seek2.connect(seek2Gain);
      motorGain.connect(ctx.destination);
      seek1Gain.connect(ctx.destination);
      seek2Gain.connect(ctx.destination);

      motor.start(now);
      seek1.start(now + 0.04);
      seek2.start(now + 0.12);
      motor.stop(now + 0.3);
      seek1.stop(now + 0.1);
      seek2.stop(now + 0.2);
    } else if (this.currentTheme === 'pipboy') {
      // Pip-Boy 3000: RobCo Holotape Insert & Geiger Radiation Burst
      const tape = ctx.createOscillator();
      const tapeGain = ctx.createGain();
      tape.type = 'triangle';
      tape.frequency.setValueAtTime(480, now);
      tape.frequency.exponentialRampToValueAtTime(120, now + 0.06);
      tapeGain.gain.setValueAtTime(0.35 * vol, now);
      tapeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      tape.connect(tapeGain);
      tapeGain.connect(ctx.destination);
      tape.start(now);
      tape.stop(now + 0.09);

      [0.05, 0.09, 0.14, 0.18].forEach(t => {
        const geiger = ctx.createOscillator();
        const geigerGain = ctx.createGain();
        geiger.type = 'square';
        geiger.frequency.setValueAtTime(2800, now + t);
        geiger.frequency.exponentialRampToValueAtTime(600, now + t + 0.02);
        geigerGain.gain.setValueAtTime(0.22 * vol, now + t);
        geigerGain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.025);
        geiger.connect(geigerGain);
        geigerGain.connect(ctx.destination);
        geiger.start(now + t);
        geiger.stop(now + t + 0.03);
      });
    } else if (this.currentTheme === 'claymation') {
      // Claymation: 16mm Bolex Camera Frame Click & Clay Stamp Seal
      const click1 = ctx.createOscillator();
      const click1Gain = ctx.createGain();
      click1.type = 'triangle';
      click1.frequency.setValueAtTime(880, now);
      click1.frequency.exponentialRampToValueAtTime(300, now + 0.02);
      click1Gain.gain.setValueAtTime(0.3 * vol, now);
      click1Gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      const click2 = ctx.createOscillator();
      const click2Gain = ctx.createGain();
      click2.type = 'triangle';
      click2.frequency.setValueAtTime(600, now + 0.035);
      click2.frequency.exponentialRampToValueAtTime(150, now + 0.06);
      click2Gain.gain.setValueAtTime(0.35 * vol, now + 0.035);
      click2Gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      const stamp = ctx.createOscillator();
      const stampGain = ctx.createGain();
      stamp.type = 'sine';
      stamp.frequency.setValueAtTime(180, now + 0.05);
      stamp.frequency.exponentialRampToValueAtTime(80, now + 0.12);
      stampGain.gain.setValueAtTime(0.25 * vol, now + 0.05);
      stampGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      click1.connect(click1Gain);
      click2.connect(click2Gain);
      stamp.connect(stampGain);
      click1Gain.connect(ctx.destination);
      click2Gain.connect(ctx.destination);
      stampGain.connect(ctx.destination);

      click1.start(now);
      click2.start(now + 0.035);
      stamp.start(now + 0.05);
      click1.stop(now + 0.03);
      click2.stop(now + 0.075);
      stamp.stop(now + 0.18);
    } else if (this.currentTheme === 'papercraft') {
      // Papercraft Origami: Bone folder origami crease press & pop-up fold tuck
      const crease = ctx.createOscillator();
      const creaseGain = ctx.createGain();
      crease.type = 'triangle';
      crease.frequency.setValueAtTime(1600, now);
      crease.frequency.exponentialRampToValueAtTime(400, now + 0.035);
      creaseGain.gain.setValueAtTime(0.3 * vol, now);
      creaseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      const fold = ctx.createOscillator();
      const foldGain = ctx.createGain();
      fold.type = 'sine';
      fold.frequency.setValueAtTime(523.25, now + 0.04);
      fold.frequency.exponentialRampToValueAtTime(1046.50, now + 0.16);
      foldGain.gain.setValueAtTime(0.25 * vol, now + 0.04);
      foldGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      crease.connect(creaseGain);
      fold.connect(foldGain);
      creaseGain.connect(ctx.destination);
      foldGain.connect(ctx.destination);
      crease.start(now);
      fold.start(now + 0.04);
      crease.stop(now + 0.05);
      fold.stop(now + 0.28);
    } else if (this.currentTheme === 'solarpunk') {
      // Solarpunk Biophilic: Resonant Tibetan singing crystal bowl strike & solar capacitor lock
      const bowl = ctx.createOscillator();
      const bowlGain = ctx.createGain();
      bowl.type = 'sine';
      bowl.frequency.setValueAtTime(392.00, now); // G4 fundamental
      bowlGain.gain.setValueAtTime(0.35 * vol, now);
      bowlGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      const overtone = ctx.createOscillator();
      const overtoneGain = ctx.createGain();
      overtone.type = 'sine';
      overtone.frequency.setValueAtTime(783.99, now + 0.02); // G5 crystal overtone
      overtoneGain.gain.setValueAtTime(0.22 * vol, now + 0.02);
      overtoneGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      const prism = ctx.createOscillator();
      const prismGain = ctx.createGain();
      prism.type = 'triangle';
      prism.frequency.setValueAtTime(1567.98, now + 0.05); // G6 shimmering facet
      prismGain.gain.setValueAtTime(0.18 * vol, now + 0.05);
      prismGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      bowl.connect(bowlGain);
      overtone.connect(overtoneGain);
      prism.connect(prismGain);
      bowlGain.connect(ctx.destination);
      overtoneGain.connect(ctx.destination);
      prismGain.connect(ctx.destination);

      bowl.start(now);
      overtone.start(now + 0.02);
      prism.start(now + 0.05);
      bowl.stop(now + 0.58);
      overtone.stop(now + 0.48);
      prism.stop(now + 0.38);
    } else {
      // Ukiyo-e Sumi-e: Vermilion seal stamp on washi scroll & temple bell resonance
      const stamp = ctx.createOscillator();
      const stampGain = ctx.createGain();
      stamp.type = 'triangle';
      stamp.frequency.setValueAtTime(320, now);
      stamp.frequency.exponentialRampToValueAtTime(120, now + 0.05);
      stampGain.gain.setValueAtTime(0.35 * vol, now);
      stampGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      const bell = ctx.createOscillator();
      const bellGain = ctx.createGain();
      bell.type = 'sine';
      bell.frequency.setValueAtTime(783.99, now + 0.03);
      bellGain.gain.setValueAtTime(0.25 * vol, now + 0.03);
      bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      stamp.connect(stampGain);
      bell.connect(bellGain);
      stampGain.connect(ctx.destination);
      bellGain.connect(ctx.destination);
      stamp.start(now);
      bell.start(now + 0.03);
      stamp.stop(now + 0.08);
      bell.stop(now + 0.47);
    }
  }

  // 7. Tab Switch (17 Distinct Navigation Gestures)
  public playTab() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const vol = this.volume;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (this.currentTheme === 'arcade') {
      // 8-bit page flick
      osc.type = 'square';
      osc.frequency.setValueAtTime(550, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.03);
      gain.gain.setValueAtTime(0.2 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
    } else if (this.currentTheme === 'gameboy') {
      // DMG LCD cursor cycle
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(660, now + 0.02);
      gain.gain.setValueAtTime(0.22 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    } else if (this.currentTheme === 'cyber') {
      // Futuristic HUD slider
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(1600, now + 0.04);
      gain.gain.setValueAtTime(0.22 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    } else if (this.currentTheme === 'fantasy') {
      // Ancient parchment page rustle
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.05);
      gain.gain.setValueAtTime(0.25 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    } else if (this.currentTheme === 'inkwell') {
      // Cartoon cel flip
      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.04);
      gain.gain.setValueAtTime(0.25 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    } else if (this.currentTheme === 'synthwave') {
      // Neon grid scanline blip
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
      gain.gain.setValueAtTime(0.2 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
    } else if (this.currentTheme === 'gothic') {
      // Heavy leather folio turn
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.07);
      gain.gain.setValueAtTime(0.3 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    } else if (this.currentTheme === 'blueprint') {
      // Drafting vellum glide
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1046, now);
      osc.frequency.exponentialRampToValueAtTime(523, now + 0.035);
      gain.gain.setValueAtTime(0.25 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    } else if (this.currentTheme === 'ghibli') {
      // Bamboo sliding screen glide
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.05);
      gain.gain.setValueAtTime(0.25 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    } else if (this.currentTheme === 'psx') {
      // PS1 BIOS menu cursor slide
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.03);
      gain.gain.setValueAtTime(0.25 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
    } else if (this.currentTheme === 'persona') {
      // Manga comic panel slash
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);
      gain.gain.setValueAtTime(0.25 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
    } else if (this.currentTheme === 'vaporwave') {
      // Windows 95: Tab dialog property switch mechanical snap
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.025);
      gain.gain.setValueAtTime(0.26 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    } else if (this.currentTheme === 'pipboy') {
      // Pip-Boy 3000: STAT/INV/DATA Rotary Switch Clunk
      osc.type = 'square';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(250, now + 0.03);
      gain.gain.setValueAtTime(0.25 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
    } else if (this.currentTheme === 'claymation') {
      // Claymation: Soft plasticine dough slap / clay flap
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.04);
      gain.gain.setValueAtTime(0.28 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
    } else if (this.currentTheme === 'papercraft') {
      // Papercraft: Crisp paper page turn / origami fold flip
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.035);
      gain.gain.setValueAtTime(0.26 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    } else if (this.currentTheme === 'solarpunk') {
      // Solarpunk Biophilic: Prismatic crystal refraction sweep & sliding glass solarium panel
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.04);
      gain.gain.setValueAtTime(0.26 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
    } else {
      // Ukiyo-e Shoji screen paper slide
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523, now);
      osc.frequency.exponentialRampToValueAtTime(261, now + 0.05);
      gain.gain.setValueAtTime(0.28 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  // 8. Node Click on Skill Tree
  public playNodeClick() {
    this.playSelect();
  }
}

export const sound = new SoundEngine();
