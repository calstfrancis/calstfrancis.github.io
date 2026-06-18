## dev — Phase 10: polish

**10.1 — Sunday service history deduplication:** `sunday_service_history` and `sunday_history_mention` were both unreachable dead code (no navigation pointed to either). Both already had correct mutual exclusion flags. Fix: linked `sunday_service_history` into `galley_hub` as a new choice — "She mentions the Sunday service." — with conditions: `met_lena`, `not sunday_service_history_seen`, `not sunday_history_mentioned`, `not sunday_service_started`, `not sunday_service_led`. The existing flags prevent duplication if `sunday_history_mention` somehow also fires.

**10.2 — Second-crossing ritual variant:** The intercession and response ritual phases were static strings, identical on every crossing. Converted both to `text: () => ...` functions. Second-crossing variants acknowledge the familiarity of the form: Lena starts refilling before the service ends; Alexei's annual prayer is recognisable; the silence after names is different the second time. Rememberer charism adds additional beats: the silence is the same and never the same; Pavel's nod is recognition rather than confirmation.

**10.3 — `ending_passenger` dead definition:** Already resolved — only one definition exists (the `get text()` reactive version at line 7537). No action needed.

**10.4 — `anomaly_fibonacci` routing:** Already resolved — choices already branch on `radio_found` (→ `radio_what_to_transmit` if found, → `radio_discovery` if not). No action needed.

---

## dev — Phase 9: past-flag UX

Engine change in `sobornost.js`. Two new helpers: `_conditionHasPastFlag(cond)` (recursive traversal through `and`/`or`/`not` conditions) and `isChoicePastFlagLocked(ch)` (true when a choice is locked specifically because a `past_flag` condition failed, not any other lock type).

During scene rendering, if any choice in the scene is past-flag-locked, a note is appended below the choice list: *"Some things will only be visible after another crossing."* Styled as `.past-flag-note` — dim, italic, small. The note does not appear in `open` mode (where locked choices are hidden entirely).

This resolves the first-crossing UX problem where greyed choices with no explanation read as bugs.

---

## dev — Phase 7: charism expansion — Fool and Rememberer

**Fool charism (4 scenes):**

`fool_cover_slip` — When a Fool player fails the `othis_deny` cover roll, Othis pauses in the corridor. He saw through it, but what he saw wasn't threat — just someone lost. He chooses not to report it. Sets `othis_fool_understands`, -2 suspicion with Othis. The cover roll sets `_fool_deny_failed` when Fool + failure, unlocking this choice.

`fool_hold_accident` — Fool players who fumble the bilge pump dislodge a hidden panel in the hold bulkhead. Inside: a single folio page from the archive in oilcloth, ending *"If you are reading this in the bilge, you found it the right way."* +7 theosis, comes to believe `ship_remembers` + `anomaly_responds`. Entry choice added to `maintenance_bilge`.

`fool_pavel_encounter` — Pavel watches the fumble and says what he wouldn't say to someone who had it together: the difference between the unprepared and the performed, and what the anomaly does to each. Sets `fool_pavel_told_directly`. +6 theosis, +2 trust/communion. Entry choice added to `foredeck_standing`.

`fool_sounding_break` — A Fool player who tries to articulate the crossing's question says the wrong thing — and the wrong words open something the correct sentence would have filled. Settles `sounding_crossing` via +6 progress. Entry choice added to `cabin_porthole_stay`.

**Rememberer charism (3 scenes):**

`rememberer_bow_knows` — On first arrival at `foredeck_first`, the Rememberer walks past Pavel to the bow point without being shown it. Pavel stops mid-sentence. "The anomaly knew you. I think it has been waiting." +10 theosis, +3 trust, comes to believe `crossings_recurse` + `anomaly_responds`. Entry choice added to `foredeck_first`.

`rememberer_radio_hands` — On first finding the radio, the Rememberer's hands know the handset — including a frequency catch at 6.3 MHz (the archive's original 1957 transmission frequency, which no one has used since). Alexei watches and concludes the ship showed you something. +9 theosis, +2 trust, comes to believe `ship_remembers` + `anomaly_responds`. Entry choice added to `radio_discovery`.

`rememberer_lena_order` — Lena has the Rememberer's order ready without being asked, because she remembers it from last crossing. "I don't know which one of us is doing it — the galley or me." Comes to believe `sobornost_real`. +7 theosis, +3 composure. Entry choice added to `galley_hub`.

---

## dev — Phase 8: mission state machine

`mission_final_decision` — cabin scene, Night Three. Players who reach `day_three_landing` without having set `mission_refused` or `mission_accepted` are now intercepted before the Erasure approach and given an explicit choice: carry out the instructions, or refuse. Erasing the archive is now a chosen ending rather than a failure state.

**Routing change:** `day_three_landing.onEnter()` now clears stale `_route_*` flags on re-entry (fixes the double-choice bug if a player returns via `mission_refused` refusal and the landing scene is re-entered). New `_route_final_decision` branch fires when: not solidarity, not knowing, not restoration, not witness, not passenger, and `mission_refused` is not yet set.

**Scene prose:** `mission_final_decision` text is reactive — it acknowledges the `chaplain_real` belief, notes if the archive has already been transmitted, and notes if the player has met the archive's authors. Refusing in this scene sets `mission_refused`, awards +5 theosis, and re-enters `day_three_landing` (which now routes correctly to witness or passenger based on current stats).

---

## dev — Phase 6.1: reputation payoffs

Four NPCs now reveal something significant when reputation is high enough. Engine change: `{ type: 'reputation', npc, min }` added to `evaluateCondition` in `sobornost.js`. Connie's cover challenge is skipped inline at `connie_pastoral.onEnter()` when `getReputation('connie') >= 3`.

**Miguel rep ≥ 4** — `rep_miguel_mission_candid`: Miguel privately says the mission is wrong — not illegal, wrong. He's hoping you don't do it. +7 theosis, +2 communion, +3 solidarity. Accessible from `miguel_return`.

**Lena rep ≥ 3** — `rep_lena_previous_chaplain`: Lena tells you about the chaplain who was on the crossing when Micha went over. He was young and bad at explaining but he stayed. "You have weight," she says. +8 theosis, +2 communion, comes to believe `chaplain_real`. Accessible from `galley_hub`.

**Alexei rep ≥ 4** — `rep_alexei_archive_frequency`: Alexei has already run a second deviation log at the archive's magnetic signature frequency. The field responds to the content. +8 theosis, comes to believe `archive_matters` + `anomaly_responds`. Accessible from `act_two_resolve`.

**Nadia rep ≥ 4** — `rep_nadia_own_archive_entry`: Nadia stands in front of the box containing her first-crossing data sheets. "Is that enough as a reason?" +8 theosis, +3 communion, comes to believe `archive_matters`. Sets `mission_refused` on acceptance. Accessible from `act_two_resolve`.

