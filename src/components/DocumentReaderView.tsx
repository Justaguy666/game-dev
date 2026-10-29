import React, { useState } from 'react';
import { SkillNode, Language, ThemeId } from '../types';
import { sound } from '../soundEngine';
import { marked } from 'marked';
import { ThemedIcon } from './ThemedIcon';

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
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const activeSkill = skills.find(s => s.id === selectedSkillId) || skills[0];
  const [content, setContent] = useState<string>(activeSkill?.content[lang] || '');

  // Keep content in sync when activeSkill or lang changes
  React.useEffect(() => {
    if (activeSkill) {
      setContent(activeSkill.content[lang]);
      setIsEditing(false);
    }
  }, [activeSkill?.id, lang]);

  const filteredSkills = skills.filter(s => {
    const q = searchQuery.toLowerCase();
    return s.title[lang].toLowerCase().includes(q) || s.tags.some(t => t.toLowerCase().includes(q));
  });

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

  return (
    <div style={{
      display: 'flex',
      height: 'calc(100vh - 65px)',
      overflow: 'hidden'
    }}>
      {/* Sidebar List */}
      <aside style={{
        width: '320px',
        backgroundColor: 'var(--bg-surface)',
        borderRight: '2px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0
      }}>
        {/* Search Input */}
        <div style={{ padding: '14px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--bg-app)',
            border: '1px solid var(--border-color)',
            padding: '6px 10px'
          }}>
            <ThemedIcon name="search" theme={currentTheme} size={15} color="var(--text-muted)" />
            <input
              type="text"
              placeholder={lang === 'vi' ? 'Tìm kiếm tài liệu, tag...' : 'Search docs, tags...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                color: 'var(--text-main)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85em',
                width: '100%'
              }}
            />
          </div>
        </div>

        {/* Notes Navigation List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
          {filteredSkills.map(skill => {
            const isSelected = skill.id === activeSkill?.id;
            return (
              <div
                key={skill.id}
                onClick={() => {
                  sound.playClick();
                  onSelectSkillId(skill.id);
                }}
                style={{
                  padding: '10px 12px',
                  marginBottom: '6px',
                  backgroundColor: isSelected ? 'var(--bg-card)' : 'transparent',
                  borderLeft: isSelected ? '3px solid var(--accent-gold)' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}>
                <div style={{
                  fontSize: '0.86em',
                  fontWeight: isSelected ? 800 : 600,
                  color: isSelected ? 'var(--accent-gold)' : 'var(--text-main)',
                  marginBottom: '4px',
                  lineHeight: 1.3
                }}>
                  {skill.title[lang]}
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '10px',
                  color: 'var(--text-muted)'
                }}>
                  <span>TIER {skill.tier}</span>
                  <span>{skill.status.toUpperCase()}</span>
                </div>
              </div>
            );
          })}
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
        {/* Document Top Actions Bar */}
        <div style={{
          padding: '12px 24px',
          borderBottom: '2px solid var(--border-color)',
          backgroundColor: 'var(--bg-surface)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ThemedIcon name="docs" theme={currentTheme} size={16} color="var(--accent-gold)" />
            <span style={{ fontWeight: 800, fontSize: '0.95em', color: 'var(--text-main)' }}>
              {activeSkill?.title[lang]}
            </span>
          </div>

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
                  padding: '6px 12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}>
                <ThemedIcon name="save" theme={currentTheme} size={14} />
                {lang === 'vi' ? 'Lưu bài' : 'Save'}
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
                  cursor: 'pointer'
                }}>
                <ThemedIcon name="edit" theme={currentTheme} size={14} />
                {lang === 'vi' ? 'Chỉnh sửa' : 'Edit'}
              </button>
            )}

            <button
              onClick={handleExport}
              title={lang === 'vi' ? 'Tải về file .md' : 'Download .md file'}
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
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 40px' }}>
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
                padding: '16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9em',
                lineHeight: 1.6,
                outline: 'none',
                resize: 'none'
              }}
            />
          ) : (
            <div
              className="markdown-body"
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
              style={{
                maxWidth: '850px',
                margin: '0 auto',
                lineHeight: 1.7,
                fontSize: '0.94em',
                color: 'var(--text-main)'
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
};
