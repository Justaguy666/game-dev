import React, { useState, useEffect } from 'react';
import { SkillNode, Language, ThemeId } from '../types';
import { sound } from '../soundEngine';
import { marked } from 'marked';
import { ThemedIcon } from './ThemedIcon';
import { GAME_DEV_DOMAINS, getDomainForCategory, DomainId } from '../data/categories';

interface DocumentReaderViewProps {
  skills: SkillNode[];
  selectedSkillId: string | null;
  onSelectSkillId: (id: string) => void;
  onUpdateSkill: (updated: SkillNode) => void;
  lang: Language;
  currentTheme: ThemeId;
}

export const DocumentReaderView: React.FC<DocumentReaderViewProps> = ({
  skills,
  selectedSkillId,
  onSelectSkillId,
  onUpdateSkill,
  lang,
  currentTheme
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<DomainId | 'all'>('all');
  const [collapsedDomains, setCollapsedDomains] = useState<Record<string, boolean>>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);

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

  // Filter skills by search query
  const searchFilteredSkills = skills.filter(s => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return s.title[lang].toLowerCase().includes(q) || 
           s.tags.some(t => t.toLowerCase().includes(q)) ||
           s.summary[lang].toLowerCase().includes(q);
  });

  // Group skills into domains
  const domainGroups = GAME_DEV_DOMAINS.map(domain => {
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

  const activeDomain = activeSkill ? getDomainForCategory(activeSkill.category) : GAME_DEV_DOMAINS[0];

  return (
    <div style={{
      display: 'flex',
      height: 'calc(100vh - 65px)',
      overflow: 'hidden'
    }}>
      {/* Sidebar List */}
      <aside style={{
        width: '360px',
        backgroundColor: 'var(--bg-surface)',
        borderRight: '2px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0
      }}>
        {/* Domain Filter Pills Bar */}
        <div style={{
          padding: '10px 12px 6px 12px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          backgroundColor: 'var(--bg-card)'
        }}>
          <button
            onClick={() => { sound.playTab(); setSelectedDomain('all'); }}
            style={{
              padding: '3px 8px',
              fontSize: '0.72em',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              cursor: 'pointer',
              border: `1px solid ${selectedDomain === 'all' ? 'var(--accent-gold)' : 'var(--border-color)'}`,
              backgroundColor: selectedDomain === 'all' ? 'var(--accent-gold)' : 'var(--bg-app)',
              color: selectedDomain === 'all' ? '#111' : 'var(--text-main)',
              transition: 'all 0.12s ease'
            }}>
            {lang === 'vi' ? 'Tất cả' : 'All'} ({skills.length})
          </button>
          {GAME_DEV_DOMAINS.map(d => {
            const isSelected = selectedDomain === d.id;
            return (
              <button
                key={d.id}
                onClick={() => { sound.playTab(); setSelectedDomain(d.id); }}
                style={{
                  padding: '3px 7px',
                  fontSize: '0.72em',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: `1px solid ${isSelected ? d.colorVar : 'var(--border-color)'}`,
                  backgroundColor: isSelected ? d.colorVar : 'var(--bg-app)',
                  color: isSelected ? '#111' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.12s ease'
                }}>
                <ThemedIcon name={d.iconName} theme={currentTheme} size={11} color={isSelected ? '#111' : d.colorVar} />
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
              placeholder={lang === 'vi' ? 'Tìm bài viết, mã lỗi, tag...' : 'Search docs, concepts, tags...'}
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
              <button
                onClick={() => setSearchQuery('')}
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
            <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85em' }}>
              {lang === 'vi' ? 'Không tìm thấy tài liệu phù hợp' : 'No documents match your search'}
            </div>
          ) : (
            domainGroups.map(({ domain, skills: groupSkills }) => {
              const isCollapsed = !!collapsedDomains[domain.id];
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
                      borderLeft: `4px solid ${domain.colorVar}`,
                      cursor: 'pointer',
                      userSelect: 'none',
                      transition: 'background 0.12s ease'
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ThemedIcon name={domain.iconName} theme={currentTheme} size={14} color={domain.colorVar} />
                      <span style={{
                        fontSize: '0.78em',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        color: 'var(--text-main)'
                      }}>
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
                              borderLeft: isSelected ? `3px solid ${domain.colorVar}` : '3px solid transparent',
                              cursor: 'pointer',
                              transition: 'all 0.12s ease'
                            }}>
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
          padding: '10px 20px',
          borderBottom: '2px solid var(--border-color)',
          backgroundColor: 'var(--bg-surface)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.74em',
              fontFamily: 'var(--font-mono)',
              padding: '3px 8px',
              backgroundColor: 'var(--bg-card)',
              border: `1px solid ${activeDomain.colorVar}`,
              color: activeDomain.colorVar,
              fontWeight: 800
            }}>
              <ThemedIcon name={activeDomain.iconName} theme={currentTheme} size={12} color={activeDomain.colorVar} />
              <span>{activeDomain.code} {activeDomain.shortName[lang]}</span>
            </span>

            <span style={{ color: 'var(--text-dim)', fontSize: '0.8em' }}>/</span>

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
                  color: '#111',
                  border: 'none',
                  padding: '6px 14px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.80em',
                  cursor: 'pointer'
                }}>
                <ThemedIcon name="save" theme={currentTheme} size={14} color="#111" />
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

        {/* Document Content View / Edit */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px 36px' }}>
          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                width: '100%',
                height: '100%',
                minHeight: '500px',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-color)',
                padding: '18px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.92em',
                lineHeight: 1.6,
                outline: 'none',
                resize: 'none'
              }}
            />
          ) : (
            <div
              className="markdown-body"
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
            />
          )}
        </div>
      </main>
    </div>
  );
};
