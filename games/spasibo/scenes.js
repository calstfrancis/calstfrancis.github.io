// ═══════════════════════════════════════════════════════════
// СПАСИБО — scenes.js
// Game data. Loads after scenes-act1/2/3.js.
// ═══════════════════════════════════════════════════════════

function iconWord() {
  // crossing 1: icon  crossing 2-3: ikon  crossing 4+: Икон
  return G.playCount >= 4 ? '\u0418\u043a\u043e\u043d' : G.playCount >= 2 ? 'ikon' : 'icon';
}
function harbourWord() {
  // The harbour where all this happens. Gets more specific across crossings.
  return G.playCount >= 4 ? 'Ленинград' : G.playCount >= 2 ? 'the Eastern port' : 'port';
}
function shipWord() {
  // The ship's name surfaces gradually
  return G.playCount >= 3 ? 'the Sobornost' : G.playCount >= 1 ? 'this ship' : 'the ship';
}

function objectDescription() {
  if (G.playCount >= 4) return 'a Torah scroll — very old, of the original two. Entrusted. From a different dispersed community, the same century of loss.';
  return 'an icon — very old, face worn to near-nothing.';
}

const CHARISMS = {
  sleeping: [
    { id: 'cover',        name: 'Cover',        desc: "Your false self carries weight. People believe it in ways that occasionally surprise you." },
    { id: 'suspicion',    name: 'Suspicion',    desc: "You feel when you are being watched or tested. Not always right. Mostly right." },
    { id: 'withholding',  name: 'Withholding',  desc: "Present but unreadable. Some find this calming. Some find it troubling." },
    { id: 'interruption', name: 'Interruption', desc: "You know how to stop something without leaving fingerprints." },
  ],
  waking: [
    { id: 'anamnesis',       name: 'Anamnesis',       desc: "You remember what you shouldn't. Previous crossings. Other names." },
    { id: 'kenosis',         name: 'Kenosis',         desc: "You empty yourself. People confide past their own intentions." },
    { id: 'tathagatagarbha', name: 'Tath\u0101gatagarbha', desc: "You see the comrade in someone before they do." },
    { id: 'apophasis',       name: 'Apophasis',       desc: "You know what cannot be said, which is sometimes the only thing that matters." },
  ],
};

