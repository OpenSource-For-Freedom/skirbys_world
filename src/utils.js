// Utility functions for collision detection and drawing helpers

/**
 * Checks for AABB collision between two rectangles.
 * @param {object} rect1 - First rectangle {x, y, width, height}.
 * @param {object} rect2 - Second rectangle {x, y, width, height}.
 * @returns {boolean} True if collision occurs, false otherwise.
 */
export function checkCollision(rect1, rect2) {
    // Check if rectangles overlap on X axis
    const xOverlap = rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
    // Check if rectangles overlap on Y axis, using >= for the bottom edge
    const yOverlap = rect1.y < rect2.y + rect2.height && rect1.y + rect1.height >= rect2.y;

    return xOverlap && yOverlap;
}

/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If "radius" is a single number, then it is used as the radius for all 4 corners.
 * If "radius" is an array, it specifies the radii for top-left, top-right, bottom-right, bottom-left corners.
 * @param {CanvasRenderingContext2D} ctx The 2D rendering context.
 * @param {number} x The top-left x coordinate.
 * @param {number} y The top-left y coordinate.
 * @param {number} width The width of the rectangle.
 * @param {number} height The height of the rectangle.
 * @param {number|Array<number>} radius The corner radius.
 */
export function drawRoundedRect(ctx, x, y, width, height, radius) {
    if (typeof radius === 'number') {
        radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
        radius = {tl: radius[0] || 0, tr: radius[1] || 0, br: radius[2] || 0, bl: radius[3] || 0};
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
}

/**
 * Draws clouds with parallax effect.
 * @param {CanvasRenderingContext2D} ctx The 2D rendering context.
 * @param {array} clouds Array of cloud objects.
 * @param {number} cameraX The current camera X position.
 * @param {number} CANVAS_WIDTH Canvas width constant.
 * @param {object} currentLevelData Current level data with levelTotalWidth.
 */
export function drawClouds(ctx, clouds, cameraX, CANVAS_WIDTH, currentLevelData) {
    clouds.forEach(cloud => {
        const drawX = cloud.x - cameraX * cloud.speed;
        // Wrap clouds around the level width to create infinite scrolling
        if (drawX + cloud.width < 0) {
            cloud.x += currentLevelData.levelTotalWidth + CANVAS_WIDTH; // Reset far right
        } else if (drawX > CANVAS_WIDTH + cloud.width) {
            cloud.x -= currentLevelData.levelTotalWidth + CANVAS_WIDTH; // Reset far left
        }

        // Apply a radial gradient for cloud volume
        const cloudGradient = ctx.createRadialGradient(
            drawX + cloud.width * 0.5, cloud.y + cloud.height * 0.5, cloud.width * 0.1,
            drawX + cloud.width * 0.5, cloud.y + cloud.height * 0.5, cloud.width * 0.6
        );
        cloudGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)'); // Brighter center
        cloudGradient.addColorStop(1, 'rgba(255, 255, 255, 0.6)'); // Softer edges
        ctx.fillStyle = cloudGradient;

        ctx.beginPath();
        // More organic cloud shape using multiple bezier curves
        ctx.moveTo(drawX, cloud.y + cloud.height * 0.5);
        ctx.bezierCurveTo(
            drawX - cloud.width * 0.1, cloud.y + cloud.height * 0.2,
            drawX + cloud.width * 0.1, cloud.y - cloud.height * 0.2,
            drawX + cloud.width * 0.3, cloud.y - cloud.height * 0.1
        );
        ctx.bezierCurveTo(
            drawX + cloud.width * 0.5, cloud.y - cloud.height * 0.3,
            drawX + cloud.width * 0.7, cloud.y - cloud.height * 0.2,
            drawX + cloud.width, cloud.y + cloud.height * 0.3
        );
        ctx.bezierCurveTo(
            drawX + cloud.width * 0.9, cloud.y + cloud.height * 0.8,
            drawX + cloud.width * 0.1, cloud.y + cloud.height * 0.9,
            drawX, cloud.y + cloud.height * 0.5
        );
        ctx.closePath();
        ctx.fill();
    });
}

/**
 * Draws hills with parallax effect.
 * @param {CanvasRenderingContext2D} ctx The 2D rendering context.
 * @param {array} hills Array of hill objects.
 * @param {number} cameraX The current camera X position.
 * @param {number} CANVAS_WIDTH Canvas width constant.
 * @param {number} CANVAS_HEIGHT Canvas height constant.
 * @param {object} currentLevelData Current level data with levelTotalWidth.
 */
