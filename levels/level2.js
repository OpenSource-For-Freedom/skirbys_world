import { makeStrataPlatform, warmStrata, makeCoin, makeEnemy, createExit, makeWaterHazard, makeLavaHazard } from './helpers.js';

export function buildLevelTwo(context) {
    const { canvasHeight } = context;
    const groundHeight = 102;
    const baseY = canvasHeight - groundHeight;

    const duskStrata = (
        light,
        mid,
        dark
    ) => warmStrata(light, mid, dark);

    const platforms = [
        makeStrataPlatform(0, baseY, 560, groundHeight, duskStrata('#f5b3a9', '#e06f77', '#b84f58'), {
            grooves: 6,
            holes: [
                { x: 120, y: groundHeight * 0.55, rx: 24, ry: 15 },
                { x: 340, y: groundHeight * 0.36, rx: 18, ry: 11 },
                { x: 470, y: groundHeight * 0.62, rx: 20, ry: 13 }
            ]
        }),
        makeStrataPlatform(500, baseY - 80, 210, 74, duskStrata('#f5afa4', '#de6b72', '#b44952'), { grooves: 3 }),
        makeStrataPlatform(780, baseY - 150, 230, 74, duskStrata('#f6b5a9', '#df7680', '#bb4f5c'), {
            holes: [
                { x: 80, y: 44, rx: 20, ry: 13 },
                { x: 170, y: 34, rx: 15, ry: 10 }
            ]
        }),
        makeStrataPlatform(1040, baseY - 200, 240, 78, duskStrata('#f6bfb4', '#e07882', '#bf5460'), { grooves: 4 }),
        makeStrataPlatform(1320, baseY - 240, 210, 80, duskStrata('#f7c4bb', '#e0818b', '#c05a67'), {
            holes: [
                { x: 60, y: 48, rx: 19, ry: 12 },
                { x: 150, y: 38, rx: 16, ry: 10 }
            ]
        }),
        makeStrataPlatform(1560, baseY - 190, 280, 82, duskStrata('#f6baaf', '#dc727f', '#b84e5b'), { grooves: 4 }),
        makeStrataPlatform(1870, baseY - 120, 320, 86, duskStrata('#f4a99f', '#d45f6d', '#ac4453'), {
            holes: [
                { x: 140, y: 48, rx: 23, ry: 14 },
                { x: 250, y: 34, rx: 18, ry: 11 }
            ]
        }),
        makeStrataPlatform(2220, baseY - 180, 260, 80, duskStrata('#f5b8ae', '#db6d7a', '#b94a57'), { grooves: 4 }),
        makeStrataPlatform(2480, baseY - 240, 230, 80, duskStrata('#f6c1b7', '#e07c88', '#bf5763'), {
            holes: [
                { x: 80, y: 44, rx: 20, ry: 13 },
                { x: 170, y: 36, rx: 16, ry: 10 }
            ]
        }),
        makeStrataPlatform(2720, baseY - 190, 280, 82, duskStrata('#f5b0a5', '#db6471', '#b44451'), { grooves: 4 }),
        makeStrataPlatform(3020, baseY - 130, 360, 92, duskStrata('#f49d92', '#d15362', '#a83847'), {
            grooves: 6,
            holes: [
                { x: 120, y: 54, rx: 24, ry: 15 },
                { x: 260, y: 66, rx: 27, ry: 16 }
            ]
        })
    ];

    const coins = [
        makeCoin(160, baseY - 120),
        makeCoin(320, baseY - 120),
        makeCoin(520, baseY - 140),
        makeCoin(660, baseY - 180),
        makeCoin(720, baseY - 210),
        makeCoin(780, baseY - 180),
        makeCoin(900, baseY - 210),
        makeCoin(960, baseY - 250),
        makeCoin(1020, baseY - 210),
        makeCoin(1180, baseY - 260),
        makeCoin(1240, baseY - 280),
        makeCoin(1300, baseY - 260),
        makeCoin(1420, baseY - 240),
        makeCoin(1500, baseY - 230),
        makeCoin(1580, baseY - 220),
        makeCoin(1720, baseY - 170),
        makeCoin(1820, baseY - 130),
        makeCoin(1930, baseY - 110),
        makeCoin(2050, baseY - 150),
        makeCoin(2140, baseY - 190),
        makeCoin(2260, baseY - 210),
        makeCoin(2360, baseY - 240),
        makeCoin(2460, baseY - 220),
        makeCoin(2540, baseY - 200),
        makeCoin(2620, baseY - 220),
        makeCoin(2700, baseY - 250),
        makeCoin(2780, baseY - 230),
        makeCoin(2900, baseY - 210),
        makeCoin(3000, baseY - 190),
        makeCoin(3100, baseY - 170),
        makeCoin(3200, baseY - 150)
    ];

    const enemies = [
        makeEnemy({ x: 620, y: baseY - 40, speed: 1.0, direction: -1, range: 110, color: '#ff85a2' }),
        makeEnemy({ x: 1120, y: baseY - 240, speed: 1.15, direction: 1, range: 90, color: '#ff85a2' }),
        makeEnemy({ x: 1680, y: baseY - 220, speed: 1.1, direction: -1, range: 120, color: '#ff85a2' }),
        makeEnemy({ x: 2140, y: baseY - 150, speed: 1.05, direction: 1, range: 130, color: '#ff85a2' }),
        makeEnemy({ x: 2620, y: baseY - 220, speed: 1.2, direction: -1, range: 110, color: '#ff85a2' }),
        makeEnemy({ x: 3060, y: baseY - 50, speed: 1.0, direction: 1, range: 150, color: '#ff85a2' })
    ];

    const backdrops = [
        {
            x: 160,
            y: baseY - 300,
            width: 620,
            height: 280,
            roundedRadius: 32,
            gradient: warmStrata('#f7a99e', '#d86e77', '#9f4550'),
            detailColor: 'rgba(126, 52, 60, 0.32)',
            holes: [
                { x: 110, y: 90, rx: 30, ry: 18 },
                { x: 260, y: 140, rx: 26, ry: 16 },
                { x: 420, y: 100, rx: 24, ry: 15 }
            ]
        },
        {
            x: 920,
            y: baseY - 340,
            width: 560,
            height: 300,
            roundedRadius: 34,
            gradient: warmStrata('#f6b3a8', '#d86e7a', '#9f4352'),
            detailColor: 'rgba(128, 54, 64, 0.34)',
            holes: [
                { x: 120, y: 110, rx: 28, ry: 18 },
                { x: 300, y: 160, rx: 24, ry: 16 },
                { x: 460, y: 120, rx: 26, ry: 17 }
            ]
        },
        {
            x: 1680,
            y: baseY - 360,
            width: 600,
            height: 320,
            roundedRadius: 36,
            gradient: warmStrata('#f8baa8', '#d96c78', '#993f4e'),
            detailColor: 'rgba(130, 56, 66, 0.36)',
            holes: [
                { x: 140, y: 120, rx: 30, ry: 19 },
                { x: 320, y: 180, rx: 26, ry: 17 },
                { x: 480, y: 140, rx: 28, ry: 18 }
            ]
        },
        {
            x: 2420,
            y: baseY - 340,
            width: 560,
            height: 300,
            roundedRadius: 34,
            gradient: warmStrata('#f7b4a6', '#d56773', '#973b48'),
            detailColor: 'rgba(132, 54, 62, 0.34)',
            holes: [
                { x: 130, y: 110, rx: 30, ry: 18 },
                { x: 300, y: 170, rx: 24, ry: 16 },
                { x: 450, y: 120, rx: 26, ry: 17 }
            ]
        }
    ];

    const canopySegments = [
        { x: 90, y: baseY - 360, width: 360, height: 100, arcHeight: 92 },
        { x: 540, y: baseY - 380, width: 420, height: 108, arcHeight: 100 },
        { x: 1120, y: baseY - 400, width: 460, height: 112, arcHeight: 104 },
        { x: 1780, y: baseY - 410, width: 480, height: 118, arcHeight: 108 },
        { x: 2440, y: baseY - 400, width: 440, height: 110, arcHeight: 102 },
        { x: 3020, y: baseY - 380, width: 420, height: 108, arcHeight: 100 }
    ];

    const hazardBase = canvasHeight - 60;
    const hazards = [
        makeWaterHazard(560, hazardBase - 4, 200, 64, { flowSpeed: 1.5, direction: -1, waveAmplitude: 12 }),
        makeLavaHazard(980, hazardBase + 2, 150, 58, { damage: 3, knockback: { x: -7, y: -13 }, glow: 0.65 }),
        makeWaterHazard(1500, hazardBase - 8, 260, 68, { flowSpeed: 1.2, direction: 1 }),
        makeLavaHazard(2100, hazardBase + 2, 190, 60, { damage: 3, knockback: { x: 7, y: -12 } }),
        makeWaterHazard(2560, hazardBase - 6, 240, 66, { flowSpeed: 1.6, direction: -1 }),
        makeLavaHazard(2980, hazardBase + 4, 160, 56, { damage: 4, knockback: { x: 0, y: -14 }, pulseSpeed: 0.16 })
    ];

    const exit = createExit(platforms[platforms.length - 1], { width: 78, height: 82 });

    const theme = {
        platformColors: ['#e06f77', '#b84f58', '#de6b72'],
        backgroundColor: '#e0c5ff',
        enemyColor: '#ff85a2'
    };

    return {
        layout: 'handcrafted_dusk_canyon',
        skyGradientStops: [
            { offset: 0, color: '#5c6ac4' },
            { offset: 0.25, color: '#7d75d8' },
            { offset: 0.55, color: '#a581e6' },
            { offset: 0.85, color: '#e8c1ff' },
            { offset: 1, color: '#f8e8ff' }
        ],
        canopySegments,
        backdrops,
        platforms,
    coins,
        enemies,
    hazards,
        exit,
        theme,
        levelTotalWidth: platforms[platforms.length - 1].x + platforms[platforms.length - 1].width + 280
    };
}
