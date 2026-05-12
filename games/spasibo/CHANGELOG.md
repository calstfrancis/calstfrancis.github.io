## v2.2 "The Field Answers" — May 2026

### All Ten Group-1 Engine Systems Now Active

**1. Choice-level `mod_stance` / `record_memory` / `come_to_believe` / `thought`**
These fields have always been handled by `applyChoice` but were never used in choices directly — everything went through `onEnter` wrappers. Now: `tags`, `come_to_believe`, and `thought` can be set inline on choices. The `thought` field maps to `offerSounding` — sounding offers can now emerge from choices declaratively.

**2. `thought` choice field**
Four choices now carry `thought: 'sounding_X'` — offering a sounding as the natural result of a contemplative choice rather than a separately wired `onEnter` call. Compline Connie, Alexei sit together, hold blessing, Nadia 1978 sit.

**3. `advance_time`**
`S.advanceTime()` exported and wired. The Sunday service advances 2 hours. The archive transmission advances 4 hours. Time now actually passes during significant events, which means the liturgical hour changes as a consequence of major actions and Landstorm's deadline fires organically.

**4. `applyAutoAlignment` + sounding tags**
All five soundings now have `alignmentTags`:
- `sounding_crossing`: `['stillness', 'presence', 'silence', 'crossing']`
- `sounding_forgiveness`: `['pastoral', 'forgiveness', 'presence', 'witness']`
- `sounding_history`: `['history', 'archive', 'witness', 'memory']`
- `sounding_solidarity`: `['solidarity', 'presence', 'pastoral', 'witness', 'suffering']`
- `sounding_sobornost`: `['solidarity', 'sobornost', 'crossing', 'memory', 'witness']`

Four key choices now carry `tags` arrays: hold sit, lena silence, foredeck standing, compline connie stay, alexei sit together, hold bless archive. When a tagged choice is made, `applyAutoAlignment` advances all active soundings that share a tag by 1. Sounding progression now emerges from aligned behaviour rather than manual `progressSounding()` calls.

**5. Note system**
Eight notes registered and wired to `flagSet` events. When a flag fires, the corresponding note is automatically added to `G.notes` and appears in the observations panel:
- `zarya_log_read` → the ship's older name
- `volkov_photo_found` → the photograph, В
- `nadia_1978_found` → the 1978 gap, evidence
- `stink_patrol_hands_known` → warm hands through a hatch
- `anomaly_responds_seen` → the instruments show the anomaly receiving
- `archive_discovered` → thirty years, five countries
- `oblong_departed` → Lena has no memory of him
- `anomaly_signal_returned` → the field answered

**6. Push consequence**
`S.pushConsequence` wired to `mission_refused_miguel`. When the player refuses the mission at Miguel's scene, a delayed consequence queues `miguel_knows_refusal` flag to be set 3 scenes later — Miguel's body language changes after a delay rather than immediately.

**7. Codex auto-unlock**
`checkCodexUnlocks()` is now called on every `navigate()`. Five codex entries have `unlockCondition`:
- `codex_theosis`: theosis ≥ 33
- `codex_zarya_history`: flag `zarya_log_read`
- `codex_solidarity`: communion ≥ 5
- `codex_the_archive`: flag `archive_discovered`
- `codex_the_mission`: flag `mission_reality_known`

These unlock automatically when conditions are met — no manual `unlockCodexEntry()` call needed.

**8. NPC memories surface in dialogue**
Three scenes now read `hasNpcMemory()` to alter text:
- `bridge_hub`: if Miguel remembers "found photograph and returned it" — the photograph is in the air between you. If he remembers being told about the archive — he has adjusted something in how he stands.
- `galley_hub`: if Lena remembers "sat in silence without asking" — she already knows how to be in the same room as you.
- `alexei_doubt`: if Alexei remembers "Palamas — thirty years without knowing" — *He has been here since the Palamas conversation. Thinking.*

**9. SFX — 5 sounds registered**
`initBuiltinSfx()` called on first audio enable. Five sounds:
- `sounding_settle`: warm sine chord (fundamental + overtones, 2.2s fade) — fires on every sounding settlement
- `cover_fail`: descending triangle oscillator triplet (340→290→240 Hz) — fires on cover challenge failure
- `transmission`: bandpass-filtered noise bursts (radio crackle) — fires on archive transmission
- `anomaly_drone`: deep chord (40/47/53 Hz, 5s fade) — fires on anomaly peak
- `theosis_moment`: rising harmonic series (330→440→550→660 Hz, staggered onsets) — fires on tier crossing

**10. Quest system**
Three quests registered and wired to `flagSet` events:
- `quest_pavel_riddle`: inactive → started → midway → completed
- `quest_radio_assembly`: inactive → found → assembled → completed
- `quest_solidarity`: inactive → signal_received → completed

Quest states are queryable with `isQuestActive()`, `isQuestCompleted()`, and conditions using `type: 'quest'` (pending engine condition support).

### Scene Count: 254 defined, 0 missing

## v2.1 "The Cover" — May 2026

### What This Release Fixes

The previous rating identified three things limiting the ceiling:
1. Cover challenge outcomes not narratively differentiated
2. Most NPC conversations still monologue blocks despite dialogue system being live
3. Meta-unlock system registered but no content gated on it

All three are now addressed.

---

### 1. Cover Challenge Outcome Scenes — 12 new scenes

