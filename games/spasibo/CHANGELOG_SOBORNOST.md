# SOBORNOST Engine – Changelog

## v2.1 – 2025-04-30

### Complete Separation of Game Content

- **Removed all Spasibo‑specific hardcoding** – no references to character names (Pavel, Merky, etc.) or scene IDs remain in the engine.
- **Added `registerNameMapping(original, tier1, tier2, cyrillic)`** – allows game data to define theosis‑based character name transformations.
- **Added `applyNameMapping(text)`** – automatically applied in `processText()`; replaces names based on current theosis tier.
- **Witnessed mode still available** – engine retains it, but game data can exclude it via `setAvailableModes()`.
- **Theosis system fully integrated** – hidden mechanic, visual gold glow, lexical word shifts, ending gating, and now name transformation.

### API Additions

- `registerNameMapping(original, tier1, tier2, cyrillic)`
- `registerTheosisTagValue(tag, value)` (already in v2.0, documented)
- `setTheosisTiers(tiers)` (configure theosis thresholds and word mappings)

### Backward Compatibility

- Existing games that do not use theosis or name mapping work unchanged.
- Spasibo v1.4 uses the new API to provide theosis‑based name shifts and disable witnessed mode.

---

## v2.0 – 2025-04-30
- Theosis System (Divine Encounter / Collective Ascent)
- Lexical Transfiguration (icon → ikon → Икон)
- Visual Tabor Light (gold glow)
- Ending gating via `requires_theosis`
- No explicit UI display of theosis value

## v1.8 – 2025-04-30
- Soundings via choices, companion system, reliquary, map, analytics

## v1.7 – 2025-04-30
- Liturgical clock, iconostasis, cover meter, rumination, compass, meta‑achievements, SFX

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
