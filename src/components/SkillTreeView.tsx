import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SkillNode, Language, ThemeId } from '../types';
import { ThemedIcon, IconName } from './ThemedIcon';
import { sound } from '../soundEngine';

interface SkillTreeViewProps {
  skills: SkillNode[];
  onSelectSkill: (skill: SkillNode) => void;
  onCloseDetail: () => void;
  lang: Language;
  currentTheme: ThemeId;
}

export const SkillTreeView: React.FC<SkillTreeViewProps> = ({
  skills,
  onSelectSkill,
  lang,
  currentTheme
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.85);
  const [pan, setPan] = useState({ x: -280, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Pan interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag with left mouse button if not clicking interactive elements
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('.node-card, button, input')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom interaction via Mouse Wheel
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    const newZoom = Math.min(Math.max(0.4, zoom * zoomFactor), 1.8);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Zoom towards mouse position
      const newPanX = mouseX - (mouseX - pan.x) * (newZoom / zoom);
      const newPanY = mouseY - (mouseY - pan.y) * (newZoom / zoom);

      setZoom(newZoom);
      setPan({ x: newPanX, y: newPanY });
    }
  };

  // Center tree on mount
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'r' && (e.ctrlKey || e.metaKey)) return;
      if (e.key === 'Home') {
        resetView();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const resetView = () => {
    sound.playClick();
    setZoom(0.85);
    setPan({ x: -280, y: 20 });
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
        from: { x: parent.x + 145, y: parent.y + 110 },
        to: { x: child.x + 145, y: child.y },
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
      
      {/* HUD Controls Overlay with Zoom Percentage */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '6px',
        zIndex: 50
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => { sound.playClick(); setZoom(z => Math.min(1.8, parseFloat((z + 0.15).toFixed(2)))); }}
            title="Phóng to (Zoom In)"
            style={{
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
              padding: '7px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              boxShadow: 'var(--card-shadow)'
            }}>
            <ThemedIcon name="zoomIn" theme={currentTheme} size={15} />
          </button>
          <button
            onClick={() => { sound.playClick(); setZoom(z => Math.max(0.4, parseFloat((z - 0.15).toFixed(2)))); }}
            title="Thu nhỏ (Zoom Out)"
            style={{
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
              padding: '7px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              boxShadow: 'var(--card-shadow)'
            }}>
            <ThemedIcon name="zoomOut" theme={currentTheme} size={15} />
          </button>
          <button
            onClick={resetView}
            title="Đặt lại khung nhìn (Reset View)"
            style={{
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
              padding: '7px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              boxShadow: 'var(--card-shadow)'
            }}>
            <ThemedIcon name="reset" theme={currentTheme} size={15} />
          </button>
        </div>

        {/* Zoom Percentage Display Below Controls */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          padding: '3px 8px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.74em',
          fontWeight: 800,
          color: 'var(--accent-gold)',
          letterSpacing: '0.04em',
          boxShadow: 'var(--card-shadow)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>ZOOM:</span>
          <span style={{ color: 'var(--text-main)' }}>{Math.round(zoom * 100)}%</span>
        </div>
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
        gap: '6px',
        fontSize: '0.78em',
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
          <ThemedIcon name="mastered" theme={currentTheme} size={13} color="var(--accent-green)" />
          <span>{lang === 'vi' ? 'Đã lĩnh hội (Mastered)' : 'Mastered'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ThemedIcon name="learning" theme={currentTheme} size={13} color="var(--accent-gold)" />
          <span>{lang === 'vi' ? 'Đang luyện tập (Learning)' : 'In Training'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ThemedIcon name="locked" theme={currentTheme} size={13} color="var(--border-color)" />
          <span>{lang === 'vi' ? 'Chưa mở khóa (Locked)' : 'Locked'}</span>
        </div>
      </div>

      {/* SVG Canvas World */}
      <div style={{
        width: '2800px',
        height: '2500px',
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
                  opacity: conn.status === 'locked' ? 0.4 : 0.85
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
              className="node-card"
              onClick={() => {
                sound.playNodeClick();
                onSelectSkill(skill);
              }}
              onMouseEnter={() => sound.playHover()}
              style={{
                position: 'absolute',
                left: `${skill.x}px`,
                top: `${skill.y}px`,
                border: `2px solid ${borderColor}`,
                boxShadow: glow
              }}>
              
              {/* Header Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="node-card-badge" style={{
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  color: isMastered ? 'var(--accent-green)' : (isLearning ? 'var(--accent-gold)' : 'var(--text-dim)')
                }}>
                  TIER {skill.tier}
                </span>

                <span className="node-card-badge" style={{
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: borderColor
                }}>
                  {isMastered && <ThemedIcon name="mastered" theme={currentTheme} size={12} color="var(--accent-green)" />}
                  {isLearning && <ThemedIcon name="learning" theme={currentTheme} size={12} color="var(--accent-gold)" />}
                  {isLocked && <ThemedIcon name="locked" theme={currentTheme} size={12} color="var(--text-dim)" />}
                  {isMastered ? (lang === 'vi' ? 'ĐÃ LĨNH HỘI' : 'MASTERED') : (isLearning ? (lang === 'vi' ? 'ĐANG HỌC' : 'LEARNING') : (lang === 'vi' ? 'KHÓA' : 'LOCKED'))}
                </span>
              </div>

              {/* Title with Category Icon */}
              <h3 className="node-card-title">
                <ThemedIcon name={getCategoryIcon(skill.category)} theme={currentTheme} size={15} color="var(--accent-gold)" />
                <span>{skill.title[lang]}</span>
              </h3>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {skill.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="node-card-tag">#{tag}</span>
                ))}
              </div>

              {/* Summary (Clamped neatly to 2 lines max) */}
              <p className="node-card-desc">
                {skill.summary[lang]}
              </p>

              {/* Progress Bar & EXP Readout */}
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.70em',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  marginBottom: '3px'
                }}>
                  <span>{skill.category.toUpperCase()}</span>
                  <span style={{ fontWeight: 700, color: borderColor }}>
                    {skill.exp}/{skill.maxExp} XP
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '6px',
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
            </div>
          );
        })}
      </div>
    </div>
  );
};
