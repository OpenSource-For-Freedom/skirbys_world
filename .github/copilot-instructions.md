# Skirby's World Game Development Instructions

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Project Overview

Skirby's World is a 2D HTML5 Canvas platformer game built as a single self-contained file (index.php). The game features player movement, collision detection, coin collection, enemies, boss battles, and multiple levels. The entire game logic, styling, and HTML structure are contained within index.php using embedded JavaScript and CSS.

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
   - **Timing**: Takes <1 second. Creates dist/ folder with game files.
   - **NEVER CANCEL**: Even though fast, set timeout to 30+ seconds for safety.

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
   - Verify `dist/` folder contains: index.php, IMG_2133.jpeg, LICENSE, README.md
   - Test that built version loads and functions identically to source

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
├── IMG_2133.jpeg              # Game screenshot asset
├── LICENSE                    # MIT license
├── README.md                  # Project documentation
├── index.html                 # Copy of index.php for local testing
├── index.php                  # **MAIN GAME FILE** - entire game
├── package.json               # Build scripts and metadata
└── package-lock.json          # Dependency lock file
```

### Critical Files to Understand

#### index.php (2004 lines)
- **Contains**: Complete HTML5 Canvas game with embedded CSS and JavaScript
- **Key sections**:
  - HTML structure and CSS styling (lines 1-400)
  - Game constants and state management (lines 400-600)
  - Player class and movement logic (lines 600-1200)
  - Collision detection and level management (lines 1200-1800)
  - Game loop and rendering (lines 1800-2004)

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
- **Main game logic**: Edit index.php directly
- **Build process**: Modify package.json scripts if needed
- **Deployment**: Update .github/workflows/deploy.yml only if build process changes

### Game Development Areas

When working on game features, understand these key areas in index.php:

1. **Player Movement** (lines ~1000-1100):
   - WASD/Arrow key handling
   - Jump mechanics and gravity
   - Flight and super jump skills

2. **Collision Detection** (lines ~1100-1400):
   - Platform collision resolution
   - Coin collection logic
   - Enemy interaction

3. **Level Management** (lines ~1500-1700):
   - Level data structures
   - Level progression triggers
   - Camera movement

4. **Game States** (lines ~300-400):
   - INTRO, PLAYING, BOSS_BATTLE, GAME_OVER states
   - State transition logic

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
- Single file architecture minimizes HTTP requests
- Canvas rendering is optimized for 2D graphics
- Audio synthesis may impact performance on slower devices

Always validate performance after changes by playing through several levels and monitoring browser performance tools.