---

## dev — Phase 6.2: stance payoffs

Five stance thresholds now produce narrative consequences. `{ type: 'stance', npc, key, min }` conditions throughout.

**Pavel trust ≥ 3** — `stance_pavel_rope_trust`: Pavel sets the rope down and tells you about it unprompted — the prison, the counting, why he still holds things. +5 theosis, +2 communion. Available from `foredeck_standing`.

**Pavel trust ≥ 5** — `stance_pavel_anomaly_direct`: Pavel tells you what the anomaly is in direct terms, no parable. "A field of awareness… the deviation data is the record of its attention." +10 theosis, comes to believe `anomaly_responds` + `crossings_recurse`. Available from `act_two_resolve`.

**Miguel suspicion ≥ 3** — `stance_miguel_cover_warning`: Miguel privately tells you that Othis is building toward something and you have two days. Sets `mission_refused` on acknowledgement. +3 vigilance, +3 reputation. Suspicion increments added to `othis_deny.onEnter()` (+2) and `cover_identity_crisis.onEnter()` (+1). Available from `bridge_hub`.

**Lena solidarity ≥ 3** — `stance_lena_joins_radio`: Lena appears in the corridor with her coat on, already ready. "No one asked me if I knew how." Sets `radio_team_assembled` without recruitment. +6 theosis, +3 communion. Available from `act_two_resolve`.

**Alexei trust ≥ 4** — `stance_alexei_private_log`: Alexei opens the drawer with the green notebook — the readings he was told to discard in 1987 and kept. +8 theosis, comes to believe `archive_suppressed` + `archive_matters`. Available from `act_two_resolve`.

---

## dev — Phase 6.3: belief payoffs

Six beliefs now produce narrative consequences. `{ type: 'believes', id: '...' }` conditions throughout.

**`crossings_recurse`** — `belief_crossings_pavel`: Pavel at the bow responds differently to someone who says the recursion plainly. He was waiting for it. +8 theosis, +5 reputation, +3 trust. Accessible from `foredeck_standing` when the belief is held.

**`archive_matters`** — New choice in `radio_what_to_transmit`: "You already know. Everything — in the order it comes." Transmits all without deliberation. +5 theosis (vs. +2 for the standard all-at-once choice). Gated on `believes: archive_matters`.

**`ship_remembers`** — `belief_hold_ship_remembers`: Standing in the hold, the player feels the ship's attention. The hold has been listening. +6 theosis, +2 communion, +2 sanctity. Accessible from `hold_first` when the belief is held.

**`sobornost_real`** — Two payoffs: (1) `ritualCompleted` gives +4 bonus theosis if the player already believes when the service ends. (2) `belief_sobornost_after_service`: reflection in the mess hall doorway — the community existed before the service named it. +5 theosis, comes to believe `chaplain_real`. Accessible from `act_two_resolve`.

**`anomaly_responds`** — `belief_anomaly_address`: player speaks directly to the anomaly in the instrument room. It responds with the 1978 bearing. +10 theosis, +3 sanctity. Accessible from `act_two_resolve` when the belief is held and instruments have been seen.

**`chaplain_real`** — `ending_approach_restoration` gains a dynamic text paragraph when `chaplain_real` is believed: "You know what you are. Not a cover, not an approximation — a chaplain."

---

## dev — Phase 5: balance and mechanical integrity

**Witnessed mode composure (5.5)**

Composure gains for Witnessed mode are now halved (`Math.ceil(v / 2)`) instead of zeroed. Single-point gains register as 1. The mode remains mechanically distinct without being a statistical penalty.

`witnessed_quiet_crossing` — new scene: the player sits in their cabin and finds, after a while, that something is less heavy than it was. +3 composure, +2 theosis. Gated on `mode: 'witnessed'`, available once per crossing. Acknowledges the cost of witness without framing it as failure.

**Sleeper charism scenes (5.6)**

`sleeper_hold_recognition` — ambient scene in the hold: the body knows the room before the mind does. The player realises they have been in this hold before without remembering it. +5 theosis, +2 communion, comes to believe `crossings_recurse`. Gated on Sleeper charism + hold visited.

`sleeper_solidarity_opening` — Lena asks what you are going to do this time that you didn't do last time. Offers the Solidarity sounding. +4 theosis, +3 communion, modReputation(lena, 3). Gated on Sleeper charism + met_lena + act_two_begun. Opens the Solidarity path for low-theosis returning players.

**Already resolved in prior sessions (confirmed)**
- 5.1: `the_chapel` already requires `act_two_begun` ✓
- 5.2: `act_two_resolve` already gates theosis behind `_resolve_hub_entered` ✓
- 5.3: `radio_discovery.onEnter` already sets `radio_existence_known` ✓
- 5.4: Solidarity ending no longer requires `not archive_transmitted`; routing prioritises Solidarity over Restoration ✓

---

## dev — Phases 3–4 fixes

**Ending arc — Knowing and Passenger routes**

`ending_approach_knowing` — new approach scene: the instrument room at night, Pavel already there, the radio warm. Routes explicitly to `ending_the_knowing`. Knowing is now a first-class route in `day_three_landing` rather than an accidental byproduct of the Restoration check.

`ending_approach_passenger` — new approach scene: the gangway at morning, the feeling of having passed through without leaving a mark. Routes to `ending_passenger`. The Passenger ending now arrives with its own intentionality.

`day_three_landing` routing updated: added explicit Knowing check (rememberer charism + theosis ≥ 85 + archive_transmitted) before Restoration; added Passenger check (communion ≤ 3, mission not yet accepted) below Witness. Both have distinct routing flags. Knowing choice text: "The crossing ends. You have been here before."

---

## v3.8.0 — Current

### Engine

**`renderCrossingRecord` — passenger variant**
When `crossing_was_passenger_crossing` flag is set, the crossing record renders as a sparse layout: blank panels for soundings, memories, and theosis (each showing only a dash), a visible absence where notes would appear. Haircut's name appears at the bottom without any text beside it. The standard record layout is bypassed entirely.

---

### Spasibo — Content

**Passenger meta-arc — second and third crossing consequences (2 new scenes)**

`foredeck_passenger_rope` — Pavel does not hand you the rope. He turns and says: "Last time you were here and you weren't here." Then he waits. You must ask for it or admit you don't know yet. Overrides `foredeck_second_crossing` when `was_a_passenger` is in past_life_flags.

`warm_hands_passenger_withholds` — The hatch opens. Nothing comes through. A hand points sideways — at the crossing, at what you have been doing with it. They hold still for three seconds. The hatch closes. They noticed. They are waiting to see if this crossing is different before they give anything.

**The anomaly answers (4 new scenes)**