const SOUNDINGS = {
  gnoti_seauton: { name: 'Gn\u014dthi Seaut\u00f3n', fragment: '\u03b3\u03bd\u1ff6\u03b8\u03b9 \u03c3\u03b5\u03b1\u03c5\u03c4\u03cc\u03bd', origin: 'Delphic oracle.', taking: 'The question turns over. You keep arriving at the same absence.', settled: 'Know thyself. The absence has a shape now. You begin to recognise it.', effect: { doubt: 1 }, effect_desc: 'Deepens introspective options.', atmos: { fog_mult: -0.2 } },
  in_principio: { name: 'In Principio', fragment: 'In principio erat Verbum', origin: 'John 1:1. Vulgate Latin.', taking: 'Before language. Before the word. What was before the word?', settled: 'The script on the {ICON} uses a different alphabet. You are beginning to think you know what kind.', effect: { vigilance: 1 }, effect_desc: 'Heightens perception of written things.', atmos: { lamp_steady: true } },
  kenosis_thought: { name: 'Ken\u014dsis', fragment: '\u03ba\u03ad\u03bd\u03c9\u03c3\u03b9\u03c2', origin: 'Philippians 2:7.', taking: 'What you give up to make room. What arrives in the room you make.', settled: 'To empty yourself so something else can fill you. Pavel understands this.', effect: { communion: 1 }, effect_desc: 'Enhances Communion when you hold back.', atmos: {} },
  agape: { name: 'Ag\u0101p\u0113', fragment: '\u1f00\u03b3\u03ac\u03c0\u03b7', origin: 'New Testament Greek.', taking: 'Love that does not require return. You are trying to feel the edges of it.', settled: 'She loves you this way. You begin to understand what that might mean.', effect: { communion: 1 }, effect_desc: 'Unlocks deeper questions with Pavel.', atmos: { lamp_warm: true } },
  null_set: { name: 'The Empty Set', fragment: '\u2205', origin: 'Set theory. Cantor, Zermelo-Fraenkel.', taking: 'What remains when everything is removed. The structure of reaching.', settled: 'Not-knowing has a form. You can work with a form.', effect: { doubt: 1 }, effect_desc: 'Allows apophatic moves.', atmos: { fog_mult: 0.1 } },
  sobornost: { name: 'Sobornost', fragment: '\u0421\u043e\u0431\u043e\u0440\u043d\u043e\u0441\u0442\u044c', origin: 'Russian Orthodox theology. Khomiakov, 19th century.', taking: 'The collective as spiritual reality. The comrade in everyone.', settled: 'The word the Soviet project inherited without knowing it had. Something in the cargo hold knows this word too.', effect: { communion: 1 }, effect_desc: 'Deepens understanding of what the container carries.', atmos: {} },
  via_negativa: { name: 'Via Negativa', fragment: '\u1f00\u03c0\u03cc\u03c6\u03b1\u03c3\u03b9\u03c2', origin: 'Pseudo-Dionysius. 5th\u20136th century.', taking: 'You cannot say what it is. You can say what it is not.', settled: 'In the residue: something. Haircut knows this method. She applied it to you.', effect: { doubt: 1 }, effect_desc: 'Reduces uncertainty where certainty is unavailable.', atmos: { fog_mult: -0.15 } },
  magnificat: { name: 'The Magnificat', fragment: 'Magnificat anima mea Dominum', origin: "Luke 1:46\u201355. Mary's song.", taking: 'The hungry filled. The rich sent away empty. You are still deciding if you read this right.', settled: 'The revolutionary embedded in the liturgy. The crew below decks heard what they needed.', effect: { communion: 1 }, effect_desc: 'Changes how crew respond throughout the crossing.', atmos: { lamp_warm: true, lamp_bright: 0.04 } },
};

const GLOSSARY = [
  { term: 'Icon (Ikon / \u0418\u043a\u043e\u043d)', def: 'A sacred image in the Eastern Orthodox tradition. Not a representation but a window \u2014 the image participates in what it depicts. Older icons have the face worn to near-nothing from veneration: hands and lips across centuries.' },
  { term: 'Provenance', def: '"Provenance disputed" is a legal term meaning the chain of ownership contains a contested or invalid transfer. Objects looted during wars, revolutions, or dispersals frequently have disputed provenance.' },
  { term: 'Church Slavonic', def: 'The liturgical language of the Eastern Orthodox church. Used in services, in provenance documents for sacred objects, and in certain kinds of formal testimony.' },
  { term: 'Kenosis', def: 'Greek: self-emptying. In theology, the act of Christ setting aside divine attributes to become human. In practice: the spiritual discipline of emptying the self so that something else can arrive.' },
  { term: 'Sobornost', def: 'Russian Orthodox concept. Roughly: the unity of the collective in the spirit. The collective as spiritual reality. The Soviet project inherited this word without knowing it.' },
  { term: 'Anamnesis', def: 'Greek: unforgetting. In the Eucharist, the act of making the past present \u2014 not remembering but re-membering. In the game: the charism of the chaplain who has crossed before.' },
  { term: 'Via Negativa', def: 'The apophatic path: defining God by what God is not. The only honest theology, some argue, is one that is perpetually subtracting.' },
  { term: 'Heritage Transfer', def: 'A legal category for culturally significant objects moved across borders. "Declared value nominal" is a common method of avoiding scrutiny.' },
  { term: 'Dispersal', def: 'The forced scattering of a community. Objects made by dispersed communities exist in a legal grey zone: who inherits the right of ownership?' },
  { term: 'Authentication', def: 'The formal confirmation that an object is what it is claimed to be, and that the conditions of its transfer are valid. The chaplain is the authentication.' },
];

