import { makeStrataPlatform, warmStrata, makeCoin, makeEnemy, createExit, makeWaterHazard, makeLavaHazard } from './helpers.js';

export function buildLevelThree(context) {
    const { canvasHeight } = context;
    const groundHeight = 108;
    const baseY = canvasHeight - groundHeight;

    const glacierStrata = (light, mid, dark) => warmStrata(light, mid, dark);

    const platforms = [
        makeStrataPlatform(0, baseY, 600, groundHeight, glacierStrata('#b9ecff', '#7ec4ef', '#4a8cc8'), {
            grooves: 6,
            holes: [
                { x: 140, y: groundHeight * 0.54, rx: 24, ry: 16 },
                { x: 320, y: groundHeight * 0.34, rx: 19, ry: 12 },
                { x: 500, y: groundHeight * 0.6, rx: 22, ry: 14 }
            ]
        }),
        makeStrataPlatform(520, baseY - 90, 220, 82, glacierStrata('#b0e6ff', '#72bdec', '#3e84c2'), { grooves: 3 }),
        makeStrataPlatform(820, baseY - 160, 240, 82, glacierStrata('#b8eaff', '#78c2f1', '#4490d0'), {
            holes: [
                { x: 80, y: 46, rx: 20, ry: 13 },
                { x: 170, y: 36, rx: 16, ry: 10 }
            ]
        }),
        makeStrataPlatform(1090, baseY - 220, 250, 86, glacierStrata('#c0edff', '#82c8f2', '#4d95d3'), { grooves: 4 }),
        makeStrataPlatform(1380, baseY - 270, 230, 88, glacierStrata('#c7f1ff', '#8acef4', '#55a2dd'), {
            holes: [
                { x: 70, y: 50, rx: 19, ry: 12 },
                { x: 160, y: 40, rx: 15, ry: 10 }
            ]
        }),
        makeStrataPlatform(1620, baseY - 220, 300, 90, glacierStrata('#c0ecff', '#83c6f2', '#4f97d4'), { grooves: 4 }),
        makeStrataPlatform(1940, baseY - 150, 340, 92, glacierStrata('#b3e5ff', '#74bdef', '#3d84c3'), {
            holes: [
                { x: 150, y: 52, rx: 23, ry: 14 },
                { x: 260, y: 38, rx: 19, ry: 12 }
            ]
        }),
        makeStrataPlatform(2320, baseY - 210, 280, 90, glacierStrata('#bde9ff', '#7fc2f0', '#4791ce'), { grooves: 4 }),
        makeStrataPlatform(2620, baseY - 270, 260, 88, glacierStrata('#c5edff', '#89c9f3', '#519ad7'), {
            holes: [
                { x: 90, y: 48, rx: 20, ry: 13 },
                { x: 180, y: 38, rx: 16, ry: 10 }
            ]
        }),
        makeStrataPlatform(2900, baseY - 220, 300, 90, glacierStrata('#beeaff', '#7bbcF1', '#4a92d0'), { grooves: 4 }),
        makeStrataPlatform(3230, baseY - 160, 380, 100, glacierStrata('#b2e3ff', '#6fb6ed', '#3686c4'), {
            grooves: 6,
            holes: [
                { x: 150, y: 60, rx: 24, ry: 15 },
                { x: 300, y: 72, rx: 28, ry: 17 }
            ]
        })
    ];

    const coins = [
        makeCoin(200, baseY - 130),
        makeCoin(360, baseY - 130),
        makeCoin(560, baseY - 150),
        makeCoin(700, baseY - 200),
        makeCoin(760, baseY - 230),
        makeCoin(820, baseY - 200),
        makeCoin(940, baseY - 230),
        makeCoin(1000, baseY - 270),
        makeCoin(1060, baseY - 230),
        makeCoin(1220, baseY - 280),
        makeCoin(1280, baseY - 300),
        makeCoin(1340, baseY - 280),
        makeCoin(1460, baseY - 260),
        makeCoin(1540, baseY - 250),
        makeCoin(1620, baseY - 240),
        makeCoin(1760, baseY - 200),
        makeCoin(1860, baseY - 160),
        makeCoin(1980, baseY - 140),
        makeCoin(2100, baseY - 170),
        makeCoin(2200, baseY - 210),
        makeCoin(2320, baseY - 230),
        makeCoin(2400, baseY - 250),
        makeCoin(2480, baseY - 230),
        makeCoin(2560, baseY - 210),
        makeCoin(2640, baseY - 240),
        makeCoin(2720, baseY - 260),
        makeCoin(2800, baseY - 240),
        makeCoin(2920, baseY - 220),
        makeCoin(3020, baseY - 200),
        makeCoin(3120, baseY - 180),
        makeCoin(3220, baseY - 160),
        makeCoin(3340, baseY - 140),
        makeCoin(3440, baseY - 160)
    ];

    const enemies = [
        makeEnemy({ x: 640, y: baseY - 50, speed: 1.05, direction: -1, range: 120, color: '#7be0ff' }),
        makeEnemy({ x: 1180, y: baseY - 260, speed: 1.2, direction: 1, range: 100, color: '#7be0ff' }),
        makeEnemy({ x: 1680, y: baseY - 230, speed: 1.25, direction: -1, range: 140, color: '#7be0ff' }),
        makeEnemy({ x: 2140, y: baseY - 200, speed: 1.1, direction: 1, range: 150, color: '#7be0ff' }),
        makeEnemy({ x: 2560, y: baseY - 230, speed: 1.3, direction: -1, range: 120, color: '#7be0ff' }),
        makeEnemy({ x: 3080, y: baseY - 60, speed: 1.15, direction: 1, range: 160, color: '#7be0ff' }),
        makeEnemy({ x: 3380, y: baseY - 70, speed: 1.2, direction: -1, range: 150, color: '#7be0ff' })
    ];

    const backdrops = [
        {
            x: 180,
            y: baseY - 320,
            width: 660,
            height: 300,
            roundedRadius: 34,
            gradient: warmStrata('#9bd6ff', '#5ca8dd', '#2c6fa5'),
            detailColor: 'rgba(40, 84, 124, 0.32)',
            holes: [
                { x: 120, y: 100, rx: 30, ry: 18 },
                { x: 300, y: 150, rx: 26, ry: 16 },
                { x: 480, y: 120, rx: 24, ry: 15 }
            ]
        },
        {
            x: 980,
            y: baseY - 360,
            width: 600,
            height: 320,
            roundedRadius: 36,
            gradient: warmStrata('#a2dcff', '#5faedd', '#2b6aa1'),
            detailColor: 'rgba(38, 82, 128, 0.34)',
            holes: [
                { x: 130, y: 120, rx: 28, ry: 18 },
                { x: 320, y: 180, rx: 24, ry: 16 },
                { x: 500, y: 130, rx: 26, ry: 17 }
            ]
        },
        {
            x: 1760,
            y: baseY - 380,
            width: 640,
            height: 340,
            roundedRadius: 38,
            gradient: warmStrata('#a9e3ff', '#67b4e3', '#2f74ab'),
            detailColor: 'rgba(42, 90, 134, 0.34)',
            holes: [
                { x: 150, y: 130, rx: 30, ry: 19 },
                { x: 340, y: 200, rx: 26, ry: 17 },
                { x: 520, y: 140, rx: 28, ry: 18 }
            ]
        },
        {
            x: 2540,
            y: baseY - 360,
            width: 600,
            height: 320,
            roundedRadius: 36,
            gradient: warmStrata('#a2dcff', '#60b0e4', '#2d74a9'),
            detailColor: 'rgba(40, 88, 132, 0.34)',
            holes: [
                { x: 140, y: 120, rx: 30, ry: 18 },
                { x: 320, y: 180, rx: 24, ry: 16 },
                { x: 480, y: 130, rx: 26, ry: 17 }
            ]
        }
    ];

    const canopySegments = [
        { x: 80, y: baseY - 380, width: 380, height: 110, arcHeight: 104 },
        { x: 540, y: baseY - 400, width: 440, height: 118, arcHeight: 110 },
        { x: 1140, y: baseY - 420, width: 480, height: 124, arcHeight: 116 },
        { x: 1840, y: baseY - 430, width: 520, height: 130, arcHeight: 120 },
        { x: 2540, y: baseY - 420, width: 480, height: 124, arcHeight: 116 },
        { x: 3180, y: baseY - 400, width: 460, height: 120, arcHeight: 112 }
    ];

    const hazardBase = canvasHeight - 64;
    const hazards = [
        makeWaterHazard(600, hazardBase - 6, 220, 70, { flowSpeed: 1.4, direction: 1, waveAmplitude: 12 }),
        makeLavaHazard(1160, hazardBase + 2, 170, 62, { damage: 3, knockback: { x: -8, y: -14 }, glow: 0.75 }),
        makeWaterHazard(1720, hazardBase - 8, 260, 72, { flowSpeed: 1.3, direction: -1 }),
        makeLavaHazard(2260, hazardBase, 210, 64, { damage: 4, knockback: { x: 8, y: -14 }, pulseSpeed: 0.15 }),
        makeWaterHazard(2760, hazardBase - 10, 260, 74, { flowSpeed: 1.5, direction: 1, waveAmplitude: 14 }),
        makeLavaHazard(3280, hazardBase + 4, 200, 60, { damage: 4, knockback: { x: 0, y: -15 } })
    ];

    const exit = createExit(platforms[platforms.length - 1], { width: 80, height: 86 });

    const theme = {
        platformColors: ['#7ec4ef', '#4a8cc8', '#5faedc'],
        backgroundColor: '#e0f7ff',
        enemyColor: '#7be0ff'
    };

    return {
        layout: 'handcrafted_glacier_gorge',
        skyGradientStops: [
            { offset: 0, color: '#1b2f5e' },
            { offset: 0.2, color: '#223a75' },
            { offset: 0.45, color: '#3459a2' },
            { offset: 0.7, color: '#61a6df' },
            { offset: 1, color: '#c9f4ff' }
        ],
        canopySegments,
        backdrops,
        platforms,
    coins,
        enemies,
    hazards,
        exit,
        theme,
        levelTotalWidth: platforms[platforms.length - 1].x + platforms[platforms.length - 1].width + 300
    };
}
