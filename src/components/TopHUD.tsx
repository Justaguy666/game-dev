import React, { useState, useRef, useEffect } from 'react';
import { ThemeId, ThemeMode, Language } from '../types';
import { sound } from '../soundEngine';
import { ThemedIcon } from './ThemedIcon';
import { ThemedSelect } from './ThemedSelect';
import { LanguageSelect } from './LanguageSelect';

interface TopHUDProps {
  currentTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
  themeMode: ThemeMode;
  onThemeModeToggle: () => void;
  lang: Language;
  onLangToggle: () => void;
  onLangChange?: (lang: Language) => void;
  fontScale: number;
  onFontScaleChange: (scale: number) => void;
  isCrtOn: boolean;
  onCrtToggle: () => void;
  activeView: 'tree' | 'editor' | 'quests';
  onViewChange: (view: 'tree' | 'editor' | 'quests') => void;
  totalExp: number;
  maxExp: number;
}

export const TopHUD: React.FC<TopHUDProps> = ({
  currentTheme,
  onThemeChange,
  themeMode,
  onThemeModeToggle,
  lang,
  onLangToggle,
  onLangChange,
  fontScale,
  onFontScaleChange,
  isCrtOn,
  onCrtToggle,
  activeView,
  onViewChange,
  totalExp
}) => {
  const [isMuted, setIsMuted] = useState(sound.getIsMuted());
  const [volume, setVolumeState] = useState(sound.getVolume());
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const [isFontOpen, setIsFontOpen] = useState(false);

  const volumeMenuRef = useRef<HTMLDivElement>(null);
  const fontMenuRef = useRef<HTMLDivElement>(null);
  const volumeTimerRef = useRef<number | null>(null);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (volumeMenuRef.current && !volumeMenuRef.current.contains(e.target as Node)) {
        setIsVolumeOpen(false);
      }
      if (fontMenuRef.current && !fontMenuRef.current.contains(e.target as Node)) {
        setIsFontOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMuteToggle = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  const handleVolumeChange = (newVol: number) => {
    sound.setVolume(newVol);
    setVolumeState(newVol);
    if (isMuted && newVol > 0) {
      sound.toggleMute();
      setIsMuted(false);
    }
  };

  const handleVolumeMouseEnter = () => {
    if (volumeTimerRef.current) clearTimeout(volumeTimerRef.current);
    setIsVolumeOpen(true);
  };

  const handleVolumeMouseLeave = () => {
    volumeTimerRef.current = window.setTimeout(() => {
      setIsVolumeOpen(false);
    }, 400);
  };

  const level = Math.floor(totalExp / 180) + 1;
  const currentLevelExp = totalExp % 180;
  const progressPercent = Math.min(100, Math.round((currentLevelExp / 180) * 100));

  const fontPresets = [
    { label: { vi: '85% (Nhỏ / Compact)', en: '85% (Compact)' }, value: 0.85 },
    { label: { vi: '100% (Chuẩn / Default)', en: '100% (Standard)' }, value: 1.0 },
    { label: { vi: '115% (Lớn / Large)', en: '115% (Large)' }, value: 1.15 },
    { label: { vi: '130% (Rất Lớn / XL)', en: '130% (Extra Large)' }, value: 1.30 }
  ];

  return (
    <header style={{
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '2px solid var(--border-color)',
      padding: '8px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '10px',
      boxShadow: 'var(--card-shadow)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* Brand & Dev Level */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--font-display)',
          fontSize: '0.88em',
          color: 'var(--accent-gold)',
          letterSpacing: '0.04em'
        }}>
          <ThemedIcon name="brand" theme={currentTheme} size={20} color="var(--accent-gold)" />
          <span>GAME DEV STUDIO</span>
        </div>

        {/* Level & Progress Bar */}
        <div 
          onClick={() => { sound.playLevelUp(); }}
          title={lang === 'vi' ? 'Cấp độ phát triển game của bạn (Bấm để nghe âm thanh)' : 'Your Game Dev Mastery Level (Click for fanfare)'}
          style={{
            cursor: 'pointer',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            padding: '3px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderRadius: 'var(--radius-sharp)'
          }}>
          <span style={{
            fontSize: '0.78em',
            fontWeight: 800,
            color: 'var(--accent-green)',
            fontFamily: 'var(--font-display)'
          }}>
            LVL {level}
          </span>

          <div style={{
            width: '100px',
            height: '12px',
            backgroundColor: 'var(--bg-app)',
            border: '1px solid var(--border-color)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              backgroundColor: 'var(--accent-gold)',
              transition: 'width 0.4s ease'
            }} />
            <span style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              fontSize: '10px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              textShadow: '1px 1px 0 #000'
            }}>
              {currentLevelExp}/180 XP
            </span>
          </div>
        </div>
      </div>

      {/* Main View Navigation Tabs */}
      <nav style={{ display: 'flex', gap: '6px' }}>
        <button
          onClick={() => { sound.playTab(); onViewChange('tree'); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: activeView === 'tree' ? 'var(--btn-active-bg)' : 'var(--bg-card)',
            color: activeView === 'tree' ? 'var(--btn-active-text)' : 'var(--text-main)',
            border: `1px solid ${activeView === 'tree' ? 'var(--btn-active-bg)' : 'var(--border-color)'}`,
            padding: '6px 12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82em',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}>
          <ThemedIcon name="tree" theme={currentTheme} size={15} color={activeView === 'tree' ? 'var(--btn-active-text)' : 'var(--accent-gold)'} />
          {lang === 'vi' ? 'Cây Kỹ Năng' : 'Skill Tree'}
        </button>

        <button
          onClick={() => { sound.playTab(); onViewChange('editor'); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: activeView === 'editor' ? 'var(--btn-active-bg)' : 'var(--bg-card)',
            color: activeView === 'editor' ? 'var(--btn-active-text)' : 'var(--text-main)',
            border: `1px solid ${activeView === 'editor' ? 'var(--btn-active-bg)' : 'var(--border-color)'}`,
            padding: '6px 12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82em',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}>
          <ThemedIcon name="docs" theme={currentTheme} size={15} color={activeView === 'editor' ? 'var(--btn-active-text)' : 'var(--accent-gold)'} />
          {lang === 'vi' ? 'Tài Liệu & Soạn Thảo' : 'Docs & Editor'}
        </button>

        <button
          onClick={() => { sound.playTab(); onViewChange('quests'); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: activeView === 'quests' ? 'var(--btn-active-bg)' : 'var(--bg-card)',
            color: activeView === 'quests' ? 'var(--btn-active-text)' : 'var(--text-main)',
            border: `1px solid ${activeView === 'quests' ? 'var(--btn-active-bg)' : 'var(--border-color)'}`,
            padding: '6px 12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82em',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}>
          <ThemedIcon name="quests" theme={currentTheme} size={15} color={activeView === 'quests' ? 'var(--btn-active-text)' : 'var(--accent-gold)'} />
          {lang === 'vi' ? 'Nhiệm Vụ' : 'Quests'}
        </button>
      </nav>

      {/* Control Actions: Theme, Mode, Sound, Font, Language */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {/* Game Theme Switcher */}
        <ThemedSelect
          currentTheme={currentTheme}
          onThemeChange={onThemeChange}
          lang={lang}
        />

        {/* Dark / Light Toggle */}
        <button
          onClick={() => { sound.playClick(); onThemeModeToggle(); }}
          title={themeMode === 'dark' ? 'Chuyển sang Giao diện Sáng (Light Mode)' : 'Chuyển sang Giao diện Tối (Dark Mode)'}
          style={{
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-main)',
            border: '1px solid var(--border-color)',
            padding: '6px 9px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}>
          {themeMode === 'dark' ? (
            <ThemedIcon name="sun" theme={currentTheme} size={15} color="var(--accent-gold)" />
          ) : (
            <ThemedIcon name="moon" theme={currentTheme} size={15} color="var(--accent-cyan)" />
          )}
        </button>

        {/* CRT Scanline Toggle */}
        <button
          onClick={() => { sound.playClick(); onCrtToggle(); }}
          title={isCrtOn ? 'Tắt hiệu ứng CRT Scanlines' : 'Bật hiệu ứng màn hình CRT cổ điển'}
          style={{
            backgroundColor: isCrtOn ? 'rgba(74, 222, 128, 0.2)' : 'var(--bg-card)',
            color: isCrtOn ? 'var(--accent-green)' : 'var(--text-muted)',
            border: `1px solid ${isCrtOn ? 'var(--accent-green)' : 'var(--border-color)'}`,
            padding: '6px 9px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}>
          <ThemedIcon name="tv" theme={currentTheme} size={15} />
        </button>

        {/* Font Size Settings Popover */}
        <div ref={fontMenuRef} style={{ position: 'relative' }}>
          <button
            onClick={() => { sound.playClick(); setIsFontOpen(!isFontOpen); }}
            title={lang === 'vi' ? 'Cài đặt kích thước font chữ' : 'Font Size Settings'}
            style={{
              backgroundColor: isFontOpen ? 'var(--btn-active-bg)' : 'var(--bg-card)',
              color: isFontOpen ? 'var(--btn-active-text)' : 'var(--text-main)',
              border: `1px solid ${isFontOpen ? 'var(--btn-active-bg)' : 'var(--border-color)'}`,
              padding: '6px 10px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.80em',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
            <ThemedIcon name="font" theme={currentTheme} size={14} color={isFontOpen ? 'var(--btn-active-text)' : 'var(--accent-gold)'} />
            <span>{Math.round(fontScale * 100)}%</span>
            <span style={{ fontSize: '8px', color: isFontOpen ? 'var(--btn-active-text)' : 'var(--text-muted)' }}>▼</span>
          </button>

          {isFontOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 4px)',
              right: 0,
              minWidth: '200px',
              backgroundColor: 'var(--bg-surface)',
              border: '2px solid var(--border-color)',
              boxShadow: 'var(--card-shadow), 0 8px 24px rgba(0, 0, 0, 0.5)',
              zIndex: 9999,
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{
                fontSize: '0.74em',
                fontFamily: 'var(--font-display)',
                color: 'var(--accent-gold)',
                paddingBottom: '4px',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>{lang === 'vi' ? 'CỠ CHỮ (FONT SIZE)' : 'FONT SIZE'}</span>
                <span>{Math.round(fontScale * 100)}%</span>
              </div>

              {/* Stepper Buttons */}
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <button
                  onClick={() => {
                    const next = Math.max(0.75, parseFloat((fontScale - 0.05).toFixed(2)));
                    onFontScaleChange(next);
                    sound.playClick();
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    padding: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85em',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}>
                  A -
                </button>
                <button
                  onClick={() => {
                    const next = Math.min(1.5, parseFloat((fontScale + 0.05).toFixed(2)));
                    onFontScaleChange(next);
                    sound.playClick();
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    padding: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85em',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}>
                  A +
                </button>
              </div>

              {/* Presets */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '4px' }}>
                {fontPresets.map(preset => {
                  const isCurrent = Math.abs(fontScale - preset.value) < 0.02;
                  return (
                    <div
                      key={preset.value}
                      onClick={() => {
                        onFontScaleChange(preset.value);
                        sound.playSelect();
                        setIsFontOpen(false);
                      }}
                      onMouseEnter={() => sound.playHover()}
                      className={`themed-select-item ${isCurrent ? 'is-selected' : ''}`}
                      style={{
                        padding: '6px 8px',
                        fontSize: '0.80em',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: isCurrent ? 'var(--btn-active-bg)' : 'transparent',
                        color: isCurrent ? 'var(--btn-active-text)' : 'var(--text-main)',
                        border: isCurrent ? '1px solid var(--border-color)' : '1px solid transparent'
                      }}>
                      <span>{preset.label[lang]}</span>
                      {isCurrent && <span style={{ fontWeight: 800 }}>✓</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Audio Speaker & Volume Control Hover Dropdown */}
        <div
          ref={volumeMenuRef}
          onMouseEnter={handleVolumeMouseEnter}
          onMouseLeave={handleVolumeMouseLeave}
          style={{ position: 'relative' }}>
          <button
            onClick={() => { sound.playClick(); setIsVolumeOpen(!isVolumeOpen); }}
            title={lang === 'vi' ? 'Âm thanh & Âm lượng (Rê chuột để chỉnh volume)' : 'Sound & Volume (Hover to adjust)'}
            style={{
              backgroundColor: isMuted ? 'rgba(244, 63, 94, 0.2)' : (isVolumeOpen ? 'var(--bg-surface)' : 'var(--bg-card)'),
              color: isMuted ? 'var(--accent-red)' : 'var(--accent-green)',
              border: `1px solid ${isMuted ? 'var(--accent-red)' : (isVolumeOpen ? 'var(--accent-green)' : 'var(--border-color)')}`,
              padding: '6px 9px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}>
            {isMuted ? (
              <ThemedIcon name="mute" theme={currentTheme} size={15} />
            ) : (
              <ThemedIcon name="volume" theme={currentTheme} size={15} />
            )}
          </button>

          {/* Volume Dropdown Popover */}
          {isVolumeOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 4px)',
              right: 0,
              width: '210px',
              backgroundColor: 'var(--bg-surface)',
              border: '2px solid var(--border-color)',
              boxShadow: 'var(--card-shadow), 0 8px 24px rgba(0, 0, 0, 0.5)',
              zIndex: 9999,
              padding: '10px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              animation: 'fadeIn 0.1s ease-out'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.74em',
                fontFamily: 'var(--font-display)',
                color: 'var(--accent-green)'
              }}>
                <span>{lang === 'vi' ? 'ÂM LƯỢNG' : 'VOLUME'}</span>
                <span>{isMuted ? (lang === 'vi' ? 'TẮT TIẾNG' : 'MUTED') : `${Math.round(volume * 100)}%`}</span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                style={{
                  width: '100%',
                  cursor: 'pointer',
                  accentColor: 'var(--accent-green)'
                }}
              />

              {/* Quick Presets & Test Beep */}
              <div style={{ display: 'flex', gap: '4px', justifyContent: 'space-between', marginTop: '2px' }}>
                <button
                  onClick={handleMuteToggle}
                  style={{
                    flex: 1,
                    backgroundColor: isMuted ? 'var(--accent-red)' : 'var(--bg-card)',
                    color: isMuted ? '#fff' : 'var(--text-main)',
                    border: '1px solid var(--border-color)',
                    padding: '3px 6px',
                    fontSize: '0.72em',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}>
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>

                <button
                  onClick={() => { handleVolumeChange(0.5); sound.playClick(); }}
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-main)',
                    border: '1px solid var(--border-color)',
                    padding: '3px 6px',
                    fontSize: '0.72em',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer'
                  }}>
                  50%
                </button>

                <button
                  onClick={() => { handleVolumeChange(1.0); sound.playClick(); }}
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-main)',
                    border: '1px solid var(--border-color)',
                    padding: '3px 6px',
                    fontSize: '0.72em',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer'
                  }}>
                  100%
                </button>

                <button
                  onClick={() => sound.playClick()}
                  title={lang === 'vi' ? 'Bấm để nghe thử âm' : 'Test sound effect'}
                  style={{
                    backgroundColor: 'var(--accent-green)',
                    color: 'var(--btn-active-text)',
                    border: 'none',
                    padding: '3px 6px',
                    fontSize: '0.72em',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}>
                  ♪ Test
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Language Switcher Themed Dropdown */}
        <LanguageSelect
          currentLang={lang}
          onLanguageChange={(newLang) => {
            if (onLangChange) {
              onLangChange(newLang);
            } else if (newLang !== lang) {
              onLangToggle();
            }
          }}
          currentTheme={currentTheme}
        />
      </div>
    </header>
  );
};