const NOTES = {
  cover_posting_requested: "You told Merky you requested this posting yourself.",
  cover_posting_assigned:  "You told Merky you were assigned \u2014 didn't ask.",
  cover_posting_escape:    "You told Merky you needed to leave where you were.",
  cover_posting_summoned:  "You told Merky someone asked for you specifically.",
  cover_bg_teacher:        "You've said you were a teacher before ordination.",
  cover_bg_medical:        "You've said you worked in medicine before ordination.",
  cover_bg_functionary:    "You've said you were a minor functionary before ordination.",
  cover_bg_scholar:        "You've said you were a scholar before ordination.",
  cover_denom_orthodox:    "You declared yourself Orthodox.",
  cover_denom_protestant:  "You declared Protestant \u2014 a useful blankness.",
  cover_denom_ecumenical:  `You said "ecumenical." They didn't press.`,
  cover_denom_catholic:    "You declared Catholic. Implications untraced.",
  charism_cover:           "CHARISM \u2014 Cover: your false self is load-bearing.",
  charism_suspicion:       "CHARISM \u2014 Suspicion: you feel when you're being watched.",
  charism_withholding:     "CHARISM \u2014 Withholding: present, unreadable.",
  charism_interruption:    "CHARISM \u2014 Interruption: you can stop things quietly.",
  charism_anamnesis:       "CHARISM \u2014 Anamnesis: you remember what you shouldn't.",
  charism_kenosis:         "CHARISM \u2014 Kenosis: you empty yourself; people confide.",
  charism_tathagatagarbha: "CHARISM \u2014 Tath\u0101gatagarbha: you see the comrade in someone before they do.",
  charism_apophasis:       "CHARISM \u2014 Apophasis: you know what cannot be said.",
  icon_examined:           () => `The ${iconWord()}: Orthodox, old, worn to near-nothing. Writing on the back in a script you cannot name.`,
  icon_wrong_direction:    () => `The ${iconWord()} was facing the wrong direction. You are certain it was not, before.`,
  crossing_noted:          "You have been at sea for some time. You do not know how long.",
  saw_haircut:             "Haircut \u2014 on the railing. Long-haired, black. She completed her assessment. The answer was yes.",
  saw_haircut_window:      "A black cat on the railing through the corridor glass. She held a paw up. Then gone.",
  met_freezer_beef:        "Freezer Beef \u2014 small calico, comprehensive contentment. Asleep in the cargo hold.",
  met_pavel:               "You met Pavel. No last name. He was in the wrong place. He seemed to have been waiting.",
  met_vance:               "Vance Landstorm. Senior crew. Has been on this vessel since before you were ordained.",
  met_butterantonio:       "Craigslist Butterantonio. Maritime lawyer, semi-retired. Two pairs of glasses.",
  met_eider:               "Eider Swagstom. Ship's doctor. She knows when a crossing is different.",
  met_sinhola:             "Sinhola Shinola. Linguist. Dead languages and provenance documentation.",
  met_tim:                 "Tim Ezterhazh. He loaded the cargo. His hands know something now.",
  pavel_she_said:          `Pavel said: "She isn't wrong about you." He did not explain who "she" is.`,
  merky_introduced:        "Merky Crabbit. First mate. Wary of you, but not unkindly.",
  merky_warned_cargo:      "Merky said to stay out of cargo. Not quite a prohibition.",
  vespers_traditional:     "You held a service of lament. Composure rose among the officers.",
  vespers_liberationist:   "You held a liberationist service. The crew below deck heard themselves in it.",
  vespers_ambiguous:       "You held a service that could be read either way.",
  container_found:         "A sealed container in the lower hold. Warmer than the hold. The manifest number does not match.",
  container_opened:        "You opened the container. You know what is inside now.",
  container_release_known: "Tim described the secondary release mechanism. Rotation, then press.",
  mission_understood:      "You understand now. You were sent to authenticate a transfer. The icons should not go West.",
  knows_manifest_issue:    "The cargo manifest has a discrepancy.",
  found_the_room:          "There is a room between the hold and the lower level that does not appear on any map.",
  vance_told_you:          "Vance told you the container has been on this ship before. Under a different manifest number.",
  found_documents:         "Heritage Transfer Services. Your authentication role. A handwritten note: Confirm only. Do not investigate further.",
  crew_pastoral_intel:     "A crew member mentioned Pavel has been asking about the container. Not to anyone official.",
  had_sincere_moment:      "You told someone something true. The cover is slightly less complete. This is not a problem.",
  act2_nav_hint:           "Eider mentioned a crewman with burned hands — try the engine room. Sinhola is in Cabin 2. The container release mechanism is somewhere in cargo.",
  merky_cover_held:        "Your cover held. Merky accepted the explanation.",
  merky_watching:          "Merky is watching you. They did not accept the explanation.",
  merky_suspicious:        "Merky knows something is wrong. The cover has been questioned.",
  merky_respects_you:      "Merky respects the discipline. They did not press.",
  merky_trusts_partial:    "You told Merky something true. They noticed the difference.",
};
function noteLabel(k) { const n = NOTES[k]; if (!n) return k; return typeof n === 'function' ? n() : n; }

