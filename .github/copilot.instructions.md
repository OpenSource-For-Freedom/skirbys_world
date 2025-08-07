# Copilot.instructions.md

## Purpose

This file provides guidance to GitHub Copilot and human collaborators for building the core game loop, character movement, collision detection, HUD display, and game progression in **Skirby's World** — a 2D platformer game built for the web.

---

## Game Architecture Overview

### Technologies

- HTML5 Canvas (for rendering)
- JavaScript (core logic)
- CSS (styling)
- Optional: Vite (for local dev / build)

---

## Modules and Responsibilities

### `src/main.js`

- Initialize canvas, load assets
- Set up the game loop (`requestAnimationFrame`)
- Manage level state, update/draw cycles
- Input handling (keyboard + optional touch support)

### `src/player.js`

- `Player` class
- `moveLeft()`, `moveRight()`, `jump()`
- Gravity and collision logic
- Animation frame switching
- Boundary constraints

### `src/coin.js`

- `Coin` class with `draw()` and `collect()` methods
- Collision detection with player
- Trigger sound and increment score

### `src/ui.js`

- HUD rendering (`Coins:`, `Health:`, `Level:`)
- Draw HUD in top-left using `ctx.fillText()`

### `src/platforms.js`

- Static platforms array with positions
- `drawPlatforms()` method
- Collision logic (platforms vs. player feet)

---

## 🎮 Core Gameplay Elements

### Player Controls

- Arrow keys or WASD
- Spacebar or `↑` to jump
- Smooth motion with acceleration/deceleration
- Gravity with fall velocity cap

### Game Loop

```js
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}
```

### Collision Logic

```js
if (player.collidesWith(coin)) {
  coin.collect();
  gameState.coins += 1;
}
```

### Level Progression

- When player reaches far-right edge of screen:
  - Increment `gameState.level += 1`
  - Load next platform/coin layout

---

## Dev Tasks for Copilot

### Build Order

1. Create the canvas and render the background
2. Implement `Player` class with basic movement and gravity
3. Draw platforms and detect collisions
4. Place and collect coins
5. Draw HUD in top-left corner
6. Build level change logic
7. Add basic enemy or damage system (optional)

---

## Additional Tips for Copilot

- Always check for collision from bottom when jumping
- Use `ctx.clearRect()` before drawing new frames
- Store assets (sprites, coin icons) in `/assets/images/`
- Keep state global (coins, health, level) in `gameState`

---

## Game State Object Example

```js
const gameState = {
  coins: 0,
  health: 100,
  level: 1
};
```

---

## Loop Pattern

```js
function update() {
  player.update();
  checkCollisions();
  updateUI();
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  platforms.forEach(p => p.draw(ctx));
  coins.forEach(c => c.draw(ctx));
  player.draw(ctx);
  drawHUD();
}
```

---

## Style Guide

- Use ES6 class syntax
- One object per file (`Player`, `Coin`, `Platform`)
- Comment logic for collision & movement
- Prioritize readability for all contributors

---

## Optional Stretch Goals

- Parallax background layers
- Sound effects with Web Audio API
- Mobile controls (touch input)
- Level editor or JSON level loader