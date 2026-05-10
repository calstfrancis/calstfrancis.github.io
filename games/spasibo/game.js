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
S.setInitialScene('cabin_wake');

// ─────────────────────────────────────────────────────────────────
// CHARISMS
// ─────────────────────────────────────────────────────────────────

S.registerCharisms(
  [
    {
      id:     'confessor',
      name:   'The Confessor',
      desc:   'People tell you things they shouldn\'t.',
      effect: 'Unlocks dialogue branches where characters confess unprompted.',
    },
    {
      id:     'faster',
      name:   'The Faster',
      desc:   'You have trained the body\'s hunger into a tool.',
      effect: 'Stillness actions cost nothing. The body does not protest.',
    },
    {
      id:     'fool',
      name:   'The Fool',
      desc:   'You say the wrong thing and it turns out to be right.',
      effect: 'Occasional positive outcomes on failed rolls.',
    },
    {
      id:     'healer',
      name:   'The Healer',
      desc:   'You know what people need before they name it.',
      effect: 'Unlocks Connie Frank friendship track. Medical assistance options.',
    },
  ],
  [
    { id: 'sleeper',    name: 'The Sleeper',    desc: 'You forgot. Almost everything. But something stayed.',        effect: 'Occasional flashes from the last crossing.',                             requires_playcount: 1 },
    { id: 'penitent',   name: 'The Penitent',   desc: 'You know what you did.',                                     effect: 'Past-life flags alter scene text.',                                      requires_playcount: 1 },
    { id: 'witness',    name: 'The Witness',    desc: 'You saw something last time. You\'re not sure what.',         effect: 'Map memory persists between crossings.',                                requires_playcount: 1 },
    { id: 'prophet',    name: 'The Prophet',    desc: 'You see through the anomaly.',                               effect: 'Interference scenes reveal additional text.',                            requires_playcount: 1 },
    { id: 'rememberer', name: 'The Rememberer', desc: 'You have been on this ship before.',                         effect: 'Significant scene alterations. Pavel speaks in Cyrillic from the first.', requires_playcount: 2 },
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
  id: 'cats_conference',
  weight: 0.05,
  text: 'Haircut is on the bridge again. No one has explained why the captain allows this. Freezer Beef is presumably below. Nadia reports both facts without comment, as though they are meaningful and she is not the right person to say how.',
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

S.registerEnding({
  id: 'erasure', priority: 0,
  condition: { type: 'flag', id: 'mission_accepted' },
  scene: 'ending_erasure',
});

S.registerEnding({
  id: 'witness', priority: 5,
  condition: { type: 'and', conditions: [
    { type: 'flag',    id: 'mission_refused' },
    { type: 'theosis', min: 33 },
  ]},
  scene: 'ending_witness',
});

S.registerEnding({
  id: 'restoration', priority: 10,
  condition: { type: 'and', conditions: [
    { type: 'flag',    id: 'archive_transmitted' },
    { type: 'theosis', min: 66 },
  ]},
  scene: 'ending_restoration',
});

S.registerEnding({
  id: 'the_knowing', priority: 20,
  condition: { type: 'and', conditions: [
    { type: 'charism', id: 'rememberer' },
    { type: 'theosis', min: 90 },
    { type: 'flag',    id: 'archive_transmitted' },
  ]},
  scene: 'ending_the_knowing',
});

// ─────────────────────────────────────────────────────────────────
// SCENES
// ─────────────────────────────────────────────────────────────────

S.registerScenes({

  // ── OPENING ──────────────────────────────────────────────────

  cabin_wake: {
    id: 'cabin_wake', location: 'Cabin', mood: 'neutral',
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
    onEnter: () => { S.offerSounding('sounding_crossing'); },
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
    id: 'first_mate_first', location: 'Bridge', mood: 'neutral',
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
    choices: [
      {
        text:      'The Academy reached out. I had the availability.',
        next:      'miguel_response',
        set_cover: { key: 'connection', value: 'sent by the Academy' },
      },
      {
        text:      'A colleague recommended me. Someone who knows you, I think.',
        next:      'miguel_response',
        set_cover: { key: 'connection', value: 'personal recommendation' },
        mod_reputation: { miguel: 1 },
      },
      {
        text:      'I asked for something far from land. They found something.',
        next:      'miguel_response',
        set_cover: { key: 'connection', value: 'personal request' },
      },
    ],
  },

  miguel_response: {
    id: 'miguel_response', location: 'Bridge', mood: 'neutral',
    text: `He is quiet for a moment. The wheel. The horizon.

— The mess is aft. Lena makes coffee. Crew eats at seven and noon. Sunday, if you want to do something in the mess, entirely up to you.

He returns to the horizon. He has filed what you said. He will return to it.`,
    onEnter: () => { S.setFlag('miguel_introduced'); },
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

— Kylie Matterhorn is a journalist. Or says she is. Connie Frank is the doctor. Othis Commera is cargo.

*Is* cargo. Odd choice of phrasing. He doesn't elaborate.

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
    id: 'foredeck_first', location: 'Foredeck', mood: 'neutral',
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
    text: `— The ship is non-magnetic. He barely pauses for your nod. — Built so its own material doesn't distort the readings. The brass, the bronze, the oak. No iron. Or almost none. And because of this minimum, the instruments record what is actually there.

He turns to the water for a moment as if checking something.

— I think Paul was trying to do something similar. Not the institutional Paul. The other one. The one who says: I no longer live, but Christ lives in me. Which is to say: I have minimised the interference. Something can come through now.

He looks at you.

— That's what a chaplain is for, isn't it? To be the ship built to not interfere.

Then, without transition:

— What tradition are you working from?`,
    onEnter: () => { S.incrementTheosis(3); S.setFlag('pavel_ferromagnetic_heard'); },
    choices: [
      {
        text:      '"United Church. Though I borrow widely."',
        next:      'pavel_denomination_response',
        set_cover: { key: 'denomination', value: 'United Church' },
        set_flag:  'cover_denomination_united',
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
      },
    ],
  },

  pavel_denomination_response: {
    id: 'pavel_denomination_response', location: 'Foredeck', mood: 'neutral',
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
    id: 'galley_first', location: 'Galley', mood: 'neutral',
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
    onEnter: () => { S.modReputation('lena', 2); S.offerSounding('sounding_crossing'); },
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
      { text: '"What\'s in the hold?"',                        next: 'lena_hold'    },
      { text: '"What do you mean, doing what she was built for?"', next: 'lena_reasons' },
      { text: 'Go to the hold.',                                next: 'hold_first'   },
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
      { text: 'Leave it. Come back.',       next: 'main_deck_hub'     },
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
      { text: 'Go to the hold. Now.',              next: 'hold_first'    },
      { text: 'Find Lena. Ask what she knows.',    next: 'galley_first'  },
      { text: 'Say nothing yet.',                  next: 'main_deck_hub' },
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
    id: 'hold_first', location: 'Hold', mood: 'uncanny',
    text: `Below the waterline. You can feel that — the sea becomes audible at a different pitch. Water doing its patient work against the oak and pine.

Your eyes adjust.

Usual supplies. Then, taking up most of the far end: boxes. Many boxes. Some labelled in a hand you cannot place. Some in pencil with years. Some sealed with tape that has dried and curled.

Freezer Beef is sitting on one of the boxes. Large. Grey. He gives the impression of having arrived somewhere important several years before anyone else.

He looks at you without surprise.`,
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

The hull breathes around you. Freezer Beef watches you with the patience of someone who has already decided.

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
      { text: 'Open the 1972 box.',                        next: 'hold_1972_box'                        },
      { text: 'Don\'t open anything. Just bear witness.',  next: 'hold_witness', theosis: 3             },
      { text: 'Go back up.',                               next: 'main_deck_hub'                        },
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
      { text: 'Go up. Find someone to talk to.',  next: 'main_deck_hub' },
      { text: 'Open the 1972 box.',               next: 'hold_1972_box' },
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
      S.modReputation('miguel', 2);
      S.showToast('Something is found.', 'theosis');
    },
    choices: [
      { text: 'Put it back carefully. Go find Miguel.',  next: 'miguel_photo_return' },
      { text: 'Keep the photograph.',                    next: 'main_deck_hub', set_flag: 'photo_kept', give_item: 'zarya_photograph' },
      { text: 'Put it back. Seal the box.',              next: 'main_deck_hub'       },
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
    id: 'kylie_first', location: 'Mess Hall', mood: 'neutral',
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
    id: 'connie_first', location: 'Mess Hall', mood: 'neutral',
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
    id: 'nadia_first', location: 'Mess Hall', mood: 'neutral',
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
    id: 'alexei_first', location: 'Mess Hall', mood: 'neutral',
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
    onEnter: () => { S.incrementTheosis(5); S.applyEffect({ composure: 2 }); S.offerSounding('sounding_history'); },
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
    id: 'othis_first', location: 'Hold Access', mood: 'neutral',
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
      { text: 'Find Pavel. Tell him what you know.',      next: 'act_two_pavel'     },
      { text: 'Find Miguel. Ask what he needs from you.', next: 'act_two_miguel'    },
      { text: 'Sit in the hold with the archive.',        next: 'act_two_hold_sit', theosis: 4 },
      { text: 'Go to the instrument room. See the anomaly.', next: 'act_two_anomaly' },
      { text: '[Act Two — full scenes next session]',     next: 'act_two_placeholder' },
    ],
  },

  act_two_placeholder: {
    id: 'act_two_placeholder', location: 'The Crossing', mood: 'uncanny',
    text: `[Act Two full scenes — the Sunday service, the cover challenge, the death near the anomaly peak, Nadia's discovery, Oblong Vassilithune's first appearance, the Stink Patrol's moment, the radio reveal — are being developed for the next session.

The engine is working. Act One is complete. The crossing continues.]`,
    choices: [
      { text: 'Return to Day One.', next: 'main_deck_hub' },
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
      { text: '"Tell me more about the radio."', next: 'act_two_placeholder'                          },
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

  act_two_resolve: {
    id: 'act_two_resolve', location: 'The Crossing', mood: 'revelation',
    text: `Day Three.

The anomaly is at its peak. The instruments are reading something they have never read. Nadia is crying in the good way. Alexei is using words that are not scientific words. Miguel has his hand on the wheel and his face turned toward the bow, and he looks like someone who has been trying to bring a ship home for a very long time.

You know what you are doing.

The question is how far you are willing to go.`,
    onEnter: () => {
      S.incrementTheosis(4);
      S.setFlag('act_three_begun');
      S.unlockCodexEntry('codex_zarya_history');
      S.unlockCodexEntry('codex_solidarity');
      S.checkEndings();
    },
    choices: [
      { text: 'Refuse the mission. Hide the archive.',   next: 'ending_witness',     set_flag: 'mission_refused'  },
      { text: 'Transmit the archive. Broadcast it.',     next: 'ending_restoration', requires_flag: 'radio_existence_known', flags: ['archive_transmitted', 'mission_refused'] },
      { text: 'Complete the mission.',                    next: 'ending_erasure',     set_flag: 'mission_accepted' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // ENDINGS
  // ─────────────────────────────────────────────────────────────

  ending_erasure: {
    id: 'ending_erasure', location: 'Hold', mood: 'uncanny',
    text: `The instructions were clear. You followed them.

The materials were in the cabinet. Othis gave you the key once you showed him the envelope. He didn't look at you after. He went up to the deck and stood at the rail.

The archive burned slowly. Paper that has lasted thirty years does not go easily.

Alexei stayed in the instrument room throughout. His instruments were still measuring. Even at the end, the ship was doing what she was built for.

Pavel was on the foredeck. He did not watch the smoke.

Miguel stood at the wheel. The ship continued north.

The dawn, when it came, was ordinary. Nothing had happened to it.

The ship will have a different name in the documents now. A different history. The history it had — thirty years of finding, of measuring, of sharing what it found with the world — is over.

You made a crossing.

━━━━━━━━━━━━━━━━━━━━━━━━
  ERASURE
━━━━━━━━━━━━━━━━━━━━━━━━`,
    onEnter: () => {
      S.setFlag('ending_erasure_reached');
      S.addJournalEntry({ type: 'ending', text: 'Erasure — the archive is gone.' });
    },
    choices: [
      { text: 'Begin a new crossing.', next: '__new_play__' },
    ],
  },

  ending_witness: {
    id: 'ending_witness', location: 'Hold', mood: 'uncanny',
    text: `You refused.

Quietly. In the hold, in the dark, with Freezer Beef watching. You moved the most important boxes to a location not on the current manifest. A place Miguel showed you, because Miguel knows this ship in ways the people who chartered it do not.

Othis will discover this. Landstorm will be informed. Consequences will arrive on land.

On land is not here.

The ship is still moving. Alexei is still measuring. Nadia found something in the data this morning that made her go very still and then start writing. Pavel is on the foredeck. The bronze fittings caught the last of the day's light and held it longer than they should have.

The ship will continue under another name in other documents. But the archive is still in the world. Somewhere on a ship built to be transparent, thirty years of finding is still findable.

You witnessed.

━━━━━━━━━━━━━━━━━━━━━━━━
  WITNESS
━━━━━━━━━━━━━━━━━━━━━━━━`,
    onEnter: () => {
      S.setFlag('ending_witness_reached');
      S.addJournalEntry({ type: 'ending', text: 'Witness — the archive is hidden.' });
    },
    choices: [
      { text: 'Begin a new crossing.', next: '__new_play__' },
    ],
  },

  ending_restoration: {
    id: 'ending_restoration', location: 'Instrument Room', mood: 'revelation',
    text: `The radio — forty years old, original equipment, brass fittings, designed for high-deviation fields — was built for this.

You broadcast what you could. The names. The coordinates. The dates. The photograph at the anomaly, described in words because a radio is not a camera. The names of the scientists — from five countries, across three decades — who had been on this ship. Who had found things. Who had shared what they found.

The anomaly was at its peak. The signal went out in a direction that should not have been possible given the interference. It went anyway. The ship, which does not interfere, made room for it.

Somewhere, someone heard.

Alexei put his hand flat on the brass casing of the radio when the transmission ended. Then went back to his instruments.

Pavel was there. You don't know when he arrived. He said: *yes.* Just that.

Заря was in the anomaly, at the peak, broadcasting the record of everything she had found.

She was doing what she was built for.

━━━━━━━━━━━━━━━━━━━━━━━━
  RESTORATION
━━━━━━━━━━━━━━━━━━━━━━━━`,
    onEnter: () => {
      S.setFlag('ending_restoration_reached');
      S.addJournalEntry({ type: 'ending', text: 'Restoration — the record goes into the world.' });
      S.unlockCodexEntry('codex_zarya_history');
      S.flashTheosisLight(1.0, 5000);
    },
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
      { text: 'Go to the foredeck.',      next: 'foredeck_first',    condition: { type: 'not', condition: { type: 'flag', id: 'met_pavel'  } } },
      { text: 'Go to the bridge.',        next: 'first_mate_first',  condition: { type: 'not', condition: { type: 'flag', id: 'met_miguel' } } },
      { text: 'Go to the bridge.',        next: 'bridge_hub',        condition: { type: 'flag', id: 'met_miguel' }                            },
      { text: 'Go to the mess.',          next: 'mess_hub'                                                                                    },
      { text: 'Go to the galley.',        next: 'galley_first',      condition: { type: 'not', condition: { type: 'flag', id: 'met_lena'   } } },
      { text: 'Go to the galley.',        next: 'galley_hub',        condition: { type: 'flag', id: 'met_lena' }                              },
      { text: 'Go to the chart room.',    next: 'chart_room_first',  condition: { type: 'flag', id: 'met_miguel' }                            },
      { text: 'Go below to the hold.',    next: 'hold_first',        condition: { type: 'and', conditions: [{ type: 'flag', id: 'met_miguel' }, { type: 'not', condition: { type: 'flag', id: 'hold_visited' } }] } },
      { text: '— Continue the crossing.', next: 'act_two_begin',    requires_flag: 'mission_reality_known'                                    },
    ],
  },

  bridge_hub: {
    id: 'bridge_hub', location: 'Bridge', mood: 'neutral',
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
  if (S.G.playCount <= 1) return;
  const t = S.G.theosis;
  const id = t >= 90 ? 'rememberer' : t >= 71 ? 'prophet' : t >= 46 ? 'witness' : t >= 20 ? 'penitent' : 'sleeper';
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
});

S.on('theosisChanged', (val) => {
  document.body.classList.remove('tier-asleep','tier-waking','tier-illumined');
  if      (val <= 32) document.body.classList.add('tier-asleep');
  else if (val <= 65) document.body.classList.add('tier-waking');
  else                document.body.classList.add('tier-illumined');
});

// ─────────────────────────────────────────────────────────────────
// START
// ─────────────────────────────────────────────────────────────────

S.render();
