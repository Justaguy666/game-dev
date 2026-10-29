import React, { useState, useRef, useEffect } from 'react';
import { Language, ThemeId } from '../types';
import { ThemedIcon } from './ThemedIcon';
import { sound } from '../soundEngine';

interface LanguageSelectProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentTheme: ThemeId;
}

interface LanguageOption {
  id: Language;
  label: string;
  code: string;
}

export const LanguageSelect: React.FC<LanguageSelectProps> = ({
  currentLang,
  onLanguageChange,
  currentTheme
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: LanguageOption[] = [
    { id: 'vi', label: 'Tiếng Việt', code: 'VI' },
    { id: 'en', label: 'English', code: 'EN' }
  ];

  const currentOption = languages.find(l => l.id === currentLang) || languages[0];

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

  const handleSelect = (lang: Language) => {
    sound.playSelect();
    onLanguageChange(lang);
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
        title={currentLang === 'vi' ? 'Chuyển đổi ngôn ngữ' : 'Switch Language'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: isOpen ? 'var(--btn-active-bg)' : 'var(--bg-card)',
          color: isOpen ? 'var(--btn-active-text)' : 'var(--text-main)',
          border: `1px solid ${isOpen ? 'var(--btn-active-bg)' : 'var(--border-color)'}`,
          padding: '6px 10px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.82em',
          fontWeight: 800,
          cursor: 'pointer',
          outline: 'none',
          boxShadow: isOpen ? 'var(--card-shadow)' : 'none',
          transition: 'all 0.15s ease'
        }}>
        <ThemedIcon
          name={currentLang === 'vi' ? 'langVi' : 'langEn'}
          theme={currentTheme}
          size={14}
          color={isOpen ? 'var(--btn-active-text)' : 'var(--accent-gold)'}
        />
        <span>{currentOption.code}</span>
        <span style={{
          fontSize: '8px',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.15s ease',
          color: isOpen ? 'var(--btn-active-text)' : 'var(--text-muted)'
        }}>
          ▼
        </span>
      </button>

      {/* Themed In-DOM Dropdown Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          right: 0,
          minWidth: '150px',
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
          {languages.map(option => {
            const isSelected = option.id === currentLang;
            return (
              <div
                key={option.id}
                className={`themed-select-item ${isSelected ? 'is-selected' : ''}`}
                onClick={() => handleSelect(option.id)}
                onMouseEnter={() => sound.playHover()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '9px',
                  padding: '7px 10px',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? 'var(--btn-active-bg)' : 'transparent',
                  color: isSelected ? 'var(--btn-active-text)' : 'var(--text-main)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85em',
                  fontWeight: isSelected ? 800 : 600,
                  transition: 'background 0.1s ease',
                  border: isSelected ? '1px solid var(--border-color)' : '1px solid transparent'
                }}>
                <ThemedIcon
                  name={option.id === 'vi' ? 'langVi' : 'langEn'}
                  theme={currentTheme}
                  size={15}
                  color={isSelected ? 'var(--btn-active-text)' : 'var(--accent-gold)'}
                />
                <span style={{ flex: 1 }}>{option.label}</span>
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
