const { Plugin, PluginSettingTab, Setting, Notice } = require('obsidian');

const DEFAULT_SETTINGS = {
  volume: 0.3,
  enableTaskSound: true,
  enableLinkSound: true,
  enableSaveSound: true,
  enableTabSound: false
};

module.exports = class RetroGamePlugin extends Plugin {
  async onload() {
    await this.loadSettings();

    // 1. Initialize Web Audio Context
    this.audioCtx = null;

    // 2. Add Status Bar RPG HUD
    this.statusBarEl = this.addStatusBarItem();
    this.statusBarEl.addClass('retro-hud-statusbar');
    this.updateHUD();

    this.statusBarEl.addEventListener('click', () => {
      this.playLevelUpSound();
      const filesCount = this.app.vault.getMarkdownFiles().length;
      const level = Math.floor(Math.sqrt(filesCount * 2)) + 1;
      new Notice(`🎮 DEV STATUS\n⭐ Level: ${level}\n📜 Lore Notes: ${filesCount}\n⚔️ Keep crafting your game!`, 4000);
    });

    // 3. Register Hotkey & DOM Events
    // Save Sound (Ctrl+S)
    this.registerDomEvent(window, 'keydown', (evt) => {
      if ((evt.ctrlKey || evt.metaKey) && evt.key.toLowerCase() === 's') {
        if (this.settings.enableSaveSound) {
          this.playSaveSound();
        }
      }
    });

    // Click Events (Task Checklist & Links)
    this.registerDomEvent(document, 'click', (evt) => {
      const target = evt.target;
      if (!target) return;

      // Task Checkbox Click
      if (target.matches('input[type="checkbox"], .task-list-item-checkbox')) {
        if (this.settings.enableTaskSound) {
          // Slight delay to inspect checked state
          setTimeout(() => {
            if (target.checked || target.parentElement?.classList.contains('is-checked')) {
              this.playCoinSound();
              this.updateHUD();
            }
          }, 30);
        }
        return;
      }

      // Internal Link Click
      const link = target.closest('.internal-link, .cm-hmd-internal-link, a.tag');
      if (link && this.settings.enableLinkSound) {
        this.playSelectSound();
      }
    });

    // Workspace Active Leaf Change (Tab switch)
    this.registerEvent(
      this.app.workspace.on('active-leaf-change', () => {
        if (this.settings.enableTabSound) {
          this.playCursorSound();
        }
        this.updateHUD();
      })
    );

    // Vault changes update HUD
    this.registerEvent(this.app.vault.on('create', () => this.updateHUD()));
    this.registerEvent(this.app.vault.on('delete', () => this.updateHUD()));

    // 4. Register Settings Tab
    this.addSettingTab(new RetroSettingTab(this.app, this));
  }

  onunload() {
    if (this.audioCtx) {
      try { this.audioCtx.close(); } catch (e) {}
    }
  }

  // --- AUDIO SYNTHESIS (8-bit Web Audio API) ---
  getAudioContext() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Play Retro 8-bit Coin Sound (Mario style: B5 -> E6)
  playCoinSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const masterVol = this.settings.volume;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';

    // Note 1: B5 (987.77 Hz)
    osc.frequency.setValueAtTime(987.77, now);
    // Note 2: E6 (1318.51 Hz) at +0.07s
    osc.frequency.setValueAtTime(1318.51, now + 0.07);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3 * masterVol, now + 0.01);
    gain.gain.setValueAtTime(0.3 * masterVol, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.36);
  }

  // Play Retro 8-bit Select/Blip Sound
  playSelectSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const masterVol = this.settings.volume;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';

    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);

    gain.gain.setValueAtTime(0.2 * masterVol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Play Retro Save Checkpoint Chime (C5 -> E5 -> G5 -> C6)
  playSaveSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const masterVol = this.settings.volume;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const startTime = now + idx * 0.06;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';

      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.25 * masterVol, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.22);
    });
  }

  // Play Soft Cursor Tick
  playCursorSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const masterVol = this.settings.volume;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';

    osc.frequency.setValueAtTime(220, now);
    gain.gain.setValueAtTime(0.15 * masterVol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  }

  // Play Level-up Fanfare on HUD Click
  playLevelUpSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const masterVol = this.settings.volume;

    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      const startTime = now + idx * 0.07;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';

      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.25 * masterVol, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + (idx === 3 ? 0.4 : 0.12));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.45);
    });
  }

  // --- HUD STATUS BAR ---
  updateHUD() {
    if (!this.statusBarEl) return;
    const files = this.app.vault.getMarkdownFiles();
    const totalFiles = files.length;
    const level = Math.floor(Math.sqrt(totalFiles * 2)) + 1;
    this.statusBarEl.setText(`🎮 DEV LVL ${level} [${totalFiles} Notes]`);
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
};

class RetroSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: '🎮 Retro Game SFX & HUD Settings' });

    new Setting(containerEl)
      .setName('Master Volume')
      .setDesc('Âm lượng hiệu ứng âm thanh 8-bit (0% đến 100%).')
      .addSlider(slider => slider
        .setLimits(0, 1, 0.05)
        .setValue(this.plugin.settings.volume)
        .setDynamicTooltip()
        .onChange(async (val) => {
          this.plugin.settings.volume = val;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Task Completed Sound (Coin Ting)')
      .setDesc('Phát tiếng coin 8-bit khi tick hoàn thành nhiệm vụ.')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableTaskSound)
        .onChange(async (val) => {
          this.plugin.settings.enableTaskSound = val;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Link Click Sound (Select Blip)')
      .setDesc('Phát tiếng chọn menu khi click vào liên kết [[...]] hoặc tag.')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableLinkSound)
        .onChange(async (val) => {
          this.plugin.settings.enableLinkSound = val;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Save File Sound (Checkpoint Chime)')
      .setDesc('Phát chuông checkpoint khi bấm Ctrl + S.')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableSaveSound)
        .onChange(async (val) => {
          this.plugin.settings.enableSaveSound = val;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Tab Switch Sound (Cursor Tick)')
      .setDesc('Phát tiếng click nhẹ khi chuyển đổi giữa các tab ghi chú.')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableTabSound)
        .onChange(async (val) => {
          this.plugin.settings.enableTabSound = val;
          await this.plugin.saveSettings();
        }));
  }
}
