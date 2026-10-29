---
type: Mechanic
genre: Action / Retro Platformer
status: In-Progress
tags:
  - mechanic
  - gdd
---

# 🎮 Mechanic: {{title}}

<div class="hp-bar" style="--val: 60%;"><span>COMPLETION: 60%</span></div>

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
