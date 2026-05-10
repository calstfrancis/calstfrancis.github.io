## v1.2 — May 2026

### Critical Fixes
- **Sunday Service ritual launch** fixed — `__start_ritual__` magic string replaced with `start_ritual: ['sunday_service', ...]` choice property. Engine patched to handle `start_ritual` in `applyChoice`.
- **`pablo_knows` → `pavel_knows`** flag corrected throughout observations panel and scene logic.
- **localStorage safety** — save write now wrapped in try-catch with user-facing toast on failure.
- **Continue Crossing** confirmed working (v1.1 fix verified).
- **Scroll-to-top** confirmed on all scene transitions.

### Engine Additions
- `start_ritual` choice property: `{ start_ritual: [ritualId, startScene, nextScene] }` — launches ritual directly from a choice without magic strings.
- `applyLinguisticToggle` implemented — was a stub. Now flickering registered translations into text based on `doubt` stat (threshold 4+, probability scales with doubt level).
- Bottom nav labels flicker to Cyrillic as doubt rises: `observations/наблюдения`, `status/статус`, `codex/кодекс`, `map/карта`.
- `worldState` object on `G`: `{ shipStability, sanctity, socialTrust }` — initialised on `gameStarted` and `loadSlot`. Mutations tied to key scenes.
- Liturgical hour body classes (`hour-matins` through `hour-compline`) applied via `liturgicalHourChanged` event. Compline increments magnetic deviation.
- `sanctity-high` body class applied when `worldState.sanctity >= 7` (from anomaly intensity + theosis).
- Crossing Tax enforcement confirmed — `Math.max(5, Math.min(85, G.theosis - 15))` in `newPlay()`.

### Systemic Architecture
- **worldState** initialised and mutated through material routine scenes (bilge: +shipStability, Volkov story: +sanctity, lena_after_bilge: +socialTrust).
- **Cyrillic linguistic drift** active — ship vocabulary drifts under cover strain. `The Dawn`, `archive`, `mission`, `cover` registered as translation pairs with Cyrillic equivalents.
- **Anomaly body classes** corrected — `anomaly-medium` and `anomaly-high` applied to `body` element (not just `#root data-deviation`). CSS `filter: blur + contrast` on `.game-body`, `@keyframes jitter` on `.stxt` at high deviation, scanline overlay via `::after`.
- **Theosis ambient pulse** — 20s CSS animation on `tier-illumined` cycling border colour toward gold.
- **Cover HUD** — integrity bar pulses at `coverIntegrity <= 2`.

### New Content
- **Material Routines** — `ship_maintenance` → `maintenance_brass` / `maintenance_bilge` → `lena_after_bilge` → `lena_cook_before` → `hold_volkov_photo`. Volkov the cook: a new character present only in archive photographs and Lena's memory. His photograph joins the player's inventory.
- **Cognitive Diagnostic Scenes** — `anomaly_diagnosis` (chart room with Alexei) offers three interpretive choices about the anomaly's behaviour. Each resolves differently; the "ship returned with its archive" interpretation unlocks the highest theosis grant in Act Two.
- **Act Two hub expanded** — maintenance and anomaly diagnosis accessible from both `act_two_begin` and `main_deck_hub` when appropriate flags are set.

### CSS
- `body.anomaly-medium`: `filter: blur(0.28px) contrast(1.08)` on `.game-body`.
- `body.anomaly-high`: `filter: blur(0.52px) contrast(1.12)` + `@keyframes jitter` on `.stxt` + scanline `::after` with drift animation.
- `body.hour-*` classes: subtle border and colour shifts per liturgical hour.
- `body.sanctity-high`: gold tint on location bar.
- `.cyrillic-flicker`: amber pulse animation for in-text Cyrillic drift.

### Known Issues
- Oblong Vassilithune not yet introduced.
- Stink Patrol scene not yet written.
- NPC memory propagation (`recordNpcMemory`) not yet fully exploited — Alexei/Lena relationship mutations pending.
- Act Three full scene sequence pending.
- `volkov_photograph` item added to inventory but no scene yet uses it directly.
# SPASIBO — Changelog

---

## v1.1 — May 2026

### Bug Fixes
- **Continue Crossing** now works correctly. `_continueGame()` was loading save state but not setting `G.phase = 'game'`, causing the title screen to re-render.
- **Inline Observations** block removed from scene body — was rendering a non-clickable "observations" heading under choices.
- **Map navigation** now routes to correct scene IDs (was navigating to raw node IDs like `cabin` instead of `cabin_wake`).
- **Compound conditions** in endings fixed (`type: 'compound'` → `type: 'and'`/`type: 'not'`).
- **Scroll-to-top** on every scene transition via `scheduleRender()`.

