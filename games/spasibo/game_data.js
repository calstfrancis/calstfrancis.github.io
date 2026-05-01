// ═══════════════════════════════════════════════════════════
// СПАСИБО – Game Data for SOBORNOST Engine v2.1
// Full registrations with theosis integration (Stacy removed)
// ═══════════════════════════════════════════════════════════

// ── CHARISMS ─────────────────────────────────────────────────
SOBORNOST.registerCharisms(
  [
    { id: 'cover',        name: 'Cover',        desc: "Your false self carries weight. People believe it in ways that occasionally surprise you." },
    { id: 'suspicion',    name: 'Suspicion',    desc: "You feel when you are being watched or tested. Not always right. Mostly right." },
    { id: 'withholding',  name: 'Withholding',  desc: "Present but unreadable. Some find this calming. Some find it troubling." },
    { id: 'interruption', name: 'Interruption', desc: "You know how to stop something without leaving fingerprints." },
  ],
  [
    { id: 'anamnesis',       name: 'Anamnesis',       desc: "You remember what you shouldn't. Previous crossings. Other names." },
    { id: 'kenosis',         name: 'Kenosis',         desc: "You empty yourself. People confide past their own intentions." },
    { id: 'tathagatagarbha', name: 'Tathāgatagarbha', desc: "You see the comrade in someone before they do." },
    { id: 'apophasis',       name: 'Apophasis',       desc: "You know what cannot be said, which is sometimes the only thing that matters." },
  ]
);

// ── SOUNDINGS ────────────────────────────────────────────────
SOBORNOST.registerSounding('gnoti_seauton', {
  name: 'Gnōthi Seautón', fragment: 'γνῶθι σεαυτόν', origin: 'Delphic oracle.',
  taking: 'The question turns over. You keep arriving at the same absence.',
  settled: 'Know thyself. The absence has a shape now. You begin to recognise it.',
  effect: { doubt: 1 }, effect_desc: 'Deepens introspective options.', atmos: { fog_mult: -0.2 }
});
SOBORNOST.registerSounding('in_principio', {
  name: 'In Principio', fragment: 'In principio erat Verbum', origin: 'John 1:1. Vulgate Latin.',
  taking: 'Before language. Before the word. What was before the word?',
  settled: 'The script on the {ICON} uses a different alphabet. You are beginning to think you know what kind.',
  effect: { vigilance: 1 }, effect_desc: 'Heightens perception of written things.', atmos: { lamp_steady: true }
});
SOBORNOST.registerSounding('kenosis_thought', {
  name: 'Kenōsis', fragment: 'κένωσις', origin: 'Philippians 2:7.',
  taking: 'What you give up to make room. What arrives in the room you make.',
  settled: 'To empty yourself so something else can fill you. Pavel understands this.',
  effect: { communion: 1 }, effect_desc: 'Enhances Communion when you hold back.', atmos: {}
});
SOBORNOST.registerSounding('agape', {
  name: 'Agāpē', fragment: 'ἀγάπη', origin: 'New Testament Greek.',
  taking: 'Love that does not require return. You are trying to feel the edges of it.',
  settled: 'She loves you this way. You begin to understand what that might mean.',
  effect: { communion: 1 }, effect_desc: 'Unlocks deeper questions with Pavel.', atmos: { lamp_warm: true }
});
SOBORNOST.registerSounding('null_set', {
  name: 'The Empty Set', fragment: '∅', origin: 'Set theory. Cantor, Zermelo-Fraenkel.',
  taking: 'What remains when everything is removed. The structure of reaching.',
  settled: 'Not-knowing has a form. You can work with a form.',
  effect: { doubt: 1 }, effect_desc: 'Allows apophatic moves.', atmos: { fog_mult: 0.1 }
});
SOBORNOST.registerSounding('sobornost', {
  name: 'Sobornost', fragment: 'Соборность', origin: 'Russian Orthodox theology. Khomiakov, 19th century.',
  taking: 'The collective as spiritual reality. The comrade in everyone.',
  settled: 'The word the Soviet project inherited without knowing it had. Something in the cargo hold knows this word too.',
  effect: { communion: 1 }, effect_desc: 'Deepens understanding of what the container carries.', atmos: {}
});
SOBORNOST.registerSounding('via_negativa', {
  name: 'Via Negativa', fragment: 'ἀπόφασις', origin: 'Pseudo-Dionysius. 5th–6th century.',
  taking: 'You cannot say what it is. You can say what it is not.',
  settled: 'In the residue: something. Haircut knows this method. She applied it to you.',
  effect: { doubt: 1 }, effect_desc: 'Reduces uncertainty where certainty is unavailable.', atmos: { fog_mult: -0.15 }
});
SOBORNOST.registerSounding('magnificat', {
  name: 'The Magnificat', fragment: 'Magnificat anima mea Dominum', origin: "Luke 1:46–55. Mary's song.",
  taking: 'The hungry filled. The rich sent away empty. You are still deciding if you read this right.',
  settled: 'The revolutionary embedded in the liturgy. The crew below decks heard what they needed.',
  effect: { communion: 1 }, effect_desc: 'Changes how crew respond throughout the crossing.', atmos: { lamp_warm: true, lamp_bright: 0.04 }
});

