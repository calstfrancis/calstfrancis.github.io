## v1.4 – 2025-04-30

### Theosis System Integration (Hidden Mechanic)

- **Theosis value** (0–100) tracks player's ascent toward the absolute (God / the Collective). Never displayed.
- **Visual gold glow** appears in atmosphere when theosis ≥33, intensifying up to 71+ (Tabor Light effect).
- **Lexical shifts**: `icon` → `ikon` → `Икон`; `port` → `the Eastern port` → `Ленинград`; `the ship` → `the Sobornost` → `the Соборность`.
- **Name mapping**: character names gradually transliterate and become Cyrillic as theosis rises (Stacy → Stacya → Стаси, Pavel → Pável → Павел, etc.).
- **Ending gating**: certain high‑theosis choices become available only when theosis reaches required thresholds (e.g., `requires_theosis: 80`).
- **Tag‑based accumulation**: choices with tags like `solidarity`, `agape`, `sacrifice` increase theosis (collective action > contemplation). Doubt reduces it.
- **Theosis flash**: a gold brilliance burst (kensho moment) can be triggered by key choices (`theosisFlash: true`).

### Engine Separation Completed

- `SOBORNOST.js` now contains **zero Spasibo‑specific content** – all character names, scenes, and game logic remain in game data files.
- Witnessed mode **removed from Spasibo** (still present in engine, but disabled via `setAvailableModes(['attended','open'])`).

### Full Backward Compatibility

- Existing save files continue to work (theosis defaults to 0).
- No existing choices or scenes were changed; theosis is purely additive.

---

## v1.3 – 2025-04-30
- Engine migration to SOBORNOST core, ghost slots, cover denomination test, haircut observation, non_erat_dominus branching, consequential cargo roll

## v1.2 – 2025-04-30
- Witness path, audio depth, gold‑leaf visual, Freezer Beef epilogue

## v1.1 – 2025-04-30
- Witness ending, audio depth, visual gold leaf, Freezer Beef epilogue

## v1.0 – 2025-04-30
- Full game, three acts, three endings, Breviary, cover system, replay system
