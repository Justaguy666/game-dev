import React, { useState, useRef, useEffect } from 'react';
import { ThemeId, Language } from '../types';
import { sound } from '../soundEngine';
import { ThemedIcon, IconName } from './ThemedIcon';

interface ThemedSelectProps {
  currentTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
  lang: Language;
}

interface ThemeOption {
  id: ThemeId;
  name: { vi: string; en: string };
  iconName: IconName;
}

export const ThemedSelect: React.FC<ThemedSelectProps> = ({ currentTheme, onThemeChange, lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themesList: ThemeOption[] = [
    { id: 'arcade', name: { vi: 'Arcade 16-Bit', en: '16-Bit Arcade' }, iconName: 'tv' },
    { id: 'gameboy', name: { vi: 'Game Boy DMG', en: 'Game Boy 1989' }, iconName: 'brand' },
    { id: 'cyber', name: { vi: 'Cyber Mecha', en: 'Cyber Mecha' }, iconName: 'code' },
    { id: 'fantasy', name: { vi: 'Dark Fantasy', en: 'Dark Fantasy' }, iconName: 'quests' },
    { id: 'inkwell', name: { vi: '1930s Inkwell', en: '1930s Inkwell' }, iconName: 'art' },
    { id: 'synthwave', name: { vi: 'Outrun Synthwave', en: 'Outrun Synthwave' }, iconName: 'sun' },
    { id: 'gothic', name: { vi: 'Gothic Eldritch', en: 'Gothic Eldritch' }, iconName: 'boss' }
  ];

  const currentOption = themesList.find(t => t.id === currentTheme) || themesList[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (themeId: ThemeId) => {
    sound.setTheme(themeId);
    sound.playSelect();
    onThemeChange(themeId);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => {
          sound.playClick();
          setIsOpen(!isOpen);
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'var(--bg-card)',
          color: 'var(--accent-cyan)',
          border: '1px solid var(--border-color)',
          padding: '6px 12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85em',
          fontWeight: 700,
          cursor: 'pointer',
          outline: 'none',
          boxShadow: isOpen ? 'var(--card-shadow)' : 'none',
          transition: 'all 0.15s ease'
        }}>
        <ThemedIcon name={currentOption.iconName} theme={currentTheme} size={15} color="var(--accent-cyan)" />
        <span>{currentOption.name[lang]}</span>
        <span style={{
          fontSize: '9px',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.15s ease',
          color: 'var(--text-muted)'
        }}>
          ▼
        </span>
      </button>

      {/* Themed Popup Menu (In-DOM, 0 default browser OS styling) */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          right: 0,
          minWidth: '180px',
          backgroundColor: 'var(--bg-surface)',
          border: '2px solid var(--border-color)',
          boxShadow: 'var(--card-shadow), 0 8px 24px rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
          padding: '4px',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
          animation: 'fadeIn 0.1s ease-out'
        }}>
          {themesList.map(option => {
            const isSelected = option.id === currentTheme;
            return (
              <div
                key={option.id}
                className={`themed-select-item ${isSelected ? 'is-selected' : ''}`}
                onClick={() => handleSelect(option.id)}
                onMouseEnter={() => sound.playHover()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? 'var(--btn-active-bg)' : 'transparent',
                  color: isSelected ? 'var(--btn-active-text)' : 'var(--text-main)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.88em',
                  fontWeight: isSelected ? 800 : 600,
                  transition: 'background 0.1s ease',
                  border: isSelected ? '1px solid var(--border-color)' : '1px solid transparent'
                }}>
                <ThemedIcon
                  name={option.iconName}
                  theme={option.id}
                  size={15}
                  color={isSelected ? 'var(--btn-active-text)' : 'var(--accent-gold)'}
                />
                <span style={{ flex: 1 }}>{option.name[lang]}</span>
                {isSelected && (
                  <span style={{ fontSize: '10px', fontWeight: 800 }}>✓</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
