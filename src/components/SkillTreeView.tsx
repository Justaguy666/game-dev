import React, { useState, useRef } from 'react';
import { SkillNode, Language, ThemeId } from '../types';
import { sound } from '../soundEngine';
import { ThemedIcon, IconName } from './ThemedIcon';

interface SkillTreeViewProps {
  skills: SkillNode[];
  onSelectSkill: (skill: SkillNode) => void;
  onCloseDetail?: () => void;
  lang: Language;
  currentTheme: ThemeId;
}

export const SkillTreeView: React.FC<SkillTreeViewProps> = ({ skills, onSelectSkill, onCloseDetail, lang, currentTheme }) => {
  const [zoom, setZoom] = useState<number>(0.85);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: -500, y: 30 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse wheel zoom towards cursor
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomDelta = e.deltaY < 0 ? 1.08 : 0.92;
    setZoom(prevZoom => {
      const nextZoom = Math.min(2.2, Math.max(0.35, prevZoom * zoomDelta));
      if (nextZoom === prevZoom) return prevZoom;

      setPan(prevPan => ({
        x: mouseX - (mouseX - prevPan.x) * (nextZoom / prevZoom),
        y: mouseY - (mouseY - prevPan.y) * (nextZoom / prevZoom)
      }));

      return nextZoom;
    });
  };

  // Mouse drag handlers for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // only left click
    
    // Close detail panel when clicking directly on canvas background
    const target = e.target as HTMLElement;
    if (target === containerRef.current || target.tagName === 'svg' || target.tagName === 'path') {
      onCloseDetail?.();
    }

    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = Math.abs(e.clientX - (dragStart.x + pan.x));
    const dy = Math.abs(e.clientY - (dragStart.y + pan.y));
    // If panning actively, close detail card so view is clean
    if (dx > 12 || dy > 12) {
      onCloseDetail?.();
    }

    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    sound.playClick();
    setZoom(0.85);
    setPan({ x: -500, y: 30 });
  };

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

  // Find connections
  const connections = skills
    .filter(s => s.parentId)
    .map(child => {
      const parent = skills.find(p => p.id === child.parentId);
      if (!parent) return null;
      return {
        id: `${parent.id}->${child.id}`,
        from: { x: parent.x + 130, y: parent.y + 80 },
        to: { x: child.x + 130, y: child.y },
        status: child.status
      };
    })
    .filter(Boolean) as { id: string; from: { x: number; y: number }; to: { x: number; y: number }; status: string }[];

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        width: '100%',
        height: 'calc(100vh - 65px)',
        position: 'relative',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'grab',
        backgroundColor: 'var(--bg-app)',
        backgroundImage: `radial-gradient(var(--border-color) 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }}>
      
      {/* HUD Controls Overlay */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        display: 'flex',
        gap: '8px',
        zIndex: 50
      }}>
        <button
          onClick={() => { sound.playClick(); setZoom(z => Math.min(1.8, z + 0.15)); }}
          title="Phóng to (Zoom In)"
          style={{
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--text-main)',
            border: '1px solid var(--border-color)',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}>
          <ThemedIcon name="zoomIn" theme={currentTheme} size={16} />
        </button>
        <button
          onClick={() => { sound.playClick(); setZoom(z => Math.max(0.5, z - 0.15)); }}
          title="Thu nhỏ (Zoom Out)"
          style={{
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--text-main)',
            border: '1px solid var(--border-color)',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}>
          <ThemedIcon name="zoomOut" theme={currentTheme} size={16} />
        </button>
        <button
          onClick={resetView}
          title="Đặt lại khung nhìn (Reset View)"
          style={{
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--text-main)',
            border: '1px solid var(--border-color)',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}>
          <ThemedIcon name="reset" theme={currentTheme} size={16} />
        </button>
      </div>

      {/* Legend Overlay */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        padding: '10px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        fontSize: '0.8em',
        fontFamily: 'var(--font-mono)',
        zIndex: 50,
        boxShadow: 'var(--card-shadow)'
      }}>
        <div style={{
          fontWeight: 800,
          color: 'var(--accent-gold)',
          marginBottom: '2px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <ThemedIcon name="docs" theme={currentTheme} size={13} color="var(--accent-gold)" />
          <span>{lang === 'vi' ? 'TRẠNG THÁI KỸ NĂNG' : 'SKILL TREE LEGEND'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ThemedIcon name="mastered" theme={currentTheme} size={14} color="var(--accent-green)" />
          <span>{lang === 'vi' ? 'Đã lĩnh hội (Mastered)' : 'Mastered'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ThemedIcon name="learning" theme={currentTheme} size={14} color="var(--accent-gold)" />
          <span>{lang === 'vi' ? 'Đang luyện tập (Learning)' : 'In Training'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ThemedIcon name="locked" theme={currentTheme} size={14} color="var(--border-color)" />
          <span>{lang === 'vi' ? 'Chưa mở khóa (Locked)' : 'Locked'}</span>
        </div>
      </div>

      {/* SVG Canvas World */}
      <div style={{
        width: '2750px',
        height: '1650px',
        position: 'absolute',
        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
        transformOrigin: '0 0',
        transition: isDragging ? 'none' : 'transform 0.08s ease-out'
      }}>
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {connections.map(conn => {
            const dx = conn.to.x - conn.from.x;
            const dy = conn.to.y - conn.from.y;
            const pathData = `M ${conn.from.x} ${conn.from.y} C ${conn.from.x} ${conn.from.y + dy * 0.5}, ${conn.to.x} ${conn.to.y - dy * 0.5}, ${conn.to.x} ${conn.to.y}`;
            const strokeColor = conn.status === 'mastered' 
              ? 'var(--accent-green)' 
              : (conn.status === 'learning' ? 'var(--accent-gold)' : 'var(--border-color)');

            return (
              <path
                key={conn.id}
                d={pathData}
                fill="none"
                stroke={strokeColor}
                strokeWidth={conn.status === 'locked' ? 2 : 3}
                strokeDasharray={conn.status === 'locked' ? '4 4' : 'none'}
                style={{
                  filter: conn.status === 'mastered' ? 'drop-shadow(0 0 4px var(--accent-green))' : 'none',
                  opacity: conn.status === 'locked' ? 0.45 : 0.85
                }}
              />
            );
          })}
        </svg>

        {/* Node Cards */}
        {skills.map(skill => {
          const isMastered = skill.status === 'mastered';
          const isLearning = skill.status === 'learning';
          const isLocked = skill.status === 'locked';

          const borderColor = isMastered 
            ? 'var(--accent-green)' 
            : (isLearning ? 'var(--accent-gold)' : 'var(--border-color)');

          const glow = isMastered 
            ? '0 0 12px rgba(74, 222, 128, 0.4)' 
            : (isLearning ? '0 0 10px rgba(251, 191, 36, 0.35)' : 'none');

          return (
            <div
              key={skill.id}
              onClick={() => {
                sound.playNodeClick();
                onSelectSkill(skill);
              }}
              onMouseEnter={() => sound.playHover()}
              style={{
                position: 'absolute',
                left: `${skill.x}px`,
                top: `${skill.y}px`,
                width: '260px',
                backgroundColor: 'var(--bg-surface)',
                border: `2px solid ${borderColor}`,
                padding: '12px 14px',
                cursor: 'pointer',
                boxShadow: glow,
                transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                userSelect: 'none'
              }}>
              
              {/* Header Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{
                  fontSize: '9px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  color: isMastered ? 'var(--accent-green)' : (isLearning ? 'var(--accent-gold)' : 'var(--text-dim)')
                }}>
                  TIER {skill.tier}
                </span>

                <span style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: borderColor
                }}>
                  {isMastered && <ThemedIcon name="mastered" theme={currentTheme} size={12} color="var(--accent-green)" />}
                  {isLearning && <ThemedIcon name="learning" theme={currentTheme} size={12} color="var(--accent-gold)" />}
                  {isLocked && <ThemedIcon name="locked" theme={currentTheme} size={12} color="var(--text-dim)" />}
                  {isMastered ? (lang === 'vi' ? 'ĐÃ LĨNH HỘI' : 'MASTERED') : (isLearning ? (lang === 'vi' ? 'ĐANG HỌC' : 'LEARNING') : (lang === 'vi' ? 'KHÓA' : 'LOCKED'))}
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '0.92em',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                color: 'var(--text-main)',
                marginBottom: '6px',
                lineHeight: 1.3,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <ThemedIcon name={getCategoryIcon(skill.category)} theme={currentTheme} size={15} color="var(--accent-gold)" />
                <span>{skill.title[lang]}</span>
              </h3>

              {/* Summary */}
              <p style={{
                fontSize: '0.78em',
                color: 'var(--text-muted)',
                lineHeight: 1.45,
                marginBottom: '10px'
              }}>
                {skill.summary[lang]}
              </p>

              {/* Progress Bar */}
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: 'var(--bg-app)',
                border: '1px solid var(--border-color)',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(skill.exp / skill.maxExp) * 100}%`,
                  height: '100%',
                  backgroundColor: borderColor,
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
