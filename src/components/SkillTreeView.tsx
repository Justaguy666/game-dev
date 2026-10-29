import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { SkillNode, Language, ThemeId, ThemeMode } from '../types';
import { ThemedIcon, IconName } from './ThemedIcon';
import { sound } from '../soundEngine';
import { GAME_DEV_DOMAINS, getDomainForCategory, getDomainColor, DomainId } from '../data/categories';
import { matchSkillFullText, SearchMatchResult } from '../utils/search';

interface SkillTreeViewProps {
  skills: SkillNode[];
  onSelectSkill: (skill: SkillNode) => void;
  onCloseDetail: () => void;
  lang: Language;
  currentTheme: ThemeId;
  themeMode: ThemeMode;
  fontScale?: number;
}

export const SkillTreeView: React.FC<SkillTreeViewProps> = ({
  skills,
  onSelectSkill,
  lang,
  currentTheme,
  themeMode,
  fontScale = 1.0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [zoom, setZoom] = useState(0.55);
  const [pan, setPan] = useState({ x: 20, y: 24 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedDomain, setSelectedDomain] = useState<DomainId | 'all'>('all');
  const [isLegendExpanded, setIsLegendExpanded] = useState(false);

  // Dynamic Y positioning calculated to guarantee parent-child spacing across all font scales
  const getSkillY = useCallback((skill: SkillNode): number => {
    if (skill.tier === 0) return 45;
    const baseT1 = Math.round(480 + Math.max(0, (fontScale - 1.0)) * 100);
    const dynamicGap = Math.round(400 + Math.max(0, (fontScale - 1.0)) * 220);
    return Math.round(baseT1 + (skill.tier - 1) * dynamicGap);
  }, [fontScale]);

  // Full-Text Search in Skill Tree
  const [searchQuery, setSearchQuery] = useState('');
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  const searchResultsMap = useMemo(() => {
    const map = new Map<string, SearchMatchResult>();
    const trimmed = searchQuery.trim();
    if (!trimmed) return map;

    skills.forEach(s => {
      const match = matchSkillFullText(s, trimmed, lang);
      if (match.matched) {
        map.set(s.id, match);
      }
    });
    return map;
  }, [skills, searchQuery, lang]);

  const isSearchActive = !!searchQuery.trim();
  const matchingSkills = useMemo(() => {
    if (!isSearchActive) return [];
    return skills.filter(s => searchResultsMap.has(s.id));
  }, [skills, isSearchActive, searchResultsMap]);

  const centerOnSkill = useCallback((skill: SkillNode) => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    const targetZoom = 0.85;
    setZoom(targetZoom);
    const targetPanX = (containerWidth / 2) - ((skill.x + 160) * targetZoom);
    const targetPanY = (containerHeight / 2) - ((getSkillY(skill) + 90) * targetZoom);
    setPan({ x: Math.round(targetPanX), y: Math.round(targetPanY) });
  }, [getSkillY]);

  const handleNextMatch = () => {
    if (matchingSkills.length === 0) return;
    sound.playClick();
    const nextIdx = (currentMatchIndex + 1) % matchingSkills.length;
    setCurrentMatchIndex(nextIdx);
    centerOnSkill(matchingSkills[nextIdx]);
  };

  const handlePrevMatch = () => {
    if (matchingSkills.length === 0) return;
    sound.playClick();
    const prevIdx = (currentMatchIndex - 1 + matchingSkills.length) % matchingSkills.length;
    setCurrentMatchIndex(prevIdx);
    centerOnSkill(matchingSkills[prevIdx]);
  };

  // Center on first match when query changes
  useEffect(() => {
    if (isSearchActive && matchingSkills.length > 0) {
      centerOnSkill(matchingSkills[0]);
      setCurrentMatchIndex(0);
    }
  }, [searchQuery]);

  // Compute optimal panoramic fit view so all 5 pillars & Root are centered
  const calcFitView = useCallback(() => {
    if (!containerRef.current) return { zoom: 0.52, pan: { x: 20, y: 24 } };
    const width = containerRef.current.clientWidth;
    // Content spans x: 100 to x: 2630 (span = 2530px). Center = 1365px.
    const idealZoom = Math.min(0.72, Math.max(0.40, parseFloat(((width - 90) / 2580).toFixed(2))));
    const panX = Math.round((width / 2) - (1365 * idealZoom));
    return { zoom: idealZoom, pan: { x: panX, y: 24 } };
  }, []);

  const resetView = useCallback(() => {
    sound.playClick();
    const fit = calcFitView();
    setZoom(fit.zoom);
    setPan(fit.pan);
    setSelectedDomain('all');
  }, [calcFitView]);

  // Center tree on initial load & window resize
  useEffect(() => {
    const fit = calcFitView();
    setZoom(fit.zoom);
    setPan(fit.pan);

    const handleResize = () => {
      if (selectedDomain === 'all') {
        const updated = calcFitView();
        setZoom(updated.zoom);
        setPan(updated.pan);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calcFitView]);

  // Pan interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag with left mouse button if not clicking interactive elements
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('.node-card, .domain-banner, .legend-box, button, input')) return;
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

  // Touch drag for mobile/tablet responsive canvas interaction
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      if ((e.target as HTMLElement).closest('.node-card, .domain-banner, .legend-box, button, input')) return;
      setIsDragging(true);
      setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
    }
  };

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setPan({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y
    });
  }, [isDragging, dragStart]);

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Zoom interaction via Mouse Wheel
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    const newZoom = Math.min(Math.max(0.35, zoom * zoomFactor), 1.8);

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

  // Hotkey handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'r' && (e.ctrlKey || e.metaKey)) return;
      if (e.key === 'Home') {
        resetView();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resetView]);

  // Focus on a specific domain column
  const handleSelectDomain = (domainId: DomainId | 'all') => {
    sound.playTab();
    setSelectedDomain(domainId);

    if (domainId === 'all') {
      resetView();
      return;
    }

    const domain = GAME_DEV_DOMAINS.find(d => d.id === domainId);
    if (domain && containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const targetZoom = 0.82;
      setZoom(targetZoom);
      // Center the target column horizontally
      const targetPanX = (containerWidth / 2) - (domain.columnX * targetZoom) - (145 * targetZoom);
      const targetPanY = 40;
      setPan({ x: Math.round(targetPanX), y: targetPanY });
    }
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

  // Pillar banners to display on canvas above Tier 1 (Generous Y spacing from Tier 1 cards)
  const pillarBanners = [
    {
      domainId: 'design' as DomainId,
      code: '01',
      title: { vi: '01. GAME DESIGN & CƠ CHẾ', en: '01. GAME DESIGN & SYSTEMS' },
      subtitle: { vi: 'Core Loop • Cân Bằng • Game Feel', en: 'Core Loop • Systems Balance • Juice' },
      x: 100,
      y: 350,
      color: getDomainColor('design', currentTheme, themeMode),
      icon: 'design' as IconName
    },
    {
      domainId: 'tech' as DomainId,
      code: '02',
      title: { vi: '02. LẬP TRÌNH & KIẾN TRÚC', en: '02. TECH & ARCHITECTURE' },
      subtitle: { vi: 'DeltaTime • Vector Math • FSM/ECS', en: 'DeltaTime • 2D Math • FSM/ECS • AI' },
      x: 660,
      y: 350,
      color: getDomainColor('tech', currentTheme, themeMode),
      icon: 'code' as IconName
    },
    {
      domainId: 'qa' as DomainId,
      code: '03',
      title: { vi: '03. KIỂM THỬ QA & HIỆU NĂNG', en: '03. QA & PERFORMANCE' },
      subtitle: { vi: 'Bug Taxonomy • Headless Bot • Profiling', en: 'Bug Taxonomy • Headless Bot • Profiling' },
      x: 1220,
      y: 350,
      color: getDomainColor('qa', currentTheme, themeMode),
      icon: 'qa' as IconName
    },
    {
      domainId: 'art' as DomainId,
      code: '04',
      title: { vi: '04. NGHỆ THUẬT & TECHNICAL ART', en: '04. ART & TECHNICAL VISUALS' },
      subtitle: { vi: 'Silhouette • Diễn Hoạt • Shaders', en: 'Silhouette • Animation • Shaders • UI' },
      x: 1780,
      y: 350,
      color: getDomainColor('art', currentTheme, themeMode),
      icon: 'art' as IconName
    },
    {
      domainId: 'audio' as DomainId,
      code: '05',
      title: { vi: '05. ÂM THANH & SOUND DESIGN', en: '05. AUDIO & SOUND DESIGN' },
      subtitle: { vi: 'Ký Hiệu Học • Adaptive SFX • 3D Spatial', en: 'Semiotics • Adaptive Audio • 3D Spatial' },
      x: 2340,
      y: 350,
      color: getDomainColor('audio', currentTheme, themeMode),
      icon: 'volume' as IconName
    }
  ];

  // Find connections (Dynamically using getSkillY and 320px center width)
  const connections = skills
    .filter(s => s.parentId)
    .map(child => {
      const parent = skills.find(p => p.id === child.parentId);
      if (!parent) return null;
      const parentY = getSkillY(parent);
      const childY = getSkillY(child);
      const parentHeight = parent.tier === 0
        ? Math.round(180 + Math.max(0, fontScale - 1.0) * 70)
        : Math.round(195 + Math.max(0, fontScale - 1.0) * 70);

      return {
        id: `${parent.id}->${child.id}`,
        from: { x: parent.x + 160, y: parentY + parentHeight },
        to: { x: child.x + 160, y: childY },
        status: child.status,
        childCategory: child.category,
        parentId: parent.id,
        childId: child.id
      };
    })
    .filter(Boolean) as { id: string; from: { x: number; y: number }; to: { x: number; y: number }; status: string; childCategory: string; parentId: string; childId: string }[];

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        width: '100%',
        height: 'calc(100vh - 65px)',
        position: 'relative',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'grab',
        backgroundColor: 'var(--bg-app)',
        backgroundImage: `radial-gradient(var(--border-color) 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        touchAction: 'none'
      }}>
      
      {/* Top Floating Domain Filter Bar (Responsive horizontal scroll on mobile, zero emojis) */}
      <div style={{
        position: 'absolute',
        top: '14px',
        left: '16px',
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        maxWidth: 'calc(100vw - 460px)',
        scrollbarWidth: 'none',
        gap: '6px',
        zIndex: 50,
        backgroundColor: 'var(--bg-surface)',
        padding: '6px 10px',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--card-shadow)'
      }}>
        {/* All Domains Tab */}
        <button
          onClick={() => handleSelectDomain('all')}
          style={{
            padding: '4px 10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75em',
            fontWeight: selectedDomain === 'all' ? 800 : 700,
            cursor: 'pointer',
            backgroundColor: selectedDomain === 'all' ? 'var(--btn-active-bg)' : 'var(--bg-card)',
            color: selectedDomain === 'all' ? 'var(--btn-active-text)' : 'var(--text-muted)',
            border: `1px solid ${selectedDomain === 'all' ? 'var(--btn-active-bg)' : 'var(--border-color)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexShrink: 0,
            transition: 'all 0.12s ease'
          }}>
          <ThemedIcon
            name="tree"
            theme={currentTheme}
            size={13}
            color={selectedDomain === 'all' ? 'var(--btn-active-text)' : 'var(--accent-gold)'}
          />
          <span>{lang === 'vi' ? 'Tất Cả Nhóm' : 'All Domains'}</span>
        </button>

        {/* Individual Domain Tabs (Unified Active Theme Button Color) */}
        {GAME_DEV_DOMAINS.map(domain => {
          const isSelected = selectedDomain === domain.id;
          const domainColor = getDomainColor(domain.id, currentTheme, themeMode);
          return (
            <button
              key={domain.id}
              onClick={() => handleSelectDomain(domain.id)}
              style={{
                padding: '4px 8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75em',
                fontWeight: isSelected ? 800 : 700,
                cursor: 'pointer',
                backgroundColor: isSelected ? 'var(--btn-active-bg)' : 'var(--bg-card)',
                color: isSelected ? 'var(--btn-active-text)' : 'var(--text-muted)',
                border: `1px solid ${isSelected ? 'var(--btn-active-bg)' : 'var(--border-color)'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                flexShrink: 0,
                transition: 'all 0.12s ease'
              }}>
              <span style={{
                display: 'inline-block',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: isSelected ? 'var(--btn-active-text)' : domainColor
              }} />
              <ThemedIcon
                name={domain.iconName}
                theme={currentTheme}
                size={12}
                color={isSelected ? 'var(--btn-active-text)' : domainColor}
              />
              <span>{domain.code} {domain.shortName[lang]}</span>
            </button>
          );
        })}
      </div>

      {/* Top Floating Controls: Full-Text Search + Zoom HUD */}
      <div style={{
        position: 'absolute',
        top: '14px',
        right: '16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        zIndex: 50
      }}>
        {/* Full-Text Search Input Box */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          padding: '5px 10px',
          boxShadow: 'var(--card-shadow)'
        }}>
          <ThemedIcon name="search" theme={currentTheme} size={14} color="var(--accent-gold)" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder={lang === 'vi' ? 'Tìm kỹ năng, tag, mã lỗi, nội dung...' : 'Search skills, tags, code, content...'}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentMatchIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (e.shiftKey) {
                  handlePrevMatch();
                } else {
                  handleNextMatch();
                }
              } else if (e.key === 'Escape') {
                setSearchQuery('');
              }
            }}
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: 'var(--text-main)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78em',
              width: '180px'
            }}
          />
          {isSearchActive && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <span style={{
                fontSize: '0.70em',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                color: matchingSkills.length > 0 ? 'var(--accent-gold)' : 'var(--accent-red)',
                whiteSpace: 'nowrap',
                padding: '0 2px'
              }}>
                {matchingSkills.length > 0 ? `${currentMatchIndex + 1}/${matchingSkills.length}` : '0/0'}
              </span>
              {matchingSkills.length > 1 && (
                <>
                  <button
                    onClick={handlePrevMatch}
                    title={lang === 'vi' ? 'Khớp trước đó (Shift+Enter)' : 'Previous match (Shift+Enter)'}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      cursor: 'pointer',
                      padding: '1px 5px',
                      fontSize: '10px'
                    }}>
                    ▲
                  </button>
                  <button
                    onClick={handleNextMatch}
                    title={lang === 'vi' ? 'Khớp tiếp theo (Enter)' : 'Next match (Enter)'}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      cursor: 'pointer',
                      padding: '1px 5px',
                      fontSize: '10px'
                    }}>
                    ▼
                  </button>
                </>
              )}
              <button
                onClick={() => { setSearchQuery(''); sound.playClick(); }}
                title="Clear"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '11px',
                  padding: '0 2px'
                }}>
                ✕
              </button>
            </div>
          )}
        </div>

        {/* HUD Controls Overlay with Zoom Percentage */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '6px'
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
    </div>

      {/* Comprehensive Legend Table / Panel (Màu Border & Trạng Thái) */}
      <div 
        className="legend-box"
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          backgroundColor: 'var(--bg-surface)',
          backdropFilter: 'blur(8px)',
          border: '2px solid var(--border-color)',
          padding: isLegendExpanded ? '10px 12px' : '6px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          fontSize: '0.74em',
          fontFamily: 'var(--font-mono)',
          zIndex: 50,
          boxShadow: 'var(--card-shadow), 0 4px 16px rgba(0, 0, 0, 0.4)',
          maxWidth: isLegendExpanded ? '310px' : 'auto',
          cursor: isLegendExpanded ? 'default' : 'pointer',
          transition: 'all 0.15s ease'
        }}
        onClick={() => {
          if (!isLegendExpanded) setIsLegendExpanded(true);
        }}>
        {/* Legend Header & Collapse Toggle */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
          borderBottom: isLegendExpanded ? '1px solid var(--border-color)' : 'none',
          paddingBottom: isLegendExpanded ? '4px' : '0'
        }}>
          <div style={{
            fontWeight: 800,
            color: 'var(--accent-gold)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <ThemedIcon name="docs" theme={currentTheme} size={13} color="var(--accent-gold)" />
            <span>{isLegendExpanded ? (lang === 'vi' ? 'CHÚ GIẢI & MÀU VIỀN' : 'LEGEND & BORDER COLORS') : (lang === 'vi' ? 'CHÚ GIẢI MÀU SẮC ▲' : 'COLOR LEGEND ▲')}</span>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); setIsLegendExpanded(!isLegendExpanded); }}
            title={isLegendExpanded ? 'Thu gọn' : 'Mở rộng'}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '11px',
              padding: '0 2px'
            }}>
            {isLegendExpanded ? '▼' : '▲'}
          </button>
        </div>

        {isLegendExpanded && (
          <>
            {/* Section A: Domain Border Colors */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ fontSize: '0.68em', color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '0.04em' }}>
                {lang === 'vi' ? 'MÀU VIỀN CÁC NHÓM CHỦ ĐỀ:' : 'CARD BORDER BY DOMAIN:'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {GAME_DEV_DOMAINS.map(d => {
                  const dColor = getDomainColor(d.id, currentTheme, themeMode);
                  return (
                    <div
                      key={d.id}
                      onClick={() => handleSelectDomain(d.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        padding: '2px 4px',
                        backgroundColor: selectedDomain === d.id ? 'var(--bg-card)' : 'transparent',
                        borderRadius: '2px',
                        transition: 'background 0.1s ease'
                      }}>
                      <span style={{
                        display: 'inline-block',
                        width: '12px',
                        height: '12px',
                        border: `2px solid ${dColor}`,
                        backgroundColor: 'var(--bg-app)',
                        boxShadow: `0 0 4px ${dColor}66`
                      }} />
                      <span style={{ fontWeight: 800, color: dColor, width: '22px' }}>
                        {d.code}
                      </span>
                      <span style={{ color: 'var(--text-main)', flex: 1 }}>
                        {d.shortName[lang]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section B: Progress Status */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '6px'
            }}>
              <div style={{ fontSize: '0.68em', color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '0.04em' }}>
                {lang === 'vi' ? 'TRẠNG THÁI TIẾN ĐỘ:' : 'PROGRESS STATUS:'}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ThemedIcon name="mastered" theme={currentTheme} size={11} color="var(--accent-green)" />
                  <span style={{ color: 'var(--text-muted)' }}>{lang === 'vi' ? 'Đã xong' : 'Mastered'}</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ThemedIcon name="learning" theme={currentTheme} size={11} color="var(--accent-gold)" />
                  <span style={{ color: 'var(--text-muted)' }}>{lang === 'vi' ? 'Đang học' : 'Learning'}</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ThemedIcon name="locked" theme={currentTheme} size={11} color="var(--text-muted)" />
                  <span style={{ color: 'var(--text-muted)' }}>{lang === 'vi' ? 'Khóa' : 'Locked'}</span>
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* SVG Canvas World */}
      <div style={{
        width: '2900px',
        height: '3200px',
        position: 'absolute',
        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
        transformOrigin: '0 0',
        transition: isDragging ? 'none' : 'transform 0.08s ease-out'
      }}>
        {/* Subtle Domain Column Lane Guides */}
        {pillarBanners.map(p => (
          <div
            key={p.domainId}
            style={{
              position: 'absolute',
              left: `${p.x - 12}px`,
              top: '335px',
              width: '344px',
              height: '2800px',
              backgroundColor: selectedDomain === p.domainId ? 'rgba(255, 255, 255, 0.025)' : 'transparent',
              border: selectedDomain === p.domainId ? `1px dashed ${p.color}` : '1px dashed rgba(255, 255, 255, 0.04)',
              borderRadius: '2px',
              pointerEvents: 'none',
              transition: 'all 0.2s ease'
            }}
          />
        ))}

        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {connections.map(conn => {
            const dx = conn.to.x - conn.from.x;
            const dy = conn.to.y - conn.from.y;
            const pathData = `M ${conn.from.x} ${conn.from.y} C ${conn.from.x} ${conn.from.y + dy * 0.5}, ${conn.to.x} ${conn.to.y - dy * 0.5}, ${conn.to.x} ${conn.to.y}`;
            const strokeColor = conn.status === 'mastered' 
              ? 'var(--accent-green)' 
              : (conn.status === 'learning' ? 'var(--accent-gold)' : 'var(--border-color)');

            const isDomainMatch = selectedDomain === 'all' || 
                                  selectedDomain === conn.childCategory || 
                                  (selectedDomain === 'boss' && (conn.childCategory === 'boss' || conn.childCategory === 'production'));

            const isConnSearchMatch = !isSearchActive || (searchResultsMap.has(conn.childId) || searchResultsMap.has(conn.parentId));

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
                  opacity: isDomainMatch && isConnSearchMatch ? (conn.status === 'locked' ? 0.4 : 0.85) : 0.08,
                  transition: 'opacity 0.2s ease'
                }}
              />
            );
          })}
        </svg>

        {/* Root Nexus Banner */}
        <div style={{
          position: 'absolute',
          left: '1220px',
          top: '8px',
          width: '320px',
          textAlign: 'center',
          pointerEvents: 'none'
        }}>
          <span style={{
            fontSize: '0.72em',
            fontFamily: 'var(--font-display)',
            color: getDomainColor('root', currentTheme, themeMode),
            letterSpacing: '0.08em',
            backgroundColor: 'var(--bg-card)',
            padding: '3px 12px',
            border: `1px solid ${getDomainColor('root', currentTheme, themeMode)}`,
            display: 'inline-block'
          }}>
            00. NEXUS FOUNDATIONS
          </span>
        </div>

        {/* Domain Pillar Banners on Canvas */}
        {pillarBanners.map(p => {
          const isFocused = selectedDomain === 'all' || selectedDomain === p.domainId;
          return (
            <div
              key={p.domainId}
              className="domain-banner"
              onClick={() => handleSelectDomain(p.domainId)}
              style={{
                position: 'absolute',
                left: `${p.x}px`,
                top: `${p.y}px`,
                width: '320px',
                backgroundColor: 'var(--bg-surface)',
                border: `2px solid ${p.color}`,
                padding: '8px 12px',
                boxShadow: isFocused ? `0 0 14px ${p.color}44` : 'none',
                opacity: isFocused ? 1 : 0.35,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                userSelect: 'none',
                zIndex: 2
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                <ThemedIcon name={p.icon} theme={currentTheme} size={15} color={p.color} />
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.74em',
                  fontWeight: 800,
                  color: p.color,
                  letterSpacing: '0.03em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {p.title[lang]}
                </span>
              </div>
              <div style={{
                fontSize: '0.68em',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {p.subtitle[lang]}
              </div>
            </div>
          );
        })}

        {/* Node Cards (Domain Color shown on BORDER) */}
        {skills.map(skill => {
          const isMastered = skill.status === 'mastered';
          const isLearning = skill.status === 'learning';
          const isLocked = skill.status === 'locked';

          // Domain defines the card border color (dynamically theme & mode aware)
          const domain = getDomainForCategory(skill.category);
          const domainBorderColor = getDomainColor(skill.category, currentTheme, themeMode);

          const matchResult = searchResultsMap.get(skill.id);
          const isSearchMatch = !isSearchActive || !!matchResult;
          const isCurrentMatch = isSearchActive && matchingSkills[currentMatchIndex]?.id === skill.id;

          const isDomainMatch = selectedDomain === 'all' || 
                                selectedDomain === skill.category || 
                                (selectedDomain === 'boss' && (skill.category === 'boss' || skill.category === 'production')) ||
                                (skill.category === 'root');

          const isVisible = isDomainMatch && isSearchMatch;

          const glow = isCurrentMatch
            ? `0 0 24px ${domainBorderColor}, 0 0 10px #ffffff, inset 0 0 8px ${domainBorderColor}66`
            : (isSearchActive && matchResult
                ? `0 0 18px ${domainBorderColor}bb`
                : (isDomainMatch 
                    ? (isMastered ? `0 0 12px rgba(74, 222, 128, 0.4)` : `0 0 8px ${domainBorderColor}44`) 
                    : 'none'));

          const cardOpacity = isVisible ? 1 : (isSearchActive ? 0.08 : 0.22);
          const cardY = getSkillY(skill);

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
                top: `${cardY}px`,
                border: isCurrentMatch ? `2px solid #ffffff` : `2px solid ${domainBorderColor}`,
                boxShadow: glow,
                opacity: cardOpacity,
                transition: 'opacity 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease'
              }}>
              
              {/* Full-Text Search Match Badge */}
              {isSearchActive && matchResult && (
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '8px',
                  backgroundColor: isCurrentMatch ? 'var(--btn-active-bg)' : 'var(--bg-card)',
                  color: isCurrentMatch ? 'var(--btn-active-text)' : domainBorderColor,
                  border: `1px solid ${domainBorderColor}`,
                  fontSize: '0.62em',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  padding: '1px 6px',
                  boxShadow: `0 0 6px ${domainBorderColor}66`,
                  letterSpacing: '0.04em',
                  zIndex: 3
                }}>
                  {isCurrentMatch ? '★ ' : ''}MATCH: {matchResult.matchField?.toUpperCase()}
                </div>
              )}
              
              {/* Header Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="node-card-badge" style={{
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  color: domainBorderColor
                }}>
                  TIER {skill.tier}
                </span>

                <span className="node-card-badge" style={{
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: isMastered ? 'var(--accent-green)' : (isLearning ? 'var(--accent-gold)' : 'var(--text-muted)')
                }}>
                  {isMastered && <ThemedIcon name="mastered" theme={currentTheme} size={12} color="var(--accent-green)" />}
                  {isLearning && <ThemedIcon name="learning" theme={currentTheme} size={12} color="var(--accent-gold)" />}
                  {isLocked && <ThemedIcon name="locked" theme={currentTheme} size={12} color="var(--text-muted)" />}
                  {isMastered ? (lang === 'vi' ? 'ĐÃ LĨNH HỘI' : 'MASTERED') : (isLearning ? (lang === 'vi' ? 'ĐANG HỌC' : 'LEARNING') : (lang === 'vi' ? 'KHÓA' : 'LOCKED'))}
                </span>
              </div>

              {/* Title with Category Icon */}
              <h3 className="node-card-title">
                <ThemedIcon name={getCategoryIcon(skill.category)} theme={currentTheme} size={15} color={domainBorderColor} />
                <span>{skill.title[lang]}</span>
              </h3>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                <span className="node-card-tag" style={{ color: domainBorderColor, borderColor: `${domainBorderColor}55` }}>
                  {domain.code}
                </span>
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
                  <span>{domain.shortName[lang].toUpperCase()}</span>
                  <span style={{ fontWeight: 700, color: domainBorderColor }}>
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
                    backgroundColor: isMastered ? 'var(--accent-green)' : domainBorderColor,
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
