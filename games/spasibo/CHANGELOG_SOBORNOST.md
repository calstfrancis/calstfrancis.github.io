# SOBORNOST Engine – Changelog

## v2.0 – 2025-04-30

### Theosis System (Divine Encounter / Collective Ascent)

- **Hidden Mechanic** – `G.theosis` (0–100) tracks the player's approach to union with the absolute (God / the Collective). Never shown; inferred through visual and lexical shifts.
- **Accumulation via Choice Tags** – Choices with tags like `"solidarity"`, `"agape"`, `"sacrifice"` increase theosis (collective action > contemplation). Tags configurable via `registerTheosisTagValue(tag, value)`. Doubt tag reduces theosis.
- **Explicit `theosis` field** in choices for precise author control.
- **Theosis Flash** – `flashTheosisLight(intensity, duration)` creates a kensho moment (gold burst). Triggered by `theosisFlash: true` in choices.

### Lexical Transfiguration (Word Shifts)

- `iconWord()`, `harbourWord()`, `shipWord()`, `objectDescription()` now return:
  - Theosis 0–32: "icon" / "icons"
  - Theosis 33–65: "ikon" / "ikons"
  - Theosis 66–100: "Икон" / "Иконы" (Cyrillic)
- Tiers fully configurable via `setTheosisTiers(tiers)`.
- Pluralisation supported.

### Visual "Tabor Light" (Gold Glow)

- Atmosphere particles gain gold `shadowBlur` and tint when theosis ≥33.
- Intensity ramps with theosis (low glow at mid tier, full glow at high tier).
- Lamp and fog colours shift toward gold.
- Flash effect overrides intensity temporarily.

### Ending Gating

- Choices can have `requires_theosis: 80` (or condition `{ type: "theosis", min: 80 }`).
- Hidden or disabled until the required theosis is reached.
- Primary gate for final Divine/Collective endings.

### No Explicit Display

- Theosis value never appears in status panel, tooltips, or notifications.
- Player sees only the effects: gold glow, word changes, new choices.

### Backward Compatibility

- Existing games (Spasibo) continue to work; theosis defaults to 0.
- Authors can progressively add tags and theosis requirements.

---

## v1.8 – 2025-04-30
- Soundings via choices, companion system, reliquary, held effects, map, analytics

## v1.7 – 2025-04-30
- Liturgical clock, iconostasis layering, cover meter, rumination, compass, meta‑achievements, SFX

## v1.6 – 2025-04-30
- Linguistic toggling, memory distortion, environmental bleed, Kenotic UI dimming, ghost choice

## v1.5 – 2025-04-30
- Scene pools, event queue, NPC stance, intent tagging, silence, rituals

## v1.4 – 2025-04-30
- Unified conditions, scene variants, micro‑variations, epistemic state, consequence queue

## v1.3 – 2025-04-30
- Configurable modes, pure roll modifiers, awareness‑dependent text

## v1.2 – 2025-04-30
- Advantage/critical/opposed rolls, witnessed mode

## v1.1 – 2025-04-30
- Awareness, Presence of Absence, Mortification

## v1.0 – 2025-04-30
- Initial engine split from game data
