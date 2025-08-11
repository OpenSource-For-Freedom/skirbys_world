// Boss module for boss battle logic and rendering

import { drawRoundedRect } from './utils.js';

// Boss properties (Soap with a mustache)
export const boss = {
    x: 0, // Will be set by CANVAS_WIDTH / 2 - 75 in initialization
    y: 0, // Will be set by CANVAS_HEIGHT / 2 - 75 in initialization
    width: 150,
    height: 100,
    health: 300,
    maxHealth: 300,
    color: '#F0F8FF', // AliceBlue for soap
    mustacheColor: '#8B4513', // SaddleBrown
    eyeColor: '#000000',
    dx: 2,
    dy: 0,
    speed: 2,
    attackCooldown: 120, // Frames
    currentAttackCooldown: 0,
    isAttacking: false,
    attackType: 'none', // 'bubble', 'charge'
    bubbles: [],
    chargeTargetX: 0,
    chargeTargetY: 0,
    isCharging: false
};

/**
 * Initializes boss for battle
 * @param {number} CANVAS_WIDTH - Canvas width constant
 * @param {number} CANVAS_HEIGHT - Canvas height constant
 */
export function initializeBoss(CANVAS_WIDTH, CANVAS_HEIGHT) {
    // Reset boss health and position
    boss.health = boss.maxHealth;
    boss.x = CANVAS_WIDTH / 2 - boss.width / 2;
    boss.y = 100;
    boss.dx = 2; // Reset boss speed
    boss.currentAttackCooldown = 0; // Reset cooldown
    boss.isAttacking = false;
    boss.bubbles = [];
    boss.isCharging = false;
}

/**
 * Updates the boss's state, movement, and attacks
 * @param {object} player - Player object
 * @param {function} checkCollision - Collision detection function
 * @param {function} updateUI - UI update function
 * @param {function} playerTakeDamage - Function to handle player damage
 * @param {number} CANVAS_WIDTH - Canvas width constant
 * @param {number} CANVAS_HEIGHT - Canvas height constant
 */
