// Main game entry point - coordinates all modules

import { setupSounds, playJumpSound, playWalkSound, playEnemyHitSound, playEnemyDeathSound } from '../src/sound.js';
import { checkCollision, drawClouds, drawHills, drawStars, displayMessageBox } from '../src/utils.js';
import { player, initializePlayer, resetPlayer, updatePlayer, drawPlayer, drawPlayerSkillEffects, playerTakeDamage } from '../src/player.js';
import { generateLevel, drawPlatforms, drawExit } from '../src/platforms.js';
import { drawCoins, updateCoinCollection } from '../src/coins.js';
import { updateEnemies, drawEnemies } from '../src/enemies.js';
import { boss, initializeBoss, updateBoss, handleBossAttacks, drawBoss } from '../src/boss.js';
import { updateUI, setupShopButtons, setupCheatInput } from '../src/ui.js';

// Game Constants
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 675; // 16:9 aspect ratio

// Game State
const GAME_STATE = {
    INTRO: 'intro',
    PLAYING: 'playing',
    SHOP: 'shop',
    GAME_OVER: 'gameOver',
    BOSS_BATTLE: 'bossBattle'
};
let currentState = GAME_STATE.INTRO;

// HTML Elements
const gameContainer = document.getElementById('game-container');
const introMenu = document.getElementById('intro-menu');
const gameUI = document.getElementById('game-ui');
const shopUI = document.getElementById('shop-ui');
const gameOverUI = document.getElementById('game-over-ui');
const bossBattleUI = document.getElementById('boss-battle-ui');
const startButton = document.getElementById('startButton');
const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
const continueGameButton = document.getElementById('continueGameButton');
const restartButton = document.getElementById('restartButton');
const startBossBattleButton = document.getElementById('startBossBattleButton');
const loadingOverlay = document.getElementById('loading-overlay');

// Game variables
let currentLevel = 1;
let currentLevelData; // Stores the currently generated level data
let keys = {};
let gameLoopId; // To store the requestAnimationFrame ID
let cameraX = 0; // Camera's X offset for scrolling
let frameCounter = 0; // Global frame counter for animations

// Background elements for parallax
let clouds = [];
let hills = [];
let stars = []; // For boss battle

/**
 * Sets the current game state and updates UI visibility.
 * @param {string} newState - The new state to set (e.g., GAME_STATE.PLAYING).
 */
function setGameState(newState) {
    currentState = newState;
    introMenu.classList.add('hidden');
    gameUI.classList.add('hidden');
    shopUI.classList.add('hidden');
    gameOverUI.classList.add('hidden');
    bossBattleUI.classList.add('hidden');
    loadingOverlay.classList.add('hidden');

    // Cancel any existing game loop before setting new state
    if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
        gameLoopId = null;
    }

    switch (currentState) {
        case GAME_STATE.INTRO:
            introMenu.classList.remove('hidden');
            break;
        case GAME_STATE.PLAYING:
            gameUI.classList.remove('hidden');
            gameCanvas.width = CANVAS_WIDTH; // Ensure canvas dimensions are set
            gameCanvas.height = CANVAS_HEIGHT;
            initializeBackgroundElements(); // Initialize clouds and hills
            startGameLoop(); // Always start game loop for PLAYING
            break;
        case GAME_STATE.SHOP:
            shopUI.classList.remove('hidden');
            break;
        case GAME_STATE.GAME_OVER:
            gameOverUI.classList.remove('hidden');
            break;
        case GAME_STATE.BOSS_BATTLE:
            gameUI.classList.remove('hidden'); // Ensure game canvas is visible
            initializeBackgroundElements(); // Initialize stars for boss battle
            startGameLoop(); // Always start game loop for BOSS_BATTLE
            break;
    }
}

/**
 * Resets player and game state for a new game or level.
 */
