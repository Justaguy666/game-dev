import React, { useState } from 'react';
import { SkillNode, Language, ThemeId } from '../types';
import { sound } from '../soundEngine';
import { ThemedIcon } from './ThemedIcon';
import { ThemedCheckbox } from './ThemedCheckbox';
import { GAME_DEV_DOMAINS, getDomainForCategory, DomainId } from '../data/categories';

interface QuestsViewProps {
  skills: SkillNode[];
  onToggleObjective: (skillId: string, objId: string) => void;
  onOpenSkill: (skill: SkillNode) => void;
  lang: Language;
  currentTheme: ThemeId;
}

export const QuestsView: React.FC<QuestsViewProps> = ({
  skills,
  onToggleObjective,
  onOpenSkill,
  lang,
  currentTheme
}) => {
  const [selectedDomain, setSelectedDomain] = useState<DomainId | 'all'>('all');
  const [collapsedDomains, setCollapsedDomains] = useState<Record<string, boolean>>({});

  // Global objectives statistics
  const allObjectives = skills.flatMap(s => 
    s.objectives.map(obj => ({
      skill: s,
      objective: obj
    }))
  );

  const completedCount = allObjectives.filter(item => item.objective.completed).length;
  const totalCount = allObjectives.length;
  const globalPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const totalExpEarned = skills.reduce((sum, s) => sum + s.exp, 0);
  const totalExpPossible = skills.reduce((sum, s) => sum + s.maxExp, 0);

  const toggleDomainCollapse = (domainId: string) => {
    sound.playClick();
    setCollapsedDomains(prev => ({
      ...prev,
      [domainId]: !prev[domainId]
    }));
  };

  // Group skills by domain
  const domainGroups = GAME_DEV_DOMAINS.map(domain => {
    const domainSkills = skills.filter(skill => {
      if (domain.id === 'root') return skill.category === 'root';
      if (domain.id === 'boss') return skill.category === 'boss' || skill.category === 'production';
      return skill.category === domain.id;
    });

    const domainObjectives = domainSkills.flatMap(s => s.objectives);
    const domainCompleted = domainObjectives.filter(o => o.completed).length;
    const domainTotal = domainObjectives.length;
    const domainPercent = domainTotal > 0 ? Math.round((domainCompleted / domainTotal) * 100) : 0;

    return {
      domain,
      skills: domainSkills,
      objectives: domainObjectives,
      completedCount: domainCompleted,
      totalCount: domainTotal,
      percent: domainPercent
    };
  });

  const filteredGroups = selectedDomain === 'all'
    ? domainGroups
    : domainGroups.filter(g => g.domain.id === selectedDomain);

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '28px 20px 60px 20px',
      fontFamily: 'var(--font-mono)'
    }}>
      {/* 1. Header Banner */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '2px solid var(--border-color)',
        padding: '22px 24px',
        boxShadow: 'var(--card-shadow)',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ThemedIcon name="quests" theme={currentTheme} size={24} color="var(--accent-gold)" />
            <h1 style={{
              fontSize: '1.25em',
              fontFamily: 'var(--font-display)',
              color: 'var(--accent-gold)',
              letterSpacing: '0.04em'
            }}>
              {lang === 'vi' ? 'BẢNG NHIỆM VỤ THEO CHỦ ĐỀ' : 'GAME DEV QUEST LOG BY DOMAIN'}
            </h1>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.80em',
            fontFamily: 'var(--font-mono)',
            backgroundColor: 'var(--bg-app)',
            padding: '4px 10px',
            border: '1px solid var(--border-color)'
          }}>
            <span style={{ color: 'var(--text-muted)' }}>{lang === 'vi' ? 'TỔNG EXP:' : 'TOTAL EXP:'}</span>
            <span style={{ fontWeight: 800, color: 'var(--accent-gold)' }}>
              {totalExpEarned} / {totalExpPossible} XP
            </span>
          </div>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.86em', marginBottom: '16px', lineHeight: 1.5 }}>
          {lang === 'vi' 
            ? 'Hoàn thành các mục tiêu thực hành theo 7 nhóm lĩnh vực phát triển game để tích lũy EXP, làm chủ các nguyên lý công học độc lập với engine.' 
            : 'Complete practical milestones across the 7 game development domains to accumulate EXP and master tool-agnostic engineering craft.'}
        </p>

        {/* Global Progress Bar */}
        <div style={{
          height: '24px',
          backgroundColor: 'var(--bg-app)',
          border: '2px solid var(--border-color)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${globalPercent}%`,
            height: '100%',
            backgroundColor: 'var(--accent-green)',
            transition: 'width 0.4s ease'
          }} />
          <span style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            fontWeight: 800,
            color: 'var(--btn-active-text)',
            letterSpacing: '0.04em'
          }}>
            {completedCount} / {totalCount} {lang === 'vi' ? 'NHIỆM VỤ HOÀN THÀNH' : 'QUESTS COMPLETED'} ({globalPercent}%)
          </span>
        </div>
      </div>

      {/* 2. Domain Filter Navigation Bar */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        padding: '8px 12px',
        boxShadow: 'var(--card-shadow)',
        marginBottom: '24px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px'
      }}>
        {/* All Domains Tab */}
        <button
          onClick={() => { sound.playTab(); setSelectedDomain('all'); }}
          style={{
            padding: '5px 12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78em',
            fontWeight: selectedDomain === 'all' ? 800 : 700,
            cursor: 'pointer',
            backgroundColor: selectedDomain === 'all' ? 'var(--btn-active-bg)' : 'var(--bg-card)',
            color: selectedDomain === 'all' ? 'var(--btn-active-text)' : 'var(--text-main)',
            border: `1px solid ${selectedDomain === 'all' ? 'var(--btn-active-bg)' : 'var(--border-color)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.12s ease'
          }}>
          <ThemedIcon
            name="tree"
            theme={currentTheme}
            size={13}
            color={selectedDomain === 'all' ? 'var(--btn-active-text)' : 'var(--accent-gold)'}
          />
          <span>{lang === 'vi' ? 'Tất Cả Nhóm' : 'All Domains'} ({completedCount}/{totalCount})</span>
        </button>

        {/* Individual Domain Tabs */}
        {domainGroups.map(group => {
          const isSelected = selectedDomain === group.domain.id;
          return (
            <button
              key={group.domain.id}
              onClick={() => { sound.playTab(); setSelectedDomain(group.domain.id); }}
              style={{
                padding: '5px 10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78em',
                fontWeight: isSelected ? 800 : 700,
                cursor: 'pointer',
                backgroundColor: isSelected ? 'var(--btn-active-bg)' : 'var(--bg-card)',
                color: isSelected ? 'var(--btn-active-text)' : 'var(--text-muted)',
                border: `1px solid ${isSelected ? 'var(--btn-active-bg)' : 'var(--border-color)'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.12s ease'
              }}>
              <span style={{
                display: 'inline-block',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: isSelected ? 'var(--btn-active-text)' : group.domain.accentHex
              }} />
              <ThemedIcon
                name={group.domain.iconName}
                theme={currentTheme}
                size={12}
                color={isSelected ? 'var(--btn-active-text)' : group.domain.accentHex}
              />
              <span>{group.domain.code} {group.domain.shortName[lang]} ({group.completedCount}/{group.totalCount})</span>
            </button>
          );
        })}
      </div>

      {/* 3. Grouped Domain Quest Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {filteredGroups.map(group => {
          const isCollapsed = !!collapsedDomains[group.domain.id];
          const hasObjectives = group.objectives.length > 0;

          return (
            <div
              key={group.domain.id}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: `2px solid ${group.domain.accentHex}`,
                boxShadow: 'var(--card-shadow)',
                overflow: 'hidden',
                transition: 'all 0.15s ease'
              }}>
              {/* Domain Header Banner (Click to toggle collapse) */}
              <div
                onClick={() => toggleDomainCollapse(group.domain.id)}
                style={{
                  padding: '14px 18px',
                  backgroundColor: 'var(--bg-card)',
                  borderBottom: isCollapsed ? 'none' : '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: 'var(--bg-app)',
                    border: `1px solid ${group.domain.accentHex}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <ThemedIcon
                      name={group.domain.iconName}
                      theme={currentTheme}
                      size={17}
                      color={group.domain.accentHex}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        fontSize: '0.85em',
                        color: group.domain.accentHex,
                        backgroundColor: 'var(--bg-app)',
                        padding: '1px 6px',
                        border: `1px solid ${group.domain.accentHex}66`
                      }}>
                        {group.domain.code}
                      </span>
                      <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.96em',
                        color: 'var(--text-main)',
                        margin: 0
                      }}>
                        {group.domain.name[lang]}
                      </h2>
                    </div>
                    <p style={{
                      margin: '3px 0 0 0',
                      fontSize: '0.78em',
                      color: 'var(--text-muted)'
                    }}>
                      {group.domain.description[lang]}
                    </p>
                  </div>
                </div>

                {/* Right Progress Readout & Collapse Indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75em', fontWeight: 800, color: group.domain.accentHex }}>
                      {group.completedCount} / {group.totalCount} {lang === 'vi' ? 'Xong' : 'Done'} ({group.percent}%)
                    </div>
                    <div style={{
                      width: '100px',
                      height: '6px',
                      backgroundColor: 'var(--bg-app)',
                      border: '1px solid var(--border-color)',
                      marginTop: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${group.percent}%`,
                        height: '100%',
                        backgroundColor: group.percent === 100 ? 'var(--accent-green)' : group.domain.accentHex,
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>

                  <span style={{
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    padding: '4px 6px',
                    backgroundColor: 'var(--bg-app)',
                    border: '1px solid var(--border-color)'
                  }}>
                    {isCollapsed ? '▼' : '▲'}
                  </span>
                </div>
              </div>

              {/* Domain Skill Quests List */}
              {!isCollapsed && (
                <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {!hasObjectives && (
                    <div style={{
                      padding: '16px',
                      textAlign: 'center',
                      color: 'var(--text-muted)',
                      fontSize: '0.85em',
                      backgroundColor: 'var(--bg-app)',
                      border: '1px dashed var(--border-color)'
                    }}>
                      {lang === 'vi' 
                        ? 'Chưa có nhiệm vụ nào trong nhóm lĩnh vực này.' 
                        : 'No active quest objectives currently registered in this domain.'}
                    </div>
                  )}

                  {group.skills.map(skill => {
                    if (skill.objectives.length === 0) return null;
                    const isMastered = skill.status === 'mastered';
                    const isLearning = skill.status === 'learning';

                    return (
                      <div
                        key={skill.id}
                        style={{
                          backgroundColor: 'var(--bg-app)',
                          border: '1px solid var(--border-color)',
                          padding: '14px 16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px'
                        }}>
                        {/* Skill Card Header */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderBottom: '1px dashed var(--border-color)',
                          paddingBottom: '8px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{
                              fontSize: '0.74em',
                              fontFamily: 'var(--font-mono)',
                              fontWeight: 800,
                              color: group.domain.accentHex,
                              backgroundColor: 'var(--bg-card)',
                              padding: '2px 6px',
                              border: `1px solid ${group.domain.accentHex}55`
                            }}>
                              TIER {skill.tier}
                            </span>

                            <span
                              onClick={() => { sound.playClick(); onOpenSkill(skill); }}
                              title={lang === 'vi' ? 'Bấm để mở bài đọc lý thuyết đầy đủ' : 'Click to open full documentation'}
                              style={{
                                color: 'var(--text-main)',
                                fontWeight: 800,
                                fontSize: '0.92em',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                textDecorationColor: `${group.domain.accentHex}88`
                              }}>
                              {skill.title[lang]}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{
                              fontSize: '0.74em',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              color: isMastered ? 'var(--accent-green)' : (isLearning ? 'var(--accent-gold)' : 'var(--text-muted)'),
                              fontWeight: 700
                            }}>
                              <ThemedIcon
                                name={isMastered ? 'mastered' : (isLearning ? 'learning' : 'locked')}
                                theme={currentTheme}
                                size={12}
                                color={isMastered ? 'var(--accent-green)' : (isLearning ? 'var(--accent-gold)' : 'var(--text-muted)')}
                              />
                              <span>
                                {isMastered ? (lang === 'vi' ? 'Đã Xong' : 'Mastered') : (isLearning ? (lang === 'vi' ? 'Đang Học' : 'Learning') : (lang === 'vi' ? 'Khóa' : 'Locked'))}
                              </span>
                            </span>

                            <button
                              onClick={() => { sound.playClick(); onOpenSkill(skill); }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                backgroundColor: 'var(--bg-card)',
                                color: group.domain.accentHex,
                                border: `1px solid ${group.domain.accentHex}`,
                                padding: '3px 8px',
                                fontSize: '0.72em',
                                fontFamily: 'var(--font-mono)',
                                fontWeight: 800,
                                cursor: 'pointer',
                                transition: 'all 0.12s ease'
                              }}>
                              <ThemedIcon name="open" theme={currentTheme} size={11} color={group.domain.accentHex} />
                              <span>{lang === 'vi' ? 'Mở Bài Đọc' : 'Open Docs'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Objectives List */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                          {skill.objectives.map(obj => (
                            <div
                              key={obj.id}
                              style={{
                                backgroundColor: 'var(--bg-surface)',
                                padding: '8px 12px',
                                border: '1px solid var(--border-color)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                transition: 'background 0.12s ease'
                              }}>
                              <ThemedCheckbox
                                checked={obj.completed}
                                onChange={() => onToggleObjective(skill.id, obj.id)}
                                theme={currentTheme}
                                label={
                                  <span style={{
                                    color: obj.completed ? 'var(--text-muted)' : 'var(--text-main)',
                                    textDecoration: obj.completed ? 'line-through' : 'none',
                                    fontWeight: obj.completed ? 500 : 700,
                                    fontSize: '0.90em'
                                  }}>
                                    {obj.text[lang]}
                                  </span>
                                }
                              />

                              <span style={{
                                fontSize: '0.72em',
                                fontFamily: 'var(--font-mono)',
                                color: obj.completed ? 'var(--accent-green)' : 'var(--text-muted)',
                                fontWeight: 700,
                                flexShrink: 0,
                                marginLeft: '12px'
                              }}>
                                {obj.completed ? '✓ +XP' : `+${Math.round(skill.maxExp / skill.objectives.length)} XP`}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
