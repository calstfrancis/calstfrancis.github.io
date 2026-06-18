# Spasibo — Bug Fix & Depth Phases (Round 3)

Adversarial review conducted June 2026. All prior phase issues are resolved.
Fix in sequence. Phase 1 is blocking; Phases 2–4 can be parallelised.

---

## Phase 1 — Critical: game-breaking and hard locks

---

### 1a. `the_arrival` is a completely orphaned scene

**Problem:**

`the_arrival` (line 7278) is defined and fully written — "Main Deck — Night",
`mood: 'revelation'`, sets `the_arrival_seen`. But there is no `next: 'the_arrival'`
anywhere in `game.js`. Nothing routes to it. It is dead.

This scene reads like it should be a late Act Two or early Act Three event: the
protagonist stands on deck and understands something is coming. If it is supposed to
be a hub choice or an ambient event, that wire is simply missing.

**Fix:**

Determine the intended trigger. Based on the scene text and mood, the most natural
wire is in `act_two_resolve` — add it as a one-time choice gated on
`!the_arrival_seen` and some theosis threshold, e.g.:

```js
{ text: 'The main deck. Something is different tonight.',
  next: 'the_arrival',
  condition: { type: 'and', conditions: [
    { type: 'theosis', min: 40 },
    { type: 'not', condition: { type: 'flag', id: 'the_arrival_seen' } },
  ]}
},
```

Alternatively, wire it as an ambient event that fires on first entry to
`main_deck_hub` after `act_three_begun` is set, if the scene text fits that beat.
Confirm the intended beat before wiring.

**Verification:** Navigate to `act_two_resolve` or `main_deck_hub` at the right
state and confirm the choice appears and resolves.

---

### 1b. Lena's full arc is permanently blocked for players who don't lead the service

**Problem:**

`lena_arc_3` (line 5865) requires `sunday_service_led` in addition to
`lena_fragment_2_seen`. There is no other path into it. If the player does not
lead the Sunday service — which is optional, unlabelled as a prerequisite, and
easy to miss if they are playing a non-pastoral character — `lena_arc_3`,
`lena_arc_4`, and `lena_arc_5` are permanently unreachable. This is Lena's
primary character arc (the Volkov connection, the ship's memory, the solidarity
dimension). Losing it silently is severe.

The service is offered in two places (lines 3300 and 8554) but neither signals
that leading it is required to continue Lena's story.

**Fix — two options (choose one):**

*Option A (preferred):* Drop the `sunday_service_led` gate from `lena_arc_3`
entirely. The arc-3 scene is set in "Galley — After the Service" by name — keep
that flavour text, but don't hard-gate it. It makes narrative sense that Lena
talks after a service she witnessed even if the player didn't lead it; add a line
acknowledging it was someone else's service if the flag is absent.

*Option B:* Keep the gate but add a note in `galley_hub` when `lena_fragment_2_seen`
is set but `sunday_service_led` is not:

```js
{ text: 'Lena — she is waiting for something.',
  next: 'lena_service_hint',
  condition: { type: 'and', conditions: [
    { type: 'flag', id: 'lena_fragment_2_seen' },
    { type: 'not', condition: { type: 'flag', id: 'sunday_service_led' } },
    { type: 'not', condition: { type: 'flag', id: 'lena_fragment_3_seen' } },
  ]}
},
```

Where `lena_service_hint` is a tiny scene where Lena tells the player she'll have
more to say after the service on Sunday.

---

## Phase 2 — Medium: soft locks, misleading mechanics, and invisible systems

---

### 2a. Solidarity sounding is never explained — the ending is silently unreachable

**Problem:**

The Solidarity ending (line 950) requires `solidarity_sounding_settled`. Settling
a sounding is the active game mechanic where the player holds a question until it
resolves. The sounding is offered in six places (lines 2311, 3433, 3576, 4066,
4885, 6152), but:

1. The sounding UI is never introduced or explained. A first-time player can dismiss
   it without realising they've closed off the ending.
2. If the player has dismissed every sounding offer without settling, there is no
   recovery path.

**Fix:**

On first offer of `sounding_solidarity` (line 2311 in `hold_first`), add a brief
UI hint that a "sounding" is something worth staying with — even a single
tooltip-style line in the choice text: "Hold this. Let it sit." that signals
this is a mechanic with weight, not just flavour.