export function updateBoss(player, checkCollision, updateUI, playerTakeDamage, CANVAS_WIDTH, CANVAS_HEIGHT) {
    // Boss horizontal movement (normal patrol)
    if (!boss.isCharging) {
        boss.x += boss.dx;
    }

    // Boss attack logic
    boss.currentAttackCooldown--;
    if (boss.currentAttackCooldown <= 0 && !boss.isAttacking) {
        // Randomly choose an attack
        const attackTypes = ['bubble', 'charge'];
        boss.attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)];
        boss.isAttacking = true;
        boss.currentAttackCooldown = boss.attackCooldown; // Reset cooldown

        if (boss.attackType === 'bubble') {
            // Spawn bubbles
            for (let i = 0; i < 5; i++) {
                boss.bubbles.push({
                    x: boss.x + boss.width / 2,
                    y: boss.y + boss.height,
                    radius: 15,
                    dy: Math.random() * 3 + 2, // Speed
                    dx: (Math.random() - 0.5) * 4, // Horizontal drift
                    color: 'rgba(173, 216, 230, 0.7)' // Light blue
                });
            }
        } else if (boss.attackType === 'charge') {
            // Prepare for charge attack
            boss.chargeTargetX = player.x;
            boss.chargeTargetY = player.y;
            boss.isCharging = true;
        }
    }

    // Update charge attack
    if (boss.isCharging) {
        const angle = Math.atan2(boss.chargeTargetY - (boss.y + boss.height / 2), boss.chargeTargetX - (boss.x + boss.width / 2));
        boss.x += Math.cos(angle) * (boss.speed * 3); // Faster charge
        boss.y += Math.sin(angle) * (boss.speed * 3);

        // Stop charging if close to target or hit player
        if (Math.abs(boss.x - boss.chargeTargetX) < 20 && Math.abs(boss.y - boss.chargeTargetY) < 20) {
            boss.isCharging = false;
            boss.isAttacking = false;
        }
        // Collision with player during charge
        if (checkCollision(player, boss)) {
            const damageApplied = playerTakeDamage(10, boss);
            if (damageApplied) {
                updateUI();
                boss.isCharging = false;
                boss.isAttacking = false;
                
                // Knock back boss slightly
                boss.dx *= -1;
                boss.dy = -10; // Bounce up
            }
        }
    } else {
         boss.isAttacking = false; // Reset attack state after charge
    }

    // Clamp boss within horizontal bounds AFTER all movements
    if (boss.x < 0) {
        boss.x = 0;
        boss.dx = Math.abs(boss.dx); // Ensure it moves right
    } else if (boss.x + boss.width > CANVAS_WIDTH) {
        boss.x = CANVAS_WIDTH - boss.width;
        boss.dx = -Math.abs(boss.dx); // Ensure it moves left
    }

    // Clamp boss within vertical bounds (important if it moves vertically during charge)
    // The boss is flying, so it doesn't have gravity. Its y is only affected by charge/knockback.
    if (boss.y < 0) {
        boss.y = 0;
        // If boss was moving upwards and hit top, reverse its dy
        if (boss.dy < 0) boss.dy *= -1;
    } else if (boss.y + boss.height > CANVAS_HEIGHT) {
        boss.y = CANVAS_HEIGHT - boss.height;
        // If boss was moving downwards and hit bottom, reverse its dy
        if (boss.dy > 0) boss.dy *= -1;
    }

    // Update bubble movement
    boss.bubbles.forEach((bubble, index) => {
        bubble.y += bubble.dy;
        bubble.x += bubble.dx;
        // Remove bubbles that go off screen
        if (bubble.y > CANVAS_HEIGHT) {
            boss.bubbles.splice(index, 1);
        }
        // Collision with player
        if (checkCollision(player, { x: bubble.x - bubble.radius, y: bubble.y - bubble.radius, width: bubble.radius * 2, height: bubble.radius * 2 })) {
            const damageApplied = playerTakeDamage(5, bubble);
            if (damageApplied) {
                updateUI();
                boss.bubbles.splice(index, 1); // Remove bubble on hit
            }
        }
    });
}

/**
 * Handles player attacks on boss
 * @param {object} keys - Current key states
 * @param {object} player - Player object
 * @param {function} checkCollision - Collision detection function
 * @param {function} displayMessageBox - Function to display message
 * @param {function} setGameState - Function to set game state
 * @param {function} resetGame - Function to reset game
 * @param {HTMLElement} gameContainer - Game container element
 */
export function handleBossAttacks(keys, player, checkCollision, displayMessageBox, setGameState, resetGame, gameContainer) {
    // Player attack on boss
    if (keys['f'] && player.isPunching && checkCollision(player, boss)) {
        boss.health -= 5; // Adjust damage
        console.log('Boss hit! Health:', boss.health);
        if (boss.health <= 0) {
            // Boss defeated!
            displayMessageBox('Congratulations!', 'You defeated the Soap Boss!', gameContainer);
            setGameState('intro'); // Go back to intro or a victory screen
            resetGame();
        }
    }
    if (keys['e'] && player.isSpinning && checkCollision(player, boss)) {
        boss.health -= 2; // Adjust damage
        console.log('Boss hit by Spin! Health:', boss.health);
        if (boss.health <= 0) {
            displayMessageBox('Congratulations!', 'You defeated the Soap Boss!', gameContainer);
            setGameState('intro');
            resetGame();
        }
    }
}