`anomaly_fibonacci` — Nadia finds Fibonacci intervals (3-5-8-13-21 minutes) in the deviation printout over six hours. The intervals are not random — Fibonacci to within fourteen seconds. Something has been encoding information in the deviation log for fifty years. "We've been collecting the message and filing it as atmospheric variance." Sets `anomaly_encoding_known`.

`anomaly_fibonacci_meaning` — What the Fibonacci pattern says: not language, but a signal of a particular kind of mind. "It is not a phenomenon. It is something that produces Fibonacci sequences in its deviation log over a period of fifty years."

`anomaly_answers_back` — Forty minutes after the transmission, the instruments record a new value that was not in pre-crossing calibration. Not error — instruments agree. The field added a data point to its own record in response to the archive transmission. Sets `anomaly_signal_returned`. +8 theosis.

`anomaly_names_the_ship` — At peak anomaly on a second+ crossing with `anomaly_encoding_known` and theosis ≥ 50: the compass shows 60.451°N, 22.269°E. Turku. The position of the Turku shipyard, within the margin of the old Finnish nautical survey. "Something has been paying attention to this ship specifically since 1952." +10 theosis.

**Haircut and Freezer Beef — complete arc (2 new scenes)**

`haircut_second_crossing` — On a second+ crossing, Haircut is at the gangway when you board. She watches you walk up from dock to railing to deck. Three seconds level with you. Then she goes below — to wherever she goes when things are in order.

`freezer_beef_final` — In the Solidarity and Knowing endings: Freezer Beef is on the galley table. In the centre. Between two coffee cups. Nobody put her there. She is allowed to be there. She has been in the centre of things, on various surfaces, since 1952. She puts one paw forward. She is not going anywhere.

**Sunday service memory (2 new scenes)**

`sunday_service_memory_pavel` — On a second+ crossing, Pavel mentions he heard about a chaplain who set aside the prepared text (if `service_word_true` was set last crossing). "What you say when you set the text aside is yours." If not: he talks about the difference between performing the service and being inside it.

`sunday_service_memory_lena` — On a second+ crossing with `service_intercession_held` from last crossing: "Last time. Someone held space for names. That's the right word. It has to be held or it collapses." She heard Volkov's name from the corridor and stopped walking. "Thank you."

Meta tracking added: `lastServiceWordTrue` and `lastServiceIntercessionHeld` stored in `metaUnlocks` via `newPlay` handler.

**Othis redeemed — arc conclusion (1 new scene)**

`othis_cost` — His door is open. He is writing something that is not the manifest. He doesn't close it when you come in. "I have been trying to write down what I actually saw on this crossing. It reads like a religious experience report." He does not have a category for what happened. He goes back to writing. Available only when Othis has turned and Act 3 has begun.

**Cover in Act Three (2 new scenes)**

`cover_unravels` — When cover integrity reaches 0 in Act 3: Othis produces a printed document listing every discrepancy between the cover and what he found. He chose not to submit it. "Whatever you are actually doing here. I think it matters. I don't know how I know that." Turns Othis regardless.

`cover_complete` — When cover integrity stays at 5 through all of Act 3 with denomination established and Connie having observed: "What you did with Alexei. What you did with Nadia. The service. That wasn't cover." Grants `chaplain_real` belief.

**Warm Hands — direct communication (1 new scene)**

`warm_hands_marks` — After `anomaly_cycle_known` and the fourth gift: a hand traces marks on the floor. A line. A circle. A small x at a specific angle. The 1952 construction notation. They are showing you where the anomaly is relative to the keel. They are in the diagram. The diagram was not construction documentation. It was a map. +10 theosis, sets `warm_hands_map_understood`.

**Remaining backlog**

`connie_journal_submitted` — She submitted to *Journal of Psychophysiology*. Under her own name. Sample size seven people plus two cats. She doesn't know if they'll accept it. It exists in a form that can be found. "That's all you can do. Describe what you saw. Put your name on it. Send it somewhere." Grants `archive_matters` belief.

`alexei_paper_rejection` — He shows you the rejection letter. "Speculative" — he notes this is accurate. He files it in the folder with eleven other papers, eleven of which were eventually published. He opens the laptop to revise the abstract. "The anomaly has been waiting fifty years for someone to notice the Fibonacci intervals. I can wait a few more years for the right reviewer."

`miguel_end_background` — After the mission resolves, at the wheel, he doesn't mention it. He says: "I've been thinking about what you said about your background." He heard truth when you said it. "That was true. Whatever else is happening on this crossing. That was true." +4 theosis, grants `chaplain_real`.

`lena_arc_5_second` — On a second+ crossing when `lena_fragment_5_seen` is set: she looks up across the galley. "Still here." She goes back to cooking. +8 theosis. The whole scene is those two words.

`the_chapel` — Below the forward hold, one level further than the schematic suggests is possible. A space with warm diffuse light from the direction of the keel. A folded cloth. Years of candle stubs. A photograph of the Turku dock. The construction notation: the circle with the line. The anomaly position relative to the keel. They pray here. Seventy-two years in the presence of something that responds to attention. The chapel found, no text needed. +12 theosis, grants `ship_remembers` and `crossings_recurse`.

---

## v3.7.0 — Current

### Spasibo — Content

Most items from PROPOSED_UPDATES were already implemented in the codebase. This release completes the remaining gaps.

**Item 3: Passenger meta-arc**
Already implemented: `warm_hands_withholds`, `foredeck_second_crossing`, `cabin_wake_second`, `lena_recognises_passenger`, `alexei_recognises` — all existed. No new scenes required.

**Item 4: Restoration ending — Alexei distinction**
`ending_restoration` now explicitly distinguishes Alexei's experience in this ending vs the Witness ending. In Restoration: he had been waiting since he calculated the cycle; the transmission confirmed what he already understood about the field receiving. In Witness: he would have held his silence. The distinction names what Restoration actually costs and gives.

**Item 5: Anomaly as teacher — all scenes existed**
`anomaly_familiar`, `anomaly_asks`, `anomaly_memory_direct` — all present. No new scenes required.

**Item 6: Cat arc — all scenes existed**
`haircut_shows_you`, `freezer_beef_hold_reason`, `hold_freezer_beef_survey` — all present.

**Item 7: Sunday service as institution (1 new scene)**
`sunday_service_history` — Lena tells you about the tradition before Day Three. Different chaplains over the years. One read for forty minutes and nobody came back. One sang. One year nobody came and the chaplain set up anyway and said something to the empty room and sat in silence. Volkov never missed a service in twenty-two years. He believed in the form even when he didn't believe in the content. Routes into `lena_arc_4` if fragment 4 hasn't been seen.

Also added: meta tracking of service outcome (`metaUnlocks.lastServiceWasReal`) for future use in second-crossing scenes.

**Item 8: Othis's inner life — already existed**
`othis_railing` — Othis at the starboard railing. "I have been doing this work for twenty-three years. I don't know what else I am good at." Already present.

