import { IconName } from '../components/ThemedIcon';
import { LocalizedText } from '../types';

export type DomainId = 'root' | 'design' | 'tech' | 'qa' | 'art' | 'audio' | 'production' | 'boss';

export interface GameDevDomain {
  id: DomainId;
  code: string; // "00", "01", "02", "03", "04", "05", "06"
  roman: string; // "00", "I", "II", "III", "IV", "V", "VI"
  name: LocalizedText;
  shortName: LocalizedText;
  description: LocalizedText;
  iconName: IconName;
  colorVar: string;
  accentHex: string;
  columnX: number; // Primary canvas column in px
}

export const GAME_DEV_DOMAINS: GameDevDomain[] = [
  {
    id: 'root',
    code: '00',
    roman: '00',
    name: {
      vi: '00. Khởi Nguyên: Nền Tảng Game Dev',
      en: '00. Foundations & Methodology'
    },
    shortName: {
      vi: 'Khởi Nguyên',
      en: 'Foundations'
    },
    description: {
      vi: 'Triết lý liên ngành độc lập công cụ, tư duy hệ thống và 5 đại trụ cột.',
      en: 'Tool-agnostic core engineering philosophy and the 5 foundational pillars.'
    },
    iconName: 'brand',
    colorVar: 'var(--accent-gold)',
    accentHex: '#fbbf24',
    columnX: 1220
  },
  {
    id: 'design',
    code: '01',
    roman: 'I',
    name: {
      vi: '01. Thiết Kế Cơ Chế & Trải Nghiệm (Game Design)',
      en: '01. Game Design & Systems'
    },
    shortName: {
      vi: 'Game Design',
      en: 'Design'
    },
    description: {
      vi: 'Khung MDA, vòng lặp 30s Core Loop, cân bằng kinh tế và Game Feel.',
      en: 'MDA framework, 30s Core Loop, systems economy, and visceral Game Feel.'
    },
    iconName: 'design',
    colorVar: '#f59e0b', // Amber
    accentHex: '#f59e0b',
    columnX: 100
  },
  {
    id: 'tech',
    code: '02',
    roman: 'II',
    name: {
      vi: '02. Kỹ Thuật Lập Trình & Kiến Trúc (Tech & Architecture)',
      en: '02. Engineering & Architecture'
    },
    shortName: {
      vi: 'Lập Trình Game',
      en: 'Tech'
    },
    description: {
      vi: 'Vòng lặp DeltaTime, toán học vector 2D, kiến trúc FSM/ECS và AI.',
      en: 'DeltaTime loops, 2D kinematics math, FSM/ECS patterns, and Game AI.'
    },
    iconName: 'code',
    colorVar: '#06b6d4', // Cyan
    accentHex: '#06b6d4',
    columnX: 660
  },
  {
    id: 'qa',
    code: '03',
    roman: 'III',
    name: {
      vi: '03. Kiểm Thử, QA & Hiệu Năng (QA & Testing)',
      en: '03. QA, Testing & Profiling'
    },
    shortName: {
      vi: 'Kiểm Thử QA',
      en: 'QA & Testing'
    },
    description: {
      vi: 'Phân loại lỗi, kiểm thử headless bot tự động, profiling CPU/GPU và playtesting.',
      en: 'Bug taxonomy, headless simulation bots, CPU/GPU profiling, and playtesting.'
    },
    iconName: 'qa',
    colorVar: '#f43f5e', // Rose / Red
    accentHex: '#f43f5e',
    columnX: 1220
  },
  {
    id: 'art',
    code: '04',
    roman: 'IV',
    name: {
      vi: '04. Nghệ Thuật Thị Giác & Shader (Art & Visuals)',
      en: '04. Visual Arts & Technical Art'
    },
    shortName: {
      vi: 'Đồ Họa & Art',
      en: 'Visual Art'
    },
    description: {
      vi: 'Độ rõ nét thị giác (Silhouette), 12 nguyên lý diễn hoạt tương tác và Shaders.',
      en: 'Silhouette hierarchy, interactive animation dynamics, and shaders.'
    },
    iconName: 'art',
    colorVar: '#a855f7', // Purple
    accentHex: '#a855f7',
    columnX: 1780
  },
  {
    id: 'audio',
    code: '05',
    roman: 'V',
    name: {
      vi: '05. Âm Thanh & Thiết Kế Tiếng Động (Audio & SFX)',
      en: '05. Audio & Sound Design'
    },
    shortName: {
      vi: 'Âm Thanh SFX',
      en: 'Audio SFX'
    },
    description: {
      vi: 'Ký hiệu học âm thanh, âm thanh thích ứng (Adaptive Audio) và không gian hóa 3D.',
      en: 'Sound semiotics, procedural adaptive sound systems, and 3D spatial audio.'
    },
    iconName: 'volume',
    colorVar: '#10b981', // Emerald / Green
    accentHex: '#10b981',
    columnX: 2340
  },
  {
    id: 'boss',
    code: '06',
    roman: 'VI',
    name: {
      vi: '06. Đỉnh Cao Trận Đấu & Sản Xuất (Boss & Capstone)',
      en: '06. Capstone & Production'
    },
    shortName: {
      vi: 'Capstone & Boss',
      en: 'Capstone'
    },
    description: {
      vi: 'Máy trạng thái Boss đa pha và quy trình quản trị phạm vi, tối ưu phát hành.',
      en: 'Multi-phase boss fight state machines, production scope, and release polish.'
    },
    iconName: 'boss',
    colorVar: '#eab308', // Gold / Orange
    accentHex: '#eab308',
    columnX: 940 // Center between tech and qa
  }
];

export const getDomainForCategory = (category: string): GameDevDomain => {
  if (category === 'production' || category === 'boss') {
    return GAME_DEV_DOMAINS.find(d => d.id === 'boss') || GAME_DEV_DOMAINS[0];
  }
  return GAME_DEV_DOMAINS.find(d => d.id === category) || GAME_DEV_DOMAINS[0];
};
