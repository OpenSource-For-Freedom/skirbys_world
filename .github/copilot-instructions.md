# Skirby's World Game Development Instructions

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Project Overview

Skirby's World is a 2D HTML5 Canvas platformer game built with a modular architecture. The game features player movement, collision detection, coin collection, enemies, boss battles, and multiple levels. The game logic is separated into focused modules in the `/src` directory, with public assets in `/public`, and `index.php` serving as the main entry point that coordinates the modular components.

## Working Effectively

### Prerequisites
- Python 3 (for local development server)
- Node.js and npm (for build scripts and CI/CD)
- Modern web browser with HTML5 Canvas support

### Initial Setup and Build Process
1. Clone the repository and navigate to project root
2. Set up the development environment:
   ```bash
   npm install
   ```
   - **Timing**: Takes <1 second. No timeout needed.
   
3. Build the project:
   ```bash
   npm run build
   ```
   - **Timing**: Takes <1 second. Creates dist/ folder with game files and modular structure.
   - **NEVER CANCEL**: Even though fast, set timeout to 30+ seconds for safety.
   - **Output**: Copies index.php, src/, public/, and assets to dist/

4. Run tests:
   ```bash
   npm test
   ```
   - **Timing**: Takes <1 second. Validates external dependencies.
   - **NEVER CANCEL**: Set timeout to 30+ seconds.

### Running the Game

#### Local Development
- Start the development server:
  ```bash
  npm run dev
  ```
  - **Timing**: Starts immediately, runs indefinitely.
  - **Access**: Open http://localhost:8000/index.php in your browser
  - **Alternative**: Use `npm run serve` (same command)

#### Testing Built Version
- After running `npm run build`:
  ```bash
  cd dist && python3 -m http.server 3000
  ```
  - Access: http://localhost:3000/index.php

### Manual Validation Steps

**CRITICAL**: Always perform these validation steps after making any changes to ensure the game works correctly:

1. **Game Load Test**:
   - Open the game in a browser
   - Verify the intro screen displays with "Skirby's World" title
   - Verify "Start Adventure" button is visible and styled correctly

2. **Basic Gameplay Test** (Complete End-to-End Scenario):
   - Click "Start Adventure" to begin the game
   - Use WASD or arrow keys to move the player character
   - Press Spacebar to jump
   - Collect at least one coin to test collision detection
   - Move to the right edge of a level to test level progression
   - Verify the HUD displays coins, health, and level correctly

3. **Audio Validation**:
   - Note: Game depends on Tone.js from CDN for audio
   - In environments with CDN blocks, audio will fail but game should still function
   - Document any audio failures as expected behavior in restricted environments

4. **Cross-Browser Testing**:
   - Test in Chrome, Firefox, and Safari
   - Verify canvas rendering works correctly
   - Verify responsive design scales properly

5. **Build Validation**:
   - Verify `dist/` folder contains: index.php, src/, public/, IMG_2133.jpeg, LICENSE, README.md
   - Test that built version loads and functions identically to source
   - Verify modular imports work correctly in built environment

### Common Commands and Timing

| Command | Purpose | Time | Timeout Setting |
|---------|---------|------|-----------------|
| `npm install` | Install dependencies | <1s | 30s |
| `npm run build` | Build for production | <1s | 30s |
| `npm test` | Run validation tests | <1s | 30s |
| `npm run dev` | Start dev server | Instant | N/A (continuous) |
| `npm run lint` | Code linting | <1s | 30s |

**NEVER CANCEL** any build or test commands. Even though they complete quickly, always allow sufficient time for completion.

## File Structure and Key Components

### Repository Root
```
.
├── .github/
│   ├── workflows/deploy.yml    # GitHub Pages deployment
│   └── copilot-instructions.md # This file
├── dist/                       # Build output (generated)
│   ├── src/                    # Modular game logic files (copied from src/)
│   ├── public/                 # Public assets and main game entry (copied from public/)
│   ├── index.php               # **MAIN ENTRY POINT** - modular game loader
│   ├── IMG_2133.jpeg           # Game screenshot asset
│   ├── LICENSE                 # MIT license
│   └── README.md               # Project documentation
├── src/                        # **GAME LOGIC MODULES** (8 files, ~1421 lines)
│   ├── boss.js                 # Boss battle logic and AI
│   ├── coins.js                # Coin collection mechanics
│   ├── enemies.js              # Enemy behavior and collision
│   ├── platforms.js            # Level generation and platform logic
│   ├── player.js               # Player movement and abilities
│   ├── sound.js                # Audio system and sound effects
│   ├── ui.js                   # User interface and shop system
│   └── utils.js                # Utility functions and rendering helpers
├── public/                     # **PUBLIC ASSETS AND ENTRY**
│   ├── game.js                 # Main game coordinator (518 lines)
│   ├── index.html              # HTML template for game structure
│   └── styles.css              # Game styling and CSS
├── IMG_2133.jpeg               # Game screenshot asset
├── LICENSE                     # MIT license
├── README.md                   # Project documentation
├── index.php                   # **MAIN GAME FILE** - modular entry point
├── index_monolithic.php        # Backup of original monolithic version
├── package.json                # Build scripts and metadata
└── package-lock.json           # Dependency lock file
```

### Critical Files to Understand

