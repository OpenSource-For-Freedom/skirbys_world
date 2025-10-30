import { makeStrataPlatform, warmStrata, makeCoin, makeEnemy, createExit, makeWaterHazard, makeLavaHazard } from './helpers.js';

export function buildLevelEight(context) {
    const { canvasHeight } = context;
    const groundHeight = 114;
    const baseY = canvasHeight - groundHeight;

    const magmaStrata = (light, mid, dark) => warmStrata(light, mid, dark);

    const platforms = [
        makeStrataPlatform(0, baseY, 740, groundHeight, magmaStrata('#f4a066', '#cd6a2b', '#973f19'), {
            grooves: 6,
            holes: [
                { x: 240, y: groundHeight * 0.56, rx: 28, ry: 17 },
                { x: 420, y: groundHeight * 0.36, rx: 20, ry: 12 },
                { x: 620, y: groundHeight * 0.64, rx: 24, ry: 16 }
            ]
        }),
        makeStrataPlatform(680, baseY - 95, 320, 88, magmaStrata('#f39a5e', '#c76329', '#923915'), { grooves: 4 }),
        makeStrataPlatform(1020, baseY - 170, 340, 90, magmaStrata('#f4a468', '#d17232', '#a0451d'), {
            holes: [
                { x: 120, y: 50, rx: 22, ry: 14 },
                { x: 220, y: 38, rx: 18, ry: 11 }
            ]
        }),
        makeStrataPlatform(1380, baseY - 230, 360, 96, magmaStrata('#f5ad71', '#d8803d', '#ad5324'), { grooves: 4 }),
        makeStrataPlatform(1760, baseY - 290, 340, 100, magmaStrata('#f6b77d', '#e18e4b', '#b7612d'), {
            holes: [
                { x: 120, y: 54, rx: 24, ry: 15 },
                { x: 230, y: 42, rx: 18, ry: 11 }
            ]
        }),
        makeStrataPlatform(2100, baseY - 240, 380, 102, magmaStrata('#f3a367', '#d27233', '#a0461e'), { grooves: 4 }),
        makeStrataPlatform(2500, baseY - 170, 420, 106, magmaStrata('#ee8f53', '#c05a1f', '#8d3511'), {
            holes: [
                { x: 180, y: 62, rx: 28, ry: 17 },
                { x: 320, y: 44, rx: 21, ry: 12 }
            ]
        }),
        makeStrataPlatform(2940, baseY - 230, 400, 104, magmaStrata('#f19b60', '#cd6828', '#963b17'), { grooves: 4 }),
        makeStrataPlatform(3340, baseY - 290, 380, 102, magmaStrata('#f4aa6f', '#d77d39', '#a8511f'), {
            holes: [
                { x: 140, y: 54, rx: 25, ry: 15 },
                { x: 250, y: 42, rx: 18, ry: 11 }
            ]
        }),
        makeStrataPlatform(3700, baseY - 230, 420, 106, magmaStrata('#f09a5d', '#c86029', '#923716'), { grooves: 4 }),
        makeStrataPlatform(4120, baseY - 170, 480, 116, magmaStrata('#eb7e3e', '#b54314', '#84270a'), {
            grooves: 6,
            holes: [
                { x: 220, y: 66, rx: 30, ry: 18 },
                { x: 380, y: 84, rx: 32, ry: 19 }
            ]
        })
    ];

    const coins = [
        makeCoin(280, baseY - 140),
        makeCoin(480, baseY - 150),
        makeCoin(680, baseY - 170),
        makeCoin(900, baseY - 220),
        makeCoin(980, baseY - 250),
        makeCoin(1060, baseY - 220),
        makeCoin(1220, baseY - 250),
        makeCoin(1300, baseY - 290),
        makeCoin(1380, baseY - 250),
        makeCoin(1540, baseY - 310),
        makeCoin(1620, baseY - 330),
        makeCoin(1700, baseY - 310),
        makeCoin(1820, baseY - 270),
        makeCoin(1900, baseY - 260),
        makeCoin(1980, baseY - 250),
        makeCoin(2120, baseY - 210),
        makeCoin(2240, baseY - 170),
        makeCoin(2360, baseY - 150),
        makeCoin(2480, baseY - 200),
        makeCoin(2580, baseY - 240),
        makeCoin(2680, baseY - 260),
        makeCoin(2760, baseY - 280),
        makeCoin(2840, baseY - 260),
        makeCoin(2920, baseY - 240),
        makeCoin(3000, baseY - 270),
        makeCoin(3080, baseY - 290),
        makeCoin(3160, baseY - 270),
        makeCoin(3280, baseY - 250),
        makeCoin(3380, baseY - 230),
        makeCoin(3480, baseY - 210),
        makeCoin(3600, baseY - 190),
        makeCoin(3740, baseY - 210),
        makeCoin(3880, baseY - 230),
        makeCoin(4020, baseY - 250)
    ];

    const enemies = [
        makeEnemy({ x: 800, y: baseY - 60, speed: 1.2, direction: -1, range: 160, color: '#ff9672' }),
        makeEnemy({ x: 1440, y: baseY - 260, speed: 1.35, direction: 1, range: 130, color: '#ff9672' }),
        makeEnemy({ x: 2040, y: baseY - 250, speed: 1.3, direction: -1, range: 180, color: '#ff9672' }),
        makeEnemy({ x: 2620, y: baseY - 190, speed: 1.25, direction: 1, range: 200, color: '#ff9672' }),
        makeEnemy({ x: 3120, y: baseY - 250, speed: 1.35, direction: -1, range: 170, color: '#ff9672' }),
        makeEnemy({ x: 3640, y: baseY - 110, speed: 1.3, direction: 1, range: 210, color: '#ff9672' }),
        makeEnemy({ x: 4100, y: baseY - 100, speed: 1.35, direction: -1, range: 200, color: '#ff9672' })
    ];

    const hazardBase = canvasHeight - 74;
    const hazards = [
        makeWaterHazard(820, hazardBase - 12, 320, 84, { flowSpeed: 1.4, direction: 1, waveAmplitude: 12 }),
        makeLavaHazard(1480, hazardBase + 2, 260, 70, { damage: 4, knockback: { x: -10, y: -16 }, glow: 0.85 }),
        makeWaterHazard(2100, hazardBase - 14, 360, 86, { flowSpeed: 1.7, direction: -1, waveAmplitude: 14 }),
        makeLavaHazard(2700, hazardBase + 4, 280, 72, { damage: 5, knockback: { x: 11, y: -17 } }),
        makeWaterHazard(3280, hazardBase - 16, 340, 88, { flowSpeed: 1.6, direction: 1, waveAmplitude: 16 }),
        makeLavaHazard(3800, hazardBase + 6, 280, 70, { damage: 6, knockback: { x: 0, y: -18 }, pulseSpeed: 0.22 })
    ];

    const backdrops = [
        {
            x: 300,
            y: baseY - 340,
            width: 760,
            height: 320,
            roundedRadius: 36,
            gradient: warmStrata('#d06e3f', '#a04a25', '#6d2f15'),
            detailColor: 'rgba(120, 70, 40, 0.32)',
            holes: [
                { x: 170, y: 120, rx: 32, ry: 19 },
                { x: 400, y: 180, rx: 28, ry: 17 },
                { x: 600, y: 140, rx: 26, ry: 16 }
            ]
        },
        {
            x: 1180,
            y: baseY - 380,
            width: 740,
            height: 340,
            roundedRadius: 38,
            gradient: warmStrata('#d57543', '#a94f28', '#733317'),
            detailColor: 'rgba(128, 76, 44, 0.34)',
            holes: [
                { x: 180, y: 130, rx: 30, ry: 18 },
                { x: 400, y: 190, rx: 26, ry: 16 },
                { x: 580, y: 150, rx: 26, ry: 17 }
            ]
        },
        {
            x: 2020,
            y: baseY - 400,
            width: 760,
            height: 360,
            roundedRadius: 40,
            gradient: warmStrata('#db7e48', '#af562c', '#7a3819'),
            detailColor: 'rgba(136, 82, 46, 0.34)',
            holes: [
                { x: 190, y: 140, rx: 32, ry: 19 },
                { x: 420, y: 210, rx: 28, ry: 18 },
                { x: 620, y: 160, rx: 28, ry: 18 }
            ]
        },
        {
            x: 2860,
            y: baseY - 380,
            width: 740,
            height: 340,
            roundedRadius: 38,
            gradient: warmStrata('#d67744', '#ab5129', '#783417'),
            detailColor: 'rgba(132, 78, 44, 0.34)',
            holes: [
                { x: 180, y: 130, rx: 32, ry: 18 },
                { x: 400, y: 200, rx: 26, ry: 16 },
                { x: 580, y: 150, rx: 26, ry: 17 }
            ]
        }
    ];

    const canopySegments = [
        { x: 180, y: baseY - 430, width: 460, height: 120, arcHeight: 114 },
        { x: 740, y: baseY - 450, width: 520, height: 128, arcHeight: 122 },
        { x: 1480, y: baseY - 470, width: 560, height: 134, arcHeight: 126 },
        { x: 2240, y: baseY - 480, width: 600, height: 140, arcHeight: 130 },
        { x: 2980, y: baseY - 470, width: 560, height: 134, arcHeight: 126 },
        { x: 3640, y: baseY - 450, width: 540, height: 132, arcHeight: 124 }
    ];

    const exit = createExit(platforms[platforms.length - 1], { width: 90, height: 98 });

    const theme = {
        platformColors: ['#cd6a2b', '#973f19', '#c76329'],
        backgroundColor: '#ffcca8',
        enemyColor: '#ff9672'
    };

    return {
        layout: 'handcrafted_magma_pass',
        skyGradientStops: [
            { offset: 0, color: '#1d213f' },
            { offset: 0.25, color: '#292d55' },
            { offset: 0.55, color: '#473c7b' },
            { offset: 0.8, color: '#81519e' },
            { offset: 1, color: '#ffc8a6' }
        ],
        canopySegments,
        backdrops,
        platforms,
        coins,
        enemies,
        hazards,
        exit,
        theme,
        levelTotalWidth: platforms[platforms.length - 1].x + platforms[platforms.length - 1].width + 400
    };
}