Additionally, ensure at least one offer of `sounding_solidarity` appears in
`act_two_resolve` hub (late enough to still be settleable) as a fallback for
players who dismissed the earlier offers.

---

### 2b. Cover/vigilance/doubt system has no payoff moment

**Problem:**

The game tracks `vigilance` and `doubt` throughout — vigilance gained through
careful play, doubt accumulated through cover challenges and suspicious encounters.
But these stats never cause a scene. There is no "cover blown" moment, no
confrontation triggered by doubt exceeding a threshold, no difference in how Othis
or Kylie treats the player based on vigilance level. The `othis_confrontation`
(line 3843) fires on a flag, not on stats. The stats decay into irrelevance.

This is a weak implementation of what could be the game's tension engine.

**Fix — minimum viable:**

Add a single `doubt` check at the start of `othis_confrontation`: if doubt >= 7,
the confrontation opens with Othis already suspicious ("She is not asking. She
knows something is wrong."), and the player has fewer choices. If doubt <= 2,
Othis is unsure and the player has more room to deflect.

Similarly, wire `vigilance` into at least one late scene — e.g., in
`kylie_cover_contradiction` (line 7320), if vigilance >= 5, add a choice to
pre-empt Kylie's question with a controlled disclosure.

This makes the stats meaningful without rewriting the whole system.

---

### 2c. Theosis gate for Witness ending is too low — the ending feels like a default

**Problem:**

The Witness ending (line 1000) requires `mission_refused` and `theosis >= 33`.
Theosis of 33 is reachable by mid-Act One for any player who reads a few logs and
talks to the crew. Combined with the routing fix from Phase 1b (which removed the
old `t >= 33` hard gate), refused players with almost no exploration now route to
Witness. The ending is supposed to mark someone who saw what the ship was, refused
complicity, and bore witness — but it fires for players who refused on instinct
without engaging with the material.

**Fix:**

Raise the Witness theosis gate to 50. This ensures the player has genuinely
engaged with the archive and the anomaly before arriving at the ending, while
still leaving it reachable without a completionist run.

Update line 1006 (`{ type: 'theosis', min: 33 }`) and the comment at line 939.

**Note:** The routing in `day_three_landing` now has two Witness branches — the
`refused && t >= 33` check at line 10286 (original gate) and the new `else if
(refused)` fallback at line 10293. With this fix, raise the `t >= 33` on line
10286 to `t >= 50` as well, so the thresholds are consistent.

---

### 2d. Charism system is invisible to players at the moment it matters

**Problem:**

Multiple high-value choices require charisms (`confessor`, `rememberer`,
`witness`): e.g., `pavel_monologue` (line 1691), `rememberer_bow_knows` (line
1692), the `pavel_ferromagnetic` route (line 1820). These choices are hidden from
players who don't have the charism — the player never knows they missed them.
First-time players have no charisms. The charism description in the codex is never
surfaced proactively.

**Fix:**

When a player without a required charism visits a scene that has charism-gated
choices, and all gated options are hidden, add a visible but non-interactive hint
choice (styled differently, e.g., greyed out with an annotation):

```
'You sense there is more to say here, but you do not have the words for it.'
```

This doesn't break immersion but signals to the player that something was missed
and may be available on a future crossing. It turns an invisible gate into a
legible one.

---

## Phase 3 — Depth: thin characters and underused narrative threads

---

### 3a. Warm Hands: 8 scenes with no grounding

**Problem:**

`warm_hands_encounter` through `warm_hands_spoken` (8 scenes total) introduce an
entity who communicates via notes, gestures through a hatch, and operates through
favours. The entity is never named, described, or contextualised. There is no
codex entry. No character on the ship acknowledges them. For a player who stumbles
into these scenes without a framing context, the Warm Hands reads as surreal
flavour rather than a meaningful strand.

**Fix:**

Add a codex entry for Warm Hands unlocked after `warm_hands_encounter`. The entry
should not explain what they are — that ambiguity is intentional — but should give
players language for thinking about them ("Someone has been on this ship longer
than the crew.") and flag that other crew members may have encountered them.

Additionally, wire one indirect acknowledgement of Warm Hands into an existing
scene. The best candidate is Connie: she's the ship's doctor, she's aware of the
crew's wellbeing, and a moment in `connie_emergency` or `compline_connie` where
she says something like "There are hands in this ship that aren't ours" would
ground the entity without over-explaining.

---

### 3b. The Sunday service mechanic has hidden consequences

**Problem:**

The Sunday service ritual (lines 812–902) has 4+ meaningful choices: word
selection, intercession style, how to close. These choices set flags
(`service_word_true`, `service_intercession_held`, `service_stayed`,
`service_dialogue`) that affect downstream content (e.g., `lena_arc_3` location
text, `sunday_congregation` responses). But the player has no sense that these
choices matter — they read as flavour inside a ritual, not as decisions with
persistent consequence.

**Fix:**

After the service, `sunday_service_aftermath` (line 3301) or
`sunday_congregation` (line 3315) should reflect the specific choices made. If
this is already partially implemented, audit that the branching actually differs
based on service flags. If not, add 2–3 lines in `sunday_congregation` that
respond to `service_word_true` vs `service_dialogue` vs `service_stayed`.

This is about making consequences legible, not adding content.

---

### 3c. Miguel is underdeveloped relative to the other crew

**Problem:**

Every other named crew member has a multi-scene arc with escalating disclosure:
Lena has 5 fragments; Pavel has the riddle chain plus several depth scenes; Alexei
has the instrument room scenes and the private log; Connie has the emergency chain.
Miguel has two dedicated scenes (`miguel_why_fifteen_years`, `miguel_what_ship_knows`
around lines 8048–8118) and a `miguel_intermediate` scene (line 12482). His
connection to Irina and to the 15-year service record is set up but never resolved.

**Fix:**

Add one scene between `miguel_intermediate` and Act Three that closes Miguel's
loop — specifically: what happened the previous crossing that made him stay. This
doesn't need to be long (300 words). It should set a flag (`miguel_arc_complete`)
that unlocks a small recognition moment in `act_two_resolve` hub where Miguel
gives the protagonist something (physical or verbal) for the ending.

---

## Phase 4 — Polish: UX and narrative clarity

---

### 4a. Hub choice text in `act_two_resolve` does not signal location shifts

**Problem:**

`act_two_resolve` is location-tagged "Day Three — The Crossing" but its choices
navigate to instrument room, chart room, foredeck, hold, and galley scenes with no
transition text. The player jumps from an abstract crossing-day header to a
specific room with no motion. This is a recurring issue throughout the hub
(partially fixed in Phase 1 of this plan for `anomaly_fibonacci`), but several
choices still read as teleportation.

**Fix:**

Audit all choices in `act_two_resolve` that navigate to a location with a
different `location:` tag from the hub. For each, ensure the choice text names
the destination or the motion ("Go to the instrument room", "Alexei — in the
instrument room", etc.) rather than just the dramatic beat ("The instruments are
past their range.").

---

### 4b. `lena_arc_4` has a second entry point that bypasses the arc gate

**Problem:**

`lena_arc_4` is reachable from `galley_hub` (line 2077, gated on
`lena_fragment_3_seen`) but also from a choice in another scene at line 8981
(`lena_arc_4` gated only on `!lena_fragment_4_seen`). The second entry point
does not check `lena_fragment_3_seen`. A player who stumbles into the
`lena_arc_4` scene via line 8981 without having seen arc 3 will get the Volkov
revelation without the build-up, breaking the narrative sequence.

**Fix:**

Add `{ type: 'flag', id: 'lena_fragment_3_seen' }` to the condition on the line
8981 entry point.

---

## Fix order summary

| # | Phase | Issue | Effort |
|---|---|---|---|
| 1a | 1 | Wire `the_arrival` scene into the game | Small |
| 1b | 1 | Remove or replace `sunday_service_led` gate on `lena_arc_3` | Small |
| 2a | 2 | Add solidarity sounding explanation + fallback offer | Small |
| 2b | 2 | Wire `vigilance`/`doubt` into `othis_confrontation` and `kylie_cover_contradiction` | Medium |
| 2c | 2 | Raise Witness theosis gate from 33 to 50 (two locations) | Trivial |
| 2d | 2 | Add greyed-out charism hint for locked choices | Medium |
| 3a | 3 | Add Warm Hands codex entry + Connie acknowledgement | Small |
| 3b | 3 | Audit service choices → `sunday_congregation` feedback | Small |
| 3c | 3 | Write Miguel resolution scene + `act_two_resolve` recognition | Medium |
| 4a | 4 | Audit hub choice text for location clarity | Small |
| 4b | 4 | Add `lena_fragment_3_seen` gate to line 8981 entry point | Trivial |
