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

S.registerNameMapping('Pavel',  'Pavel',   'Pavel',   'Павел');
S.registerNameMapping('Miguel', 'Misha',   'Mikhail', 'Михаил');
S.registerNameMapping('Lena',   'Lena',    'Elena',   'Елена');
S.registerNameMapping('Alexei', 'Alyosha', 'Alexei',  'Алексей');
S.registerNameMapping('Nadia',  'Nadya',   'Nadia',   'Надежда');
S.registerNameMapping('The Dawn', 'Zarya', 'Zarya',   'Заря');

S.setAvailableModes(['attended', 'witnessed']);
S.setModeDescriptions({
  attended: {
    name: 'Attended',
    short: 'The crossing as it is lived.',
    long: 'You are present in the crossing. Your choices, your cover, your pastoral acts — they accumulate and have weight. What you do on this ship matters to the people on it, and the consequences of your actions will be visible in how things resolve. This is the standard mode. The difficulty is the difficulty of actually being somewhere.',
  },
  witnessed: {
    name: 'Witnessed',
    short: 'The crossing as it is observed.',
    long: 'You are watching rather than acting. The major decisions of the crossing are determined by the system — by your theosis, your flags, your accumulated history — rather than by explicit choices at branching points. What you did in previous crossings becomes the story. This mode is for players who have been on this ship before and want to see what the world has made of them.',
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
  '  .--------.',
  ' /  ~   ~  \\',
  '|     ^     |',
  '|  \\ ___ / |',
  ' \\  ___  / ',
  '  |  P A V E L  |',
].join('\n'));

S.registerArt('portrait_miguel', [
  '  .--------.',
  ' /  —   —  \\',
  '|     .     |',
  '|  \\ ___ / |',
  ' \\  ___  / ',
  '  |  MIGUEL  |',
].join('\n'));

S.registerArt('portrait_lena', [
  '  .--------.',
  ' /  .   .  \\',
  '|     -     |',
  '|  \\ ___ / |',
  ' \\  ___  / ',
  '  |   LENA   |',
].join('\n'));

S.registerArt('portrait_alexei', [
  '  .--------.',
  ' /  o   o  \\',
  '|     .     |',
  '|  \\ — / |',
  ' \\  ___  / ',
  '  |  ALEXEI  |',
].join('\n'));

S.registerArt('portrait_nadia', [
  '  .--------.',
  ' /  *   *  \\',
  '|     ^     |',
  '|  \\ ___ / |',
  ' \\  ___  / ',
  '  |   NADIA  |',
].join('\n'));

S.registerArt('portrait_kylie', [
  '  .--------.',
  ' /  >   <  \\',
  '|     .     |',
  '|  \\ ___ / |',
  ' \\  ___  / ',
  '  |   KYLIE  |',
].join('\n'));

S.registerArt('portrait_connie', [
  '  .--------.',
  ' /  —   —  \\',
  '|     .     |',
  '|  \\ ___ / |',
  ' \\  ___  / ',
  '  |  CONNIE  |',
].join('\n'));

S.registerArt('portrait_othis', [
  '  .--------.',
  ' /  |   |  \\',
  '|     —     |',
  '|  \\     / |',
  ' \\  ___  / ',
  '  |  OTHIS   |',
].join('\n'));

// ─────────────────────────────────────────────────────────────────

// Haircut: black Tiffany Chardonnay, self-possessed
S.registerArt('portrait_haircut', [
  '    /\\ _ /\\    ',
  '   (  o o  )   ',
  '   =( Y )=     ',
  '   ) ( ) (     ',
  '  (_)-(_)-(_)  ',
  '               ',
  '  H A I R C U T',
  ' [black tiffany]',
].join('\n'));

// Freezer Beef: small calico, salamander-headed
S.registerArt('portrait_freezer_beef', [
  '  /\\    /\\    ',
  ' ( o)----(.\\   ',
  ' /____________\ ',
  '|  .  .  .    |',
  ' \\_____________/',
  '               ',
  ' FREEZER  BEEF ',
  '   [calico]    ',
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

S.registerSounding('sounding_crossing', {
  id:   'sounding_crossing',
  name: 'On the nature of a crossing',
  text: 'What is left behind is not lost. What is ahead has not been found. Between them: this. The water. The cold. The sound of sails adjusting to wind you cannot see.',
  theosis: 3,
  stat: 'composure', statDelta: 1,
});

S.registerSounding('sounding_forgiveness', {
  id:   'sounding_forgiveness',
  name: 'On forgiveness at sea',
  text: 'There is something about open water that makes the ledger seem less important. Not wrong. Less important. You are very far from anyone you have harmed. The horizon does not know your name.',
  theosis: 4,
  stat: 'communion', statDelta: 1,
});

S.registerSounding('sounding_history', {
  id:   'sounding_history',
  name: 'On what a ship carries',
  text: 'The wood remembers the trees. The brass remembers the ore. What does water remember? Everything that has passed through it. Which means you too are being remembered, right now, by something that does not keep records in any language you speak.',
  theosis: 7,
  stat: 'composure', statDelta: 1,
});

S.registerSounding('sounding_sobornost', {
  id:   'sounding_sobornost',
  name: 'On conciliarity',
  text: 'The ship was built to measure without interfering. Many instruments, many hands across thirty years, many countries. One field. The old word is sobornost — conciliarity, the unity of a council, many voices in which no voice is erased. Not consensus. Something more demanding than consensus: full presence of all, without any being dissolved into the whole.',
  theosis: 8,
  stat: 'communion', statDelta: 2,
});

S.registerSounding('sounding_solidarity', {
  id:   'sounding_solidarity',
  name: 'On the body of suffering',
  text: 'You did not invent this hunger. You did not invent this cold. Neither did the person next to you. Suffering isolates. But there is another kind — the kind that, when you stop pretending it is only yours, makes you suddenly aware of how many are in the water with you.',
  theosis: 10,
  stat: 'communion', statDelta: 2,
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
  category: 'The Crossing',
  content:  "The hold contains archival material from the ship's scientific history. Binders. Photographs. Chart copies. Thirty years of geomagnetic measurement across the world's oceans. It is labelled: pending disposal.",
});

S.registerCodexEntry('codex_the_mission', {
  title:    'The Mission',
  category: 'The Crossing',
  content:  "You were sent on this crossing for a purpose. The sealed envelope made it explicit. The archive is to be destroyed. Evidence of something is to be made inconvenient.",
});

// High-tier entries — visible only near the end, heavily guarded
S.registerCodexEntry('codex_zarya_history', {
  title:    'Zarya',
  category: 'The Ship',
  content:  "Built in Finland, 1952. She measured the Earth's magnetic field across all its oceans for thirty years. She was sold after the Union ended. She was burned for scrap. What she found in those thirty years — the anomalies, the unmapped mountains, the corrections to the charts sailors use — is in the boxes in the hold.",
});

S.registerCodexEntry('codex_solidarity', {
  title:    'Solidarity',
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
  if (S.hasFlag('service_opened_silence') || S.hasFlag('service_opened_true')) bonus += 3;
  if (S.hasFlag('service_word_true')) bonus += 4;
  if (S.hasFlag('service_stayed')) bonus += 3;
  S.incrementTheosis(bonus);
  S.unlockCodexEntry('codex_theosis');
  S.showToast('Something shifts.', 'theosis');
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
//   20 The Knowing   — rememberer charism + theosis 90 + transmitted
//   10 Restoration   — theosis 66+ + transmitted + radio team
//    5 Witness       — theosis 33+ + refused mission
//    0 Erasure       — default (accepted mission OR theosis < 33 with no refusal)
// ─────────────────────────────────────────────────────────────────

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
// theosis 90+, transmitted. You have been here before.
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

S.registerScenes({

  // ── OPENING ──────────────────────────────────────────────────

  cabin_wake: {
    id: 'cabin_wake', location: 'Cabin', mood: 'neutral', art: 'ship_zarya',
    text: `You are awake.

The ceiling is close and moving. Not badly — a long slow roll, the kind the body stops fighting after a while. Light through the porthole says morning, northern, overcast.

You are on a ship. This is not a surprise. What is less certain, in the first few seconds, is how long you have been here. Salt on the back of your wrist. Several days, at least.

There is a letter on the desk bolted to the wall. Your name is on the envelope. You recognise the handwriting as your own.`,
    onEnter: () => { S.setFlag('game_started'); },
    choices: [
      { text: 'Open the letter.',                           next: 'cabin_letter' },
      { text: 'Look through the porthole first.',           next: 'cabin_porthole' },
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
      { text: 'Look through the porthole.',                next: 'cabin_porthole' },
    ],
  },

  cabin_letter: {
    id: 'cabin_letter', location: 'Cabin — Desk', mood: 'neutral',
    text: `The letter is in your own handwriting.

*You are aboard the research schooner The Dawn, outbound from Reykjavik. You are travelling as the ship's chaplain. This is your cover.*

*Your cover has not been fully established. You will establish it through conversation with the crew. Do not attempt to define it all at once. Let it emerge. This is how cover works — it is confirmed by others believing it, not by you asserting it.*

*Your mission is in the sealed envelope in the case under the bunk. Do not open it until your cover is in place.*

*The First Mate's name is Miguel. He expects you.*

The case is under the bunk. You can feel it with your foot.`,
    onEnter: () => { S.setFlag('letter_read'); },
    choices: [
      { text: 'Go find Miguel.',                  next: 'first_mate_first' },
      { text: 'Go up to the foredeck first.',     next: 'foredeck_first'   },
      { text: 'Sit with this for a moment.',      next: 'cabin_sit', theosis: 1 },
    ],
  },

  cabin_sit: {
    id: 'cabin_sit', location: 'Cabin', mood: 'neutral',
    text: `You put the letter down. You fold your hands. The ship moves.

You are playing a role. What you don't know is whether the role will play you back — whether, by the end of this crossing, chaplain will still be just a word for what you are pretending to be.

This question is not in any briefing document.`,
    onEnter: () => { S.incrementTheosis(2); },
    choices: [
      { text: 'Go find Miguel.',         next: 'first_mate_first' },
      { text: 'Go to the foredeck.',     next: 'foredeck_first'   },
    ],
  },

  // ── FIRST MATE ───────────────────────────────────────────────

  first_mate_first: {
    id: 'first_mate_first', location: 'Bridge', mood: 'neutral', art: 'portrait_miguel',
    text: `Miguel is at the wheel, or near it. One hand resting on it. Looking at the horizon the way someone looks at something they have agreed to trust.

He turns when he hears you.

— So. The chaplain.

Not a question. He is perhaps fifty. He and the ship have arrived at a mutual accommodation that took years.`,
    onEnter: () => { S.setFlag('met_miguel'); },
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
    text: `He is there. Facing the bow. Talking with the confidence of someone who has been interrupted many times and learned to simply continue.

— —so the question is whether the absence of ferromagnetic material creates a kind of moral clarity, if you follow me, because if the instruments are right it's because the ship is built not to interfere, which raises the question of what it would mean for a human being to be similarly constructed—

He turns around. He knew you were there.

— Oh good. Genuine warmth. — You're the chaplain. I've been wanting to talk to you.

His name, it turns out, is Pavel.`,
    onEnter: () => {
      S.setFlag('met_pavel');
      S.unlockCodexEntry('codex_pavel');
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
        text:      '"United Church. Though I borrow widely."',
        next:      'pavel_denomination_response',
        set_cover: { key: 'denomination', value: 'United Church' },
        set_flag:  'cover_denomination_united',
        theosis:   1,
      },
      {
        text:      '"Roman Catholic. On sabbatical from it, if I\'m honest."',
        next:      'pavel_denomination_response',
        set_cover: { key: 'denomination', value: 'Roman Catholic' },
        set_flag:  'cover_denomination_catholic',
      },
      {
        text:      '"Non-denominational. I follow what works."',
        next:      'pavel_denomination_response',
        set_cover: { key: 'denomination', value: 'Non-denominational' },
        set_flag:  'cover_denomination_none',
        condition: { type: 'not', condition: { type: 'flag', id: 'toast_cover_denomination' } },
      },
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
    text: `He nods as though this confirms something.

— Good. The tradition matters less than whether you've actually thought about it. Most people haven't. You have. I can tell because you answered without checking whether it was the right answer.

He picks up a piece of rope from the deck. He doesn't do anything with it.

— I'd like to walk with you, he says. — This crossing specifically. I think it's going to need a witness.`,
    choices: [
      { text: '"Then stay close."',                          next: 'pavel_joined', add_companion: { id: 'pavel', name: 'Pavel', charisms: ['overflow'] } },
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
        text:      '"United Church. Though I borrow widely."',
        next:      'pavel_denomination_response',
        set_cover: { key: 'denomination', value: 'United Church' },
        set_flag:  'cover_denomination_united',
        theosis:   1,
      },
      {
        text:      '"Roman Catholic. On sabbatical from it."',
        next:      'pavel_denomination_response',
        set_cover: { key: 'denomination', value: 'Roman Catholic' },
        set_flag:  'cover_denomination_catholic',
      },
      {
        text:      '"Non-denominational. I follow what works."',
        next:      'pavel_denomination_response',
        set_cover: { key: 'denomination', value: 'Non-denominational' },
        set_flag:  'cover_denomination_none',
      },
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
      { text: 'Say nothing. Let the room be the room.',           next: 'lena_silence', theosis: 2, composure: 1 },
      { text: '"How long have you been on this ship?"',            next: 'lena_tenure'                           },
      { text: '"The coffee is extraordinary."',                    next: 'lena_coffee'                           },
    ],
  },

  lena_silence: {
    id: 'lena_silence', location: 'Galley', mood: 'neutral',
    text: `You drink the coffee in silence. She continues with the fish.

After a while:

— The ship likes to be listened to. Most people don't bother.

She hands you something wrapped in bread — warm, slightly oily, perfect — without explanation.`,
    onEnter: () => {       S.progressSounding('sounding_crossing', 2);
S.modReputation('lena', 2); S.offerSounding('sounding_crossing'); },
    choices: [
      { text: 'Eat. Stay.',             next: 'lena_tenure'   },
      { text: 'Thank her and go.',       next: 'main_deck_hub' },
    ],
  },

  lena_coffee: {
    id: 'lena_coffee', location: 'Galley', mood: 'neutral',
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
    id: 'lena_hold', location: 'Galley', mood: 'neutral',
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
    text: `Lena is here. She is almost always here, or the galley is in the state of someone who has just left and is about to return.

She hands you something without being asked.`,
    choices: [
      { text: 'Ask about the archive.',  next: 'lena_hold',    condition: { type: 'not', condition: { type: 'flag', id: 'lena_archive_revealed' } } },
      { text: 'Sit in silence.',         next: 'lena_silence'                                                                                        },
      { text: 'Go to the main deck.',    next: 'main_deck_hub'                                                                                       },
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
      { text: 'Read more of the 1957 logs.',                    next: 'chartroom_1957'      },
      { text: 'Look at the current mission documentation.',      next: 'chartroom_current'   },
      { text: 'Notice the deviation readings on the current chart.', next: 'chartroom_deviation' },
    ],
  },

  chartroom_1957: {
    id: 'chartroom_1957', location: 'Chart Room', mood: 'neutral',
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
    id: 'chartroom_late_logs', location: 'Chart Room', mood: 'neutral',
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
    id: 'chartroom_manifest', location: 'Chart Room', mood: 'uncanny',
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
    id: 'chartroom_current', location: 'Chart Room', mood: 'neutral',
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
    id: 'chartroom_deviation', location: 'Chart Room', mood: 'neutral',
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
      { text: 'Approach Freezer Beef. Look at the boxes.',  next: 'hold_boxes'   },
      { text: 'Sit on the floor. Just sit.',                 next: 'hold_sit', theosis: 3, composure: 1 },
      { text: 'Go back up. You need to think.',              next: 'main_deck_hub' },
    ],
  },

  hold_sit: {
    id: 'hold_sit', location: 'Hold', mood: 'uncanny',
    text: `You sit on the floor of the hold.

The hull breathes around you. Freezer Beef watches you with the patience of someone who decided a long time ago.

The boxes are there. The sea is there. The hull — oak, pine, spruce, no iron — is doing its job of not interfering with the measurements.

You are sitting in the hold of a ship built to be transparent. Surrounded by thirty years of what it found.

You don't know yet what you're supposed to do about this. You know you are supposed to do something.

You sit there for a while.`,
    onEnter: () => {
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
    id: 'hold_boxes', location: 'Hold', mood: 'uncanny',
    text: `The boxes are sealed. Most of them.

One near the bottom of the nearest stack has a lid only resting in place. Not latched.

Freezer Beef shifts from the top of the stack to beside your feet. This is probably not a sign of anything. You note it.

The box nearest you is labelled: *1972, Atlantic crossing, photographs, southern route.*`,
    choices: [
      { text: 'Open the 1972 box.',                next: 'hold_1972_box',
        condition: { type: 'not', condition: { type: 'flag', id: 'box_1972_opened' } } },
      { text: 'Stand with it. Just bear witness.', next: 'hold_witness', theosis: 3,
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
    id: 'hold_witness', location: 'Hold', mood: 'uncanny',
    text: `You don't open anything.

You stand in the hold and you look at the boxes, all of them, and you let that be what it is: thirty years of work, packed into a hold on a ship, labelled for disposal.

Freezer Beef sits against your ankle. He is warm.

The ship moves. The sea is loud from here.

Something in you — not a thought, more like a shift of weight — moves from neutral to something that has not yet found its name.`,
    onEnter: () => { S.incrementTheosis(3); S.applyEffect({ communion: 2 }); S.setFlag('hold_witnessed'); },
    choices: [
      { text: 'Go up. Find someone to talk to.',          next: 'main_deck_hub' },
      { text: 'Open the 1972 box.',                        next: 'hold_1972_box' },
      { text: 'Offer a blessing. Quietly. For the record.', next: 'hold_bless_archive', theosis: 4, condition: { type: 'flag', id: 'sunday_service_led' } },
    ],
  },

  hold_bless_archive: {
    id: 'hold_bless_archive', location: 'Hold', mood: 'uncanny',
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
      S.progressSounding('sounding_forgiveness', 2);
      S.setFlag('mission_refused');
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
    text: `Nadia is younger than you expected. She has the focused distraction of someone whose mind is somewhere else and is trying to bring it back for social interaction.

She smiles when she sees you. A real smile. Quick.

— You're the chaplain. I'm glad. I didn't know we were getting one.

Something about this — the plainness of it — surprises you.`,
    onEnter: () => { S.setFlag('met_nadia'); },
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
    text: `Alexei enters still holding a printout. Lena has already poured him a coffee that he has not noticed.

He notices you instead.

— Ah. The chaplain. Excellent. I have a theological question.

He sits down with the urgency of someone who has been saving this.

— How does one reconcile the concept of a field — a field of force, distributed through space, not localised, not a thing but a tendency — with a theology of presence? The magnetic field is not here or there. It is everywhere, but differently. More of it in some places than others. This seems like God to me.

He waits.`,
    onEnter: () => { S.setFlag('met_alexei'); },
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
      { text: 'Sunday — lead the service.',                              next: 'sunday_service_begin', condition: { type: 'not', condition: { type: 'flag', id: 'sunday_service_started' } } },
      { text: 'Main deck.',                                              next: 'main_deck_hub' },
      { text: 'The brass wants polishing. The bilge wants checking.',       next: 'ship_maintenance',      condition: { type: 'not', condition: { type: 'flag', id: 'maintenance_done' } } },
      { text: 'Alexei has charts spread across the table.',                 next: 'anomaly_diagnosis',     condition: { type: 'flag', id: 'anomaly_first_noticed' } },
      { text: 'Someone in the mess hall. He has been there a while.',       next: 'oblong_first',          condition: { type: 'not', condition: { type: 'flag', id: 'met_oblong' } } },
      { text: 'Kylie is waiting.',                                           next: 'kylie_act_two',         condition: { type: 'and', conditions: [{ type: 'flag', id: 'kylie_initial_met' }, { type: 'not', condition: { type: 'flag', id: 'kylie_act_two_confronted' } }] } },
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
    text: `You stand there.

The sea does what it does. The anomaly does what it does. Haircut appears from somewhere and sits between you, which she does with the authority of someone closing a circuit.

At some point Freezer Beef arrives too, from below — you hear her before you see her, which with Freezer Beef is unusual. She sits on the other side, her salamander-broad face turned toward the water.

The four of you watch the water.

Nothing is resolved. Everything is named.`,
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
      { text: '"Will you help me with this?"',             next: 'radio_alexei_helps' },
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
      { text: '"Yes. Do it."',              next: 'radio_alexei_helps' },
      { text: 'Go find Miguel first.',         next: 'act_two_miguel_plan' },
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
      S.incrementTheosis(8);
      S.setFlag('radio_team_assembled');
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
    text: `The cover holds, barely.

He watches you perform it. He knows he is watching a performance. You know he knows. Neither of you says this.

— I'll need your movements accounted for. He says. — All of them.

He leaves.

The cover is thin now. One more pressure and it will not hold.

Behind you, the hold. Inside it, the archive. Somewhere in the instrument room, a radio built for high-deviation magnetic fields.`,
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

  // ── DAY THREE CONVERGENCE ────────────────────────────────────────
  // act_two_resolve is the point where the crossing converges.
  // It reads your state and routes to the appropriate end-sequence.
  // The player does not select an ending here. What you did determines
  // what happens. The scene text reflects what theosis tier you are at.

  act_two_resolve: {
    id: 'act_two_resolve', location: 'The Crossing', mood: 'revelation',
    text: `Day Three.

The anomaly is at its peak. The instruments are reading something they have never read. Nadia is crying in the good way. Alexei is using words that are not scientific words. Miguel has his hand on the wheel and his face turned toward the bow.

The ship holds its course.

The crossing is ending.`,
    onEnter: () => {
      S.incrementTheosis(4);
      S.setFlag('act_three_begun');
      S.unlockCodexEntry('codex_zarya_history');
      S.unlockCodexEntry('codex_solidarity');
      // Route to the appropriate end-sequence based on state
      // (checkEndings will fire on the next scene transition)
    },
    choices: [
      { text: 'Continue.', next: 'day_three_landing' },
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
      { text: 'The crossing ends.',  next: 'ending_approach_restoration', condition: { type: 'flag', id: '_route_restoration' } },
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
    id: 'oblong_first', location: 'Mess Hall', mood: 'uncanny',
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
    text: `The standard radio crackles. It has not crackled before — the anomaly has kept the standard frequencies mostly inert.

The voice is clear despite the interference. It is the voice of someone who has learned to be clear in all conditions.

— This is Landstorm. How is the crossing proceeding?

A pause. He is not asking about the sea conditions. The question has a specific meaning and he expects you to understand it.

You hold the receiver.`,
    onEnter: () => {
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
        next: 'alexei_sit_together', theosis: 3, composure: 1,
        condition: { type: 'not', condition: { type: 'flag', id: 'alexei_emergency_talked' } },
      },
    ],
  },

  alexei_palamas: {
    id: 'alexei_palamas', location: "Alexei's Cabin", mood: 'uncanny',
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
      S.setFlag('alexei_palamas_told');
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

  // ─────────────────────────────────────────────────────────────
  // ENDINGS
  // ─────────────────────────────────────────────────────────────

  ending_erasure: {
    id: 'ending_erasure', location: 'Hold', mood: 'uncanny',
    get text() {
      const lines = [];
      lines.push(`The instructions were clear. You followed them.`);
      lines.push(`The materials were in the cabinet. Othis gave you the key once you showed him the envelope. He didn't look at you after. He went up to the deck and stood at the rail.`);
      lines.push(`The archive burned slowly. Paper that has lasted thirty years does not go easily.`);
      if (S.hasFlag('alexei_emergency_talked')) {
        lines.push(`Alexei stayed in the instrument room throughout. Earlier you had sat with him when the anomaly frightened him. He had said: I think I can sleep now. He did not sleep. His instruments were still measuring.`);
      } else {
        lines.push(`Alexei stayed in the instrument room throughout. His instruments were still measuring. Even at the end, the ship was doing what she was built for.`);
      }
      if (S.hasFlag('met_oblong')) {
        lines.push(`Oblong Vassilithune was not visible. He was not visible before the burning either. Whether he saw it or not is unclear.`);
      }
      lines.push(`Pavel was on the foredeck. He did not watch the smoke.`);
      lines.push(`Miguel stood at the wheel. The ship continued north.`);
      if (S.hasFlag('lena_volkov_told')) {
        lines.push(`In the galley, Lena made breakfast. She made it the same way she always made it. She knew what had happened. She made breakfast anyway. The cook before her had checked the bilge every morning. That was his way of paying attention.`);
      }
      lines.push(`The dawn, when it came, was ordinary. Nothing had happened to it.`);
      lines.push(`The ship will have a different name in the documents now. The history it had — thirty years of finding, of measuring, of sharing — is over.`);
      lines.push(`You made a crossing.`);
      lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━\n  ERASURE\n━━━━━━━━━━━━━━━━━━━━━━━━`);
      return lines.join('\n\n');
    },
    onEnter: () => {
      S.setFlag('ending_erasure_reached');
      S.addJournalEntry({ type: 'ending', text: 'Erasure — the archive is gone.' });
      S.showToast('Erasure.', 'warning');
    },
    choices: [
      { text: 'Begin a new crossing.', next: '__new_play__' },
    ],
  },

  ending_witness: {
    id: 'ending_witness', location: 'Hold', mood: 'uncanny',
    get text() {
      const lines = [];
      lines.push(`You refused.`);
      lines.push(`Quietly. In the hold, in the dark, with Freezer Beef watching. You moved the most important boxes to a location not on the current manifest. A place Miguel showed you, because Miguel knows this ship in ways the people who chartered it do not.`);
      if (S.hasFlag('kylie_in_alliance')) {
        lines.push(`Kylie recorded everything you told her. The notebook is in her coat. Whatever happens when the ship docks, there are now two accounts.`);
      }
      if (S.hasFlag('connie_saw_chaplain')) {
        lines.push(`Connie Frank will write something in her own report. What she writes will not be about the cargo.`);
      }
      lines.push(`Othis will discover this. Landstorm will be informed. Consequences will arrive on land.`);
      lines.push(`On land is not here.`);
      lines.push(`The ship is still moving. Alexei is still measuring. Nadia found something in the data this morning that made her go very still and then start writing. Pavel is on the foredeck. The bronze fittings caught the last of the day's light and held it longer than they should have.`);
      if (S.hasFlag('archive_blessed')) {
        lines.push(`The archive in its new location has been blessed. You are not sure if that changes anything. You are not sure it does not.`);
      }
      lines.push(`The ship will continue under another name in other documents. But the archive is still in the world. Somewhere on a ship built to be transparent, thirty years of finding is still findable.`);
      lines.push(`You witnessed.`);
      lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━\n  WITNESS\n━━━━━━━━━━━━━━━━━━━━━━━━`);
      return lines.join('\n\n');
    },
    onEnter: () => {
      S.setFlag('ending_witness_reached');
      S.addJournalEntry({ type: 'ending', text: 'Witness — the archive is hidden.' });
      S.showToast('Witness.', 'note');
    },
    choices: [
      { text: 'Begin a new crossing.', next: '__new_play__' },
    ],
  },

  ending_restoration: {
    id: 'ending_restoration', location: 'Instrument Room', mood: 'revelation',
    get text() {
      const lines = [];
      lines.push(`The radio — forty years old, original equipment, brass fittings, designed for high-deviation fields — was built for this.`);
      lines.push(`You broadcast what you could. The names. The coordinates. The dates. The photograph at the anomaly, described in words because a radio is not a camera. The names of the scientists — from five countries, across three decades — who had been on this ship. Who had found things. Who had shared what they found.`);
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
      lines.push(`Заря was in the anomaly, at the peak, broadcasting the record of everything she had found.\n\nShe was doing what she was built for.`);
      lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━\n  RESTORATION\n━━━━━━━━━━━━━━━━━━━━━━━━`);
      return lines.join('\n\n');
    },
    onEnter: () => {
      S.setFlag('ending_restoration_reached');
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
      { text: 'Begin a new crossing.', next: '__new_play__' },
    ],
  },

  ending_the_knowing: {
    id: 'ending_the_knowing', location: 'Instrument Room', mood: 'revelation',
    text: `You have been here before.

Not in memory exactly. Memory is the wrong word for what carries across a crossing. Something more like recognition. The radio. The brass. The anomaly at its peak.

You have been here before and you know what happens next.

Pavel is already there when you arrive. He has been waiting.

— You remember. Not a question.

— Something.

He nods. He looks at you with something additional — relief, you realise.

— I've been on this crossing more times than I know how to count. Different forms. Different names. Every time: someone who has to decide whether to see the ship clearly or look away.

The radio is warm under your hand. You know how to use it. You knew when you woke up in the cabin.

— What are you? you ask him.

He smiles. He cannot answer in language sufficient to the question.

You transmit.

Pavel is gone when the transmission ends. Not dramatically. Simply not there.

Haircut is there instead. She looks at you with the same expression she always has.

You understand the expression now.

━━━━━━━━━━━━━━━━━━━━━━━━
  THE KNOWING
━━━━━━━━━━━━━━━━━━━━━━━━`,
    onEnter: () => {
      S.setFlag('ending_knowing_reached');
      S.addJournalEntry({ type: 'ending', text: 'The Knowing — you have been here before.' });
      S.flashTheosisLight(1.0, 8000);
    },
    choices: [
      { text: 'Begin a new crossing.', next: '__new_play__' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // MAIN DECK HUB
  // ─────────────────────────────────────────────────────────────

  main_deck_hub: {
    id: 'main_deck_hub', location: 'Main Deck', mood: 'neutral',
    hub: true,
    text: `The main deck. The sails doing their work. The North Atlantic doing what it does.

From here you can go anywhere on the ship.`,
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
    text: `Miguel is at the wheel, or near it. Haircut is on the chart table, sitting on a weather report.`,
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
S.on('gameStarted', () => {
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
// START
// ─────────────────────────────────────────────────────────────────

S.render();
