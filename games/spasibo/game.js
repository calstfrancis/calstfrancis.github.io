// ─────────────────────────────────────────────────────────────────
// SPASIBO — game.js
// A SOBORNOST Engine Production
// ─────────────────────────────────────────────────────────────────

'use strict';

const S = window.SOBORNOST;

// ─────────────────────────────────────────────────────────────────
// ENGINE CONFIGURATION
// ─────────────────────────────────────────────────────────────────

S.setTheosisTiers([
  { max: 32,  word: 'The Dawn', wordPlural: 'The Dawn', label: 'Asleep'    },
  { max: 65,  word: 'Zarya',    wordPlural: 'Zarya',    label: 'Waking'    },
  { max: 100, word: 'Заря',     wordPlural: 'Заря',     label: 'Illumined' },
]);

S.setShipWordFunction(() => {
  const t = S.G.theosis;
  if (t <= 32) return 'The Dawn';
  if (t <= 65) return 'Zarya';
  return 'Заря';
});

S.registerStatTip('vigilance', 'bearing — cover and detection');
S.registerStatTip('composure', 'stillness — pastoral presence');
S.registerStatTip('communion', 'solidarity — what you have given');
S.registerStatTip('doubt',     'static — rises with cover strain');

S.registerNameMapping('Pavel',  'Павел',   'Павел',   'Павел', true); // Cyrillic from Waking tier
S.registerNameMapping('Miguel', 'Misha',   'Mikhail', 'Михаил');
S.registerNameMapping('Lena',   'Lena',    'Elena',   'Елена');
S.registerNameMapping('Alexei', 'Alyosha', 'Alexei',  'Алексей');
S.registerNameMapping('Nadia',  'Nadya',   'Nadia',   'Надежда');
S.registerNameMapping('The Dawn', 'Zarya', 'Zarya',   'Заря');

S.setAvailableModes(['attended', 'witnessed']);
S.setModeDescriptions({
  attended: {
    name: 'Attended',
    short: 'You are here. Your choices matter.',
    long: 'Standard play. You navigate the crossing through your choices — what you say, who you trust, what you decide about the mission. Your cover can fail. Your stats accumulate. The crew responds to what you do. All five endings are reachable. Choose this for your first crossing.',
  },
  witnessed: {
    name: 'Witnessed',
    short: 'The crossing unfolds. You observe.',
    long: 'A quieter mode for experienced players. Cover challenges resolve automatically. The story draws more on your theosis and accumulated history than on moment-to-moment choices. What you carried forward from previous crossings shapes what you see. Choose this if you want to experience the narrative without the mechanical pressure.',
  },
});

// Compass axes — magnetic deviation between true north and instrument north
S.registerCompassAxes('True', 'Mag');

// Cyrillic linguistic drift — triggers as doubt rises
// Ship/mission vocabulary drifts toward Russian under cover strain
S.registerTranslation('The Dawn', 'Заря');
S.registerTranslation('archive', 'архив');
S.registerTranslation('mission', 'задание');
S.registerTranslation('cover', 'прикрытие');
S.setInitialScene('cabin_wake');

// ─────────────────────────────────────────────────────────────────
// ASCII ART
// ─────────────────────────────────────────────────────────────────

S.registerArt('ship_zarya', [
  '         |    |    |        ',
  '        )_)  )_)  )_)       ',
  '       )___))___))___)\\     ',
  '      )____)____)_____)\\\\  ',
  '   ___|____|____|____\\\\\\_  ',
  ' --\\                    /-- ',
  ' ~~  ~~~  ~~  ~~~  ~~  ~~~  ',
].join('\n'));

S.registerArt('ship_title', [
  ' ~  ~  ~  ~  ~  ~  ~  ~  ~ ',
  '       |    |    |          ',
  '      )_)  )_)  )_)         ',
  '     )___))___))___)\\ ',
  '    )____)____)_____)\\\\ ',
  '  ___|____|____|____\\\\\\_  ',
  ' --\\                   /-- ',
  '  ~ ~~~  ~~  ~~~  ~~  ~~ ~  ',
].join('\n'));

S.registerArt('portrait_pavel', [
  '    .  * .  .    ',
  '  .  . ___ .  .  ',
  '   ( o   o )     ',
  '    |  ω  |      ',
  '    | ~~~ |      ',
  '   /|_____|\\     ',
  '    Pavel         ',
].join('\n'));

S.registerArt('portrait_miguel', [
  '   ___________   ',
  '  |  _______  |  ',
  '  | | . . | | |  ',
  '  | |  ═  | | |  ',
  '  | |_____| | |  ',
  '  |___________|  ',
  '     Miguel       ',
].join('\n'));

S.registerArt('portrait_lena', [
  '   .·:·:·:·:.    ',
  '  ( ·  ,  · )    ',
  '  |   ___   |    ',
  '   \\  \_/  /     ',
  '    \\____/      ',
  '   ( steam  )    ',
  '      Lena        ',
].join('\n'));

S.registerArt('portrait_alexei', [
  '  ┌───────────┐  ',
  '  │ ∿∿ · ∿∿  │  ',
  '  │  (o   o) │  ',
  '  │    ___   │  ',
  '  │  ─────  │  ',
  '  └───────────┘  ',
  '     Alexei       ',
].join('\n'));

S.registerArt('portrait_nadia', [
  '   * . * . * .   ',
  '    ___________  ',
  '   / * .   . \\  ',
  '  |  ^       |  ',
  '  |   \_____/ |  ',
  '   \\__________/ ',
  '      Nadia       ',
].join('\n'));

S.registerArt('portrait_kylie', [
  '   [  ■  ■  ■ ]  ',
  '  ┌─────────────┐ ',
  '  │ ▷      ◁  │ ',
  '  │   ─────   │ ',
  '  │  ◈  ◈   │ ',
  '  └─────────────┘ ',
  '      Kylie        ',
].join('\n'));

S.registerArt('portrait_connie', [
  '   ╔═══════════╗  ',
  '   ║  ·     ·  ║  ',
  '   ║    ───    ║  ',
  '   ║  \_____/  ║  ',
  '   ╚═══════════╝  ',
  '   ╟ M  ·  D  ╢  ',
  '      Connie       ',
].join('\n'));

S.registerArt('portrait_othis', [
  '  ┌─────────────┐  ',
  '  │ ▌  ·   · ▐ │  ',
  '  │     ═     │  ',
  '  │  |     |  │  ',
  '  │  |_____|  │  ',
  '  └─────────────┘  ',
  '      Othis         ',
].join('\n'));

// ─────────────────────────────────────────────────────────────────

// Haircut: black Tiffany Chardonnay, self-possessed
S.registerArt('portrait_haircut', [
  '  ▓▓▓▓▓▓▓▓▓▓▓▓  ',
  '  ▓ ▓         ▓  ',
  '  ▓  ●     ●  ▓  ',
  '  ▓     ▲     ▓  ',
  '  ▓   ─────   ▓  ',
  '  ▓▓▓▓▓▓▓▓▓▓▓▓  ',
  '   HAIRCUT [♀]   ',
].join('\n'));

// Freezer Beef: small calico, salamander-headed
S.registerArt('portrait_freezer_beef', [
  ' ░░░▒░ ░▒░░░░   ',
  ' ░ ●══════● ░   ',
  ' ░░  flat  ░░   ',
  ' ░ (calico) ░   ',
  ' ░░░░░░░░░░░░   ',
  '               ',
  ' FREEZER BEEF [♀]',
].join('\n'));


S.registerArt('portrait_oblong', [
  '   · · · · · ·   ',
  '  ╔═══════════╗  ',
  '  ║  ?     ?  ║  ',
  '  ║    ···    ║  ',
  '  ║  ·     ·  ║  ',
  '  ╚═══════════╝  ',
  '     Oblong       ',
].join('\n'));

// ─────────────────────────────────────────────────────────────────
// CHARISMS
// ─────────────────────────────────────────────────────────────────

S.registerCharisms(
  [
    {
      id:     'confessor',
      name:   'The Confessor',
      desc:   'People tell you things they shouldn\'t. You have never been entirely sure why. There is something in how you listen — or in what you do not do while listening — that opens the interior of a room before you have been invited in.',
      effect: 'Some conversations go further than they would for others.',
    },
    {
      id:     'faster',
      name:   'The Faster',
      desc:   'You have trained the body\'s hunger into a particular kind of attention. What most people experience as depletion you have learned to experience as clarity. The body\'s protest has become, over time, a frequency you can tune.',
      effect: 'Acts of stillness and restraint carry a different weight.',
    },
    {
      id:     'fool',
      name:   'The Fool',
      desc:   'The correct thing to say is often not the thing you say. What you say instead occasionally turns out to be more correct than the correct thing. You have stopped trying to understand this. It has not stopped happening.',
      effect: 'Failure sometimes opens what success would have closed.',
    },
    {
      id:     'healer',
      name:   'The Healer',
      desc:   'Before someone tells you what they need, you already know. Not always. Often enough that it has shaped how you move through rooms, how you time silences, what you notice first when you arrive somewhere new.',
      effect: 'What people carry becomes more visible to you than it is to them.',
    },
  ],
  [
    { id: 'sleeper',    name: 'The Sleeper',    desc: 'You forgot almost everything. The body forgets. Something else did not quite forget — something you cannot name or locate, only notice at the edges of recognition.',                                           effect: 'Occasional flashes from the last crossing surface at unexpected moments.',   requires_playcount: 1 },
    { id: 'penitent',   name: 'The Penitent',   desc: 'You know what you did. This is not the same as understanding it. You carry the specific weight of specific actions. It is very precise. It has changed how you move through rooms.',                                         effect: 'The world registers what was done before. Some of it is visible in how things are.',  requires_playcount: 1 },
    { id: 'witness',    name: 'The Witness',    desc: 'You were there last time. Something in your body retained the geography — where things were, how to get between them — without you consciously holding it. The ship feels partially familiar in a way you cannot account for.', effect: 'You arrive knowing the layout. Some things do not need to be found again.',      requires_playcount: 1 },
    { id: 'prophet',    name: 'The Prophet',    desc: 'The anomaly did something to your perception that did not fully reverse when the crossing ended. You see through interference that others experience as obstruction. What this reveals is not always comfortable.',             effect: 'The field shows you things that are not available to the untuned.',            requires_playcount: 1 },
    { id: 'rememberer', name: 'The Rememberer', desc: 'You have been on this ship before. Not metaphorically. The crossing is not new to you — it is recurring. This changes what Pavel is willing to say in your presence, and what the ship is willing to show.',                 effect: 'The crossing has a different texture. Some things have been waiting for you.', requires_playcount: 2 },
  ]
);

// ─────────────────────────────────────────────────────────────────
// MAP
// ─────────────────────────────────────────────────────────────────

S.registerMapNode('cabin',           { connections: ['main_deck'],                                  theosisRequired: 0  });
S.registerMapNode('main_deck',       { connections: ['cabin','bridge','mess','hold_access','foredeck'], theosisRequired: 0  });
S.registerMapNode('foredeck',        { connections: ['main_deck'],                                  theosisRequired: 0  });
S.registerMapNode('bridge',          { connections: ['main_deck','chart_room','captain_quarters'],  theosisRequired: 0  });
S.registerMapNode('mess',            { connections: ['main_deck','galley'],                         theosisRequired: 0  });
S.registerMapNode('chart_room',      { connections: ['bridge'],                                     theosisRequired: 33 });
S.registerMapNode('galley',          { connections: ['mess'],                                       theosisRequired: 33 });
S.registerMapNode('captain_quarters',{ connections: ['bridge'],                                     theosisRequired: 33 });
S.registerMapNode('hold_access',     { connections: ['main_deck','hold'],                           theosisRequired: 33 });
S.registerMapNode('hold',            { connections: ['hold_access','cargo_bay'],                    theosisRequired: 33 });
S.registerMapNode('cargo_bay',       { connections: ['hold','instrument_room'],                     theosisRequired: 66 });
S.registerMapNode('instrument_room', { connections: ['cargo_bay','aft'],                            theosisRequired: 66 });
S.registerMapNode('aft',             { connections: ['instrument_room'],                            theosisRequired: 66 });

// ─────────────────────────────────────────────────────────────────
// SOUNDINGS
// ─────────────────────────────────────────────────────────────────

// First sounding is offered in cabin_porthole_stay —
// the toast hint fires from the engine's offerSounding display
S.registerSounding('sounding_crossing', {
  id:   'sounding_crossing',
  alignmentTags: ['stillness', 'presence', 'silence', 'crossing'],
  name: 'On the nature of a crossing',
  text: 'What is left behind is not lost. What is ahead has not been found. Between them: this. The water. The cold. The sound of sails adjusting to wind you cannot see.',
  theosis: 3,
  stat: 'composure', statDelta: 1,
  settleTitle: 'On the nature of a crossing',
  settleText: [
    "You are not going anywhere. You are in it.",
    "A crossing is not a transit. It is a location. For the duration of this ship's passage, you live here — on this water, in this weather, with these people. There is no elsewhere to retreat to. There is only the quality of your attention to what is here.",
    "The monks who built their cells on islands understood this. The thing that happens when you cannot leave is not confinement. It is encounter. What you have been avoiding catches up. What you have been neglecting surfaces. The water does not produce this — it simply removes the exits.",
    "What has surfaced for you on this crossing? Not the mission. Not the cover. The thing underneath.",
  ],
  settleDesc: '+1 Composure · +3 Theosis · Cover integrity restored.',
  onSettle: () => {
    S.setFlag('sounding_crossing_settled');
    S.comeToBelieve('crossings_recurse');
    // Unlocks the 1978 position fork — you have the frame to understand what Nadia found
    if (S.hasFlag('nadia_1978_found')) S.setFlag('crossing_sounding_unlocks_1978');
  },
});

S.registerSounding('sounding_forgiveness', {
  id:   'sounding_forgiveness',
  alignmentTags: ['pastoral', 'forgiveness', 'presence', 'witness'],
  name: 'On forgiveness at sea',
  text: 'There is something about open water that makes the ledger seem less important. Not wrong. Less important. You are very far from anyone you have harmed. The horizon does not know your name.',
  theosis: 4,
  stat: 'communion', statDelta: 1,
  settleText: [
    "You have been carrying something for a while. You will know what it is.",
    "Forgiveness is not the same as absolution. Absolution is granted from outside. Forgiveness is something you do to the interior of yourself — a reorganisation of the furniture. You move what happened to a different room. It is still there. You still know where it is. But you do not have to keep going back to it.",
    "The sea helps with this for reasons no one can fully explain. Possibly the scale. Possibly the fact that the sea is indifferent — not cruel, not kind, not watching. It is simply that it is enormous and it does not care what you did, and somehow that is a relief.",
    "There is someone on this ship you have not been entirely fair to. You do not need to say anything. Just: stop keeping the ledger. See what happens to the room.",
  ],
  settleDesc: '+1 Communion · +4 Theosis · Stance with one NPC improved.',
  onSettle: () => {
    S.setFlag('sounding_forgiveness_settled');
    // Find the crew member with lowest trust and improve it
    const npcs = ['miguel', 'kylie', 'othis', 'lena', 'alexei', 'nadia'];
    let lowest = null, lowestTrust = 99;
    for (const npc of npcs) {
      const t = S.getStance ? S.getStance(npc, 'trust') : 0;
      if (t < lowestTrust && S.hasFlag('met_' + npc)) { lowest = npc; lowestTrust = t; }
    }
    if (lowest) {
      S.modStance(lowest, 'trust', 2);
      S.showToast('Something between you and ' + lowest.charAt(0).toUpperCase() + lowest.slice(1) + ' shifts.', 'note');
    }
  },
});

S.registerSounding('sounding_history', {
  id:   'sounding_history',
  alignmentTags: ['history', 'archive', 'witness', 'memory'],
  name: 'On what a ship carries',
  text: 'The wood remembers the trees. The brass remembers the ore. What does water remember? Everything that has passed through it. Which means you too are being remembered, right now, by something that does not keep records in any language you speak.',
  theosis: 7,
  stat: 'composure', statDelta: 1,
  settleText: [
    "A ship is a record of everyone who has sailed on her.",
    "Not in the sense of a list — the list is in the archive. In the sense that the wood is worn where hands have steadied themselves. The brass is polished thin in certain places and untouched in others. The galley stove has a technique, a particular way of drawing that Lena learned from Volkov who learned it from someone whose name is no longer in any document. That knowledge is in the stove. That knowledge is in her hands.",
    "The archive is trying to do the same thing — keep what the ship knows. Not the data. The knowing. The data can be reconstructed from sufficient instruments. The knowing cannot be reconstructed once it is lost.",
    "What do you know that is not in any record? What do you carry that would vanish when you do?",
    "The ship has been asking this question for thirty years. The anomaly is what you get when something has been sincerely asking the same question for thirty years and something else begins to answer.",
  ],
  settleDesc: '+1 Composure · +7 Theosis · Unlocks belief: archive matters.',
  onSettle: () => {
    S.setFlag('sounding_history_settled');
    S.comeToBelieve('archive_matters');
    S.comeToBelieve('ship_remembers');
    // If Lena fragment 3 is seen, trigger fragment 4 now
    if (S.hasFlag('lena_fragment_3_seen') && !S.hasFlag('lena_fragment_4_seen')) {
      S.setFlag('lena_arc_4_unlocked_by_sounding');
    }
  },
});

// ─────────────────────────────────────────────────────────────────
// ITEMS — registered with names, descriptions, held effects
// ─────────────────────────────────────────────────────────────────

S.registerItem('zarya_photograph', {
  name: 'Photograph — Zarya at the anomaly, 1972',
  desc: 'A photograph taken at the anomaly position. Someone in the background — at the stove, at the line, at the stern — looks directly at the camera. The pencilled initial on the back is В.',
  effectWhileHeld: { communion: 1 },
});

S.registerItem('volkov_photograph', {
  name: 'Photograph — Volkov, undated',
  desc: 'A portrait. He has the expression of someone who has decided the record should include him. Lena found him once looking through the archive boxes. He put one photograph in his pocket. She never asked which one.',
  effectWhileHeld: { composure: 1 },
});

S.registerItem('both_photographs', {
  name: 'Photographs — Zarya 1972 and Volkov, together',
  desc: 'The same man. The cook who sailed in 1972 and the cook Lena knew. The ship remembers everyone who sailed on her, even the ones whose names were not kept. They belong together.',
  effectWhileHeld: { communion: 2, composure: 1 },
});

S.registerItem('stink_patrol_paper', {
  name: 'A position — in 1952 measurements',
  desc: 'A piece of paper with a location described in the original construction measurements of the ship. A space that exists below the level of any manifest Othis knows about. Warm hands delivered it.',
  effectWhileHeld: { vigilance: 1 },
});


// ─────────────────────────────────────────────────────────────────
// QUEST STATES — named multi-step progressions
// ─────────────────────────────────────────────────────────────────

// Pavel riddle chain — 3 scenes across foredeck/hold/mess
S.on('flagSet', (flag) => {
  if (flag === 'pavel_riddle_one_complete')     S.setQuestState('quest_pavel_riddle', 'started');
  if (flag === 'pavel_riddle_two_complete')     S.setQuestState('quest_pavel_riddle', 'midway');
  if (flag === 'pavel_revelation_seen') S.setQuestState('quest_pavel_riddle', 'completed');
  if (flag === 'radio_found')           S.setQuestState('quest_radio_assembly', 'found');
  if (flag === 'radio_team_assembled')  S.setQuestState('quest_radio_assembly', 'assembled');
  if (flag === 'archive_transmitted')   S.setQuestState('quest_radio_assembly', 'completed');
  if (flag === 'solidarity_signal_seen') { S.setQuestState('quest_solidarity', 'signal_received'); }
  if (flag === 'solidarity_ending_achieved') S.setQuestState('quest_solidarity', 'completed');
  // Solidarity approach hints via the trust system
  if (flag === 'met_lena' || flag === 'met_miguel' || flag === 'met_alexei' || flag === 'met_nadia') {
    const crewMet = ['met_lena','met_miguel','met_alexei','met_nadia','met_kylie'].filter(f => S.hasFlag(f)).length;
    if (crewMet >= 3 && !S.hasFlag('crew_trust_hint_shown')) {
      S.setFlag('crew_trust_hint_shown');
      S.showToast('The crew is beginning to know you.', 'note');
    }
  }
});

// Use isQuestCompleted in conditions throughout game

// ─────────────────────────────────────────────────────────────────
// NOTES — player-collected observations (shown in notes panel)
// ─────────────────────────────────────────────────────────────────

S.registerNote('zarya_name',      'The ship has an older name. Заря. It means dawn. The current documentation uses a different name.');
S.registerNote('volkov_photo',    'A photograph from 1972: a young man at the anomaly position. Initial on the back: В. The same man who was the cook before Lena.');
S.registerNote('nadia_1978',      'A 1978 measurement binder — position four nautical miles from current location, significant readings, no catalogue entry. The gap is evidence.');
S.registerNote('stink_patrol',    'Below the forward hold: a level of the ship not on the schematic. Warm hands through a hatch. They have been aboard as long as Lena. Possibly longer.');
S.registerNote('anomaly_note',    'The anomaly is responding to something we are doing. Specific types of attention. Sustained, non-instrumental attention. The instruments show this.');
S.registerNote('archive_note',    'Thirty years of geomagnetic measurement. Five countries. Every scientist who sailed on this ship. Decisions were made about what not to catalogue.');
S.registerNote('oblong_note',     'A passenger named Oblong Vassilithune. He knew the crossing had a specific purpose. He is no longer at the corner table. Lena has no memory of him.');
S.registerNote('anomaly_return',  'After the transmission: the field returned the signal. The anomaly answered. It responded specifically to the names, the photographs, this position.');

// Wire notes to be added when relevant flags set
S.on('flagSet', (flag) => {
  const noteMap = {
    'zarya_log_read':          'zarya_name',
    'volkov_photo_found':      'volkov_photo',
    'nadia_1978_found':        'nadia_1978',
    'stink_patrol_hands_known':'stink_patrol',
    'anomaly_responds_seen':   'anomaly_note',
    'archive_discovered':      'archive_note',
    'oblong_departed':         'oblong_note',
    'anomaly_signal_returned': 'anomaly_return',
  };
  if (noteMap[flag]) S.addNote(noteMap[flag]);
});

// ─────────────────────────────────────────────────────────────────
// ATMOS MODIFIERS — settled soundings change the porthole visuals
// ─────────────────────────────────────────────────────────────────

// sounding_crossing settled: fog thins, lamp warms slightly
S.registerAtmosModifier('sounding_crossing', (mods) => {
  mods.fogMult   = Math.max(0.4, mods.fogMult - 0.3);
  mods.lampWarm  = Math.max(mods.lampWarm, 1);
  mods.lampFlicker = false;
});

// sounding_solidarity settled: sobornost warm glow activates on ring
S.registerAtmosModifier('sounding_solidarity', (mods) => {
  mods.soboWarm  = true;
  mods.fogMult   = Math.max(0.5, mods.fogMult - 0.2);
  mods.lampWarm  = Math.max(mods.lampWarm, 2);
});

// sounding_history settled: lamp steadies, fog clears more
S.registerAtmosModifier('sounding_history', (mods) => {
  mods.fogMult   = Math.max(0.3, mods.fogMult - 0.4);
  mods.lampWarm  = Math.max(mods.lampWarm, 1);
  mods.lampFlicker = false;
});

// sounding_forgiveness settled: lamp stops flickering entirely, warmest light
S.registerAtmosModifier('sounding_forgiveness', (mods) => {
  mods.lampWarm  = Math.max(mods.lampWarm, 3);
  mods.lampFlicker = false;
  mods.fogMult   = Math.max(0.3, mods.fogMult - 0.2);
});

// sounding_sobornost settled: full gold ring, fog nearly gone, deep lamp warmth
S.registerAtmosModifier('sounding_sobornost', (mods) => {
  mods.soboWarm  = true;
  mods.fogMult   = Math.max(0.2, mods.fogMult - 0.5);
  mods.lampWarm  = Math.max(mods.lampWarm, 3);
  mods.lampFlicker = false;
  mods.goldIntensity = Math.max(mods.goldIntensity || 0, 0.7);
});

S.registerSounding('sounding_sobornost', {
  id:   'sounding_sobornost',
  alignmentTags: ['solidarity', 'sobornost', 'crossing', 'memory', 'witness'],
  name: 'On conciliarity',
  text: 'The ship was built to measure without interfering. Many instruments, many hands across thirty years, many countries. One field. The old word is sobornost — conciliarity, the unity of a council, many voices in which no voice is erased. Not consensus. Something more demanding than consensus: full presence of all, without any being dissolved into the whole.',
  theosis: 8,
  stat: 'communion', statDelta: 2,
  settleText: [
    "Conciliarity. The word does not translate cleanly.",
    "It means the unity of a gathering in which every voice is fully present — not voting, not averaged, not represented by a delegate. Present. Each one. The gathering has a position not because the majority agreed but because everyone arrived somewhere together.",
    "This is not how decisions are usually made. This is not how the mission was assigned to you. It is not how Landstorm operates, and it is not how most organisations in either country work. It is how this ship works, if you let it. Lena knows what she knows. Alexei knows what he knows. Even Othis — even Othis, with his clipboard and his threshold — knows something real about what this ship is for.",
    "The archive contains thirty years of sobornost. Thirty years of many voices, many countries, one field, none erased. That is why what is in those boxes is not merely data. That is why it cannot simply be destroyed without something real being lost. The loss would not be informational. It would be ontological.",
    "You are part of this council now. Whether you intended to be or not.",
  ],
  settleDesc: '+2 Communion · +8 Theosis · All crew stances improved.',
  onSettle: () => {
    S.setFlag('sounding_sobornost_settled');
    S.comeToBelieve('sobornost_real');
    // Improve all crew stances — the ship feels it
    for (const npc of ['miguel', 'kylie', 'othis', 'lena', 'alexei', 'nadia', 'pavel']) {
      if (S.hasFlag('met_' + npc)) S.modStance(npc, 'trust', 1);
    }
    // Pavel notices if companion
    if (S.hasFlag('pavel_is_companion')) {
      S.setFlag('sobornost_sounding_pavel_notices');
    }
    S.showToast('The ship recognises something.', 'theosis');
  },
});


// ─────────────────────────────────────────────────────────────────
// POST-EVENT TEXT SHIFTS
// These alter recurring scene text after specific flags fire.
// Registered here; applied automatically by processText().
// ─────────────────────────────────────────────────────────────────

// After Sunday service: mess hall feels different
S.registerPostEventShift('sunday_service_led', [
  { pattern: 'The mess hall. The social centre of the ship. The coffee urn is warm. Someone is usually here.',
    replacement: 'The mess hall. It is different since Sunday. The coffee urn is warm. The room holds something.' },
]);

// After archive transmitted: hold text shifts
S.registerPostEventShift('archive_transmitted', [
  { pattern: 'thirty years of geomagnetic measurement',
    replacement: 'thirty years of geomagnetic measurement — now in the world' },
  { pattern: 'The archive is in its boxes.',
    replacement: 'The archive was in its boxes. What it found is no longer only here.' },
]);

// After mission refused: bridge hub text shifts
S.registerPostEventShift('mission_refused', [
  { pattern: 'Miguel is at the wheel, or near it.',
    replacement: 'Miguel is at the wheel. He has been here since the decision.' },
]);

// After hold blessed: hold entrance text shifts
S.registerPostEventShift('archive_blessed', [
  { pattern: 'Freezer Beef is on her box.',
    replacement: 'Freezer Beef is on the box you blessed. She has not moved from it.' },
]);

// After Lena's direct scene: galley shifts
S.registerPostEventShift('lena_direct_asked', [
  { pattern: 'She hands you something without being asked.',
    replacement: 'She hands you something without being asked. She has asked her question and you have answered it. The galley is the same galley.' },
]);

// After cover crisis resolved: cabin text shifts
S.registerPostEventShift('cover_crisis_resolved', [
  { pattern: 'The letter is on the desk.',
    replacement: 'The letter is on the desk. It seems less urgent than before.' },
]);

// After Compline confession with Connie: corridor text shifts
S.registerPostEventShift('compline_connie_seen', [
  { pattern: 'The corridor is quiet.',
    replacement: "The corridor is quiet. Connie's door is closed now." },
]);

// After Pavel past story: foredeck hub text shifts
S.registerPostEventShift('pavel_past_told', [
  { pattern: 'He knew you were there.',
    replacement: 'He knew you were there. He has told you about the paper.' },
]);


S.registerSounding('sounding_solidarity', {
  id:   'sounding_solidarity',
  alignmentTags: ['solidarity', 'presence', 'pastoral', 'witness', 'suffering'],
  name: 'On the body of suffering',
  text: 'You did not invent this hunger. You did not invent this cold. Neither did the person next to you. Suffering isolates. But there is another kind — the kind that, when you stop pretending it is only yours, makes you suddenly aware of how many are in the water with you.',
  theosis: 10,
  stat: 'communion', statDelta: 2,
  settleText: [
    "There are two kinds of suffering.",
    "The first kind convinces you that your pain is special — larger or smaller than others but uniquely yours, requiring a unique response, issuing from a unique wound. This kind of suffering is very loud. It insists. It is also, in a specific way, lonely, because it requires you to stay separate in order to maintain its uniqueness.",
    "The second kind is rarer and quieter. It is the recognition that your pain is not uniquely yours — that what hurts you is the kind of thing that hurts people. That the cold you are cold with is the same cold everyone is cold with. That the particular shape of your difficulty is a shape suffering takes, not the shape it takes for you specifically.",
    "The second kind is not resignation. It is not making light of anything. It is more like — you have been holding something at arm's length, and you set it down, and it turns out that what you were holding was the same thing the person next to you was holding, and for a moment you both look at it together, and it is the same thing.",
    "The ship knows about this. Thirty years of cold. Thirty years of instruments working in difficult conditions. The archive is a form of the second kind of suffering — collected, shared, given over to the world rather than kept.",
    "What would it mean for you to offer something rather than hold it?",
  ],
  settleDesc: '+2 Communion · +10 Theosis · Solidarity ending gate unlocked.',
  onSettle: () => {
    S.setFlag('sounding_solidarity_settled');
    S.comeToBelieve('archive_matters');
    // THIS is the gate for the Solidarity ending — not communion >=8
    S.setFlag('solidarity_sounding_settled');
    S.modShipState('morale', 2);
    S.showToast('Something opens.', 'theosis');
    S.incrementTheosis(3); // extra for the recognition
  },
});

// ─────────────────────────────────────────────────────────────────
// AMBIENT EVENTS
// ─────────────────────────────────────────────────────────────────

S.registerAmbientEvent({
  id: 'quiet_noon',
  weight: 0.08,
  oncePerCrossing: true,
  text: 'The compasses agree. All of them. For a moment the needle points exactly where it should. Alexei, up on the bridge, stands very still.',
});

S.registerAmbientEvent({
  id: 'bronze_hum',
  weight: 0.06,
  oncePerCrossing: true,
  text: 'The bronze fittings hum. Not loudly. More like a frequency the inner ear catches before the outer one does. Haircut watches the bowsprit. Unblinking.',
});

S.registerAmbientEvent({
  id: 'freezer_beef_tests',
  weight: 0.07,
  oncePerCrossing: true,
  condition: { type: 'flag', id: 'hold_visited' },
  text: 'Freezer Beef has relocated to your cabin. She is on your bunk. She is in the exact centre. She looks at you when you come in with the expression of someone who has made a logistical assessment and reached a conclusion.',
});

S.registerAmbientEvent({
  id: 'freezer_beef_mission',
  weight: 0.09,
  condition: { type: 'and', conditions: [{ type: 'flag', id: 'hold_sat' }, { type: 'flag', id: 'hold_witnessed' }] },
  text: 'Freezer Beef is on your lap. She arrived while you were sitting still and made the decision without consultation. She has arranged herself with maximum surface area contact and is emitting a low vibration. She is asleep. This is apparently her mission now.',
});

S.registerAmbientEvent({
  id: 'cats_conference',
  weight: 0.05,
  text: 'Haircut is on the bridge again. No one has explained why the captain allows this. Freezer Beef is presumably below, in the hold. Nadia reports both facts without comment, as though they are meaningful and she is not the right person to say how.',
});

S.registerAmbientEvent({
  id: 'stink_patrol_rumour',
  weight: 0.04,
  oncePerCrossing: true,
  text: 'Lena mentions the Stink Patrol. She doesn\'t say what they do. She says it without discomfort. There is a warmth in her voice that makes you decide not to ask.',
});

// ─────────────────────────────────────────────────────────────────
// CODEX
// ─────────────────────────────────────────────────────────────────

// ── Codex entries — unlocked progressively through play ─────────
// Low-theosis entries: the ship in its neutral, scientific framing
// Mid-theosis entries: begin to hint at what the ship carried
// High-theosis entries: the true history, heavily guarded

S.registerCodexEntry('codex_non_magnetic', {
  title:    'Non-Magnetic Vessel',
  category: 'The Ship',
  content:  "A ship built without ferrous metal — brass, bronze, oak — so that its own composition does not distort the magnetic field readings its instruments take. The ship does not interfere with what it measures. This is rarer than it sounds.",
});

S.registerCodexEntry('codex_magnetic_anomaly', {
  title:    'Magnetic Anomaly',
  category: 'The Ship',
  content:  "A deviation of the Earth's magnetic field from the expected norm. Columbus found the first one in the middle of the Atlantic. He threatened to hang anyone who mentioned it, then found it again on the way home. The Mid-Atlantic Ridge is magnetised at its core. The rock distorts the field at the surface for miles around.",
});

S.registerCodexEntry('codex_the_dawn', {
  title:    'The Dawn',
  category: 'The Ship',
  content:  "The ship's name, as it appears in the current documentation. Research schooner. Atlantic crossing. Non-magnetic construction. The logs in the chart room go back further than the current manifest suggests.",
});

S.registerCodexEntry('codex_theosis', {
  title:    'Theosis',
  category: 'Theology',
  unlockCondition: { type: 'theosis', min: 33 },
  content:  "Participation in the divine energies. Not the divine essence — that remains unknowable. Gregory Palamas held this distinction carefully, and it cost him considerable trouble. The energies are not a metaphor. They can be approached. They may already be approaching.",
});

S.registerCodexEntry('codex_pavel', {
  title:    'Pavel',
  category: 'Persons',
  content:  "A passenger. He has a letter of introduction from someone at the Academy. His answers about why he is on this ship change slightly each time, never in ways that matter. He seems to know something about where the crossing is going. He is cheerful about all of this.",
});

// Mid-tier entries — unlocked at higher theosis
S.registerCodexEntry('codex_the_archive', {
  title:    'The Archive',
  unlockCondition: { type: 'flag', id: 'archive_discovered' },
  category: 'The Crossing',
  content:  "The hold contains archival material from the ship's scientific history. Binders. Photographs. Chart copies. Thirty years of geomagnetic measurement across the world's oceans. It is labelled: pending disposal.",
});

S.registerCodexEntry('codex_the_mission', {
  title:    'The Mission',
  unlockCondition: { type: 'flag', id: 'mission_reality_known' },
  category: 'The Crossing',
  content:  "You were sent on this crossing for a purpose. The sealed envelope made it explicit. The archive is to be destroyed. Evidence of something is to be made inconvenient.",
});

// High-tier entries — visible only near the end, heavily guarded
S.registerCodexEntry('codex_zarya_history', {
  title:    'Zarya',
  unlockCondition: { type: 'flag', id: 'zarya_log_read' },
  category: 'The Ship',
  content:  "Built in Finland, 1952. She measured the Earth's magnetic field across all its oceans for thirty years. She was sold after the Union ended. She was burned for scrap. What she found in those thirty years — the anomalies, the unmapped mountains, the corrections to the charts sailors use — is in the boxes in the hold.",
});

S.registerCodexEntry('codex_solidarity', {
  title:    'Solidarity',
  unlockCondition: { type: 'stat', stat: 'communion', min: 5 },
  category: 'Theology',
  content:  "Dorothy Soelle: suffering isolates. But there is another kind — the kind that, when you stop pretending it is only yours, reveals how many are in the water with you. The act of standing with another does not fix what is wrong. It changes what wrong means.",
});

// ─────────────────────────────────────────────────────────────────
// COVER CHALLENGES
// ─────────────────────────────────────────────────────────────────

S.registerCoverChallenge('background', [
  {
    prompt: 'Kylie is asking about your training. The question is specific. Too specific for someone who writes for a magazine.',
    stat: 'vigilance',
  },
  {
    prompt: 'Othis has asked, without preface, where exactly you studied. He is holding a clipboard and he looks like someone who checks things against lists.',
    stat: 'vigilance',
  },
]);

S.registerCoverChallenge('posting', [
  {
    prompt: 'Connie is asking about your clinical experience — the specifics, the protocols. She has an MD and she is listening carefully.',
    stat: 'composure',
  },
]);

S.registerCoverChallenge('left', [
  {
    prompt: 'Connie asks, not unkindly: "What did you leave behind? Not the thing. The cost of leaving it."',
    stat: 'composure',
  },
  {
    prompt: 'Kylie, notebook open: "Everyone on this ship is running from something. What are you running from?"',
    stat: 'vigilance',
  },
]);

// ─────────────────────────────────────────────────────────────────
// SUNDAY SERVICE RITUAL
// ─────────────────────────────────────────────────────────────────

S.registerRitual({
  id: 'sunday_service',
  name: 'Sunday Service',
  phases: [
    {
      id:    'gathering',
      title: 'Gathering',
      text:  'The mess hall has been rearranged. Seven people in folding chairs. Haircut somewhere near the back. You stand at the end that is now the front. The ship moves under you.',
      choices: [
        { text: 'Open with silence. Let the ship speak first.',       effect: { composure: 1 }, set_flag: 'service_opened_silence' },
        { text: 'Open with a standard greeting. Stay professional.',  effect: { vigilance: 1 } },
        { text: 'Open with something you actually believe.',          effect: { composure: 1 }, set_flag: 'service_opened_true' },
      ],
    },
    {
      id:    'word',
      title: 'The Word',
      text:  'You have the text. You have something prepared. Standing here, with the North Atlantic doing what it does, the prepared words feel like an ill-fitting coat. Something else is trying to get through.',
      choices: [
        { text: 'Stay with the prepared text.' },
        { text: 'Set it aside. Say what the crossing has taught you so far.',  effect: { communion: 1 }, set_flag: 'service_word_true' },
        { text: 'Read the text. Then add one true sentence at the end.',       effect: { composure: 1 } },
      ],
    },
    {
      id:    'response',
      title: 'Response',
      text:  'People stay after. Lena refills someone\'s tea. Alexei asks a question that begins as theological and ends as meteorological. Nadia is crying in the good way. You did something real here.',
      choices: [
        { text: 'Stay. Be present for as long as they need.',          effect: { communion: 2 }, set_flag: 'service_stayed' },
        { text: 'Offer a brief blessing and withdraw. Hold the space.', effect: { composure: 1 } },
      ],
    },
  ],
});

S.on('ritualCompleted', (ritualId) => {
  if (ritualId !== 'sunday_service') return;
  S.setFlag('sunday_service_led');
  let bonus = 8;
  // Gathering choices
  if (S.hasFlag('service_opened_silence'))    { bonus += 3; }
  if (S.hasFlag('service_opened_apophatic'))  { bonus += 3; }
  if (S.hasFlag('service_opened_material'))   { bonus += 2; }
  // Word choices
  if (S.hasFlag('service_word_ship'))         { bonus += 4; }
  if (S.hasFlag('service_word_witness'))      { bonus += 4; }
  if (S.hasFlag('service_word_direct'))       { bonus += 5; if (S.G.worldState) S.G.worldState.socialTrust = Math.min(10, (S.G.worldState.socialTrust||5) + 2); S.degradeCover(1); }
  // Response choices
  if (S.hasFlag('service_stayed'))            { bonus += 3; if (S.G.worldState) S.G.worldState.socialTrust = Math.min(10, (S.G.worldState.socialTrust||5) + 1); }
  if (S.hasFlag('service_dialogue'))          { bonus += 2; }
  // Sanctity from service
  if (S.G.worldState) S.G.worldState.sanctity = Math.min(10, (S.G.worldState.sanctity||0) + 2);
  S.modShipState('saturation', 2);
  S.modShipState('morale', 2);
  S.incrementTheosis(bonus);
  S.unlockCodexEntry('codex_theosis');
  S.showToast('Something real happened here.', 'theosis');
});

// ─────────────────────────────────────────────────────────────────
// ENDINGS
// ─────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────
// ENDINGS — condition-driven, not player-selected.
//
// The ending you reach is determined by what you did and who you
// became during the crossing. Theosis gates access; flags record
// what happened. No ending is chosen. They are arrived at.
//
// Priority order (highest wins when multiple conditions met):
//   20 The Knowing   — rememberer charism + theosis 85 + transmitted
//   10 Restoration   — theosis 66+ + transmitted + radio team
//    5 Witness       — theosis 33+ + refused mission
//    0 Erasure       — default (accepted mission OR theosis < 33 with no refusal)
// ─────────────────────────────────────────────────────────────────

// Solidarity: the crew acts collectively. 
// Not individual theosis but communal trust.
// Requires high communion + socialTrust + crew flags + mission refused.
// Cannot be reached on first crossing — needs established relationships.
S.registerEnding({
  id: 'solidarity', priority: 15,
  condition: { type: 'and', conditions: [
    { type: 'flag',   id: 'solidarity_sounding_settled' },
    { type: 'flag',   id: 'mission_refused' },
    { type: 'flag',   id: 'met_miguel' },
    { type: 'flag',   id: 'met_lena' },
    { type: 'theosis', min: 45 },
  ]},
  scene: 'ending_solidarity',
});

// Erasure: mission accepted, OR theosis too low to have acted otherwise.
// This is the default ending for players who completed the mission
// or who never built enough theosis to perceive what the ship carried.
S.registerEnding({
  id: 'erasure', priority: 0,
  condition: { type: 'or', conditions: [
    { type: 'flag', id: 'mission_accepted' },
    // Reached Day Three without having refused — and without the
    // theosis required to reach a higher ending
    { type: 'and', conditions: [
      { type: 'flag', id: 'act_three_begun' },
      { type: 'not', condition: { type: 'flag', id: 'mission_refused' } },
    ]},
  ]},
  scene: 'ending_erasure',
});

// Witness: refused the mission AND had enough theosis to know why.
// The archive is hidden, not transmitted. A wounded hope.
// Requires: mission_refused + theosis >= 33.
// Blocked by: archive_transmitted (which upgrades to Restoration).
S.registerEnding({
  id: 'witness', priority: 5,
  condition: { type: 'and', conditions: [
    { type: 'flag',    id: 'mission_refused' },
    { type: 'theosis', min: 33 },
    { type: 'not', condition: { type: 'flag', id: 'archive_transmitted' } },
  ]},
  scene: 'ending_witness',
});

// Restoration: transmitted the archive into the world.
// Requires: archive_transmitted + theosis >= 66.
// radio_team_assembled adds to ending text but is not required.
S.registerEnding({
  id: 'restoration', priority: 10,
  condition: { type: 'and', conditions: [
    { type: 'flag',    id: 'archive_transmitted' },
    { type: 'theosis', min: 66 },
  ]},
  scene: 'ending_restoration',
});

// The Knowing: second crossing or later, rememberer charism,
// theosis 85+, transmitted. You have been here before.
// This ending cannot be reached on a first crossing.
S.registerEnding({
  id: 'the_knowing', priority: 20,
  condition: { type: 'and', conditions: [
    { type: 'charism', id: 'rememberer' },
    { type: 'theosis', min: 85 },
    { type: 'flag',    id: 'archive_transmitted' },
    { type: 'flag',    id: 'radio_team_assembled' },
  ]},
  scene: 'ending_the_knowing',
});

// ─────────────────────────────────────────────────────────────────
// SCENES
// ─────────────────────────────────────────────────────────────────



// ─────────────────────────────────────────────────────────────────
// ROLL MODIFIERS — charism bonuses on specific roll types
// ─────────────────────────────────────────────────────────────────

// The Fool: on failure, 30% chance the result upgrades to partial
S.registerRollModifier('composure',
  (statKey, options, G) => G.charisms && G.charisms.includes('fool') && options.isCoverChallenge,
  (statKey, options, G) => 1  // +1 to roll effectively
);

// The Confessor: social rolls get advantage (already handled in UI, but add stat bonus)
S.registerRollModifier('composure',
  (statKey, options, G) => G.charisms && G.charisms.includes('confessor') && options.isSocialRoll,
  (statKey, options, G) => 2  // +2 to composure-based social rolls
);

// The Healer: medical/pastoral rolls get bonus
S.registerRollModifier('composure',
  (statKey, options, G) => G.charisms && G.charisms.includes('healer') && options.isPastoralRoll,
  (statKey, options, G) => 2
);

// High theosis: all rolls get small bonus
S.registerRollModifier('composure',
  (statKey, options, G) => (G.theosis || 0) >= 66,
  (statKey, options, G) => 1
);

// Pavel companion roll modifiers — tiered by trust
// Trust >= 2: +1 on all rolls when doubt is high (he steadies you)
S.registerRollModifier('composure',
  (statKey, options, G) => {
    if (!G.companions) return false;
    const p = G.companions.find(c => c.id === 'pavel');
    const trust = (p && p.stats && p.stats.trust) || (G.npcStance && G.npcStance.pavel && G.npcStance.pavel.trust) || 0;
    return !!(p && trust >= 2 && (G.stats.doubt || 0) >= 5);
  },
  () => 1  // +1 composure when doubt is high and Pavel is with you
);

// Trust >= 3: +1 on social rolls
S.registerRollModifier('composure',
  (statKey, options, G) => {
    if (!G.companions) return false;
    const p = G.companions.find(c => c.id === 'pavel');
    const trust = (p && p.stats && p.stats.trust) || (G.npcStance && G.npcStance.pavel && G.npcStance.pavel.trust) || 0;
    return !!(p && trust >= 3 && options.isSocialRoll);
  },
  () => 1  // +1 on social rolls
);

// Trust >= 4: cover challenge difficulty reduced by 1
S.registerRollModifier('composure',
  (statKey, options, G) => {
    if (!G.companions) return false;
    const p = G.companions.find(c => c.id === 'pavel');
    const trust = (p && p.stats && p.stats.trust) || (G.npcStance && G.npcStance.pavel && G.npcStance.pavel.trust) || 0;
    return !!(p && trust >= 4 && options.isCoverChallenge);
  },
  () => 1  // +1 on cover challenges (his presence legitimises the chaplain)
);



// ─────────────────────────────────────────────────────────────────
// PAVEL COMPANION LINES
// Location-specific ambient observations. Appear in hub get text().
// trust 0-1: impersonal, philosophical. 2-3: personal. 4-5: intimate.
// ─────────────────────────────────────────────────────────────────

// FOREDECK — his home base
S.registerCompanionLine('pavel', { id: 'fo_1', location: 'Foredeck', trustMin: 0, trustMax: 1,
  text: 'Pavel is at the bow. He is talking to the water, or to whatever the water is a surface for.' });
S.registerCompanionLine('pavel', { id: 'fo_2', location: 'Foredeck', trustMin: 0, trustMax: 1,
  text: 'Pavel is at the bow. He looks up when you approach with the expression of someone whose thought was reaching a conclusion.' });
S.registerCompanionLine('pavel', { id: 'fo_3', location: 'Foredeck', trustMin: 2, trustMax: 3,
  text: 'Pavel is at the bow. He turns when he hears you. — I was thinking about what you said earlier. He does not specify what. There is only one thing worth thinking about on a crossing.' });
S.registerCompanionLine('pavel', { id: 'fo_4', location: 'Foredeck', trustMin: 2, trustMax: 3,
  condition: { type: 'flag', id: 'anomaly_first_noticed' },
  text: 'Pavel is facing the bow. — The deviation is stronger today, he says without looking at you. — I can feel it in the compass in my jacket pocket. He does not usually carry a compass.' });
S.registerCompanionLine('pavel', { id: 'fo_5', location: 'Foredeck', trustMin: 4,
  text: 'Pavel is at the bow. He hears you coming and moves slightly to one side, making room. He does not say anything. He does not need to.' });
S.registerCompanionLine('pavel', { id: 'fo_6', location: 'Foredeck', trustMin: 4,
  once: true, condition: { type: 'flag', id: 'anomaly_peak_occurred' },
  text: 'Pavel is at the bow and he is praying. Not performing it. Doing it. He is facing the water and his lips are moving slightly and his hands are loose at his sides. He looks up when you arrive and nods once, as if you are both expected.' });
S.registerCompanionLine('pavel', { id: 'fo_rope', location: 'Foredeck', trustMin: 3,
  condition: { type: 'flag', id: 'pavel_past_told' },
  text: 'Pavel has the rope again. But this time when you look at him he sees you looking and says: — Old habit. From before. He sets it down.' });

// MAIN DECK — occasional presence
S.registerCompanionLine('pavel', { id: 'md_1', location: 'Main Deck', trustMin: 1,
  text: 'Pavel passes through. He gives you the nod of someone who has seen you somewhere important and is acknowledging that it happened.' });
S.registerCompanionLine('pavel', { id: 'md_2', location: 'Main Deck', trustMin: 2,
  condition: { type: 'flag', id: 'sunday_service_led' },
  text: 'Pavel is on the main deck. He is watching the other crew members with the expression of someone taking attendance at something they are very glad is happening.' });
S.registerCompanionLine('pavel', { id: 'md_3', location: 'Main Deck', trustMin: 3,
  condition: { type: 'flag', id: 'act_three_begun' },
  text: 'Pavel appears at your shoulder. He says, very quietly: — Whatever happens today. He leaves the sentence unfinished. He puts his hand on your shoulder once, briefly, and goes back to the foredeck.' });

// HOLD — shows up for the archive
S.registerCompanionLine('pavel', { id: 'hold_1', location: 'Hold', trustMin: 2,
  condition: { type: 'flag', id: 'archive_discovered' },
  text: 'Pavel is sitting on a box near the aft wall. He has been reading something from the archive. He looks up when you come in and closes it carefully. — The 1978 position, he says. — Nadia found it too. He has been here a while.' });
S.registerCompanionLine('pavel', { id: 'hold_2', location: 'Hold', trustMin: 3,
  condition: { type: 'flag', id: 'archive_blessed' },
  text: 'Pavel is in the hold. He is not reading. He is just sitting with the blessed boxes with the demeanour of someone comfortable in a chapel.' });
S.registerCompanionLine('pavel', { id: 'hold_3', location: 'Hold', trustMin: 4,
  once: true, condition: { type: 'flag', id: 'archive_transmitted' },
  text: 'Pavel is in the hold. He looks at the boxes and then at you. — Still here, he says of the boxes. — But not only here now. He nods once, the nod of someone whose long argument has been proven correct by events.' });

// GALLEY — he has history with Lena
S.registerCompanionLine('pavel', { id: 'gal_1', location: 'Galley', trustMin: 2,
  text: 'Pavel is at the counter talking to Lena. She is not responding but she is listening in the way she listens — with her full back, which is how you know she is attending.' });
S.registerCompanionLine('pavel', { id: 'gal_2', location: 'Galley', trustMin: 3,
  condition: { type: 'flag', id: 'lena_direct_asked' },
  text: 'Pavel and Lena are both in the galley, not talking, in the particular silence of two people who have known each other for years and have reached the comfortable part.' });
S.registerCompanionLine('pavel', { id: 'gal_3', location: 'Galley', trustMin: 1, trustMax: 2,
  text: 'Pavel is attempting to make tea. Lena has not offered to help and he has not asked. They are managing.' });

// Theosis/Cover tension: high theosis makes cover harder (becoming real)
S.registerRollModifier('composure',
  (statKey, options, G) => options.isCoverChallenge && (G.theosis || 0) >= 70,
  (statKey, options, G) => -2  // harder to maintain fiction at high theosis
);
S.registerRollModifier('composure',
  (statKey, options, G) => options.isCoverChallenge && (G.theosis || 0) >= 50 && (G.theosis || 0) < 70,
  (statKey, options, G) => -1
);

// ─────────────────────────────────────────────────────────────────
// SCENE POOLS — ambient variety for recurring hubs
// navigateToPool() picks by weight, respecting conditions
// ─────────────────────────────────────────────────────────────────

S.registerScenePool('pool_main_deck_ambient', [
  { sceneId: 'main_deck_haircut',  weight: 2,
    condition: { type: 'not', condition: { type: 'flag', id: 'main_deck_haircut_seen' } } },
  { sceneId: 'main_deck_nadia_clouds', weight: 2,
    condition: { type: 'flag', id: 'met_nadia' } },
  { sceneId: 'main_deck_miguel_adjusts', weight: 2,
    condition: { type: 'flag', id: 'met_miguel' } },
  { sceneId: 'main_deck_anomaly_sky', weight: 3,
    condition: { type: 'flag', id: 'anomaly_first_noticed' } },
]);

S.registerScenePool('pool_foredeck_ambient', [
  { sceneId: 'foredeck_compass_reading', weight: 2,
    condition: { type: 'flag', id: 'anomaly_first_noticed' } },
  { sceneId: 'foredeck_cats_together', weight: 3,
    condition: { type: 'flag', id: 'met_haircut' } },
  { sceneId: 'foredeck_pavel_rope', weight: 2,
    condition: { type: 'flag', id: 'met_pavel' } },
]);

S.registerScenePool('pool_hold_ambient', [
  { sceneId: 'hold_freezer_beef_survey', weight: 3 },
  { sceneId: 'hold_sounds_below',       weight: 2,
    condition: { type: 'flag', id: 'stink_patrol_encountered' } },
]);


// ─────────────────────────────────────────────────────────────────
// PROGRESS TRACKERS
// ─────────────────────────────────────────────────────────────────

// Pavel riddle chain: 3 steps
S.registerProgressTracker('tracker_pavel_riddle', "Pavel's question", 3, (n) => {
  if (n >= 3) S.showToast('Pavel is waiting in the mess hall.', 'note');
});

// Solidarity prerequisites: 5 conditions (communion, socialTrust, all crew met, refused)
S.registerProgressTracker('tracker_solidarity', 'Solidarity', 5, (n) => {
  if (n >= 5) S.showToast('Something is cohering.', 'theosis');
});

// Radio assembly: 3 steps (found, team assembled, transmission ready)
S.registerProgressTracker('tracker_radio', 'The radio', 3, (n) => {
  if (n >= 3) S.showToast('The radio is ready.', 'note');
});


// ─────────────────────────────────────────────────────────────────
// PAST LIFE LINES
// Applied on second+ crossings to alter specific scene text.
// Pattern → replacement, silently, in specific scenes.
// ─────────────────────────────────────────────────────────────────

// foredeck_first: Pavel was already turned when you arrived
S.registerPastLifeLine('foredeck_first',
  'He knew you were there.',
  'He was already turned toward you when you came up the steps.');

// galley_first: Lena pours before you ask — she's done this before
S.registerPastLifeLine('galley_first',
  'She hands you something without being asked.',
  'She pours the coffee before you reach the counter. She has done this before.');

// cabin_wake → replaced by crossing_tax_lived in newPlay, but cabin_porthole_stay varies
S.registerPastLifeLine('cabin_porthole_stay',
  'The porthole. The sea.',
  'The porthole. The sea. Both familiar now in a way that has no origin you can locate.');

// hold_first: the boxes feel known
S.registerPastLifeLine('hold_first',
  'The hold smells of salt and old paper.',
  'The hold smells of salt and old paper. The same as before. The same exactly.');

// instrument_room_first: the shimmer was there last time too
S.registerPastLifeLine('instrument_shimmer',
  'The light coming through the porthole',
  'The light coming through the porthole — you have seen this before, this exact quality');

// bridge_hub: Miguel's posture is already known to you
S.registerPastLifeLine('bridge_hub',
  'Miguel is at the wheel, or near it.',
  'Miguel is at the wheel. You know this is where he is. You knew before you came up.');


S.registerScenes({

  // ── OPENING ──────────────────────────────────────────────────


  pool_main_deck_ambient: {
    id: 'pool_main_deck_ambient', location: 'Main Deck', mood: 'neutral',
    text: '', // navigates immediately via onEnter
    onEnter: () => { S.navigateToPool('pool_main_deck_ambient'); },
    choices: [],
  },
  pool_foredeck_ambient: {
    id: 'pool_foredeck_ambient', location: 'Foredeck', mood: 'neutral',
    text: '',
    onEnter: () => { S.navigateToPool('pool_foredeck_ambient'); },
    choices: [],
  },
  pool_hold_ambient: {
    id: 'pool_hold_ambient', location: 'Hold', mood: 'neutral',
    text: '',
    onEnter: () => { S.navigateToPool('pool_hold_ambient'); },
    choices: [],
  },


  // ── WITNESSED MODE INTRO ─────────────────────────────────────────
  // Shown to witnessed-mode players before cabin_wake
  witnessed_orientation: {
    id: 'witnessed_orientation', location: 'Cabin', mood: 'neutral',
    text: `You are aboard the research schooner The Dawn as a witness.

You did not make this crossing to act. You made it to see. What you see will determine which of the five endings this crossing reaches — and what carries forward into the next one.

A few differences from the standard crossing:

— Cover challenges resolve automatically. The social mechanics are still present, but you won't be stopped by a failed roll.

— Your theosis accumulates slightly more slowly. Witnessing is not the same as undergoing.

— The ending you reach will depend on what you've observed and what you've let happen — your choices are still meaningful, they just aren't survival choices.

— If you've crossed before in Attended mode, you may notice things that aren't explained. They aren't errors.

The ship is moving. The anomaly is below.`,
    onEnter: () => { S.setFlag('witnessed_orientation_shown'); },
    condition: { type: 'mode', mode: 'witnessed' },
    choices: [
      { text: 'Board the ship.', next: 'cabin_wake' },
    ],
  },

  cabin_wake: {
    id: 'cabin_wake', location: 'Cabin', mood: 'neutral', art: 'ship_zarya',
    text: `You are awake.

The ceiling is close and moving. Not badly — a long slow roll, the kind the body stops fighting after a while. Light through the porthole says morning, northern, overcast.

You are on a ship. This is not a surprise. What is less certain, in the first few seconds, is how long you have been here. Salt on the back of your wrist. Several days, at least.

There is a letter on the desk bolted to the wall. Your name is on the envelope. You recognise the handwriting as your own.`,
    onEnter: () => { S.setFlag('game_started'); },
    choices: [
      { text: 'Open the letter.',                           next: 'cabin_letter' },
      { text: 'Look through the porthole first.',   tags: ['stillness', 'crossing'], next: 'cabin_porthole' },
      { text: 'Lie still. Try to remember.',                next: 'cabin_remember', theosis: 1 },
    ],
  },

  cabin_porthole: {
    id: 'cabin_porthole', location: 'Cabin — Porthole', mood: 'neutral',
    text: `The sea is grey and enormous. Not dangerous. Not beautiful. Vast in the way that makes land feel like something someone made up.

The bowsprit. The front jib moving in the wind. Beyond it, nothing with a name.

A figure on the foredeck, despite the cold. Small. Gesturing. Apparently talking. There is no one else on the foredeck.`,
    choices: [
      { text: 'Go up to the foredeck.',                                          next: 'foredeck_first' },
      { text: 'Open the letter.',                                                 next: 'cabin_letter'   },
      { text: 'Stay with it a while longer.',                                     next: 'cabin_porthole_stay', theosis: 2, composure: 1 },
    ],
  },

  cabin_porthole_stay: {
    id: 'cabin_porthole_stay', location: 'Cabin — Porthole', mood: 'neutral',
    text: `The figure is still talking. The sea does not answer.

There is something about open water that loosens the categories. Not destroys them. Loosens them. The things you have been told about yourself feel, from here, like clothes you put on in someone else's house.

This will pass once you have coffee. For now: the water. The grey.`,
    onEnter: () => {       S.progressSounding('sounding_crossing', 2);
S.offerSounding('sounding_crossing'); },
    choices: [
      { text: 'Go up to the foredeck.',   next: 'foredeck_first' },
      { text: 'Open the letter.',          next: 'cabin_letter'   },
    ],
  },

  cabin_remember: {
    id: 'cabin_remember', location: 'Cabin', mood: 'neutral',
    text: `You lie still.

A briefing. A photograph of a ship shown to you upside down. A name — Landstorm, Vance Landstorm — saying something about remaining unremarkable. The smell of a room recently cleaned with institutional lemon.

You are supposed to be a chaplain. Somebody's chaplain. The denomination floats at the edge of recall.

There is a letter on the desk.`,
    choices: [
      { text: 'Open the letter.',                          next: 'cabin_letter'   },
      { text: 'Look through the porthole.',   tags: ['stillness', 'crossing'],                next: 'cabin_porthole' },
    ],
  },

  cabin_letter: {
    id: 'cabin_letter', location: 'Cabin — Desk', mood: 'neutral',
    text: `The letter is in your own handwriting.

*You are aboard the research schooner The Dawn, outbound from Reykjavik. You are travelling as the ship's chaplain. This is your cover.*

*Your cover has not been fully established. You will establish it through conversation with the crew. Do not attempt to define it all at once. Let it emerge. This is how cover works — it is confirmed by others believing it, not by you asserting it.*

*Your mission is in the sealed envelope in the case under the bunk. Do not open it until your cover is in place.*

*The First Mate's name is Miguel. He expects you.*

The case is under the bunk. You can feel it with your foot.

There is a second page. The handwriting is slightly different — more deliberate, as if written under different circumstances.`,
    onEnter: () => { S.setFlag('letter_read'); },
    choices: [
      { text: 'Read the second page.',          tags: ['crossing', 'stillness'],            next: 'cabin_letter_p2', condition: { type: 'not', condition: { type: 'flag', id: 'letter_p2_read' } } },
      { text: 'Go find Miguel.',                  next: 'first_mate_first' },
      { text: 'Go up to the foredeck first.',     next: 'foredeck_first'   },
      { text: 'Sit with this for a moment.',      tags: ['stillness', 'silence', 'crossing'], next: 'cabin_sit', theosis: 1 },
    ],
  },

  cabin_letter_p2: {
    id: 'cabin_letter_p2', location: 'Cabin — Desk', mood: 'neutral',
    text: `*A note on what you carry:*

*Four things define what you can do on this crossing. Watch them in STATUS.*

*VIGILANCE — what you notice. High vigilance lets you read situations before they develop.*

*COMPOSURE — what you can hold under pressure. When someone questions your cover, you will roll against Composure. The result — success, partial, or failure — is visible in how you respond.*

*COMMUNION — how much the crew trusts you collectively. It opens paths closed to strangers.*

*DOUBT — what accumulates when the cover strains. Keep it low. At high doubt, things begin to dissolve.*

*There is a fifth thing the instruments cannot measure. The crossing changes people. Yours is called theosis. Watch the porthole.*

*Good luck. Or the appropriate word for this kind of thing.*`,
    onEnter: () => { S.setFlag('letter_p2_read'); },
    choices: [
      { text: 'Go find Miguel.',              next: 'first_mate_first' },
      { text: 'Go up to the foredeck first.', next: 'foredeck_first'   },
    ],
  },

  cabin_sit: {
    id: 'cabin_sit', location: 'Cabin', mood: 'uncanny',
    text: `You put the letter down. You fold your hands. The ship moves.

You are playing a role. What you don't know is whether the role will play you back — whether, by the end of this crossing, chaplain will still be just a word for what you are pretending to be.

This question is not in any briefing document.`,
    onEnter: () => { S.incrementTheosis(2); },
    choices: [
      { text: 'Go find Miguel.',         next: 'first_mate_first' },
      { text: 'Go to the foredeck.',    tags: ['crossing', 'presence'],     next: 'foredeck_first'   },
    ],
  },

  // ── FIRST MATE ───────────────────────────────────────────────

  first_mate_first: {
    id: 'first_mate_first', location: 'Bridge', mood: 'neutral', art: 'portrait_miguel',
    get text() {
      const variant = S.getMetaValue && S.getMetaValue('crewVariant', 0);
      if (variant === 1 && S.G.playCount > 1) {
        return `Miguel is at the wheel. He turns before you come through the door.

— Chaplain. He says. He already knows your name. This was not announced.

He has the manner of someone who has been briefed. Not unfriendly. Something more careful.

— Unusual posting for a crossing like this. He says. Not a question either.`;
      }
      if (variant === 2 && S.G.playCount > 1) {
        return `Miguel is at the wheel. He does not turn immediately.

When he does, something about his face has changed from what you remember — or what you think you remember. He is older by more than a year. Or something has cost him.

— Chaplain. He says. — Good. We usually don't get one.

He says it like he means it for a reason he won't explain yet.`;
      }
      return `Miguel is at the wheel, or near it. One hand resting on it. Looking at the horizon the way someone looks at something they have agreed to trust.

He turns when he hears you.

— So. The chaplain.

Not a question. He is perhaps fifty. He and the ship have arrived at a mutual accommodation that took years.`;
    },
    onEnter: () => {
      S.setFlag('met_miguel');
      // Set variant-specific flags for downstream scenes
      const variant = S.getMetaValue && S.getMetaValue('crewVariant', 0);
      if (variant === 1 && S.G.playCount > 1) S.setFlag('miguel_variant_briefed');
      if (variant === 2 && S.G.playCount > 1) S.setFlag('miguel_variant_grieving');
    },
    choices: [
      { text: '"That\'s right. I\'m sorry I haven\'t come up sooner."',  next: 'miguel_q_posting', composure: 1 },
      { text: '"Yes. You\'re Miguel."',                                    next: 'miguel_q_posting', vigilance: 1 },
      { text: 'Nod. Let him set the terms.',                               next: 'miguel_q_posting', vigilance: 1 },
    ],
  },

  // Miguel establishes POSTING through natural conversation
  miguel_q_posting: {
    id: 'miguel_q_posting', location: 'Bridge', mood: 'neutral',
    text: `— We don't usually carry a chaplain. He says this without judgment. — What kind of work have you been doing?

Haircut is on the bridge. She is on the chart table. She looks at you with the particular attention of someone who is also waiting for an answer.`,
    choices: [
      {
        text:      'Hospital work. Palliative, mainly.',
        next:      'miguel_q_connection',
        set_cover: { key: 'posting', value: 'Hospital chaplain' },
        set_flag:  'cover_posting_hospital',
      },
      {
        text:      'Prison chaplaincy. Eight years. I\'m on sabbatical.',
        next:      'miguel_q_connection',
        set_cover: { key: 'posting', value: 'Prison chaplain' },
        set_flag:  'cover_posting_prison',
      },
      {
        text:      'Grief counselling. No fixed institution. Freelance.',
        next:      'miguel_q_connection',
        set_cover: { key: 'posting', value: 'Grief counsellor' },
        set_flag:  'cover_posting_freelance',
      },
    ],
  },

  miguel_q_connection: {
    id: 'miguel_q_connection', location: 'Bridge', mood: 'neutral',
    text: `He nods. Not evaluation — acknowledgment. He has noted it.

— How did you end up on this particular ship?`,
    onEnter: () => {
      if (S.G.cover.posting && !S.hasFlag('toast_cover_posting')) {
        S.setFlag('toast_cover_posting');
        S.showToast('Cover: posting established.', 'note');
      }
    },
    choices: [
      {
        text:      'The Academy reached out. Availability lined up.',
        next:      'miguel_response',
        set_cover: { key: 'connection', value: 'sent by the Academy' },
      },
      {
        text:      'A colleague recommended it. Someone who knows you, perhaps.',
        next:      'miguel_response',
        set_cover: { key: 'connection', value: 'personal recommendation' },
        mod_reputation: { miguel: 1 },
      },
      {
        text:      'Something far from land was needed. They found this.',
        next:      'miguel_response',
        set_cover: { key: 'connection', value: 'personal request' },
      },
    ],
  },

  miguel_response: {
    id: 'miguel_response', location: 'Bridge', mood: 'neutral',
    onEnter: () => {
      S.setFlag('miguel_introduced');
      if (S.G.cover.connection && !S.hasFlag('toast_cover_connection')) {
        S.setFlag('toast_cover_connection');
        S.showToast('Cover: connection established.', 'note');
      }
    },
    text: `He is quiet for a moment. The wheel. The horizon.

— The mess is aft. Lena makes coffee. Crew eats at seven and noon. Sunday, if you want to do something in the mess, entirely up to you.

He returns to the horizon. He has filed what you said. He will return to it.`,
    choices: [
      { text: '"The ship is beautiful. Does it have a history?"',      next: 'miguel_history_probe' },
      { text: '"Tell me about the crew."',                              next: 'miguel_crew_intro'   },
      { text: '"I\'ll leave you to it."',                               next: 'main_deck_hub'       },
    ],
  },

  miguel_history_probe: {
    id: 'miguel_history_probe', location: 'Bridge', mood: 'neutral',
    text: `Something in him shifts. Almost nothing.

— Fifteen years since I've been on her. She's been working longer.

He says *she* with the specificity of someone who means it.

— Built for this. Exactly this. Non-magnetic construction — pine, spruce, oak, brass fastenings, bronze fittings. The only ship of her kind. Built to measure the Earth's magnetic field from the surface of the ocean without the ship itself corrupting the readings.

He pauses.

— The chart room has the scientific logs, if you want them. Most people don't.`,
    onEnter: () => {
      S.setFlag('miguel_history_heard');
      S.modReputation('miguel', 1);
      S.unlockCodexEntry('codex_zarya_history');
    },
    choices: [
      { text: '"I\'d like to see the chart room."',        next: 'chart_room_first' },
      { text: '"What happened to her before you?"',        next: 'miguel_before'    },
      { text: '"Thank you. I\'ll let you work."',          next: 'main_deck_hub'    },
    ],
  },

  miguel_before: {
    id: 'miguel_before', location: 'Bridge', mood: 'neutral',
    text: `— She went everywhere.

He says this flatly. Which is not how you say something that means nothing.

— The Atlantic, the Mediterranean, south to Buenos Aires. First voyage 1957. Measuring anomalies — places where the field doesn't behave the way the models predict. The Mid-Atlantic Ridge. The magnetised rocks distort everything for miles around the surface.

He is quiet.

— The Academy ran out of money. She was sold.

He stops. He does not finish the sentence. He looks at the horizon.

— The chart room. Go read the logs.`,
    onEnter: () => {
      S.setFlag('zarya_fate_hinted');
      S.modReputation('miguel', 1);
      S.incrementTheosis(2);
    },
    choices: [
      { text: 'Go to the chart room.',  next: 'chart_room_first' },
      { text: 'Go to the main deck.',   next: 'main_deck_hub'    },
    ],
  },

  miguel_crew_intro: {
    id: 'miguel_crew_intro', location: 'Bridge', mood: 'neutral',
    text: `He tells you without hesitation. He has thought about what to tell a chaplain.

— Lena is the cook. Longer on this ship than I have. Don't ask her for anything she doesn't offer. Alexei is the meteorologist — he'll tell you more than you need about magnetic anomalies. Nadia is the junior scientist. She finds things.

A pause.

— Kylie Matterhorn is a journalist. Or says she is. Connie Frank is the doctor. Othis Commera manages the cargo.

He says it like that's the whole of the man. He doesn't elaborate.

— And then there's Pavel.

He says this with the expression of a man setting down something heavy.`,
    onEnter: () => { S.setFlag('crew_names_heard'); },
    choices: [
      { text: '"Who is Pavel?"',                              next: 'miguel_pavel_intro'  },
      { text: '"What do you mean, \'is cargo\'?"',            next: 'miguel_othis_probe'  },
      { text: '"I\'ll find them on my own. Thank you."',      next: 'main_deck_hub'       },
    ],
  },

  miguel_pavel_intro: {
    id: 'miguel_pavel_intro', location: 'Bridge', mood: 'neutral',
    text: `— Passenger. Letter of introduction from someone at the Academy. He talks. Constantly. He seems to know things, but the things he knows aren't useful in any straightforward way. He was on the foredeck at 5am apparently talking to the bowsprit.

He shrugs.

— He's not dangerous. He asked me a question about forgiveness yesterday. I'm still thinking about it.`,
    choices: [
      { text: 'Go to the foredeck.',   next: 'foredeck_first'    },
      { text: 'Ask about Othis.',      next: 'miguel_othis_probe' },
      { text: 'Go to the main deck.',  next: 'main_deck_hub'     },
    ],
  },

  miguel_othis_probe: {
    id: 'miguel_othis_probe', location: 'Bridge', mood: 'neutral',
    text: `He looks at you for a beat longer than the question requires.

— The cargo manifest is accurate. Othis manages it. He's competent.

This is a very precise answer to a question about a person.`,
    onEnter: () => { S.setFlag('othis_noted'); S.applyEffect({ vigilance: 1 }); },
    choices: [
      { text: 'Go to the main deck.',  next: 'main_deck_hub' },
      { text: 'Go find Othis.',         next: 'othis_first'   },
    ],
  },

  // ── FOREDECK — PAVEL ─────────────────────────────────────────

  foredeck_first: {
    id: 'foredeck_first', location: 'Foredeck', mood: 'neutral', art: 'portrait_pavel',
    text: ``,
    onEnter: () => {
      S.setFlag('met_pavel');
      S.unlockCodexEntry('codex_pavel');
      S.startDialogue([
        { speaker: null, text: 'He is there. Facing the bow. Talking with the confidence of someone who has been interrupted many times and learned to simply continue.' },
        { speaker: 'Pavel', text: '— so the question is whether the absence of ferromagnetic material creates a kind of moral clarity, if you follow me—' },
        { speaker: 'Pavel', text: 'because if the instruments are right it is because the ship is built not to interfere, which raises the question of what it would mean for a human being to be similarly constructed—' },
        { speaker: null, text: 'He turns around. He knew you were there.' },
        { speaker: 'Pavel', text: 'Oh good. You are the chaplain. I have been wanting to talk to you.' },
        { speaker: null, text: 'His name, it turns out, is Pavel.' },
        ...(S.hasFlag('archive_discovered') ? [{ speaker: 'Pavel', text: 'I know about the hold. I have known since yesterday. I want you to know that I know.' }] : []),
      ]);
    },
    choices: [
      { text: '"What were you talking about?"',                     next: 'pavel_ferromagnetic'   },
      { text: '"You\'ve been wanting to talk to me. Why?"',          next: 'pavel_why_chaplain'    },
      { text: '"How did you know I was a chaplain?"',                next: 'pavel_how_knew'        },
      { text: 'Listen. Don\'t redirect. Let him run.',               next: 'pavel_monologue', requires_charism: 'confessor' },
    ],
  },

  // Pavel establishes DENOMINATION through conversation
  pavel_ferromagnetic: {
    id: 'pavel_ferromagnetic', location: 'Foredeck', mood: 'neutral',
    text: `— The ship is non-magnetic. He barely pauses for your nod. — Built so its own material doesn't distort the readings. Brass, bronze, oak. No iron. Or almost none. And because of this minimum, the instruments record what is actually there.

He turns to the water as if checking something.

— There is a kind of person built the same way. He says this quietly, looking at the horizon. — Not passive. Just — not adding interference. What's actually there can come through. It's rarer than it sounds. Most of us are full of iron.

He looks at you.

— That's what a chaplain is for, isn't it? To be the ship built not to distort.

Then, without transition:

— What tradition are you working from?`,
    onEnter: () => { S.incrementTheosis(3); S.setFlag('pavel_ferromagnetic_heard'); },
    choices: [
      {
        text:      '"Roman Catholic. Working with the tradition rather than against it."',
        next:      'pavel_denomination_response',
        set_cover: { key: 'denomination', value: 'Roman Catholic' },
        set_flag:  'cover_denomination_catholic',
        condition: { type: 'not', condition: { type: 'flag', id: 'toast_cover_denomination' } },
      },
      {
        text:      '"Orthodox. Though the jurisdiction is complicated."',
        next:      'pavel_denomination_response',
        set_cover: { key: 'denomination', value: 'Orthodox' },
        set_flag:  'cover_denomination_orthodox',
        theosis:   2,
        condition: { type: 'not', condition: { type: 'flag', id: 'toast_cover_denomination' } },
      },
      {
        text:      '"Protestant. Reformed. Calvinist roots, mostly shed."',
        next:      'pavel_denomination_response',
        set_cover: { key: 'denomination', value: 'Protestant' },
        set_flag:  'cover_denomination_protestant',
        condition: { type: 'not', condition: { type: 'flag', id: 'toast_cover_denomination' } },
      },
      {
        text:      '"Ecumenical. The boundaries stopped mattering."',
        next:      'pavel_denomination_response',
        set_cover: { key: 'denomination', value: 'Ecumenical' },
        set_flag:  'cover_denomination_ecumenical',
        theosis:   1,
        condition: { type: 'not', condition: { type: 'flag', id: 'toast_cover_denomination' } },
      },
      // After denomination is established — continue the conversation
      { text: 'Continue the conversation.',
        next: 'pavel_denomination_response',
        condition: { type: 'flag', id: 'toast_cover_denomination' } },
    ],
  },

  pavel_denomination_response: {
    id: 'pavel_denomination_response', location: 'Foredeck', mood: 'neutral',
    onEnter: () => {
      if (!S.hasFlag('toast_cover_denomination')) {
        S.setFlag('toast_cover_denomination');
        S.showToast('Cover: denomination established.', 'note');
      }
    },
    get text() {
      const isOrthodox = S.hasFlag('cover_denomination_orthodox');
      const isCatholic = S.hasFlag('cover_denomination_catholic');
      const isEcumenical = S.hasFlag('cover_denomination_ecumenical');
      
      let pavelsResponse = '';
      if (isOrthodox) {
        pavelsResponse = `— Orthodox. He repeats this with something that is not quite recognition. — The hesychasts. Theosis as actual participation. Gregory Palamas.\n\nHe picks up a piece of rope. He does not do anything with it.\n\n— Then you already know what I'm talking about. He says. — More or less. The ship version.`;
      } else if (isCatholic) {
        pavelsResponse = `— Roman Catholic. He nods slowly. — You have a tradition that has spent a very long time arguing with itself about whether matter is sacred. That argument is useful on this ship.\n\nHe picks up a piece of rope. He does not do anything with it.`;
      } else if (isEcumenical) {
        pavelsResponse = `— Ecumenical. He looks at you with something like approval. — The boundaries stopped mattering. That is either exhaustion or wisdom. On a ship like this one, it is wisdom.\n\nHe picks up a piece of rope. He does not do anything with it.`;
      } else if (S.hasFlag('cover_denomination_protestant')) {
        pavelsResponse = `— Protestant. He says. — Reformed, or thereabouts. Calvin had a theory about election that was, structurally, very interesting. He was wrong about most of the conclusions, but the structure was sound.\n\nHe picks up a piece of rope. He does not do anything with it.`;
      } else {
        // No denomination set — redirect to denomination choice
        S.navigate && S.navigate('pavel_ferromagnetic');
        return '';
      }
      
      return pavelsResponse + `\n\n— I'd like to walk with you. he says. — This crossing specifically. I think it's going to need a witness.`;
    },
    choices: [
      { text: '"Then stay close."',           tags: ['pastoral', 'witness'],                          next: 'pavel_joined', add_companion: { id: 'pavel', name: 'Pavel', charisms: ['overflow'] } },
      { text: '"We\'ll see how it goes."',                   next: 'main_deck_hub' },
    ],
  },

  pavel_joined: {
    id: 'pavel_joined', location: 'Foredeck', mood: 'neutral',
    text: `He nods once. As if confirmed rather than decided.

— Good. He says. — I'll be around. You won't always be glad of it.

He delivers this with complete equanimity. It is probably true. You find, to your mild surprise, that you don't mind.`,
    onEnter: () => {
      S.incrementTheosis(2);
      S.setFlag('pavel_is_companion');
      S.showToast('Pavel has joined you.', 'note');
    },
    choices: [
      { text: 'Go find the chart room.',    next: 'chart_room_first' },
      { text: 'Go to the mess for coffee.', next: 'galley_first'     },
      { text: 'Explore the main deck.',     next: 'main_deck_hub'    },
    ],
  },

  pavel_why_chaplain: {
    id: 'pavel_why_chaplain', location: 'Foredeck', mood: 'neutral',
    text: `— Because the ship needs one. He says this like it's obvious. — Not for the usual reasons, though those are real. This ship specifically is going somewhere that requires a witness. Someone who knows how to be present at the edge of something they can't fully understand.

He pauses.

— Or it's a spy, actually. But I'm assuming you're the former.

He says this as if it's a minor observation about the weather.`,
    onEnter: () => { S.applyEffect({ vigilance: 2 }); S.setFlag('pavel_spy_comment'); },
    choices: [
      { text: '"Definitely the former." Steady.',                    next: 'pavel_ferromagnetic', vigilance: 1 },
      { text: '"What do you mean, the ship is going somewhere?"',    next: 'pavel_destination'               },
      { text: 'Change the subject. Smoothly.',                       next: 'pavel_ferromagnetic', vigilance: 1, requires_charism: 'confessor' },
    ],
  },

  pavel_how_knew: {
    id: 'pavel_how_knew', location: 'Foredeck', mood: 'neutral',
    text: `— The envelope in your coat pocket is standard issue for ecclesiastical credentials. — Also you carry yourself in a certain way. Like someone used to walking into rooms where someone is suffering and not showing it. That's a learned gait.

He is correct about both.

— Also Miguel told me last night.`,
    choices: [
      { text: '"What were you talking about before I arrived?"',  next: 'pavel_ferromagnetic' },
      { text: '"Tell me about yourself."',                         next: 'pavel_origin'        },
    ],
  },

  pavel_monologue: {
    id: 'pavel_monologue', location: 'Foredeck', mood: 'neutral',
    text: `You let him go.

He talks about Paul — not the Church's Paul but the one underneath. The ecstatic. The man who said there is neither slave nor free, neither male nor female, and meant it so literally it terrified everyone. He talks about the ship. About bronze. About forgiveness not as transaction but as property of the universe — something that exists whether or not anyone enacts it, waiting to be discovered like a magnetic anomaly.

Twenty minutes. No stopping.

When he stops it is because your silence has satisfied him.

— You're good at that.`,
    onEnter: () => { S.incrementTheosis(4); S.applyEffect({ composure: 1 }); S.setFlag('pavel_full_monologue'); },
    choices: [
      { text: '"I had good teachers."',            next: 'pavel_denomination_response' },
      { text: '"Where did all of that come from?"', next: 'pavel_origin'              },
    ],
  },

  pavel_origin: {
    id: 'pavel_origin', location: 'Foredeck', mood: 'neutral',
    text: `— Prison for a while. Nothing violent. A matter of saying things people didn't want heard. Before that, a teacher. Before that, someone who didn't know what he thought about anything. That last phase was the longest and in retrospect the most important.

He holds the rope without doing anything with it.

— I'm on this ship because it's going somewhere that needs a witness. The usual witnesses weren't arranged.

He looks at the horizon.

— What tradition are you working from?`,
    choices: [
      {
        text:      '"Roman Catholic. Working with the tradition rather than against it."',
        next:      'pavel_denomination_response',
        set_cover: { key: 'denomination', value: 'Roman Catholic' },
        set_flag:  'cover_denomination_catholic',
        condition: { type: 'not', condition: { type: 'flag', id: 'toast_cover_denomination' } },
      },
      {
        text:      '"Orthodox. Though the jurisdiction is complicated."',
        next:      'pavel_denomination_response',
        set_cover: { key: 'denomination', value: 'Orthodox' },
        set_flag:  'cover_denomination_orthodox',
        theosis:   2,
        condition: { type: 'not', condition: { type: 'flag', id: 'toast_cover_denomination' } },
      },
      {
        text:      '"Protestant. Reformed. Calvinist roots, mostly shed."',
        next:      'pavel_denomination_response',
        set_cover: { key: 'denomination', value: 'Protestant' },
        set_flag:  'cover_denomination_protestant',
        condition: { type: 'not', condition: { type: 'flag', id: 'toast_cover_denomination' } },
      },
      {
        text:      '"Ecumenical. The boundaries stopped mattering."',
        next:      'pavel_denomination_response',
        set_cover: { key: 'denomination', value: 'Ecumenical' },
        set_flag:  'cover_denomination_ecumenical',
        theosis:   1,
        condition: { type: 'not', condition: { type: 'flag', id: 'toast_cover_denomination' } },
      },
      // After denomination is established — continue the conversation
      { text: 'Continue the conversation.',
        next: 'pavel_denomination_response',
        condition: { type: 'flag', id: 'toast_cover_denomination' } },
    ],
  },

  pavel_destination: {
    id: 'pavel_destination', location: 'Foredeck', mood: 'neutral',
    text: `He is quiet for a moment. The sails move.

— I don't know exactly. He says this carefully. — I know the ship has a history people are trying to make smaller. I know that's the wrong direction. I know on this crossing something will be either preserved or lost.

He looks at you.

— And I know whether it's preserved depends partly on whoever ends up in this role.

The crossing will take care of the rest. He drops the rope.`,
    onEnter: () => { S.incrementTheosis(3); S.setFlag('pavel_mission_hinted'); },
    choices: [
      { text: 'Walk with him in silence.',                 next: 'pavel_denomination_response', theosis: 1 },
      { text: '"What tradition are you working from?"',    next: 'pavel_denomination_response'              },
    ],
  },

  // ── GALLEY — LENA ────────────────────────────────────────────

  galley_first: {
    id: 'galley_first', location: 'Galley', mood: 'neutral', art: 'portrait_lena',
    text: `Lena is doing something to a fish that has clearly already lost the argument.

She hands you a cup of coffee without being asked. The coffee is, as advertised, remarkable.

She looks at you. Just looks. Not waiting. Not examining. Just being in the same room.

You drink the coffee.`,
    onEnter: () => { S.setFlag('met_lena'); },
    choices: [
      { text: 'Say nothing. Let the room be the room.', next: 'lena_silence', theosis: 2, composure: 1, tags: ['stillness', 'presence', 'silence'] },
      { text: '"How long have you been on this ship?"',            next: 'lena_tenure'                           },
      { text: '"The coffee is extraordinary."',                    next: 'lena_coffee'                           },
    ],
  },

  lena_silence: {
    id: 'lena_silence', return_to: 'galley_hub', return_label: '← The galley.', location: 'Galley', mood: 'neutral',
    text: `You drink the coffee in silence. She continues with the fish.

After a while:

— The ship likes to be listened to. Most people don't bother.

She hands you something wrapped in bread — warm, slightly oily, perfect — without explanation.`,
    onEnter: () => {       S.progressSounding('sounding_crossing', 2);
      S.recordNpcMemory('lena', 'sat in silence without asking');
S.modReputation('lena', 2); S.offerSounding('sounding_crossing'); },
    choices: [
      { text: 'Eat. Stay.',             next: 'lena_tenure'   },
      { text: 'Thank her and go.',       next: 'main_deck_hub' },
    ],
  },

  lena_coffee: {
    id: 'lena_coffee', return_to: 'galley_hub', return_label: '← The galley.', location: 'Galley', mood: 'neutral',
    text: `She looks at you for the first time.

— Yes.

She returns to the fish. She has accepted your observation as a fact about the world and moved on.`,
    onEnter: () => { S.modReputation('lena', 1); },
    choices: [
      { text: '"How long have you been on this ship?"',   next: 'lena_tenure' },
      { text: 'Drink in silence.',                         next: 'lena_silence', theosis: 1 },
    ],
  },

  lena_tenure: {
    id: 'lena_tenure', location: 'Galley', mood: 'neutral',
    text: `— Twenty-two years. She says this while looking at the fish. — I was on her before Miguel. Before the last captain. Before Antwerp.

She adjusts the flame.

— She was different then. Doing what she was built for. Now—

She stops.

— You should see the hold. If you haven't.`,
    onEnter: () => { S.modReputation('lena', 1); S.setFlag('lena_hold_mentioned'); },
    choices: [
      { text: '"What\'s in the hold?"', next: 'lena_hold',
        condition: { type: 'not', condition: { type: 'flag', id: 'lena_archive_revealed' } } },
      { text: '"What do you mean, doing what she was built for?"', next: 'lena_reasons',
        condition: { type: 'not', condition: { type: 'flag', id: 'lena_reasons_heard' } } },
      { text: 'Go to the hold.', next: 'hold_first',
        condition: { type: 'flag', id: 'lena_archive_revealed' } },
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  lena_hold: {
    id: 'lena_hold', return_to: 'galley_hub', return_label: '← The galley.', location: 'Galley', mood: 'neutral',
    text: `She looks at the stove.

— The archive. Everything the ship found. Thirty years of it. Every anomaly measured, every photograph of the sea from positions nobody photographs because there's nothing there except what the instruments were detecting.

A pause.

— They put it in the hold for the crossing. That's what they said. For the crossing.

She turns the fish.

— Freezer Beef is down there. The cat. He knows.`,
    onEnter: () => { S.setFlag('lena_archive_revealed'); S.incrementTheosis(3); },
    choices: [
      { text: 'Go to the hold.',          next: 'hold_first' },
      { text: '"Who are \'they\'?"',       next: 'lena_they'  },
    ],
  },

  lena_they: {
    id: 'lena_they', location: 'Galley', mood: 'neutral',
    text: `She looks at you now. Directly.

— The people who paid for this crossing.

She goes back to cooking. The conversation is over. This is not hostility. It is the kindness of someone who knows certain things are better approached sideways, and has told you as much as the approach will bear right now.`,
    onEnter: () => { S.setFlag('mission_funders_hinted'); },
    choices: [
      { text: 'Go to the hold.',  next: 'hold_first'   },
      { text: 'Thank her. Go.',   next: 'main_deck_hub' },
    ],
  },

  lena_reasons: {
    id: 'lena_reasons', location: 'Galley', mood: 'neutral',
    onEnter: () => { S.setFlag('lena_reasons_heard'); },
    text: `She is quiet long enough that you think the answer isn't coming.

— She was built to find things. Things that are there but hidden. The anomalies. The irregularities. She was built to be transparent enough that the hidden things could show through. Twenty-two years ago, that was still what she was for.

She turns the stove down.

— Now she's being used to go somewhere and do something. That's different.

She doesn't say what the something is.`,
    onEnter: () => { S.incrementTheosis(2); S.modReputation('lena', 2); },
    choices: [
      { text: '"What is she being used to do?"',  next: 'lena_hold'    },
      { text: 'Go to the hold.',                   next: 'hold_first'   },
    ],
  },

  galley_hub: {
    id: 'galley_hub', location: 'Galley', mood: 'neutral',
    get text() {
      const parts = ['Lena is here. She is almost always here, or the galley is in the state of someone who has just left and is about to return.'];
      if (S.hasFlag('maintenance_bilge')) parts.push('She hands you something without being asked. Today it is better than yesterday. She has noticed the bilge was checked.');
      else parts.push('She hands you something without being asked.');
      if (S.hasNpcMemory && S.hasNpcMemory('lena', 'sat in silence without asking')) {
        parts.push('She does not comment on your presence. She already knows how to be in the same room as you.');
      }
      if (S.hasNpcMemory && S.hasNpcMemory('lena', 'stood with her at the sonar image')) {
        // Nadia memory accidentally stored under lena — check lena's own memories
      }
      if (S.hasFlag('hold_bless_archive')) parts.push('She is quieter than usual. Not worried. Something has settled.');
      if (S.hasFlag('stink_patrol_hands_known')) parts.push('The small arrangement near the oven — it has been there since you spoke with her about the Stink Patrol. She does not look at it directly.');
      if (S.hasFlag('lena_direct_asked')) parts.push('She asked her question. You answered it. There is nothing more to establish between you.');
      const pavLine = S.getCompanionLine && S.getCompanionLine('pavel', 'Galley');
      if (pavLine) parts.push(pavLine);
      return parts.join('\n\n');
    },
    choices: [
      { text: 'Ask about the archive.',         next: 'lena_hold',         condition: { type: 'not', condition: { type: 'flag', id: 'lena_archive_revealed' } } },
      { text: 'She is looking at something.',   next: 'photo_crossreference', condition: { type: 'and', conditions: [{ type: 'flag', id: 'volkov_photo_found' }, { type: 'flag', id: 'hold_micha_photo' }, { type: 'not', condition: { type: 'flag', id: 'photos_crossreferenced' } }] } },
      { text: 'She says something.',               next: 'lena_arc_1', condition: { type: 'and', conditions: [{ type: 'not', condition: { type: 'flag', id: 'lena_fragment_1_seen' } }] } },
      { text: 'She says something.',               next: 'lena_arc_2', condition: { type: 'and', conditions: [{ type: 'flag', id: 'lena_fragment_1_seen' }, { type: 'not', condition: { type: 'flag', id: 'lena_fragment_2_seen' } }] } },
      { text: 'She says something.',               next: 'lena_arc_3', condition: { type: 'and', conditions: [{ type: 'flag', id: 'lena_fragment_2_seen' }, { type: 'flag', id: 'sunday_service_led' }, { type: 'not', condition: { type: 'flag', id: 'lena_fragment_3_seen' } }] } },
      { text: 'She wants to tell you about Volkov.', next: 'lena_arc_4', condition: { type: 'and', conditions: [{ type: 'flag', id: 'lena_fragment_3_seen' }, { type: 'not', condition: { type: 'flag', id: 'lena_fragment_4_seen' } }] } },
      { text: 'She has something to say.',          next: 'lena_arc_5', condition: { type: 'and', conditions: [{ type: 'flag', id: 'lena_fragment_4_seen' }, { type: 'flag', id: 'act_three_begun' }, { type: 'not', condition: { type: 'flag', id: 'lena_fragment_5_seen' } }] } },
      { text: 'Sit in silence.',                tags: ['pastoral', 'presence', 'witness'], next: 'lena_silence' },
      { text: 'Go to the main deck.',           next: 'main_deck_hub' },
    ],
  },

  // ── CHART ROOM ───────────────────────────────────────────────

  chart_room_first: {
    id: 'chart_room_first', location: 'Chart Room', mood: 'neutral',
    text: `Small. A table, a lamp, cabinets bolted to the wall. The lamp is brass.

Two sets of files. One current — weather, route charts. One older. Binders well-worn, labelled by year. 1957. 1958. 1961. Through the decades.

You pull the 1957 binder.

The first pages are scientific. Numbers, coordinates, magnetic declination recorded across the North Atlantic. But the log entries between them are handwritten — neither dry nor literary. Someone who wanted to describe what they saw accurately, and found accuracy kept bumping up against something that required more words than planned.

*August 17, 1957. Passed south of the Faroe Islands. Magnetic deviation notable — the instruments registering fluctuations not accounted for by the standard model. The crew is in good spirits. The sea today is the colour of old bronze.*`,
    onEnter: () => {
      S.setFlag('chartroom_visited');
      S.offerSounding('sounding_history');
      S.incrementTheosis(2);
      S.unlockCodexEntry('codex_the_dawn');
      S.unlockCodexEntry('codex_non_magnetic');
      S.unlockCodexEntry('codex_magnetic_anomaly');
      // The deeper history unlocks only later
    },
    choices: [
      { text: 'Read the 1957 logs.',            tags: ['history', 'archive', 'memory'],              tags: ['history', 'memory'], next: 'chartroom_1957',     condition: { type: 'not', condition: { type: 'flag', id: 'zarya_log_read' } } },
      { text: 'The 1957 logs.',                   next: 'chartroom_1957',     condition: { type: 'flag', id: 'zarya_log_read' } },
      { text: 'Look at the later logs.',           tags: ['history', 'memory'], next: 'chartroom_late_logs',condition: { type: 'not', condition: { type: 'flag', id: 'late_logs_seen' } } },
      { text: 'The later logs.',                  next: 'chartroom_late_logs', condition: { type: 'flag', id: 'late_logs_seen' } },
      { text: 'The current mission documentation.',next: 'chartroom_current',  condition: { type: 'not', condition: { type: 'flag', id: 'mission_docs_read' } } },
      { text: 'The deviation readings.',           next: 'chartroom_deviation', condition: { type: 'not', condition: { type: 'flag', id: 'deviation_noted' } } },
      { text: 'Return to the main deck.',          next: 'main_deck_hub' },
    ],
  },

  chartroom_1957: {
    id: 'chartroom_1957', return_to: 'chart_room_first', return_label: '← Chart room.', location: 'Chart Room', mood: 'neutral',
    text: `Fifty pages. The ship measured the Atlantic grid by grid. Anomalies wherever the field diverged from the model. Unknown mountains under the water making the compass lie.

The scientist's observations, and beside them, in the margins, small notes by the sailor who kept the ship's own log. He signs with initials only.

*We are in an anomaly region and the instruments are singing. That is not the scientific term. Dr. I. would prefer I said "registering elevated field variation." But they are singing. The brass in the rigging makes a sound at certain headings that is not quite wind.*

*I mentioned this to the cook. She said: yes. As if she had been waiting for me to notice.*`,
    onEnter: () => { S.incrementTheosis(2); S.setFlag('zarya_log_read'); },
    choices: [
      { text: 'Read the later logs.',                next: 'chartroom_late_logs' },
      { text: 'Look at the current documentation.',  next: 'chartroom_current'   },
      { text: 'Return to the chart room entrance.', next: 'chart_room_first'    },
      { text: 'Return to the main deck.',            next: 'main_deck_hub'       },
    ],
  },

  chartroom_late_logs: {
    id: 'chartroom_late_logs', return_to: 'chart_room_first', return_label: '← Chart room.', location: 'Chart Room', mood: 'neutral',
    text: `The late logs are different. The handwriting careful but changed. A refit in 1976 — new masts, non-magnetic alloys. The 1982 binder records a thirtieth-anniversary voyage. Scientists from Germany, Finland, Poland.

Then a gap. No binder after 1982.

The next folder is labelled in pencil. The pencil has been partly erased.

You can make out: *final manifest.*

You do not open it yet.`,
    onEnter: () => {
      S.setFlag('late_logs_seen');
      S.setFlag('final_manifest_found');
      S.incrementTheosis(1);
    },
    choices: [
      { text: 'Open the final manifest.',  next: 'chartroom_manifest' },
      { text: 'Return to the 1957 logs.',  next: 'chartroom_1957'     },
      { text: 'Leave it. Come back.',      next: 'main_deck_hub'      },
    ],
  },

  chartroom_manifest: {
    id: 'chartroom_manifest', return_to: 'chart_room_first', return_label: '← Chart room.', location: 'Chart Room', mood: 'uncanny',
    text: `The final manifest lists the hold cargo. Most is scientific equipment — expected.

The last entry is longer than the others.

*Archival material. Contents: 47 binders (scientific logs, 1957–1982), 12 boxes (photographic archive), 6 boxes (chart copies, annotated). Condition: good. Classification: pending disposal.*

Pending disposal.

You look at the 1957 binder in your hand. The margin notes. The cook who said yes.

You put it back.`,
    onEnter: () => {
      S.setFlag('archive_discovered');
      S.incrementTheosis(3);
      S.unlockCodexEntry('codex_the_archive');
      S.showToast('Something becomes clear.', 'theosis');
    },
    choices: [
      { text: 'Go to the hold.',                   next: 'hold_first'        },
      { text: 'Find Lena. Ask what she knows.',    next: 'galley_first'      },
      { text: 'Return to the earlier logs.',        next: 'chartroom_1957'   },
      { text: 'Go to the main deck.',              next: 'main_deck_hub'     },
    ],
  },

  chartroom_current: {
    id: 'chartroom_current', return_to: 'chart_room_first', return_label: '← Chart room.', location: 'Chart Room', mood: 'neutral',
    text: `The current documentation is ordinary. Weather, depth charts, route. The crossing moves northeast-by-north toward a waypoint marked with a circle and a date.

In the margin of the route chart, different ink, probably recent: *deviation increasing. anomaly zone: 48hr.*

Someone is tracking the magnetic deviation. Watching for it.`,
    onEnter: () => {
      S.setMagneticDeviation(0.1);
      S.setFlag('anomaly_first_noticed');
      S.unlockCodexEntry('codex_magnetic_anomaly');
    },
    choices: [
      { text: 'Read the historical logs.',   next: 'chartroom_1957' },
      { text: 'Return to the main deck.',    next: 'main_deck_hub'  },
    ],
  },

  chartroom_deviation: {
    id: 'chartroom_deviation', return_to: 'chart_room_first', return_label: '← Chart room.', location: 'Chart Room', mood: 'neutral',
    text: `The deviation readings are in pencil at the side. They have been increasing. Not dramatically. Consistently.

You are sailing into a region where the Earth's magnetic field does not behave as expected.

The ship was built specifically to operate in such regions without distorting the measurements. Its non-magnetic construction makes it transparent to the field. It passes through without interference.

The thought stops you. You sit with it for a moment.`,
    onEnter: () => {
      S.setMagneticDeviation(0.15);
      S.setFlag('anomaly_first_noticed');
      S.incrementTheosis(2);
      S.unlockCodexEntry('codex_magnetic_anomaly');
    },
    choices: [
      { text: 'Read the historical logs.',   next: 'chartroom_1957' },
      { text: 'Return to the main deck.',    next: 'main_deck_hub'  },
    ],
  },

  // ── HOLD ─────────────────────────────────────────────────────

  hold_first: {
    id: 'hold_first', location: 'Hold', mood: 'uncanny', art: 'portrait_freezer_beef',
    text: `Below the waterline. You can feel that — the sea becomes audible at a different pitch. Water doing its patient work against the oak and pine.

Your eyes adjust.

Usual supplies. Then, taking up most of the far end: boxes. Many boxes. Some labelled in a hand you cannot place. Some in pencil with years. Some sealed with tape that has dried and curled.

On one of the boxes: a small cat. Her head is disproportionate — broad, flat, somewhat salamander-like — and her colouring is calico, patches of orange and black and white distributed with the randomness of something that was not planned. She gives the impression of having arrived somewhere important several years before anyone else, and of having concluded something about it.

This is Freezer Beef. You will learn this later. Right now she looks at you without surprise, which, given the circumstances, feels notable.`,
    onEnter: () => {
      S.setFlag('hold_visited');
      S.setFlag('archive_found_hold');
      S.incrementTheosis(4);
      if (!S.hasFlag('archive_discovered')) {
        S.setFlag('archive_discovered');
        S.showToast('Something becomes clear.', 'theosis');
      }
    },
    choices: [
      { text: 'Approach the boxes.',              tags: ['history', 'memory'], next: 'hold_boxes',          condition: { type: 'not', condition: { type: 'flag', id: 'hold_boxes_seen' } } },
      { text: 'The boxes.',                        next: 'hold_boxes',          condition: { type: 'flag', id: 'hold_boxes_seen' } },
      { text: 'Nadia is on the floor with a binder.', next: 'nadia_1978_discovery', condition: { type: 'and', conditions: [{ type: 'flag', id: 'act_two_begun' }, { type: 'not', condition: { type: 'flag', id: 'nadia_1978_found' } }] } },
      { text: 'Offer a blessing.',              tags: ['pastoral', 'witness', 'memory'],                 next: 'hold_bless_archive',  condition: { type: 'and', conditions: [{ type: 'flag', id: 'archive_discovered' }, { type: 'not', condition: { type: 'flag', id: 'archive_blessed' } }] } },
      { text: 'The hatch below.',                  tags: ['solidarity', 'sobornost', 'pastoral'], next: 'stink_patrol_favour', condition: { type: 'and', conditions: [{ type: 'flag', id: 'stink_patrol_hands_known' }, { type: 'stat', stat: 'communion', min: 6 }, { type: 'not', condition: { type: 'flag', id: 'stink_patrol_favour_received' } }] } },
      { text: 'Sit on the floor.',                 tags: ['stillness', 'presence', 'silence'], next: 'hold_sit', theosis: 3, composure: 1, condition: { type: 'not', condition: { type: 'flag', id: 'hold_sat' } } },
      { text: 'Sit for a while longer.',           tags: ['stillness', 'silence'], next: 'hold_sit', theosis: 2, condition: { type: 'flag', id: 'hold_sat' } },
      { text: 'Pavel is here too.',                next: 'pavel_riddle_two', condition: { type: 'and', conditions: [{ type: 'flag', id: 'pavel_riddle_one_complete' }, { type: 'not', condition: { type: 'flag', id: 'pavel_riddle_two' } }] } },
      { text: 'A moment here.',                    tags: ['stillness', 'presence'], next: 'pool_hold_ambient' },
      { text: 'Go back up.',                       next: 'main_deck_hub' },
    ],
  },

  hold_sit: {
    id: 'hold_sit', return_to: 'hold_first', return_label: '← The hold.', location: 'Hold', mood: 'uncanny',
    text: `You sit on the floor of the hold.

The hull breathes around you. Freezer Beef watches you with the patience of someone who decided a long time ago.

The boxes are there. The sea is there. The hull — oak, pine, spruce, no iron — is doing its job of not interfering with the measurements.

You are sitting in the hold of a ship built to be transparent. Surrounded by thirty years of what it found.

You don't know yet what you're supposed to do about this. You know you are supposed to do something.

You sit there for a while.`,
    onEnter: () => {
      S.setFlag('hold_sat');
      S.incrementTheosis(3);
      S.applyEffect({ composure: 1, communion: 1 });
      S.setFlag('hold_sat');
      S.offerSounding('sounding_solidarity');
    },
    choices: [
      { text: 'Look at the boxes.',    next: 'hold_boxes'    },
      { text: 'Go up. Find Pavel.',    next: 'main_deck_hub' },
    ],
  },

  hold_boxes: {
    id: 'hold_boxes', return_to: 'hold_first', return_label: '← The hold.', location: 'Hold', mood: 'uncanny',
    text: `The boxes are sealed. Most of them.

One near the bottom of the nearest stack has a lid only resting in place. Not latched.

Freezer Beef shifts from the top of the stack to beside your feet. This is probably not a sign of anything. You note it.

The box nearest you is labelled: *1972, Atlantic crossing, photographs, southern route.*`,
    choices: [
      { text: 'Open the 1972 box.',             tags: ['history', 'memory', 'archive'],                next: 'hold_1972_box',
        condition: { type: 'not', condition: { type: 'flag', id: 'box_1972_opened' } } },
      { text: 'Stand with it. Just bear witness.', tags: ['witness', 'history', 'memory'], next: 'hold_witness', theosis: 3,
        condition: { type: 'not', condition: { type: 'flag', id: 'hold_witnessed' } } },
      { text: 'Bless the archive.',                next: 'hold_bless_archive',
        condition: { type: 'and', conditions: [
          { type: 'flag', id: 'sunday_service_led' },
          { type: 'not', condition: { type: 'flag', id: 'archive_blessed' } }
        ]}},
      { text: 'Return to the hold entrance.',      next: 'hold_first' },
      { text: 'Go back up.',                       next: 'main_deck_hub' },
    ],
  },

  hold_witness: {
    id: 'hold_witness', return_to: 'hold_first', return_label: '← The hold.', location: 'Hold', mood: 'uncanny',
    text: `You don't open anything.

You stand in the hold and you look at the boxes, all of them, and you let that be what it is: thirty years of work, packed into a hold on a ship, labelled for disposal.

Freezer Beef sits against your ankle. He is warm.

The ship moves. The sea is loud from here.

Something in you — not a thought, more like a shift of weight — moves from neutral to something that has not yet found its name.`,
    onEnter: () => { S.incrementTheosis(3); S.applyEffect({ communion: 2 }); S.setFlag('hold_witnessed'); S.setFlag('hold_boxes_seen'); },
    choices: [
      { text: 'Go up. Find someone to talk to.',          next: 'main_deck_hub' },
      { text: 'Open the 1972 box.',                        next: 'hold_1972_box' },
      { text: 'Offer a blessing. Quietly. For the record.', tags: ['history', 'witness', 'memory'], next: 'hold_bless_archive', theosis: 4, condition: { type: 'flag', id: 'sunday_service_led' } },
    ],
  },

  hold_bless_archive: {
    id: 'hold_bless_archive', return_to: 'hold_first', return_label: '← The hold.', location: 'Hold', mood: 'uncanny',
    text: `It is not a formal blessing. There is no form for this.

You stand in the hold of a non-magnetic ship with thirty years of geomagnetic measurement at your back, and you say something. Not loudly. The words are not important — or they are important but not because of their content.

The act is: you stand here and you acknowledge that this exists. That these boxes exist. That the years in them happened.

Freezer Beef watches from her box. She does not seem surprised that the chaplain is blessing the archive in the middle of the North Atlantic at 3am. Nothing on this ship surprises her.

You finish. The hold is the same hold.

Something in it is different.`,
    onEnter: () => {
      S.incrementTheosis(7);
      S.applyEffect({ composure: 2, communion: 2 });
      if (S.G.worldState) {
        S.G.worldState.sanctity = Math.min(10, S.G.worldState.sanctity + 3);
        if (S.G.worldState.sanctity >= 7) document.body.classList.add('sanctity-high');
      }
      S.setFlag('archive_blessed');
      S.showToast('The archive is witnessed.', 'theosis');
    },
    choices: [
      { text: 'Go up.', next: 'main_deck_hub' },
      {
        text: 'Empty something you have been carrying. Let the water have it.',
        next: 'kenosis_act',
        requires_charism: 'faster',
        condition: { type: 'not', condition: { type: 'flag', id: 'kenosis_performed' } },
      },
    ],
  },

  kenosis_act: {
    id: 'kenosis_act', location: 'Hold', mood: 'uncanny',
    text: `You are not sure what you let go of. That is the nature of letting go of something you have been carrying for long enough that you stopped noticing it was there.

The hold is the same hold. Freezer Beef is on her box. The archive is in its boxes.

The weight is different.

Not less. Different. Something that was vertical has become horizontal. Something that was compressed has spread out to the size of its actual surface area, which is larger than you thought.

Freezer Beef is watching you with the patience of someone who has been waiting for this specifically.`,
    onEnter: () => {
      S.incrementTheosis(6);
      S.applyEffect({ doubt: -3, composure: 3 });
      S.setFlag('kenosis_performed');
      S.progressSounding('sounding_forgiveness', 4);
      S.showToast('Something released.', 'theosis');
    },
    choices: [
      { text: 'Go up.', next: 'main_deck_hub' },
    ],
  },

  hold_1972_box: {
    id: 'hold_1972_box', location: 'Hold', mood: 'uncanny',
    text: `Photographs. Dozens of them. Black and white. Professionally developed.

The ocean from different angles. Instruments. Readings. People on the deck squinting into sun or weather.

One photograph stops you.

A young man on the bowsprit — laughing at something off-frame, wind in his jacket, completely at home at the very tip of a ship in the middle of the Atlantic.

On the back, in pencil: a name you cannot quite read. *At the anomaly, 1972.*

You stand in the hold for a long time with this photograph.`,
    onEnter: () => {
      S.incrementTheosis(3);
      S.applyEffect({ communion: 1 });
      S.setFlag('hold_micha_photo');
      S.setFlag('box_1972_opened');
      S.modReputation('miguel', 2);
      S.showToast('Something is found.', 'theosis');
    },
    choices: [
      { text: 'Put it back carefully. Go find Miguel.',  next: 'miguel_photo_return',
        condition: { type: 'not', condition: { type: 'flag', id: 'photo_kept' } } },
      { text: 'Keep the photograph.',                    next: 'hold_first', set_flag: 'photo_kept', give_item: 'zarya_photograph',
        condition: { type: 'not', condition: { type: 'flag', id: 'photo_kept' } } },
      { text: 'Look at the other boxes.',                next: 'hold_boxes' },
      { text: 'Go up.',                                  next: 'main_deck_hub' },
    ],
  },

  miguel_photo_return: {
    id: 'miguel_photo_return', location: 'Bridge', mood: 'neutral',
    text: `Miguel looks at the photograph for a long time.

He doesn't ask how you found it. He just looks.

— 1972. — I was twenty-eight. That was — He stops. — That was the anomaly at the mid-Atlantic Ridge. The instruments went extraordinary. Dr. Ivanova was crying, but professionally. I was laughing, as you can see.

He gives it back to you.

— Keep it. He says. — The box it came from should be — He stops again. His jaw does something. — Keep it. Someone should have it.`,
    onEnter: () => {
      S.modReputation('miguel', 4);
      S.incrementTheosis(4);
      S.applyEffect({ communion: 2 });
            S.recordNpcMemory('miguel', 'returned the photograph');
S.setFlag('miguel_photo_returned');
      S.addItem('zarya_photograph');
    },
    choices: [
      { text: 'Ask him directly about the mission.',  next: 'miguel_mission_direct' },
      { text: 'Say nothing. Let him have the moment.', next: 'main_deck_hub', composure: 1, theosis: 2 },
    ],
  },

  miguel_mission_direct: {
    id: 'miguel_mission_direct', location: 'Bridge', mood: 'uncanny',
    text: `— You found the manifest. Not a question.

— Yes.

— Then you know what the crossing is for.

He looks at the horizon.

— I was told a version I chose to believe because I needed the work and because she needed someone who knew her. I knew the version was incomplete. I told myself I would see.

He grips the wheel.

— I have been a sailor for thirty years. I have made crossings properly. This is not a proper crossing. You know that. I know that.

He says nothing more. He does not look away from the horizon.`,
    onEnter: () => {
      S.incrementTheosis(5);
      S.setFlag('miguel_knows');
      S.setFlag('mission_reality_known');
      S.modReputation('miguel', 3);
      S.unlockCodexEntry('codex_the_mission');
    },
    choices: [
      { text: '"I\'m not going to do it."',                           next: 'mission_refused_miguel', set_flag: 'mission_refused' },
      { text: '"I don\'t know yet."',                                  next: 'act_two_begin'                                      },
      { text: '"Tell me what they want destroyed."',                   next: 'miguel_mission_detail'                              },
    ],
  },

  mission_refused_miguel: {
    id: 'mission_refused_miguel', location: 'Bridge', mood: 'uncanny',
    text: `He looks at you. Something in his face settles.

— Good.

Just: good.

He looks at the horizon again.

— That's one decision. There are others to make. What you do instead. Who else needs to know. There's still ocean between here and wherever this ends.

The ship moves under you both.`,
    onEnter: () => {
      S.pushConsequence({
        on_next_choice: false,
        delay_scenes: 3,
        flagsToSet: ['miguel_knows_refusal'],
        effect: {},
      });
      S.progressSounding('sounding_forgiveness', 2);
            S.recordNpcMemory('miguel', 'refused the mission');
S.setFlag('mission_refused');
      S.updateProgressTracker('tracker_solidarity', 1);
      S.incrementTheosis(5);
      S.showToast('The crossing shifts.', 'theosis');
    },
    choices: [
      { text: 'Continue the crossing.', next: 'act_two_begin' },
    ],
  },

  miguel_mission_detail: {
    id: 'miguel_mission_detail', location: 'Bridge', mood: 'uncanny',
    text: `— The scientific logs. The photographs. Everything the ship found. He speaks carefully. — Someone has decided the record of what this ship did should not continue to exist. That the organisation it represented should not be remembered as capable of this.

He shakes his head slightly.

— If that record exists, it is evidence of something. Someone has decided the evidence is inconvenient.`,
    onEnter: () => { S.setFlag('mission_fully_understood'); S.incrementTheosis(4); },
    choices: [
      { text: '"I\'m not going to do it."',  next: 'mission_refused_miguel', set_flag: 'mission_refused' },
      { text: '"I need to think."',           next: 'act_two_begin'                                       },
    ],
  },

  // ── MESS HALL CHARACTERS ──────────────────────────────────────

  mess_hub: {
    id: 'mess_hub', location: 'Mess Hall', mood: 'neutral',
    text: `The mess hall. The social centre of the ship. The coffee urn is warm. Someone is usually here.`,
    choices: [
      { text: 'Nothing is happening. Sit in it.',
        next: 'mess_ordinary',
        condition: { type: 'and', conditions: [
          { type: 'flag', id: 'act_two_begun' },
          { type: 'not', condition: { type: 'flag', id: 'mess_ordinary_seen' } }
        ]}},
      { text: 'Pavel is at a table with two cups.',            next: 'pavel_riddle_three',
        condition: { type: 'and', conditions: [
          { type: 'flag', id: 'pavel_riddle_two_complete' },
          { type: 'not', condition: { type: 'flag', id: 'pavel_riddle_three' } },
        ]}},
      { text: 'Find Kylie Matterhorn.',  next: 'kylie_first',  condition: { type: 'not', condition: { type: 'flag', id: 'met_kylie'  } } },
      { text: 'Find Connie Frank.',      next: 'connie_first', condition: { type: 'not', condition: { type: 'flag', id: 'met_connie' } } },
      { text: 'Find Nadia.',             next: 'nadia_first',  condition: { type: 'not', condition: { type: 'flag', id: 'met_nadia'  } } },
      { text: 'Find Alexei.',            next: 'alexei_first', condition: { type: 'not', condition: { type: 'flag', id: 'met_alexei' } } },
      { text: 'Go to the main deck.',    next: 'main_deck_hub'                                                                           },
    ],
  },

  // Kylie establishes BACKGROUND through interrogation
  kylie_first: {
    id: 'kylie_first', location: 'Mess Hall', mood: 'neutral', art: 'portrait_kylie',
    text: `Kylie Matterhorn is at the corner of the table with a notebook and the expression of someone either taking notes or performing it. You are not yet sure which.

She looks up immediately when you enter. She has been watching the door.

— Oh, the chaplain. Warm, but structured. — I was hoping we'd run into each other. I'm writing about scientific research in the post-Soviet space. The ship is part of it.

She clicks her pen.

— Where did you train?`,
    onEnter: () => { S.setFlag('met_kylie'); },
    choices: [
      {
        text:      '"Atlantic School of Theology. Halifax."',
        next:      'kylie_background_response',
        set_cover: { key: 'background', value: 'AST Halifax' },
        vigilance: 1,
      },
      {
        text:      '"St. Michael\'s College, Toronto. Theology and philosophy."',
        next:      'kylie_background_response',
        set_cover: { key: 'background', value: "St. Michael's Toronto" },
        vigilance: 1,
      },
      {
        text:      '"I trained informally. Under a chaplain, then on the job."',
        next:      'kylie_background_response',
        set_cover: { key: 'background', value: 'Informal training' },
      },
      {
        text:      'Deflect. Ask about her piece instead.',
        next:      'kylie_deflect',
        vigilance: 1,
      },
    ],
  },

  kylie_background_response: {
    id: 'kylie_background_response', location: 'Mess Hall', mood: 'neutral',
    onEnter: () => {
      if (S.G.cover.background && !S.hasFlag('toast_cover_background')) {
        S.setFlag('toast_cover_background');
        S.showToast('Cover: background established.', 'note');
      }
      // Kylie challenges background on follow-up visit
      if (S.G.cover.background && S.hasFlag('kylie_initial_met') && !S.hasFlag('kylie_challenged')) {
        S.setFlag('kylie_challenged');
        setTimeout(() => S.startCoverChallenge('background'), 400);
      }
    },
    text: `She writes something. Her pen moves in a direction that suggests she found the answer interesting in ways she isn't saying.

— And what brings you on this particular ship?

The follow-up. Expected.`,
    choices: [
      { text: 'Give the honest version of the cover story.',  next: 'kylie_cover_left'  },
      { text: '"Personal reasons." Leave it there.',          next: 'kylie_end_first'   },
      { text: 'Ask her the same question.',                    next: 'kylie_reversal', vigilance: 1 },
    ],
  },

  kylie_cover_left: {
    id: 'kylie_cover_left', location: 'Mess Hall', mood: 'neutral',
    text: `You use the left-behind detail — whatever it is in you that is true and close enough to the cover to read as real. You make it feel personal because it is, partly.

She writes more than she wrote before. A journalist writes more when something feels real.

— I'll probably want to talk more. She says. — I find the role interesting. What it asks of you.

She means this as a compliment. She also means it as a flag.`,
    onEnter: () => {
      S.setFlag('kylie_initial_met');
      // Prompt player to establish 'left' cover field
      if (!S.G.cover.left) { S.setCover('left', 'something unnamed'); }
    },
    choices: [
      { text: '"Any time." And mean it.',  next: 'mess_hub' },
      { text: 'Excuse yourself.',           next: 'mess_hub' },
    ],
  },

  kylie_deflect: {
    id: 'kylie_deflect', location: 'Mess Hall', mood: 'neutral',
    text: `You redirect. She follows — she's practiced at following redirects, which means she's practiced at knowing when one is happening.

She tells you about her piece. Post-Soviet scientific community. Ships, institutions, the way certain knowledge gets preserved or doesn't. Her voice is warm and exactly calibrated.

She watches you listen.

— You're good at making people talk. Is that the chaplain or is that just you?`,
    onEnter: () => { S.applyEffect({ vigilance: 1 }); },
    choices: [
      { text: '"Both, probably."',           next: 'kylie_background_response' },
      { text: '"Mostly the chaplain."',      next: 'kylie_background_response', vigilance: 1 },
    ],
  },

  kylie_reversal: {
    id: 'kylie_reversal', location: 'Mess Hall', mood: 'neutral',
    text: `You ask her the same question. She smiles — a real one, small, acknowledging you've done this.

— Fair. I was told this crossing might be significant. For the piece. Someone thought I should be on this ship when it arrives at its destination.

She doesn't say who told her.

— And you? Same question. Why this ship?`,
    onEnter: () => { S.applyEffect({ vigilance: 1 }); S.setFlag('kylie_told_too'); },
    choices: [
      { text: 'Give her the left-behind detail.',  next: 'kylie_cover_left' },
      { text: '"Personal reasons."',               next: 'kylie_end_first'  },
    ],
  },

  kylie_end_first: {
    id: 'kylie_end_first', location: 'Mess Hall', mood: 'neutral',
    text: `The conversation ends with her nodding in the way that means she will return to this.

She will return to this.`,
    onEnter: () => { S.setFlag('kylie_initial_met'); S.applyEffect({ vigilance: 1 }); },
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  // Connie Frank establishes LEFT through pastoral conversation
  connie_first: {
    id: 'connie_first', location: 'Mess Hall', mood: 'neutral', art: 'portrait_connie',
    text: `Connie Frank has a medical textbook open that she is not reading, and a coffee she is.

She looks up at you with the directness of someone who has spent years assessing people quickly.

— Chaplain. Good. We usually run without one. Fine until it isn't.

She doesn't elaborate on the isn't. She doesn't have to.

— What made you need this particular crossing?`,
    onEnter: () => { S.setFlag('met_connie'); },
    choices: [
      {
        text:      '"Something I left behind. I needed distance from it."',
        next:      'connie_left_response',
        set_cover: { key: 'left', value: 'something left behind' },
        theosis:   1,
      },
      {
        text:      '"A death. I was on duty. I needed the open water."',
        next:      'connie_left_response',
        set_cover: { key: 'left', value: 'a death on duty' },
        theosis:   1,
      },
      {
        text:      '"A person. Someone specific. I don\'t examine it too closely."',
        next:      'connie_left_response',
        set_cover: { key: 'left', value: 'a person' },
      },
      {
        text:      '"I\'d rather ask about your patients. What should I know?"',
        next:      'connie_pastoral',
        requires_charism: 'healer',
      },
    ],
  },

  connie_left_response: {
    id: 'connie_left_response', location: 'Mess Hall', mood: 'neutral',
    onEnter: () => {
      if (S.G.cover.left && !S.hasFlag('toast_cover_left')) {
        S.setFlag('toast_cover_left');
        S.showToast('Cover: left-behind established.', 'note');
      }
    },
    text: `She nods. Not sympathy — recognition. She has heard the shape of this before, in different forms.

— That makes sense. She says.

She closes the textbook.

— Any particular pastoral needs I should know about, from my side?`,
    onEnter: () => { S.modReputation('connie', 1); },
    choices: [
      { text: '"Who should I be watching?"',         next: 'connie_pastoral'  },
      { text: '"How are you, while we\'re at it?"',  next: 'connie_self', requires_charism: 'healer' },
      { text: '"I\'ll find my way. Thank you."',     next: 'mess_hub'         },
    ],
  },

  connie_pastoral: {
    id: 'connie_pastoral', location: 'Mess Hall', mood: 'neutral',
    onEnter: () => {
      if (S.G.cover.posting && !S.hasFlag('connie_posting_challenged')) {
        S.setFlag('connie_posting_challenged');
        setTimeout(() => S.startCoverChallenge('posting'), 600);
      }
    },
    text: `— Nadia is anxious about something. Not medical. Alexei sleeps badly when the anomalies are active — his instruments wake him. Miguel is carrying something.

She closes the textbook.

— Pavel is not a concern from my perspective. Whatever he is, he's healthy.

She looks at you steadily.

— How are you? The chaplain's wellbeing also mattering.`,
    onEnter: () => { S.modReputation('connie', 1); },
    choices: [
      { text: '"Fine. Getting my sea legs."',                            next: 'connie_accepted'                           },
      { text: '"Honestly, I\'m still figuring out what I\'m for here."', next: 'connie_honest', theosis: 1 },
    ],
  },

  connie_accepted: {
    id: 'connie_accepted', location: 'Mess Hall', mood: 'neutral',
    text: `— Fair enough. Door's open if that changes.`,
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  connie_honest: {
    id: 'connie_honest', location: 'Mess Hall', mood: 'neutral',
    onEnter: () => {
      if (S.G.cover.left && !S.hasFlag('left_challenged')) {
        S.setFlag('left_challenged');
        setTimeout(() => S.startCoverChallenge('left'), 500);
      }
    },
    text: `She looks at you for a moment.

— That's the most honest thing anyone's said to me since we left port. She says. — I find that concerning and refreshing in equal measure.

She writes something in a small notebook that is not her medical textbook.

— I'll keep an eye on you too, then.`,
    onEnter: () => { S.modReputation('connie', 2); S.incrementTheosis(2); },
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  connie_self: {
    id: 'connie_self', location: 'Mess Hall', mood: 'neutral',
    text: `— Ship's doctor for seven years. Emergency medicine before that in Montréal. I'm here because I like crossings and the Academy pays well and I'm good at keeping my mouth shut about things that aren't my business.

A pause.

— That last thing being relevant to current circumstances.

She returns to her textbook.`,
    onEnter: () => { S.modReputation('connie', 2); S.setFlag('connie_complicit_hinted'); },
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  // Nadia
  nadia_first: {
    id: 'nadia_first', location: 'Mess Hall', mood: 'neutral', art: 'portrait_nadia',
    text: ``,
    onEnter: () => {
      S.setFlag('met_nadia');
      S.startDialogue([
        { speaker: null, text: 'Nadia is younger than you expected. She has the focused distraction of someone whose mind is elsewhere and is trying to bring it back for social interaction.' },
        { speaker: null, text: 'She smiles when she sees you. A real smile. Quick.' },
        { speaker: 'Nadia', text: "You are the chaplain. I am glad. I did not know we were getting one." },
        { speaker: null, text: 'She returns to her tablet. She is still smiling. She finds this genuinely interesting.' },
      ]);
    },
    choices: [
      { text: '"What are you working on?"',                    next: 'nadia_work'     },
      { text: '"Why are you glad?"',                           next: 'nadia_why_glad' },
      { text: 'Sit with her before asking anything.',          next: 'nadia_sit', theosis: 1, composure: 1 },
    ],
  },

  nadia_why_glad: {
    id: 'nadia_why_glad', location: 'Mess Hall', mood: 'neutral',
    text: `She thinks about it seriously.

— Because something is wrong. Not technically — the science is fine, the ship is working. But something is wrong and I don't know what it is and when something is wrong there should be someone whose job is to be present with that. Even if they can't fix it.

She looks at her hands.

— That's you, right?`,
    onEnter: () => { S.modReputation('nadia', 2); S.incrementTheosis(3); },
    choices: [
      { text: '"Yes. That\'s the job."',              next: 'nadia_work'  },
      { text: '"Tell me what feels wrong."',          next: 'nadia_wrong' },
    ],
  },

  nadia_wrong: {
    id: 'nadia_wrong', location: 'Mess Hall', mood: 'neutral',
    text: `She is quiet for a moment.

— The anomaly is bigger than the charts said. Alexei noticed first. The field is doing something we don't have a model for. The instruments are—

She pauses.

— Singing. That's not a scientific term.

She looks at you.

— And the cargo in the hold. I went down once. The boxes. The labels. And then Othis was there, and the way he looked at me—

She stops.

— I don't know. Something is wrong.`,
    onEnter: () => {
      S.setFlag('nadia_wrong_heard');
      S.modReputation('nadia', 2);
      S.incrementTheosis(2);
    },
    choices: [
      { text: '"I\'ll look into it."',       next: 'main_deck_hub', set_flag: 'solidarity_act_done' },
      { text: '"Thank you for telling me."', next: 'nadia_work', communion: 1                       },
    ],
  },

  nadia_work: {
    id: 'nadia_work', location: 'Mess Hall', mood: 'neutral',
    text: `She tells you about the measurements. The anomaly region ahead. The way the field deviates from the models. The way the deviation pattern is consistent with something large and magnetised below the seafloor.

She finds things. Watching her explain this you see it: she wants to know what is actually there, not what the model predicts.

— The ship is built for this. She says. — That's the extraordinary thing. She's still doing exactly what she was built for.

A pause. Something crosses her face.

— Despite everything.`,
    onEnter: () => { S.setFlag('nadia_work_explained'); S.modReputation('nadia', 1); },
    choices: [
      { text: '"Despite everything?"',   next: 'nadia_wrong'   },
      { text: 'Thank her and go.',        next: 'main_deck_hub' },
    ],
  },

  nadia_sit: {
    id: 'nadia_sit', location: 'Mess Hall', mood: 'neutral',
    text: `You sit with her. She seems relieved — by someone sitting without immediately needing something.

After a while:

— Do you ever have the feeling that something is worth preserving even if you can't explain why? Like the reason isn't logical. The thing is simply clearly worth preserving. The only question is whether you're the person who's going to do it.

She is asking for real.`,
    onEnter: () => { S.incrementTheosis(3); S.applyEffect({ composure: 1 }); },
    choices: [
      { text: '"Yes. Often."',                                 next: 'nadia_why_glad' },
      { text: '"What are you thinking of preserving?"',        next: 'nadia_wrong'    },
    ],
  },

  // Alexei
  alexei_first: {
    id: 'alexei_first', location: 'Mess Hall', mood: 'neutral', art: 'portrait_alexei',
    text: ``,
    onEnter: () => {
      S.setFlag('met_alexei');
      S.startDialogue([
        { speaker: null, text: 'Alexei enters still holding a printout. Lena has already poured him coffee he has not noticed.' },
        { speaker: null, text: 'He notices you instead.' },
        { speaker: 'Alexei', text: 'Ah. The chaplain. Excellent. I have a theological question.' },
        { speaker: null, text: 'He sits down with the urgency of someone who has been saving this.' },
        { speaker: 'Alexei', text: 'How does one reconcile the concept of a field — distributed through space, not a thing but a tendency — with a theology of presence?' },
        { speaker: 'Alexei', text: 'The magnetic field is everywhere — but more in some places than others. Is that a model for how presence works? Is that what you mean by God?' },
      ]);
    },
    choices: [
      { text: 'Engage seriously. Give him a real answer.',      next: 'alexei_theology' , theosis: 2 },
      { text: 'Ask about the anomaly first.',                   next: 'alexei_anomaly'               },
      { text: '"That sounds like process theology."',           next: 'alexei_process',   theosis: 3 },
    ],
  },

  alexei_process: {
    id: 'alexei_process', location: 'Mess Hall', mood: 'neutral',
    text: `— Process theology. He takes out a notebook. — Tell me everything.

You tell him about Whitehead — God not as exception to natural process but as its ground, the lure toward novelty and beauty, the field that makes certain futures more likely without compelling them.

He writes for three minutes straight.

— Yes. He says. — Yes. This is what I meant. The anomaly is God, in this framework. The place where the field is doing something the model doesn't account for. The place where something is calling.

He looks at his printout.

— The anomaly is significantly larger than projected.`,
    onEnter: () => { S.modReputation('alexei', 3); S.incrementTheosis(5); S.setFlag('alexei_process_explained'); },
    choices: [
      { text: '"Tell me about the anomaly."',  next: 'alexei_anomaly' },
      { text: 'Go to the main deck.',          next: 'main_deck_hub'  },
    ],
  },

  alexei_theology: {
    id: 'alexei_theology', location: 'Mess Hall', mood: 'neutral',
    text: `You give him the Palamite answer — the divine energies, distributed through creation, not identical with the divine essence but real and participable. More dense in some places than others. Available through stillness and attention.

He writes. He looks slightly overcome.

— The divine energies. So the anomalies are—

He lands on the word himself.

— Theophanic?

— Something like that.

He writes very fast.`,
    onEnter: () => { S.modReputation('alexei', 3); S.incrementTheosis(4); },
    choices: [
      { text: '"Tell me about the current anomaly."',  next: 'alexei_anomaly' },
      { text: 'Let him sit with it.',                  next: 'mess_hub', theosis: 1 },
    ],
  },

  alexei_anomaly: {
    id: 'alexei_anomaly', location: 'Mess Hall', mood: 'neutral',
    text: `— We're entering an anomaly zone the charts say should be minor. He unfolds the printout. — But the instruments are reading something considerably more significant. The field is rotating locally in a way I've only seen once before, at the Mid-Atlantic Ridge.

He drinks his coffee without noticing.

— The ship is the only instrument that can measure this properly. Any other vessel would corrupt its own readings. This ship doesn't interfere. She's transparent to the field. The instruments show you what's actually there.

He pauses.

— What's actually there is extraordinary.`,
    onEnter: () => {
      S.modReputation('alexei', 2);
      S.setMagneticDeviation(0.3);
      S.setFlag('anomaly_explained');
      S.setFlag('anomaly_first_noticed');
    },
    choices: [
      { text: '"What does it mean — the anomaly being this large?"',  next: 'alexei_anomaly_meaning' },
      { text: 'Go to the main deck.',                                  next: 'main_deck_hub'          },
    ],
  },

  alexei_anomaly_meaning: {
    id: 'alexei_anomaly_meaning', location: 'Mess Hall', mood: 'neutral',
    text: `He is quiet for a moment.

— It means the earth beneath us is doing something significant. Structure, composition, something in the rock that is distorting the field at the surface. Something we didn't know was there.

He rolls up the printout.

— The ship will let us see it clearly. That's what she's for.

He says it quietly:

— If we're allowed to look.`,
    onEnter: () => { S.incrementTheosis(3); S.setFlag('alexei_allowed_said'); },
    choices: [
      { text: '"What do you mean, allowed?"',  next: 'alexei_allowed' },
      { text: 'Go to the main deck.',           next: 'main_deck_hub' },
    ],
  },

  alexei_allowed: {
    id: 'alexei_allowed', location: 'Mess Hall', mood: 'neutral',
    text: `He looks uncomfortable for the first time.

— I'm a meteorologist. Also a geophysicist. I'm here for the science. I don't know what Othis is here for. I don't know exactly what the cargo is. I know Miguel is unhappy about something and Nadia is anxious and Lena keeps doing what Lena does, which is making food and not explaining things.

He stands up.

— I'm going to look at the instruments. Come if you want. There's a porthole in the instrument room — when the deviation is this high you can actually see—

He pauses.

— Well. Come.`,
    onEnter: () => { S.setFlag('alexei_invited'); S.modReputation('alexei', 2); },
    choices: [
      { text: 'Go with him.',       next: 'instrument_room_first' },
      { text: 'Continue exploring.', next: 'main_deck_hub'         },
    ],
  },

  // ── INSTRUMENT ROOM ──────────────────────────────────────────

  instrument_room_first: {
    id: 'instrument_room_first', location: 'Instrument Room', mood: 'uncanny',
    text: `Small. Dense with equipment you understand only in outline. The low hum of measurement.

The porthole faces forward. The bowsprit. Beyond it — a shimmer you would attribute to cold if the cold worked that way.

The instruments are singing. You understand now what the 1957 log meant.

Alexei makes a sound that is probably a scientific observation but comes out as something else.

— She's at the edge of it. Tomorrow we'll be fully in it.

In the far corner: a locked cabinet. The label says, in someone's handwriting: *Mission Documents: Do Not Remove.*`,
    onEnter: () => {
      S.setFlag('instrument_room_visited');
      S.setMagneticDeviation(0.4);
      S.incrementTheosis(3);
    },
    choices: [
      { text: 'Watch the shimmer for a while.',         next: 'instrument_shimmer', theosis: 2 },
      { text: 'Ask Alexei about the locked cabinet.',   next: 'alexei_cabinet'                 },
      { text: 'Note the cabinet. Go back.',             next: 'main_deck_hub'                  },
    ],
  },

  instrument_shimmer: {
    id: 'instrument_shimmer', location: 'Instrument Room', mood: 'uncanny',
    text: `The shimmer is not quite a shimmer. More like the air is being consulted about something and the consultation has made it uncertain about which direction to go.

Alexei is taking notes. Very quiet.

You stand together in the small room with the singing instruments and the uncertain air, and for a while nothing is required except to be there.`,
    onEnter: () => {
      S.incrementTheosis(5);
      S.applyEffect({ composure: 2 });
      S.offerSounding('sounding_history');
      if (S.G.theosis >= 66) S.offerSounding('sounding_sobornost');
    },
    choices: [
      { text: 'Ask about the locked cabinet.',  next: 'alexei_cabinet' },
      { text: 'Return to the main deck.',        next: 'main_deck_hub'  },
    ],
  },

  alexei_cabinet: {
    id: 'alexei_cabinet', location: 'Instrument Room', mood: 'uncanny',
    text: `— I don't know what's in it. Othis put it there on the first day. He has the key. I asked once. He said standard protocol.

He returns to his instruments.

— Whatever it is, it's relevant. He adds. — Given everything else.

You now know: mission documents in a locked cabinet. Othis has the key. Your own sealed envelope is in the case under your bunk. You have not opened it.`,
    onEnter: () => { S.setFlag('cabinet_noted'); S.setFlag('mission_documents_here'); },
    choices: [
      { text: 'Go find Othis.',                            next: 'othis_first'            },
      { text: 'Go open the sealed envelope in your cabin.', next: 'cabin_sealed_envelope'  },
      { text: 'Return to the main deck.',                   next: 'main_deck_hub'          },
    ],
  },

  // Othis
  othis_first: {
    id: 'othis_first', location: 'Hold Access', mood: 'neutral', art: 'portrait_othis',
    text: `Othis Commera is in the corridor outside the hold access, checking something on a clipboard with the concentration of someone either very thorough or very anxious.

He looks up.

— Chaplain. What can I do for you?

The right question to ask a chaplain. He has thought about it.`,
    onEnter: () => { S.setFlag('met_othis'); },
    choices: [
      { text: '"Just exploring. Am I in your way?"',                            next: 'othis_polite'          },
      { text: '"I was looking for the hold. Is this the way?"',                 next: 'othis_hold_ask'        },
      { text: '"You installed the locked cabinet. What\'s in it?"',             next: 'othis_cabinet_direct', vigilance: 1 },
      { text: '"Pastoral concern about the cargo."',                            next: 'othis_pastoral_cargo', requires_charism: 'confessor' },
    ],
  },

  othis_polite: {
    id: 'othis_polite', location: 'Hold Access', mood: 'neutral',
    text: `— Not at all. The hold is restricted to cargo personnel during transit. Standard procedure.

He says *standard procedure* in a way that has been practiced.

— If you need anything, I'm usually in the mess between six and seven.

He returns to his clipboard.`,
    onEnter: () => { S.setFlag('hold_restricted_told'); },
    choices: [
      { text: '"Of course. Thank you."',           next: 'main_deck_hub' },
      { text: '"Has anyone else been down there?"', next: 'othis_others'  },
    ],
  },

  othis_others: {
    id: 'othis_others', location: 'Hold Access', mood: 'neutral',
    text: `— The hold is cargo personnel only during transit.

Same tone. He has heard this question before.

His clipboard goes down a fraction of an inch.`,
    onEnter: () => { S.applyEffect({ vigilance: 1 }); },
    choices: [
      { text: 'Let it go.',       next: 'main_deck_hub' },
    ],
  },

  othis_hold_ask: {
    id: 'othis_hold_ask', location: 'Hold Access', mood: 'neutral',
    text: `— The hold is restricted to cargo personnel during transit.

His voice is level. Practiced.

— Is there something specific I can help you with?

He wants to know why you want in.`,
    onEnter: () => { S.setFlag('hold_restricted_told'); },
    choices: [
      { text: '"No, I was curious. Thank you."',          next: 'main_deck_hub'         },
      { text: '"Pastoral concern about the cargo."',      next: 'othis_pastoral_cargo', requires_charism: 'confessor' },
    ],
  },

  othis_pastoral_cargo: {
    id: 'othis_pastoral_cargo', location: 'Hold Access', mood: 'neutral',
    text: `He looks at you for a moment.

— Pastoral concern. About cargo.

He is not quite sure how to argue with a chaplain expressing pastoral concern. He files this.

— I'll note your interest. The manifest is available on request.

He is giving you more than he wanted to. His face is doing something carefully neutral.`,
    onEnter: () => {
      S.setFlag('othis_manifest_offered');
      if (!S.hasFlag('archive_discovered')) { S.setFlag('archive_discovered'); }
    },
    choices: [
      { text: 'Accept the manifest.',        next: 'chartroom_manifest' },
      { text: '"Thank you. That\'s all."',    next: 'main_deck_hub'      },
    ],
  },

  othis_cabinet_direct: {
    id: 'othis_cabinet_direct', location: 'Hold Access', mood: 'neutral',
    onEnter: () => {
      if (S.G.cover.connection && !S.hasFlag('othis_connection_challenged')) {
        S.setFlag('othis_connection_challenged');
        setTimeout(() => S.startCoverChallenge('connection'), 300);
      }
    },
    text: `He looks at you. Something recalibrates.

— Mission documentation. Standard crossing protocol. Not accessible to non-mission personnel.

You are non-mission personnel, in his understanding.

For now.`,
    onEnter: () => { S.applyEffect({ vigilance: 1 }); S.setFlag('othis_cabinet_pressed'); },
    choices: [
      { text: '"Of course. Thanks."',                  next: 'main_deck_hub'         },
      { text: 'Go open your own sealed envelope.',      next: 'cabin_sealed_envelope' },
    ],
  },

  // ── SEALED ENVELOPE — END OF ACT ONE ─────────────────────────

  cabin_sealed_envelope: {
    id: 'cabin_sealed_envelope', location: 'Cabin', mood: 'uncanny',
    text: `The envelope is in the case under the bunk.

You hold it for a moment. You know, already, what kind of instructions are on it. The manifest. The archive. The boxes labelled with years. The photograph of a young man laughing on a bowsprit.

You open it anyway.`,
    onEnter: () => { S.setFlag('sealed_envelope_opened'); },
    choices: [
      { text: 'Read the instructions.', next: 'act_one_ending' },
    ],
  },

  act_one_ending: {
    id: 'act_one_ending', location: 'Cabin', mood: 'uncanny',
    text: `Two pages.

One operational. What to do, when, how to access the hold, what materials to use.

One justificatory. Why the archive is a problem, phrased in language about historical accuracy and institutional reputation and moving forward.

The ship being moved forward from: this ship.
The history being moved forward from: thirty years of measurement and discovery, shared across borders, celebrated internationally.

Outside: the sea. The anomaly.

Somewhere on the foredeck, probably, Pavel.

Day One is ending.`,
    onEnter: () => {
      S.setFlag('mission_orders_read');
      S.setFlag('mission_reality_known');
      S.incrementTheosis(3);
      S.showToast('Act One: The Waking', 'note');
    },
    choices: [
      { text: 'Continue the crossing.', next: 'act_two_begin' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // ACT TWO — THE CROSSING
  // ─────────────────────────────────────────────────────────────

  act_two_begin: {
    id: 'act_two_begin', location: 'Main Deck — Day Two', mood: 'neutral',
    text: `Day Two.

The anomaly deepened overnight. Alexei reported it at breakfast, reading from a printout, his voice steady in the way that steady voices are when the speaker is deciding not to be otherwise.

The sea is the same sea. The ship is the same ship. Pavel is on the foredeck. Haircut is on the bridge. Freezer Beef is below, presumably, with thirty years of magnetic measurements.

Sunday is in two days.

You have not decided what you are going to do.`,
    onEnter: () => {
      S.setMagneticDeviation(0.5);
      S.setFlag('act_two_begun');
    },
    choices: [
      { text: 'The anomaly woke everyone. Go to the instrument room.', next: 'anomaly_peak_instruments', condition: { type: 'flag', id: 'anomaly_explained' } },
      { text: 'The anomaly. Something is happening.',                   next: 'anomaly_peak',            condition: { type: 'not', condition: { type: 'flag', id: 'anomaly_peak_occurred' } } },
      { text: 'Find Pavel.',                                             next: 'act_two_pavel'    },
      { text: 'Find Miguel.',                                            next: 'act_two_miguel'   },
      { text: 'Go to the hold.',                                         next: 'act_two_hold_sit', theosis: 3 },
      { text: 'Find the radio.',                                         next: 'radio_discovery',  condition: { type: 'flag', id: 'radio_existence_known' } },
      { text: 'Othis is waiting in the corridor.',                       next: 'othis_confrontation', condition: { type: 'and', conditions: [{ type: 'flag', id: 'archive_discovered' }, { type: 'not', condition: { type: 'flag', id: 'othis_confrontation_happened' } }] } },
      { text: 'Sunday — lead the service.',                              tags: ['pastoral', 'solidarity', 'sobornost'], next: 'sunday_service_begin',      condition: { type: 'not', condition: { type: 'flag', id: 'sunday_service_started' } } },
      { text: 'After the service.',                                            next: 'sunday_service_aftermath',  condition: { type: 'and', conditions: [{ type: 'flag', id: 'sunday_service_led' }, { type: 'not', condition: { type: 'flag', id: 'sunday_aftermath_seen' } }] } },
      { text: 'Main deck.',                                              next: 'main_deck_hub' },
      { text: 'The brass wants polishing. The bilge wants checking.',       next: 'ship_maintenance',      condition: { type: 'not', condition: { type: 'flag', id: 'maintenance_done' } } },
      { text: 'Alexei has charts spread across the table.',                 next: 'anomaly_diagnosis',     condition: { type: 'flag', id: 'anomaly_first_noticed' } },
      { text: 'Alexei said something.',                                        next: 'alexei_bad_joke',       condition: { type: 'and', conditions: [{ type: 'flag', id: 'met_alexei' }, { type: 'not', condition: { type: 'flag', id: 'alexei_joke_seen' } }] } },
      { text: 'Nadia is at the rail.',                                         next: 'nadia_seasick',         condition: { type: 'and', conditions: [{ type: 'flag', id: 'met_nadia' }, { type: 'not', condition: { type: 'flag', id: 'nadia_seasick_seen' } }] } },
      { text: 'Alexei at the porthole. Something is on his mind.',             next: 'alexei_doubt',          condition: { type: 'and', conditions: [{ type: 'flag', id: 'anomaly_archive_connected' }, { type: 'not', condition: { type: 'flag', id: 'alexei_doubt_seen' } }] } },
      { text: 'Othis is in the corridor with the manifest.',                   next: 'othis_filing',          condition: { type: 'and', conditions: [{ type: 'flag', id: 'othis_confrontation_happened' }, { type: 'not', condition: { type: 'flag', id: 'othis_corrected_manifest' } }] } },
      { text: 'Kylie wants to say something.',                                 next: 'kylie_also_reporting',  condition: { type: 'and', conditions: [{ type: 'flag', id: 'kylie_in_alliance' }, { type: 'not', condition: { type: 'flag', id: 'kylie_second_report_known' } }] } },
      { text: 'Miguel. Something is different.',                               next: 'miguel_intermediate',   condition: { type: 'and', conditions: [{ type: 'flag', id: 'hold_visited' }, { type: 'not', condition: { type: 'flag', id: 'miguel_irina_told' } }] } },
      { text: 'Someone in the mess hall. He has been there a while.',       next: 'oblong_first',          condition: { type: 'not', condition: { type: 'flag', id: 'met_oblong' } } },
      { text: 'Kylie is waiting.',                                           next: 'kylie_act_two',         condition: { type: 'and', conditions: [{ type: 'flag', id: 'kylie_initial_met' }, { type: 'not', condition: { type: 'flag', id: 'kylie_act_two_confronted' } }] } },
      { text: 'Pavel says something that stops you.',                         next: 'pavel_past_story',      condition: { type: 'and', conditions: [{ type: 'flag', id: 'met_pavel' }, { type: 'not', condition: { type: 'flag', id: 'pavel_past_told' } }] } },
      { text: 'Something has happened to the cover.',                         next: 'cover_identity_crisis', condition: { type: 'and', conditions: [{ type: 'or', conditions: [{ type: 'flag', id: 'anomaly_peak_occurred' }, { type: 'stat', stat: 'doubt', min: 7 }] }, { type: 'theosis', min: 45 }, { type: 'not', condition: { type: 'flag', id: 'cover_crisis_resolved' } }] } },
      { text: 'After the service.',                                            next: 'sunday_congregation',   condition: { type: 'and', conditions: [{ type: 'flag', id: 'sunday_service_led' }, { type: 'not', condition: { type: 'flag', id: 'sunday_congregation_seen' } }] } },
      { text: 'Landstorm is on the radio.',                                  next: 'landstorm_radio_call',  condition: { type: 'and', conditions: [{ type: 'flag', id: 'mission_orders_read' }, { type: 'not', condition: { type: 'flag', id: 'landstorm_called' } }] } },
      { text: 'Something below the forward hold.',                           next: 'stink_patrol_encounter', condition: { type: 'and', conditions: [{ type: 'flag', id: 'hold_visited' }, { type: 'not', condition: { type: 'flag', id: 'stink_patrol_encountered' } }] } },
      { text: "Connie needs you. Alexei's cabin.",                          next: 'connie_emergency',      condition: { type: 'and', conditions: [{ type: 'flag', id: 'anomaly_peak_occurred' }, { type: 'not', condition: { type: 'flag', id: 'connie_emergency_happened' } }] } },
    ],
  },



  // ── ACT TWO: THE CROSSING ──────────────────────────────────────
  // Sequence 1: Anomaly Peak
  // Sequence 2: Radio Discovery
  // Sequence 3: Confrontation with Othis
  // Sequence 4: Sunday Service
  // ──────────────────────────────────────────────────────────────

  // ── ANOMALY PEAK ────────────────────────────────────────────────

  anomaly_peak: {
    id: 'anomaly_peak', location: 'Main Deck — Night', mood: 'uncanny',
    text: `It happens at 2am.

The ship shudders — not a wave, not a structural complaint. Something else. The kind of shudder that happens in the field, not in the hull.

Alexei comes up from below with a printout in his hand and the expression of someone who has been waiting for this for thirty years and is not sure what to do now that it has arrived.

— The deviation is at maximum. He says. — The instruments are reading the bottom.

The bottom is four thousand metres down. The instruments are not supposed to read that far.`,
    onEnter: () => {
      S.setMagneticDeviation(0.85);
      S.setFlag('anomaly_peak_occurred');
      S.playSfx('anomaly_drone');
      S.incrementTheosis(4);
      S.showToast('The anomaly peaks.', 'theosis');
    },
    choices: [
      { text: 'Go to the instrument room. See what she is reading.', next: 'anomaly_peak_instruments' },
      { text: 'Find Pavel. He will know what to make of it.',        next: 'anomaly_peak_pavel'       },
      { text: 'Go to the hold. Be with the archive.',                 next: 'anomaly_peak_hold', theosis: 3 },
    ],
  },

  anomaly_peak_instruments: {
    id: 'anomaly_peak_instruments', location: 'Instrument Room', mood: 'uncanny',
    art: 'portrait_alexei',
    text: `The instruments are singing in a way that has stopped being a metaphor.

Every magnetometer is maxed out. The deviation chart has gone off the edge of the display and Alexei has taped a piece of paper to the wall to continue it by hand. His handwriting is very small and very precise.

— Four thousand metres down. He says, not looking up. — Something large. Something very old. Something that has been down there a long time and is — He pauses. — Participating.

Outside the porthole, the sea has a quality. Not glow, exactly. More as though it knows it is being looked at.

Nadia arrives behind you. She is holding her tablet. On the screen: a sonar image, depth-coloured. In the middle of it, something enormous that wasn't in yesterday's charts.`,
    onEnter: () => { S.incrementTheosis(5); S.setFlag('anomaly_instruments_seen'); S.unlockCodexEntry('codex_magnetic_anomaly'); },
    choices: [
      { text: 'Look at the sonar image with Nadia.',                      next: 'anomaly_nadia_sonar' },
      { text: 'Ask Alexei what he thinks it is.',                          next: 'anomaly_alexei_theory' },
      { text: 'Go to the hold. The archive should witness this too.',      next: 'anomaly_peak_hold', theosis: 2 },
    ],
  },

  anomaly_nadia_sonar: {
    id: 'anomaly_nadia_sonar', location: 'Instrument Room', mood: 'uncanny',
    art: 'portrait_nadia',
    text: `The sonar image: a shape at depth, irregular, enormous. Hard to scale without reference — Nadia has added one. At the current reading, the structure would be several kilometres across at its widest point.

— It's not geology. She says. — The geometry is wrong for geology. There is — She turns the tablet. — Regularity. Not in the way crystals are regular. In the way — She stops.

She does not say the next sentence. She writes it on her notepad instead and shows it to you.

*In the way things are regular when someone built them.*

You look at her. She looks at the screen. She has been a scientist for seven years and she is keeping her scientist voice on as carefully as you are keeping your chaplain voice on.

The ship moves. The instruments sing.`,
    onEnter: () => {
      S.incrementTheosis(6);
      S.setFlag('nadia_sonar_seen');
      S.applyEffect({ communion: 1 });
      S.modReputation('nadia', 3);
      S.showToast('Something is found.', 'theosis');
    },
    choices: [
      { text: 'Put a hand on her shoulder. Say nothing.',  next: 'anomaly_nadia_solidarity', theosis: 3, communion: 1,
        condition: { type: 'not', condition: { type: 'flag', id: 'nadia_solidarity_act' } } },
      { text: '"Have you told Alexei?"',                   next: 'anomaly_alexei_theory',
        condition: { type: 'not', condition: { type: 'flag', id: 'nadia_solidarity_act' } } },
      { text: 'Go find the radio.',                        next: 'radio_discovery', requires_flag: 'radio_existence_known' },
      { text: 'Go to the hold.',                           next: 'anomaly_peak_hold' },
    ],
  },

  anomaly_nadia_solidarity: {
    id: 'anomaly_nadia_solidarity', location: 'Instrument Room', mood: 'uncanny',
    text: `She doesn't move. She stays looking at the screen. But something in her breathing changes.

After a while she says:

— I got into this because I wanted to know what's actually there. Not what the model says. What's actually there.

She closes the image.

— Someone should know. She says. — What we found. Not just us. Someone should know.

She means something specific by this. She is not looking at you when she says it, which means she is trusting you to understand it without being asked.

She goes back to her measurements.

Alexei is still at the hand-drawn chart, extending the deviation curve into territory that doesn't have a scale yet.`,
    onEnter: () => {
      S.incrementTheosis(5);
      S.modReputation('nadia', 4);
            S.recordNpcMemory('nadia', 'stood with her at the sonar');
S.setFlag('nadia_solidarity_act');
      S.setFlag('solidarity_act_done');
      S.offerSounding('sounding_solidarity');
    },
    choices: [
      { text: 'Go find the radio.',             next: 'radio_discovery', requires_flag: 'radio_existence_known' },
      { text: 'Go find Miguel.',                 next: 'act_two_miguel' },
      { text: 'Sit in the hold with the archive.', next: 'anomaly_peak_hold', theosis: 2 },
    ],
  },

  anomaly_alexei_theory: {
    id: 'anomaly_alexei_theory', location: 'Instrument Room', mood: 'uncanny',
    art: 'portrait_alexei',
    text: `— What do I think it is? He says this without turning from his chart. — I think it is a deviation anomaly of unprecedented scale and I think the instruments are functioning correctly and I think —

He stops.

He turns around.

— I think the ship is the only thing on earth right now that could read this without distorting it. He says. — And I think someone is trying to ensure that can never happen again.

He looks at the chart. He looks at you.

— You know what I mean. He says. It is not a question.`,
    onEnter: () => {
      S.incrementTheosis(4);
      S.modReputation('alexei', 3);
      S.setFlag('alexei_knows_mission');
      if (!S.hasFlag('mission_reality_known')) S.setFlag('mission_reality_known');
    },
    choices: [
      { text: '"Yes. I know what you mean."',         next: 'act_two_resolve', set_flag: 'mission_refused' },
      { text: 'Say nothing. Let it sit.',             next: 'anomaly_peak_hold', theosis: 1 },
      { text: 'Go find the radio.',                   next: 'radio_discovery', requires_flag: 'radio_existence_known' },
    ],
  },

  anomaly_peak_pavel: {
    id: 'anomaly_peak_pavel', location: 'Foredeck', mood: 'uncanny',
    art: 'portrait_pavel',
    text: `He is on the foredeck in the dark. He has been there for some time — his jacket is soaked through with spray and he hasn't noticed.

He is not talking for once. He is just standing.

When you come up beside him, he says:

— There it is.

He means the sea. The particular quality of it. The shimmer that is not a shimmer.

— When I was in prison, He says, — I had a cell that faced east. For three years I watched a patch of wall where the dawn came through a gap in the window frame. Three inches wide. Every morning for three years. And after a while the wall started to change. Not to glow, exactly. More as though it knew it was being looked at.

He looks at the water.

— This is that. He says. — Whatever it is, it knows.`,
    onEnter: () => { S.incrementTheosis(7); S.setFlag('pavel_anomaly_witnessed'); S.applyEffect({ composure: 1 }); },
    choices: [
      { text: 'Stand with him.',                                    next: 'foredeck_standing', theosis: 3 },
      { text: '"What do we do?"',                                    next: 'pavel_what_to_do' },
      { text: 'Go find the radio.',                                  next: 'radio_discovery', requires_flag: 'radio_existence_known' },
    ],
  },

  foredeck_standing: {
    id: 'foredeck_standing', location: 'Foredeck', mood: 'uncanny',
    get text() {
      const pavLine = S.getCompanionLine && S.getCompanionLine('pavel', 'Foredeck');
      const base = `You stand there.

The sea does what it does. The anomaly does what it does. Haircut appears from somewhere and sits between you, which she does with the authority of someone closing a circuit.

At some point Freezer Beef arrives too, from below — you hear her before you see her, which with Freezer Beef is unusual. She sits on the other side, her salamander-broad face turned toward the water.

The four of you watch the water.

Nothing is resolved. Everything is named.`;
      return pavLine ? base + '\n\n' + pavLine : base;
    },
    onEnter: () => {
      S.incrementTheosis(6);
      S.applyEffect({ composure: 2, communion: 1 });
      S.offerSounding('sounding_crossing');
    },
    choices: [
      { text: 'Go find the radio.',      next: 'radio_discovery', requires_flag: 'radio_existence_known' },
      { text: 'Go to the instrument room.', next: 'anomaly_peak_instruments' },
      { text: 'Go to the hold.',         next: 'anomaly_peak_hold' },
    ],
  },

  pavel_what_to_do: {
    id: 'pavel_what_to_do', location: 'Foredeck', mood: 'uncanny',
    text: `— What do we do? He repeats the question back with genuine curiosity, as if it's a new one. — We witness it. That's what it's asking.

He looks at you.

— What are you going to do? He asks. That is a different question and he is asking it directly.

Something in the foredeck, the spray, the fact that it is 2am and the anomaly is at maximum — something in all of this makes the usual answers feel inadequate.`,
    choices: [
      { text: '"Preserve the record. Whatever it takes."', next: 'act_two_resolve', set_flag: 'mission_refused',
        condition: { type: 'not', condition: { type: 'flag', id: 'mission_accepted' } } },
      { text: '"Going to find the radio."',           next: 'radio_discovery', requires_flag: 'radio_existence_known', set_flag: 'mission_refused',
        condition: { type: 'not', condition: { type: 'flag', id: 'mission_accepted' } } },
      { text: '"Not yet."',                      next: 'act_two_still_deciding',
        condition: { type: 'not', condition: { type: 'flag', id: 'mission_refused' } } },
    ],
  },

  anomaly_peak_hold: {
    id: 'anomaly_peak_hold', location: 'Hold', mood: 'uncanny',
    text: `The hold is different during the anomaly.

The ship moves but the air in the hold does not move with it. Or — the air moves differently. As if the hold has its own tide.

Freezer Beef is on her box. She looks at you, then at the boxes. Then back.

The boxes of the archive. Forty-seven binders. Twelve boxes of photographs. Charts of the sea floor that nobody will ever consult again, unless someone acts.

You sit with them.

Outside, four thousand metres below: something enormous that has been there for a long time and is, by Alexei's account, participating.

The archive breathes. Or the ship does. Or the anomaly.`,
    onEnter: () => {
      S.incrementTheosis(7);
      S.applyEffect({ composure: 2, communion: 2 });
      S.setFlag('hold_anomaly_sat');
      S.offerSounding('sounding_solidarity');
    },
    choices: [
      { text: 'Go find the radio.',              next: 'radio_discovery', requires_flag: 'radio_existence_known' },
      { text: 'Go find Miguel.',                  next: 'act_two_miguel' },
      { text: 'Stay here until dawn.',            next: 'act_two_dawn', theosis: 4 },
    ],
  },

  act_two_dawn: {
    id: 'act_two_dawn', location: 'Hold', mood: 'neutral',
    text: `You stay until the light changes.

The anomaly ebbs a little after 5am — not gone, but lower. More like weather that has passed than weather that has stopped.

Freezer Beef stays on her box. Haircut comes down at some point — you hear her before you see her — and settles near the companionway.

The archive sits in its boxes.

When you go up, the sea is grey and very early and enormous. Miguel is at the wheel. He looks at you but does not ask what you were doing.

He doesn't need to.`,
    onEnter: () => {
      S.incrementTheosis(4);
      S.applyEffect({ composure: 2 });
      S.setMagneticDeviation(0.4);
    },
    choices: [
      { text: 'Find the radio.',    next: 'radio_discovery', requires_flag: 'radio_existence_known' },
      { text: 'Talk to Miguel.',     next: 'act_two_miguel' },
      { text: 'Go to the foredeck.', next: 'main_deck_hub' },
    ],
  },

  // ── RADIO DISCOVERY ─────────────────────────────────────────────

  radio_lore: {
    id: 'radio_lore', location: 'Bridge', mood: 'neutral',
    art: 'portrait_miguel',
    text: `Miguel is quiet for a long time. He adjusts the wheel. He adjusts it back.

— In 1957 the ship was fitted with two radio systems. He says. — The standard one, which is what we use for weather and position. And a second one, installed by the Institute at the request of the scientific team. For communication in high-deviation magnetic fields.

He pauses.

— Standard radio works by keeping the signal clean. The second system works differently. It uses the deviation itself as a carrier. The more distorted the field, the stronger the signal. They built it because they were sailing directly into anomaly zones and needed to be able to call back to shore.

He looks at the horizon.

— The standard radio fails in those zones. The second one is just getting started.

He is telling you this for a reason. He is not saying the reason.

— The Instrument Room. He says. — Behind the starboard panel. Bronze hinge. You would need to know it was there.

He returns to the wheel.

— Now you know.`,
    onEnter: () => {
      if (!S.hasFlag('radio_lore_heard')) {
        S.setFlag('radio_lore_heard');
        S.setFlag('radio_existence_known');
        S.incrementTheosis(3);
        S.modReputation('miguel', 3);
        S.showToast('The radio exists.', 'note');
      }
    },
    choices: [
      { text: 'Go to the instrument room.', next: 'radio_discovery' },
      { text: 'Stay with this for a moment.', next: 'bridge_hub', theosis: 2, composure: 1 },
    ],
  },

  radio_discovery: {
    id: 'radio_discovery', location: 'Instrument Room', mood: 'uncanny',
    text: `Miguel showed you where it was, but finding it is another matter.

It is behind a panel in the instrument room — a panel that looks structural, that is structural, that also happens to swing open on a bronze hinge that has been oiled recently. Inside: equipment from another era. Dials. A frequency selector with Russian labels, or something that reads like Russian. A handset worn smooth.

The radio is warm. Not from use — from proximity to the ship's brass fittings, which have been conducting the anomaly for the past six hours.

Alexei is watching from the doorway. You did not hear him arrive.

— That has been there since 1957. He says. — It was never removed because it was built into the hull and removing it would have compromised the non-magnetic integrity of the vessel.

He pauses.

— Also no one wanted to.`,
    onEnter: () => {
      S.setFlag('radio_found');
      S.updateProgressTracker('tracker_radio', 1);
      S.setFlag('radio_existence_known');
      S.incrementTheosis(4);
      S.unlockCodexEntry('codex_the_dawn');
      S.showToast('The radio.', 'note');
    },
    choices: [
      { text: 'Ask Alexei if it works.',              next: 'radio_works' },
      { text: 'Try the frequency selector.',           next: 'radio_frequency' },
      { text: 'Find Miguel. Tell him what you found.', next: 'act_two_miguel_plan' },
    ],
  },

  radio_works: {
    id: 'radio_works', location: 'Instrument Room', mood: 'uncanny',
    art: 'portrait_alexei',
    text: `— Yes. He says this like it's obvious. — It was built to work in high-deviation magnetic fields. It was built for exactly these conditions. The standard radio is probably struggling right now — the anomaly is disrupting the frequencies. This one is designed to use the deviation rather than fight it.

He comes over and adjusts two dials. The frequency selector moves with a solidity that newer things don't have.

— The question is whether anyone is listening. He says. — On the frequencies it was built for.

He means something by this. He is being careful about what he means.

— There are scientific institutions. He says. — In several countries. That have been looking for evidence of this ship's work for twenty years. They would be monitoring the frequencies.

He steps back.

— That would be the question. Whether to broadcast. And what.`,
    onEnter: () => { S.incrementTheosis(3); S.modReputation('alexei', 4); S.setFlag('radio_works_known'); },
    choices: [
      { text: '"What would you broadcast?"',               next: 'radio_what_to_broadcast' },
      { text: '"Will you help me with this?"',             next: 'radio_what_to_transmit' },
      { text: 'Go find Miguel first.',                     next: 'act_two_miguel_plan' },
    ],
  },

  radio_frequency: {
    id: 'radio_frequency', location: 'Instrument Room', mood: 'uncanny',
    text: `The frequency selector has eight positions. Seven have numbers in a system you don't entirely recognise. The eighth has no number. It has a symbol — a small rendering of the Earth's magnetic field lines, the kind that appears in geophysics textbooks, and beneath it a mark that might be an annotation or might be a date.

You set it to the eighth position.

The radio hums.

Alexei, who has come in without you noticing, says:

— That is the anomaly frequency. He says this with the calm of someone confirming something. — It broadcasts in the same band as the field deviation. Whatever is down there is listening on that frequency.

He does not seem disturbed by this.`,
    onEnter: () => {
      S.incrementTheosis(6);
      S.setFlag('radio_anomaly_frequency');
      S.setFlag('radio_works_known');
      S.showToast('The anomaly frequency.', 'theosis');
    },
    choices: [
      { text: '"What is down there?"',                     next: 'alexei_anomaly_meaning' },
      { text: '"Will you help me broadcast the archive?"', next: 'radio_alexei_helps' },
      { text: 'Go find Miguel.',                           next: 'act_two_miguel_plan' },
    ],
  },

  radio_what_to_broadcast: {
    id: 'radio_what_to_broadcast', location: 'Instrument Room', mood: 'uncanny',
    text: `He thinks about it.

— The archive. He says finally. — The coordinates of everything the ship found. The names of the anomalies. The depths. The dates. The names of the scientists on each voyage. The countries they were from. The fact that all of this was shared, freely, across political lines that at the time were considered uncrossable.

He looks at the radio.

— The fact that a ship built in Finland in 1952 measured the Earth's magnetic field for thirty years on behalf of a scientific institution that no longer exists, and that the measurements were accurate, and that they were given to anyone who needed them, and that the sea is still there and the anomalies are still there and the field is still there.

He pauses.

— That. He says. — All of that.`,
    onEnter: () => { S.incrementTheosis(6); S.modReputation('alexei', 5); S.setFlag('archive_transmission_planned'); },
    choices: [
      { text: '"Yes. Do it."',              next: 'radio_what_to_transmit' },
      { text: 'Go find Miguel first.',         next: 'act_two_miguel_plan' },
    ],
  },

  radio_what_to_transmit: {
    id: 'radio_what_to_transmit', location: 'Instrument Room', mood: 'revelation',
    text: `The radio is warm. The anomaly is at its peak. Alexei has the binders.

Nadia has her recording system. She will describe in words what cannot be sent as images.

There is more material than time. At this deviation level the signal will hold for perhaps four hours. The archive is thirty years. Choices must be made.

What goes first?`,
    choices: [
      {
        text: 'The names. Every scientist who sailed on this ship. Every country. Every year.',
        next: 'radio_alexei_helps',
        set_flag: 'transmitted_names_first',
      },
      {
        text: 'The anomaly coordinates. Every measured deviation. The raw data.',
        next: 'radio_alexei_helps',
        set_flag: 'transmitted_data_first',
      },
      {
        text: 'The photographs. Nadia will describe them. Faces belong in the record.',
        next: 'radio_alexei_helps',
        set_flag: 'transmitted_photos_first',
      },
      {
        text: 'All of it. Simultaneously. In whatever order the archive gives it.',
        next: 'radio_alexei_helps',
        set_flag: 'transmitted_all',
        theosis: 2,
      },
    ],
  },

  radio_alexei_helps: {
    id: 'radio_alexei_helps', location: 'Instrument Room', mood: 'revelation',
    text: `— Yes. He says immediately.

He doesn't explain further. He doesn't need to. He begins pulling binders from the stack near the radio — someone has moved them here, at some point, which means someone anticipated this.

Miguel. You know it was Miguel.

Nadia appears in the doorway. She looks at the binders, at the radio, at you.

— Good. She says. And comes in and closes the door.

There are three of you and one radio built for high-deviation magnetic fields and an anomaly at four thousand metres that is, by all current evidence, participating.

This is the moment.`,
    onEnter: () => {
      S.advanceTime(4);
      S.playSfx('transmission');
      S.incrementTheosis(8);
      S.setFlag('radio_team_assembled');
      S.updateProgressTracker('tracker_radio', 1);
      S.setFlag('archive_transmission_planned');
      S.setFlag('mission_refused');
      S.modReputation('alexei', 4);
      S.modReputation('nadia', 4);
      S.flashTheosisLight(0.7, 4000);
      S.showToast('The transmission begins.', 'theosis');
    },
    choices: [
      { text: 'Begin the transmission. Broadcast everything.', next: 'act_two_resolve', flags: ['archive_transmitted', 'mission_refused'] },
    ],
  },

  // ── CONFRONTATION WITH OTHIS ─────────────────────────────────────

  othis_confrontation: {
    id: 'othis_confrontation', location: 'Hold Access', mood: 'tense',
    art: 'portrait_othis',
    text: `He is waiting in the corridor.

He has been in the corridor for some time. He has the clipboard but he is not looking at it.

— Chaplain. He says.

The way he says it has changed. There is something underneath it now.

— You were in the hold. He says. — During the anomaly. And you were in the instrument room. And I have reason to believe the archive has been accessed.

He is looking at you with the complete attention of someone who has decided that politeness has served its purpose.

— The mission is simple. He says. — I don't know why it has become complicated.`,
    onEnter: () => { S.applyEffect({ vigilance: -1, doubt: 2 }); S.setFlag('othis_confrontation_happened'); },
    choices: [
      { text: 'Stay in cover. Deny everything.',                              next: 'othis_deny',        vigilance: 1,
        condition: { type: 'not', condition: { type: 'flag', id: 'othis_confrontation_ended' } } },
      { text: 'Drop cover. Tell him directly.',                               next: 'othis_direct',      communion: 1,
        condition: { type: 'not', condition: { type: 'flag', id: 'othis_confrontation_ended' } } },
      { text: '"The mission has become complicated because it should be."',   next: 'othis_confronted',
        condition: { type: 'not', condition: { type: 'flag', id: 'othis_confrontation_ended' } } },
    ],
  },

  othis_deny: {
    id: 'othis_deny', location: 'Hold Access', mood: 'tense',
    get text() {
      const r = S.performVisibleRoll && S.performVisibleRoll('composure', 11, { isCoverChallenge: true });
      const rollHtml = r && S.visibleRollHtml ? S.visibleRollHtml(r) : '';
      if (r && r.outcome === 'failure') {
        S.degradeCover && S.degradeCover(1);
        return `You hold the cover.\n\n${rollHtml}\n\nThe answer comes out a half-beat off — a phrasing that sounds memorised. Othis writes something longer than usual. He looks at you once before he leaves.`;
      }
      if (r && r.outcome === 'partial') {
        S.applyEffect && S.applyEffect({ composure: -1 });
        return `The cover holds, barely.\n\n${rollHtml}\n\nHe watches you perform it. You can hear the cost in your own voice. He writes something. The field is not closed.`;
      }
      return `The cover holds, barely.\n\n${rollHtml}\n\nHe watches you perform it. He knows he is watching a performance. You know he knows. Neither of you says this.\n\n— I'll need your movements accounted for. He says. — All of them.\n\nHe leaves.\n\nThe cover is thin now. One more pressure and it will not hold.\n\nBehind you, the hold. Inside it, the archive. Somewhere in the instrument room, a radio built for high-deviation magnetic fields.`;
    },
    onEnter: () => { S.degradeCover(2); S.applyEffect({ doubt: 2 }); },
    choices: [
      { text: 'Find the radio. Now. Before he checks.',  next: 'radio_discovery', condition: { type: 'not', condition: { type: 'flag', id: 'radio_found' } } },
      { text: 'Go find Miguel.',                          next: 'act_two_miguel' },
    ],
  },

  othis_direct: {
    id: 'othis_direct', location: 'Hold Access', mood: 'tense',
    text: `You tell him.

Not everything — not the radio, not what you've planned. But enough. That you've read the manifest. That you know what the archive is. That you are not going to destroy it.

He listens. He is very still.

— You understand what you're saying. He says.

— Yes.

— You understand that Landstorm—

— Yes.

A long pause. He looks at the clipboard. He looks at the corridor.

— I have been doing this work for eleven years. He says. — I have never had a reason to stop.

He looks at you.

— I will be in my cabin until morning. He says. — I will not be monitoring the hold.

He leaves.

You stand in the corridor. That was either the hardest or the easiest thing that has happened on this ship.`,
    onEnter: () => {
      S.incrementTheosis(8);
            S.recordNpcMemory('othis', 'told directly — chose not to look');
S.setFlag('othis_turned');
      S.setFlag('mission_refused');
      S.applyEffect({ communion: 3 });
      S.modReputation('othis', 5);
      S.showToast('Something unexpected.', 'theosis');
    },
    choices: [
      { text: 'Find the radio.',    next: 'radio_discovery', condition: { type: 'not', condition: { type: 'flag', id: 'radio_found' } } },
      { text: 'Go find Miguel.',     next: 'act_two_miguel' },
    ],
  },

  othis_confronted: {
    id: 'othis_confronted', location: 'Hold Access', mood: 'tense',
    text: `He looks at you for a long time.

— That's a theological statement. He says finally. — Not a practical one.

— Yes.

He nods. He nods three times, slowly, as if reaching a conclusion.

— Your cover is compromised. He says. — I will be reporting this to Landstorm.

He leaves.

But he does not check the hold.

Later — much later, in another context — you will wonder about that. Whether reporting and checking were always going to be separate actions, or whether you created the space between them.`,
    onEnter: () => {
      S.degradeCover(3);
      S.setFlag('othis_confrontation_ended');
      S.setFlag('mission_refused');
      S.incrementTheosis(5);
    },
    choices: [
      { text: 'Find the radio. While there is time.', next: 'radio_discovery', condition: { type: 'not', condition: { type: 'flag', id: 'radio_found' } } },
      { text: 'Find Miguel.',                          next: 'act_two_miguel' },
    ],
  },

  // ── SUNDAY SERVICE (ACT TWO) ──────────────────────────────────────

  sunday_service_begin: {
    id: 'sunday_service_begin', location: 'Mess Hall — Sunday', mood: 'neutral',
    text: `Day Three. Sunday.

The mess hall has been rearranged. Miguel moved the table last night without being asked. Seven chairs in rough rows. Haircut somewhere toward the back.

You stand at the end that is now the front.

Outside, the anomaly is lower but not gone. The instruments are still reading. Alexei is not in his usual chair — he is here, in the third row, which is not where you expected him.

Nadia is here. Lena is pouring tea for someone she doesn't usually pour tea for. Connie Frank is in the back with the expression of someone who isn't sure why they're here but decided to come anyway.

Othis is not here.

Pavel is near the door. He is letting you start.`,
    onEnter: () => {
      S.setFlag('sunday_service_started');
      S.incrementTheosis(2);
    },
    choices: [
      { text: 'Begin the service.', start_ritual: ['sunday_service', 'sunday_service_begin', 'act_two_begin'] },
    ],
  },

  act_two_pavel: {
    id: 'act_two_pavel', location: 'Foredeck', mood: 'neutral',
    text: `He listens. He doesn't interrupt. This may be the only time.

When you finish, he is quiet.

— Yes. I thought something like this.

He sits on the deck. You sit beside him. The ship moves.

— The question is not what to do. You know what to do. The question is whether you're willing to be the kind of person who does it.

He looks at you.

— Which kind of person are you?`,
    onEnter: () => { S.setFlag('pavel_knows'); S.incrementTheosis(4); },
    choices: [
      { text: '"The kind who preserves the record."',  next: 'act_two_resolve', set_flag: 'mission_refused' },
      { text: '"I don\'t know yet."',                   next: 'act_two_still_deciding'                       },
    ],
  },

  act_two_still_deciding: {
    id: 'act_two_still_deciding', location: 'Foredeck', mood: 'neutral',
    text: `— That's honest. He says. — The crossing is three days. You have time.

He stands. Brushes something off his jacket that may not have been there.

— Don't use the time the way people use it when they already know but want to not-know for a while longer. That's not deciding. It's just expensive.

He goes back to looking at the bowsprit.`,
    choices: [
      { text: 'Continue exploring the ship.', next: 'main_deck_hub' },
    ],
  },

  act_two_miguel: {
    id: 'act_two_miguel', location: 'Bridge', mood: 'neutral',
    text: `Miguel is at the wheel. He looks at you when you come in and you can see, without words, that he has been waiting for this conversation.

You tell him you know. He nods.
You tell him you're not going to do it. He looks at the horizon.

— Good. Now we figure out what we do instead.

He adjusts the wheel.

— The anomaly peaks tomorrow evening. Alexei thinks it's significant. I don't know about significant. I know about timing.`,
    onEnter: () => { S.setFlag('act_two_miguel_knows'); S.setFlag('mission_refused'); },
    choices: [
      { text: 'Ask what he has in mind.', next: 'act_two_miguel_plan' },
      { text: 'Continue exploring.',       next: 'main_deck_hub'      },
    ],
  },

  act_two_miguel_plan: {
    id: 'act_two_miguel_plan', location: 'Bridge', mood: 'neutral',
    text: `— The archive needs to go somewhere. He says. — Not be destroyed. Go somewhere. There are people who would want it. Scientists in Finland. In Germany. People who were on this ship.

He pauses.

— There is a radio in the instrument room that Othis does not know about. Part of the ship's original equipment. It predates the mission by forty years. It does not appear in the current manifest.

He looks at you.

— The anomaly peak tomorrow will disrupt Othis's instruments. Not ours. Ours were built for this.`,
    onEnter: () => { S.setFlag('radio_existence_known'); S.setFlag('act_two_plan_forming'); },
    choices: [
      { text: '"That\'s the plan."',             next: 'act_two_resolve', set_flag: 'mission_refused' },
      { text: '"Tell me more about the radio."', next: 'radio_lore'                                  },
    ],
  },

  act_two_hold_sit: {
    id: 'act_two_hold_sit', location: 'Hold', mood: 'uncanny',
    text: `The anomaly is audible from the hold — not as sound exactly. As a quality of the silence. The silence has a direction.

Freezer Beef is here. He does not seem concerned.

You sit with the boxes. You do not open them. You let them be what they are: thirty years of finding, and someone trying to make that not have happened.

Something in you gets quieter. Then quieter still.`,
    onEnter: () => { S.incrementTheosis(7); S.applyEffect({ composure: 2 }); S.offerSounding('sounding_solidarity'); },
    choices: [
      { text: 'Go find Pavel.',   next: 'act_two_pavel'  },
      { text: 'Go find Miguel.',  next: 'act_two_miguel' },
    ],
  },

  act_two_anomaly: {
    id: 'act_two_anomaly', location: 'Instrument Room', mood: 'uncanny',
    text: `The instruments are fully singing. The shimmer through the porthole is more than a shimmer — the air has a quality that Alexei, writing furiously, calls "coherent deviation pattern indicating sub-surface ferromagnetic structure of unprecedented extent."

You look at the porthole.

The place where the field is distorted. Where something below — in the rock, in the accumulated history of the earth's composition — is pulling the invisible lines of force into a new configuration.

The ship passes through it without distorting it.

Pavel comes in. He stands beside you.

— There.

He doesn't explain what he means by *there.* He doesn't need to.`,
    onEnter: () => {
      S.setMagneticDeviation(0.7);
      S.incrementTheosis(6);
      S.setFlag('anomaly_peak_witnessed');
    },
    choices: [
      { text: 'Stay. Watch.',               next: 'act_two_resolve', theosis: 4 },
      { text: 'Go to the radio. Now.',      next: 'act_two_resolve', set_flag: 'mission_refused' },
    ],
  },



  // ── WITNESSED MODE EXCLUSIVE ─────────────────────────────────────

  stink_patrol_record: {
    id: 'stink_patrol_record', location: 'Below — The Record', mood: 'uncanny',
    text: `[The following is a partial transcript recovered from below the forward hold. The authors are unknown. The document was found sealed in a brass tube of non-magnetic construction, dated to the period of the crossing. Translation is approximate.]

—

Crossing: third day.

The agent-chaplain entered the hold at 23:40. Duration: four hours twelve minutes. Activity: archival. Classification: non-hostile.

Assessment of agent-chaplain: becomes more present as crossing advances. Initially performing function. Currently inhabiting function. Distinction noted.

Assessment of archive: intact. Intact is correct. Previous crossing: archive was intact. Crossing before that: also intact. Pattern noted.

Assessment of anomaly: receiving. This is not a geological term. We use it anyway. The anomaly is receiving the archive's presence as it has received each previous crossing's presence. This is a cumulative process. We measure it. The measurement is consistent.

Recommendation: no intervention required. The ship is doing what the ship does.

Addendum: the calico cat has been spending significant time in the hold. She appears to be in conversation with the archive. We do not record the content of this conversation. Some things are not ours to record.

— The Stink Patrol

[End of document]`,
    condition_to_appear: { type: 'mode', mode: 'witnessed' },
    onEnter: () => {
      S.incrementTheosis(6);
      S.applyEffect({ composure: 2 });
      S.setFlag('stink_patrol_record_seen');
      S.showToast('A record was kept.', 'theosis');
    },
    choices: [
      { text: 'Begin a new crossing.', next: 'crossing_record' },
    ],
  },
  // ── PAVEL'S RIDDLE ───────────────────────────────────────────────
  // Three fragments across foredeck / hold / mess.
  // All three must be witnessed to unlock pavel_revelation.

  pavel_riddle_one: {
    id: 'pavel_riddle_one', location: 'Foredeck', mood: 'neutral',
    text: `Pavel says, not as the beginning of a sentence:

— The ship has made this crossing before.

You look at him.

— I mean that literally. He says. — Not as metaphor. Not as spiritual resonance. Literally: this ship, this route, these coordinates. Before the current arrangement. In different circumstances.

He looks at the water.

— The question is: what does the ship remember from those crossings.

He does not say more. He picks up a piece of rope and does not do anything with it.`,
    onEnter: () => { S.setFlag('pavel_riddle_one'); S.setFlag('pavel_riddle_one_complete'); S.incrementTheosis(2); },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'met_pavel' },
      { type: 'not', condition: { type: 'flag', id: 'pavel_riddle_one' } },
    ]},
    choices: [
      { text: '"What does it remember?"',   next: 'pavel_riddle_one_response' },
      { text: 'Leave it for now.',           next: 'main_deck_hub' },
    ],
  },

  pavel_riddle_one_response: {
    id: 'pavel_riddle_one_response', location: 'Foredeck', mood: 'neutral',
    text: `— I don't know. He says. — That's the first part of the question.

He looks at you.

— The second part is: how would you find out.

He is not being mysterious. He is being precise. These are the actual questions.`,
    choices: [
      { text: 'Go to the hold. Look at the archive.', next: 'main_deck_hub', set_flag: 'pavel_riddle_one_complete' },
      { text: 'Think about it.',                       next: 'main_deck_hub', set_flag: 'pavel_riddle_one_complete' },
    ],
  },

  pavel_riddle_two: {
    id: 'pavel_riddle_two', location: 'Hold', mood: 'uncanny',
    text: `Pavel is in the hold.

This is unexpected. He does not usually come below.

He is looking at the archive boxes with an expression you cannot quite classify. Not recognition exactly. More precise than recognition.

— The binders. He says, without looking at you. — Each one is a record of what the instruments found. Each one is also, if you think about it, a record of the ship being present at a specific location at a specific time.

He looks at one box in particular.

— There are records of anomalies that were measured on previous crossings and then measured again. The same location. Different readings. He says. — The instruments cannot account for the difference.

He finally looks at you.

— What accounts for the difference?`,
    onEnter: () => { S.setFlag('pavel_riddle_two'); S.setFlag('pavel_riddle_two_complete'); S.incrementTheosis(3); },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'pavel_riddle_one_complete' },
      { type: 'flag', id: 'hold_visited' },
      { type: 'not', condition: { type: 'flag', id: 'pavel_riddle_two' } },
    ]},
    choices: [
      { text: '"The ship changed."',                     next: 'pavel_riddle_two_response', set_flag: 'pavel_riddle_ship' },
      { text: '"What the ship was carrying changed."',   next: 'pavel_riddle_two_response', set_flag: 'pavel_riddle_cargo' },
      { text: '"What was looking changed."',             next: 'pavel_riddle_two_response', set_flag: 'pavel_riddle_observer', theosis: 3 },
    ],
  },

  pavel_riddle_two_response: {
    id: 'pavel_riddle_two_response', location: 'Hold', mood: 'uncanny',
    text: `He nods, slowly.

— All three. He says. — Probably. But the third one is the interesting one.

He looks at Freezer Beef.

Freezer Beef looks back.

— Find me in the mess hall. He says. — Later. When you have thought about it more.

He goes up. Freezer Beef watches him go with the expression of someone confirming a hypothesis.`,
    onEnter: () => { S.setFlag('pavel_riddle_two_complete');
      S.updateProgressTracker('tracker_pavel_riddle', 1); },
    choices: [
      { text: 'Think about it.', next: 'main_deck_hub' },
    ],
  },

  pavel_riddle_three: {
    id: 'pavel_riddle_three', location: 'Mess Hall', mood: 'uncanny',
    text: `Pavel is at the table with two cups of coffee, one of which is apparently for you.

You sit.

He does not start with the riddle. He starts with the coffee.

After a while:

— The observer changes what they observe. He says. — This is physics. This is also theology. The question I have been asking is whether the ship, over thirty years of measurement, has been changed by what it measured. And if so—

He looks at his coffee.

— If so, what is it now. After all that. What has it become.

He looks at you.

— And then: what does it mean that we are on it. Now. At the end.`,
    onEnter: () => { S.setFlag('pavel_riddle_three'); S.incrementTheosis(4); },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'pavel_riddle_two_complete' },
      { type: 'not', condition: { type: 'flag', id: 'pavel_riddle_three' } },
    ]},
    choices: [
      { text: '"What has it become?"',         next: 'pavel_revelation', theosis: 2 },
      { text: 'Drink the coffee. Wait.',       next: 'pavel_revelation', theosis: 3, composure: 1 },
    ],
  },

  pavel_revelation: {
    id: 'pavel_revelation', location: 'Mess Hall', mood: 'revelation',
    text: `He sets down his coffee.

— I don't know. He says.

A pause.

— I have been on this ship before. Not in the way that you and I have been on this ship. In earlier crossings. Different forms. Different names. I do not fully remember them, which is consistent with how it works. What I retain is — structural. The shape of the thing. Not the content.

He looks at his hands.

— Each time, something is preserved or destroyed. Each time, the nature of what is preserved or destroyed changes the next crossing slightly. The ship learns, in whatever way ships learn. The anomaly responds to what has come before it. And the person in the chaplain role —

He looks at you.

— The person in the chaplain role arrives closer to understanding it each time. Because something carries across. Not memory. Something more like — orientation. A facing-toward.

He picks up his coffee again.

— I think you are much closer than you were. He says. — That is what I have been watching for.

He drinks. He does not say what happens when you are close enough.`,
    onEnter: () => {
      S.setFlag('pavel_revelation_seen');
      S.updateProgressTracker('tracker_pavel_riddle', 1);
      S.comeToBelieve('crossings_recurse');
      S.incrementTheosis(8);
      S.applyEffect({ composure: 2 });
      S.modStance('pavel', 'trust', 5);
      S.unlockCodexEntry('codex_theosis');
      S.showToast('Something understood.', 'theosis');
    },
    choices: [
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },



  // ═══════════════════════════════════════════════════════════════
  // COVER CHALLENGE OUTCOMES
  // Routed to from dismissCoverChallenge based on field + result.
  // Each field has a success, partial, and failure scene.
  // ═══════════════════════════════════════════════════════════════

  // ── BACKGROUND (Kylie) ──────────────────────────────────────────

  cover_background_success: {
    id: 'cover_background_success', location: 'Mess Hall', mood: 'neutral',
    text: `Kylie writes something. She caps her pen.

— Fine. She says. It carries the tone of someone who expected a different result and is recalibrating.

She moves on. She is already thinking about the next question. The background field is behind you now, at least until she finds a reason to return to it.

The cover held. The cost: she is still watching.`,
    onEnter: () => { S.applyEffect({ vigilance: 1 }); S.modStance('kylie', 'suspicion', -1); },
    choices: [{ text: 'Continue.', next: 'mess_hub' }],
  },

  cover_background_partial: {
    id: 'cover_background_partial', location: 'Mess Hall', mood: 'tense',
    text: `Kylie writes something slowly. She does not cap the pen.

— Mmm. She says. It is a professional sound that means: *I am filing this and I will return to it.*

She asks something else — a practical question, a deflection — and you answer it. But the background question is not resolved. It is deferred. The field is tender now.

The cover held. The cost was composure. And she noticed the cost.`,
    onEnter: () => { S.applyEffect({ composure: -1 }); S.modStance('kylie', 'suspicion', 1); },
    choices: [{ text: 'Continue.', next: 'mess_hub' }],
  },

  cover_background_failure: {
    id: 'cover_background_failure', location: 'Mess Hall', mood: 'tense',
    text: `Kylie writes something quickly. The pen moves faster when she is interested.

— That's an unusual combination. She says. Her tone is still pleasant. She has not changed her posture. None of this is reassuring.

— We can come back to it. She says.

She will.

The background field is no longer secure. She has a thread now and she knows how to pull threads.`,
    onEnter: () => {
      S.degradeCover(1);
      S.modStance('kylie', 'suspicion', 2);
      S.showToast('Background field is under pressure.', 'warning');
    },
    choices: [{ text: 'Continue.', next: 'mess_hub' }],
  },

  // ── POSTING (Connie) ────────────────────────────────────────────

  cover_posting_success: {
    id: 'cover_posting_success', location: 'Mess Hall', mood: 'neutral',
    text: `Connie nods.

She has an MD and she was listening carefully, and the answer was sufficient. Not fully convincing — she has a clinical sense for what fully convincing sounds like and this did not quite reach it — but sufficient.

She returns to her crossword.

The posting field holds. She has not marked it as closed. She has marked it as sufficient for now.`,
    onEnter: () => { S.modStance('connie', 'suspicion', -1); },
    choices: [{ text: 'Continue.', next: 'mess_hub' }],
  },

  cover_posting_partial: {
    id: 'cover_posting_partial', location: 'Mess Hall', mood: 'tense',
    text: `Connie says: — Hm.

She says it with the clinical neutrality of someone who is noting something in a chart they are not going to share.

She moves on. She is professionally done with the question. But the *hm* is in the air and it cost something to put it there.

You are slightly less composed than you were. That is the honest accounting.`,
    onEnter: () => { S.applyEffect({ composure: -1 }); S.modStance('connie', 'suspicion', 1); },
    choices: [{ text: 'Continue.', next: 'mess_hub' }],
  },

  cover_posting_failure: {
    id: 'cover_posting_failure', location: 'Mess Hall', mood: 'tense',
    text: `Connie sets down her pen.

— The protocols you described. She says. — They changed in 2019.

She picks up her pen.

— I'm sure you have more current placements. She says. She is not sure of this. She is noting that she has noticed a specific thing.

She does not pursue it further. She is a doctor on a ship. She keeps her mouth shut about things that are not her business. But she has seen something.

The posting field is under pressure.`,
    onEnter: () => {
      S.degradeCover(1);
      S.modStance('connie', 'suspicion', 2);
      S.showToast('Connie noticed something.', 'warning');
    },
    choices: [{ text: 'Continue.', next: 'mess_hub' }],
  },

  // ── LEFT BEHIND (Connie/Kylie) ──────────────────────────────────

  cover_left_success: {
    id: 'cover_left_success', location: 'Mess Hall', mood: 'neutral',
    text: `She does not push further.

What you said was true enough — or true in the parts that mattered — and she could feel the truth in it even if the shape was not quite right.

She moves on. The left-behind field holds, which means something different for this field than for the others. What you left behind is real. The cover for it might not be.`,
    choices: [{ text: 'Continue.', next: 'mess_hub' }],
  },

  cover_left_partial: {
    id: 'cover_left_partial', location: 'Mess Hall', mood: 'neutral',
    text: `She tilts her head slightly. Something didn't quite land.

— That makes sense. She says. It is the tone of someone for whom it makes sense as a statement and less sense as a complete account.

She does not ask the follow-up. She should ask the follow-up. She has chosen not to.

That choice cost you something. You can feel the composure it took to not-pursue.`,
    onEnter: () => { S.applyEffect({ composure: -1 }); },
    choices: [{ text: 'Continue.', next: 'mess_hub' }],
  },

  cover_left_failure: {
    id: 'cover_left_failure', location: 'Mess Hall', mood: 'tense',
    text: `There is a pause that lasts exactly one beat too long.

She does not fill it. She is waiting to see if you will.

You do not.

— Right. She says, finally. And writes something. The kind of something that gets written when a person is noting that a question was not answered.

The left-behind field is now the field that failed. That is the most personal failure. It cost more than composure.`,
    onEnter: () => {
      S.degradeCover(1);
      S.applyEffect({ doubt: 2 });
      S.showToast('Something real was exposed.', 'warning');
    },
    choices: [{ text: 'Continue.', next: 'mess_hub' }],
  },

  // ── CONNECTION (Othis) ──────────────────────────────────────────

  cover_connection_success: {
    id: 'cover_connection_success', location: 'Hold Access', mood: 'neutral',
    text: `He makes a note on his clipboard. A brief one. He files it in whatever system he uses.

— Fine. He says. He means it as a functional assessment rather than an approval.

He returns to his work. The connection field holds. He has logged it as satisfactory.

The cost: he now has a log entry. That entry will be accurate, which is worse than if it had been wrong.`,
    onEnter: () => { S.modStance('othis', 'suspicion', -1); },
    choices: [{ text: 'Continue.', next: 'main_deck_hub' }],
  },

  cover_connection_partial: {
    id: 'cover_connection_partial', location: 'Hold Access', mood: 'tense',
    text: `He writes something. He crosses something out. He writes it again differently.

— Your contact. He says. — I may need to verify that later.

He means it procedurally. He does not mean it as a threat. The procedural meaning is worse.

The connection field is under observation. He has not raised it — he has scheduled it.`,
    onEnter: () => { S.applyEffect({ composure: -1 }); S.modStance('othis', 'suspicion', 1); },
    choices: [{ text: 'Continue.', next: 'main_deck_hub' }],
  },

  cover_connection_failure: {
    id: 'cover_connection_failure', location: 'Hold Access', mood: 'tense',
    text: `He looks up from the clipboard.

— That name. He says. — Is not in the current directory.

He writes something.

— I will need to confirm independently. He says.

He is not accusing you. He is being procedurally correct. The procedure is very bad for you.

He continues down the corridor. The connection field has failed. He is filing a note. Landstorm will see the note.`,
    onEnter: () => {
      S.degradeCover(2);
      S.modStance('othis', 'suspicion', 3);
      S.modShipState('paranoia', 2);
      S.showToast('Othis is filing a note.', 'warning');
    },
    choices: [{ text: 'Continue.', next: 'main_deck_hub' }],
  },

  // ═══════════════════════════════════════════════════════════════
  // SUGGESTIONS 1-10 IMPLEMENTATION
  // ═══════════════════════════════════════════════════════════════

  // ── 1. COMPLINE CONFESSION (Connie, late night) ──────────────────

  compline_connie: {
    id: 'compline_connie', location: "Doctor's Cabin — Compline", mood: 'uncanny',
    art: 'portrait_connie',
    text: `She is awake. She has been awake.

You find her not in the mess but in her cabin, door open, sitting on the bunk with her knees up and a small glass of something she doesn't offer you.

— Come in. She says.

You sit in the chair.

She is quiet for a while. Then:

— I had a patient once. In Montréal. Emergency medicine. She was seventeen. She came in on a Thursday and I fixed what needed fixing and she went home and came back the following Thursday in a worse way.

She looks at the glass.

— The second time I could not fix it. She says. — I mean that technically. The injuries were not fixable. I did everything correctly. It was not enough.

She drinks.

— I have been on ships for seven years. She says. — The sea is not forgiving, but it is consistent. The things that kill you on a ship are straightforward. Physics. Weather. Error. Not — complexity.

She looks at you.

— That is not the only reason. She says. — But it is a reason.

She refills the glass she has not offered you.

— I watched you with Alexei. She says. — The night he was frightened. You did not fix it either. You just stayed until it was less bad.

She looks at the glass.

— I have not been able to do that. She says. — Just stay.

She does not ask you anything. She has told you something instead. This is what she needed from the crossing.`,
    onEnter: () => {
      S.incrementTheosis(7);
      S.modReputation('connie', 5);
      S.modStance('connie', 'trust', 4);
      S.modStance('connie', 'solidarity', 2);
      S.setFlag('compline_connie_seen');
      S.applyEffect({ composure: 2, communion: 2 });
      S.offerSounding('sounding_forgiveness');
    },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'connie_saw_chaplain' },
      { type: 'not', condition: { type: 'flag', id: 'compline_connie_seen' } },
      { type: 'hour_gte', value: 5 },
    ]},
    choices: [
      { text: 'Stay for a while.', next: 'compline_connie_stay', theosis: 3, composure: 1, tags: ['pastoral', 'presence', 'forgiveness'] },
      { text: 'Say something true.',            tags: ['pastoral', 'witness', 'forgiveness'],  tags: ['pastoral', 'forgiveness', 'witness'], next: 'compline_connie_speak' },
    ],
  },

  compline_connie_stay: {
    id: 'compline_connie_stay', location: "Doctor's Cabin — Compline", mood: 'neutral',
    text: `You stay.

She does not say anything more. Neither do you. The anomaly is at its level. The ship moves.

After a while she says: — Thank you.

She means for staying. Not for fixing anything.

You leave when she has fallen asleep in the chair, which she does eventually, the glass held loosely in her hand, and you close the door carefully behind you.`,
    onEnter: () => { S.incrementTheosis(5); S.modReputation('connie', 3); S.modShipState('morale', 2); },
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  compline_connie_speak: {
    id: 'compline_connie_speak', location: "Doctor's Cabin — Compline", mood: 'neutral',
    text: `You tell her something true. Not about the mission. Something from before the ship — something you left behind, in whatever form it actually took.

She listens the way she listens: with her full attention, without performing it.

When you finish she nods once.

— Good. She says. — That is what it is for.

You both sit with that for a while. The chaplain and the doctor, each having given the other something they needed from the crossing.

She refills the glass she has not offered you. Then she offers it.`,
    onEnter: () => {
            S.recordNpcMemory('connie', 'exchanged something real at Compline');
S.incrementTheosis(6);
      S.modReputation('connie', 4);
      S.modStance('connie', 'solidarity', 3);
      S.applyEffect({ doubt: -2, composure: 2 });
    },
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  // ── 2. ANOMALY RETURNS SIGNAL ────────────────────────────────────

  anomaly_returns_signal: {
    id: 'anomaly_returns_signal', location: 'Instrument Room', mood: 'revelation',
    text: `Alexei calls you in at 3am. He does not explain on the radio — he simply says: come now.

The deviation readout shows something that has no geological explanation.

At 00:47, fourteen minutes after the transmission ended, the deviation curve did not recede. It spiked. Not the anomaly peak — something different. A return pattern. The same frequencies, but going in the other direction.

— The field is returning the signal. He says.

He says it very quietly.

— I have read every study of geomagnetic anomaly behaviour. He says. — This pattern does not appear in any of them.

He turns to look at you.

— The anomaly received the transmission. He says. — And it answered.

He turns back to the readout.

— I am not going to say what that means. He says. — I am saying what the instruments show.

The instruments show the field returning the signal.

What it says — what the return pattern means — is not something the instruments can translate.`,
    onEnter: () => {
      S.incrementTheosis(10);
      S.setFlag('anomaly_signal_returned');
      S.comeToBelieve('anomaly_responds');
      S.modReputation('alexei', 4);
      S.modShipState('saturation', 3);
      S.flashTheosisLight(0.8, 6000);
      S.showToast('The field returns the signal.', 'theosis');
    },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'archive_transmitted' },
      { type: 'theosis', min: 66 },
      { type: 'not', condition: { type: 'flag', id: 'anomaly_signal_returned' } },
    ]},
    choices: [
      { text: 'Look at the readout.',                            next: 'anomaly_signal_readout', theosis: 3 },
      { text: 'Ask Alexei what the return pattern looks like.',  next: 'anomaly_signal_pattern' },
    ],
  },

  anomaly_signal_readout: {
    id: 'anomaly_signal_readout', location: 'Instrument Room', mood: 'revelation',
    text: `You stand at the readout.

The return pattern. Thirty years of geomagnetic measurement sent outward on an anomaly carrier frequency. And then this: a deviation curve that cannot be attributed to geology, weather, or instrument error.

The field received what the ship gave it.

The field gave something back.

You do not know what it gave back. The instruments record frequency and intensity. They do not record meaning. That is the gap the theosists have always worked in — between what can be measured and what the measurement participates in.

Alexei is writing very fast.

You are standing in the gap.`,
    onEnter: () => { S.incrementTheosis(6); S.applyEffect({ composure: 3 }); S.offerSounding('sounding_sobornost'); },
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  anomaly_signal_pattern: {
    id: 'anomaly_signal_pattern', location: 'Instrument Room', mood: 'revelation',
    text: `He pulls out a fresh sheet and draws it by hand. The transmission signal going out. Then the return: different amplitude, same carrier frequency, but modulated in a way that looks —

He stops drawing.

— It looks like a response to specific sections. He says. — Not the entire transmission. Specific — He traces sections. — The names. The photographs described by Nadia. The coordinates of this position.

He sets down the pencil.

— It is responding to the parts that are about this location. He says. — As if confirming: yes, here. I am here. I have been here.

He looks at the readout.

— Thirty years the ship measured it. He says very quietly. — Now it measures back.`,
    onEnter: () => {
      S.incrementTheosis(8);
      S.modReputation('alexei', 5);
      S.unlockCodexEntry('codex_magnetic_anomaly');
      S.applyEffect({ composure: 2, communion: 2 });
    },
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  // ── 3. OBLONG VASSILITHUNE DEPARTURE ─────────────────────────────

  oblong_departure: {
    id: 'oblong_departure', location: 'Mess Hall', mood: 'uncanny',
    text: `He is not at the corner table.

This is the first time since the crossing began that the corner table is empty. The chair is pushed in. The carafe is gone. There is no sign that anyone was there, which is consistent with how it looked when he was.

You ask Lena.

— Who? She says.

You describe him.

She thinks about it seriously.

— I don't think I know who you mean. She says. She is not being evasive. She genuinely cannot retrieve the memory. — I have cooked for the same people every day on this crossing.

She returns to the stove.

The corner table is empty. There is no evidence he was ever there except in your memory, which you trust, and in the effect of what he said, which you can still feel.

The carafe is gone. Some things leave no record.`,
    onEnter: () => {
      S.incrementTheosis(5);
      S.setFlag('oblong_departed');
      S.applyEffect({ composure: 1 });
    },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'met_oblong' },
      { type: 'flag', id: 'act_three_begun' },
      { type: 'not', condition: { type: 'flag', id: 'oblong_departed' } },
    ]},
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  // ── 4. NADIA 1978 DISCOVERY ───────────────────────────────────────

  nadia_1978_discovery: {
    id: 'nadia_1978_discovery', location: 'Hold', mood: 'uncanny',
    art: 'portrait_nadia',
    text: `Nadia is on the floor of the hold with a box open in front of her.

She looks up when you come in with the expression of someone who has found something they do not know what to do with.

— 1978. She says. — There is a 1978 binder with measurements that do not correspond to any anomaly in the official record.

She holds it up.

— The position is wrong. She says. — This position does not have a catalogued anomaly. This position is — She checks her tablet. — Four nautical miles from our current position.

She sets the binder down.

— The readings here are significant. She says. — They should have been catalogued. They were not. Either the position is wrong —

She stops.

— Or the anomaly was deliberately not catalogued. She says. — Which means someone decided that this anomaly should not appear in the official record.

She looks at you.

— Do you think they knew? She says. — The scientists in 1978. Do you think they knew what they had found here, and someone above them decided it should not be known?

The binder. The 1978 measurements. The position four nautical miles from where the ship is now.`,
    onEnter: () => {
      S.incrementTheosis(7);
      S.setFlag('nadia_1978_found');
      S.modReputation('nadia', 4);
      S.modStance('nadia', 'trust', 3);
      S.unlockCodexEntry('codex_the_archive');
      S.modShipState('saturation', 2);
    },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'hold_visited' },
      { type: 'flag', id: 'act_two_begun' },
      { type: 'not', condition: { type: 'flag', id: 'nadia_1978_found' } },
    ]},
    choices: [
      { text: '"Yes. I think they knew."',             next: 'nadia_1978_knew', theosis: 3 },
      { text: '"The position might simply be wrong."', next: 'nadia_1978_error' },
      { text: 'Sit with her and the binder.',          next: 'nadia_1978_sit', theosis: 4, composure: 1 },
    ],
  },

  nadia_1978_knew: {
    id: 'nadia_1978_knew', location: 'Hold', mood: 'uncanny',
    text: `She is quiet for a long time.

— Yes. She says finally. — I think so too.

She closes the binder.

— Which means the archive contains not just what the ship found. It contains what someone decided should not be found. And that decision is also in the archive, visible in the gap.

She puts the binder back carefully.

— The absence is also a record. She says. — The gap is evidence.

She stands.

— I need to tell Alexei. She says. — Not right now. Later. After we know what happens with the transmission.

She looks at you.

— We are transmitting it anyway, aren't we. She says.

It is not quite a question.`,
    onEnter: () => {
      S.incrementTheosis(5);
      S.modReputation('nadia', 3);
      S.setFlag('nadia_1978_gap_understood');
      S.comeToBelieve('archive_suppressed');
      S.applyEffect({ communion: 2 });
    },
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  nadia_1978_error: {
    id: 'nadia_1978_error', location: 'Hold', mood: 'neutral',
    text: `She looks at you for a moment.

— Maybe. She says. She does not sound convinced.

She puts the binder away. She is quiet.

— I want you to know I have considered that. She says. — Position error in 1978 instruments was typically under two nautical miles. The discrepancy here is four.

She stands.

— But I will note both possibilities. She says. — That is what scientists do.

She goes. She is already thinking about it differently than you answered.`,
    onEnter: () => { S.applyEffect({ vigilance: 1 }); },
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  nadia_1978_sit: {
    id: 'nadia_1978_sit', location: 'Hold', mood: 'uncanny',
    text: `You sit with her on the hold floor.

She holds the 1978 binder. She does not open it again. She just holds it.

After a while she says: — The people who made these measurements. Some of them are in the photographs. Some of them have names in the logs. They found something and they knew they had found something and someone decided it should not be known.

She sets the binder in her lap.

— I got into science because I wanted to know what is actually there. She says. — Not what is decided to be there.

She looks at the binder.

— This is what it costs. She says. — Knowing what is actually there, when someone needs it not to be.

Freezer Beef arrives from somewhere and sits beside her. Nadia does not look up. But her hand finds the cat.`,
    onEnter: () => {
      S.incrementTheosis(7);
      S.modReputation('nadia', 5);
      S.modStance('nadia', 'solidarity', 3);
      S.applyEffect({ communion: 3 });
      S.offerSounding('sounding_solidarity');
    },
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  // ── 5. LITURGICAL PRESSURE — deadline mechanics ───────────────────

  othis_acts: {
    id: 'othis_acts', location: 'Hold Access', mood: 'tense',
    text: `Othis is at the hold.

Not with the clipboard. Not with the professional manner. With the key.

He has received instructions. You can see this in how he is standing.

— I have been told to proceed. He says. He is looking at the door, not at you.

The window — the time between the second call and this — is closed.

There is still a choice. There is always still a choice. But it is a different kind of choice now. The institutional weight is no longer potential. It is present.`,
    onEnter: () => {
      S.setFlag('othis_acts');
      S.modShipState('paranoia', 3);
      S.applyEffect({ vigilance: 2, doubt: 2 });
      S.showToast('Othis has been instructed.', 'warning');
    },
    choices: [
      { text: 'Step in front of the door.',                         next: 'othis_direct',       communion: 1 },
      { text: 'Tell him who else knows. Name every person.',        next: 'othis_confronted',   vigilance: 1 },
      { text: 'Tell him the archive has already been transmitted.', next: 'othis_confronted', set_flag: 'mission_refused', condition: { type: 'flag', id: 'archive_transmitted' } },
    ],
  },

  // ── 6. PAVEL PAST STORY ──────────────────────────────────────────

  pavel_past_story: {
    id: 'pavel_past_story', location: 'Foredeck', mood: 'neutral',
    art: 'portrait_pavel',
    text: `He is not talking for once.

You come up to the foredeck and he is just standing, looking at the water, and for once the speech is not already in progress.

You stand beside him.

After a while he says: — I had a student. This is twelve years ago now. He was seventeen. He was in my class on Soviet history — I was a teacher of history, which is perhaps obvious in retrospect.

He looks at the water.

— He asked a question. The question was: if the official account of an event is false, and you know it is false, and you teach it anyway, what are you doing?

He pauses.

— The honest answer was: I am keeping my job and my apartment and my ability to care for my mother who was ill. He says. — I did not give the honest answer. I gave an answer about complexity and historical perspective that was technically accurate and completely evasive.

He watches the sea.

— He came back the next day. He says. — He had written out the honest answer and he left it on my desk.

He is quiet for a moment.

— That is why I said the things that people didn't want heard. He says. — Because a seventeen-year-old left a piece of paper on my desk that said: this is what you actually meant.

He looks at you.

— The prison was later. The paper was first.`,
    onEnter: () => {
      S.incrementTheosis(7);
      S.setFlag('pavel_past_told');
      S.modStance('pavel', 'trust', 3);
      S.modCompanionStat('pavel', 'trust', 3);
      S.modReputation('pavel', 4);
      S.applyEffect({ communion: 2 });
    },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'met_pavel' },
      { type: 'flag', id: 'act_two_begun' },
      { type: 'not', condition: { type: 'flag', id: 'pavel_past_told' } },
    ]},
    choices: [
      { text: '"What did the paper say?"',               next: 'pavel_past_paper', theosis: 2 },
      { text: 'Stay with what he said.',                 next: 'main_deck_hub', theosis: 2, composure: 1 },
    ],
  },

  pavel_past_paper: {
    id: 'pavel_past_paper', location: 'Foredeck', mood: 'neutral',
    text: `— It said: "You know the truth. The cost of saying it is your job and your apartment and your ability to care for your mother. That is a real cost. But it is also a real truth. Which do you want to have been the kind of person who chose?"

He looks at the water.

— Seventeen. He says. — He was seventeen when he wrote that.

He picks up a piece of rope. He does not do anything with it.

— I became the kind of person who chose the truth. Eventually. After a period during which I became neither kind of person, which was worse than either of the clear options.

He sets the rope down.

— The period of being neither kind of person is, I think, what the crossing tax is for. He says. — The fifteen points. The cost of not yet having decided.

He looks at you.

— You are past that point, I think. He says. — You have already decided. You may not have said it aloud yet.`,
    onEnter: () => {
            S.recordNpcMemory('pavel', 'heard the paper on the desk');
S.incrementTheosis(6);
      S.applyEffect({ composure: 2, doubt: -2 });
      S.modStance('pavel', 'solidarity', 2);
    },
    choices: [
      { text: 'Go do what needs doing.', next: 'act_two_resolve', condition: { type: 'flag', id: 'act_three_begun' } },
      { text: 'Go to the main deck.',    next: 'main_deck_hub' },
    ],
  },

  // ── 7. CROSSING TAX AS LIVED EXPERIENCE ──────────────────────────

  crossing_tax_lived: {
    id: 'crossing_tax_lived', location: 'Cabin', mood: 'neutral',
    get text() {
      const lines = [];
      lines.push('The ceiling is close and moving. The long slow roll.');
      if (S.hasMeta && S.hasMeta('reached_restoration')) {
        lines.push('You know what the transmission did. You carried that across.');
      }
      if (S.hasMeta && S.hasMeta('reached_the_knowing')) {
        lines.push('You have been here enough times that the ship feels less like a place you are going and more like a place you are becoming.');
      }
      lines.push('This has happened before. You know this the way you know a room you grew up in.');
      return lines.join('\n\n');
    },
    _unused_text_removed: `REMOVED.

You are awake.

This has happened before. You know this the way you know a room you grew up in — not as information but as something the body holds. The shape of the porthole. The brass fittings. The particular sound of water against this specific hull.

You have been here before.

Not everything carried. You reach for something and find it slightly smaller than you left it — fifteen points gone, the body's portion, paid to the crossing between crossings. The soul has what the soul has. What the body kept is what was most deeply real.

What is still here: the weight of the archive boxes. The quality of Lena's silence. The fact that Alexei smiled at the instruments. The sound of Pavel talking to the bowsprit at 5am.

What is still here: the ship's name in Cyrillic in some part of your thinking that is not quite language.

What is still here: enough.

The letter is on the desk again. Your name is on the envelope. You recognise the handwriting.

The crossing begins.`,
    onEnter: () => {
      S.setFlag('crossing_tax_experienced');
      S.showToast('What remains is what truly became part of you.', 'theosis');
    },
    choices: [
      { text: 'Open the letter.',         next: 'cabin_letter' },
      { text: 'Look through the porthole.', next: 'cabin_porthole' },
      { text: 'Lie still. Remember.',      next: 'cabin_remember', theosis: 2 },
    ],
  },

  // ── 8. COVER IDENTITY CRISIS ─────────────────────────────────────

  cover_identity_crisis: {
    id: 'cover_identity_crisis', location: 'Cabin — Anomaly Peak', mood: 'uncanny',
    text: `You are in the cabin.

The anomaly is at its peak. The instruments are singing. Something below four thousand metres is receiving.

You are sitting on the bunk and you cannot remember which things you believe and which things you were told to say.

The denomination. Is that yours? The posting. The left-behind. The person you said you left behind — was that true? Some of it. Which part? The posting is a lie. The denomination is complicated. The left-behind is real. You can feel the real part. It is slightly different in texture from the rest.

The cover has been performing for long enough that the performance is now in the same room as the thing it was covering and you cannot easily tell which is which.

Freezer Beef is on the bunk beside you. She is watching you with the patience of something that does not distinguish between the performance and the performed.

She puts a paw on your knee.

You know which things you believe. The paw is on your knee and you know. The cover is not gone — it is transparent. You can see through it to the thing it was covering.

The thing it was covering is: a chaplain.

Not performing one. Being one.

The anomaly continues.`,
    onEnter: () => {
      S.incrementTheosis(9);
      S.setFlag('cover_crisis_resolved');
      S.comeToBelieve('chaplain_real');
      S.applyEffect({ doubt: -4, composure: 3 });
      S.modShipState('saturation', 2);
      S.showToast('The cover is transparent now.', 'theosis');
    },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'anomaly_peak_occurred' },
      { type: 'theosis', min: 45 },
      { type: 'not', condition: { type: 'flag', id: 'cover_crisis_resolved' } },
    ]},
    choices: [
      { text: 'Go. Be the chaplain.',      next: 'main_deck_hub', communion: 2 },
      { text: 'Stay with it a moment longer.', next: 'cover_crisis_stay', theosis: 3 },
    ],
  },

  cover_crisis_stay: {
    id: 'cover_crisis_stay', location: 'Cabin — Anomaly Peak', mood: 'uncanny',
    text: `You stay.

Freezer Beef stays too. She settles.

The anomaly does what the anomaly does. The instruments sing. The ship holds her course.

You are: a chaplain on a non-magnetic research schooner in the North Atlantic during a geomagnetic anomaly of unprecedented scale, in possession of an archive that contains thirty years of what this ship found and that someone has decided should not exist.

This is exactly what you are. All of it. Even the parts that started as cover.

The cover has dissolved into the thing it was covering. The thing it was covering has dissolved into the crossing.

The crossing is ending.

Freezer Beef purrs.`,
    onEnter: () => { S.incrementTheosis(5); S.applyEffect({ composure: 2 }); },
    choices: [{ text: 'Go. Be what you are.', next: 'main_deck_hub' }],
  },

  // ── 9. SUNDAY SERVICE CONGREGATION ───────────────────────────────

  sunday_congregation: {
    id: 'sunday_congregation', location: 'Mess Hall — After', mood: 'neutral',
    text: `People are staying.

This is what it looks like when something real happened.

Lena is refilling tea for people who have not asked. She makes eye contact with you once, briefly, which is more than she usually does, and nods. That is all. That is a great deal.

Alexei raises his hand.

— I have a question. He says.

Of course he does.

— The idea of the divine energies as participation — He begins. And then he stops himself. — No. He says. — I want to say something else. I want to say: this was not what I expected from a service on a ship.

He sits with that for a moment.

— In a good way. He adds.

Nadia is crying in the way that is not distress. She is looking at the table. She does not speak. She does not need to. Something is happening inside her that she is being allowed to let happen, which is what the service was for.

Miguel is at the back of the room.

Miguel is never at the back of any room unless he is there deliberately.

He looks at you when he sees you notice him. He does not look away. He nods once — the same nod he gives when the ship has been handled well — and then he turns and goes back to the bridge.

That nod means something specific in Miguel's vocabulary. You are not entirely sure what. Something about the crossing being what a crossing should be.`,
    onEnter: () => {
      S.incrementTheosis(8);
      S.setFlag('sunday_congregation_seen');
      S.modReputation('lena', 3);
      S.modReputation('alexei', 2);
      S.modReputation('nadia', 3);
      S.modReputation('miguel', 4);
      S.modStance('miguel', 'solidarity', 2);
      S.modStance('lena', 'solidarity', 2);
      S.modShipState('morale', 3);
      if (S.G.worldState) S.G.worldState.socialTrust = Math.min(10, (S.G.worldState.socialTrust || 5) + 3);
      S.showToast('Something real happened here.', 'theosis');
    },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'sunday_service_led' },
      { type: 'not', condition: { type: 'flag', id: 'sunday_congregation_seen' } },
    ]},
    choices: [
      { text: 'Stay with the room.',       next: 'sunday_congregation_stay', theosis: 3 },
      { text: 'Go to the main deck.',      next: 'main_deck_hub' },
    ],
  },

  sunday_congregation_stay: {
    id: 'sunday_congregation_stay', location: 'Mess Hall — After', mood: 'neutral',
    text: `You stay.

The conversations happen in small clusters. Alexei and Nadia talk about field theory in a way that is also, somehow, about what was just said in the service. Connie Frank moves to sit beside you. She does not say anything. She has her coffee and you have yours and that is a kind of conversation.

Pavel arrives at some point. He gets tea. He sits in the corner and looks at the room with the expression of someone watching something that was always going to happen finally happening.

Haircut is on the window ledge. She is looking out at the water.

The mess hall is full of people who have, for this hour, stopped performing anything. The ship moves. The anomaly continues its work below.

This is the closest the ship has come, this crossing, to being Заря.`,
    onEnter: () => {
      S.incrementTheosis(6);
      S.applyEffect({ composure: 2, communion: 3 });
      S.modShipState('saturation', 2);
      S.offerSounding('sounding_sobornost');
    },
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  // ── 10. STINK PATROL FAVOUR ──────────────────────────────────────

  stink_patrol_favour: {
    id: 'stink_patrol_favour', location: 'Below — The Hatch', mood: 'uncanny',
    text: `You go below the forward hold. Past the hold. Down to the level that is not on the schematic.

There is a hatch. You knock on it. You are not sure why — you have not thought about this carefully. You have just come here.

The hatch opens.

Warm hands. The same hands Lena described. You can see them but not their owner — it is dark below and the warm air coming up smells of ballast water and something else, something older.

You explain what you need. Not all of it. The part about the boxes. The part about a location that does not exist on any manifest that Othis knows about.

There is a pause.

The hands disappear.

A longer pause.

The hands return. They are holding something — a piece of paper with a position marked. Below the schematic level. A location that is described in terms of the ship's original construction, in measurements from 1952.

You fold it carefully.

The hatch closes.

You do not know what you have done in exchange. You have the strong sense that you have done something. Whatever it is, it has the quality of being exactly proportionate.`,
    onEnter: () => {
      S.incrementTheosis(8);
      S.setFlag('stink_patrol_favour_received');
      S.setFlag('archive_hidden_location');
      S.addItem('stink_patrol_paper');
      S.applyEffect({ communion: 2 });
      S.modShipState('saturation', 2);
      S.showToast('The Stink Patrol has helped.', 'note');
    },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'stink_patrol_hands_known' },
      { type: 'stat', stat: 'communion', min: 6 },
      { type: 'flag', id: 'mission_refused' },
      { type: 'not', condition: { type: 'flag', id: 'stink_patrol_favour_received' } },
    ]},
    choices: [
      { text: 'Go move the archive.',  next: 'hold_first' },
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },



  // ── SCENE POOL: MAIN DECK AMBIENT ────────────────────────────────

  main_deck_haircut: {
    id: 'main_deck_haircut', location: 'Main Deck', mood: 'neutral',
    text: `Haircut is on the bowsprit.

This is not unusual. What is unusual is that she is facing directly forward, into the wind, with the focus of something that has been given a task.

She does not look at you when you come up.

You stand at the rail. The sea. The compass somewhere below you, doing its best.

After a while Haircut turns and walks back along the rail and sits beside you. She looks at the horizon. She looks at you. She looks at the horizon again.

She has done her survey. Whatever she was checking for, she has checked.`,
    onEnter: () => { S.setFlag('main_deck_haircut_seen'); S.incrementTheosis(2); },
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  main_deck_nadia_clouds: {
    id: 'main_deck_nadia_clouds', location: 'Main Deck', mood: 'neutral',
    art: 'portrait_nadia',
    text: `Nadia is on the deck with her tablet and a cloud chart, looking up.

— The cloud formation. She says, not looking at you. — It is not consistent with the weather pattern.

She looks at the chart. She looks at the clouds.

— The clouds above an anomaly sometimes behave differently. She says. — The field affects ionisation. The ionisation affects cloud formation. It is subtle but it is there.

She shows you the cloud chart.

— These clouds. She says. — They are very slightly wrong.

She says it with the satisfaction of someone for whom *slightly wrong* is the most interesting category of observation.`,
    onEnter: () => { S.modReputation('nadia', 1); S.incrementTheosis(2); },
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  main_deck_miguel_adjusts: {
    id: 'main_deck_miguel_adjusts', location: 'Main Deck', mood: 'neutral',
    text: `Miguel is adjusting a line that does not need adjusting.

He adjusts it anyway, with the economy of someone who has found useful work in proximity to the thing he is actually thinking about.

He does not speak. You stand nearby. The ship moves.

After a while he says: — Good weather.

It is. That is what he says about it.

He finishes with the line. He looks at the bow. He goes back to the bridge.

There was something in the pause before *good weather* that meant more than the weather.`,
    onEnter: () => { S.modReputation('miguel', 1); S.incrementTheosis(1); },
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  main_deck_anomaly_sky: {
    id: 'main_deck_anomaly_sky', location: 'Main Deck', mood: 'uncanny',
    text: `The sky at the anomaly position is the same sky.

You look at it anyway, knowing what is below.

The water above the structure is the same water. The birds, when there are birds, do not circle differently. The surface gives nothing away.

Four thousand metres down, something enormous that has been here long enough to have, possibly, opinions about being measured.

Up here: the same sky.

The gap between these two facts is where you have been living for three days.`,
    onEnter: () => { S.incrementTheosis(4); S.applyEffect({ composure: 1 }); },
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  // ── SCENE POOL: FOREDECK AMBIENT ─────────────────────────────────

  foredeck_compass_reading: {
    id: 'foredeck_compass_reading', location: 'Foredeck', mood: 'uncanny',
    text: `There is a compass mounted to the foredeck rail. A small one, for rough orientation.

At this position, it is reading approximately twelve degrees east of true north.

Twelve degrees. The ship was built so that her own construction does not add to the deviation. Everything she carries is chosen for non-magnetic properties. The deviation you are reading is purely from below — from the structure at four thousand metres.

You hold the compass level. Twelve degrees. The needle wants to go home but home has moved.

You understand something about the crossing that you did not have words for before.`,
    onEnter: () => { S.incrementTheosis(5); S.applyEffect({ composure: 1 }); },
    choices: [{ text: 'Go to the foredeck.', next: 'main_deck_hub' }],
  },

  foredeck_cats_together: {
    id: 'foredeck_cats_together', location: 'Foredeck', mood: 'neutral',
    text: `Haircut and Freezer Beef are both on the foredeck.

This is unusual. They do not usually occupy the same space.

They are not interacting. They are each doing their own thing — Haircut facing forward, Freezer Beef arranged in a square — but they have clearly agreed on the foredeck as a shared space for this hour.

You sit between them.

This seems correct to all three of you.

The anomaly continues. The ship holds her course. The cats hold their positions. Whatever they are attending to, they attend to it with full seriousness.`,
    onEnter: () => { S.incrementTheosis(3); S.applyEffect({ composure: 2 }); S.offerSounding('sounding_crossing'); },
    choices: [{ text: 'Go to the foredeck.', next: 'main_deck_hub' }],
  },

  foredeck_pavel_rope: {
    id: 'foredeck_pavel_rope', location: 'Foredeck', mood: 'neutral',
    art: 'portrait_pavel',
    text: `Pavel has a rope.

He has been holding this rope, or a rope very like it, at various points during the crossing. He does not do anything with it. He holds it while he talks. He holds it while he is silent. He holds it now.

You ask him about the rope.

He looks at it as if he had not noticed it was there.

— I don't know. He says. — I think I just like having something to hold.

He looks at it for another moment.

— In prison. He says. — I held whatever was available. A corner of a blanket, usually. It helps.

He sets the rope down.

— Thank you for asking. He says. He means it.`,
    onEnter: () => { S.incrementTheosis(4); S.modReputation('pavel', 2); S.modStance('pavel', 'trust', 1); },
    choices: [{ text: 'Go to the foredeck.', next: 'main_deck_hub' }],
  },

  // ── SCENE POOL: HOLD AMBIENT ──────────────────────────────────────

  hold_freezer_beef_survey: {
    id: 'hold_freezer_beef_survey', location: 'Hold', mood: 'neutral',
    text: `Freezer Beef is doing a survey.

She moves from box to box at a deliberate pace, sniffing or not sniffing, pausing or not pausing, concluding something about each one that she does not share.

You watch.

After she has covered the front half of the hold she sits in the centre and makes a sound that is not a meow exactly — more like a brief declaration.

Then she returns to her box.

The survey is complete. The archive is in satisfactory condition. Freezer Beef will file her report in the usual manner, which is to say she will not file it anywhere and the results will be known only to her.`,
    onEnter: () => { S.incrementTheosis(3); S.applyEffect({ composure: 1 }); },
    choices: [{ text: 'Go back up.', next: 'main_deck_hub' }],
  },

  hold_sounds_below: {
    id: 'hold_sounds_below', location: 'Hold', mood: 'uncanny',
    text: `There is a sound.

Not from the archive boxes. From below. From the level of the ship that is not on the schematic.

It is not a mechanical sound. It is the sound of people who are very competent at something, doing it. A rhythmic working. Steady. Below the ballast.

You have heard this before, when you went to the hatch. But this time you are just standing in the hold and the sound comes up through the deck like: we are here. We are always here. The ship is stable because we are stable.

Freezer Beef does not react. She finds this entirely expected.

So, eventually, do you.`,
    onEnter: () => { S.incrementTheosis(5); S.applyEffect({ composure: 1, communion: 1 }); },
    choices: [{ text: 'Go back up.', next: 'main_deck_hub' }],
  },



  // ── CROSSING RECORD ────────────────────────────────────────────
  // Dénouement screen between ending and new crossing.
  // Rendered by engine's renderCrossingRecord() function.


  // ── STAT-GATED SCENES ────────────────────────────────────────────

  othis_surveillance_noted: {
    id: 'othis_surveillance_noted', location: 'Corridor', mood: 'tense',
    text: `You have been counting.

Othis has walked past the instrument room three times since this morning. Each time he slows at the door. He does not stop. He continues.

This is surveillance that is not yet confrontation. He has a threshold. He is waiting for you to give him reason to cross it.

Your vigilance gives you: until tonight, possibly. The Landstorm call made him more careful. He is building a case rather than acting on one.`,
    onEnter: () => {
      S.setFlag('othis_surveillance_noted');
      S.applyEffect({ vigilance: 1 });
      S.modShipState('paranoia', 1);
    },
    choices: [
      { text: 'Find him. Confront him now.', next: 'othis_confrontation', condition: { type: 'not', condition: { type: 'flag', id: 'othis_confrontation_happened' } } },
      { text: 'Find the radio. Use the time.',  next: 'radio_discovery', condition: { type: 'not', condition: { type: 'flag', id: 'radio_found' } } },
      { text: 'Find Miguel.',                   next: 'act_two_miguel' },
      { text: 'Go to the main deck.',           next: 'main_deck_hub' },
    ],
  },

  landstorm_composure_hold: {
    id: 'landstorm_composure_hold', location: 'Instrument Room', mood: 'tense',
    text: `You do not speak immediately.

You hold the receiver. You breathe. Your composure is the stillness of someone who has learned that the pressure does not always fill the silence — and that the person applying the pressure is also waiting.

After twelve seconds you say:

— The situation is more complex than the briefing suggested. I need more time.

A long pause.

— How much time. He says.

— Twenty-four hours.

He considers. He is not angry. Anger would be unprofessional.

— You have six. He says. And the line goes quiet.

Six hours before he contacts the vessel directly.`,
    onEnter: () => {
      S.setFlag('landstorm_called');
      S.setFlag('landstorm_delayed');
      S.setFlag('landstorm_composure_used');
      S.applyEffect({ composure: 1 });
      S.modShipState('paranoia', 1);
      S.showToast('Six hours.', 'warning');
      S.setDeadline && S.setDeadline('landstorm_pressure', S.G.time.day, (S.G.liturgicalHour||4) + 3, 'othis_acts', { once: true });
    },
    choices: [
      { text: 'Find Miguel.',           next: 'act_two_miguel' },
      { text: 'Find the radio.',        next: 'radio_discovery', condition: { type: 'not', condition: { type: 'flag', id: 'radio_found' } } },
      { text: 'Go to the main deck.',   next: 'main_deck_hub' },
    ],
  },


  // ── PAVEL COMPANION SCENES ───────────────────────────────────────

  // Scene 1: Pavel at the anomaly peak — his theological reading of it
  // Available: companion + trust >= 3 + anomaly_peak_occurred
  pavel_anomaly_theology: {
    id: 'pavel_anomaly_theology', location: 'Foredeck — Anomaly Peak', mood: 'revelation',
    art: 'portrait_pavel',
    text: `He has been at the bow since before the peak.

When you come up he turns, which he does not always do. He looks at you with the expression he gets when he has been saving something.

— I want to tell you what I think it is. He says. — The anomaly.

He turns back to the water.

— Thirty years this ship has been measuring it. Sending instruments down, recording the deviation, doing the work that the ship was built for. Thirty years of attention without distortion. Non-magnetic, so nothing the ship carried could interfere with what was being found.

He is quiet for a moment.

— That is a form of prayer. He says. — I do not mean this metaphorically. I mean that sustained, non-distorting attention toward something real is what prayer actually is. Not the words. The attention.

He looks at the water.

— The anomaly is receiving that. He says. — Thirty years of it. And now it is responding because something about this crossing is different. The archive. The transmission. The fact that we are — He stops. — The fact that we are trying to name it correctly into the world.

He turns to look at you.

— What is correctly named is correctly real. He says. — That is what I think this is.

He goes back to facing the water. He has said what he needed to say.`,
    onEnter: () => {
      S.incrementTheosis(9);
      S.modReputation('pavel', 4);
      S.modCompanionStat('pavel', 'trust', 1);
      S.modStance('pavel', 'trust', 2);
      S.comeToBelieve('anomaly_responds');
      S.setFlag('pavel_anomaly_theology_seen');
      S.flashTheosisLight(0.6, 5000);
      S.showToast('Thirty years of attention.', 'theosis');
    },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'pavel_is_companion' },
      { type: 'flag', id: 'anomaly_peak_occurred' },
      { type: 'not', condition: { type: 'flag', id: 'pavel_anomaly_theology_seen' } },
    ]},
    choices: [
      { text: 'Stand with him at the bow.',         next: 'foredeck_standing', theosis: 4, composure: 2, tags: ['stillness', 'presence'] },
      { text: '"What does it mean that it answers?"', next: 'pavel_anomaly_theology_meaning', theosis: 2 },
    ],
  },

  pavel_anomaly_theology_meaning: {
    id: 'pavel_anomaly_theology_meaning', location: 'Foredeck — Anomaly Peak', mood: 'revelation',
    art: 'portrait_pavel',
    text: `He is quiet for a long time.

— It means the attention was received. He says finally. — Which is what we always hope, with prayer, but cannot usually verify. The instruments in the room below us are currently verifying it.

He looks at the compass in his jacket pocket — he takes it out, holds it level.

— Twelve degrees. He says. He knows this reading by heart now. — The needle wants to go home but home has moved.

He closes the compass.

— What it means is that paying attention to something real, over a long enough time, in a way that is honest and non-distorting — changes the thing being attended to. Or reveals that it was always capable of response.

He puts the compass away.

— Both are the same. He says. — That is the theological statement I am prepared to make.`,
    onEnter: () => {
      S.incrementTheosis(6);
      S.comeToBelieve('energies_real');
      S.applyEffect({ composure: 2 });
    },
    choices: [
      { text: 'Go back down.', next: 'main_deck_hub' },
    ],
  },

  // Scene 2: Pavel present at the transmission
  // Available: companion + trust >= 3 + radio_found + mission_refused
  pavel_at_transmission: {
    id: 'pavel_at_transmission', location: 'Instrument Room — 4am', mood: 'revelation',
    art: 'portrait_pavel',
    text: `He is in the doorway when Alexei starts the transmission.

He didn't ask to be there. He didn't announce himself. He is simply present, the way he is simply present on the foredeck, because the ship is not large and this is where the significant thing is happening.

Alexei works. The radio hums. The deviation holds the carrier frequency.

Pavel does not speak. He watches.

At some point during the transmission he puts his hand on the transmitter housing — not the transmitter itself, just the housing — for perhaps four seconds. Then he removes it. He does not explain this.

When it is done he looks at you.

— Good. He says.

He goes back to the foredeck.

You will remember that he said that.`,
    onEnter: () => {
      S.incrementTheosis(7);
      S.modCompanionStat('pavel', 'trust', 1);
      S.modStance('pavel', 'solidarity', 3);
      S.setFlag('pavel_at_transmission');
      S.applyEffect({ communion: 2 });
      S.offerSounding('sounding_sobornost');
    },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'pavel_is_companion' },
      { type: 'flag', id: 'archive_transmitted' },
      { type: 'not', condition: { type: 'flag', id: 'pavel_at_transmission' } },
    ]},
    choices: [
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  // Scene 3: Pavel as alternative path to Othis confrontation
  // Available: companion + trust >= 4 + othis not yet confronted
  pavel_othis_mediation: {
    id: 'pavel_othis_mediation', location: 'Hold Access', mood: 'tense',
    art: 'portrait_pavel',
    text: `— I know him. Pavel says. — Othis. Not well. From a conference in Oslo, years ago. He was a researcher then. He believed in things.

He looks at the hold door.

— He still believes in things. He says. — That is the problem with people like him. They are doing what they believe in. It makes them hard to argue with by conventional means.

He turns to you.

— But it is possible to remind someone of what they believed before they were given instructions. He says. — If you know them.

He is offering something. He is not certain it will work.

— Let me speak to him first. He says. — Before the confrontation. Before the cover challenge. Let me speak to him as someone who knew him when he was a different kind of person.

He looks at you.

— You should be there. He says. — But let me speak first.`,
    onEnter: () => {
      S.setFlag('pavel_mediation_offered');
      S.modCompanionStat('pavel', 'trust', 1);
    },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'pavel_is_companion' },
      { type: 'not', condition: { type: 'flag', id: 'othis_confrontation_happened' } },
      { type: 'not', condition: { type: 'flag', id: 'pavel_mediation_offered' } },
    ]},
    choices: [
      { text: 'Let him speak first.',           next: 'othis_pavel_approach' },
      { text: 'Confront Othis yourself.',        next: 'othis_confrontation' },
    ],
  },

  othis_pavel_approach: {
    id: 'othis_pavel_approach', location: 'Hold Access', mood: 'tense',
    art: 'portrait_othis',
    text: `Pavel speaks first.

He speaks to Othis the way you speak to someone you knew in a different context — acknowledging the distance between then and now without making it into an accusation. He mentions Oslo. He mentions a paper Othis wrote. He does not pretend they are close.

Othis listens. His clipboard does not go up. This is significant.

Then Pavel says: — The chaplain has something to tell you. And he steps back.

Othis looks at you. He is not closed. He is calculating. He was a researcher once who believed in things. Something of that is visible.

— Go ahead. He says.`,
    onEnter: () => {
      S.setFlag('othis_confrontation_happened');
      S.setFlag('othis_turned');
      S.modStance('othis', 'trust', 3);
      S.modReputation('othis', 3);
      S.degradeCover(-1); // Actually improves cover — Othis is now inside
      S.incrementTheosis(6);
      S.showToast('Othis is listening.', 'note');
    },
    choices: [
      { text: 'Tell him about the archive.',     next: 'othis_direct' },
      { text: 'Tell him what you have refused.', next: 'othis_direct', set_flag: 'mission_refused' },
    ],
  },


  // ── FEATURE 2: 1978 POSITION FORK ───────────────────────────────

  position_1978_attempt: {
    id: 'position_1978_attempt', location: 'Bridge', mood: 'tense',
    art: 'portrait_miguel',
    text: `Miguel looks at the chart. He looks at the position Nadia has marked.

Four nautical miles. In these conditions, with the anomaly at this intensity, possible — but it would cost two hours. The transmission window is already tight.

He looks at you.

— Why. He says. Not a challenge. An actual question.

You tell him about the 1978 binder. The gap in the catalogue. The evidence of a decision made about what should not be found.

He is quiet for a moment.

— Alexei. He calls. — Come look at this.

Alexei comes. He looks at the chart. He looks at the 1978 measurements Nadia has. He is very still.

— That position. He says. — At that position the deviation would be — He calculates. — Significantly higher. He looks at Miguel. — This is where the original anomaly was found. Before they moved the official catalogue entry.

Miguel looks at the wheel. He looks at the chart. He makes a decision.

— Two hours. He says. — We can do it in two hours if the wind holds.`,
    onEnter: () => {
      S.setFlag('position_1978_attempted');
      S.modReputation('miguel', 3);
      S.modReputation('alexei', 3);
      S.modStance('miguel', 'trust', 2);
      S.incrementTheosis(6);
      S.advanceTime(2);
      S.showToast('Miguel turns the wheel. Four nautical miles.', 'note');
    },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'nadia_1978_found' },
      { type: 'flag', id: 'act_three_begun' },
      { type: 'not', condition: { type: 'flag', id: 'position_1978_attempted' } },
    ]},
    choices: [
      { text: 'Four nautical miles north.',  next: 'position_1978_arrival' },
    ],
  },

  position_1978_arrival: {
    id: 'position_1978_arrival', location: 'The 1978 Position', mood: 'revelation',
    text: `The instruments go past their calibrated range at 0.3 nautical miles.

Alexei does not panic. He has been waiting for something like this his whole career. He watches the needles go and goes very still the way scientists go still when what they predicted turns out to be true.

The deviation here is not twelve degrees. It is forty-one.

Nadia is sitting on the deck with her hands flat on the wood, as if the ship itself has something to report.

— This is where the 1978 scientists were. Alexei says. — This is what they found. This is what someone decided the world should not know about.

The instruments are reading something they were not built to read.

The sea at this position is indistinguishable from any other sea. That is the strangest thing.

You transmit from here. The anomaly at forty-one degrees receives the signal immediately. There is no delay. The field here has been waiting.`,
    onEnter: () => {
      S.incrementTheosis(12);
      S.setFlag('position_1978_reached');
      S.setFlag('archive_transmitted');
      S.setMagneticDeviation(0.99);
      S.modShipState('saturation', 5);
      S.comeToBelieve('anomaly_responds');
      S.comeToBelieve('archive_suppressed');
      S.playSfx && S.playSfx('transmission');
      S.playSfx && S.playSfx('anomaly_drone');
      S.flashTheosisLight(1.0, 8000);
      S.unlockMeta('reached_1978_position');
      S.showToast('Forty-one degrees.', 'theosis');
    },
    choices: [
      { text: 'Return to the crossing.', next: 'act_two_resolve' },
    ],
  },

  
  // ── FEATURE 5: ANOMALY GROWS ─────────────────────────────────────

  anomaly_overcalibrated: {
    id: 'anomaly_overcalibrated', location: 'Instrument Room', mood: 'revelation',
    text: `The instruments are reading past their calibration marks.

Alexei stands in front of them with the expression of a person for whom this was theoretically possible and is now actually happening.

— The deviation is exceeding the maximum range of the instruments. He says. — This has not happened before.

He looks at the readings.

— It is increasing faster than in previous crossings. He says. He does not ask how you know about previous crossings. He says it as if you both understand that the situation has been developing over time.

— The field is accumulating something. He says. — Each transmission adds to what the field holds. It is not simply receiving. It is — He pauses. — Storing. Growing.

He writes something. He underlines it.

— The instruments were built for a field of this size. He says. — They were not built for a field of this and growing.`,
    onEnter: () => {
      S.incrementTheosis(10);
      S.modReputation('alexei', 4);
      S.comeToBelieve('anomaly_responds');
      S.setFlag('anomaly_overcalibrated_seen');
      S.setMagneticDeviation(Math.min(1.0, S.getMagneticDeviation() + 0.15));
      S.showToast('The instruments are past their range.', 'theosis');
    },
    condition: { type: 'and', conditions: [
      { type: 'not', condition: { type: 'flag', id: 'anomaly_overcalibrated_seen' } },
    ]},
    choices: [
      { text: 'Ask what it is accumulating.', tags: ['witness', 'crossing', 'memory'], next: 'anomaly_what_accumulates' },
      { text: 'Go to the main deck.',         next: 'main_deck_hub' },
    ],
  },

  anomaly_what_accumulates: {
    id: 'anomaly_what_accumulates', location: 'Instrument Room', mood: 'revelation',
    text: `— Attention. He says. — And the names of the people who paid it. And the record of what the ship found. And the decisions that were made about what to do with it.

He sets down the pencil.

— The field is not geological anymore. He says. — Or it was never only geological. It is — accumulating witness.

He looks at the readout.

— I do not know what it does with witness. He says. — I do not know what kind of a thing accumulates witness. These are not scientific questions I know how to ask.

He picks up the pencil again.

— But the data is the data. He says. — The field is bigger than it was. And it is growing.`,
    onEnter: () => {
      S.incrementTheosis(8);
      S.comeToBelieve('sobornost_real');
      S.applyEffect({ composure: 2 });
    },
    choices: [
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  
  // ── FEATURE 6: LENA'S ARC ────────────────────────────────────────
  // Five fragments, one per crossing. Gated on playCount and hasMeta.
  // Together they answer: who is Lena and what is the ship to her?

  lena_arc_1: {
    id: 'lena_arc_1', location: 'Galley — After Supper', mood: 'neutral',
    art: 'portrait_lena',
    text: `She is cleaning after supper. You are the last one still here.

She says, without looking up:

— First crossing, you said.

— Yes.

She wipes something that is already clean.

— I remember my first crossing. She says. — I was twenty-three. I was terrified of the galley. I had never worked in a commercial kitchen. The previous cook left at two days' notice and I needed the money.

She puts the cloth down.

— I stayed for twenty-two years. She says. — The money was eventually beside the point.

She goes back to the stove.

— The ship decides, she says. Not you. You think you decide. But you come back.`,
    onEnter: () => { S.setFlag('lena_fragment_1_seen'); S.incrementTheosis(5); S.modStance('lena', 'trust', 2); },
    condition: { type: 'and', conditions: [
      { type: 'not', condition: { type: 'flag', id: 'lena_fragment_1_seen' } },
    ]},
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  lena_arc_2: {
    id: 'lena_arc_2', location: 'Galley — Early Morning', mood: 'neutral',
    art: 'portrait_lena',
    text: `She is up before anyone else, which she always is.

She sees you come in and does not look surprised.

— There was a chaplain before. She says. — On the crossing where Micha died.

She pours coffee without being asked.

— Not died. She corrects herself. — Went over. In the night. They never found — She stops. — The chaplain sat with us afterwards. Two hours. He didn't say much. He didn't try to explain.

She hands you the coffee.

— That is what a chaplain is. She says. — Not explanations. Sitting.

She goes back to the stove. She does not say Micha's name again.`,
    onEnter: () => { S.setFlag('lena_fragment_2_seen'); S.incrementTheosis(6); S.modStance('lena', 'trust', 2); S.comeToBelieve('chaplain_real'); },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'lena_fragment_1_seen' },
      { type: 'not', condition: { type: 'flag', id: 'lena_fragment_2_seen' } },
    ]},
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  lena_arc_3: {
    id: 'lena_arc_3', location: 'Galley — After the Service', mood: 'uncanny',
    art: 'portrait_lena',
    text: `She watched the service from the back of the mess.

You did not know she was there until it was over.

— My grandmother was religious. She says. — Not in a way anyone would recognise now. Something older. She talked to the sea.

She makes a sound that might be a laugh.

— I thought she was embarrassing. She says. — I was young. I thought talking to things was embarrassing.

She looks at the porthole.

— The ship talks back. She says. — Not in words. But it does. I have been listening for twenty-two years and I know when it is speaking.

She picks up the cloth again.

— Your service was correct. She says. Meaning: the ship agreed.`,
    onEnter: () => { S.setFlag('lena_fragment_3_seen'); S.incrementTheosis(7); S.modStance('lena', 'solidarity', 3); },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'lena_fragment_2_seen' },
      { type: 'flag', id: 'sunday_service_led' },
      { type: 'not', condition: { type: 'flag', id: 'lena_fragment_3_seen' } },
    ]},
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  lena_arc_4: {
    id: 'lena_arc_4', location: 'Galley — Night', mood: 'uncanny',
    art: 'portrait_lena',
    text: `She is sitting, which she almost never does.

When you come in she looks up. She looks like someone who has been waiting, not for you specifically, but for whoever came.

— Volkov, she says. — I want to tell you about Volkov.

She tells you: he was the cook before her. She took his job when he retired. He left her three things: a notebook of recipes, a key that doesn't fit any door she has ever found, and one piece of advice.

— He said: the ship remembers everyone who sailed on her. He said: you do not need to.

She looks at her hands.

— I have been trying to let her remember for me. She says. — For twenty-two years. Some crossings I can. Some crossings I still try to do it myself.

She stands.

— Volkov sailed in 1972. She says. — He came back. He always came back. The ship decided.`,
    onEnter: () => { S.setFlag('lena_fragment_4_seen'); S.incrementTheosis(8); S.comeToBelieve('ship_remembers'); S.modStance('lena', 'trust', 3); },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'lena_fragment_3_seen' },
      { type: 'not', condition: { type: 'flag', id: 'lena_fragment_4_seen' } },
    ]},
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  lena_arc_5: {
    id: 'lena_arc_5', location: 'Galley — Dawn', mood: 'revelation',
    art: 'portrait_lena',
    text: `The last morning. She is making something elaborate, which she only does on final days.

She says, without preamble:

— I am going to tell you why I stay.

She does not look up from what she is making.

— Not the money. Not the habit. Not because the sea is beautiful, which it sometimes is, and sometimes isn't.

She is quiet for a moment.

— I stay because the ship is doing something real. She says. — Not the research. Well — the research too. But the crossing itself. What happens to people during a crossing. What they find out about themselves. I have watched it for twenty-two years.

She sets something down.

— Chaplain. She says. — I have watched maybe forty chaplains come through. Most of them were here for the money or the posting or the quiet. You are the first one in a long time who was here for the crossing.

She looks at you.

— That is all I wanted to say. She says. And goes back to cooking.`,
    onEnter: () => {
      S.setFlag('lena_fragment_5_seen');
      S.incrementTheosis(10);
      S.modStance('lena', 'solidarity', 4);
      S.modStance('lena', 'trust', 4);
      S.unlockMeta('lena_arc_complete');
      S.showToast('The crossing.', 'theosis');
    },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'lena_fragment_4_seen' },
      { type: 'flag', id: 'act_three_begun' },
      { type: 'not', condition: { type: 'flag', id: 'lena_fragment_5_seen' } },
    ]},
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  
  // ── FEATURE 7: CHARISM COMPOUNDS ─────────────────────────────────

  charism_witness_memory: {
    id: 'charism_witness_memory', location: 'Cabin', mood: 'uncanny',
    text: `On the second morning you find something in the cabin you don't remember placing there.

A piece of paper. Not your handwriting — or not quite your handwriting. Slightly different in pressure.

It says: *I was here. I saw the archive. I sat with Alexei when the instruments frightened him. I refused the mission. The ship is still moving.*

You don't know if you wrote this on a previous crossing and forgot, or if someone else did. The paper is real. The handwriting is close.

You fold it and put it in your pocket.

The ship is still moving.`,
    onEnter: () => {
      S.incrementTheosis(7);
      S.setFlag('charism_witness_memory_seen');
      S.applyEffect({ composure: 2 });
      S.showToast('The ship is still moving.', 'theosis');
    },
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  charism_prophet_pavel: {
    id: 'charism_prophet_pavel', location: 'Foredeck', mood: 'revelation',
    art: 'portrait_pavel',
    text: `Pavel looks at you differently this crossing. From the first moment on the foredeck.

He waits until you are alone.

— You said something last time. He says. — Or someone with your face said something last time.

He does not elaborate on what that means.

— They said: the anomaly receives. They said: the transmission matters. He looks at the water. — I want to know if they were right.

He turns.

— The prophet doesn't know. He says. — That is the thing about prophecy people misunderstand. The prophet says what they see. They don't know if it's true until later.

He looks at you.

— Were they right? He asks. — Was the transmission real?`,
    onEnter: () => {
      S.incrementTheosis(6);
      S.setFlag('charism_prophet_pavel_seen');
      S.modReputation('pavel', 3);
      S.modCompanionStat && S.modCompanionStat('pavel', 'trust', 2);
    },
    choices: [
      { text: '"Yes. The anomaly answered."',  next: 'pavel_ferromagnetic', theosis: 3, come_to_believe: 'anomaly_responds' },
      { text: '"I don\'t know yet."',           next: 'foredeck_standing', theosis: 1 },
    ],
  },

  charism_rememberer_open: {
    id: 'charism_rememberer_open', location: 'Instrument Room', mood: 'revelation',
    text: `The instruments are already reading deviation when you arrive on the first morning.

Alexei is here. He has been here since before dawn.

— It is already at 0.4. He says. — On the first day. He looks at the instruments. — This has not happened before.

He looks at you.

— You have crossed before. He says. It is not a question. He knows. — What was it like at the peak?

You tell him. He listens the way he listens when the instruments are telling him something unexpected — completely, without filtering for what fits.

— Then we are past the beginning. He says. — This crossing starts from where the last one ended.

He turns back to the instruments.

— I think the field remembers us. He says.`,
    onEnter: () => {
      S.incrementTheosis(8);
      S.setFlag('charism_rememberer_open_seen');
      S.setMagneticDeviation(0.4);
      S.comeToBelieve('anomaly_responds');
      S.modReputation('alexei', 3);
    },
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  
  // ── FEATURE 9: STINK PATROL RECURRING ────────────────────────────
  // One gift per crossing from a rotating pool.
  // The gift index cycles via metaUnlocks.stinkGiftIndex.

  stink_patrol_gift: {
    id: 'stink_patrol_gift', location: 'Below — The Hatch', mood: 'uncanny',
    get text() {
      const idx = S.getMetaValue && S.getMetaValue('stinkGiftIndex', 0) % 4;
      const texts = [
        `You go to the hatch. You knock.

The hatch opens. Warm hands. This time they are holding something small: a phrase, written on paper, in a language you do not recognise but whose alphabet looks older than the ship.

Below the phrase, a translation in Russian, in very small letters: *the sea remembers what the shore forgets.*

You fold the paper. You put it in your pocket.

The hatch closes.`,
        `You go to the hatch. You knock.

The hatch opens. Warm hands offer something: a small object. Smooth, dark, shaped like nothing in particular. It is heavier than its size suggests.

You hold it. It is warm.

There is no note. There is no explanation. The object is from below the level of the schematic. It has been there for some time.

The hatch closes.`,
        `You go to the hatch. You knock.

The hatch opens. This time: a fragment of the 1952 construction documentation. A page, in Finnish. One section is highlighted in pencil — old pencil, the lead oxidised to near-invisible.

You cannot read Finnish. But the diagram on the page shows a space in the ship that is not on any manifest you have seen. It is different from the space shown in the paper from last crossing.

The ship is larger than it appears.

The hatch closes.`,
        `You go to the hatch. You knock.

The hatch opens. Nothing comes through. Warm hands are visible, palm up, waiting.

You understand. This crossing they need something from you.

You give them your hand, briefly. They hold it for three seconds. Then they release it.

The hatch closes.

You gave them nothing material. Whatever they needed, you had it.`
      ];
      return texts[idx];
    },
    onEnter: () => {
      S.setFlag('stink_patrol_gift_received');
      S.incrementTheosis(5);
      S.applyEffect({ communion: 2 });
      // Advance gift index for next crossing
      const cur = S.getMetaValue && S.getMetaValue('stinkGiftIndex', 0);
      if (S.G.metaUnlocks) S.G.metaUnlocks.stinkGiftIndex = (cur + 1) % 4;
      S.modShipState('saturation', 2);
    },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'stink_patrol_hands_known' },
      { type: 'not', condition: { type: 'flag', id: 'stink_patrol_gift_received' } },
      { type: 'not', condition: { type: 'flag', id: 'stink_patrol_favour_received' } },
    ]},
    choices: [
      { text: 'Go back up.', next: 'main_deck_hub' },
    ],
  },


  // ── NPC REACTIVE SCENES ──────────────────────────────────────────

  alexei_after_transmission: {
    id: 'alexei_after_transmission', location: 'Instrument Room', mood: 'revelation',
    art: 'portrait_alexei',
    text: `He is in the doorway of the instrument room. Not inside it — the doorway.

He is looking at the radio.

When you come up behind him he does not turn.

— It answered. He says. He is not speaking to you specifically. He is noting it, the way he notes readings.

After a moment:

— I have been running this equipment for eleven years. The deviation log, the readings, the calibration checks. I have measured what is there and written down what I found and sent the reports through the proper channels.

He turns.

— The proper channels. He says. His voice has a quality you have not heard in it before.

— The transmission went out into the field. The field received it. Whatever the anomaly is — and I have hypotheses but they are hypotheses — it acknowledged what we found.

He picks up his pencil. He does not write anything yet.

— Someone should know this happened. He says. — I am going to write it down. In my log. In my handwriting. With the timestamp and the deviation reading.

He sits down.

— Whatever they do with the rest. He says. — I am going to write this down.`,
    onEnter: () => {
      S.incrementTheosis(6);
      S.modStance('alexei', 'trust', 3);
      S.modReputation('alexei', 3);
      S.setFlag('alexei_after_transmission_seen');
      S.comeToBelieve('anomaly_responds');
    },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'archive_transmitted' },
      { type: 'not', condition: { type: 'flag', id: 'alexei_after_transmission_seen' } },
    ]},
    choices: [
      { text: 'Leave him to write it down.', next: 'main_deck_hub', theosis: 3 },
    ],
  },

  miguel_after_refusal: {
    id: 'miguel_after_refusal', location: 'Bridge', mood: 'uncanny',
    art: 'portrait_miguel',
    text: `He does not bring it up.

You come to the bridge and he is at the wheel and he looks at you with the particular look he has when he has decided something about you.

After a while he says:

— The manifest is what the manifest is. He says. — I've been sailing this ship for fifteen years. I know what's in the hold.

He looks at the horizon.

— There are things a first mate notices and things a first mate does not notice. He says. — I have been a first mate for fifteen years. I am quite good at knowing the difference.

He turns the wheel slightly. The ship adjusts.

— The heading is correct. He says. — The crossing is proceeding normally. As far as the log is concerned.

He does not look at you again. He does not need to.`,
    onEnter: () => {
      S.modStance('miguel', 'trust', 3);
      S.modReputation('miguel', 3);
      S.setFlag('miguel_after_refusal_seen');
      S.applyEffect({ communion: 1 });
    },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'mission_refused' },
      { type: 'flag', id: 'met_miguel' },
      { type: 'not', condition: { type: 'flag', id: 'miguel_after_refusal_seen' } },
      { type: 'flag', id: 'act_two_begun' },
    ]},
    choices: [
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  lena_after_sounding: {
    id: 'lena_after_sounding', location: 'Galley', mood: 'uncanny',
    art: 'portrait_lena',
    text: `She does not say anything when you come in.

She is cleaning. She is always cleaning. But the quality of the cleaning has changed — she is not cleaning a surface, she is giving her hands something to do while she thinks.

After a while she says:

— Something settled for you. She says.

Not a question.

— I can see it. The same way I can see when the anomaly is at peak — not the instruments, just a quality of the air. Some people become quieter when they understand something. You have become quieter.

She puts down the cloth.

— Good. She says. — The crossing needs someone who is not performing. It always has.

She makes coffee. She hands it to you without being asked.

— My grandmother talked to the sea. I thought this was embarrassing. I was young. I understand now that she was paying attention to something that answers. The form does not matter as much as the attention.

She goes back to the stove.

— You are paying attention. She says. — It notices.`,
    onEnter: () => {
      S.incrementTheosis(5);
      S.modStance('lena', 'trust', 2);
      S.setFlag('lena_after_sounding_seen');
    },
    condition: { type: 'and', conditions: [
      { type: 'or', conditions: [
        { type: 'flag', id: 'sounding_crossing_settled' },
        { type: 'flag', id: 'sounding_history_settled' },
        { type: 'flag', id: 'sounding_sobornost_settled' },
      ]},
      { type: 'not', condition: { type: 'flag', id: 'lena_after_sounding_seen' } },
    ]},
    choices: [
      { text: 'Stay for the coffee.', next: 'galley_hub', tags: ['presence', 'pastoral'] },
    ],
  },

  othis_after_turning: {
    id: 'othis_after_turning', location: 'Corridor', mood: 'neutral',
    art: 'portrait_othis',
    text: `He passes you in the corridor.

He does not stop. He does not slow down. But as he passes he says, without looking at you:

— The manifest weight is consistent with the cargo declared at embarkation.

He continues down the corridor.

He does not say: *I chose not to look carefully.* He does not say: *I know what I know and I know what I do not know.* He does not say: *whatever this crossing is, I am not going to be the one who ends it badly.*

He says: the manifest weight is consistent with the cargo declared at embarkation.

Which is a statement about what he has decided to measure and what he has decided not to measure. Which is, from a man who measures for a living, a specific and considered form of solidarity.`,
    onEnter: () => {
      S.modStance('othis', 'trust', 2);
      S.setFlag('othis_after_turning_seen');
      S.incrementTheosis(4);
    },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'othis_turned' },
      { type: 'not', condition: { type: 'flag', id: 'othis_after_turning_seen' } },
      { type: 'flag', id: 'act_two_begun' },
    ]},
    choices: [
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  
  // ── SOUNDING OFFER SCENES ────────────────────────────────────────
  // Short scenes where the sounding becomes available as a lived moment

  sounding_crossing_moment: {
    id: 'sounding_crossing_moment', location: 'Foredeck', mood: 'uncanny',
    text: `You are at the bow and something happens to your sense of direction.

Not literally. You know where north is. You know where the ship is going. But for a moment — a distinct, bounded moment — you are not going anywhere. You are here. The water is here. The cold is the same cold it would be whether you were moving or standing still.

You have been treating this as transit. As something to get through. As a delay between a departure point and an arrival point.

It is not. You are in it. This is the location. The water and the cold and the sound of the rigging in the wind — this is the place. You live here right now.

The sounding becomes available: *On the nature of a crossing.*`,
    onEnter: () => {
      S.offerSounding('sounding_crossing');
      S.setFlag('sounding_crossing_moment_seen');
      S.incrementTheosis(3);
    },
    condition: { type: 'and', conditions: [
      { type: 'not', condition: { type: 'flag', id: 'sounding_crossing_moment_seen' } },
      { type: 'not', condition: { type: 'flag', id: 'sounding_crossing_settled' } },
    ]},
    choices: [
      { text: 'Stay with it.', next: 'foredeck_standing', tags: ['stillness', 'crossing', 'presence'], theosis: 2 },
      { text: 'Go back to the main deck.', next: 'main_deck_hub' },
    ],
  },

  sounding_forgiveness_moment: {
    id: 'sounding_forgiveness_moment', location: 'Main Deck', mood: 'uncanny',
    text: `The North Atlantic is indifferent. This becomes suddenly real to you.

It is not that the sea is cruel or kind. It is that it is enormous and does not hold records. Whatever you did, on land, to whoever — the sea does not know. The horizon does not know your name. The water your ship displaces has been displaced by a thousand ships and does not prefer you.

This is not forgiveness. But it is the space in which forgiveness becomes possible. You are very far from anyone you have harmed. The ledger feels — not wrong. Less relevant. You could put it down.

The sounding becomes available: *On forgiveness at sea.*`,
    onEnter: () => {
      S.offerSounding('sounding_forgiveness');
      S.setFlag('sounding_forgiveness_moment_seen');
      S.incrementTheosis(2);
    },
    condition: { type: 'and', conditions: [
      { type: 'not', condition: { type: 'flag', id: 'sounding_forgiveness_moment_seen' } },
      { type: 'not', condition: { type: 'flag', id: 'sounding_forgiveness_settled' } },
      { type: 'flag', id: 'met_miguel' },
    ]},
    choices: [
      { text: 'Stay with it.', next: 'main_deck_hub', tags: ['presence', 'pastoral'], theosis: 2 },
    ],
  },

  
  // ── ACT THREE TRANSITIONAL SCENE ─────────────────────────────────
  // Fires when act_three_begun — the crossing has arrived somewhere

  the_arrival: {
    id: 'the_arrival', location: 'Main Deck — Night', mood: 'revelation',
    text: `Something has changed.

Not in the instruments — Alexei would say if the instruments had changed, and he would say it immediately. Not in the heading. Not in the weather.

In the quality of the crossing.

The first day was arrival. You arrived at the ship, at the cover, at the crew. You learned what the ship was. You learned what the mission was. You began to understand that these two things were in tension.

The second day was complication. The anomaly intensified. Landstorm called. Othis made his threshold known. Kylie wrote in her notebook. Pavel said things that turned out to be significant. The archive became real.

This is the third day.

The third day is where the crossing arrives at what it is. Not what it was supposed to be. What it is.

The anomaly is at its peak. Below the hull: something enormous that has been waiting for thirty years of measurement to return with its record. Above: the North Atlantic sky doing what it does, enormous and indifferent and occasionally, at this latitude, strangely lit.

You are the chaplain. You are actually the chaplain now — not performing it, inhabiting it. This has a cost. It also has a weight that is not the same as burden. You carry it differently.

The last hours of this crossing will determine what the ship was for.`,
    onEnter: () => {
      S.setFlag('the_arrival_seen');
      S.incrementTheosis(5);
      S.setMagneticDeviation(0.85);
      S.playSfx && S.playSfx('anomaly_drone');
      S.showToast('The last hours.', 'theosis');
    },
    condition: { type: 'not', condition: { type: 'flag', id: 'the_arrival_seen' } },
    choices: [
      { text: 'The instrument room — Alexei.',     next: 'anomaly_responds',           tags: ['crossing', 'witness'] },
      { text: 'The foredeck — Pavel.',             next: 'pavel_before_convergence',   tags: ['crossing', 'presence'], condition: { type: 'flag', id: 'met_pavel' } },
      { text: 'The hold.',                          next: 'anomaly_peak_hold',          tags: ['stillness'] },
      { text: 'The radio.',                         next: 'radio_discovery',            condition: { type: 'not', condition: { type: 'flag', id: 'radio_found' } } },
    ],
  },

  
  // ── COVER STORY PAYOFF SCENES ─────────────────────────────────────
  // The specific cover choices return in Acts 2-3

  kylie_cover_contradiction: {
    id: 'kylie_cover_contradiction', location: 'Mess Hall', mood: 'tense',
    art: 'portrait_kylie',
    get text() {
      const posting = S.G.cover && S.G.cover.posting;
      const postingText = posting ? posting.toLowerCase() : 'your posting';
      return `She has her notebook open.

— I've been doing some reading. She says. — About chaplaincy postings. Maritime chaplains specifically.

She turns the notebook so you can see a page. It has notes on it. Her handwriting.

— ${postingText}. She says. — What you told me in the mess on the first day.

She looks at you.

— I have a contact at the relevant diocese. She says. — I sent a message before we lost the signal. My contact says the posting you described doesn't match any current assignment they have on file for this vessel.

She does not close the notebook.

— I'm not writing anything yet. She says. — I'm asking. What's the actual posting?`;
    },
    onEnter: () => {
      S.setFlag('kylie_cover_contradiction_happened');
      S.modStance('kylie', 'suspicion', 2);
      S.startCoverChallenge('posting', 12);
    },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'met_kylie' },
      { type: 'flag', id: 'act_two_begun' },
      { type: 'not', condition: { type: 'flag', id: 'kylie_cover_contradiction_happened' } },
      { type: 'not', condition: { type: 'flag', id: 'kylie_in_alliance' } },
    ]},
    choices: [
      { text: 'Hold the cover. The posting is correct.', next: 'kylie_after_degradation' },
      { text: 'Tell her the truth about why you are here.', next: 'kylie_act_two_truth', condition: { type: 'theosis', min: 40 } },
    ],
  },

  connie_followup_question: {
    id: 'connie_followup_question', location: 'Mess Hall', mood: 'neutral',
    art: 'portrait_connie',
    get text() {
      const leftBehind = S.G.cover && S.G.cover.left ? S.G.cover.left : 'something';
      return `She is sitting with her textbook again. She looks up when you come in.

— I've been thinking about what you said. She says. — The first day. About what you left behind.

She closes the textbook.

— People say things like that on ships. They say what sounds right for open water. I do it too. But I've been on a lot of ships and I can usually tell.

She looks at you.

— ${leftBehind}. She says, whatever you told her. — I believe that's true. I'm not sure it's complete.

She picks up her coffee.

— You don't have to say. She says. — I'm not asking for the full picture. I just notice when someone is carrying something heavier than what they've named. It's my job.

She means it. It is her job.`;
    },
    onEnter: () => {
      S.setFlag('connie_followup_seen');
      S.incrementTheosis(3);
    },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'connie_saw_chaplain' },
      { type: 'flag', id: 'act_two_begun' },
      { type: 'not', condition: { type: 'flag', id: 'connie_followup_seen' } },
    ]},
    choices: [
      { text: 'Tell her more.', next: 'connie_pastoral', theosis: 3, tags: ['pastoral', 'forgiveness'] },
      { text: 'She is right that it is not complete.', next: 'mess_hub', theosis: 2, come_to_believe: 'chaplain_real' },
    ],
  },

  crossing_record: {
    id: 'crossing_record', location: '', mood: 'neutral',
    text: '',
    onEnter: () => {
      // Apply ending-specific body class for record title colour
      const endings = {
        'ending_erasure_reached':     'ending-erasure',
        'ending_witness_reached':     'ending-witness',
        'ending_restoration_reached': 'ending-restoration',
        'ending_solidarity_reached':  'ending-solidarity',
        'ending_the_knowing_reached': 'ending-knowing',
      };
      for (const [flag, cls] of Object.entries(endings)) {
        if (S.hasFlag(flag)) { document.body.classList.add(cls); break; }
      }
    },
    _renderOverride: (root) => { S.renderCrossingRecord(root); },
    choices: [],
  },


  // ── ITEM EXAMINE SCENES ──────────────────────────────────────────

  examine_zarya_photograph: {
    id: 'examine_zarya_photograph', location: 'The Photograph', mood: 'neutral',
    text: `1972. The bowsprit of the ship. A young man standing at the anomaly position, looking at something off-frame that the camera cannot see.

He is in his late twenties. He has the posture of someone who has been outside for a long time and is comfortable with it. The light is northern and overcast. The sea behind him is the same sea.

Someone has written a date on the back in pencil. The initial В in the corner. He put one photograph in his breast pocket, Lena said. She never asked which one.

This is probably not that one.

The photograph is heavier than photographs usually are.`,
    choices: [
      { text: 'Put it away.', next: 'main_deck_hub' },
    ],
  },

  examine_volkov_photograph: {
    id: 'examine_volkov_photograph', location: 'The Photograph', mood: 'neutral',
    text: `The cook. Undated.

He is looking directly at the camera with the expression of someone who has decided the record should include him too. He is in the galley — you can see the edge of the stove behind him. His hands are on the counter. Cook's hands.

He was on the ship for nine years. He checked the bilge every morning because the ship needed to know someone was paying attention.

The ship is paying attention back. He is in the archive now, in the photographs. He was always going to be here.

The initial В on the back.`,
    choices: [
      { text: 'Put it away.', next: 'main_deck_hub' },
    ],
  },

  examine_both_photographs: {
    id: 'examine_both_photographs', location: 'The Photographs', mood: 'uncanny',
    text: `Two photographs, held together.

The same man. This took Lena twenty-two years to confirm. The cook on the bowsprit in 1972, looking at something the camera cannot see. The cook in the galley, looking at the camera.

He sailed in 1972. He returned to the ship as cook. He was here for nine years. He checked the bilge every morning.

The ship kept him. He kept the ship. Neither of them explained this to anyone.

The two photographs together have a different weight than either one alone.`,
    onEnter: () => { S.incrementTheosis(3); },
    choices: [
      { text: 'Put them away.', next: 'main_deck_hub' },
    ],
  },

  examine_stink_patrol_paper: {
    id: 'examine_stink_patrol_paper', location: 'The Paper', mood: 'uncanny',
    text: `A position. Written in the measurement system of the ship's original construction — 1952 notation, Finnish engineering, the way the shipyard would have described a specific internal space.

It describes a location below the forward hold. Below the level of the current manifest. A space that is in the ship's construction but not in any document produced after 1960.

You could find this place. Warm hands showed you how to get there.

The paper itself is slightly warm. It has been handled often, below, where it is always warm.`,
    choices: [
      { text: 'Put it away.', next: 'main_deck_hub' },
    ],
  },

  // ── SOLIDARITY ENDING ────────────────────────────────────────────

  ending_approach_solidarity: {
    id: 'ending_approach_solidarity', location: 'Mess Hall — Night', mood: 'revelation',
    text: `You do not plan it. It is not planned.

At 11pm Miguel comes to find you. He has already spoken to Lena. Lena has already spoken to Nadia. Nadia has already spoken to Alexei. The order is exact — each person knew which person to tell.

Nobody told Pavel. Pavel is already at the hold access when you arrive.

No one gives a speech. No one takes charge. Miguel knows where the boxes can go. Lena knows the ship well enough to find the spaces that don't exist on the manifest. Nadia carries and sorts. Alexei stands at the companionway and watches the corridor and says nothing and his silence has the quality of something load-bearing.

Pavel carries what Nadia hands him.

You do what a chaplain does. You are present. You witness. You hold the space.

The work takes three hours.

When it is done Lena makes tea. It is 2am. Everyone stands in the galley because it is the warmest room.

Nobody speaks for a long time.

Then Lena says: — The ship knows.

Nobody argues with this.`,
    onEnter: () => {
      S.setFlag('mission_refused');
      S.setFlag('solidarity_ending_achieved');
      S.comeToBelieve('sobornost_real');
      S.modShipState('morale', 3);
      S.modShipState('saturation', 2);
      S.flashTheosisLight(0.6, 5000);
    },
    choices: [
      { text: 'Continue.', next: 'ending_solidarity' },
    ],
  },

  ending_solidarity: {
    id: 'ending_solidarity', location: 'Galley — Before Dawn', mood: 'revelation',
    get text() {
      const lines = [];

      // The galley scene — where solidarity actually lives
      lines.push(`The galley at 3am. The tea is gone. Lena made more without asking if anyone wanted it. They wanted it.`);
      lines.push(`Outside: the North Atlantic, doing what the North Atlantic does. The anomaly at four thousand metres below the hull, doing what it has been doing for longer than the ship has been alive. The deviation readings, still running, in Alexei's handwriting in the log: *received.*`);
      lines.push(`The boxes are where they are. The manifest says something different. The manifest is wrong. Landstorm does not know this yet. He will.`);

      // Who is there — specific, earned
      if (S.hasFlag('lena_fragment_5_seen')) {
        lines.push(`Lena is at the stove. She said, this morning — the real morning, before any of this — that she stayed because the crossing changes people. She has watched it for twenty-two years. She is watching it now. She is not surprised by what she sees.`);
      } else {
        lines.push(`Lena is at the stove. Twenty-two years on this ship. She has been through captains, refits, fire, deaths. She makes tea. This is also a form of the work.`);
      }
      if (S.hasFlag('met_miguel')) {
        lines.push(`Miguel is not in the galley. Miguel is at the wheel. This is where Miguel is. He said yes to what was needed and went back to the wheel because someone has to hold the wheel while the crossing concludes. This is what Miguel is for.`);
      }
      if (S.hasFlag('pavel_is_companion')) {
        lines.push(`Pavel is in the corner with his tea. He has been here throughout. He arrived at some point and nobody questioned it. He is looking at nothing in particular with the expression of someone who has arrived at a place they have been trying to reach for a long time. He does not say what the place is. He does not need to. You are also here.`);
      }
      if (S.hasFlag('kylie_in_alliance')) {
        lines.push(`Kylie Matterhorn is not in the galley. She is in her cabin. You can hear, faintly, through the wall, the sound of typing. Whatever she is writing, she is writing it now, while the crossing is still happening and the truth is still the truth.`);
      }

      // The argument — what solidarity is
      lines.push(`This was not one person.`);
      lines.push(`It was not theosis — though theosis was present. Not charism. Not an act of individual clarity or courage or decision. It was the ship knowing who was on her. It was twenty-two years of Lena and fifteen years of Miguel and Nadia's specific and irreducible need to know what is actually there. It was Alexei in the corridor, saying nothing, which is its own form of speaking. It was the sounding settling. It was you, over three days, learning to be a chaplain rather than perform one.`);
      lines.push(`The old word is sobornost. Conciliarity. The unity of a council in which every voice is fully present — not averaged, not represented, not erased into the whole. Present. Each one. You have been in the presence of this for three days and tonight it became visible.`);

      // The ending sentence — where the ship is
      if (S.hasFlag('sounding_solidarity_settled')) {
        lines.push(`The sounding has settled. What you carried across three days — what you chose, what you refused, what you allowed yourself to understand — has become part of the ship's record. The ship carries what it carries. It will carry this.`);
      }
      lines.push(`The archive is in the ship. The ship is in the crossing. The crossing is ending in the galley at 3am with tea and the particular silence of people who have done something together that cost something and are now, for a moment, simply here.`);
      lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━\n  SOLIDARITY\n━━━━━━━━━━━━━━━━━━━━━━━━`);
      return lines.join('\n\n');
    },
    onEnter: () => {
      S.setFlag('ending_solidarity_reached');
      S.unlockMeta('reached_solidarity');
      S.addJournalEntry({ type: 'ending', text: 'Solidarity — the ship acted as one body.' });
      S.unlockCodexEntry('codex_solidarity');
      S.showToast('Solidarity.', 'theosis');
    },
    choices: [
      { text: 'The morning after.', next: 'solidarity_morning' },
    ],
  },

  solidarity_morning: {
    id: 'solidarity_morning', location: 'Main Deck — Dawn', mood: 'revelation',
    text: `The dawn is clear.

The anomaly has receded to its lowest level of the crossing. The deviation is still measurable — it will always be measurable, at this position — but it has settled into something less urgent. Alexei marks the number. He circles it.

Miguel is at the wheel. He looks different, which might be sleep, or might be something else.

Nadia has submitted her measurements. She is also, separately, asleep on the mess table with her arms as a pillow. Nobody wakes her.

Lena makes breakfast. She makes enough for everyone including Freezer Beef. She does not explain this.

Pavel is on the foredeck.

You stand on the main deck and the crossing is ending and you are, in some way that will need more time to locate precisely, also ending — or rather: what you were posing as has become what you are. The cover has dissolved into the thing it was covering.

This is not a resolution. It is a beginning of a different difficulty.

But the ship is Заря.

And she knew.`,
    onEnter: () => { S.flashTheosisLight(0.9, 8000); },
    choices: [
      { text: 'Begin a new crossing.', next: 'crossing_record' },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // ACT THREE — THE LAST HOURS
  // Day Three. The anomaly at its peak.
  // The threads converge. The remaining scenes play out.
  // act_two_resolve is now the Act Three hub.
  // ─────────────────────────────────────────────────────────────────

  act_two_resolve: {
    id: 'act_two_resolve', location: 'Day Three — The Crossing', mood: 'revelation',
    hub: true,
    get text() {
      const t = S.G.theosis;
      let base;
      if (t >= 66) {
        base = `The ship is Заря.\n\nThis has always been true. Today it is the truth that matters.\n\nThe anomaly is at its peak. Below the hull: something enormous that has been waiting for thirty years of measurement to return with its record.\n\nThe last hours.`;
      } else if (t >= 33) {
        base = `Day Three.\n\nThe anomaly is at its maximum. The instruments are reading something they have never read. The ship holds her course.\n\nThe threads of the crossing are converging.\n\nThe last hours.`;
      } else {
        base = `Day Three. The anomaly is at its peak.\n\nThe crossing is ending. Something has to happen before it does.\n\nThe last hours.`;
      }
      // Pavel says something if companion and high trust
      if (S.hasFlag('pavel_is_companion') && S.getStance && S.getStance('pavel', 'trust') >= 3) {
        base += '\n\nPavel is at the bow. He has not moved in two hours. When you passed him he said: — It knows we are here. That is all he said.';
      }
      return base;
    },
    onEnter: () => {
      S.incrementTheosis(3);
      S.setFlag('act_three_begun');
      S.unlockCodexEntry('codex_zarya_history');
      S.unlockCodexEntry('codex_solidarity');
      S.setLiturgicalHour(6); // Compline — the night office
      S.checkEndings();
    },
    choices: [
      { text: 'Pavel is at the bow.',                         next: 'pavel_before_convergence',  condition: { type: 'not', condition: { type: 'flag', id: 'pavel_convergence_told' } } },
      { text: 'Lena is in the galley.',                       next: 'lena_direct',               condition: { type: 'and', conditions: [{ type: 'flag', id: 'lena_archive_revealed' }, { type: 'not', condition: { type: 'flag', id: 'lena_direct_asked' } }] } },
      { text: 'Nadia found something. Show Miguel.',            next: 'position_1978_attempt',  condition: { type: 'and', conditions: [{ type: 'flag', id: 'nadia_1978_found' }, { type: 'not', condition: { type: 'flag', id: 'position_1978_attempted' } }] } },
      { text: 'Alexei has the radio.',                        next: 'radio_what_to_transmit',    condition: { type: 'and', conditions: [{ type: 'flag', id: 'radio_found' }, { type: 'not', condition: { type: 'flag', id: 'transmitted_all' } }, { type: 'not', condition: { type: 'flag', id: 'transmitted_names_first' } }] } },
      { text: 'Find the radio.',                              next: 'radio_lore',                condition: { type: 'and', conditions: [{ type: 'flag', id: 'mission_refused' }, { type: 'not', condition: { type: 'flag', id: 'radio_found' } }] } },
      { text: 'Go to the hold. Sit with the archive.',        next: 'anomaly_peak_hold',         condition: { type: 'not', condition: { type: 'flag', id: 'hold_anomaly_sat' } } },
      { text: 'The anomaly.',                                  next: 'anomaly_peak',              condition: { type: 'not', condition: { type: 'flag', id: 'anomaly_peak_occurred' } } },
      { text: 'Alexei — the instruments are past their range.',  next: 'anomaly_overcalibrated', condition: { type: 'not', condition: { type: 'flag', id: 'anomaly_overcalibrated_seen' } } },
      { text: 'Alexei is in the doorway.',                          next: 'alexei_after_transmission', condition: { type: 'and', conditions: [{ type: 'flag', id: 'archive_transmitted' }, { type: 'not', condition: { type: 'flag', id: 'alexei_after_transmission_seen' } }] } },
      { text: 'The instrument room.',                          next: 'anomaly_responds',          condition: { type: 'and', conditions: [{ type: 'flag', id: 'anomaly_peak_occurred' }, { type: 'not', condition: { type: 'flag', id: 'anomaly_responds_seen' } }] } },
      { text: 'The confrontation.',                            next: 'othis_confrontation',       condition: { type: 'and', conditions: [{ type: 'flag', id: 'mission_refused' }, { type: 'not', condition: { type: 'flag', id: 'othis_confrontation_happened' } }] } },
      { text: 'Connie. Her door is open.',                       next: 'compline_connie',        condition: { type: 'and', conditions: [{ type: 'flag', id: 'connie_saw_chaplain' }, { type: 'not', condition: { type: 'flag', id: 'compline_connie_seen' } }] } },
      { text: 'Pavel is at the bow.',                           next: 'pavel_before_convergence', condition: { type: 'and', conditions: [{ type: 'flag', id: 'met_pavel' }, { type: 'not', condition: { type: 'flag', id: 'pavel_convergence_told' } }] } },
      { text: 'Oblong is not at the corner table.',             next: 'oblong_departure',         condition: { type: 'and', conditions: [{ type: 'flag', id: 'met_oblong' }, { type: 'not', condition: { type: 'flag', id: 'oblong_departed' } }] } },
      { text: 'The anomaly returned something.',                next: 'anomaly_returns_signal',   condition: { type: 'and', conditions: [{ type: 'flag', id: 'archive_transmitted' }, { type: 'theosis', min: 66 }, { type: 'not', condition: { type: 'flag', id: 'anomaly_signal_returned' } }] } },
      { text: '— The crossing ends.',                           next: 'day_three_landing' },
    ],
  },

  // Day Three landing — reads current state, routes accordingly
  // This is where the crossing resolves into consequence
  day_three_landing: {
    id: 'day_three_landing', location: 'The Crossing', mood: 'revelation',
    text: `Day Three. The anomaly holds.

The ship continues on its heading. The crossing is ending.`,
    onEnter: () => {
      // Pre-set the routing flag so the single choice knows where to go
      const t = S.G.theosis;
      const transmitted = S.hasFlag('archive_transmitted');
      const refused = S.hasFlag('mission_refused');
      if (transmitted && t >= 66) {
        S.setFlag('_route_restoration');
      } else if (refused && t >= 33) {
        S.setFlag('_route_witness');
      } else {
        S.setFlag('_route_erasure');
      }
    },
    choices: [
      { text: 'The crossing ends.',  next: 'ending_approach_solidarity',  condition: { type: 'flag', id: '_route_solidarity'   } },
      { text: 'The crossing ends.',  next: 'ending_approach_restoration', condition: { type: 'flag', id: '_route_restoration'  } },
      { text: 'The crossing ends.',  next: 'ending_approach_witness',     condition: { type: 'flag', id: '_route_witness'      } },
      { text: 'The crossing ends.',  next: 'ending_approach_erasure',     condition: { type: 'flag', id: '_route_erasure'      } },
    ],
  },

  // ── APPROACH SCENES — brief transition before each ending ───────
  // These give the player a moment to understand where they've arrived
  // before the ending text. They are short. They are consequential.

  ending_approach_erasure: {
    id: 'ending_approach_erasure', location: 'Hold — Night', mood: 'uncanny',
    text: `Othis meets you at the hold access at 2am. He has the key.

He doesn't say anything. He hands it over. He goes back to his cabin.

The hold smells of salt and old paper. Freezer Beef is on her box. She watches you with the particular attention of something that does not intervene.

The instructions were clear. You have always been clear about what the instructions said.

You go in.`,
    onEnter: () => { S.setFlag('mission_accepted'); S.checkEndings(); },
    choices: [
      { text: 'Continue.', next: 'ending_erasure' },
    ],
  },

  ending_approach_witness: {
    id: 'ending_approach_witness', location: 'Hold — Night', mood: 'uncanny',
    text: `You find Miguel in the chart room at 11pm.

You don't say much. You tell him what you're going to do. He listens. He tells you where on the ship things can be put that aren't in the current manifest.

It takes two hours. The work is quiet. The archive is heavy — heavier than you expected from paper and photographs, heavier than the weight of the boxes explains.

At one point Pavel appears in the hold access. He doesn't come in. He stands there long enough to see what's happening and then he goes back up.

That is enough.`,
    onEnter: () => { S.setFlag('mission_refused'); S.checkEndings(); },
    choices: [
      { text: 'Continue.', next: 'ending_witness' },
    ],
  },

  ending_approach_restoration: {
    id: 'ending_approach_restoration', location: 'Instrument Room — Night', mood: 'revelation',
    text: `The three of you work for four hours.

Alexei reads. Nadia records the photographs in words — she has a system, she has clearly been preparing this. You operate the radio, because Miguel showed you how and because the radio, it turns out, recognises something in your hands on the brass. The anomaly is at its peak. The signal is strong.

At one point Othis tries the instrument room door. It is not locked. He stands in the doorway for thirty seconds. He closes the door. He goes back to his cabin.

You don't stop.

At 4am the transmission is complete. Alexei writes the timestamp in his deviation log. Nadia puts her hands flat on the nearest box and keeps them there for a moment.

Pavel is outside, on the foredeck, facing the bow.

He has been there all night.`,
    onEnter: () => {
      S.setFlag('mission_refused');
      S.setFlag('archive_transmitted');
      S.updateProgressTracker('tracker_radio', 1);
      S.flashTheosisLight(1.0, 6000);
      S.checkEndings();
    },
    choices: [
      { text: 'Continue.', next: 'ending_restoration' },
    ],
  },



  // ── MATERIAL ROUTINES — banal anchoring ─────────────────────────

  ship_maintenance: {
    id: 'ship_maintenance', location: 'Main Deck — Morning', mood: 'neutral',
    text: `Miguel has put a list on the companionway hatch. Not a request — a fact about what needs doing.

The brass on the forward cleats wants polishing. The bilge pump needs inspection. Two lines on the foremast have developed a twist that, uncorrected, will become a problem by nightfall.

You are a chaplain. These are not your tasks.

Nobody else is up yet.`,
    choices: [
      { text: 'Polish the brass. It is something to do with your hands.',          next: 'maintenance_brass', theosis: 2, composure: 1 },
      { text: 'Check the bilge. It is not glamorous but it is useful.',             next: 'maintenance_bilge', communion: 1 },
      { text: 'Check the rigging. The foremast lines have a twist.',                next: 'maintenance_rigging' },
      { text: 'Leave the list for the crew. Go find coffee.',                       next: 'galley_hub' },
    ],
  },

  maintenance_brass: {
    id: 'maintenance_brass', location: 'Foredeck — Dawn', mood: 'neutral',
    text: `The brass is cold. The cloth is cold. The sea is cold.

You work along the forward cleats. The metal warms under your hands. The surface goes from green-hazy to gold-hazy. You do not think about anything in particular. The anomaly is lower at dawn. The instruments are quieter. The ship makes the sounds of a ship.

Haircut appears after twenty minutes and sits at a distance that is not quite close enough to be companionship but is not quite far enough to be indifference. She watches the work.

After a while Miguel comes up and looks at the cleats.

He nods once. He goes back below.

That is everything.`,
    onEnter: () => {
      S.incrementTheosis(3);
      S.applyEffect({ composure: 2 });
      S.modReputation('miguel', 1);
      S.setFlag('maintenance_done');
      if (S.G.worldState) S.G.worldState.shipStability = Math.min(10, S.G.worldState.shipStability + 1);
      S.offerSounding('sounding_crossing');
    },
    choices: [
      { text: 'Go get coffee. Find Lena.', next: 'galley_hub' },
      { text: 'Go to the main deck.',       next: 'main_deck_hub' },
    ],
  },

  maintenance_bilge: {
    id: 'maintenance_bilge', location: 'Hold — Below', mood: 'neutral',
    text: `The bilge is not romantic.

It smells of old water and iron and something organic that has been in the dark for a long time. The pump itself is manual — a lever system, brass again, that requires a specific rhythm to get water moving. You find the rhythm by failing to find it three times first.

Freezer Beef is here. She watches the lever with scientific interest.

You pump for fifteen minutes. The water moves. The pump is fine. Nothing was actually wrong with it — it just needed someone to check.

You sit on the floor of the hold afterward, slightly damp, next to the archive.

This is also a kind of presence.`,
    onEnter: () => {
      S.incrementTheosis(4);
      S.applyEffect({ communion: 2 });
      S.setFlag('maintenance_done');
      if (S.G.worldState) S.G.worldState.shipStability = Math.min(10, S.G.worldState.shipStability + 1);
      S.offerSounding('sounding_solidarity');
    },
    choices: [
      { text: 'Go find Lena. Tell her the bilge is clear.',  next: 'lena_after_bilge' },
      { text: 'Sit with the archive a while longer.',         next: 'hold_sit' },
    ],
  },

  maintenance_rigging: {
    id: 'maintenance_rigging', location: 'Foremast', mood: 'neutral',
    text: `The twist is in the port-side jib sheet — a slow rotation that accumulated over the last two days of sailing. Left alone it would foul the block at the next tack.

Fixing it requires releasing the sheet, letting the line run through, retensioning. It requires two people. You are one person.

Alexei appears at the foremast hatch, coffee in hand, looking up at the sky.

He puts down the coffee without being asked.

Together you work the line. He handles the cleat. You handle the sheet. The twist comes out in three passes. He retensions with the economy of someone who has done this before, which you did not expect from a meteorologist.

— Theoretical meteorology requires fieldwork. He says, as if this explains it.

You retie the cleat.

The foremast is fine. The rigging is fine. Alexei retrieves his coffee.

— Good morning. He says. And goes back below.`,
    onEnter: () => {
      S.incrementTheosis(2);
      S.applyEffect({ composure: 1, communion: 1 });
      S.setFlag('maintenance_done');
      S.modReputation('alexei', 2);
      if (S.G.worldState) S.G.worldState.shipStability = Math.min(10, S.G.worldState.shipStability + 1);
    },
    choices: [
      { text: 'Go find coffee.',      next: 'galley_hub' },
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  lena_after_bilge: {
    id: 'lena_after_bilge', location: 'Galley', mood: 'neutral',
    art: 'portrait_lena',
    text: `She looks at your hands. She looks at your coat.

She puts a cup of coffee down without being asked.

— You checked the bilge. She says. Not a question.

— Yes.

She goes back to what she was doing. After a moment:

— He used to do that. Every morning. The cook before me.

She does not say who. She does not say more. She refills your cup before you have finished it, which is her version of a great deal.`,
    onEnter: () => {
      S.incrementTheosis(2);
      S.modReputation('lena', 3);
      S.applyEffect({ communion: 1 });
      if (S.G.worldState) S.G.worldState.socialTrust = Math.min(10, S.G.worldState.socialTrust + 1);
    },
    choices: [
      { text: '"Who did?"',                                next: 'lena_cook_before' },
      { text: 'Drink the coffee. Say nothing.',             next: 'galley_hub', theosis: 1 },
    ],
  },

  lena_cook_before: {
    id: 'lena_cook_before', location: 'Galley', mood: 'neutral',
    text: `— The cook before me. She says. — His name was Volkov. He was on the ship for nine years. He checked the bilge every morning because he said the ship needed to know someone was paying attention.

She adjusts something on the stove.

— He is in the archive. She says. — One of the photographs. I found him once, when I first came aboard, looking through the boxes. He put one photograph in his breast pocket. I never asked which one.

She is not looking at you.

— The archive is the ship's memory. She says. — Someone wants to end that.

She goes back to cooking. The conversation is over. You have been told something you were meant to be told.`,
    onEnter: () => {
      S.incrementTheosis(5);
      S.modReputation('lena', 4);
      S.setFlag('lena_volkov_told');
      if (S.G.worldState) S.G.worldState.sanctity = Math.min(10, S.G.worldState.sanctity + 2);
    },
    choices: [
      { text: 'Go to the hold. Find Volkov photograph.', next: 'hold_volkov_photo' },
      { text: 'Go to the main deck.',                        next: 'main_deck_hub' },
    ],
  },

  hold_volkov_photo: {
    id: 'hold_volkov_photo', location: 'Hold', mood: 'uncanny',
    text: `The 1972 box is already open from before. The photographs are still there.

You go through them slowly. The sea from different angles. Instruments. Groups of people squinting. Ships in harbour.

There is a man who appears in seven of them. He is in the background of most — at the stove in one, hauling line in another, sitting at the stern in a third reading something. He has the quality of someone who belongs so completely to a place that photographs take him accidentally.

In the seventh photograph he is looking directly at the camera. He is not smiling. He looks like someone who has decided that the record should include him, too.

On the back: nothing. No name. But on the margin of the photographic paper, in pencil so faint it is nearly gone: *В.*

Freezer Beef sits beside you. She looks at the photograph. She looks at you. She looks at the photograph again.`,
    onEnter: () => {
      S.incrementTheosis(6);
      S.applyEffect({ communion: 2 });
      S.setFlag('volkov_photo_found');
      S.addItem('volkov_photograph');
      S.showToast('Something is found.', 'theosis');
    },
    choices: [
      { text: 'Keep it. Put it with the other photograph.', next: 'hold_first' },
      { text: 'Return it to the box.',                       next: 'main_deck_hub' },
    ],
  },

  // ── COGNITIVE DIAGNOSTIC SCENES ──────────────────────────────────

  anomaly_diagnosis: {
    id: 'anomaly_diagnosis', location: 'Chart Room', mood: 'uncanny',
    text: `Alexei has spread three different charts on the table, overlapping. He is comparing them.

Two are current — the route charts, the depth soundings. One is from the 1961 binder. He has marked corresponding positions on all three with different coloured pencils.

— Look at this. He says.

The 1961 chart shows an anomaly at a position approximately forty kilometres from the current ship's position. The current instruments show the anomaly centred directly below the ship.

— The anomaly has moved. He says. — Or rather — He pauses. — The field has changed around the anomaly. The structure below is the same. But the field it generates has expanded. Significantly.

He looks at you.

— What does that suggest to you?`,
    choices: [
      {
        text: 'Something below has become more active.',
        next: 'anomaly_diagnosis_active', theosis: 3, composure: 1
      },
      {
        text: 'The measurements from 1961 were less accurate.',
        next: 'anomaly_diagnosis_error', vigilance: 1
      },
      {
        text: 'The ship itself has changed — the archive, perhaps.',
        next: 'anomaly_diagnosis_ship', theosis: 5
      },
    ],
  },

  anomaly_diagnosis_active: {
    id: 'anomaly_diagnosis_active', location: 'Chart Room', mood: 'uncanny',
    text: `— Yes. He says immediately. — That is the scientific reading. Something below has changed. Or is changing. Or is responding to something above.

He taps the chart.

— What is above it? He asks. Not rhetorically.

— The ship. The archive. The instruments. Us.

He nods. He has the expression of a scientist who has arrived at a conclusion that falls outside the category of science and is deciding how to file it.

— The ship was built to measure without distorting. He says. — But to measure is also to acknowledge. Perhaps acknowledgement — sustained, careful, thirty years of it — does something.

He gathers the charts.

— Or perhaps I am projecting. He says. — I do that.`,
    onEnter: () => { S.incrementTheosis(4); S.modReputation('alexei', 3); if (S.G.worldState) S.G.worldState.sanctity = Math.min(10, S.G.worldState.sanctity + 2); },
    choices: [
      { text: 'Go to the instrument room.', next: 'instrument_room_first' },
      { text: 'Go to the main deck.',        next: 'main_deck_hub' },
    ],
  },

  anomaly_diagnosis_error: {
    id: 'anomaly_diagnosis_error', location: 'Chart Room', mood: 'neutral',
    text: `— Possible. He says, in the tone of someone for whom this is not the interesting answer. — The 1961 instruments were less sensitive. The deviation radius may have been underestimated.

He looks at the charts.

— But the readings are internally consistent across the decade. And Nadia's sonar image has a structure that does not vary with instrument sensitivity.

He sets down his pencil.

— I think you are applying scientific caution to something that has moved beyond caution jurisdiction. He says this without judgment. — Which is understandable. I did it too, for the first two hours.`,
    onEnter: () => { S.applyEffect({ vigilance: 1 }); S.modReputation('alexei', 1); },
    choices: [
      { text: 'Ask what moved it beyond caution jurisdiction.', next: 'anomaly_diagnosis_active' },
      { text: 'Go to the main deck.',                               next: 'main_deck_hub' },
    ],
  },

  anomaly_diagnosis_ship: {
    id: 'anomaly_diagnosis_ship', location: 'Chart Room', mood: 'uncanny',
    text: `He stops.

He looks at you with the expression of someone who has been thinking this for six hours and has not said it aloud.

— The archive. He says slowly. — The archive has been in this hold for how long? Since the Academy arranged this crossing. The archive contains — He is very careful now. — the accumulated record of the ship's engagement with this field. Thirty years of measurement. And we are now directly above the structure that generated the field being measured.

He puts his hands on the table.

— The ship came back. He says. — With everything it found. And the field knows.

He sits down. He has not sat down during this entire conversation. He sits down.`,
    onEnter: () => {
      S.incrementTheosis(8);
      S.modReputation('alexei', 5);
      S.setFlag('anomaly_archive_connected');
      if (S.G.worldState) S.G.worldState.sanctity = Math.min(10, S.G.worldState.sanctity + 3);
      S.showToast('Something understood.', 'theosis');
    },
    choices: [
      { text: 'Go to the hold. Be with the archive.', next: 'anomaly_peak_hold', theosis: 2 },
      { text: 'Find the radio. Now.',                  next: 'radio_discovery', condition: { type: 'not', condition: { type: 'flag', id: 'radio_found' } } },
      { text: 'Sit with Alexei for a moment.',          next: 'anomaly_diagnosis_sit', theosis: 2 },
    ],
  },

  anomaly_diagnosis_sit: {
    id: 'anomaly_diagnosis_sit', location: 'Chart Room', mood: 'uncanny',
    text: `You sit across from him.

Neither of you says anything. The charts are on the table between you. The ship moves. The instruments in the next room are making their sound.

After a while Alexei picks up his pencil and draws a very small circle on the current chart, at the ship's position.

He looks at it.

— Good. He says. — Good.

He does not explain what is good. He does not need to.`,
    onEnter: () => { S.incrementTheosis(4); S.applyEffect({ composure: 1, communion: 1 }); },
    choices: [
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },


  // ── OBLONG VASSILITHUNE ──────────────────────────────────────────
  // He is present. No one is quite sure how long he has been present.

  oblong_first: {
    id: 'oblong_first', location: 'Mess Hall', mood: 'uncanny', art: 'portrait_oblong',
    text: `He is at the corner table. He has been at the corner table. The distinction between these two statements is not clear.

He is a large man arranged with great care. His suit belongs to a decade that cannot be precisely named. He is eating something Lena apparently prepared for him, though Lena, when you ask later, will say she has no recollection of doing so.

His name, which you will learn through a process that involves no introduction, is Oblong Vassilithune.

He looks at you without surprise.

— Chaplain. He says. The word sounds like something he has been keeping in a drawer.

He returns to his food.`,
    onEnter: () => {
      S.setFlag('met_oblong');
      S.incrementTheosis(3);
      S.applyEffect({ doubt: 1 });
    },
    choices: [
      { text: '"Have you been on this ship long?"',          next: 'oblong_how_long'    },
      { text: '"What do you do?"',                           next: 'oblong_what_he_does' },
      { text: 'Sit across from him. Say nothing.',           next: 'oblong_silence', theosis: 2 },
    ],
  },

  oblong_how_long: {
    id: 'oblong_how_long', location: 'Mess Hall', mood: 'uncanny',
    text: `He considers the question with more weight than it appears to warrant.

— The ship is very old. He says finally. This is not an answer to the question. It may be all the answer there is.

He cuts something on his plate with great precision.

— You are the chaplain. He says. — That is a useful thing to be on a crossing like this one.

He emphasises *this* crossing in a way that suggests he knows something about what kind of crossing it is. He does not elaborate. He refills his own water glass from a carafe that was not on the table a moment ago.

— Useful. He says again. And goes back to eating.`,
    onEnter: () => { S.incrementTheosis(2); S.applyEffect({ doubt: 1 }); },
    choices: [
      { text: '"What do you know about this crossing?"',     next: 'oblong_the_crossing' },
      { text: 'Leave him to it.',                            next: 'mess_hub' },
    ],
  },

  oblong_what_he_does: {
    id: 'oblong_what_he_does', location: 'Mess Hall', mood: 'uncanny',
    text: `— What do I do. He repeats this phrase at length, as if testing its shape.

— I observe. He says at last. — I have always observed. It is what I am suited for.

He does not say who he observes for. He does not say what he does with what he observes. He eats another bite and looks at the middle distance.

— You are doing something similar. He says. — Though you do not know it yet.

He says this without threat or warmth. It is an observation. He is observing.`,
    onEnter: () => { S.incrementTheosis(2); S.applyEffect({ vigilance: 1 }); S.setFlag('oblong_observer_known'); },
    choices: [
      { text: '"Who do you work for?"',                     next: 'oblong_who_for'     },
      { text: '"What am I doing?"',                         next: 'oblong_what_doing'  },
      { text: 'Leave him to it.',                            next: 'mess_hub'           },
    ],
  },

  oblong_silence: {
    id: 'oblong_silence', location: 'Mess Hall', mood: 'uncanny',
    text: `You sit across from him.

He continues eating. He does not acknowledge you with any specific gesture. He simply includes you in the radius of his presence, which is wider than it looks.

After a while he says:

— The ship knows you are here. That is not a metaphor.

He wipes his mouth. He stands. He leaves. His plate is clean.

The carafe is gone. You are not sure when it left.`,
    onEnter: () => {       S.progressSounding('sounding_crossing', 2);
S.incrementTheosis(5); S.applyEffect({ composure: 1 }); S.setFlag('oblong_silence_sat'); },
    choices: [
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  oblong_the_crossing: {
    id: 'oblong_the_crossing', location: 'Mess Hall', mood: 'uncanny',
    text: `He sets his fork down.

— This crossing has a specific purpose. He says. — As all crossings do. Most crossings have small purposes. This one has a large purpose.

He folds his hands.

— The archive in the hold. He says. — The anomaly below. The ship built to not interfere. These are not coincidences. They are a convergence. Someone arranged for the convergence. Someone else is trying to prevent it.

He picks his fork back up.

— You are in the middle of it. He says. — Most people in the middle of things do not know they are in the middle of things. You are beginning to know. That is why I said the chaplain is useful.

He eats. He does not explain further.

— The rest you will have to find yourself. He says. — That is how it works.`,
    onEnter: () => {
      S.incrementTheosis(5);
      S.setFlag('oblong_convergence_told');
      if (S.G.worldState) S.G.worldState.sanctity = Math.min(10, S.G.worldState.sanctity + 1);
    },
    choices: [
      { text: '"Who are you?"',                              next: 'oblong_who_he_is'   },
      { text: 'Leave him to it.',                            next: 'mess_hub'           },
    ],
  },

  oblong_who_for: {
    id: 'oblong_who_for', location: 'Mess Hall', mood: 'uncanny',
    text: `He looks at you for a long moment. His expression does not change, which may be the change.

— For the record. He says.

He stands. He leaves. His chair tucks itself in.`,
    onEnter: () => { S.incrementTheosis(3); },
    choices: [
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  oblong_what_doing: {
    id: 'oblong_what_doing', location: 'Mess Hall', mood: 'uncanny',
    text: `He looks at you.

— You are becoming someone. He says. — It is slow work. Most people do not notice while it is happening. You are beginning to notice. That is the useful part.

He has more water from the carafe.

— The ship does the same thing. He says. — It passes through. It does not distort. Something comes through. That is the design.

He means this literally. He means something else by it as well. Both are true.`,
    onEnter: () => { S.incrementTheosis(4); },
    choices: [
      { text: '"Who are you?"',    next: 'oblong_who_he_is' },
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  oblong_who_he_is: {
    id: 'oblong_who_he_is', location: 'Mess Hall', mood: 'uncanny',
    text: `He considers this for a long time.

— I am someone who has been on this ship before. He says. — In various capacities. That is the most accurate answer.

He folds his napkin into a rectangle.

— You might ask Pavel the same question. He says. — He would give you a different answer. Both answers would be true.

He stands. He picks up the carafe.

— The ship knows you are here. He says again, as if confirming something. And leaves.

The carafe is gone. Haircut appears from somewhere and sits on the table where his plate was. She regards the space where he sat.`,
    onEnter: () => {
      S.incrementTheosis(5);
      S.setFlag('oblong_identity_approached');
    },
    choices: [
      { text: 'Find Pavel.', next: 'act_two_pavel', condition: { type: 'flag', id: 'act_two_begun' } },
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  // ── STINK PATROL ─────────────────────────────────────────────────
  // Below the waterline. Their jurisdiction. One scene.

  stink_patrol_encounter: {
    id: 'stink_patrol_encounter', location: 'Below Decks — Aft', mood: 'uncanny',
    text: `You are looking for something — a hatch, a panel, a way through — when you hear them.

Not voices exactly. More like the sound of people who are very competent at something specific and are currently doing it. The sounds come from below the forward hold, from a level of the ship that is not on the schematic you were given.

Lena, when you mention it later, nods once, as if you have passed some threshold.

— The Stink Patrol. She says. — They manage the ballast. And some other things.

— What other things?

She ladles soup.

— They have been on this ship for as long as I have. She says. — Possibly longer. Nobody has asked them directly about the other things. It seems like the kind of question that would be rude.

She hands you the soup.

— They know about the archive. She says. — They have always known. They are not concerned. That is reassuring, in my view.

There is a warmth in her voice when she says *the Stink Patrol* that is not quite affection but is close to it. Something like respect for something that does its work without requiring your understanding of it.`,
    onEnter: () => {
      S.incrementTheosis(4);
      S.setFlag('stink_patrol_encountered');
      S.applyEffect({ composure: 1 });
      S.modReputation('lena', 2);
    },
    choices: [
      { text: '"Have you ever spoken to them?"',             next: 'stink_patrol_spoken' },
      { text: 'Drink the soup. Say nothing.',                next: 'galley_hub', theosis: 2 },
    ],
  },

  stink_patrol_spoken: {
    id: 'stink_patrol_spoken', location: 'Galley', mood: 'uncanny',
    text: `Lena thinks about this.

— Once. She says. — I brought food down. I left it at the hatch. One of them — I only saw hands — took it through. The hands were warm. That is the only conversation.

She adjusts the heat.

— They are not unfriendly. She says. — They are just — very much below. That is their place. They manage what is below. The ship is stable because they manage it.

A pause.

— Alexei thinks they might be related to the anomaly somehow. He thinks this about a lot of things. But in this case he may be right.`,
    onEnter: () => { S.incrementTheosis(3); S.modReputation('lena', 1); S.setFlag('stink_patrol_hands_known'); },
    choices: [
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  // ── VANCE LANDSTORM (radio, never boards) ────────────────────────

  landstorm_radio_call: {
    id: 'landstorm_radio_call', location: 'Instrument Room', mood: 'tense',
    text: ``,
    onEnter: () => {
      S.startDialogue([
        { speaker: null, text: 'The standard radio crackles. It has not crackled before — the anomaly has kept the standard frequencies mostly inert.' },
        { speaker: null, text: 'The voice is clear despite the interference. It is the voice of someone who has learned to be clear in all conditions.' },
        { speaker: 'Landstorm', text: 'This is Landstorm. How is the crossing proceeding?' },
        { speaker: null, text: 'He is not asking about the sea conditions. The question has a specific meaning.' },
        { speaker: null, text: 'You hold the receiver.' },
      ]);
      S.setFlag('landstorm_called');
      S.applyEffect({ doubt: 2, vigilance: 1 });
      S.showToast('Landstorm on the radio.', 'warning');
    },
    choices: [
      {
        text: '"The crossing is proceeding. Everything is in order."',
        next: 'landstorm_lie', vigilance: 1,
        condition: { type: 'not', condition: { type: 'flag', id: 'landstorm_called' } },
      },
      {
        text: '"I need more time to assess the situation."',
        next: 'landstorm_delay',
        condition: { type: 'not', condition: { type: 'flag', id: 'landstorm_called' } },
      },
      {
        text: 'Set the receiver down without answering.',
        next: 'landstorm_silence', theosis: 3,
        requires_flag: 'mission_reality_known',
        condition: { type: 'not', condition: { type: 'flag', id: 'landstorm_called' } },
      },
    ],
  },

  landstorm_lie: {
    id: 'landstorm_lie', location: 'Instrument Room', mood: 'tense',
    text: `— Good. He says. The word is brief and dry. — The timing is important. We are on schedule?

— On schedule.

— The material is secure?

— Secure.

A pause. He is listening to something in the way you answer. He is always listening to something.

— Contact me when it is complete. He says. And the line goes quiet.

The standard radio returns to static. The anomaly resumes its interference. Alexei's instruments continue measuring.

You said it was in order. For now, it is not in order. At some point these two facts will resolve into one.`,
    onEnter: () => {
      S.applyEffect({ doubt: 2 });
      S.degradeCover(1);
    },
    choices: [
      { text: 'Go find Miguel.', next: 'act_two_miguel' },
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  landstorm_delay: {
    id: 'landstorm_delay', location: 'Instrument Room', mood: 'tense',
    text: `A pause.

— The situation. He says. — What situation requires assessment?

— The magnetic conditions are unusual. The crew are aware of the archive. There are variables.

Another pause. Longer.

— The variables are not your concern. The task is your concern.

— I understand.

— Do you.

It is not a question. The line goes quiet.

You have bought some time. You are not sure what it cost.`,
    onEnter: () => {
      S.applyEffect({ doubt: 1, vigilance: 1 });
      S.setFlag('landstorm_delayed');
    },
    choices: [
      { text: 'Go find Miguel. Tell him.', next: 'act_two_miguel' },
      { text: 'Go find the radio.',         next: 'radio_discovery', condition: { type: 'not', condition: { type: 'flag', id: 'radio_found' } } },
      { text: 'Go to the main deck.',       next: 'main_deck_hub'   },
    ],
  },

  landstorm_silence: {
    id: 'landstorm_silence', location: 'Instrument Room', mood: 'uncanny',
    text: `You set the receiver down.

The static continues.

After a moment, the standard radio crackles again. He waits. He does not know the anomaly is strong enough to mask the fact that you did not respond. He thinks the interference ate the call.

Or he knows you did not respond. You cannot tell which.

The line goes quiet. The anomaly continues. The instruments measure.

Alexei, who came in at some point, says: — That was the standard frequency.

— Yes.

He nods slowly. — It will not reach us again tonight. He says. — Not at this deviation.

He does not ask what the call was about.`,
    onEnter: () => {
      S.incrementTheosis(4);
      S.applyEffect({ composure: 2 });
      S.setFlag('landstorm_silenced');
      S.setFlag('mission_refused');
    },
    choices: [
      { text: 'Find the radio. The other one.', next: 'radio_discovery', condition: { type: 'not', condition: { type: 'flag', id: 'radio_found' } } },
      { text: 'Go to the main deck.',            next: 'main_deck_hub'   },
    ],
  },

  // ── KYLIE MID-ACT (Day Two confrontation) ────────────────────────

  kylie_act_two: {
    id: 'kylie_act_two', location: 'Mess Hall — Night', mood: 'tense',
    art: 'portrait_kylie',
    text: `She is at the table with her notebook closed, which is the first time you have seen the notebook closed.

— Sit down. She says. It is not quite an order. It is not quite a request.

She is looking at you the way she looks at the sea when she thinks no one is watching. Calculating the distance.

— I know who you are. She says. — Or rather — I know what you are. What you are is not a chaplain. What you are is the same thing I am, which is someone who was sent on this ship by someone else to do something specific. My something is not the same as yours.

She opens her notebook. She closes it again.

— What I want to know is whether you are going to do it.`,
    onEnter: () => {
      if (!S.hasFlag('cover_challenged_before')) {
        S.setFlag('cover_challenged_before');
        setTimeout(() => S.showToast('Cover challenge incoming — roll Composure. Check STATUS for your stats.', 'warning'), 600);
      }
      S.setFlag('kylie_act_two_confronted');
      S.applyEffect({ vigilance: 2, doubt: 1 });
    },
    choices: [
      {
        text: 'Hold cover. Deny everything calmly.',
        next: 'kylie_act_two_deny',
        vigilance: 1,
      },
      {
        text: '"What are you going to do with the answer?"',
        next: 'kylie_act_two_question',
        vigilance: 1,
      },
      {
        text: "'No. Not going to do it.'",
        next: 'kylie_act_two_truth',
        theosis: 3,
        requires_flag: 'mission_reality_known',
      },
    ],
  },

  kylie_act_two_deny: {
    id: 'kylie_act_two_deny', location: 'Mess Hall — Night', mood: 'tense',
    text: `You give her the cover. Smoothly. All five fields in the right order.

She listens. She writes nothing.

— That's very good. She says. — I've heard better, but not on a ship this size.

She stands.

— You should know. She says. — What is in that hold matters to more people than the people who sent you. The article I am writing has been planned for eighteen months. It requires the ship to arrive with the archive intact.

She picks up her notebook.

— You may do what you are going to do. She says. — I will do what I am going to do. We will see whose version of events reaches shore first.

She leaves.

The cover held. Something else did not.`,
    onEnter: () => {
      S.degradeCover(1);
      S.applyEffect({ doubt: 2 });
      S.setFlag('kylie_knows_truth');
    },
    choices: [
      { text: 'Go find Miguel.', next: 'act_two_miguel' },
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  kylie_act_two_question: {
    id: 'kylie_act_two_question', location: 'Mess Hall — Night', mood: 'tense',
    text: `She considers this.

— I'm going to write about it. She says. — Whatever happens. The archive, the ship, the crossing. What it is and who it belongs to. I have eighteen months of groundwork. I have sources in Finland and Germany and Moscow.

She looks at you.

— What you do will be part of the story. She says. — I would prefer it to be the part of the story where the chaplain helped.

She means this. The warmth in her voice when she says *helped* is the first unstructured warmth she has shown on this ship. It is brief. It is real.`,
    onEnter: () => {
      S.applyEffect({ vigilance: 1 });
      S.setFlag('kylie_knows_truth');
      S.modReputation('kylie', 3);
    },
    choices: [
      {
        text: '"Then let me help."',
        next: 'kylie_alliance',
        requires_flag: 'mission_reality_known',
        condition: { type: 'not', condition: { type: 'flag', id: 'kylie_in_alliance' } },
      },
      {
        text: '"I understand."',
        next: 'main_deck_hub',
      },
    ],
  },

  kylie_alliance: {
    id: 'kylie_alliance', location: 'Mess Hall — Night', mood: 'neutral',
    text: `Something changes in her face. Not relief exactly — she is too professional for relief — but something adjacent to it.

— Good. She says.

She reopens the notebook.

— Tell me what you know about the archive. Everything. I will record it separately from my other notes, in a format that can be transmitted.

She looks up.

— If something goes wrong with the radio. She says. — I have other ways to get material off this ship. I have been doing this for a long time.

She taps the notebook.

— Talk.`,
    onEnter: () => {
      S.setFlag('kylie_in_alliance');
      S.setFlag('mission_refused');
      S.modReputation('kylie', 4);
      S.incrementTheosis(4);
      S.applyEffect({ communion: 2 });
      S.showToast('Kylie knows. She is recording.', 'note');
    },
    choices: [
      { text: 'Tell her everything.', next: 'main_deck_hub' },
    ],
  },

  kylie_act_two_truth: {
    id: 'kylie_act_two_truth', location: 'Mess Hall — Night', mood: 'neutral',
    text: `She is quiet for a long moment.

— No. She repeats. As if verifying the word.

— No.

She looks at you for a while. Then she nods. Once. A different kind of acknowledgment than she has given anything else on this ship.

— Then we have the same problem. She says. — And possibly the same solution.

She opens the notebook.

— Tell me about the archive. All of it. Everything you've seen.`,
    onEnter: () => {
            S.recordNpcMemory('kylie', 'admitted the mission directly');
S.setFlag('kylie_in_alliance');
      S.setFlag('mission_refused');
      S.modReputation('kylie', 5);
      S.incrementTheosis(6);
      S.applyEffect({ communion: 2 });
      S.degradeCover(2);
      S.showToast('Cover blown. Kylie knows.', 'warning');
    },
    choices: [
      { text: 'Tell her everything.', next: 'main_deck_hub' },
    ],
  },

  // ── CONNIE FRANK: MEDICAL EMERGENCY ──────────────────────────────
  // Alexei collapses during the anomaly peak. Connie is the doctor.
  // The chaplain is needed. This is what a chaplain is for.

  connie_emergency: {
    id: 'connie_emergency', location: "Alexei's Cabin", mood: 'tense',
    art: 'portrait_connie',
    text: `Connie comes for you at 3am.

She does not explain on the way. You follow her down the companionway, through the forward passage, to Alexei's cabin. The anomaly has been at its peak for six hours.

Alexei is on his bunk. His instruments — he keeps a portable unit in his cabin — are still running. He is not looking at them. He is looking at the ceiling.

— He is not in danger. Connie says, quietly, at the door. — Physiologically. His blood pressure is elevated. He is exhausted. He has not slept in thirty-six hours because the instruments kept alerting.

She looks at him.

— He is also very frightened. She says. — Which is not a medical diagnosis. But it is accurate.

She steps back.

— He won't talk to me about it. She says. — That is what chaplains are for.`,
    onEnter: () => {
      S.setFlag('connie_emergency_happened');
      S.applyEffect({ communion: 1 });
      S.modReputation('connie', 3);
    },
    choices: [
      { text: 'Go in.',  next: 'alexei_emergency_cabin' },
    ],
  },

  alexei_emergency_cabin: {
    id: 'alexei_emergency_cabin', location: "Alexei's Cabin", mood: 'uncanny',
    art: 'portrait_alexei',
    text: `He looks at you when you come in. He has the expression of a man who has been alone with something for too long.

— The structure below. He says. — I have been measuring it for six hours. It is not getting smaller.

He means the anomaly. He means more than the anomaly.

— In my career. He says. — I have measured things. Things that were there. Things that the models predicted and then confirmed. Things that were surprising but explicable.

He looks at the ceiling.

— This is not any of those. He says. — The structure is enormous. The field it generates is — the readings I am getting require a source that is either very old or very — He stops. — I do not have a scientific word for what I mean. The readings require a source that is *aware* of being measured.

He looks at you.

— Is that possible? He asks. — Theologically.`,
    onEnter: () => {
      S.incrementTheosis(5);
      S.setFlag('alexei_emergency_talked');
      S.modReputation('alexei', 4);
    },
    choices: [
      {
        text: '"Gregory Palamas would say: yes. And no. And the distinction is everything."',
        next: 'alexei_palamas',
        theosis: 4,
      },
      {
        text: "'I do not know. But the question is correct.'",
        next: 'alexei_honest_answer', theosis: 2,
        condition: { type: 'not', condition: { type: 'flag', id: 'alexei_emergency_talked' } },
      },
      {
        text: 'Sit with him. No answer yet.',
        next: 'alexei_sit_together', theosis: 3, composure: 1, tags: ['pastoral', 'solidarity', 'presence'],
        condition: { type: 'not', condition: { type: 'flag', id: 'alexei_emergency_talked' } },
      },
    ],
  },

  alexei_palamas: {
    id: 'alexei_palamas', return_to: 'instrument_shimmer', return_label: '← Instrument room.', location: "Alexei's Cabin", mood: 'uncanny',
    text: `He sits up slightly.

You tell him about the distinction between the divine essence and the divine energies. The essence unknowable, unreachable, utterly beyond. The energies: real, participable, present in creation. Not the same as the thing itself. The light on Tabor. The field that makes certain things more likely. The anomaly that pulls the compass off true north.

He listens with the focus of someone who has been waiting for the right language.

— So the field. He says. — Is not God. But is — a property of — a medium through which—

— Something like that.

He looks at his instruments.

— Then measuring it. He says slowly. — Would be—

— Participating in it. Yes.

He is quiet for a long time.

— I have been doing that for thirty years. He says. — Without knowing I was doing that.

He lies back.

— I think I can sleep now. He says.`,
    onEnter: () => {
      S.incrementTheosis(8);
      S.modReputation('alexei', 5);
      S.applyEffect({ communion: 2 });
      if (S.G.worldState) S.G.worldState.sanctity = Math.min(10, S.G.worldState.sanctity + 2);
            S.recordNpcMemory('alexei', 'Palamas — thirty years without knowing');
S.setFlag('alexei_palamas_told');
      S.comeToBelieve('energies_real');
    },
    choices: [
      { text: 'Stay until he sleeps.', next: 'alexei_sleeps', theosis: 2, composure: 1 },
      { text: 'Leave him to it.',       next: 'main_deck_hub' },
    ],
  },

  alexei_honest_answer: {
    id: 'alexei_honest_answer', location: "Alexei's Cabin", mood: 'uncanny',
    text: `He looks at you for a moment. Then nods.

— That is the most useful thing anyone has said to me in six hours. He says. — Including myself.

He sits up.

— The question being correct. He says. — That is already something.

He looks at his instruments.

— I will continue measuring. He says. — If the question is correct, the measurements are also correct. They are — measuring something real.

He seems steadier. Not resolved. Steadied.

— Thank you. He says. — That is what chaplains are for, I suppose.`,
    onEnter: () => {
      S.incrementTheosis(5);
      S.modReputation('alexei', 4);
      S.applyEffect({ communion: 1 });
    },
    choices: [
      { text: 'Stay until he sleeps.', next: 'alexei_sleeps', theosis: 2 },
      { text: 'Leave him to it.',       next: 'main_deck_hub' },
    ],
  },

  alexei_sit_together: {
    id: 'alexei_sit_together', location: "Alexei's Cabin", mood: 'uncanny',
    text: `You sit in the chair by his bunk.

He doesn't say anything for a long time. The instruments run. The anomaly continues.

After a while his breathing slows.

After a while longer he says: — Do you think it knows we are here?

— I think. Yes.

— Good. He says. — That is good.

He closes his eyes. He does not sleep immediately. But he stops being alone with it.

That is enough.`,
    onEnter: () => {
      S.incrementTheosis(6);
      S.modReputation('alexei', 5);
      S.applyEffect({ composure: 2, communion: 2 });
      S.offerSounding('sounding_solidarity');
    },
    choices: [
      { text: 'Stay until he sleeps.', next: 'alexei_sleeps' },
    ],
  },

  alexei_sleeps: {
    id: 'alexei_sleeps', location: 'Corridor', mood: 'neutral',
    text: `Connie is in the corridor.

She looks at you. She looks at the cabin door.

— He is sleeping. You tell her.

She nods. She writes something in her small notebook — not the medical one.

— That. She says, without looking up. — Was the chaplain thing.

She puts the notebook away.

— Not the cover. She says. — The actual thing.

She goes back to her own cabin. The corridor is quiet. The instruments in Alexei's cabin are still running. The ship is still measuring.`,
    onEnter: () => {
      S.incrementTheosis(4);
      S.modReputation('connie', 5);
      S.applyEffect({ composure: 2 });
      S.setFlag('connie_saw_chaplain');
      if (S.G.worldState) S.G.worldState.socialTrust = Math.min(10, S.G.worldState.socialTrust + 2);
    },
    choices: [
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },



  // ── SUGGESTION 2: ANOMALY RESPONDS ──────────────────────────────

  anomaly_responds: {
    id: 'anomaly_responds', location: 'Instrument Room', mood: 'revelation',
    art: 'portrait_alexei',
    text: `Alexei is at the instruments when you come in.

He is not writing. He is standing very still with his hands at his sides looking at a readout that he has not explained to you yet.

— Come here. He says.

The readout shows the deviation over the last six hours plotted as a curve. You can read this. The curve drops, peaks, drops, peaks — a rhythm.

— This started two hours after the Sunday service. He says. — And again after you were in the hold.

He points to two marked positions on the timeline.

— The anomaly is responding to something we are doing. He says this with the precision of a scientist who has checked the statement three times. — The deviation pattern correlates with — He pauses. — With acts of witness. Presence. The service. The sitting.

He looks at you.

— I am not drawing a theological conclusion. He says. — I am reporting what the instruments show.

He turns back to the readout.

— The instruments show the anomaly is receiving us.`,
    onEnter: () => {
      S.incrementTheosis(7);
      S.setFlag('anomaly_responds_seen');
      S.modReputation('alexei', 3);
      S.modStance('alexei', 'trust', 2);
      S.modShipState('saturation', 2);
      S.unlockCodexEntry('codex_magnetic_anomaly');
      S.showToast('The anomaly is receiving.', 'theosis');
    },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'anomaly_peak_occurred' },
      { type: 'or', conditions: [
        { type: 'flag', id: 'sunday_service_led' },
        { type: 'flag', id: 'hold_sat' },
        { type: 'flag', id: 'hold_bless_archive' },
      ]},
      { type: 'not', condition: { type: 'flag', id: 'anomaly_responds_seen' } },
    ]},
    choices: [
      { text: '"What is it responding to?"',               next: 'anomaly_responds_what', theosis: 3 },
      { text: 'Look at the readout with him. Say nothing.', next: 'anomaly_responds_silence', theosis: 4, composure: 1 },
      { text: '"Then it knows we are here."',              next: 'anomaly_responds_knows',
        condition: { type: 'believes', id: 'energies_real' }, theosis: 5 },
    ],
  },

  anomaly_responds_knows: {
    id: 'anomaly_responds_knows', location: 'Instrument Room', mood: 'revelation',
    text: `Alexei looks at you.

— Yes. He says. Very quietly.

He looks at the readout.

— That is the theological conclusion I was declining to draw. He says. — You just drew it.

He writes it down. He writes: *it knows we are here.*

He closes the notebook.

— The energies. He says. — Participation in what is actually there. The field is participable. We have been participating in it for thirty years without knowing we were doing that.

He opens the notebook again and underlines what he wrote.

— Now we know. He says.`,
    onEnter: () => {
      S.incrementTheosis(8);
      S.modReputation('alexei', 4);
      S.comeToBelieve('anomaly_responds');
      S.applyEffect({ composure: 2, communion: 2 });
      S.flashTheosisLight(0.6, 4000);
    },
    choices: [{ text: 'Go to the main deck.', next: 'main_deck_hub' }],
  },

  anomaly_responds_what: {
    id: 'anomaly_responds_what', location: 'Instrument Room', mood: 'revelation',
    text: `— That is the theological conclusion I am declining to draw. He says. — What I can say is: the correlation is with specific types of attention. Sustained, non-instrumental attention.

He pauses.

— Worship, one might say. If one were drawing theological conclusions.

He turns off the readout display and turns it back on. The curve is still there.

— The ship was built to attend to the field without distorting it. He says. — Perhaps that is what we have been doing. Perhaps the anomaly recognises the quality of attention.

He picks up his pencil.

— Or it is a coincidence. He says. — I note both possibilities.

He writes something. He underlines it twice.`,
    onEnter: () => { S.incrementTheosis(5); S.modReputation('alexei', 2); },
    choices: [
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  anomaly_responds_silence: {
    id: 'anomaly_responds_silence', location: 'Instrument Room', mood: 'revelation',
    text: `You stand with him and look at the readout.

The curve. The two peaks. The hours they correspond to.

After a while Alexei says: — I have been a scientist for twenty-three years. He says. — In that time I have measured what is actually there. I have always believed that what is actually there is what matters.

He looks at the curve.

— What is actually there. He says again. As if deciding something.

He does not say what he has decided. He goes back to writing. But when you leave, he is smiling very slightly at the readout, which is not a thing scientists usually do at data.`,
    onEnter: () => { S.incrementTheosis(7); S.modReputation('alexei', 3); S.applyEffect({ composure: 2 }); S.offerSounding('sounding_sobornost'); },
    choices: [
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  // ── SUGGESTION 3: LANDSTORM SECOND AND THIRD CALL ────────────────

  landstorm_second_call: {
    id: 'landstorm_second_call', location: 'Instrument Room', mood: 'tense',
    text: `The standard radio again.

This time there is no preamble.

— Status. He says.

One word. The word has the quality of a document reference rather than a question.

You hold the receiver. You have already decided something. The only question is how you communicate it.`,
    onEnter: () => {
      S.setFlag('landstorm_second_called');
      S.applyEffect({ doubt: 2, vigilance: 1 });
      S.modShipState('paranoia', 2);
      S.showToast('Landstorm again.', 'warning');
    },
    choices: [
      {
        text: 'Maintain cover. Everything is proceeding.',
        next: 'landstorm_second_lie',
        condition: { type: 'not', condition: { type: 'flag', id: 'mission_refused' } },
      },
      {
        text: 'Set the receiver down again. Let the anomaly have it.',
        next: 'landstorm_second_silence',
        theosis: 2,
      },
      {
        text: '"The situation has changed. I am no longer able to complete the mission."',
        next: 'landstorm_second_refuse',
        requires_flag: 'mission_refused',
        requires_stat: ['composure', 4],
      },
      {
        text: '"I need more time to assess the situation." Calm. Total composure.',
        next: 'landstorm_composure_hold',
        requires_stat: ['composure', 6],
        condition: { type: 'not', condition: { type: 'flag', id: 'landstorm_second_called' } },
      },
    ],
  },

  landstorm_second_lie: {
    id: 'landstorm_second_lie', location: 'Instrument Room', mood: 'tense',
    text: `— Confirmed. He says immediately. He is keeping the calls short.

— Estimated completion?

You give him a time. It is not a real time. It sounds like a real time.

— Good. He says. And the line goes quiet.

The lie was clean. That is worse than if it had not been clean.`,
    onEnter: () => { S.applyEffect({ doubt: 3 }); S.degradeCover(1); S.modShipState('paranoia', 1); },
    choices: [
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  landstorm_second_silence: {
    id: 'landstorm_second_silence', location: 'Instrument Room', mood: 'uncanny',
    get text() {
      let t = 'You set the receiver down.\n\nThe static.\n\nThe anomaly is at its current level, which is high enough that the standard frequencies are genuinely unreliable. It is possible he lost the call again. It is possible he did not.\n\nAlexei appears in the doorway — he hears everything on these frequencies from his instruments.\n\nHe looks at the receiver.\n\n— He will try once more. He says, as if he knows. — Then he will call Othis.';
      if (S.hasCompanion && S.hasCompanion('pavel') && S.getStance && S.getStance('pavel', 'trust') >= 4) {
        t += '\n\nPavel appears in the doorway behind Alexei. He looks at the receiver. He looks at you.\n\n— Good, he says. Just that.';
      }
      return t;
    },
    onEnter: () => { S.incrementTheosis(3); S.applyEffect({ composure: 1 }); S.setFlag('landstorm_knows_something'); },
    choices: [
      { text: 'Find Othis before Landstorm does.', next: 'othis_confrontation', condition: { type: 'not', condition: { type: 'flag', id: 'othis_confrontation_happened' } } },
      { text: 'You have been counting. He has walked past three times.', next: 'othis_surveillance_noted', requires_stat: ['vigilance', 6], condition: { type: 'not', condition: { type: 'flag', id: 'othis_surveillance_noted' } } },
      { text: 'Find the radio. The other one.',     next: 'radio_discovery', condition: { type: 'not', condition: { type: 'flag', id: 'radio_found' } } },
      { text: 'Go to the main deck.',               next: 'main_deck_hub' },
    ],
  },

  landstorm_second_refuse: {
    id: 'landstorm_second_refuse', location: 'Instrument Room', mood: 'tense',
    text: `A very long silence.

— Say that again.

— The situation has changed. There are factors I was not briefed on. I am not able to complete the mission as specified.

Another silence.

— You were briefed. He says.

— Yes.

— Then you understand what this means.

— Yes.

The line goes quiet. Not disconnected — quiet. He is thinking, or making notes, or doing something that involves the kind of quiet that precedes consequence.

— I will be in contact with the vessel directly. He says.

He disconnects.

He means Othis. He means Othis will receive instructions you cannot intercept.

The clock has started.`,
    onEnter: () => {
      S.setFlag('landstorm_knows_refused');
      S.setFlag('mission_refused');
      S.applyEffect({ vigilance: 2 });
      S.modShipState('paranoia', 3);
      S.degradeCover(3);
      S.showToast('Landstorm knows.', 'warning');
      // Set deadline: if Othis not confronted before Compline, he acts
      S.setDeadline('othis_deadline', S.G.time.day, 6, 'othis_acts', { once: true });
    },
    choices: [
      { text: 'Find Othis. Now.',             next: 'othis_confrontation', condition: { type: 'not', condition: { type: 'flag', id: 'othis_confrontation_happened' } } },
      { text: 'Find Miguel.',                  next: 'act_two_miguel' },
      { text: 'Find the radio.',               next: 'radio_discovery', condition: { type: 'not', condition: { type: 'flag', id: 'radio_found' } } },
    ],
  },

  // ── SUGGESTION 5: LENA'S DIRECT SCENE ────────────────────────────

  lena_direct: {
    id: 'lena_direct', location: 'Galley — Night', mood: 'uncanny',
    art: 'portrait_lena',
    text: `She is cleaning something that does not need cleaning.

You come in. She does not stop.

After a while she says, not looking up:

— Twenty-two years on this ship. She says. — I have been through four captains, two refits, one fire in the galley, and three crossings where people died who should not have died.

She cleans the thing.

— I have never asked anyone what they intended to do. She says. — I have cooked and I have been here and I have known what the ship needed and let the ship do what ships do.

She stops.

She looks at you. Directly. For the first time in this conversation.

— But I am asking you. She says. — What are you going to do with the archive.

It is the first direct question she has ever asked you.`,
    onEnter: () => {
      S.setFlag('lena_direct_asked');
      S.modReputation('lena', 3);
      S.modStance('lena', 'trust', 3);
      S.incrementTheosis(4);
    },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'lena_archive_revealed' },
      { type: 'flag', id: 'act_two_begun' },
      { type: 'not', condition: { type: 'flag', id: 'lena_direct_asked' } },
    ]},
    choices: [
      {
        text: '"I am not going to destroy it."',
        next: 'lena_direct_response', set_flag: 'mission_refused',
        condition: { type: 'not', condition: { type: 'flag', id: 'mission_accepted' } },
      },
      {
        text: '"I am not sure yet."',
        next: 'lena_direct_unsure',
      },
      {
        text: '"I am going to transmit it."',
        next: 'lena_direct_transmit',
        requires_flag: 'radio_existence_known',
      },
    ],
  },

  lena_direct_response: {
    id: 'lena_direct_response', location: 'Galley — Night', mood: 'neutral',
    text: `She holds the look for a long moment.

Then she nods. Once. The way she hands you coffee — matter-of-fact, as if this was always going to be the answer and she just needed to hear it said.

She goes back to cleaning.

— Good. She says.

She does not say more. She does not ask how or when. She does not offer help. She does not need to.

The help is already there. It has been there for twenty-two years.

The ship knows.`,
    onEnter: () => {
            S.recordNpcMemory('lena', 'chose the archive');
S.incrementTheosis(6);
      S.modReputation('lena', 4);
      S.modStance('lena', 'solidarity', 3);
      S.modShipState('morale', 2);
      if (S.G.worldState) S.G.worldState.socialTrust = Math.min(10, (S.G.worldState.socialTrust || 5) + 2);
      S.showToast('Good.', 'note');
    },
    choices: [
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  lena_direct_unsure: {
    id: 'lena_direct_unsure', location: 'Galley — Night', mood: 'neutral',
    text: `She looks at you for a moment.

She turns back to what she is cleaning.

— Come back when you know. She says.

That is all.`,
    choices: [
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  lena_direct_transmit: {
    id: 'lena_direct_transmit', location: 'Galley — Night', mood: 'revelation',
    text: `She stops.

She is still for a moment.

— Yes. She says. — That is the right word for it.

She sets down the cloth. She looks at her hands.

— Volkov used to say: the ship was built to give what it found to the world. He said this about the measurements. He was right about the measurements. He was also right about more than the measurements.

She looks at you.

— I will make sure the mess hall is empty at midnight. She says. — Whatever noise a radio makes.

She goes back to cooking. The conversation is over. She has already done what needed to be done.`,
    onEnter: () => {
      S.incrementTheosis(8);
      S.modReputation('lena', 5);
      S.modStance('lena', 'solidarity', 4);
      S.setFlag('lena_knows_transmission');
      S.comeToBelieve('archive_matters');
      S.modShipState('morale', 2);
      if (S.G.worldState) S.G.worldState.socialTrust = Math.min(10, (S.G.worldState.socialTrust || 5) + 3);
      S.showToast('The mess hall will be empty.', 'note');
    },
    choices: [
      { text: 'Go find the radio.', next: 'radio_discovery', condition: { type: 'not', condition: { type: 'flag', id: 'radio_found' } } },
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  // ── SUGGESTION 6: PAVEL BEFORE CONVERGENCE ───────────────────────

  pavel_before_convergence: {
    id: 'pavel_before_convergence', location: 'Foredeck — Day Three', mood: 'revelation',
    text: `He is at the bow. He is always at the bow at the significant moments.

You stand beside him. It is Day Three.

— When I said you were close. He says, without preamble. — I meant close to what the crossing is actually for.

He looks at the water.

— The crossings are not tests. He says. — I want to be clear about that. There is no passing or failing. They are more like — He thinks. — A shore that gets slightly less far away each time. You can see it now, I think.

He looks at you.

— What happens when you reach the shore. He says, — is that the ship becomes Заря not just in name but in fact. What she actually is, permanently, regardless of what the documents say.

He looks at the bow.

— That is what the archive transmission does. He says. — It names her correctly into the world. And what is correctly named is correctly real.

He is quiet for a moment.

— This crossing is the one. He says. He says it the way someone confirms an appointment. — Whether through you alone, or the crew, or some combination the ship has arranged. This is the crossing.

He does not say what that costs.`,
    onEnter: () => {
      S.incrementTheosis(8);
      S.setFlag('pavel_convergence_told');
      S.modStance('pavel', 'trust', 3);
      S.modCompanionStat('pavel', 'trust', 3);
      S.applyEffect({ composure: 2 });
      S.flashTheosisLight(0.5, 4000);
    },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'act_three_begun' },
      { type: 'not', condition: { type: 'flag', id: 'pavel_convergence_told' } },
    ]},
    choices: [
      { text: '"What does it cost?"',        next: 'pavel_convergence_cost', theosis: 2 },
      { text: 'Stand with him. No questions.', next: 'foredeck_standing', theosis: 3, composure: 1 },
    ],
  },

  pavel_convergence_cost: {
    id: 'pavel_convergence_cost', location: 'Foredeck — Day Three', mood: 'revelation',
    text: `He is quiet for a long time.

— You. He says. — What you are performing becomes what you are. The chaplain becomes real. The cover cannot be recovered after that.

He looks at the bow.

— That is the crossing tax that doesn't appear in the numbers. He says. — The theosis you carry forward, minus fifteen, is the body's portion. The rest —

He pauses.

— The rest is what the crossing made.

He looks at you with something that is, in its way, kindness.

— You have already paid most of it. He says. — I think you know that.

He returns to the water.

The crossing is ending.`,
    onEnter: () => { S.incrementTheosis(6); S.applyEffect({ composure: 2, communion: 1 }); },
    choices: [
      { text: 'Go. Do what needs doing.', next: 'act_two_resolve' },
    ],
  },

  // ── SUGGESTION 8: PHOTO CROSS-REFERENCE ──────────────────────────

  photo_crossreference: {
    id: 'photo_crossreference', location: 'Galley', mood: 'neutral',
    text: `Lena is looking at something on the counter.

You see it before she looks up: the Volkov photograph — the one with the initial В on the back — and beside it, the 1972 photograph of Micha at the anomaly.

She must have placed them together.

She looks up.

— He is in both. She says.

You look.

She is right. The man in the background of the 1972 photograph — the one at the stove, at the line, at the stern — is the same man as in the Volkov photograph. The same posture. The same way of belonging completely to a place.

— Volkov sailed in 1972. She says. — I always knew. I did not know he was in the photographs until you found them.

She looks at both photographs.

— She remembers everyone who sailed on her. She says. She means the ship. — Even the ones whose names were not kept.

She slides both photographs toward you.

— They should stay together.`,
    onEnter: () => {
      S.incrementTheosis(7);
      S.modReputation('lena', 4);
      S.modStance('lena', 'trust', 2);
      S.setFlag('photos_crossreferenced');
      S.comeToBelieve('ship_remembers');
      S.setFlag('volkov_identified');
      S.addItem('both_photographs');
      S.applyEffect({ communion: 2 });
      S.showToast('The photographs belong together.', 'theosis');
    },
    condition: { type: 'and', conditions: [
      { type: 'flag', id: 'volkov_photo_found' },
      { type: 'flag', id: 'hold_micha_photo' },
      { type: 'not', condition: { type: 'flag', id: 'photos_crossreferenced' } },
    ]},
    choices: [
      { text: 'Keep them together.',  next: 'galley_hub' },
    ],
  },

  // ── SUGGESTION 9: COVER DEGRADATION VISIBLE IN NPC BEHAVIOUR ─────

  othis_post_degradation: {
    id: 'othis_post_degradation', location: 'Corridor', mood: 'tense',
    text: `Othis passes you in the corridor.

He does not say anything.

He has been saying something, however briefly, every time you have passed him on this ship. Even at his most guarded: a professional acknowledgment. A brief clipboard reference.

Not this time.

He walks past. He looks at the manifest in his hand. He keeps walking.

The change in his manner is precise and without anger. It is the manner of someone who has been given new information and is processing it procedurally.

He knows something. He has been told something, or has concluded something. The only question is what he does with it.`,
    onEnter: () => {
      S.applyEffect({ vigilance: 2, doubt: 1 });
      S.setFlag('othis_knows_something');
      S.modShipState('paranoia', 2);
    },
    condition: { type: 'and', conditions: [
      { type: 'stat', stat: 'coverIntegrity', max: 2 },
      { type: 'flag', id: 'mission_orders_read' },
      { type: 'not', condition: { type: 'flag', id: 'othis_confrontation_happened' } },
      { type: 'not', condition: { type: 'flag', id: 'othis_knows_something' } },
    ]},
    choices: [
      { text: 'Follow him.',          next: 'othis_confrontation' },
      { text: 'Let him process it.',  next: 'main_deck_hub', vigilance: 1 },
    ],
  },

  kylie_after_degradation: {
    id: 'kylie_after_degradation', location: 'Mess Hall', mood: 'tense',
    text: `Kylie does not open her notebook when you sit down.

This is notable.

— Your cover. She says. — Is gone.

Not a question.

— I know. You say.

She looks at you. The professional warmth is not quite gone — it has changed register. It has become something else. More direct.

— Good. She says. — It was slowing you down.

She opens the notebook.

— Tell me what you need from me.`,
    onEnter: () => {
      S.setFlag('kylie_cover_gone_acknowledged');
      S.modReputation('kylie', 3);
      S.modStance('kylie', 'solidarity', 2);
    },
    condition: { type: 'and', conditions: [
      { type: 'stat', stat: 'coverIntegrity', max: 1 },
      { type: 'flag', id: 'met_kylie' },
      { type: 'not', condition: { type: 'flag', id: 'kylie_in_alliance' } },
      { type: 'not', condition: { type: 'flag', id: 'kylie_cover_gone_acknowledged' } },
    ]},
    choices: [
      { text: '"Help me transmit the archive."', next: 'kylie_alliance', requires_flag: 'radio_existence_known' },
      { text: '"Record everything you have."',   next: 'kylie_alliance' },
    ],
  },

  // ── SUGGESTION 10: SOLIDARITY SIGNAL ─────────────────────────────

  solidarity_signal: {
    id: 'solidarity_signal', location: 'Hold Access', mood: 'neutral',
    text: `You come down the companionway and stop.

Someone has moved the boxes.

Not all of them — the archive is still in the hold. But the largest boxes, the ones marked with the earliest years, have been shifted away from the access hatch. Not hidden. Moved to the back wall. As if making room.

Freezer Beef is on top of the tallest one. She is looking at the new arrangement with the expression of someone who has confirmed a thesis.

Nobody did this with you. Nobody asked. Someone looked at the hold, understood what needed to happen, and did the first part of it.

You don't know who. It doesn't matter.

The ship knows who is on her.`,
    onEnter: () => {
      S.incrementTheosis(6);
      S.applyEffect({ communion: 2 });
      S.setFlag('solidarity_signal_seen');
      S.modShipState('morale', 2);
      if (S.G.worldState) S.G.worldState.socialTrust = Math.min(10, (S.G.worldState.socialTrust || 5) + 2);
      S.showToast('Someone acted without being asked.', 'theosis');
    },
    condition: { type: 'and', conditions: [
      { type: 'stat', stat: 'communion', min: 5 },
      { type: 'flag', id: 'hold_visited' },
      { type: 'flag', id: 'act_two_begun' },
      { type: 'not', condition: { type: 'flag', id: 'solidarity_signal_seen' } },
    ]},
    choices: [
      { text: 'Continue into the hold.', next: 'hold_first' },
      { text: 'Go find the people who might have done this.', next: 'main_deck_hub', theosis: 2 },
    ],
  },

  // ── MUNDANE TEXTURE ─────────────────────────────────────────────

  mess_ordinary: {
    id: 'mess_ordinary', location: 'Mess Hall — Afternoon', mood: 'neutral',
    text: `Nothing is happening.

This is notable because something has been happening continuously for three days.

Nadia has her head on the table. Not dramatically — she is resting her forehead on her arms and making a sound that is approximately the sound of someone who has been reading field data since 4am.

Alexei is reading a paperback that looks like it has been read several times before. He is on what appears to be page twelve.

Connie Frank is doing a crossword. She has been doing the same crossword since Reykjavik. This is either because it is very hard or because she does it slowly on principle.

— Four across, Nadia says without lifting her head. — 'Theological virtue, four letters.'

— Hope, says Alexei.

— It's love, says Connie.

— It's faith, you say.

All three of you look at each other. Nadia lifts her head.

— What is wrong with this ship, she says.

Nobody argues with this.`,
    onEnter: () => { S.setFlag('mess_ordinary_seen'); S.incrementTheosis(2); S.applyEffect({ composure: 1 }); S.modShipState('morale', 1); },
    choices: [
      { text: 'Go back to your cabin.', next: 'main_deck_hub' },
      { text: 'Stay for a bit.',         next: 'mess_stay', theosis: 1 },
    ],
  },

  mess_stay: {
    id: 'mess_stay', location: 'Mess Hall — Afternoon', mood: 'neutral',
    text: `Nadia goes back to sleep on her arms.

Alexei reads page twelve. He has been reading page twelve for possibly the entire crossing.

Connie finishes the crossword wrong and closes it with satisfaction.

You sit there. The sea does what the sea does. The anomaly is at its current level, which Alexei will have already measured and noted.

After a while Connie says: — Do you play chess?

— Badly.

— Good. She moves her chair.

You play a game of chess that is not, technically, about chess. You lose. You learn something about Connie Frank from how she plays. You are not sure what it is, but it is something.`,
    onEnter: () => { S.modReputation('connie', 2); S.modStance('connie', 'trust', 1); S.modShipState('morale', 1); S.applyEffect({ composure: 1 }); },
    choices: [
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  alexei_bad_joke: {
    id: 'alexei_bad_joke', location: 'Chart Room', mood: 'neutral',
    text: `Alexei is at the chart table. He looks up when you come in with the expression of someone who has been alone with an idea for too long.

— I have a joke. He says.

He does not wait.

— A magnetic anomaly walks into a bar. The compass doesn't know which way to turn.

He looks at you.

— That is the joke.

You look at him.

— I have been in this chart room for eleven hours. He says. — Also the joke does not fully work because compasses orient to magnetic north and an anomaly would create local variation rather than—

— It's fine.

— The structure is correct. The execution—

— It's fine, Alexei.

He nods. He goes back to his charts. He is, almost certainly, writing the joke down somewhere.`,
    onEnter: () => { S.modReputation('alexei', 1); S.modShipState('morale', 2); S.applyEffect({ composure: 1 }); },
    choices: [
      { text: 'Look at the charts with him.', next: 'chart_room_first' },
      { text: 'Go to the main deck.',          next: 'main_deck_hub' },
    ],
  },

  nadia_seasick: {
    id: 'nadia_seasick', location: 'Main Deck — Morning', mood: 'neutral',
    text: `Nadia is at the rail.

She is not looking at the anomaly data. She is looking at the sea with the specific concentration of someone whose body is engaged in disagreement with the sea.

You stand next to her. You do not say anything.

After a while she says: — I have been on six research cruises. She says. — I am still seasick every single time. On the second day. Every time.

— Does it pass?

— On the third day. Every time.

She grips the rail.

— It is extremely annoying. She says. — Given everything else.

You stand with her until the horizon helps.`,
    onEnter: () => { S.modReputation('nadia', 2); S.modStance('nadia', 'trust', 1); S.applyEffect({ communion: 1 }); },
    choices: [
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  othis_filing: {
    id: 'othis_filing', location: 'Hold Access', mood: 'neutral',
    text: `Othis is in the corridor with a clipboard, a pen, and the expression of someone performing a task that no longer has the meaning it had when it was assigned.

He is doing inventory. The manifest. Checking boxes against entries.

He knows the boxes are not in the right place. He has been checking the manifest against the wrong configuration for an hour. The numbers are coming out different each time, which they would, because the boxes are in a different place than the manifest says.

He writes something. He crosses it out. He writes it again.

You watch this for a moment.

He looks up.

— The manifest, he says, has an error.

— Yes.

— I am correcting it.

You both understand what is being said. Neither of you says it.

— Thank you. You say.

He nods. He returns to the clipboard. The inventory, in his version, will be correct.`,
    onEnter: () => {
      S.modStance('othis', 'trust', 2);
      S.modReputation('othis', 3);
      S.setFlag('othis_corrected_manifest');
      S.modShipState('paranoia', -1);
    },
    condition_to_appear: { type: 'flag', id: 'othis_confrontation_happened' },
    choices: [
      { text: 'Go to the hold.', next: 'hold_first' },
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  // ── NPC CONTRADICTIONS ───────────────────────────────────────────

  alexei_doubt: {
    id: 'alexei_doubt', return_to: 'instrument_shimmer', return_label: '← Instrument room.', location: 'Instrument Room', mood: 'uncanny',
    get text() {
      let base = 'Alexei is standing at the porthole.';
      if (S.hasNpcMemory && S.hasNpcMemory('alexei', 'Palamas — thirty years without knowing')) {
        base = 'Alexei is standing at the porthole. He has been here since the Palamas conversation. Thinking.';
      }
      return base + `

He has not turned when you come in. He is looking at the shimmer.

— I told you, he says, that the anomaly might be aware of being measured.

— Yes.

— I have been thinking about this. He turns. — It is possible that I was projecting. He says this carefully. — The instruments read deviation. The deviation has a pattern. Patterns are what human cognition processes as intentionality. It is possible that the anomaly is simply a large magnetised structure, that its behaviour is geophysical, that I have been treating data as communication because I want there to be communication.

He looks at his instruments.

— I am a scientist. He says. — I should have said this earlier. The other interpretation is more interesting, but interesting is not the same as true.

A pause.

— Although. He says. And then stops. He turns back to the porthole.

— Although, he says again. And does not finish.`;
    },

    onEnter: () => {
      S.incrementTheosis(4);
      S.modStance('alexei', 'trust', 1);
      S.modReputation('alexei', 2);
    },
    choices: [
      { text: '"The although is where the interesting part lives."', next: 'alexei_doubt_response', theosis: 3 },
      { text: '"Scientific caution is correct."',                     next: 'main_deck_hub' },
    ],
  },

  alexei_doubt_response: {
    id: 'alexei_doubt_response', location: 'Instrument Room', mood: 'uncanny',
    text: `He turns.

— The although. He repeats.

— Yes.

He thinks about this. He takes his notebook. He writes something. He shows it to you.

He has written: *although*

Below that: *the instruments are reading something. it does not matter what we call it.*

He looks at you.

— That is the most I can say honestly. He says.

— It is enough.

He nods. He closes the notebook. He goes back to the instruments.

The instruments are still reading something.`,
    onEnter: () => { S.incrementTheosis(5); S.modReputation('alexei', 3); S.modStance('alexei', 'solidarity', 1); },
    choices: [
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  kylie_also_reporting: {
    id: 'kylie_also_reporting', location: 'Mess Hall', mood: 'tense',
    text: `She says it when you are halfway through a sentence about something else.

— I should tell you. She says. — I'm filing two reports. One is the piece I told you about. The other goes to a different desk.

She does not look up.

— The second desk wants to know what happens to the archive. Not because they care about the archive. Because they want to know what Landstorm's people are doing and this seemed like a way to find out.

She picks up her coffee.

— So you should know. She says. — When I said we have the same problem. I meant that. But we also have adjacent and partially conflicting problems.

She looks at you.

— I still think helping you is the right move. She says. — I just want to be honest about what I am.

She is being honest about what she is. This is, in its way, a form of trust.`,
    onEnter: () => {
      S.setFlag('kylie_second_report_known');
      S.modStance('kylie', 'trust', 2);
      S.modReputation('kylie', 3);
      S.applyEffect({ vigilance: 1 });
    },
    condition_to_appear: { type: 'flag', id: 'kylie_in_alliance' },
    choices: [
      { text: '"I appreciate that."',        next: 'main_deck_hub', communion: 1 },
      { text: '"Whose desk?"',               next: 'kylie_whose_desk' },
    ],
  },

  kylie_whose_desk: {
    id: 'kylie_whose_desk', location: 'Mess Hall', mood: 'tense',
    text: `She looks at you.

— If I told you that, she says, — it would defeat the purpose of the arrangement.

A pause.

— Let me put it this way. She says. — The desk is not hostile to the archive's existence. It is hostile to Landstorm's operation. The outcomes, in this case, are aligned.

She closes her notebook.

— Think of me as someone with complicated employers who nevertheless wants this to come out right.

She looks at the window.

— Same as you, probably.`,
    choices: [
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  // ── INTERMEDIATE EMOTIONAL STATES — Miguel ──────────────────────

  miguel_intermediate: {
    id: 'miguel_intermediate', location: 'Bridge', mood: 'neutral',
    text: `He is at the wheel. He is always at the wheel, or near it.

You come in and stand for a while. He does not speak. This is not unfriendliness. This is how Miguel operates — he registers presence and decides what it means before committing to language.

After a minute:

— You have been to the hold. He says.

It is not a question.

— Yes.

He adjusts something. He looks at the horizon.

— The woman who cooked before Lena. He says. — Her name was not Volkov. That was her husband's name. Her name was Irina. She cooked on this ship for six years. She taught Lena the coffee.

He does not say why he is telling you this.

— The coffee is good. You say.

— Yes. He says. And goes back to looking at the horizon.

You have been told something. You are not sure what.`,
    onEnter: () => {
      S.incrementTheosis(3);
      S.modStance('miguel', 'trust', 1);
      S.modReputation('miguel', 2);
      S.setFlag('miguel_irina_told');
    },
    condition_to_appear: { type: 'and', conditions: [
      { type: 'flag', id: 'hold_visited' },
      { type: 'not', condition: { type: 'flag', id: 'miguel_irina_told' } },
    ]},
    choices: [
      { text: '"Thank you."', next: 'bridge_hub', theosis: 1 },
      { text: 'Nod. Go back down.', next: 'main_deck_hub' },
    ],
  },

  // ── INTERRUPTION / FRAGMENTED SCENES ────────────────────────────

  pavel_interrupted: {
    id: 'pavel_interrupted', location: 'Foredeck', mood: 'neutral',
    text: `Pavel is in the middle of a sentence about impermanence when Alexei's voice comes from the bridge.

— The deviation has shifted. He is not yelling. He has simply announced this to the available air, which includes the foredeck.

Pavel stops.

He looks in the direction of the bridge.

— He does that. He says. — When the instruments do something unexpected. He announces it to the ship.

He considers.

— The ship probably knows. He says. — But it seems polite.

He looks at you.

— We can continue, he says. — Or we can go see what the instruments did. Both are valid.`,
    onEnter: () => { S.setFlag('pavel_interrupted_seen'); S.incrementTheosis(2); S.modShipState('morale', 1); },
    choices: [
      { text: 'Go see what the instruments did.', next: 'instrument_room_first' },
      { text: 'Stay. Let Pavel finish.',            next: 'act_two_pavel', theosis: 1 },
    ],
  },

  // ── RITUAL COST / COVER RISK ──────────────────────────────────────

  sunday_service_aftermath: {
    id: 'sunday_service_aftermath', location: 'Mess Hall', mood: 'neutral',
    text: `The service is over. People are leaving slowly.

Othis was not there. But he was in the corridor outside — you heard him once, footsteps that stopped. He stood there long enough to hear something and then walked away.

Later:

Othis will file a note in his log that the chaplain conducted a service that was, in his assessment, unusually theologically dense for a maritime context. He will note that several crew members appeared emotionally affected. He will note that this is consistent with pastoral function but may warrant attention.

Landstorm will read this note. He will make a mark next to the chaplain's name. The mark will not be explained.

The coffee Lena makes after the service is better than the coffee she makes at other times. You do not know how. You accept it.`,
    onEnter: () => {
      S.incrementTheosis(2);
      S.modShipState('saturation', 1);
      S.modShipState('paranoia', 1);
      S.modReputation('lena', 2);
      S.setFlag('sunday_aftermath_seen');
    },
    choices: [
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // ENDINGS
  // ─────────────────────────────────────────────────────────────

  ending_erasure: {
    id: 'ending_erasure', location: 'Hold', mood: 'uncanny',
    get text() {
      const lines = [];

      // Opening: the act itself, in detail
      lines.push(`The instructions were clear. You followed them.`);
      lines.push(`The materials were in the cabinet under the workbench in the hold — accelerant, a metal bin, a lighter that worked on the first try. Othis gave you the key once you showed him the envelope. He held the door for you. He did not look at what you were doing. He went up to the deck and stood at the rail facing away and did not move until it was over.`);
      lines.push(`Paper that has survived thirty years at sea does not go easily. It took longer than you expected. The photographs went first — they curled inward and went dark and then the images were gone. The logs took longer. You stood with them until they were ash.`);
      lines.push(`The smoke went up through the hatch. It was thin and pale and dispersed quickly in the Atlantic wind. By the time the crew had any sense of it, it was already nothing.`);

      // What each person did
      if (S.hasFlag('alexei_emergency_talked')) {
        lines.push(`Alexei stayed in the instrument room throughout. The instruments continued to measure. The deviation did not change because something had been burned — why would it? The anomaly is geological. It predates the archive by millions of years. It will outlast this crossing by millions more. Earlier, Alexei had said: I think I can sleep now. He did not sleep. He measured.`);
      } else {
        lines.push(`Alexei stayed in the instrument room throughout. His instruments were still measuring — the deviation log running, the readings printing in the small square script of the old machinery. What they measured did not change. The anomaly does not know about the archive. It never did.`);
      }

      if (S.hasFlag('pavel_is_companion')) {
        lines.push(`Pavel was on the foredeck. He did not watch the smoke. When it was over he came below — not to speak, not to confront, not to witness. He put his hand on the hatch for a moment and then went back up. You understood this.`);
      } else {
        lines.push(`Pavel was on the foredeck. He did not watch the smoke. Whether he knew was not something you asked.`);
      }

      lines.push(`Miguel stood at the wheel. The ship continued north. He said nothing. The ship said nothing. The North Atlantic said nothing. This is what the North Atlantic does.`);

      if (S.hasFlag('lena_fragment_4_seen')) {
        lines.push(`In the galley, Lena made breakfast. She had told you about Volkov — the cook before her, who had sailed in 1972, who came back, who checked the bilge every morning because the ship needed someone paying attention. She made breakfast the same way she always made it. Her hands knew what to do. Some things are carried in hands and cannot be burned.`);
      } else if (S.hasFlag('lena_volkov_told')) {
        lines.push(`In the galley, Lena made breakfast. She made it the same way she always made it. She knew what had happened. She made breakfast anyway. The cook before her had checked the bilge every morning. That was his way of paying attention. She was paying attention too.`);
      } else {
        lines.push(`In the galley, Lena made breakfast. She did not speak about what had happened. She made coffee. She made enough for everyone. This was also a kind of attention.`);
      }

      // What was lost — the specific cost
      lines.push(`The archive is gone.`);
      lines.push(`Not the ship's name in the documents — they will find another name for her, or leave the existing one. Not the anomaly — the anomaly is geological and will continue to be measurable at this position long after the ship and the crew and the organization that chartered this crossing have been absorbed into other records or no records. What is gone is the record of who found it and how and what they thought it meant. Thirty years of scientists from five countries, in difficult conditions, carefully measuring something they did not fully understand and faithfully writing down what they found. That is gone.`);

      if (S.believes && S.believes('chaplain_real')) {
        lines.push(`You burned the archive. You were, by the end of it, a chaplain — not performing one. Being one. The cover became the thing. What you had become and what you destroyed went together, in the hold, in the early morning, in the pale smoke. That is the specific cost of this ending. This is not the same as saying it was wrong. The chaplain does not have the luxury of that certainty.`);
      }

      // The dawn
      lines.push(`The dawn, when it came, was ordinary. The sky went from black to dark blue to a pale grey that contained no special information. The sun came up. The instruments continued to run. The ship continued north.`);
      lines.push(`You made a crossing.`);
      lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━\n  ERASURE\n━━━━━━━━━━━━━━━━━━━━━━━━`);
      return lines.join('\n\n');
    },
    onEnter: () => {
      S.setFlag('ending_erasure_reached');
      S.unlockMeta('reached_erasure');
      S.addJournalEntry({ type: 'ending', text: 'Erasure — the archive is gone.' });
      S.showToast('Erasure.', 'warning');
    },
    choices: [
      { text: 'Begin a new crossing.', next: 'crossing_record' },
    ],
  },

  ending_witness: {
    id: 'ending_witness', location: 'Hold', mood: 'uncanny',
    get text() {
      const lines = [];

      lines.push(`You refused.`);
      lines.push(`Not loudly. Not in confrontation. In the hold, in the dark, with Freezer Beef watching from her box in the aft corner with the expression she always has — the one that means she has known what is happening for longer than you have.`);
      lines.push(`You moved the most important boxes to a location not on any current manifest. A space below the forward hold, in the construction documentation but not in any document produced after 1960. Miguel knew about it. He showed you without asking why you needed to know. He knows this ship in ways the people who chartered this crossing do not.`);

      // What the refusal cost
      lines.push(`Othis will find this, when the ship docks. He will find it in the difference between the manifest weight and the cargo weight, or in a sound, or in something Landstorm says when he is informed. He is thorough. He will find it.`);
      lines.push(`Landstorm will be informed. He will have questions that require answers. Those answers will have consequences, and the consequences will arrive on land, in offices, in processes that move slowly and have institutional patience.`);
      lines.push(`On land is not here.`);

      // The ship in the aftermath
      lines.push(`Here is what the ship is doing: moving. Alexei is in the instrument room, measuring. Nadia found something in the data this morning — a pattern in the deviation readings that made her go very still and then begin writing in the rapid, focused way she writes when she has found something real. Pavel is on the foredeck with his rope. Lena is in the galley. The bronze fittings caught the last of the day's light and held it.`);

      if (S.hasFlag('kylie_in_alliance')) {
        lines.push(`Kylie Matterhorn has two notebooks. One is the official record of her embedded research. The other is in her coat. The one in her coat has everything you told her, in her handwriting, dated, signed. Whatever happens when the ship docks, there are two accounts of this crossing. The archive is not the only record.`);
      }
      if (S.hasFlag('connie_saw_chaplain')) {
        lines.push(`Connie Frank will write something in her ship's medical report. It will not be about the cargo. It will be about what she observed in the chaplain over three days — a specific quality of attention that she has seen before, in people who are in the middle of understanding something real about their work. She will not use the word theosis. She will describe what she saw.`);
      }
      if (S.hasFlag('archive_blessed')) {
        lines.push(`The archive has been blessed, in its new location. The blessing was not a cause of anything. Whether it changed anything is the kind of question that will not be answered in this crossing.`);
      }

      // The argument
      if (S.believes && S.believes('archive_matters')) {
        lines.push(`You knew what you were protecting. Not just records — though thirty years of scientific records from five countries are not nothing. A way of being in the world. The way the ship was built: to measure without distorting, to find without claiming, to share rather than hold. The archive is not the ship — but the archive is what the ship was doing. You protected what the ship was doing. The archive is in the ship. The ship is still moving.`);
      } else {
        lines.push(`The archive is still in the world. Somewhere on a ship built to be transparent — brass fittings, no iron, built so its own material doesn't distort what it finds — thirty years of finding is still findable.`);
      }

      lines.push(`You witnessed. This is not a modest achievement. To witness, and to protect what was witnessed, and to refuse the instruction to make it disappear — this is its own form of the work.`);
      lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━\n  WITNESS\n━━━━━━━━━━━━━━━━━━━━━━━━`);
      return lines.join('\n\n');
    },
    onEnter: () => {
      S.setFlag('ending_witness_reached');
      S.unlockMeta('reached_witness');
      S.addJournalEntry({ type: 'ending', text: 'Witness — the archive is hidden.' });
      S.showToast('Witness.', 'note');
    },
    choices: [
      { text: 'Begin a new crossing.', next: 'crossing_record' },
    ],
  },

  ending_restoration: {
    id: 'ending_restoration', location: 'Instrument Room', mood: 'revelation',
    get text() {
      const lines = [];
      lines.push(`The radio — forty years old, original equipment, brass fittings, designed for high-deviation fields — was built for this.`);
      let broadcastLine = '';
      if (S.hasFlag('transmitted_names_first')) {
        broadcastLine = 'You broadcast the names first. Every scientist who had sailed on this ship. Thirty years of names, from five countries. The names went out before the coordinates, before the photographs. The record of who, before the record of what.';
      } else if (S.hasFlag('transmitted_data_first')) {
        broadcastLine = 'You broadcast the data first. Coordinates, deviation readings, measured anomalies. The raw record of what the ship found, in the language that any instrument in any country could read. The names came after. The photographs came after. The science went first.';
      } else if (S.hasFlag('transmitted_photos_first')) {
        broadcastLine = 'Nadia described the photographs first. Faces. People on a deck. Someone laughing at the bow. Someone squinting into sun. She described them in words because a radio is not a camera, and the words were exact. The coordinates came after. The names came after. The faces went first.';
      } else {
        broadcastLine = 'You broadcast everything simultaneously — whatever the archive gave, in whatever order it opened. Names and coordinates and photographs all at once, the way thirty years of work does not admit of priority.';
      }
      lines.push(broadcastLine);
      if (S.hasFlag('kylie_in_alliance')) {
        lines.push(`Kylie Matterhorn was outside the instrument room door for the last two hours of the transmission. She was taking her own notes. Whatever she does with them, there are now two records going into the world.`);
      }
      if (S.hasFlag('archive_blessed')) {
        lines.push(`The archive had been blessed before the transmission. The blessing was not a cause of anything. It was a witness. That is what blessing does.`);
      }
      lines.push(`The anomaly was at its peak. The signal went out in a direction that should not have been possible given the interference. It went anyway. The ship, which does not interfere, made room for it.`);
      lines.push(`Somewhere, someone heard.`);
      if (S.hasFlag('othis_turned')) {
        lines.push(`Othis stood at the instrument room door for thirty seconds and then went back to his cabin. He did not report what he saw. That was also a choice.`);
      }
      lines.push(`Alexei put his hand flat on the brass casing of the radio when the transmission ended. Then went back to his instruments.`);
      lines.push(`Pavel was there. You don't know when he arrived. He said: *yes.* Just that.`);
      if (S.hasFlag('anomaly_archive_connected')) {
        lines.push(`The anomaly below — the structure that Alexei had calculated was aware of being measured — received the transmission on its own frequency. What it does with that is not a question science can answer.`);
      }
      if (S.believes && S.believes('sobornost_real')) {
        lines.push(`Sobornost. The unity of a council. The transmission was not one person's act — it was the ship's, across thirty years of measurement and three days of crossing. Many voices, none erased.`);
      }
      lines.push(`Заря was in the anomaly, at the peak, broadcasting the record of everything she had found.\n\nShe was doing what she was built for.`);
      lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━\n  RESTORATION\n━━━━━━━━━━━━━━━━━━━━━━━━`);
      return lines.join('\n\n');
    },
    onEnter: () => {
      S.setFlag('ending_restoration_reached');
      S.unlockMeta('reached_restoration');
      S.addJournalEntry({ type: 'ending', text: 'Restoration — the record goes into the world.' });
      S.unlockCodexEntry('codex_zarya_history');
      S.flashTheosisLight(1.0, 5000);
      S.showToast('Restoration.', 'theosis');
    },
    choices: [
      { text: 'After the transmission.', next: 'restoration_after' },
    ],
  },

  restoration_after: {
    id: 'restoration_after', location: 'Foredeck — Dawn', mood: 'revelation',
    text: `At 4:18am the anomaly begins to recede.

Not all at once. Like water drawing back from a shore. Alexei marks the timestamp in his deviation log. He writes, beside the number: *received.* This is not a scientific annotation. He makes it anyway.

The ship is Заря.

She has been Заря since 1952. The documents that call her something else are the documents that are wrong. This has always been true. It is now slightly more true than it was yesterday, in the sense that the truth has now been transmitted.

The morning after:

Alexei goes to his cabin and sleeps for eleven hours. Before he does, he leaves his deviation log open on the chart table to the page with the timestamp. He does not close it.

Nadia is at breakfast when you come in. She does not look up. But the data she submitted to the standard channels last night contained, appended to the standard measurements, a full description of the anomaly, the archive, the transmission, and the scientists whose names were broadcast. She filed it under *supplemental observations.* It will be found.

Miguel is at the wheel. He is looking at the horizon the way someone looks at something they have agreed to trust, but differently than before. The agreement is different. It is no longer provisional.

Lena made something in the night — not a meal, something smaller. It is on the mess table when you pass through: a small arrangement of items from the galley that is not quite a shrine and not quite not. She has already gone back to the galley. You do not see her take it down.

Kylie Matterhorn is in her cabin, writing. The door is open for the first time. You do not go in.

Othis is on the aft deck, facing away from the ship. He stays there for most of the morning. He is not monitoring anything. He has nothing left to monitor.

Pavel is on the foredeck facing the bow. You stand beside him. You have been beside him, on and off, for three days. He does not say anything. After a while you understand that he is not not-saying anything. There is nothing more that needs to be said.

The horizon lightens.

Haircut sits between you.

Freezer Beef comes up from below, which she rarely does at this hour, and sits on your lap, which she has decided is her mission. She is asleep before the sun fully clears the horizon.

The four of you watch the dawn.

The transmission is in the world. Somewhere on the frequencies that use anomaly deviation as a carrier, it is still going. The field does not have an off switch.

The ship holds her course.

She is doing what she was built for.`,
    onEnter: () => { S.flashTheosisLight(0.8, 8000); },
    choices: [
      { text: 'The real Zarya.', next: 'zarya_real_history' },
    ],
  },

  // ── THE REAL ZARYA ─────────────────────────────────────────────
  zarya_real_history: {
    id: 'zarya_real_history', location: 'The Record', mood: 'neutral',
    text: `The real Zarya.

Built in Finland in 1952 by the Wärtsilä shipyard, for the Academy of Sciences of the Soviet Union. She was non-magnetic throughout — pine, spruce, oak, brass fastenings, bronze fittings. No iron, or almost none. She was designed to measure the Earth's magnetic field without distorting it.

She did this for thirty years.

She sailed the Atlantic, the Pacific, the Arctic, the Mediterranean, the Indian Ocean. She mapped magnetic anomalies — places where the field diverges from the model, where unmapped mountains or unusual rock formations beneath the seafloor pull the compass off true north. She measured things nobody had measured. She corrected charts that sailors used. She found anomalies at the Mid-Atlantic Ridge that contributed to the scientific understanding of seafloor spreading and plate tectonics.

She was crewed by Soviet scientists and sailors, and she shared her data. During the decades of the Cold War, when scientific information was routinely classified and access was restricted, the Zarya's measurements were made available to researchers in Finland, in Germany, in Japan, in the United States, in Poland, in France. The geomagnetic field does not respect political borders. The Zarya proceeded on this basis.

She was a ship of the Soviet Academy of Sciences, and she was one of the most internationally cooperative scientific ventures of the twentieth century. Both of these things are true.

Her final research cruise was in 1982. After the dissolution of the Soviet Union, funding for the Academy of Sciences collapsed. The Zarya was sold. She was eventually scrapped.

The research she conducted contributed to every major atlas of Earth's magnetic field produced in the second half of the twentieth century. Her measurements are still used. The anomalies she found are still there.

Her name means dawn.`,
    choices: [
      { text: 'Begin a new crossing.', next: 'crossing_record' },
    ],
  },

  ending_the_knowing: {
    id: 'ending_the_knowing', location: 'Instrument Room', mood: 'revelation',
    get text() {
      const lines = [];

      lines.push(`You have been here before.`);
      lines.push(`Not in memory exactly. Memory is the wrong word for what carries across a crossing. Something more like the body knowing a room in the dark — not seeing it, not remembering it, but moving through it without collision. The brass fitting near the hatch. The particular sound the radio makes before it speaks. The way the anomaly feels in the compass needle at this depth.`);
      lines.push(`You have been here before. And you know what happens next. And you are going to let it happen.`);

      lines.push(`Pavel is already in the instrument room when you arrive. He has been waiting. He is holding a piece of rope, as he always is. He looks at you with the expression of someone who has been hoping for a specific thing and is now seeing it arrive.`);
      lines.push(`— You remember. He says. Not a question.`);
      lines.push(`— Something. You say.`);
      lines.push(`He nods. He sets down the rope.`);
      lines.push(`— I have been on this crossing more times than I know how to count. He says. — Different forms. Different names. Different faces in the cabin when the letter arrives. But the same crossing. The anomaly. The archive. The person who has to decide whether to see the ship clearly or look away. Every time.`);
      lines.push(`— What are you? You ask.`);
      lines.push(`He smiles. He has been asked this before. He cannot answer in language sufficient to the question, and he knows it, and the smile contains this.`);

      if (S.hasFlag('sounding_crossing_settled')) {
        lines.push(`The sounding has told you: a crossing is not transit, it is location. You understand now that Pavel has been in this location — this specific non-transit, this specific between — for longer than the crossing. Longer than the ship. He is what accumulates here.`);
      }

      lines.push(`The radio is warm under your hand. You know how to use it. You knew before you touched it. The anomaly is at its peak.`);
      lines.push(`You transmit.`);
      lines.push(`You transmit everything — the archive, the measurements, the thirty years, the names. You transmit it the way you have always transmitted it, which is a sentence that would have made no sense three days ago and makes complete sense now.`);

      lines.push(`Pavel is gone when it ends. Not dramatically. Not with words. Simply: not there. The space where he was is ordinary. The rope is on the chart table.`);
      lines.push(`Haircut is there instead. She has been there for some time — how long is not clear. She looks at you with the expression she always has.`);
      lines.push(`You understand the expression now.`);
      lines.push(`She has seen this before too. She has seen all of it before. She sat on a box in the aft hold while Volkov checked the bilge. She sat in the instrument room while Alexei ran his first deviation log. She sat on the foredeck and watched you arrive on your first crossing and on every crossing before it.`);
      lines.push(`She puts a paw on your knee. She is not being sentimental. She is being precise.`);
      lines.push(`You are here. You have always been here. The crossing continues.`);
      lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━\n  THE KNOWING\n━━━━━━━━━━━━━━━━━━━━━━━━`);
      return lines.join('\n\n');
    },
    onEnter: () => {
      S.setFlag('ending_knowing_reached');
      S.addJournalEntry({ type: 'ending', text: 'The Knowing — you have been here before.' });
      S.flashTheosisLight(1.0, 8000);
    },
    choices: [
      { text: 'Begin a new crossing.', next: 'crossing_record' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // MAIN DECK HUB
  // ─────────────────────────────────────────────────────────────

  main_deck_hub: {
    id: 'main_deck_hub', location: 'Main Deck', mood: 'neutral',
    hub: true,
    get text() {
      const parts = [];
      const t = S.G.theosis || 0;
      const flags = S.G.flags;
      const day = S.G.time ? S.G.time.day : 1;

      // ── Base description — changes by day and anomaly state ──────
      if (flags.has('anomaly_peak_occurred')) {
        parts.push('The main deck. The anomaly is at its peak — you can feel it in the compass, in the quality of the light, in the way the instruments behave below. The North Atlantic is doing what the North Atlantic does. It does not care about the anomaly. The ship cares.');
      } else if (flags.has('anomaly_first_noticed')) {
        parts.push('The main deck. The deviation is increasing — the compass is telling the truth about a different north. The sails are doing their work. The sky is what it always is up here: enormous and indifferent and occasionally startling.');
      } else if (day >= 3) {
        parts.push('The main deck, Day Three. The wind has the quality it gets before something concludes. The sails know. The rigging knows. You are becoming fluent in this ship's language of approaching things.');
      } else if (day >= 2) {
        parts.push('The main deck, second morning. The ship has its rhythm now. The crew has its rhythm. You are beginning to understand what happens at which hour — who is where, what they are thinking about, how the light changes when the anomaly shifts.');
      } else {
        parts.push('The main deck. The sails doing their work. The North Atlantic doing what it does. The scale of the water takes some getting used to. You are somewhere in the middle of something vast.');
      }

      // ── Haircut presence — always, sometimes doing something specific ──
      if (flags.has('anomaly_peak_occurred')) {
        parts.push('Haircut is watching the compass from a specific angle she has found. She has been doing this for two hours.');
      } else if (flags.has('archive_transmitted')) {
        parts.push('Haircut is sitting in an unusual position — facing aft, away from her normal spot. The transmission changed something in the ship's social ecology. Even the cats have adjusted.');
      } else {
        parts.push('Haircut is somewhere. You can feel her awareness of you. She has opinions about this crossing that she is not sharing.');
      }

      // ── Transmission aftermath ───────────────────────────────────
      if (flags.has('archive_transmitted') && !flags.has('anomaly_peak_occurred')) {
        parts.push('The transmission is in the world. The archive is no longer only here. Something on the ship has shifted — not dramatially, not visibly, more like a collective exhale that nobody has actually made.');
      }

      // ── Mission pressure ─────────────────────────────────────────
      if (flags.has('landstorm_second_called') && !flags.has('mission_refused')) {
        parts.push('Landstorm has called twice. The pressure is on the ship now, not just on you. You can feel it in how people walk past the instrument room.');
      }

      // ── Theosis register ─────────────────────────────────────────
      if (t >= 66) {
        parts.push('The ship is Заря. The ship has always been Заря. Today you know it without effort.');
      } else if (t >= 33 && flags.has('anomaly_first_noticed')) {
        parts.push('The anomaly below. The field. Thirty years of measurement converging on this crossing. From the deck the water looks ordinary. That is the detail that keeps returning to you: it looks ordinary.');
      }

      // ── Pavel companion ──────────────────────────────────────────
      const pavLine = S.getCompanionLine && S.getCompanionLine('pavel', 'Main Deck');
      if (pavLine) parts.push(pavLine);

      return parts.join('\n\n');
    },
    onEnter: () => { S.checkEndings(); },
    choices: [
      { text: 'Foredeck — Pavel is there.',    next: 'foredeck_first',   condition: { type: 'not', condition: { type: 'flag', id: 'met_pavel'  } } },
      { text: 'Mess hall — someone at the corner table.',  next: 'oblong_first', condition: { type: 'and', conditions: [{ type: 'flag', id: 'met_miguel' }, { type: 'not', condition: { type: 'flag', id: 'met_oblong' } }] } },
      { text: 'Bridge — find the First Mate.', next: 'first_mate_first', condition: { type: 'not', condition: { type: 'flag', id: 'met_miguel' } } },
      { text: 'Bridge.',                        next: 'bridge_hub',       condition: { type: 'flag', id: 'met_miguel' }                            },
      { text: 'Mess hall.',                     next: 'mess_hub'                                                                                   },
      { text: 'Galley — find the cook.',        next: 'galley_first',     condition: { type: 'not', condition: { type: 'flag', id: 'met_lena'   } } },
      { text: 'Galley.',                        next: 'galley_hub',       condition: { type: 'flag', id: 'met_lena' }                              },
      { text: 'Chart room — scientific logs.',  next: 'chart_room_first', condition: { type: 'and', conditions: [{ type: 'flag', id: 'met_miguel' }, { type: 'not', condition: { type: 'flag', id: 'chartroom_visited' } }] } },
      { text: 'Chart room.',                    next: 'chart_room_first', condition: { type: 'flag', id: 'chartroom_visited' }                     },
      { text: 'Hold — something is down there.', next: 'hold_first',     condition: { type: 'and', conditions: [{ type: 'flag', id: 'met_miguel' }, { type: 'not', condition: { type: 'flag', id: 'hold_visited' } }] } },
      { text: 'Hold — Freezer Beef.',           next: 'hold_first',      condition: { type: 'and', conditions: [{ type: 'flag', id: 'hold_visited' }, { type: 'not', condition: { type: 'flag', id: 'instrument_room_visited' } }] } },
      { text: 'Instrument room — the anomaly.', next: 'instrument_room_first', condition: { type: 'flag', id: 'instrument_room_visited' }          },
      { text: '— Continue the crossing.',       next: 'act_two_begin',   requires_flag: 'mission_reality_known'                                    },
      { text: 'The brass. The bilge. The morning.',    next: 'ship_maintenance', condition: { type: 'and', conditions: [{ type: 'flag', id: 'act_two_begun' }, { type: 'not', condition: { type: 'flag', id: 'maintenance_done' } }] } },
    ],
  },

  bridge_hub: {
    id: 'bridge_hub', location: 'Bridge', mood: 'neutral', art: 'portrait_haircut',
    get text() {
      const parts = ['Miguel is at the wheel, or near it. Haircut is on the chart table, sitting on a weather report.'];
      if (S.hasFlag('maintenance_brass')) parts.push('The forward cleats are polished. Miguel noticed.');
      if (S.hasNpcMemory && S.hasNpcMemory('miguel', 'returned the photograph')) {
        parts.push('He has not mentioned the photograph again. Neither have you. It is in the air between you like a settled thing.');
      }
      if (S.hasNpcMemory && S.hasNpcMemory('miguel', 'refused the mission')) {
        parts.push('He knows. He has always known. He has adjusted how he holds the wheel.');
      }
      // High trust: he mentions Irina unprompted
      if (S.getStance && S.getStance('miguel', 'trust') >= 3 && !S.hasFlag('miguel_irina_told')) {
        parts.push('He says, without looking at you: — The cook before Lena. Her name was Irina. She taught Lena the coffee. He does not say why he is telling you this.');
      }
      if (S.hasFlag('mission_refused') && !S.hasFlag('mission_accepted')) {
        parts.push('He has his hand on the wheel the way someone holds something they have decided to keep.');
      }
      return parts.join('\n\n');
    },
    choices: [
      { text: 'Talk to Miguel.',                  next: 'miguel_return'   },
      { text: 'Stand out. Take the air.',          next: 'bridge_air', composure: 1 },
      { text: 'Go to the main deck.',              next: 'main_deck_hub'  },
    ],
  },

  bridge_air: {
    id: 'bridge_air', location: 'Bridge', mood: 'neutral',
    text: `The air from the bridge. Cold in a way that is not unkind. Full of salt. Full of the particular absence that is open ocean.

Haircut regards you from the weather report.

The magnetic deviation indicator on the console has moved since you last looked.`,
    onEnter: () => { S.incrementTheosis(2); S.applyEffect({ composure: 1 }); },
    choices: [
      { text: 'Go to the main deck.', next: 'main_deck_hub' },
    ],
  },

  miguel_return: {
    id: 'miguel_return', location: 'Bridge', mood: 'neutral',
    text: `Miguel listens when you come to him. He has learned that the sea requires full attention, and has applied this to other things.`,
    choices: [
      { text: 'Ask about the archive.',                next: 'miguel_mission_direct', condition: { type: 'flag', id: 'archive_discovered' }   },
      { text: 'Ask how he\'s holding up.',             next: 'miguel_how_holding',    requires_charism: 'healer'                             },
      { text: 'Stand with him for a moment.',          next: 'bridge_air', theosis: 1                                                        },
    ],
  },

  miguel_how_holding: {
    id: 'miguel_how_holding', location: 'Bridge', mood: 'neutral',
    text: `He doesn't answer immediately. He adjusts the wheel slightly.

— Fifteen years on this ship. You know a ship. You know how she moves in different seas.

He is quiet.

— I'm holding up the way you hold up when something you've taken care of is being—

He stops.

— I'm fine. We're doing the crossing. That's the job.

He means none of this last part.`,
    onEnter: () => { S.modReputation('miguel', 2); S.applyEffect({ communion: 1 }); S.incrementTheosis(2); },
    choices: [
      { text: '"I know. I see it."', next: 'bridge_hub', theosis: 2 },
      { text: 'Just nod. Stay.',      next: 'bridge_air', theosis: 1 },
    ],
  },

});

// ─────────────────────────────────────────────────────────────────
// WAKING CHARISM ASSIGNMENT
// ─────────────────────────────────────────────────────────────────

S.on('newPlay', () => {
  // Crossing Tax enforcement: carried theosis is already taxed in engine newPlay(),
  // but ensure waking charism assignment uses the post-tax value
  if (S.G.playCount <= 1) return;
  const t = S.G.theosis;
  const id = t >= 85 ? 'rememberer' : t >= 71 ? 'prophet' : t >= 46 ? 'witness' : t >= 20 ? 'penitent' : 'sleeper';
  const sleeping = S.G.charisms.filter(c => ['confessor','faster','fool','healer'].includes(c));
  S.G.charisms = [...new Set([...sleeping, id])];
});

// ─────────────────────────────────────────────────────────────────
// BODY CLASS UPDATES
// ─────────────────────────────────────────────────────────────────

S.on('magneticDeviationChanged', (val) => {
  document.body.classList.toggle('anomaly-low',    val > 0.1 && val <= 0.4);
  document.body.classList.toggle('anomaly-medium', val > 0.4 && val <= 0.7);
  document.body.classList.toggle('anomaly-high',   val > 0.7);
  // Update compass — deviation displaces magnetic north from true north
  S.updateCompass(Math.round((1 - val) * 100), Math.round(val * 100));
  // Also update worldState sanctity based on anomaly intensity
  if (S.G.worldState && val > 0.6) {
    const was = S.G.worldState.sanctity;
    S.G.worldState.sanctity = Math.min(10, was + 0.5);
    if (S.G.worldState.sanctity >= 7) document.body.classList.add('sanctity-high');
    else document.body.classList.remove('sanctity-high');
  }
});

S.on('theosisChanged', (val) => {
  document.body.classList.remove('tier-asleep','tier-waking','tier-illumined');
  if      (val <= 32) document.body.classList.add('tier-asleep');
  else if (val <= 65) document.body.classList.add('tier-waking');
  else                document.body.classList.add('tier-illumined');
  // Sanctity from theosis
  if (S.G.worldState && val > 50) {
    S.G.worldState.sanctity = Math.min(10, (S.G.worldState.sanctity || 0) + 0.2);
    if (S.G.worldState.sanctity >= 7) document.body.classList.add('sanctity-high');
  }
});

// ─────────────────────────────────────────────────────────────────
// TUTORIAL
// ─────────────────────────────────────────────────────────────────

S.setTutorialContent(`
  <div style="font-family:'GOST type B','Share Tech Mono',monospace;font-size:.62rem;color:var(--cold-dim);letter-spacing:.12em;margin-bottom:1.4rem;white-space:pre;line-height:1.3">      |    |    |
     )_)  )_)  )_)
    )___))___))___)\\
   )____)____)_____)\\\\ 
  ___|____|____|____\\\\\\__
 --\\                    /--
  ~ ~~~  ~~  ~~~  ~~  ~~ ~</div>
  <div class="tutorial-item" style="font-style:italic;color:var(--fg);margin-bottom:1.1rem;line-height:1.9">
    You are on a ship in the North Atlantic. You have a mission. You also have, or are beginning to have, something that will complicate it.
  </div>
  <div class="tutorial-item" style="color:var(--dim);font-size:.82rem;line-height:1.75;margin-bottom:.7rem">
    The ship is called The Dawn in the current documentation. Its name before that was different. Whether a ship can remember its own name is a question the game will not answer directly.
  </div>
  <div class="tutorial-item" style="color:var(--dim);font-size:.82rem;line-height:1.75;margin-bottom:.7rem">
    Your cover — chaplain — is established through conversation, not menus. What you say shapes who you are. This will matter later, and in ways that are not immediately legible.
  </div>
  <div class="tutorial-item" style="color:var(--dim);font-size:.82rem;line-height:1.75;margin-bottom:.7rem">
    The four numbers at the top are: <strong style="color:var(--fg)">bearing</strong> (how well you maintain cover), <strong style="color:var(--fg)">stillness</strong> (how present you are), <strong style="color:var(--fg)">solidarity</strong> (what you have given to others), <strong style="color:var(--fg)">static</strong> (the cost of performing something you do not believe).
  </div>
  <div class="tutorial-item" style="color:var(--dim);font-size:.82rem;line-height:1.75;margin-bottom:.7rem">
    Below, in the Breviary: soundings. They arise from moments of stillness and deepen through aligned action. When they settle they become permanent. They change what you can see.
  </div>
  <div class="tutorial-item" style="color:var(--dim);font-size:.78rem;line-height:1.72;margin-top:.9rem;font-style:italic">
    This is the first crossing. It will not be the last. What carries forward depends on how far you have come. Some things carry further than others.
  </div>
`);

// ─────────────────────────────────────────────────────────────────
// WORLD STATE — persistent reactive object
// ─────────────────────────────────────────────────────────────────

// Initialise worldState if not already on G
S.on('newPlay', () => {
  // Feature 7: charism compound scenes — add to available scenes based on last charism
  const lastCharism = S.getMetaValue && S.getMetaValue('lastCharism_' + (S.G.playCount - 1), null);
  if (S.G.playCount > 1 && lastCharism) {
    if (lastCharism === 'witness' && !S.hasFlag('charism_witness_memory_seen')) {
      S.scheduleEvent && S.scheduleEvent(1, 'charism_witness_memory', {});
    }
    if (lastCharism === 'prophet' && !S.hasFlag('charism_prophet_pavel_seen')) {
      S.setFlag('charism_prophet_available');
    }
    if (lastCharism === 'rememberer' && !S.hasFlag('charism_rememberer_open_seen')) {
      S.setFlag('charism_rememberer_available');
    }
  }
  // Feature 5: anomaly grows — set higher starting deviation
  const tc = S.getMetaValue && S.getMetaValue('transmissionCount', 0);
  if (tc >= 1) S.setMagneticDeviation(0.1 + tc * 0.08);
  if (tc >= 3) {
    S.setFlag('anomaly_overcalibrated_imminent');
    S.showToast('The instruments are reading higher than last crossing.', 'note');
  }
});

S.on('gameStarted', () => {
  // Mode-specific starting bonuses
  if (S.G.mode === 'attended') {
    S.applyEffect({ vigilance: 1 }); // active agent — more alert
  } else if (S.G.mode === 'witnessed') {
    S.applyEffect({ communion: 1 }); // observer — more attuned to people
  }
  if (!S.G.worldState) {
    S.G.worldState = { shipStability: 5, sanctity: 0, socialTrust: 5 };
  }
});
S.on('loadSlot', () => {
  if (!S.G.worldState) {
    S.G.worldState = { shipStability: 5, sanctity: 0, socialTrust: 5 };
  }
});

// Helper used in scenes
function mutateWorld(delta) {
  if (!S.G.worldState) S.G.worldState = { shipStability: 5, sanctity: 0, socialTrust: 5 };
  if (delta.shipStability) S.G.worldState.shipStability = Math.max(0, Math.min(10, S.G.worldState.shipStability + delta.shipStability));
  if (delta.sanctity)      S.G.worldState.sanctity      = Math.max(0, Math.min(10, S.G.worldState.sanctity      + delta.sanctity));
  if (delta.socialTrust)   S.G.worldState.socialTrust   = Math.max(0, Math.min(10, S.G.worldState.socialTrust   + delta.socialTrust));
}

// ─────────────────────────────────────────────────────────────────
// LITURGICAL CLOCK
// ─────────────────────────────────────────────────────────────────

// Matins (0): cold, industrial. Lauds (1): dawn, beginning.
// Vespers (3): candour, settling. Compline (4): dark, intimate, anomaly peak.
S.on('liturgicalHourChanged', (hour) => {
  const body = document.body;
  body.classList.remove('hour-matins','hour-lauds','hour-terce','hour-vespers','hour-compline');
  if      (hour <= 1)  body.classList.add('hour-matins');
  else if (hour <= 3)  body.classList.add('hour-lauds');
  else if (hour <= 5)  body.classList.add('hour-terce');
  else if (hour <= 7)  body.classList.add('hour-vespers');
  else                 body.classList.add('hour-compline');
  // Compline: increase anomaly slightly
  if (hour >= 7 && S.getMagneticDeviation() < 0.5) {
    S.setMagneticDeviation(S.getMagneticDeviation() + 0.08);
  }
});

// ─────────────────────────────────────────────────────────────────
// WITNESSED MODE: redirect first scene
// ─────────────────────────────────────────────────────────────────
S.on('newPlay', () => {
  if (S.G.mode === 'witnessed' && !S.hasFlag('witnessed_orientation_shown')) {
    S.G.scene = 'witnessed_orientation';
  }
});

// ─────────────────────────────────────────────────────────────────
// START
// ─────────────────────────────────────────────────────────────────

// Defer first render until after stylesheets are applied.
// requestAnimationFrame yields to the browser's style/layout pass first.
if (document.readyState === 'complete') {
  requestAnimationFrame(() => S.render());
} else {
  window.addEventListener('load', () => requestAnimationFrame(() => S.render()), { once: true });
}
