// Sound effects module using Tone.js

let jumpSound;
let walkSound;
let enemyHitSound; // When player jumps on enemy
let enemyDeathSound; // When enemy drops off screen

/**
 * Initializes all game sound effects using Tone.js.
 */
export function setupSounds() {
    // Jump Sound: A short, rising tone
    jumpSound = new Tone.Synth({
        oscillator: { type: "triangle" },
        envelope: {
            attack: 0.01,
            decay: 0.2,
            sustain: 0,
            release: 0.1
        }
    }).toDestination();

    // Walk Sound: A very short, low frequency click/thump
    walkSound = new Tone.Synth({
        oscillator: { type: "sine" },
        envelope: {
            attack: 0.005,
            decay: 0.05,
            sustain: 0,
            release: 0.05
        }
    }).toDestination();

    // Enemy Hit Sound (when jumped on): A quick, sharp pop
    enemyHitSound = new Tone.Synth({
        oscillator: { type: "square" },
        envelope: {
            attack: 0.001,
            decay: 0.1,
            sustain: 0,
            release: 0.05
        }
    }).toDestination();

    // Enemy Death Sound (when dropping off): A descending, fading tone
    enemyDeathSound = new Tone.Synth({
        oscillator: { type: "sawtooth" },
        envelope: {
            attack: 0.01,
            decay: 0.5,
            sustain: 0,
            release: 0.3
        }
    }).toDestination();
}

/** Plays the jump sound. */
export function playJumpSound() {
    jumpSound.triggerAttackRelease("C5", "8n"); // C5 for an 8th note
}

/** Plays the walk sound. */
export function playWalkSound(player) {
    const now = performance.now();
    if (now - player.lastWalkSoundTime > player.walkSoundCooldown) {
        walkSound.triggerAttackRelease("C3", "32n"); // Low C, very short
        player.lastWalkSoundTime = now;
    }
}

/** Plays the enemy hit sound. */
export function playEnemyHitSound() {
    enemyHitSound.triggerAttackRelease("G4", "16n"); // G4, short and sharp
}

/** Plays the enemy death sound. */
export function playEnemyDeathSound() {
    enemyDeathSound.triggerAttackRelease("C4", "0.5"); // C4, half second fade
    enemyDeathSound.triggerAttackRelease("C3", "0.8", Tone.now() + 0.2); // Descend to C3 after a delay
}