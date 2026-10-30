import React, { useState, useEffect, useMemo } from 'react';
import { SkillNode, Language, ThemeId, ThemeMode, PlaygroundMode } from '../types';
import { sound } from '../soundEngine';
import { marked } from 'marked';
import { ThemedIcon } from './ThemedIcon';
import { GAME_DEV_DOMAINS, getDomainForCategory, getDomainColor, DomainId } from '../data/categories';
import { matchSkillFullText, SearchMatchResult } from '../utils/search';

interface DocumentReaderViewProps {
  skills: SkillNode[];
  selectedSkillId: string | null;
  onSelectSkillId: (id: string) => void;
  onUpdateSkill: (updated: SkillNode) => void;
  lang: Language;
  currentTheme: ThemeId;
  themeMode: ThemeMode;
  onOpenPhysicsLab?: (mode?: PlaygroundMode) => void;
}

export const DocumentReaderView: React.FC<DocumentReaderViewProps> = ({
  skills,
  selectedSkillId,
  onSelectSkillId,
  onUpdateSkill,
  lang,
  currentTheme,
  themeMode,
  onOpenPhysicsLab
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<DomainId | 'all'>('all');
  const [collapsedDomains, setCollapsedDomains] = useState<Record<string, boolean>>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => window.innerWidth > 768);

  const activeSkill = skills.find(s => s.id === selectedSkillId) || skills[0];
  const [content, setContent] = useState<string>(activeSkill?.content[lang] || '');

  // Keep content in sync when activeSkill or lang changes
  useEffect(() => {
    if (activeSkill) {
      setContent(activeSkill.content[lang]);
      setIsEditing(false);
    }
  }, [activeSkill?.id, lang]);

  const toggleDomainCollapse = (domainId: string) => {
    sound.playClick();
    setCollapsedDomains(prev => ({
      ...prev,
      [domainId]: !prev[domainId]
    }));
  };

  const handleSave = () => {
    if (!activeSkill) return;
    sound.playSave();
    const updated = {
      ...activeSkill,
      content: { ...activeSkill.content, [lang]: content }
    };
    onUpdateSkill(updated);
    setIsEditing(false);
  };

  const handleExport = () => {
    if (!activeSkill) return;
    sound.playClick();
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeSkill.id}_${lang}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderedHtml = marked.parse(content) as string;

  // Full-Text search across title, markdown content, tags, objectives, and summary
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

  const searchFilteredSkills = useMemo(() => {
    if (!searchQuery.trim()) return skills;
    return skills.filter(s => searchResultsMap.has(s.id));
  }, [skills, searchQuery, searchResultsMap]);

  // Group skills into domains
  const domainGroups = useMemo(() => {
    return GAME_DEV_DOMAINS.map(domain => {
      const domainSkills = searchFilteredSkills.filter(s => {
        if (domain.id === 'boss') {
          return s.category === 'boss' || s.category === 'production';
        }
        return s.category === domain.id;
      });
      return {
        domain,
        skills: domainSkills
      };
    }).filter(group => {
      if (selectedDomain === 'all') return group.skills.length > 0;
      return group.domain.id === selectedDomain;
    });
  }, [searchFilteredSkills, selectedDomain]);

  const activeDomain = activeSkill ? getDomainForCategory(activeSkill.category) : GAME_DEV_DOMAINS[0];

  return (
    <div style={{
      display: 'flex',
      height: 'calc(100vh - 65px)',
      overflow: 'hidden'
    }}>
      {/* Sidebar List (Responsive Drawer / Panel) */}
      {isSidebarOpen && (
        <aside style={{
          width: '350px',
          maxWidth: '85vw',
          backgroundColor: 'var(--bg-surface)',
          borderRight: '2px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          zIndex: 40,
          animation: 'fadeIn 0.12s ease-out'
        }}>
          {/* Domain Filter Pills Bar (Responsive Horizontal Scroll) */}
          <div style={{
            padding: '10px 12px 6px 12px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            gap: '4px',
            backgroundColor: 'var(--bg-card)'
          }}>
            <button
              onClick={() => { sound.playTab(); setSelectedDomain('all'); }}
              style={{
                padding: '3px 8px',
                fontSize: '0.72em',
                fontFamily: 'var(--font-mono)',
                fontWeight: selectedDomain === 'all' ? 800 : 700,
                cursor: 'pointer',
                border: `1px solid ${selectedDomain === 'all' ? 'var(--btn-active-bg)' : 'var(--border-color)'}`,
                backgroundColor: selectedDomain === 'all' ? 'var(--btn-active-bg)' : 'var(--bg-app)',
                color: selectedDomain === 'all' ? 'var(--btn-active-text)' : 'var(--text-main)',
                flexShrink: 0,
                transition: 'all 0.12s ease'
              }}>
              {lang === 'vi' ? 'Tất cả' : 'All'} ({skills.length})
            </button>
            {GAME_DEV_DOMAINS.map(d => {
              const isSelected = selectedDomain === d.id;
              const dColor = getDomainColor(d.id, currentTheme, themeMode);
              return (
                <button
                  key={d.id}
                  onClick={() => { sound.playTab(); setSelectedDomain(d.id); }}
                  style={{
                    padding: '3px 7px',
                    fontSize: '0.72em',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: isSelected ? 800 : 700,
                    cursor: 'pointer',
                    border: `1px solid ${isSelected ? 'var(--btn-active-bg)' : 'var(--border-color)'}`,
                    backgroundColor: isSelected ? 'var(--btn-active-bg)' : 'var(--bg-app)',
                    color: isSelected ? 'var(--btn-active-text)' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    flexShrink: 0,
                    transition: 'all 0.12s ease'
                  }}>
                  <span style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? 'var(--btn-active-text)' : dColor
                  }} />
                  <ThemedIcon name={d.iconName} theme={currentTheme} size={11} color={isSelected ? 'var(--btn-active-text)' : dColor} />
                  <span>{d.code}</span>
                </button>
              );
            })}
          </div>

        {/* Search Input */}
        <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--bg-app)',
            border: '1px solid var(--border-color)',
            padding: '6px 10px'
          }}>
            <ThemedIcon name="search" theme={currentTheme} size={14} color="var(--text-muted)" />
            <input
              type="text"
              placeholder={lang === 'vi' ? 'Tìm full-text, code, tag, nội dung...' : 'Full-text search, code, tags, docs...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                color: 'var(--text-main)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82em',
                width: '100%'
              }}
            />
            {searchQuery && (
              <span style={{
                fontSize: '0.68em',
                backgroundColor: 'var(--bg-card)',
                padding: '2px 5px',
                border: '1px solid var(--border-color)',
                color: 'var(--accent-gold)',
                whiteSpace: 'nowrap'
              }}>
                {searchFilteredSkills.length}
              </span>
            )}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                title="Clear"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}>
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Domain Grouped Accordion List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
          {domainGroups.length === 0 ? (
            <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85em' }}>
              {lang === 'vi' ? 'Không tìm thấy tài liệu phù hợp' : 'No documents match your search'}
            </div>
          ) : (
            domainGroups.map(({ domain, skills: groupSkills }) => {
              const isCollapsed = !!collapsedDomains[domain.id];
              const dColor = getDomainColor(domain.id, currentTheme, themeMode);
              return (
                <div key={domain.id} style={{ marginBottom: '10px' }}>
                  {/* Domain Folder Header */}
                  <div
                    onClick={() => toggleDomainCollapse(domain.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderLeft: `4px solid ${dColor}`,
                      cursor: 'pointer',
                      userSelect: 'none',
                      transition: 'background 0.12s ease'
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ThemedIcon name={domain.iconName} theme={currentTheme} size={14} color={dColor} />
                      <span style={{
                        fontSize: '0.78em',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        color: 'var(--text-main)'
                      }}>
                        <span style={{ color: dColor, marginRight: '5px' }}>{domain.code}.</span>
                        {domain.name[lang]}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{
                        fontSize: '0.70em',
                        fontFamily: 'var(--font-mono)',
                        padding: '1px 5px',
                        backgroundColor: 'var(--bg-app)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border-color)'
                      }}>
                        {groupSkills.length}
                      </span>
                      <span style={{
                        fontSize: '9px',
                        color: 'var(--text-muted)',
                        transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.15s ease'
                      }}>
                        ▼
                      </span>
                    </div>
                  </div>

                  {/* Documents within Domain */}
                  {!isCollapsed && (
                    <div style={{
                      paddingLeft: '6px',
                      marginTop: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}>
                      {groupSkills.map(skill => {
                        const isSelected = skill.id === activeSkill?.id;
                        const isMastered = skill.status === 'mastered';
                        const isLearning = skill.status === 'learning';
                        const matchInfo = searchResultsMap.get(skill.id);

                        const statusBorder = isMastered 
                          ? 'var(--accent-green)' 
                          : (isLearning ? 'var(--accent-gold)' : 'var(--border-color)');

                        return (
                          <div
                            key={skill.id}
                            onClick={() => {
                              sound.playClick();
                              onSelectSkillId(skill.id);
                            }}
                            onMouseEnter={() => sound.playHover()}
                            style={{
                              padding: '8px 10px',
                              backgroundColor: isSelected ? 'var(--bg-app)' : 'transparent',
                              border: isSelected ? `1px solid ${statusBorder}` : '1px solid transparent',
                              borderLeft: isSelected ? `3px solid ${dColor}` : '3px solid transparent',
                              cursor: 'pointer',
                              transition: 'all 0.12s ease'
                            }}>
                            {/* Fulltext Match Field & Snippet */}
                            {matchInfo && matchInfo.snippet && searchQuery.trim() && (
                              <div style={{
                                fontSize: '0.68em',
                                color: 'var(--accent-gold)',
                                fontStyle: 'italic',
                                marginBottom: '2px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}>
                                ↳ {matchInfo.matchField?.toUpperCase()}: "{matchInfo.snippet}"
                              </div>
                            )}
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: '3px'
                            }}>
                              <span style={{
                                fontSize: '0.82em',
                                fontWeight: isSelected ? 800 : 600,
                                color: isSelected ? 'var(--accent-gold)' : 'var(--text-main)',
                                lineHeight: 1.3
                              }}>
                                {skill.title[lang]}
                              </span>
                            </div>

                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              fontSize: '0.70em',
                              fontFamily: 'var(--font-mono)',
                              color: 'var(--text-muted)'
                            }}>
                              <span>TIER {skill.tier}</span>
                              <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '3px',
                                color: statusBorder,
                                fontWeight: 700
                              }}>
                                {isMastered && <ThemedIcon name="mastered" theme={currentTheme} size={11} color="var(--accent-green)" />}
                                {isLearning && <ThemedIcon name="learning" theme={currentTheme} size={11} color="var(--accent-gold)" />}
                                {skill.status.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </aside>
      )}

      {/* Main Document Content */}
      <main style={{
        flex: 1,
        backgroundColor: 'var(--bg-app)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Document Top Actions Bar with Domain Breadcrumbs */}
        <div style={{
          padding: '12px 24px',
          borderBottom: '2px solid var(--border-color)',
          backgroundColor: 'var(--bg-surface)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {/* Breadcrumbs & Sidebar Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => { sound.playClick(); setIsSidebarOpen(!isSidebarOpen); }}
              title={isSidebarOpen ? 'Thu gọn danh mục bài viết' : 'Mở danh mục bài viết'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 8px',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-color)',
                fontSize: '0.74em',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.12s ease'
              }}>
              <span>☰</span>
              <span>{lang === 'vi' ? (isSidebarOpen ? 'Mục Lục' : 'Mục Lục') : (isSidebarOpen ? 'Index' : 'Index')}</span>
            </button>

            {(() => {
              const domainColor = getDomainColor(activeDomain.id, currentTheme, themeMode);
              return (
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.74em',
                  fontFamily: 'var(--font-mono)',
                  padding: '3px 8px',
                  backgroundColor: 'var(--bg-card)',
                  border: `1px solid ${domainColor}`,
                  color: domainColor,
                  fontWeight: 800
                }}>
                  <ThemedIcon name={activeDomain.iconName} theme={currentTheme} size={12} color={domainColor} />
                  <span>{activeDomain.code} {activeDomain.shortName[lang]}</span>
                </span>
              );
            })()}

            <span style={{ color: 'var(--text-muted)', fontSize: '0.8em' }}>/</span>

            <span style={{
              fontWeight: 800,
              fontSize: '0.92em',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-main)'
            }}>
              {activeSkill?.title[lang]}
            </span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {isEditing ? (
              <button
                onClick={handleSave}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'var(--accent-green)',
                  color: 'var(--btn-active-text)',
                  border: 'none',
                  padding: '6px 14px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.80em',
                  cursor: 'pointer'
                }}>
                <ThemedIcon name="save" theme={currentTheme} size={14} color="var(--btn-active-text)" />
                <span>{lang === 'vi' ? 'Lưu Bài' : 'Save'}</span>
              </button>
            ) : (
              <button
                onClick={() => { sound.playClick(); setIsEditing(true); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border-color)',
                  padding: '6px 12px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.80em',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}>
                <ThemedIcon name="edit" theme={currentTheme} size={13} />
                <span>{lang === 'vi' ? 'Chỉnh Sửa' : 'Edit'}</span>
              </button>
            )}

            <button
              onClick={handleExport}
              title={lang === 'vi' ? 'Tải về tệp Markdown (.md)' : 'Download .md file'}
              style={{
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-color)',
                padding: '6px 10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}>
              <ThemedIcon name="download" theme={currentTheme} size={14} />
            </button>
          </div>
        </div>

        {/* Document Content View / Edit (Centered, comfortable max-width reading column) */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '36px 32px 80px 32px' }}>
          <div style={{
            maxWidth: '920px',
            margin: '0 auto',
            width: '100%',
            padding: '0 24px',
            boxSizing: 'border-box'
          }}>
            {isEditing ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '650px',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border-color)',
                  padding: '24px 28px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.94em',
                  lineHeight: 1.68,
                  outline: 'none',
                  resize: 'vertical',
                  boxShadow: 'var(--card-shadow)'
                }}
              />
            ) : (
              <>
                {/* Physics Interactive Playground Launcher Banner */}
                {onOpenPhysicsLab && (
                  activeSkill?.id === 'prog-math-physics' ||
                  activeSkill?.id === 'design-game-feel' ||
                  activeSkill?.id === 'prog-game-loop' ||
                  activeSkill?.tags.some(t => ['physics', 'math', 'vectors', 'kinematics', 'game-feel', 'movement', 'platformer'].includes(t))
                ) && (
                  <div style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '2px solid var(--accent-gold)',
                    boxShadow: 'var(--card-shadow)',
                    padding: '14px 18px',
                    marginBottom: '26px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '26px' }}>🕹️</span>
                      <div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.84em', color: 'var(--accent-gold)' }}>
                          {lang === 'vi' ? 'MÔ PHỎNG VẬT LÝ TƯƠNG TÁC ĐÃ SẴN SÀNG!' : 'INTERACTIVE PHYSICS LAB AVAILABLE!'}
                        </div>
                        <div style={{ fontSize: '0.78em', color: 'var(--text-dim)', marginTop: '3px' }}>
                          {lang === 'vi'
                            ? 'Trực quan hóa Coyote Time, Jump Buffer, Quỹ đạo Vector và Phản xạ va chạm theo theme hiện tại.'
                            : 'Visualize Coyote Time, Jump Buffer, Vector Ballistics & Elastic Collisions with active theme.'}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        sound.playSelect();
                        const targetMode = activeSkill?.id === 'prog-math-physics' ? 'ballistics' : 'platformer';
                        onOpenPhysicsLab(targetMode);
                      }}
                      style={{
                        backgroundColor: 'var(--btn-active-bg)',
                        color: 'var(--btn-active-text)',
                        border: 'none',
                        padding: '8px 18px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.82em',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                      <span>🧪</span>
                      <span>{lang === 'vi' ? 'Vào Thử Nghiệm Ngay →' : 'Launch in Lab →'}</span>
                    </button>
                  </div>
                )}

                <div
                  className="markdown-body"
                  dangerouslySetInnerHTML={{ __html: renderedHtml }}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
