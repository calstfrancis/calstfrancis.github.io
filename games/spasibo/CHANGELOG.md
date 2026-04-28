# СПАСИБО — Changelog

## v1.0 (current) — Multi-file architecture
**Architecture change**: Game split into 4 files for maintainability and engine reuse.
- `index.html` — shell, loads files in order: scenes.js → engine.js
- `style.css` — all visual styling, complete (was missing ~40% of referenced classes in v0.x)
- `engine.js` — all mechanics, zero story content. Reusable for future games.
- `scenes.js` — all story content: SCENES (121), CHARISMS, SOUNDINGS, NOTES, ART

**Engine additions over v0.6 base:**
- `reaction` bridge: choice objects can carry `reaction` string, shown as amber italic paragraph at top of next scene — choices now causally connect to what follows
- `requires_charism` gate on choices — specific charisms unlock dialogue options
- Dynamic text: `scene.text` can be `(G) => string[]` function — settled soundings can change what you read in the world
- `findCharism()` and `allCharisms()` — were referenced but missing from DeepSeek engine
- `hasCharism()` — clean charism check
- `G.lastReaction` persisted to save/load
- Sounding tick only on genuinely new scene visits (not on back-navigation)
- Cover object keys normalized: `background` not `bg`, `denomination` not `denom`, `connection` not `conn`
- Open Water mode hides locked choices entirely (vs attended mode which shows them greyed)
- Lamp flicker scales with mood (tense = flicker, revelation = bright, uncanny = dim)

**New scenes (v0.7 additions):**
- `merky_withholding` — Withholding charism gate; skip all probing
- `merky_post_vespers` — Merky after liberationist service, offers alliance
- `vance_before_what` — Suspicion charism gate; Vance reveals container history
- `vance_post_reveal` — Vance after container opened; previous chaplain story
- `vance_what_would_you` — Vance's honest answer about inaction
- `pavel_looking_for` — First real Pavel exchange; the room he's looking for
- `pavel_icon_bridge` — Connects your icon to Pavel's mission
- `pavel_open_eyes` — Pavel explains the "wrong chaplain" situation
- `pavel_knows_icons` / `pavel_knows_container` — Pavel's partial knowledge
- `pavel_denied` — Player denies icon knowledge; Pavel resets cleanly
- `pavel_why_here` — Neutral first disclosure before theological depth
- `butterantonio_post_reveal` — Butterantonio after container found
- `butterantonio_if_sign` — What signing means legally and morally
- `butterantonio_meets_sinhola` — Butterantonio learns of the linguist
- `the_room` / `the_room_stay` — The room Pavel was looking for; requires Doubt 2+; wall of Church Slavonic text

**Dialogue fixes:**
- Merky: each cover choice gets a distinct `reaction` (not generic "nods, accepts or files it")
- Vance: "She? Who do you mean?" now answered directly, not by looking at the cat first
- Pavel: first encounter no longer assumes knowledge of "the crossing" concept
- Pavel → `cargo_approach` gate raised from `cover_posting_set` to `merky_warned_cargo` — must complete Merky conversation first
- `pavel_intro` choices no longer offer "Because of the crossing" cold (player hasn't introduced topic)

---

## v0.6 — Full Acts 1–3, new characters
- Eider Swagstom (ship's doctor), Sinhola Shinola (linguist, Cabin 2), Tim Ezterhazh (crew, burns)
- Engine room accessible after Act 2 unlocks
- Container openable with Tim's release mechanism knowledge
- Three endings: Intercept / Facilitate / Witness
- The Breviary renamed from Thought Cabinet
- Sounding tick fixed: only on new scene visits

## v0.5 — Multi-act structure, Butterantonio, Vance
- Craigslist Butterantonio (passenger common area)
- Vance Landstorm (wheelhouse, Composure 2+ gate)
- Sealed container scene
- Passenger corridor hub, Cabin 2, notice board
- Act 2 unlocks after Pavel conversation

## v0.4 — Thought Cabinet (now Breviary), Vespers
- Thought Cabinet: 4 slots, manual, progress bar, settle mechanic
- Vespers scene: three reading options with downstream consequences
- Dynamic text support added (partially)
- Critical bug fixes: ?.5 optional chaining, innerHTML+= destroying event listeners

## v0.3 — Hub navigation, sticky header, cats corrected
- Return buttons on all sub-scenes
- One-time choices hidden after visit
- Hub scenes show visited choices as ◦ dimmed
- Haircut and Freezer Beef corrected from Severed Hours source
- Icon word progression: icon → ikon → Икон across playthroughs

## v0.2 — Cover in-game, stack overflow fixed
- Cover creation removed from front-end forms
- Cover established through Merky conversation
- Fixed: saveGame() calling render() (stack overflow)
- Fixed: autosaved variable undefined

## v0.1 — Initial build
- Atmosphere canvas: fog, porthole, reactive moods
- Stats: Vigilance, Composure, Communion, Doubt
- Charisms: Sleeping set
- Cover system (5 facts to establish)
- Pavel (cargo hold)
- Haircut and Freezer Beef (initial versions)
- Replay system: playCount, pastFlags, anamnesis text
