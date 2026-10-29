---
type: Mechanic
genre: Action / Retro Platformer
status: In-Progress
tags:
  - mechanic
  - gdd
---

# 🎮 Mechanic: {{title}}

<div class="lang-switch-bar">
  <button class="lang-switch-btn is-active" data-lang="vi">🇻🇳 Tiếng Việt</button>
  <button class="lang-switch-btn" data-lang="en">🇬🇧 English</button>
  <button class="lang-switch-btn" data-lang="both">🌐 Song ngữ / Both</button>
</div>

<div class="hp-bar" style="--val: 60%;"><span>COMPLETION: 60%</span></div>

<div class="lang-vi">

## 1. Tổng quan cơ chế (Overview)
* **Ý tưởng cốt lõi:** Người chơi có thể làm gì?
* **Mục đích thiết kế:** Mang lại cảm giác chơi (Game feel) như thế nào?

## 2. Đầu vào & Phản hồi (Input & Feedback)

| Thao tác (Input) | Hành động (Action) | Âm thanh (SFX) | Hiệu ứng hình ảnh (VFX) |
| :--- | :--- | :--- | :--- |
| `Space` | Nhảy | `jump_8bit.wav` | Hạt bụi dưới chân |
| `Shift` | Dash lướt nhanh | `dash_whoosh.wav` | Bóng mờ (Ghost trail) |

## 3. Quy tắc & Ngoại lệ (Rules & Edge Cases)

> [!WARNING] ⚠️ Boss Hazard / Bug Alert
> Kiểm tra kỹ va chạm khi nhân vật Dash qua khe hẹp 1 ô pixel để tránh kẹt tường.

## 4. Nhiệm vụ triển khai (Quests)

- [x] Vẽ sprite animation trong Aseprite
- [ ] Lập trình State Machine cho trạng thái này
- [ ] Cân chỉnh thời gian cooldown và quán tính

</div>

<div class="lang-en">

## 1. Mechanic Overview
* **Core Idea:** What action does the player execute?
* **Design Purpose:** What game feel or emotional response does this mechanic evoke?

## 2. Input & Feedback Matrix

| Input Trigger | In-Game Action | Audio Feedback (SFX) | Visual Feedback (VFX) |
| :--- | :--- | :--- | :--- |
| `Space` | Jump | `jump_8bit.wav` | Dust particles at feet |
| `Shift` | Dash / Slide | `dash_whoosh.wav` | Motion ghost trail |

## 3. Edge Cases & Constraints

> [!WARNING] ⚠️ Hazard / Physics Glitch Alert
> Carefully check collision raycasts when dashing through 1-pixel tight corridors to avoid clipping through tilemaps.

## 4. Implementation Tasks (Quests)

- [x] Draw sprite animation frames in Aseprite
- [ ] Implement transition logic in player State Machine
- [ ] Tune deceleration, friction, and cooldown window

</div>
