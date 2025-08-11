// UI module for HUD rendering and updates

/**
 * Updates the UI elements like coin count, health, and level
 * @param {object} player - Player object with coins and health
 * @param {number} currentLevel - Current level number
 */
export function updateUI(player, currentLevel) {
    const coinCountDisplay = document.getElementById('coinCount');
    const healthCountDisplay = document.getElementById('healthCount');
    const levelCountDisplay = document.getElementById('levelCount');
    
    if (coinCountDisplay) coinCountDisplay.innerText = player.coins;
    if (healthCountDisplay) healthCountDisplay.innerText = player.health;
    if (levelCountDisplay) levelCountDisplay.innerText = currentLevel;
}

/**
 * Sets up shop button event listeners
 * @param {object} player - Player object
 * @param {function} updateUICallback - Callback to update UI after purchase
 */
export function setupShopButtons(player, updateUICallback) {
    const buySkillButtons = document.querySelectorAll('.buy-skill-btn');
    
    buySkillButtons.forEach(button => {
        // Remove any existing event listeners to prevent duplicates
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', (e) => {
            const skill = e.target.dataset.skill;
            const cost = parseInt(e.target.dataset.cost);

            if (player.coins >= cost && !player.skills[skill]) {
                player.coins -= cost;
                player.skills[skill] = true;
                e.target.innerText = 'Learned!';
                e.target.disabled = true;
                e.target.classList.remove('button-primary');
                e.target.classList.add('bg-gray-500', 'cursor-not-allowed');
                updateUICallback();
                console.log(`Player bought ${skill}`);
            } else if (player.skills[skill]) {
                console.log(`Player already has ${skill}`);
            } else {
                console.log(`Not enough coins for ${skill}`);
                // Potentially add a visual feedback for not enough coins
            }
        });
    });
}

/**
 * Handles cheat code input and execution
 * @param {string} code - The cheat code entered
 * @param {object} gameState - Game state object
 * @param {function} resetLevelElements - Function to reset level
 * @param {function} updateUICallback - Function to update UI
 * @param {function} setGameState - Function to set game state
 * @param {function} displayMessageBox - Function to display messages
 * @param {function} startBossBattle - Function to start boss battle
 * @param {HTMLElement} gameContainer - Game container element
 */
export function handleCheatCode(code, gameState, resetLevelElements, updateUICallback, setGameState, displayMessageBox, startBossBattle, gameContainer) {
    switch (code) {
        case 'level2':
            gameState.setCurrentLevel(2);
            resetLevelElements(); // Resets player position and generates new level
            updateUICallback(); // Update UI immediately
            setGameState('playing');
            displayMessageBox('Cheat Activated!', 'Jumped to Level 2!', gameContainer);
            break;
        case 'level3':
            gameState.setCurrentLevel(3);
            resetLevelElements(); // Resets player position and new level
            updateUICallback(); // Update UI immediately
            setGameState('playing');
            displayMessageBox('Cheat Activated!', 'Jumped to Level 3!', gameContainer);
            break;
        case 'add100': // Changed cheat code to add100
            gameState.player.coins += 100;
            updateUICallback();
            displayMessageBox('Cheat Activated!', '100 coins added!', gameContainer);
            break;
        case 'boss': // New cheat code for boss battle
            gameState.setCurrentLevel(3); // Ensure level is set to 3 to correctly reflect progression
            updateUICallback(); // Update UI immediately
            displayMessageBox('Cheat Activated!', 'Teleporting to Boss Battle!', gameContainer);
            startBossBattle(); // Directly start the boss battle
            break;
        default:
            displayMessageBox('Invalid Cheat', 'Code not recognized.', gameContainer);
            break;
    }
}

/**
 * Sets up cheat input functionality
 * @param {object} gameState - Game state object
 * @param {function} resetLevelElements - Function to reset level
 * @param {function} updateUICallback - Function to update UI
 * @param {function} setGameState - Function to set game state
 * @param {function} displayMessageBox - Function to display messages
 * @param {function} startBossBattle - Function to start boss battle
 * @param {HTMLElement} gameContainer - Game container element
 */
export function setupCheatInput(gameState, resetLevelElements, updateUICallback, setGameState, displayMessageBox, startBossBattle, gameContainer) {
    const cheatInputContainer = document.getElementById('cheat-input-container');
    const cheatInput = document.getElementById('cheatInput');
    
    if (!cheatInputContainer || !cheatInput) return;

    // Toggle cheat input visibility when 'C' is pressed and input is NOT active
    document.addEventListener('keydown', (e) => {
        // If the cheat input is focused, allow typing 'c' and other characters
        // Do NOT prevent default or toggle visibility if typing in the input.
        if (document.activeElement === cheatInput) {
            if (e.key === 'Enter') {
                handleCheatCode(cheatInput.value.toLowerCase(), gameState, resetLevelElements, updateUICallback, setGameState, displayMessageBox, startBossBattle, gameContainer);
                cheatInput.value = ''; // Clear input
                cheatInputContainer.classList.add('hidden'); // Hide input
                cheatInput.blur(); // Remove focus from input
            }
            return; // Don't process other game keys if typing in cheat input
        }

        // Toggle cheat input visibility when 'C' is pressed and input is NOT active
        if (e.key.toLowerCase() === 'c') {
            e.preventDefault(); // Prevent 'c' from being typed into game (if not in input)
            cheatInputContainer.classList.toggle('hidden');
            if (!cheatInputContainer.classList.contains('hidden')) {
                cheatInput.focus(); // Focus the input when it appears
            } else {
                cheatInput.value = ''; // Clear input when hidden
            }
            return; // Don't process 'c' for game movement
        }
    });
}