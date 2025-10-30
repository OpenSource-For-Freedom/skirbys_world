import { makeStrataPlatform, warmStrata, makeCoin, makeEnemy, createExit, makeWaterHazard, makeLavaHazard } from './helpers.js';

export function buildLevelNine(context) {
    const { canvasHeight } = context;
    const groundHeight = 116;
    const baseY = canvasHeight - groundHeight;

    const frostStrata = (light, mid, dark) => warmStrata(light, mid, dark);

    const platforms = [
        makeStrataPlatform(0, baseY, 760, groundHeight, frostStrata('#cbe8ff', '#8bc4f5', '#4e8fce'), {
            grooves: 6,
            holes: [
                { x: 240, y: groundHeight * 0.56, rx: 28, ry: 17 },
                { x: 430, y: groundHeight * 0.38, rx: 21, ry: 13 },
                { x: 620, y: groundHeight * 0.64, rx: 24, ry: 16 }
            ]
        }),
        makeStrataPlatform(700, baseY - 100, 320, 90, frostStrata('#c4e3ff', '#82bbea', '#4c8cc8'), { grooves: 4 }),
        makeStrataPlatform(1040, baseY - 170, 350, 92, frostStrata('#cae7ff', '#8cc3f0', '#5196d8'), {
            holes: [
                { x: 120, y: 50, rx: 22, ry: 14 },
                { x: 230, y: 38, rx: 18, ry: 11 }
            ]
        }),
        makeStrataPlatform(1400, baseY - 230, 370, 98, frostStrata('#d2ecff', '#97cbf4', '#5aa1de'), { grooves: 4 }),
        makeStrataPlatform(1780, baseY - 290, 350, 102, frostStrata('#dbf2ff', '#a4d4f8', '#62a8e3'), {
            holes: [
                { x: 120, y: 54, rx: 24, ry: 15 },
                { x: 230, y: 42, rx: 18, ry: 11 }
            ]
        }),
        makeStrataPlatform(2140, baseY - 240, 380, 104, frostStrata('#c5e6ff', '#87bff0', '#4f92d2'), { grooves: 4 }),
        makeStrataPlatform(2540, baseY - 170, 420, 108, frostStrata('#b4dbff', '#76b2e6', '#3f7dbb'), {
            holes: [
                { x: 190, y: 62, rx: 28, ry: 17 },
                { x: 330, y: 44, rx: 21, ry: 12 }
            ]
        }),
        makeStrataPlatform(2980, baseY - 230, 400, 106, frostStrata('#c1e2ff', '#83bbee', '#4c90cf'), { grooves: 4 }),
        makeStrataPlatform(3380, baseY - 290, 380, 104, frostStrata('#cde9ff', '#91c6f2', '#5598d4'), {
            holes: [
                { x: 140, y: 54, rx: 25, ry: 15 },
                { x: 250, y: 42, rx: 18, ry: 11 }
            ]
        }),
        makeStrataPlatform(3740, baseY - 230, 420, 108, frostStrata('#bfe0ff', '#7cb5e7', '#4788c7'), { grooves: 4 }),
        makeStrataPlatform(4160, baseY - 170, 480, 118, frostStrata('#a3d1ff', '#5fa0d9', '#3473aa'), {
            grooves: 6,
            holes: [
                { x: 220, y: 66, rx: 30, ry: 18 },
                { x: 380, y: 84, rx: 32, ry: 19 }
            ]
        })
    ];

    const coins = [
        makeCoin(300, baseY - 150),
        makeCoin(500, baseY - 160),
        makeCoin(700, baseY - 180),
        makeCoin(920, baseY - 230),
        makeCoin(1000, baseY - 260),
        makeCoin(1080, baseY - 230),
        makeCoin(1240, baseY - 260),
        makeCoin(1320, baseY - 300),
        makeCoin(1400, baseY - 260),
        makeCoin(1560, baseY - 320),
        makeCoin(1640, baseY - 340),
        makeCoin(1720, baseY - 320),
        makeCoin(1840, baseY - 280),
        makeCoin(1920, baseY - 270),
        makeCoin(2000, baseY - 260),
        makeCoin(2140, baseY - 220),
        makeCoin(2260, baseY - 180),
        makeCoin(2380, baseY - 160),
        makeCoin(2500, baseY - 210),
        makeCoin(2600, baseY - 250),
        makeCoin(2700, baseY - 270),
        makeCoin(2780, baseY - 290),
        makeCoin(2860, baseY - 270),
        makeCoin(2940, baseY - 250),
        makeCoin(3020, baseY - 280),
        makeCoin(3100, baseY - 300),
        makeCoin(3180, baseY - 280),
        makeCoin(3300, baseY - 260),
        makeCoin(3400, baseY - 240),
        makeCoin(3500, baseY - 220),
        makeCoin(3620, baseY - 200),
        makeCoin(3760, baseY - 220),
        makeCoin(3900, baseY - 240),
        makeCoin(4040, baseY - 260)
    ];

    const enemies = [
        makeEnemy({ x: 820, y: baseY - 60, speed: 1.15, direction: -1, range: 160, color: '#8bf2ff' }),
        makeEnemy({ x: 1500, y: baseY - 260, speed: 1.35, direction: 1, range: 140, color: '#8bf2ff' }),
        makeEnemy({ x: 2100, y: baseY - 250, speed: 1.3, direction: -1, range: 190, color: '#8bf2ff' }),
        makeEnemy({ x: 2700, y: baseY - 190, speed: 1.25, direction: 1, range: 210, color: '#8bf2ff' }),
        makeEnemy({ x: 3220, y: baseY - 250, speed: 1.35, direction: -1, range: 180, color: '#8bf2ff' }),
        makeEnemy({ x: 3720, y: baseY - 120, speed: 1.3, direction: 1, range: 220, color: '#8bf2ff' }),
        makeEnemy({ x: 4180, y: baseY - 110, speed: 1.35, direction: -1, range: 210, color: '#8bf2ff' })
    ];

    const hazardBase = canvasHeight - 76;
    const hazards = [
        makeWaterHazard(840, hazardBase - 12, 340, 86, { flowSpeed: 1.3, direction: 1, waveAmplitude: 12 }),
        makeLavaHazard(1540, hazardBase + 2, 280, 72, { damage: 4, knockback: { x: -10, y: -16 }, glow: 0.78 }),
        makeWaterHazard(2160, hazardBase - 14, 380, 88, { flowSpeed: 1.5, direction: -1, waveAmplitude: 14 }),
        makeLavaHazard(2780, hazardBase + 4, 300, 74, { damage: 5, knockback: { x: 11, y: -17 } }),
        makeWaterHazard(3380, hazardBase - 16, 360, 90, { flowSpeed: 1.4, direction: 1, waveAmplitude: 16 }),
        makeLavaHazard(3900, hazardBase + 6, 300, 72, { damage: 6, knockback: { x: 0, y: -18 }, pulseSpeed: 0.22 })
    ];

    const backdrops = [
        {
            x: 320,
            y: baseY - 340,
            width: 780,
            height: 320,
            roundedRadius: 36,
            gradient: warmStrata('#7ac5ff', '#4799d6', '#275f99'),
            detailColor: 'rgba(54, 110, 164, 0.32)',
            holes: [
                { x: 180, y: 120, rx: 32, ry: 19 },
                { x: 420, y: 180, rx: 28, ry: 17 },
                { x: 640, y: 140, rx: 26, ry: 16 }
            ]
        },
        {
            x: 1240,
            y: baseY - 380,
            width: 760,
            height: 340,
            roundedRadius: 38,
            gradient: warmStrata('#82ccff', '#4d9edd', '#2a6aa2'),
            detailColor: 'rgba(58, 116, 176, 0.34)',
            holes: [
                { x: 190, y: 130, rx: 30, ry: 18 },
                { x: 420, y: 190, rx: 26, ry: 16 },
                { x: 620, y: 150, rx: 26, ry: 17 }
            ]
        },
        {
            x: 2100,
            y: baseY - 400,
            width: 780,
            height: 360,
            roundedRadius: 40,
            gradient: warmStrata('#8ad2ff', '#56a9e5', '#2f74b0'),
            detailColor: 'rgba(64, 126, 184, 0.34)',
            holes: [
                { x: 200, y: 140, rx: 32, ry: 19 },
                { x: 440, y: 210, rx: 28, ry: 18 },
                { x: 640, y: 160, rx: 28, ry: 18 }
            ]
        },
        {
            x: 2940,
            y: baseY - 380,
            width: 760,
            height: 340,
            roundedRadius: 38,
            gradient: warmStrata('#85cfff', '#4da3e0', '#2b6fab'),
            detailColor: 'rgba(60, 120, 182, 0.34)',
            holes: [
                { x: 190, y: 130, rx: 32, ry: 18 },
                { x: 420, y: 200, rx: 26, ry: 16 },
                { x: 620, y: 150, rx: 26, ry: 17 }
            ]
        }
    ];

    const canopySegments = [
        { x: 200, y: baseY - 430, width: 480, height: 122, arcHeight: 116 },
        { x: 780, y: baseY - 450, width: 540, height: 130, arcHeight: 124 },
        { x: 1560, y: baseY - 470, width: 580, height: 136, arcHeight: 128 },
        { x: 2320, y: baseY - 480, width: 620, height: 142, arcHeight: 132 },
        { x: 3060, y: baseY - 470, width: 580, height: 136, arcHeight: 128 },
        { x: 3720, y: baseY - 450, width: 560, height: 134, arcHeight: 126 }
    ];

    const exit = createExit(platforms[platforms.length - 1], { width: 92, height: 100 });

    const theme = {
        platformColors: ['#8bc4f5', '#4e8fce', '#82bbea'],
        backgroundColor: '#e6f8ff',
        enemyColor: '#8bf2ff'
    };

    return {
        layout: 'handcrafted_frosted_peaks',
        skyGradientStops: [
            { offset: 0, color: '#061831' },
            { offset: 0.25, color: '#0b2447' },
            { offset: 0.55, color: '#1e4a7e' },
            { offset: 0.82, color: '#4d81be' },
            { offset: 1, color: '#cbedff' }
        ],
        canopySegments,
        backdrops,
        platforms,
        coins,
        enemies,
        hazards,
        exit,
        theme,
        levelTotalWidth: platforms[platforms.length - 1].x + platforms[platforms.length - 1].width + 420
    };
}
