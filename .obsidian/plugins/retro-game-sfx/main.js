const { Plugin, PluginSettingTab, Setting, Notice } = require('obsidian');

const DEFAULT_SETTINGS = {
  volume: 0.3,
  enableTaskSound: true,
  enableLinkSound: true,
  enableSaveSound: true,
  enableTabSound: false,
  currentLang: 'vi' // 'vi', 'en', 'both'
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

    // 3. Add Language Switcher to Status Bar
    this.langStatusBarEl = this.addStatusBarItem();
    this.langStatusBarEl.addClass('retro-hud-statusbar');
    this.updateLangDisplay();
    this.applyLangToBody(this.settings.currentLang);

    this.langStatusBarEl.addEventListener('click', async () => {
      this.playSelectSound();
      const nextLang = this.settings.currentLang === 'vi' ? 'en' : (this.settings.currentLang === 'en' ? 'both' : 'vi');
      this.settings.currentLang = nextLang;
      await this.saveSettings();
      this.updateLangDisplay();
      this.applyLangToBody(nextLang);

      const msg = nextLang === 'vi' 
        ? '🇻🇳 Đã chuyển sang Tiếng Việt' 
        : (nextLang === 'en' ? '🇬🇧 Switched to English' : '🌐 Chế độ Song ngữ / Bilingual Mode');
      new Notice(msg, 2500);
    });

    // 4. Register Hotkey & DOM Events
    // Save Sound (Ctrl+S)
    this.registerDomEvent(window, 'keydown', (evt) => {
      if ((evt.ctrlKey || evt.metaKey) && evt.key.toLowerCase() === 's') {
        if (this.settings.enableSaveSound) {
          this.playSaveSound();
        }
      }
    });

    // Click Events (Task Checklist, Links & Language Switch Buttons)
    this.registerDomEvent(document, 'click', async (evt) => {
      const target = evt.target;
      if (!target) return;

      // Inline Language Switch Button Click
      const langBtn = target.closest('.lang-switch-btn');
      if (langBtn) {
        const targetLang = langBtn.getAttribute('data-lang');
        if (targetLang) {
          this.playSelectSound();
          this.settings.currentLang = targetLang;
          await this.saveSettings();
          this.updateLangDisplay();
          this.applyLangToBody(targetLang);

          const msg = targetLang === 'vi' 
            ? '🇻🇳 Đã chuyển sang Tiếng Việt' 
            : (targetLang === 'en' ? '🇬🇧 Switched to English' : '🌐 Chế độ Song ngữ / Bilingual Mode');
          new Notice(msg, 2000);
        }
        return;
      }

      // Task Checkbox Click
      if (target.matches('input[type="checkbox"], .task-list-item-checkbox')) {
        if (this.settings.enableTaskSound) {
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
        this.applyLangToBody(this.settings.currentLang);
      })
    );

    // Vault changes update HUD
    this.registerEvent(this.app.vault.on('create', () => this.updateHUD()));
    this.registerEvent(this.app.vault.on('delete', () => this.updateHUD()));

    // 5. Register Settings Tab
    this.addSettingTab(new RetroSettingTab(this.app, this));
  }

  onunload() {
    if (this.audioCtx) {
      try { this.audioCtx.close(); } catch (e) {}
    }
    document.body.classList.remove('retro-lang-vi', 'retro-lang-en', 'retro-lang-both');
  }

  // --- LANGUAGE SWITCHER HELPERS ---
  applyLangToBody(lang) {
    document.body.classList.remove('retro-lang-vi', 'retro-lang-en', 'retro-lang-both');
    document.body.classList.add('retro-lang-' + lang);

    // Sync inline switch buttons across active notes
    document.querySelectorAll('.lang-switch-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });
  }

  updateLangDisplay() {
    if (!this.langStatusBarEl) return;
    const lang = this.settings.currentLang;
    if (lang === 'vi') {
      this.langStatusBarEl.setText('🇻🇳 VI');
      this.langStatusBarEl.setAttribute('title', 'Đang hiển thị Tiếng Việt (Bấm để đổi sang English)');
    } else if (lang === 'en') {
      this.langStatusBarEl.setText('🇬🇧 EN');
      this.langStatusBarEl.setAttribute('title', 'Showing English (Click to toggle Bilingual)');
    } else {
      this.langStatusBarEl.setText('🌐 VI+EN');
      this.langStatusBarEl.setAttribute('title', 'Chế độ Song ngữ / Bilingual (Bấm để đổi sang Tiếng Việt)');
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

  playCoinSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const masterVol = this.settings.volume;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';

    osc.frequency.setValueAtTime(987.77, now);
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

    containerEl.createEl('h2', { text: '🎮 Retro Game SFX & Language Settings' });

    new Setting(containerEl)
      .setName('Default Language (Ngôn ngữ mặc định)')
      .setDesc('Chọn ngôn ngữ hiển thị mặc định cho các tài liệu song ngữ trong Vault.')
      .addDropdown(dropdown => dropdown
        .addOption('vi', '🇻🇳 Tiếng Việt')
        .addOption('en', '🇬🇧 English')
        .addOption('both', '🌐 Song ngữ / Both (Cả hai)')
        .setValue(this.plugin.settings.currentLang)
        .onChange(async (val) => {
          this.plugin.settings.currentLang = val;
          await this.plugin.saveSettings();
          this.plugin.updateLangDisplay();
          this.plugin.applyLangToBody(val);
        }));

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
