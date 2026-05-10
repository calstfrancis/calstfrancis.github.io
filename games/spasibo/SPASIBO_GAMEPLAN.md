# SPASIBO — Game Design Document
## A SOBORNOST Engine Production

---

## Concept

*Spasibo* is a three-act text adventure set aboard a research schooner making a winter North Atlantic crossing. The player is an agent posing as the ship's chaplain, sent on a mission they will come to understand as a kind of erasure — the destruction of a record, a memory, a vessel that carried something holy in its hull. Through acts of mercy, silent sitting, pastoral care, and increasing contact with the strangeness of the ship itself, the player is drawn toward theosis — toward participation in the divine light — and through that participation, toward seeing the ship clearly for the first time.

The ship is named *The Dawn* at first. Then *Zarya*. Then *Заря.*

---

## Theosis Tiers — Engine Configuration

Three tiers, using the `setTheosisTiers()` call:

| Score | Tier | Effect |
|-------|------|--------|
| 0–32  | Asleep | Western names, dim map, partial compass |
| 33–65 | Waking | Russian names in Latin script, fuller map, gold highlights begin |
| 66–100 | Illumined | Cyrillic names, full map, gold everywhere, Cyrillic ending text fragments |

The ship name:
- `registerNameMapping('The Dawn', 'Zarya', 'Zarya', 'Заря')`

Pavel:
- `registerNameMapping('Pavel', 'Pavel', 'Pavel', 'Павел')` — *Note: Pavel begins in his middle form already (not "Paul"), per design spec — he's ahead of the player.*

Miguel (First Mate):
- `registerNameMapping('Miguel', 'Misha', 'Mikhail', 'Михаил')`

Other russifiable characters (pro-Soviet side):
- **Lena / Elena / Елена** — the ship's cook and de facto keeper of its oral history. Knows where everything is stored. Tells you things sideways.
- **Alexei / Alyosha / Алексей** — the ship's meteorologist. Obsessive, gentle, convinced the anomalies are messages.
- **Nadia / Nadya / Надежда** — a junior scientist. Her name means *hope*. She's the one who finds things in the water.

Naming schema for all three: `registerNameMapping(western, latinRussian, latinRussian2, cyrillic)`.

Anti-Soviet / cover side (no russification):
- **Vance Landstorm** — the player's handler, reached only by crackling radio. Never aboard.
- **Kylie Matterhorn** — another passenger, ostensibly a journalist. Watch her.
- **Connie Frank** — ship's doctor. Pragmatic. Keeps her own counsel.
- **Othis Commera** — cargo officer. Something wrong with the cargo.
- **Oblong Vassilithune** — *a name no one questions and everyone avoids*. Present. Possibly always has been.

Cats: **Haircut** and **Freezer Beef** carry over from Severed Hours — same energy, same mystery. Freezer Beef appears in the hold. Haircut is on the bridge. Neither explains themselves.

The Stink Patrol: referenced only in ambient events, whispered about by Lena and Alexei. Their purpose is unclear. Their jurisdiction seems to be below the waterline. There is a faint warmth to their reputation.

---

## Stats

Standard SOBORNOST stats, renamed for the crossing:

| Key | Name | Description |
|-----|------|-------------|
| `vigilance` | **Bearing** | Situational awareness; cover and detection rolls |
| `composure` | **Stillness** | Pastoral presence; theosis-advancing actions |
| `communion` | **Solidarity** | How much you've given of yourself to others |
| `doubt` | **Static** | Internal noise; rises with cover strain, falls with theosis |

`awareness` remains the hidden meter (as in Severed Hours).

---

## Charisms

### Sleeping Charisms (first crossing, player selects one)

1. **The Confessor** — *People tell you things they shouldn't.* Unlocks additional dialogue branches where characters confess without being prompted.
2. **The Faster** — *You have trained the body's hunger into a tool.* Stillness-based theosis actions cost nothing; the body does not protest.
3. **The Fool** — *You say the wrong thing and it turns out to be right.* Occasional random-positive outcomes on failed rolls.
4. **The Healer** — *You know what people need before they name it.* Unlocks Connie Frank friendship track; medical assistance options.

### Waking Charisms (subsequent crossings, assigned by previous theosis level)

| Previous Theosis | Assigned Charism |
|-----------------|-----------------|
| < 20 | **The Sleeper** — *You forgot. Almost everything. But something stayed.* Occasional flashes. |
| 20–45 | **The Penitent** — *You know what you did.* Past-life flags bleed into scene text. |
| 46–70 | **The Witness** — *You saw something, last time. You're not sure what.* Map memory. |
| 71–89 | **The Prophet** — *You see through the anomaly.* Magnetic interference scenes reveal additional text. |
| 90–100 | **The Rememberer** — *You have been on this ship before.* `pastLifeFlags` cause significant scene alterations; Pavel's name appears in Cyrillic from scene one. |

---

## Cover System

The player's cover is built during Act One through dialogue. Five fields:

