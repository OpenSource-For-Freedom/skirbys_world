// Player module containing all player-related logic and properties

// Player object with all properties
export const player = {
    x: 50,
    y: 0, // Will be set by CANVAS_HEIGHT - 100 in initialization
    width: 40,
    height: 60,
    color: '#FF6347', // Tomato Red for Skirby (Lego-like)
    dx: 0,
    dy: 0,
    speed: 5,
    jumpPower: -15, // Base jump power
    gravity: 0.8,
    onGround: false,
    health: 100,
    coins: 0,
    skills: {
        superJump: false,
        spinAttack: false,
        punchPower: false,
        flight: false
    },
    isSpinning: false,
    isPunching: false,
    isFlying: false,
    flightFuel: 100, // For flight skill
    lastWalkSoundTime: 0,
    walkSoundCooldown: 200, // milliseconds
    isInvincible: false,
    invincibilityTimer: 0,
    invincibilityDuration: 60, // Duration in frames (e.g., 1 second at 60 FPS)
    knockbackX: 0, // Horizontal knockback velocity
    knockbackY: 0 // Vertical knockback velocity
};

/**
 * Initializes the player position based on canvas height
 * @param {number} CANVAS_HEIGHT - The canvas height constant
 */
export function initializePlayer(CANVAS_HEIGHT) {
    player.y = CANVAS_HEIGHT - 100; // Start on ground
}

/**
 * Resets the player to initial state
 * @param {number} CANVAS_HEIGHT - The canvas height constant
 */
export function resetPlayer(CANVAS_HEIGHT) {
    player.x = 50;
    player.y = CANVAS_HEIGHT - 100;
    player.dx = 0;
    player.dy = 0;
    player.health = 100;
    player.coins = 0;
    player.onGround = false;
    player.skills = {
        superJump: false,
        spinAttack: false,
        punchPower: false,
        flight: false
    };
    player.isSpinning = false;
    player.isPunching = false;
    player.isFlying = false;
    player.flightFuel = 100;
    player.isInvincible = false;
    player.invincibilityTimer = 0;
    player.knockbackX = 0;
    player.knockbackY = 0;
}

/**
 * Updates player movement and physics
 * @param {object} keys - Current key states
 * @param {number} CANVAS_HEIGHT - Canvas height
 * @param {number} CANVAS_WIDTH - Canvas width
 * @param {string} currentState - Current game state
 * @param {function} playWalkSound - Function to play walk sound
 * @param {function} playJumpSound - Function to play jump sound
 */
