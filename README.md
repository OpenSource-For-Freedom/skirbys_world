# Skirby's World

Developer: [CyberSynapse](https://cybersynapse.ro/) 

- Current testable product: (https://cybersynapse.ro/Skirby_testing.php)

**COMING SOON:** https://opensource-for-freedom.github.io/skirbys_world/

A 2D HTML5 Canvas platformer game featuring Skirby, a blocky character on an adventure through dynamically generated levels. Built as a single self-contained PHP file with embedded JavaScript and CSS.

![Skirby's World Screenshot](IMG_2133.jpeg)

## About the Game

Skirby's World is a classic 2D platformer where you control Skirby, a red blocky character, as he jumps through procedurally generated levels collecting coins and avoiding enemies. The game features a skill system where you can spend collected coins to unlock new abilities.

## Game Features

- **Procedurally Generated Levels**: Each level is randomly generated with platforms, coins, and enemies
- **Skill System**: Purchase upgrades using collected coins:
  - Super Jump: Jump even higher
  - Spin Attack: Defeat enemies with a spinning move
  - Punch Power: One-shot most enemies  
  - Flight: Soar through the skies with limited fuel
- **Multiple Themes**: Levels feature different visual themes (spring, summer, autumn, winter)
- **Boss Battle**: Face off against the Soap Boss with mustache
- **Sound Effects**: Audio feedback using Tone.js for jumps, walking, and combat
- **Responsive Design**: Scales to different screen sizes

## How to Play

### Controls
- **A/D** or **Arrow Keys**: Move left and right
- **Spacebar**: Jump
- **W/S** (with Flight skill): Fly up and down
- **E** (with Spin Attack): Activate spin attack
- **F** (with Punch Power): Punch attack
- **C**: Open cheat code input

### Gameplay
1. Move Skirby through the level using the arrow keys or WASD
2. Jump on platforms and collect yellow coins
3. Avoid or defeat purple enemies
4. Reach the golden exit platform to advance to the next level
5. Visit the shop between levels to purchase new skills
6. Face the boss battle after progressing through levels

### Cheat Codes
- `level2` - Jump to level 2
- `level3` - Jump to level 3  
- `add100` - Add 100 coins
- `boss` - Go directly to boss battle

## Development

### Prerequisites
- Python 3 (for local development server)
- Node.js and npm (for build scripts)
- Modern web browser with HTML5 Canvas support

### Running Locally
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open http://localhost:8000/index.php in your browser

### Building for Production
- Build the game: `npm run build`
- Built files will be placed in the `dist/` folder
- Run tests: `npm test`

### Technical Details
- Built with HTML5 Canvas and vanilla JavaScript
- Uses Tailwind CSS for styling
- Audio powered by Tone.js
- Single file architecture (index.php contains the entire game)
- Automatic deployment to GitHub Pages via GitHub Actions

## License

MIT License - see LICENSE file for details

## Author

Tim Burns
