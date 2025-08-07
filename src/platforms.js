// Platforms module for level generation and platform rendering

// Themes for random level generation
const themes = {
    spring: {
        platformColors: ['#8BC34A', '#CDDC39', '#A2D9CE'], // Green, light green, light blue-green
        backgroundColor: '#C8F0F6', // Light sky
        enemyColor: '#FF00FF' // Pinkish-purple
    },
    summer: {
        platformColors: ['#4CAF50', '#689F38', '#FFEB3B'], // Darker green, olive, yellow
        backgroundColor: '#87CEEB', // Sky blue
        enemyColor: '#00FFFF' // Cyan
    },
    autumn: {
        platformColors: ['#FF5722', '#FF9800', '#795548'], // Deep orange, orange, brown
        backgroundColor: '#A0D2EB', // Muted blue
        enemyColor: '#FF4500' // OrangeRed
    },
    winter: {
        platformColors: ['#B0E0E6', '#ADD8E6', '#FFFFFF'], // Powder blue, light blue, white
        backgroundColor: '#E0FFFF', // Azure
        enemyColor: '#4682B4' // SteelBlue
    }
};

const themeNames = Object.keys(themes);

/**
 * Generates a new level dynamically based on the current level number.
 * @param {number} levelNum - The current level number.
 * @param {number} CANVAS_WIDTH - Canvas width constant.
 * @param {number} CANVAS_HEIGHT - Canvas height constant.
 * @param {object} player - Player object to calculate jump distances.
 * @returns {object} The generated level data.
 */
export function generateLevel(levelNum, CANVAS_WIDTH, CANVAS_HEIGHT, player) {
    console.log(`Generating Level: ${levelNum}`); // Added debug log
    const levelPlatforms = [];
    const levelCoins = [];
    const levelEnemies = [];
    const selectedThemeName = themeNames[Math.floor(Math.random() * themeNames.length)];
    const selectedTheme = themes[selectedThemeName];

    // Ground platform
    levelPlatforms.push({
        x: 0,
        y: CANVAS_HEIGHT - 40,
        width: 150 + Math.random() * 50, // Slightly variable start platform
        height: 40,
        color: selectedTheme.platformColors[0]
    });

    let currentX = levelPlatforms[0].x + levelPlatforms[0].width;
    let lastPlatformY = levelPlatforms[0].y;

    // Make levels longer for more exploration
    const totalLevelLength = CANVAS_WIDTH * (2 + levelNum * 0.5); // Levels get longer with level number
    const minPlatformWidth = 60;
    const maxPlatformWidth = 200;
    const minGap = player.width * 1.5; // Ensure Skirby can fit
    const maxGap = player.width * 4; // Max jump distance for base jump
    // Max height Skirby can jump up to. Using player.jumpPower (negative value)
    const maxVerticalJumpHeight = Math.abs(player.jumpPower) * 1.2; // A bit more than a single jump

    let platformsGenerated = 0;
    const maxPlatformsCount = 15 + levelNum * 2; // More platforms for higher levels

    while (currentX < totalLevelLength || platformsGenerated < maxPlatformsCount) {
        const gap = minGap + Math.random() * (maxGap - minGap);
        const platformX = currentX + gap;

        // Stop generating if we're past the total level length and have enough platforms
        if (platformX + minPlatformWidth > totalLevelLength && platformsGenerated >= 5) {
            break;
        }

        const platformWidth = minPlatformWidth + Math.random() * (maxPlatformWidth - minPlatformWidth);

        // Calculate reachable Y range for the next platform
        // Next platform can be higher by maxVerticalJumpHeight
        const minReachableY = Math.max(0, lastPlatformY - maxVerticalJumpHeight);
        // Next platform can be lower, but not fall too far
        const maxReachableY = Math.min(CANVAS_HEIGHT - 40, lastPlatformY + player.height * 2);

        let platformY = minReachableY + Math.random() * (maxReachableY - minReachableY);
        platformY = Math.max(platformY, CANVAS_HEIGHT - 200); // Prevent platforms from being too high up initially

        const platformColor = selectedTheme.platformColors[Math.floor(Math.random() * selectedTheme.platformColors.length)];

        const newPlatform = {
            x: platformX,
            y: platformY,
            width: platformWidth,
            height: 20 + Math.random() * 20, // Vary height
            color: platformColor
        };
        levelPlatforms.push(newPlatform);

        // Add coins on the platform
        if (Math.random() < 0.7) { // 70% chance to add coins
            const numCoins = Math.floor(Math.random() * 3) + 1;
            for (let i = 0; i < numCoins; i++) {
                levelCoins.push({
                    x: newPlatform.x + (newPlatform.width / (numCoins + 1)) * (i + 1),
                    y: newPlatform.y - 20, // Slightly above platform
                    radius: 10,
                    collected: false
                });
            }
        }

        // Add enemies on the platform
        if (Math.random() < 0.3 && newPlatform.width > 100) { // 30% chance, only on wider platforms
            const enemyX = newPlatform.x + newPlatform.width / 2;
            const enemyY = newPlatform.y - 30; // Position above platform
            const enemyRange = Math.min(newPlatform.width / 3, 70); // Enemy patrols within platform
            levelEnemies.push({
                x: enemyX,
                y: enemyY,
                width: 30,
                height: 30,
                speed: 1 + Math.random() * 0.5,
                dx: Math.random() > 0.5 ? 1 : -1,
                range: enemyRange,
                initialX: enemyX,
                color: selectedTheme.enemyColor,
                isDying: false,
                dy: 0
            });
        }

        currentX = newPlatform.x + newPlatform.width;
        lastPlatformY = newPlatform.y;
        platformsGenerated++;
    }

    // Ensure there's an exit platform at the very end of the generated path
    const lastGeneratedPlatform = levelPlatforms[levelPlatforms.length - 1];
    const exitX = lastGeneratedPlatform.x + lastGeneratedPlatform.width + 50; // Place exit after the last platform
    const exitY = CANVAS_HEIGHT - 80; // Always on ground level for exit

    levelPlatforms.push({
        x: exitX,
        y: exitY,
        width: 50,
        height: 40,
        color: '#FFD700' // Gold for exit
    });

    return {
        platforms: levelPlatforms,
        coins: levelCoins,
        enemies: levelEnemies,
        exit: { x: exitX, y: exitY, width: 50, height: 40, originalColor: '#FFD700' }, // Store original color for reset
        theme: selectedTheme,
        levelTotalWidth: exitX + 100 // Define total width of the level for camera clamping
    };
}