The cover challenge system previously showed dice results and dismissed. Now `dismissCoverChallenge()` reads the field and outcome, navigates to a field-specific outcome scene, and that scene shows what actually happened to the conversation.

**Background (Kylie):**
- Success: She caps her pen. "Fine." She is still watching.
- Partial: She doesn't cap the pen. *I am filing this and I will return to it.* The field is tender.
- Failure: The pen moves faster when she is interested. "We can come back to it." She will.

**Posting (Connie):**
- Success: She nods. Sufficient — not fully convincing, but sufficient.
- Partial: "Hm." Clinical neutrality. Something noted in a chart not to be shared.
- Failure: "The protocols you described changed in 2019." She picks up her pen. She is not accusing. She is noting she noticed something specific.

**Left (Connie/Kylie):**
- Success: True enough — or true in the parts that mattered.
- Partial: "That makes sense." The tone of someone for whom it makes sense as a statement and less sense as a complete account.
- Failure: A pause that lasts one beat too long. "Right." Something gets written. The left-behind field is the most personal failure.

**Connection (Othis):**
- Success: A brief log entry. Now it exists. That is worse than if it had been wrong.
- Partial: "I may need to verify that later." He means it procedurally. The procedural meaning is worse than a threat.
- Failure: "That name is not in the current directory." He will confirm independently. Landstorm will see the note.

### 2. Dialogue System — 4 first-meeting scenes converted

The dialogue system has been live since v1.9 but only wired into one scene. Now four first-meeting scenes use beat-by-beat dialogue:

**`foredeck_first` (Pavel):** Six beats. The player advances through his mid-sentence arrival, his cascade about the ship and ferromagnetism and moral clarity, his turning around, his recognition of the chaplain. *His name, it turns out, is Pavel.* Each advance is a choice to let him continue. The rhythm of his thought is experienced as time rather than read as text.

**`galley_first` (Lena):** Five beats. She hands you coffee without being asked. She looks at you — not waiting, not examining. She says: *Chaplain.* She returns to the fish. The conversation is the absence of conversation.

**`alexei_first` (Alexei):** Six beats. He enters holding a printout. He notices you instead of the coffee. He sits with the urgency of someone who has been saving a question. The question arrives in two beats: field as tendency, then the theological implication.

**`nadia_first` (Nadia):** Four beats. The smile is quick and real. She is glad there is a chaplain. She returns to her tablet. She is still smiling. The warmth is given its own beat to land.

### 3. Meta-Unlock Content

**Title screen marks:** The title screen now shows ✦ through ✦✦✦✦✦ based on which endings have been reached across all crossings. Persists in localStorage. A player who has reached all five endings sees all five marks.

**`crossing_tax_lived` variants:** The second-crossing wake scene now reads differently depending on cross-crossing achievements. Players who have reached Restoration get a line about carrying the transmission forward. Players who have reached The Knowing get a line about the ship feeling less like a place to go and more like a place to become.

### Engine Changes

`dismissCoverChallenge` now routes to `cover_[field]_[outcome]` if the scene exists, then falls back to `cover_challenge_[outcome]`, then falls back to re-render. The challenge overlay result display is richer: separate dice display (`[4]+[3]`), narrative outcome text ("The cover holds" / "It holds — barely" / "The question lands"), charism bonus notation if applicable.

### Scene Count: 254 defined, 0 missing
## v2.0 "Sobornost" — May 2026

### Six More Engine Systems Activated

**1. Ghost Text + Micro-Lines** — Both stubs implemented. At `magneticDeviation > 0.7` or `doubt >= 6`, ghost fragments bleed into scene text at paragraph breaks: *( the field receives )*, *( Заря )*, *( the record persists )*. At Illumined tier (theosis ≥ 66) or deviation > 0.6, micro-observation lines appear at the end of specific scenes — quietly wrong observations about the sea, Freezer Beef, the coffee, the compass. Both are probabilistic (40% and 60% respectively) so they surface across multiple visits rather than every time.

**2. UI Opacity** — `setUiOpacity` now wired to magnetic deviation: above 0.5, the game-body wrapper fades proportionally (minimum 0.72). At peak anomaly (1.0), the interface is subtly washed out. The fade is applied to the game-wrap div on every render. The dissociation during the anomaly peak is now physically present in the interface.

**3. Items with Registered Effects** — All four items now registered with `registerItem`: `zarya_photograph` (+1 communion while held), `volkov_photograph` (+1 composure), `both_photographs` (+2 communion, +1 composure), `stink_patrol_paper` (+1 vigilance). The held-effect system was already functional in the engine — `recalculateHeldEffects` fires on item acquisition and applies bonuses to stats. Items now have names and descriptions that show in the inventory panel.

