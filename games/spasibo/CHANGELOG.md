# СПАСИБО — Changelog

## v1.2 — Five gameplay suggestions implemented

**Suggestion 1 — Breviary ghost slots** (engine.js, style.css):
- `G.soundings.released` array added; persisted to save, reset on new crossing
- `releaseSounding()` now records the released sounding ID before removing it
- Breviary panel renders a new "Released — given up" section below Settled
- Each ghost card shows the sounding name (struck through), the original fragment, and the taking text at reduced opacity, with a hatched background pattern and a note: "this contemplation was set down. It cannot be taken again."
- The ghost slot communicates the loss without being punitive — the text is still readable, still haunting. The `◌` glyph replaces `●`.
- `.sounding-ghost` CSS class with `::after` diagonal hatch overlay and `.sounding-ghost-name/frag/body` sub-classes.

**Suggestion 2 — Cover denomination test scene** (scenes-act2.js, scenes-act1.js):
- New scene `merky_denomination_test`: triggered from `mess_approach` when `act2_unlocked` is set and the scene hasn't been visited; once-only
- Merky requests a memorial service from a crew member whose father has died — the denomination matters to him. He will know if it's wrong.
- Four choices depending on situation: succeed with Cover charism (`denomination_test_passed`), partially succeed with a slight error (`cover_questioned_denom`), pass apophatically with Doubt 2+ (Via Negativa applied, Merky doesn't press), or admit you don't know (`denomination_test_failed`) — which closes the cover but opens a sincere moment
- Four outcome scenes: `merky_denomination_held`, `merky_denomination_partial`, `merky_denomination_apophatic`, `merky_denomination_fail`
- The cover story is now inhabited rather than asserted — you must speak in its voice, not just claim it

**Suggestion 3 — Haircut zero-choice observation scene** (scenes-act1.js):
- New scene `haircut_observation` accessible from `main_deck` hub after `saw_haircut` is set; once-only, hidden after visit
- No choices. The player simply arrives, is present for a few beats, and leaves.
- Scene text: she is doing something complex with her attention. You do not speak. Something in you quiets. Not resolved — quieted.
- The structural complement to the Witness ending: presence-without-action as its own complete thing
- Uses `haircut` ART block

**Suggestion 4 — non_erat_dominus branching** (scenes.js):
- Scene text converted from static string array to `nonEratDominusText(G)` dynamic function
- If `via_negativa` is in `G.soundings.settled`: additional paragraph about the Via Negativa as preparation for this kind of witness — the apophatic theology has been practised, and now it has found its moment
- If `kenosis_thought` is in `G.soundings.settled`: additional paragraph about kenosis as the theology of the empty hand — refusing to sign was a self-emptying, and Pavel's "hardest of the three" gets its theological name
- Registered in SCENES patch block at bottom of scenes.js

**Suggestion 5 — Consequential cargo container roll** (scenes-act2.js):
- `cargo_container` scene now offers a new choice: "Try the lock without knowing the mechanism" — visible only when `knows_release` flag is absent
- Roll: Vigilance vs. difficulty 10 (hard — you're working blind)
  - **Success**: container opens normally → `cargo_container_open`
  - **Partial**: noise carries, Merky hears → `cargo_container_noise` — a tense 2-minute window; the player must choose between going up to meet Merky (cover questioned) or staying to brazen it out (composure check)
  - **Fail**: caught in the act → `cargo_container_caught` — cover immediately compromised, forced into `merky_confrontation` earlier than intended, cover blown if that roll also fails
- This is the first roll in the game where failure permanently changes the crossing trajectory. The player knows the stakes before they roll.

---

## v1.1 — Witness path, audio depth, gold-leaf visual

**New scene — `non_erat_dominus`** (scenes-act3.js):
- Forced interstitial after the Witness ending, before `epilogue_witness`
- Location: The Ship's Chapel — After / mood: uncanny
- Text: the Elijah passage (1 Kings 19) as reflection on chosen inaction — "Non erat in terremotu Dominus." Still small voice theology. No branch, no choices except continuing.
- Rewired `ending_witness` to route → `non_erat_dominus` → `epilogue_witness`

**Bug fix — duplicate Glossary button** (engine.js):
- Floating `glossary` button (fixed position, bottom-right) removed
- Glossary now accessible only via bottom navigation bar (was appearing twice: fixed overlay + bottom nav)

**Audio enrichment** (engine.js):
- Oscillators stored as `_oscNodes` array for runtime retuning
- Per-mood oscillator frequency shift: neutral 50/101/149 Hz → tense detunes down, uncanny drops further, revelation rises to clean harmonic series (55/110/165)
- Low-pass filter (`_filterNode`) retuned per mood: tense 60 Hz (oppressive), uncanny 200 Hz (hollow), revelation 420 Hz (open)
- Convolution reverb added (`_makeReverb`): impulse-response generated in-browser; wet level modulates per mood (tense 8%, revelation 45%)
- **Revelation mood**: strikes a sine bell partial at 880 Hz, 4-second exponential decay, on each mood transition
- **Uncanny mood**: injects a dissonant 333 Hz sine whisper, 5-second fade
- `_applyMoodToAudio()` called on `toggleAudio()` and `_updateAudioMood()` — audio and atmosphere now fully synchronised

**Visual — Halo / Gold Leaf effect** (engine.js, style.css):
- New CSS class `.stxt-halo` with `halo-shimmer` keyframe animation: warm box-shadow pulse, subtle brightness lift, gold-tinted left-edge strip (`::before` pseudo-element using linear-gradient)
- Applied to `.stxt` container when: `scene.mood === 'revelation'` OR any Waking charism (Anamnesis, Kenosis, Tathāgatagarbha, Apophasis) is active in `G.charisms`
- Designed as Transfiguration metaphor: the gold of the Ikon beginning to show through the rust of the Atlantic crossing
- Text paragraphs inside `.stxt-halo` receive a faint `text-shadow` warm glow

**Epilogue enrichment — Freezer Beef** (scenes.js):
- `epilogueWitnessText()` now includes a closing note on Freezer Beef (calico, small, cargo hold), present and asleep throughout the arbitration process
- Text: "Some presences are complete without witness." — mirrors and inverts the Witness ending's moral logic

---

## v1.0 (previous) — Multi-file architecture
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

---

## v0.8 — Dialogue fixes, mission weight, demo version

**Bug fixes:**
- `chapel_porthole`: removed duplicate return button (had both `return_to` and explicit return choice)
- `merky_ship`: "What kind of questions?" now leads to `merky_butterantonio_detail` which correctly describes Butterantonio and distinguishes him from Pavel
- `cargo_container`: sobornost sounding ("transfer and collective belonging") now gated behind `butterantonio_knows` — you must have spoken to Butterantonio first
- `chapel_icon_act2`: text is now a dynamic function — only mentions Sinhola if `met_sinhola` is flagged, otherwise describes what you know from the container itself or from Butterantonio

**Engine fixes:**
- Breviary limit: `taken + settled >= MAX_SOUNDINGS` (4 total ever, not 4 concurrent) — settled soundings no longer free up slots
- Absolute reset: "reset all crossings" button on title screen, clears playCount and pastFlags to zero
- Two charisms: on crossing 2+ (when waking charisms are available), players may choose up to 2 charisms; counter shows X/2 chosen
- Reaction bridge live: choices with `reaction` string prepend it as amber italic paragraph to next scene

**New content:**
- `chapel_documents`: briefing document found in the drawer — Heritage Transfer Services, authentication role, "Confirm only. Do not investigate further." Creates early mission compliance pressure
- `merky_butterantonio_detail`: proper scene explaining who Butterantonio is and what he's doing
- `merky_cover_probe`: Merky follows up on your background story — Cover and Withholding charism gates
- `ship_blessing`: chaplain blesses the ship at the bow; crew members stop and remove their hats
- `crew_pastoral` / `crew_pastoral_stay`: pastoral visit to a crew member with an ill mother; in the extended scene they mention Pavel has been asking about the container

**Pavel clarification:**
- Pavel weeps in `ending_facilitate` from completion/grace, not grief — he is on the side of the return. Added line clarifying this.
- `pavel_about_you` now includes a line making explicit that Pavel is on the side of the return; the people who sent you are not.

**Readability:**
- Panel text significantly brighter throughout (observations, status, breviary)
- Breviary count now readable (`.breviary-count` styled in thought-purple)
- Observations panel organised into categories with bullet points: People, Cover, Charisms, Events
- Phone: slightly larger text and padding on screens ≤500px

**Demo version:**
- `scenes_demo.js`: 44-scene first-act demo ending after initial Pavel conversation
- Drop-in replacement for `scenes.js` in `index.html`
- Custom demo ending: summarises the crossing, names what's at stake, "subscribe for updates"

---

## v0.9 — Dialogue flow fixes, non-sequiturs removed

**Non-sequitur fixes:**
- `merky_tradition` → no longer dumps you silently into cargo after naming your denomination. Each tradition choice has a distinct reaction bridge (Merky's response differs: Orthodox "explains some things about the assignment"; Protestant "not specific enough to mean anything"; Ecumenical "door closing carefully"; Catholic "the company usually sends Protestant"). Leads to new `merky_tradition_exit` which provides a proper conversational close before routing to cargo/deck/passenger.
- `merky_cargo_warning` → each exit choice now has a reaction bridge explaining the transition (ladder aft, heading forward to passenger section, etc.)
- `merky_silence` → exit choices have beats ("you go below, you have a reason")
- `merky_ship` → "Sounds like chaplain work" now has a reaction showing Merky's posture shifting
- `merky_meet` → "Say nothing" has a reaction acknowledging what the silence means
- `butterantonio_docs`, `butterantonio_client`, `butterantonio_stakes` → "go to cargo" exits all have reactions (he watches you go, knows where you're heading)
- `vance_silence` → exit to passenger corridor has a reaction (he doesn't watch you go)
- `vance_route`, `vance_she` → "leave him" exits have brief beats
- `tim_story` → "return to hold" has a quiet beat about what you've just heard
- `chapel_icon`, `chapel_memory` → return choices have closing reactions

**New scenes:**
- `merky_tradition_exit` — proper exit from the tradition scene before you leave the mess
- `merky_beat_ship` — multi-beat entry into the ship conversation: Merky pauses before answering, player chooses how to prompt them (wait / ask about crew / ask about cargo) — each affects tone of Merky's response

**Conversation states:**
- `merky_cover_probe` text is now a dynamic function: if `vespers_liberation` or `merky_alliance` is set, Merky's tone is warmer and less accusatory; they mention the service while raising the cover question

**Remaining from feedback document (still planned):**
- Compendium/glossary panel
- Map screen (notice board map made interactive)  
- Multiple icon pairs on NG+
- Vespers consequences flowing into final act crew assistance
- More populated ship (additional background crew)

---

## v0.9 — Layout, readability, tutorial, non-sequitur fixes

**File renames per spec:**
- `spasibo.html` — full game
- `spasibo-demo.html` — demo build (loads IS_DEMO=true before scenes-demo.js)
- `scenes-demo.js` — 52-scene first act demo
- `engine.js`, `scenes.js`, `style.css`, `CHANGELOG.md` unchanged

**Ship layout:**
- Cargo no longer accessible directly from corridor. Must pass through mess → passenger section → forward hold.
- Passenger corridor text updated to note the forward hold is past this section.
- `cargo_not_ready` updated accordingly.

**Demo:**
- `IS_DEMO` flag drives demo banner in header: "⚓ DEMO — СПАСИБО — First Crossing Preview"
- Demo banner on title screen labels it "DEMO VERSION — Act One Only"

**Tutorial overlay:**
- First crossing, first scene: full-screen overlay explaining status bar, Breviary, Observations, Status, and Abandon Crossing
- Dismissible; state saved, not shown again
- `tutorialDone` persisted to localStorage

**Stat bar tooltips:**
- Hover any stat to see what it governs and what choices it gates

**Font + readability:**
- Base text up to 1.0rem (was 0.93rem); line-height 2.0
- Panel text 0.84rem (was 0.76rem), bright (`--text` not `--dim`)
- Choice text 0.92rem (was 0.85rem)
- Demo banner, stat tooltips, sounding preview all use legible sizes
- Phone: 1.06rem / 0.96rem at ≤500px

**Duplicate button fixes:**
- All scenes with `return_to` that also had an explicit `style:return` choice to the same destination — explicit choice removed (engine's `return_to` renders the button)
- `ship_blessing`: was showing two deck returns; now has one return button via `return_to` + one choice with communion effect
- `freezer_beef_contact`, `freezer_beef_nearby`: duplicate "Climb back up" removed

**"Filing error" phrase removed:**
- "black the way a filing error is black" → "black the way deep water is black"
- "dark as a filing error" → "dark as deep water"

**Breviary improvements:**
- Effect preview shown in Available cards ("When settled: +1 Doubt")
- Suspend option: moves sounding back to Available, loses progress (not permanent deletion)
- Breviary button pulses when soundings are available and waiting

**Cover story in Status panel:**
- Cover values now display in plain English (e.g., "posting_requested" → "Requested posting")

**Sounding slot fix confirmed:**
- `soundingSlotsFull()` checks `taken + settled >= 4` — settling doesn't free slots

---

## v0.9.1 — Ending gates by crossing number

**Core design fix:**
- `ending_facilitate` now requires `playCount >= 1` (crossing 2+)
- `ending_witness` now requires `playCount >= 2` (crossing 3+)
- On crossing 1, `the_choice` shows only one path: complete the mission

**Engine:** Added `requires_playcount` to choice schema. Works identically to `requires_stat` — hidden in Open Water, shown with `[crossing N+]` hint in Attended mode.

**Dynamic text — crossing-aware:**
- `the_choice`: crossing 1 reads as a mission with one clear action. Crossing 2+ surfaces "last crossing you knew what you were supposed to do." Crossing 3+: "you have stood here before. The weight is the point."
- `act3_approach`: crossing 1 is the chaplain completing an assignment they don't yet fully question. Later crossings show accumulating weight and knowledge.
- `ending_intercept`: crossing 1 has no sense of wrongness — Pavel is absent, something is different, you can't locate what. Later crossings: "you knew when you signed."

**Design rationale:** Pavel said you are asleep. On the first crossing, the chaplain is asleep. The ability to refuse, to facilitate return, to witness — these are not options you withhold from the player mechanically. They are options that do not exist yet for the character. The crossing has to change you before you can see them.


---

## v1.0 — All planned features

### Architecture
- **Scene file split by act**: `scenes-act1.js` (Act 1: Chapel, Corridor, Deck, Mess, Passengers — 61 scenes), `scenes-act2.js` (Act 2: Sick Bay, Cabin 2, Engine Room, Cargo, Pavel — 67 scenes), `scenes-act3.js` (Act 3: endings, epilogues — 8 scenes). `scenes.js` assembles them: `const SCENES = { ...SCENES_ACT1, ...SCENES_ACT2, ...SCENES_ACT3 }`. Edit content in act files; engine logic stays in `engine.js`.

### Epilogues
- All three endings now chain to character-specific epilogue scenes (`epilogue_intercept`, `epilogue_facilitate`, `epilogue_witness`)
- Each epilogue is a dynamic function that builds paragraphs based on which characters you met and what you did: Pavel, Butterantonio, Vance, Merky, Sinhola, Eider, Tim all have conditional fate lines
- `ending_facilitate`: if `vespers_liberation` is flagged, crew from below decks helps move the container — they heard the Magnificat and understood it the way Mary meant it
- `epilogue_facilitate` ends with "The next crossing begins differently"

### Memorial Screen
- "the memorial" button on title screen
- Shows crossings completed, all endings reached (with first crossing and charism used), missing endings shown dimly
- Ending data stored in localStorage (`spasibo_endings`) as crossing history

### Atmospheric Shifts from Settled Soundings
- Each sounding now has an `atmos` object with optional properties: `fog_mult` (±), `lamp_steady` (removes flicker), `lamp_warm` (shifts lamp colour), `lamp_bright` (+)
- `Gnōthi Seautón`: fog clears slightly (-0.2 mult) — self-knowledge clarifies the world
- `In Principio`: lamp becomes steady (no flicker) — the Word was in the beginning, the light is constant
- `Agapē` + `Magnificat`: lamp shifts warmer and brighter — love and revolution both illuminate
- `The Empty Set` + `Null Set`: fog deepens slightly — you sit with the unknown
- `Via Negativa`: fog clears slightly — the apophatic path has its own clarity

### Anamnesis Ghost Text
- Scenes with `anamnesis_lines` array show those lines in ghosted italic blue-grey style when `Anamnesis` charism is active and `playCount > 0`
- Added to: `chapel_waking`, `mess_approach`, `cargo_approach`, `the_choice`
- Effect: past-crossing echoes surface mid-scene, haunting the present crossing

### Cover Integrity
- `G.coverIntegrity` (0–10, default 5) tracks how much false-self weight you carry
- Using Cover charism options: +1. Sincerity moments (confessing something true): -2
- If `coverIntegrity >= 8`, Kenosis is locked — you are too full of the false self to empty
- `crew_pastoral_sincere`: Cover charism can choose a moment of sincerity, reducing integrity and unlocking a note
- Integrity persisted to save file

### Glossary Panel
- "glossary" button appears above "observations" in-game
- 10 terms: Icon, Provenance, Church Slavonic, Kenosis, Sobornost, Anamnesis, Via Negativa, Heritage Transfer, Dispersal, Authentication
- Stays open as a reference panel while reading scenes

### Multiple Object on NG+
- `crossing 4+`: the container holds a Torah scroll from a different dispersed community (different loss, same century). The transfer organisation has been moving objects from both communities
- `cargo_container_open` is a dynamic function that branches on `playCount >= 4`

### More Crew / Ship Population
- `mess_crew_atmosphere`: card players in the mess, quietly present
- `deck_night_crew`: a crew member after Vespers, asking if it helped
- `engine_room_atmosphere`: two crew in the engine room, the ship as honest machine

### Cover Story in Status Panel
- Cover values display in plain English ("Requested posting", "Former teacher", "Orthodox")