function resetGame() {
    resetPlayer(CANVAS_HEIGHT);
    currentLevel = 1;

    // Generate the first level
    currentLevelData = generateLevel(currentLevel, CANVAS_WIDTH, CANVAS_HEIGHT, player);
    initializeBackgroundElements(); // Re-initialize background elements for new game

    updateUIWrapper();
}

/**
 * Resets the positions and states of enemies and coins for the current level.
 */
function resetLevelElements() {
    // This function is now mostly handled by generating a new level
    // when currentLevel increments.
    // However, we need to re-initialize player position etc.
    player.x = 50;
    player.y = CANVAS_HEIGHT - 100;
    player.dy = 0;
    player.onGround = false;
    player.isInvincible = false;
    player.invincibilityTimer = 0;
    player.knockbackX = 0;
    player.knockbackY = 0;
    cameraX = 0; // Reset camera for new level
    currentLevelData = generateLevel(currentLevel, CANVAS_WIDTH, CANVAS_HEIGHT, player); // Generate new level data
    initializeBackgroundElements(); // Re-initialize background elements for new level
}

/**
 * Initializes clouds, hills, and stars for background.
 */
function initializeBackgroundElements() {
    clouds = [];
    hills = [];
    stars = [];

    // Generate clouds
    for (let i = 0; i < 10; i++) { // 10 clouds
        clouds.push({
            x: Math.random() * CANVAS_WIDTH * 2, // Can start off-screen
            y: Math.random() * (CANVAS_HEIGHT / 2 - 50),
            width: 80 + Math.random() * 100,
            height: 30 + Math.random() * 40,
            speed: 0.1 + Math.random() * 0.2, // Slower speed for parallax
            color: 'rgba(255, 255, 255, 0.8)'
        });
    }

    // Generate hills (multiple layers for more depth)
    const hillColors = ['#6B8E23', '#8B4513', '#A0522D']; // OliveDrab, SaddleBrown, Sienna
    const hillHeights = [CANVAS_HEIGHT * 0.3, CANVAS_HEIGHT * 0.4, CANVAS_HEIGHT * 0.5];
    const hillSpeeds = [0.05, 0.1, 0.15]; // Slower speeds for distant hills

    for (let layer = 0; layer < 3; layer++) {
        for (let i = 0; i < 3; i++) { // A few hills per layer
            hills.push({
                x: Math.random() * CANVAS_WIDTH * 2,
                y: CANVAS_HEIGHT - hillHeights[layer],
                width: 200 + Math.random() * 300,
                height: hillHeights[layer],
                color: hillColors[layer],
                speed: hillSpeeds[layer] // Parallax speed
            });
        }
    }

    // Generate stars for boss battle
    for (let i = 0; i < 200; i++) { // 200 stars
        stars.push({
            x: Math.random() * CANVAS_WIDTH,
            y: Math.random() * CANVAS_HEIGHT,
            radius: Math.random() * 1.5 + 0.5,
            initialAlpha: Math.random() // For twinkling effect
        });
    }
}

/**
 * Wrapper function for updateUI to pass the required parameters
 */
function updateUIWrapper() {
    updateUI(player, currentLevel);
}

/**
 * Initializes and starts the boss battle.
 */
function startBossBattle() {
    console.log("Starting Boss Battle..."); // Debug log
    setGameState(GAME_STATE.BOSS_BATTLE);
    console.log("Game State set to BOSS_BATTLE."); // Debug log

    initializeBoss(CANVAS_WIDTH, CANVAS_HEIGHT);

    // Move player to a starting position for boss battle
    player.x = CANVAS_WIDTH / 2 - player.width / 2;
    player.y = CANVAS_HEIGHT - 100; // Player starts on the "ground" for boss battle
    player.dy = 0;
    player.onGround = false; // Will be set to true by ground collision in update
    player.isInvincible = false; // Reset invincibility for boss battle
    player.invincibilityTimer = 0; // Reset invincibility timer for boss battle
    player.knockbackX = 0; // Reset knockback for boss battle
    player.knockbackY = 0; // Reset knockback for boss battle
    cameraX = 0; // Camera is fixed for boss battle

    // Start the game loop if it's not running
    if (!gameLoopId) {
        startGameLoop();
    }
    console.log("Boss Battle setup complete. Player Health:", player.health); // Debug log
}

