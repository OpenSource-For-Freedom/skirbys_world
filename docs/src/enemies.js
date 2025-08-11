// Enemies module for enemy AI, movement, and rendering

/**
 * Updates enemy movement and AI logic
 * @param {array} enemies - Array of enemy objects
 * @param {object} player - Player object
 * @param {function} checkCollision - Collision detection function
 * @param {function} updateUI - UI update function
 * @param {function} playEnemyHitSound - Function to play enemy hit sound
 * @param {function} playEnemyDeathSound - Function to play enemy death sound
 * @param {function} playerTakeDamage - Function to handle player damage
 * @param {number} CANVAS_HEIGHT - Canvas height constant
 */
export function updateEnemies(enemies, player, checkCollision, updateUI, playEnemyHitSound, playEnemyDeathSound, playerTakeDamage, CANVAS_HEIGHT) {
    enemies.forEach(enemy => {
        if (enemy.isDying) {
            enemy.y += enemy.dy;
            enemy.dy += player.gravity; // Apply gravity to falling enemy
            enemy.width = Math.max(0, enemy.width - 0.5); // Shrink
            enemy.height = Math.max(0, enemy.height - 0.5); // Shrink
            return; // Skip normal enemy logic if dying
        }

        // Simple horizontal patrol for enemies
        enemy.x += enemy.dx;
        if (enemy.x <= enemy.initialX - enemy.range || enemy.x + enemy.width >= enemy.initialX + enemy.range) {
            enemy.dx *= -1; // Reverse direction
        }

        if (checkCollision(player, enemy)) {
            // Check if player jumped on top of the enemy
            const playerBottom = player.y + player.height;
            const enemyTop = enemy.y;
            const playerPrevBottom = playerBottom - player.dy; // Player's bottom in previous frame

            if (player.dy > 0 && playerPrevBottom <= enemyTop + enemy.height / 2) { // Landing on top half
                playEnemyHitSound();
                enemy.isDying = true;
                enemy.dy = 5; // Start falling
                player.dy = player.jumpPower * 0.7; // Bounce player up
                player.onGround = false; // Player is now in air
                playEnemyDeathSound(); // Play death sound for the drop
                console.log('Enemy stomped!');
            } else if (player.isSpinning && player.skills.spinAttack) {
                // Defeat enemy with spin attack
                playEnemyHitSound();
                enemy.isDying = true;
                enemy.dy = 5; // Start falling
                playEnemyDeathSound();
                console.log('Enemy defeated by Spin Attack!');
            } else if (player.isPunching && player.skills.punchPower) {
                // Defeat enemy with punch attack
                playEnemyHitSound();
                enemy.isDying = true;
                enemy.dy = 5; // Start falling
                playEnemyDeathSound();
                console.log('Enemy defeated by Punch Power!');
            } else {
                // Player takes damage from side/bottom collision
                const damageApplied = playerTakeDamage(1, enemy); // Adjust damage as needed
                if (damageApplied) {
                    updateUI();
                    console.log('Player hit by enemy! Health:', player.health);
                }
            }
        }
    });

    // Filter out defeated enemies that have fallen off screen
    return enemies.filter(enemy => enemy.y < CANVAS_HEIGHT);
}

/**
 * Draws all enemies in the current level
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {array} enemies - Array of enemy objects
 * @param {number} cameraX - Current camera X offset
 */
export function drawEnemies(ctx, enemies, cameraX) {
    enemies.forEach(enemy => {
        if (enemy.isDying) return; // Don't draw if dying

        // Radial gradient for spherical look
        const enemyGradient = ctx.createRadialGradient(
            enemy.x + enemy.width / 2 - cameraX, enemy.y + enemy.height / 2, enemy.width * 0.1,
            enemy.x + enemy.width / 2 - cameraX, enemy.y + enemy.height / 2, enemy.width * 0.5
        );
        enemyGradient.addColorStop(0, '#9932CC'); // DarkOrchid center
        enemyGradient.addColorStop(1, '#8A2BE2'); // BlueViolet outer
        ctx.fillStyle = enemyGradient;

        ctx.beginPath();
        ctx.arc(enemy.x + enemy.width / 2 - cameraX, enemy.y + enemy.height / 2, enemy.width / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Add simple eyes with highlights
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(enemy.x + enemy.width / 2 - 5 - cameraX, enemy.y + enemy.height / 2 - 5, 3, 0, Math.PI * 2);
        ctx.arc(enemy.x + enemy.width / 2 + 5 - cameraX, enemy.y + enemy.height / 2 - 5, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(enemy.x + enemy.width / 2 - 5 - cameraX, enemy.y + enemy.height / 2 - 5, 1.5, 0, Math.PI * 2);
        ctx.arc(enemy.x + enemy.width / 2 + 5 - cameraX, enemy.y + enemy.height / 2 - 5, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Eye highlights
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.beginPath();
        ctx.arc(enemy.x + enemy.width / 2 - 5 - cameraX + 1, enemy.y + enemy.height / 2 - 5 - 1, 0.8, 0, Math.PI * 2);
        ctx.arc(enemy.x + enemy.width / 2 + 5 - cameraX + 1, enemy.y + enemy.height / 2 - 5 - 1, 0.8, 0, Math.PI * 2);
        ctx.fill();
    });
}