// ── NOTES ─────────────────────────────────────────────────────
SOBORNOST.registerNote('cover_posting_requested', "You told Merky you requested this posting yourself.");
SOBORNOST.registerNote('cover_posting_assigned',  "You told Merky you were assigned — didn't ask.");
SOBORNOST.registerNote('cover_posting_escape',    "You told Merky you needed to leave where you were.");
SOBORNOST.registerNote('cover_posting_summoned',  "You told Merky someone asked for you specifically.");
SOBORNOST.registerNote('cover_bg_teacher',        "You've said you were a teacher before ordination.");
SOBORNOST.registerNote('cover_bg_medical',        "You've said you worked in medicine before ordination.");
SOBORNOST.registerNote('cover_bg_functionary',    "You've said you were a minor functionary before ordination.");
SOBORNOST.registerNote('cover_bg_scholar',        "You've said you were a scholar before ordination.");
SOBORNOST.registerNote('cover_denom_orthodox',    "You declared yourself Orthodox.");
SOBORNOST.registerNote('cover_denom_protestant',  "You declared Protestant — a useful blankness.");
SOBORNOST.registerNote('cover_denom_ecumenical',  `You said "ecumenical." They didn't press.`);
SOBORNOST.registerNote('cover_denom_catholic',    "You declared Catholic. Implications untraced.");
SOBORNOST.registerNote('charism_cover',           "CHARISM — Cover: your false self is load-bearing.");
SOBORNOST.registerNote('charism_suspicion',       "CHARISM — Suspicion: you feel when you're being watched.");
SOBORNOST.registerNote('charism_withholding',     "CHARISM — Withholding: present, unreadable.");
SOBORNOST.registerNote('charism_interruption',    "CHARISM — Interruption: you can stop things quietly.");
SOBORNOST.registerNote('charism_anamnesis',       "CHARISM — Anamnesis: you remember what you shouldn't.");
SOBORNOST.registerNote('charism_kenosis',         "CHARISM — Kenosis: you empty yourself; people confide.");
SOBORNOST.registerNote('charism_tathagatagarbha', "CHARISM — Tathāgatagarbha: you see the comrade in someone before they do.");
SOBORNOST.registerNote('charism_apophasis',       "CHARISM — Apophasis: you know what cannot be said.");
SOBORNOST.registerNote('icon_examined',           () => `The ${SOBORNOST.iconWord()}: Orthodox, old, worn to near-nothing. Writing on the back in a script you cannot name.`);
SOBORNOST.registerNote('icon_wrong_direction',    () => `The ${SOBORNOST.iconWord()} was facing the wrong direction. You are certain it was not, before.`);
SOBORNOST.registerNote('crossing_noted',          "You have been at sea for some time. You do not know how long.");
SOBORNOST.registerNote('saw_haircut',             "Haircut — on the railing. Long-haired, black. She completed her assessment. The answer was yes.");
SOBORNOST.registerNote('saw_haircut_window',      "A black cat on the railing through the corridor glass. She held a paw up. Then gone.");
SOBORNOST.registerNote('met_freezer_beef',        "Freezer Beef — small calico, comprehensive contentment. Asleep in the cargo hold.");
SOBORNOST.registerNote('met_pavel',               "You met Pavel. No last name. He was in the wrong place. He seemed to have been waiting.");
SOBORNOST.registerNote('met_vance',               "Vance Landstorm. Senior crew. Has been on this vessel since before you were ordained.");
SOBORNOST.registerNote('met_butterantonio',       "Craigslist Butterantonio. Maritime lawyer, semi-retired. Two pairs of glasses.");
SOBORNOST.registerNote('met_eider',               "Eider Swagstom. Ship's doctor. She knows when a crossing is different.");
SOBORNOST.registerNote('met_sinhola',             "Sinhola Shinola. Linguist. Dead languages and provenance documentation.");
SOBORNOST.registerNote('met_tim',                 "Tim Ezterhazh. He loaded the cargo. His hands know something now.");
SOBORNOST.registerNote('pavel_she_said',          `Pavel said: "She isn't wrong about you." He did not explain who "she" is.`);
SOBORNOST.registerNote('merky_introduced',        "Merky Crabbit. First mate. Wary of you, but not unkindly.");
SOBORNOST.registerNote('merky_warned_cargo',      "Merky said to stay out of cargo. Not quite a prohibition.");
SOBORNOST.registerNote('vespers_traditional',     "You held a service of lament. Composure rose among the officers.");
SOBORNOST.registerNote('vespers_liberationist',   "You held a liberationist service. The crew below deck heard themselves in it.");
SOBORNOST.registerNote('vespers_ambiguous',       "You held a service that could be read either way.");
SOBORNOST.registerNote('container_found',         "A sealed container in the lower hold. Warmer than the hold. The manifest number does not match.");
SOBORNOST.registerNote('container_opened',        "You opened the container. You know what is inside now.");
SOBORNOST.registerNote('container_release_known', "Tim described the secondary release mechanism. Rotation, then press.");
SOBORNOST.registerNote('mission_understood',      "You understand now. You were sent to authenticate a transfer. The icons should not go West.");
SOBORNOST.registerNote('knows_manifest_issue',    "The cargo manifest has a discrepancy.");
SOBORNOST.registerNote('found_the_room',          "There is a room between the hold and the lower level that does not appear on any map.");
SOBORNOST.registerNote('vance_told_you',          "Vance told you the container has been on this ship before. Under a different manifest number.");
SOBORNOST.registerNote('found_documents',         "Heritage Transfer Services. Your authentication role. A handwritten note: Confirm only. Do not investigate further.");
SOBORNOST.registerNote('crew_pastoral_intel',     "A crew member mentioned Pavel has been asking about the container. Not to anyone official.");
SOBORNOST.registerNote('had_sincere_moment',      "You told someone something true. The cover is slightly less complete. This is not a problem.");
SOBORNOST.registerNote('act2_nav_hint',           "Eider mentioned a crewman with burned hands — try the engine room. Sinhola is in Cabin 2. The container release mechanism is somewhere in cargo.");
SOBORNOST.registerNote('merky_cover_held',        "Your cover held. Merky accepted the explanation.");
SOBORNOST.registerNote('merky_watching',          "Merky is watching you. They did not accept the explanation.");
SOBORNOST.registerNote('merky_suspicious',        "Merky knows something is wrong. The cover has been questioned.");
SOBORNOST.registerNote('merky_respects_you',      "Merky respects the discipline. They did not press.");
SOBORNOST.registerNote('merky_trusts_partial',    "You told Merky something true. They noticed the difference.");