export function drawHills(ctx, hills, cameraX, CANVAS_WIDTH, CANVAS_HEIGHT, currentLevelData) {
    hills.forEach(hill => {
        const drawX = hill.x - cameraX * hill.speed;
        // Wrap hills around the level width
        if (drawX + hill.width < 0) {
            hill.x += currentLevelData.levelTotalWidth + CANVAS_WIDTH;
        } else if (drawX > CANVAS_WIDTH + hill.width) {
            hill.x -= currentLevelData.levelTotalWidth + CANVAS_WIDTH;
        }

        ctx.fillStyle = hill.color;
        ctx.beginPath();
        ctx.moveTo(drawX, hill.y);
        // More organic hill shape
        ctx.bezierCurveTo(
            drawX + hill.width * 0.1, hill.y - hill.height * 0.2,
            drawX + hill.width * 0.3, hill.y - hill.height * 0.7,
            drawX + hill.width * 0.5, hill.y - hill.height * 0.5
        );
        ctx.bezierCurveTo(
            drawX + hill.width * 0.7, hill.y - hill.height * 0.8,
            drawX + hill.width * 0.9, hill.y - hill.height * 0.3,
            drawX + hill.width, hill.y
        );
        ctx.lineTo(drawX + hill.width, CANVAS_HEIGHT);
        ctx.lineTo(drawX, CANVAS_HEIGHT);
        ctx.closePath();
        ctx.fill();

        // Add subtle shading at the base of the hill
        const shadeGradient = ctx.createLinearGradient(drawX, hill.y, drawX, CANVAS_HEIGHT);
        shadeGradient.addColorStop(0, 'rgba(0,0,0,0)');
        shadeGradient.addColorStop(1, 'rgba(0,0,0,0.1)');
        ctx.fillStyle = shadeGradient;
        ctx.beginPath();
        ctx.moveTo(drawX, hill.y);
        ctx.bezierCurveTo(
            drawX + hill.width * 0.1, hill.y - hill.height * 0.2,
            drawX + hill.width * 0.3, hill.y - hill.height * 0.7,
            drawX + hill.width * 0.5, hill.y - hill.height * 0.5
        );
        ctx.bezierCurveTo(
            drawX + hill.width * 0.7, hill.y - hill.height * 0.8,
            drawX + hill.width * 0.9, hill.y - hill.height * 0.3,
            drawX + hill.width, hill.y
        );
        ctx.lineTo(drawX + hill.width, CANVAS_HEIGHT);
        ctx.lineTo(drawX, CANVAS_HEIGHT);
        ctx.closePath();
        ctx.fill();
    });
}

/**
 * Draws stars for the boss battle background with twinkling effect.
 * @param {CanvasRenderingContext2D} ctx The 2D rendering context.
 * @param {array} stars Array of star objects.
 * @param {number} frameCounter The current frame count for animation.
 */
export function drawStars(ctx, stars, frameCounter) {
    stars.forEach(star => {
        // Twinkling effect using sine wave
        const twinkleFactor = Math.sin(frameCounter * 0.05 + star.initialAlpha * 10) * 0.5 + 0.5; // Oscillates between 0.5 and 1.0
        ctx.fillStyle = `rgba(255, 255, 255, ${star.initialAlpha * twinkleFactor})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

/**
 * Displays a custom message box instead of alert().
 * @param {string} title - The title of the message.
 * @param {string} message - The message content.
 * @param {HTMLElement} gameContainer - The game container element.
 */
export function displayMessageBox(title, message, gameContainer) {
    const messageBox = document.createElement('div');
    messageBox.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.8);
        padding: 30px;
        border-radius: 20px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        color: white;
        text-align: center;
        z-index: 200;
        font-size: 1.5rem;
        max-width: 80%;
        border: 5px solid #FFD700;
    `;
    messageBox.innerHTML = `
        <h3 class="text-4xl font-bold mb-4 text-yellow-300">${title}</h3>
        <p class="mb-8">${message}</p>
        <button class="button-primary" id="messageBoxOk">OK</button>
    `;
    gameContainer.appendChild(messageBox);

    document.getElementById('messageBoxOk').addEventListener('click', () => {
        gameContainer.removeChild(messageBox);
    });
}