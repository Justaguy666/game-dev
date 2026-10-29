export type ThemeId = 'arcade' | 'gameboy' | 'fantasy' | 'cyber' | 'inkwell' | 'synthwave' | 'gothic' | 'blueprint' | 'ghibli' | 'psx';
export type ThemeMode = 'dark' | 'light';
export type Language = 'vi' | 'en';

export type SkillStatus = 'mastered' | 'learning' | 'locked';

export interface LocalizedText {
  vi: string;
  en: string;
}

export interface SkillNode {
  id: string;
  title: LocalizedText;
  category: 'root' | 'design' | 'tech' | 'qa' | 'art' | 'audio' | 'production' | 'boss';
  tier: number;
  status: SkillStatus;
  exp: number;
  maxExp: number;
  parentId?: string;
  x: number;
  y: number;
  summary: LocalizedText;
  content: LocalizedText;
  objectives: {
    id: string;
    text: LocalizedText;
    completed: boolean;
  }[];
  tags: string[];
}

export interface NoteItem {
  id: string;
  title: LocalizedText;
  folder: string;
  category: string;
  tags: string[];
  content: LocalizedText;
  updatedAt: string;
}
