import React from 'react';
import { SkillNode, Language, ThemeId } from '../types';
import { sound } from '../soundEngine';
import { ThemedIcon } from './ThemedIcon';
import { ThemedCheckbox } from './ThemedCheckbox';

interface QuestsViewProps {
  skills: SkillNode[];
  onToggleObjective: (skillId: string, objId: string) => void;
  onOpenSkill: (skill: SkillNode) => void;
  lang: Language;
  currentTheme: ThemeId;
}

export const QuestsView: React.FC<QuestsViewProps> = ({ skills, onToggleObjective, onOpenSkill, lang, currentTheme }) => {
  const allObjectives = skills.flatMap(s => 
    s.objectives.map(obj => ({
      skill: s,
      objective: obj
    }))
  );

  const completedCount = allObjectives.filter(item => item.objective.completed).length;
  const totalCount = allObjectives.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '32px 20px',
      fontFamily: 'var(--font-mono)'
    }}>
      {/* Header Banner */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '2px solid var(--border-color)',
        padding: '24px',
        boxShadow: 'var(--card-shadow)',
        marginBottom: '28px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <ThemedIcon name="quests" theme={currentTheme} size={24} color="var(--accent-gold)" />
          <h1 style={{
            fontSize: '1.2em',
            fontFamily: 'var(--font-display)',
            color: 'var(--accent-gold)'
          }}>
            {lang === 'vi' ? 'BẢNG NHIỆM VỤ PHÁT TRIỂN GAME' : 'GAME DEV QUEST LOG'}
          </h1>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.88em', marginBottom: '16px' }}>
          {lang === 'vi' 
            ? 'Hoàn thành các mục tiêu thực hành để tăng điểm kinh nghiệm (EXP) và mở khóa các kỹ năng cấp cao.' 
            : 'Complete practical milestone objectives to gain EXP and unlock advanced engineering branches.'}
        </p>

        {/* Progress Bar */}
        <div style={{
          height: '24px',
          backgroundColor: 'var(--bg-app)',
          border: '2px solid var(--border-color)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${percent}%`,
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
            color: '#fff',
            textShadow: '1px 1px 1px #000'
          }}>
            {completedCount} / {totalCount} {lang === 'vi' ? 'NHIỆM VỤ ĐÃ HOÀN THÀNH' : 'QUESTS COMPLETED'} ({percent}%)
          </span>
        </div>
      </div>

      {/* Quest Items by Skill */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {skills.map(skill => {
          if (skill.objectives.length === 0) return null;

          return (
            <div 
              key={skill.id}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                padding: '16px 20px',
                boxShadow: 'var(--card-shadow)'
              }}>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px dashed var(--border-color)',
                paddingBottom: '8px',
                marginBottom: '12px'
              }}>
                <span 
                  onClick={() => { sound.playClick(); onOpenSkill(skill); }}
                  style={{
                    color: 'var(--accent-cyan)',
                    fontWeight: 800,
                    fontSize: '0.95em',
                    cursor: 'pointer'
                  }}>
                  {skill.title[lang]}
                </span>

                <span style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-display)',
                  color: 'var(--accent-gold)'
                }}>
                  TIER {skill.tier}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {skill.objectives.map(obj => (
                  <div
                    key={obj.id}
                    style={{
                      backgroundColor: 'var(--bg-app)',
                      padding: '8px 12px',
                      border: '1px solid var(--border-color)'
                    }}>
                    <ThemedCheckbox
                      checked={obj.completed}
                      onChange={() => onToggleObjective(skill.id, obj.id)}
                      theme={currentTheme}
                      label={
                        <span style={{
                          color: obj.completed ? 'var(--text-dim)' : 'var(--text-main)',
                          textDecoration: obj.completed ? 'line-through' : 'none'
                        }}>
                          {obj.text[lang]}
                        </span>
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
