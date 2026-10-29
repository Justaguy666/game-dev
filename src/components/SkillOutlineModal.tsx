import React, { useState, useRef, useEffect } from 'react';
import { SkillNode, Language, ThemeId } from '../types';
import { sound } from '../soundEngine';
import { ThemedIcon, IconName } from './ThemedIcon';
import { ThemedCheckbox } from './ThemedCheckbox';

interface SkillOutlineModalProps {
  skill: SkillNode;
  onClose: () => void;
  onToggleObjective: (skillId: string, objId: string) => void;
  onOpenFullDoc: (skillId: string) => void;
  lang: Language;
  currentTheme: ThemeId;
}

export const SkillOutlineModal: React.FC<SkillOutlineModalProps> = ({
  skill,
  onClose,
  onToggleObjective,
  onOpenFullDoc,
  lang,
  currentTheme
}) => {
  // Draggable position state
  // Default position: floating top right
  const [pos, setPos] = useState<{ x: number; y: number }>(() => {
    const defaultX = Math.max(20, window.innerWidth - 480);
    const defaultY = 80;
    return { x: defaultX, y: defaultY };
  });

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number }>({
    mouseX: 0,
    mouseY: 0,
    startX: 0,
    startY: 0
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag from header bar or drag handle
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input')) return;

    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: pos.x,
      startY: pos.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.mouseX;
      const dy = e.clientY - dragStartRef.current.mouseY;

      const newX = Math.max(10, Math.min(window.innerWidth - 420, dragStartRef.current.startX + dx));
      const newY = Math.max(70, Math.min(window.innerHeight - 200, dragStartRef.current.startY + dy));

      setPos({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Extract clean outline bullet points from markdown content
  const extractOutlinePoints = (markdownText: string): string[] => {
    const lines = markdownText.split('\n');
    const points: string[] = [];
    for (const line of lines) {
      const trimmed = line.trim();
      // Match H2 or H3 headers: "## 1. ..." or "### ..."
      if (trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
        const cleaned = trimmed.replace(/^#+\s*(\d+\.\s*)?/, '').trim();
        if (cleaned && !cleaned.toLowerCase().includes('checklist') && points.length < 5) {
          points.push(cleaned);
        }
      }
    }
    return points.length > 0 ? points : [
      lang === 'vi' ? 'Nguyên lý thiết kế & tư duy hệ thống' : 'Systemic design principles',
      lang === 'vi' ? 'Kỹ thuật lập trình & công thức toán học' : 'Engineering mechanics & formulas',
      lang === 'vi' ? 'Quy trình kiểm thử & tối ưu hiệu năng' : 'Validation, testing & optimization'
    ];
  };

  const outlinePoints = extractOutlinePoints(skill.content[lang]);
  const progressPercent = Math.min(100, Math.round((skill.exp / skill.maxExp) * 100));

  const getCategoryIcon = (category: string): IconName => {
    switch (category) {
      case 'root': return 'brand';
      case 'design': return 'design';
      case 'tech': return 'code';
      case 'qa': return 'qa';
      case 'art': return 'art';
      case 'audio': return 'volume';
      case 'boss': return 'boss';
      case 'production': return 'production';
      default: return 'tree';
    }
  };

  const borderColor = skill.status === 'mastered' 
    ? 'var(--accent-green)' 
    : (skill.status === 'learning' ? 'var(--accent-gold)' : 'var(--border-color)');

  return (
    <div
      style={{
        position: 'fixed',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: '470px',
        maxHeight: 'calc(100vh - 100px)',
        backgroundColor: 'var(--bg-surface)',
        border: `2px solid ${borderColor}`,
        boxShadow: 'var(--card-shadow), 0 8px 30px rgba(0, 0, 0, 0.65)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-sharp)',
        animation: 'fadeIn 0.15s ease-out',
        userSelect: isDragging ? 'none' : 'auto'
      }}>
      
      {/* Draggable Header */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          padding: '10px 14px',
          backgroundColor: 'var(--bg-card)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none'
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ThemedIcon name="drag" theme={currentTheme} size={14} color="var(--text-muted)" />
          <ThemedIcon name={getCategoryIcon(skill.category)} theme={currentTheme} size={16} color="var(--accent-gold)" />
          <span style={{
            fontSize: '10px',
            fontFamily: 'var(--font-display)',
            color: 'var(--accent-gold)'
          }}>
            TIER {skill.tier}
          </span>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <span style={{
            fontSize: '10px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: borderColor
          }}>
            {skill.status === 'mastered' && <ThemedIcon name="mastered" theme={currentTheme} size={11} color="var(--accent-green)" />}
            {skill.status === 'learning' && <ThemedIcon name="learning" theme={currentTheme} size={11} color="var(--accent-gold)" />}
            {skill.status === 'locked' && <ThemedIcon name="locked" theme={currentTheme} size={11} color="var(--text-dim)" />}
            {skill.status === 'mastered' ? (lang === 'vi' ? 'ĐÃ LĨNH HỘI' : 'MASTERED') : (skill.status === 'learning' ? (lang === 'vi' ? 'ĐANG HỌC' : 'LEARNING') : (lang === 'vi' ? 'KHÓA' : 'LOCKED'))}
          </span>
        </div>

        <button
          onClick={() => { sound.playClick(); onClose(); }}
          title={lang === 'vi' ? 'Đóng bảng tóm tắt' : 'Close overview'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            color: 'var(--accent-red)',
            display: 'flex',
            alignItems: 'center'
          }}>
          <ThemedIcon name="close" theme={currentTheme} size={15} />
        </button>
      </div>

      {/* Scrollable Body */}
      <div style={{
        padding: '14px 18px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        maxHeight: 'calc(100vh - 200px)'
      }}>
        {/* Title */}
        <div>
          <h2 style={{
            fontSize: '1.25em',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            color: 'var(--text-main)',
            lineHeight: 1.35,
            marginBottom: '8px'
          }}>
            {skill.title[lang]}
          </h2>
          
          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {skill.tags.map(t => (
              <span
                key={t}
                style={{
                  fontSize: '0.82em',
                  backgroundColor: 'var(--bg-app)',
                  border: '1px solid var(--border-color)',
                  padding: '2px 8px',
                  color: 'var(--text-muted)'
                }}>
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* EXP Progress Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86em', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <span>{lang === 'vi' ? 'Tiến độ kinh nghiệm (EXP)' : 'Experience Progress'}</span>
            <span style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>{skill.exp} / {skill.maxExp} XP</span>
          </div>
          <div style={{
            height: '10px',
            backgroundColor: 'var(--bg-app)',
            border: '1px solid var(--border-color)',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              backgroundColor: borderColor,
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Summary Block */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderLeft: `4px solid ${borderColor}`,
          padding: '12px 14px',
          fontSize: '0.98em',
          lineHeight: 1.5,
          color: 'var(--text-main)'
        }}>
          {skill.summary[lang]}
        </div>

        {/* Outline / Key Concepts */}
        <div>
          <div style={{
            fontSize: '0.92em',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            color: 'var(--accent-cyan)',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <ThemedIcon name="docs" theme={currentTheme} size={14} color="var(--accent-cyan)" />
            <span>{lang === 'vi' ? 'DÀN Ý KIẾN THỨC TRỌNG TÂM' : 'CORE CONCEPTS OUTLINE'}</span>
          </div>
          <ul style={{ paddingLeft: '20px', fontSize: '0.92em', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {outlinePoints.map((pt, i) => (
              <li key={i} style={{ lineHeight: 1.45 }}>
                <span style={{ color: 'var(--text-main)' }}>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Objectives Checklist */}
        {skill.objectives.length > 0 && (
          <div>
            <div style={{
              fontSize: '0.92em',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              color: 'var(--accent-gold)',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <ThemedIcon name="quests" theme={currentTheme} size={14} color="var(--accent-gold)" />
              <span>{lang === 'vi' ? 'MỤC TIÊU THỰC HÀNH' : 'PRACTICAL OBJECTIVES'}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {skill.objectives.map(obj => (
                <div
                  key={obj.id}
                  style={{
                    backgroundColor: 'var(--bg-app)',
                    padding: '8px 10px',
                    border: '1px solid var(--border-color)'
                  }}>
                  <ThemedCheckbox
                    checked={obj.completed}
                    onChange={() => onToggleObjective(skill.id, obj.id)}
                    theme={currentTheme}
                    label={
                      <span style={{
                        color: obj.completed ? 'var(--text-dim)' : 'var(--text-main)',
                        textDecoration: obj.completed ? 'line-through' : 'none',
                        fontSize: '0.94em'
                      }}>
                        {obj.text[lang]}
                      </span>
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div style={{
        padding: '12px 16px',
        backgroundColor: 'var(--bg-card)',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button
          onClick={() => {
            sound.playClick();
            onOpenFullDoc(skill.id);
          }}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: 'var(--btn-active-bg)',
            color: 'var(--btn-active-text)',
            border: 'none',
            padding: '10px 16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.96em',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}>
          <ThemedIcon name="open" theme={currentTheme} size={16} color="var(--btn-active-text)" />
          <span>{lang === 'vi' ? 'Xem Toàn Bộ Tài Liệu & Soạn Thảo' : 'Open Full Doc & Editor'}</span>
        </button>
      </div>
    </div>
  );
};
