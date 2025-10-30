import { makeStrataPlatform, warmStrata, makeCoin, makeEnemy, createExit, makeWaterHazard, makeLavaHazard } from './helpers.js';

export function buildLevelSix(context) {
    const { canvasHeight } = context;
    const groundHeight = 110;
    const baseY = canvasHeight - groundHeight;

    const rainforestStrata = (light, mid, dark) => warmStrata(light, mid, dark);

    const platforms = [
        makeStrataPlatform(0, baseY, 700, groundHeight, rainforestStrata('#f8cc85', '#d99046', '#b46832'), {
            grooves: 6,
            holes: [
                { x: 200, y: groundHeight * 0.54, rx: 26, ry: 16 },
                { x: 380, y: groundHeight * 0.36, rx: 20, ry: 12 },
                { x: 580, y: groundHeight * 0.62, rx: 24, ry: 16 }
            ]
        }),
        makeStrataPlatform(640, baseY - 85, 280, 82, rainforestStrata('#f7c580', '#d48841', '#af5f2d'), { grooves: 4 }),
        makeStrataPlatform(940, baseY - 150, 300, 84, rainforestStrata('#f8cc8b', '#e3994f', '#bc6a35'), {
            holes: [
                { x: 100, y: 48, rx: 20, ry: 13 },
                { x: 200, y: 36, rx: 16, ry: 10 }
            ]
        }),
        makeStrataPlatform(1240, baseY - 210, 320, 88, rainforestStrata('#f8d295', '#e9a25d', '#c5743b'), { grooves: 4 }),
        makeStrataPlatform(1580, baseY - 260, 320, 92, rainforestStrata('#f8da9f', '#eeb06b', '#ce7e42'), {
            holes: [
                { x: 110, y: 52, rx: 22, ry: 14 },
                { x: 220, y: 40, rx: 17, ry: 11 }
            ]
        }),
        makeStrataPlatform(1900, baseY - 210, 360, 94, rainforestStrata('#f6c988', '#df9049', '#ba6433'), { grooves: 4 }),
        makeStrataPlatform(2280, baseY - 150, 380, 96, rainforestStrata('#f4bb77', '#d3783a', '#b05329'), {
            holes: [
                { x: 160, y: 56, rx: 26, ry: 16 },
                { x: 280, y: 42, rx: 20, ry: 12 }
            ]
        }),
        makeStrataPlatform(2680, baseY - 210, 360, 92, rainforestStrata('#f6c689', '#e2924d', '#bf6733'), { grooves: 4 }),
        makeStrataPlatform(3040, baseY - 260, 340, 94, rainforestStrata('#f7d59a', '#eda566', '#cb7539'), {
            holes: [
                { x: 120, y: 52, rx: 22, ry: 14 },
                { x: 230, y: 40, rx: 18, ry: 11 }
            ]
        }),
        makeStrataPlatform(3380, baseY - 210, 380, 96, rainforestStrata('#f6c07f', '#da8740', '#b65d2d'), { grooves: 4 }),
        makeStrataPlatform(3780, baseY - 140, 440, 104, rainforestStrata('#f4b171', '#cf6d36', '#aa4c25'), {
            grooves: 6,
            holes: [
                { x: 180, y: 62, rx: 26, ry: 16 },
                { x: 340, y: 80, rx: 30, ry: 18 }
            ]
        })
    ];

    const coins = [
        makeCoin(240, baseY - 120),
        makeCoin(440, baseY - 130),
        makeCoin(640, baseY - 150),
        makeCoin(820, baseY - 190),
        makeCoin(900, baseY - 220),
        makeCoin(980, baseY - 190),
        makeCoin(1140, baseY - 220),
        makeCoin(1220, baseY - 260),
        makeCoin(1300, baseY - 220),
        makeCoin(1460, baseY - 270),
        makeCoin(1540, baseY - 290),
        makeCoin(1620, baseY - 270),
        makeCoin(1740, baseY - 240),
        makeCoin(1820, baseY - 230),
        makeCoin(1900, baseY - 220),
        makeCoin(2040, baseY - 180),
        makeCoin(2140, baseY - 140),
        makeCoin(2260, baseY - 120),
        makeCoin(2380, baseY - 150),
        makeCoin(2480, baseY - 190),
        makeCoin(2600, baseY - 210),
        makeCoin(2680, baseY - 230),
        makeCoin(2760, baseY - 210),
        makeCoin(2840, baseY - 190),
        makeCoin(2920, baseY - 220),
        makeCoin(3000, baseY - 240),
        makeCoin(3080, baseY - 220),
        makeCoin(3200, baseY - 200),
        makeCoin(3300, baseY - 180),
        makeCoin(3400, baseY - 170),
        makeCoin(3520, baseY - 150),
        makeCoin(3660, baseY - 170),
        makeCoin(3800, baseY - 190),
        makeCoin(3940, baseY - 210)
    ];

    const enemies = [
        makeEnemy({ x: 720, y: baseY - 40, speed: 1.05, direction: -1, range: 140, color: '#ff8ca8' }),
        makeEnemy({ x: 1320, y: baseY - 240, speed: 1.2, direction: 1, range: 110, color: '#ff8ca8' }),
        makeEnemy({ x: 1880, y: baseY - 230, speed: 1.15, direction: -1, range: 160, color: '#ff8ca8' }),
        makeEnemy({ x: 2380, y: baseY - 160, speed: 1.2, direction: 1, range: 180, color: '#ff8ca8' }),
        makeEnemy({ x: 2860, y: baseY - 220, speed: 1.25, direction: -1, range: 150, color: '#ff8ca8' }),
        makeEnemy({ x: 3380, y: baseY - 80, speed: 1.15, direction: 1, range: 190, color: '#ff8ca8' }),
        makeEnemy({ x: 3840, y: baseY - 70, speed: 1.2, direction: -1, range: 180, color: '#ff8ca8' })
    ];

    const hazardBase = canvasHeight - 70;
    const hazards = [
        makeWaterHazard(720, hazardBase - 8, 280, 78, { flowSpeed: 1.6, direction: 1, waveAmplitude: 15 }),
        makeLavaHazard(1340, hazardBase + 2, 220, 66, { damage: 3, knockback: { x: -8, y: -14 }, glow: 0.74 }),
        makeWaterHazard(1940, hazardBase - 10, 320, 80, { flowSpeed: 1.8, direction: -1, waveAmplitude: 16 }),
        makeLavaHazard(2500, hazardBase + 4, 240, 66, { damage: 4, knockback: { x: 9, y: -15 } }),
        makeWaterHazard(3060, hazardBase - 12, 300, 82, { flowSpeed: 1.7, direction: 1, waveAmplitude: 18 }),
        makeLavaHazard(3540, hazardBase + 6, 240, 64, { damage: 5, knockback: { x: 0, y: -16 }, pulseSpeed: 0.18 })
    ];

    const backdrops = [
        {
            x: 260,
            y: baseY - 340,
            width: 720,
            height: 320,
            roundedRadius: 36,
            gradient: warmStrata('#83c98d', '#4aa25a', '#2f6f3c'),
            detailColor: 'rgba(48, 102, 61, 0.32)',
            holes: [
                { x: 150, y: 110, rx: 30, ry: 18 },
                { x: 360, y: 170, rx: 26, ry: 16 },
                { x: 560, y: 130, rx: 24, ry: 15 }
            ]
        },
        {
            x: 1080,
            y: baseY - 380,
            width: 700,
            height: 340,
            roundedRadius: 38,
            gradient: warmStrata('#8bd097', '#52a863', '#337743'),
            detailColor: 'rgba(52, 108, 70, 0.34)',
            holes: [
                { x: 160, y: 130, rx: 28, ry: 18 },
                { x: 360, y: 190, rx: 24, ry: 16 },
                { x: 540, y: 140, rx: 26, ry: 17 }
            ]
        },
        {
            x: 1900,
            y: baseY - 400,
            width: 720,
            height: 360,
            roundedRadius: 40,
            gradient: warmStrata('#92d49f', '#5ab06b', '#347a45'),
            detailColor: 'rgba(56, 114, 74, 0.34)',
            holes: [
                { x: 170, y: 140, rx: 30, ry: 19 },
                { x: 380, y: 210, rx: 26, ry: 17 },
                { x: 560, y: 150, rx: 28, ry: 18 }
            ]
        },
        {
            x: 2700,
            y: baseY - 380,
            width: 700,
            height: 340,
            roundedRadius: 38,
            gradient: warmStrata('#8fd39c', '#56ad68', '#357b46'),
            detailColor: 'rgba(54, 111, 72, 0.34)',
            holes: [
                { x: 160, y: 130, rx: 30, ry: 18 },
                { x: 360, y: 200, rx: 24, ry: 16 },
                { x: 540, y: 150, rx: 26, ry: 17 }
            ]
        }
    ];

    const canopySegments = [
        { x: 140, y: baseY - 410, width: 420, height: 114, arcHeight: 108 },
        { x: 660, y: baseY - 430, width: 480, height: 122, arcHeight: 116 },
        { x: 1340, y: baseY - 450, width: 520, height: 128, arcHeight: 122 },
        { x: 2060, y: baseY - 460, width: 560, height: 134, arcHeight: 126 },
        { x: 2760, y: baseY - 450, width: 520, height: 128, arcHeight: 122 },
        { x: 3400, y: baseY - 430, width: 500, height: 126, arcHeight: 120 }
    ];

    const exit = createExit(platforms[platforms.length - 1], { width: 86, height: 92 });

    const theme = {
        platformColors: ['#d99046', '#b46832', '#d48841'],
        backgroundColor: '#aeefff',
        enemyColor: '#ff8ca8'
    };

    return {
        layout: 'handcrafted_rainforest_run',
        skyGradientStops: [
            { offset: 0, color: '#60b8ff' },
            { offset: 0.2, color: '#7ed0ff' },
            { offset: 0.55, color: '#b9f2ff' },
            { offset: 1, color: '#f2ffff' }
        ],
        canopySegments,
        backdrops,
        platforms,
        coins,
        enemies,
        hazards,
        exit,
        theme,
        levelTotalWidth: platforms[platforms.length - 1].x + platforms[platforms.length - 1].width + 360
    };
}
