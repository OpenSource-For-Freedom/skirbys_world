import { makeStrataPlatform, warmStrata, makeCoin, makeEnemy, createExit, makeWaterHazard, makeLavaHazard } from './helpers.js';

export function buildLevelSeven(context) {
    const { canvasHeight } = context;
    const groundHeight = 112;
    const baseY = canvasHeight - groundHeight;

    const sandstoneStrata = (light, mid, dark) => warmStrata(light, mid, dark);

    const platforms = [
        makeStrataPlatform(0, baseY, 720, groundHeight, sandstoneStrata('#f5c57a', '#d08b3f', '#aa5d28'), {
            grooves: 6,
            holes: [
                { x: 220, y: groundHeight * 0.54, rx: 28, ry: 17 },
                { x: 400, y: groundHeight * 0.36, rx: 20, ry: 12 },
                { x: 600, y: groundHeight * 0.62, rx: 24, ry: 16 }
            ]
        }),
        makeStrataPlatform(660, baseY - 90, 300, 86, sandstoneStrata('#f4be75', '#cb8239', '#a15526'), { grooves: 4 }),
        makeStrataPlatform(980, baseY - 160, 320, 88, sandstoneStrata('#f5c67f', '#d89245', '#b0632d'), {
            holes: [
                { x: 110, y: 50, rx: 22, ry: 14 },
                { x: 210, y: 38, rx: 17, ry: 11 }
            ]
        }),
        makeStrataPlatform(1300, baseY - 220, 340, 92, sandstoneStrata('#f6ce8b', '#df9f53', '#bf6f32'), { grooves: 4 }),
        makeStrataPlatform(1660, baseY - 280, 320, 96, sandstoneStrata('#f7d598', '#ebb066', '#ca7c3a'), {
            holes: [
                { x: 110, y: 54, rx: 22, ry: 14 },
                { x: 220, y: 42, rx: 18, ry: 11 }
            ]
        }),
        makeStrataPlatform(1980, baseY - 230, 360, 98, sandstoneStrata('#f3c07c', '#d1843c', '#b2622a'), { grooves: 4 }),
        makeStrataPlatform(2360, baseY - 160, 400, 102, sandstoneStrata('#f1ae6b', '#c57130', '#9d4a1f'), {
            holes: [
                { x: 170, y: 60, rx: 28, ry: 17 },
                { x: 300, y: 44, rx: 21, ry: 12 }
            ]
        }),
        makeStrataPlatform(2780, baseY - 220, 380, 100, sandstoneStrata('#f3be78', '#d1833a', '#af5b24'), { grooves: 4 }),
        makeStrataPlatform(3160, baseY - 280, 360, 98, sandstoneStrata('#f6cb87', '#e09a4f', '#bc6a2f'), {
            holes: [
                { x: 130, y: 54, rx: 24, ry: 15 },
                { x: 240, y: 42, rx: 18, ry: 11 }
            ]
        }),
        makeStrataPlatform(3500, baseY - 220, 400, 102, sandstoneStrata('#f4ba73', '#ce7f35', '#a85723'), { grooves: 4 }),
        makeStrataPlatform(3900, baseY - 160, 460, 112, sandstoneStrata('#ee9f61', '#c06128', '#984216'), {
            grooves: 6,
            holes: [
                { x: 200, y: 64, rx: 28, ry: 17 },
                { x: 360, y: 82, rx: 32, ry: 19 }
            ]
        })
    ];

    const coins = [
        makeCoin(260, baseY - 130),
        makeCoin(460, baseY - 140),
        makeCoin(660, baseY - 160),
        makeCoin(860, baseY - 200),
        makeCoin(940, baseY - 230),
        makeCoin(1020, baseY - 200),
        makeCoin(1180, baseY - 230),
        makeCoin(1260, baseY - 270),
        makeCoin(1340, baseY - 230),
        makeCoin(1500, baseY - 290),
        makeCoin(1580, baseY - 310),
        makeCoin(1660, baseY - 290),
        makeCoin(1780, baseY - 260),
        makeCoin(1860, baseY - 250),
        makeCoin(1940, baseY - 240),
        makeCoin(2080, baseY - 200),
        makeCoin(2200, baseY - 160),
        makeCoin(2320, baseY - 140),
        makeCoin(2440, baseY - 180),
        makeCoin(2540, baseY - 220),
        makeCoin(2660, baseY - 240),
        makeCoin(2740, baseY - 260),
        makeCoin(2820, baseY - 240),
        makeCoin(2900, baseY - 220),
        makeCoin(2980, baseY - 250),
        makeCoin(3060, baseY - 270),
        makeCoin(3140, baseY - 250),
        makeCoin(3260, baseY - 230),
        makeCoin(3360, baseY - 210),
        makeCoin(3460, baseY - 190),
        makeCoin(3580, baseY - 170),
        makeCoin(3720, baseY - 190),
        makeCoin(3860, baseY - 210),
        makeCoin(4000, baseY - 230)
    ];

    const enemies = [
        makeEnemy({ x: 760, y: baseY - 50, speed: 1.1, direction: -1, range: 150, color: '#ff8d78' }),
        makeEnemy({ x: 1380, y: baseY - 250, speed: 1.3, direction: 1, range: 120, color: '#ff8d78' }),
        makeEnemy({ x: 1960, y: baseY - 240, speed: 1.25, direction: -1, range: 170, color: '#ff8d78' }),
        makeEnemy({ x: 2500, y: baseY - 180, speed: 1.2, direction: 1, range: 190, color: '#ff8d78' }),
        makeEnemy({ x: 3020, y: baseY - 230, speed: 1.3, direction: -1, range: 160, color: '#ff8d78' }),
        makeEnemy({ x: 3540, y: baseY - 100, speed: 1.25, direction: 1, range: 200, color: '#ff8d78' }),
        makeEnemy({ x: 3980, y: baseY - 90, speed: 1.3, direction: -1, range: 190, color: '#ff8d78' })
    ];

    const hazardBase = canvasHeight - 72;
    const hazards = [
        makeWaterHazard(760, hazardBase - 10, 300, 82, { flowSpeed: 1.5, direction: 1, waveAmplitude: 15 }),
        makeLavaHazard(1420, hazardBase + 4, 240, 68, { damage: 4, knockback: { x: -9, y: -15 }, glow: 0.8 }),
        makeWaterHazard(2020, hazardBase - 12, 340, 84, { flowSpeed: 1.8, direction: -1, waveAmplitude: 16 }),
        makeLavaHazard(2600, hazardBase + 2, 260, 70, { damage: 4, knockback: { x: 10, y: -16 } }),
        makeWaterHazard(3180, hazardBase - 14, 320, 86, { flowSpeed: 1.7, direction: 1, waveAmplitude: 18 }),
        makeLavaHazard(3660, hazardBase + 6, 260, 68, { damage: 5, knockback: { x: 0, y: -17 }, pulseSpeed: 0.2 })
    ];

    const backdrops = [
        {
            x: 280,
            y: baseY - 340,
            width: 740,
            height: 320,
            roundedRadius: 36,
            gradient: warmStrata('#d6a25e', '#a97a3f', '#704d26'),
            detailColor: 'rgba(96, 70, 38, 0.32)',
            holes: [
                { x: 160, y: 110, rx: 32, ry: 19 },
                { x: 380, y: 170, rx: 28, ry: 17 },
                { x: 580, y: 130, rx: 24, ry: 15 }
            ]
        },
        {
            x: 1120,
            y: baseY - 380,
            width: 720,
            height: 340,
            roundedRadius: 38,
            gradient: warmStrata('#dbaa67', '#ad7e42', '#78542a'),
            detailColor: 'rgba(110, 80, 44, 0.34)',
            holes: [
                { x: 170, y: 130, rx: 30, ry: 18 },
                { x: 380, y: 190, rx: 26, ry: 16 },
                { x: 560, y: 140, rx: 26, ry: 17 }
            ]
        },
        {
            x: 1940,
            y: baseY - 400,
            width: 740,
            height: 360,
            roundedRadius: 40,
            gradient: warmStrata('#e0b26f', '#b48546', '#7f572a'),
            detailColor: 'rgba(120, 88, 48, 0.34)',
            holes: [
                { x: 180, y: 140, rx: 32, ry: 19 },
                { x: 400, y: 210, rx: 28, ry: 18 },
                { x: 580, y: 150, rx: 28, ry: 18 }
            ]
        },
        {
            x: 2760,
            y: baseY - 380,
            width: 720,
            height: 340,
            roundedRadius: 38,
            gradient: warmStrata('#d9ab68', '#af7f42', '#7c552b'),
            detailColor: 'rgba(118, 86, 46, 0.34)',
            holes: [
                { x: 170, y: 130, rx: 32, ry: 18 },
                { x: 380, y: 200, rx: 26, ry: 16 },
                { x: 560, y: 150, rx: 26, ry: 17 }
            ]
        }
    ];

    const canopySegments = [
        { x: 160, y: baseY - 420, width: 440, height: 118, arcHeight: 112 },
        { x: 700, y: baseY - 440, width: 500, height: 126, arcHeight: 120 },
        { x: 1420, y: baseY - 460, width: 540, height: 132, arcHeight: 124 },
        { x: 2160, y: baseY - 470, width: 580, height: 138, arcHeight: 130 },
        { x: 2880, y: baseY - 460, width: 540, height: 132, arcHeight: 124 },
        { x: 3520, y: baseY - 440, width: 520, height: 130, arcHeight: 122 }
    ];

    const exit = createExit(platforms[platforms.length - 1], { width: 88, height: 96 });

    const theme = {
        platformColors: ['#d08b3f', '#aa5d28', '#cb8239'],
        backgroundColor: '#ffe1b3',
        enemyColor: '#ff8d78'
    };

    return {
        layout: 'handcrafted_sandstone_canyon',
        skyGradientStops: [
            { offset: 0, color: '#f6b26b' },
            { offset: 0.2, color: '#fcd089' },
            { offset: 0.55, color: '#ffe7b7' },
            { offset: 1, color: '#fff8e8' }
        ],
        canopySegments,
        backdrops,
        platforms,
        coins,
        enemies,
        hazards,
        exit,
        theme,
        levelTotalWidth: platforms[platforms.length - 1].x + platforms[platforms.length - 1].width + 380
    };
}
