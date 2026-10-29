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
      vi: 'Khởi Nguyên: Nền Tảng Game Dev',
      en: 'Foundations & Methodology'
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
      vi: 'Thiết Kế Cơ Chế & Trải Nghiệm (Game Design)',
      en: 'Game Design & Systems'
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
      vi: 'Kỹ Thuật Lập Trình & Kiến Trúc (Tech & Architecture)',
      en: 'Engineering & Architecture'
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
      vi: 'Kiểm Thử, QA & Hiệu Năng (QA & Testing)',
      en: 'QA, Testing & Profiling'
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
      vi: 'Nghệ Thuật Thị Giác & Shader (Art & Visuals)',
      en: 'Visual Arts & Technical Art'
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
      vi: 'Âm Thanh & Thiết Kế Tiếng Động (Audio & SFX)',
      en: 'Audio & Sound Design'
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
      vi: 'Đỉnh Cao Trận Đấu & Sản Xuất (Boss & Capstone)',
      en: 'Capstone & Production'
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
  // 1. GAME BOY CLASSIC PALETTE (High readability, distinct hues, zero glare)
  if (theme === 'gameboy') {
    if (mode === 'light') {
      // Light background is #9bbc0f (olive yellow-green).
      // Rich, deep saturated hues providing distinct category identity without neon glare:
      switch (domainId) {
        case 'root': return '#854d0e'; // Golden bronze amber
        case 'design': return '#c2410c'; // Rich rust orange
        case 'tech': return '#0369a1'; // Deep cobalt cyan-blue
        case 'qa': return '#b91c1c'; // Rich ruby crimson red
        case 'art': return '#6b21a8'; // Royal violet purple
        case 'audio': return '#065f46'; // Deep forest jade emerald
        case 'boss':
        case 'production': return '#9f1239'; // Deep wine rose
        default: return '#854d0e';
      }
    } else {
      // Dark background is #0f380f (deep forest green).
      // Luminous retro hues that vividly distinguish categories on dark green:
      switch (domainId) {
        case 'root': return '#fde047'; // Bright retro gold
        case 'design': return '#fb923c'; // Warm retro orange
        case 'tech': return '#38bdf8'; // Electric sky blue / cyan
        case 'qa': return '#f87171'; // Vibrant coral rose
        case 'art': return '#c084fc'; // Retro lilac lavender
        case 'audio': return '#4ade80'; // Crisp neon mint green
        case 'boss':
        case 'production': return '#fb7185'; // Strawberry pink
        default: return '#fde047';
      }
    }
  }

  // 2. 1930s INKWELL / RUBBER HOSE PALETTE (Vintage Technicolor & Cartoon Cel Colors)
  if (theme === 'inkwell') {
    if (mode === 'light') {
      switch (domainId) {
        case 'root': return '#a16207'; // Vintage sepia amber
        case 'design': return '#c2410c'; // Vintage cartoon rubber-hose orange
        case 'tech': return '#0e7490'; // Steamboat cyan-blue
        case 'qa': return '#b91c1c'; // Vintage cartoon crimson red
        case 'art': return '#7e22ce'; // Vintage dark violet
        case 'audio': return '#15803d'; // Vintage cartoon moss green
        case 'boss':
        case 'production': return '#be123c'; // Vintage deep rose
        default: return '#a16207';
      }
    } else {
      switch (domainId) {
        case 'root': return '#fcd34d'; // Warm buttercup gold
        case 'design': return '#fb923c'; // Rubber-hose warm orange
        case 'tech': return '#38bdf8'; // Electric cartoon cyan
        case 'qa': return '#f87171'; // Bright cartoon red
        case 'art': return '#c084fc'; // Vintage lilac
        case 'audio': return '#4ade80'; // Bright cartoon mint
        case 'boss':
        case 'production': return '#fb7185'; // Vibrant rose
        default: return '#fcd34d';
      }
    }
  }

  // 3. OUTRUN 1984 / SYNTHWAVE NEON PALETTE (Retrowave Sunset Grids & Electric Neon)
  if (theme === 'synthwave') {
    if (mode === 'light') {
      switch (domainId) {
        case 'root': return '#b45309'; // Sunset Chrome Amber
        case 'design': return '#be123c'; // Hot Miami Rose Pink
        case 'tech': return '#0369a1'; // Electric Ocean Cyan
        case 'qa': return '#b91c1c'; // Laser Crimson
        case 'art': return '#7e22ce'; // Neon Violet
        case 'audio': return '#047857'; // Laser Mint Green
        case 'boss':
        case 'production': return '#9f1239'; // Deep Synth Rose
        default: return '#b45309';
      }
    } else {
      switch (domainId) {
        case 'root': return '#ffb703'; // Sunset Chrome Gold
        case 'design': return '#ff2a85'; // Hot Synth Magenta Pink
        case 'tech': return '#00f0ff'; // Laser Electric Cyan
        case 'qa': return '#ff3366'; // Neon Coral / Laser Crimson
        case 'art': return '#c084fc'; // Ultraviolet Orchid
        case 'audio': return '#39ff14'; // Radical Laser Lime
        case 'boss':
        case 'production': return '#f43f5e'; // Electric Rose
        default: return '#ffb703';
      }
    }
  }

  // 4. GOTHIC ELDRITCH / BLOOD & IRON PALETTE (Bloodborne, Cursed Relics & Cosmic Void)
  if (theme === 'gothic') {
    if (mode === 'light') {
      switch (domainId) {
        case 'root': return '#78350f'; // Consecrated Holy Gold
        case 'design': return '#991b1b'; // Arterial Blood Crimson
        case 'tech': return '#334155'; // Cold Wrought Iron Slate
        case 'qa': return '#581c87'; // Eldritch Void Deep Violet
        case 'art': return '#831843'; // Dried Rose Sanguine
        case 'audio': return '#115e59'; // Abyssal Cold Cyan-Teal
        case 'boss':
        case 'production': return '#7f1d1d'; // The Old Blood Scarlet
        default: return '#78350f';
      }
    } else {
      switch (domainId) {
        case 'root': return '#f59e0b'; // Relic Gold Flame
        case 'design': return '#ef4444'; // Blood Moon Crimson Scarlet
        case 'tech': return '#94a3b8'; // Quicksilver / Cold Wrought Steel
        case 'qa': return '#c084fc'; // Eldritch Cosmic Amethyst
        case 'art': return '#fb7185'; // Coagulated Blood Rose
        case 'audio': return '#2dd4bf'; // Abyssal Ghostly Phosphor
        case 'boss':
        case 'production': return '#dc2626'; // The Old Blood Crimson
        default: return '#f59e0b';
      }
    }
  }

  // 5. BLUEPRINT ARCHITECT / INDIE SKETCHBOOK PALETTE (Cyanotype Blueprint & Technical Drafting)
  if (theme === 'blueprint') {
    if (mode === 'light') {
      switch (domainId) {
        case 'root': return '#b45309'; // Technical Amber Ochre
        case 'design': return '#0284c7'; // Drafting Blueprint Cyan
        case 'tech': return '#1d4ed8'; // Classic Blueprint Navy
        case 'qa': return '#b91c1c'; // Red Pen Correction Ink
        case 'art': return '#7e22ce'; // Drafting Purple Ink
        case 'audio': return '#047857'; // Circuit Board Green
        case 'boss':
        case 'production': return '#c2410c'; // Drafting Terracotta
        default: return '#b45309';
      }
    } else {
      switch (domainId) {
        case 'root': return '#fde047'; // Drafting Compass Amber
        case 'design': return '#38bdf8'; // Blueprint Cyan Line
        case 'tech': return '#60a5fa'; // Technical CAD Blue
        case 'qa': return '#f87171'; // Revision Redline
        case 'art': return '#c084fc'; // Schematic Violet
        case 'audio': return '#4ade80'; // Oscilloscope Green
        case 'boss':
        case 'production': return '#fb923c'; // Construction Warning Orange
        default: return '#fde047';
      }
    }
  }

  // 6. GHIBLI COZY FOREST / COTTAGECORE PALETTE (Watercolor Meadow & Firefly Grove)
  if (theme === 'ghibli') {
    if (mode === 'light') {
      switch (domainId) {
        case 'root': return '#b45309'; // Acorn Honey Amber
        case 'design': return '#15803d'; // Matcha Leaf Green
        case 'tech': return '#0369a1'; // River Stream Blue
        case 'qa': return '#b91c1c'; // Ripe Strawberry Crimson
        case 'art': return '#7e22ce'; // Wild Orchid Violet
        case 'audio': return '#047857'; // Cottage Herb Green
        case 'boss':
        case 'production': return '#c2410c'; // Terracotta Pot Orange
        default: return '#b45309';
      }
    } else {
      switch (domainId) {
        case 'root': return '#fde047'; // Firefly Honey Gold
        case 'design': return '#4ade80'; // Lush Forest Leaf Green
        case 'tech': return '#38bdf8'; // Morning Dew River Cyan
        case 'qa': return '#f87171'; // Wild Forest Berry Coral
        case 'art': return '#c084fc'; // Wisteria Blossom Violet
        case 'audio': return '#34d399'; // Woodland Mint Green
        case 'boss':
        case 'production': return '#fb923c'; // Sunlit Autumn Ochre
        default: return '#fde047';
      }
    }
  }

  // 7. PSX 32-BIT / INDUSTRIAL CD-ROM PALETTE (PlayStation 1994 & 32-Bit Geometry)
  if (theme === 'psx') {
    if (mode === 'light') {
      switch (domainId) {
        case 'root': return '#b45309'; // Memory Card Amber
        case 'design': return '#16a34a'; // PSX Triangle Green
        case 'tech': return '#2563eb'; // PSX Cross Blue
        case 'qa': return '#dc2626'; // PSX Circle Red
        case 'art': return '#db2777'; // PSX Square Pink
        case 'audio': return '#0d9488'; // CD Audio Track Teal
        case 'boss':
        case 'production': return '#c2410c'; // SCSI Industrial Terracotta
        default: return '#b45309';
      }
    } else {
      switch (domainId) {
        case 'root': return '#facc15'; // Memory Card 1MB Gold
        case 'design': return '#34c759'; // PSX Triangle Neon Green
        case 'tech': return '#38bdf8'; // PSX Cross Laser Cyan/Blue
        case 'qa': return '#ff3b30'; // PSX Circle Neon Red
        case 'art': return '#ff2d55'; // PSX Square Neon Pink
        case 'audio': return '#2dd4bf'; // CD-ROM Laser Phosphor Cyan
        case 'boss':
        case 'production': return '#fb923c'; // SCSI Drive Amber
        default: return '#facc15';
      }
    }
  }

  // 8. PERSONA ACID POP / COMIC CEL-SHADE (Shigenori Soejima & Manga Anime Energy)
  if (theme === 'persona') {
    if (mode === 'light') {
      switch (domainId) {
        case 'root': return '#b45309'; // Acid Gold Ink
        case 'design': return '#e11d48'; // High-voltage Acid Crimson
        case 'tech': return '#0284c7'; // Electric Cyan Ink
        case 'qa': return '#b91c1c'; // Warning Punch Red
        case 'art': return '#7e22ce'; // Velvet Room Purple
        case 'audio': return '#047857'; // Acid Mint Green
        case 'boss':
        case 'production': return '#c2410c'; // Sunburst Ochre
        default: return '#b45309';
      }
    } else {
      switch (domainId) {
        case 'root': return '#ffe600'; // All-Out Attack Acid Yellow
        case 'design': return '#ff1e56'; // Phantom Joker Crimson Red
        case 'tech': return '#00f0ff'; // Electric Cyan Blue
        case 'qa': return '#ff2a85'; // Acid Magenta Pink
        case 'art': return '#c084fc'; // Velvet Violet
        case 'audio': return '#00e676'; // Acid Lime Neon
        case 'boss':
        case 'production': return '#fb923c'; // Sunburst Orange
        default: return '#ffe600';
      }
    }
  }

  // 9. UKIYO-E SUMI-E / FEUDAL JAPAN BRUSH (Woodblock Print & Mineral Pigments)
  if (theme === 'ukiyoe') {
    if (mode === 'light') {
      switch (domainId) {
        case 'root': return '#b45309'; // Imperial Gold Leaf
        case 'design': return '#b91c1c'; // Torii Cinnabar Vermilion
        case 'tech': return '#0369a1'; // Hokusai Great Wave Indigo
        case 'qa': return '#991b1b'; // Crimson Seal Ink
        case 'art': return '#7e22ce'; // Kyoto Wisteria Purple
        case 'audio': return '#15803d'; // Zen Bamboo Moss
        case 'boss':
        case 'production': return '#c2410c'; // Terracotta Ceramic Ochre
        default: return '#b45309';
      }
    } else {
      switch (domainId) {
        case 'root': return '#fbbf24'; // Kintsugi Gold Leaf
        case 'design': return '#ef4444'; // Torii Vermilion Red
        case 'tech': return '#38bdf8'; // Mist River Indigo
        case 'qa': return '#f87171'; // Sakura Blossom Crimson
        case 'art': return '#c084fc'; // Imperial Silk Lilac
        case 'audio': return '#4ade80'; // Bamboo Forest Green
        case 'boss':
        case 'production': return '#fb923c'; // Paper Lantern Amber
        default: return '#fbbf24';
      }
    }
  }

  // 10. VAPORWAVE WINDOWS 95 / Y2K MILLENNIUM (1995 Desktop & Cyber Neon Aesthetics)
  if (theme === 'vaporwave') {
    if (mode === 'light') {
      switch (domainId) {
        case 'root': return '#000080'; // Active Window Navy Blue
        case 'design': return '#c026d3'; // Hot Magenta
        case 'tech': return '#0284c7'; // Internet Explorer Cyan-Blue
        case 'qa': return '#b91c1c'; // Critical Error Crimson
        case 'art': return '#7e22ce'; // Media Player Violet
        case 'audio': return '#008080'; // Desktop Teal
        case 'boss':
        case 'production': return '#c2410c'; // Setup Wizard Amber
        default: return '#000080';
      }
    } else {
      switch (domainId) {
        case 'root': return '#ffe700'; // Vaporwave Sun Gold
        case 'design': return '#ff71ce'; // Neon Bubblegum Pink
        case 'tech': return '#01cdfe'; // Electric Glitch Cyan
        case 'qa': return '#f43f5e'; // Y2K Coral Pink
        case 'art': return '#b967ff'; // Aesthetic Lilac Purple
        case 'audio': return '#05ffa1'; // Neon Mint Green
        case 'boss':
        case 'production': return '#fb923c'; // Sunset Horizon Orange
        default: return '#ffe700';
      }
    }
  }

  // 11. PIP-BOY 3000 / POST-NUCLEAR PHOSPHOR CRT (Fallout & RobCo Terminal)
  if (theme === 'pipboy') {
    if (mode === 'light') {
      switch (domainId) {
        case 'root': return '#15803d'; // Deep Radiation Olive Green
        case 'design': return '#b45309'; // Wasteland Rust Amber
        case 'tech': return '#0369a1'; // Vault-Tec Jumpsuit Blue
        case 'qa': return '#b91c1c'; // Critical Hazard Crimson
        case 'art': return '#7e22ce'; // Quantum Violet
        case 'audio': return '#047857'; // Radio Tower Pine
        case 'boss':
        case 'production': return '#c2410c'; // Nuclear Fallout Rust
        default: return '#15803d';
      }
    } else {
      switch (domainId) {
        case 'root': return '#1aff59'; // Pure Phosphor Green
        case 'design': return '#ffb900'; // Pip-Boy Amber Rad Meter
        case 'tech': return '#1bf5e6'; // V.A.T.S. Tactical Target Cyan
        case 'qa': return '#ff4141'; // Critical Radiation Hazard Red
        case 'art': return '#c084fc'; // Stealth-Boy Ultraviolet
        case 'audio': return '#39ff14'; // Geiger Frequency Neon Mint
        case 'boss':
        case 'production': return '#ffa500'; // Glowing One Nuclear Amber
        default: return '#1aff59';
      }
    }
  }

  // 12. CLAYMATION STOP-MOTION / PLASTICINE ART (Handmade Modeling Clay Colors)
  if (theme === 'claymation') {
    if (mode === 'light') {
      switch (domainId) {
        case 'root': return '#d97706'; // Gromit Wensleydale Cheese Yellow
        case 'design': return '#c2410c'; // Terracotta Clay Rust
        case 'tech': return '#0284c7'; // Modeling Blue Clay
        case 'qa': return '#dc2626'; // Bright Red Plasticine
        case 'art': return '#7c3aed'; // Plum Plasticine
        case 'audio': return '#16a34a'; // Pea-Green Clay
        case 'boss':
        case 'production': return '#ea580c'; // Tangerine Dough
        default: return '#d97706';
      }
    } else {
      switch (domainId) {
        case 'root': return '#ffd166'; // Plasticine Cheese Yellow
        case 'design': return '#ffa07a'; // Terracotta Modeling Clay
        case 'tech': return '#4cc9f0'; // Sky-Blue Play-Doh
        case 'qa': return '#ff6b8b'; // Cherry Plasticine Red
        case 'art': return '#c77dff'; // Grape Purple Clay
        case 'audio': return '#06d6a0'; // Mint Green Play-Doh
        case 'boss':
        case 'production': return '#ff9f1c'; // Molded Tangerine Clay
        default: return '#ffd166';
      }
    }
  }

  // 13. PAPERCRAFT ORIGAMI / FOLDED PAPER WORLD (Geometric Facets & Washi Colors)
  if (theme === 'papercraft') {
    if (mode === 'light') {
      switch (domainId) {
        case 'root': return '#d97706'; // Golden Origami Amber
        case 'design': return '#c2410c'; // Washi Rust Vermilion
        case 'tech': return '#0284c7'; // Folded Blue Ink
        case 'qa': return '#dc2626'; // Red Paper Seal
        case 'art': return '#7e22ce'; // Kyoto Wisteria Purple
        case 'audio': return '#15803d'; // Bamboo Paper Green
        case 'boss':
        case 'production': return '#ea580c'; // Dragon Orange Paper
        default: return '#d97706';
      }
    } else {
      switch (domainId) {
        case 'root': return '#f4a261'; // Golden Paper Crane Amber
        case 'design': return '#e76f51'; // Folded Coral Orange
        case 'tech': return '#38bdf8'; // Origami Sky Cyan
        case 'qa': return '#e63946'; // Cinnabar Paper Red
        case 'art': return '#a855f7'; // Wisteria Paper Purple
        case 'audio': return '#2ec4b6'; // Folded Jade Mint
        case 'boss':
        case 'production': return '#fb8500'; // Origami Dragon Flame
        default: return '#f4a261';
      }
    }
  }

  // 14. SOLARPUNK BIOPHILIC / CRYSTAL SOLARIUM (Sunlight, Photosynthesis & Crystal Prisms)
  if (theme === 'solarpunk') {
    if (mode === 'light') {
      switch (domainId) {
        case 'root': return '#d97706'; // Radiant Solar Amber
        case 'design': return '#ea580c'; // Solar Thermal Orange
        case 'tech': return '#0284c7'; // Solar Cell Crystal Cyan
        case 'qa': return '#e11d48'; // Hibiscus Solar Red
        case 'art': return '#9333ea'; // Solarium Prism Violet
        case 'audio': return '#059669'; // Living Vine Emerald
        case 'boss':
        case 'production': return '#b45309'; // Brass Sunburst Bronze
        default: return '#d97706';
      }
    } else {
      switch (domainId) {
        case 'root': return '#fbbf24'; // Radiant Solar Gold
        case 'design': return '#f59e0b'; // Warm Amber Bloom
        case 'tech': return '#38bdf8'; // Photonic Crystal Cyan
        case 'qa': return '#f43f5e'; // Crimson Solar Flare
        case 'art': return '#c084fc'; // Bioluminescent Orchid
        case 'audio': return '#34d399'; // Photosynthetic Emerald
        case 'boss':
        case 'production': return '#fde047'; // Blazing Solar Ray
        default: return '#fbbf24';
      }
    }
  }

  // 15. VECTOR ARCADE 1982 / OSCILLOSCOPE WIREFRAME (QuadraScan & Laser CRT Vectors)
  if (theme === 'vector82') {
    if (mode === 'light') {
      switch (domainId) {
        case 'root': return '#b45309'; // Oscilloscope Amber
        case 'design': return '#c2410c'; // Vector Beam Orange
        case 'tech': return '#0369a1'; // CRT Electron Cyan
        case 'qa': return '#dc2626'; // Laser Red Alert
        case 'art': return '#7e22ce'; // Tempest Vector Purple
        case 'audio': return '#059669'; // Battlezone Phosphor Green
        case 'boss':
        case 'production': return '#9f1239'; // High-Voltage Crimson
        default: return '#b45309';
      }
    } else {
      switch (domainId) {
        case 'root': return '#ffe600'; // Pure Vector Beam Yellow
        case 'design': return '#ff9900'; // Vector Laser Orange
        case 'tech': return '#00f5ff'; // QuadraScan Laser Cyan
        case 'qa': return '#ff0055'; // Vector Collision Red
        case 'art': return '#d946ef'; // Tempest Beam Magenta
        case 'audio': return '#00ff66'; // Phosphor Vector Green
        case 'boss':
        case 'production': return '#ff3366'; // Superzapper Crimson
        default: return '#ffe600';
      }
    }
  }

  // 3. LIGHT MODE (Arcade, Cyber, Fantasy)
  // Clean, high-contrast accessible jewel tones (> 4.5:1)
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

  // 4. DARK MODE (Arcade, Cyber, Fantasy)
  // Luminous retro neon & arcade colors on dark background
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
