import { makeStrataPlatform, warmStrata, makeCoin, makeEnemy, createExit, makeWaterHazard, makeLavaHazard } from './helpers.js';

export function buildLevelFive(context) {
    const { canvasHeight } = context;
    const groundHeight = 108;
    const baseY = canvasHeight - groundHeight;

    const twilightStrata = (light, mid, dark) => warmStrata(light, mid, dark);

    const platforms = [
        makeStrataPlatform(0, baseY, 660, groundHeight, twilightStrata('#f7b4b2', '#df6f78', '#b74a55'), {
            grooves: 6,
            holes: [
                { x: 180, y: groundHeight * 0.55, rx: 26, ry: 16 },
                { x: 360, y: groundHeight * 0.34, rx: 19, ry: 12 },
                { x: 540, y: groundHeight * 0.6, rx: 24, ry: 15 }
            ]
        }),
        makeStrataPlatform(600, baseY - 90, 260, 84, twilightStrata('#f7afb0', '#dd6a74', '#b04551'), { grooves: 4 }),
        makeStrataPlatform(900, baseY - 160, 280, 86, twilightStrata('#f7b7b4', '#e1747e', '#b94e5a'), {
            holes: [
                { x: 90, y: 48, rx: 20, ry: 13 },
                { x: 190, y: 36, rx: 16, ry: 10 }
            ]
        }),
        makeStrataPlatform(1200, baseY - 220, 300, 90, twilightStrata('#f8c1bb', '#e3808b', '#c05a66'), { grooves: 4 }),
        makeStrataPlatform(1520, baseY - 280, 280, 92, twilightStrata('#f8c9c1', '#e68a95', '#c3616e'), {
            holes: [
                { x: 90, y: 54, rx: 21, ry: 13 },
                { x: 190, y: 42, rx: 17, ry: 11 }
            ]
        }),
        makeStrataPlatform(1800, baseY - 230, 340, 96, twilightStrata('#f6b8b1', '#dc7480', '#b75260'), { grooves: 5 }),
        makeStrataPlatform(2160, baseY - 160, 360, 98, twilightStrata('#f4a6a1', '#d0606d', '#a8414e'), {
            holes: [
                { x: 150, y: 58, rx: 26, ry: 16 },
                { x: 270, y: 42, rx: 20, ry: 12 }
            ]
        }),
        makeStrataPlatform(2540, baseY - 220, 340, 94, twilightStrata('#f6b8b2', '#df7582', '#b35464'), { grooves: 4 }),
        makeStrataPlatform(2900, baseY - 280, 320, 94, twilightStrata('#f7c3bc', '#e4818e', '#c05c68'), {
            holes: [
                { x: 120, y: 52, rx: 22, ry: 14 },
                { x: 220, y: 42, rx: 17, ry: 11 }
            ]
        }),
        makeStrataPlatform(3220, baseY - 220, 360, 98, twilightStrata('#f6b2ae', '#dd6e7d', '#b24b5e'), { grooves: 4 }),
        makeStrataPlatform(3600, baseY - 160, 420, 104, twilightStrata('#f39c97', '#cc5767', '#a03945'), {
            grooves: 6,
            holes: [
                { x: 180, y: 64, rx: 26, ry: 16 },
                { x: 320, y: 78, rx: 30, ry: 18 }
            ]
        })
    ];

    const coins = [
        makeCoin(220, baseY - 130),
        makeCoin(420, baseY - 140),
        makeCoin(620, baseY - 160),
        makeCoin(780, baseY - 210),
        makeCoin(860, baseY - 240),
        makeCoin(940, baseY - 210),
        makeCoin(1080, baseY - 240),
        makeCoin(1160, baseY - 280),
        makeCoin(1240, baseY - 240),
        makeCoin(1400, baseY - 300),
        makeCoin(1480, baseY - 320),
        makeCoin(1560, baseY - 300),
        makeCoin(1680, baseY - 260),
        makeCoin(1760, baseY - 250),
        makeCoin(1840, baseY - 240),
        makeCoin(1980, baseY - 200),
        makeCoin(2080, baseY - 160),
        makeCoin(2200, baseY - 140),
        makeCoin(2320, baseY - 170),
        makeCoin(2420, baseY - 210),
        makeCoin(2540, baseY - 230),
        makeCoin(2620, baseY - 250),
        makeCoin(2700, baseY - 230),
        makeCoin(2780, baseY - 210),
        makeCoin(2860, baseY - 240),
        makeCoin(2940, baseY - 260),
        makeCoin(3020, baseY - 240),
        makeCoin(3140, baseY - 220),
        makeCoin(3240, baseY - 200),
        makeCoin(3340, baseY - 190),
        makeCoin(3460, baseY - 170),
        makeCoin(3580, baseY - 150),
        makeCoin(3720, baseY - 170),
        makeCoin(3840, baseY - 190)
    ];

    const enemies = [
        makeEnemy({ x: 700, y: baseY - 50, speed: 1.1, direction: -1, range: 130, color: '#ff7fa5' }),
        makeEnemy({ x: 1260, y: baseY - 250, speed: 1.25, direction: 1, range: 100, color: '#ff7fa5' }),
        makeEnemy({ x: 1820, y: baseY - 240, speed: 1.2, direction: -1, range: 150, color: '#ff7fa5' }),
        makeEnemy({ x: 2320, y: baseY - 170, speed: 1.15, direction: 1, range: 170, color: '#ff7fa5' }),
        makeEnemy({ x: 2800, y: baseY - 230, speed: 1.3, direction: -1, range: 140, color: '#ff7fa5' }),
        makeEnemy({ x: 3320, y: baseY - 90, speed: 1.2, direction: 1, range: 180, color: '#ff7fa5' }),
        makeEnemy({ x: 3700, y: baseY - 80, speed: 1.25, direction: -1, range: 170, color: '#ff7fa5' })
    ];

    const hazardBase = canvasHeight - 66;
    const hazards = [
        makeWaterHazard(680, hazardBase - 6, 260, 72, { flowSpeed: 1.5, direction: 1, waveAmplitude: 14 }),
        makeLavaHazard(1280, hazardBase + 4, 210, 62, { damage: 3, knockback: { x: -8, y: -14 }, glow: 0.78 }),
        makeWaterHazard(1860, hazardBase - 10, 300, 76, { flowSpeed: 1.7, direction: -1 }),
        makeLavaHazard(2440, hazardBase + 2, 230, 64, { damage: 4, knockback: { x: 8, y: -15 } }),
        makeWaterHazard(2980, hazardBase - 12, 280, 78, { flowSpeed: 1.6, direction: 1, waveAmplitude: 16 }),
        makeLavaHazard(3460, hazardBase + 6, 220, 60, { damage: 5, knockback: { x: 0, y: -16 }, pulseSpeed: 0.2 })
    ];

    const backdrops = [
        {
            x: 240,
            y: baseY - 340,
            width: 700,
            height: 320,
            roundedRadius: 36,
            gradient: warmStrata('#857ad8', '#5a5aa4', '#32356f'),
            detailColor: 'rgba(60, 55, 120, 0.32)',
            holes: [
                { x: 140, y: 110, rx: 30, ry: 18 },
                { x: 340, y: 170, rx: 26, ry: 16 },
                { x: 540, y: 130, rx: 24, ry: 15 }
            ]
        },
        {
            x: 1020,
            y: baseY - 380,
            width: 660,
            height: 340,
            roundedRadius: 38,
            gradient: warmStrata('#8d83e2', '#615fb1', '#353977'),
            detailColor: 'rgba(66, 61, 130, 0.34)',
            holes: [
                { x: 150, y: 130, rx: 28, ry: 18 },
                { x: 340, y: 190, rx: 24, ry: 16 },
                { x: 520, y: 140, rx: 26, ry: 17 }
            ]
        },
        {
            x: 1820,
            y: baseY - 400,
            width: 700,
            height: 360,
            roundedRadius: 40,
            gradient: warmStrata('#948aeb', '#6765bb', '#3a3e84'),
            detailColor: 'rgba(70, 66, 138, 0.34)',
            holes: [
                { x: 160, y: 140, rx: 30, ry: 19 },
                { x: 360, y: 210, rx: 26, ry: 17 },
                { x: 540, y: 150, rx: 28, ry: 18 }
            ]
        },
        {
            x: 2600,
            y: baseY - 380,
            width: 660,
            height: 340,
            roundedRadius: 38,
            gradient: warmStrata('#8e85e4', '#6260b4', '#383b80'),
            detailColor: 'rgba(68, 63, 134, 0.34)',
            holes: [
                { x: 150, y: 130, rx: 30, ry: 18 },
                { x: 340, y: 200, rx: 24, ry: 16 },
                { x: 520, y: 150, rx: 26, ry: 17 }
            ]
        }
    ];

    const canopySegments = [
        { x: 120, y: baseY - 420, width: 400, height: 116, arcHeight: 110 },
        { x: 620, y: baseY - 440, width: 460, height: 124, arcHeight: 118 },
        { x: 1280, y: baseY - 460, width: 500, height: 130, arcHeight: 124 },
        { x: 2000, y: baseY - 470, width: 540, height: 136, arcHeight: 128 },
        { x: 2720, y: baseY - 460, width: 500, height: 130, arcHeight: 124 },
        { x: 3360, y: baseY - 440, width: 480, height: 128, arcHeight: 122 }
    ];

    const exit = createExit(platforms[platforms.length - 1], { width: 84, height: 90 });

    const theme = {
        platformColors: ['#df6f78', '#b74a55', '#dd6a74'],
        backgroundColor: '#d1c4ff',
        enemyColor: '#ff7fa5'
    };

    return {
        layout: 'handcrafted_twilight_ridge',
        skyGradientStops: [
            { offset: 0, color: '#2b255c' },
            { offset: 0.2, color: '#3f3776' },
            { offset: 0.5, color: '#6651ac' },
            { offset: 0.8, color: '#a585ef' },
            { offset: 1, color: '#f1e2ff' }
        ],
        canopySegments,
        backdrops,
        platforms,
        coins,
        enemies,
        hazards,
        exit,
        theme,
        levelTotalWidth: platforms[platforms.length - 1].x + platforms[platforms.length - 1].width + 340
    };
}