/**
 * Draws boss and boss-related elements
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 */
export function drawBoss(ctx) {
    // Draw boss (Soap with a mustache)
    // Create a linear gradient for the soap body to give it depth
    const gradient = ctx.createLinearGradient(boss.x, boss.y, boss.x + boss.width, boss.y + boss.height);
    gradient.addColorStop(0, '#F0F8FF'); // AliceBlue (lighter top-left)
    gradient.addColorStop(1, '#ADD8E6'); // LightBlue (darker bottom-right)
    ctx.fillStyle = gradient;

    // Draw rounded rectangle for the soap body
    const cornerRadius = 20; // Increased radius for more rounded look
    drawRoundedRect(ctx, boss.x, boss.y, boss.width, boss.height, cornerRadius);
    ctx.fill();

    // Add a subtle highlight for a "wet" or "foamy" effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'; // White with transparency
    ctx.beginPath();
    ctx.ellipse(boss.x + boss.width * 0.5, boss.y + boss.height * 0.2, boss.width * 0.4, boss.height * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    // Stroke the rounded rectangle
    drawRoundedRect(ctx, boss.x, boss.y, boss.width, boss.height, cornerRadius);
    ctx.stroke();

    // Draw mustache as a single, unified shape
    ctx.fillStyle = boss.mustacheColor;
    ctx.strokeStyle = boss.mustacheColor;
    ctx.lineWidth = 2;

    ctx.beginPath();
    // Start from the left tip of the mustache
    ctx.moveTo(boss.x + boss.width * 0.15, boss.y + boss.height * 0.65);
    // Curve upwards and inwards for the left side
    ctx.bezierCurveTo(
        boss.x + boss.width * 0.25, boss.y + boss.height * 0.55,
        boss.x + boss.width * 0.35, boss.y + boss.height * 0.55,
        boss.x + boss.width * 0.5, boss.y + boss.height * 0.6 // Peak of the upper lip
    );
    // Curve downwards and outwards for the right side
    ctx.bezierCurveTo(
        boss.x + boss.width * 0.65, boss.y + boss.height * 0.55,
        boss.x + boss.width * 0.75, boss.y + boss.height * 0.55,
        boss.x + boss.width * 0.85, boss.y + boss.height * 0.65 // Right tip of the mustache
    );
    // Now draw the bottom curve to close the shape
    ctx.bezierCurveTo(
        boss.x + boss.width * 0.7, boss.y + boss.height * 0.78, // Control point for right bottom curve
        boss.x + boss.width * 0.3, boss.y + boss.height * 0.78, // Control point for left bottom curve
        boss.x + boss.width * 0.15, boss.y + boss.height * 0.65 // Back to the starting point
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw eyes with pupils and highlights
    ctx.fillStyle = 'white';
    // Left eye white
    ctx.beginPath();
    ctx.arc(boss.x + boss.width * 0.35, boss.y + boss.height * 0.4, 10, 0, Math.PI * 2);
    ctx.fill();
    // Right eye white
    ctx.beginPath();
    ctx.arc(boss.x + boss.width * 0.65, boss.y + boss.height * 0.4, 10, 0, Math.PI * 2);
    ctx.fill();

    // Pupils
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(boss.x + boss.width * 0.35, boss.y + boss.height * 0.4, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(boss.x + boss.width * 0.65, boss.y + boss.height * 0.4, 4, 0, Math.PI * 2);
    ctx.fill();

    // Eye highlights
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(boss.x + boss.width * 0.35 + 3, boss.y + boss.height * 0.4 - 3, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(boss.x + boss.width * 0.65 + 3, boss.y + boss.height * 0.4 - 3, 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw boss health bar
    ctx.fillStyle = 'red';
    ctx.fillRect(boss.x, boss.y - 20, boss.width, 10);
    ctx.fillStyle = 'green';
    ctx.fillRect(boss.x, boss.y - 20, boss.width * (boss.health / boss.maxHealth), 10);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.strokeRect(boss.x, boss.y - 20, boss.width, 10);

    // Draw boss bubbles
    boss.bubbles.forEach(bubble => {
        ctx.fillStyle = bubble.color;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1;
        ctx.stroke();
        // Add a subtle highlight to the bubble
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(bubble.x - bubble.radius * 0.3, bubble.y - bubble.radius * 0.3, bubble.radius * 0.4, 0, Math.PI * 2);
        ctx.fill();
    });
}