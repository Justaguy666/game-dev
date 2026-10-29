import React from 'react';
import { ThemeId } from '../types';

export type IconName = 
  | 'tree' 
  | 'docs' 
  | 'quests' 
  | 'sun' 
  | 'moon' 
  | 'tv' 
  | 'volume' 
  | 'mute' 
  | 'globe' 
  | 'mastered' 
  | 'learning' 
  | 'locked' 
  | 'edit' 
  | 'save' 
  | 'download' 
  | 'close' 
  | 'search' 
  | 'zoomIn' 
  | 'zoomOut' 
  | 'reset'
  | 'brand'
  | 'design'
  | 'code'
  | 'qa'
  | 'art'
  | 'audio'
  | 'boss'
  | 'production'
  | 'drag'
  | 'open'
  | 'font';

interface ThemedIconProps {
  name: IconName;
  theme: ThemeId;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

export const ThemedIcon: React.FC<ThemedIconProps> = ({
  name,
  theme,
  size = 16,
  color = 'currentColor',
  style
}) => {
  const commonSvgProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    style: { display: 'inline-block', verticalAlign: 'middle', ...style }
  };

  // =========================================================================
  // 1. ARCADE 16-BIT (Pixel Art Style: crispEdges, pixel squares)
  // =========================================================================
  if (theme === 'arcade') {
    switch (name) {
      case 'tree': // Pixel Directional Compass / Dungeon Map
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="10" y="2" width="4" height="4" fill={color} />
            <rect x="10" y="18" width="4" height="4" fill={color} />
            <rect x="2" y="10" width="4" height="4" fill={color} />
            <rect x="18" y="10" width="4" height="4" fill={color} />
            <rect x="8" y="8" width="8" height="8" fill="none" stroke={color} strokeWidth="2" />
            <rect x="11" y="11" width="2" height="2" fill={color} />
          </svg>
        );
      case 'docs': // Pixel Cartridge / Lore Book
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="4" y="3" width="16" height="18" fill="none" stroke={color} strokeWidth="2" />
            <rect x="7" y="6" width="10" height="2" fill={color} />
            <rect x="7" y="10" width="10" height="2" fill={color} />
            <rect x="7" y="14" width="6" height="2" fill={color} />
          </svg>
        );
      case 'quests': // Pixel Gold Star Coin
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="6" y="2" width="12" height="20" fill="none" stroke={color} strokeWidth="2" />
            <rect x="4" y="4" width="16" height="16" fill="none" stroke={color} strokeWidth="2" />
            <rect x="11" y="7" width="2" height="10" fill={color} />
            <rect x="7" y="11" width="10" height="2" fill={color} />
          </svg>
        );
      case 'sun': // Pixel Sun
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="11" y="1" width="2" height="4" fill={color} />
            <rect x="11" y="19" width="2" height="4" fill={color} />
            <rect x="1" y="11" width="4" height="2" fill={color} />
            <rect x="19" y="11" width="4" height="2" fill={color} />
            <rect x="7" y="7" width="10" height="10" fill={color} />
          </svg>
        );
      case 'moon': // Pixel Crescent Moon
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <path d="M14 3h2v2h2v4h2v6h-2v4h-2v2h-4v-2h-2v-2h-2v-4h2v2h2v2h4v-2h2V9h-2V7h-4V5h2V3z" fill={color} />
          </svg>
        );
      case 'tv': // Pixel Arcade Cabinet Screen
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="2" y="5" width="20" height="15" fill="none" stroke={color} strokeWidth="2" />
            <rect x="6" y="8" width="12" height="9" fill={color} opacity="0.3" />
            <rect x="9" y="2" width="2" height="3" fill={color} />
            <rect x="13" y="2" width="2" height="3" fill={color} />
          </svg>
        );
      case 'volume': // Pixel Speaker
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="2" y="9" width="4" height="6" fill={color} />
            <path d="M6 9l6-5v16l-6-5H6V9z" fill={color} />
            <rect x="15" y="8" width="2" height="8" fill={color} />
            <rect x="19" y="5" width="2" height="14" fill={color} />
          </svg>
        );
      case 'mute': // Pixel Speaker Muted
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="2" y="9" width="4" height="6" fill={color} />
            <path d="M6 9l6-5v16l-6-5H6V9z" fill={color} />
            <path d="M16 9l6 6m0-6l-6 6" stroke={color} strokeWidth="2" strokeLinecap="square" />
          </svg>
        );
      case 'globe': // Pixel Globe
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="4" y="4" width="16" height="16" fill="none" stroke={color} strokeWidth="2" />
            <rect x="11" y="2" width="2" height="20" fill={color} />
            <rect x="2" y="11" width="20" height="2" fill={color} />
          </svg>
        );
      case 'mastered': // 8-bit Star
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="11" y="2" width="2" height="20" fill={color} />
            <rect x="2" y="11" width="20" height="2" fill={color} />
            <rect x="6" y="6" width="12" height="12" fill={color} opacity="0.7" />
          </svg>
        );
      case 'learning': // Pixel Flame
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="11" y="3" width="2" height="4" fill={color} />
            <rect x="9" y="7" width="6" height="6" fill={color} />
            <rect x="7" y="13" width="10" height="8" fill={color} />
          </svg>
        );
      case 'locked': // Pixel Iron Lock
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="5" y="10" width="14" height="11" fill={color} />
            <path d="M8 10V6a4 4 0 018 0v4" stroke={color} strokeWidth="2" strokeLinecap="square" fill="none" />
            <rect x="11" y="13" width="2" height="4" fill="#0f1016" />
          </svg>
        );
      case 'edit': // Pixel Feather / Quill
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <path d="M18 2l4 4-12 12H6v-4L18 2z" fill="none" stroke={color} strokeWidth="2" />
            <rect x="4" y="20" width="16" height="2" fill={color} />
          </svg>
        );
      case 'save': // Pixel Floppy Disk
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="3" y="3" width="18" height="18" fill="none" stroke={color} strokeWidth="2" />
            <rect x="7" y="3" width="10" height="7" fill={color} />
            <rect x="6" y="13" width="12" height="6" fill={color} opacity="0.4" />
          </svg>
        );
      case 'download': // Pixel Chest Export
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="11" y="2" width="2" height="12" fill={color} />
            <path d="M7 10l5 5 5-5" stroke={color} strokeWidth="2" fill="none" />
            <rect x="3" y="18" width="18" height="3" fill={color} />
          </svg>
        );
      case 'close':
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <path d="M5 5l14 14M19 5L5 19" stroke={color} strokeWidth="2.5" />
          </svg>
        );
      case 'search':
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="4" y="4" width="10" height="10" fill="none" stroke={color} strokeWidth="2" />
            <rect x="13" y="13" width="6" height="6" fill={color} />
          </svg>
        );
      case 'zoomIn':
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="4" y="4" width="11" height="11" fill="none" stroke={color} strokeWidth="2" />
            <path d="M14 14l6 6M9 6v6M6 9h6" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'zoomOut':
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="4" y="4" width="11" height="11" fill="none" stroke={color} strokeWidth="2" />
            <path d="M14 14l6 6M6 9h6" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'reset':
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="3" y="3" width="18" height="18" fill="none" stroke={color} strokeWidth="2" />
            <rect x="9" y="9" width="6" height="6" fill={color} />
          </svg>
        );
      case 'brand':
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="9" y="3" width="6" height="6" fill={color} />
            <rect x="11" y="9" width="2" height="6" fill={color} />
            <rect x="4" y="15" width="16" height="6" fill="none" stroke={color} strokeWidth="2" />
            <rect x="6" y="17" width="3" height="2" fill={color} />
          </svg>
        );
      case 'design':
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="4" y="4" width="16" height="16" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 2" />
            <rect x="16" y="2" width="4" height="4" fill={color} />
            <rect x="4" y="18" width="4" height="4" fill={color} />
          </svg>
        );
      case 'code':
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <path d="M7 8l-4 4 4 4M17 8l4 4-4 4M13 6l-2 12" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'qa':
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="3" y="3" width="18" height="18" fill="none" stroke={color} strokeWidth="2" />
            <rect x="11" y="7" width="2" height="10" fill={color} />
            <rect x="7" y="11" width="10" height="2" fill={color} />
            <rect x="10" y="10" width="4" height="4" fill={color} />
          </svg>
        );
      case 'art':
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="3" y="3" width="14" height="14" fill="none" stroke={color} strokeWidth="2" />
            <rect x="6" y="6" width="2" height="2" fill={color} />
            <rect x="11" y="6" width="2" height="2" fill={color} />
            <rect x="6" y="11" width="2" height="2" fill={color} />
            <path d="M14 14l7 7" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'audio':
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="3" y="8" width="5" height="8" fill={color} />
            <path d="M8 8l7-5v18l-7-5H8z" fill={color} />
            <rect x="18" y="7" width="2" height="10" fill={color} />
          </svg>
        );
      case 'boss':
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="5" y="4" width="14" height="11" fill="none" stroke={color} strokeWidth="2" />
            <rect x="7" y="7" width="3" height="3" fill={color} />
            <rect x="14" y="7" width="3" height="3" fill={color} />
            <rect x="8" y="15" width="8" height="5" fill="none" stroke={color} strokeWidth="2" />
            <rect x="10" y="17" width="4" height="2" fill={color} />
          </svg>
        );
      case 'production':
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <path d="M12 2l4 6v8l-4 2-4-2V8l4-6z" fill="none" stroke={color} strokeWidth="2" />
            <rect x="11" y="9" width="2" height="3" fill={color} />
            <path d="M6 16l-2 4h4M18 16l2 4h-4" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'drag':
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="8" y="6" width="2" height="2" fill={color} />
            <rect x="14" y="6" width="2" height="2" fill={color} />
            <rect x="8" y="11" width="2" height="2" fill={color} />
            <rect x="14" y="11" width="2" height="2" fill={color} />
            <rect x="8" y="16" width="2" height="2" fill={color} />
            <rect x="14" y="16" width="2" height="2" fill={color} />
          </svg>
        );
      case 'open':
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <path d="M14 3h7v7M21 3l-9 9M5 5H3v16h16v-2" stroke={color} strokeWidth="2" fill="none" />
          </svg>
        );
      case 'font':
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="7" y="3" width="10" height="2" fill={color} />
            <rect x="5" y="5" width="4" height="16" fill={color} />
            <rect x="15" y="5" width="4" height="16" fill={color} />
            <rect x="7" y="11" width="10" height="3" fill={color} />
          </svg>
        );
    }
  }

  // =========================================================================
  // 2. GAME BOY DMG-01 (Pocket Handheld Dot-Matrix Style)
  // =========================================================================
  if (theme === 'gameboy') {
    switch (name) {
      case 'tree': // Game Boy D-Pad
        return (
          <svg {...commonSvgProps}>
            <path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7V2z" fill={color} />
            <circle cx="12" cy="12" r="2" fill="var(--bg-app)" />
          </svg>
        );
      case 'docs': // Game Boy Game Pak Cartridge
        return (
          <svg {...commonSvgProps}>
            <path d="M5 2h11l3 3v17H5V2z" fill="none" stroke={color} strokeWidth="2" />
            <rect x="8" y="7" width="8" height="7" fill={color} opacity="0.4" />
            <line x1="8" y1="18" x2="16" y2="18" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'quests': // Game Boy A/B Buttons
        return (
          <svg {...commonSvgProps}>
            <circle cx="8" cy="15" r="5" fill="none" stroke={color} strokeWidth="2" />
            <circle cx="16" cy="9" r="5" fill={color} />
          </svg>
        );
      case 'sun': // Battery LED Full
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="7" fill={color} />
            <circle cx="12" cy="12" r="3" fill="var(--bg-app)" />
          </svg>
        );
      case 'moon': // Battery LED Low
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="7" fill="none" stroke={color} strokeWidth="2" />
            <circle cx="12" cy="12" r="3" fill={color} />
          </svg>
        );
      case 'tv': // DMG Pocket Screen Bezel
        return (
          <svg {...commonSvgProps}>
            <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke={color} strokeWidth="2" />
            <rect x="6" y="6" width="12" height="12" fill={color} opacity="0.3" />
            <circle cx="5" cy="19" r="1" fill={color} />
          </svg>
        );
      case 'volume': // Potentiometer Dial
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="8" fill="none" stroke={color} strokeWidth="2" />
            <line x1="12" y1="6" x2="12" y2="12" stroke={color} strokeWidth="2.5" />
          </svg>
        );
      case 'mute':
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="8" fill="none" stroke={color} strokeWidth="2" />
            <line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'globe': // Select / Start Pills
        return (
          <svg {...commonSvgProps}>
            <rect x="3" y="10" width="8" height="4" rx="2" fill={color} transform="rotate(-25 7 12)" />
            <rect x="13" y="10" width="8" height="4" rx="2" fill={color} transform="rotate(-25 17 12)" />
          </svg>
        );
      case 'mastered': // Clean DMG Badge
        return (
          <svg {...commonSvgProps}>
            <rect x="4" y="4" width="16" height="16" fill={color} />
            <path d="M8 12l3 3 5-6" stroke="var(--bg-app)" strokeWidth="2.5" fill="none" />
          </svg>
        );
      case 'learning':
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="7" stroke={color} strokeWidth="2" strokeDasharray="3 3" fill="none" />
            <circle cx="12" cy="12" r="3" fill={color} />
          </svg>
        );
      case 'locked':
        return (
          <svg {...commonSvgProps}>
            <rect x="6" y="10" width="12" height="10" fill="none" stroke={color} strokeWidth="2" />
            <path d="M8 10V6a4 4 0 018 0v4" stroke={color} strokeWidth="2" fill="none" />
          </svg>
        );
      case 'edit':
        return (
          <svg {...commonSvgProps}>
            <path d="M4 20h16M14 4l6 6L8 20H4v-4L14 4z" fill="none" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'save':
        return (
          <svg {...commonSvgProps}>
            <path d="M4 4h12l4 4v12H4V4z" fill="none" stroke={color} strokeWidth="2" />
            <rect x="7" y="12" width="10" height="6" fill={color} />
          </svg>
        );
      case 'download':
        return (
          <svg {...commonSvgProps}>
            <path d="M12 4v12m-5-5l5 5 5-5M4 20h16" stroke={color} strokeWidth="2" fill="none" />
          </svg>
        );
      case 'close':
        return (
          <svg {...commonSvgProps}>
            <path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'search':
        return (
          <svg {...commonSvgProps}>
            <circle cx="11" cy="11" r="6" stroke={color} strokeWidth="2" fill="none" />
            <line x1="16" y1="16" x2="21" y2="21" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'zoomIn':
        return (
          <svg {...commonSvgProps}>
            <circle cx="11" cy="11" r="6" stroke={color} strokeWidth="2" fill="none" />
            <path d="M11 8v6m-3-3h6M16 16l5 5" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'zoomOut':
        return (
          <svg {...commonSvgProps}>
            <circle cx="11" cy="11" r="6" stroke={color} strokeWidth="2" fill="none" />
            <path d="M8 11h6M16 16l5 5" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'reset':
        return (
          <svg {...commonSvgProps}>
            <path d="M4 12a8 8 0 108-8H4m0 0l4-4M4 4l4 4" stroke={color} strokeWidth="2" fill="none" />
          </svg>
        );
      case 'brand':
        return (
          <svg {...commonSvgProps}>
            <rect x="5" y="2" width="14" height="20" rx="2" fill="none" stroke={color} strokeWidth="2" />
            <rect x="8" y="5" width="8" height="6" fill={color} />
            <path d="M7 15h4M9 13v4M15 15h1.5M14 17h1.5" stroke={color} strokeWidth="1.5" />
          </svg>
        );
      case 'design':
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="7" stroke={color} strokeWidth="2" strokeDasharray="3 3" fill="none" />
            <rect x="11" y="3" width="2" height="4" fill={color} />
            <rect x="17" y="11" width="4" height="2" fill={color} />
          </svg>
        );
      case 'code':
        return (
          <svg {...commonSvgProps}>
            <rect x="6" y="6" width="12" height="12" fill="none" stroke={color} strokeWidth="2" />
            <path d="M3 9h3M3 15h3M18 9h3M18 15h3M9 3v3M15 3v3M9 18v3M15 18v3" stroke={color} strokeWidth="1.5" />
          </svg>
        );
      case 'qa':
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="3" fill={color} />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'art':
        return (
          <svg {...commonSvgProps}>
            <rect x="4" y="4" width="16" height="16" fill="none" stroke={color} strokeWidth="2" />
            <path d="M4 9h16M4 15h16M9 4v16M15 4v16" stroke={color} strokeWidth="1.5" />
          </svg>
        );
      case 'audio':
        return (
          <svg {...commonSvgProps}>
            <path d="M4 9h4l5-5v16l-5-5H4V9z" fill="none" stroke={color} strokeWidth="2" />
            <circle cx="17" cy="12" r="2" fill={color} />
          </svg>
        );
      case 'boss':
        return (
          <svg {...commonSvgProps}>
            <path d="M8 4h8v2H8zM6 6h12v4H6zM4 10h16v6H4zM6 16h3v4H6zM15 16h3v4h-3zM8 12h2v2H8zM14 12h2v2h-2z" fill={color} />
          </svg>
        );
      case 'production':
        return (
          <svg {...commonSvgProps}>
            <path d="M5 3h12l2 2v16H5V3z" fill="none" stroke={color} strokeWidth="2" />
            <rect x="8" y="7" width="8" height="8" fill={color} />
            <path d="M8 18h8" stroke={color} strokeWidth="1.5" />
          </svg>
        );
      case 'drag':
        return (
          <svg {...commonSvgProps}>
            <path d="M6 8h12M6 12h12M6 16h12" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'open':
        return (
          <svg {...commonSvgProps}>
            <path d="M12 4h8v8M20 4l-9 9M4 8v12h12" stroke={color} strokeWidth="2" fill="none" />
          </svg>
        );
      case 'font':
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <path d="M8 3h8v3h2v15h-4v-6h-4v6H6V6h2V3zm2 6h4V6h-4v3z" fill={color} />
          </svg>
        );
    }
  }

  // =========================================================================
  // 3. CYBER MECHA / SCI-FI HUD (Geometric, 45-degree angle chamfers)
  // =========================================================================
  if (theme === 'cyber') {
    switch (name) {
      case 'tree': // Tactical Radar Mesh
        return (
          <svg {...commonSvgProps}>
            <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" fill="none" stroke={color} strokeWidth="1.8" />
            <circle cx="12" cy="12" r="3" fill={color} />
            <line x1="12" y1="2" x2="12" y2="9" stroke={color} strokeWidth="1.5" />
            <line x1="12" y1="15" x2="12" y2="22" stroke={color} strokeWidth="1.5" />
          </svg>
        );
      case 'docs': // Data Chip Memory Holocron
        return (
          <svg {...commonSvgProps}>
            <polygon points="4,2 18,2 21,5 21,22 4,22" fill="none" stroke={color} strokeWidth="1.8" />
            <rect x="7" y="7" width="10" height="2" fill={color} />
            <rect x="7" y="11" width="7" height="2" fill={color} />
            <polygon points="13,16 17,16 17,20 13,20" fill={color} />
          </svg>
        );
      case 'quests': // Targeting Reticle Crosshair
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="8" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="5 3" />
            <circle cx="12" cy="12" r="2" fill={color} />
            <line x1="12" y1="1" x2="12" y2="5" stroke={color} strokeWidth="2" />
            <line x1="12" y1="19" x2="12" y2="23" stroke={color} strokeWidth="2" />
            <line x1="1" y1="12" x2="5" y2="12" stroke={color} strokeWidth="2" />
            <line x1="19" y1="12" x2="23" y2="12" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'sun': // Fusion Core Light
        return (
          <svg {...commonSvgProps}>
            <polygon points="12,3 21,12 12,21 3,12" fill="none" stroke={color} strokeWidth="2" />
            <polygon points="12,7 17,12 12,17 7,12" fill={color} />
          </svg>
        );
      case 'moon': // Cyber Stealth Night Crescent
        return (
          <svg {...commonSvgProps}>
            <path
              d="M12 2A10 10 0 1 0 22 12a10.2 10.2 0 0 1-10-10z"
              fill={color}
            />
            <polygon points="17,6 19,8 17,10 15,8" fill={color} />
          </svg>
        );
      case 'tv': // HUD Visor Waveform
        return (
          <svg {...commonSvgProps}>
            <polygon points="2,6 22,6 19,19 5,19" fill="none" stroke={color} strokeWidth="1.8" />
            <path d="M7 13h3l2-3 2 6 2-3h2" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        );
      case 'volume': // Audio Spectrum Visualizer
        return (
          <svg {...commonSvgProps}>
            <rect x="3" y="10" width="2" height="5" fill={color} />
            <rect x="7" y="6" width="2" height="13" fill={color} />
            <rect x="11" y="3" width="2" height="18" fill={color} />
            <rect x="15" y="8" width="2" height="9" fill={color} />
            <rect x="19" y="11" width="2" height="3" fill={color} />
          </svg>
        );
      case 'mute':
        return (
          <svg {...commonSvgProps}>
            <rect x="3" y="11" width="18" height="2" fill={color} />
            <line x1="5" y1="5" x2="19" y2="19" stroke={color} strokeWidth="1.8" />
          </svg>
        );
      case 'globe': // Hologram Matrix Globe
        return (
          <svg {...commonSvgProps}>
            <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" fill="none" stroke={color} strokeWidth="1.5" />
            <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1.5" />
            <ellipse cx="12" cy="12" rx="4" ry="9" stroke={color} strokeWidth="1.5" fill="none" />
          </svg>
        );
      case 'mastered': // Diamond Cyber Seal
        return (
          <svg {...commonSvgProps}>
            <polygon points="12,2 22,12 12,22 2,12" fill={color} />
            <polygon points="12,6 18,12 12,18 6,12" fill="var(--bg-app)" />
            <circle cx="12" cy="12" r="2" fill={color} />
          </svg>
        );
      case 'learning': // Plasma Battery
        return (
          <svg {...commonSvgProps}>
            <polygon points="13,2 4,14 11,14 11,22 20,10 13,10" fill={color} />
          </svg>
        );
      case 'locked': // Encrypted Bracket Barrier
        return (
          <svg {...commonSvgProps}>
            <path d="M4 8V4h4m8 0h4v4m0 8v4h-4M8 20H4v-4" stroke={color} strokeWidth="2" fill="none" />
            <rect x="9" y="10" width="6" height="6" fill={color} />
          </svg>
        );
      case 'edit': // Laser Stylus
        return (
          <svg {...commonSvgProps}>
            <path d="M19 3l2 2-11 11-4 1 1-4L19 3zM3 21h18" stroke={color} strokeWidth="1.8" fill="none" />
          </svg>
        );
      case 'save': // Data Core
        return (
          <svg {...commonSvgProps}>
            <polygon points="6,2 18,2 21,5 21,22 3,22 3,5" stroke={color} strokeWidth="1.8" fill="none" />
            <circle cx="12" cy="14" r="4" stroke={color} strokeWidth="1.8" fill="none" />
          </svg>
        );
      case 'download':
        return (
          <svg {...commonSvgProps}>
            <path d="M12 3v13m-6-6l6 6 6-6M3 21h18" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </svg>
        );
      case 'close':
        return (
          <svg {...commonSvgProps}>
            <polygon points="12,9 18,3 21,6 15,12 21,18 18,21 12,15 6,21 3,18 9,12 3,6 6,3" fill={color} />
          </svg>
        );
      case 'search':
        return (
          <svg {...commonSvgProps}>
            <polygon points="9,3 15,3 19,7 19,13 15,17 9,17 5,13 5,7" stroke={color} strokeWidth="1.8" fill="none" />
            <line x1="16" y1="16" x2="22" y2="22" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'zoomIn':
        return (
          <svg {...commonSvgProps}>
            <circle cx="10" cy="10" r="7" stroke={color} strokeWidth="1.8" fill="none" />
            <path d="M10 7v6m-3-3h6M15 15l6 6" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );
      case 'zoomOut':
        return (
          <svg {...commonSvgProps}>
            <circle cx="10" cy="10" r="7" stroke={color} strokeWidth="1.8" fill="none" />
            <path d="M7 10h6M15 15l6 6" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );
      case 'reset':
        return (
          <svg {...commonSvgProps}>
            <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" stroke={color} strokeWidth="1.8" fill="none" />
            <circle cx="12" cy="12" r="3" fill={color} />
          </svg>
        );
      case 'brand':
        return (
          <svg {...commonSvgProps}>
            <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" fill="none" stroke={color} strokeWidth="1.8" />
            <circle cx="12" cy="12" r="4" fill="none" stroke={color} strokeWidth="1.8" />
            <circle cx="12" cy="12" r="1.5" fill={color} />
          </svg>
        );
      case 'design':
        return (
          <svg {...commonSvgProps}>
            <polygon points="12,3 20,8 20,16 12,21 4,16 4,8" fill="none" stroke={color} strokeWidth="1.5" />
            <circle cx="12" cy="12" r="3" fill={color} />
            <line x1="12" y1="3" x2="12" y2="9" stroke={color} strokeWidth="1.5" />
          </svg>
        );
      case 'code':
        return (
          <svg {...commonSvgProps}>
            <path d="M8 6L3 12l5 6M16 6l5 6-5 6M14 4l-4 16" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'qa':
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" fill="none" />
            <path d="M4 12h5M15 12h5M12 4v5M12 15v5" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'art':
        return (
          <svg {...commonSvgProps}>
            <polygon points="12,3 21,9 17,21 7,21 3,9" fill="none" stroke={color} strokeWidth="1.5" />
            <line x1="12" y1="3" x2="12" y2="21" stroke={color} strokeWidth="1.2" />
            <line x1="3" y1="9" x2="17" y2="21" stroke={color} strokeWidth="1.2" />
            <line x1="21" y1="9" x2="7" y2="21" stroke={color} strokeWidth="1.2" />
          </svg>
        );
      case 'audio':
        return (
          <svg {...commonSvgProps}>
            <path d="M3 9h5l5-5v16l-5-5H3V9z" fill="none" stroke={color} strokeWidth="1.8" />
            <path d="M17 7a6 6 0 010 10M20 4a10 10 0 010 16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );
      case 'boss':
        return (
          <svg {...commonSvgProps}>
            <path d="M5 4l7-2 7 2v8l-4 8H9L5 12V4z" fill="none" stroke={color} strokeWidth="1.8" />
            <rect x="8" y="8" width="8" height="3" fill={color} />
            <path d="M10 15h4" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'production':
        return (
          <svg {...commonSvgProps}>
            <path d="M12 2l5 6-2 10-3 2-3-2-2-10 5-6z" fill="none" stroke={color} strokeWidth="1.8" />
            <path d="M5 15l-3 4 3 1M19 15l3 4-3 1M12 10v4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );
      case 'drag':
        return (
          <svg {...commonSvgProps}>
            <circle cx="9" cy="8" r="1.5" fill={color} />
            <circle cx="15" cy="8" r="1.5" fill={color} />
            <circle cx="9" cy="12" r="1.5" fill={color} />
            <circle cx="15" cy="12" r="1.5" fill={color} />
            <circle cx="9" cy="16" r="1.5" fill={color} />
            <circle cx="15" cy="16" r="1.5" fill={color} />
          </svg>
        );
      case 'open':
        return (
          <svg {...commonSvgProps}>
            <path d="M13 3h8v8M21 3l-10 10M5 7H3v14h14v-2" stroke={color} strokeWidth="1.8" fill="none" />
          </svg>
        );
      case 'font':
        return (
          <svg {...commonSvgProps}>
            <polygon points="12,2 19,22 15,22 13.5,17 10.5,17 9,22 5,22" fill="none" stroke={color} strokeWidth="1.8" />
            <line x1="10" y1="14" x2="14" y2="14" stroke={color} strokeWidth="2" />
          </svg>
        );
    }
  }

  // =========================================================================
  // 4. DARK FANTASY / ELDEN RUNIC (Gothic, Heraldic, Ancient Scroll)
  // =========================================================================
  if (theme === 'fantasy') {
    switch (name) {
      case 'tree': // Yggdrasil World Tree Crest
        return (
          <svg {...commonSvgProps}>
            <path d="M12 22V12m0 0C10 9 6 8 4 10m8 2c2-3 6-4 8-2m-8 2c0-4 3-7 6-8m-6 8c0-4-3-7-6-8" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="12" cy="4" r="2.5" fill={color} />
          </svg>
        );
      case 'docs': // Ancient Leather Grimoire
        return (
          <svg {...commonSvgProps}>
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20V3H6.5A2.5 2.5 0 004 5.5v14z" fill="none" stroke={color} strokeWidth="2" />
            <line x1="8" y1="7" x2="16" y2="7" stroke={color} strokeWidth="1.8" />
            <line x1="8" y1="11" x2="14" y2="11" stroke={color} strokeWidth="1.8" />
            <polygon points="11,14 13,14 12,16" fill={color} />
          </svg>
        );
      case 'quests': // Crossed Broadswords & Shield
        return (
          <svg {...commonSvgProps}>
            <path d="M12 2l8 4v7c0 5-4 9-8 9s-8-4-8-9V6l8-4z" fill="none" stroke={color} strokeWidth="2" />
            <path d="M12 6v10m-3-7h6" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'sun': // Sacred Solar Wheel
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" fill="none" />
            <path d="M12 4v16M4 12h16m-6-6l-4 4m8 0l-4-4" stroke={color} strokeWidth="1.5" />
          </svg>
        );
      case 'moon': // Eclipse Crescent
        return (
          <svg {...commonSvgProps}>
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill={color} />
          </svg>
        );
      case 'tv': // Scrying Magic Mirror
        return (
          <svg {...commonSvgProps}>
            <ellipse cx="12" cy="10" rx="8" ry="8" stroke={color} strokeWidth="2" fill="none" />
            <path d="M12 18v5m-4 0h8" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="10" r="3" fill={color} opacity="0.4" />
          </svg>
        );
      case 'volume': // Heraldic Battle Horn
        return (
          <svg {...commonSvgProps}>
            <path d="M3 10v4l5 2 10 5V3L8 8l-5 2z" fill="none" stroke={color} strokeWidth="1.8" />
            <path d="M19 8c2 2 2 6 0 8" stroke={color} strokeWidth="1.8" fill="none" />
          </svg>
        );
      case 'mute':
        return (
          <svg {...commonSvgProps}>
            <path d="M3 10v4l5 2 10 5V3L8 8l-5 2z" fill="none" stroke={color} strokeWidth="1.8" />
            <line x1="2" y1="2" x2="22" y2="22" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'globe': // Astrolabe
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
            <ellipse cx="12" cy="12" rx="4" ry="9" stroke={color} strokeWidth="1.5" fill="none" />
            <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1.5" />
          </svg>
        );
      case 'mastered': // Runic Golden Crown
        return (
          <svg {...commonSvgProps}>
            <path d="M3 18l2-12 5 6 4-8 5 8 2-6 2 12H3z" fill={color} stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        );
      case 'learning': // Burning Torch
        return (
          <svg {...commonSvgProps}>
            <path d="M9 21h6l-1-9H10l-1 9z" fill={color} />
            <path d="M12 3c3 2 4 5 1 7 2-1 3-3 2-5-2 3-5 3-3-2z" fill={color} />
          </svg>
        );
      case 'locked': // Heavy Runic Padlock
        return (
          <svg {...commonSvgProps}>
            <path d="M6 10h12v11H6z" fill="none" stroke={color} strokeWidth="2" />
            <path d="M8 10V6a4 4 0 018 0v4" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="12" cy="15" r="1.5" fill={color} />
          </svg>
        );
      case 'edit': // Raven Quill & Ink
        return (
          <svg {...commonSvgProps}>
            <path d="M20 2c-4 2-12 8-14 14l-2 6 6-2c6-2 12-10 14-14z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
          </svg>
        );
      case 'save': // Wax Seal
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="7" stroke={color} strokeWidth="2" fill="none" />
            <path d="M12 8v8m-4-4h8" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'download':
        return (
          <svg {...commonSvgProps}>
            <path d="M12 3v12m-6-6l6 6 6-6M4 21h16" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        );
      case 'close':
        return (
          <svg {...commonSvgProps}>
            <path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'search':
        return (
          <svg {...commonSvgProps}>
            <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none" />
            <line x1="16" y1="16" x2="21" y2="21" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case 'zoomIn':
        return (
          <svg {...commonSvgProps}>
            <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none" />
            <path d="M11 8v6m-3-3h6M16 16l5 5" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'zoomOut':
        return (
          <svg {...commonSvgProps}>
            <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none" />
            <path d="M8 11h6M16 16l5 5" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'reset':
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="2" fill={color} />
          </svg>
        );
      case 'brand':
        return (
          <svg {...commonSvgProps}>
            <path d="M12 2l8 3v7c0 6-8 10-8 10S4 18 4 12V5l8-3z" fill="none" stroke={color} strokeWidth="2" />
            <path d="M12 7v10M8 11h8" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'design':
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" fill="none" />
            <path d="M12 4v4M12 16v4M4 12h4M16 12h4M12 12l4-4" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'code':
        return (
          <svg {...commonSvgProps}>
            <path d="M6 4h12M12 4v16M7 10l5 5 5-5M9 20h6" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'qa':
        return (
          <svg {...commonSvgProps}>
            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" fill="none" stroke={color} strokeWidth="2" />
            <circle cx="12" cy="12" r="3" fill={color} />
          </svg>
        );
      case 'art':
        return (
          <svg {...commonSvgProps}>
            <path d="M19 3C14 4 11 8 10 12l-5 7 2 2 7-5c4-1 8-4 9-9-4 0-4-4-4-4z" fill="none" stroke={color} strokeWidth="1.8" />
            <path d="M5 21l3-1" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'audio':
        return (
          <svg {...commonSvgProps}>
            <path d="M4 10h4l6-6v16l-6-6H4v-4z" fill="none" stroke={color} strokeWidth="2" />
            <path d="M17 9c1.5 1 2 2 2 3s-.5 2-2 3" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'boss':
        return (
          <svg {...commonSvgProps}>
            <path d="M4 7l4 3 4-6 4 6 4-3v11H4V7z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
            <circle cx="12" cy="13" r="2" fill={color} />
          </svg>
        );
      case 'production':
        return (
          <svg {...commonSvgProps}>
            <path d="M3 8l4 4 5-7 5 7 4-4v10H3V8z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
            <path d="M3 18h18" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'drag':
        return (
          <svg {...commonSvgProps}>
            <circle cx="8" cy="8" r="1.5" stroke={color} strokeWidth="1.5" fill="none" />
            <circle cx="16" cy="8" r="1.5" stroke={color} strokeWidth="1.5" fill="none" />
            <circle cx="8" cy="12" r="1.5" stroke={color} strokeWidth="1.5" fill="none" />
            <circle cx="16" cy="12" r="1.5" stroke={color} strokeWidth="1.5" fill="none" />
            <circle cx="8" cy="16" r="1.5" stroke={color} strokeWidth="1.5" fill="none" />
            <circle cx="16" cy="16" r="1.5" stroke={color} strokeWidth="1.5" fill="none" />
          </svg>
        );
      case 'open':
        return (
          <svg {...commonSvgProps}>
            <path d="M7 21V7a5 5 0 0110 0v14M12 11v4" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        );
      case 'font':
        return (
          <svg {...commonSvgProps}>
            <path d="M12 2l7 20h-3l-2-6h-4l-2 6H5l7-20zm0 6l-1.5 5h3L12 8z" fill={color} />
          </svg>
        );
    }
  }

  // Fallback
  return (
    <svg {...commonSvgProps}>
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
    </svg>
  );
};