const ART = {
  haircut: `
     \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
     \u2502  H A I R C U T    \u2502
     \u2502                   \u2502
     \u2502   /\\_____/\\      \u2502
     \u2502  ( \u25c8     \u25c8 )      \u2502
     \u2502   \\  \u2500\u2500\u2500  /       \u2502
     \u2502    '\u2500\u2500\u2500\u2500\u2500'        \u2502
     \u2502  \u2243\u2243\u2243\u2243\u2243\u2243\u2243\u2243\u2243\u2243\u2243      \u2502
     \u2502  [evaluating you] \u2502
     \u2502  [always]         \u2502
     \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518`,
  freezer_beef: `
     \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
     \u2502 F R E E Z E R     \u2502
     \u2502 B E E F           \u2502
     \u2502                   \u2502
     \u2502   /\\___/\\        \u2502
     \u2502  ( \u2500   \u2500 )  z z   \u2502
     \u2502   \\  \u03c9  /         \u2502
     \u2502    '\u2500\u2500\u2500'          \u2502
     \u2502  [calico, small]  \u2502
     \u2502  [asleep: always] \u2502
     \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518`,
  pavel: `
     .\u2500\u2500\u2500\u2500.
    ( \u25e6  \u25e6 )
    (\u2500\u2500\u2500\u2500\u2500\u2500)    "She isn't wrong
    ( ~~~~~ )    about you."
     '\u2500\u2500\u252c\u2500\u2500'
     \u2591\u2591\u2591\u2502\u2591\u2591\u2591
   (coat too large,
    carrying something
    he has forgotten about)`,
};

function processText(raw) {
  if (typeof raw === 'function') raw = raw(G);
  return raw
    .replace(/{ICON}/g, iconWord())
    .replace(/\u0421\u043f\u0430\u0441\u0438\u0431\u043e/g, '<span class="sp-cold">\u0421\u043f\u0430\u0441\u0438\u0431\u043e</span>')
    .replace(/\u2500\u2500\u2500+/g, '<span class="sp-dim">$&</span>');
}

// ── DYNAMIC TEXT FUNCTIONS ────────────────────────────────────

