import { SkillNode } from '../types';

export const INITIAL_SKILLS: SkillNode[] = [
  // =========================================================================
  // 0. ROOT NODE: GAME DEVELOPMENT FOUNDATIONS
  // =========================================================================
  {
    id: 'root-game-dev',
    title: {
      vi: 'Khởi Nguyên: Game Development',
      en: 'Nexus: Game Dev Foundations'
    },
    category: 'root',
    tier: 0,
    status: 'mastered',
    exp: 200,
    maxExp: 200,
    x: 1220,
    y: 60,
    tags: ['root', 'overview', 'gamedev', 'methodology'],
    summary: {
      vi: 'Trọng tâm liên ngành của sáng tạo game: Thiết kế trải nghiệm, Kỹ thuật phần mềm, Kiểm thử chất lượng, Nghệ thuật thị giác và Âm thanh.',
      en: 'The interdisciplinary nexus of game creation: Design experience, Software engineering, Quality assurance, Visual arts, and Audio architecture.'
    },
    content: {
      vi: `# Khởi Nguyên: Nền Tảng Phát Triển Game (Game Development Foundations)

> "Làm game là sự giao thoa tối thượng giữa tư duy logic toán học chặt chẽ và cảm xúc nghệ thuật tương tác sống động."

Nghiên cứu phát triển game **không bao giờ bị bó buộc bởi bất kỳ engine hay công cụ thương mại nào**. Một kỹ sư và nhà thiết kế game thực thụ nắm vững các nguyên lý khoa học máy tính, tâm lý học hành vi, hình học không gian và phương pháp luận kiểm thử — những tri thức trường tồn dù bạn tự viết engine bằng C++, dùng WebGL, hay làm việc trên bất kỳ nền tảng nào.

---

### 5 Đại Trụ Cột Tri Thức Cốt Lõi:
1. **Game Design & Mechanics**: Bản chất của niềm vui, động lực người chơi, vòng lặp tương tác, cân bằng hệ thống và nhịp độ không gian.
2. **Game Programming & Software Architecture**: Vòng lặp trò chơi DeltaTime, toán học vector/động lực học, các mẫu thiết kế (FSM, Component/ECS, Event Bus) và AI tương tác.
3. **Testing, QA & Optimization**: Vòng đời bug, kiểm thử biên, mô phỏng tự động headless bot, profiling CPU/GPU và phương pháp đo lường UX thực nghiệm.
4. **Visual Arts & Technical Art**: Ngôn ngữ thị giác, độ tương phản hình chiếu (silhouette), 12 nguyên lý diễn hoạt tương tác và shader đồ họa.
5. **Audio & Sound Architecture**: Ký hiệu học âm thanh, hệ thống âm thanh thích ứng theo trạng thái trò chơi (adaptive audio) và không gian hóa 3D.
6. **Production & Climax Capstones**: Kiến trúc trận đánh Boss đa giai đoạn và quy trình quản lý phạm vi (scope), hoàn thiện (polish) và phát hành.`,
      en: `# Nexus: Game Development Core Foundations

> "Game development represents the ultimate convergence of rigorous computational logic and interactive artistic expression."

The study of game creation **must never be shackled to any single commercial tool or engine**. A true game craftsman masters fundamental computer science, behavioral psychology, spatial geometry, and empirical QA methodologies — principles that endure whether you code a custom C++ engine, build for the web, or utilize modern toolsets.

---

### The 5 Architectural Pillars:
1. **Game Design & Mechanics**: Player psychology, interaction loops, systems balancing, game feel, and spatial level pacing.
2. **Game Programming & Architecture**: Game loops & DeltaTime, Euclidean kinematics, architectural patterns (FSM, Component/ECS, Event Bus), and AI behavior models.
3. **Testing, QA & Optimization**: Bug lifecycle taxonomy, boundary testing, automated headless simulation, performance profiling, and empirical UX telemetry.
4. **Visual Arts & Technical Art**: Visual readability, silhouette hierarchy, interactive animation principles, and shader graphics pipelines.
5. **Audio & Sound Architecture**: Audio semiotics, adaptive sound systems, dynamic layering, and 3D spatial acoustic propagation.
6. **Production & Climax Capstones**: Multi-phase Boss battle architecture and the disciplined scope, polish, and release pipeline.`
    },
    objectives: [
      {
        id: 'root-1',
        text: {
          vi: 'Hiểu rõ tư duy phát triển game độc lập với công cụ (Tool-Agnostic Mindset)',
          en: 'Adopt the tool-agnostic mindset and holistic engineering philosophy'
        },
        completed: true
      },
      {
        id: 'root-2',
        text: {
          vi: 'Nắm vững 5 trụ cột liên ngành: Design, Code, QA, Art và Audio',
          en: 'Master the 5 interdisciplinary pillars: Design, Tech, QA, Art, Audio'
        },
        completed: true
      }
    ]
  },

  // =========================================================================
  // PILLAR 1: GAME DESIGN & MECHANICS (Column 1, x: 100)
  // =========================================================================
  {
    id: 'design-core-loop',
    title: {
      vi: 'Vòng Lặp Trò Chơi (Core Loop)',
      en: 'Core Gameplay Loop'
    },
    category: 'design',
    tier: 1,
    status: 'mastered',
    exp: 150,
    maxExp: 150,
    parentId: 'root-game-dev',
    x: 100,
    y: 250,
    tags: ['game-design', 'core-loop', 'psychology', 'mda-framework'],
    summary: {
      vi: 'Mô hình MDA, vòng lặp 30 giây và chu trình phản hồi chi phối động lực gắn bó của người chơi.',
      en: 'The MDA framework, 30-second interaction cycle, and feedback loops driving player engagement.'
    },
    content: {
      vi: `# Vòng Lặp Trò Chơi & Mô Hình MDA (Core Gameplay Loop)

## 1. Mô hình MDA (Mechanics - Dynamics - Aesthetics)
* **Mechanics (Cơ chế):** Quy tắc toán học, luật chơi và thuật toán cơ sở (ví dụ: nhảy cao 3 mét, đạn tiêu tốn 1 mana).
* **Dynamics (Động lực học):** Hành vi phát sinh khi người chơi tương tác với cơ chế theo thời gian thực (ví dụ: tiết kiệm mana, né đòn để chờ thời cơ).
* **Aesthetics (Cảm xúc thẩm mỹ):** Trải nghiệm cảm xúc đọng lại trong tâm trí người chơi (Căng thẳng, Phiêu lưu, Thử thách, Giải tỏa).

## 2. Cấu trúc 3 Tầng Vòng Lặp Tương Tác
\`\`\`
[ Micro-Loop: 1 - 5 giây ] ──> Hành động phản xạ: Ngắm bắn, Phản xạ né đòn, Nhảy qua gai.
           │
           ▼
[ Core-Loop: 1 - 5 phút ] ───> Vòng lặp mục tiêu: Vượt 1 phòng quái, Dọn sạch cứ điểm, Giải câu đố.
           │
           ▼
[ Macro-Loop: Nhiều giờ ] ───> Vòng lặp dài hạn: Mở khóa nhánh kỹ năng, Nâng cấp nhân vật, Đánh bại Boss.
\`\`\`

## 3. Feedback Loops (Vòng lặp phản hồi)
* **Positive Feedback Loop (Tuyết lăn):** Thành công mang lại lợi thế lớn hơn (thắng nhặt được trang bị mạnh -> càng dễ thắng). Cần kiểm soát để tránh làm vỡ tính cân bằng!
* **Negative Feedback Loop (Cân bằng động):** Thua cuộc được hỗ trợ nhẹ hoặc kẻ dẫn đầu chịu thêm áp lực (giúp trận đấu gay cấn đến phút cuối).`,
      en: `# Core Gameplay Loop & The MDA Framework

## 1. The MDA Framework (Mechanics - Dynamics - Aesthetics)
* **Mechanics:** The formal rules, calculations, and inputs defining the system (e.g., jump velocity = 12m/s, spell costs 15 MP).
* **Dynamics:** The emergent behaviors that arise when players engage with mechanics in real time (e.g., resource rationing, baiting enemy attacks).
* **Aesthetics:** The emotional experiences evoked in the player (Tension, Mastery, Discovery, Catharsis).

## 2. The Three-Tier Interaction Loop
\`\`\`
[ Micro-Loop: 1 - 5 seconds ] ──> Reflex action: Dash, parry, timing a precision jump.
           │
           ▼
[ Core-Loop: 1 - 5 minutes ] ───> Encounter objective: Clear arena, solve room puzzle, capture outpost.
           │
           ▼
[ Macro-Loop: Hours ] ──────────> Long-term arc: Skill tree progression, story chapter climax, world state change.
\`\`\`

## 3. Feedback Loops
* **Positive Feedback (Snowballing):** Success begets more power. Must be carefully capped to prevent early game runaway.
* **Negative Feedback (Rubber-Banding):** Keeps systems balanced and dramatic by offering catch-up mechanics.`
    },
    objectives: [
      {
        id: 'loop-1',
        text: {
          vi: 'Phân tích rõ ràng Micro-loop, Core-loop và Macro-loop cho dự án của bạn',
          en: 'Define the Micro, Core, and Macro gameplay loops for your game'
        },
        completed: true
      },
      {
        id: 'loop-2',
        text: {
          vi: 'Xác lập các vòng lặp phản hồi Positive và Negative để giữ nhịp độ kịch tính',
          en: 'Map out positive and negative feedback loops to regulate difficulty pacing'
        },
        completed: true
      }
    ]
  },

  {
    id: 'design-level-spatial',
    title: {
      vi: 'Thiết Kế Màn Chơi (Level Design)',
      en: 'Level Design & Spatial Pacing'
    },
    category: 'design',
    tier: 2,
    status: 'learning',
    exp: 90,
    maxExp: 150,
    parentId: 'design-core-loop',
    x: 100,
    y: 520,
    tags: ['level-design', 'spatial-pacing', 'guidance', 'flow'],
    summary: {
      vi: 'Điều hướng tiềm thức người chơi, cấu trúc không gian Pinch & Release và nhịp độ căng thẳng - giải tỏa.',
      en: 'Subconscious player guidance, Pinch & Release spatial pacing, and environmental affordance.'
    },
    content: {
      vi: `# Thiết Kế Màn Chơi & Nhịp Độ Không Gian (Level Design & Spatial Pacing)

## 1. Nghệ Thuật Dẫn Đường Tiềm Thức (Visual Leading Lines)
Không cần mũi tên chỉ đường thô kệch trên màn hình, một màn chơi xuất sắc dẫn dắt người chơi bằng bản năng:
* **Tương phản ánh sáng (Lighting Contrast):** Mắt người luôn hướng về điểm sáng nhất trong vùng tối.
* **Đường dẫn thị giác (Leading Lines):** Dây cáp, khe nứt sàn nhà, vòm mái cong hướng thẳng vào lối ra.
* **Affordance (Khả năng gợi ý hành động):** Bề mặt có gờ vàng gợi ý leo trèo, cửa có đèn xanh gợi ý có thể mở.

## 2. Nhịp Độ Không Gian: Kỹ Thuật "Pinch & Release"
* **Pinch (Bóp nghẹt):** Không gian hành lang hẹp, trần thấp, ánh sáng mờ, âm thanh ngột ngạt -> Đẩy nhịp tim và sự tập trung lên cực điểm.
* **Release (Giải tỏa):** Bước ra khoảng không gian rộng mở, trần vòm cao, ánh sáng chan hòa, góc nhìn bao quát -> Người chơi thở phào nhẹ nhõm, tận hưởng cảm giác chinh phục.

## 3. Nguyên Tắc Thiết Kế Đấu Trường (Combat Arena Design)
* Phải có ít nhất 2 tuyến đường di chuyển tuần hoàn (Loops) để tránh việc người chơi bị dồn vào ngõ cụt.
* Bố trí vật chắn che chở (Cover) có thể bị phá hủy hoặc yêu cầu di chuyển liên tục.`,
      en: `# Level Design & Spatial Pacing

## 1. Subconscious Visual Guidance
A well-architected level directs players intuitively without relying on intrusive UI arrows:
* **Luminance Contrast:** Human vision is involuntarily drawn toward bright focal points emerging from darkness.
* **Environmental Leading Lines:** Overhead cables, floor fissures, architectural arches pointing toward progression paths.
* **Visual Affordance:** Textured yellow ledges signal climbable surfaces; green illuminated consoles invite interaction.

## 2. Spatial Rhythm: The "Pinch & Release" Dynamic
* **Pinch (Compression):** Tight corridors, low ceilings, occluded vision, muffled acoustics -> Escalates psychological tension and vigilance.
* **Release (Expansion):** Emergence into vast cathedrals, sprawling vistas, sweeping orchestral cues -> Delivers catharsis and wonder.

## 3. Combat Arena Topography
* Always construct looping perimeter circuits so players are never unfairly cornered without counterplay options.
* Incorporate breakable or directional cover elements to encourage constant spatial mobility.`
    },
    objectives: [
      {
        id: 'lvl-1',
        text: {
          vi: 'Ứng dụng ít nhất 3 kỹ thuật dẫn đường tiềm thức (Ánh sáng, Vạch dẫn, Gợi ý affordance)',
          en: 'Implement 3 subconscious guidance techniques (Light contrast, Leading lines, Affordance)'
        },
        completed: false
      },
      {
        id: 'lvl-2',
        text: {
          vi: 'Thiết kế sơ đồ không gian đấu trường theo nguyên tắc tuần hoàn (Looping paths)',
          en: 'Architect a combat arena featuring looping paths and dynamic cover positions'
        },
        completed: false
      }
    ]
  },

  {
    id: 'design-game-feel',
    title: {
      vi: 'Cảm Giác Chơi & "Juice"',
      en: 'Game Feel & Responsiveness'
    },
    category: 'design',
    tier: 3,
    status: 'learning',
    exp: 70,
    maxExp: 150,
    parentId: 'design-level-spatial',
    x: 100,
    y: 790,
    tags: ['game-feel', 'juice', 'input-buffering', 'coyote-time'],
    summary: {
      vi: 'Độ nảy tương tác, dung sai điều khiển vị tha (Coyote time, Buffering) và cảm giác thỏa mãn trong từng thao tác.',
      en: 'Input ergonomics, forgiving window tolerances (Coyote time, Buffering), and tactile visceral juice.'
    },
    content: {
      vi: `# Cảm Giác Chơi & Kỹ Thuật "Juice" (Game Feel & Polish)

## 1. Thiết Kế Điều Khiển Vị Tha (Forgiving Player Input)
Người chơi thường ấn phím sớm hơn hoặc muộn hơn vài mili-giây so với thực tế vật lý. Trò chơi xuất sắc luôn "bao dung" cho sai số của con người:
* **Coyote Time (0.08s - 0.12s):** Cho phép nhân vật nhảy ngay cả khi vừa bước hụt ra khỏi mép vực rơi vào không trung.
* **Input Buffering (0.10s - 0.15s):** Ghi nhớ lệnh nhảy hoặc tấn công khi nhân vật vẫn đang ở trên không, và tự động kích hoạt ngay khi chạm đất.
* **Corner Rounding:** Tự động đẩy nhân vật lách qua gờ tường nếu nhân vật va chạm vào mép góc trên đầu khi nhảy.

## 2. Kỹ Thuật "Juice" Tạo Trọng Lực Cho Hành Động
* **Hit-Stop / Freeze Frame (Dừng hình 0.03s - 0.08s):** Tạm ngừng hoạt ảnh của cả người đánh lẫn mục tiêu trong tích tắc va chạm để não bộ cảm nhận được sức nặng cú đánh.
* **Camera Trauma & Screen Shake:** Rung màn hình với suy giảm bậc 2 (\`trauma^2\`) theo hướng phản lực đòn đánh.
* **Scale Squash & Stretch:** Co giãn sprite/model khi tiếp đất hoặc khi bật nhảy để thể hiện tính đàn hồi vật lý.`,
      en: `# Game Feel & Tactile Responsiveness ("Juice")

## 1. Forgiving Input Architecture
Human reaction times carry microsecond variances. Great games quietly forgive mechanical imperfections:
* **Coyote Time (80ms - 120ms):** Allows jumping after the character's bounding box has technically vacated the ledge.
* **Input Buffering (100ms - 150ms):** Queues attack/jump commands issued mid-air and executes them instantly upon touchdown.
* **Corner Nudging:** Smoothly shifts entity position laterally when colliding with ceiling corners during upward jump arcs.

## 2. Visceral Impact Checklist
* **Hit-Stop (Micro-freeze 30ms - 80ms):** Momentarily freezes frame rendering upon impact, allowing the brain to register striking force.
* **Directional Camera Trauma:** Applies directional shake decaying exponentially (\`offset = trauma^2 * maxAngle\`).
* **Squash & Stretch Dynamics:** Compresses vertical scale upon landing impact and stretches along the acceleration vector.`
    },
    objectives: [
      {
        id: 'feel-1',
        text: {
          vi: 'Lập trình hệ thống Coyote Time và Input Buffering cho bộ điều khiển nhân vật',
          en: 'Implement robust Coyote Time and Input Buffering queues in character controller'
        },
        completed: false
      },
      {
        id: 'feel-2',
        text: {
          vi: 'Tích hợp Hit-Stop và Camera Shake có công thức suy giảm mượt mà',
          en: 'Integrate Hit-Stop frame pauses and exponential screen shake decay'
        },
        completed: false
      }
    ]
  },

  {
    id: 'design-economy-balance',
    title: {
      vi: 'Cân Bằng Hệ Thống & Kinh Tế',
      en: 'Systems Balancing & Economy'
    },
    category: 'design',
    tier: 4,
    status: 'locked',
    exp: 0,
    maxExp: 200,
    parentId: 'design-game-feel',
    x: 100,
    y: 1060,
    tags: ['economy', 'balancing', 'sinks-taps', 'progression'],
    summary: {
      vi: 'Mô hình Taps & Sinks, đường cong tiến trình (Linear/Sigmoid), và lý thuyết cân bằng rủi ro - phần thưởng.',
      en: 'Taps & Sinks resource models, mathematical progression curves, and risk vs reward equilibrium.'
    },
    content: {
      vi: `# Cân Bằng Hệ Thống & Kinh Tế Trò Chơi (Systems Balancing)

## 1. Mô Hình Bồn Nước: Taps, Sinks & Reservoirs
* **Taps (Nguồn cung):** Tiền vàng rơi từ quái, phần thưởng nhiệm vụ, tài nguyên tái tạo theo thời gian.
* **Reservoirs (Kho tích trữ):** Túi đồ người chơi, tài khoản ngân hàng trong game.
* **Sinks (Hố tiêu thụ):** Mua máu, sửa trang bị, phí dịch chuyển, nâng cấp chỉ số.
* **Quy tắc vàng:** Nếu \`Taps > Sinks\` dài hạn -> Lạm phát phi mã, tài nguyên mất giá trị, động lực chơi sụp đổ!

## 2. Các Dạng Đường Cong Tiến Trình (Progression Curves)
* **Tuyến tính (Linear \`y = ax + b\`):** Dễ tính toán nhưng nhanh gây nhàm chán khi người chơi tích lũy nhiều sức mạnh.
* **Hàm mũ (Exponential \`y = a * b^x\`):** Dùng cho EXP cấp độ. Cấp sau đòi hỏi nhiều công sức gấp bội, giúp giữ chân người chơi lâu dài.
* **Sigmoid / S-Curve:** Khởi đầu chậm để làm quen -> tăng tốc mạnh mẽ ở giai đoạn cao trào -> bão hòa nhẹ ở cấp độ cuối để tránh chỉ số vô cực.

## 3. Ma Trận Đánh Đổi Rủi Ro / Phần Thưởng (Risk vs Reward)
Một quyết định chiến thuật chỉ có ý nghĩa nếu có sự đánh đổi: Vũ khí sát thương cực lớn nhưng thời gian ra đòn chậm; hoặc kỹ năng lướt trúng địch hồi chiêu lập tức nhưng nếu hụt thì bị choáng.`,
      en: `# Systems Balancing & In-Game Economy

## 1. The Hydraulic Economy Model: Taps, Sinks, and Reservoirs
* **Taps (Inflow):** Enemy loot drops, quest payouts, passive generation.
* **Reservoirs (Storage):** Player wallet, inventory stockpile.
* **Sinks (Outflow):** Consumables, equipment maintenance, stat re-rolls, cosmetic purchases.
* **The Balancing Law:** If \`Taps > Sinks\` over time, hyper-inflation devalues accomplishments and shatters motivation.

## 2. Progression Curve Mathematics
* **Linear (\`y = ax + b\`):** Predictable, but quickly produces stagnation at high power levels.
* **Exponential (\`y = a * e^(bx)\`):** Standard for leveling systems. Compresses low-tier advancement while demanding deep mastery later.
* **Sigmoid (S-Curve):** Gentle onboarding curve -> steep progression during mid-game mastery -> asymptotic soft-cap at endgame.

## 3. Risk vs Reward Matrix
Meaningful gameplay emerges from trade-offs: massive burst damage balanced by heavy recovery frames; or reckless offensive parries rewarded with instant execution windows.`
    },
    objectives: [
      {
        id: 'eco-1',
        text: {
          vi: 'Lập bảng phân bổ Taps và Sinks để ngăn chặn lạm phát tài nguyên trong game',
          en: 'Construct a balanced Taps and Sinks spreadsheet modeling resource flow'
        },
        completed: false
      },
      {
        id: 'eco-2',
        text: {
          vi: 'Thiết kế công thức EXP theo hàm Sigmoid hoặc hàm mũ có soft-cap',
          en: 'Formulate an exponential or sigmoid progression curve with dynamic soft-caps'
        },
        completed: false
      }
    ]
  },

  // =========================================================================
  // PILLAR 2: GAME PROGRAMMING & SOFTWARE ARCHITECTURE (Column 2, x: 660)
  // =========================================================================
  {
    id: 'prog-game-loop',
    title: {
      vi: 'Game Loop & DeltaTime',
      en: 'Game Loop & DeltaTime'
    },
    category: 'tech',
    tier: 1,
    status: 'mastered',
    exp: 150,
    maxExp: 150,
    parentId: 'root-game-dev',
    x: 660,
    y: 250,
    tags: ['programming', 'gameloop', 'fps', 'deltatime', 'architecture'],
    summary: {
      vi: 'Kiến trúc vòng lặp lõi, kỹ thuật Fixed Timestep, Accumulator pattern và tính độc lập với tốc độ khung hình.',
      en: 'Core game loop architecture, Fixed Timestep, Accumulator patterns, and framerate independence.'
    },
    content: {
      vi: `# Kiến Trúc Game Loop & Quản Lý Thời Gian Chuẩn Xác

## 1. Trái Tim Của Mọi Game Engine
Một game engine thực chất là một vòng lặp vô tận thực hiện 3 bước liên tục:
\`\`\`cpp
while (gameIsRunning) {
    Input::PollEvents();     // Thu thập phím bấm, chuột, gamepad
    Simulation::Update(dt);  // Cập nhật trạng thái vật lý, logic game
    Graphics::Render();      // Vẽ khung hình lên màn hình
}
\`\`\`

## 2. Kỹ Thuật Fixed Timestep với Accumulator (Bộ Tích Lũy)
Vật lý sẽ bị lỗi xuyên tường (tunneling) nếu \`dt\` dao động thất thường khi tụt FPS. Giải pháp chuẩn công nghiệp là cố định bước thời gian vật lý:
\`\`\`cpp
const double FIXED_DT = 1.0 / 60.0; // 60 ticks mỗi giây
double accumulator = 0.0;
double currentTime = GetCurrentTimeInSeconds();

while (gameIsRunning) {
    double newTime = GetCurrentTimeInSeconds();
    double frameTime = newTime - currentTime;
    currentTime = newTime;
    
    // Giới hạn để tránh "Spiral of Death" khi máy bị treo
    if (frameTime > 0.25) frameTime = 0.25;
    accumulator += frameTime;

    while (accumulator >= FIXED_DT) {
        UpdatePhysics(FIXED_DT);
        accumulator -= FIXED_DT;
    }

    // Nội suy render mượt mà giữa 2 frame vật lý
    float alpha = accumulator / FIXED_DT;
    Render(alpha);
}
\`\`\``,
      en: `# Game Loop Architecture & Precise Timestep Management

## 1. The Anatomy of an Engine Loop
Every game engine is at its core an infinite simulation cycle executing three serial phases:
\`\`\`cpp
while (gameIsRunning) {
    Input::PollEvents();     // Query keyboard, gamepad, pointer states
    Simulation::Update(dt);  // Advance physics, state machines, AI routines
    Graphics::Render();      // Draw the interpolated frame to the framebuffer
}
\`\`\`

## 2. The Canonical Fixed Timestep with Accumulator
Variable DeltaTime causes non-deterministic physics glitches and wall tunneling during framerate dips. The industry gold standard decouples physics ticks from render framerates:
\`\`\`cpp
const double FIXED_DT = 1.0 / 60.0; // Guaranteed 60hz simulation rate
double accumulator = 0.0;
double currentTime = GetHighPrecisionTime();

while (gameIsRunning) {
    double newTime = GetHighPrecisionTime();
    double frameTime = newTime - currentTime;
    currentTime = newTime;
    
    if (frameTime > 0.25) frameTime = 0.25; // Prevent spiral of death
    accumulator += frameTime;

    while (accumulator >= FIXED_DT) {
        SimulatePhysics(FIXED_DT);
        accumulator -= FIXED_DT;
    }

    float interpolationAlpha = (float)(accumulator / FIXED_DT);
    RenderState(interpolationAlpha);
}
\`\`\``
    },
    objectives: [
      {
        id: 'loop-tech-1',
        text: {
          vi: 'Hiểu và triển khai thuật toán Fixed Timestep với Accumulator',
          en: 'Implement the canonical Fixed Timestep with Accumulator pattern'
        },
        completed: true
      },
      {
        id: 'loop-tech-2',
        text: {
          vi: 'Xử lý biến kẹp frameTime để chống lỗi Spiral of Death khi đơ máy',
          en: 'Clamp frameTime to eliminate Spiral of Death freezes'
        },
        completed: true
      }
    ]
  },

  {
    id: 'prog-math-physics',
    title: {
      vi: 'Toán Vector & Động Lực Học',
      en: 'Game Math & Kinematics'
    },
    category: 'tech',
    tier: 2,
    status: 'mastered',
    exp: 150,
    maxExp: 150,
    parentId: 'prog-game-loop',
    x: 660,
    y: 520,
    tags: ['math', 'vectors', 'physics', 'kinematics', 'collisions'],
    summary: {
      vi: 'Không gian Euclid, Dot product tầm nhìn, phản xạ mặt phẳng và va chạm AABB / Hình tròn.',
      en: 'Euclidean vector math, Dot product FOV cones, surface reflection normals, and AABB collisions.'
    },
    content: {
      vi: `# Toán Vector & Động Lực Học Cho Game Developer

## 1. Chuẩn Hóa Vector (Normalization)
Khi bấm phím W và D cùng lúc, vector hướng là \`(1, 1)\` có độ dài \`sqrt(1^2 + 1^2) ≈ 1.414\`. Nhân vật sẽ chạy chéo nhanh hơn 41%!
\`\`\`cpp
Vector2 dir = Vector2(dx, dy);
float lengthSq = dir.x * dir.x + dir.y * dir.y;
if (lengthSq > 0.0001f) {
    float invLen = 1.0f / sqrt(lengthSq);
    dir.x *= invLen;
    dir.y *= invLen; // Vector có độ dài đúng bằng 1.0
}
\`\`\`

## 2. Tích Vô Hướng (Dot Product)
\`A · B = |A| * |B| * cos(θ)\`
* **Kiểm tra tầm nhìn (FOV):** Nếu \`Normalize(FrontVector) · Normalize(TargetVector) > cos(HalfFovAngle)\` -> Kẻ địch nhìn thấy người chơi!
* **Phản xạ nảy đạn trên bề mặt:** \`V_reflect = V - 2 * (V · N) * N\` (với \`N\` là vector pháp tuyến bề mặt).

## 3. Thuật Toán Va Chạm AABB (Axis-Aligned Bounding Box)
\`\`\`cpp
bool CheckAABB(const Box& a, const Box& b) {
    return (a.min.x <= b.max.x && a.max.x >= b.min.x) &&
           (a.min.y <= b.max.y && a.max.y >= b.min.y);
}
\`\`\``,
      en: `# Vector Mathematics & Kinematic Physics

## 1. Vector Normalization
Pressing diagonal inputs yields direction \`(1, 1)\` with magnitude \`sqrt(2) ≈ 1.414\`. Entities would illegally move 41% faster diagonally without normalization:
\`\`\`cpp
Vector2 dir = Vector2(inputX, inputY);
float lenSq = dir.x * dir.x + dir.y * dir.y;
if (lenSq > 0.00001f) {
    float invLen = 1.0f / sqrtf(lenSq);
    dir.x *= invLen;
    dir.y *= invLen; // Clamped to unit vector length 1.0
}
\`\`\`

## 2. Dot Product Powerhouse Applications
\`A · B = |A| * |B| * cos(θ)\`
* **Detection Cone (FOV):** \`Dot(HeadingDir, ToTargetDir) > cos(FieldOfViewAngle * 0.5f)\` -> Target is inside visual vision cone!
* **Ray Ricochet Reflection:** \`Velocity_reflected = Velocity - 2.0f * Dot(Velocity, Normal) * Normal\`.

## 3. AABB Overlap Theorem
\`\`\`cpp
bool CheckAABBCollision(const Rect& a, const Rect& b) {
    return (a.x < b.x + b.width  && a.x + a.width  > b.x &&
            a.y < b.y + b.height && a.y + a.height > b.y);
}
\`\`\``
    },
    objectives: [
      {
        id: 'math-1',
        text: {
          vi: 'Áp dụng Normalize để triệt tiêu lỗi chạy chéo quá nhanh',
          en: 'Apply vector normalization to eliminate diagonal speed exploitation'
        },
        completed: true
      },
      {
        id: 'math-2',
        text: {
          vi: 'Lập trình công thức phản xạ đạn nảy hoặc nón tầm nhìn bằng Dot Product',
          en: 'Program projectile ricochet reflection or vision cones using Dot Product'
        },
        completed: true
      }
    ]
  },

  {
    id: 'prog-architecture-patterns',
    title: {
      vi: 'Kiến Trúc & Design Patterns',
      en: 'Game Architecture & Patterns'
    },
    category: 'tech',
    tier: 3,
    status: 'learning',
    exp: 80,
    maxExp: 150,
    parentId: 'prog-math-physics',
    x: 660,
    y: 790,
    tags: ['architecture', 'design-patterns', 'fsm', 'ecs', 'object-pool'],
    summary: {
      vi: 'Finite State Machine (FSM), Component-Based / ECS, Event Bus tách rời và Object Pooling chống phân mảnh RAM.',
      en: 'Finite State Machines, Component/ECS paradigms, Decoupled Event Buses, and Object Pooling.'
    },
    content: {
      vi: `# Kiến Trúc Phần Mềm & Các Mẫu Thiết Kế Trò Chơi (Game Design Patterns)

## 1. Finite State Machine (Cỗ Máy Trạng Thái Hữu Hạn - FSM)
Giải quyết triệt để lỗi "mì tôm spaghetti" khi dùng hàng chục câu lệnh \`if-else\` lồng nhau:
* Mỗi trạng thái (\`Idle\`, \`Run\`, \`Jump\`, \`Attack\`, \`Hurt\`) là một lớp đối tượng độc lập có các hàm: \`Enter()\`, \`Update(dt)\`, \`Exit()\`.
* Chuyển trạng thái rõ ràng, ngăn chặn các lỗi kỳ quặc như đang bị thương vẫn kích hoạt được chiêu nhảy.

## 2. Component-Based & Entity-Component-System (ECS)
* Thay thế hệ thống thừa kế kế thừa đa tầng sâu (\`Object -> Actor -> Pawn -> Character -> Player\`) bằng sự **hợp thành (Composition)**.
* Một đối tượng (Entity) chỉ là một ID duy nhất; các tính năng (Health, Transform, Render, Collider) là các Component gắn vào linh hoạt.

## 3. Mẫu Object Pool (Bể Tái Sử Dụng Đối Tượng)
Việc liên tục \`new Bullet()\` rồi \`destroy(bullet)\` kích hoạt trình gom rác (Garbage Collector) gây giật lag (frame drops) định kỳ:
* Khởi tạo sẵn một mảng 200 viên đạn ngay từ đầu game.
* Khi bắn -> Lấy đạn từ Pool ra kích hoạt. Khi đạn bay hết tầm -> Ẩn đi và trả lại về Pool. Không bao giờ cấp phát lại bộ nhớ trong vòng lặp game!`,
      en: `# Game Architecture & Canonical Design Patterns

## 1. Finite State Machine (FSM)
Replaces tangled, error-prone nested boolean flags with modular state contracts:
* Each state (\`Idle\`, \`Airborne\`, \`Dashing\`, \`Stunned\`) implements clear lifecycle hooks: \`OnEnter()\`, \`OnUpdate(dt)\`, \`OnExit()\`.
* Guarantees illegal state transitions cannot occur (e.g., executing grounded attacks during airborne hit-stun).

## 2. Component-Based Architecture & ECS
* Replaces deep, fragile inheritance hierarchies (\`Entity -> Monster -> Flying -> Dragon\`) with dynamic composition.
* Entities are lightweight IDs; behavior and properties exist as modular Components (\`HealthComponent\`, \`VelocityComponent\`, \`RenderComponent\`).

## 3. Object Pooling Pattern
Instantiating and discarding hundreds of projectiles per minute triggers catastrophic Garbage Collector pauses and memory fragmentation:
* Pre-allocate a contiguous pool of 300 projectile instances during level load.
* On firing -> Retrieve an inactive instance, initialize coordinates, mark active.
* On impact -> Deactivate and return to pool. Zero allocations on the critical game loop path!`
    },
    objectives: [
      {
        id: 'pat-1',
        text: {
          vi: 'Tách trạng thái nhân vật thành State Machine có Enter/Update/Exit',
          en: 'Architect a character controller around an explicit FSM structure'
        },
        completed: false
      },
      {
        id: 'pat-2',
        text: {
          vi: 'Xây dựng Object Pool tái sử dụng đạn hoặc hiệu ứng hạt không tạo rác bộ nhớ',
          en: 'Build a zero-allocation Object Pool for projectiles or particle emitters'
        },
        completed: false
      }
    ]
  },

  {
    id: 'prog-ai-behaviors',
    title: {
      vi: 'Trí Tuệ Nhân Tạo (Game AI)',
      en: 'Game AI & Decision Making'
    },
    category: 'tech',
    tier: 4,
    status: 'locked',
    exp: 0,
    maxExp: 200,
    parentId: 'prog-architecture-patterns',
    x: 660,
    y: 1060,
    tags: ['ai', 'pathfinding', 'steering', 'behavior-tree', 'a-star'],
    summary: {
      vi: 'Thuật toán tìm đường A*, hành vi bầy đàn Steering Behaviors (Seek, Flee, Arrive) và Cây hành vi (Behavior Trees).',
      en: 'A* Pathfinding, Craig Reynolds steering behaviors (Seek, Flee, Arrive), and Behavior Trees.'
    },
    content: {
      vi: `# Trí Tuệ Nhân Tạo Trong Game (Game AI & Decision Making)

## 1. Hành Vi Lái (Craig Reynolds Steering Behaviors)
Tạo ra chuyển động tự nhiên như sinh vật sống thay vì di chuyển giật cục theo đường thẳng:
* **Seek (Săn đuổi):** \`DesiredVelocity = Normalize(Target - Position) * MaxSpeed\`; \`SteeringForce = DesiredVelocity - CurrentVelocity\`.
* **Arrive (Tiếp cận chậm rãi):** Giảm dần tốc độ khi khoảng cách tới mục tiêu rơi vào bán kính giảm tốc (\`SlowingRadius\`).
* **Wander (Đi lang thang):** Chiếu một vòng tròn nhỏ trước mặt và chọn góc ngẫu nhiên trên viền vòng tròn để tạo hướng đi tự nhiên.

## 2. Tìm Đường A* (A-Star Pathfinding)
Thuật toán tìm đường ngắn nhất tối ưu qua lưới điểm hoặc NavMesh:
* \`f(n) = g(n) + h(n)\`
  * \`g(n)\`: Chi phí thực tế đã đi từ điểm xuất phát tới nút \`n\`.
  * \`h(n)\`: Chi phí ước lượng (Heuristic - khoảng cách Manhattan hoặc Euclidean) từ \`n\` tới đích.

## 3. Behavior Trees (Cây Hành Vi)
Cấu trúc tiêu chuẩn cho AI hiện đại, bao gồm:
* **Composite Nodes:**
  * \`Selector\` (Chọn nhánh thành công đầu tiên - dùng để xét ưu tiên: Trốn chạy -> Tấn công -> Đi tuần).
  * \`Sequence\` (Thực hiện tuần tự: Tìm mục tiêu -> Tiến lại gần -> Tung đòn).
* **Decorators:** Đảo ngược kết quả, lặp lại hành động, hoặc đặt điều kiện thời gian.`,
      en: `# Game AI & Behavioral Simulation

## 1. Craig Reynolds Steering Behaviors
Generates organic, lifelike movement without rigid grid snapping:
* **Seek:** \`DesiredVelocity = Normalize(TargetPos - CurrentPos) * MaxSpeed\`; \`Steering = DesiredVelocity - Velocity\`.
* **Arrive:** Linearly ramps down velocity once inside a deceleration threshold radius to produce smooth stopping.
* **Wander:** Projects a virtual circle ahead of the agent and steers toward a smoothly displaced perimeter point.

## 2. A* Pathfinding Mechanics
The foundational optimal pathing algorithm across grid graphs and navigation meshes:
* \`f(n) = g(n) + h(n)\`
  * \`g(n)\`: Cumulative traversal cost from origin to current node \`n\`.
  * \`h(n)\`: Admissible heuristic estimate (Manhattan or Euclidean distance) to destination.

## 3. Behavior Trees (BTs)
The modular industry standard for hierarchical AI decision-making:
* **Selector (?):** Executes children sequentially until one returns SUCCESS (Priority selector: Flee -> Attack -> Patrol).
* **Sequence (->):** Executes children sequentially until one returns FAILURE (Approach Target -> Lock On -> Strike).`
    },
    objectives: [
      {
        id: 'ai-1',
        text: {
          vi: 'Lập trình thuật toán Steering Behavior (Seek hoặc Arrive)',
          en: 'Implement programmatic Seek or Arrive steering forces'
        },
        completed: false
      },
      {
        id: 'ai-2',
        text: {
          vi: 'Thiết kế cây hành vi Behavior Tree cho quái vật có các trạng thái Patrol, Chase, Attack',
          en: 'Design a Behavior Tree structure managing Patrol, Chase, and Attack routines'
        },
        completed: false
      }
    ]
  },

  {
    id: 'boss-state-machine',
    title: {
      vi: 'Kiến Trúc Trận Đánh Boss',
      en: 'Boss Battle Architecture'
    },
    category: 'boss',
    tier: 5,
    status: 'locked',
    exp: 0,
    maxExp: 300,
    parentId: 'prog-ai-behaviors',
    x: 660,
    y: 1330,
    tags: ['boss', 'ai', 'fsm', 'climax', 'telegraphing'],
    summary: {
      vi: 'Đỉnh cao tích hợp: State Machine đa giai đoạn (Multi-phase), Telegraphing đòn đánh và nhịp độ cao trào.',
      en: 'The capstone integration: Multi-phase State Machines, legible telegraphing, and adaptive climax design.'
    },
    content: {
      vi: `# Thiết Kế & Kiến Trúc Trận Đánh Boss Đa Giai Đoạn (Boss Climax Architecture)

## 1. Cấu Trúc State Machine Đa Giai Đoạn (Multi-Phase FSM)
Trận đánh Boss là bài kiểm tra toàn diện mọi kỹ năng người chơi đã học:
* **Phase 1 (100% - 70% Máu):**
  * Tốc độ cơ bản: \`Idle\` (1s) -> \`Telegraphed Charge\` -> \`Vulnerable Recovery\` (1.5s).
* **Phase 2 (70% - 30% Máu):**
  * Thay đổi hình thái đấu trường (sập cầu, sàn nhà bốc cháy).
  * Thêm chiêu thức diện rộng \`Ground Shockwave AoE\`; rút ngắn thời gian kiệt sức xuống 0.8s.
* **Phase 3 / Enrage (Dưới 30% Máu):**
  * Nhạc nền đẩy lên cao trào; Boss ra chuỗi combo 3 đòn liên tiếp đòi hỏi phản xạ né tránh chính xác.

## 2. Định Luật Báo Hiệu Đòn Đánh (The Telegraphing Law)
Mọi đòn đánh sát thương cao bắt buộc phải có hiệu ứng báo hiệu (Telegraph) rõ ràng từ 0.3s - 0.6s (ánh mắt lóe sáng, vung kiếm lấy đà, vệt đỏ cảnh báo trên mặt đất).
> "Thất bại của người chơi phải xuất phát từ việc phán đoán sai, không bao giờ được xuất phát từ đòn đánh bất ngờ không thể né tránh!"`,
      en: `# Multi-Phase Boss Battle Architecture

## 1. The Climax Dance: Multi-Phase State Progression
A great boss battle serves as the ultimate examination of player mastery:
* **Phase 1 (100% - 70% HP):**
  * Establishes baseline cadence: \`Observation\` -> \`Telegraphed Charge\` -> \`Vulnerability Window\`.
* **Phase 2 (70% - 30% HP):**
  * Environmental alteration (collapsing pillars, hazard rings).
  * Introduces AoE shockwaves; compresses attack recovery windows by 30%.
* **Phase 3 (Enrage State < 30% HP):**
  * Music shifts to urgent dynamic stems; boss chains multi-hit feints requiring disciplined parry timing.

## 2. The Telegraphing Law
Devastating strikes must feature distinct 300ms - 600ms visual/auditory wind-up cues (weapon gleam, stance recoil, ground hazard projectors).
> "A player's defeat must always stem from their own misjudgment, never from an unpredictable, unreadable frame-one ambush!"`
    },
    objectives: [
      {
        id: 'boss-1',
        text: {
          vi: 'Thiết kế sơ đồ FSM Boss 3 giai đoạn kèm điều kiện chuyển pha máu',
          en: 'Architect a 3-phase Boss State Machine with health threshold triggers'
        },
        completed: false
      },
      {
        id: 'boss-2',
        text: {
          vi: 'Lập trình hiệu ứng Telegraph cảnh báo rõ ràng trước mọi chiêu thức chí tử',
          en: 'Program legible visual and audio wind-up telegraph warnings for lethal moves'
        },
        completed: false
      }
    ]
  },

  // =========================================================================
  // PILLAR 3: TESTING, QA & OPTIMIZATION (Column 3, x: 1220)
  // =========================================================================
  {
    id: 'test-foundations-qa',
    title: {
      vi: 'Nền Tảng Kiểm Thử (QA Foundations)',
      en: 'QA Foundations & Bug Taxonomy'
    },
    category: 'qa',
    tier: 1,
    status: 'mastered',
    exp: 150,
    maxExp: 150,
    parentId: 'root-game-dev',
    x: 1220,
    y: 250,
    tags: ['qa', 'testing', 'debugging', 'bug-lifecycle', 'methodology'],
    summary: {
      vi: 'Phân loại mức độ nghiêm trọng của lỗi, kiểm thử giá trị biên (Boundary testing) và quy trình tái hiện bug.',
      en: 'Bug severity vs priority taxonomy, boundary value analysis, and deterministic reproduction protocols.'
    },
    content: {
      vi: `# Nền Tảng Kiểm Thử & Quản Lý Chất Lượng Game (QA Foundations)

## 1. Ma Trận Phân Loại Bug (Severity vs Priority)
* **Blocker / Crash (P1 - S1):** Game bị sập, treo máy, hỏng file lưu game (Save corruption). Bắt buộc sửa ngay lập tức trước mọi tính năng mới.
* **Critical Gameplay (P2 - S2):** Nhiệm vụ không thể hoàn thành, nhân vật rơi khỏi map vô tận, mất vật phẩm nhiệm vụ.
* **Major (P3 - S3):** Chỉ số mất cân bằng, quái vật bị kẹt vào địa hình nhưng người chơi vẫn tiến lên được.
* **Minor / Polish (P4 - S4):** Lỗi chính tả UI, sai lệch pixel hiển thị, âm thanh bị giật nhẹ.

## 2. Kiểm Thử Giá Trị Biên (Boundary Value Analysis)
Bug game hầu hết luôn ẩn náu ở các đường ranh giới:
* Máu bằng đúng \`0\`, máu bằng \`-1\`, hoặc vượt quá \`MaxHP\`.
* Nhặt vật phẩm khi ba lô đầy đúng 100/100 món.
* Rơi xuống vực ở tọa độ ranh giới \`Y = -9999\`.
* Thay đổi phím bấm và ngắt kết nối tay cầm ngay giữa lúc nạp đạn.

## 3. Quy Trình 3 Bước Tái Hiện Bug Chuẩn Xác
Mọi báo cáo lỗi phải có: **Các bước tái hiện (Steps to Reproduce)**, **Kết quả thực tế (Actual Result)**, và **Kết quả kỳ vọng (Expected Result)**.`,
      en: `# QA Foundations & Bug Severity Taxonomy

## 1. Severity vs Priority Matrix
* **Blocker (Severity 1 / Priority 1):** Engine crash, infinite lock, corrupt save data. Blocks all builds immediately.
* **Critical (S2 / P2):** Progression blocker, falling through level geometry, soft-locking main questline.
* **Major (S3 / P3):** Broken mechanics, exploit loop, enemy AI freeze without halting progress.
* **Minor (S4 / P4):** Text overflow, cosmetic clipping, transient audio popping.

## 2. Boundary Value Analysis (BVA)
Bugs naturally gravitate toward boundary transitions:
* Health exactly at \`0\`, \`-1\`, or overflowing \`MAX_HEALTH\`.
* Picking up items when inventory is exactly at \`99/99\` capacity.
* Entering pause menu on the exact sub-frame of player death or scene transition.
* Disconnecting the active gamepad during an unskippable cutscene.

## 3. The Canonical Repro Protocol
Every actionable bug report must document: **Steps to Reproduce (100% deterministic)**, **Actual Result**, and **Expected Result** accompanied by logs.`
    },
    objectives: [
      {
        id: 'qa-1',
        text: {
          vi: 'Xây dựng tài liệu ma trận kiểm thử phân cấp mức độ lỗi (Severity/Priority)',
          en: 'Establish a formal Bug Severity and Priority classification matrix'
        },
        completed: true
      },
      {
        id: 'qa-2',
        text: {
          vi: 'Thực hiện kiểm thử giá trị biên (Boundary Testing) cho các chỉ số nhân vật',
          en: 'Execute boundary value edge-case tests across player attributes and inventory'
        },
        completed: true
      }
    ]
  },

  {
    id: 'test-automated-headless',
    title: {
      vi: 'Kiểm Thử Tự Động & Headless',
      en: 'Automated & Headless Testing'
    },
    category: 'qa',
    tier: 2,
    status: 'learning',
    exp: 80,
    maxExp: 150,
    parentId: 'test-foundations-qa',
    x: 1220,
    y: 520,
    tags: ['testing', 'automation', 'headless', 'unit-tests', 'simulation'],
    summary: {
      vi: 'Chạy game ở chế độ Headless (không cần bật đồ họa), Unit Test logic chiến đấu và Bot mô phỏng hàng triệu trận đánh.',
      en: 'Headless simulation runners, deterministic rule unit tests, and Monte Carlo balancing bots.'
    },
    content: {
      vi: `# Kiểm Thử Tự Động & Chạy Mô Phỏng Headless (Automated Testing)

## 1. Tách Rời Logic Khỏi Render Để Chạy Headless
Nếu game bắt buộc phải mở cửa sổ đồ họa và có người ngồi bấm tay thì việc kiểm thử rất chậm chạp.
Bằng cách tách riêng tầng Simulation và tầng Render, ta có thể chạy game ở chế độ **Headless (Chạy ngầm không màn hình)** với tốc độ gấp 100 lần thời gian thực!

## 2. Unit Testing Cho Luật Chơi Cơ Cấu
\`\`\`typescript
describe('Damage & Armor Calculation', () => {
  it('should mitigate 50% damage when armor equals 100', () => {
    const target = new Character({ hp: 100, armor: 100 });
    const attack = new Attack({ rawDamage: 40 });
    
    DamageSystem.apply(attack, target);
    expect(target.hp).toBe(80); // 40 sát thương giảm 50% còn 20
  });

  it('should never heal target when damage is negative', () => {
    const target = new Character({ hp: 100, armor: 200 });
    const attack = new Attack({ rawDamage: -10 });
    
    DamageSystem.apply(attack, target);
    expect(target.hp).toBe(100);
  });
});
\`\`\`

## 3. Bot Mô Phỏng Monte Carlo Cân Bằng Game
Viết một con bot tự động chơi 10,000 ván đấu trong 2 phút để thống kê: Vũ khí nào có tỷ lệ thắng 85% (quá bá đạo) hoặc nhân vật nào chỉ có 15% tỷ lệ thắng (quá phế).`,
      en: `# Automated Game Testing & Headless Simulation

## 1. Headless Architecture
Decoupling the computational simulation from the graphics rendering pipeline allows running game logic **headless** at 100x realtime execution speed.

## 2. Unit Testing Deterministic Gameplay Rules
\`\`\`typescript
describe('Combat Formula Suite', () => {
  it('applies standard armor mitigation curve', () => {
    const defender = new Entity({ hp: 100, armor: 100 });
    const attack = new DamageEvent({ rawPhysicalDamage: 50 });
    
    CombatEngine.resolve(attack, defender);
    expect(defender.hp).toBe(75); // 50 mitigated by 50% = 25 damage
  });

  it('clamps damage to prevent negative underflow healing', () => {
    const defender = new Entity({ hp: 50 });
    const invalidAttack = new DamageEvent({ rawPhysicalDamage: -20 });
    
    CombatEngine.resolve(invalidAttack, defender);
    expect(defender.hp).toBe(50);
  });
});
\`\`\`

## 3. Monte Carlo AI Simulation for Balancing
Deploy lightweight headless AI bots to simulate 10,000 matches in minutes. Analyze win-rate distributions to identify overpowered weapon metas before launch.`
    },
    objectives: [
      {
        id: 'auto-1',
        text: {
          vi: 'Viết bộ Unit Test kiểm tra tính toán sát thương và hồi máu',
          en: 'Author unit test suites for combat calculations and inventory logic'
        },
        completed: false
      },
      {
        id: 'auto-2',
        text: {
          vi: 'Thiết kế cơ chế chạy giả lập ván đấu tự động không cần giao diện đồ họa',
          en: 'Implement headless simulation runner to stress-test game rules'
        },
        completed: false
      }
    ]
  },

  {
    id: 'test-profiling-perf',
    title: {
      vi: 'Đo Lường & Tối Ưu Hiệu Năng',
      en: 'Performance Profiling'
    },
    category: 'qa',
    tier: 3,
    status: 'learning',
    exp: 60,
    maxExp: 150,
    parentId: 'test-automated-headless',
    x: 1220,
    y: 790,
    tags: ['performance', 'profiling', 'memory', 'fps', 'optimization'],
    summary: {
      vi: 'Định mức 16.6ms (60 FPS), tìm nút thắt cổ chai CPU/GPU, Draw Calls và rò rỉ bộ nhớ (Memory Leaks).',
      en: 'The 16.6ms frame budget, CPU/GPU bottleneck diagnosis, Draw Call batching, and memory profiling.'
    },
    content: {
      vi: `# Đo Lường & Tối Ưu Hóa Hiệu Năng (Performance Profiling)

## 1. Định Mức Thời Gian 1 Khung Hình (The 16.6ms Budget)
Để đạt chuẩn mượt mà 60 FPS, toàn bộ logic, vật lý và vẽ đồ họa của 1 khung hình phải hoàn thành trong **16.6 mili-giây** (với 120 FPS là **8.3ms**):
\`\`\`
[ Input: 0.5ms ] ──> [ Physics & Logic: 4.5ms ] ──> [ Render Prep: 3.0ms ] ──> [ GPU Draw: 8.6ms ]
\`\`\`
Nếu bất kỳ khâu nào vượt quá giới hạn -> Người chơi sẽ cảm nhận hiện tượng giật cục (stutter/frame drop).

## 2. Xác Định Nút Thắt Cổ Chai (Bottleneck Diagnosis)
* **Nghẽn CPU (CPU Bound):** Game lag khi có quá nhiều quái vật, đường đi A* quá phức tạp, hoặc quá nhiều hàm tính toán va chạm.
  * *Cách khắc phục:* Áp dụng Spatial Partitioning (Grid/Quadtree), giảm tần suất cập nhật AI (Time-slicing).
* **Nghẽn GPU (GPU Bound):** Game lag khi màn hình có nhiều hiệu ứng khói lửa đè lên nhau (Overdraw), hoặc độ phân giải quá cao.
  * *Cách khắc phục:* Tối ưu Shader, nén Texture, hạn chế các lớp trong suốt trùng lặp.

## 3. Tối Ưu Số Lệnh Vẽ (Draw Call Batching)
Gửi 1000 lệnh vẽ riêng lẻ từng tảng đá sẽ làm tê liệt CPU. Gộp 1000 tảng đá dùng chung 1 bức ảnh Texture vào **1 mẻ duy nhất (Dynamic/Static Batching)** sẽ tăng vọt hiệu năng!`,
      en: `# Performance Profiling & Frame Budget Management

## 1. The 16.6ms Frame Budget (60 FPS)
To maintain an uncompromised 60 frames per second, the total time budget per frame is strictly **16.6 milliseconds** (or **8.3ms** for 120 FPS):
\`\`\`
[ Input Poll: 0.5ms ] ──> [ Physics & Game Logic: 4.5ms ] ──> [ Render CPU Prep: 3.0ms ] ──> [ GPU Raster: 8.6ms ]
\`\`\`
A spike in any single phase delays the vertical sync and creates noticeable stutter.

## 2. Diagnosing System Bottlenecks
* **CPU-Bound:** Frametime spikes during heavy entity counts or pathfinding.
  * *Remedies:* Spatial hashing (Quadtrees/Grids), worker thread offloading, AI time-slicing.
* **GPU-Bound:** Frametime spikes when rendering heavy transparent particles or full-screen post-processing.
  * *Remedies:* Eliminate excessive transparent overdraw, compress texture atlases, simplify fragment shader math.

## 3. Draw Call Optimization
Issuing individual draw commands for 500 foliage sprites chokes the CPU-GPU bus. Grouping identical materials into unified batches (Texture Atlases + Instanced Drawing) drastically reduces driver overhead.`
    },
    objectives: [
      {
        id: 'perf-1',
        text: {
          vi: 'Sử dụng công cụ Profiler đo lường thời gian thực thi từng khung hình dưới 16.6ms',
          en: 'Profile execution pipelines to verify frame budget remains under 16.6ms'
        },
        completed: false
      },
      {
        id: 'perf-2',
        text: {
          vi: 'Áp dụng kỹ thuật Batching hoặc Texture Atlas để giảm số lượng Draw Calls',
          en: 'Implement draw call batching or texture atlasing to minimize rendering calls'
        },
        completed: false
      }
    ]
  },

  {
    id: 'test-playtesting-ux',
    title: {
      vi: 'Kiểm Thử Người Dùng (Playtesting & UX)',
      en: 'Empirical Playtesting & UX'
    },
    category: 'qa',
    tier: 4,
    status: 'locked',
    exp: 0,
    maxExp: 200,
    parentId: 'test-profiling-perf',
    x: 1220,
    y: 1060,
    tags: ['playtesting', 'ux', 'telemetry', 'heatmaps', 'psychology'],
    summary: {
      vi: 'Giao thức kiểm thử ẩn danh (Blind playtest), loại bỏ thiên kiến quan sát và phân tích dữ liệu nhiệt (Heatmaps).',
      en: 'Blind playtesting protocols, eliminating observer bias, and telemetry death heatmap analysis.'
    },
    content: {
      vi: `# Kiểm Thử Người Dùng & Dữ Liệu Thực Nghiệm (Empirical Playtesting & UX)

## 1. Quy Tắc Thép Trong Blind Playtesting
Khi cho một người chơi lạ trải nghiệm bản thử nghiệm của bạn:
* **TUYỆT ĐỐI KHÔNG HƯỚNG DẪN:** Không được đứng bên cạnh giải thích "Ấn nút này đi", "Nhìn sang bên phải kìa". Nếu người chơi không tự hiểu, nghĩa là thiết kế game đang có vấn đề!
* **Quan sát ngôn ngữ cơ thể:** Người chơi cau mày ở đâu? Ngáp ngủ khi nào? Tỏ ra phấn khích khi thực hiện được hành động nào?

## 2. Thu Thập Dữ Liệu Từ Xa (Telemetry & Heatmaps)
Số liệu không bao giờ nói dối:
* **Death Heatmap (Bản đồ nhiệt vị trí tử vong):** Nếu 80% người chơi chết tại một hố gai cụ thể ở màn 1 -> Cái hố đó quá vô lý hoặc thiếu dấu hiệu cảnh báo.
* **Drop-off Rate (Tỷ lệ bỏ game):** Người chơi thoát game hàng loạt ở phút thứ mấy? Nhiệm vụ nào quá lê thê khiến người chơi nản lòng?

## 3. Lắng Nghe Vấn Đề, Đừng Nghe Giải Pháp
Người chơi rất giỏi trong việc cảm nhận thấy có **vấn đề** ("Đoạn này ức chế quá", "Khẩu súng này bắn chán ngắt").
Nhưng giải pháp họ đề xuất thường không đúng bản chất. Nhiệm vụ của nhà phát triển là tìm ra nguyên nhân gốc rễ phía sau cảm xúc đó.`,
      en: `# Empirical Playtesting & Telemetry Analytics

## 1. The Cardinal Laws of Blind Playtesting
When evaluating unprompted players with your latest build:
* **MAINTAIN ABSOLUTE SILENCE:** Never say "Press Shift here" or "Look at the door". If players do not intuit the goal, the game's communicative affordances have failed.
* **Observe Physical Biometrics:** Where do their shoulders tense? When do they sigh in frustration? What moment provokes genuine laughter?

## 2. In-Game Telemetry & Heatmap Analytics
* **Death Heatmaps:** If 70% of playtesters perish at one specific obstacle in Level 1, that obstacle features an unreadable difficulty spike.
* **Funnel Drop-Off Metrics:** Track timestamped abandon rates to pinpoint tedious pacing plateaus.

## 3. Listen to the Pain, Not the Prescription
Players are exceptionally accurate at identifying **what feels bad** ("This boss feels unfair", "This rifle feels weak").
However, their proposed solutions are rarely aligned with systemic design. It is your job as an engineer to diagnose the core root cause.`
    },
    objectives: [
      {
        id: 'play-1',
        text: {
          vi: 'Tổ chức buổi kiểm thử Blind Playtest không can thiệp và ghi chép nhật ký hành vi',
          en: 'Conduct a silent blind playtest session documenting raw user friction points'
        },
        completed: false
      },
      {
        id: 'play-2',
        text: {
          vi: 'Thiết lập hệ thống log tọa độ tử vong hoặc hoàn thành màn chơi để phân tích số liệu',
          en: 'Implement basic event telemetry tracking player deaths and session duration'
        },
        completed: false
      }
    ]
  },

  {
    id: 'prod-scope-polish',
    title: {
      vi: 'Sản Xuất & Hoàn Thiện Game',
      en: 'Production Scope & Polish'
    },
    category: 'production',
    tier: 5,
    status: 'locked',
    exp: 0,
    maxExp: 300,
    parentId: 'test-playtesting-ux',
    x: 1220,
    y: 1330,
    tags: ['production', 'scope', 'polish', 'release', 'vertical-slice'],
    summary: {
      vi: 'Chống bệnh phình tính năng (Feature Creep), hoàn thiện bản Vertical Slice và quy tắc 80/20 trong công đoạn Polish.',
      en: 'Feature creep elimination, Vertical Slice milestones, and the 80/20 rule of game polish.'
    },
    content: {
      vi: `# Quản Lý Sản Xuất & Quy Trình Hoàn Thiện Game (Production & Polish Pipeline)

## 1. Kẻ Thù Số Một: Phình Tính Năng (Feature Creep)
Hàng ngàn tựa game chết yểu vì nhà phát triển liên tục nảy sinh ý tưởng mới giữa chừng: *"Thêm câu cá nhé?", "Thêm chế tạo đồ nhé?", "Thêm thế giới mở nhé?"*.
* **Quy tắc cắt giảm:** Cắt bỏ 50% tính năng phụ để biến 50% tính năng cốt lõi còn lại đạt chất lượng 10/10.

## 2. Bản Cắt Dọc (Vertical Slice Milestone)
Trước khi làm toàn bộ 10 thế giới của game:
* Hãy làm duy nhất **1 màn chơi hoàn chỉnh 100%**: Đầy đủ đồ họa cuối cùng, âm thanh hoàn chỉnh, cơ chế chuẩn mực, UI trau chuốt và đánh Boss mãn nhãn.
* Bản Vertical Slice chứng minh tựa game thực sự vui và khả thi trước khi bước vào giai đoạn sản xuất hàng loạt.

## 3. Quy Tắc Hoàn Thiện (The 80/20 Polish Phase)
Giai đoạn biến tựa game từ "chơi được" thành "xuất sắc" nằm ở các tiểu tiết:
* Âm thanh phản hồi khi trỏ chuột vào nút bấm.
* Chuyển cảnh mượt mà giữa các màn chơi.
* Tự động lưu game thông minh và hỗ trợ đa dạng cấu hình máy tính.`,
      en: `# Production Discipline, Scope Control & Polish Pipeline

## 1. The Fatal Trap: Feature Creep
Countless promising projects collapse into development purgatory because teams incessantly append side ideas mid-production (*"Let's add fishing!", "Let's add crafting!", "Let's make it open-world!"*).
* **The Ruthless Scoping Rule:** Cut 40% of non-essential features so the remaining core loop reaches unassailable 10/10 polish.

## 2. The Vertical Slice Milestone
Before assembling 20 sprawling game worlds:
* Engineer a single, 100% finished **Vertical Slice** (1 level with final art, finished audio stems, polished mechanics, full UI, and a climactic boss encounter).
* The Vertical Slice validates production feasibility and genuine fun before committing full-scale resources.

## 3. The 80/20 Polish Threshold
The transformative difference between a mediocre prototype and an unforgettable game lies in microscopic finish:
* Tactile hover sounds on every interface button.
* Seamless screen transitions without awkward hitching.
* Reliable autosaving and robust cross-platform accessibility.`
    },
    objectives: [
      {
        id: 'prod-1',
        text: {
          vi: 'Xác định phạm vi cốt lõi (Core Scope) và kiên quyết loại bỏ các tính năng dư thừa',
          en: 'Define strict Core Scope boundaries and prune scope-bloating side mechanics'
        },
        completed: false
      },
      {
        id: 'prod-2',
        text: {
          vi: 'Hoàn thiện bản Vertical Slice mẫu đạt chất lượng đồ họa và âm thanh hoàn chỉnh',
          en: 'Deliver an end-to-end Vertical Slice showcasing full gameplay and visual polish'
        },
        completed: false
      }
    ]
  },

  // =========================================================================
  // PILLAR 4: VISUAL ARTS & TECHNICAL ART (Column 4, x: 1780)
  // =========================================================================
  {
    id: 'art-visual-principles',
    title: {
      vi: 'Giao Tiếp Thị Giác (Visual Readability)',
      en: 'Visual Readability & Silhouettes'
    },
    category: 'art',
    tier: 1,
    status: 'mastered',
    exp: 150,
    maxExp: 150,
    parentId: 'root-game-dev',
    x: 1780,
    y: 250,
    tags: ['art', 'silhouette', 'readability', 'color-theory', 'values'],
    summary: {
      vi: 'Độ rõ nét hình bóng (Silhouette), thang giá trị sáng tối (Value hierarchy) và lý thuyết màu sắc dẫn dắt cảm xúc.',
      en: 'Silhouette recognition, value structure hierarchies, and color theory for interactive readability.'
    },
    content: {
      vi: `# Giao Tiếp Thị Giác & Độ Rõ Nét Trong Game (Visual Readability)

## 1. Thử Thách Hình Chiếu Đen (The Silhouette Test)
Trong chiến trận hỗn loạn, người chơi phải nhận diện kẻ địch trong vòng 0.1 giây:
* Tô toàn bộ nhân vật thành màu đen tuyền.
* Nếu người chơi không phân biệt được đâu là lính cầm cung, đâu là gã cầm khiên, đâu là pháp sư -> Thiết kế hình dáng (Silhouette) đã thất bại!
* Tận dụng các hình khối mạnh mẽ: Hình tam giác (nguy hiểm, sắc bén), Hình vuông (kiên cố, nặng nề), Hình tròn (thân thiện, nhanh nhẹn).

## 2. Thang Giá Trị Sáng Tối (Value Hierarchy)
Độ tương phản ánh sáng quyết định thứ tự ưu tiên mà mắt người tiếp nhận:
1. **Tiền cảnh tương tác (Nhân vật, đạn, quái vật):** Có độ tương phản sáng - tối cao nhất và màu sắc rực rỡ nhất.
2. **Môi trường di chuyển (Mặt đất, nền tảng):** Có độ tương phản vừa phải, màu sắc dịu hơn.
3. **Hình nền (Background):** Độ tương phản thấp nhất, thường mờ ảo hoặc thiên về tông màu lạnh/tối để làm nổi bật các chủ thể phía trước.

## 3. Lý Thuyết Màu Sắc Dẫn Đường
Sử dụng các cặp màu tương phản bổ túc (Cam - Xanh dương, Đỏ - Xanh lá) để làm nổi bật ngay lập tức các chi tiết then chốt (như điểm yếu của quái vật hoặc vật phẩm nhặt được).`,
      en: `# Visual Communication & Silhouette Readability

## 1. The Pure Silhouette Test
Amid dynamic visual chaos, a player must identify threats within 100 milliseconds:
* Render the entity purely in solid black.
* If a player cannot instantly differentiate an archer, a heavy shield-bearer, or a caster by their outline alone, the silhouette design is flawed.
* Exploit strong archetypal geometries: Triangles (lethal, agile), Rectangles (armored, immovable), Circles (friendly, buoyant).

## 2. The 3-Tier Value Hierarchy
Luminance contrast governs human visual processing priorities:
1. **Active Gameplay Entities (Player, projectiles, adversaries):** Crisp, high-contrast values and vibrant focal saturation.
2. **Traversable Geometry (Platforms, climbable surfaces):** Balanced contrast with clear edge definitions.
3. **Background Parallax:** Soft contrast, desaturated hues, and atmospheric perspective receding into visual depth.

## 3. Emotional Color Palettes
Deploy complementary color contrasts (Warm amber vs cool cyan) to immediately highlight focal interaction points and critical vulnerability zones.`
    },
    objectives: [
      {
        id: 'vis-1',
        text: {
          vi: 'Kiểm tra độ nhận diện nhân vật qua bài test Silhouette đen trắng',
          en: 'Validate entity recognition using the monochromatic Silhouette Test'
        },
        completed: true
      },
      {
        id: 'vis-2',
        text: {
          vi: 'Tách biệt rõ ràng 3 tầng Value giữa Gameplay chính, Địa hình và Hình nền',
          en: 'Structure a disciplined 3-tier value hierarchy separating entities, ground, and background'
        },
        completed: true
      }
    ]
  },

  {
    id: 'art-animation-dynamics',
    title: {
      vi: 'Diễn Hoạt Tương Tác (Game Animation)',
      en: 'Interactive Animation Principles'
    },
    category: 'art',
    tier: 2,
    status: 'learning',
    exp: 80,
    maxExp: 150,
    parentId: 'art-visual-principles',
    x: 1780,
    y: 520,
    tags: ['animation', '12-principles', 'anticipation', 'squash-stretch', 'responsive'],
    summary: {
      vi: '12 nguyên lý hoạt hình thích ứng cho game: Dự báo (Anticipation), Co giãn (Squash & Stretch) và Frame Canceling.',
      en: 'The 12 animation principles adapted for games: Anticipation, Squash & Stretch, and input frame canceling.'
    },
    content: {
      vi: `# Diễn Hoạt Cho Game: Cân Bằng Giữa Đẹp Mắt & Độ Nhạy (Interactive Animation)

## 1. Hoạt Hình Phim Ảnh Khác Hoạt Hình Game Như Thế Nào?
* Trong phim: Động tác có thể chuẩn bị lấy đà (Anticipation) dài 1 giây để trông rất chân thực.
* Trong game: Nếu bấm nút đánh mà 1 giây sau nhân vật mới chém -> Người chơi sẽ cảm thấy cực kỳ ức chế và nặng nề!
* **Quy tắc vàng:** Hoạt động đòn đánh của người chơi phải nổ ra trong vòng **1 đến 3 frames đầu tiên (0.05s)**; độ trễ lấy đà dài chỉ dành cho Boss hoặc các đòn tích tụ lực đặc biệt!

## 2. 3 Nguyên Lý Cốt Lõi Cho Game
1. **Anticipation (Lấy đà / Báo hiệu):** Rút kiếm về phía sau trước khi chém tới trước.
2. **Squash & Stretch (Co giãn thể tích):** Khi nhân vật chạm đất, co dẹp chiều cao xuống 80% và nở rộng chiều ngang 120% để thể hiện sức nặng.
3. **Follow-Through & Recovery (Đà tiếp diễn & Khôi phục):** Vạt áo hoặc mái tóc tiếp tục bay theo quán tính khi nhân vật đã dừng lại.

## 3. Kỹ Thuật Frame Canceling
Cho phép hủy bỏ các khung hình khôi phục (Recovery Frames) bằng thao tác Dash hoặc Nhảy để người chơi có thể tạo ra các chuỗi combo điêu luyện.`,
      en: `# Interactive Animation: Balancing Aesthetics with Mechanical Snappiness

## 1. The Linear Film vs Interactive Game Divergence
* In cinema: Anticipation can linger for 40 frames to maximize realistic kinetic momentum.
* In games: If an attack takes 40 frames to respond after a button press, the controls feel unacceptably sluggish.
* **The Snappiness Law:** Player attacks must register hitboxes within **frame 1 to frame 3 (16ms - 50ms)**; lengthy anticipation winds are reserved exclusively for telegraphed enemy moves!

## 2. Key Interactive Principles
1. **Anticipation (Visual Signaling):** Micro-coiling of joints immediately prior to catastrophic forward kinetic energy release.
2. **Squash & Stretch (Mass Conservation):** Compressing vertical scale to 80% while expanding width to 120% upon landing impacts.
3. **Follow-Through & Inertia:** Residual momentum carries hair, cloaks, and secondary tassels past the resting pose.

## 3. Frame Canceling & Buffering
Allows skilled players to cancel lengthy recovery frames with timely Dash or Parry commands, forming high-skill combat combos.`
    },
    objectives: [
      {
        id: 'anim-1',
        text: {
          vi: 'Thiết kế hoạt ảnh tấn công có khung va chạm xuất hiện ngay ở frame 1-3',
          en: 'Construct attack animations that deploy active hitboxes within frames 1-3'
        },
        completed: false
      },
      {
        id: 'anim-2',
        text: {
          vi: 'Ứng dụng Squash & Stretch vào chu kỳ Nhảy và Tiếp đất của nhân vật',
          en: 'Implement volume-conserving Squash & Stretch on jump and landing cycles'
        },
        completed: false
      }
    ]
  },

  {
    id: 'art-shaders-tech-art',
    title: {
      vi: 'Shaders & Kỹ Thuật Đồ Họa',
      en: 'Shaders & Technical Art'
    },
    category: 'art',
    tier: 3,
    status: 'locked',
    exp: 0,
    maxExp: 150,
    parentId: 'art-animation-dynamics',
    x: 1780,
    y: 790,
    tags: ['shaders', 'tech-art', 'vfx', 'glsl', 'post-processing'],
    summary: {
      vi: 'Đường ống xử lý đồ họa (Graphics Pipeline), Vertex / Fragment Shaders, biến dạng UV và hiệu ứng hậu kỳ (Post-processing).',
      en: 'The programmable graphics pipeline, Vertex/Fragment shaders, UV distortion, and Post-processing effects.'
    },
    content: {
      vi: `# Shaders & Kỹ Thuật Đồ Họa (Shaders & Technical Art)

## 1. Đường Ống Đồ Họa Lập Trình Được (Programmable Pipeline)
Mỗi điểm ảnh xuất hiện trên màn hình đều đi qua 2 bộ lọc shader cốt lõi:
* **Vertex Shader:** Xử lý tọa độ các đỉnh hình học trong không gian (xoay, kéo giãn, làm ngọn cỏ đung đưa theo gió).
* **Fragment / Pixel Shader:** Tính toán màu sắc cuối cùng của từng pixel (độ phản quang, đổ bóng, hiệu ứng phát sáng Bloom).

## 2. Biến Dạng Tọa Độ UV (UV Coordinate Manipulation)
Thay vì vẽ từng khung hình hoạt ảnh nước chảy hoặc lửa cháy bằng tay:
* Dùng hàm \`sin(uv.y * 10.0 + time * 3.0)\` để làm gợn sóng bề mặt Texture.
* Kết hợp tấm ảnh nhiễu (Noise Texture) để tạo hiệu ứng tan biến hạt tro tàn (Dissolve effect) khi kẻ địch bị hạ gục.

## 3. Hiệu Ứng Hậu Kỳ Tạo Phong Cách (Stylized Post-Processing)
* **Color Grading & LUT:** Cân chỉnh tông màu điện ảnh cho toàn bộ khung hình.
* **Vignette & Chromatic Aberration:** Làm tối 4 góc màn hình và tạo quang sai thấu kính khi nhân vật sắp hết máu.`,
      en: `# Shaders & The Technical Art Pipeline

## 1. The Programmable GPU Pipeline
Every rendered pixel traverses two primary programmable stages:
* **Vertex Shader:** Manipulates vertex coordinates in Euclidean space (swaying grass foliage, skeletal skinning).
* **Fragment (Pixel) Shader:** Computes final RGBA values for each fragment (specular highlights, normal-mapped shadows, rim lighting).

## 2. Procedural UV Coordinate Manipulation
Rather than hand-drawing hundreds of frames for flowing water, portals, or energy shields:
* Inject periodic trigonometric offsets: \`uv.x += sin(uv.y * 12.0 + time * 4.0) * 0.05\`.
* Sample procedural Perlin noise textures to drive dynamic burn-away dissolve transitions on defeated enemies.

## 3. Atmospheric Post-Processing
* **Color Grading LUTs:** Enforces emotional cinematic color profiles across scene palettes.
* **Radial Vignetting & Chromatic Aberration:** Subtly darkens perimeter edges and splits RGB channels under critical injury states.`
    },
    objectives: [
      {
        id: 'shd-1',
        text: {
          vi: 'Viết một Fragment Shader tạo hiệu ứng sóng nước hoặc hào quang phát sáng',
          en: 'Author a fragment shader generating procedural wave ripples or glow rim lighting'
        },
        completed: false
      },
      {
        id: 'shd-2',
        text: {
          vi: 'Ứng dụng Texture Noise để lập trình hiệu ứng tan biến hạt (Dissolve)',
          en: 'Implement a procedural noise-based dissolve effect for entity despawning'
        },
        completed: false
      }
    ]
  },

  {
    id: 'art-ui-ux-design',
    title: {
      vi: 'Giao Diện UI/UX Trong Game',
      en: 'Game UI/UX & Diegetic Systems'
    },
    category: 'art',
    tier: 4,
    status: 'locked',
    exp: 0,
    maxExp: 150,
    parentId: 'art-shaders-tech-art',
    x: 1780,
    y: 1060,
    tags: ['ui', 'ux', 'diegetic', 'accessibility', 'hud'],
    summary: {
      vi: '4 mô hình giao diện: Diegetic, Spatial, Non-Diegetic và Meta. Tối ưu tải trọng nhận thức và khả năng tiếp cận (Accessibility).',
      en: 'The 4 UI quadrants: Diegetic, Spatial, Non-Diegetic, and Meta. Cognitive load and accessibility.'
    },
    content: {
      vi: `# Kiến Trúc Giao Diện UI/UX Trò Chơi (Game UI/UX)

## 1. 4 Mô Hình Giao Diện Trong Game
* **Diegetic (Nhập vai thực tế):** Tồn tại cả trong thế giới game và nhân vật nhìn thấy được (ví dụ: Đồng hồ đo máu trên lưng áo nhân vật trong Dead Space, đồng hồ la bàn trên cổ tay).
* **Non-Diegetic (HUD truyền thống):** Nằm phẳng trên màn hình kính người chơi, nhân vật trong game không biết nó tồn tại (thanh máu góc trên, số đạn).
* **Spatial (Không gian 3D):** Hiển thị lơ lửng trong không gian nhưng nhân vật không nhìn thấy (tên người chơi trên đầu, vạch đường kẻ dưới đất).
* **Meta (Hiệu ứng trung gian):** Máu bắn dính lên màn hình kính, mồ hôi hoặc hạt mưa lăn trên camera.

## 2. Kiểm Soát Tải Trọng Nhận Thức (Cognitive Load)
Giao diện xuất sắc là giao diện vô hình khi không cần thiết.
Chỉ hiển thị thanh máu khi nhân vật chịu sát thương; ẩn thanh thể lực khi nhân vật đã đứng yên hồi phục hoàn toàn.

## 3. Tiêu Chuẩn Tiếp Cận Hiện Đại (Game Accessibility)
Hỗ trợ chế độ mù màu (Protanopia, Deuteranopia), cho phép tùy chỉnh cỡ chữ và tái gán toàn bộ phím bấm.`,
      en: `# Game UI/UX Architecture & Diegetic Modalities

## 1. The 4 UI Quadrants
* **Diegetic:** Exists natively inside the game world geometry; perceptible to both player and avatar (e.g., Dead Space spine health rig, in-cockpit gauge dials).
* **Non-Diegetic:** Traditional overlay elements rendered on the viewport plane; invisible to avatar (HUD health bars, mini-map circles).
* **Spatial:** Projected within 3D world space but invisible to avatar (overhead enemy health pips, floating quest markers).
* **Meta:** Representations of physical conditions applied directly to the camera lens (blood splatters, moisture condensation).

## 2. Minimizing Cognitive Load: Contextual HUDs
Great UI remains transparent until needed: dynamically fade health meters out of view during peaceful exploration, resurfacing only when damaged.

## 3. Universal Accessibility Guidelines
Provide robust colorblind filter modes (Protanopia, Deuteranopia, Tritanopia), scalable typography buffers, and universal controller remapping.`
    },
    objectives: [
      {
        id: 'ui-1',
        text: {
          vi: 'Thiết kế ít nhất 1 thành phần giao diện theo phong cách Diegetic hoặc Contextual',
          en: 'Design at least one contextual or diegetic UI element integrated into gameplay'
        },
        completed: false
      },
      {
        id: 'ui-2',
        text: {
          vi: 'Tích hợp các tùy chọn trợ năng: Đổi cỡ chữ và bộ lọc chế độ mù màu',
          en: 'Implement essential accessibility toggles for text scaling and colorblind profiles'
        },
        completed: false
      }
    ]
  },

  // =========================================================================
  // PILLAR 5: AUDIO & SOUND ARCHITECTURE (Column 5, x: 2340)
  // =========================================================================
  {
    id: 'audio-sound-principles',
    title: {
      vi: 'Ký Hiệu Học Âm Thanh (Sound Semiotics)',
      en: 'Sound Design Semiotics'
    },
    category: 'audio',
    tier: 1,
    status: 'mastered',
    exp: 150,
    maxExp: 150,
    parentId: 'root-game-dev',
    x: 2340,
    y: 250,
    tags: ['audio', 'sfx', 'semiotics', 'feedback', 'frequencies'],
    summary: {
      vi: 'Phân tầng tín hiệu âm thanh (Phần thưởng, Cảnh báo, Xác nhận), cân bằng dải tần EQ và dải động (Dynamic range).',
      en: 'Audio feedback taxonomy, spectral frequency carve-outs, and dynamic loudness range.'
    },
    content: {
      vi: `# Ký Hiệu Học Âm Thanh & Phản Hồi Thính Giác (Sound Design Semiotics)

## 1. 4 Tầng Phản Hồi Âm Thanh Cốt Lõi
Âm thanh truyền tải thông tin vào não bộ nhanh hơn thị giác tới 20%:
1. **Xác nhận (Confirmation):** Tiếng gõ nhẹ khi nhấp chuột, tiếng "click" cài đạn -> Cho biết thao tác đã được hệ thống ghi nhận.
2. **Cảnh báo (Hazard Warning):** Tiếng tích tắc đếm ngược của bom, tiếng rít vũ khí trước khi đâm -> Kích hoạt bản năng phòng thủ.
3. **Phần thưởng (Reward / Feedback):** Âm thanh hợp âm thăng hoa, tiếng nhặt vàng réo rắt -> Kích thích sản sinh Dopamine.
4. **Không gian (Atmospheric Ambience):** Tiếng gió lùa qua khe núi, tiếng nước nhỏ giọt trong hang đá -> Xây dựng cảm giác đắm chìm vào thế giới.

## 2. Tách Biệt Dải Tần Âm Thanh (Frequency Carving)
Tránh để âm thanh bị đục (muddy) khi nhiều tiếng nổ cùng vang lên:
* Tiếng bước chân và tiếng nhặt đồ: Dành khoảng tần số trung cao (2 kHz - 5 kHz).
* Tiếng sấm chớp, tiếng va chạm nặng: Dành khoảng âm trầm (50 Hz - 250 Hz).
* Khoét rãnh tần số (EQ notch) trên nhạc nền để giọng nói nhân vật và tiếng vũ khí luôn trong trẻo và dễ nghe.`,
      en: `# Sound Design Semiotics & Psychoacoustics

## 1. The 4 Auditory Feedback Tiers
The human auditory cortex processes sonic stimuli up to 20% faster than visual light cues:
1. **Confirmation:** Subtle mechanical latch clicks upon weapon reloads or menu presses -> Confirms input registration.
2. **Hazard Warning:** High-frequency fuse hisses or ascending string dissonances -> Triggers involuntary defensive reflexes.
3. **Reward:** Harmonically resolved major triads, bright metallic chimes -> Stimulates dopamine reinforcement.
4. **Atmospheric Bed:** Sub-audible wind rumbles, distant subterranean water drips -> Grounds the player in deep physical reality.

## 2. Spectral Frequency Carving
Prevents acoustic muddiness during chaotic combat engagements:
* Footsteps and item pick-up cues: Carved within high-clarity registers (2 kHz - 5 kHz).
* Heavy explosions and impact thuds: Anchored within low sub-bass (40 Hz - 200 Hz).
* Apply parametric EQ notches across music beds to guarantee weapon transients slice cleanly through the mix.`
    },
    objectives: [
      {
        id: 'aud-1',
        text: {
          vi: 'Xây dựng bảng phân loại âm thanh theo 4 nhóm: Xác nhận, Cảnh báo, Phần thưởng và Môi trường',
          en: 'Construct an audio asset inventory mapped across the 4 feedback tiers'
        },
        completed: true
      },
      {
        id: 'aud-2',
        text: {
          vi: 'Cân bằng dải tần EQ để tiếng va chạm không làm chìm lấp âm thanh quan trọng',
          en: 'Apply frequency carving to ensure critical UI and weapon SFX remain distinct'
        },
        completed: true
      }
    ]
  },

  {
    id: 'audio-interactive-systems',
    title: {
      vi: 'Âm Thanh Tương Tác (Adaptive Audio)',
      en: 'Interactive & Adaptive Audio'
    },
    category: 'audio',
    tier: 2,
    status: 'learning',
    exp: 70,
    maxExp: 150,
    parentId: 'audio-sound-principles',
    x: 2340,
    y: 520,
    tags: ['audio', 'adaptive-audio', 'stems', 'procedural', 'pitch-randomization'],
    summary: {
      vi: 'Nhạc nền đa tầng (Vertical Layering), biến thiên cường độ theo máu và ngẫu nhiên hóa cao độ chống mệt tai.',
      en: 'Vertical stem layering, horizontal re-sequencing, and micro-pitch randomization.'
    },
    content: {
      vi: `# Kiến Trúc Âm Thanh Tương Tác & Thích Ứng (Adaptive Audio)

## 1. Kỹ Thuật Đa Tầng Dọc (Vertical Stem Layering)
Nhạc nền không phải là một file MP3 đơn lẻ lặp đi lặp lại. Nó được chia thành 4 lớp stem chạy song song cùng nhịp độ (BPM):
* **Stem 1 (Căn bản):** Bộ gõ nhẹ và đàn dây du dương (Phát khi đi khám phá hòa bình).
* **Stem 2 (Căng thẳng):** Bổ sung thêm trống dồn dập (Tự động mở âm lượng khi phát hiện kẻ địch).
* **Stem 3 (Chiến đấu):** Bổ sung guitar điện hoặc kèn đồng (Tự động mở khi rút vũ khí chiến đấu).
* **Stem 4 (Nguy kịch):** Lọc âm thấp, thêm tiếng tim đập hồi hộp (Khi máu dưới 20%).

## 2. Ngẫu Nhiên Hóa Tránh Mệt Tai (Micro-Pitch & Volume Randomization)
Nếu tiếng súng bắn hoặc tiếng bước chân giống nhau 100% trong 5000 lần di chuyển, người chơi sẽ bị mệt mỏi và đau đầu:
* Mỗi lần phát âm thanh -> Ngẫu nhiên hóa cao độ: \`Pitch = Random(0.95, 1.05)\`.
* Ngẫu nhiên hóa nhẹ âm lượng: \`Volume = Random(0.90, 1.00)\`.
* Chuẩn bị sẵn 3 - 5 biến thể file âm thanh khác nhau cho cùng một hành động bước chân.`,
      en: `# Interactive & Adaptive Audio Architecture

## 1. Vertical Stem Layering
Dynamic soundtracks are never static, looping files. They are composed of parallel, synchronized stems sharing an identical BPM grid:
* **Stem 1 (Ambient Foundation):** Mellow acoustic arpeggios (Active during quiet exploration).
* **Stem 2 (Tension Trigger):** Adds mid-tempo percussion (Fades in when an enemy notices the player).
* **Stem 3 (Combat Intensity):** Blaring brass and distorted basslines (Fades in upon drawing weapons).
* **Stem 4 (Critical Mortality):** Heavy low-pass muffling accompanied by an urgent thumping heartbeat (HP < 20%).

## 2. Eliminating Ear Fatigue via Micro-Randomization
Hearing an identical audio sample 4,000 times during a play session causes acute acoustic exhaustion:
* On every trigger -> Apply subtle pitch variance: \`Pitch = Random(0.94f, 1.06f)\`.
* Apply micro-amplitude modulation: \`Volume = Random(0.92f, 1.00f)\`.
* Alternate among a round-robin pool of 4 distinct recorded footstep and gunshot samples.`
    },
    objectives: [
      {
        id: 'adp-1',
        text: {
          vi: 'Thiết kế hệ thống nhạc nền 3 lớp Stem tự động trộn âm theo trạng thái chiến đấu',
          en: 'Build a 3-tier vertical stem mixing system responding to combat threat levels'
        },
        completed: false
      },
      {
        id: 'adp-2',
        text: {
          vi: 'Áp dụng công thức ngẫu nhiên hóa Pitch và Volume cho tiếng bước chân và tiếng súng',
          en: 'Implement pitch and volume micro-randomization across repetitive SFX triggers'
        },
        completed: false
      }
    ]
  },

  {
    id: 'audio-spatial-mixing',
    title: {
      vi: 'Âm Thanh Không Gian & Hòa Âm',
      en: '3D Spatial Audio & Mixing'
    },
    category: 'audio',
    tier: 3,
    status: 'locked',
    exp: 0,
    maxExp: 150,
    parentId: 'audio-interactive-systems',
    x: 2340,
    y: 790,
    tags: ['audio', 'spatial-audio', 'occlusion', 'ducking', 'mixing'],
    summary: {
      vi: 'Không gian 3D, suy giảm khoảng cách, cản âm qua tường (Occlusion) và nén giảm âm nền tự động (Ducking).',
      en: '3D spatial attenuation curves, wall occlusion filtering, and dynamic dialogue ducking.'
    },
    content: {
      vi: `# Âm Thanh Không Gian 3D & Kỹ Thuật Hòa Âm Động (Spatial Audio & Mixing)

## 1. Không Gian Hóa 3D & Đường Cong Suy Giảm (Distance Attenuation)
* **Panning trái / phải:** Giúp người chơi nhắm mắt cũng biết kẻ địch đang rình rập ở hướng nào.
* **Đường cong suy giảm âm lượng (Logarithmic Falloff):** Âm thanh giảm nhanh khi vừa rời xa nguồn phát, rồi nhỏ dần đều khi ra xa, thay vì giảm đột ngột theo đường thẳng.

## 2. Hiện Tượng Cản Âm Qua Vật Thể (Occlusion & Obstruction)
Khi kẻ địch đứng sau một bức tường bê tông dày:
* Không chỉ đơn thuần giảm âm lượng, mà phải áp dụng **bộ lọc thông thấp (Low-Pass Filter)**.
* Tường sẽ hấp thụ toàn bộ tần số cao (tiếng bước chân trở nên trầm đục, nghẹt thở), giúp người chơi cảm nhận được độ dày của vật liệu!

## 3. Nén Giảm Âm Nền Tự Động (Sidechain Ducking)
Khi nhân vật trò chuyện hoặc có thông báo vô tuyến quan trọng:
* Hệ thống tự động giảm âm lượng nhạc nền và tiếng môi trường xuống 6dB - 8dB.
* Ngay khi câu thoại kết thúc, nhạc nền tự động dâng trở lại mượt mà, giúp người chơi không bao giờ bị bỏ lỡ lời thoại.`,
      en: `# 3D Spatial Audio, Occlusion & Dynamic Mixing

## 1. 3D Spatial Attenuation Curves
* **Binaural / Stereo Panning:** Enables players to localize adversary positions purely through acoustic telemetry.
* **Logarithmic Distance Falloff:** Natural physical acoustics attenuate steeply near the origin before tapering into ambient distance, far superior to linear fading.

## 2. Material Occlusion & Obstruction Filtering
When an adversary reloads behind a solid reinforced barrier:
* Never merely decrease volume — apply a dynamic **Low-Pass Filter (LPF)** cutoff.
* Solid geometry naturally absorbs high-frequency transients while allowing low mumbles to penetrate, conveying physical material density.

## 3. Dynamic Sidechain Ducking
During critical dialogue broadcasts or quest briefings:
* Automatically depress background score and environmental beds by -6dB to -8dB.
* Smoothly release back to unity gain upon dialogue completion, guaranteeing 100% vocal intelligibility.`
    },
    objectives: [
      {
        id: 'spat-1',
        text: {
          vi: 'Lập trình đường cong suy giảm âm thanh theo khoảng cách (Logarithmic attenuation)',
          en: 'Implement a realistic logarithmic 3D distance attenuation curve'
        },
        completed: false
      },
      {
        id: 'spat-2',
        text: {
          vi: 'Tích hợp bộ lọc Low-Pass Filter khi âm thanh bị cản bởi tường hoặc chướng ngại vật',
          en: 'Apply dynamic Low-Pass filtering to simulate acoustic material occlusion'
        },
        completed: false
      }
    ]
  }
];
