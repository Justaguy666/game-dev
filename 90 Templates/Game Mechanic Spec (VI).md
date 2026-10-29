---
type: Mechanic
genre: Action / Retro Platformer
status: In-Progress
tags:
  - mechanic
  - gdd
---

# 🎮 Mechanic: {{title}}

<div class="hp-bar" style="--val: 60%;"><span>ĐỘ HOÀN THIỆN: 60%</span></div>

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
