import React, { useState } from 'react';
import { SkillNode, Language, ThemeId } from '../types';
import { sound } from '../soundEngine';
import { marked } from 'marked';
import { ThemedIcon } from './ThemedIcon';
import { ThemedCheckbox } from './ThemedCheckbox';

interface DocumentEditorProps {
  skill: SkillNode;
  onClose: () => void;
  onUpdateSkill: (updated: SkillNode) => void;
  lang: Language;
  currentTheme: ThemeId;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({ skill, onClose, onUpdateSkill, lang, currentTheme }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [content, setContent] = useState<string>(skill.content[lang]);
  const [title, setTitle] = useState<string>(skill.title[lang]);

  // Handle Objective Checkbox Toggle
  const handleToggleObjective = (objId: string) => {
    const updatedObjectives = skill.objectives.map(obj => {
      if (obj.id === objId) {
        const nextState = !obj.completed;
        if (nextState) {
          sound.playQuestComplete();
        } else {
          sound.playClick();
        }
        return { ...obj, completed: nextState };
      }
      return obj;
    });

    // Recalculate EXP
    const completedCount = updatedObjectives.filter(o => o.completed).length;
    const newExp = updatedObjectives.length > 0 
      ? Math.round((completedCount / updatedObjectives.length) * skill.maxExp)
      : skill.exp;

    const newStatus = completedCount === updatedObjectives.length && updatedObjectives.length > 0
      ? 'mastered'
      : (completedCount > 0 ? 'learning' : skill.status);

    const updatedSkill: SkillNode = {
      ...skill,
      objectives: updatedObjectives,
      exp: newExp,
      status: newStatus
    };

    onUpdateSkill(updatedSkill);
  };

  // Save edits
  const handleSave = () => {
    sound.playSave();
    const updatedSkill: SkillNode = {
      ...skill,
      title: { ...skill.title, [lang]: title },
      content: { ...skill.content, [lang]: content }
    };
    onUpdateSkill(updatedSkill);
    setIsEditing(false);
  };

  // Export to .md file
  const handleExport = () => {
    sound.playClick();
    const markdownContent = `---
tier: ${skill.tier}
status: ${skill.status}
exp: ${skill.exp}/${skill.maxExp}
tags: [${skill.tags.join(', ')}]
---

${content}
`;
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${skill.id}_${lang}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Render markdown with marked
  const renderedHtml = marked.parse(content) as string;

  return (
    <div style={{
      position: 'fixed',
      top: '65px',
      right: 0,
      bottom: 0,
      width: '100%',
      maxWidth: '720px',
      backgroundColor: 'var(--bg-surface)',
      borderLeft: '2px solid var(--border-color)',
      boxShadow: '-6px 0 24px rgba(0, 0, 0, 0.7)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      animation: 'slideIn 0.25s ease-out'
    }}>
      {/* Header bar */}
      <div style={{
        padding: '14px 20px',
        borderBottom: '2px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-card)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontSize: '11px',
            fontFamily: 'var(--font-display)',
            color: 'var(--accent-gold)'
          }}>
            TIER {skill.tier}
          </span>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <span style={{
            fontSize: '12px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: skill.status === 'mastered' ? 'var(--accent-green)' : 'var(--accent-gold)'
          }}>
            {skill.status === 'mastered' ? (
              <>
                <ThemedIcon name="mastered" theme={currentTheme} size={14} color="var(--accent-green)" />
                {lang === 'vi' ? 'ĐÃ LĨNH HỘI' : 'MASTERED'}
              </>
            ) : (
              <>
                <ThemedIcon name="learning" theme={currentTheme} size={14} color="var(--accent-gold)" />
                {lang === 'vi' ? 'ĐANG HỌC' : 'IN TRAINING'}
              </>
            )}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                padding: '6px 12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}>
              <ThemedIcon name="save" theme={currentTheme} size={14} />
              {lang === 'vi' ? 'Lưu' : 'Save'}
            </button>
          ) : (
            <button
              onClick={() => { sound.playClick(); setIsEditing(true); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-color)',
                padding: '6px 12px',
                cursor: 'pointer'
              }}>
              <ThemedIcon name="edit" theme={currentTheme} size={14} />
              {lang === 'vi' ? 'Chỉnh sửa' : 'Edit'}
            </button>
          )}

          <button
            onClick={handleExport}
            title={lang === 'vi' ? 'Tải về file .md' : 'Export as .md file'}
            style={{
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
              padding: '6px 10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}>
            <ThemedIcon name="download" theme={currentTheme} size={15} />
          </button>

          <button
            onClick={() => { sound.playClick(); onClose(); }}
            title="Đóng"
            style={{
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--accent-red)',
              border: '1px solid var(--border-color)',
              padding: '6px 10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}>
            <ThemedIcon name="close" theme={currentTheme} size={16} />
          </button>
        </div>
      </div>

      {/* Main Body Scroll */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px 28px',
        lineHeight: 1.65
      }}>
        {/* Objectives / Quests Checklist Box */}
        {skill.objectives.length > 0 && (
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '2px solid var(--border-color)',
            borderLeft: '4px solid var(--accent-gold)',
            padding: '14px 18px',
            marginBottom: '24px',
            boxShadow: 'var(--card-shadow)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 800,
              fontSize: '0.9em',
              color: 'var(--accent-gold)',
              marginBottom: '10px',
              fontFamily: 'var(--font-mono)'
            }}>
              <ThemedIcon name="quests" theme={currentTheme} size={16} />
              {lang === 'vi' ? 'MỤC TIÊU LĨNH HỘI (SKILL OBJECTIVES)' : 'MASTERY OBJECTIVES'}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                    onChange={() => handleToggleObjective(obj.id)}
                    theme={currentTheme}
                    label={
                      <span style={{
                        color: obj.completed ? 'var(--text-dim)' : 'var(--text-main)',
                        textDecoration: obj.completed ? 'line-through' : 'none',
                        fontSize: '0.9em'
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

        {/* Content area: Editing vs Reading */}
        {isEditing ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.8em', color: 'var(--text-muted)' }}>Tiêu đề (Title):</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border-color)',
                  padding: '8px 12px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1em',
                  marginTop: '4px'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8em', color: 'var(--text-muted)' }}>Nội dung Markdown (Content):</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={18}
                style={{
                  width: '100%',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border-color)',
                  padding: '12px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9em',
                  lineHeight: 1.5,
                  marginTop: '4px'
                }}
              />
            </div>
          </div>
        ) : (
          <div 
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
            style={{
              color: 'var(--text-main)',
              fontSize: '0.92em'
            }}
          />
        )}
      </div>
    </div>
  );
};
