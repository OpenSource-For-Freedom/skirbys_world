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

export const HANDCRAFTED_LEVEL_COUNT = Object.keys(handcraftedLevels).length;

export function generateLevel(levelNum, context) {
    if (!context) {
        throw new Error('generateLevel requires a context object describing the current game state');
    }

    const builder = handcraftedLevels[levelNum];
    if (builder) {
        return builder(context);
    }

    return generateProceduralLevel(levelNum, context);
}