**Item 9: Archive as character — all scenes existed**
`hold_box_open`, `hold_box_older`, `hold_handwriting_study` — all present.

**Remaining content backlog**

`connie_follow_through` — She got a response. It says: *noted*. She filed her observation through proper channels. Someone read it. It's in a record. One day someone with the right question finds the right record. She puts it in her coat pocket. Checks `connie_wrote_settling` flag to personalise the text.

`lena_volkov_last` — Volkov's last crossing, 1978. He came back different. Not frightened — the opposite. He had the quality of someone who found out something they already believed was true, and it turns out this doesn't change what you do in the morning, but it changes what you know while doing it. *The ship knows the way home.* She still doesn't fully understand it. She thinks it means whatever changed in the crew, the ship keeps. It goes out with her on the next crossing. Grants `ship_remembers` and `crossings_recurse` beliefs.

`anomaly_season` — Alexei has six years of deviation logs on the chart table. He has marked the peak reading in each. 27-month cycle. Plus or minus six days. For 56 years. "This is not explained by any mechanism I know." His hypothesis: it is timing itself to the crossings. It peaks when the ship comes. Sets `anomaly_cycle_known` flag, grants `anomaly_responds` belief.

`alexei_joke_callback` — Already existed. The compass doesn't know which way to turn. "But it still turns." He had been thinking about the addendum for two days.

`pavel_riddle_resolution` — Already existed. The three riddles are not separate. They are the same question at three distances: the crossing, the ship, the person.

---

## v3.7.0 — Current

### Engine

No engine changes this release. All work is content and game systems.

---

### Spasibo — Content

**Restoration ending — earned tension**
The ending now explicitly holds the duality: Landstorm got what he wanted AND you are not the person who boarded this ship. Both are true simultaneously. Added paragraph: "The transmission was not Landstorm's act. It was the ship's act, and yours, and the crew's, and thirty years of researchers who wrote things down and sent them on." If `alexei_witnessing_speech` is set, Alexei's speech ("it responds to being witnessed") is called back directly.

**Passenger meta-arc (2 new scenes)**

`foredeck_passenger_callback` — On second crossing after being a passenger: Pavel does not hand you the rope. He waits. You reach for it. "Last time you were here and you weren't here. This time you reached for the rope. That's how it starts."

`warm_hands_withholds` — On second crossing after being a passenger: the Warm Hands are visible, palm down. One hand points back up. They assessed last crossing. They found it incomplete. They will try again next crossing.

**Anomaly as teacher (4 new scenes)**

`anomaly_familiar` — Third+ crossing: the initial deviation reading is 0.003° higher than last time. Directional, not drift. The field has a model of cumulative attention. Alexei has a paper no reviewer will touch.

`anomaly_asks` — Third+ crossing at theosis ≥ 66: Fibonacci sequence in the deviation log. Exact intervals, going back to 1971. Not geology. Something has been encoding information in the only language that would survive fifty-three years of instrument drift. It was waiting for someone who would look.

`anomaly_what_saying` — Response to anomaly_asks: the sequence is not a message. It is a question. *Do you see me? Do you recognise that I am using a language you understand?*

`anomaly_memory_direct` — Third+ crossing, `ever_transmitted`, theosis ≥ 80: the reading goes to −0.003. Negative deviation. Never recorded before. The field is extending toward a new bearing. It received the transmission. It is asking a new question.

**Cats arc — Haircut and Freezer Beef (3 new scenes)**

`haircut_shows_you` — Haircut staring at the original 1952 compass (not the calibrated main compass). Clearly communicating: this compass is reading the actual field. Four degrees off. The main compass has been corrected away from the truth.

`freezer_beef_hold_reason` — Freezer Beef sitting in front of the Warm Hands hatch. Not guarding. Bearing witness. She has sat near this hatch across twenty years of crossings. "You are here too, now. For your few days. That is also something."

`cats_act_three` — Both cats on the main deck in Act Three. Three metres apart. Facing forward toward the anomaly position. Haircut looks at you: *you are here. You have been asked to witness. Do the work.*

**Sunday service as institution (2 new scenes + meta tracking)**

`sunday_history_mention` — Lena tells you the ship always has Sunday service. Morozov brought vestments. One year only Alexei came. Volkov led it himself: *we are here, we are still here, that is enough.* Wired into early galley hub.

`sunday_service_second_crossing` — On second+ crossing: before beginning the service you hold a specific memory from the last one. The line of people who stood at this end of the mess before you. Service outcomes (`service_intercession_held`, `service_word_true`, services celebrated) now collected in `metaUnlocks`.

**Othis's inner life (1 new scene)**

`othis_railing` — Othis at the starboard railing off duty. Available only after he has turned. "I have been doing this work for twenty-three years. I am good at it. I don't know what else I am good at." He does not invite response. He thanks you by saying the manifest is in order. The language available to him is the language of logistics.

**Archive as character (3 new scenes)**

`hold_box_open` — Open another box. In the margin: *the reading is real.* Underlined twice. The archive is not just data. It is the decisions.

`hold_box_older` — Behind the stack: a pre-war-manufacture box with the ship's earlier name. A 1961 photograph of people at instruments you recognise — the same instruments currently running above you. Names on the back, written in the wrong order: the woman who was clearly in charge is listed last.

`hold_handwriting_study` — The same shorthand notation across 1957 and 1972 logs, different teams, different countries. Not in any style guide. Developed on this ship. Transmitted from one team to the next. The ship developed a language. That is what was going to be lost.

**Connie's follow-through (1 new scene)**

`connie_filed_notes` — She filed it through proper channels. Got a response: *noted.* "In twenty-two years, sixty ships, approximately four hundred reports requiring substantive response — every single one got exactly this." She filed it anyway. The record exists. "That's enough for now."

**Lena Volkov 1978 (1 new scene)**

`lena_volkov_1978` — Volkov's last crossing, 1978, November, anomaly at its highest. He came back different. He checked the bilge for three years after and said only: *the ship knows the way home.* He did not mean back to port. "I have been on this ship for twenty-two years trying to understand what that means. I think I'm getting close." Sets `lena_fragment_4_seen`.

**Pavel riddle resolution (1 new scene)**

`pavel_riddle_resolution` — After receiving both riddles and `chaplain_real`: Pavel asks what the riddles were pointing at. You say: the crossing is where the change happens, the ship carries everyone who has stood here, the third riddle is an invitation. He says: yes. "The three riddles are not separate. They are the same question at three different distances." +10 theosis, grants `crossings_recurse` belief.

**Alexei joke callback (1 new scene)**

`alexei_joke_callback` — In Act Three at peak anomaly: Alexei tells you the joke again. With an addendum. "A magnetic anomaly walks into a bar. The compass doesn't know which way to turn. But it still turns." He has been thinking about it for two days. The joke is about him, right now, continuing to function under conditions that exceed his calibration range.

