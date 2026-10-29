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
  | 'font'
  | 'langVi'
  | 'langEn';

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
      case 'langVi':
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="2" y="4" width="20" height="16" fill="none" stroke={color} strokeWidth="2" />
            <rect x="11" y="7" width="2" height="2" fill={color} />
            <rect x="8" y="9" width="8" height="2" fill={color} />
            <rect x="9" y="11" width="6" height="2" fill={color} />
            <rect x="10" y="13" width="4" height="2" fill={color} />
            <rect x="9" y="15" width="2" height="2" fill={color} />
            <rect x="13" y="15" width="2" height="2" fill={color} />
          </svg>
        );
      case 'langEn':
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="6" y="2" width="12" height="20" fill="none" stroke={color} strokeWidth="2" />
            <rect x="2" y="6" width="20" height="12" fill="none" stroke={color} strokeWidth="2" />
            <rect x="4" y="4" width="16" height="16" fill="none" stroke={color} strokeWidth="2" />
            <rect x="2" y="11" width="20" height="2" fill={color} />
            <rect x="11" y="2" width="2" height="20" fill={color} />
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
      case 'langVi':
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <rect x="3" y="3" width="18" height="18" fill="none" stroke={color} strokeWidth="2" />
            <rect x="11" y="6" width="2" height="3" fill={color} />
            <rect x="7" y="9" width="10" height="2" fill={color} />
            <rect x="9" y="11" width="6" height="2" fill={color} />
            <rect x="8" y="13" width="3" height="3" fill={color} />
            <rect x="13" y="13" width="3" height="3" fill={color} />
          </svg>
        );
      case 'langEn':
        return (
          <svg {...commonSvgProps} shapeRendering="crispEdges">
            <path d="M7 2h10v2h4v4h2v8h-2v4h-4v2H7v-2H3v-4H1V8h2V4h4V2zm1 3H6v2H4v8h2v2h2v2h8v-2h2v-2h2V7h-2V5h-2V3H8v2z" fill={color} />
            <rect x="3" y="11" width="18" height="2" fill={color} />
            <rect x="11" y="3" width="2" height="18" fill={color} />
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
      case 'langVi':
        return (
          <svg {...commonSvgProps}>
            <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" fill="none" stroke={color} strokeWidth="1.8" />
            <polygon points="12,6 13.8,10.2 18.2,10.5 14.8,13.4 15.8,17.7 12,15.2 8.2,17.7 9.2,13.4 5.8,10.5 10.2,10.2" fill={color} />
            <circle cx="12" cy="12" r="1.5" fill="var(--bg-app)" />
          </svg>
        );
      case 'langEn':
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" fill="none" />
            <ellipse cx="12" cy="12" rx="4.5" ry="9" stroke={color} strokeWidth="1.5" fill="none" />
            <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1.5" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke={color} strokeWidth="1" strokeDasharray="3 2" fill="none" />
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
      case 'langVi':
        return (
          <svg {...commonSvgProps}>
            <path d="M12 2C7 2 4 4 4 9c0 7 8 13 8 13s8-6 8-13c0-5-3-7-8-7z" fill="none" stroke={color} strokeWidth="1.8" />
            <polygon points="12,6 13.5,9.5 17,9.8 14.2,12.2 15,15.8 12,13.8 9,15.8 9.8,12.2 7,9.8 10.5,9.5" fill={color} />
          </svg>
        );
      case 'langEn':
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" fill="none" />
            <ellipse cx="12" cy="12" rx="9" ry="4" stroke={color} strokeWidth="1.5" fill="none" />
            <line x1="12" y1="3" x2="12" y2="21" stroke={color} strokeWidth="1.5" />
            <polygon points="12,1 14,4 10,4" fill={color} />
            <polygon points="12,23 14,20 10,20" fill={color} />
          </svg>
        );
    }
  }

  // =========================================================================
  // 5. 1930s INKWELL / RUBBER HOSE (Vintage Hand-Drawn Cartoon & Ink Cel Style)
  // =========================================================================
  if (theme === 'inkwell') {
    switch (name) {
      case 'tree':
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="5" r="3" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="6" cy="18" r="3" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="18" cy="18" r="3" stroke={color} strokeWidth="2" fill="none" />
            <path d="M12 8v4c0 3-4 3-4 6M12 12c0 3 4 3 4 6" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="12" cy="5" r="1" fill={color} />
          </svg>
        );
      case 'docs':
        return (
          <svg {...commonSvgProps}>
            <path d="M5 4c0-1.1.9-2 2-2h8l5 5v13a2 2 0 01-2 2H7a2 2 0 01-2-2V4z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
            <path d="M14 2v6h6M8 12h8M8 16h6" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <circle cx="15" cy="16" r="0.8" fill={color} />
          </svg>
        );
      case 'quests':
        return (
          <svg {...commonSvgProps}>
            <path d="M7 4h10v6a5 5 0 01-10 0V4z" stroke={color} strokeWidth="2" fill="none" />
            <path d="M7 6H4a2 2 0 00-2 2v1a3 3 0 003 3h2M17 6h3a2 2 0 012 2v1a3 3 0 01-3 3h-2M12 15v4M8 19h8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="12" cy="8" r="1.5" fill={color} />
          </svg>
        );
      case 'sun':
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="2" fill="none" />
            <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <circle cx="10" cy="11" r="0.9" fill={color} />
            <circle cx="14" cy="11" r="0.9" fill={color} />
            <path d="M10.5 13.5c.8.8 2.2.8 3 0" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" />
          </svg>
        );
      case 'moon':
        return (
          <svg {...commonSvgProps}>
            <path d="M15 3.5a8.5 8.5 0 00-1.5 17 8.5 8.5 0 007.5-5.5 8.5 8.5 0 01-6-11.5z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="11" cy="11" r="1" fill={color} />
            <path d="M10 14c1 .8 2.5.5 3-.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" />
          </svg>
        );
      case 'tv':
        return (
          <svg {...commonSvgProps}>
            <rect x="3" y="6" width="18" height="14" rx="3" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="10" cy="13" r="4.5" stroke={color} strokeWidth="1.8" fill="none" />
            <circle cx="17" cy="10" r="1.5" fill={color} />
            <circle cx="17" cy="15" r="1.5" fill={color} />
            <path d="M8 3l4 3M16 3l-4 3" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'volume':
        return (
          <svg {...commonSvgProps}>
            <path d="M3 9h4l5-4v14l-5-4H3a1 1 0 01-1-1v-4a1 1 0 011-1z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
            <path d="M16 8a4.5 4.5 0 010 8M19 5.5a8.5 8.5 0 010 13" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        );
      case 'mute':
        return (
          <svg {...commonSvgProps}>
            <path d="M3 9h4l5-4v14l-5-4H3a1 1 0 01-1-1v-4a1 1 0 011-1z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
            <line x1="16" y1="9" x2="22" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line x1="22" y1="9" x2="16" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'globe':
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
            <ellipse cx="12" cy="12" rx="4.5" ry="9" stroke={color} strokeWidth="1.8" fill="none" />
            <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1.8" />
            <path d="M5 7h14M5 17h14" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        );
      case 'mastered':
        return (
          <svg {...commonSvgProps}>
            <polygon points="12,2 15,8.5 22,9.5 17,14.5 18.5,21.5 12,18 5.5,21.5 7,14.5 2,9.5 9,8.5" stroke={color} strokeWidth="2" strokeLinejoin="round" fill={color} />
          </svg>
        );
      case 'learning':
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
            <polyline points="12,6 12,12 16,15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="12" cy="12" r="1.5" fill={color} />
          </svg>
        );
      case 'locked':
        return (
          <svg {...commonSvgProps}>
            <rect x="5" y="11" width="14" height="10" rx="2.5" stroke={color} strokeWidth="2" fill="none" />
            <path d="M8 11V7a4 4 0 018 0v4" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="12" cy="15" r="1.5" fill={color} />
            <path d="M12 16.5v2.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );
      case 'edit':
        return (
          <svg {...commonSvgProps}>
            <path d="M4 20l4-1 11-11a2.1 2.1 0 00-3-3L5 16l-1 4z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M14 5l3 3M7 17l2 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="4" cy="20" r="1" fill={color} />
          </svg>
        );
      case 'save':
        return (
          <svg {...commonSvgProps}>
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <path d="M17 21v-8H7v8M7 3v5h8" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="10" cy="6" r="1" fill={color} />
          </svg>
        );
      case 'download':
        return (
          <svg {...commonSvgProps}>
            <path d="M12 3v12M7 10l5 5 5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        );
      case 'close':
        return (
          <svg {...commonSvgProps}>
            <line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case 'search':
        return (
          <svg {...commonSvgProps}>
            <circle cx="10.5" cy="10.5" r="6.5" stroke={color} strokeWidth="2" fill="none" />
            <line x1="15.5" y1="15.5" x2="21" y2="21" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M8 8a3 3 0 013-1" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        );
      case 'zoomIn':
        return (
          <svg {...commonSvgProps}>
            <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none" />
            <line x1="16" y1="16" x2="21" y2="21" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="11" y1="8" x2="11" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line x1="8" y1="11" x2="14" y2="11" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'zoomOut':
        return (
          <svg {...commonSvgProps}>
            <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none" />
            <line x1="16" y1="16" x2="21" y2="21" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="8" y1="11" x2="14" y2="11" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'reset':
        return (
          <svg {...commonSvgProps}>
            <path d="M20 12a8 8 0 11-2.4-5.7L20 9" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
            <polyline points="20,4 20,9 15,9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        );
      case 'brand':
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
            <ellipse cx="9" cy="10" rx="1.5" ry="2.5" fill={color} />
            <ellipse cx="15" cy="10" rx="1.5" ry="2.5" fill={color} />
            <circle cx="8.5" cy="9" r="0.6" fill="var(--bg-app)" />
            <circle cx="14.5" cy="9" r="0.6" fill="var(--bg-app)" />
            <path d="M8 14.5c1.5 2 6.5 2 8 0" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <circle cx="12" cy="13.5" r="0.8" fill={color} />
          </svg>
        );
      case 'design':
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="5" r="2.5" stroke={color} strokeWidth="2" fill="none" />
            <path d="M12 7.5L5 21M12 7.5L19 21M8 15h8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="5" r="1" fill={color} />
          </svg>
        );
      case 'code':
        return (
          <svg {...commonSvgProps}>
            <polyline points="8,8 4,12 8,16" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <polyline points="16,8 20,12 16,16" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <line x1="14" y1="5" x2="10" y2="19" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'qa':
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="14" r="5.5" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="12" cy="6.5" r="2.5" stroke={color} strokeWidth="2" fill="none" />
            <path d="M12 9v11M5 12h14M5 16h14" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            <path d="M10 4.5l-2-2M14 4.5l2-2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );
      case 'art':
        return (
          <svg {...commonSvgProps}>
            <path d="M12 3a9 9 0 000 18c2 0 4-1 4-3a2 2 0 00-2-2h-2a2 2 0 01-2-2 4 4 0 014-4h2a5 5 0 005-5c0-4-4-7-9-7z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
            <circle cx="7.5" cy="9" r="1.3" fill={color} />
            <circle cx="12" cy="6.5" r="1.3" fill={color} />
            <circle cx="16.5" cy="9.5" r="1.3" fill={color} />
            <circle cx="8" cy="14" r="1" fill={color} />
          </svg>
        );
      case 'audio':
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.8" fill="none" />
            <circle cx="12" cy="12" r="1.5" fill={color} />
            <path d="M12 3a9 9 0 019 9M3 12a9 9 0 019-9" stroke={color} strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
          </svg>
        );
      case 'boss':
        return (
          <svg {...commonSvgProps}>
            <path d="M7 8V3h10v5" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <line x1="4" y1="8" x2="20" y2="8" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="12" cy="15" r="5.5" stroke={color} strokeWidth="2" fill="none" />
            <ellipse cx="10" cy="13.5" rx="1" ry="1.5" fill={color} />
            <circle cx="14.5" cy="13.5" r="2" stroke={color} strokeWidth="1.5" fill="none" />
            <path d="M10 18c1-1 3-1 4 0" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </svg>
        );
      case 'production':
        return (
          <svg {...commonSvgProps}>
            <rect x="3" y="9" width="18" height="12" rx="1" stroke={color} strokeWidth="2" fill="none" />
            <path d="M3 9l3-5h15l-3 5H3z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <line x1="8" y1="4" x2="6" y2="9" stroke={color} strokeWidth="1.8" />
            <line x1="13" y1="4" x2="11" y2="9" stroke={color} strokeWidth="1.8" />
            <line x1="18" y1="4" x2="16" y2="9" stroke={color} strokeWidth="1.8" />
          </svg>
        );
      case 'drag':
        return (
          <svg {...commonSvgProps}>
            <circle cx="8" cy="8" r="1.5" fill={color} />
            <circle cx="16" cy="8" r="1.5" fill={color} />
            <circle cx="8" cy="12" r="1.5" fill={color} />
            <circle cx="16" cy="12" r="1.5" fill={color} />
            <circle cx="8" cy="16" r="1.5" fill={color} />
            <circle cx="16" cy="16" r="1.5" fill={color} />
          </svg>
        );
      case 'open':
        return (
          <svg {...commonSvgProps}>
            <path d="M14 4h6v6M20 4L10 14M5 9H4a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-1" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        );
      case 'font':
        return (
          <svg {...commonSvgProps}>
            <path d="M12 3l6 18h-3.5l-1.5-5H11l-1.5 5H6l6-18z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill="none" />
            <line x1="9.5" y1="14" x2="14.5" y2="14" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'langVi':
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
            <polygon points="12,5 14,9 18,9.5 15,12 16,16 12,14 8,16 9,12 6,9.5 10,9" fill={color} />
          </svg>
        );
      case 'langEn':
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
            <ellipse cx="12" cy="12" rx="4" ry="9" stroke={color} strokeWidth="1.6" fill="none" />
            <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1.8" />
          </svg>
        );
    }
  }

  // =========================================================================
  // 6. OUTRUN 1984 / SYNTHWAVE NEON (80s Retrowave, Wireframe Grid & Laser)
  // =========================================================================
  if (theme === 'synthwave') {
    switch (name) {
      case 'tree':
        return (
          <svg {...commonSvgProps}>
            <line x1="2" y1="20" x2="22" y2="20" stroke={color} strokeWidth="1.8" />
            <line x1="12" y1="4" x2="2" y2="20" stroke={color} strokeWidth="1.8" />
            <line x1="12" y1="4" x2="22" y2="20" stroke={color} strokeWidth="1.8" />
            <line x1="12" y1="4" x2="8" y2="20" stroke={color} strokeWidth="1.4" />
            <line x1="12" y1="4" x2="16" y2="20" stroke={color} strokeWidth="1.4" />
            <line x1="5" y1="15" x2="19" y2="15" stroke={color} strokeWidth="1.4" />
            <line x1="7.5" y1="11" x2="16.5" y2="11" stroke={color} strokeWidth="1.4" />
            <circle cx="12" cy="4" r="2" fill={color} />
          </svg>
        );
      case 'docs':
        return (
          <svg {...commonSvgProps}>
            {/* 80s Compact Cassette Tape */}
            <rect x="2" y="5" width="20" height="14" rx="2" stroke={color} strokeWidth="2" fill="none" />
            <rect x="5" y="8" width="14" height="6" rx="1" stroke={color} strokeWidth="1.4" fill="none" />
            <circle cx="8" cy="11" r="1.8" stroke={color} strokeWidth="1.4" fill="none" />
            <circle cx="16" cy="11" r="1.8" stroke={color} strokeWidth="1.4" fill="none" />
            <line x1="10" y1="11" x2="14" y2="11" stroke={color} strokeWidth="1.2" />
            <polygon points="4,19 7,16 17,16 20,19" fill={color} opacity="0.3" />
          </svg>
        );
      case 'quests':
        return (
          <svg {...commonSvgProps}>
            {/* 80s Neon Lightning Trophy */}
            <polygon points="13,2 4,12 11,12 9,22 20,10 13,10" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill="none" />
            <circle cx="7" cy="5" r="1" fill={color} />
            <circle cx="18" cy="17" r="1" fill={color} />
          </svg>
        );
      case 'sun':
        return (
          <svg {...commonSvgProps}>
            {/* Iconic Sliced Synthwave Sunset Sun */}
            <path d="M4 12 A8 8 0 0 1 20 12" stroke={color} strokeWidth="2" fill="none" />
            <line x1="4" y1="12" x2="20" y2="12" stroke={color} strokeWidth="2" />
            <line x1="5" y1="9" x2="19" y2="9" stroke={color} strokeWidth="1.6" />
            <line x1="7" y1="6.5" x2="17" y2="6.5" stroke={color} strokeWidth="1.6" />
            <line x1="2" y1="16" x2="22" y2="16" stroke={color} strokeWidth="1.6" strokeDasharray="3 2" />
            <line x1="1" y1="19" x2="23" y2="19" stroke={color} strokeWidth="1.6" />
          </svg>
        );
      case 'moon':
        return (
          <svg {...commonSvgProps}>
            {/* 80s Laser Sliced Crescent Moon */}
            <path d="M14 3.5a8.5 8.5 0 000 17 8.5 8.5 0 006-2.5 8.5 8.5 0 01-6-14.5z" stroke={color} strokeWidth="2" fill="none" />
            <line x1="6" y1="8" x2="14" y2="8" stroke={color} strokeWidth="1.4" />
            <line x1="5" y1="12" x2="15" y2="12" stroke={color} strokeWidth="1.4" />
            <line x1="6" y1="16" x2="14" y2="16" stroke={color} strokeWidth="1.4" />
          </svg>
        );
      case 'tv':
        return (
          <svg {...commonSvgProps}>
            {/* 80s Sony Trinitron CRT Monitor */}
            <rect x="2" y="6" width="20" height="15" rx="3" stroke={color} strokeWidth="2" fill="none" />
            <rect x="4" y="8" width="13" height="11" rx="1.5" stroke={color} strokeWidth="1.4" fill="none" />
            <circle cx="19" cy="10" r="1.2" fill={color} />
            <circle cx="19" cy="14" r="1.2" fill={color} />
            <line x1="18" y1="17" x2="20" y2="17" stroke={color} strokeWidth="1.4" />
            <line x1="8" y1="2" x2="12" y2="6" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="16" y1="2" x2="12" y2="6" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );
      case 'volume':
        return (
          <svg {...commonSvgProps}>
            <polygon points="3,8 7,8 12,4 12,20 7,16 3,16" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <path d="M15 8.5a5 5 0 010 7M18 5.5a9 9 0 010 13" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        );
      case 'mute':
        return (
          <svg {...commonSvgProps}>
            <polygon points="3,8 7,8 12,4 12,20 7,16 3,16" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <line x1="16" y1="9" x2="22" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line x1="22" y1="9" x2="16" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'globe':
        return (
          <svg {...commonSvgProps}>
            {/* 80s Wireframe Vector Globe */}
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
            <ellipse cx="12" cy="12" rx="4.5" ry="9" stroke={color} strokeWidth="1.6" fill="none" />
            <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1.6" />
            <line x1="4.5" y1="7" x2="19.5" y2="7" stroke={color} strokeWidth="1.3" />
            <line x1="4.5" y1="17" x2="19.5" y2="17" stroke={color} strokeWidth="1.3" />
          </svg>
        );
      case 'mastered':
        return (
          <svg {...commonSvgProps}>
            {/* 80s Chrome 4-Point Starburst */}
            <path d="M12 2L14 9L21 12L14 15L12 22L10 15L3 12L10 9Z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill={color} />
          </svg>
        );
      case 'learning':
        return (
          <svg {...commonSvgProps}>
            {/* 80s Digital LED Segment Watch */}
            <rect x="6" y="2" width="12" height="20" rx="3" stroke={color} strokeWidth="2" fill="none" />
            <rect x="8" y="7" width="8" height="10" stroke={color} strokeWidth="1.4" fill="none" />
            <polyline points="10,12 12,12 12,9" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        );
      case 'locked':
        return (
          <svg {...commonSvgProps}>
            <rect x="5" y="10" width="14" height="11" rx="2" stroke={color} strokeWidth="2" fill="none" />
            <path d="M8 10V6a4 4 0 018 0v4" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="12" cy="15" r="1.5" fill={color} />
            <line x1="12" y1="16.5" x2="12" y2="18.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );
      case 'edit':
        return (
          <svg {...commonSvgProps}>
            {/* 80s Light Pen Drawing Vector Laser */}
            <polygon points="4,20 8,19 19,8 15,4 4,15" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <line x1="13" y1="6" x2="17" y2="10" stroke={color} strokeWidth="1.5" />
            <line x1="2" y1="22" x2="5" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'save':
        return (
          <svg {...commonSvgProps}>
            {/* 3.5-inch Micro Floppy Disk */}
            <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2" fill="none" />
            <path d="M6 3v7h12V3" stroke={color} strokeWidth="1.8" fill="none" />
            <rect x="9" y="4" width="4" height="4" fill={color} />
            <rect x="6" y="14" width="12" height="7" stroke={color} strokeWidth="1.6" fill="none" />
          </svg>
        );
      case 'download':
        return (
          <svg {...commonSvgProps}>
            <line x1="12" y1="3" x2="12" y2="15" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
            <polyline points="7,10 12,15 17,10" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M4 17v3a1 1 0 001 1h14a1 1 0 001-1v-3" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        );
      case 'close':
        return (
          <svg {...commonSvgProps}>
            <line x1="5" y1="5" x2="19" y2="19" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="19" y1="5" x2="5" y2="19" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case 'search':
        return (
          <svg {...commonSvgProps}>
            {/* 80s Radar Screen Grid */}
            <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="11" cy="11" r="3.5" stroke={color} strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
            <line x1="11" y1="7.5" x2="11" y2="14.5" stroke={color} strokeWidth="1.2" />
            <line x1="7.5" y1="11" x2="14.5" y2="11" stroke={color} strokeWidth="1.2" />
          </svg>
        );
      case 'zoomIn':
        return (
          <svg {...commonSvgProps}>
            <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="11" y1="8" x2="11" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line x1="8" y1="11" x2="14" y2="11" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'zoomOut':
        return (
          <svg {...commonSvgProps}>
            <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="8" y1="11" x2="14" y2="11" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'reset':
        return (
          <svg {...commonSvgProps}>
            {/* 80s Cassette Rewind Icons */}
            <polygon points="12,6 4,12 12,18" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill={color} />
            <polygon points="20,6 12,12 20,18" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill={color} />
          </svg>
        );
      case 'brand':
        return (
          <svg {...commonSvgProps}>
            {/* Classic 80s Neon Aviator Sunglasses */}
            <path d="M2 9h4l2 2h8l2-2h4" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M3 10c0 4 3 6.5 6 6.5s5-2 5-6.5H3z" stroke={color} strokeWidth="2" fill="none" />
            <path d="M10 10c0 4 3 6.5 6 6.5s5-2 5-6.5h-11z" stroke={color} strokeWidth="2" fill="none" />
            <line x1="4.5" y1="12" x2="7.5" y2="12" stroke={color} strokeWidth="1.4" />
            <line x1="16.5" y1="12" x2="19.5" y2="12" stroke={color} strokeWidth="1.4" />
          </svg>
        );
      case 'design':
        return (
          <svg {...commonSvgProps}>
            {/* 80s Drafting Calipers & Triangle Grid */}
            <polygon points="12,3 3,20 21,20" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <polygon points="12,9 7,17 17,17" stroke={color} strokeWidth="1.4" fill="none" />
            <circle cx="12" cy="3" r="1.5" fill={color} />
          </svg>
        );
      case 'code':
        return (
          <svg {...commonSvgProps}>
            {/* 80s CLI Terminal Prompt >_ */}
            <rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="2" fill="none" />
            <polyline points="6,9 10,12 6,15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <line x1="12" y1="15" x2="17" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'qa':
        return (
          <svg {...commonSvgProps}>
            {/* Robotic Electronic Cyber-Bug */}
            <circle cx="12" cy="13" r="5" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="12" cy="6" r="2.5" stroke={color} strokeWidth="1.8" fill="none" />
            <line x1="12" y1="8.5" x2="12" y2="18" stroke={color} strokeWidth="1.8" />
            <line x1="4" y1="11" x2="20" y2="11" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="5" y1="15" x2="19" y2="15" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            <path d="M10 4l-2-2M14 4l2-2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );
      case 'art':
        return (
          <svg {...commonSvgProps}>
            {/* 80s Airbrush / Spray Can with Laser Flare */}
            <rect x="7" y="9" width="10" height="12" rx="2" stroke={color} strokeWidth="2" fill="none" />
            <rect x="10" y="5" width="4" height="4" stroke={color} strokeWidth="1.8" fill="none" />
            <line x1="12" y1="3" x2="12" y2="5" stroke={color} strokeWidth="2" />
            <path d="M12 2l-3-1M12 2l3-1M12 2l0-1" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="9" y1="13" x2="15" y2="13" stroke={color} strokeWidth="1.5" />
          </svg>
        );
      case 'audio':
        return (
          <svg {...commonSvgProps}>
            {/* 80s Synthesizer Keytar */}
            <polygon points="4,7 18,3 21,5 7,21 3,19" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <line x1="7" y1="11" x2="13" y2="9" stroke={color} strokeWidth="1.6" />
            <line x1="9" y1="14" x2="15" y2="12" stroke={color} strokeWidth="1.6" />
            <line x1="11" y1="17" x2="17" y2="15" stroke={color} strokeWidth="1.6" />
            <circle cx="19" cy="4" r="1" fill={color} />
          </svg>
        );
      case 'boss':
        return (
          <svg {...commonSvgProps}>
            {/* 80s Robotic Cyborg Invader Boss */}
            <polygon points="12,2 20,7 18,17 12,21 6,17 4,7" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <rect x="7.5" y="8.5" width="3" height="3" fill={color} />
            <rect x="13.5" y="8.5" width="3" height="3" fill={color} />
            <line x1="8" y1="15" x2="16" y2="15" stroke={color} strokeWidth="1.8" />
          </svg>
        );
      case 'production':
        return (
          <svg {...commonSvgProps}>
            {/* 80s VHS Cassette Tape */}
            <rect x="3" y="6" width="18" height="12" rx="1.5" stroke={color} strokeWidth="2" fill="none" />
            <rect x="6" y="8" width="5" height="4" stroke={color} strokeWidth="1.4" fill="none" />
            <rect x="13" y="8" width="5" height="4" stroke={color} strokeWidth="1.4" fill="none" />
            <line x1="5" y1="15" x2="19" y2="15" stroke={color} strokeWidth="1.4" />
          </svg>
        );
      case 'drag':
        return (
          <svg {...commonSvgProps}>
            <circle cx="8" cy="8" r="1.5" fill={color} />
            <circle cx="16" cy="8" r="1.5" fill={color} />
            <circle cx="8" cy="12" r="1.5" fill={color} />
            <circle cx="16" cy="12" r="1.5" fill={color} />
            <circle cx="8" cy="16" r="1.5" fill={color} />
            <circle cx="16" cy="16" r="1.5" fill={color} />
          </svg>
        );
      case 'open':
        return (
          <svg {...commonSvgProps}>
            <polygon points="4,20 12,16 12,4 4,4" stroke={color} strokeWidth="2" fill="none" />
            <line x1="12" y1="4" x2="20" y2="4" stroke={color} strokeWidth="2" />
            <line x1="20" y1="4" x2="20" y2="20" stroke={color} strokeWidth="2" />
            <line x1="12" y1="16" x2="20" y2="20" stroke={color} strokeWidth="2" />
            <circle cx="7" cy="12" r="1" fill={color} />
          </svg>
        );
      case 'font':
        return (
          <svg {...commonSvgProps}>
            {/* 80s Bold Chrome Letter A with Horizon Slice */}
            <polygon points="12,2 19,21 15,21 13.5,16 10.5,16 9,21 5,21" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill="none" />
            <line x1="7" y1="14" x2="17" y2="14" stroke={color} strokeWidth="2" />
            <line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        );
      case 'langVi':
        return (
          <svg {...commonSvgProps}>
            <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" stroke={color} strokeWidth="1.8" fill="none" />
            <polygon points="12,6 14,10 18,10.5 15,13.5 16,17.5 12,15 8,17.5 9,13.5 6,10.5 10,10" fill={color} />
          </svg>
        );
      case 'langEn':
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" fill="none" />
            <ellipse cx="12" cy="12" rx="4.5" ry="9" stroke={color} strokeWidth="1.4" fill="none" />
            <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1.6" />
            <ellipse cx="12" cy="12" rx="9" ry="4" stroke={color} strokeWidth="1.2" strokeDasharray="3 2" fill="none" />
          </svg>
        );
    }
  }

  // =========================================================================
  // 7. GOTHIC ELDRITCH / BLOOD & IRON (Bloodborne & Cosmic Horror)
  // =========================================================================
  if (theme === 'gothic') {
    switch (name) {
      case 'tree':
        return (
          <svg {...commonSvgProps}>
            {/* Sprawling Gothic Spire & Spiked Iron Cross */}
            <line x1="12" y1="2" x2="12" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line x1="5" y1="8" x2="19" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <path d="M5 8l3 3M19 8l-3 3M12 2l-3 4h6l-3-4z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill={color} />
            <path d="M6 18c3-3 6-3 6 0M12 18c0-3 3-3 6 0" stroke={color} strokeWidth="1.6" fill="none" />
            <circle cx="12" cy="8" r="2" fill={color} />
          </svg>
        );
      case 'docs':
        return (
          <svg {...commonSvgProps}>
            {/* Cursed Grimoire Tome with Iron Clasp */}
            <path d="M4 3h13a3 3 0 013 3v14a2 2 0 01-2 2H5a3 3 0 01-3-3V5a2 2 0 012-2z" stroke={color} strokeWidth="2" fill="none" />
            <line x1="7" y1="3" x2="7" y2="22" stroke={color} strokeWidth="1.8" />
            <path d="M11 8h5M11 12h4M11 16h5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <polygon points="17,10 20,12 17,14" fill={color} />
          </svg>
        );
      case 'quests':
        return (
          <svg {...commonSvgProps}>
            {/* Gothic Blood Chalice / Holy Grail */}
            <path d="M6 3h12v6c0 3.5-2.5 6-6 6s-6-2.5-6-6V3z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <line x1="12" y1="15" x2="12" y2="20" stroke={color} strokeWidth="2.2" />
            <path d="M7 21h10" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="12" cy="8" r="2" fill={color} />
            <path d="M6 3c2 2 4 1 6 1s4-1 6-1" stroke={color} strokeWidth="1.5" fill="none" />
          </svg>
        );
      case 'sun':
        return (
          <svg {...commonSvgProps}>
            {/* Cursed Blood Moon Eclipse with Thorny Corona */}
            <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="2" fill="none" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <path d="M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            <path d="M9 12a3 3 0 003 3" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        );
      case 'moon':
        return (
          <svg {...commonSvgProps}>
            {/* Horned Eldritch Crescent Moon with Dripping Blood */}
            <path d="M15 3a9 9 0 00-3 17.5 9 9 0 009-4.5 9 9 0 01-9-13" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <circle cx="12" cy="17" r="1.5" fill={color} />
            <path d="M12 18.5v2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case 'tv':
        return (
          <svg {...commonSvgProps}>
            {/* Gothic Lancet Stained-Glass Window Shrine */}
            <path d="M4 21V9a8 8 0 0116 0v12H4z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <line x1="12" y1="2" x2="12" y2="21" stroke={color} strokeWidth="1.8" />
            <line x1="4" y1="13" x2="20" y2="13" stroke={color} strokeWidth="1.8" />
            <path d="M8 9a4 4 0 018 0" stroke={color} strokeWidth="1.5" fill="none" />
          </svg>
        );
      case 'volume':
        return (
          <svg {...commonSvgProps}>
            {/* Gothic Cathedral Bell Toll */}
            <path d="M6 16h12l-2-7a4 4 0 00-8 0l-2 7z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <line x1="4" y1="16" x2="20" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="19" r="1.8" fill={color} />
            <path d="M10 4a2 2 0 014 0" stroke={color} strokeWidth="2" fill="none" />
          </svg>
        );
      case 'mute':
        return (
          <svg {...commonSvgProps}>
            {/* Silenced Bell with Iron Impaling Spike */}
            <path d="M6 16h12l-2-7a4 4 0 00-8 0l-2 7z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <line x1="4" y1="16" x2="20" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line x1="4" y1="4" x2="20" y2="20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case 'globe':
        return (
          <svg {...commonSvgProps}>
            {/* Armillary Astrolabe with Eldritch Tentacles */}
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
            <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke={color} strokeWidth="1.6" fill="none" />
            <ellipse cx="12" cy="12" rx="9" ry="4" stroke={color} strokeWidth="1.6" fill="none" />
            <circle cx="12" cy="12" r="2" fill={color} />
          </svg>
        );
      case 'mastered':
        return (
          <svg {...commonSvgProps}>
            {/* Hunter's Mark / Bloodborne Brand Rune */}
            <line x1="12" y1="2" x2="12" y2="22" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M5 8c4 3 7 3 7 8M19 8c-4 3-7 3-7 8" stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none" />
            <circle cx="12" cy="4" r="2" fill={color} />
          </svg>
        );
      case 'learning':
        return (
          <svg {...commonSvgProps}>
            {/* Cyclopean Eldritch Eye Opening */}
            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <circle cx="12" cy="12" r="3.5" stroke={color} strokeWidth="1.8" fill="none" />
            <line x1="12" y1="9.5" x2="12" y2="14.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'locked':
        return (
          <svg {...commonSvgProps}>
            {/* Heavy Forged Iron Padlock with Spikes */}
            <rect x="5" y="11" width="14" height="10" rx="1" stroke={color} strokeWidth="2" fill="none" />
            <path d="M8 11V7a4 4 0 018 0v4" stroke={color} strokeWidth="2.2" fill="none" />
            <line x1="12" y1="14" x2="12" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="14" r="1.5" fill={color} />
            <polygon points="12,2 14,5 10,5" fill={color} />
          </svg>
        );
      case 'edit':
        return (
          <svg {...commonSvgProps}>
            {/* Bone Quill / Blood Scalpel */}
            <path d="M19 3a2.5 2.5 0 00-3.5 0L4 14.5V20h5.5L21 8.5A2.5 2.5 0 0019 3z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <line x1="14" y1="5.5" x2="18.5" y2="10" stroke={color} strokeWidth="1.8" />
            <line x1="7" y1="17.5" x2="10" y2="14.5" stroke={color} strokeWidth="1.5" />
          </svg>
        );
      case 'save':
        return (
          <svg {...commonSvgProps}>
            {/* Gothic Blood Vial Flask */}
            <rect x="9" y="2" width="6" height="4" rx="1" stroke={color} strokeWidth="1.8" fill="none" />
            <path d="M7 6h10l2 6v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8l2-6z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <line x1="6" y1="15" x2="18" y2="15" stroke={color} strokeWidth="1.5" />
            <circle cx="12" cy="18" r="1.5" fill={color} />
          </svg>
        );
      case 'download':
        return (
          <svg {...commonSvgProps}>
            <line x1="12" y1="2" x2="12" y2="15" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M6 10l6 6 6-6" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M4 19h16" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
      case 'close':
        return (
          <svg {...commonSvgProps}>
            {/* Crossed Spiked Executioner Blades */}
            <line x1="5" y1="5" x2="19" y2="19" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="19" y1="5" x2="5" y2="19" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="12" cy="12" r="2" fill={color} />
          </svg>
        );
      case 'search':
        return (
          <svg {...commonSvgProps}>
            {/* Divination Glass / Occult Eye */}
            <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none" />
            <line x1="16.5" y1="16.5" x2="22" y2="22" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="11" cy="11" r="2.5" fill={color} />
          </svg>
        );
      case 'zoomIn':
        return (
          <svg {...commonSvgProps}>
            <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="11" y1="8" x2="11" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line x1="8" y1="11" x2="14" y2="11" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'zoomOut':
        return (
          <svg {...commonSvgProps}>
            <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="8" y1="11" x2="14" y2="11" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'reset':
        return (
          <svg {...commonSvgProps}>
            {/* Ouroboros Serpent Ring */}
            <path d="M21 12a9 9 0 11-2.6-6.4L21 8" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
            <polygon points="21,3 21,8 16,8" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill={color} />
          </svg>
        );
      case 'brand':
        return (
          <svg {...commonSvgProps}>
            {/* Eldritch Plague Doctor Crow Mask / Great One Skull */}
            <path d="M6 7a6 6 0 0112 0c0 5-6 13-6 13S6 12 6 7z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <circle cx="10" cy="8" r="1.8" fill={color} />
            <circle cx="14" cy="8" r="1.8" fill={color} />
            <path d="M12 10v7" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );
      case 'design':
        return (
          <svg {...commonSvgProps}>
            {/* Barbed Gothic Drafting Calipers */}
            <circle cx="12" cy="4" r="2" stroke={color} strokeWidth="2" fill="none" />
            <line x1="12" y1="6" x2="5" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="6" x2="19" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <path d="M8 15h8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );
      case 'code':
        return (
          <svg {...commonSvgProps}>
            {/* Eldritch Runic Sigil / Arcane Glyph */}
            <polygon points="12,2 21,12 12,22 3,12" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill="none" />
            <line x1="12" y1="6" x2="12" y2="18" stroke={color} strokeWidth="1.8" />
            <line x1="6" y1="12" x2="18" y2="12" stroke={color} strokeWidth="1.8" />
          </svg>
        );
      case 'qa':
        return (
          <svg {...commonSvgProps}>
            {/* Abyssal Gargoyle Spider / Crypt Parasite */}
            <ellipse cx="12" cy="14" rx="4" ry="5" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="12" cy="7" r="2.5" stroke={color} strokeWidth="1.8" fill="none" />
            <path d="M3 10l5 3M21 10l-5 3M3 16l5-1M21 16l-5-1M4 21l4-4M20 21l-4-4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );
      case 'art':
        return (
          <svg {...commonSvgProps}>
            {/* Stained-Glass Rose Window / Gothic Relic */}
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="3.5" stroke={color} strokeWidth="1.8" fill="none" />
            <path d="M12 3v5M12 16v5M3 12h5M16 12h5" stroke={color} strokeWidth="1.6" />
          </svg>
        );
      case 'audio':
        return (
          <svg {...commonSvgProps}>
            {/* Grand Cathedral Organ Pipes */}
            <rect x="4" y="6" width="3" height="15" stroke={color} strokeWidth="1.8" fill="none" />
            <rect x="8.5" y="3" width="3" height="18" stroke={color} strokeWidth="1.8" fill="none" />
            <rect x="13" y="2" width="3" height="19" stroke={color} strokeWidth="1.8" fill="none" />
            <rect x="17.5" y="8" width="3" height="13" stroke={color} strokeWidth="1.8" fill="none" />
          </svg>
        );
      case 'boss':
        return (
          <svg {...commonSvgProps}>
            {/* Crowned Eldritch Skull / Blood Lord */}
            <path d="M5 4l3.5 3L12 2l3.5 5L19 4v4H5V4z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill={color} />
            <circle cx="12" cy="14" r="6" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="10" cy="13" r="1.5" fill={color} />
            <circle cx="14" cy="13" r="1.5" fill={color} />
            <line x1="10" y1="18" x2="14" y2="18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );
      case 'production':
        return (
          <svg {...commonSvgProps}>
            {/* Blacksmith Anvil & Hammer */}
            <path d="M4 11h16c-2 0-3 3-3 5H7c0-2-1-5-3-5z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <rect x="6" y="16" width="12" height="4" stroke={color} strokeWidth="1.8" fill="none" />
            <line x1="8" y1="5" x2="16" y2="5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="12" y1="5" x2="12" y2="10" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'drag':
        return (
          <svg {...commonSvgProps}>
            <polygon points="8,7 9,9 7,9" fill={color} />
            <polygon points="16,7 17,9 15,9" fill={color} />
            <polygon points="8,11 9,13 7,13" fill={color} />
            <polygon points="16,11 17,13 15,13" fill={color} />
            <polygon points="8,15 9,17 7,17" fill={color} />
            <polygon points="16,15 17,17 15,17" fill={color} />
          </svg>
        );
      case 'open':
        return (
          <svg {...commonSvgProps}>
            <polygon points="4,20 12,17 12,4 4,4" stroke={color} strokeWidth="2" fill="none" />
            <line x1="12" y1="4" x2="20" y2="4" stroke={color} strokeWidth="2" />
            <line x1="20" y1="4" x2="20" y2="20" stroke={color} strokeWidth="2" />
            <line x1="12" y1="17" x2="20" y2="20" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'font':
        return (
          <svg {...commonSvgProps}>
            {/* Ornate Blackletter Gothic Capital A */}
            <path d="M12 2l7 20h-3.5l-2-6h-3l-2 6H5l7-20z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill="none" />
            <line x1="8.5" y1="14" x2="15.5" y2="14" stroke={color} strokeWidth="2" />
            <path d="M12 2v6" stroke={color} strokeWidth="1.8" />
          </svg>
        );
      case 'langVi':
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
            <polygon points="12,5 14,9.5 18.5,10 15,13.5 16,18 12,15.5 8,18 9,13.5 5.5,10 10,9.5" fill={color} />
          </svg>
        );
      case 'langEn':
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
            <line x1="12" y1="3" x2="12" y2="21" stroke={color} strokeWidth="1.6" />
            <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1.6" />
            <circle cx="12" cy="12" r="4.5" stroke={color} strokeWidth="1.4" fill="none" />
          </svg>
        );
    }
  }

  // =========================================================================
  // 8. BLUEPRINT ARCHITECT / INDIE SKETCHBOOK (Technical Cyanotype & CAD)
  // =========================================================================
  if (theme === 'blueprint') {
    switch (name) {
      case 'tree':
        return (
          <svg {...commonSvgProps}>
            {/* Technical Node Hierarchy Schematic */}
            <rect x="9" y="2" width="6" height="5" stroke={color} strokeWidth="1.8" fill="none" />
            <rect x="3" y="15" width="6" height="5" stroke={color} strokeWidth="1.8" fill="none" />
            <rect x="15" y="15" width="6" height="5" stroke={color} strokeWidth="1.8" fill="none" />
            <polyline points="12,7 12,11 6,11 6,15" stroke={color} strokeWidth="1.6" fill="none" />
            <polyline points="12,11 18,11 18,15" stroke={color} strokeWidth="1.6" fill="none" />
            <circle cx="12" cy="11" r="1.5" fill={color} />
          </svg>
        );
      case 'docs':
        return (
          <svg {...commonSvgProps}>
            {/* Technical Drafting Blueprint Sheet */}
            <rect x="3" y="3" width="18" height="18" stroke={color} strokeWidth="2" fill="none" />
            <line x1="3" y1="7" x2="21" y2="7" stroke={color} strokeWidth="1.4" />
            <line x1="13" y1="17" x2="21" y2="17" stroke={color} strokeWidth="1.4" />
            <line x1="13" y1="17" x2="13" y2="21" stroke={color} strokeWidth="1.4" />
            <line x1="6" y1="11" x2="18" y2="11" stroke={color} strokeWidth="1.4" strokeDasharray="2 2" />
            <line x1="6" y1="14" x2="18" y2="14" stroke={color} strokeWidth="1.4" strokeDasharray="2 2" />
          </svg>
        );
      case 'quests':
        return (
          <svg {...commonSvgProps}>
            {/* Technical 180-Degree Protractor Gauge */}
            <path d="M4 17h16a8 8 0 00-16 0z" stroke={color} strokeWidth="2" fill="none" />
            <line x1="12" y1="17" x2="12" y2="10" stroke={color} strokeWidth="1.8" />
            <line x1="12" y1="9" x2="8" y2="11" stroke={color} strokeWidth="1.4" />
            <line x1="12" y1="9" x2="16" y2="11" stroke={color} strokeWidth="1.4" />
            <circle cx="12" cy="17" r="1.5" fill={color} />
          </svg>
        );
      case 'sun':
        return (
          <svg {...commonSvgProps}>
            {/* Solar Azimuth Diagram & Compass Rose */}
            <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
            <line x1="12" y1="2" x2="12" y2="6" stroke={color} strokeWidth="1.8" />
            <line x1="12" y1="18" x2="12" y2="22" stroke={color} strokeWidth="1.8" />
            <line x1="2" y1="12" x2="6" y2="12" stroke={color} strokeWidth="1.8" />
            <line x1="18" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1.8" />
          </svg>
        );
      case 'moon':
        return (
          <svg {...commonSvgProps}>
            {/* Lunar Orbital Arc & Coordinate Radius */}
            <path d="M15 3.5a8.5 8.5 0 00-2 17 8.5 8.5 0 007-4.5 8.5 8.5 0 01-5-12.5z" stroke={color} strokeWidth="2" fill="none" />
            <line x1="12" y1="12" x2="17" y2="8" stroke={color} strokeWidth="1.2" strokeDasharray="2 2" />
            <circle cx="12" cy="12" r="1.5" fill={color} />
          </svg>
        );
      case 'tv':
        return (
          <svg {...commonSvgProps}>
            {/* Technical Orthographic CRT Display */}
            <rect x="3" y="6" width="18" height="14" rx="1" stroke={color} strokeWidth="2" fill="none" />
            <rect x="5" y="8" width="11" height="10" stroke={color} strokeWidth="1.4" fill="none" />
            <line x1="18" y1="9" x2="19.5" y2="9" stroke={color} strokeWidth="1.8" />
            <line x1="18" y1="13" x2="19.5" y2="13" stroke={color} strokeWidth="1.8" />
            <line x1="1" y1="3" x2="1" y2="23" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
            <line x1="23" y1="3" x2="23" y2="23" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        );
      case 'volume':
        return (
          <svg {...commonSvgProps}>
            {/* Acoustic Waveform Envelope Schematic */}
            <polygon points="3,8 7,8 12,4 12,20 7,16 3,16" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <path d="M15 8c1.5 1.5 1.5 6.5 0 8M18 5c3 3 3 11 0 14" stroke={color} strokeWidth="1.6" strokeLinecap="round" fill="none" />
            <line x1="1" y1="12" x2="23" y2="12" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        );
      case 'mute':
        return (
          <svg {...commonSvgProps}>
            <polygon points="3,8 7,8 12,4 12,20 7,16 3,16" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <line x1="16" y1="9" x2="22" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line x1="22" y1="9" x2="16" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'globe':
        return (
          <svg {...commonSvgProps}>
            {/* Geodetic Grid Sphere */}
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
            <ellipse cx="12" cy="12" rx="4.5" ry="9" stroke={color} strokeWidth="1.5" strokeDasharray="3 1" fill="none" />
            <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1.8" />
            <line x1="12" y1="3" x2="12" y2="21" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
          </svg>
        );
      case 'mastered':
        return (
          <svg {...commonSvgProps}>
            {/* Certified Technical Stamp with Star Pivot */}
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
            <polygon points="12,5 14,9 19,10 15,13.5 16.5,18 12,15.5 7.5,18 9,13.5 5,10 10,9" stroke={color} strokeWidth="1.6" strokeLinejoin="round" fill={color} />
          </svg>
        );
      case 'learning':
        return (
          <svg {...commonSvgProps}>
            {/* Precision Vernier Caliper Gauge */}
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
            <polyline points="12,6 12,12 16,12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <line x1="12" y1="3" x2="12" y2="5" stroke={color} strokeWidth="2" />
            <line x1="21" y1="12" x2="19" y2="12" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'locked':
        return (
          <svg {...commonSvgProps}>
            {/* Cutaway Blueprint Padlock with Internal Tumblers */}
            <rect x="5" y="10" width="14" height="11" rx="1" stroke={color} strokeWidth="2" fill="none" />
            <path d="M8 10V6a4 4 0 018 0v4" stroke={color} strokeWidth="2" fill="none" />
            <line x1="12" y1="13" x2="12" y2="18" stroke={color} strokeWidth="1.8" />
            <circle cx="12" cy="13" r="1.5" fill={color} />
            <line x1="7" y1="15" x2="17" y2="15" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        );
      case 'edit':
        return (
          <svg {...commonSvgProps}>
            {/* 0.5mm Mechanical Drafting Pencil */}
            <polygon points="4,20 6,16 17,5 20,8 9,19" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <polygon points="4,20 2,22 6,20" fill={color} />
            <line x1="15" y1="7" x2="18" y2="10" stroke={color} strokeWidth="1.5" />
            <line x1="7" y1="15" x2="10" y2="18" stroke={color} strokeWidth="1.5" />
          </svg>
        );
      case 'save':
        return (
          <svg {...commonSvgProps}>
            {/* Technical Blueprint Storage Cylinder Tube */}
            <rect x="4" y="5" width="16" height="14" rx="2" stroke={color} strokeWidth="2" fill="none" />
            <line x1="8" y1="5" x2="8" y2="19" stroke={color} strokeWidth="1.6" />
            <line x1="16" y1="5" x2="16" y2="19" stroke={color} strokeWidth="1.6" />
            <line x1="4" y1="10" x2="20" y2="10" stroke={color} strokeWidth="1.4" strokeDasharray="2 2" />
          </svg>
        );
      case 'download':
        return (
          <svg {...commonSvgProps}>
            {/* Technical Dimension Arrow Vector */}
            <line x1="12" y1="3" x2="12" y2="15" stroke={color} strokeWidth="2" />
            <polyline points="7,10 12,15 17,10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <line x1="4" y1="19" x2="20" y2="19" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line x1="4" y1="17" x2="4" y2="21" stroke={color} strokeWidth="2" />
            <line x1="20" y1="17" x2="20" y2="21" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'close':
        return (
          <svg {...commonSvgProps}>
            {/* Technical Datum Crosshair */}
            <line x1="5" y1="5" x2="19" y2="19" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
            <line x1="19" y1="5" x2="5" y2="19" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="1" strokeDasharray="2 2" fill="none" />
          </svg>
        );
      case 'search':
        return (
          <svg {...commonSvgProps}>
            {/* Optical Reticle Loupe with Crosshair */}
            <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none" />
            <line x1="16" y1="16" x2="21" y2="21" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="11" y1="7" x2="11" y2="15" stroke={color} strokeWidth="1.2" />
            <line x1="7" y1="11" x2="15" y2="11" stroke={color} strokeWidth="1.2" />
          </svg>
        );
      case 'zoomIn':
        return (
          <svg {...commonSvgProps}>
            <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none" />
            <line x1="16" y1="16" x2="21" y2="21" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="11" y1="8" x2="11" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line x1="8" y1="11" x2="14" y2="11" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'zoomOut':
        return (
          <svg {...commonSvgProps}>
            <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none" />
            <line x1="16" y1="16" x2="21" y2="21" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="8" y1="11" x2="14" y2="11" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'reset':
        return (
          <svg {...commonSvgProps}>
            {/* Dimension Radius Radial Arc */}
            <path d="M20 12a8 8 0 11-2.4-5.7L20 9" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
            <polyline points="20,4 20,9 15,9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        );
      case 'brand':
        return (
          <svg {...commonSvgProps}>
            {/* Precision Drafting T-Square and 30-60 Triangle Set */}
            <line x1="2" y1="5" x2="22" y2="5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="12" y1="5" x2="12" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <polygon points="5,8 19,8 5,18" stroke={color} strokeWidth="1.6" strokeLinejoin="round" fill="none" />
          </svg>
        );
      case 'design':
        return (
          <svg {...commonSvgProps}>
            {/* Precision Drafting Caliper Compass */}
            <circle cx="12" cy="4" r="2" stroke={color} strokeWidth="2" fill="none" />
            <line x1="12" y1="6" x2="4" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="6" x2="20" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line x1="8" y1="14" x2="16" y2="14" stroke={color} strokeWidth="1.8" />
            <circle cx="12" cy="14" r="1.5" fill={color} />
          </svg>
        );
      case 'code':
        return (
          <svg {...commonSvgProps}>
            {/* Logic Gate Circuit Schematic */}
            <path d="M4 6h5c3 0 5 2 5 6s-2 6-5 6H4z" stroke={color} strokeWidth="2" fill="none" />
            <line x1="14" y1="12" x2="20" y2="12" stroke={color} strokeWidth="2" />
            <line x1="2" y1="9" x2="4" y2="9" stroke={color} strokeWidth="2" />
            <line x1="2" y1="15" x2="4" y2="15" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'qa':
        return (
          <svg {...commonSvgProps}>
            {/* Oscilloscope Bug Trace Schematic */}
            <circle cx="12" cy="13" r="5" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="12" cy="6" r="2" stroke={color} strokeWidth="1.8" fill="none" />
            <line x1="12" y1="8" x2="12" y2="18" stroke={color} strokeWidth="1.8" />
            <polyline points="4,13 8,11 10,15 14,11 16,15 20,13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        );
      case 'art':
        return (
          <svg {...commonSvgProps}>
            {/* French Curve Drafting Stencil Ruler */}
            <path d="M6 3c5 0 9 4 9 9 0 4-3 7-7 7-3 0-5-2-5-4 0-3 3-5 5-5 2 0 4 1 4 3" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="12" cy="6" r="1.5" fill={color} />
          </svg>
        );
      case 'audio':
        return (
          <svg {...commonSvgProps}>
            {/* Sine Wave Frequency Response Graph */}
            <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1.8" strokeDasharray="2 2" />
            <line x1="3" y1="4" x2="3" y2="20" stroke={color} strokeWidth="1.8" />
            <path d="M3 12c3-8 6-8 9 0s6 8 9 0" stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none" />
          </svg>
        );
      case 'boss':
        return (
          <svg {...commonSvgProps}>
            {/* Architectural Apex Keystone Elevation */}
            <polygon points="12,2 20,9 18,21 6,21 4,9" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <line x1="12" y1="2" x2="12" y2="21" stroke={color} strokeWidth="1.6" strokeDasharray="2 2" />
            <polygon points="8,10 16,10 12,17" stroke={color} strokeWidth="1.6" strokeLinejoin="round" fill="none" />
          </svg>
        );
      case 'production':
        return (
          <svg {...commonSvgProps}>
            {/* Technical Gear Mechanism with Pitch Circle */}
            <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        );
      case 'drag':
        return (
          <svg {...commonSvgProps}>
            {/* 6 Technical Registration Marks */}
            <circle cx="8" cy="8" r="1.5" fill={color} />
            <circle cx="16" cy="8" r="1.5" fill={color} />
            <circle cx="8" cy="12" r="1.5" fill={color} />
            <circle cx="16" cy="12" r="1.5" fill={color} />
            <circle cx="8" cy="16" r="1.5" fill={color} />
            <circle cx="16" cy="16" r="1.5" fill={color} />
          </svg>
        );
      case 'open':
        return (
          <svg {...commonSvgProps}>
            {/* Architectural Floor Plan Door Swing Symbol */}
            <rect x="3" y="19" width="18" height="2" fill={color} />
            <line x1="4" y1="19" x2="4" y2="5" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <path d="M4 5a14 14 0 0114 14" stroke={color} strokeWidth="1.8" strokeDasharray="2 2" fill="none" />
          </svg>
        );
      case 'font':
        return (
          <svg {...commonSvgProps}>
            {/* Technical Isometric Letter A with Dimension Endpoints */}
            <polygon points="12,3 19,21 15,21 13.5,16 10.5,16 9,21 5,21" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill="none" />
            <line x1="8.5" y1="14" x2="15.5" y2="14" stroke={color} strokeWidth="2" />
            <line x1="12" y1="1" x2="12" y2="3" stroke={color} strokeWidth="2" />
          </svg>
        );
      case 'langVi':
        return (
          <svg {...commonSvgProps}>
            <rect x="3" y="3" width="18" height="18" stroke={color} strokeWidth="2" fill="none" />
            <polygon points="12,6 14,10 18,10.5 15,13.5 16,17.5 12,15 8,17.5 9,13.5 6,10.5 10,10" fill={color} />
          </svg>
        );
      case 'langEn':
        return (
          <svg {...commonSvgProps}>
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
            <ellipse cx="12" cy="12" rx="4.5" ry="9" stroke={color} strokeWidth="1.4" fill="none" />
            <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1.6" />
          </svg>
        );
    }
  }

  // =========================================================================
  // 9. GHIBLI COZY FOREST / COTTAGECORE (Watercolor Meadow & Forest Spirits)
  // =========================================================================
  if (theme === 'ghibli') {
    switch (name) {
      case 'tree':
        return (
          <svg {...commonSvgProps}>
            {/* Ancient Camphor Sacred Forest Tree */}
            <path d="M12 22v-6M10 22v-4M14 22v-4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M7 16c-3 0-5-2.5-5-5.5 0-2.5 2-4.5 4.5-4.5 1-2.5 3.5-4 6-4s5 1.5 6 4c2.5 0 4.5 2 4.5 4.5 0 3-2 5.5-5 5.5H7z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
            <circle cx="12" cy="10" r="1.5" fill={color} />
          </svg>
        );
      case 'docs':
        return (
          <svg {...commonSvgProps}>
            {/* Handcrafted Botanist Sketchbook with Leaf Bookmark */}
            <rect x="4" y="3" width="16" height="18" rx="2" stroke={color} strokeWidth="2" fill="none" />
            <line x1="8" y1="3" x2="8" y2="21" stroke={color} strokeWidth="1.8" />
            <path d="M12 8h4M12 12h4M12 16h3" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
            <path d="M14 1c2 1 2 3 0 4s-2-1 0-4z" fill={color} />
          </svg>
        );
      case 'quests':
        return (
          <svg {...commonSvgProps}>
            {/* Woven Wicker Basket with Wild Berries */}
            <path d="M4 10h16l-2 10H6L4 10z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <path d="M8 10V6a4 4 0 018 0v4" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="10" cy="13" r="1.5" fill={color} />
            <circle cx="14" cy="13" r="1.5" fill={color} />
            <circle cx="12" cy="16" r="1.5" fill={color} />
          </svg>
        );
      case 'sun':
        return (
          <svg {...commonSvgProps}>
            {/* Warm Smiling Sun with Gentle Cloud */}
            <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="2" fill="none" />
            <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <circle cx="10" cy="11" r="0.8" fill={color} />
            <circle cx="14" cy="11" r="0.8" fill={color} />
            <path d="M10.5 13.5c.8.6 2.2.6 3 0" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" />
          </svg>
        );
      case 'moon':
        return (
          <svg {...commonSvgProps}>
            {/* Cozy Crescent Moon with Little Sleeping Firefly */}
            <path d="M14 3.5a8.5 8.5 0 00-1.5 17 8.5 8.5 0 007.5-5.5 8.5 8.5 0 01-6-11.5z" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="10.5" cy="13.5" r="1.5" fill={color} />
            <circle cx="11" cy="13" r="0.6" fill="var(--bg-app)" />
          </svg>
        );
      case 'tv':
        return (
          <svg {...commonSvgProps}>
            {/* Cozy Cottage Window Looking at Rolling Hills */}
            <rect x="4" y="4" width="16" height="16" rx="2" stroke={color} strokeWidth="2" fill="none" />
            <line x1="12" y1="4" x2="12" y2="20" stroke={color} strokeWidth="1.8" />
            <line x1="4" y1="12" x2="20" y2="12" stroke={color} strokeWidth="1.8" />
            <path d="M4 18c3-2 5-2 8 0s5 2 8 0" stroke={color} strokeWidth="1.4" fill="none" />
          </svg>
        );
      case 'volume':
        return (
          <svg {...commonSvgProps}>
            {/* Japanese Wind Chime Bell with Fluttering Paper (Furin) */}
            <path d="M7 11a5 5 0 0110 0H7z" stroke={color} strokeWidth="2" fill="none" />
            <line x1="12" y1="2" x2="12" y2="6" stroke={color} strokeWidth="1.8" />
            <line x1="12" y1="11" x2="12" y2="14" stroke={color} strokeWidth="1.8" />
            <rect x="10.5" y="14" width="3" height="7" stroke={color} strokeWidth="1.4" fill="none" />
          </svg>
        );
      case 'mute':
        return (
          <svg {...commonSvgProps}>
            <path d="M7 11a5 5 0 0110 0H7z" stroke={color} strokeWidth="2" fill="none" />
            <rect x="10.5" y="14" width="3" height="7" stroke={color} strokeWidth="1.4" fill="none" />
            <line x1="4" y1="4" x2="20" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'globe':
        return (
          <svg {...commonSvgProps}>
            {/* Verdant Moss Terrarium Glass Globe with Sprout */}
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
            <path d="M6 16c2-2 4-2 6 0s4 2 6 0" stroke={color} strokeWidth="1.6" fill="none" />
            <path d="M12 16v-6c-2 0-3-2-3-2s2 0 3 2c0-2 2-2 2-2s0 2-2 2" stroke={color} strokeWidth="1.6" fill="none" />
          </svg>
        );
      case 'mastered':
        return (
          <svg {...commonSvgProps}>
            {/* Blooming Lucky Four-Leaf Clover */}
            <circle cx="9" cy="9" r="3" stroke={color} strokeWidth="1.8" fill={color} />
            <circle cx="15" cy="9" r="3" stroke={color} strokeWidth="1.8" fill={color} />
            <circle cx="9" cy="15" r="3" stroke={color} strokeWidth="1.8" fill={color} />
            <circle cx="15" cy="15" r="3" stroke={color} strokeWidth="1.8" fill={color} />
            <path d="M12 12c-1 4-1 7-3 9" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </svg>
        );
      case 'learning':
        return (
          <svg {...commonSvgProps}>
            {/* Sprouting Green Cotyledon Leaves */}
            <path d="M12 20v-8" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <path d="M12 14c-4 0-6-3-6-6 4 0 6 3 6 6z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill="none" />
            <path d="M12 12c4 0 6-3 6-6-4 0-6 3-6 6z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill="none" />
            <path d="M8 20h8" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'locked':
        return (
          <svg {...commonSvgProps}>
            {/* Wooden Garden Picket Gate Latch */}
            <rect x="5" y="10" width="14" height="11" rx="2" stroke={color} strokeWidth="2" fill="none" />
            <path d="M8 10V7a4 4 0 018 0v3" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="12" cy="15" r="1.5" fill={color} />
            <path d="M5 14h14" stroke={color} strokeWidth="1.4" strokeDasharray="2 2" />
          </svg>
        );
      case 'edit':
        return (
          <svg {...commonSvgProps}>
            {/* Wooden Twig Stylus Brush with Leaf Tip */}
            <path d="M4 20l4-1 11-11a2.1 2.1 0 00-3-3L5 16l-1 4z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M18 4c2-2 3-1 2 1s-3 1-2-1z" fill={color} />
          </svg>
        );
      case 'save':
        return (
          <svg {...commonSvgProps}>
            {/* Honey Jar / Firefly Mason Jar */}
            <rect x="7" y="2" width="10" height="3" rx="1" stroke={color} strokeWidth="1.8" fill="none" />
            <path d="M6 5h12a2 2 0 012 2v12a3 3 0 01-3 3H7a3 3 0 01-3-3V7a2 2 0 012-2z" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="10" cy="11" r="1" fill={color} />
            <circle cx="14" cy="14" r="1" fill={color} />
            <circle cx="11" cy="16" r="1" fill={color} />
          </svg>
        );
      case 'download':
        return (
          <svg {...commonSvgProps}>
            {/* Cozy Watering Can Sprinkling Drops */}
            <path d="M6 10h8l-1 9H7l-1-9z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
            <path d="M14 12l5-4v2l-5 4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M6 12H3a1 1 0 01-1-1V8a1 1 0 011-1h4" stroke={color} strokeWidth="1.8" fill="none" />
            <circle cx="20" cy="14" r="0.8" fill={color} />
            <circle cx="21" cy="17" r="0.8" fill={color} />
          </svg>
        );
      case 'close':
        return (
          <svg {...commonSvgProps}>
            {/* Crossed Flower Twigs */}
            <line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
            <line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="12" cy="12" r="2" fill={color} />
          </svg>
        );
      case 'search':
        return (
          <svg {...commonSvgProps}>
            {/* Magnifying Glass Inspecting Forest Clover */}
            <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="11" cy="11" r="2" fill={color} />
          </svg>
        );
      case 'zoomIn':
        return (
          <svg {...commonSvgProps}>
            <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="11" y1="8" x2="11" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line x1="8" y1="11" x2="14" y2="11" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'zoomOut':
        return (
          <svg {...commonSvgProps}>
            <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="8" y1="11" x2="14" y2="11" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'reset':
        return (
          <svg {...commonSvgProps}>
            {/* Braided Leaf Wreath Loop */}
            <path d="M20 12a8 8 0 11-2.4-5.7L20 9" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
            <polyline points="20,4 20,9 15,9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="12" cy="4" r="1.2" fill={color} />
          </svg>
        );
      case 'brand':
        return (
          <svg {...commonSvgProps}>
            {/* Kodama Forest Spirit with Sprout */}
            <ellipse cx="12" cy="13" rx="7" ry="7.5" stroke={color} strokeWidth="2" fill="none" />
            <ellipse cx="9" cy="12" rx="1.5" ry="2" fill={color} />
            <ellipse cx="15" cy="12" rx="1.5" ry="2" fill={color} />
            <ellipse cx="12" cy="16.5" rx="1" ry="1.5" fill={color} />
            <path d="M12 5.5V2c-1.5 0-2.5-1-2.5-1s0 2 2.5 2z" fill={color} />
          </svg>
        );
      case 'design':
        return (
          <svg {...commonSvgProps}>
            {/* Carved Wooden Compass & Vine */}
            <circle cx="12" cy="5" r="2.5" stroke={color} strokeWidth="2" fill="none" />
            <line x1="12" y1="7.5" x2="5" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="7.5" x2="19" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <path d="M8 15h8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="12" cy="5" r="1" fill={color} />
          </svg>
        );
      case 'code':
        return (
          <svg {...commonSvgProps}>
            {/* Music Box Cylinder Combs & Pins */}
            <rect x="4" y="6" width="16" height="12" rx="2" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="8" cy="9" r="1" fill={color} />
            <circle cx="12" cy="12" r="1" fill={color} />
            <circle cx="16" cy="10" r="1" fill={color} />
            <circle cx="10" cy="15" r="1" fill={color} />
            <line x1="4" y1="3" x2="8" y2="6" stroke={color} strokeWidth="1.8" />
          </svg>
        );
      case 'qa':
        return (
          <svg {...commonSvgProps}>
            {/* Cute Forest Ladybug with Spots */}
            <circle cx="12" cy="14" r="6" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="12" cy="6.5" r="2.5" stroke={color} strokeWidth="2" fill="none" />
            <line x1="12" y1="8" x2="12" y2="20" stroke={color} strokeWidth="1.8" />
            <circle cx="9.5" cy="13" r="1" fill={color} />
            <circle cx="14.5" cy="13" r="1" fill={color} />
            <circle cx="9.5" cy="17" r="1" fill={color} />
            <circle cx="14.5" cy="17" r="1" fill={color} />
            <path d="M10 4.5l-2-2M14 4.5l2-2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );
      case 'art':
        return (
          <svg {...commonSvgProps}>
            {/* Wooden Artist Palette with Flower Blossom */}
            <path d="M12 3a9 9 0 000 18c2 0 4-1 4-3a2 2 0 00-2-2h-2a2 2 0 01-2-2 4 4 0 014-4h2a5 5 0 005-5c0-4-4-7-9-7z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
            <circle cx="7.5" cy="9" r="1.3" fill={color} />
            <circle cx="12" cy="6.5" r="1.3" fill={color} />
            <circle cx="16.5" cy="9.5" r="1.3" fill={color} />
          </svg>
        );
      case 'audio':
        return (
          <svg {...commonSvgProps}>
            {/* Totoro's Clay Ocarina */}
            <ellipse cx="12" cy="12" rx="8" ry="6" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="9" cy="11" r="1.3" fill={color} />
            <circle cx="13" cy="10" r="1.3" fill={color} />
            <circle cx="16" cy="11" r="1.3" fill={color} />
            <rect x="3" y="10" width="3" height="4" rx="1" fill={color} />
          </svg>
        );
      case 'boss':
        return (
          <svg {...commonSvgProps}>
            {/* Ancient Forest Spirit / Great Antlered Deer */}
            <ellipse cx="12" cy="14" rx="4.5" ry="6" stroke={color} strokeWidth="2" fill="none" />
            <path d="M9 9C6 6 4 7 3 5M15 9c3-3 5-2 6-4" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M7 6l-2-3M17 6l2-3" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="10" cy="13" r="1" fill={color} />
            <circle cx="14" cy="13" r="1" fill={color} />
          </svg>
        );
      case 'production':
        return (
          <svg {...commonSvgProps}>
            {/* Riverside Watermill Wheel */}
            <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.8" fill="none" />
            <line x1="12" y1="4" x2="12" y2="20" stroke={color} strokeWidth="1.6" />
            <line x1="4" y1="12" x2="20" y2="12" stroke={color} strokeWidth="1.6" />
            <line x1="6.3" y1="6.3" x2="17.7" y2="17.7" stroke={color} strokeWidth="1.6" />
            <line x1="6.3" y1="17.7" x2="17.7" y2="6.3" stroke={color} strokeWidth="1.6" />
          </svg>
        );
      case 'drag':
        return (
          <svg {...commonSvgProps}>
            {/* 6 Smooth River Pebbles */}
            <circle cx="8" cy="8" r="1.6" fill={color} />
            <circle cx="16" cy="8" r="1.6" fill={color} />
            <circle cx="8" cy="12" r="1.6" fill={color} />
            <circle cx="16" cy="12" r="1.6" fill={color} />
            <circle cx="8" cy="16" r="1.6" fill={color} />
            <circle cx="16" cy="16" r="1.6" fill={color} />
          </svg>
        );
      case 'open':
        return (
          <svg {...commonSvgProps}>
            {/* Cottage Wooden Door Opening */}
            <rect x="4" y="3" width="16" height="18" rx="1.5" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="8" cy="12" r="1.2" fill={color} />
            <path d="M12 3v18" stroke={color} strokeWidth="1.8" />
          </svg>
        );
      case 'font':
        return (
          <svg {...commonSvgProps}>
            {/* Wooden Branch Letter A with Leaf Sprout */}
            <path d="M12 3l6 18h-3.5l-1.5-5H11l-1.5 5H6l6-18z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill="none" />
            <line x1="9.5" y1="14" x2="14.5" y2="14" stroke={color} strokeWidth="2" />
            <path d="M12 3c1-2 2-2 3-1s0 2-3 1z" fill={color} />
          </svg>
        );
      case 'langVi':
        return (
          <svg {...commonSvgProps}>
            {/* Lotus Flower Seal with Star */}
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
            <polygon points="12,5 14,9 18.5,9.5 15,12.5 16,17 12,14.5 8,17 9,12.5 5.5,9.5 10,9" fill={color} />
          </svg>
        );
      case 'langEn':
        return (
          <svg {...commonSvgProps}>
            {/* Sunflower Compass */}
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.6" fill="none" />
            <circle cx="12" cy="12" r="1.5" fill={color} />
            <line x1="12" y1="3" x2="12" y2="5" stroke={color} strokeWidth="1.8" />
            <line x1="12" y1="19" x2="12" y2="21" stroke={color} strokeWidth="1.8" />
            <line x1="3" y1="12" x2="5" y2="12" stroke={color} strokeWidth="1.8" />
            <line x1="19" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1.8" />
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
