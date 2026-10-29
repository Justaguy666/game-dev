import { IconName } from '../components/ThemedIcon';
import { LocalizedText } from '../types';

export type DomainId = 'root' | 'design' | 'tech' | 'qa' | 'art' | 'audio' | 'production' | 'boss';

export interface GameDevDomain {
  id: DomainId;
  code: string;
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
    code: '10',
    name: {
      vi: '10. Thiết Kế Cơ Chế & Trải Nghiệm (Game Design)',
      en: '10. Game Design & Systems'
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
    colorVar: 'var(--accent-gold)',
    accentHex: '#f59e0b',
    columnX: 100
  },
  {
    id: 'tech',
    code: '20',
    name: {
      vi: '20. Kỹ Thuật Lập Trình & Kiến Trúc (Tech & Architecture)',
      en: '20. Engineering & Architecture'
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
    colorVar: 'var(--accent-cyan)',
    accentHex: '#06b6d4',
    columnX: 660
  },
  {
    id: 'qa',
    code: '30',
    name: {
      vi: '30. Kiểm Thử, QA & Hiệu Năng (QA & Testing)',
      en: '30. QA, Testing & Profiling'
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
    colorVar: 'var(--accent-red)',
    accentHex: '#f43f5e',
    columnX: 1220
  },
  {
    id: 'art',
    code: '40',
    name: {
      vi: '40. Nghệ Thuật Thị Giác & Shader (Art & Visuals)',
      en: '40. Visual Arts & Technical Art'
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
    colorVar: 'var(--accent-purple)',
    accentHex: '#a855f7',
    columnX: 1780
  },
  {
    id: 'audio',
    code: '50',
    name: {
      vi: '50. Âm Thanh & Thiết Kế Tiếng Động (Audio & SFX)',
      en: '50. Audio & Sound Design'
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
    colorVar: 'var(--accent-green)',
    accentHex: '#10b981',
    columnX: 2340
  },
  {
    id: 'boss',
    code: '60',
    name: {
      vi: '60. Đỉnh Cao Trận Đấu & Sản Xuất (Boss & Capstone)',
      en: '60. Capstone & Production'
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
    colorVar: 'var(--accent-gold)',
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