### Engine Additions
- `setMagneticDeviation()` now writes `data-deviation` attribute to `#root` for CSS-driven interference effects.
- Cover integrity HUD bar added to game header — appears once cover fields are established. Pulses red when integrity ≤ 2.
- Version watermark `SPASIBO v1.1` fixed to bottom-right of game screen.

### Narrative Changes
- **Pavel** no longer references Paul the Apostle directly. The Paul material has been abstracted into Pavel's own voice and experience. The theology is present; the source is not named.
- **Cats explained**: Haircut introduced by description ("a tabby of indeterminate age") before name. Freezer Beef introduced as "a large grey cat" before named. Both are female throughout.
- **"Is cargo"**: Othis Commera now "manages the cargo" — the shorthand phrase removed.
- First-person narration ("we", "our") removed from all scene prose.
- **Cover biography** is now built through conversation with five different characters (Miguel: posting + connection; Pavel: denomination; Kylie: background; Connie: left-behind) rather than selected from a menu.

### Act Two Implementation
- **Anomaly Peak sequence**: full scenes around the 2am magnetic anomaly maximum — instrument room, Nadia's sonar discovery, Pavel on the foredeck, sitting with the archive.
- **Radio Discovery sequence**: the 1957 radio behind the instrument room panel. Alexei explains its function. Option to broadcast on the anomaly frequency.
- **Othis Confrontation**: three-path confrontation scene — deny (cover degrades), direct (Othis turns), confront (cover blown but Othis stands aside).
- **Sunday Service** now accessible from Act Two hub.
- Act Two begin scene routes dynamically to available sequences based on flags.

### Visual & Audio
- Porthole completely rewritten: larger (14% of screen min-dimension), brass ring with bolts, interior sky/water gradient shifts with mood and theosis gold intensity, wave animation, rain in tense scenes, gold shimmer at high theosis.
- Canvas opacity 1.0; `#root` transparent at right edge so porthole shows through.
- Sea sound engine: layered filtered noise buffers replace sawtooth oscillators. Slow LFO (0.08Hz) modulates wave amplitude. Mood changes filter cutoff rather than oscillator pitch.
- GOST Type B font applied throughout: title, location bar, panel headers, stat labels, tags, bottom nav, art blocks, charism/codex headings.
- GUI colours lifted: `--fg-dim`, `--dim`, `--cold` all brighter.
- Magnetic deviation CSS filter: `blur(0.25px)` at mid-deviation, `blur(0.5px)` + scanline overlay at high.
- Theosis ambient pulse: 20s CSS animation on `tier-illumined` body class cycles border toward gold.
- ASCII character portraits added for all main characters; ship art on title and opening scene.
- Theosis hidden from stats bar until tier 2 achieved (> 32).

### Content Gating
- Soviet references removed from early scenes (hold labels, Miguel's early history).
- `codex_zarya_history` and `codex_solidarity` now unlock only at Act Three threshold.
- Early theosis grants reduced throughout — the game requires multiple crossings to reach the highest tier.
- Crossing Tax implemented: `max(5, min(85, theosis - 15))` carried forward.

### Tutorial
- Introductory popup completely rewritten — now explains the cover system, stats, breviary, and multi-crossing structure in the voice of the game.

### Codex (formerly Glossary)
- Bottom nav button renamed "codex". Panel renamed "codex".
- Six new entries added with progressive unlock gating: Non-Magnetic Vessel, The Dawn, The Archive, The Mission, Zarya (high-theosis), Solidarity (high-theosis).
- Redundant "codex" tab from log/journal system removed.

### Known Issues
- Sunday Service ritual uses a placeholder routing token (`__start_ritual__`) — full ritual integration pending engine update.
- Oblong Vassilithune not yet introduced.
- Stink Patrol scene not yet written.
- Act Three full scene sequence pending.

---

## v1.0 — April 2026

Initial release. Act One complete. Engine patches applied to SOBORNOST 3.3.1:
- `magneticDeviation` state field added.
- `onEnter()` function support patched into scene rendering.
- `set_cover` array support added to `applyChoice`.
- `flags` array support added to choices.
- Bare stat shorthands on choices wired to `applyEffect`.
- `renderMode` and `renderCharism` implemented (were stubs).
- All five panel renderers implemented (were stubs).
- Crossing Tax applied in `newPlay()`.