**Anomaly season (1 new scene)**

`chartroom_anomaly_season` — In the long logs: peak deviations are not random. 27-month and 18-month alternating intervals. 18-month intervals occur in November crossings. The 1961 team scheduled every crossing for November. They knew. In a 1963 log: *peak confirmed. November again.*

**Ambient events: 10 new (16 total)**
`haircut_brings_below`, `alexei_arguing_instruments`, `lena_singing_galley`, `ship_creak_night`, `othis_manifest_double`, `pavel_forward_hatch`, `nadia_cloud_count`, `miguel_photograph_glimpse`, `connie_porthole_reflection`, `warm_hands_note_night`.

**Scene count: 335** (was 315).

---

## v3.6.0 — Current

### Engine

**`push_consequence` system — activated**
- Delay chains now fire in gameplay. `pushConsequence({ delay_scenes, flagsToSet, onFire })` queues consequences that execute N scene navigations later via `tickDelayedConsequences()` in `navigate()`.
- `stat max` condition: `{ type: 'stat', stat: 'composure', max: 3 }` now supported in `evaluateCondition`.

**`pastLifeFlags` system — activated**
- `gameStarted` handler now injects meta values into `G.pastLifeFlags` at crossing start.
- `{ type: 'past_flag', id: 'been_here_before' }` conditions now gate content on second+ crossings.
- Flags injected: `ever_refused_mission`, `ever_transmitted`, `settled_solidarity`, `touched_instrument`, `lena_knew_you`, `was_a_passenger`, `been_here_before`.

---

### Spasibo — Content

**push_consequence wired (2 consequences)**
- `landstorm_radio_call` queues a consequence (`delay_scenes: 5`): Othis's suspicion increases, `othis_instrument_room_unexplained` set, toast fires. The institutional pressure becomes visible on the ship 5 scenes after the call.
- `anomaly_first_noticed` queues `connie_vitals_available` flag (`delay_scenes: 4`). Connie's observation scene now requires this flag rather than the raw anomaly flag — it surfaces naturally rather than on first visit.

**Past-life scenes (4 new)**

`foredeck_second_crossing` — Pavel at the bow. He knows before you say anything. He hands you the rope. "Different crossing. Same ship." +6 theosis, +2 trust. Wired into foredeck hub on second+ crossings.

`cabin_wake_second` — You wake on a second crossing and know what the last paragraph of the letter says before you get there. You read it anyway. You let it arrive again. Redirects cabin_wake for second+ players.

`alexei_recognises` — His instruments show a 0.007° baseline shift consistent with prior crossings. "You have been at this position before. I don't know what that means. I know it's true." Grants `crossings_recurse` belief. Available when `ever_transmitted` is in past_life_flags.

`lena_recognises_passenger` — If you were a passenger last crossing, Lena sees it. She notes the change in quality. She pours your coffee without asking. +5 theosis, +2 trust.

**Anomaly direct contact scene**

`anomaly_contact` — Gated: archive transmitted + theosis ≥ 66 + 2+ soundings settled. The instruments hold at 41.3°. You put your hand on the housing. The reading changes to 0.000. The field is paying attention. +12 theosis, sets `anomaly_direct_contact`, raises deviation to 1.0.

**Alexei personal experience arc (3 new scenes)**

`alexei_night_alone` — He's in the instrument room at night because he can hear the instruments change frequency during the anomaly. Tonight they're completely still. "I think it is listening." +4 theosis, +2 trust. Triggers `anomaly_responds` belief.

`alexei_sit_night` — You sit with him until the instruments begin moving again. His father the oceanographer. What we call the anomaly is the part of the field that speaks our language. Tonight it stopped speaking our language. +5 theosis.

`alexei_what_listens` — "I think it responds to being witnessed. That is what it's listening for. More witnessing." Grants both `anomaly_responds` and `archive_matters` beliefs. +7 theosis.

**Nadia arc conclusion (2 new scenes)**

`nadia_found_it` — She found the 1978 confirmation. Forty-seven years ago, someone else on this ship found the same thing. She doesn't need to find it again. She needs to make sure the record doesn't disappear. +8 theosis, +4 trust. Available in Act 3 if archive was transmitted.

`nadia_did_not_find_it` — She didn't find the confirmation this crossing. She found that someone else was also looking, also serious, also wrote it down. "That's not nothing." +4 theosis. Available in Act 3 if archive was not transmitted.

**Miguel's history arc (2 new scenes)**

`miguel_why_fifteen_years` — His father fished the same waters for forty years. Miguel thought that was small. He went further, found different seas, and realised he was looking for what his father had — knowing a water well enough to hear what it tells you. +4 theosis, +3 trust. Available at communion ≥ 4.

`miguel_what_ship_knows` — "The sea needs to know who you are before it shows you what it has." The ship tests you the same way every crossing. The ones who understand come back. They change. Grants `crossings_recurse` belief. +6 theosis.

**Warm Hands gift 4 — conclusion expanded**
The hand exchange now has full weight: they hold your hand for three seconds to confirm you are present in the body. They are cataloguing you. You are in their record now. "Whatever they are cataloguing below — in their space that is in the 1952 construction documentation — they needed to add you to it."

**Ambient event pool — 10 new events (was 6, now 16)**
`haircut_brings_below`, `alexei_arguing`, `lena_singing`, `ship_creak_night`, `othis_manifest_twice`, `pavel_forward_hatch`, `nadia_cloud_count`, `miguel_photograph`, `connie_window`, `warm_hands_gift_night`.

**Cover field payoffs — connection + background (2 new scenes)**

`othis_knows_connection` — Othis stops you in the corridor. He checked your connection. The records are incomplete in ways he wouldn't expect. He is noting this in his own records. Cover challenge: connection, difficulty 11.

`miguel_q_background` — Miguel at the wheel. He wants to know what brought someone with your background to this crossing, at this time. He leaves the space. Choice: tell him something true (grants `chaplain_real` belief) or hold the cover.

**Past-life injection**
`newPlay` handler now collects key outcomes into `metaUnlocks` before reset. `gameStarted` injects these into `G.pastLifeFlags`. The game knows what happened in prior crossings and what kind of crosser you are.

---

## v3.5.0 — Current

### Engine

**Belief system — now gates content**
- All 7 beliefs (`chaplain_real`, `anomaly_responds`, `archive_matters`, `ship_remembers`, `sobornost_real`, `crossings_recurse`, `archive_suppressed`) now gate unique scenes and dialogue branches. Previously set but never read.
- `{ type: 'believes', id: 'belief_id' }` condition used extensively in new scenes.

