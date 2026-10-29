import { IconName } from '../components/ThemedIcon';
import { LocalizedText, ThemeId, ThemeMode } from '../types';

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

/**
 * Returns a high-contrast, theme-appropriate domain color that guarantees
 * readability and prevents eye strain across both Light and Dark modes.
 */
export const getDomainColor = (domainId: DomainId | string, theme: ThemeId, mode: ThemeMode): string => {
  // 1. GAME BOY MONOCHROME PALETTES
  if (theme === 'gameboy') {
    if (mode === 'light') {
      // Background is #9bbc0f (bright yellow-olive).
      // MUST use deep, dark, high-contrast ink tones (contrast > 7:1) to prevent eye-straining neon glare!
      switch (domainId) {
        case 'root': return '#0f380f'; // Darkest DMG forest ink
        case 'design': return '#263806'; // Deep army olive ink
        case 'tech': return '#0a3028'; // Deep pine dark teal
        case 'qa': return '#382206'; // Deep umber ochre
        case 'art': return '#281438'; // Deep plum shadow
        case 'audio': return '#0c331a'; // Deep spruce jade
        case 'boss':
        case 'production': return '#3a0f18'; // Deep crimson dark ink
        default: return '#0f380f';
      }
    } else {
      // Background is #0f380f (deep forest green).
      // Crisp, luminous DMG green & soft tones:
      switch (domainId) {
        case 'root': return '#9bbc0f'; // Brightest DMG Green
        case 'design': return '#d4e840'; // Bright DMG Lime
        case 'tech': return '#5eead4'; // Soft Mint
        case 'qa': return '#fde047'; // Warm Yellow
        case 'art': return '#c084fc'; // Soft Lavender
        case 'audio': return '#86efac'; // Soft Spring Green
        case 'boss':
        case 'production': return '#fda4af'; // Soft Coral
        default: return '#9bbc0f';
      }
    }
  }

  // 2. LIGHT MODE ACROSS ALL THEMES (Arcade, Cyber, Fantasy)
  // Background is white or light cream. Colors must be deep and accessible (> 4.5:1).
  if (mode === 'light') {
    switch (domainId) {
      case 'root': return '#b45309'; // Warm deep amber
      case 'design': return '#c2410c'; // Rust orange
      case 'tech': return '#0284c7'; // Rich cyan/blue
      case 'qa': return '#b91c1c'; // Deep ruby red
      case 'art': return '#7e22ce'; // Royal purple
      case 'audio': return '#047857'; // Deep emerald
      case 'boss':
      case 'production': return '#be123c'; // Deep rose
      default: return '#b45309';
    }
  }

  // 3. DARK MODE ACROSS ALL THEMES (Arcade, Cyber, Fantasy)
  // Vibrant, luminous retro colors on dark surface
  switch (domainId) {
    case 'root': return '#fbbf24'; // Gold
    case 'design': return '#f59e0b'; // Amber
    case 'tech': return theme === 'cyber' ? '#00f0ff' : '#38bdf8'; // Cyan
    case 'qa': return '#f43f5e'; // Rose
    case 'art': return '#c084fc'; // Lavender Purple
    case 'audio': return '#34d399'; // Mint Emerald
    case 'boss':
    case 'production': return '#fb7185'; // Rose Red
    default: return '#fbbf24';
  }
};
