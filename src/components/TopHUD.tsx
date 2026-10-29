import React from 'react';
import { ThemeId, ThemeMode, Language } from '../types';
import { sound } from '../soundEngine';
import { ThemedIcon } from './ThemedIcon';

interface TopHUDProps {
  currentTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
  themeMode: ThemeMode;
  onThemeModeToggle: () => void;
  lang: Language;
  onLangToggle: () => void;
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
  isCrtOn,
  onCrtToggle,
  activeView,
  onViewChange,
  totalExp,
  maxExp
}) => {
  const [isMuted, setIsMuted] = React.useState(sound.getIsMuted());

  const handleMuteToggle = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  const level = Math.floor(totalExp / 180) + 1;
  const currentLevelExp = totalExp % 180;
  const progressPercent = Math.min(100, Math.round((currentLevelExp / 180) * 100));

  const themesList: { id: ThemeId; name: { vi: string; en: string } }[] = [
    { id: 'arcade', name: { vi: '16-Bit Arcade', en: '16-Bit Arcade' } },
    { id: 'gameboy', name: { vi: 'Game Boy DMG', en: 'Game Boy 1989' } },
    { id: 'cyber', name: { vi: 'Cyber Mecha', en: 'Cyber Mecha' } },
    { id: 'fantasy', name: { vi: 'Dark Fantasy', en: 'Dark Fantasy' } }
  ];

  return (
    <header style={{
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '2px solid var(--border-color)',
      padding: '10px 18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px',
      boxShadow: 'var(--card-shadow)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* Brand & Dev Level */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'var(--font-display)',
          fontSize: '0.9em',
          color: 'var(--accent-gold)',
          letterSpacing: '0.04em'
        }}>
          <ThemedIcon name="brand" theme={currentTheme} size={22} color="var(--accent-gold)" />
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
            padding: '4px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            borderRadius: 'var(--radius-sharp)'
          }}>
          <span style={{
            fontSize: '0.8em',
            fontWeight: 800,
            color: 'var(--accent-green)',
            fontFamily: 'var(--font-display)'
          }}>
            LVL {level}
          </span>

          <div style={{
            width: '120px',
            height: '14px',
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
              fontSize: '9px',
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
            backgroundColor: activeView === 'tree' ? 'var(--accent-gold)' : 'var(--bg-card)',
            color: activeView === 'tree' ? '#111' : 'var(--text-main)',
            border: '1px solid var(--border-color)',
            padding: '6px 12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85em',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}>
          <ThemedIcon name="tree" theme={currentTheme} size={16} />
          {lang === 'vi' ? 'Cây Kỹ Năng' : 'Skill Tree'}
        </button>

        <button
          onClick={() => { sound.playTab(); onViewChange('editor'); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: activeView === 'editor' ? 'var(--accent-gold)' : 'var(--bg-card)',
            color: activeView === 'editor' ? '#111' : 'var(--text-main)',
            border: '1px solid var(--border-color)',
            padding: '6px 12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85em',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}>
          <ThemedIcon name="docs" theme={currentTheme} size={16} />
          {lang === 'vi' ? 'Tài Liệu & Soạn Thảo' : 'Docs & Editor'}
        </button>

        <button
          onClick={() => { sound.playTab(); onViewChange('quests'); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: activeView === 'quests' ? 'var(--accent-gold)' : 'var(--bg-card)',
            color: activeView === 'quests' ? '#111' : 'var(--text-main)',
            border: '1px solid var(--border-color)',
            padding: '6px 12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85em',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}>
          <ThemedIcon name="quests" theme={currentTheme} size={16} />
          {lang === 'vi' ? 'Nhiệm Vụ' : 'Quests'}
        </button>
      </nav>

      {/* Control Actions: Theme, Mode, Sound, Language */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Game Theme Switcher */}
        <select
          value={currentTheme}
          onChange={(e) => {
            const nextTheme = e.target.value as ThemeId;
            sound.setTheme(nextTheme);
            sound.playSelect();
            onThemeChange(nextTheme);
          }}
          style={{
            backgroundColor: 'var(--bg-card)',
            color: 'var(--accent-cyan)',
            border: '1px solid var(--border-color)',
            padding: '5px 8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85em',
            fontWeight: 700,
            cursor: 'pointer',
            outline: 'none'
          }}>
          {themesList.map(t => (
            <option key={t.id} value={t.id}>
              {t.name[lang]}
            </option>
          ))}
        </select>

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
            <ThemedIcon name="sun" theme={currentTheme} size={16} color="var(--accent-gold)" />
          ) : (
            <ThemedIcon name="moon" theme={currentTheme} size={16} />
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
          <ThemedIcon name="tv" theme={currentTheme} size={16} />
        </button>

        {/* Audio Mute Toggle */}
        <button
          onClick={handleMuteToggle}
          title={isMuted ? 'Bật âm thanh hiệu ứng' : 'Tắt âm thanh hiệu ứng'}
          style={{
            backgroundColor: isMuted ? 'rgba(244, 63, 94, 0.2)' : 'var(--bg-card)',
            color: isMuted ? 'var(--accent-red)' : 'var(--accent-green)',
            border: `1px solid ${isMuted ? 'var(--accent-red)' : 'var(--border-color)'}`,
            padding: '6px 9px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}>
          {isMuted ? (
            <ThemedIcon name="mute" theme={currentTheme} size={16} />
          ) : (
            <ThemedIcon name="volume" theme={currentTheme} size={16} />
          )}
        </button>

        {/* Language Switcher */}
        <button
          onClick={() => { sound.playClick(); onLangToggle(); }}
          title="Chuyển đổi Tiếng Việt / English"
          style={{
            backgroundColor: 'var(--bg-card)',
            color: 'var(--accent-gold)',
            border: '1px solid var(--border-color)',
            padding: '5px 10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82em',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
          <ThemedIcon name="globe" theme={currentTheme} size={15} />
          {lang === 'vi' ? 'VI' : 'EN'}
        </button>
      </div>
    </header>
  );
};
