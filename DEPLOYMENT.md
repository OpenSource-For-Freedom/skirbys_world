# Skirby's World - GitHub Pages Deployment Guide

This document explains how Skirby's World is deployed to GitHub Pages using automated GitHub Actions.

## 🚀 Live Deployment

**Game URL**: https://opensource-for-freedom.github.io/skirbys_world/

## 📋 Deployment Architecture

### Overview
Skirby's World uses GitHub Pages with automated deployment via GitHub Actions. The game features a landing page entry point and is built from a modular ES6 structure deployed as static HTML/CSS/JS files to a `/docs` directory.

### Key Components

1. **Source Structure**:
   ```
   ├── landing.html       # Game landing page (becomes index.html)
   ├── index.php          # Main game file (converted to game.html for deployment)
   ├── src/              # Modular game logic (8 modules)
   │   ├── boss.js       # Boss battle system
   │   ├── coins.js      # Coin collection mechanics  
   │   ├── enemies.js    # Enemy behavior
   │   ├── platforms.js  # Level generation
   │   ├── player.js     # Player movement and abilities
   │   ├── sound.js      # Audio system
   │   ├── ui.js         # User interface
   │   └── utils.js      # Utility functions
   └── public/           # Public assets
       ├── game.js       # Main game coordinator
       └── styles.css    # Game styling
   ```

2. **Build Output** (`docs/` folder):
   ```
   ├── index.html        # Landing page (from landing.html)
   ├── game.html         # Main game (converted from game.html)
   ├── src/             # Copied game modules
   ├── public/          # Copied public assets
   ├── IMG_2133.jpeg    # Game screenshot
   ├── LICENSE          # License file
   └── README.md        # Documentation
   ```

## 🎮 Game Access

### User Experience
1. **Visit**: https://opensource-for-freedom.github.io/skirbys_world/
2. **Landing Page**: Beautiful game introduction with play buttons
3. **Game Launch**: Click "PLAY NOW" to start the game
4. **Auto-Start**: Page automatically redirects to game after 10 seconds

## 🔧 Deployment Process

### Automatic Deployment

**Trigger**: Push to `main` branch

**Workflow**: `.github/workflows/deploy.yml`

```yaml
name: Deploy
on:
  push:
    branches: [main]
permissions:
  contents: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install dependencies
        run: npm install
      - name: Build game
        run: npm run build
      - name: Commit and push docs
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add docs/
          git commit -m "Deploy GitHub Pages files to docs/" || exit 0
          git push
```

### Build Process

**Command**: `npm run build`

**Script**: 
```bash
mkdir -p docs && 
cp -r src docs/ && 
cp -r public docs/ && 
cp game.html docs/game.html && 
cp landing.html docs/index.html && 
cp IMG_2133.jpeg docs/ && 
cp LICENSE docs/ && 
cp README.md docs/
```

**Key Steps**:
1. Create `docs/` directory
2. Copy modular game files (`src/`, `public/`)
3. Copy `game.html` and convert `landing.html` → `index.html` for GitHub Pages compatibility
4. Copy assets and documentation
5. Commit and push docs to main branch for GitHub Pages deployment

## 🧪 Local Testing

### Development Server
```bash
npm run dev
# Opens: http://localhost:8000/index.php
```

### Testing Built Version
```bash
npm run build
cd docs && python3 -m http.server 3000
# Opens: http://localhost:3000/index.html
```

### Validation
```bash
npm test  # Validates external dependencies
```

## 🎮 Game Architecture

### Modular Design
- **ES6 Modules**: Game uses modern JavaScript modules for organization
- **Separation of Concerns**: Each module handles specific game functionality
- **Main Coordinator**: `public/game.js` imports and coordinates all modules

### External Dependencies (CDN)
- **Tailwind CSS**: https://cdn.tailwindcss.com/
- **Google Fonts**: https://fonts.googleapis.com/
- **Tone.js**: https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js

### Browser Compatibility
- Modern browsers with ES6 module support
- HTML5 Canvas support required
- Responsive design for mobile/desktop

## 🛠️ Troubleshooting

### Common Issues

1. **Game Not Loading**
   - Check browser console for module loading errors
   - Verify all files exist in `docs/` folder
   - Test with local server first

2. **Styling Issues** 
   - CDN-blocked environments may have limited styling
   - Basic functionality will still work without external CSS

3. **Audio Not Working**
   - Tone.js dependency may be blocked in some environments
   - Game will function without audio

4. **Build Failures**
   - Ensure `npm install` completes successfully
   - Check file permissions for copying operations
   - Verify Node.js version compatibility

### Deployment Validation

After deployment, verify:
- [ ] Game loads at GitHub Pages URL
- [ ] Intro screen displays correctly
- [ ] "Start Adventure" button works
- [ ] Game renders and plays properly
- [ ] UI elements function correctly

## 🔄 Development Workflow

### Making Changes
1. Edit source files in `src/`, `public/`, or `index.php`
2. Test locally: `npm run dev`
3. Commit and push to `main` branch
4. GitHub Actions automatically builds and deploys
5. Verify deployment at live URL

### File Structure Guidelines
- **Game Logic**: Edit modules in `src/` for specific functionality
- **Main Coordination**: Edit `public/game.js` for game flow
- **UI/Styling**: Edit `public/styles.css` and HTML in `index.php`
- **Build Process**: Modify `package.json` scripts if needed

## 📊 Performance Considerations

- **Load Time**: Modular architecture enables efficient loading
- **Canvas Rendering**: Optimized for 60 FPS gameplay
- **Mobile Support**: Responsive design scales appropriately
- **CDN Dependencies**: External resources for styling and audio

## 🔐 Security & Permissions

- **GitHub Token**: Automatically provided by GitHub Actions
- **Pages Permissions**: Repository must have Pages enabled
- **Branch Protection**: Consider protecting `main` branch for production

---

**Last Updated**: August 2024  
**Deployment Status**: ✅ Active  
**Game Version**: 1.0.0