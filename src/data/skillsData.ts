import { SkillNode } from '../types';

export const INITIAL_SKILLS: SkillNode[] = [
  // --- 0. ROOT NODE ---
  {
    id: 'root-game-dev',
    title: {
      vi: '🌟 Khởi Nguyên: Game Development',
      en: '🌟 Origin: Game Development'
    },
    category: 'root',
    tier: 0,
    status: 'mastered',
    exp: 200,
    maxExp: 200,
    x: 600,
    y: 60,
    tags: ['root', 'overview', 'gamedev'],
    summary: {
      vi: 'Gốc rễ của mọi tri thức làm game: sự giao thoa giữa Thiết kế, Kỹ thuật, Hội họa và Âm thanh.',
      en: 'The foundation of all game creation: the convergence of Design, Technology, Art, and Audio.'
    },
    content: {
      vi: `# 🌟 Khởi Nguyên Phát Triển Game (Game Development Root)

> "Làm game là bộ môn nghệ thuật kết hợp giữa logic toán học chính xác và cảm xúc thị giác, âm thanh sống động."

Chào mừng bạn đến với **Cây Kỹ Năng Nhà Phát Triển Game**. Từ điểm khởi đầu này, bạn sẽ mở khóa 5 đại nhánh tri thức cốt lõi:
1. 🎮 **Lý thuyết Thiết kế Trò chơi (Game Design Theory)**
2. 💻 **Lập trình Kỹ thuật & Toán học (Technical & Math)**
3. 🎨 **Đồ họa & Animation Pixel (Visual Arts)**
4. 🎵 **Âm thanh & Hiệu ứng Chiptune (Audio & SFX)**
5. 👹 **Thử thách Cấp cao & Boss Battle (Production & Bosses)**`,
      en: `# 🌟 Game Development Origin (Root Mastery)

> "Game development is the unique art form uniting rigorous mathematical logic with expressive audio-visual emotion."

Welcome to the **Game Developer Skill Tree**. From this foundational nexus, you will branch out into five core domains:
1. 🎮 **Game Design Theory & Mechanics**
2. 💻 **Technical Architecture & Math**
3. 🎨 **Visual Arts & Pixel Animation**
4. 🎵 **Audio Design & Chiptune SFX**
5. 👹 **Production, Boss Battles & Polishing**`
    },
    objectives: [
      {
        id: 'root-1',
        text: {
          vi: 'Thiết lập trạm nghiên cứu Game Dev Workspace',
          en: 'Set up Game Dev Studio & Workspace'
        },
        completed: true
      },
      {
        id: 'root-2',
        text: {
          vi: 'Hiểu rõ 4 trụ cột: Design, Tech, Art, Audio',
          en: 'Master the 4 Pillars: Design, Tech, Art, Audio'
        },
        completed: true
      }
    ]
  },

  // --- BRANCH 1: GAME DESIGN THEORY ---
  {
    id: 'design-core-loop',
    title: {
      vi: '🔄 Vòng Lặp Trò Chơi (Core Loop)',
      en: '🔄 Core Gameplay Loop'
    },
    category: 'design',
    tier: 1,
    status: 'mastered',
    exp: 150,
    maxExp: 150,
    parentId: 'root-game-dev',
    x: 240,
    y: 220,
    tags: ['game-design', 'core-loop', 'psychology'],
    summary: {
      vi: 'Vòng lặp 30 giây quyết định cảm xúc và động lực giữ chân người chơi xuyên suốt tựa game.',
      en: 'The 30-second interaction cycle driving player motivation, engagement, and retention.'
    },
    content: {
      vi: `# 🔄 Vòng Lặp Trò Chơi (Core Gameplay Loop)

## 1. Bản chất của Core Loop
Vòng lặp cốt lõi là chuỗi hành động lặp đi lặp lại mà người chơi thực hiện nhiều nhất:
\`\`\`
[ 1. Khám phá / Hành động ] ───> [ 2. Thử thách / Chiến đấu ]
             ▲                                    │
             │                                    ▼
  [ 4. Nâng cấp / Mở khóa ] <─── [ 3. Phần thưởng / Chiến thắng ]
\`\`\`

* **Micro-loop (3 - 10 giây):** Nhắm bắn, né đòn, nhảy qua chướng ngại vật.
* **Core-loop (1 - 5 phút):** Vượt 1 phòng quái, dọn sạch dungeon, nhặt hòm báu.
* **Macro-loop (Vài giờ):** Mở khóa kỹ năng mới, nâng cấp trang bị, đối đầu Boss.`,
      en: `# 🔄 Core Gameplay Loop

## 1. What is a Core Loop?
The core loop is the foundational sequence of actions a player repeatedly executes during gameplay:
\`\`\`
[ 1. Explore / Action ] ──────> [ 2. Challenge / Conflict ]
             ▲                                    │
             │                                    ▼
    [ 4. Upgrade / Unlock ] <─── [ 3. Reward / Feedback ]
\`\`\`

* **Micro-loop (3 - 10s):** Dash, parry, jump over hazard.
* **Core-loop (1 - 5m):** Clear dungeon room, loot chest, solve puzzle.
* **Macro-loop (Hours):** Level up skill tree, forge legendary weapons, defeat area bosses.`
    },
    objectives: [
      {
        id: 'loop-1',
        text: {
          vi: 'Xác định rõ hành động 30 giây trong game của bạn',
          en: 'Define the 30-second micro-loop of your game'
        },
        completed: true
      },
      {
        id: 'loop-2',
        text: {
          vi: 'Thiết kế cơ chế phản hồi (Reward cycle) hợp lý',
          en: 'Balance challenge progression and feedback pacing'
        },
        completed: true
      }
    ]
  },

  {
    id: 'design-game-feel',
    title: {
      vi: '✨ Game Feel & "Juice"',
      en: '✨ Game Feel & "Juice"'
    },
    category: 'design',
    tier: 2,
    status: 'learning',
    exp: 80,
    maxExp: 150,
    parentId: 'design-core-loop',
    x: 140,
    y: 420,
    tags: ['game-feel', 'juice', 'polish', 'camera-shake'],
    summary: {
      vi: 'Nghệ thuật biến các tương tác bình thường thành trải nghiệm cực kỳ đã tay và thỏa mãn.',
      en: 'The craft of turning simple interactions into visceral, punchy, and satisfying moments.'
    },
    content: {
      vi: `# ✨ Game Feel & Kỹ Thuật "Juice"

## Các thành phần tạo nên Game Feel đỉnh cao:
1. **Screen Shake (Rung màn hình có kiểm soát):** Tăng sức nặng cho cú đánh chí mạng.
2. **Hit Stop / Freeze Frame (Dừng hình 0.05s):** Tạo độ giật khi vũ khí chém trúng mục tiêu.
3. **Coyote Time (0.1s nhảy trễ):** Cho phép nhảy ngay sau khi vừa bước hụt khỏi mép vực.
4. **Jump Buffering (0.15s nhớ phím):** Ghi nhớ lệnh nhảy trước khi chạm đất.`,
      en: `# ✨ Game Feel & Adding "Juice"

## Essential Juice Checklist:
1. **Directional Screen Shake:** Adds physical weight and impact to critical strikes.
2. **Hit Stop / Freeze Frames (0.05s):** Emphasizes impact force when blade strikes metal.
3. **Coyote Time (0.1s grace window):** Lets the player jump momentarily after stepping off a platform edge.
4. **Input Buffering (0.15s buffer queue):** Registers jump inputs before touchdown for responsive platforming.`
    },
    objectives: [
      {
        id: 'feel-1',
        text: {
          vi: 'Lập trình Coyote Time & Jump Buffering',
          en: 'Implement Coyote Time & Jump Buffering in controller'
        },
        completed: false
      },
      {
        id: 'feel-2',
        text: {
          vi: 'Thêm Screen Shake đa hướng và Hit Stop',
          en: 'Add directional screen shake & hit stop on impact'
        },
        completed: false
      }
    ]
  },

  // --- BRANCH 2: TECHNICAL & MATH ---
  {
    id: 'tech-game-loop',
    title: {
      vi: '⚙️ Game Loop & DeltaTime',
      en: '⚙️ Game Loop & DeltaTime'
    },
    category: 'tech',
    tier: 1,
    status: 'mastered',
    exp: 150,
    maxExp: 150,
    parentId: 'root-game-dev',
    x: 600,
    y: 220,
    tags: ['programming', 'gameloop', 'fps'],
    summary: {
      vi: 'Trái tim của mọi game engine: điều khiển thời gian và đồng bộ khung hình.',
      en: 'The heart of every game engine: managing time, tick rate, and framerate consistency.'
    },
    content: {
      vi: `# ⚙️ Game Loop & DeltaTime Kiến Trúc

## Kiến trúc vòng lặp chuẩn:
\`\`\`cpp
while (isRunning) {
    float dt = timer.GetDeltaTime();
    ProcessInput();
    UpdatePhysics(dt);
    Render();
}
\`\`\`
* **Quy tắc vàng:** Mọi chuyển động phải nhân với \`dt\` để game chạy cùng tốc độ trên màn hình 60Hz hay 240Hz!`,
      en: `# ⚙️ Game Loop Architecture & DeltaTime

## The Canonical Loop:
\`\`\`cpp
while (isRunning) {
    float dt = timer.GetDeltaTime();
    ProcessInput();
    UpdatePhysics(dt);
    Render();
}
\`\`\`
* **Golden Rule:** Always multiply velocity by \`dt\` so entities traverse identical distances on 60Hz, 144Hz, or 240Hz monitors!`
    },
    objectives: [
      {
        id: 'loop-tech-1',
        text: {
          vi: 'Hiểu cách tính toán DeltaTime độc lập với FPS',
          en: 'Master framerate-independent DeltaTime calculation'
        },
        completed: true
      }
    ]
  },

  {
    id: 'tech-vector-math',
    title: {
      vi: '📐 Toán Vector 2D (Vector Math)',
      en: '📐 2D Vector Math'
    },
    category: 'tech',
    tier: 2,
    status: 'mastered',
    exp: 150,
    maxExp: 150,
    parentId: 'tech-game-loop',
    x: 480,
    y: 400,
    tags: ['math', 'vectors', 'physics'],
    summary: {
      vi: 'Tích vô hướng, chuẩn hóa vector và tính toán hướng chuyển động trong không gian 2D.',
      en: 'Dot product, normalization, magnitudes, and steering vectors in 2D Euclidean space.'
    },
    content: {
      vi: `# 📐 Toán Vector 2D cho Game Developer

## 1. Chuẩn hóa Vector (Normalize)
Tránh việc đi chéo nhanh hơn đi thẳng:
\`\`\`cpp
Vector2 v = Vector2(dx, dy);
if (v.Length() > 0) {
    v = v / v.Length(); // Vector đơn vị có độ dài = 1
}
\`\`\`

## 2. Tích vô hướng (Dot Product)
\`A · B = |A| * |B| * cos(θ)\`
* Dùng để kiểm tra kẻ địch có nhìn thấy người chơi trong tầm mắt góc 90 độ hay không.`,
      en: `# 📐 2D Vector Math for Game Developers

## 1. Vector Normalization
Prevents diagonal movement from being ~1.414x faster than cardinal movement:
\`\`\`cpp
Vector2 dir = Vector2(inputX, inputY);
if (dir.LengthSquared() > 0) {
    dir = dir.Normalized(); // Unit vector of length 1.0
}
\`\`\`

## 2. Dot Product Applications
\`A · B = |A| * |B| * cos(θ)\`
* Determine field of view (FOV) detection cones.
* Compute surface reflection angles for ricochet bullets.`
    },
    objectives: [
      {
        id: 'math-1',
        text: {
          vi: 'Áp dụng Normalize vào hệ thống di chuyển 8 hướng',
          en: 'Apply normalization to 8-directional input'
        },
        completed: true
      },
      {
        id: 'math-2',
        text: {
          vi: 'Tính góc phản xạ đạn nảy bằng Dot Product',
          en: 'Calculate projectile ricochet angles using Dot Product'
        },
        completed: true
      }
    ]
  },

  {
    id: 'tech-kinematics',
    title: {
      vi: '🕹️ Động Lực Học (Kinematics)',
      en: '🕹️ Kinematics & Physics'
    },
    category: 'tech',
    tier: 3,
    status: 'learning',
    exp: 90,
    maxExp: 150,
    parentId: 'tech-vector-math',
    x: 480,
    y: 600,
    tags: ['physics', 'movement', 'acceleration'],
    summary: {
      vi: 'Gia tốc, lực cản ma sát, vận tốc rơi và tính toán quỹ đạo nhảy mượt mà.',
      en: 'Acceleration, friction decel, terminal gravity, and jump apex trajectory tuning.'
    },
    content: {
      vi: `# 🕹️ Động Lực Học & Di Chuyển Nhân Vật

## Công thức chuyển động mượt:
\`\`\`cpp
// Tăng tốc dần và có quán tính khi dừng
float targetSpeed = inputDir.x * maxSpeed;
float accelRate = (abs(targetSpeed) > 0.01f) ? acceleration : deceleration;
velocity.x = MoveTowards(velocity.x, targetSpeed, accelRate * dt);
\`\`\`
* Trọng lực có thể biến thiên: Cho rơi nhanh hơn khi thả phím nhảy để cú nhảy có lực hơn.`,
      en: `# 🕹️ Kinematics & Character Controllers

## Physics Acceleration Model:
\`\`\`cpp
float targetSpeed = inputDir.x * maxSpeed;
float accelRate = (abs(targetSpeed) > 0.01f) ? acceleration : deceleration;
velocity.x = MoveTowards(velocity.x, targetSpeed, accelRate * dt);
\`\`\`
* Asymmetric Gravity: Double gravitational acceleration during falling phase for responsive platforming arcs.`
    },
    objectives: [
      {
        id: 'kin-1',
        text: {
          vi: 'Cân chỉnh quán tính trượt và gia tốc di chuyển',
          en: 'Tune friction deceleration and traction curves'
        },
        completed: true
      },
      {
        id: 'kin-2',
        text: {
          vi: 'Thử nghiệm trọng lực 2 pha (Apex Gravity)',
          en: 'Implement variable jump height with asymmetric gravity'
        },
        completed: false
      }
    ]
  },

  {
    id: 'tech-action-mechanics',
    title: {
      vi: '⚡ Lướt & Nhảy Tường (Dash & Wall)',
      en: '⚡ Dash & Wall Jump'
    },
    category: 'tech',
    tier: 4,
    status: 'locked',
    exp: 0,
    maxExp: 200,
    parentId: 'tech-kinematics',
    x: 480,
    y: 800,
    tags: ['action', 'dash', 'walljump', 'advanced'],
    summary: {
      vi: 'Kỹ năng nâng cao: Raycast kiểm tra tường, trượt bám tường và khóa điều khiển khi Dash.',
      en: 'Advanced controller: Wall slide friction, wall jump kicks, and dash invulnerability.'
    },
    content: {
      vi: `# ⚡ Kỹ năng Hành Động Nâng Cao: Dash & Wall Jump

## Các trạng thái cần quản lý:
1. **Wall Slide:** Giảm 70% tốc độ rơi khi bám vào tường.
2. **Wall Jump:** Tung lực chéo đẩy nhân vật rời khỏi bề mặt tường.
3. **Dash:** Khóa trọng lực trong 0.15s, phóng nhanh theo hướng nhìn, tạo bóng mờ (ghost trail).`,
      en: `# ⚡ Advanced Action Mechanics: Dash & Wall Jump

## State Implementation:
1. **Wall Slide:** Clamp terminal fall speed to 30% when hugging vertical geometry.
2. **Wall Jump:** Apply diagonal impulse normal to the wall surface with temporary horizontal input lockout.
3. **Dash:** Suspend gravity for 0.15s, propel forward with invincibility frames and motion blur ghost trails.`
    },
    objectives: [
      {
        id: 'act-1',
        text: {
          vi: 'Bắn Raycast nhận diện va chạm tường bên trái/phải',
          en: 'Cast lateral raycasts for precise wall detection'
        },
        completed: false
      },
      {
        id: 'act-2',
        text: {
          vi: 'Xây dựng hiệu ứng bóng mờ (Afterimage/Ghost trail)',
          en: 'Implement afterimage sprite trail during dash'
        },
        completed: false
      }
    ]
  },

  // --- BRANCH 3: ART & ANIMATION ---
  {
    id: 'art-pixel-pipeline',
    title: {
      vi: '🎨 Pixel Art & Aseprite Workflow',
      en: '🎨 Pixel Art & Aseprite Pipeline'
    },
    category: 'art',
    tier: 2,
    status: 'mastered',
    exp: 150,
    maxExp: 150,
    parentId: 'root-game-dev',
    x: 940,
    y: 240,
    tags: ['art', 'pixel-art', 'aseprite', 'spritesheet'],
    summary: {
      vi: 'Bảng màu giới hạn (Color Palette), vẽ sprite nhân vật và xuất Sprite Sheet tự động từ Aseprite.',
      en: 'Restricted palettes, sub-pixel animation, and automated Aseprite spritesheet pipelines.'
    },
    content: {
      vi: `# 🎨 Pixel Art & Quy trình Aseprite Chuyên Nghiệp

## 1. Nguyên lý vàng trong Pixel Art:
* **Hạn chế màu (Color Palette):** Sử dụng các bảng màu kinh điển (Endesga 32, Pico-8) để phong cách game đồng nhất.
* **Tránh "Jaggies" và "Banding":** Đường cong phải phân bố pixel theo tỷ lệ cân đối (ví dụ: 3-2-1-1-2-3).
* **Quy trình Aseprite:** Thiết kế các frame Run, Jump, Fall, Attack và xuất Sprite Sheet định dạng JSON Hash.`,
      en: `# 🎨 Professional Pixel Art & Aseprite Pipelines

## 1. Pixel Art Core Principles:
* **Strict Color Palettes:** Adopt indexed palettes (Endesga 32, Resurrect 64) for visual harmony.
* **Eliminate Jaggies:** Ensure curves follow disciplined pixel step counts (e.g., 3-2-1-1-2-3).
* **Aseprite CLI Export:** Export tagged frames into optimized atlas texture sheets with metadata.`
    },
    objectives: [
      {
        id: 'art-1',
        text: {
          vi: 'Vẽ bộ Sprite nhân vật 16x16 với đủ 4 hướng',
          en: 'Create 16x16 character sprites with 4-directional idle'
        },
        completed: true
      },
      {
        id: 'art-2',
        text: {
          vi: 'Xuất Sprite Sheet tự động qua dòng lệnh Aseprite',
          en: 'Configure Aseprite automated spritesheet export'
        },
        completed: true
      }
    ]
  },

  // --- BRANCH 4: AUDIO & SOUND FX ---
  {
    id: 'audio-chiptune',
    title: {
      vi: '🎵 Chiptune & Web Audio SFX',
      en: '🎵 Chiptune & Interactive SFX'
    },
    category: 'audio',
    tier: 2,
    status: 'learning',
    exp: 110,
    maxExp: 150,
    parentId: 'root-game-dev',
    x: 1040,
    y: 440,
    tags: ['audio', 'chiptune', 'sfx', 'webaudio'],
    summary: {
      vi: 'Tổng hợp sóng âm 8-bit vuông (Square), tam giác (Triangle) và nhiễu trắng (Noise) cho âm thanh game.',
      en: 'Synthesizing square, triangle, and noise waves for reactive procedural retro game audio.'
    },
    content: {
      vi: `# 🎵 Âm thanh Chiptune 8-bit & Thiết kế SFX

## 4 Dạng sóng kinh điển:
1. **Square Wave (Sóng vuông):** Tạo tiếng giai điệu retro réo rắt (Mario coin, đạn laser).
2. **Triangle Wave (Sóng tam giác):** Tạo tiếng bass trầm ấm và tiếng gõ êm tai.
3. **Noise Wave (Sóng nhiễu):** Tạo tiếng nổ bùng, tiếng bước chân trên sỏi cát hoặc tiếng giáp va chạm.
4. **Frequency Envelope:** Biến thiên tần số theo thời gian để tạo tiếng nhảy vút lên hoặc rơi tự do.`,
      en: `# 🎵 8-Bit Chiptune & Interactive SFX Design

## The 4 Classic Waveforms:
1. **Square Wave:** Bright, punchy retro melodic tones (Coin collection, laser bolts).
2. **Triangle Wave:** Warm, mellow basslines and gentle melodic leads.
3. **Noise Channel:** Explosions, weapon slashes, footsteps, and percussive hits.
4. **Pitch Envelopes:** Rapid sweeps up for jump arcs, sweeps down for damage impacts.`
    },
    objectives: [
      {
        id: 'aud-1',
        text: {
          vi: 'Lập trình tiếng Coin nhặt đồ và tiếng nhảy',
          en: 'Synthesize coin pickup and jump sound effects'
        },
        completed: true
      },
      {
        id: 'aud-2',
        text: {
          vi: 'Tạo tiếng nổ bằng bộ dao động White Noise',
          en: 'Build explosion generator using White Noise buffers'
        },
        completed: false
      }
    ]
  },

  // --- BRANCH 5: BOSS ARCHITECTURE & PRODUCTION ---
  {
    id: 'boss-state-machine',
    title: {
      vi: '👹 Kiến Trúc Trận Đánh Boss',
      en: '👹 Boss Fight Architecture'
    },
    category: 'boss',
    tier: 5,
    status: 'locked',
    exp: 0,
    maxExp: 300,
    parentId: 'tech-action-mechanics',
    x: 600,
    y: 1020,
    tags: ['boss', 'ai', 'fsm', 'climax'],
    summary: {
      vi: 'Đỉnh cao tích hợp: State Machine đa giai đoạn (Multi-phase), Telegraphing đòn đánh và nhịp độ thử thách.',
      en: 'The capstone integration: Multi-phase State Machines, attack telegraphing, and adaptive climax design.'
    },
    content: {
      vi: `# 👹 Thiết Kế & Kiến Trúc Trận Đánh Boss

## 1. Cấu trúc State Machine của Boss
Boss vận hành theo cỗ máy trạng thái tuần tự và phản ứng:
* **Phase 1 (100% - 70% HP):**
  * \`Idle/Taunt\` -> \`Charge Attack\` -> \`Cooldown (Vulnerable)\`.
* **Phase 2 (70% - 30% HP):**
  * Thêm chiêu thức \`Ground Slam\` tạo sóng chấn động; tăng 30% tốc độ ra đòn.
* **Enrage Phase (Dưới 30% HP):**
  * Nhạc nền 8-bit chuyển sang nhịp dồn dập; kết hợp combo liên hoàn.

## 2. Nguyên tắc Telegraphing (Báo hiệu đòn đánh)
Boss phải luôn có động tác "lấy đà" (Telegraph) 0.3s - 0.6s để người chơi có cơ hội né hoặc phản đòn!`,
      en: `# 👹 Boss Battle Architecture & Climax Design

## 1. Multi-Phase Boss State Machine
A great boss battle is a dynamic dance of tension and release:
* **Phase 1 (100% - 70% HP):**
  * \`Idle/Observe\` ──> \`Telegraphed Charge\` ──> \`Stunned Vulnerability\`
* **Phase 2 (70% - 30% HP):**
  * Introduces \`Ground Shockwave AoE\`; animation recovery windows compressed by 25%.
* **Enrage Phase (< 30% HP):**
  * Soundtrack shifts to high-tempo stem; boss chains multi-hit combos with deceptive feints.

## 2. The Telegraphing Law
Every devastating attack must have a legible 0.3s - 0.5s visual/audio wind-up telegraph so skill determines victory, never unfair randomness!`
    },
    objectives: [
      {
        id: 'boss-1',
        text: {
          vi: 'Thiết kế sơ đồ State Machine 3 giai đoạn của Boss',
          en: 'Architect 3-phase Finite State Machine diagram'
        },
        completed: false
      },
      {
        id: 'boss-2',
        text: {
          vi: 'Lập trình Telegraph báo hiệu trước mỗi đòn tất sát',
          en: 'Code visual and audio wind-up telegraph warnings'
        },
        completed: false
      }
    ]
  }
];
