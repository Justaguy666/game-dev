import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ThemeId, ThemeMode, Language, PlaygroundMode } from '../types';
import { sound } from '../soundEngine';
import { getPhysicsTheme, PhysicsThemeConfig } from '../utils/physicsTheme';
import { 
  Play, 
  RotateCcw, 
  Sliders, 
  Target, 
  Activity, 
  Gamepad2, 
  Sparkles, 
  Info, 
  Volume2, 
  Maximize2 
} from 'lucide-react';

interface PhysicsLabViewProps {
  currentTheme: ThemeId;
  themeMode: ThemeMode;
  lang: Language;
  initialMode?: PlaygroundMode;
}

// Particle interface for visual juice
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  shape: 'pixel' | 'spark' | 'circle' | 'cross' | 'ink' | 'leaf' | 'square';
}

// Trajectory point for ghost trails
interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
}

// Target ring in ballistics
interface TargetRing {
  x: number;
  y: number;
  radius: number;
  hit: boolean;
  pulse: number;
}

// Collision Ball in momentum mode
interface CollisionBody {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  color: string;
  isDragging?: boolean;
}

export const PhysicsLabView: React.FC<PhysicsLabViewProps> = ({
  currentTheme,
  themeMode,
  lang,
  initialMode = 'platformer'
}) => {
  const [activeMode, setActiveMode] = useState<PlaygroundMode>(initialMode);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // -------------------------------------------------------------
  // MODE 1: PLATFORMER & GAME FEEL PARAMETERS
  // -------------------------------------------------------------
  const [gravity, setGravity] = useState<number>(1300);
  const [jumpForce, setJumpForce] = useState<number>(560);
  const [coyoteTimeMs, setCoyoteTimeMs] = useState<number>(120);
  const [jumpBufferMs, setJumpBufferMs] = useState<number>(120);
  const [variableJumpCut, setVariableJumpCut] = useState<number>(0.5);
  const [apexBoost, setApexBoost] = useState<boolean>(true);
  const [airControl, setAirControl] = useState<number>(85);
  const [runSpeed, setRunSpeed] = useState<number>(260);

  // -------------------------------------------------------------
  // MODE 2: 2D VECTOR BALLISTICS PARAMETERS
  // -------------------------------------------------------------
  const [launchAngle, setLaunchAngle] = useState<number>(45);
  const [launchSpeed, setLaunchSpeed] = useState<number>(550);
  const [ballisticsGravity, setBallisticsGravity] = useState<number>(980);
  const [restitution, setRestitution] = useState<number>(0.75);
  const [windSpeed, setWindSpeed] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  // -------------------------------------------------------------
  // MODE 3: ELASTIC COLLISIONS PARAMETERS
  // -------------------------------------------------------------
  const [elasticity, setElasticity] = useState<number>(0.95);
  const [simGravity, setSimGravity] = useState<number>(0);
  const [showMomentum, setShowMomentum] = useState<boolean>(true);
  const [showVelocities, setShowVelocities] = useState<boolean>(true);

  // -------------------------------------------------------------
  // LIVE FEEDBACK & GAUGES
  // -------------------------------------------------------------
  const [coyoteActiveRemaining, setCoyoteActiveRemaining] = useState<number>(0);
  const [isJumpBuffered, setIsJumpBuffered] = useState<boolean>(false);
  const [isApexFloat, setIsApexFloat] = useState<boolean>(false);
  const [liveVx, setLiveVx] = useState<number>(0);
  const [liveVy, setLiveVy] = useState<number>(0);

  // Input state
  const keysRef = useRef<{ left: boolean; right: boolean; jump: boolean; jumpDown: boolean }>({
    left: false,
    right: false,
    jump: false,
    jumpDown: false
  });

  // State refs for animation loop
  const particlesRef = useRef<Particle[]>([]);
  const trailRef = useRef<TrailPoint[]>([]);

  // Platformer player state
  const playerRef = useRef({
    x: 100,
    y: 300,
    vx: 0,
    vy: 0,
    width: 26,
    height: 32,
    isGrounded: false,
    coyoteTimer: 0,
    jumpBufferTimer: 0,
    facing: 1, // 1 = right, -1 = left
    blinkTimer: 0,
    isJumping: false
  });

  // Projectiles for ballistics mode
  const projectilesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    bounces: number;
    active: boolean;
    trail: Array<{ x: number; y: number }>;
  }>>([]);

  // Targets for ballistics mode
  const targetsRef = useRef<TargetRing[]>([
    { x: 420, y: 180, radius: 24, hit: false, pulse: 0 },
    { x: 620, y: 120, radius: 28, hit: false, pulse: 0 },
    { x: 740, y: 260, radius: 20, hit: false, pulse: 0 }
  ]);

  // Bodies for collisions mode
  const bodiesRef = useRef<CollisionBody[]>([
    { id: 1, x: 200, y: 240, vx: 200, vy: 60, radius: 30, mass: 3, color: '#fbbf24' },
    { id: 2, x: 400, y: 280, vx: -140, vy: -50, radius: 22, mass: 1.5, color: '#38bdf8' },
    { id: 3, x: 550, y: 200, vx: -80, vy: 120, radius: 26, mass: 2, color: '#4ade80' },
    { id: 4, x: 320, y: 140, vx: 110, vy: 140, radius: 36, mass: 4.5, color: '#f43f5e' },
    { id: 5, x: 680, y: 320, vx: -160, vy: -90, radius: 18, mass: 1, color: '#c084fc' }
  ]);

  const draggedBodyRef = useRef<CollisionBody | null>(null);
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);

  // Platforms layout
  const platforms = useRef([
    { x: 40, y: 440, w: 220, h: 22 }, // Starting platform
    { x: 310, y: 440, w: 180, h: 22 }, // Coyote Gap: 50px wide gap
    { x: 540, y: 380, w: 140, h: 20 }, // Step 1
    { x: 720, y: 320, w: 150, h: 20 }, // High platform
    { x: 420, y: 240, w: 130, h: 18 }, // Floating island
    { x: 200, y: 300, w: 100, h: 18, isSpring: true } // Spring trampoline pad
  ]);

  const movingPlatformRef = useRef({
    x: 600,
    y: 200,
    w: 120,
    h: 18,
    vx: 90,
    minX: 520,
    maxX: 780
  });

  const themeConfig: PhysicsThemeConfig = getPhysicsTheme(currentTheme, themeMode);

  // Spawn visual particles
  const spawnParticles = (x: number, y: number, count: number, colors: string[], shape: Particle['shape'] = 'pixel') => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 40 + Math.random() * 160;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 30,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: shape === 'pixel' ? 3 + Math.random() * 4 : 2 + Math.random() * 3,
        alpha: 1,
        life: 0,
        maxLife: 0.35 + Math.random() * 0.35,
        shape
      });
    }
  };

  // Reset player position
  const resetPlayer = () => {
    playerRef.current.x = 100;
    playerRef.current.y = 350;
    playerRef.current.vx = 0;
    playerRef.current.vy = 0;
    playerRef.current.isGrounded = false;
    trailRef.current = [];
    sound.playClick();
  };

  // Reset ballistics targets
  const resetBallistics = () => {
    projectilesRef.current = [];
    targetsRef.current.forEach(t => (t.hit = false));
    setScore(0);
    sound.playClick();
  };

  // Reset collision bodies
  const resetBodies = (presetName: string) => {
    sound.playClick();
    if (presetName === 'cradle') {
      // Newton's cradle setup
      bodiesRef.current = [
        { id: 1, x: 240, y: 250, vx: -300, vy: 0, radius: 26, mass: 2, color: themeConfig.playerPrimary },
        { id: 2, x: 360, y: 250, vx: 0, vy: 0, radius: 26, mass: 2, color: themeConfig.playerPrimary },
        { id: 3, x: 412, y: 250, vx: 0, vy: 0, radius: 26, mass: 2, color: themeConfig.playerPrimary },
        { id: 4, x: 464, y: 250, vx: 0, vy: 0, radius: 26, mass: 2, color: themeConfig.playerPrimary },
        { id: 5, x: 516, y: 250, vx: 0, vy: 0, radius: 26, mass: 2, color: themeConfig.playerPrimary }
      ];
      setSimGravity(0);
      setElasticity(1.0);
    } else if (presetName === 'billiards') {
      // Cue ball & triangle rack
      bodiesRef.current = [
        { id: 1, x: 180, y: 250, vx: 500, vy: 0, radius: 22, mass: 2, color: '#ffffff' },
        { id: 2, x: 520, y: 250, vx: 0, vy: 0, radius: 22, mass: 2, color: '#f43f5e' },
        { id: 3, x: 558, y: 230, vx: 0, vy: 0, radius: 22, mass: 2, color: '#fbbf24' },
        { id: 4, x: 558, y: 270, vx: 0, vy: 0, radius: 22, mass: 2, color: '#38bdf8' },
        { id: 5, x: 596, y: 210, vx: 0, vy: 0, radius: 22, mass: 2, color: '#4ade80' },
        { id: 6, x: 596, y: 250, vx: 0, vy: 0, radius: 22, mass: 2, color: '#0d0d0d' },
        { id: 7, x: 596, y: 290, vx: 0, vy: 0, radius: 22, mass: 2, color: '#a855f7' }
      ];
      setSimGravity(0);
      setElasticity(0.92);
    } else if (presetName === 'planet') {
      // Massive sun/planet and light orbiters
      bodiesRef.current = [
        { id: 1, x: 450, y: 260, vx: 0, vy: 0, radius: 52, mass: 25, color: '#fbbf24' },
        { id: 2, x: 260, y: 260, vx: 0, vy: -180, radius: 16, mass: 1, color: '#38bdf8' },
        { id: 3, x: 620, y: 260, vx: 0, vy: 160, radius: 18, mass: 1.2, color: '#f43f5e' },
        { id: 4, x: 450, y: 120, vx: 170, vy: 0, radius: 14, mass: 0.8, color: '#4ade80' }
      ];
      setSimGravity(0);
      setElasticity(0.85);
    } else {
      // Default random chaos
      bodiesRef.current = [
        { id: 1, x: 200, y: 240, vx: 220, vy: 80, radius: 30, mass: 3, color: themeConfig.playerPrimary },
        { id: 2, x: 400, y: 280, vx: -160, vy: -60, radius: 24, mass: 1.8, color: themeConfig.vectorVx },
        { id: 3, x: 550, y: 200, vx: -90, vy: 140, radius: 26, mass: 2, color: themeConfig.accentGold },
        { id: 4, x: 320, y: 140, vx: 130, vy: 150, radius: 34, mass: 4, color: themeConfig.vectorVy },
        { id: 5, x: 680, y: 320, vx: -180, vy: -100, radius: 20, mass: 1.2, color: themeConfig.vectorN }
      ];
    }
  };

  // Fire cannon projectile
  const fireProjectile = () => {
    sound.playShoot();
    const startX = 80;
    const startY = 410;
    const rad = (launchAngle * Math.PI) / 180;
    const vx = Math.cos(rad) * launchSpeed;
    const vy = -Math.sin(rad) * launchSpeed;

    projectilesRef.current.push({
      x: startX + Math.cos(rad) * 45,
      y: startY - Math.sin(rad) * 45,
      vx,
      vy,
      radius: 9,
      bounces: 0,
      active: true,
      trail: []
    });

    spawnParticles(startX + Math.cos(rad) * 45, startY - Math.sin(rad) * 45, 8, themeConfig.particleColors, themeConfig.particleShape);
  };

  // Apply Presets for Platformer Mode
  const applyPlatformerPreset = (preset: 'celeste' | 'mario' | 'souls' | 'moon' | 'hardcore') => {
    sound.playSelect();
    if (preset === 'celeste') {
      setGravity(1300);
      setJumpForce(560);
      setCoyoteTimeMs(120);
      setJumpBufferMs(120);
      setVariableJumpCut(0.5);
      setApexBoost(true);
      setAirControl(90);
      setRunSpeed(270);
    } else if (preset === 'mario') {
      setGravity(1600);
      setJumpForce(620);
      setCoyoteTimeMs(50);
      setJumpBufferMs(60);
      setVariableJumpCut(0.65);
      setApexBoost(false);
      setAirControl(55);
      setRunSpeed(240);
    } else if (preset === 'souls') {
      setGravity(1750);
      setJumpForce(480);
      setCoyoteTimeMs(30);
      setJumpBufferMs(40);
      setVariableJumpCut(0.8);
      setApexBoost(false);
      setAirControl(25);
      setRunSpeed(180);
    } else if (preset === 'moon') {
      setGravity(480);
      setJumpForce(420);
      setCoyoteTimeMs(150);
      setJumpBufferMs(150);
      setVariableJumpCut(0.4);
      setApexBoost(true);
      setAirControl(95);
      setRunSpeed(200);
    } else if (preset === 'hardcore') {
      setGravity(1400);
      setJumpForce(520);
      setCoyoteTimeMs(0);
      setJumpBufferMs(0);
      setVariableJumpCut(1.0);
      setApexBoost(false);
      setAirControl(40);
      setRunSpeed(240);
    }
  };

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid capturing input when user is typing in form/text fields
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') {
        return;
      }

      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        keysRef.current.left = true;
      }
      if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        keysRef.current.right = true;
      }
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'KeyJ') {
        if (!keysRef.current.jumpDown) {
          keysRef.current.jump = true;
          keysRef.current.jumpDown = true;
          // In platformer mode: queue jump buffer
          if (activeMode === 'platformer') {
            playerRef.current.jumpBufferTimer = jumpBufferMs / 1000;
          } else if (activeMode === 'ballistics') {
            fireProjectile();
          }
        }
        e.preventDefault();
      }
      if (e.code === 'KeyR') {
        if (activeMode === 'platformer') resetPlayer();
        else if (activeMode === 'ballistics') resetBallistics();
        else resetBodies('chaos');
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        keysRef.current.left = false;
      }
      if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        keysRef.current.right = false;
      }
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'KeyJ') {
        keysRef.current.jump = false;
        keysRef.current.jumpDown = false;

        // Variable Jump Cut (Short hop on release)
        if (activeMode === 'platformer' && playerRef.current.vy < 0 && playerRef.current.isJumping) {
          playerRef.current.vy *= variableJumpCut;
          playerRef.current.isJumping = false;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeMode, jumpBufferMs, variableJumpCut, launchAngle, launchSpeed]);

  // Mouse drag & interaction for collision mode
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      if (activeMode === 'collision') {
        for (const body of bodiesRef.current) {
          const dx = mx - body.x;
          const dy = my - body.y;
          if (Math.hypot(dx, dy) < body.radius + 6) {
            draggedBodyRef.current = body;
            body.isDragging = true;
            dragStartPos.current = { x: mx, y: my };
            body.vx = 0;
            body.vy = 0;
            sound.playHover();
            break;
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (activeMode === 'collision' && draggedBodyRef.current) {
        const rect = canvas.getBoundingClientRect();
        draggedBodyRef.current.x = e.clientX - rect.left;
        draggedBodyRef.current.y = e.clientY - rect.top;
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (activeMode === 'collision' && draggedBodyRef.current && dragStartPos.current) {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const flingVx = (mx - dragStartPos.current.x) * 6;
        const flingVy = (my - dragStartPos.current.y) * 6;

        draggedBodyRef.current.vx = Math.max(-600, Math.min(600, flingVx));
        draggedBodyRef.current.vy = Math.max(-600, Math.min(600, flingVy));
        draggedBodyRef.current.isDragging = false;
        draggedBodyRef.current = null;
        dragStartPos.current = null;
        sound.playBounce();
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeMode]);

  // -------------------------------------------------------------
  // MAIN PHYSICS SIMULATION & RENDERING LOOP
  // -------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      let dt = (time - lastTime) / 1000;
      lastTime = time;
      if (dt > 0.05) dt = 0.05; // Prevent large delta-time spikes

      const width = canvas.width;
      const height = canvas.height;

      // 1. CLEAR & DRAW THEMED BACKGROUND
      ctx.fillStyle = themeConfig.bg;
      ctx.fillRect(0, 0, width, height);

      // 2. DRAW THEME-SPECIFIC BACKGROUND GRID
      drawThemedGrid(ctx, width, height, themeConfig);

      // ---------------------------------------------------------
      // RUN ACTIVE MODE SIMULATION
      // ---------------------------------------------------------
      if (activeMode === 'platformer') {
        updatePlatformer(dt, width, height);
        drawPlatformer(ctx, width, height, themeConfig);
      } else if (activeMode === 'ballistics') {
        updateBallistics(dt, width, height);
        drawBallistics(ctx, width, height, themeConfig);
      } else if (activeMode === 'collision') {
        updateCollisions(dt, width, height);
        drawCollisions(ctx, width, height, themeConfig);
      }

      // 3. UPDATE & DRAW PARTICLES
      updateAndDrawParticles(ctx, dt);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [
    activeMode,
    themeConfig,
    gravity,
    jumpForce,
    coyoteTimeMs,
    jumpBufferMs,
    apexBoost,
    airControl,
    runSpeed,
    ballisticsGravity,
    restitution,
    windSpeed,
    elasticity,
    simGravity,
    showMomentum,
    showVelocities
  ]);

  // -------------------------------------------------------------
  // PLATFORMER SIMULATION LOGIC
  // -------------------------------------------------------------
  const updatePlatformer = (dt: number, width: number, height: number) => {
    const p = playerRef.current;
    const keys = keysRef.current;

    // Moving platform update
    const mp = movingPlatformRef.current;
    mp.x += mp.vx * dt;
    if (mp.x > mp.maxX) {
      mp.x = mp.maxX;
      mp.vx = -Math.abs(mp.vx);
    } else if (mp.x < mp.minX) {
      mp.x = mp.minX;
      mp.vx = Math.abs(mp.vx);
    }

    // Horizontal Movement & Acceleration
    const targetVx = (keys.left ? -1 : keys.right ? 1 : 0) * runSpeed;
    const accelRate = p.isGrounded ? 18 : (18 * airControl) / 100;
    p.vx += (targetVx - p.vx) * Math.min(1, accelRate * dt);

    if (keys.left) p.facing = -1;
    if (keys.right) p.facing = 1;

    // Gravity calculation with Apex Boost
    let currentGravity = gravity;
    const isAtApex = Math.abs(p.vy) < 70 && !p.isGrounded;
    if (apexBoost && isAtApex) {
      currentGravity = gravity * 0.45; // 55% reduction at the peak of the jump!
      setIsApexFloat(true);
    } else {
      setIsApexFloat(false);
    }
    p.vy += currentGravity * dt;

    // Update timers
    if (p.coyoteTimer > 0) p.coyoteTimer -= dt;
    if (p.jumpBufferTimer > 0) p.jumpBufferTimer -= dt;

    setCoyoteActiveRemaining(Math.max(0, Math.round(p.coyoteTimer * 1000)));
    setIsJumpBuffered(p.jumpBufferTimer > 0);
    setLiveVx(Math.round(p.vx));
    setLiveVy(Math.round(p.vy));

    // Jump Execution (Grounded OR within Coyote Time window)
    const canJump = p.isGrounded || p.coyoteTimer > 0;
    if (p.jumpBufferTimer > 0 && canJump) {
      p.vy = -jumpForce;
      p.isGrounded = false;
      p.coyoteTimer = 0;
      p.jumpBufferTimer = 0;
      p.isJumping = true;
      sound.playJump();

      spawnParticles(p.x + p.width / 2, p.y + p.height, 12, themeConfig.particleColors, themeConfig.particleShape);
    }

    // Integrate position
    p.x += p.vx * dt;
    p.y += p.vy * dt;

    // Boundary constraints
    if (p.x < 10) {
      p.x = 10;
      p.vx = 0;
    }
    if (p.x + p.width > width - 10) {
      p.x = width - 10 - p.width;
      p.vx = 0;
    }

    // Check platform collisions
    const wasGrounded = p.isGrounded;
    p.isGrounded = false;

    // Combine static platforms and moving platform
    const allPlatforms = [
      ...platforms.current,
      { x: mp.x, y: mp.y, w: mp.w, h: mp.h, isMoving: true }
    ];

    for (const plat of allPlatforms) {
      // One-way platform collision from above
      const prevY = p.y - p.vy * dt;
      const feetY = p.y + p.height;
      const prevFeetY = prevY + p.height;

      if (
        p.x + p.width > plat.x + 4 &&
        p.x < plat.x + plat.w - 4 &&
        prevFeetY <= plat.y + 6 &&
        feetY >= plat.y &&
        p.vy >= 0
      ) {
        p.y = plat.y - p.height;
        p.vy = 0;
        p.isGrounded = true;

        // If landing on spring pad
        if ('isSpring' in plat && plat.isSpring) {
          p.vy = -jumpForce * 1.35;
          p.isGrounded = false;
          sound.playBounce();
          spawnParticles(p.x + p.width / 2, plat.y, 16, themeConfig.particleColors, themeConfig.particleShape);
        } else if (!wasGrounded) {
          sound.playLand();
          spawnParticles(p.x + p.width / 2, plat.y, 8, themeConfig.particleColors, themeConfig.particleShape);
        }

        // Move with moving platform
        if ('isMoving' in plat && plat.isMoving) {
          p.x += mp.vx * dt;
        }
        break;
      }
    }

    // Floor boundary (Lava / Pit)
    if (p.y > height + 50) {
      // Respawn
      p.x = 100;
      p.y = 350;
      p.vx = 0;
      p.vy = 0;
      p.coyoteTimer = 0;
      sound.playClick();
    }

    // Grounded transition -> reset or activate Coyote Time
    if (p.isGrounded) {
      p.coyoteTimer = coyoteTimeMs / 1000;
      p.isJumping = false;
    } else if (wasGrounded && !p.isGrounded && p.vy >= 0) {
      // Just walked off the edge! Start countdown
      p.coyoteTimer = coyoteTimeMs / 1000;
    }

    // Record jump trajectory trail
    if (!p.isGrounded) {
      trailRef.current.push({ x: p.x + p.width / 2, y: p.y + p.height / 2, alpha: 0.9 });
      if (trailRef.current.length > 50) trailRef.current.shift();
    } else if (trailRef.current.length > 0) {
      // Fade out trail when grounded
      trailRef.current.forEach(pt => (pt.alpha *= 0.95));
      trailRef.current = trailRef.current.filter(pt => pt.alpha > 0.05);
    }
  };

  // -------------------------------------------------------------
  // BALLISTICS SIMULATION LOGIC
  // -------------------------------------------------------------
  const updateBallistics = (dt: number, width: number, height: number) => {
    const projs = projectilesRef.current;
    const tgts = targetsRef.current;

    tgts.forEach(t => {
      t.pulse = (t.pulse + dt * 4) % (Math.PI * 2);
    });

    for (let i = projs.length - 1; i >= 0; i--) {
      const p = projs[i];
      if (!p.active) continue;

      // Apply gravity and wind
      p.vy += ballisticsGravity * dt;
      p.vx += windSpeed * dt;

      p.x += p.vx * dt;
      p.y += p.vy * dt;

      // Append trail point
      p.trail.push({ x: p.x, y: p.y });
      if (p.trail.length > 30) p.trail.shift();

      // Check collision with targets
      for (const t of tgts) {
        if (!t.hit && Math.hypot(p.x - t.x, p.y - t.y) < p.radius + t.radius) {
          t.hit = true;
          setScore(s => s + 100);
          sound.playScore();
          spawnParticles(t.x, t.y, 25, ['#facc15', '#4ade80', '#38bdf8', '#ff007f'], 'spark');
        }
      }

      // Check bounce on floor
      const groundY = height - 60;
      if (p.y + p.radius >= groundY) {
        p.y = groundY - p.radius;
        p.vy = -p.vy * restitution;
        p.vx *= 0.92; // ground friction
        p.bounces++;
        sound.playBounce();
        spawnParticles(p.x, groundY, 6, themeConfig.particleColors, themeConfig.particleShape);

        if (Math.abs(p.vy) < 20 || p.bounces > 6) {
          p.active = false;
        }
      }

      // Check bounce on walls
      if (p.x - p.radius < 10) {
        p.x = 10 + p.radius;
        p.vx = -p.vx * restitution;
        sound.playBounce();
      } else if (p.x + p.radius > width - 10) {
        p.x = width - 10 - p.radius;
        p.vx = -p.vx * restitution;
        sound.playBounce();
      }
    }
  };

  // -------------------------------------------------------------
  // ELASTIC COLLISIONS SIMULATION LOGIC
  // -------------------------------------------------------------
  const updateCollisions = (dt: number, width: number, height: number) => {
    const bodies = bodiesRef.current;
    const boundaryLeft = 20;
    const boundaryRight = width - 20;
    const boundaryTop = 30;
    const boundaryBottom = height - 40;

    for (let i = 0; i < bodies.length; i++) {
      const b1 = bodies[i];
      if (b1.isDragging) continue;

      // Apply gravity
      b1.vy += simGravity * dt;

      b1.x += b1.vx * dt;
      b1.y += b1.vy * dt;

      // Wall boundaries reflection
      if (b1.x - b1.radius < boundaryLeft) {
        b1.x = boundaryLeft + b1.radius;
        b1.vx = -b1.vx * elasticity;
      } else if (b1.x + b1.radius > boundaryRight) {
        b1.x = boundaryRight - b1.radius;
        b1.vx = -b1.vx * elasticity;
      }

      if (b1.y - b1.radius < boundaryTop) {
        b1.y = boundaryTop + b1.radius;
        b1.vy = -b1.vy * elasticity;
      } else if (b1.y + b1.radius > boundaryBottom) {
        b1.y = boundaryBottom - b1.radius;
        b1.vy = -b1.vy * elasticity;
      }

      // Check collisions between bodies (Elastic Impulse Resolution)
      for (let j = i + 1; j < bodies.length; j++) {
        const b2 = bodies[j];
        const dx = b2.x - b1.x;
        const dy = b2.y - b1.y;
        const dist = Math.hypot(dx, dy);
        const minDist = b1.radius + b2.radius;

        if (dist < minDist && dist > 0.001) {
          // Normal vector
          const nx = dx / dist;
          const ny = dy / dist;

          // Relative velocity
          const rvx = b2.vx - b1.vx;
          const rvy = b2.vy - b1.vy;

          // Velocity along normal
          const velAlongNormal = rvx * nx + rvy * ny;

          // Do not resolve if velocities are separating
          if (velAlongNormal < 0) {
            // Impulse scalar J = -(1 + e) * (v_rel . n) / (1/m1 + 1/m2)
            const impulse = (-(1 + elasticity) * velAlongNormal) / (1 / b1.mass + 1 / b2.mass);

            // Apply impulse along normal
            b1.vx -= (impulse / b1.mass) * nx;
            b1.vy -= (impulse / b1.mass) * ny;
            b2.vx += (impulse / b2.mass) * nx;
            b2.vy += (impulse / b2.mass) * ny;

            // Separate overlapping bodies
            const overlap = (minDist - dist) / 2;
            b1.x -= nx * overlap;
            b1.y -= ny * overlap;
            b2.x += nx * overlap;
            b2.y += ny * overlap;

            sound.playBounce();
            spawnParticles((b1.x + b2.x) / 2, (b1.y + b2.y) / 2, 6, [b1.color, b2.color], themeConfig.particleShape);
          }
        }
      }
    }
  };

  // -------------------------------------------------------------
  // DRAW BACKGROUND GRID (THEME CUSTOMIZED)
  // -------------------------------------------------------------
  const drawThemedGrid = (ctx: CanvasRenderingContext2D, width: number, height: number, tc: PhysicsThemeConfig) => {
    ctx.save();
    ctx.strokeStyle = tc.gridColor;
    ctx.fillStyle = tc.gridColor;

    if (tc.gridType === 'lcd') {
      // Game Boy dot-matrix LCD overlay
      const step = 6;
      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          ctx.fillRect(x, y, 1.5, 1.5);
        }
      }
    } else if (tc.gridType === 'blueprint') {
      // CAD Millimeter Grid with primary & secondary squares
      const minor = 20;
      ctx.lineWidth = 0.6;
      for (let x = 0; x < width; x += minor) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += minor) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      // Major Grid
      ctx.lineWidth = 1.4;
      for (let x = 0; x < width; x += 100) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
    } else if (tc.gridType === 'neon') {
      // Cyber Neon Perspective Grid on lower third
      ctx.lineWidth = 1;
      const horizonY = height * 0.65;
      for (let y = horizonY; y < height; y += 18) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, horizonY);
        ctx.lineTo(x * 1.5 - width * 0.25, height);
        ctx.stroke();
      }
    } else if (tc.gridType === 'vector') {
      // Vector82 Oscilloscope scanlines
      ctx.lineWidth = 0.5;
      for (let y = 0; y < height; y += 8) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    } else {
      // Standard dots or subtle lines
      const step = 30;
      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.restore();
  };

  // -------------------------------------------------------------
  // DRAW PLATFORMER MODE (THEME CUSTOMIZED)
  // -------------------------------------------------------------
  const drawPlatformer = (ctx: CanvasRenderingContext2D, width: number, height: number, tc: PhysicsThemeConfig) => {
    // 1. Draw Ghost Trajectory Trail
    if (trailRef.current.length > 1) {
      ctx.save();
      for (let i = 0; i < trailRef.current.length; i++) {
        const pt = trailRef.current[i];
        ctx.fillStyle = tc.trajectory;
        ctx.globalAlpha = pt.alpha * 0.7;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // 2. Draw Platforms
    const mp = movingPlatformRef.current;
    const allPlatforms = [
      ...platforms.current,
      { x: mp.x, y: mp.y, w: mp.w, h: mp.h, isMoving: true }
    ];

    for (const plat of allPlatforms) {
      ctx.save();
      ctx.fillStyle = ('isMoving' in plat && plat.isMoving) ? tc.vectorVx : ('isSpring' in plat && plat.isSpring) ? tc.accentGold : tc.platformFill;
      ctx.strokeStyle = tc.platformStroke;
      ctx.lineWidth = 2;

      if (tc.platformGlow) {
        ctx.shadowColor = tc.platformStroke;
        ctx.shadowBlur = 8;
      }

      ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
      ctx.strokeRect(plat.x, plat.y, plat.w, plat.h);

      // Decorative Platform details
      if ('isSpring' in plat && plat.isSpring) {
        ctx.fillStyle = '#000000';
        ctx.font = `10px ${tc.fontDisplay}`;
        ctx.textAlign = 'center';
        ctx.fillText('⚡ SPRING', plat.x + plat.w / 2, plat.y + 13);
      } else if ('isMoving' in plat && plat.isMoving) {
        ctx.fillStyle = '#ffffff';
        ctx.font = `10px ${tc.fontDisplay}`;
        ctx.textAlign = 'center';
        ctx.fillText('◄ MOVING ►', plat.x + plat.w / 2, plat.y + 13);
      } else if (plat.w === 180 && plat.x === 310) {
        // Label the coyote gap platform
        ctx.fillStyle = tc.platformStroke;
        ctx.font = `10px ${tc.fontMono}`;
        ctx.textAlign = 'center';
        ctx.fillText('← COYOTE GAP (50px) →', plat.x - 25, plat.y - 10);
      }
      ctx.restore();
    }

    // 3. Draw Player Entity (Themed Character Model)
    const p = playerRef.current;
    ctx.save();
    ctx.translate(p.x, p.y);

    drawThemedPlayer(ctx, p.width, p.height, p.facing, tc);

    // 4. Draw Velocity Vector Arrow on Player
    if (Math.abs(p.vx) > 10 || Math.abs(p.vy) > 10) {
      ctx.strokeStyle = tc.vectorV;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(p.width / 2, p.height / 2);
      ctx.lineTo(p.width / 2 + p.vx * 0.12, p.height / 2 + p.vy * 0.12);
      ctx.stroke();

      // Arrow head
      const arrowX = p.width / 2 + p.vx * 0.12;
      const arrowY = p.height / 2 + p.vy * 0.12;
      ctx.fillStyle = tc.vectorV;
      ctx.beginPath();
      ctx.arc(arrowX, arrowY, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // 5. Draw Coyote Time & Jump Buffer Indicators Over Head
    if (p.coyoteTimer > 0 && !p.isGrounded) {
      ctx.fillStyle = tc.coyoteActiveColor;
      ctx.font = `10px ${tc.fontDisplay}`;
      ctx.textAlign = 'center';
      ctx.fillText(`🦊 COYOTE (${Math.round(p.coyoteTimer * 1000)}ms)`, p.width / 2, -18);

      // Mini timer progress bar
      const barW = 36;
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(p.width / 2 - barW / 2, -14, barW, 4);
      ctx.fillStyle = tc.coyoteActiveColor;
      ctx.fillRect(p.width / 2 - barW / 2, -14, barW * (p.coyoteTimer / (coyoteTimeMs / 1000)), 4);
    } else if (p.jumpBufferTimer > 0) {
      ctx.fillStyle = tc.accentGold;
      ctx.font = `10px ${tc.fontDisplay}`;
      ctx.textAlign = 'center';
      ctx.fillText('📥 JUMP QUEUED', p.width / 2, -18);
    } else if (isApexFloat) {
      ctx.fillStyle = tc.vectorVy;
      ctx.font = `10px ${tc.fontDisplay}`;
      ctx.textAlign = 'center';
      ctx.fillText('✨ APEX FLOAT', p.width / 2, -18);
    }

    ctx.restore();
  };

  // -------------------------------------------------------------
  // DRAW BALLISTICS MODE (THEME CUSTOMIZED)
  // -------------------------------------------------------------
  const drawBallistics = (ctx: CanvasRenderingContext2D, width: number, height: number, tc: PhysicsThemeConfig) => {
    const cannonX = 80;
    const cannonY = 410;
    const rad = (launchAngle * Math.PI) / 180;
    const barrelLen = 44;

    // 1. Draw Analytical Predicted Parabolic Arc
    ctx.save();
    ctx.strokeStyle = tc.trajectory;
    ctx.lineWidth = 1.8;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();

    const simDt = 0.03;
    let simX = cannonX + Math.cos(rad) * barrelLen;
    let simY = cannonY - Math.sin(rad) * barrelLen;
    let simVx = Math.cos(rad) * launchSpeed;
    let simVy = -Math.sin(rad) * launchSpeed;

    ctx.moveTo(simX, simY);
    for (let step = 0; step < 70; step++) {
      simVy += ballisticsGravity * simDt;
      simVx += windSpeed * simDt;
      simX += simVx * simDt;
      simY += simVy * simDt;
      ctx.lineTo(simX, simY);
      if (simY > height - 60 || simX > width) break;
    }
    ctx.stroke();
    ctx.restore();

    // 2. Draw Floor
    const groundY = height - 60;
    ctx.save();
    ctx.fillStyle = tc.platformFill;
    ctx.strokeStyle = tc.platformStroke;
    ctx.lineWidth = 2;
    ctx.fillRect(0, groundY, width, 60);
    ctx.strokeRect(0, groundY, width, 60);
    ctx.restore();

    // 3. Draw Target Rings
    targetsRef.current.forEach((t, idx) => {
      ctx.save();
      const currentRad = t.hit ? t.radius * 1.3 : t.radius + Math.sin(t.pulse) * 3;
      ctx.strokeStyle = t.hit ? tc.vectorVy : tc.accentGold;
      ctx.lineWidth = t.hit ? 3 : 2.5;

      if (!t.hit && tc.platformGlow) {
        ctx.shadowColor = tc.accentGold;
        ctx.shadowBlur = 10;
      }

      ctx.beginPath();
      ctx.arc(t.x, t.y, currentRad, 0, Math.PI * 2);
      ctx.stroke();

      // Inner bullseye
      ctx.fillStyle = t.hit ? tc.vectorVy : tc.playerPrimary;
      ctx.beginPath();
      ctx.arc(t.x, t.y, 6, 0, Math.PI * 2);
      ctx.fill();

      // Score label
      ctx.fillStyle = tc.platformStroke;
      ctx.font = `11px ${tc.fontDisplay}`;
      ctx.textAlign = 'center';
      ctx.fillText(t.hit ? 'HIT!' : `${(idx + 1) * 100} PTS`, t.x, t.y - currentRad - 6);
      ctx.restore();
    });

    // 4. Draw Projectiles
    projectilesRef.current.forEach(p => {
      if (!p.active) return;
      ctx.save();

      // Draw projectile trail
      if (p.trail.length > 1) {
        ctx.strokeStyle = tc.vectorVx;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p.trail[0].x, p.trail[0].y);
        for (let i = 1; i < p.trail.length; i++) {
          ctx.lineTo(p.trail[i].x, p.trail[i].y);
        }
        ctx.stroke();
      }

      // Draw cannonball body
      ctx.fillStyle = tc.playerPrimary;
      ctx.strokeStyle = tc.playerSecondary;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Draw vector components on projectile
      ctx.strokeStyle = tc.vectorVx;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.vx * 0.08, p.y);
      ctx.stroke();

      ctx.strokeStyle = tc.vectorVy;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x, p.y + p.vy * 0.08);
      ctx.stroke();

      ctx.restore();
    });

    // 5. Draw Cannon Turret
    ctx.save();
    ctx.translate(cannonX, cannonY);

    // Mount base
    ctx.fillStyle = tc.platformStroke;
    ctx.beginPath();
    ctx.arc(0, 10, 20, Math.PI, Math.PI * 2);
    ctx.fill();

    // Rotatable Barrel
    ctx.rotate(-rad);
    ctx.fillStyle = tc.playerPrimary;
    ctx.strokeStyle = tc.playerSecondary;
    ctx.lineWidth = 2;
    ctx.fillRect(0, -9, barrelLen, 18);
    ctx.strokeRect(0, -9, barrelLen, 18);
    ctx.restore();
  };

  // -------------------------------------------------------------
  // DRAW COLLISIONS MODE (THEME CUSTOMIZED)
  // -------------------------------------------------------------
  const drawCollisions = (ctx: CanvasRenderingContext2D, width: number, height: number, tc: PhysicsThemeConfig) => {
    // Draw arena boundaries
    ctx.save();
    ctx.strokeStyle = tc.platformStroke;
    ctx.lineWidth = 2.5;
    if (tc.platformGlow) {
      ctx.shadowColor = tc.platformStroke;
      ctx.shadowBlur = 10;
    }
    ctx.strokeRect(20, 30, width - 40, height - 70);
    ctx.restore();

    // Draw Bodies
    bodiesRef.current.forEach(b => {
      ctx.save();
      ctx.fillStyle = b.color;
      ctx.strokeStyle = tc.platformStroke;
      ctx.lineWidth = 2;

      if (b.isDragging) {
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 16;
      }

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Mass label
      ctx.fillStyle = '#0f172a';
      ctx.font = `11px ${tc.fontDisplay}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${b.mass}kg`, b.x, b.y);

      // Draw Momentum or Velocity Vectors
      if (showVelocities && !b.isDragging && (Math.abs(b.vx) > 5 || Math.abs(b.vy) > 5)) {
        ctx.strokeStyle = tc.vectorV;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x + b.vx * 0.2, b.y + b.vy * 0.2);
        ctx.stroke();

        ctx.fillStyle = tc.vectorV;
        ctx.beginPath();
        ctx.arc(b.x + b.vx * 0.2, b.y + b.vy * 0.2, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      if (showMomentum && !b.isDragging) {
        const px = b.vx * b.mass * 0.08;
        const py = b.vy * b.mass * 0.08;
        ctx.strokeStyle = tc.vectorN;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x + px, b.y + py);
        ctx.stroke();
      }

      ctx.restore();
    });
  };

  // -------------------------------------------------------------
  // DRAW THEMED CHARACTER AVATARS
  // -------------------------------------------------------------
  const drawThemedPlayer = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    facing: number,
    tc: PhysicsThemeConfig
  ) => {
    ctx.save();

    if (tc.playerShape === 'gameboy') {
      // 4-Color GameBoy Chunky Pixel Sprites
      ctx.fillStyle = tc.playerPrimary;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = tc.playerSecondary;
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, w, h);

      // Pixel eye visor
      ctx.fillStyle = tc.playerSecondary;
      const eyeX = facing === 1 ? w - 10 : 3;
      ctx.fillRect(eyeX, 6, 7, 5);
      // Antenna
      ctx.fillRect(w / 2 - 2, -6, 4, 6);
      ctx.fillRect(w / 2 - 4, -8, 8, 3);
    } else if (tc.playerShape === 'cyber-drone') {
      // Glowing Neon Cyber Runner
      if (tc.playerGlow) {
        ctx.shadowColor = tc.playerPrimary;
        ctx.shadowBlur = 12;
      }
      ctx.fillStyle = tc.playerPrimary;
      ctx.strokeStyle = tc.playerSecondary;
      ctx.lineWidth = 2;

      // Hexagonal / Diamond Drone Body
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w, h / 2);
      ctx.lineTo(w / 2, h);
      ctx.lineTo(0, h / 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Glowing Center Core
      ctx.fillStyle = tc.playerSecondary;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (tc.playerShape === 'blueprint-cad') {
      // CAD Technical Blueprint Box with Crosshairs & Dimension
      ctx.strokeStyle = tc.playerPrimary;
      ctx.lineWidth = 1.8;
      ctx.strokeRect(0, 0, w, h);

      // Center crosshair
      ctx.beginPath();
      ctx.moveTo(w / 2, -4);
      ctx.lineTo(w / 2, h + 4);
      ctx.moveTo(-4, h / 2);
      ctx.lineTo(w + 4, h / 2);
      ctx.stroke();

      // Technical label
      ctx.fillStyle = tc.playerPrimary;
      ctx.font = '9px Courier New';
      ctx.fillText('M:1', w + 6, h / 2 + 3);
    } else if (tc.playerShape === 'vector-ship') {
      // 1982 Asteroids Glowing Wireframe Ship
      ctx.strokeStyle = tc.playerPrimary;
      ctx.lineWidth = 2;
      ctx.shadowColor = tc.playerPrimary;
      ctx.shadowBlur = 8;

      ctx.beginPath();
      if (facing === 1) {
        ctx.moveTo(w + 4, h / 2);
        ctx.lineTo(0, 0);
        ctx.lineTo(6, h / 2);
        ctx.lineTo(0, h);
      } else {
        ctx.moveTo(-4, h / 2);
        ctx.lineTo(w, 0);
        ctx.lineTo(w - 6, h / 2);
        ctx.lineTo(w, h);
      }
      ctx.closePath();
      ctx.stroke();
    } else if (tc.playerShape === 'inkwell-toon') {
      // 1930s Rubber-Hose Toon with Classic Pie Eyes
      ctx.fillStyle = tc.playerPrimary;
      ctx.strokeStyle = tc.playerSecondary;
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.ellipse(w / 2, h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Pie Eyes
      ctx.fillStyle = tc.playerSecondary;
      const eyeX = facing === 1 ? w / 2 + 2 : w / 2 - 8;
      ctx.beginPath();
      ctx.arc(eyeX, h / 2 - 3, 4, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // 16-Bit Retro Platformer Hero
      if (tc.playerGlow) {
        ctx.shadowColor = tc.playerPrimary;
        ctx.shadowBlur = 10;
      }
      ctx.fillStyle = tc.playerPrimary;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = tc.playerSecondary;
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, w, h);

      // Character Face & Eyes
      ctx.fillStyle = '#0f172a';
      const eyeOffset = facing === 1 ? w - 9 : 4;
      ctx.fillRect(eyeOffset, 7, 4, 6);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(facing === 1 ? eyeOffset + 1 : eyeOffset, 8, 2, 3);

      // Headband / Visor
      ctx.fillStyle = tc.playerSecondary;
      ctx.fillRect(0, 3, w, 3);
    }

    ctx.restore();
  };

  // -------------------------------------------------------------
  // UPDATE & DRAW PARTICLES
  // -------------------------------------------------------------
  const updateAndDrawParticles = (ctx: CanvasRenderingContext2D, dt: number) => {
    const list = particlesRef.current;
    for (let i = list.length - 1; i >= 0; i--) {
      const p = list[i];
      p.life += dt;
      if (p.life >= p.maxLife) {
        list.splice(i, 1);
        continue;
      }

      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.alpha = 1 - p.life / p.maxLife;

      ctx.save();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;

      if (p.shape === 'spark') {
        ctx.fillRect(p.x, p.y, p.size * 1.5, p.size * 0.7);
      } else if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
      ctx.restore();
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 65px)',
        backgroundColor: 'var(--bg-app)',
        color: 'var(--text-main)',
        padding: '16px 20px',
        gap: '16px'
      }}>
      {/* 1. TOP LAB NAVIGATION & TITLE */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          backgroundColor: 'var(--bg-surface)',
          padding: '12px 18px',
          border: '2px solid var(--border-color)',
          boxShadow: 'var(--card-shadow)'
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              padding: '6px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
            <Gamepad2 size={20} color="var(--accent-gold)" />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.86em',
                color: 'var(--accent-gold)'
              }}>
              {lang === 'vi' ? 'PHÒNG THÍ NGHIỆM VẬT LÝ' : 'INTERACTIVE PHYSICS LAB'}
            </span>
          </div>

          <span
            style={{
              fontSize: '0.78em',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-dim)',
              borderLeft: '1px solid var(--border-color)',
              paddingLeft: '12px'
            }}>
            Theme Style: <strong style={{ color: themeConfig.playerPrimary }}>{themeConfig.themeTitle}</strong>
          </span>
        </div>

        {/* Mode Selector Tabs */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              sound.playTab();
              setActiveMode('platformer');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82em',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: activeMode === 'platformer' ? 'var(--btn-active-bg)' : 'var(--bg-card)',
              color: activeMode === 'platformer' ? 'var(--btn-active-text)' : 'var(--text-main)',
              border: `1px solid ${activeMode === 'platformer' ? 'var(--btn-active-bg)' : 'var(--border-color)'}`
            }}>
            🏃 {lang === 'vi' ? '1. Game Feel & Coyote Time' : '1. Game Feel & Coyote'}
          </button>

          <button
            onClick={() => {
              sound.playTab();
              setActiveMode('ballistics');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82em',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: activeMode === 'ballistics' ? 'var(--btn-active-bg)' : 'var(--bg-card)',
              color: activeMode === 'ballistics' ? 'var(--btn-active-text)' : 'var(--text-main)',
              border: `1px solid ${activeMode === 'ballistics' ? 'var(--btn-active-bg)' : 'var(--border-color)'}`
            }}>
            🎯 {lang === 'vi' ? '2. Vector Toán & Bắn Pháo' : '2. 2D Vectors & Ballistics'}
          </button>

          <button
            onClick={() => {
              sound.playTab();
              setActiveMode('collision');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82em',
              fontWeight: 700,
              cursor: 'pointer',
              backgroundColor: activeMode === 'collision' ? 'var(--btn-active-bg)' : 'var(--bg-card)',
              color: activeMode === 'collision' ? 'var(--btn-active-text)' : 'var(--text-main)',
              border: `1px solid ${activeMode === 'collision' ? 'var(--btn-active-bg)' : 'var(--border-color)'}`
            }}>
            💥 {lang === 'vi' ? '3. Va Chạm & Động Lượng' : '3. Impulse & Collisions'}
          </button>
        </div>
      </div>

      {/* 2. MAIN INTERACTIVE LAB WORKSPACE */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 340px',
          gap: '16px',
          alignItems: 'start'
        }}>
        {/* LEFT: INTERACTIVE HTML5 CANVAS & HUD */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '2px solid var(--border-color)',
            boxShadow: 'var(--card-shadow)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
          {/* Live HUD Banner over Canvas */}
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              borderBottom: '1px solid var(--border-color)',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78em'
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {activeMode === 'platformer' && (
                <>
                  <span style={{ color: coyoteActiveRemaining > 0 ? themeConfig.coyoteActiveColor : 'var(--text-dim)' }}>
                    🦊 Coyote: <strong>{coyoteActiveRemaining}ms</strong>
                  </span>
                  <span style={{ color: isJumpBuffered ? themeConfig.accentGold : 'var(--text-dim)' }}>
                    📥 Buffer: <strong>{isJumpBuffered ? 'ACTIVE' : 'IDLE'}</strong>
                  </span>
                  <span style={{ color: isApexFloat ? themeConfig.vectorVy : 'var(--text-dim)' }}>
                    ✨ Apex: <strong>{isApexFloat ? 'FLOAT' : 'OFF'}</strong>
                  </span>
                  <span>
                    📐 V: (<strong>{liveVx}</strong>, <strong>{liveVy}</strong>)
                  </span>
                </>
              )}

              {activeMode === 'ballistics' && (
                <>
                  <span style={{ color: themeConfig.accentGold }}>
                    🏆 {lang === 'vi' ? 'Điểm Số' : 'Score'}: <strong>{score} PTS</strong>
                  </span>
                  <span>
                    🎯 {lang === 'vi' ? 'Góc' : 'Angle'}: <strong>{launchAngle}°</strong> | v₀: <strong>{launchSpeed} px/s</strong>
                  </span>
                </>
              )}

              {activeMode === 'collision' && (
                <>
                  <span style={{ color: themeConfig.vectorV }}>
                    ⚖️ Elasticity (e): <strong>{elasticity}</strong>
                  </span>
                  <span>
                    🪐 Gravity: <strong>{simGravity} px/s²</strong>
                  </span>
                </>
              )}
            </div>

            <button
              onClick={() => {
                if (activeMode === 'platformer') resetPlayer();
                else if (activeMode === 'ballistics') resetBallistics();
                else resetBodies('chaos');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                padding: '3px 8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78em',
                cursor: 'pointer'
              }}>
              <RotateCcw size={12} /> {lang === 'vi' ? 'Đặt lại' : 'Reset'}
            </button>
          </div>

          {/* Canvas Element */}
          <div style={{ position: 'relative', width: '100%', height: '500px', backgroundColor: themeConfig.bg }}>
            <canvas
              ref={canvasRef}
              width={900}
              height={500}
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                cursor: activeMode === 'collision' ? 'grab' : 'crosshair'
              }}
            />
          </div>

          {/* On-Screen Touch / Mouse Controller Bar */}
          <div
            style={{
              padding: '10px 14px',
              backgroundColor: 'var(--bg-card)',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.78em', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
                {activeMode === 'platformer'
                  ? (lang === 'vi' ? '🎮 Phím: [A / ◀] Trái, [D / ▶] Phải, [Space / W] Nhảy' : '🎮 Controls: [A/◀] Left, [D/▶] Right, [Space] Jump')
                  : activeMode === 'ballistics'
                  ? (lang === 'vi' ? '🎮 Bấm [Space] hoặc [BẮN PHÁO] để phóng quả cầu' : '🎮 Press [Space] or [FIRE] to launch')
                  : (lang === 'vi' ? '🖐️ Dùng chuột KÉO THẢ bất kỳ quả cầu nào để phóng!' : '🖐️ Drag and fling any orb with mouse!')}
              </span>
            </div>

            {/* Quick Virtual Buttons */}
            {activeMode === 'platformer' && (
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onMouseDown={() => (keysRef.current.left = true)}
                  onMouseUp={() => (keysRef.current.left = false)}
                  onTouchStart={() => (keysRef.current.left = true)}
                  onTouchEnd={() => (keysRef.current.left = false)}
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    padding: '6px 14px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    color: 'var(--text-main)'
                  }}>
                  ◀ Trái
                </button>
                <button
                  onMouseDown={() => {
                    keysRef.current.jump = true;
                    playerRef.current.jumpBufferTimer = jumpBufferMs / 1000;
                  }}
                  onMouseUp={() => {
                    keysRef.current.jump = false;
                    if (playerRef.current.vy < 0) playerRef.current.vy *= variableJumpCut;
                  }}
                  style={{
                    backgroundColor: 'var(--accent-gold)',
                    color: '#0f172a',
                    border: 'none',
                    padding: '6px 18px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}>
                  🦘 NHẢY
                </button>
                <button
                  onMouseDown={() => (keysRef.current.right = true)}
                  onMouseUp={() => (keysRef.current.right = false)}
                  onTouchStart={() => (keysRef.current.right = true)}
                  onTouchEnd={() => (keysRef.current.right = false)}
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    padding: '6px 14px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    color: 'var(--text-main)'
                  }}>
                  Phải ▶
                </button>
              </div>
            )}

            {activeMode === 'ballistics' && (
              <button
                onClick={fireProjectile}
                style={{
                  backgroundColor: 'var(--accent-gold)',
                  color: '#0f172a',
                  border: 'none',
                  padding: '6px 20px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.82em',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}>
                🚀 {lang === 'vi' ? 'BẮN PHÁO' : 'FIRE CANNON'}
              </button>
            )}
          </div>
        </div>

        {/* RIGHT: PARAMETER SLIDERS & PRESETS PANEL */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '2px solid var(--border-color)',
            boxShadow: 'var(--card-shadow)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxHeight: '620px',
            overflowY: 'auto'
          }}>
          {/* ------------------------------------------------------------- */}
          {/* MODE 1 CONTROLS: PLATFORMER & GAME FEEL                       */}
          {/* ------------------------------------------------------------- */}
          {activeMode === 'platformer' && (
            <>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                <h3
                  style={{
                    fontSize: '0.88em',
                    fontFamily: 'var(--font-display)',
                    color: 'var(--accent-gold)',
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                  <Sliders size={16} /> {lang === 'vi' ? 'Tinh Chỉnh Game Feel' : 'Game Feel Sliders'}
                </h3>
                <p style={{ fontSize: '0.78em', color: 'var(--text-dim)', lineHeight: 1.4 }}>
                  {lang === 'vi'
                    ? 'Thử thay đổi Coyote Time & Jump Buffer để cảm nhận sự khác biệt giữa game mượt mà và ức chế!'
                    : 'Tweak Coyote Time & Jump Buffer to feel the difference between fair and frustrating controls!'}
                </p>
              </div>

              {/* 1-Click Presets */}
              <div>
                <span style={{ fontSize: '0.74em', fontFamily: 'var(--font-display)', color: 'var(--text-muted)' }}>
                  {lang === 'vi' ? 'MẪU CẢM GIÁC CÓ SẴN (PRESETS):' : 'FEEL PRESETS:'}
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '6px' }}>
                  <button
                    onClick={() => applyPlatformerPreset('celeste')}
                    style={{
                      padding: '6px',
                      fontSize: '0.74em',
                      fontFamily: 'var(--font-mono)',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}>
                    🍓 <strong>Celeste</strong> (Tight)
                  </button>
                  <button
                    onClick={() => applyPlatformerPreset('mario')}
                    style={{
                      padding: '6px',
                      fontSize: '0.74em',
                      fontFamily: 'var(--font-mono)',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}>
                    🍄 <strong>Arcade 80s</strong>
                  </button>
                  <button
                    onClick={() => applyPlatformerPreset('souls')}
                    style={{
                      padding: '6px',
                      fontSize: '0.74em',
                      fontFamily: 'var(--font-mono)',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}>
                    🪨 <strong>Heavy Armor</strong>
                  </button>
                  <button
                    onClick={() => applyPlatformerPreset('hardcore')}
                    style={{
                      padding: '6px',
                      fontSize: '0.74em',
                      fontFamily: 'var(--font-mono)',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--accent-red)',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}>
                    💀 <strong>0ms (Khắc Nghiệt)</strong>
                  </button>
                </div>
              </div>

              {/* Sliders */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Coyote Time Slider */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78em', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, color: themeConfig.coyoteActiveColor }}>🦊 Coyote Time:</span>
                    <span>{coyoteTimeMs} ms</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={250}
                    step={10}
                    value={coyoteTimeMs}
                    onChange={e => setCoyoteTimeMs(Number(e.target.value))}
                    style={{ width: '100%', accentColor: themeConfig.coyoteActiveColor }}
                  />
                  <span style={{ fontSize: '0.7em', color: 'var(--text-dim)' }}>
                    {lang === 'vi' ? 'Cho phép nhảy sau khi đã rời mép bục' : 'Window to jump after leaving ledge'}
                  </span>
                </div>

                {/* Jump Buffer Slider */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78em', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, color: themeConfig.accentGold }}>📥 Jump Buffer:</span>
                    <span>{jumpBufferMs} ms</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={250}
                    step={10}
                    value={jumpBufferMs}
                    onChange={e => setJumpBufferMs(Number(e.target.value))}
                    style={{ width: '100%', accentColor: themeConfig.accentGold }}
                  />
                  <span style={{ fontSize: '0.7em', color: 'var(--text-dim)' }}>
                    {lang === 'vi' ? 'Lưu lệnh nhảy nếu bấm trước khi chạm đất' : 'Queues jump right before ground impact'}
                  </span>
                </div>

                {/* Gravity Slider */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78em', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700 }}>🌍 Gravity (g):</span>
                    <span>{gravity} px/s²</span>
                  </div>
                  <input
                    type="range"
                    min={400}
                    max={2400}
                    step={50}
                    value={gravity}
                    onChange={e => setGravity(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>

                {/* Jump Impulse Force */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78em', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700 }}>🦘 Jump Impulse:</span>
                    <span>{jumpForce} px/s</span>
                  </div>
                  <input
                    type="range"
                    min={350}
                    max={800}
                    step={20}
                    value={jumpForce}
                    onChange={e => setJumpForce(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>

                {/* Apex Boost Toggle */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
                  <label style={{ fontSize: '0.78em', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <input
                      type="checkbox"
                      checked={apexBoost}
                      onChange={e => setApexBoost(e.target.checked)}
                      style={{ accentColor: 'var(--accent-gold)' }}
                    />
                    ✨ Apex Float (Celeste Hangtime)
                  </label>
                  <span style={{ fontSize: '0.7em', color: 'var(--text-dim)' }}>-55% G</span>
                </div>

                {/* Air Control Slider */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78em', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700 }}>🦅 Air Control:</span>
                    <span>{airControl}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    step={5}
                    value={airControl}
                    onChange={e => setAirControl(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </>
          )}

          {/* ------------------------------------------------------------- */}
          {/* MODE 2 CONTROLS: 2D VECTORS & BALLISTICS                      */}
          {/* ------------------------------------------------------------- */}
          {activeMode === 'ballistics' && (
            <>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                <h3
                  style={{
                    fontSize: '0.88em',
                    fontFamily: 'var(--font-display)',
                    color: 'var(--accent-gold)',
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                  <Target size={16} /> {lang === 'vi' ? 'Toán Học Vector & Quỹ Đạo' : 'Vector Ballistics'}
                </h3>
                <p style={{ fontSize: '0.78em', color: 'var(--text-dim)', lineHeight: 1.4 }}>
                  {lang === 'vi'
                    ? 'Phân tích vector vận tốc v thành vx = v.cos(θ) và vy = v.sin(θ), mô phỏng phản xạ va chạm.'
                    : 'Decompose velocity vector into horizontal & vertical kinematic components.'}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Angle */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78em', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700 }}>📐 Góc Bắn (θ):</span>
                    <span>{launchAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={85}
                    step={1}
                    value={launchAngle}
                    onChange={e => setLaunchAngle(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>

                {/* Launch Speed */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78em', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700 }}>🚀 Vận Tốc Đầu (v₀):</span>
                    <span>{launchSpeed} px/s</span>
                  </div>
                  <input
                    type="range"
                    min={300}
                    max={850}
                    step={25}
                    value={launchSpeed}
                    onChange={e => setLaunchSpeed(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>

                {/* Elasticity / Restitution */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78em', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, color: themeConfig.vectorV }}>⚡ Hệ Số Nảy (e):</span>
                    <span>{restitution}</span>
                  </div>
                  <input
                    type="range"
                    min={0.1}
                    max={0.95}
                    step={0.05}
                    value={restitution}
                    onChange={e => setRestitution(Number(e.target.value))}
                    style={{ width: '100%', accentColor: themeConfig.vectorV }}
                  />
                  <span style={{ fontSize: '0.7em', color: 'var(--text-dim)' }}>
                    {restitution < 0.3 ? 'Đất sét (Hấp thụ lực)' : restitution > 0.85 ? 'Cao su siêu đàn hồi' : 'Nảy tiêu chuẩn'}
                  </span>
                </div>

                {/* Wind */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78em', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700 }}>💨 Gió Ngang (Wind):</span>
                    <span>{windSpeed} px/s</span>
                  </div>
                  <input
                    type="range"
                    min={-150}
                    max={150}
                    step={10}
                    value={windSpeed}
                    onChange={e => setWindSpeed(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </>
          )}

          {/* ------------------------------------------------------------- */}
          {/* MODE 3 CONTROLS: ELASTIC COLLISIONS                           */}
          {/* ------------------------------------------------------------- */}
          {activeMode === 'collision' && (
            <>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                <h3
                  style={{
                    fontSize: '0.88em',
                    fontFamily: 'var(--font-display)',
                    color: 'var(--accent-gold)',
                    marginBottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                  <Activity size={16} /> {lang === 'vi' ? 'Bảo Toàn Động Lượng' : 'Conservation of Momentum'}
                </h3>
                <p style={{ fontSize: '0.78em', color: 'var(--text-dim)', lineHeight: 1.4 }}>
                  {lang === 'vi'
                    ? 'Mô phỏng va chạm đàn hồi 2D sử dụng phương trình xung lực: m₁v₁ + m₂v₂ = m₁v₁’ + m₂v₂’.'
                    : '2D elastic collisions using impulse momentum conservation.'}
                </p>
              </div>

              {/* Collision Presets */}
              <div>
                <span style={{ fontSize: '0.74em', fontFamily: 'var(--font-display)', color: 'var(--text-muted)' }}>
                  {lang === 'vi' ? 'THÍ NGHIỆM MẪU:' : 'EXPERIMENTS:'}
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '6px' }}>
                  <button
                    onClick={() => resetBodies('cradle')}
                    style={{
                      padding: '6px',
                      fontSize: '0.74em',
                      fontFamily: 'var(--font-mono)',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}>
                    ⚖️ <strong>Newton's Cradle</strong>
                  </button>
                  <button
                    onClick={() => resetBodies('billiards')}
                    style={{
                      padding: '6px',
                      fontSize: '0.74em',
                      fontFamily: 'var(--font-mono)',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}>
                    🎱 <strong>Billiards Break</strong>
                  </button>
                  <button
                    onClick={() => resetBodies('planet')}
                    style={{
                      padding: '6px',
                      fontSize: '0.74em',
                      fontFamily: 'var(--font-mono)',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}>
                    🪐 <strong>Hành Tinh Nặng</strong>
                  </button>
                  <button
                    onClick={() => resetBodies('chaos')}
                    style={{
                      padding: '6px',
                      fontSize: '0.74em',
                      fontFamily: 'var(--font-mono)',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}>
                    🌌 <strong>Hỗn Loạn 0-G</strong>
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Elasticity */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78em', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700 }}>⚡ Đàn Hồi (e):</span>
                    <span>{elasticity}</span>
                  </div>
                  <input
                    type="range"
                    min={0.2}
                    max={1.0}
                    step={0.02}
                    value={elasticity}
                    onChange={e => setElasticity(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                  <span style={{ fontSize: '0.7em', color: 'var(--text-dim)' }}>
                    {elasticity === 1.0 ? '100% Đàn hồi hoàn hảo (Không mất năng lượng)' : 'Va chạm không hoàn toàn'}
                  </span>
                </div>

                {/* Gravity */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78em', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700 }}>🌍 Trọng Lực:</span>
                    <span>{simGravity === 0 ? '0-G (Không trọng lực)' : `${simGravity} px/s²`}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={1200}
                    step={100}
                    value={simGravity}
                    onChange={e => setSimGravity(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>

                {/* Vector Toggles */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '4px' }}>
                  <label style={{ fontSize: '0.78em', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={showVelocities}
                      onChange={e => setShowVelocities(e.target.checked)}
                      style={{ accentColor: themeConfig.vectorV }}
                    />
                    Vẽ Vector Vận Tốc (v)
                  </label>
                  <label style={{ fontSize: '0.78em', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={showMomentum}
                      onChange={e => setShowMomentum(e.target.checked)}
                      style={{ accentColor: themeConfig.vectorN }}
                    />
                    Vẽ Vector Động Lượng (p = m·v)
                  </label>
                </div>
              </div>
            </>
          )}

          {/* Educational Formula Card */}
          <div
            style={{
              marginTop: 'auto',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              padding: '10px 12px',
              fontSize: '0.74em',
              fontFamily: 'var(--font-mono)'
            }}>
            <div style={{ fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '4px' }}>
              💡 {lang === 'vi' ? 'Công Thức Cốt Lõi' : 'Core Physics Formula'}:
            </div>
            {activeMode === 'platformer' && (
              <div>
                <code>vy = vy + g · dt</code>
                <br />
                <code>y = y + vy · dt</code>
                <div style={{ color: 'var(--text-dim)', marginTop: '4px' }}>
                  Coyote Time cho phép hoãn điều kiện rơi tự do trong 80–120ms.
                </div>
              </div>
            )}
            {activeMode === 'ballistics' && (
              <div>
                <code>v_refl = v - (1 + e)(v · n)n</code>
                <div style={{ color: 'var(--text-dim)', marginTop: '4px' }}>
                  Phản xạ đàn hồi theo vector pháp tuyến n của mặt va chạm.
                </div>
              </div>
            )}
            {activeMode === 'collision' && (
              <div>
                <code>J = -(1+e)(v_rel · n) / (1/m₁ + 1/m₂)</code>
                <div style={{ color: 'var(--text-dim)', marginTop: '4px' }}>
                  Xung lượng tác động bảo toàn tổng động lượng của 2 vật thể.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