/**
 * The main game loop, called repeatedly using requestAnimationFrame.
 */
function gameLoop() {
    update();
    draw();
    gameLoopId = requestAnimationFrame(gameLoop);
}

/**
 * Starts the game loop.
 */
function startGameLoop() {
    if (!gameLoopId) {
        gameLoopId = requestAnimationFrame(gameLoop);
    }
}

/**
 * Updates game state: player movement, physics, collisions, enemy logic.
 */
function update() {
    frameCounter++; // Increment frame counter

    if (currentState !== GAME_STATE.PLAYING && currentState !== GAME_STATE.BOSS_BATTLE) return;

    // Update player
    updatePlayer(keys, CANVAS_HEIGHT, CANVAS_WIDTH, currentState, playWalkSound, playJumpSound);

    // Update camera position based on player (only relevant for PLAYING state)
    if (currentState === GAME_STATE.PLAYING && currentLevelData) {
        cameraX = player.x - CANVAS_WIDTH / 2 + player.width / 2;
        const levelTotalWidth = currentLevelData.levelTotalWidth;
        if (cameraX < 0) cameraX = 0;
        if (cameraX > levelTotalWidth - CANVAS_WIDTH) {
            cameraX = levelTotalWidth - CANVAS_WIDTH;
        }
    }

    // Collision detection and resolution for PLAYING state
    if (currentState === GAME_STATE.PLAYING && currentLevelData) {
        currentLevelData.platforms.forEach(platform => {
            if (checkCollision(player, platform)) {
                // Calculate overlap to determine collision direction
                const xOverlap = Math.min(player.x + player.width, platform.x + platform.width) - Math.max(player.x, platform.x);
                const yOverlap = Math.min(player.y + player.height, platform.y + platform.height) - Math.max(player.y, platform.y);

                // Prioritize vertical collision if Y overlap is smaller (meaning player landed/jumped into it)
                if (yOverlap < xOverlap) {
                    // Falling onto a platform
                    if (player.dy > 0) {
                        player.y = platform.y - player.height; // Snap to top
                        player.dy = 0; // Stop falling
                        player.onGround = true; // Player is on ground
                    }
                    // Jumping into the bottom of a platform
                    else if (player.dy < 0) {
                        player.y = platform.y + platform.height; // Snap to bottom
                        player.dy = 0; // Stop rising
                    }
                }
                // Otherwise, it's a horizontal collision
                else {
                    if (player.dx > 0) { // Moving right, hit left side of platform
                        player.x = platform.x - player.width;
                        player.dx = 0;
                    } else if (player.dx < 0) { // Moving left, hit right side of platform
                        player.x = platform.x + platform.width;
                        player.dx = 0;
                    }
                }
            }
        });

        // Fall off screen (Game Over)
        if (player.y + player.height > CANVAS_HEIGHT) {
            player.health = 0; // Instant death
        }

        // Coin collection
        updateCoinCollection(currentLevelData.coins, player, checkCollision, updateUIWrapper);

        // Enemy movement and collision
        currentLevelData.enemies = updateEnemies(
            currentLevelData.enemies, 
            player, 
            checkCollision, 
            updateUIWrapper, 
            playEnemyHitSound, 
            playEnemyDeathSound, 
            playerTakeDamage, 
            CANVAS_HEIGHT
        );

        // Check for level completion (reaching exit)
        const isCollidingWithExit = checkCollision(player, currentLevelData.exit);

        if (isCollidingWithExit) {
            console.log('Collision with Exit detected! Proceeding to next state.'); // Debug log
            // Temporarily change exit color to red to confirm collision visually
            currentLevelData.exit.color = 'red';
            // We'll have a fixed number of levels before the boss for now (e.g., 3)
            if (currentLevel < 3) { // After 3 levels, go to boss
                currentLevel++;
                resetLevelElements(); // Generate new level
                updateUIWrapper();
                setGameState(GAME_STATE.SHOP); // Go to shop after level
                console.log('Level Complete! Moving to Shop.');
            } else {
                // All levels complete, go to boss battle
                setGameState(GAME_STATE.BOSS_BATTLE);
                console.log('All levels complete! Time for the Boss Battle!');
            }
        } else {
            // Reset exit color if not colliding, to revert from red debug color
            if (currentLevelData.exit.color !== currentLevelData.exit.originalColor) {
                currentLevelData.exit.color = currentLevelData.exit.originalColor;
            }
        }
    } else if (currentState === GAME_STATE.BOSS_BATTLE) {
        // Ground for player in boss battle (fixed platform at bottom)
        const groundY = CANVAS_HEIGHT - 40; // Example ground level
        if (player.y + player.height > groundY) {
            player.y = groundY - player.height;
            player.dy = 0;
            player.onGround = true;
        }

        // Boss battle update logic
        updateBoss(player, checkCollision, updateUIWrapper, playerTakeDamage, CANVAS_WIDTH, CANVAS_HEIGHT);
        handleBossAttacks(keys, player, checkCollision, displayMessageBox, setGameState, resetGame, gameContainer);
    }

    // Check for Game Over
    if (player.health <= 0) {
        setGameState(GAME_STATE.GAME_OVER);
    }
}

