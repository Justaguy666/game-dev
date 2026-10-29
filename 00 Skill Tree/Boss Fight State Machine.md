---
tier: 5
category: Boss AI
status: boss
tags:
  - skill/boss
---

# ðŸ‘¹ Boss Fight State Machine

<div class="hp-bar" style="--val: 100%;"><span>BOSS HP: 9999 / 9999</span></div>

> [!WARNING] âš ï¸ BOSS BATTLE MECHANIC
> * ÄÃ²i há»i káº¿t há»£p: [[Core Gameplay Loop]], [[Kinematics & Movement]], [[Dash & Wall Jump]]

### ðŸ§  CÃ¡c tráº¡ng thÃ¡i cá»§a Boss (States)

1. **Idle / Taunt:** Boss Ä‘á»©ng quan sÃ¡t vÃ  Ä‘áº¿m nhá»‹p cooldown.
2. **Charge Attack:** Lao tháº³ng vá» phÃ­a ngÆ°á»i chÆ¡i vá»›i váº­n tá»‘c cao.
3. **Ground Slam:** Nháº£y lÃªn cao vÃ  giÃ¡ng bÃºa xuá»‘ng Ä‘áº¥t táº¡o sÃ³ng cháº¥n Ä‘á»™ng.
4. **Enrage Phase (DÆ°á»›i 30% HP):** TÄƒng 50% tá»‘c Ä‘á»™ ra chiÃªu vÃ  Ä‘á»•i nháº¡c ná»n 8-bit dá»“n dáº­p.
