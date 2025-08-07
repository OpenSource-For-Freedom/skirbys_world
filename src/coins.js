// Coins module for coin collection logic and rendering

/**
 * Draws all coins in the current level
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {array} coins - Array of coin objects
 * @param {number} cameraX - Current camera X offset
 */
export function drawCoins(ctx, coins, cameraX) {
    coins.forEach(coin => {
        if (!coin.collected) {
            ctx.fillStyle = '#FFD700'; // Gold
            ctx.beginPath();
            ctx.arc(coin.x - cameraX, coin.y, coin.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#DAA520'; // Darker gold border
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    });
}

/**
 * Checks for coin collection and updates player coins
 * @param {array} coins - Array of coin objects
 * @param {object} player - Player object
 * @param {function} checkCollision - Collision detection function
 * @param {function} updateUI - UI update function
 */
export function updateCoinCollection(coins, player, checkCollision, updateUI) {
    coins.forEach(coin => {
        if (!coin.collected && checkCollision(player, { 
            x: coin.x - coin.radius, 
            y: coin.y - coin.radius, 
            width: coin.radius * 2, 
            height: coin.radius * 2 
        })) {
            coin.collected = true;
            player.coins += 1;
            updateUI();
        }
    });
}