| Field | Options |
|-------|---------|
| `posting` | Hospital chaplain / Prison chaplain / Military chaplain |
| `background` | Roman Catholic / United Church / Unaffiliated |
| `denomination` | (same as background, but how you *present* it — may differ) |
| `connection` | Sent by the Academy / Sent by a diocese / Freelance |
| `left` | Left something behind (a parish, a person, a conviction) — the emotional anchor of the cover |

Cover integrity degrades when: the player acts theotically in ways inconsistent with their stated posting; when Kylie Matterhorn directly challenges them; when the anomalies make pastoral performance impossible.

A blown cover doesn't end the game — it opens a different path.

---

## The Magnetic Anomaly System

The Zarya is non-magnetic for a reason: ferrous instruments corrupt the geomagnetic data. But the anomalies the ship encounters are not merely scientific.

Engine implementation: a `compassAxes` system tracking magnetic deviation. `registerCompassAxes()` sets current and true north divergence. When deviation exceeds threshold:

- Scene text gains interference fragments (struck-through or ~~wavering~~ words)
- Certain map nodes become inaccessible, others newly accessible
- Characters with high Static become distressed or evasive
- Characters with high Solidarity become unexpectedly lucid
- Pavel, always slightly ahead, seems unaffected — and mentions it

Anomaly events (registered as ambient events):
1. **The Quiet Noon** — compasses agree perfectly for one hour. Unnerving.
2. **The Crossing** — deviation reaches maximum. Maps fold. Alexei weeps.
3. **The Return** — deviation begins to resolve. Something becomes visible beneath the keel.
4. **The Bronze** — the ship's bronze fittings hum at a frequency no one can identify.

---

## The Ship — Location Map

Registered via `registerMapNode()`. Theosis gates which nodes appear on the map panel.

```
[Foredeck] — [Bridge] — [Chart Room]
     |              |
[Forecastle] [Captain's Quarters]
     |
[Main Deck] — [Mess Hall] — [Galley]
     |              |
[Hold Access]   [Passenger Cabins]
     |
[Hold] — [Cargo Bay] — [Instrument Room]
                              |
                         [Aft Compartment] (engine/ferromagnetics)
```

Map fidelity by tier:
- **Asleep**: Foredeck, Bridge, Mess Hall, Passenger Cabins visible
- **Waking**: + Chart Room, Galley, Hold Access, Hold
- **Illumined**: + Cargo Bay, Instrument Room, Aft Compartment; the Aft Compartment is labeled differently at this tier

The Aft Compartment is where the ferromagnetic machinery is stored — isolated from the rest. At the highest tier, its label changes to something the player must sit with.

---

## Three-Act Structure

### Act One: *The Waking* (Day 1)

**Goal:** Establish cover, meet the ship, begin the mystery.

- Player wakes in their cabin with no memory of boarding. Standard SOBORNOST opening.
- First scene: the porthole. The sea. The sound of sails.
- Early: encounter Pavel at breakfast. He's already talking. He knows your name. He doesn't say how.
- Cover-building dialogue with Miguel (First Mate), Kylie, Connie Frank throughout Act One.
- First Sounding available: *On the nature of a crossing.* Pastoral; +Stillness.
- Discovery: in the Chart Room, evidence of the ship's history — the Atlantic surveys, the scientific logs. At low theosis, these seem bureaucratic. At higher (if second crossing), they glow a little.
- Act One end trigger: player discovers their mission documents, concealed in the Instrument Room. The mission is to recover or destroy a specific cargo. The cargo is labeled. They don't yet understand what it is.

### Act Two: *The Crossing* (Days 1–3)

**Goal:** Pastoral care, deepening relationships, magnetic anomalies, cover strain.

The act is structured around the anomaly system and the character relationships. The player is nudged (not corralled) by:
- Deadlines: Sunday service to lead (mandatory pastoral beat)
- Quests from Lena, Alexei, Nadia — each requiring solidarity acts
- Cover challenge from Kylie Matterhorn mid-act
- A death (or near-death) in Act Two — handled by the player as chaplain
- Three Soundings available (theosis gating)

The Sunday service is a ritual (`registerRitual()`). It advances theosis significantly. If the player's cover is United Church, they may lead a service closer to their true self; if Roman Catholic, there's a different rite and different NPC reactions.

Cats: Haircut appears on the bridge during the Quiet Noon anomaly. Freezer Beef is found in the Hold, sitting on the cargo. This is noticed by Othis Commera, who reacts with disproportionate alarm.

Act Two ends with the player reaching the cargo. What they find in the cargo is the physical archive — charts, photographs, logbooks — of the Zarya's decades of scientific voyaging. The history of the ship. Othis Commera tells them: these are to be destroyed. Vance Landstorm confirms this by radio. *The mission is to burn the memory.*

### Act Three: *The Return* (Day 3)

**Goal:** Decide. What are you willing to carry?

Three ending tracks, gated by theosis and flags:

| Theosis | Track | Description |
|---------|-------|-------------|
| 0–32 | **Erasure** | The player completes the mission. The cargo is destroyed. The ship's history ends here. A cold ending. |
| 33–65 | **Witness** | The player refuses. They hide the archive. They escape with what they've seen. The ship continues under another name. An ending of wounded hope. |
| 66–100 | **Restoration** | The player refuses, and goes further: they transmit the archive. They broadcast it. The record of the Zarya goes into the world — irretrievably. Pavel is there. He says something that finally makes sense. The name changes to Cyrillic in the final scene. |

A fourth ending, accessible only with **The Rememberer** charism and 90+ theosis (second+ crossing):
**The Knowing** — The player has been here before. They know what the cargo is. They secured it last crossing. This crossing, they secure *themselves.* The ending addresses the player directly.

---

## Engine Changes Required

### 1. `setTheosisTiers()` — new tier definitions
Replace default icon/ikon tiers with ship-name tiers. The word function needs to return the *ship name* at each tier, not "icon/ikon."

Override approach: use `setShipWordFunction()` to return the appropriate ship name. Register name mappings for all characters.

### 2. Compass system activation
`registerCompassAxes()` and `updateCompass()` — implement magnetic deviation as a stat-like float (`G.magneticDeviation`). Add to `G` state, add to save/load, add ambient events tied to deviation thresholds.

**Engine addition needed:** `G.magneticDeviation` field, a `setMagneticDeviation(val)` function, and a `checkMagneticAnomalyEvents()` function called from `advanceTime()`.

### 3. Interference text rendering
At deviation > 0.5, scene text should apply a CSS class `interference` to random spans in the prose. Implement in the renderer's `processText()` function as an optional markup tag: `{~struck text~}` renders as wavering/struck text at high deviation, normal text at low deviation.

### 4. Sunday Ritual
Register as a `ritual` with three phases: Gathering, Word, Response. Each phase is a scene-like structure. Completion grants significant theosis (+12) and sets flag `sunday_service_led`.

### 5. Map node gating by theosis
`registerMapNode()` already exists. Add `theosisRequired` property to node data, checked in the map panel renderer before displaying a node.

### 6. `G.magneticDeviation` — new state field

```js
// Add to G:
magneticDeviation: 0.0,  // 0.0 = true, 1.0 = maximum anomaly

// New function:
function setMagneticDeviation(val) {
  G.magneticDeviation = Math.max(0, Math.min(1, val));
  emit('magneticDeviationChanged', G.magneticDeviation);
  scheduleRender();
}
```

---

## Writing Style Notes

The prose aims for a synthesis of:
- The devotional directness of the combined writings (address, second person, prayer-rhythm)
- Dostoevsky's habit of giving characters too much interiority, then cutting it off
- Chernyshevsky's stubborn faith that the world can be made better if people are honest about what they want

Sentences should breathe. Short. Then long and subordinate. Then short again like a door closing.

Pavel talks in unpunctuated cascades — not stream of consciousness, but *overflow*, like a man who has been alone for months and suddenly has an audience. He is correct about everything important. He is wrong about most things practical.

Lena does not explain. She hands you things. 

Miguel (the First Mate) has the quiet of a man who has been on this ship for fifteen years and knows which sounds are the ship settling and which sounds are something else.

The anomalies are never explained. The game does not explain them. Alexei has theories. They are plausible. They are probably wrong in the ways that matter.

---

## File Structure Required

```
spasibo/
  index.html          — game shell
  style.css           — full visual theme (gold/cold/northern palette)
  sobornost.js        — engine (upstream, unchanged except magnetic deviation patch)
  game.js             — all scene registration, charisms, endings, NPCs
  scenes/             — (logical grouping; will be inlined into game.js for v1)
    act1.js
    act2.js
    act3.js
    endings.js
```

For first delivery: `index.html` + `style.css` + `game.js` (all scenes inline) + patched `sobornost.js`.

---

## Theosis Carry-Over Between Crossings

`newPlay()` already preserves `G.theosis`. For Spasibo:
- Full theosis carries to the next crossing's starting value
- But: a **Crossing Tax** of 15 points is deducted. *The body forgets. The soul does not forget all of it.*
- Minimum carry: 5 (something always remains)
- Maximum carry: 85 (the final 15 must be re-earned)

Implementation: override `newPlay()` call sequence — apply tax before `resetG(preserve)`:
```js
const carriedTheosis = Math.max(5, Math.min(85, G.theosis - 15));
const preserve = { theosis: carriedTheosis, ... };
```

This must be patched into `sobornost.js`.

---

## Immediate Next Steps

1. **Engine patch**: add `magneticDeviation` to state, save/load, and `setMagneticDeviation()` to public API. Apply theosis carry-over tax to `newPlay()`.
2. **`style.css`**: northern palette — cold blues, bronze, fog whites, gold highlights at higher theosis tiers. Porthole motif.
3. **`game.js`**: charisms, name mappings, theosis tiers, stats, Act One scenes through the mission document discovery.
4. **`index.html`**: shell, atmospheric canvas, bottom nav.

Subsequent sessions: Act Two scenes, ritual system, Act Three and endings.
