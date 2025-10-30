export const strataDetailColor = 'rgba(120, 60, 30, 0.4)';
export const strataHighlight = 'rgba(255, 235, 210, 0.42)';

export const warmStrata = (light, mid, dark) => ([
    { offset: 0, color: light },
    { offset: 0.45, color: mid },
    { offset: 1, color: dark }
]);

export function makeStrataPlatform(x, y, width, height, colorStops, options = {}) {
    return {
        x,
        y,
        width,
        height,
        color: colorStops[1]?.color ?? colorStops[1],
        noStuds: true,
        texture: 'strata',
        strataColors: colorStops,
        detailColor: options.detailColor || strataDetailColor,
        topHighlight: options.topHighlight || strataHighlight,
        grooves: options.grooves ?? 4,
        holes: options.holes || []
    };
}

export function makeCoin(x, y, radius = 12) {
    return { x, y, radius, collected: false };
}

export function makeEnemy({ x, y, width = 32, height = 32, speed = 1, direction = 1, range = 80, color = '#ff78b5' }) {
    return {
        x,
        y,
        width,
        height,
        speed,
        dx: direction,
        range,
        initialX: x,
        color,
        isDying: false,
        dy: 0
    };
}

export function createExit(platform, { width = 70, height = 70, offsetX = 0 } = {}) {
    const exit = {
        x: platform.x + platform.width / 2 - width / 2 + offsetX,
        y: platform.y - height,
        width,
        height,
        originalColor: '#FCE570'
    };
    exit.color = exit.originalColor;
    return exit;
}

export function makeWaterHazard(x, y, width, height, options = {}) {
    return {
        type: 'water',
        x,
        y,
        width,
        height,
        flowSpeed: options.flowSpeed ?? 1,
        direction: options.direction ?? 1,
        damage: options.damage ?? 1,
        waveAmplitude: options.waveAmplitude ?? 8,
        waveLength: options.waveLength ?? 140,
        shimmer: options.shimmer ?? 0.35
    };
}

export function makeLavaHazard(x, y, width, height, options = {}) {
    return {
        type: 'lava',
        x,
        y,
        width,
        height,
        damage: options.damage ?? 2,
        knockback: options.knockback ?? { x: 0, y: -10 },
        pulseSpeed: options.pulseSpeed ?? 0.12,
        glow: options.glow ?? 0.55
    };
}
