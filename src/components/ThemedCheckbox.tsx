import React from 'react';
import { ThemeId } from '../types';
import { ThemedIcon } from './ThemedIcon';

interface ThemedCheckboxProps {
  checked: boolean;
  onChange: () => void;
  theme: ThemeId;
  label?: React.ReactNode;
  disabled?: boolean;
}

export const ThemedCheckbox: React.FC<ThemedCheckboxProps> = ({
  checked,
  onChange,
  theme,
  label,
  disabled
}) => {
  return (
    <div
      onClick={() => {
        if (!disabled) onChange();
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '9px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        opacity: disabled ? 0.6 : 1
      }}>
      {/* Box */}
      <div style={{
        width: '18px',
        height: '18px',
        flexShrink: 0,
        backgroundColor: checked ? 'var(--accent-green)' : 'var(--bg-app)',
        border: `2px solid ${checked ? 'var(--accent-green)' : 'var(--border-color)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.12s ease',
        boxShadow: checked ? '0 0 6px rgba(74, 222, 128, 0.35)' : 'none'
      }}>
        {checked && (
          <ThemedIcon name="mastered" theme={theme} size={12} color="#111" />
        )}
      </div>

      {/* Label */}
      {label && (
        <span style={{ fontSize: '0.86em', lineHeight: 1.4 }}>
          {label}
        </span>
      )}
    </div>
  );
};