// ── ART ───────────────────────────────────────────────────────
SOBORNOST.registerArt('haircut', `...`); // (full ASCII as before, omitted for brevity)
SOBORNOST.registerArt('freezer_beef', `...`);
SOBORNOST.registerArt('pavel', `...`);

// ── GLOSSARY ─────────────────────────────────────────────────
SOBORNOST.registerGlossaryEntry('Icon (Ikon / Икон)', '...');
// ... all glossary entries unchanged

// ── STAT TIPS ────────────────────────────────────────────────
SOBORNOST.registerStatTip('vigilance', 'Vigilance — attention, pattern recognition.');
SOBORNOST.registerStatTip('composure', 'Composure — self-possession under pressure.');
SOBORNOST.registerStatTip('communion', 'Communion — openness, pastoral presence.');
SOBORNOST.registerStatTip('doubt', 'Doubt — theological uncertainty as a tool.');

// ── THEOSIS INTEGRATION ──────────────────────────────────────

// Disable witnessed mode for Spasibo
SOBORNOST.setAvailableModes(['attended','open']);

// Theosis tag values
SOBORNOST.registerTheosisTagValue('solidarity', 3);
SOBORNOST.registerTheosisTagValue('agape', 3);
SOBORNOST.registerTheosisTagValue('sacrifice', 2);
SOBORNOST.registerTheosisTagValue('communion', 2);
SOBORNOST.registerTheosisTagValue('confession', 2);
SOBORNOST.registerTheosisTagValue('witness', 2);
SOBORNOST.registerTheosisTagValue('kenosis', 1);
SOBORNOST.registerTheosisTagValue('contemplation', 1);
SOBORNOST.registerTheosisTagValue('silence', 1);
SOBORNOST.registerTheosisTagValue('doubt', -1);
// Note: 'vigilance' has no theosis effect (by design)

