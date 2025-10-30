import { buildLevelOne } from './level1.js';
import { buildLevelTwo } from './level2.js';
import { buildLevelThree } from './level3.js';
import { buildLevelFour } from './level4.js';
import { buildLevelFive } from './level5.js';
import { buildLevelSix } from './level6.js';
import { buildLevelSeven } from './level7.js';
import { buildLevelEight } from './level8.js';
import { buildLevelNine } from './level9.js';
import { buildLevelTen } from './level10.js';
import { makeStrataPlatform, warmStrata, makeCoin, makeEnemy, createExit, makeWaterHazard, makeLavaHazard } from './helpers.js';
import { generateProceduralLevel } from './procedural.js';

const handcraftedLevels = {
    1: buildLevelOne,
    2: buildLevelTwo,
    3: buildLevelThree,
    4: buildLevelFour,
    5: buildLevelFive,
    6: buildLevelSix,
    7: buildLevelSeven,
    8: buildLevelEight,
    9: buildLevelNine,
    10: buildLevelTen
};

function ensureCollections(levelData) {
    levelData.platforms = levelData.platforms || [];
    levelData.coins = levelData.coins || [];
    levelData.enemies = levelData.enemies || [];
    levelData.hazards = levelData.hazards || [];
    levelData.backdrops = levelData.backdrops || [];
    levelData.canopySegments = levelData.canopySegments || [];
    return levelData;
}

function boostExistingHazards(levelData, levelNum) {
    if (!levelData.hazards || !levelData.hazards.length) {
        return;
    }
    const difficulty = Math.max(0, levelNum - 1);
    levelData.hazards.forEach(hazard => {
        if (hazard.type === 'water') {
            hazard.flowSpeed = (hazard.flowSpeed ?? 1) + difficulty * 0.08;
            hazard.damage = Math.max(1, (hazard.damage ?? 1) + Math.floor(difficulty / 3));
            hazard.waveAmplitude = (hazard.waveAmplitude ?? 10) + difficulty * 0.8;
            hazard.waveLength = (hazard.waveLength ?? 140) + difficulty * 4;
        } else if (hazard.type === 'lava') {
            hazard.damage = Math.max(1, (hazard.damage ?? 2) + Math.floor(difficulty / 2));
            const baseKnockback = hazard.knockback || { x: 0, y: -14 };
            hazard.knockback = {
                x: baseKnockback.x + (difficulty % 2 === 0 ? 4 : -4),
                y: baseKnockback.y - Math.floor(difficulty / 2)
            };
            hazard.pulseSpeed = (hazard.pulseSpeed ?? 0.16) + difficulty * 0.01;
            hazard.glow = (hazard.glow ?? 0.6) + difficulty * 0.02;
        }
    });
}

function appendHazardGauntlet(levelData, levelNum, context) {
    const { canvasHeight } = context;
    const baseY = canvasHeight - 120;
    const startX = Math.max(levelData.exit?.x ?? 0, levelData.levelTotalWidth ?? 0) + 140;
    let cursorX = startX;
    const patternCount = Math.min(4 + Math.max(0, levelNum - 5), 8);

    for (let i = 0; i < patternCount; i++) {
        const hazardWidth = 220 + i * 26 + Math.max(0, levelNum - 5) * 22;
        const hazardIsLava = (i + levelNum) % 2 === 0;

        if (hazardIsLava) {
            levelData.hazards.push(makeLavaHazard(cursorX, baseY + 24, hazardWidth, 96, {
                damage: 3 + Math.floor(levelNum / 2) + i,
                knockback: { x: i % 2 === 0 ? -12 : 12, y: -18 - Math.floor(i / 2) },
                pulseSpeed: 0.18 + i * 0.02,
                glow: 0.72 + i * 0.04
            }));
        } else {
            levelData.hazards.push(makeWaterHazard(cursorX, baseY - 6, hazardWidth, 118, {
                flowSpeed: 1.6 + (levelNum - 5) * 0.2 + i * 0.14,
                direction: i % 2 === 0 ? 1 : -1,
                damage: 2 + Math.floor((levelNum - 4) / 2),
                waveAmplitude: 18 + i * 3,
                waveLength: 140 + i * 12,
                shimmer: 0.45
            }));
        }

        cursorX += hazardWidth + 60;

        const platformWidth = 150 + i * 24;
        const platformY = baseY - 90 - (i % 3) * 38;
        const platform = makeStrataPlatform(cursorX, platformY, platformWidth, 72, warmStrata('#f4c894', '#de8b43', '#b65f2d'), { grooves: 4 });
        levelData.platforms.push(platform);
        levelData.coins.push(makeCoin(cursorX + platformWidth * 0.5, platformY - 70));
        levelData.enemies.push(makeEnemy({
            x: cursorX + platformWidth / 2 - 20,
            y: platformY - 42,
            speed: 1.6 + 0.1 * i + Math.max(0, levelNum - 5) * 0.05,
            direction: i % 2 === 0 ? 1 : -1,
            range: Math.min(platformWidth - 40, 240),
            color: levelData.theme?.enemyColor ?? '#ff7ac9'
        }));

        if (levelData.backdrops) {
            levelData.backdrops.push({
                x: cursorX - platformWidth * 0.8,
                y: baseY - 420,
                width: platformWidth * 3,
                height: 340,
                roundedRadius: 34,
                gradient: warmStrata('#be93ff', '#8f57d9', '#5d2ca6'),
                detailColor: 'rgba(132, 92, 196, 0.28)',
                holes: []
            });
        }

        cursorX += platformWidth + 90;
    }

    const finalPlatform = levelData.platforms[levelData.platforms.length - 1];
    if (finalPlatform) {
        levelData.exit = createExit(finalPlatform, { width: 88, height: 110 });
        levelData.levelTotalWidth = levelData.exit.x + levelData.exit.width + 420;
    }
}

function enhanceLevel(levelNum, levelData, context) {
    ensureCollections(levelData);
    boostExistingHazards(levelData, levelNum);
    if (levelNum > 5) {
        appendHazardGauntlet(levelData, levelNum, context);
    } else if (levelData.exit) {
        levelData.levelTotalWidth = levelData.exit.x + levelData.exit.width + 320;
    }
    return levelData;
}

export const HANDCRAFTED_LEVEL_COUNT = Object.keys(handcraftedLevels).length;

export function generateLevel(levelNum, context) {
    if (!context) {
        throw new Error('generateLevel requires a context object describing the current game state');
    }

    const builder = handcraftedLevels[levelNum];
    if (builder) {
        const levelData = builder(context);
        return enhanceLevel(levelNum, levelData, context);
    }

    return generateProceduralLevel(levelNum, context);
}