/**
 * Draws all game elements onto the canvas.
 */
function draw() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Clear canvas

    // In boss battle, player is drawn at fixed position relative to canvas, not cameraX
    const playerDrawX = (currentState === GAME_STATE.BOSS_BATTLE) ? player.x : player.x - cameraX;

    // Draw background based on current state
    if (currentState === GAME_STATE.PLAYING) {
        // Sky gradient
        const skyGradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
        skyGradient.addColorStop(0, '#87CEEB'); // Light blue
        skyGradient.addColorStop(0.7, '#ADD8E6'); // Lighter blue
        skyGradient.addColorStop(1, '#B0E0E6'); // Powder blue
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        drawHills(ctx, hills, cameraX, CANVAS_WIDTH, CANVAS_HEIGHT, currentLevelData);
        drawClouds(ctx, clouds, cameraX, CANVAS_WIDTH, currentLevelData);

    } else if (currentState === GAME_STATE.BOSS_BATTLE) {
        // Nebula background
        const nebulaGradient = ctx.createRadialGradient(
            CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 50,
            CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, Math.max(CANVAS_WIDTH, CANVAS_HEIGHT) / 2
        );
        nebulaGradient.addColorStop(0, '#4B0082'); // Indigo center
        nebulaGradient.addColorStop(0.5, '#6A0DAD'); // DarkOrchid
        nebulaGradient.addColorStop(1, '#191970'); // MidnightBlue
        ctx.fillStyle = nebulaGradient;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        drawStars(ctx, stars, frameCounter); // Pass frameCounter for twinkling
    }

    // Draw current level elements (only in PLAYING state)
    if (currentState === GAME_STATE.PLAYING && currentLevelData) {
        // Draw platforms
        drawPlatforms(ctx, currentLevelData.platforms, cameraX);

        // Draw coins
        drawCoins(ctx, currentLevelData.coins, cameraX);

        // Draw enemies
        drawEnemies(ctx, currentLevelData.enemies, cameraX);

        // Draw exit
        drawExit(ctx, currentLevelData.exit, cameraX);
    }

    // Draw player (Skirby)
    drawPlayer(ctx, playerDrawX, frameCounter);

    // Draw skill effects
    drawPlayerSkillEffects(ctx, playerDrawX, frameCounter);

    // Draw boss battle elements if in boss state
    if (currentState === GAME_STATE.BOSS_BATTLE) {
        drawBoss(ctx);
    }
}

