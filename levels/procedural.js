const themes = {
    spring: {
        platformColors: ['#8BC34A', '#CDDC39', '#A2D9CE'],
        backgroundColor: '#C8F0F6',
        enemyColor: '#FF00FF'
    },
    summer: {
        platformColors: ['#4CAF50', '#689F38', '#FFEB3B'],
        backgroundColor: '#87CEEB',
        enemyColor: '#00FFFF'
    },
    autumn: {
        platformColors: ['#FF5722', '#FF9800', '#795548'],
        backgroundColor: '#A0D2EB',
        enemyColor: '#FF4500'
    },
    winter: {
        platformColors: ['#B0E0E6', '#ADD8E6', '#FFFFFF'],
        backgroundColor: '#E0FFFF',
        enemyColor: '#4682B4'
    }
};
const themeNames = Object.keys(themes);

export function generateProceduralLevel(levelNum, context) {
    const {
        canvasWidth,
        canvasHeight,
        playerWidth,
        playerHeight,
        playerJumpPower
    } = context;

    const levelPlatforms = [];
    const levelCoins = [];
    const levelEnemies = [];
    const selectedThemeName = themeNames[Math.floor(Math.random() * themeNames.length)];
    const selectedTheme = themes[selectedThemeName];

    levelPlatforms.push({
        x: 0,
        y: canvasHeight - 40,
        width: 180 + Math.random() * 80,
        height: 40,
        color: selectedTheme.platformColors[0]
    });

    let currentX = levelPlatforms[0].x + levelPlatforms[0].width;
    let lastPlatformY = levelPlatforms[0].y;

    const totalLevelLength = canvasWidth * (2.4 + levelNum * 0.6);
    const minPlatformWidth = 70;
    const maxPlatformWidth = 220;
    const minGap = playerWidth * 1.6;
    const maxGap = playerWidth * 4.2;
    const maxVerticalJumpHeight = Math.abs(playerJumpPower) * 1.25;

    let platformsGenerated = 0;
    const maxPlatformsCount = 18 + levelNum * 3;

    while (currentX < totalLevelLength || platformsGenerated < maxPlatformsCount) {
        const gap = minGap + Math.random() * (maxGap - minGap);
        const platformX = currentX + gap;

        if (platformX + minPlatformWidth > totalLevelLength && platformsGenerated >= 5) {
            break;
        }

        const platformWidth = minPlatformWidth + Math.random() * (maxPlatformWidth - minPlatformWidth);

        const minReachableY = Math.max(0, lastPlatformY - maxVerticalJumpHeight);
        const maxReachableY = Math.min(canvasHeight - 40, lastPlatformY + playerHeight * 2.2);

        let platformY = minReachableY + Math.random() * (maxReachableY - minReachableY);
        platformY = Math.max(platformY, canvasHeight - 220);

        const platformColor = selectedTheme.platformColors[Math.floor(Math.random() * selectedTheme.platformColors.length)];

        const newPlatform = {
            x: platformX,
            y: platformY,
            width: platformWidth,
            height: 22 + Math.random() * 22,
            color: platformColor
        };
        levelPlatforms.push(newPlatform);

        if (Math.random() < 0.75) {
            const numCoins = Math.floor(Math.random() * 3) + 1;
            for (let i = 0; i < numCoins; i++) {
                levelCoins.push({
                    x: newPlatform.x + (newPlatform.width / (numCoins + 1)) * (i + 1),
                    y: newPlatform.y - 22,
                    radius: 10,
                    collected: false
                });
            }
        }

        if (Math.random() < 0.35 && newPlatform.width > 100) {
            const enemyX = newPlatform.x + newPlatform.width / 2;
            const enemyY = newPlatform.y - 30;
            const enemyRange = Math.min(newPlatform.width / 3, 80);
            levelEnemies.push({
                x: enemyX,
                y: enemyY,
                width: 30,
                height: 30,
                speed: 1 + Math.random() * 0.6,
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

    const lastGeneratedPlatform = levelPlatforms[levelPlatforms.length - 1];
    const exitX = lastGeneratedPlatform.x + lastGeneratedPlatform.width + 80;
    const exitY = canvasHeight - 90;

    levelPlatforms.push({
        x: exitX,
        y: exitY,
        width: 60,
        height: 45,
        color: '#FFD700'
    });

    const exit = {
        x: exitX,
        y: exitY,
        width: 60,
        height: 45,
        originalColor: '#FFD700'
    };
    exit.color = exit.originalColor;

    return {
        layout: 'procedural',
        platforms: levelPlatforms,
        coins: levelCoins,
        enemies: levelEnemies,
        exit,
        theme: selectedTheme,
        levelTotalWidth: exitX + 160
    };
}
