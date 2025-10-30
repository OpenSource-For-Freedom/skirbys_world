import { makeStrataPlatform, warmStrata, makeCoin, makeEnemy, createExit, makeWaterHazard, makeLavaHazard } from './helpers.js';

export function buildLevelFour(context) {
    const { canvasHeight } = context;
    const groundHeight = 100;
    const baseY = canvasHeight - groundHeight;

    const lushStrata = (light, mid, dark) => warmStrata(light, mid, dark);

    const platforms = [
        makeStrataPlatform(0, baseY, 620, groundHeight, lushStrata('#f8c688', '#e28d4a', '#c36536'), {
            grooves: 6,
            holes: [
                { x: 150, y: groundHeight * 0.52, rx: 24, ry: 15 },
                { x: 340, y: groundHeight * 0.34, rx: 18, ry: 11 },
                { x: 520, y: groundHeight * 0.6, rx: 22, ry: 14 }
            ]
        }),
        makeStrataPlatform(560, baseY - 80, 240, 76, lushStrata('#f7c182', '#dc8642', '#bb5d33'), { grooves: 4 }),
        makeStrataPlatform(860, baseY - 150, 260, 78, lushStrata('#f8ca8f', '#e5974f', '#c66a37'), {
            holes: [
                { x: 90, y: 46, rx: 20, ry: 13 },
                { x: 180, y: 34, rx: 15, ry: 10 }
            ]
        }),
        makeStrataPlatform(1140, baseY - 210, 280, 80, lushStrata('#f8d099', '#eba35a', '#d0743b'), { grooves: 4 }),
        makeStrataPlatform(1440, baseY - 260, 250, 84, lushStrata('#f9d7a4', '#efac67', '#d07c40'), {
            holes: [
                { x: 80, y: 52, rx: 20, ry: 13 },
                { x: 170, y: 42, rx: 16, ry: 10 }
            ]
        }),
        makeStrataPlatform(1700, baseY - 210, 320, 88, lushStrata('#f6c686', '#df8c44', '#c16633'), { grooves: 4 }),
        makeStrataPlatform(2040, baseY - 140, 360, 92, lushStrata('#f3b977', '#d5773b', '#bc542b'), {
            holes: [
                { x: 140, y: 54, rx: 24, ry: 15 },
                { x: 260, y: 38, rx: 18, ry: 11 }
            ]
        }),
        makeStrataPlatform(2420, baseY - 200, 320, 86, lushStrata('#f5c78a', '#e18f4a', '#c46833'), { grooves: 4 }),
        makeStrataPlatform(2760, baseY - 260, 300, 86, lushStrata('#f7d59b', '#eb9f58', '#cf723b'), {
            holes: [
                { x: 110, y: 50, rx: 22, ry: 14 },
                { x: 200, y: 40, rx: 16, ry: 10 }
            ]
        }),
        makeStrataPlatform(3080, baseY - 200, 340, 92, lushStrata('#f5c081', '#dd8741', '#be5f30'), { grooves: 4 }),
        makeStrataPlatform(3440, baseY - 140, 400, 98, lushStrata('#f3b272', '#d46f38', '#b15328'), {
            grooves: 6,
            holes: [
                { x: 160, y: 60, rx: 24, ry: 15 },
                { x: 300, y: 72, rx: 28, ry: 17 }
            ]
        })
    ];

    const coins = [
        makeCoin(200, baseY - 120),
        makeCoin(380, baseY - 130),
        makeCoin(560, baseY - 150),
        makeCoin(720, baseY - 190),
        makeCoin(800, baseY - 220),
        makeCoin(880, baseY - 190),
        makeCoin(1020, baseY - 220),
        makeCoin(1100, baseY - 260),
        makeCoin(1180, baseY - 220),
        makeCoin(1340, baseY - 270),
        makeCoin(1420, baseY - 290),
        makeCoin(1500, baseY - 270),
        makeCoin(1620, baseY - 240),
        makeCoin(1700, baseY - 230),
        makeCoin(1780, baseY - 220),
        makeCoin(1920, baseY - 180),
        makeCoin(2020, baseY - 140),
        makeCoin(2140, baseY - 120),
        makeCoin(2260, baseY - 160),
        makeCoin(2360, baseY - 200),
        makeCoin(2480, baseY - 220),
        makeCoin(2560, baseY - 240),
        makeCoin(2640, baseY - 220),
        makeCoin(2720, baseY - 200),
        makeCoin(2800, baseY - 230),
        makeCoin(2880, baseY - 250),
        makeCoin(2960, baseY - 230),
        makeCoin(3100, baseY - 210),
        makeCoin(3200, baseY - 190),
        makeCoin(3300, baseY - 170),
        makeCoin(3400, baseY - 160),
        makeCoin(3520, baseY - 140),
        makeCoin(3640, baseY - 160)
    ];

    const enemies = [
        makeEnemy({ x: 660, y: baseY - 40, speed: 1.05, direction: -1, range: 120, color: '#ff84b0' }),
        makeEnemy({ x: 1180, y: baseY - 240, speed: 1.2, direction: 1, range: 90, color: '#ff84b0' }),
        makeEnemy({ x: 1700, y: baseY - 230, speed: 1.1, direction: -1, range: 140, color: '#ff84b0' }),
        makeEnemy({ x: 2160, y: baseY - 160, speed: 1.15, direction: 1, range: 150, color: '#ff84b0' }),
        makeEnemy({ x: 2620, y: baseY - 210, speed: 1.2, direction: -1, range: 130, color: '#ff84b0' }),
        makeEnemy({ x: 3200, y: baseY - 70, speed: 1.1, direction: 1, range: 160, color: '#ff84b0' }),
        makeEnemy({ x: 3540, y: baseY - 60, speed: 1.15, direction: -1, range: 150, color: '#ff84b0' })
    ];

    const hazardBase = canvasHeight - 62;
    const hazards = [
        makeWaterHazard(640, hazardBase - 6, 240, 70, { flowSpeed: 1.4, direction: 1, waveAmplitude: 12 }),
        makeLavaHazard(1220, hazardBase + 2, 190, 60, { damage: 3, knockback: { x: -7, y: -13 }, glow: 0.72 }),
        makeWaterHazard(1760, hazardBase - 8, 280, 72, { flowSpeed: 1.6, direction: -1, waveAmplitude: 14 }),
        makeLavaHazard(2340, hazardBase + 2, 210, 62, { damage: 4, knockback: { x: 8, y: -14 } }),
        makeWaterHazard(2860, hazardBase - 10, 260, 74, { flowSpeed: 1.5, direction: 1 }),
        makeLavaHazard(3340, hazardBase + 4, 200, 60, { damage: 4, knockback: { x: 0, y: -15 }, pulseSpeed: 0.18 })
    ];

    const backdrops = [
        {
            x: 220,
            y: baseY - 320,
            width: 680,
            height: 300,
            roundedRadius: 34,
            gradient: warmStrata('#92d28d', '#4d9c57', '#2f6d34'),
            detailColor: 'rgba(56, 102, 61, 0.32)',
            holes: [
                { x: 120, y: 100, rx: 30, ry: 18 },
                { x: 320, y: 150, rx: 26, ry: 16 },
                { x: 520, y: 110, rx: 24, ry: 15 }
            ]
        },
        {
            x: 980,
            y: baseY - 360,
            width: 620,
            height: 320,
            roundedRadius: 36,
            gradient: warmStrata('#99d795', '#56a862', '#32743d'),
            detailColor: 'rgba(60, 110, 68, 0.34)',
            holes: [
                { x: 130, y: 120, rx: 28, ry: 18 },
                { x: 320, y: 180, rx: 24, ry: 16 },
                { x: 500, y: 130, rx: 26, ry: 17 }
            ]
        },
        {
            x: 1760,
            y: baseY - 380,
            width: 660,
            height: 340,
            roundedRadius: 38,
            gradient: warmStrata('#a0dca0', '#61b06c', '#357843'),
            detailColor: 'rgba(64, 118, 72, 0.34)',
            holes: [
                { x: 150, y: 130, rx: 30, ry: 19 },
                { x: 340, y: 200, rx: 26, ry: 17 },
                { x: 520, y: 140, rx: 28, ry: 18 }
            ]
        },
        {
            x: 2540,
            y: baseY - 360,
            width: 620,
            height: 320,
            roundedRadius: 36,
            gradient: warmStrata('#9ad99a', '#5bac65', '#347741'),
            detailColor: 'rgba(62, 115, 70, 0.34)',
            holes: [
                { x: 140, y: 120, rx: 30, ry: 18 },
                { x: 320, y: 180, rx: 24, ry: 16 },
                { x: 480, y: 130, rx: 26, ry: 17 }
            ]
        }
    ];

    const canopySegments = [
        { x: 100, y: baseY - 390, width: 380, height: 110, arcHeight: 104 },
        { x: 580, y: baseY - 410, width: 440, height: 118, arcHeight: 110 },
        { x: 1220, y: baseY - 430, width: 480, height: 124, arcHeight: 116 },
        { x: 1920, y: baseY - 440, width: 520, height: 130, arcHeight: 120 },
        { x: 2620, y: baseY - 430, width: 480, height: 124, arcHeight: 116 },
        { x: 3260, y: baseY - 410, width: 460, height: 120, arcHeight: 112 }
    ];

    const exit = createExit(platforms[platforms.length - 1], { width: 82, height: 88 });

    const theme = {
        platformColors: ['#e28d4a', '#c36536', '#dc8642'],
        backgroundColor: '#b8f2ff',
        enemyColor: '#ff84b0'
    };

    return {
        layout: 'handcrafted_highland_falls',
        skyGradientStops: [
            { offset: 0, color: '#6fb6ff' },
            { offset: 0.22, color: '#90cbff' },
            { offset: 0.56, color: '#c6ecff' },
            { offset: 1, color: '#f2fcff' }
        ],
        canopySegments,
        backdrops,
        platforms,
        coins,
        enemies,
        hazards,
        exit,
        theme,
        levelTotalWidth: platforms[platforms.length - 1].x + platforms[platforms.length - 1].width + 320
    };
}
