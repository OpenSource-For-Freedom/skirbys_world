import { makeStrataPlatform, warmStrata, makeCoin, makeEnemy, createExit, makeWaterHazard, makeLavaHazard } from './helpers.js';

export function buildLevelOne(context) {
    const { canvasHeight } = context;
    const groundHeight = 96;
    const baseY = canvasHeight - groundHeight;

    const platforms = [
        makeStrataPlatform(0, baseY, 520, groundHeight, warmStrata('#f6c891', '#e59052', '#c46838'), {
            grooves: 6,
            holes: [
                { x: 110, y: groundHeight * 0.52, rx: 20, ry: 13 },
                { x: 280, y: groundHeight * 0.32, rx: 16, ry: 10 },
                { x: 430, y: groundHeight * 0.6, rx: 22, ry: 14 }
            ]
        }),
        makeStrataPlatform(450, baseY - 70, 190, 70, warmStrata('#f7c68a', '#e18b4b', '#c06134'), { grooves: 3 }),
        makeStrataPlatform(680, baseY - 140, 210, 70, warmStrata('#f7c88f', '#e59853', '#cb6b37'), {
            holes: [
                { x: 70, y: 40, rx: 18, ry: 12 },
                { x: 150, y: 30, rx: 14, ry: 10 }
            ]
        }),
        makeStrataPlatform(920, baseY - 160, 220, 70, warmStrata('#f6d09a', '#eba35d', '#cc753c'), { grooves: 3 }),
        makeStrataPlatform(1180, baseY - 210, 200, 72, warmStrata('#f7d8a1', '#eeab68', '#d07b42'), {
            holes: [
                { x: 60, y: 45, rx: 18, ry: 12 },
                { x: 150, y: 32, rx: 13, ry: 9 }
            ]
        }),
        makeStrataPlatform(1420, baseY - 150, 260, 72, warmStrata('#f7d8a1', '#eaa062', '#cd7440'), { grooves: 4 }),
        makeStrataPlatform(1700, baseY - 90, 320, 80, warmStrata('#f5c381', '#de8642', '#c05f31'), {
            holes: [
                { x: 120, y: 45, rx: 22, ry: 14 },
                { x: 240, y: 30, rx: 18, ry: 11 }
            ]
        }),
        makeStrataPlatform(2050, baseY - 140, 240, 70, warmStrata('#f6c98c', '#e38f4d', '#c36433'), { grooves: 3 }),
        makeStrataPlatform(2300, baseY - 200, 210, 70, warmStrata('#f7d197', '#eba460', '#d17a42'), {
            holes: [
                { x: 70, y: 40, rx: 19, ry: 12 },
                { x: 160, y: 30, rx: 14, ry: 10 }
            ]
        }),
        makeStrataPlatform(2570, baseY - 140, 240, 70, warmStrata('#f5c585', '#dd8744', '#bf6031'), { grooves: 4 }),
        makeStrataPlatform(2850, baseY - 90, 360, 90, warmStrata('#f5bb77', '#df8140', '#bd582d'), {
            grooves: 6,
            holes: [
                { x: 120, y: 48, rx: 20, ry: 13 },
                { x: 240, y: 60, rx: 24, ry: 16 }
            ]
        })
    ];

    const coins = [
        makeCoin(180, baseY - 110),
        makeCoin(330, baseY - 130),
        makeCoin(520, baseY - 130),
        makeCoin(650, baseY - 170),
        makeCoin(720, baseY - 210),
        makeCoin(790, baseY - 170),
        makeCoin(960, baseY - 200),
        makeCoin(1005, baseY - 240),
        makeCoin(1050, baseY - 200),
        makeCoin(1230, baseY - 240),
        makeCoin(1290, baseY - 260),
        makeCoin(1350, baseY - 240),
        makeCoin(1480, baseY - 200),
        makeCoin(1560, baseY - 200),
        makeCoin(1640, baseY - 200),
        makeCoin(1780, baseY - 140),
        makeCoin(1860, baseY - 100),
        makeCoin(2120, baseY - 200),
        makeCoin(2200, baseY - 240),
        makeCoin(2280, baseY - 200),
        makeCoin(2440, baseY - 180),
        makeCoin(2510, baseY - 160),
        makeCoin(2630, baseY - 200),
        makeCoin(2710, baseY - 230),
        makeCoin(2790, baseY - 200),
        makeCoin(2920, baseY - 150),
        makeCoin(3020, baseY - 130),
        makeCoin(3120, baseY - 150)
    ];

    const enemies = [
        makeEnemy({ x: 600, y: baseY - 30, speed: 0.9, direction: -1, range: 90 }),
        makeEnemy({ x: 1120, y: baseY - 240, speed: 1.1, direction: 1, range: 70 }),
        makeEnemy({ x: 1760, y: baseY - 120, speed: 1.0, direction: -1, range: 120 }),
        makeEnemy({ x: 2440, y: baseY - 190, speed: 1.2, direction: 1, range: 90 }),
        makeEnemy({ x: 2980, y: baseY - 40, speed: 0.95, direction: -1, range: 140 })
    ];

    const backdrops = [
        {
            x: 220,
            y: baseY - 260,
            width: 640,
            height: 260,
            roundedRadius: 30,
            gradient: warmStrata('#f0ad6a', '#d37a3a', '#a8572b'),
            detailColor: 'rgba(118, 58, 28, 0.32)',
            holes: [
                { x: 100, y: 70, rx: 32, ry: 20 },
                { x: 260, y: 130, rx: 26, ry: 16 },
                { x: 400, y: 90, rx: 22, ry: 15 },
                { x: 520, y: 150, rx: 28, ry: 18 }
            ]
        },
        {
            x: 1020,
            y: baseY - 280,
            width: 520,
            height: 240,
            roundedRadius: 26,
            gradient: warmStrata('#f2bb7b', '#da8647', '#b35f33'),
            detailColor: 'rgba(124, 60, 28, 0.36)',
            holes: [
                { x: 90, y: 90, rx: 26, ry: 17 },
                { x: 210, y: 140, rx: 20, ry: 13 },
                { x: 360, y: 80, rx: 22, ry: 15 }
            ]
        },
        {
            x: 1700,
            y: baseY - 320,
            width: 620,
            height: 280,
            roundedRadius: 32,
            gradient: warmStrata('#f4c78a', '#de8f52', '#bf6538'),
            detailColor: 'rgba(119, 62, 30, 0.34)',
            holes: [
                { x: 120, y: 110, rx: 28, ry: 18 },
                { x: 300, y: 160, rx: 24, ry: 16 },
                { x: 460, y: 120, rx: 26, ry: 17 }
            ]
        },
        {
            x: 2480,
            y: baseY - 300,
            width: 540,
            height: 260,
            roundedRadius: 28,
            gradient: warmStrata('#f6d49b', '#e79d5a', '#c6743d'),
            detailColor: 'rgba(122, 60, 28, 0.34)',
            holes: [
                { x: 110, y: 100, rx: 28, ry: 18 },
                { x: 260, y: 140, rx: 22, ry: 15 },
                { x: 410, y: 90, rx: 24, ry: 16 }
            ]
        }
    ];

    const canopySegments = [
        { x: 120, y: baseY - 320, width: 360, height: 90, arcHeight: 82 },
        { x: 620, y: baseY - 340, width: 420, height: 95, arcHeight: 88 },
        { x: 1280, y: baseY - 350, width: 460, height: 100, arcHeight: 92 },
        { x: 1980, y: baseY - 360, width: 480, height: 105, arcHeight: 96 },
        { x: 2660, y: baseY - 350, width: 420, height: 98, arcHeight: 90 }
    ];

    const hazardBase = canvasHeight - 56;
    const hazards = [
        makeWaterHazard(520, hazardBase, 180, 56, { flowSpeed: 1.3, direction: 1 }),
        makeLavaHazard(1080, hazardBase + 4, 140, 52, { damage: 2, knockback: { x: -6, y: -11 }, glow: 0.7 }),
        makeWaterHazard(1580, hazardBase - 4, 220, 60, { flowSpeed: 1.1, direction: -1, waveAmplitude: 10 }),
        makeLavaHazard(2220, hazardBase + 2, 160, 54, { damage: 3, knockback: { x: 6, y: -12 } }),
        makeWaterHazard(2680, hazardBase - 6, 200, 62, { flowSpeed: 1.4, direction: 1 })
    ];

    const exit = createExit(platforms[platforms.length - 1], { width: 76, height: 78 });

    const theme = {
        platformColors: ['#e59052', '#c46838', '#de8f52'],
        backgroundColor: '#bde6ff',
        enemyColor: '#ff78b5'
    };

    return {
        layout: 'handcrafted_meadow_realistic',
        skyGradientStops: [
            { offset: 0, color: '#7fc4ff' },
            { offset: 0.28, color: '#aadeff' },
            { offset: 0.62, color: '#d6f3ff' },
            { offset: 1, color: '#f2fbff' }
        ],
        canopySegments,
        backdrops,
        platforms,
    coins,
        enemies,
    hazards,
        exit,
        theme,
        levelTotalWidth: platforms[platforms.length - 1].x + platforms[platforms.length - 1].width + 260
    };
}
