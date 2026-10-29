---
tier: 5
category: Boss AI
status: boss
tags:
  - skill/boss
---

# 👹 Boss Fight State Machine

<div class="hp-bar" style="--val: 100%;"><span>BOSS HP: 9999 / 9999</span></div>

> [!WARNING] ⚠️ BOSS BATTLE MECHANIC
> * Đòi hỏi kết hợp: [[Core Gameplay Loop]], [[Kinematics & Movement]], [[Dash & Wall Jump]]

### 🧠 Các trạng thái của Boss (States)
1. **Idle / Taunt:** Boss đứng quan sát và đếm nhịp cooldown.
2. **Charge Attack:** Lao thẳng về phía người chơi với vận tốc cao.
3. **Ground Slam:** Nhảy lên cao và giáng búa xuống đất tạo sóng chấn động.
4. **Enrage Phase (Dưới 30% HP):** Tăng 50% tốc độ ra chiêu và đổi nhạc nền 8-bit dồn dập.
