<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Skirbys World</title>
    <!-- Tailwind CSS for modern styling and responsiveness -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <!-- Tone.js for sound effects -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js"></script>
    <link rel="stylesheet" href="public/styles.css">
</head>
<body>
    <div id="game-container">
        <!-- Loading Overlay -->
        <div id="loading-overlay" class="hidden">
            <div class="loading-spinner"></div>
            <p class="mt-4">Loading Skirbys World...</p>
        </div>

        <!-- Intro Menu -->
        <div id="intro-menu">
            <h1 class="text-6xl font-extrabold mb-8 text-white drop-shadow-lg" style="text-shadow: 0 0 20px rgba(255, 215, 0, 0.8); background: linear-gradient(45deg, #FF1493, #FFD700, #FF69B4); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">🌟 Skirby's World 🌟</h1>
            <p class="text-2xl mb-12 text-white font-bold drop-shadow-lg">Help Skirby on his magical blocky adventure! ✨</p>
            <button id="startButton" class="button-primary">🚀 Start Adventure 🚀</button>
        </div>

        <!-- Game UI (Score, Health) -->
        <div id="game-ui" class="hidden">
            <div class="game-info">
                <span>Coins: <span id="coinCount">0</span></span>
                <span>Health: <span id="healthCount">100</span></span>
                <span>Level: <span id="levelCount">1</span></span>
            </div>
            <canvas id="gameCanvas"></canvas>
        </div>

        <!-- Shop UI (Initially hidden) -->
        <div id="shop-ui" class="hidden">
            <h2 class="text-5xl font-extrabold my-4 text-white drop-shadow-lg" style="text-shadow: 0 0 20px rgba(50, 205, 50, 0.8);">💫 Skirby's Skill Shop 💫</h2>
            <p class="text-xl mb-8 text-white font-bold drop-shadow-lg">Spend your coins wisely! ✨</p>
            <!-- Modified grid for responsiveness -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl my-auto">
                <div class="p-6 rounded-2xl shadow-xl text-center border-4 border-white" style="background: linear-gradient(135deg, #1E90FF, #87CEEB); animation: float 4s ease-in-out infinite;">
                    <h3 class="text-3xl font-bold text-white mb-2">🚀 Super Jump</h3>
                    <p class="text-lg text-blue-100 mb-4 font-semibold">Jump even higher!</p>
                    <p class="text-2xl font-bold text-yellow-300 mb-4 drop-shadow-lg">💰 Cost: 20 Coins</p>
                    <button class="button-primary buy-skill-btn" data-skill="superJump" data-cost="20">Buy Now!</button>
                </div>
                <div class="p-6 rounded-2xl shadow-xl text-center border-4 border-white" style="background: linear-gradient(135deg, #FF6347, #FF4500); animation: float 4s ease-in-out infinite; animation-delay: -1s;">
                    <h3 class="text-3xl font-bold text-white mb-2">🌪️ Spin Attack</h3>
                    <p class="text-lg text-red-100 mb-4 font-semibold">Defeat enemies with a spin!</p>
                    <p class="text-2xl font-bold text-yellow-300 mb-4 drop-shadow-lg">💰 Cost: 30 Coins</p>
                    <button class="button-primary buy-skill-btn" data-skill="spinAttack" data-cost="30">Buy Now!</button>
                </div>
                 <div class="p-6 rounded-2xl shadow-xl text-center border-4 border-white" style="background: linear-gradient(135deg, #9932CC, #DDA0DD); animation: float 4s ease-in-out infinite; animation-delay: -2s;">
                    <h3 class="text-3xl font-bold text-white mb-2">👊 Punch Power</h3>
                    <p class="text-lg text-purple-100 mb-4 font-semibold">One-shot most enemies!</p>
                    <p class="text-2xl font-bold text-yellow-300 mb-4 drop-shadow-lg">💰 Cost: 40 Coins</p>
                    <button class="button-primary buy-skill-btn" data-skill="punchPower" data-cost="40">Buy Now!</button>
                </div>
                <div class="p-6 rounded-2xl shadow-xl text-center border-4 border-white" style="background: linear-gradient(135deg, #20B2AA, #48D1CC); animation: float 4s ease-in-out infinite; animation-delay: -3s;">
                    <h3 class="text-3xl font-bold text-white mb-2">🕊️ Flight</h3>
                    <p class="text-lg text-teal-100 mb-4 font-semibold">Soar through the skies!</p>
                    <p class="text-2xl font-bold text-yellow-300 mb-4 drop-shadow-lg">💰 Cost: 50 Coins</p>
                    <button class="button-primary buy-skill-btn" data-skill="flight" data-cost="50">Buy Now!</button>
                </div>
            </div>
            <button id="continueGameButton" class="button-primary mt-8">✨ Continue Adventure ✨</button>
        </div>

        <!-- Game Over UI (Initially hidden) -->
        <div id="game-over-ui" class="hidden">
            <h2 class="text-6xl font-extrabold mb-8 text-white drop-shadow-lg" style="text-shadow: 0 0 20px rgba(255, 69, 0, 0.8); background: linear-gradient(45deg, #FF4500, #FF6347); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">💀 Game Over! 💀</h2>
            <p class="text-2xl mb-12 text-white font-bold drop-shadow-lg">Skirby's adventure has ended... 😢</p>
            <button id="restartButton" class="button-primary">🔄 Try Again 🔄</button>
        </div>

        <!-- Boss Battle UI (Initially hidden) -->
        <div id="boss-battle-ui" class="hidden">
            <h2 class="text-6xl font-extrabold mb-8 text-white drop-shadow-lg" style="text-shadow: 0 0 20px rgba(138, 43, 226, 0.8); background: linear-gradient(45deg, #8A2BE2, #9932CC); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">⚔️ Boss Battle! ⚔️</h2>
            <p class="text-2xl mb-12 text-white font-bold drop-shadow-lg">Prepare to face the Soap Boss! 🧼</p>
            <button id="startBossBattleButton" class="button-primary">⚡ Engage! ⚡</button>
        </div>

        <!-- Cheat Code Input -->
        <div id="cheat-input-container" class="hidden">
            <label for="cheatInput" class="text-yellow-300 font-bold">Cheat:</label>
            <input type="text" id="cheatInput" placeholder="Enter code...">
        </div>
    </div>

    <script type="module" src="public/game.js"></script>
</body>
</html>