/**
 * Draws all platforms in the current level
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {array} platforms - Array of platform objects
 * @param {number} cameraX - Current camera X offset
 */
export function drawPlatforms(ctx, platforms, cameraX) {
    platforms.forEach(platform => {
        ctx.fillStyle = platform.color;
        // Draw platform with a subtle shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.fillRect(platform.x - cameraX, platform.y, platform.width, platform.height);
        ctx.shadowColor = 'transparent'; // Reset shadow

        // Add Lego-like studs (more detailed circles)
        const studSize = 5;
        const studColorTop = 'rgba(255,255,255,0.3)'; // Highlight
        const studColorSide = 'rgba(0,0,0,0.15)'; // Shadow
        for (let i = 0; i < platform.width; i += 15) {
            if (i + studSize < platform.width) { // Ensure stud fits within platform width
                // Draw stud base
                ctx.fillStyle = 'rgba(0,0,0,0.2)';
                ctx.beginPath();
                ctx.arc(platform.x + i + studSize - cameraX, platform.y + studSize, studSize, 0, Math.PI * 2);
                ctx.fill();

                // Draw stud highlight
                ctx.fillStyle = studColorTop;
                ctx.beginPath();
                ctx.arc(platform.x + i + studSize - cameraX - 1, platform.y + studSize - 1, studSize * 0.7, 0, Math.PI * 2);
                ctx.fill();

                // Draw stud shadow (right/bottom)
                ctx.fillStyle = studColorSide;
                ctx.beginPath();
                ctx.arc(platform.x + i + studSize - cameraX + 1, platform.y + studSize + 1, studSize * 0.7, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    });
}

/**
 * Draws the level exit
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {object} exit - Exit object
 * @param {number} cameraX - Current camera X offset
 */
export function drawExit(ctx, exit, cameraX) {
    ctx.fillStyle = exit.color; // Use current color (might be red for debug)
    ctx.fillRect(exit.x - cameraX, exit.y, exit.width, exit.height);
    ctx.fillStyle = 'white';
    ctx.font = '16px Inter';
    ctx.fillText('EXIT', exit.x + 5 - cameraX, exit.y + exit.height / 2 + 5);
}