// Name mapping (Stacy removed – she does not appear)
SOBORNOST.registerNameMapping('Pavel', 'Pável', 'Павел', 'Павел');
SOBORNOST.registerNameMapping('Merky', 'Merký', 'Мерки', 'Мерки');
SOBORNOST.registerNameMapping('Vance', 'Vánce', 'Ванс', 'Ванс');
SOBORNOST.registerNameMapping('Craigslist', 'Craigslist', 'Крейгслист', 'Крейгслист');
SOBORNOST.registerNameMapping('Butterantonio', 'Butterántonio', 'Буттерантонио', 'Буттерантонио');
SOBORNOST.registerNameMapping('Eider', 'Éider', 'Эйдер', 'Эйдер');
SOBORNOST.registerNameMapping('Sinhola', 'Sínhola', 'Синхола', 'Синхола');
SOBORNOST.registerNameMapping('Tim', 'Tím', 'Тим', 'Тим');
SOBORNOST.registerNameMapping('Haircut', 'Háircut', 'Хейркат', 'Хейркат');
SOBORNOST.registerNameMapping('Freezer Beef', 'Freezér Beef', 'Фризер Биф', 'Фризер Биф');

// Override word functions to use theosis instead of playCount
SOBORNOST.setIconWordFunction(() => {
  const G = SOBORNOST.G;
  if (G.theosis >= 66) return 'Икон';
  if (G.theosis >= 33) return 'ikon';
  return 'icon';
});
SOBORNOST.setHarbourWordFunction(() => {
  const G = SOBORNOST.G;
  if (G.theosis >= 66) return 'Ленинград';
  if (G.theosis >= 33) return 'the Eastern port';
  return 'port';
});
SOBORNOST.setShipWordFunction(() => {
  const G = SOBORNOST.G;
  if (G.theosis >= 66) return 'the Соборность';
  if (G.theosis >= 33) return 'the Sobornost';
  return 'the ship';
});
SOBORNOST.setObjectDescriptionFunction(() => {
  const G = SOBORNOST.G;
  if (G.theosis >= 66) return 'a Torah scroll — very old, of the original two. Entrusted. From a different dispersed community, the same century of loss.';
  if (G.theosis >= 33) return 'an icon — very old, face worn to near-nothing. The gold is beginning to show through the dark.';
  return 'an icon — very old, face worn to near-nothing.';
});