function merkyCoverProbeText(G) {
  const warm = G.flags.has('vespers_liberation') || G.flags.has('merky_alliance');
  const bgRaw = G.cover.background || 'your background';
  const bg = bgRaw.replace('bg_','').replace(/_/g,' ');
  const bgLabel = bg.charAt(0).toUpperCase()+bg.slice(1);
  if (warm) return [
    "Merky is in the mess when you return. They look up \u2014 not with suspicion. Something else.",
    `'I've been thinking,' they say. 'About what you said earlier. Before the collar, you said you were \u2014 ' They name it. '${bgLabel}.'`,
    "A pause. More considering than testing.",
    "'We had someone come through with the same background two crossings ago.' They look at you. 'Not accusing. Just noting.'",
    "'The service last night was good,' they add. 'Some of the crew thought so.'"
  ];
  return [
    "Merky is in the mess when you return. They look up without quite seeming to.",
    `'I've been thinking,' they say. 'About what you said earlier. Before the collar, you said you were \u2014 ' They name it. '${bgLabel}.'`,
    "A pause. Long enough to be intentional.",
    `'We had a chaplain two crossings ago who said the same thing. Different name. Different face. Same background.' They look at you. 'Is that common, in your training?'`
  ];
}

function chapelIconAct2Text(G) {
  const hasSinhola = G.flags.has('met_sinhola');
  const hasButteranto = G.flags.has('met_butterantonio');
  const base = ["You lift it again. This time you know what you are looking at."];
  if (hasSinhola) base.push("The script on the back \u2014 you have seen it now. In the container documentation that Sinhola translated. You can read fragments.");
  else if (hasButteranto) base.push("The script on the back \u2014 a better sense of it now. Butterantonio described the provenance document. Church Slavonic. Liturgical language.");
  else base.push("The script on the back. You have been in the container. You know the icons are from the same source.");
  base.push(
    "It says: of the original pair. Entrusted. To be returned.",
    "The {ICON} in your cabin was placed here as part of the documentation of the transfer. You are the authentication.",
    "The note at the bottom of your briefing said: Confirm only. Do not investigate further.",
    "You understand now what you were not supposed to investigate.",
    "You sit with this for a long time."
  );
  return base;
}

function act3ApproachText(G) {
  if (G.playCount === 0) return [
    "You sit in the chapel.",
    "The {ICON} is on the table. Your briefing documents are in the drawer.",
    "Heritage Transfer Services. Authentication required. Confirm only. Do not investigate further.",
    "You investigated further. But you are still the chaplain. You were sent here to do a job.",
    "The ship will reach port in less than a day.", "You go to the hold."
  ];
  const lines = [
    "You sit in the chapel for a long time.",
    "The {ICON} is on the table. Its counterpart is in the lower hold.",
    "You were sent here to authenticate a transfer. The transfer would take both icons further from the people they belong to.",
  ];
  if (G.playCount >= 2) lines.push("You have been here before. Or someone like you has. The previous chaplain signed. You know what followed.");
  lines.push(
    "Pavel is on this ship because she told him to be here. Butterantonio is here because the dispersed community can still commission someone. Sinhola is here to translate. Tim's hands know something now.",
    "You were sent here by whoever wants the transfer to succeed.",
    "You have to decide what you are."
  );
  return lines;
}

function theChoiceText(G) {
  if (G.playCount === 0) return [
    "You stand before the container.",
    "It is warm. Your hands are near the seal.",
    "Pavel is somewhere behind you. You hear him not speaking.",
    "The port is close.",
    "You have your orders. You have your documents. You have the form that needs your signature.",
    "There is one thing to do here."
  ];
  const lines = [
    "You stand before the container.",
    "It is warm. Your hands are near the seal.",
    "Pavel is somewhere behind you. You hear him not speaking.",
    "The port is close. You have perhaps six hours.",
  ];
  if (G.playCount >= 1) {
    lines.push("Last crossing, you knew what you were supposed to do. This crossing is different.");
    if(G.flags.has('had_witness_ending'))lines.push("The previous crossing: you witnessed. You did not act. The weight of that is still here.");
  }
  if (G.playCount >= 2) lines.push("You have stood here before. The weight is familiar now. The weight is the point.");
  lines.push("Three things you could do.");
  return lines;
}

