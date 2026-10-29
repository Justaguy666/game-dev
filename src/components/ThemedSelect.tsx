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
  palette: string[];
}

export const ThemedSelect: React.FC<ThemedSelectProps> = ({ currentTheme, onThemeChange, lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themesList: ThemeOption[] = [
    {
      id: 'arcade',
      name: { vi: '16-Bit Arcade', en: '16-Bit Arcade' },
      iconName: 'tv',
      palette: ['#fbbf24', '#00f0ff', '#ef4444', '#10b981']
    },
    {
      id: 'gameboy',
      name: { vi: 'Game Boy 1989', en: 'Game Boy 1989' },
      iconName: 'brand',
      palette: ['#9bbc0f', '#8bac0f', '#306230', '#0f380f']
    },
    {
      id: 'cyber',
      name: { vi: 'Cyber Mecha', en: 'Cyber Mecha' },
      iconName: 'code',
      palette: ['#00f0ff', '#ff0055', '#ffe600', '#7928ca']
    },
    {
      id: 'fantasy',
      name: { vi: 'Dark Fantasy RPG', en: 'Dark Fantasy RPG' },
      iconName: 'quests',
      palette: ['#d4af37', '#8b5a2b', '#4a2c11', '#c2410c']
    },
    {
      id: 'inkwell',
      name: { vi: '1930s Inkwell', en: '1930s Inkwell' },
      iconName: 'art',
      palette: ['#f4eedb', '#2b261f', '#d97706', '#991b1b']
    },
    {
      id: 'synthwave',
      name: { vi: 'Outrun 1984', en: 'Outrun 1984' },
      iconName: 'sun',
      palette: ['#ff2a85', '#00f0ff', '#ffe600', '#a855f7']
    },
    {
      id: 'gothic',
      name: { vi: 'Gothic Eldritch', en: 'Gothic Eldritch' },
      iconName: 'boss',
      palette: ['#dc2626', '#94a3b8', '#1c1917', '#eab308']
    },
    {
      id: 'blueprint',
      name: { vi: 'Blueprint Architect', en: 'Blueprint Architect' },
      iconName: 'design',
      palette: ['#38bdf8', '#0b1d3a', '#fde047', '#f0f9ff']
    },
    {
      id: 'ghibli',
      name: { vi: 'Ghibli Cozy Forest', en: 'Ghibli Cozy Forest' },
      iconName: 'brand',
      palette: ['#4ade80', '#fde047', '#38bdf8', '#c084fc']
    },
    {
      id: 'psx',
      name: { vi: 'PSX 32-Bit CD', en: 'PSX 32-Bit CD' },
      iconName: 'tv',
      palette: ['#34c759', '#ff3b30', '#38bdf8', '#ff2d55']
    },
    {
      id: 'persona',
      name: { vi: 'Persona Acid Pop', en: 'Persona Acid Pop' },
      iconName: 'quests',
      palette: ['#ff1e56', '#ffe600', '#00f0ff', '#c084fc']
    },
    {
      id: 'ukiyoe',
      name: { vi: 'Ukiyo-e Thủy Mặc', en: 'Ukiyo-e Sumi-e' },
      iconName: 'art',
      palette: ['#dc2626', '#d97706', '#1d4ed8', '#15803d']
    },
    {
      id: 'vaporwave',
      name: { vi: 'Vaporwave Win95', en: 'Vaporwave Win95' },
      iconName: 'tv',
      palette: ['#008080', '#ff71ce', '#01cdfe', '#000080']
    },
    {
      id: 'pipboy',
      name: { vi: 'Pip-Boy 3000', en: 'Pip-Boy 3000' },
      iconName: 'tv',
      palette: ['#1aff59', '#0f2617', '#ffb900', '#1bf5e6']
    },
    {
      id: 'claymation',
      name: { vi: 'Claymation Đất Nặn', en: 'Claymation Clay' },
      iconName: 'art',
      palette: ['#ffa07a', '#ffd166', '#4cc9f0', '#06d6a0']
    }
  ];

  const currentOption = themesList.find(t => t.id === currentTheme) || themesList[0];

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (themeId: ThemeId) => {
    sound.setTheme(themeId);
    sound.playSelect();
    onThemeChange(themeId);
    setIsOpen(false);
  };

  const renderThemeItem = (option: ThemeOption) => {
    const isSelected = option.id === currentTheme;
    return (
      <div
        key={option.id}
        className={`themed-select-item ${isSelected ? 'is-selected' : ''}`}
        onClick={() => handleSelect(option.id)}
        onMouseEnter={() => sound.playHover()}
        title={option.name[lang]}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 10px',
          cursor: 'pointer',
          backgroundColor: isSelected ? 'var(--btn-active-bg)' : 'transparent',
          color: isSelected ? 'var(--btn-active-text)' : 'var(--text-main)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.82em',
          fontWeight: isSelected ? 800 : 600,
          transition: 'all 0.12s ease',
          border: isSelected ? '1px solid var(--border-color)' : '1px solid transparent',
          borderRadius: '2px',
          marginBottom: '2px'
        }}>
        <ThemedIcon
          name={option.iconName}
          theme={option.id}
          size={14}
          color={isSelected ? 'var(--btn-active-text)' : 'var(--accent-gold)'}
        />
        <span style={{
          flex: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {option.name[lang]}
        </span>

        {/* 4 Mini Theme Palette Dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0 }} aria-hidden="true">
          {option.palette.map((colorHex, idx) => (
            <span
              key={idx}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: colorHex,
                border: '1px solid rgba(0, 0, 0, 0.25)',
                display: 'inline-block'
              }}
            />
          ))}
        </div>

        {isSelected && (
          <span style={{ fontSize: '10px', fontWeight: 800, flexShrink: 0, marginLeft: '2px' }}>✓</span>
        )}
      </div>
    );
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
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={lang === 'vi' ? 'Chọn chủ đề nghệ thuật giao diện' : 'Select Game Dev Art Theme'}
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
        <span style={{ whiteSpace: 'nowrap' }}>{currentOption.name[lang]}</span>
        <span style={{
          fontSize: '9px',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.15s ease',
          color: 'var(--text-muted)'
        }}>
          ▼
        </span>
      </button>

      {/* Themed 2-Column Gallery Popover (Space-Efficient & Zero Truncation) */}
      {isOpen && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 5px)',
            right: 0,
            width: 'min(440px, calc(100vw - 24px))',
            maxHeight: 'min(500px, calc(100vh - 70px))',
            overflowY: 'auto',
            backgroundColor: 'var(--bg-surface)',
            border: '2px solid var(--border-color)',
            boxShadow: 'var(--card-shadow), 0 12px 32px rgba(0, 0, 0, 0.55)',
            zIndex: 9999,
            padding: '10px',
            animation: 'fadeIn 0.12s ease-out'
          }}>
          {/* Popover Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '8px',
            marginBottom: '8px',
            borderBottom: '1px solid var(--border-color)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74em',
              fontWeight: 800,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              <ThemedIcon name="design" theme={currentTheme} size={13} color="var(--accent-gold)" />
              <span>{lang === 'vi' ? 'Bộ Sưu Tập Phong Cách Art' : 'Game Art Styles'}</span>
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72em',
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: '2px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--accent-gold)'
            }}>
              15 STYLES
            </span>
          </div>

          {/* Unified 2-Column Art Styles Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(195px, 1fr))',
            gap: '4px'
          }}>
            {themesList.map(renderThemeItem)}
          </div>
        </div>
      )}
    </div>
  );
};
