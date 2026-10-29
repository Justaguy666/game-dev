import React, { useState, useEffect } from 'react';
import { ThemeId, ThemeMode, Language, SkillNode } from './types';
import { INITIAL_SKILLS } from './data/skillsData';
import { sound } from './soundEngine';
import { TopHUD } from './components/TopHUD';
import { SkillTreeView } from './components/SkillTreeView';
import { SkillOutlineModal } from './components/SkillOutlineModal';
import { DocumentReaderView } from './components/DocumentReaderView';
import { QuestsView } from './components/QuestsView';

const DATA_VERSION = 'v7_generous_tier_spacing_and_card_clean';

export const App: React.FC = () => {
  // 1. Persistent State
  const [currentTheme, setCurrentTheme] = useState<ThemeId>(() => {
    return (localStorage.getItem('gamedev_theme') as ThemeId) || 'arcade';
  });

  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    return (localStorage.getItem('gamedev_mode') as ThemeMode) || 'dark';
  });

  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('gamedev_lang') as Language) || 'vi';
  });

  const [fontScale, setFontScale] = useState<number>(() => {
    const saved = localStorage.getItem('gamedev_font_scale');
    return saved ? parseFloat(saved) : 1.0;
  });

  const [isCrtOn, setIsCrtOn] = useState<boolean>(() => {
    const saved = localStorage.getItem('gamedev_crt');
    return saved !== null ? saved === 'true' : true;
  });

  const [skills, setSkills] = useState<SkillNode[]>(() => {
    const version = localStorage.getItem('gamedev_data_version');
    if (version === DATA_VERSION) {
      const saved = localStorage.getItem('gamedev_skills_data');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length >= 15) {
            return parsed;
          }
        } catch (e) {
          console.error('Failed to parse saved skills', e);
        }
      }
    }
    localStorage.setItem('gamedev_data_version', DATA_VERSION);
    localStorage.setItem('gamedev_skills_data', JSON.stringify(INITIAL_SKILLS));
    return INITIAL_SKILLS;
  });

  const [activeView, setActiveView] = useState<'tree' | 'editor' | 'quests'>('tree');
  const [activeDrawerSkill, setActiveDrawerSkill] = useState<SkillNode | null>(null);
  const [selectedReaderSkillId, setSelectedReaderSkillId] = useState<string>('root-game-dev');

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('gamedev_theme', currentTheme);
    sound.setTheme(currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    localStorage.setItem('gamedev_mode', themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem('gamedev_lang', lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', `${fontScale}`);
    localStorage.setItem('gamedev_font_scale', `${fontScale}`);
  }, [fontScale]);

  useEffect(() => {
    localStorage.setItem('gamedev_crt', isCrtOn.toString());
  }, [isCrtOn]);

  useEffect(() => {
    localStorage.setItem('gamedev_skills_data', JSON.stringify(skills));
  }, [skills]);

  // Sync DOM classes with theme and mode
  useEffect(() => {
    document.body.className = `theme-${currentTheme} mode-${themeMode} ${isCrtOn ? 'crt-enabled' : ''}`;
  }, [currentTheme, themeMode, isCrtOn]);

  // Update a single skill
  const handleUpdateSkill = (updated: SkillNode) => {
    setSkills(prev => prev.map(s => s.id === updated.id ? updated : s));
    if (activeDrawerSkill && activeDrawerSkill.id === updated.id) {
      setActiveDrawerSkill(updated);
    }
  };

  // Toggle objective in quest view
  const handleToggleObjective = (skillId: string, objId: string) => {
    setSkills(prev => prev.map(skill => {
      if (skill.id === skillId) {
        const updatedObjs = skill.objectives.map(obj => {
          if (obj.id === objId) {
            const nextCompleted = !obj.completed;
            if (nextCompleted) {
              sound.playQuestComplete();
            } else {
              sound.playClick();
            }
            return { ...obj, completed: nextCompleted };
          }
          return obj;
        });

        const completedCount = updatedObjs.filter(o => o.completed).length;
        const newExp = updatedObjs.length > 0 
          ? Math.round((completedCount / updatedObjs.length) * skill.maxExp) 
          : skill.exp;
        const newStatus = completedCount === updatedObjs.length && updatedObjs.length > 0 
          ? 'mastered' 
          : (completedCount > 0 ? 'learning' : skill.status);

        return { ...skill, objectives: updatedObjs, exp: newExp, status: newStatus };
      }
      return skill;
    }));
  };

  // Total stats
  const totalExp = skills.reduce((sum, s) => sum + s.exp, 0);
  const maxExp = skills.reduce((sum, s) => sum + s.maxExp, 0);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top HUD Controls */}
      <TopHUD
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        themeMode={themeMode}
        onThemeModeToggle={() => setThemeMode(m => m === 'dark' ? 'light' : 'dark')}
        lang={lang}
        onLangToggle={() => setLang(l => l === 'vi' ? 'en' : 'vi')}
        onLangChange={setLang}
        fontScale={fontScale}
        onFontScaleChange={setFontScale}
        isCrtOn={isCrtOn}
        onCrtToggle={() => setIsCrtOn(c => !c)}
        activeView={activeView}
        onViewChange={(view) => {
          setActiveDrawerSkill(null);
          setActiveView(view);
        }}
        totalExp={totalExp}
        maxExp={maxExp}
      />

      {/* Main View Router */}
      <div style={{ flex: 1, position: 'relative' }}>
        {activeView === 'tree' && (
          <SkillTreeView
            skills={skills}
            onSelectSkill={(skill) => setActiveDrawerSkill(skill)}
            onCloseDetail={() => setActiveDrawerSkill(null)}
            lang={lang}
            currentTheme={currentTheme}
            themeMode={themeMode}
          />
        )}

        {activeView === 'editor' && (
          <DocumentReaderView
            skills={skills}
            selectedSkillId={selectedReaderSkillId}
            onSelectSkillId={setSelectedReaderSkillId}
            onUpdateSkill={handleUpdateSkill}
            lang={lang}
            currentTheme={currentTheme}
            themeMode={themeMode}
          />
        )}

        {activeView === 'quests' && (
          <QuestsView
            skills={skills}
            onToggleObjective={handleToggleObjective}
            onOpenSkill={(skill) => {
              setSelectedReaderSkillId(skill.id);
              setActiveDrawerSkill(null);
              setActiveView('editor');
            }}
            lang={lang}
            currentTheme={currentTheme}
            themeMode={themeMode}
          />
        )}

        {/* Compact Draggable Outline Modal when on Tree view */}
        {activeDrawerSkill && activeView === 'tree' && (
          <SkillOutlineModal
            skill={activeDrawerSkill}
            onClose={() => setActiveDrawerSkill(null)}
            onToggleObjective={handleToggleObjective}
            onOpenFullDoc={(skillId) => {
              setSelectedReaderSkillId(skillId);
              setActiveDrawerSkill(null);
              setActiveView('editor');
            }}
            lang={lang}
            currentTheme={currentTheme}
            themeMode={themeMode}
          />
        )}
      </div>
    </div>
  );
};