export function updatePlayer(keys, CANVAS_HEIGHT, CANVAS_WIDTH, currentState, playWalkSound, playJumpSound) {
    // Handle invincibility timer
    if (player.isInvincible) {
        player.invincibilityTimer--;
        if (player.invincibilityTimer <= 0) {
            player.isInvincible = false;
        }
    }

    // Player horizontal movement
    player.dx = 0;
    if (keys['a']) {
        player.dx = -player.speed;
        // Play walk sound only if on ground and moving horizontally
        if (player.onGround) playWalkSound(player);
    }
    if (keys['d']) {
        player.dx = player.speed;
        // Play walk sound only if on ground and moving horizontally
        if (player.onGround) playWalkSound(player);
    }

    // Player vertical movement (Jump)
    // Super Jump implementation
    if (keys[' '] && player.onGround) {
        player.dy = player.skills.superJump ? player.jumpPower * 1.5 : player.jumpPower;
        player.onGround = false; // Player is now in the air
        playJumpSound(); // Play jump sound immediately on jump
    }

    // Flight skill implementation
    if (player.skills.flight) {
        if (keys['w'] && player.flightFuel > 0) {
            player.dy = -player.speed * 0.8; // Slower upward movement when flying
            player.flightFuel -= 0.5; // Consume fuel
            player.isFlying = true;
            // Prevent player from going above the top of the canvas
            if (player.y < 0) player.y = 0;
        } else if (keys['s'] && player.flightFuel > 0) {
            player.dy = player.speed * 0.8; // Slower downward movement when flying
            player.flightFuel -= 0.5; // Consume fuel
            player.isFlying = true;
            // Prevent player from going below the bottom of the canvas (unless falling)
            if (player.y + player.height > CANVAS_HEIGHT) player.y = CANVAS_HEIGHT - player.height;
        } else {
            player.isFlying = false;
        }

        // Regenerate fuel when not actively flying or when fuel is low
        if (!player.isFlying && player.flightFuel < 100) {
            player.flightFuel += 0.2;
            if (player.flightFuel > 100) player.flightFuel = 100;
        }
    } else {
        player.isFlying = false; // Ensure this is false if skill not owned
    }

    // Apply gravity if not flying
    if (!player.isFlying) {
        player.dy += player.gravity;
    }

    // Update player position based on dx and dy
    player.x += player.dx;
    player.y += player.dy;

    // Apply knockback
    player.x += player.knockbackX;
    player.y += player.knockbackY;
    // Decay knockback
    player.knockbackX *= 0.9; // Reduce knockback over time
    player.knockbackY *= 0.9;
    // Stop knockback if it's very small
    if (Math.abs(player.knockbackX) < 0.1) player.knockbackX = 0;
    if (Math.abs(player.knockbackY) < 0.1) player.knockbackY = 0;

    // Boundary checks for player
    if (player.x < 0) player.x = 0;
    // Keep player within canvas during boss battle (fixed arena)
    if (currentState === 'bossBattle' && player.x + player.width > CANVAS_WIDTH) {
        player.x = CANVAS_WIDTH - player.width;
    }

    // Reset onGround at the start of each frame before checking collisions
    player.onGround = false;
}

/**
 * Draws the player (Skirby) on the canvas
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
 * @param {number} playerDrawX - The X position to draw the player at
 * @param {number} frameCounter - Current frame counter for animations
 */