#### index.php (~95 lines)
- **Contains**: HTML5 structure and module loading entry point
- **Purpose**: Loads modular game components from `public/game.js` and `src/` modules
- **Key features**:
  - Responsive game container and UI elements
  - Loads external CSS from `public/styles.css`
  - Bootstraps main game module from `public/game.js`

#### public/game.js (518 lines)
- **Contains**: Main game coordinator and entry point
- **Purpose**: Imports and coordinates all game modules
- **Key sections**:
  - Module imports from `/src` directory
  - Game state management and constants
  - Main game loop and rendering coordination
  - Event handling and initialization

#### src/ directory (8 modules, ~1421 total lines)
- **boss.js** (302 lines): Boss battle logic, AI, and attacks
- **player.js** (297 lines): Player movement, abilities, and state
- **platforms.js** (217 lines): Level generation and platform physics
- **utils.js** (210 lines): Utility functions and rendering helpers
- **enemies.js** (117 lines): Enemy behavior and collision detection
- **ui.js** (139 lines): User interface, shop system, and cheat codes
- **sound.js** (97 lines): Audio system and sound effects
- **coins.js** (42 lines): Coin collection mechanics

#### public/styles.css
- **Contains**: Game styling, responsive design, and UI components
- **Purpose**: Provides visual styling separated from game logic

#### index_monolithic.php (2004 lines) 
- **Contains**: Backup of original self-contained game version
- **Purpose**: Fallback reference for the previous monolithic architecture

#### package.json
- Defines build scripts that GitHub Actions expects
- Contains proper metadata and timing expectations

## Dependencies and External Resources

### External CDN Dependencies
- **Tailwind CSS**: `https://cdn.tailwindcss.com/` - For responsive styling
- **Google Fonts**: `https://fonts.googleapis.com/` - Inter font family  
- **Tone.js**: `https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js` - Audio synthesis

### Dependency Validation
- Game will function without CDN access but with reduced styling and no audio
- In restricted environments, expect console errors for blocked CDN resources
- This is **expected behavior** and not a bug

## Development Workflow

### Making Changes
1. **Always test changes immediately**:
   ```bash
   npm run dev  # Start server
   # Open browser to http://localhost:8000/index.php
   # Perform manual validation steps listed above
   ```

2. **Build and validate**:
   ```bash
   npm run build && npm test
   ```

3. **CI/CD Validation**:
   - Every push triggers GitHub Pages deployment via `.github/workflows/deploy.yml`
   - Workflow expects: `npm install`, `npm run build` to succeed
   - Built files from `dist/` folder are deployed

### Code Editing Guidelines
- **Main game logic**: Edit modules in `src/` directory for specific functionality
- **Game coordination**: Edit `public/game.js` for main game flow and module coordination
- **UI and styling**: Edit `public/styles.css` and HTML structure in `index.php`
- **Build process**: Modify package.json scripts if needed
- **Deployment**: Update .github/workflows/deploy.yml only if build process changes

### Game Development Areas

When working on game features, understand these key modular areas:

1. **Player Movement** (`src/player.js`):
   - WASD/Arrow key handling and input processing
   - Jump mechanics, gravity, and physics
   - Flight and super jump skills implementation
   - Player state management and abilities

2. **Collision Detection** (`src/utils.js` and various modules):
   - Platform collision resolution in `src/platforms.js`
   - Coin collection logic in `src/coins.js` 
   - Enemy interaction in `src/enemies.js`

3. **Level Management** (`src/platforms.js`):
   - Level data structures and generation algorithms
   - Level progression triggers and transitions
   - Camera movement and scrolling logic

4. **Game States** (`public/game.js`):
   - INTRO, PLAYING, SHOP, BOSS_BATTLE, GAME_OVER states
   - State transition logic and UI management
   - Game loop coordination between modules

5. **Audio System** (`src/sound.js`):
   - Tone.js integration and audio context management
   - Sound effect triggers and audio feedback
   - Music and ambient sound coordination

## Troubleshooting

### Common Issues
1. **"Tone is not defined" errors**: Expected in CDN-blocked environments
2. **Game not loading**: Check that Python HTTP server is running
3. **Build fails**: Ensure npm install completed successfully
4. **Styling looks wrong**: Check Tailwind CSS CDN accessibility

### Debug Steps
1. Check browser developer console for errors
2. Verify HTTP server is serving files correctly
3. Test in multiple browsers to isolate browser-specific issues
4. Validate external CDN resources are accessible

## CI/CD and Deployment

### GitHub Actions Pipeline
- **Trigger**: Push to main branch
- **Steps**: 
  1. Setup Node.js 20
  2. `npm install` (timeout: 5 minutes)
  3. `npm run build` (timeout: 5 minutes) 
  4. Deploy dist/ to GitHub Pages

### Deployment Validation
- After deployment, verify game loads at GitHub Pages URL
- Test complete gameplay scenario on deployed version
- Confirm all assets (images, game file) load correctly

## Performance Considerations

- Game runs at 60 FPS using requestAnimationFrame
- Modular architecture enables better code organization and debugging
- ES6 modules provide efficient loading and tree-shaking capabilities
- Canvas rendering is optimized for 2D graphics
- Audio synthesis may impact performance on slower devices
- Separation of concerns allows targeted performance optimizations

Always validate performance after changes by playing through several levels and monitoring browser performance tools.