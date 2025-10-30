# Copilot Instructions

## Project Snapshot
- `index.html` is the single-page entry point; it contains UI, game loop, rendering, and imports `generateLevel` via `<script type="module">`.
- `levels/` holds handcrafted level modules (`level1.js`, `level2.js`, `level3.js`), shared helpers, and the procedural fallback aggregator at `levels/index.js`.
- Rendering uses a 2D offscreen canvas with an optional WebGL presenter for post-processing; keep fallbacks for non-WebGL browsers intact.
- Audio is produced with Tone.js and only starts after a user gesture (handled on the Start button).

## Local Setup & Validation
1. Serve the folder over HTTP so the browser can load ES modules. Example PowerShell command:
   - `npx http-server . -p 8088`
2. Visit `http://localhost:8088/index.html`, click **Start Adventure**, and confirm gameplay (movement, coins, exit trigger, boss switch) still works.
3. There are no automated tests; rely on this manual smoke check after changes.

## Implementation Guidelines
- Keep new modules ESM-friendly and import them from `index.html` using relative paths. Do not replace the inline module script with bundler output.
- Preserve the `createLevelContext()` contract when adjusting level generation; `generateLevel` must accept the current context and return objects shaped like the existing level data.
- When tweaking `drawSkirbyCharacter` or related helpers, maintain pose-aware parameters (`facing`, `move`, `airborne`, etc.) so animation states stay coherent.
- WebGL presenter (`initWebGLRenderer`) should keep working with the same texture upload path; avoid introducing APIs unavailable in both WebGL1 and WebGL2 unless feature-detected.
- If adding audio, reuse the Tone.js setup pattern initiated in `setupSounds()` to ensure sounds are registered after `Tone.start()`.

## Style & Structure Preferences
- Favor descriptive helper functions over inline blocks inside the main loop when logic grows complex, but avoid fragmenting existing cohesive sections without reason.
- Reuse the warm strata helpers in `levels.js` when extending handcrafted terrain so visual theming stays consistent.
- Keep assets procedural—no external images/fonts beyond the current CDNs unless strictly necessary.

## Common Pitfalls
- Loading the page from `file://` will fail because of module imports; always use a local server.
- Audio will remain muted if the Start button interaction path changes before `Tone.start()` runs.
- Large refactors to `index.html` can break UI overlays (shop, boss, game over); check each state after modifications.