**Linguistic drift — full word mapping**
- 14 Cyrillic translation pairs registered for doubt-based flicker.
- `setTheosisWordShifts(map)` — new engine function. Registers word→[tier0, tier1, tier2] mappings for deterministic theosis-based word replacement. Exposed in `window.SOBORNOST`.
- Theosis word shifts: mission→crossing→pilgrimage, the archive→the record→the witness, anomaly→field→что отвечает, cover→performance→mask, the ship→Заря→she who crosses, cargo→cargo→what we carry.

**Ritual system — fully activated**
- Ritual choice handler now applies `theosis`, `composure`, `communion`, `come_to_believe`, and `tags` (sounding advancement) — was previously only handling `effect` and `set_flag`.
- `progressSoundingsByTag(tag)` — new engine function. Advances all active soundings whose `alignmentTags` include the given tag.
- Sunday service ritual now correctly applies all mechanical effects through its phases.

**Condition evaluator — `stat max` added**
- `{ type: 'stat', stat: 'composure', max: 3 }` — upper bound condition. Used by the Passenger ending gate.

---

### Spasibo — Content

**Belief-gated scenes (4 new)**

`lena_silence_chaplain` — unique variant of lena_silence, accessible only when `chaplain_real` belief is set. Lena tells you she can see you stayed real. +8 theosis, +3 trust. Routes to galley_hub.

`transmission_intentional` — expanded to a `get text()` function. With `archive_matters` belief: you know what the archive is and transmit it consciously. With `anomaly_responds` belief: the deviation reading moves toward the 1978 bearing in response.

`anomaly_responds_known` — belief-gated scene before `anomaly_responds`. With the belief set: you already knew this. The anomaly has been building a response for thirty years. You put your hand on the instrument housing. The reading changes by 0.003 degrees. +10 theosis, sets `anomaly_direct_contact` flag.

Solidarity ending — with both `sobornost_real` and `archive_matters` beliefs: unique paragraph. You know the word now not as concept but as recognition.

**Linguistic drift**
- 14 translation pairs: The Dawn/Заря, archive/архив, mission/задание, cover/прикрытие, the field/поле, the anomaly/аномалия, the ship/корабль, chaplain/капеллан, crossing/переход, witness/свидетель, the archive/архив, transmission/передача, the record/запись, the hold/трюм.
- At high doubt, these flicker as `<span class="cyrillic-flicker">` elements with the original as a title attribute.
- Theosis word shifts active: at tier 1 (≥33), key words begin shifting. At tier 2 (≥66), full Cyrillic/transformed register.

**Sunday service ritual — fully operational**
- `start_ritual` choice in `sunday_service_begin` now correctly activates the engine's ritual render path.
- Ritual choices apply theosis, stats, and sounding tags through all four phases.
- Intercession phase: "Receive each name" choice grants `ship_remembers` belief.
- Response phase: "Stay present" choice grants `sobornost_real` belief.
- Service is now the primary route to `sobornost_real` and `ship_remembers` beliefs.

**Connie's arc — completed (3 new scenes)**

`connie_vitals_theological` — she writes "anomalous readings, source unclear" in the medical log. She doesn't apologise for it. Grants `anomaly_responds` belief, +5 theosis, +3 trust.

`connie_vitals_field` — you give her the electromagnetic framework. She realises the stress response is running in the wrong direction — the anomaly is dampening it, not activating it. She writes the full observation in the log. Sets `connie_wrote_full_log` flag, grants `anomaly_responds` belief.

`connie_vitals_honest` — you tell her you don't know either. She uses the word "settling" in the medical log of a research vessel. Does not apologise. Sets `connie_wrote_settling` flag. +6 theosis, +4 trust.

All three branch from `connie_vitals_observation` (existing). Old stub scenes removed.

**The Passenger — sixth ending**

`ending_passenger` — the crossing where nothing happened. Cover maintained. Mission neither completed nor refused. No soundings settled. No crew members really known. The ship docked at 6:14. You disembarked. Haircut watched you leave and looked away.

Gated: mission NOT refused + archive NOT transmitted + solidarity sounding NOT settled + communion ≤ 3. Priority 2 — fires only when nothing else does. Nearly impossible to reach deliberately, which is the point.

Sets `wasAPassenger` counter in `metaUnlocks`. If you begin a new crossing having been a passenger, the game knows.

---

# CHANGELOG

---

## v3.5.0 — Current

### Engine

**Linguistic drift — theosis-tier word substitution**
- `applyLinguisticToggle` now runs two passes: a deterministic theosis-tier word shift and the existing probabilistic doubt-Cyrillic flicker.
- `_THEOSIS_WORDS` table maps charged vocabulary to three tier variants:
  - *the mission* → *the crossing* → *the pilgrimage*
  - *the archive* → *the record* → *the witness*
  - *the anomaly* → *the field* → *что отвечает*
  - *the cover* → *the performance* → *the mask*
  - *the instrument room* → *the measuring room* → *the listening room*
- Word shifts are deterministic (no per-render flicker) and memoised per scene+tier.
- Capitalised forms handled automatically.

**Linguistic drift — expanded translation table**
- 10 registered translations (was: 4): added `the field`, `the anomaly`, `the ship`, `chaplain`, `crossing`, `witness`.

---

### Spasibo — Content

**1. Belief system wired to content**

All seven beliefs now gate unique content unavailable by any other route:

- `energies_real` → `alexei_energies` scene: Alexei has thought this since the second crossing. The field returns readings inappropriate for the geological formation size. He never wrote it in the reports. He will now.
- `archive_matters` → `transmission_intentional` scene: transmitting with understanding of what the archive is — not as data, as witness. The field's response is immediate. Alexei marks the deviation shift, underlines it twice.
- `chaplain_real` → `pavel_riddle_three_belief` scene: Pavel has watched the crossing and seen something arrive. *Welcome. To the work.* Available only when the belief is held and Pavel hasn't already said it.
- `sobornost_real` → unique paragraph in the solidarity act two hub text.
- `anomaly_responds` → set by `alexei_energies` and `transmission_intentional`; gating further content (pending).
- `ship_remembers`, `crossings_recurse`, `archive_suppressed` → set; content gates planned in v3.6.0.

**5. Sunday service ritual — fully expanded**

The ritual now has four phases (was: 3), each with rich scene text:

- *Gathering*: the full mess hall scene — Alexei in the third row, Connie unsure why she came, Othis absent, Pavel by the door letting you start.
- *The Word*: the prepared text vs. what the crossing has taught you vs. a single true sentence added at the end. Each choice tagged for sounding advancement.
- *Prayers of the People* (new phase): Nadia names someone. Lena names Volkov. Alexei says the ship's original name in Russian. Miguel nods once.
- *After*: Lena refilling tea, Alexei's question that ends meteorologically, Nadia crying in the right way. Pavel catching your eye. Choice to stay or hold the doorway.

All four phases now carry sounding tags (`pastoral`, `witness`, `memory`, `stillness`). The service advances soundings while it happens.