export function drawPlayer(ctx, playerDrawX, frameCounter) {
    // Apply a subtle linear gradient for Skirby's body
    const playerGradient = ctx.createLinearGradient(playerDrawX, player.y, playerDrawX + player.width, player.y + player.height);
    playerGradient.addColorStop(0, player.color);
    playerGradient.addColorStop(1, '#CD5C5C'); // Darker shade of Tomato Red
    ctx.fillStyle = playerGradient;

    ctx.fillRect(playerDrawX, player.y, player.width, player.height);

    // Add a darker outline to Skirby
    ctx.strokeStyle = '#8B0000'; // DarkRed
    ctx.lineWidth = 2;
    ctx.strokeRect(playerDrawX, player.y, player.width, player.height);

    // Add simple eyes to Skirby with highlights
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(playerDrawX + player.width / 4, player.y + player.height / 4, 4, 0, Math.PI * 2);
    ctx.arc(playerDrawX + player.width * 3 / 4, player.y + player.height / 4, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(playerDrawX + player.width / 4, player.y + player.height / 4, 2, 0, Math.PI * 2);
    ctx.arc(playerDrawX + player.width * 3 / 4, player.y + player.height / 4, 2, 0, Math.PI * 2);
    ctx.fill();
    // Eye highlights
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.beginPath();
    ctx.arc(playerDrawX + player.width / 4 + 1, player.y + player.height / 4 - 1, 0.8, 0, Math.PI * 2);
    ctx.arc(playerDrawX + player.width * 3 / 4 + 1, player.y + player.height / 4 - 1, 0.8, 0, Math.PI * 2);
    ctx.fill();
}

/**
 * Draws skill effects for the player
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
 * @param {number} playerDrawX - The X position to draw the player at
 * @param {number} frameCounter - Current frame counter for animations
 */
export function drawPlayerSkillEffects(ctx, playerDrawX, frameCounter) {
    // Draw skill effects
    if (player.isSpinning) {
        ctx.save(); // Save the current canvas state
        ctx.translate(playerDrawX + player.width / 2, player.y + player.height / 2); // Move origin to player center

        // Larger, faster rotating inner circle
        ctx.rotate(frameCounter * 0.2); // Faster rotation
        ctx.strokeStyle = `rgba(255, 255, 0, ${0.9 + Math.sin(frameCounter * 0.25) * 0.1})`; // Yellow glow with more dramatic pulsing alpha
        ctx.lineWidth = 8; // Thicker line
        ctx.beginPath();
        ctx.arc(0, 0, player.width * 1.0, 0, Math.PI * 2); // Larger radius
        ctx.stroke();

        // Even larger, slower, opposite rotating outer circle
        ctx.rotate(-frameCounter * 0.08); // Slower, opposite rotation
        ctx.strokeStyle = `rgba(255, 165, 0, ${0.7 + Math.sin(frameCounter * 0.2) * 0.2})`; // Orange-yellow glow with pulsing alpha
        ctx.lineWidth = 6; // Thicker line
        ctx.beginPath();
        ctx.arc(0, 0, player.width * 1.5, 0, Math.PI * 2); // Even larger radius
        ctx.stroke();

        // Add a third, very large, very slow rotating circle for a wider aura
        ctx.rotate(frameCounter * 0.03); // Very slow rotation
        ctx.strokeStyle = `rgba(255, 220, 0, ${0.5 + Math.sin(frameCounter * 0.1) * 0.15})`; // Lighter yellow, subtle pulse
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(0, 0, player.width * 2.0, 0, Math.PI * 2); // Much larger radius
        ctx.stroke();

        ctx.restore(); // Restore the canvas state
    }
    if (player.isPunching) {
        // Punch effect - a much larger, more explosive burst
        const maxBurstRadius = 100; // Much larger max radius
        const currentFrameInCycle = frameCounter % 15; // Longer animation cycle for more 'oomph'
        const burstRadius = (currentFrameInCycle / 15) * maxBurstRadius;
        const burstAlpha = 1 - (currentFrameInCycle / 15); // Fades out

        // Outer, orange burst
        ctx.fillStyle = `rgba(255, 100, 0, ${burstAlpha})`; // Orange, fading
        ctx.beginPath();
        ctx.arc(playerDrawX + player.width + 10, player.y + player.height / 2, burstRadius, 0, Math.PI * 2);
        ctx.fill();

        // Inner, yellow core of the burst
        const innerBurstRadius = burstRadius * 0.7; // Slightly smaller inner circle
        ctx.fillStyle = `rgba(255, 255, 0, ${burstAlpha * 0.8})`; // Yellow, fading
        ctx.beginPath();
        ctx.arc(playerDrawX + player.width + 10, player.y + player.height / 2, innerBurstRadius, 0, Math.PI * 2);
        ctx.fill();

        // Small, bright center for the initial impact
        const coreRadius = burstRadius * 0.3;
        ctx.fillStyle = `rgba(255, 255, 255, ${burstAlpha})`; // White hot center
        ctx.beginPath();
        ctx.arc(playerDrawX + player.width + 10, player.y + player.height / 2, coreRadius, 0, Math.PI * 2);
        ctx.fill();
    }
    if (player.skills.flight) {
        // Draw flight fuel bar
        ctx.fillStyle = 'gray';
        ctx.fillRect(playerDrawX, player.y - 15, player.width, 5);
        ctx.fillStyle = 'cyan';
        ctx.fillRect(playerDrawX, player.y - 15, player.width * (player.flightFuel / 100), 5);
    }
}

/**
 * Handles player taking damage
 * @param {number} damage - Amount of damage to take
 * @param {object} source - Source of damage (for knockback calculation)
 */
export function playerTakeDamage(damage, source) {
    if (!player.isInvincible) {
        player.health -= damage;
        // Apply knockback velocity
        player.knockbackX = (player.x > source.x ? 1 : -1) * 8; // Initial horizontal knockback strength
        player.knockbackY = -8; // Initial upward knockback strength
        player.isInvincible = true;
        player.invincibilityTimer = player.invincibilityDuration;
        return true; // Damage was applied
    }
    return false; // No damage applied (invincible)
}