function endingInterceptText(G) {
  if (G.playCount === 0) return [
    "You do what you were sent to do.",
    "The authentication is a formality. A signature on a document that Butterantonio brings to you. You sign it.",
    "The container reaches its destination. The icons enter a private collection. They are well preserved.",
    "You wake again on another ship, another crossing. The harbour was grey. The coffee was thick.",
    "Something is different. You cannot locate what.",
    "Pavel is not on this crossing.", "\u0421\u043f\u0430\u0441\u0438\u0431\u043e."
  ];
  return [
    "You do what you were sent to do.",
    "Butterantonio brings the document. You have signed one before. You sign it again.",
    "The container reaches its destination. The icons enter a private collection. They are never seen publicly.",
    "You knew, this time, when you signed.",
    "You wake again. The harbour was grey. The coffee was thick.",
    "Something is different. You have been trying to locate it for some time.",
    "Pavel is not on this crossing.", "\u0421\u043f\u0430\u0441\u0438\u0431\u043e."
  ];
}

function epilogueInterceptText(G) {
  const L = ["\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", "What followed.",""];
  if(G.playCount>=1)L.push("Pavel was not on the crossing that followed. He was not on the one after that. She would know where he went. She is not answering, on this particular crossing, in the particular way she answered him.");
  if (G.flags.has('met_butterantonio')) L.push("Butterantonio filed a report. It went to people who read reports. Those people filed their own reports. The matter was considered legally settled. Butterantonio considers it differently. You know this because he was on the ship after this one, with a different briefcase. He did not acknowledge you. That was the acknowledgement.");
  if (G.flags.has('met_vance')) L.push("Vance Landstorm stayed on the ship. He has been on this ship since before you were ordained, and he will be on it after. The next time Haircut sat near him, she did not press her side against his leg.");
  if (G.flags.has('merky_warned_cargo')) L.push("Merky Crabbit said nothing to you on the way out. On the next crossing, they were first mate on a different ship. The company moves people around.");
  if (G.flags.has('met_sinhola')) L.push("Sinhola Shinola sent a document to an address you do not know. In Church Slavonic. It is in a record now. Records are patient. Records wait.");
  if (G.flags.has('met_tim')) L.push("Tim Ezterhazh left the ship at the next port. His hands still know something. He is careful, now, about what he touches.");
  L.push("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", "\u0421\u043f\u0430\u0441\u0438\u0431\u043e.");
  return L;
}

function epilogueFacilitateText(G) {
  const L = ["\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", "What followed.",""];
  L.push("Pavel wept, which he did not appear to notice. When you saw him afterward, he seemed lighter. She had told him this crossing would matter. She was right, as she tends to be. He took a train from the port. He does not know where it goes. That also tends to work out.");
  if (G.flags.has('vespers_liberation')) L.push("The crew from below decks helped move the container through channels that Butterantonio identified and that Vance did not obstruct. Not because they were asked. Because they had heard the Magnificat and they had understood it the way Mary meant it.");
  if (G.flags.has('met_butterantonio')) L.push("Butterantonio completed the legal filing before the ship reached port. He had prepared it before the crossing \u2014 for whichever chaplain was sent. He had been waiting, across several crossings, for the right one. He went home after. He has not taken another maritime case.");
  if (G.flags.has('met_sinhola')) L.push("Sinhola Shinola submitted the provenance documentation to three different international bodies. Two acknowledged it. One lost it. The one that lost it found it again, eighteen months later, at the bottom of a filing system that had not been properly maintained. The matter is pending. Pending is better than resolved in the wrong direction.");
  if (G.flags.has('met_vance')) L.push("Vance Landstorm did not prevent anything. He later described this as the most significant thing he had done in thirty years on this route. Haircut sits near him in the evenings. She is always there when the fog comes in.");
  if (G.flags.has('met_eider')) L.push("Eider Swagstom wrote a case study. She changed all the names. She sent it to a journal. They declined it. She keeps the manuscript. She has not changed the names in her own copy.");
  if (G.flags.has('met_tim')) L.push("Tim Ezterhazh did not go near cargo for a year. Then he went back. His hands still know something. He has found, over time, that this is useful.");
  L.push("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", "\u0421\u043f\u0430\u0441\u0438\u0431\u043e.", "The next crossing begins differently.");
  return L;
}