// Event Listeners
startButton.addEventListener('click', () => {
    // Resume AudioContext on user gesture (use global Tone or mock)
    const ToneLib = typeof Tone !== 'undefined' ? Tone : { start: () => Promise.resolve() };
    ToneLib.start().then(() => {
        console.log("AudioContext resumed!");
        loadingOverlay.classList.remove('hidden');
        // Simulate loading time
        setTimeout(() => {
            resetGame(); // Reset game state before starting
            setGameState(GAME_STATE.PLAYING);
        }, 1000);
    }).catch(e => console.error("Error resuming AudioContext:", e));
});

continueGameButton.addEventListener('click', () => {
    loadingOverlay.classList.remove('hidden');
    setTimeout(() => {
        setGameState(GAME_STATE.PLAYING);
    }, 500);
});

restartButton.addEventListener('click', () => {
    loadingOverlay.classList.remove('hidden');
    setTimeout(() => {
        resetGame();
        setGameState(GAME_STATE.PLAYING);
    }, 1000);
});

startBossBattleButton.addEventListener('click', () => {
    loadingOverlay.classList.remove('hidden');
    setTimeout(() => {
        startBossBattle();
    }, 1000);
});

// Keyboard input handling for game controls
document.addEventListener('keydown', (e) => {
    // Prevent repeated keydown events for game controls
    if (keys[e.key.toLowerCase()] === true) return;

    keys[e.key.toLowerCase()] = true;

    // Handle skill activation on key press (e.g., 'e' for spin, 'f' for punch)
    if (currentState === GAME_STATE.PLAYING || currentState === GAME_STATE.BOSS_BATTLE) {
        if (e.key.toLowerCase() === 'e' && player.skills.spinAttack && !player.isSpinning) {
            player.isSpinning = true;
            // Spin attack duration
            setTimeout(() => player.isSpinning = false, 500);
        }
        if (e.key.toLowerCase() === 'f' && player.skills.punchPower && !player.isPunching) {
            player.isPunching = true;
            // Punch attack duration
            setTimeout(() => player.isPunching = false, 300);
        }
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// Initialize the game
function initializeGame() {
    // Initialize player position
    initializePlayer(CANVAS_HEIGHT);
    
    // Initialize sounds
    setupSounds();
    
    // Setup shop buttons
    setupShopButtons(player, updateUIWrapper);
    
    // Setup cheat input
    const gameState = {
        player: player,
        setCurrentLevel: (level) => {
            currentLevel = level;
        }
    };
    
    setupCheatInput(
        gameState, 
        resetLevelElements, 
        updateUIWrapper, 
        setGameState, 
        displayMessageBox, 
        startBossBattle, 
        gameContainer
    );
    
    // Set initial state
    setGameState(GAME_STATE.INTRO);
    
    // Initialize background elements
    initializeBackgroundElements();
}

// Start the game when the page loads
initializeGame();

// Check for autostart parameter and automatically start the game
function checkAutostart() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('autostart') === 'true') {
        // Auto-start the game after a brief moment
        setTimeout(() => {
            const ToneLib = typeof Tone !== 'undefined' ? Tone : { start: () => Promise.resolve() };
            ToneLib.start().then(() => {
                console.log("AudioContext resumed (autostart)!");
                loadingOverlay.classList.remove('hidden');
                setTimeout(() => {
                    resetGame();
                    setGameState(GAME_STATE.PLAYING);
                }, 500); // Shorter delay for autostart
            }).catch(e => console.error("Error resuming AudioContext:", e));
        }, 100); // Very brief delay to ensure page is loaded
    }
}

// Check for autostart after initialization
checkAutostart();