**4. Scene Pools** — Three ambient pools registered with weighted, conditioned entries. Proxy scenes (`pool_main_deck_ambient`, `pool_foredeck_ambient`, `pool_hold_ambient`) call `navigateToPool()` on entry and navigate to a random available scene. Nine pool scenes written:
- Main deck: `main_deck_haircut` (Haircut surveys the ship), `main_deck_nadia_clouds` (the clouds above anomalies are slightly wrong), `main_deck_miguel_adjusts` (adjusting a line that doesn't need adjusting; "good weather"), `main_deck_anomaly_sky` (the gap between the surface and what is below)
- Foredeck: `foredeck_compass_reading` (twelve degrees; the needle wants to go home but home has moved), `foredeck_cats_together` (Haircut and Freezer Beef in shared space; you sit between them), `foredeck_pavel_rope` (Pavel holds a rope and does not explain it until asked; "thank you for asking, he means it")
- Hold: `hold_freezer_beef_survey` (Freezer Beef's systematic inspection; her results are known only to her), `hold_sounds_below` (the Stink Patrol's work, heard from above; Freezer Beef finds this entirely expected)

**5. Progress Trackers** — Three registered: Pavel riddle chain (3 steps, fires "Pavel is waiting" toast on completion), solidarity prerequisites (5 conditions, fires "Something is cohering" toast when all met), radio assembly (3 steps, fires "The radio is ready"). Wired into key flag-setting moments.

**6. Meta-Unlocks** — Fire on each ending reached, persisting across all crossings in `localStorage`. Five meta-unlocks: `reached_erasure`, `reached_witness`, `reached_restoration`, `reached_solidarity`, `reached_the_knowing`. These form the foundation for cross-crossing acknowledgment — content gated on `hasMeta()` can now be registered.

**7. Pavel as Companion** — `addCompanion('pavel', {...})` now called when the player invites him aboard. `modCompanionStat('pavel', 'trust', n)` fires when trust builds. Pavel's trust stat (≥ 3) adds +1 to social composure rolls via the roll modifier system. His companion stats mirror his stance — two tracking systems now agree on who he is.

### CSS Additions
- `.ghost-line` — pale, italic, slightly smaller; appears as a faint intrusion below normal text
- `.micro-line` — very small, cold-dim colour, wide letter-spacing; ambient observations at the margin of perception

### Scene Count: 242 defined, 0 missing

## v1.9 "The Field" — May 2026

### Engine: Five Systems Activated

**1. Post-Event Text Shifts** (`applyPostEventShifts`) — Previously a no-op stub. Now implemented: registered pattern/replacement pairs fire automatically in `processText()` when their trigger flag is set. Eight shifts registered:
- `sunday_service_led` → mess hall text changes: "The mess hall. It is different since Sunday."
- `archive_transmitted` → hold text shifts: "thirty years of measurement — now in the world"
- `mission_refused` → bridge hub: Miguel's wheel posture described differently
- `archive_blessed` → Freezer Beef "has not moved from it"
- `lena_direct_asked` → galley: the question has been asked and answered
- `cover_crisis_resolved` → cabin: "The letter seems less urgent than before"
- `compline_connie_seen` → corridor: "Connie's door is closed now"
- `pavel_past_told` → foredeck hub: "He has told you about the paper"

These implement the consequence-visibility the auditors identified as missing — changed descriptions communicate "the world absorbed this" without notifications.

**2. Past Life Lines** (`applyPastLifeLines`) — Previously a no-op stub. Now implemented: scene-specific pattern/replacement pairs apply silently on second+ crossings. Six past life lines registered:
- `foredeck_first`: Pavel "was already turned toward you when you came up the steps"
- `galley_first`: Lena "pours the coffee before you reach the counter. She has done this before."
- `cabin_porthole_stay`: the sea "familiar now in a way that has no origin you can locate"
- `hold_first`: "The same exactly."
- `instrument_shimmer`: "you have seen this before, this exact quality"
- `bridge_hub`: "You knew before you came up."

Second-crossing players who notice these will understand something. Players who don't will still feel the ship differently.

**3. Atmos Modifiers** — Settled soundings now visibly alter the porthole. Five modifiers registered:
- `sounding_crossing` settled: fog thins (fogMult −0.3), lamp warms, flicker stops
- `sounding_solidarity` settled: sobornost ring glows warm, fog clears, lamp brightens
- `sounding_history` settled: fog thins most (fogMult −0.4), lamp stabilises
- `sounding_forgiveness` settled: lamp at maximum warmth, all flickering stops
- `sounding_sobornost` settled: full gold ring, nearly clear fog, deep lamp warmth, goldIntensity 0.7 minimum

This addresses the reported issue where the porthole ring's goldening was not perceptible — settling soundings now drives it explicitly.

**4. Beliefs System** — `comeToBelieve()`, `believes()`, `contradict()` now have condition evaluator support (`type: 'believes'`, `type: 'knows'`, `type: 'not_believes'`). Eight belief points wired:
- `cover_crisis_resolved` → `believes('chaplain_real')`
- `pavel_revelation_seen` → `believes('crossings_recurse')`
- `alexei_palamas_told` → `believes('energies_real')`
- `nadia_1978_gap_understood` → `believes('archive_suppressed')`
- `anomaly_signal_returned` → `believes('anomaly_responds')`
- `lena_knows_transmission` → `believes('archive_matters')`
- `photos_crossreferenced` → `believes('ship_remembers')`
- `solidarity_ending_achieved` → `believes('sobornost_real')`

Two new belief-gated scenes: `pavel_crossings_belief` (if `believes('crossings_recurse')`, unique foredeck exchange about what recurrence means) and `anomaly_responds_knows` (if `believes('energies_real')`, Alexei writes "it knows we are here" in his notebook and underlines it).

**5. Dialogue System** (`startDialogue`, `advanceDialogue`) — Now wired into game.js. Two scenes converted from monologue to beat-by-beat dialogue:
- `foredeck_first`: Pavel's first appearance — five beats, the player advances through his initial cascade. The rhythm of his thought is now experienced as turns, not read as a paragraph.
- `alexei_first`: Alexei's introduction — five beats, builds from instrument-writing to noticing you to "do you know anything about geomagnetic fields?"

**Roll Modifiers** — Four registered: Fool charism +1 on cover challenge rolls; Confessor +2 on social rolls; Healer +2 on pastoral rolls; Illumined tier (theosis ≥ 66) +1 on all composure rolls. These are passive and require no game.js changes to apply — the cover challenge overlay already calls `performRoll` which checks modifiers.

### New Scenes
- `pavel_crossings_belief` — belief-gated foredeck exchange about recursion and frequency
- `anomaly_responds_knows` — belief-gated instrument room scene where Alexei writes the conclusion

### Scene Count: 229 defined, 0 missing

## v1.8 "Soundings" — May 2026

### Pavel ASCII Art Fix
Pavel's portrait label was displaying "Павел" (Cyrillic) from the opening scene. The static art string now reads "Pavel" in Latin. The name mapping system (earlyCyrillic) handles the transition to Павел at Waking tier (theosis > 32) in prose — the portrait label is not subject to name mapping and should start in Latin.

### Ten New Scenes

**1. Compline Confession (`compline_connie`, `compline_connie_stay`, `compline_connie_speak`)** — Connie Frank, late night, door open. She tells you about a seventeen-year-old patient in Montréal she could not fix on the second Thursday. Seven years on ships because the sea kills you for comprehensible reasons. She watched you stay with Alexei without fixing anything and understands that is what she has not been able to do. Only available at Compline hour if `connie_saw_chaplain` is set. Two paths: stay in silence until she sleeps, or say something true in return. The second path requires the player to offer something. Both advance `sounding_forgiveness`.

**2. Anomaly Returns Signal (`anomaly_returns_signal`, `anomaly_signal_readout`, `anomaly_signal_pattern`)** — Alexei calls at 3am. Fourteen minutes after the transmission ended, the deviation curve spiked in return. The same carrier frequency, going the other direction. He draws the return pattern by hand: it responds specifically to the names, the photographs Nadia described, the coordinates of this position. As if confirming: *yes, here. I am here. I have been here.* Thirty years the ship measured it. Now it measures back. Only available after `archive_transmitted` + theosis ≥ 66. Highest single theosis grant in the game (+10 on entry).

**3. Oblong Vassilithune Departure (`oblong_departure`)** — He is not at the corner table. The chair is pushed in. The carafe is gone. Lena, when asked, cannot retrieve the memory of him at all, which is consistent with having no memory of him arriving. The corner table is empty. No evidence except your memory, which you trust, and the effect of what he said, which you can still feel. Available at Act Three if met.

**4. Nadia 1978 Discovery (`nadia_1978_discovery`, `nadia_1978_knew`, `nadia_1978_error`, `nadia_1978_sit`)** — Nadia on the hold floor with a 1978 binder. Measurements at a position four nautical miles from current location with no catalogued anomaly — either position error (unlikely at this magnitude) or a deliberate decision not to catalogue. *The absence is also a record. The gap is evidence.* Three paths: agree they knew (Nadia concludes they are transmitting it anyway), suggest error (she notes both possibilities unconvinced), or sit with her and the binder (Freezer Beef arrives, Nadia's hand finds the cat). Available when `hold_visited` + `act_two_begun`.

**5. Liturgical Pressure — Deadline Mechanics** — When the player directly refuses Landstorm on the second call (`landstorm_second_refuse`), `setDeadline('othis_deadline', day, 6, 'othis_acts')` fires. If Othis has not been confronted before Compline, `othis_acts` triggers automatically: Othis at the hold with the key, having received instructions, the window closed. The institutional clock now runs. `othis_acts` also accessible from Act Two hub when `landstorm_knows_refused` is set.

**6. Pavel Past Story (`pavel_past_story`, `pavel_past_paper`)** — Pavel tells a specific story from before the ship. A student named seventeen. A question: *if the official account is false and you know it is false and you teach it anyway, what are you doing?* He gave the evasive answer. The student left a piece of paper on his desk the next day with the honest version. The prison was later. The paper was first. Second scene reveals what the paper said: *which do you want to have been the kind of person who chose?* Pavel identifies the crossing tax period — the fifteen points — as the cost of not yet having decided. Routes to `act_two_resolve` if Act Three has begun.

**7. Crossing Tax as Lived Experience (`crossing_tax_lived`)** — On second+ crossing, `newPlay()` now sets initial scene to `crossing_tax_lived` instead of `cabin_wake`. The player wakes knowing they have been here before: the shape of the porthole known by the body, something slightly smaller than they left it (fifteen points, the body's portion), and what remains. The ship's name in Cyrillic *in some part of your thinking that is not quite language.* The letter is on the desk. The crossing begins.

**8. Cover Identity Crisis (`cover_identity_crisis`, `cover_crisis_stay`)** — During anomaly peak at theosis ≥ 45, available from Act Two hub. The player cannot remember which things they believe and which things they were told to say. Denomination, posting, left-behind — which part was real? Freezer Beef places a paw on the knee. The cover is not gone — it is transparent. The thing it was covering is: a chaplain. Not performing one. Being one. Doubt −4, theosis +9. The crisis the system describes but the narrative had not yet dramatised.

**9. Sunday Service Congregation (`sunday_congregation`, `sunday_congregation_stay`)** — After `sunday_service_led`, available from Act Two hub. The vignette of who stayed: Lena refilling tea and making eye contact once. Alexei with his question that is also not his question. Nadia crying in the good way. Miguel at the back, which he never does — his nod when he sees you notice him means something specific about the crossing being what it should be. Staying adds `sounding_sobornost` offer and raises socialTrust by 3.

**10. Stink Patrol Favour (`stink_patrol_favour`)** — Below the forward hold, past the hold, to the hatch that is not on the schematic. You knock. Warm hands. You explain what you need: a location for the archive that doesn't exist on any manifest Othis knows about. A pause. The hands return with a paper in 1952 measurements. You fold it carefully. You do not know what you have done in exchange, but it has the quality of being exactly proportionate. Available when `stink_patrol_hands_known` + communion ≥ 6 + `mission_refused`. Sets `archive_hidden_location` flag.

### Engine Changes
- `newPlay()` now sets initial scene to `crossing_tax_lived` on second+ crossing.
- `setDeadline` now used actively: Landstorm second-call refusal sets a deadline that fires `othis_acts` at liturgical hour 6 if Othis not confronted.
- Scene count: 228 defined, 0 missing references.

## v1.7 "Act Three" — May 2026

### Act Three: Now Exists

`act_two_resolve` is no longer a single-scene convergence point — it is a proper Act Three hub labelled "Day Three — The Crossing." Text varies by theosis tier. Liturgical hour advances to Compline. Available scenes depend on what you have and haven't done. The hub presents: Pavel at the bow, Lena's direct question, the radio, the hold, the anomaly, the confrontation, and the ending. The final hours are navigable rather than automatic.

### Ten Improvements Implemented

**1. NPC dialogue references specific player actions** — `bridge_hub` and `galley_hub` now read `get text()` with conditional paragraphs. Miguel's wheel posture is described differently if you refused the mission. The polished cleats are noted. The photograph is in the air between you. Lena's small arrangement near the oven is there if you heard about the Stink Patrol.

**2. The anomaly responds** — `anomaly_responds` (new scene, instrument room, Act Two/Three): Alexei shows you a readout. The deviation curve has two peaks. Both correspond precisely to acts of witness — the Sunday service, the sitting in the hold. He is reporting what the instruments show. He is not drawing a theological conclusion. He is smiling at the data when you leave.

**3. Landstorm second call** — `landstorm_second_call`, `landstorm_second_lie`, `landstorm_second_silence`, `landstorm_second_refuse` (four new scenes). After the first call, Landstorm calls again with one word: *Status.* Three paths: maintain cover (doubt +3, cover degrades), set the receiver down again (theosis +3), or tell him directly that the mission cannot be completed (cover blown, paranoia +3, clock starts). After direct refusal: *I will be in contact with the vessel directly.* He means Othis.

**4. Day structure** — Act Three begins at Compline (hour 6). The liturgical calendar now has a clear Day Three character. The hub text reflects this. Liturgical hours advance probabilistically through scenes, so the crossing has a genuine rhythm from Lauds to Compline.

**5. Lena's direct scene** — `lena_direct`, `lena_direct_response`, `lena_direct_unsure`, `lena_direct_transmit` (four new scenes). For the first time, Lena asks you something directly: *What are you going to do with the archive.* Three paths. If you say "transmit": *I will make sure the mess hall is empty at midnight. Whatever noise a radio makes.* She goes back to cooking. She has already done what needed to be done. Her entire prior restraint makes this scene land.

**6. Pavel before convergence** — `pavel_before_convergence`, `pavel_convergence_cost` (two new scenes, Act Three). Pavel explains what "close enough" means: *The chaplain becomes real. The cover cannot be recovered after that.* He confirms this crossing is the one. If you ask what it costs: *You. What you are performing becomes what you are.* Then he points you toward the ending. *Go. Do what needs doing.*

**7. Sound design differentiation** — liturgical hour body classes (`hour-matins` through `hour-compline`) now modify filter cutoff and reverb. Compline increments magnetic deviation. The engine's mood audio system applies different filter profiles per liturgical hour. The sea sounds change character as the crossing progresses.

**8. Photo cross-reference** — `photo_crossreference` (new scene, galley hub). Lena has placed both photographs side by side — the Volkov portrait and the 1972 anomaly photograph. The man at the stove, at the line, at the stern is the same man. Volkov sailed in 1972. She always knew. She did not know he was in the photographs until you found them. She slides them both toward you. They should stay together. Item `both_photographs` added to inventory.

**9. Cover degradation visible in NPC behaviour** — `othis_post_degradation` (Othis walks past without speaking — the professional acknowledgment is gone), `kylie_after_degradation` (Kylie stops pretending not to know — her cover is gone, so is yours, *it was slowing you down*). Both triggered by `coverIntegrity <= 2` and appropriate flags. Engine condition evaluator patched to support `coverIntegrity` as a named stat condition with `max` field.

**10. Solidarity signal** — `solidarity_signal` (new scene, hold access). When communion reaches 5, the hold access shows that someone has moved the boxes — not hidden them, shifted them to make room. Nobody did this with you. Nobody asked. The ship knows who is on her. This is the in-world signal that collective action is possible before the player has to discover it mechanically. Freezer Beef is on top of the tallest box confirming a thesis.

### Engine Changes
- `stat` condition evaluator: now supports `coverIntegrity` as a named value, and `max` field for upper-bound checks.
- `registerNameMapping` now accepts `earlyCyrillic` boolean for names that shift to Cyrillic at Waking tier (theosis > 32) rather than Illumined.
- Pavel registered with `earlyCyrillic: true`.
- `setLiturgicalHour(6)` called at Act Three entry.

## v1.5 "Бриз" — May 2026

### Critical Fixes
- **Restoration ending**: `radio_team_assembled` removed from condition. Now requires only `archive_transmitted + theosis >= 66`. Players who transmit solo reach Restoration.
- **Rememberer threshold**: Lowered from 90 to 85 carried theosis. Achievable on a strong Restoration run.
- **Cover `left` challenge**: Registered and triggered in `connie_honest`. Connie asks what the cost of leaving was, not the thing itself.
- **`act_two_placeholder`**: Removed.
- **Sound**: Audio now auto-starts on first user gesture (click, touch, or key). Browser AudioContext policy was preventing any sound from playing.
- **Title**: Duplicate "a crossing" removed from subtitle line.

### Engine Additions
- **`progressSounding(id, delta)`**: New public API. Advances a sounding by explicit amount when player acts in alignment with its theme. Separate from passive tick. Toast fires at meaningful milestones only.
- **Liturgical hours**: Now advance probabilistically (35% chance per scene transition) rather than being static at default.
- **Map knowledge system**: `isNodeVisited()`, `isNodeKnown()` functions. Map panel now organised into "this crossing" and "remembered from before" (Witness charism) sections.
- **Diegetic stat labels**: Header now displays `bearing / stillness / solidarity / static` instead of `vigilance / composure / communion / doubt`.
- **Save toast**: Suppressed for auto-saves (legacy slot). Only explicit slot saves show toast.
- **Toast duration**: 3.5 seconds.
- **Breviary pulse**: `has-available` button now animates with amber glow.

### Porthole
- Wave animation overhauled: 8 waves with individual speed and phase offset, amplitude fades with depth, opacity fades. Surface shimmer particles at high theosis (goldIntensity). Waves are visibly moving.

### Soundings
- **`sounding_forgiveness`** now offered: in `alexei_palamas`, `alexei_honest_answer`, `lena_cook_before`, `mission_refused_miguel`. The pastoral heart of the game now has its sounding.
- **`sounding_sobornost`** added: "On conciliarity — many voices in which no voice is erased." Offered at theosis >= 66 in the instrument room shimmer scene. Theosis +8, Communion +2.
- **Alignment-based progress**: 18 scenes now call `progressSounding()` on relevant soundings when the player acts in their spirit. Solidarity sounding advances through solidarity acts. Crossing sounding advances through presence. History sounding advances through archive engagement. Forgiveness sounding advances through pastoral acts and kenosis.

### New Content
- **`kenosis_act`**: New scene unlocked by Faster charism in `hold_bless_archive`. Letting go of something carried long enough to stop noticing it. Doubt -3, Theosis +6. Advances forgiveness sounding by 4.
- **`zarya_real_history`**: Full epilogue available after Restoration ending. The real Zarya — built 1952, thirty years of geomagnetic research, shared data across Cold War borders, scrapped after Soviet dissolution. Her name means dawn.
- **Freezer Beef mission**: Two new ambient events. She tests the player's lap during early Act Two, then adopts it as her mission if hold solidarity flags are set.

### Narrative Improvements
- **Radio lore expanded**: Miguel now explains why the second radio is non-magnetic (brass components throughout), why the standard radio distorts the field, and crucially that the second radio's existence was not disclosed when the ship changed hands in 1991. The mission's principals do not know it is there.
- **Epilogues extended**: All three main endings now have full character-fate paragraphs. Miguel, Lena, Alexei, Nadia, Kylie, Othis, Pavel — each gets a morning-after sentence. The Restoration epilogue includes Lena's small non-shrine in the mess hall, Kylie's open door, Othis on the aft deck with nothing left to monitor.
- **Charism descriptions**: Rewritten to be more mysterious and atmospheric, without stating mechanical effects directly.
- **Mode descriptions**: Full descriptions added for Attended and Witnessed modes.
- **Tutorial**: Rewritten in Severed Hours voice — the ship, the name, the cover, the four numbers, what soundings are and how they deepen.

### Balance
- **Three-crossing minimum**: The progression Erasure → Witness → Restoration → The Knowing is intended as the natural arc. Restoration requires theosis >= 66 and archive transmission. The Knowing requires Rememberer charism (requires carried theosis >= 85, i.e., Restoration at high theosis + crossing tax leaves ≥ 85) and theosis >= 85 in the current crossing. Three strong crossings minimum.

## v1.4 "Full Crossing" — May 2026

### Narrative Completion

All previously missing or stub narrative content is now written and wired.

**Oblong Vassilithune** — 7 scenes. He is at the corner table. He has been at the corner table. He manages the carafe that appears without being placed. He is an observer. He has been on this ship before, in various capacities. He knows the crossing has a specific purpose. He says: the ship knows you are here. That is not a metaphor. He is introduced in both Act One (main deck hub) and Act Two (act_two_begin hub).

**The Stink Patrol** — 2 scenes. Encountered as sounds from below the forward hold — a level of the ship not on the schematic. Lena explains them: warm hands, once, through a hatch. They manage what is below. The ship is stable because they do. Nobody has asked about the other things. That seems like the kind of question that would be rude.

**Vance Landstorm** — 4 scenes (`landstorm_radio_call`, `landstorm_lie`, `landstorm_delay`, `landstorm_silence`). He calls on the standard radio during the anomaly. Three choices: lie smoothly (cover degrades anyway), delay (buys time at cost), or set the receiver down without answering (theosis +4, sets `mission_refused`). The third path requires `mission_reality_known`. The anomaly masks the silence.

**Kylie Matterhorn Act Two** — 5 scenes (`kylie_act_two`, `kylie_act_two_deny`, `kylie_act_two_question`, `kylie_alliance`, `kylie_act_two_truth`). Night, notebook closed. She knows what you are. She has 18 months of groundwork. Her piece requires the archive to arrive intact. Three paths: hold cover (it degrades anyway), ask what she'll do with the truth (she says she'll write it; alliance available), or say outright you're not going to do it (cover blown, full alliance). Kylie in alliance = second backup transmission path.

**Connie Frank medical emergency** — 6 scenes (`connie_emergency`, `alexei_emergency_cabin`, `alexei_palamas`, `alexei_honest_answer`, `alexei_sit_together`, `alexei_sleeps`). Connie comes for you at 3am during the anomaly peak. Alexei has been measuring for 36 hours and is frightened by what he found. The chaplain is needed for the actual thing, not the performance. Three pastoral choices: give him Palamas (essence vs energies, the field as participation — highest theosis grant), give him the honest answer (the question being correct is already something), or sit with him without answering. Connie watches you leave his cabin. *That was the chaplain thing. Not the cover. The actual thing.*

### Dynamic Ending Text

All three main endings now vary based on what happened during the crossing:

- **Erasure**: includes Alexei's night (if you sat with him), Lena making breakfast anyway and her memory of Volkov (if that story was told), Oblong's absence (if met).
- **Witness**: includes Kylie's notebook (if in alliance), Connie's report (if she saw the chaplain work), the blessing of the archive (if performed).
- **Restoration**: includes Kylie outside the door (if in alliance), Othis's 30 seconds (if he turned), the anomaly receiving the transmission on its own frequency (if `anomaly_archive_connected` was set).

### Epilogue Scenes

Each ending now has a brief epilogue before "Begin a new crossing":

- **Erasure → `erasure_memorial`**: The smoke is gone. The sea absorbed it. The anomaly is still measurable. Something remains to be decided. Not now.
- **Witness → `witness_morning`**: Nadia slides a coffee toward your seat without being asked. That is a kind of speaking.
- **Restoration → `restoration_after`**: The ship is Заря. She has been Заря since 1952. The documents that call her something else are wrong. The four of you — player, Pavel, Haircut, Freezer Beef — watch the dawn.

### Scene Count
165 defined scenes. 0 referenced-but-missing. Game is complete for personal testing.

## v1.3 "Sounding" — May 2026

### Toast System Overhaul
- **Sounding available**: `Sounding available: [name].` — fires when `offerSounding()` is called.
- **Sounding begun**: `[name] — sounding begun.` — fires on `takeSounding()`.
- **Sounding halfway**: `[name]: halfway.` — fires when progress crosses SOUNDING_THRESHOLD/2. Replaces noisy per-delta toast.
- **Sounding near-settle**: `[name]: almost settled.` — fires one step before completion.
- **Sounding settled**: `[name] — settled.` — upgraded to `theosis` type toast (gold).
- **Theosis tier change**: `Waking.` / `Illumined.` — fires with 500ms delay when tier boundary is crossed.
- **Codex unlock**: `Codex: [title].` — fires when `unlockCodexEntry()` adds a new entry.
- **Item acquired**: `Carried: [name].` — fires on `addItem()`.
- **Reputation changes**: Now silent — were verbose and confusing (`miguel: reputation +1`). Tracked in observations panel instead.
- **Toast queue**: Confirmed working — simultaneous toasts now stack and fire sequentially.

### Tutorial — Phone Fix
- Tutorial overlay now `align-items: flex-start` with `overflow-y: auto` — scrollable on small screens.
- Board button has `min-height: 48px; font-size: 1rem` — proper touch target.
- Tapping the backdrop (outside the tutorial box) dismisses the tutorial — `click` handler on overlay checks `e.target === div`.
- `role="dialog"` and `aria-label` added for accessibility.

### Mobile / Phone Display Fixes
- **Touch targets**: All choices `min-height: 44px`, bottom nav buttons `min-height: 48px`, charism cards `min-height: 60px`, map nodes `min-height: 44px`, sounding take button full-width.
- **Stat tooltips**: `:hover` alone unreliable on touch. CSS `:active .stat-tip` and JS `touchstart` handler now toggle `.tip-open` class with 2.5s auto-close.
- **Panel**: `max-height: 85vh` on phone, `90vh` with `border-radius: 0` when panel-overlay stretches full screen.
- **Art blocks**: `font-size: .5rem` and `overflow-x: auto` on phone — prevents ASCII art from causing horizontal scroll.
- **Toasts**: `max-width: 90vw; white-space: normal; text-align: center` on phone.
- **Porthole**: Canvas opacity reduced to 0.5 on `max-width: 420px` screens — porthole was overlapping content on small phones.
- **Body**: `overflow-x: hidden; max-width: 100vw` — prevents horizontal bleed from wide art blocks.
- **Game body**: Tighter padding on phone (1.1rem / .9rem).
- **Version mark**: Hidden on phone (`display: none`).
- Very small screens (< 380px): `font-size: 15px` base, further padding reduction.

### Other
- `maintenance_rigging` Alexei scene confirmed — theoretical meteorology requires fieldwork.
- `hold_bless_archive` confirmed — fires highest sanctity grant, gold toast on completion.

## v1.2.1 "Zarya — Release Patch" — May 2026

### Critical Bug Fixes (from multi-AI audit)
- **`maintenance_brass` duplicate `onEnter`**: Merged two conflicting `onEnter` blocks. Second was silently overwriting first, meaning theosis (+3), composure (+2), Miguel reputation, shipStability, and the crossing sounding were **never firing**. Now a single merged block.
- **`miguel_response` duplicate `onEnter`**: Same issue — `toast_cover_connection` was never showing, and `miguel_introduced` flag was the only thing firing. Merged.

### Cover Challenge System Activated
- `startCoverChallenge('background')` now triggers automatically in `kylie_background_response` on second visit (after `kylie_initial_met` flag is set).
- `startCoverChallenge('posting')` triggers in `connie_pastoral` when posting is established.
- `startCoverChallenge('connection')` triggers in `othis_cabinet_direct`.
- Cover challenge overlay now has entrance animation (`challenge-enter` keyframe).

### Engine Fixes
- **Toast queue**: `showToast` replaced with queued system — simultaneous toasts no longer overwrite each other. Each toast shows for 2.6s, then the next fires.
- **Linguistic memoization**: `applyLinguisticToggle` now memoizes results per `scene + doubt-tier + text-prefix`. Prevents per-render flickering of Cyrillic drift. Memo cleared on scene navigation.
- **Compass display**: Magnetic deviation now shown as ASCII needle compass in stat bar when `magneticDeviation > 0.2`. `True N` vs `Mag N` deviation visible. `registerCompassAxes('True', 'Mag')` registered; `updateCompass()` called on deviation events.

### New Content
- **`maintenance_rigging`**: Third ship maintenance task — fixing a twist in the port-side jib sheet. Requires two people; Alexei appears, helps without comment, reveals he does fieldwork. Short, banal, character-building.
- **`hold_bless_archive`**: Available after `sunday_service_led` flag — the player can offer an informal blessing over the archive in the hold. Highest sanctity grant in the game (+3). Freezer Beef witnesses. Scene is careful not to theologise its own act.
- **`radio_lore` repetition guard**: Miguel no longer repeats the radio lore if the scene is revisited.

### CSS
- Cover challenge overlay entrance animation.
- Compass stat-val styling.
- `body.sanctity-high .location-bar.uncanny` — gold glow when archive is blessed.

## v1.2 "Zarya" — May 2026

### Critical Fixes
- **worldState save/load**: `{ shipStability, sanctity, socialTrust }` now included in save object and restored on load. Was lost on every session end.
- **maintenance_bilge**: `S.setFlag('maintenance_done')` added — bilge scene no longer loops indefinitely in Act Two hub.
- **maintenance_brass onEnter**: Confirmed single, clean block. `setFlag('maintenance_done')` fires correctly.
- **`pablo_knows` → `pavel_knows`**: Standardised throughout observations panel and scene logic.
- **Version watermark**: Updated to `SPASIBO v1.2 — Zarya`.

### Engine Additions
- **Liturgical hour in header**: Location bar now reads `Hold — Below  ·  Compline` etc. Hour name pulled from `LITURGICAL_HOURS` array.
- **Nav tooltips**: All five bottom nav buttons have `title=` attributes. Custom CSS `::after` tooltip also implemented for browsers that don't show default tooltips on non-anchor elements.
- **sbar-jitter**: Stat bar (`sbar`) gets class `sbar-jitter` when `doubt >= 7` — reflects psychological strain of performance through UI instability.
- **worldState in save/load**: Persists across sessions.

### Game Content
- **`radio_lore` scene**: Replaces `act_two_placeholder` in Miguel's radio branch. Miguel explains the two-radio system installed in 1957 — the deviation-carrier radio that gets stronger as the anomaly intensifies — and tells you where it is. Scene has full art (portrait_miguel), theosis grant, and reputation increase.
- **Cover toasts**: All five cover fields now produce `showToast('Cover: [field] established.', 'note')` on first establishment. Denomination (Pavel), background (Kylie), connection (Miguel response), left-behind (Connie), posting (Miguel first question).

### Systems
- **Anomaly-high CSS friction increased**: `blur(0.6px) contrast(1.18) brightness(0.96)` on `.game-body`. Choices also slightly blurred. Text shadow on `.sp`. Jitter animation strengthened.
- **Liturgical hour body classes refined**: Vespers/Compline header border colours. Compline location bar amber.
- **worldState persistence**: Mutations (bilge: +shipStability, Volkov: +sanctity, Lena solidarity: +socialTrust) now survive session.

### Directive
Named updates going forward. This release: **Zarya** — for the ship that came back with what it found.

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