function epilogueWitnessText(G) {
  const L = ["\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", "What followed.",""];
  L.push("The container was held at the port. The matter entered arbitration. Arbitration in these cases takes years.");
  L.push("Pavel said: that was the hardest of the three. He did not say whether he meant hardest to do or hardest to justify. He shook your hand at the gangway. His hand was warm in the way of someone who has been holding something important.");
  if (G.flags.has('met_butterantonio')) L.push("Butterantonio's filing entered the official record during the hold. Once in the record, it cannot be taken out. The dispersed community's claim is formally acknowledged. This is not the same as justice. It is one of the materials from which justice is eventually made.");
  if (G.flags.has('met_sinhola')) L.push("Sinhola Shinola stayed at the port for three weeks, present for the formal acknowledgement of the provenance document. They translated it into four languages for four different legal systems. They later said it was the most important translation they had done.");
  if (G.flags.has('met_vance')) L.push("Vance Landstorm described the crossing, once, to someone he trusted. He said: the chaplain did nothing. He said it the way you say something you have been turning over for a long time and have finally understood. The chaplain did nothing. That was the thing they did.");
  L.push("\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", "\u0421\u043f\u0430\u0441\u0438\u0431\u043e.");
  return L;
}

function cargoContainerOpenText(G) {
  const isAlt = G.playCount >= 4;
  const base = [
    "The mechanism works as Tim described. A rotation, a press. The seal yields.",
    "You do not open it fully. You open it enough to see inside.",
  ];
  if (isAlt) {
    base.push(
      "Inside, secured in padding that has been there a long time: a Torah scroll.",
      "Very old. The parchment has the quality of something read by many hands over centuries.",
      "On the protective case: a script you know now. The same tradition of inscription. A different community. The same dispersal. The same loss. The same waiting.",
      "The scroll and the {ICON} in your cabin are not from the same community. The transfer organisation has been moving objects from both.",
      "You close the container. Your hands are not burned. But they know something now."
    );
  } else {
    base.push(
      "Inside, secured in padding that has been there a long time: an icon.",
      "Very old. The face worn to near-nothing. Two dark places for eyes, a darker place for a mouth. Traces of gold. A halo that has almost entirely given itself back.",
      "On the back, a script you know now. The same writing. The same hand, or a hand that knew the same tradition.",
      "The {ICON} in your cabin and the {ICON} in this container are from the same community. The same lost pair.",
      "You close the container. Your hands are not burned. But they know something now."
    );
  }
  base.push("You go back up to the chapel.");
  return base;
}

// ── SCENES (assembled from act files) ────────────────────────
const SCENES = { ...SCENES_ACT1, ...SCENES_ACT2, ...SCENES_ACT3 };

// ── SCENE TEXT PATCHES ────────────────────────────────────────
SCENES['merky_cover_probe'].text    = merkyCoverProbeText;
SCENES['chapel_icon_act2'].text     = chapelIconAct2Text;
SCENES['act3_approach'].text        = act3ApproachText;
SCENES['the_choice'].text           = theChoiceText;
SCENES['ending_intercept'].text     = endingInterceptText;
SCENES['epilogue_intercept'].text   = epilogueInterceptText;
SCENES['epilogue_facilitate'].text  = epilogueFacilitateText;
SCENES['epilogue_witness'].text     = epilogueWitnessText;
SCENES['cargo_container_open'].text = cargoContainerOpenText;
