import { makeStrataPlatform, warmStrata, makeCoin, makeEnemy, createExit, makeWaterHazard, makeLavaHazard } from './helpers.js';

export function buildLevelTen(context) {
    const { canvasHeight } = context;
    const groundHeight = 118;
    const baseY = canvasHeight - groundHeight;

    const auroraStrata = (light, mid, dark) => warmStrata(light, mid, dark);

    const platforms = [
        makeStrataPlatform(0, baseY, 800, groundHeight, auroraStrata('#f3c2ff', '#c87ded', '#8a4cb9'), {
            grooves: 6,
            holes: [
                { x: 260, y: groundHeight * 0.56, rx: 30, ry: 18 },
                { x: 440, y: groundHeight * 0.36, rx: 22, ry: 13 },
                { x: 660, y: groundHeight * 0.64, rx: 26, ry: 16 }
            ]
        }),
        makeStrataPlatform(740, baseY - 105, 340, 92, auroraStrata('#f2bbff', '#c173ea', '#8545b3'), { grooves: 4 }),
        makeStrataPlatform(1100, baseY - 180, 360, 94, auroraStrata('#f4c6ff', '#c882f0', '#8e52c0'), {
            holes: [
                { x: 130, y: 52, rx: 24, ry: 15 },
                { x: 240, y: 40, rx: 18, ry: 11 }
            ]
        }),
        makeStrataPlatform(1480, baseY - 240, 380, 100, auroraStrata('#f5d1ff', '#d090fb', '#9a5dcc'), { grooves: 4 }),
        makeStrataPlatform(1880, baseY - 300, 360, 104, auroraStrata('#f5ddff', '#d79efc', '#a068d5'), {
            holes: [
                { x: 130, y: 56, rx: 25, ry: 15 },
                { x: 240, y: 44, rx: 19, ry: 12 }
            ]
        }),
        makeStrataPlatform(2240, baseY - 250, 400, 106, auroraStrata('#f1c2ff', '#bf7cee', '#8747b6'), { grooves: 4 }),
        makeStrataPlatform(2660, baseY - 180, 440, 110, auroraStrata('#e9aaff', '#b55ae2', '#7c36a7'), {
            holes: [
                { x: 200, y: 64, rx: 30, ry: 18 },
                { x: 340, y: 46, rx: 22, ry: 12 }
            ]
        }),
        makeStrataPlatform(3120, baseY - 240, 420, 108, auroraStrata('#edb7ff', '#c670ee', '#8943b0'), { grooves: 4 }),
        makeStrataPlatform(3540, baseY - 300, 400, 106, auroraStrata('#f2c9ff', '#d17ff7', '#9950c4'), {
            holes: [
                { x: 150, y: 56, rx: 26, ry: 16 },
                { x: 260, y: 44, rx: 19, ry: 12 }
            ]
        }),
        makeStrataPlatform(3940, baseY - 240, 440, 110, auroraStrata('#edb1ff', '#c868f0', '#8b3eb3'), { grooves: 4 }),
        makeStrataPlatform(4380, baseY - 180, 500, 120, auroraStrata('#e290ff', '#b040da', '#7a24a1'), {
            grooves: 6,
            holes: [
                { x: 240, y: 68, rx: 32, ry: 19 },
                { x: 400, y: 86, rx: 34, ry: 20 }
            ]
        })
    ];

    const coins = [
        makeCoin(320, baseY - 160),
        makeCoin(540, baseY - 170),
        makeCoin(760, baseY - 190),
        makeCoin(980, baseY - 240),
        makeCoin(1060, baseY - 270),
        makeCoin(1140, baseY - 240),
        makeCoin(1300, baseY - 270),
        makeCoin(1380, baseY - 310),
        makeCoin(1460, baseY - 270),
        makeCoin(1620, baseY - 330),
        makeCoin(1700, baseY - 350),
        makeCoin(1780, baseY - 330),
        makeCoin(1900, baseY - 290),
        makeCoin(1980, baseY - 280),
        makeCoin(2060, baseY - 270),
        makeCoin(2200, baseY - 230),
        makeCoin(2320, baseY - 190),
        makeCoin(2440, baseY - 170),
        makeCoin(2560, baseY - 220),
        makeCoin(2660, baseY - 260),
        makeCoin(2760, baseY - 280),
        makeCoin(2840, baseY - 300),
        makeCoin(2920, baseY - 280),
        makeCoin(3000, baseY - 260),
        makeCoin(3080, baseY - 290),
        makeCoin(3160, baseY - 310),
        makeCoin(3240, baseY - 290),
        makeCoin(3360, baseY - 270),
        makeCoin(3460, baseY - 250),
        makeCoin(3560, baseY - 230),
        makeCoin(3680, baseY - 210),
        makeCoin(3820, baseY - 230),
        makeCoin(3960, baseY - 250),
        makeCoin(4100, baseY - 270),
        makeCoin(4280, baseY - 260),
        makeCoin(4440, baseY - 240)
    ];

    const enemies = [
        makeEnemy({ x: 860, y: baseY - 70, speed: 1.2, direction: -1, range: 170, color: '#ff9ae8' }),
        makeEnemy({ x: 1580, y: baseY - 270, speed: 1.4, direction: 1, range: 150, color: '#ff9ae8' }),
        makeEnemy({ x: 2200, y: baseY - 260, speed: 1.35, direction: -1, range: 200, color: '#ff9ae8' }),
        makeEnemy({ x: 2800, y: baseY - 200, speed: 1.3, direction: 1, range: 220, color: '#ff9ae8' }),
        makeEnemy({ x: 3340, y: baseY - 260, speed: 1.4, direction: -1, range: 190, color: '#ff9ae8' }),
        makeEnemy({ x: 3860, y: baseY - 130, speed: 1.35, direction: 1, range: 230, color: '#ff9ae8' }),
        makeEnemy({ x: 4360, y: baseY - 120, speed: 1.4, direction: -1, range: 220, color: '#ff9ae8' })
    ];

    const hazardBase = canvasHeight - 78;
    const hazards = [
        makeWaterHazard(880, hazardBase - 14, 360, 90, { flowSpeed: 1.5, direction: 1, waveAmplitude: 14 }),
        makeLavaHazard(1620, hazardBase + 2, 300, 74, { damage: 5, knockback: { x: -11, y: -17 }, glow: 0.82 }),
        makeWaterHazard(2240, hazardBase - 16, 400, 92, { flowSpeed: 1.7, direction: -1, waveAmplitude: 16 }),
        makeLavaHazard(2880, hazardBase + 4, 320, 76, { damage: 6, knockback: { x: 12, y: -18 }, pulseSpeed: 0.22 }),
        makeWaterHazard(3500, hazardBase - 18, 380, 94, { flowSpeed: 1.6, direction: 1, waveAmplitude: 18 }),
        makeLavaHazard(4020, hazardBase + 6, 320, 76, { damage: 7, knockback: { x: 0, y: -19 }, pulseSpeed: 0.24 })
    ];

    const backdrops = [
        {
            x: 340,
            y: baseY - 340,
            width: 800,
            height: 320,
            roundedRadius: 36,
            gradient: warmStrata('#a675ff', '#7a4bcc', '#4e2b8f'),
            detailColor: 'rgba(98, 70, 166, 0.32)',
            holes: [
                { x: 190, y: 120, rx: 32, ry: 19 },
                { x: 440, y: 180, rx: 28, ry: 17 },
                { x: 660, y: 140, rx: 26, ry: 16 }
            ]
        },
        {
            x: 1300,
            y: baseY - 380,
            width: 780,
            height: 340,
            roundedRadius: 38,
            gradient: warmStrata('#b481ff', '#8448d0', '#54279a'),
            detailColor: 'rgba(110, 74, 180, 0.34)',
            holes: [
                { x: 200, y: 130, rx: 30, ry: 18 },
                { x: 440, y: 190, rx: 26, ry: 16 },
                { x: 640, y: 150, rx: 26, ry: 17 }
            ]
        },
        {
            x: 2200,
            y: baseY - 400,
            width: 800,
            height: 360,
            roundedRadius: 40,
            gradient: warmStrata('#bf8bff', '#8a52d9', '#5b2ca6'),
            detailColor: 'rgba(120, 80, 190, 0.34)',
            holes: [
                { x: 210, y: 140, rx: 32, ry: 19 },
                { x: 460, y: 210, rx: 28, ry: 18 },
                { x: 680, y: 160, rx: 28, ry: 18 }
            ]
        },
        {
            x: 3060,
            y: baseY - 380,
            width: 780,
            height: 340,
            roundedRadius: 38,
            gradient: warmStrata('#b685ff', '#8d54db', '#5d2ea8'),
            detailColor: 'rgba(116, 78, 186, 0.34)',
            holes: [
                { x: 200, y: 130, rx: 32, ry: 18 },
                { x: 440, y: 200, rx: 26, ry: 16 },
                { x: 640, y: 150, rx: 26, ry: 17 }
            ]
        }
    ];

    const canopySegments = [
        { x: 220, y: baseY - 430, width: 500, height: 124, arcHeight: 118 },
        { x: 820, y: baseY - 450, width: 560, height: 132, arcHeight: 126 },
        { x: 1640, y: baseY - 470, width: 600, height: 138, arcHeight: 130 },
        { x: 2420, y: baseY - 480, width: 640, height: 144, arcHeight: 134 },
        { x: 3180, y: baseY - 470, width: 600, height: 138, arcHeight: 130 },
        { x: 3860, y: baseY - 450, width: 580, height: 136, arcHeight: 128 }
    ];

    const exit = createExit(platforms[platforms.length - 1], { width: 96, height: 104 });

    const theme = {
        platformColors: ['#c87ded', '#8a4cb9', '#c173ea'],
        backgroundColor: '#f4e6ff',
        enemyColor: '#ff9ae8'
    };

    return {
        layout: 'handcrafted_aurora_ascent',
        skyGradientStops: [
            { offset: 0, color: '#150b34' },
            { offset: 0.25, color: '#271854' },
            { offset: 0.5, color: '#472b83' },
            { offset: 0.75, color: '#814ab8' },
            { offset: 1, color: '#ffe2ff' }
        ],
        canopySegments,
        backdrops,
        platforms,
        coins,
        enemies,
        hazards,
        exit,
        theme,
        levelTotalWidth: platforms[platforms.length - 1].x + platforms[platforms.length - 1].width + 440
    };
}