**6. Connie's arc — 4 new scenes**

Connie Frank has a medical observation she hasn't put in the log. Across the anomaly peak, the crew's vital signs are unusually stable — blood pressure, heart rate, oxygen saturation. Consistent with people who are in the right place. She has no medical framework for this.

- `connie_vitals_observation`: Connie tells you. Three response paths.
- `connie_vitals_response_theological`: if `energies_real` believed — Palamas, uncreated energies, the field as location where they're measurable. She writes "sustained attentional coherence" in the log.
- `connie_vitals_response_field`: the ship is non-magnetic, the crew is in direct contact with the field. She writes "warrants further investigation."
- `connie_vitals_response_honest`: "I don't have a framework either." She appreciates the honesty. Sets `chaplain_real` belief.

**7. The Passenger — sixth ending**

A crossing where nothing happened. Cover intact, never seriously tested. Mission neither completed nor refused. No soundings settled. The archive undisturbed.

Priority 1 (lowest) — fires when no other ending is triggered. The ending text names what was available and passed through without landing: the anomaly, the archive, the Warm Hands, the sounding. Haircut watched you leave from the top of the gangway. The ship didn't watch you leave because the ship didn't know you were there.

*She just watched you go.*

The Passenger makes the other five endings more meaningful by contrast. It is nearly impossible to reach intentionally — the game constantly offers hooks into meaning. You have to actively refuse them.

---

---

## v3.4.0 — Current

### Engine

**Panels — architecture fix (definitive)**
- Panel overlays now render into `document.body`. `openPanel()` renders synchronously on click, bypassing the async `scheduleRender()` microtask queue. Eliminates persistent flash-and-disappear behaviour.
- Panels animate via CSS `.open` class added one `requestAnimationFrame` after render.
- Close animates out before overlay removal (250ms).
- `_renderPanel(po, root)` extracted as shared dispatch function.

**Panel layout — right-side drawer**
- Panels slide in from the right at `min(380px, 92vw)`, full viewport height, with box-shadow and backdrop blur.

**Navigation bar — persistent in body**
- Nav appends to `document.body` on first render; subsequent renders update in-place. Eliminates double-fire bug.

**Scroll — fires on every choice**
- `applyChoice` and `return_to` buttons reset `_lastScrolledScene = null` before navigating, ensuring scroll fires on every choice including pool redirects and same-scene transitions.
- `_doScroll` uses `scrollIntoView` on `.game-header` as primary mechanism.
- `navigate()` closes any open panel before changing scene.

**Companion system**
- `registerCompanionLine(id, entry)` — location/trust/condition-gated ambient lines.
- `getCompanionLine(id, location)` — retrieve random eligible line.
- `injectDialogueBeat(afterIndex, beat)` — splice beat into active dialogue.

**Roll system**
- `performVisibleRoll(stat, difficulty, options)` — performs roll, stores in `G._lastRoll`.
- `visibleRollHtml(result)` — styled `<span>` with dice, stat, total, outcome.
- `registerRollModifier(stat, condFn, valFn)` — conditional roll modifiers.
- `BASE_DIFFICULTY` raised from 8 to 11. Cover partial outcomes clear field pressure.

**Condition evaluator — new types**
`mode`, `hour`, `hour_gte`, `hour_lte`, `believes`, `stance`.

**Meta-persistence**
- `getMetaValue(key, fallback)` — read meta with default.
- `newPlay()` stores last waking charism, transmission count, Lena fragments, crew variant.
- `newPlay` emits `'newPlay'` event before reset.
- Audio state and game mode persist in saves and restore on load.
- `G.flags`, `G.beliefs`, `G.knowledge` re-wrapped in `new Set()` on load.

**Magnetic deviation**
- Scene header shows deviation indicator (degrees + calibration status) when > 0.2.
- `data-deviation="mid"|"high"` on root element.
- Location text probabilistically substitutes Cyrillic equivalents at deviation > 0.75.
- `anomaly_pulse` SFX fires on navigation when deviation > 0.5.

**Audio system**
- All gain levels raised ~4×. Engine was previously inaudible without external amplification.
- `ship_ambient_start` / `ship_ambient_stop` — continuous ambient drone (detuned sines + filtered noise).
- `anomaly_pulse` — sub-bass throb scaling with deviation.
- `radio_static` — bandpass-filtered noise for radio scenes.
- `toggleAudio` starts/stops ambient drone.

**`renderCrossingRecord`** now exported in `window.SOBORNOST`. Was causing soft-lock at end of every crossing.

**`renderHelp`** — full-screen mechanics reference with keyboard shortcuts and high-contrast toggle.

**`renderMode`** reads from `_registries.modeDescriptions`, displays `.long` description.

**Keyboard navigation** — Keys 1–9, Escape, Tab, Enter/Space. `aria-keyshortcuts` on choice buttons.

**ARIA** — `role="main"`, `role="navigation"`, `role="dialog" aria-modal="true"` on panels, `aria-live="polite"` on toasts, `aria-hidden` on ASCII art.

**Colour contrast** — `--dim` raised to `#7a98aa`, `--cold-dim` to `#5f8caa`. Both pass WCAG AA.

**`SOUNDING_THRESHOLD`** reduced 8 → 6.

**Sounding settle overlay** — full-screen overlay with animated paragraphs, divider, effects summary, "Continue." button.

**Tutorial** — mode-aware, four sections, cover challenge mechanics explained for Attended, auto-resolve explained for Witnessed.

**`_choiceIdx` declared before `forEach`** — was causing ReferenceError that silently killed all choice rendering on every deployment.

---

### Spasibo — Content

**Endings — fully expanded** (~600–850 words each)
All five endings rewritten. Erasure: physical specificity of the burning, each crew member's response. Witness: specific hidden location, consequence timeline, Kylie's second notebook. Solidarity: 3am galley, each character placed, sobornost argument landed. The Knowing: Pavel's full speech, Haircut's proper ending. Restoration: sobornost_real belief adds paragraph.

**Cover/theosis constitutive tension**
Theosis ≥ 50 → −1 on cover challenges. Theosis ≥ 70 → −2. Settling a sounding restores 1 cover integrity.

**NPC reactive scenes (4 new)**
`alexei_after_transmission`, `miguel_after_refusal`, `lena_after_sounding`, `othis_after_turning`. Each fires once after a specific event and references what happened.

