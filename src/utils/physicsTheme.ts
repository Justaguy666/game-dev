import { ThemeId, ThemeMode } from '../types';

export interface PhysicsThemeConfig {
  themeId: ThemeId;
  mode: ThemeMode;
  bg: string;
  gridColor: string;
  gridType: 'pixel' | 'lcd' | 'blueprint' | 'neon' | 'dots' | 'parchment' | 'vector' | 'comic' | 'cardboard';
  platformFill: string;
  platformStroke: string;
  platformGlow?: string;
  playerPrimary: string;
  playerSecondary: string;
  playerGlow?: string;
  playerShape: 'pixel-hero' | 'gameboy' | 'cyber-drone' | 'blueprint-cad' | 'inkwell-toon' | 'vector-ship' | 'knight' | 'persona-rogue' | 'clay-blob' | 'origami-cube';
  vectorV: string;
  vectorVx: string;
  vectorVy: string;
  vectorN: string;
  trajectory: string;
  accentGold: string;
  coyoteActiveColor: string;
  particleColors: string[];
  particleShape: 'pixel' | 'spark' | 'circle' | 'cross' | 'ink' | 'leaf' | 'square';
  fontDisplay: string;
  fontMono: string;
  themeTitle: string;
}

export const getPhysicsTheme = (theme: ThemeId, mode: ThemeMode): PhysicsThemeConfig => {
  const isDark = mode === 'dark';

  switch (theme) {
    case 'gameboy':
      return {
        themeId: 'gameboy',
        mode,
        bg: isDark ? '#0f380f' : '#9bbc0f',
        gridColor: isDark ? 'rgba(48, 98, 48, 0.4)' : 'rgba(139, 172, 15, 0.5)',
        gridType: 'lcd',
        platformFill: isDark ? '#306230' : '#8bac0f',
        platformStroke: isDark ? '#8bac0f' : '#0f380f',
        playerPrimary: isDark ? '#9bbc0f' : '#0f380f',
        playerSecondary: isDark ? '#0f380f' : '#9bbc0f',
        playerShape: 'gameboy',
        vectorV: isDark ? '#9bbc0f' : '#0f380f',
        vectorVx: isDark ? '#8bac0f' : '#306230',
        vectorVy: isDark ? '#8bac0f' : '#306230',
        vectorN: isDark ? '#9bbc0f' : '#0f380f',
        trajectory: isDark ? 'rgba(155, 188, 15, 0.45)' : 'rgba(15, 56, 15, 0.4)',
        accentGold: isDark ? '#9bbc0f' : '#0f380f',
        coyoteActiveColor: isDark ? '#9bbc0f' : '#0f380f',
        particleColors: isDark ? ['#9bbc0f', '#8bac0f', '#306230'] : ['#0f380f', '#306230', '#8bac0f'],
        particleShape: 'pixel',
        fontDisplay: "'VT323', monospace",
        fontMono: "'VT323', monospace",
        themeTitle: 'Game Boy DMG-01'
      };

    case 'cyber':
      return {
        themeId: 'cyber',
        mode,
        bg: isDark ? '#080a14' : '#edf2ff',
        gridColor: isDark ? 'rgba(0, 240, 255, 0.15)' : 'rgba(0, 110, 220, 0.15)',
        gridType: 'neon',
        platformFill: isDark ? '#12172b' : '#dbeafe',
        platformStroke: isDark ? '#00f0ff' : '#0284c7',
        platformGlow: isDark ? '0 0 12px rgba(0, 240, 255, 0.5)' : undefined,
        playerPrimary: isDark ? '#00f0ff' : '#0284c7',
        playerSecondary: isDark ? '#ff007f' : '#db2777',
        playerGlow: isDark ? '0 0 14px rgba(0, 240, 255, 0.7)' : undefined,
        playerShape: 'cyber-drone',
        vectorV: '#ff007f',
        vectorVx: '#38bdf8',
        vectorVy: '#00f0ff',
        vectorN: '#a855f7',
        trajectory: isDark ? 'rgba(0, 240, 255, 0.6)' : 'rgba(2, 132, 199, 0.5)',
        accentGold: '#facc15',
        coyoteActiveColor: '#00f0ff',
        particleColors: ['#00f0ff', '#ff007f', '#facc15', '#a855f7'],
        particleShape: 'spark',
        fontDisplay: "'Share Tech Mono', monospace",
        fontMono: "'JetBrains Mono', monospace",
        themeTitle: 'Cyber Neon Horizon'
      };

    case 'blueprint':
      return {
        themeId: 'blueprint',
        mode,
        bg: isDark ? '#0b1d3a' : '#e6f0fa',
        gridColor: isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(15, 60, 120, 0.18)',
        gridType: 'blueprint',
        platformFill: isDark ? 'rgba(18, 48, 92, 0.85)' : 'rgba(200, 225, 250, 0.85)',
        platformStroke: isDark ? '#ffffff' : '#0d3880',
        playerPrimary: isDark ? '#ffffff' : '#0d3880',
        playerSecondary: isDark ? '#38bdf8' : '#0284c7',
        playerShape: 'blueprint-cad',
        vectorV: isDark ? '#facc15' : '#b45309',
        vectorVx: isDark ? '#38bdf8' : '#0284c7',
        vectorVy: isDark ? '#4ade80' : '#15803d',
        vectorN: isDark ? '#f43f5e' : '#be123c',
        trajectory: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(13, 56, 128, 0.5)',
        accentGold: isDark ? '#facc15' : '#d97706',
        coyoteActiveColor: isDark ? '#38bdf8' : '#0284c7',
        particleColors: isDark ? ['#ffffff', '#38bdf8', '#facc15'] : ['#0d3880', '#0284c7', '#d97706'],
        particleShape: 'cross',
        fontDisplay: "'Courier New', monospace",
        fontMono: "'Courier New', monospace",
        themeTitle: 'Technical CAD Blueprint'
      };

    case 'synthwave':
      return {
        themeId: 'synthwave',
        mode,
        bg: isDark ? '#140c24' : '#faf5ff',
        gridColor: isDark ? 'rgba(244, 63, 142, 0.22)' : 'rgba(168, 85, 247, 0.2)',
        gridType: 'neon',
        platformFill: isDark ? '#261245' : '#f3e8ff',
        platformStroke: isDark ? '#ff2a8d' : '#9333ea',
        platformGlow: isDark ? '0 0 10px rgba(255, 42, 141, 0.6)' : undefined,
        playerPrimary: isDark ? '#ff2a8d' : '#d946ef',
        playerSecondary: isDark ? '#00f5d4' : '#06b6d4',
        playerGlow: isDark ? '0 0 12px rgba(255, 42, 141, 0.8)' : undefined,
        playerShape: 'cyber-drone',
        vectorV: '#00f5d4',
        vectorVx: '#facc15',
        vectorVy: '#ff2a8d',
        vectorN: '#c084fc',
        trajectory: isDark ? 'rgba(0, 245, 212, 0.55)' : 'rgba(6, 182, 212, 0.5)',
        accentGold: '#facc15',
        coyoteActiveColor: '#00f5d4',
        particleColors: ['#ff2a8d', '#00f5d4', '#facc15', '#9333ea'],
        particleShape: 'spark',
        fontDisplay: "'Righteous', cursive, sans-serif",
        fontMono: "'JetBrains Mono', monospace",
        themeTitle: 'Outrun Synthwave 1986'
      };

    case 'vector82':
      return {
        themeId: 'vector82',
        mode,
        bg: '#000000',
        gridColor: 'rgba(50, 255, 50, 0.1)',
        gridType: 'vector',
        platformFill: 'transparent',
        platformStroke: '#00ff44',
        platformGlow: '0 0 8px #00ff44',
        playerPrimary: '#00ff44',
        playerSecondary: '#ffffff',
        playerGlow: '0 0 10px #00ff44',
        playerShape: 'vector-ship',
        vectorV: '#ffffff',
        vectorVx: '#00ffff',
        vectorVy: '#ff00ff',
        vectorN: '#ffff00',
        trajectory: 'rgba(0, 255, 68, 0.7)',
        accentGold: '#ffff00',
        coyoteActiveColor: '#00ffff',
        particleColors: ['#00ff44', '#ffffff', '#00ffff', '#ffff00'],
        particleShape: 'spark',
        fontDisplay: "'VT323', monospace",
        fontMono: "'VT323', monospace",
        themeTitle: 'Vector Arcade 1982'
      };

    case 'inkwell':
      return {
        themeId: 'inkwell',
        mode,
        bg: isDark ? '#1a1815' : '#f5ebd7',
        gridColor: isDark ? 'rgba(255, 245, 220, 0.08)' : 'rgba(40, 30, 20, 0.08)',
        gridType: 'dots',
        platformFill: isDark ? '#2e2a24' : '#e6d8be',
        platformStroke: isDark ? '#f4ecd8' : '#1e1b18',
        playerPrimary: isDark ? '#f4ecd8' : '#1e1b18',
        playerSecondary: isDark ? '#1e1b18' : '#f4ecd8',
        playerShape: 'inkwell-toon',
        vectorV: isDark ? '#facc15' : '#854d0e',
        vectorVx: isDark ? '#93c5fd' : '#1e40af',
        vectorVy: isDark ? '#f87171' : '#991b1b',
        vectorN: isDark ? '#cbd5e1' : '#334155',
        trajectory: isDark ? 'rgba(244, 236, 216, 0.45)' : 'rgba(30, 27, 24, 0.4)',
        accentGold: isDark ? '#facc15' : '#ca8a04',
        coyoteActiveColor: isDark ? '#facc15' : '#ca8a04',
        particleColors: isDark ? ['#f4ecd8', '#e2d3b5', '#c8b693'] : ['#1e1b18', '#38332d', '#585147'],
        particleShape: 'ink',
        fontDisplay: "'Press Start 2P', monospace",
        fontMono: "'Courier New', monospace",
        themeTitle: '1930s Inkwell Cartoon'
      };

    case 'fantasy':
      return {
        themeId: 'fantasy',
        mode,
        bg: isDark ? '#15121e' : '#fcf6ea',
        gridColor: isDark ? 'rgba(217, 119, 6, 0.12)' : 'rgba(180, 83, 9, 0.12)',
        gridType: 'parchment',
        platformFill: isDark ? '#262035' : '#ede2cb',
        platformStroke: isDark ? '#d97706' : '#92400e',
        platformGlow: isDark ? '0 0 8px rgba(217, 119, 6, 0.3)' : undefined,
        playerPrimary: isDark ? '#fbbf24' : '#b45309',
        playerSecondary: isDark ? '#60a5fa' : '#1d4ed8',
        playerShape: 'knight',
        vectorV: '#fbbf24',
        vectorVx: '#60a5fa',
        vectorVy: '#f87171',
        vectorN: '#c084fc',
        trajectory: isDark ? 'rgba(251, 191, 36, 0.5)' : 'rgba(180, 83, 9, 0.4)',
        accentGold: '#fbbf24',
        coyoteActiveColor: '#fbbf24',
        particleColors: ['#fbbf24', '#f59e0b', '#d97706', '#ef4444'],
        particleShape: 'spark',
        fontDisplay: "'Cinzel', serif, sans-serif",
        fontMono: "'JetBrains Mono', monospace",
        themeTitle: 'High Fantasy Realm'
      };

    case 'pipboy':
      return {
        themeId: 'pipboy',
        mode,
        bg: isDark ? '#051805' : '#e6f5e6',
        gridColor: isDark ? 'rgba(51, 255, 51, 0.15)' : 'rgba(20, 100, 20, 0.15)',
        gridType: 'lcd',
        platformFill: isDark ? '#0d2b0d' : '#c8e6c8',
        platformStroke: isDark ? '#33ff33' : '#1a6b1a',
        playerPrimary: isDark ? '#33ff33' : '#1a6b1a',
        playerSecondary: isDark ? '#051805' : '#e6f5e6',
        playerGlow: isDark ? '0 0 10px rgba(51, 255, 51, 0.6)' : undefined,
        playerShape: 'pixel-hero',
        vectorV: isDark ? '#ffff33' : '#808000',
        vectorVx: isDark ? '#33ff33' : '#1a6b1a',
        vectorVy: isDark ? '#33ff33' : '#1a6b1a',
        vectorN: isDark ? '#ffffff' : '#000000',
        trajectory: isDark ? 'rgba(51, 255, 51, 0.5)' : 'rgba(26, 107, 26, 0.4)',
        accentGold: isDark ? '#ffff33' : '#808000',
        coyoteActiveColor: isDark ? '#33ff33' : '#1a6b1a',
        particleColors: isDark ? ['#33ff33', '#66ff66', '#ffff33'] : ['#1a6b1a', '#299629', '#0d400d'],
        particleShape: 'pixel',
        fontDisplay: "'VT323', monospace",
        fontMono: "'VT323', monospace",
        themeTitle: 'Pip-Boy 3000 Terminal'
      };

    case 'persona':
      return {
        themeId: 'persona',
        mode,
        bg: isDark ? '#0d0d0d' : '#f4f4f4',
        gridColor: isDark ? 'rgba(235, 20, 20, 0.2)' : 'rgba(235, 20, 20, 0.15)',
        gridType: 'comic',
        platformFill: isDark ? '#1a1a1a' : '#ffffff',
        platformStroke: '#eb1414',
        playerPrimary: '#eb1414',
        playerSecondary: isDark ? '#fcee09' : '#0d0d0d',
        playerShape: 'persona-rogue',
        vectorV: '#fcee09',
        vectorVx: '#38bdf8',
        vectorVy: '#eb1414',
        vectorN: '#ffffff',
        trajectory: 'rgba(235, 20, 20, 0.6)',
        accentGold: '#fcee09',
        coyoteActiveColor: '#fcee09',
        particleColors: ['#eb1414', '#fcee09', '#0d0d0d', '#ffffff'],
        particleShape: 'cross',
        fontDisplay: "'Press Start 2P', monospace",
        fontMono: "'JetBrains Mono', monospace",
        themeTitle: 'Phantom Persona Style'
      };

    case 'papercraft':
      return {
        themeId: 'papercraft',
        mode,
        bg: isDark ? '#242120' : '#f9f6f0',
        gridColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)',
        gridType: 'cardboard',
        platformFill: isDark ? '#383330' : '#ede7dc',
        platformStroke: isDark ? '#d4a373' : '#b08968',
        playerPrimary: isDark ? '#e76f51' : '#e76f51',
        playerSecondary: isDark ? '#2a9d8f' : '#2a9d8f',
        playerShape: 'origami-cube',
        vectorV: '#e76f51',
        vectorVx: '#2a9d8f',
        vectorVy: '#e9c46a',
        vectorN: '#264653',
        trajectory: isDark ? 'rgba(231, 111, 81, 0.5)' : 'rgba(231, 111, 81, 0.4)',
        accentGold: '#e9c46a',
        coyoteActiveColor: '#2a9d8f',
        particleColors: ['#e76f51', '#2a9d8f', '#e9c46a', '#f4a261'],
        particleShape: 'square',
        fontDisplay: "'Patrick Hand', cursive, sans-serif",
        fontMono: "'Courier New', monospace",
        themeTitle: 'Origami Papercraft'
      };

    case 'claymation':
      return {
        themeId: 'claymation',
        mode,
        bg: isDark ? '#1f1b1c' : '#fbf3ee',
        gridColor: isDark ? 'rgba(255, 140, 100, 0.08)' : 'rgba(150, 70, 50, 0.08)',
        gridType: 'dots',
        platformFill: isDark ? '#3d3032' : '#ebdcd5',
        platformStroke: isDark ? '#f472b6' : '#be185d',
        playerPrimary: isDark ? '#fb7185' : '#e11d48',
        playerSecondary: isDark ? '#38bdf8' : '#0284c7',
        playerShape: 'clay-blob',
        vectorV: '#fb7185',
        vectorVx: '#38bdf8',
        vectorVy: '#facc15',
        vectorN: '#4ade80',
        trajectory: 'rgba(251, 113, 133, 0.5)',
        accentGold: '#facc15',
        coyoteActiveColor: '#facc15',
        particleColors: ['#fb7185', '#38bdf8', '#facc15', '#4ade80'],
        particleShape: 'circle',
        fontDisplay: "'Fredoka One', cursive, sans-serif",
        fontMono: "'JetBrains Mono', monospace",
        themeTitle: 'Plasticine Claymation'
      };

    case 'ghibli':
      return {
        themeId: 'ghibli',
        mode,
        bg: isDark ? '#11221c' : '#f0fdf4',
        gridColor: isDark ? 'rgba(74, 222, 128, 0.1)' : 'rgba(22, 101, 52, 0.1)',
        gridType: 'dots',
        platformFill: isDark ? '#1c3a30' : '#dcfce7',
        platformStroke: isDark ? '#4ade80' : '#16a34a',
        playerPrimary: isDark ? '#86efac' : '#15803d',
        playerSecondary: isDark ? '#fde047' : '#ca8a04',
        playerShape: 'pixel-hero',
        vectorV: '#4ade80',
        vectorVx: '#38bdf8',
        vectorVy: '#f472b6',
        vectorN: '#fde047',
        trajectory: 'rgba(74, 222, 128, 0.45)',
        accentGold: '#fde047',
        coyoteActiveColor: '#4ade80',
        particleColors: ['#86efac', '#4ade80', '#fde047', '#fed7aa'],
        particleShape: 'leaf',
        fontDisplay: "'Press Start 2P', monospace",
        fontMono: "'JetBrains Mono', monospace",
        themeTitle: 'Studio Ghibli Meadow'
      };

    // Default: 16-bit Retro Arcade (and fallback for other themes)
    case 'arcade':
    default:
      return {
        themeId: theme,
        mode,
        bg: isDark ? '#0f1016' : '#eaedf6',
        gridColor: isDark ? 'rgba(122, 162, 247, 0.12)' : 'rgba(59, 130, 246, 0.12)',
        gridType: 'pixel',
        platformFill: isDark ? '#1e2030' : '#f8fafc',
        platformStroke: isDark ? '#7aa2f7' : '#3b82f6',
        platformGlow: isDark ? '0 0 10px rgba(122, 162, 247, 0.35)' : undefined,
        playerPrimary: isDark ? '#fbbf24' : '#d97706',
        playerSecondary: isDark ? '#38bdf8' : '#0284c7',
        playerGlow: isDark ? '0 0 12px rgba(251, 191, 36, 0.5)' : undefined,
        playerShape: 'pixel-hero',
        vectorV: isDark ? '#fbbf24' : '#d97706',
        vectorVx: isDark ? '#38bdf8' : '#0284c7',
        vectorVy: isDark ? '#4ade80' : '#16a34a',
        vectorN: isDark ? '#f43f5e' : '#e11d48',
        trajectory: isDark ? 'rgba(251, 191, 36, 0.5)' : 'rgba(217, 119, 6, 0.4)',
        accentGold: isDark ? '#fbbf24' : '#d97706',
        coyoteActiveColor: isDark ? '#38bdf8' : '#0284c7',
        particleColors: isDark ? ['#fbbf24', '#38bdf8', '#4ade80', '#f43f5e'] : ['#d97706', '#0284c7', '#16a34a', '#e11d48'],
        particleShape: 'pixel',
        fontDisplay: "'Press Start 2P', monospace",
        fontMono: "'JetBrains Mono', monospace",
        themeTitle: '16-Bit Retro Arcade'
      };
  }
};