**Sounding offer scenes (2 new)**
`sounding_crossing_moment` (foredeck, sense of direction), `sounding_forgiveness_moment` (main deck, the sea's indifference).

**Third act transitional scene**
`the_arrival` — names what each act was, announces the third day, revelation mood, branches to four Act Three paths.

**Cover story payoff (2 new)**
`kylie_cover_contradiction` — Kylie's contact contradicts your posting. `connie_followup_question` — Connie returns to what you said you left.

**Soundings — fully reworked**
All five have `settleText` (3–6 paragraphs), `settleDesc`, and `onSettle` functions with mechanical effects. 22 choices across the game now carry sounding tags (was: 5).

**Solidarity ending — reworked gate**
Old: communion ≥ 8 + all five crew met + theosis ≥ 50.
New: `solidarity_sounding_settled` + mission refused + met Miguel + met Lena + theosis ≥ 45.

**`main_deck_hub` rewritten** — `get text()` with 7 conditional registers across day, anomaly state, transmission aftermath, Landstorm pressure, theosis tier, Haircut, Pavel.

**Bug fixes**
- `"I had good teachers"` no longer routes to denomination response without denomination set.
- `"What do you mean, 'is cargo'?"` — replaced with `"What does Othis do, exactly?"`.
- `hold_1972_box`, `othis_confrontation`, `anomaly_nadia_sonar` — fallback exits added.
- `pavel_ferromagnetic` — continue option added when denomination already set.

**Sounding tagging** — 22 choices tagged (was: 5). Per-sounding coverage: crossing 14, forgiveness 17, history 13, sobornost 21, solidarity 17.

**Variable crew** — Miguel, Kylie, Othis have 2–3 variant first scenes driven by `crewVariant` meta and `transmissionCount`.

**1978 position fork** — `position_1978_attempt` + `position_1978_arrival`. Instruments go to 41°.

**Anomaly grows** — `anomaly_overcalibrated` + `anomaly_what_accumulates`. Starting deviation increases per prior transmission.

**Lena's arc** — 5 fragments across crossings. Fragment 4 accelerated by sounding_history settle.

**Charisms compound** — `charism_witness_memory`, `charism_prophet_pavel`, `charism_rememberer_open`. New scenes on second+ crossing based on last charism.

**Stink Patrol recurring** — `stink_patrol_gift` with 4 rotating gifts per crossing (language phrase; warm object; construction doc; hand exchange).

**Item examine scenes (4)** — `examine_zarya_photograph`, `examine_volkov_photograph`, `examine_both_photographs` (+3 theosis), `examine_stink_patrol_paper`. Status panel items tappable.

**Pavel companion — fully expanded**
16 ambient lines across 4 locations. Interjections in Othis confrontation (trust ≥ 3) and Landstorm silence (trust ≥ 4). Roll modifiers at trust 2/3/4. `pavel_anomaly_theology`, `pavel_at_transmission`, `pavel_othis_mediation` — three new companion scenes.

**Witnessed mode — proper identity**
Auto-resolved challenges. 80% theosis. +1 Communion starting bonus. `witnessed_orientation` intro scene.

**Accessibility** — high-contrast mode, `prefers-reduced-motion`, mobile nav scaling, GOST fallback font, inline SVG favicon.

---

## v2.3 "Brass and Cold Light" — May 2026

### Visual Overhaul — 10 improvements

**1. Reading column**
`--max` reduced from 660px to 640px. Asymmetric padding: 2.2rem left, 1.4rem right. The text sits slightly left of centre, creating intentional white space on the right that lets the porthole canvas breathe through.

**2. Choice visual hierarchy**
Navigation choices (`Go to the main deck`) use a `·` prefix, 1px border, and `var(--fg-dim)` colour. On hover: `—` prefix, 2px cold border, full `var(--fg)`. Consequential choices (`.choice-vespers`, `.choice-cold`, `.choice-charism`) use 2px border and full colour at rest — they look heavier because they are.

**3. Location bar**
Now `.8rem` (up from `.72rem`) and the dominant visual element in the header. The liturgical hour is rendered as a subordinate `<span class="loc-hour">` at `.58rem` in `var(--dim)` — same data, clearly different weight. The engine now creates two separate elements rather than concatenating a single text string.

**4. Header breathing room**
Padding increased to `.9rem 1.4rem .65rem`. Gap between location and stat bar increased to `.55rem`. A `border-top: 1px solid var(--border)` separates the stat bar from the location line — ambient information visually below navigational information. Stat labels switched from uppercase to lowercase and from `var(--dim)` to `var(--cold-dim)` — they read as annotations rather than labels.

**5. Sounding cards**
Completely redesigned. Left-border treatment (`border-left: 3px solid`) instead of full box border — the Breviary now feels like a manuscript margin rather than a list of UI components. Taken soundings: cold-dim border. Settled soundings: cold border + cold-faint background + "settled" micro-label above the name. Sounding text separated from name by a subtle rule. The codex uses full box borders throughout — the two panels no longer look identical.

**6. Dialogue beat differentiation**
Speaker name gets a `::after` rule — a horizontal line extends from the name to the right edge of the NPC dialogue box, like a table rule in a ship's log. Narration beats are `.88rem` italics in `var(--dim)` with no border treatment — clearly distinct from spoken dialogue. "Continue" advance button uses `↓` instead of `—` and is dimmer than other choices.

**7. Title screen**
"СПАСИБО" now sits inside `.title-plate` — a container with heavy top and bottom borders (`3px solid rgba(138,104,56,0.6)`) and side decoration (`·  ·  ·` in each corner via `::before`/`::after`). The name looks like a ship's name plate in brass. Tier-responsive: Asleep = `var(--fg)`, Waking = `var(--cold)` with blue glow, Illumined = `var(--gold)` with gold radiance. Meta-unlock marks (✦ through ✦✦✦✦✦) positioned below the plate.

**8. Porthole gold — steeper curve**
Previous curve: 0 at Asleep, 0.6 at Illumined (flat). New curve:
- Asleep (< 33): 0
- Waking (33–65): 0.10 → 0.40 (slow rise)  
- Illumined (66–84): 0.60 → 0.90 (steeper)
- Rememberer (≥ 85): 0.92 (near-maximum)

Ring glow halo added: at `gi > 0.5`, canvas shadow blur fires as `r * gi * 0.4`. At Illumined tier the porthole ring visibly radiates. CSS `drop-shadow` by tier adds a second layer: Waking = subtle 6px, Illumined = 16px gold radiance.

**9. Bottom nav — active state**
`border-top: 2px solid transparent` slot on all buttons. Active panel: `border-top-color: var(--cold-dim)` + cold background. Breviary with available soundings: amber top border. Each button has a `data-panel` attribute for CSS targeting. `map` and `log` buttons at 70% opacity (rarely needed) — hover restores to full. Engine now tracks `G.panelOpen` against panel IDs and applies `.panel-active` class on render.

**10. Cover challenge dice — logbook notation**
Previous: `[4]+[3]=7+5=12 — SUCCESS`. New: two square `.die` elements side by side, then `Background · total 12 · holds` in `.72rem` uppercase — reads like a ship's log entry rather than a TTRPG roll. Result border changes colour by outcome (cold for success, amber for partial, rust for failure). Engine `resolveCoverChallenge` now passes field name through to the result display.

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

