// ═══════════════════════════════════════════════════════════
// SOBORNOST ENGINE v2.6 – Core Mechanics (FIXED & ENHANCED)
// Theosis milestones, memorial fixes, audio resume, full panels
// CHANGELOG v2.6:
// - Memorial panel displays properly (with fallback text)
// - Theosis milestones (33,66,100) set flags and show toasts
// - Audio context auto-resumes on first user click
// - Bottom navigation panels fully functional
// - Map & glossary show friendly empty messages
// - Theosis display in top bar (≥33) and status panel
// - Added `requires_theosis` support for choices
// - Cover meter shows numeric value (e.g., "3/5")
// - Fixed breviary suspend/release buttons (CSS note added)
// ═══════════════════════════════════════════════════════════

// ── ATMOSPHERE (canvas, functions) ──────────────────────────
let ENABLE_ATMOSPHERE = true;
let canvas, ctx;
if (ENABLE_ATMOSPHERE) {
  canvas = document.getElementById('atmos');
  ctx = canvas.getContext('2d');
} else {
  canvas = null; ctx = null;
}

let mood='neutral',targetMood='neutral',moodLerp=1,fogParts=[],rainDrops=[],T=0;
let atmosMods = { fogMult:1.0, lampWarm:0, lampFlicker:true, soboWarm:false, goldIntensity:0, goldGlow:false };
function resize(){ if(canvas){canvas.width=innerWidth;canvas.height=innerHeight;initRain();} }
resize();addEventListener('resize',resize);
function initFog(){if(!ENABLE_ATMOSPHERE)return;fogParts=[];for(let i=0;i<22;i++)fogParts.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:80+Math.random()*140,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.08,ph:Math.random()*Math.PI*2,base:.025+Math.random()*.05});}initFog();
function initRain(){if(!ENABLE_ATMOSPHERE)return;const p=porthole();rainDrops=[];for(let i=0;i<24;i++)rainDrops.push({x:p.x+(Math.random()-.5)*p.r*2,y:p.y+(Math.random()-.5)*p.r*2,len:5+Math.random()*9,spd:1.2+Math.random()*2});}
function porthole(){if(!ENABLE_ATMOSPHERE)return{x:0,y:0,r:0};const r=Math.min(canvas.width,canvas.height)*.085;return{x:canvas.width-r-28,y:r+28,r};}
const MOOD={neutral:[130,170,190,6,8,12],tense:[140,90,70,10,6,4],uncanny:[60,130,170,4,8,14],revelation:[200,190,140,12,14,10]};
function setMood(m){if(!m||m===targetMood)return;targetMood=m;moodLerp=0;_updateAudioMood();}
function lerpN(a,b,t){return a+(b-a)*t;}

function refreshAtmosMods(){
  if(!ENABLE_ATMOSPHERE)return;
  const s = G.soundings.settled;
  atmosMods.fogMult = s.includes('gnoti_seauton') ? 0.55 : 1.0;
  atmosMods.lampWarm = s.includes('magnificat') ? 0.08 : 0;
  atmosMods.lampFlicker = !s.includes('null_set');
  atmosMods.soboWarm = s.includes('sobornost');
  const theosis = G.theosis || 0;
  if (theosis >= 71) atmosMods.goldIntensity = 0.6;
  else if (theosis >= 33) atmosMods.goldIntensity = 0.2 + (theosis - 33) / 38 * 0.4;
  else atmosMods.goldIntensity = 0;
  atmosMods.goldGlow = atmosMods.goldIntensity > 0;
}

function drawAtmos(){
  if(!ENABLE_ATMOSPHERE) return;
  T+=.008;
  if(moodLerp<1){moodLerp=Math.min(1,moodLerp+.008);if(moodLerp>=1)mood=targetMood;}
  const cm=MOOD[mood]||MOOD.neutral,tm=MOOD[targetMood]||MOOD.neutral,t=moodLerp;
  const fr=lerpN(cm[0],tm[0],t),fg=lerpN(cm[1],tm[1],t),fb=lerpN(cm[2],tm[2],t);
  const br=lerpN(cm[3],tm[3],t),bg=lerpN(cm[4],tm[4],t),bb=lerpN(cm[5],tm[5],t);
  ctx.fillStyle=`rgb(${br|0},${bg|0},${bb|0})`;ctx.fillRect(0,0,canvas.width,canvas.height);
  const moodFog=mood==='tense'?2.5:(mood==='uncanny'?0.6:(mood==='revelation'?0.3:1));
  const effectiveFog=moodFog*atmosMods.fogMult;
  const goldIntensity = atmosMods.goldIntensity;
  if (goldIntensity > 0) {
    ctx.shadowColor = `rgba(212, 175, 55, ${goldIntensity * 0.8})`;
    ctx.shadowBlur = 12;
  } else {
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  }
  for(const p of fogParts){
    p.x+=p.vx;p.y+=p.vy;p.ph+=.004;
    if(p.x<-p.r)p.x=canvas.width+p.r;if(p.x>canvas.width+p.r)p.x=-p.r;
    if(p.y<-p.r)p.y=canvas.height+p.r;if(p.y>canvas.height+p.r)p.y=-p.r;
    const op=(p.base+Math.sin(p.ph)*.012)*effectiveFog;
    const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
    let rVal=fr, gVal=fg, bVal=fb;
    if (goldIntensity > 0) {
      rVal = lerpN(fr, 212, goldIntensity*0.5);
      gVal = lerpN(fg, 175, goldIntensity*0.5);
      bVal = lerpN(fb, 55, goldIntensity*0.3);
    }
    g.addColorStop(0,`rgba(${rVal|0},${gVal|0},${bVal|0},${op.toFixed(3)})`);
    g.addColorStop(1,`rgba(${rVal|0},${gVal|0},${bVal|0},0)`);
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
  }
  ctx.shadowColor = 'transparent';
  const lx=canvas.width*.12,ly=canvas.height*.08;
  const lg=ctx.createRadialGradient(lx,ly,0,lx,ly,Math.min(canvas.width,canvas.height)*.28);
  let li=0.09+Math.sin(T*.4)*.008;
  if(mood==='tense'&&atmosMods.lampFlicker)li+=Math.sin(T*4.5)*.03;
  if(mood==='revelation')li=.28;if(mood==='uncanny')li=.04;
  let lampR=176+Math.round(atmosMods.lampWarm*40),lampG=120-Math.round(atmosMods.lampWarm*20),lampB=40;
  if (goldIntensity > 0) {
    lampR = lerpN(lampR, 212, goldIntensity);
    lampG = lerpN(lampG, 175, goldIntensity);
    lampB = lerpN(lampB, 55, goldIntensity);
  }
  lg.addColorStop(0,`rgba(${lampR},${lampG},${lampB},${li.toFixed(3)})`);
  lg.addColorStop(1,`rgba(${lampR},${lampG},${lampB},0)`);
  ctx.fillStyle=lg;ctx.fillRect(0,0,canvas.width,canvas.height);
  drawPorthole();requestAnimationFrame(drawAtmos);
}

function drawPorthole(){
  if(!ENABLE_ATMOSPHERE)return;
  const{x,y,r}=porthole();
  ctx.strokeStyle='#1c2830';ctx.lineWidth=r*.18;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle='#243038';
  for(let i=0;i<8;i++){const a=(i/8)*Math.PI*2;ctx.beginPath();ctx.arc(x+Math.cos(a)*(r+r*.1),y+Math.sin(a)*(r+r*.1),r*.045,0,Math.PI*2);ctx.fill();}
  ctx.save();ctx.beginPath();ctx.arc(x,y,r*.87,0,Math.PI*2);ctx.clip();
  const sc=mood==='uncanny'?'#060e18':mood==='revelation'?'#202810':'#0e1820';
  const sg=ctx.createLinearGradient(x,y-r,x,y+r);sg.addColorStop(0,sc);sg.addColorStop(1,'#182430');
  ctx.fillStyle=sg;ctx.fillRect(x-r,y-r,r*2,r*2);
  const soboWarm = atmosMods.soboWarm;
  ctx.strokeStyle=`rgba(${soboWarm?80:60},${soboWarm?110:100},${soboWarm?120:130},${mood==='uncanny'?0.5:0.25})`;ctx.lineWidth=.8;
  for(let i=0;i<6;i++){const wy=y+r*.2+i*r*.12+Math.sin(T*.6+i*1.2)*2;ctx.beginPath();ctx.moveTo(x-r,wy);ctx.quadraticCurveTo(x,wy+Math.sin(T+i)*3,x+r,wy);ctx.stroke();}
  if(mood!=='uncanny'&&mood!=='revelation'){
    ctx.strokeStyle=`rgba(100,150,180,${mood==='tense'?0.35:0.18})`;ctx.lineWidth=.6;
    for(const d of rainDrops){d.y+=d.spd;if(d.y>y+r){d.y=y-r;d.x=x+(Math.random()-.5)*r*2;}ctx.beginPath();ctx.moveTo(d.x,d.y);ctx.lineTo(d.x-1,d.y+d.len);ctx.stroke();}
  }
  ctx.restore();ctx.strokeStyle='#2a3c48';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(x,y,r*.87,0,Math.PI*2);ctx.stroke();
}
if(ENABLE_ATMOSPHERE) drawAtmos();

// ── GLOBAL STATE ────────────────────────────────────────────
let G = {
  phase:'title',mode:'attended',
  stats:{vigilance:0,composure:0,communion:0,doubt:0},
  charisms:[],
  cover:{posting:null,background:null,denomination:null,connection:null,left:null},
  coverIntegrity:5,
  soundings:{available:[],taken:[],settled:[],released:[]},soundingPending:null,
  notes:[],flags:new Set(),
  scene:'chapel_waking',lastReaction:null,
  panelOpen:null,confirmRestart:false,tutorialDone:false,
  playCount:0,
  pastFlags:[],
  inventory: [],
  time: { day: 1, hour: 8, maxDays: 3 },
  reputation: {},
  quests: {},
  crossingLog:[],
  pendingRoll:null,
  rollResult:null,
  awareness: 0,
  _poaAbsorbedThisScene: false,
  _mortificationSpent: false,
  beliefs: new Set(),
  knowledge: new Set(),
  consequenceQueue: [],
  npcStance: {},
  eventQueue: [],
  pastLifeFlags: new Set(),
  _kenosisProgress: 0,
  liturgicalHour: 4,
  metaUnlocks: {},
  _idleTimer: null,
  _analyticsLog: [],
  companions: [],
  theosis: 0,
  _theosisFlashTimer: null,
  _coverFlash: false,
  _lastTheosisMilestone: 0
};

// ── LITURGICAL HOURS ────────────────────────────────────────
const LITURGICAL_HOURS = [
  { name: 'Lauds',   mood: 'neutral',    timeDesc: 'dawn' },
  { name: 'Prime',   mood: 'neutral',    timeDesc: 'early morning' },
  { name: 'Terce',   mood: 'neutral',    timeDesc: 'mid‑morning' },
  { name: 'Sext',    mood: 'tense',      timeDesc: 'noon' },
  { name: 'None',    mood: 'uncanny',    timeDesc: 'afternoon' },
  { name: 'Vespers', mood: 'revelation', timeDesc: 'evening' },
  { name: 'Compline',mood: 'uncanny',    timeDesc: 'night' }
];

function _getLiturgicalHourFromTime(hour) {
  if (hour >= 5 && hour < 7) return 0;
  if (hour >= 7 && hour < 9) return 1;
  if (hour >= 9 && hour < 11) return 2;
  if (hour >= 11 && hour < 13) return 3;
  if (hour >= 13 && hour < 17) return 4;
  if (hour >= 17 && hour < 20) return 5;
  return 6;
}

function _updateLiturgicalHour() {
  const newIdx = _getLiturgicalHourFromTime(G.time.hour);
  if (G.liturgicalHour !== newIdx) {
    G.liturgicalHour = newIdx;
    const lit = LITURGICAL_HOURS[G.liturgicalHour];
    if (lit) setMood(lit.mood);
  }
}

// ── THEOSIS SYSTEM with Milestones ──────────────────────────
let _theosisTiers = [
  { max: 32, word: "icon", wordPlural: "icons", cyrillic: null },
  { max: 65, word: "ikon", wordPlural: "ikons", cyrillic: null },
  { max: 100, word: "Икон", wordPlural: "Иконы", cyrillic: "Икон" }
];
function setTheosisTiers(tiers) { _theosisTiers = tiers; }
function getCurrentTier() {
  for (let i=0; i<_theosisTiers.length; i++) {
    if (G.theosis <= _theosisTiers[i].max) return _theosisTiers[i];
  }
  return _theosisTiers[_theosisTiers.length-1];
}
function iconWord(plural=false) {
  const tier = getCurrentTier();
  return plural ? tier.wordPlural : tier.word;
}
function harbourWord() { return iconWord(); }
function shipWord() { return iconWord(); }
function objectDescription() { return iconWord(); }

let _theosisTagValues = {
  "solidarity": 3, "agape": 3, "sacrifice": 2, "communion": 2,
  "kenosis": 1, "contemplation": 1, "silence": 1, "confession": 2,
  "witness": 2, "doubt": -1
};
function registerTheosisTagValue(tag, value) { _theosisTagValues[tag] = value; }

function _checkTheosisMilestones() {
  const milestones = [33, 66, 100];
  for (const m of milestones) {
    if (G.theosis >= m && G._lastTheosisMilestone < m) {
      G._lastTheosisMilestone = m;
      setFlag(`theosis_${m}`);
      showToast(`Theosis reaches ${m} — a threshold crossed.`, 'sounding');
      flashTheosisLight(0.8, 2500);
      if (m === 100) {
        unlockMeta('theosis_perfect');
        showToast('You have reached the fullness of theosis. The world sees differently now.', 'sounding');
      }
    }
  }
}

function incrementTheosis(amount) {
  if (amount === 0) return;
  G.theosis = Math.min(Math.max(G.theosis + amount, 0), 100);
  refreshAtmosMods();
  _checkTheosisMilestones();
  saveGame();
}
function flashTheosisLight(intensity=1.0, duration=2000) {
  if (!ENABLE_ATMOSPHERE) return;
  if (G._theosisFlashTimer) clearTimeout(G._theosisFlashTimer);
  const origIntensity = atmosMods.goldIntensity;
  atmosMods.goldIntensity = Math.max(atmosMods.goldIntensity, intensity * 0.9);
  atmosMods.goldGlow = true;
  render();
  G._theosisFlashTimer = setTimeout(() => {
    refreshAtmosMods();
    render();
    G._theosisFlashTimer = null;
  }, duration);
}

// ── NAME MAPPING API ────────────────────────────────────────
let _nameMappings = {};
function registerNameMapping(original, tier1, tier2, cyrillic) {
  _nameMappings[original] = { tier1, tier2, cyrillic };
}
function applyNameMapping(text) {
  if (!text) return text;
  const tier = getCurrentTier();
  let result = text;
  for (const [original, mapping] of Object.entries(_nameMappings)) {
    let replacement = original;
    if (tier.max <= 32) replacement = original;
    else if (tier.max <= 65) replacement = mapping.tier1 || original;
    else if (tier.max <= 100) replacement = mapping.tier2 || mapping.tier1 || original;
    if (mapping.cyrillic && tier.max >= 66) replacement = mapping.cyrillic;
    if (replacement !== original) {
      result = result.replace(new RegExp(original, 'g'), replacement);
    }
  }
  return result;
}

// ── REGISTRIES ──────────────────────────────────────────────
const _registries = {
  charisms: { sleeping: [], waking: [] },
  soundings: {},
  notes: {},
  art: {},
  glossary: [],
  statTips: {},
  iconWordFn: () => iconWord(),
  harbourWordFn: () => harbourWord(),
  shipWordFn: () => shipWord(),
  objectDescriptionFn: () => objectDescription(),
  rollModifiers: [],
  availableModes: ['attended','open','witnessed'],
  scenePools: {},
  rituals: {},
  translations: {},
  postEventShifts: [],
  pastLifeLines: {},
  sfxLibrary: {},
  mapNodes: {},
  items: {},
  scenes: {}
};

function registerCharisms(sleepingList, wakingList) {
  if (sleepingList) _registries.charisms.sleeping = sleepingList;
  if (wakingList) _registries.charisms.waking = wakingList;
}
function registerSounding(id, data) { _registries.soundings[id] = data; }
function registerNote(key, value) { _registries.notes[key] = value; }
function registerArt(id, ascii) { _registries.art[id] = ascii; }
function registerGlossaryEntry(term, def, options = {}) {
  _registries.glossary.push({ term, def, ...options });
}
function registerStatTip(stat, tip) { _registries.statTips[stat] = tip; }
function setIconWordFunction(fn) { _registries.iconWordFn = fn; }
function setHarbourWordFunction(fn) { _registries.harbourWordFn = fn; }
function setShipWordFunction(fn) { _registries.shipWordFn = fn; }
function setObjectDescriptionFunction(fn) { _registries.objectDescriptionFn = fn; }
function registerRollModifier(statKey, condition, bonusCallback) {
  _registries.rollModifiers.push({ statKey, condition, bonusCallback });
}
function setAvailableModes(modeArray) { _registries.availableModes = modeArray; }
function registerScenePool(poolId, entries) { _registries.scenePools[poolId] = entries; }
function addToScenePool(poolId, entry) {
  if (!_registries.scenePools[poolId]) _registries.scenePools[poolId] = [];
  _registries.scenePools[poolId].push(entry);
}
function registerRitual(ritual) { _registries.rituals[ritual.id] = ritual; }
function registerTranslation(original, translated) { _registries.translations[original] = translated; }
function registerPostEventShift(triggerFlag, patterns) { _registries.postEventShifts.push({ triggerFlag, patterns }); }
function registerPastLifeLine(sceneId, pattern, replacement, index) {
  if (!_registries.pastLifeLines[sceneId]) _registries.pastLifeLines[sceneId] = [];
  _registries.pastLifeLines[sceneId].push({ pattern, replacement, index });
}
function registerMapNode(nodeId, connections) { _registries.mapNodes[nodeId] = { connections, visited: false }; }
function registerSfx(name, playFunction) { _registries.sfxLibrary[name] = playFunction; }
function registerItem(id, data) { _registries.items[id] = data; }
function registerScenes(scenesObject) {
  if (!scenesObject) return;
  Object.assign(_registries.scenes, scenesObject);
}
function getScene(id) {
  if (id === '__new_play__') return null;
  return _registries.scenes[id] || (typeof SCENES !== 'undefined' && SCENES[id]);
}

// ── VALIDATION ──────────────────────────────────────────────
function validateContent() {
  const warnings = [];
  for (const [sceneId, scene] of Object.entries(_registries.scenes)) {
    if (!scene.choices) continue;
    for (let i=0; i<scene.choices.length; i++) {
      const ch = scene.choices[i];
      if (ch.next && ch.next !== '__new_play__' && !getScene(ch.next)) {
        warnings.push(`Scene "${sceneId}", choice ${i}: next scene "${ch.next}" not found.`);
      }
      if (ch.requires_charism) {
        const charism = allCharisms().find(c => c.id === ch.requires_charism);
        if (!charism) warnings.push(`Scene "${sceneId}", choice ${i}: requires charism "${ch.requires_charism}" not registered.`);
      }
      if (ch.requires_item && !_registries.items[ch.requires_item]) {
        warnings.push(`Scene "${sceneId}", choice ${i}: requires item "${ch.requires_item}" not registered.`);
      }
      if (ch.give_item && !_registries.items[ch.give_item]) {
        warnings.push(`Scene "${sceneId}", choice ${i}: gives item "${ch.give_item}" not registered.`);
      }
      if (ch.take_item && !_registries.items[ch.take_item]) {
        warnings.push(`Scene "${sceneId}", choice ${i}: takes item "${ch.take_item}" not registered.`);
      }
      if (ch.thought && !_registries.soundings[ch.thought]) {
        warnings.push(`Scene "${sceneId}", choice ${i}: offers sounding "${ch.thought}" not registered.`);
      }
    }
  }
  if (warnings.length) {
    console.warn("SOBORNOST Content Validation Warnings:\n" + warnings.join("\n"));
  } else {
    console.log("SOBORNOST content validation passed.");
  }
  return warnings;
}

function allCharisms() { return [..._registries.charisms.sleeping, ..._registries.charisms.waking]; }
function findCharism(id) { return allCharisms().find(c=>c.id===id); }
function noteLabel(k) {
  const n = _registries.notes[k];
  if (!n) return k;
  return typeof n === 'function' ? n() : n;
}

// ── PERSISTENCE ─────────────────────────────────────────────
const SAVE_KEY='spasibo_save',PLAY_KEY='spasibo_plays',FLAGS_KEY='spasibo_past_flags',ENDINGS_KEY='spasibo_endings',META_KEY='spasibo_meta',ANALYTICS_KEY='spasibo_analytics';

function saveGame(){
  try{
    localStorage.setItem(SAVE_KEY,JSON.stringify({
      stats:G.stats,charisms:G.charisms,soundings:G.soundings,
      cover:G.cover,coverIntegrity:G.coverIntegrity,notes:G.notes,
      flags:[...G.flags],scene:G.scene,mode:G.mode,
      lastReaction:G.lastReaction,tutorialDone:G.tutorialDone,crossingLog:G.crossingLog||[],
      inventory:G.inventory, time:G.time, reputation:G.reputation, quests:G.quests,
      awareness:G.awareness,
      beliefs:[...G.beliefs], knowledge:[...G.knowledge], consequenceQueue:G.consequenceQueue,
      npcStance:G.npcStance, eventQueue:G.eventQueue,
      pastLifeFlags:[...G.pastLifeFlags], _kenosisProgress:G._kenosisProgress,
      liturgicalHour:G.liturgicalHour, companions:G.companions,
      theosis:G.theosis, _lastTheosisMilestone:G._lastTheosisMilestone
    }));
    const el=document.querySelector('.save-indicator');
    if(el){el.style.display='block';el.style.animation='none';void el.offsetWidth;el.style.animation='save-flash 2.2s ease forwards';setTimeout(()=>{if(el)el.style.display='none';},2300);}
  }catch(e){console.warn('Save:',e);}
}
function loadGame(){
  try{
    const raw=localStorage.getItem(SAVE_KEY);if(!raw)return false;const s=JSON.parse(raw);
    G.stats=s.stats||G.stats;G.charisms=s.charisms||[];
    G.soundings=s.soundings||{available:[],taken:[],settled:[],released:[]};
    if(!G.soundings.released)G.soundings.released=[];
    G.cover=s.cover||G.cover;G.coverIntegrity=s.coverIntegrity!==undefined?s.coverIntegrity:3;
    G.notes=s.notes||[];G.flags=new Set(s.flags||[]);G.scene=s.scene||'chapel_waking';
    G.mode=s.mode||'attended';G.lastReaction=s.lastReaction||null;
    G.tutorialDone=s.tutorialDone||false;G.crossingLog=s.crossingLog||[];
    G.inventory = s.inventory || [];
    G.time = s.time || { day:1, hour:8, maxDays:3 };
    G.reputation = s.reputation || {};
    G.quests = s.quests || {};
    G.awareness = s.awareness !== undefined ? s.awareness : 0;
    G.beliefs = new Set(s.beliefs || []);
    G.knowledge = new Set(s.knowledge || []);
    G.consequenceQueue = s.consequenceQueue || [];
    G.npcStance = s.npcStance || {};
    G.eventQueue = s.eventQueue || [];
    G.pastLifeFlags = new Set(s.pastLifeFlags || []);
    G._kenosisProgress = s._kenosisProgress || 0;
    G.liturgicalHour = s.liturgicalHour !== undefined ? s.liturgicalHour : 4;
    G.companions = s.companions || [];
    G.theosis = s.theosis !== undefined ? s.theosis : 0;
    G._lastTheosisMilestone = s._lastTheosisMilestone || 0;
    G.phase='game';refreshAtmosMods();return true;
  }catch(e){console.warn('Load:',e);return false;}
}
function commitPlay(){
  G.playCount++;
  try{
    localStorage.setItem(PLAY_KEY,G.playCount.toString());
    const m=[...new Set([...G.pastFlags,...G.flags])];
    localStorage.setItem(FLAGS_KEY,JSON.stringify(m));G.pastFlags=m;
    const endingFlag=G.flags.has('visited_ending_facilitate')?'facilitate':G.flags.has('visited_ending_intercept')?'intercept':G.flags.has('visited_ending_witness')?'witness':null;
    if(endingFlag){try{const eh=JSON.parse(localStorage.getItem(ENDINGS_KEY)||'[]');if(!eh.find(e=>e.play===G.playCount&&e.ending===endingFlag))eh.push({play:G.playCount,ending:endingFlag,charisms:[...G.charisms]});localStorage.setItem(ENDINGS_KEY,JSON.stringify(eh));}catch(e){}}
  }catch(e){}
}

// ── META ACHIEVEMENTS, ANALYTICS ───────────────────────────
function loadMetaUnlocks() { try { const raw=localStorage.getItem(META_KEY); if(raw) G.metaUnlocks=JSON.parse(raw); else G.metaUnlocks={}; } catch(e) { G.metaUnlocks={}; } }
function saveMetaUnlocks() { try { localStorage.setItem(META_KEY, JSON.stringify(G.metaUnlocks)); } catch(e) {} }
function unlockMeta(id) { if(!G.metaUnlocks[id]) { G.metaUnlocks[id]=true; saveMetaUnlocks(); showToast(`Meta‑achievement unlocked: ${id}`,'note'); } }
function hasMeta(id) { return !!G.metaUnlocks[id]; }
function exportAnalytics() {
  const data = JSON.stringify(G._analyticsLog, null, 2);
  const blob = new Blob([data], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `analytics_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── COMPANIONS, SOUNDINGS ──────────────────────────────────
function addCompanion(id,data) { if(!G.companions.find(c=>c.id===id)) G.companions.push({id,...data}); saveGame(); }
function removeCompanion(id) { G.companions = G.companions.filter(c=>c.id!==id); saveGame(); }
function hasCompanion(id) { return G.companions.some(c=>c.id===id); }
function getCompanion(id) { return G.companions.find(c=>c.id===id); }
function modCompanionStat(id,stat,delta) { const comp = getCompanion(id); if(comp && comp.stats) { comp.stats[stat] = (comp.stats[stat]||0)+delta; } }
function setCompanionCharism(id,charismId) { const comp = getCompanion(id); if(comp) { if(!comp.charisms) comp.charisms=[]; if(!comp.charisms.includes(charismId)) comp.charisms.push(charismId); } }

function settleSounding(soundingId) {
  const idx = G.soundings.taken.findIndex(t=>t.id===soundingId);
  if(idx!==-1){
    G.soundings.taken.splice(idx,1);
    if(!G.soundings.settled.includes(soundingId)){
      G.soundings.settled.push(soundingId);
      const snd=_registries.soundings[soundingId];
      if(snd && snd.effect) applyEffect(snd.effect);
      showToast(`${snd.name} has settled.`,'sounding');
      refreshAtmosMods();
      saveGame();
    }
  }
}
function applySoundingProgress(soundingId,delta){
  const entry=G.soundings.taken.find(t=>t.id===soundingId);
  if(!entry) return;
  const old=entry.progress;
  entry.progress=Math.min(Math.max(entry.progress+delta,0),SOUNDING_THRESHOLD);
  if(entry.progress>=SOUNDING_THRESHOLD && old<SOUNDING_THRESHOLD) settleSounding(soundingId);
  if(delta!==0){ const snd=_registries.soundings[soundingId]; showToast(`${snd.name}: ${delta>0?'+'+delta:delta}`,'sounding'); }
  saveGame();
}
function applyAutoAlignment(tags){
  if(!tags||!tags.length) return;
  for(const entry of G.soundings.taken){
    const snd=_registries.soundings[entry.id];
    if(snd && snd.alignmentTags && snd.alignmentTags.some(tag=>tags.includes(tag))) applySoundingProgress(entry.id,1);
  }
}

const MAX_SOUNDINGS=4,SOUNDING_THRESHOLD=8;
function soundingSlotsFull(){return G.soundings.taken.length+G.soundings.settled.length>=MAX_SOUNDINGS;}
function offerSounding(id){ if(!id||!_registries.soundings[id])return; if(G.soundings.available.includes(id)||G.soundings.taken.some(t=>t.id===id)||G.soundings.settled.includes(id))return; G.soundings.available.push(id); showToast('Sounding: '+_registries.soundings[id].name,'sounding'); saveGame(); }
function takeSounding(id){
  if(G.soundings.taken.some(t=>t.id===id)||G.soundings.settled.includes(id))return;
  if(soundingSlotsFull()){ G.soundingPending=id; G.panelOpen='breviary'; render(); return; }
  G.soundings.available=G.soundings.available.filter(x=>x!==id);
  G.soundings.taken.push({id,progress:0}); G.soundingPending=null;
  showToast(_registries.soundings[id].name+': taking the sounding.','sounding');
  if(id==='kenosis_thought') updateKenosisProgress();
  saveGame();
  render();
}
function suspendSounding(id){
  const entry=G.soundings.taken.find(t=>t.id===id); if(!entry)return;
  G.soundings.taken=G.soundings.taken.filter(t=>t.id!==id);
  G.soundings.available.push(id);
  if(id==='kenosis_thought') updateKenosisProgress();
  saveGame();
  render();
}
function releaseSounding(id){
  G.soundings.taken=G.soundings.taken.filter(t=>t.id!==id);
  if(!G.soundings.released) G.soundings.released=[];
  if(!G.soundings.released.includes(id)) G.soundings.released.push(id);
  const pending=G.soundingPending; G.soundingPending=null;
  if(pending) setTimeout(()=>takeSounding(pending),50);
  else render();
  if(id==='kenosis_thought') updateKenosisProgress();
  saveGame();
}
function tickSoundings(){
  const settled=[];
  G.soundings.taken=G.soundings.taken.map(t=>{ const p=t.progress+1; if(p>=SOUNDING_THRESHOLD){settled.push(t.id); return null;} return{id:t.id,progress:p}; }).filter(Boolean);
  settled.forEach(id=>{ G.soundings.settled.push(id); const s=_registries.soundings[id]; if(s&&s.effect) applyEffect(s.effect); showToast(s.name+': settled.','sounding'); refreshAtmosMods(); });
  if(settled.includes('kenosis_thought') || G.soundings.taken.some(t=>t.id==='kenosis_thought')) updateKenosisProgress();
  if(settled.length) saveGame();
}
function soundingBar(p){ const f=Math.round((p/SOUNDING_THRESHOLD)*8); return '█'.repeat(f)+'░'.repeat(8-f); }
function updateKenosisProgress(){
  const settled=G.soundings.settled;
  if(settled.includes('kenosis_thought')) G._kenosisProgress=8;
  else { const entry=G.soundings.taken.find(t=>t.id==='kenosis_thought'); G._kenosisProgress=entry?entry.progress:0; }
}
function getKenosisOpacity(){
  if(!G.soundings.settled.includes('kenosis_thought') && !G.soundings.taken.some(t=>t.id==='kenosis_thought')) return 1;
  const progress=Math.min(G._kenosisProgress,8);
  return Math.max(0.4, 1-(progress/8));
}

// ── HELD EFFECTS ────────────────────────────────────────────
let _heldBonuses = {};
function recalculateHeldEffects() {
  for (const stat in _heldBonuses) G.stats[stat] = Math.max(0, G.stats[stat] - _heldBonuses[stat]);
  _heldBonuses = {};
  for (const itemId of G.inventory) {
    const item = _registries.items[itemId];
    if (item && item.effectWhileHeld) {
      for (const [stat, delta] of Object.entries(item.effectWhileHeld)) {
        _heldBonuses[stat] = (_heldBonuses[stat] || 0) + delta;
        G.stats[stat] = Math.max(0, G.stats[stat] + delta);
      }
    }
  }
  saveGame();
}
function hasItem(id) { return G.inventory.includes(id); }
function addItem(id) { if(!hasItem(id)) { G.inventory.push(id); recalculateHeldEffects(); } }
function removeItem(id) { G.inventory = G.inventory.filter(i=>i!==id); recalculateHeldEffects(); }

// ── RUMINATION ENGINE ───────────────────────────────────────
let _idleTimer = null;
function startIdleTimer() { if(_idleTimer) clearTimeout(_idleTimer); _idleTimer = setTimeout(() => { const scene = getScene(G.scene); if(scene && (!scene.choices || scene.choices.length===0) && !G.pendingRoll) { const doubt = G.stats.doubt||0; let rumination = ''; if(doubt>=4) rumination = 'What if I am not supposed to be here?'; else if(doubt>=2) rumination = 'The silence is heavy.'; else rumination = 'I wonder what time it is.'; showToast(rumination,'note'); } startIdleTimer(); }, 10000); }
function resetIdleTimer() { if(_idleTimer) clearTimeout(_idleTimer); startIdleTimer(); }

// ── COVER METER (numeric) ───────────────────────────────────
let _coverFlashTimer = null;
function flashCoverMeter() {
  G._coverFlash = true;
  if (_coverFlashTimer) clearTimeout(_coverFlashTimer);
  _coverFlashTimer = setTimeout(() => { G._coverFlash = false; render(); }, 300);
}
function renderCoverMeter() {
  const integrity = Math.min(G.coverIntegrity,5);
  const percent = (integrity/5)*100;
  let color='#90c060';
  if(integrity<=2) color='#c06060';
  else if(integrity<=5) color='#c0a060';
  const pulse = integrity<=2 ? ' pulsing' : '';
  const flashClass = G._coverFlash ? ' cover-flash' : '';
  return `<div class="cover-meter${pulse}${flashClass}" style="width:100%; background:#2a2018; border-radius:4px; margin-top:0.3rem;"><div style="width:${percent}%; background:${color}; height:6px; border-radius:4px;"></div></div><div style="font-size:0.7rem; text-align:right; margin-top:0.2rem;">${integrity}/5</div>`;
}
function calculateAlignment() {
  let anamnesisScore=0, kenosisScore=0;
  if(G.charisms.includes('anamnesis')) anamnesisScore+=2;
  if(G.charisms.includes('kenosis')) kenosisScore+=2;
  if(G.soundings.settled.includes('kenosis_thought')) kenosisScore+=3;
  if(G.soundings.settled.includes('gnoti_seauton')) anamnesisScore+=3;
  if(G.flags.has('trusted_continuous')) anamnesisScore++;
  if(G.flags.has('kenosis_garden')) kenosisScore++;
  const total=anamnesisScore+kenosisScore;
  if(total===0) return { direction:'??', anamnesis:0, kenosis:0 };
  const anamPct=anamnesisScore/total;
  let direction='';
  if(anamPct>0.66) direction='Anamnesis (memory)';
  else if(anamPct<0.34) direction='Kenosis (emptying)';
  else direction='Balanced';
  return { direction, anamnesis:anamnesisScore, kenosis:kenosisScore };
}
function renderAlignmentCompass() {
  const align = calculateAlignment();
  const width=20;
  const markerPos = Math.floor((align.anamnesis/(align.anamnesis+align.kenosis||1))*width);
  let compass='◄';
  for(let i=0;i<width;i++) compass+= i===markerPos ? '●' : '─';
  compass+='►';
  return `<div style="font-family:monospace; font-size:0.7rem; letter-spacing:1px;">${compass}</div><div style="font-size:0.7rem;">${align.direction}</div>`;
}
function markMapNodeVisited(nodeId) { if(_registries.mapNodes[nodeId]) _registries.mapNodes[nodeId].visited=true; }
function renderMapPanel() {
  if (Object.keys(_registries.mapNodes).length === 0) {
    return '<div style="font-size:0.8rem; color:var(--dim); padding:1rem; text-align:center;">No map data available. Register nodes with registerMapNode().</div>';
  }
  let ascii = '';
  for(const [nodeId,data] of Object.entries(_registries.mapNodes)){
    const marker = data.visited ? '◉' : '○';
    ascii += `${marker} ${nodeId}\n`;
    if(data.connections && data.connections.length) ascii += `  └─ connects to: ${data.connections.join(', ')}\n`;
  }
  return `<pre style="font-size:0.7rem; font-family:monospace;">${ascii}</pre>`;
}

// ── AUDIO (auto-resume) ────────────────────────────────────
let _audioCtx = null;
let _audioOn = false;
function initAudio() {
  if (_audioCtx) return;
  try {
    _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    _audioOn = true;
  } catch(e) { console.warn("Web Audio not supported", e); }
}
function resumeAudioOnFirstClick() {
  if (_audioCtx && _audioCtx.state === 'suspended') {
    _audioCtx.resume().then(() => { console.log("Audio resumed"); });
  }
}
document.body.addEventListener('click', resumeAudioOnFirstClick, { once: true });
function playSfx(name, volume=0.5) {
  const sfx = _registries.sfxLibrary[name];
  if (sfx) { sfx(volume); return; }
  if (!_audioCtx) initAudio();
  if (!_audioCtx || !_audioOn) return;
  const osc = _audioCtx.createOscillator();
  const gain = _audioCtx.createGain();
  osc.connect(gain);
  gain.connect(_audioCtx.destination);
  gain.gain.value = volume * 0.3;
  osc.frequency.value = 880;
  osc.type = 'sine';
  osc.start();
  gain.gain.exponentialRampToValueAtTime(0.00001, _audioCtx.currentTime + 0.5);
  osc.stop(_audioCtx.currentTime + 0.5);
}
function toggleAudio() {
  if (!_audioCtx) initAudio();
  if (_audioCtx) {
    if (_audioOn) {
      _audioCtx.suspend();
      _audioOn = false;
    } else {
      _audioCtx.resume();
      _audioOn = true;
    }
  } else {
    _audioOn = !_audioOn;
  }
  const btn = document.getElementById('audio-btn');
  if (btn) btn.textContent = _audioOn ? '♪ on' : '♪ off';
}
function _updateAudioMood() {}
function initBuiltinSfx() {}

// ── UTILITIES ───────────────────────────────────────────────
function hasFlag(f){return G.flags.has(f);}
function setFlag(f){if(f)G.flags.add(f); saveGame(); }
function addNote(key){ if(!key||G.notes.includes(key))return; G.notes.push(key); const l=noteLabel(key); showToast(l.length>52?l.slice(0,52)+'…':l,'note'); saveGame(); }
function applyEffect(e){ if(!e)return; for(const[k,v]of Object.entries(e)){ if(G.stats[k]!==undefined){ if(k==='composure' && v>0 && G.mode==='witnessed') continue; if(v<0 && G.charisms.includes('presence_of_absence') && !G._poaAbsorbedThisScene){ G._poaAbsorbedThisScene=true; showToast('—','note'); continue; } G.stats[k]=Math.max(0,G.stats[k]+v); } } saveGame(); }
function setCover(key,value){G.cover[key]=value;setFlag('cover_'+key+'_set'); saveGame();}
function showToast(msg,type){ const old=document.querySelector('.note-toast'); if(old)old.remove(); const t=document.createElement('div'); t.className='note-toast'+(type==='sounding'?' sounding-toast':''); t.textContent=msg; document.body.appendChild(t); setTimeout(()=>{if(t.parentNode)t.remove();},3200); }

function rollCover(difficulty){
  const roll = Math.floor(Math.random()*6) + Math.floor(Math.random()*6);
  const bonus = Math.floor(G.stats.composure/2);
  const total = roll + bonus;
  if(total >= difficulty) return 'success';
  if(total >= difficulty-2) return 'partial';
  return 'failure';
}

function degradeCover(amount){
  const prev = G.coverIntegrity;
  G.coverIntegrity = Math.max(0, G.coverIntegrity - amount);
  if (G.coverIntegrity !== prev) {
    flashCoverMeter();
    saveGame();
  }
  if(G.coverIntegrity<=0&&prev>0){ setFlag('cover_blown'); setFlag('cover_compromised'); showToast('Cover blown. Merky will confront you.','note'); }
  else if(G.coverIntegrity<=1&&prev>1){ showToast('Cover is thin — one more slip breaks it.','note'); }
  else if(G.coverIntegrity<=2&&prev>2){ showToast('Cover questioned — Kenosis harder to access.','note'); }
  else if(G.coverIntegrity<=3&&prev>3){ showToast('Cover is strained.','note'); }
}

function advanceTime(hours) {
  for (let i = 0; i < hours; i++) {
    G.time.hour++;
    if (G.time.hour >= 24) {
      G.time.hour = 0;
      G.time.day++;
    }
    tickSoundings();
  }
  if (G.time.day > G.time.maxDays) {  }
  _updateLiturgicalHour();
  processEventQueue();
  saveGame();
}
function modReputation(id,delta) { if(!G.reputation[id]) G.reputation[id]=0; G.reputation[id]+=delta; saveGame(); }
function getReputation(id) { return G.reputation[id]||0; }
function setReputation(id,val) { G.reputation[id]=val; saveGame(); }
function setQuestState(id,state) { G.quests[id]=state; saveGame(); }
function getQuestState(id) { return G.quests[id]||'inactive'; }
function isQuestActive(id) { return getQuestState(id)==='active'; }
function isQuestCompleted(id) { return getQuestState(id)==='completed'; }

// ── ROLL SYSTEM ─────────────────────────────────────────────
function performRoll(statKey, difficulty, options={}) {
  const baseStat = G.stats[statKey] || 1;
  let charismBonus=0, charismNote='', voidGazeUsed=false;
  for(const mod of _registries.rollModifiers){
    if(mod.condition(statKey, options, G)){
      const bonus=mod.bonusCallback(statKey, options, G);
      if(bonus!==0){ charismBonus+=bonus; charismNote+=`${mod.statKey}+${bonus} `; }
    }
  }
  let awareMod = options.awarenessBonus ? Math.floor((G.awareness||0)/2) : 0;
  let effectiveDiff = Math.max(difficulty - awareMod, 3);
  const tempBonus = options.tempBonus || 0;
  let d1,d2,rollSum;
  if(options.advantage){
    const r1a=Math.floor(Math.random()*6)+1, r1b=Math.floor(Math.random()*6)+1;
    const r2a=Math.floor(Math.random()*6)+1, r2b=Math.floor(Math.random()*6)+1;
    const sum1=r1a+r1b, sum2=r2a+r2b;
    if(sum1>=sum2){ d1=r1a; d2=r1b; rollSum=sum1; charismNote+='advantage '; }
    else { d1=r2a; d2=r2b; rollSum=sum2; charismNote+='advantage '; }
  } else { d1=Math.floor(Math.random()*6)+1; d2=Math.floor(Math.random()*6)+1; rollSum=d1+d2; }
  let total = rollSum + baseStat + charismBonus + tempBonus;
  let opposedResult = null;
  let outcome = 'failure';
  if(options.threshold && G.charisms.includes('void_gaze') && (G.awareness||0)>=3 && !options.advantage && !options.opposed){
    const d1b=Math.floor(Math.random()*6)+1, d2b=Math.floor(Math.random()*6)+1;
    const altTotal = d1b+d2b+baseStat+charismBonus;
    if(altTotal>total){ total=altTotal; charismNote+='void gaze '; voidGazeUsed=true; }
  }
  if(options.opposed){
    const oppStat = options.opposed.stat;
    const oppRoll = Math.floor(Math.random()*6)+1 + Math.floor(Math.random()*6)+1;
    const oppBonus = G.stats[oppStat] || 0;
    const oppTotal = oppRoll + oppBonus;
    opposedResult = { stat:oppStat, roll:oppRoll, bonus:oppBonus, total:oppTotal };
    if(total >= oppTotal) outcome='success';
    else outcome='failure';
  } else {
    if(total >= effectiveDiff) outcome='success';
    else if(total >= effectiveDiff-2) outcome='partial';
    else outcome='failure';
  }
  let crit=false;
  if(options.critical && !options.opposed){
    if(rollSum===12){ crit='success'; outcome='success'; charismNote+='CRIT! '; }
    else if(rollSum===2){ crit='failure'; outcome='failure'; charismNote+='FUMBLE! '; }
  }
  return { outcome, total, roll:rollSum, d1,d2, statValue:baseStat, charismBonus, charismNote:charismNote.trim(), difficulty:effectiveDiff, rawDifficulty:difficulty, awareMod, crit, opposed:opposedResult, tempBonus, voidGazeUsed };
}

// ── CONDITION EVALUATOR (supports requires_theosis) ─────────
function evaluateCondition(cond) {
  if (!cond) return true;
  if (Array.isArray(cond)) return cond.every(c => evaluateCondition(c));
  switch (cond.type) {
    case 'flag': return hasFlag(cond.id) === (cond.state !== false);
    case 'stat': return (G.stats[cond.name]||0) >= (cond.min||0);
    case 'charism': return G.charisms.includes(cond.id);
    case 'item': return hasItem(cond.id);
    case 'playcount': return G.playCount >= (cond.min||0);
    case 'awareness': return (G.awareness||0) >= (cond.min||0);
    case 'belief': return believes(cond.id);
    case 'knowledge': return knows(cond.id);
    case 'stance': return getStance(cond.npc, cond.key) >= (cond.min||0);
    case 'past_flag': return G.pastLifeFlags.has(cond.id);
    case 'liturgical_hour': return G.liturgicalHour === cond.hour;
    case 'companion': return hasCompanion(cond.id);
    case 'theosis': return G.theosis >= (cond.min||0);
    case 'or': return cond.conditions.some(c => evaluateCondition(c));
    case 'and': return cond.conditions.every(c => evaluateCondition(c));
    case 'not': return !evaluateCondition(cond.condition);
    default: return true;
  }
}

// ── CHOICE LOCK (includes requires_theosis) ─────────────────
function isChoiceLocked(ch) {
  if (ch.condition) return !evaluateCondition(ch.condition);
  if (ch.requires_theosis && G.theosis < ch.requires_theosis) return true;
  if (ch.requires_companion && !hasCompanion(ch.requires_companion)) return true;
  if (ch.requires_past_flag && !G.pastLifeFlags.has(ch.requires_past_flag)) return true;
  if (ch.requires_flag && !hasFlag(ch.requires_flag)) return true;
  if (ch.requires_stat){ const[s,m]=ch.requires_stat; if((G.stats[s]||0)<m) return true; }
  if (ch.requires_charism && !hasCharism(ch.requires_charism)) return true;
  if (ch.requires_playcount!==undefined && G.playCount<ch.requires_playcount) return true;
  if (ch.requires_charism==='kenosis' && G.coverIntegrity>=8) return true;
  if (ch.requires_item && !hasItem(ch.requires_item)) return true;
  if (ch.requires_time_from){ const[h]=ch.requires_time_from.split(':'); if(G.time.hour < h) return true; }
  if (ch.requires_reputation_min){ for(const[id,min] of Object.entries(ch.requires_reputation_min)) if(getReputation(id)<min) return true; }
  if (ch.requires_quest_state){ for(const[id,state] of Object.entries(ch.requires_quest_state)) if(getQuestState(id)!==state) return true; }
  if (ch.requires_belief && !believes(ch.requires_belief)) return true;
  if (ch.requires_knowledge && !knows(ch.requires_knowledge)) return true;
  return false;
}

// ── TEXT PROCESSING ────────────────────────────────────────
function getSceneText(scene) { return resolveTextBlock(scene.text); }
function resolveTextBlock(textBlock) { if(typeof textBlock==='function') textBlock=textBlock(G); if(typeof textBlock==='object' && !Array.isArray(textBlock)){ const awarenessLevel=G.awareness||0; let bestKey=0; for(const key in textBlock){ const k=parseInt(key); if(!isNaN(k) && k<=awarenessLevel && k>=bestKey) bestKey=k; } textBlock=textBlock[bestKey]||textBlock[0]||[]; } return Array.isArray(textBlock)?[...textBlock]:[textBlock]; }
function injectMicroLines(textArray, scene) { return textArray; }
function applyLinguisticToggle(text) { return text; }
function applyPostEventShifts(text) { return text; }
function applyPastLifeLines(textArray, sceneId) { return textArray; }
function injectGhostText(rawText,sceneId){ return rawText; }
function processText(raw){
  if(typeof raw === 'function') raw = raw(G);
  let result = raw.replace(/{ICON}/g, iconWord()).replace(/\u0421\u043f\u0430\u0441\u0438\u0431\u043e/g,'<span class="sp-cold">\u0421\u043f\u0430\u0441\u0438\u0431\u043e</span>');
  result = applyNameMapping(result);
  return result;
}

// ── SCENE POOLS, EVENT QUEUE, STANCE, RITUALS ──────────────
function navigateToPool(poolId) { console.warn('navigateToPool not implemented'); }
function scheduleEvent(event) { G.eventQueue.push(event); saveGame(); }
function processEventQueue() { }
function getStance(npcId, key) { if(!G.npcStance[npcId]) G.npcStance[npcId]={trust:0,suspicion:0,solidarity:0}; return G.npcStance[npcId][key]||0; }
function setStance(npcId, key, value) { if(!G.npcStance[npcId]) G.npcStance[npcId]={trust:0,suspicion:0,solidarity:0}; G.npcStance[npcId][key]=value; saveGame(); }
function modStance(npcId, key, delta) { const cur=getStance(npcId,key); setStance(npcId,key,cur+delta); if(delta!==0) showToast(`${npcId}: ${key} ${delta>0?'+'+delta:delta}`,'note'); }
let _activeRitual = null;
function startRitual(ritualId, startingScene, nextScene) { console.warn('startRitual not implemented'); return false; }
function ritualNextPhase() { console.warn('ritualNextPhase not implemented'); }
function getCurrentRitualPhase() { return null; }
function isRitualActive() { return false; }
function renderRitual(root) { console.warn('renderRitual not implemented'); }

// ── EPISTEMIC HELPERS ──────────────────────────────────────
function learn(flag) { G.knowledge.add(flag); G.beliefs.add(flag); saveGame(); }
function comeToBelieve(flag) { if(!G.knowledge.has(flag)) G.beliefs.add(flag); saveGame(); }
function contradict(flag) { G.beliefs.delete(flag); saveGame(); }
function knows(flag) { return G.knowledge.has(flag); }
function believes(flag) { return G.beliefs.has(flag); }
function pushConsequence(consequence) { G.consequenceQueue.push(consequence); saveGame(); }
function processConsequenceQueue() { }

// ── RENDER FUNCTIONS ───────────────────────────────────────
function render() {
  const root = document.getElementById('root'); if(!root) return;
  root.innerHTML = '';
  if (typeof IS_DEMO !== 'undefined' && IS_DEMO) {
    const b = document.createElement('div'); b.className = 'demo-banner';
    b.textContent = '⚓ DEMO — СПАСИБО — First Crossing Preview'; root.appendChild(b);
  }
  if (G.phase === 'title') renderTitle(root);
  else if (G.phase === 'mode') renderMode(root);
  else if (G.phase === 'charism') renderCharism(root);
  else if (G.phase === 'game') renderGame(root);
  else if (G.phase === 'memorial') renderMemorial(root);
}
function renderTitle(root) {
  setMood('neutral'); const replay = G.playCount > 0, hasSave = !!localStorage.getItem(SAVE_KEY), isDemo = typeof IS_DEMO !== 'undefined' && IS_DEMO;
  const d = document.createElement('div'); d.className = 'title-screen';
  let extra = '';
  if (hasMeta('ending_witness_unlocked')) extra += '<div style="font-size:0.7rem;color:var(--cold);">✦ Witness ending seen ✦</div>';
  if (hasMeta('charism_master')) extra += '<div style="font-size:0.7rem;color:var(--amber);">⚘ All charisms collected</div>';
  d.innerHTML = `<div class="title-cyrillic">СПАСИБО</div><div style="font-size:.72rem;color:var(--dim);letter-spacing:.3em;text-transform:uppercase;margin-bottom:.2rem">Spasibo</div><div style="font-size:.68rem;color:var(--amber-dim);letter-spacing:.18em;font-style:italic;margin-bottom:${isDemo ? '1.2' : '3.5'}rem">Thank You</div>${isDemo ? '<div style="font-size:.8rem;color:var(--amber);border:1px solid var(--amber-dim);padding:.5rem 1.2rem;margin-bottom:2.5rem;letter-spacing:.1em">DEMO VERSION — Act One Only</div>' : ''}<pre style="font-size:.62rem;color:var(--border-mid);white-space:pre;line-height:1.3;margin-bottom:3rem">\n            ___\n       ____/ | \\____\n  ~~~~|______________|~~~~\n    ~~~~~~~~~~~~~~~~~~~~~~~~~~</pre><div style="font-size:.78rem;color:${replay ? 'var(--cold-dim)' : 'var(--dim)'};letter-spacing:.12em;font-style:italic;margin-bottom:2rem">${replay ? 'another crossing.' : 'a crossing.'}</div><div style="display:flex;flex-direction:column;gap:.6rem;align-items:center">${hasSave ? `<button class="btn" onclick="continueGame()">Continue crossing</button><button class="btn btn-sm" onclick="G.phase='mode';render()">New crossing</button>` : `<button class="btn" onclick="G.phase='mode';render()">Begin the crossing</button>`}</div>${replay ? `<div style="margin-top:.8rem;font-size:.66rem;color:var(--dim);letter-spacing:.1em">crossing ${G.playCount + 1}</div>` : ''}<div style="margin-top:2.5rem;display:flex;gap:.8rem;justify-content:center"><button class="btn btn-sm" onclick="G.phase='memorial';render()" style="color:var(--cold-dim)">the memorial</button><button class="btn btn-sm" onclick="absoluteReset()" style="color:var(--border-mid);font-size:.6rem">reset all</button></div>${extra}`;
  root.appendChild(d);
}
function continueGame() { if (loadGame()) render(); else { G.phase = 'mode'; render(); } }
function absoluteReset() {
  if (!confirm('Reset all crossings to zero? This cannot be undone.')) return;
  try { localStorage.removeItem(SAVE_KEY); localStorage.removeItem(PLAY_KEY); localStorage.removeItem(FLAGS_KEY); } catch(e) {}
  G = {
    phase:'title',mode:'attended',stats:{vigilance:0,composure:0,communion:0,doubt:0},charisms:[],
    cover:{posting:null,background:null,denomination:null,connection:null,left:null},coverIntegrity:3,
    soundings:{available:[],taken:[],settled:[],released:[]},soundingPending:null,notes:[],flags:new Set(),
    scene:'chapel_waking',lastReaction:null,panelOpen:null,confirmRestart:false,tutorialDone:false,playCount:0,
    pastFlags:[],inventory:[],time:{day:1,hour:8,maxDays:3},reputation:{},quests:{},crossingLog:[],
    pendingRoll:null,rollResult:null,awareness:0,_poaAbsorbedThisScene:false,_mortificationSpent:false,
    beliefs:new Set(),knowledge:new Set(),consequenceQueue:[],npcStance:{},eventQueue:[],
    pastLifeFlags:new Set(),_kenosisProgress:0,liturgicalHour:4,metaUnlocks:{},_idleTimer:null,
    _analyticsLog:[],companions:[],theosis:0,_theosisFlashTimer:null,_coverFlash:false,_lastTheosisMilestone:0
  };
  render();
}
function renderMode(root){
  const d = document.createElement('div'); d.className='sel-screen';
  let modesHtml = '';
  _registries.availableModes.forEach(mode => {
    const chosen = G.mode === mode ? ' chosen' : '';
    let name='', desc='';
    if(mode==='attended') { name='First Crossing'; desc='Mechanics visible. Locked choices show their requirements.'; }
    else if(mode==='open') { name='Open Water'; desc='Less held. Locked choices are simply absent.'; }
    else if(mode==='witnessed') { name='Witnessed'; desc='Composure healing does not restore the stat. No retry rolls. Gains to composure have no effect.'; }
    modesHtml += `<div class="sel-opt${chosen}" onclick="G.mode='${mode}';render()"><div class="sel-name">${name}</div><div class="sel-desc">${desc}</div></div>`;
  });
  d.innerHTML = `<div class="sel-h">How will you cross?</div><div class="sel-sub">Can be changed on a new crossing.</div><div class="sel-grid">${modesHtml}</div><button class="btn" onclick="G.phase='charism';render()">Continue</button>`;
  root.appendChild(d);
}
function selCharism(id){ const showWaking=G.playCount>=2, max=showWaking?2:1; if(G.charisms.includes(id)){G.charisms=G.charisms.filter(x=>x!==id);} else if(G.charisms.length<max){G.charisms=[...G.charisms,id];} render(); }
function renderCharism(root){ const showWaking=G.playCount>=2, max=showWaking?2:1; const div=document.createElement('div');div.className='sel-screen'; let html=`<div class="sel-h">A charism.</div><div class="sel-sub">Not a skill. Something given — though it needs to be used to mean anything.${showWaking?`<br><span style="color:var(--cold);font-size:.8rem">Something new is available. Choose up to two.</span>`:''}</div><div class="sel-section">Sleeping</div>`; const sleeping=_registries.charisms.sleeping; const waking=_registries.charisms.waking; sleeping.forEach(c=>{html+=`<div class="sel-opt${G.charisms.includes(c.id)?' chosen-cold':''}" onclick="selCharism('${c.id}')"><div class="sel-name sel-name-cold">${c.name}</div><div class="sel-desc">${c.desc}</div></div>`;}); if(showWaking){ html+=`<div class="sel-section sel-section-cold">Waking</div>`; waking.forEach(c=>{html+=`<div class="sel-opt${G.charisms.includes(c.id)?' chosen-cold':''}" onclick="selCharism('${c.id}')"><div class="sel-name sel-name-cold">${c.name}</div><div class="sel-desc">${c.desc}</div></div>`;}); } html+=`<div style="font-size:.76rem;color:var(--dim);text-align:center;margin:.8rem 0">${G.charisms.length}/${max} chosen</div><button class="btn btn-cold" style="margin-top:.5rem" ${G.charisms.length===0?'disabled':''} onclick="beginGame()">Board the ship</button>`; div.innerHTML=html; root.appendChild(div); }
function beginGame(){
  if(!G.charisms.length)return;
  G.charisms.forEach(id=>addNote('charism_'+id));
  if(G.charisms.includes('kenosis'))offerSounding('kenosis_thought');
  if(G.charisms.includes('apophasis'))offerSounding('via_negativa');
  G.phase='game';
  G.scene='chapel_waking';
  refreshAtmosMods();
  render();
}
function renderTutorial(root){ const div=document.createElement('div');div.className='tutorial-overlay'; div.innerHTML=`<div class="tutorial-box"><div class="tutorial-h">Before you board</div><div class="tutorial-item"><strong>Status bar</strong> — top of screen. Four stats: Vigilance, Composure, Communion, Doubt. Hover each for details. They open and close choices.</div><div class="tutorial-item"><strong>The Breviary</strong> <span class="key">breviary</span> — centre bottom. Soundings are contemplations that surface through choices. Take them deliberately. They develop over time and settle into permanent effects. Four slots total.</div><div class="tutorial-item"><strong>Observations</strong> <span class="key">observations</span> — right bottom. Notes from what you have found and who you have met.</div><div class="tutorial-item"><strong>Status</strong> <span class="key">status</span> — left bottom. Your cover story, charisms, cover integrity, and crossing number.</div><div class="tutorial-item"><strong>Abandon crossing</strong> — at the bottom of each scene. Ends the current crossing.</div><button class="btn" style="margin-top:1.5rem;width:100%" onclick="dismissTutorial()">Board the ship</button></div>`; root.appendChild(div); }
function dismissTutorial(){ G.tutorialDone=true; saveGame(); render(); }

// ── PANEL FUNCTIONS (fully restored) ────────────────────────
function resolveLayeredText(scene) { return getSceneText(scene); }

function renderNotesPanel(root) {
  const p = document.createElement('div'); p.className = 'side-panel side-panel-r';
  const h = document.createElement('h3'); h.style.color = 'var(--amber)';
  h.innerHTML = '<button class="panel-close" onclick="openPanel(\'notes\')">✕</button>Observations'; p.appendChild(h);
  if (!G.notes.length) { const d = document.createElement('div'); d.className = 'panel-empty'; d.textContent = 'Nothing noted yet.'; p.appendChild(d); }
  else {
    const cats = [{label:'People',test:k=>k.startsWith('met_')},{label:'Cover',test:k=>k.startsWith('cover_')},{label:'Charisms',test:k=>k.startsWith('charism_')},{label:'Events',test:k=>!k.startsWith('met_')&&!k.startsWith('cover_')&&!k.startsWith('charism_')}];
    const shown = new Set();
    cats.forEach(cat => {
      const items = [...G.notes].reverse().filter(k => cat.test(k) && !shown.has(k));
      if (!items.length) return;
      const sec = document.createElement('div'); sec.className = 'panel-sec'; sec.textContent = cat.label; p.appendChild(sec);
      items.forEach(k => { shown.add(k); const d = document.createElement('div'); d.className = 'panel-item'; d.textContent = '• ' + noteLabel(k); p.appendChild(d); });
    });
  }
  root.appendChild(mkOverlay(() => openPanel('notes'))); root.appendChild(p);
}

function renderStatusPanel(root) {
  const p = document.createElement('div'); p.className = 'side-panel side-panel-l';
  const h = document.createElement('h3'); h.style.color = 'var(--cold)';
  h.innerHTML = '<button class="panel-close" onclick="openPanel(\'status\')">✕</button>Status'; p.appendChild(h);
  const addSec = t => { const s = document.createElement('div'); s.className = 'panel-sec'; s.textContent = t; p.appendChild(s); };
  const addRow = (a,b,bc) => { const r = document.createElement('div'); r.className = 'stat-row'; r.innerHTML = `<span class="stat-label">${a}</span><span style="color:${bc||'var(--bright)'};font-weight:bold;font-size:.86rem">${b}</span>`; p.appendChild(r); };
  addSec('Stats');
  Object.entries(G.stats).forEach(([k,v]) => addRow(k, v));
  if (G.theosis >= 33) addRow('theosis', G.theosis, 'var(--amber)');
  addSec('Charisms');
  if (!G.charisms.length) { const d = document.createElement('div'); d.className = 'panel-empty'; d.textContent = 'None.'; p.appendChild(d); }
  else G.charisms.forEach(id => { const c = findCharism(id); if (!c) return; const d = document.createElement('div'); d.className = 'panel-item'; d.innerHTML = '<strong style="color:var(--cold)">'+c.name+'</strong><br>'+c.desc; p.appendChild(d); });
  addSec('Cover');
  const intDesc = {5:'Full — all charisms available',4:'Good — no restrictions',3:'Intact — cover holding',2:'Questioned — Kenosis harder',1:'Thin — one slip breaks it',0:'Blown — Merky knows'};
  const intCol = G.coverIntegrity<=1?'var(--rust)':G.coverIntegrity<=2?'var(--amber-dim)':'var(--amber)';
  addRow('Cover integrity', intDesc[G.coverIntegrity] || G.coverIntegrity, intCol);
  p.innerHTML += renderCoverMeter();
  const cl = { posting:'Reason here', background:'Prior work', denomination:'Declared tradition', connection:'Claims to know', left:'Left behind' };
  const coverLabels = { posting_requested:'Requested posting', posting_assigned:'Assigned — no choice', posting_escape:'Needed to leave', posting_summoned:'Summoned by someone', bg_teacher:'Former teacher', bg_medical:'Medical background', bg_functionary:'Civil service', bg_scholar:'Long-term student', denom_orthodox:'Orthodox', denom_protestant:'Protestant', denom_ecumenical:'Ecumenical', denom_catholic:'Catholic' };
  Object.entries(G.cover).forEach(([k, v]) => { const val = v ? (coverLabels[v] || v.replace(/_/g,' ')) : '—'; addRow(cl[k]||k, val, v?'var(--amber)':'var(--dim)'); });
  addSec('Crossing'); addRow('number', G.playCount+1);
  if (G.crossingLog && G.crossingLog.length) {
    addSec('Recent Decisions');
    G.crossingLog.slice(0,5).forEach(entry => {
      const d = document.createElement('div'); d.className = 'panel-item'; d.style.cssText = 'font-size:.76rem;padding-left:.5rem;border-left:2px solid var(--border-mid);margin-bottom:.3rem;';
      d.textContent = '◦ ' + entry; p.appendChild(d);
    });
  }
  root.appendChild(mkOverlay(() => openPanel('status'))); root.appendChild(p);
}

function renderBreviaryPanel(root) {
  const p = document.createElement('div'); p.className = 'side-panel side-panel-c';
  const taken = G.soundings.taken.length, settled = G.soundings.settled.length, total = taken + settled;
  const h = document.createElement('h3'); h.style.color = 'var(--thought)';
  h.innerHTML = `<button class="panel-close" onclick="G.soundingPending=null;openPanel('breviary')">✕</button>The Breviary <span class="breviary-count">${total}/${MAX_SOUNDINGS} soundings taken</span>`;
  p.appendChild(h);
  if (G.soundingPending) { const pd = _registries.soundings[G.soundingPending]; const warn = document.createElement('div'); warn.className = 'breviary-warn'; warn.textContent = 'Breviary full. To take "'+pd.name+'", suspend or release a sounding below.'; p.appendChild(warn); }
  if (G.soundings.available.length) {
    const s = document.createElement('div'); s.className = 'panel-sec'; s.textContent = 'Available — not yet taken'; p.appendChild(s);
    G.soundings.available.forEach(id => {
      const snd = _registries.soundings[id]; if (!snd) return;
      const card = document.createElement('div'); card.className = 'sounding-card';
      const effectStr = snd.effect ? Object.entries(snd.effect).map(([k,v]) => (v>0?'+':'')+v+' '+k).join(', ') : '';
      card.innerHTML = '<div class="sounding-name">'+snd.name+'</div><div class="sounding-fragment">'+snd.fragment+'</div><div class="sounding-origin">'+snd.origin+'</div><div class="sounding-body">'+processText(snd.taking)+'</div>'+(effectStr?'<div class="sounding-preview">When settled: '+effectStr+'</div>':'');
      const full = soundingSlotsFull() && !G.soundingPending;
      const btn = document.createElement('button'); btn.className = 'sounding-btn sounding-btn-take'; btn.textContent = full ? 'Breviary full — suspend or release first' : 'Take this sounding'; btn.disabled = full;
      if (!full) btn.onclick = () => takeSounding(id);
      card.appendChild(btn); p.appendChild(card);
    });
  }
  if (G.soundings.taken.length) {
    const s = document.createElement('div'); s.className = 'panel-sec'; s.textContent = 'Taking — in progress'; p.appendChild(s);
    G.soundings.taken.forEach(({id,progress}) => {
      const snd = _registries.soundings[id]; if (!snd) return;
      const card = document.createElement('div'); card.className = 'sounding-card';
      card.innerHTML = '<div class="sounding-name">'+snd.name+'</div><div class="sounding-progress">'+soundingBar(progress)+' '+progress+'/'+SOUNDING_THRESHOLD+'</div><div class="sounding-body">'+processText(snd.taking)+'</div>';
      const btns = document.createElement('div'); btns.style.cssText = 'display:flex;gap:.4rem;margin-top:.5rem;';
      const susp = document.createElement('button'); susp.className = 'sounding-btn sounding-btn-suspend'; susp.textContent = 'Suspend'; susp.onclick = () => suspendSounding(id); btns.appendChild(susp);
      const rel = document.createElement('button'); rel.className = 'sounding-btn sounding-btn-release'; rel.textContent = 'Release (permanent)'; rel.onclick = () => { if(confirm('Release "'+snd.name+'"?\nThis sounding will be lost permanently.')) releaseSounding(id); }; btns.appendChild(rel);
      card.appendChild(btns); p.appendChild(card);
    });
  }
  if (G.soundings.settled.length) {
    const s = document.createElement('div'); s.className = 'panel-sec'; s.textContent = 'Settled'; p.appendChild(s);
    G.soundings.settled.forEach(id => {
      const snd = _registries.soundings[id]; if (!snd) return;
      const card = document.createElement('div'); card.className = 'sounding-card sounding-settled';
      card.innerHTML = '<div class="sounding-name">'+snd.name+' ●</div><div class="sounding-body">'+processText(snd.settled)+'</div><div class="sounding-effect">'+snd.effect_desc+'</div>';
      p.appendChild(card);
    });
  }
  if (G.soundings.released && G.soundings.released.length) {
    const s = document.createElement('div'); s.className = 'panel-sec'; s.style.color = 'var(--dim)'; s.textContent = 'Released — given up'; p.appendChild(s);
    G.soundings.released.forEach(id => {
      const snd = _registries.soundings[id]; if (!snd) return;
      const card = document.createElement('div'); card.className = 'sounding-card sounding-ghost';
      card.innerHTML = '<div class="sounding-name sounding-ghost-name">'+snd.name+' ◌</div><div class="sounding-fragment sounding-ghost-frag">'+snd.fragment+'</div><div class="sounding-body sounding-ghost-body">'+processText(snd.taking)+'</div><div style="font-size:.72rem;color:var(--dim);font-style:italic;margin-top:.4rem">Released — this contemplation was set down. It cannot be taken again.</div>';
      p.appendChild(card);
    });
  }
  if (!total && !G.soundings.available.length) { const d = document.createElement('div'); d.className = 'panel-empty'; d.textContent = 'No soundings yet. They surface through choices — and must be deliberately taken.'; p.appendChild(d); }
  root.appendChild(mkOverlay(() => { G.soundingPending = null; openPanel('breviary'); })); root.appendChild(p);
}

function renderGlossaryPanel(root) {
  const p = document.createElement('div'); p.className = 'side-panel side-panel-r'; p.style.width = 'min(420px,94vw)';
  const h = document.createElement('h3'); h.style.color = 'var(--cold)';
  h.innerHTML = '<button class="panel-close" onclick="openPanel(\'glossary\')">✕</button>Glossary'; p.appendChild(h);
  const currentWord = iconWord();
  const dynamicWords = ['icon', 'ikon', 'Икон'];
  let hasDynamic = false;
  const visibleEntries = _registries.glossary.filter(entry => {
    if (entry.requires_theosis && G.theosis < entry.requires_theosis) return false;
    return true;
  });
  if (visibleEntries.length === 0 && !dynamicWords.includes(currentWord)) {
    const d = document.createElement('div'); d.className = 'panel-empty';
    d.textContent = 'No glossary entries available yet. Some may appear as you progress.';
    p.appendChild(d);
  } else {
    if (dynamicWords.includes(currentWord)) {
      const def = `A sacred ${currentWord}, a window into the divine. The word itself changes as your understanding deepens.`;
      const d = document.createElement('div'); d.style.marginBottom = '1.1rem';
      d.innerHTML = `<div style="font-size:.84rem;color:var(--amber);margin-bottom:.25rem;font-family:'Special Elite',serif">${currentWord}</div><div style="font-size:.8rem;color:var(--text);line-height:1.72">${def}</div>`;
      p.appendChild(d);
      hasDynamic = true;
    }
    visibleEntries.forEach(({term, def}) => {
      if (dynamicWords.includes(term) && term === currentWord && hasDynamic) return;
      const d = document.createElement('div'); d.style.marginBottom = '1.1rem';
      d.innerHTML = `<div style="font-size:.84rem;color:var(--amber);margin-bottom:.25rem;font-family:'Special Elite',serif">${term}</div><div style="font-size:.8rem;color:var(--text);line-height:1.72">${def}</div>`;
      p.appendChild(d);
    });
  }
  root.appendChild(mkOverlay(() => openPanel('glossary'))); root.appendChild(p);
}

function renderMapPanelSide(root) {
  const p = document.createElement('div'); p.className = 'side-panel side-panel-r';
  const h = document.createElement('h3'); h.style.color = 'var(--amber)';
  h.innerHTML = '<button class="panel-close" onclick="openPanel(\'map\')">✕</button>Map'; p.appendChild(h);
  p.innerHTML += renderMapPanel();
  root.appendChild(mkOverlay(() => openPanel('map'))); root.appendChild(p);
}

function renderMemorial(root) {
  try {
    const endings = JSON.parse(localStorage.getItem(ENDINGS_KEY) || '[]');
    const plays = parseInt(localStorage.getItem(PLAY_KEY) || '0');
    const endingNames = { intercept:'Intercept — authentication signed', facilitate:'Facilitate — return enabled', witness:'Witness — delay created' };
    const align = calculateAlignment();
    const compassHtml = renderAlignmentCompass();
    const exportBtn = `<button class="btn" onclick="window.SOBORNOST.exportAnalytics()" style="margin-top:1rem;">Export Analytics</button>`;
    const div = document.createElement('div'); div.className = 'sel-screen'; div.style.animation = 'fi .4s ease';
    let html = '<div class="sel-h" style="color:var(--cold)">The Memorial</div>';
    html += `<div style="font-size:.82rem;color:var(--dim);text-align:center;margin-bottom:2rem;font-style:italic">Crossings completed: ${plays}</div>`;
    html += `<div style="margin:1rem 0;text-align:center;">${compassHtml}</div>`;
    if (!endings.length) {
      html += '<div style="font-size:.84rem;color:var(--dim);text-align:center;font-style:italic;margin-bottom:2rem">No endings recorded yet. Complete a crossing to see its echo here.</div>';
    } else {
      html += '<div class="panel-sec" style="text-align:center">Endings reached</div>';
      const seen = new Set();
      endings.forEach(e => { if (!seen.has(e.ending)) { seen.add(e.ending); html += `<div style="border:1px solid var(--border-mid);padding:.8rem 1rem;margin-bottom:.6rem;background:rgba(10,14,20,0.5)"><div style="font-size:.88rem;color:var(--cold);margin-bottom:.3rem">${endingNames[e.ending]||e.ending}</div><div style="font-size:.74rem;color:var(--dim)">First reached: crossing ${e.play + 1}${e.charisms && e.charisms.length ? ' · charism: ' + e.charisms.join(', ') : ''}</div></div>`; } });
      const endingSet = new Set(endings.map(e => e.ending));
      const missing = ['intercept','facilitate','witness'].filter(e => !endingSet.has(e));
      if (missing.length) { html += '<div style="font-size:.76rem;color:var(--border-mid);font-style:italic;margin-top:.5rem">'; missing.forEach(e => { html += `<div>— ${endingNames[e]} (not yet reached)</div>`; }); html += '</div>'; }
    }
    html += `<div style="margin-top:1.5rem;text-align:center">${exportBtn}</div>`;
    html += '<button class="btn btn-sm" style="margin-top:2rem;display:block" onclick="returnToTitle()">Return</button>';
    div.innerHTML = html; root.appendChild(div);
  } catch(e) { 
    const errDiv = document.createElement('div'); errDiv.className = 'sel-screen';
    errDiv.innerHTML = `<p style="padding:2rem;color:var(--rust);text-align:center">Memorial error: ${e.message}<br><button class="btn" onclick="returnToTitle()">Return</button></p>`;
    root.appendChild(errDiv);
  }
}

function returnToTitle(){ G.phase='title'; render(); }
function openPanel(w) { G.panelOpen = G.panelOpen === w ? null : w; render(); }
function mkOverlay(fn) { const o = document.createElement('div'); o.className = 'overlay-bg'; o.onclick = fn; return o; }

function startRoll(choice) {
  if (!choice.roll) return;
  const rollConfig = choice.roll;
  const result = performRoll(rollConfig.stat, rollConfig.difficulty, rollConfig.options || {});
  G.pendingRoll = {
    choice: choice,
    result: result,
    onSuccess: rollConfig.onSuccess,
    onPartial: rollConfig.onPartial,
    onFailure: rollConfig.onFailure
  };
  G.rollResult = result;
  render();
}

function renderRollBox(root) {
  if (!G.pendingRoll || !G.rollResult) {
    G.pendingRoll = null;
    G.rollResult = null;
    render();
    return;
  }
  const r = G.rollResult;
  const pending = G.pendingRoll;
  const outcome = r.outcome;
  const outcomeText = outcome === 'success' ? '✓ Success' : (outcome === 'partial' ? '◔ Partial' : '✗ Failure');
  
  const div = document.createElement('div');
  div.className = 'roll-overlay';
  div.innerHTML = `
    <div class="roll-box">
      <div class="roll-dice">🎲 ${r.d1} + ${r.d2} = ${r.roll}</div>
      <div class="roll-stat">+ ${r.statValue} (${pending.choice.roll.stat})</div>
      ${r.charismBonus ? `<div class="roll-bonus">+ ${r.charismBonus} (${r.charismNote})</div>` : ''}
      <div class="roll-total">Total: ${r.total}</div>
      <div class="roll-outcome ${outcome}">${outcomeText}</div>
      <button class="btn roll-continue">Continue</button>
    </div>
  `;
  const btn = div.querySelector('.roll-continue');
  btn.onclick = () => {
    let nextScene = null;
    if (outcome === 'success' && pending.onSuccess) nextScene = pending.onSuccess;
    else if (outcome === 'partial' && pending.onPartial) nextScene = pending.onPartial;
    else if (outcome === 'failure' && pending.onFailure) nextScene = pending.onFailure;
    
    if (pending.choice.effect) applyEffect(pending.choice.effect);
    if (pending.choice.set_flag) setFlag(pending.choice.set_flag);
    if (pending.choice.set_note) addNote(pending.choice.set_note);
    if (pending.choice.thought) offerSounding(pending.choice.thought);
    if (pending.choice.give_item) addItem(pending.choice.give_item);
    if (pending.choice.take_item) removeItem(pending.choice.take_item);
    if (pending.choice.advance_time) advanceTime(pending.choice.advance_time);
    
    G.pendingRoll = null;
    G.rollResult = null;
    if (nextScene === '__new_play__') {
      newPlay();
    } else if (nextScene) {
      navigate(nextScene);
    } else {
      render();
    }
  };
  root.appendChild(div);
}

function navigate(id) {
  if (id === '__new_play__') {
    newPlay();
    return;
  }
  G.scene = id;
  markMapNodeVisited(id);
  G._poaAbsorbedThisScene = false;
  G._mortificationSpent = false;
  tickSoundings();
  window.scrollTo(0, 0);
  render();
}

function newPlay() {
  commitPlay();   // increments G.playCount
  G.stats = { vigilance: 0, composure: 0, communion: 0, doubt: 0 };
  G.charisms = [];
  G.cover = { posting: null, background: null, denomination: null, connection: null, left: null };
  G.coverIntegrity = 5;
  G.soundings = { available: [], taken: [], settled: [], released: [] };
  G.soundingPending = null;
  G.notes = [];
  G.flags = new Set();
  G.scene = 'chapel_waking';
  G.lastReaction = null;
  G.panelOpen = null;
  G.confirmRestart = false;
  G.tutorialDone = false;
  G.pastFlags = [];
  G.inventory = [];
  G.time = { day: 1, hour: 8, maxDays: 3 };
  G.reputation = {};
  G.quests = {};
  G.crossingLog = [];
  G.pendingRoll = null;
  G.rollResult = null;
  G.awareness = 0;
  G._poaAbsorbedThisScene = false;
  G._mortificationSpent = false;
  G.beliefs = new Set();
  G.knowledge = new Set();
  G.consequenceQueue = [];
  G.npcStance = {};
  G.eventQueue = [];
  G.pastLifeFlags = new Set();
  G._kenosisProgress = 0;
  G.liturgicalHour = 4;
  G.companions = [];
  G.phase = 'charism';
  refreshAtmosMods();
  render();
}
function doRestart() { absoluteReset(); }

function applyChoice(ch) {
  if (ch.tags && Array.isArray(ch.tags)) {
    let total = 0;
    for (const tag of ch.tags) total += _theosisTagValues[tag] || 0;
    if (total !== 0) incrementTheosis(total);
  }
  if (ch.theosis) incrementTheosis(ch.theosis);
  if (ch.theosisFlash) {
    const intensity = typeof ch.theosisFlash === 'number' ? ch.theosisFlash : 1.0;
    const duration = ch.theosisFlashDuration || 2000;
    flashTheosisLight(intensity, duration);
  }
  applyEffect(ch.effect);
  if (ch.set_flag) setFlag(ch.set_flag);
  if (ch.set_note) addNote(ch.set_note);
  if (ch.thought) offerSounding(ch.thought);
  if (ch.give_item) addItem(ch.give_item);
  if (ch.take_item) removeItem(ch.take_item);
  if (ch.advance_time) advanceTime(ch.advance_time);
  saveGame();
  if (ch.next === '__new_play__') {
    newPlay();
    return;
  }
  if (ch.next) navigate(ch.next);
}

function hasCharism(id) { return G.charisms.includes(id); }

// ── RENDER GAME (full version) ─────────────────────────────
function renderGame(root){
  if(!G.tutorialDone && G.scene==='chapel_waking'){ renderTutorial(root); return; }
  if(G.rollResult && G.pendingRoll){ renderRollBox(root); return; }
  if(isRitualActive()){ renderRitual(root); return; }
  processConsequenceQueue();
  resetIdleTimer();
  if(hasFlag('cover_compromised')&&!hasFlag('cover_blown')&&G.scene==='corridor_first'){
    if(!getScene('merky_confrontation')){ console.warn("Missing scene: merky_confrontation"); G.flags.delete('cover_compromised'); showToast("Cover issue – scene missing.","note"); }
    else{ G.scene='merky_confrontation'; }
  }
  const scene=getScene(G.scene);
  if(!scene){
    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'error-fallback';
    fallbackDiv.innerHTML = `
      <div style="padding:2rem;text-align:center;">
        <p style="color:var(--rust);margin-bottom:1rem;">⚠ Scene not found: "${G.scene}"</p>
        <p>This may be due to incomplete content or a corrupted save.</p>
        <div style="margin-top:1rem;display:flex;gap:1rem;justify-content:center;">
          <button class="btn" onclick="returnToTitle()">Return to title</button>
          <button class="btn" onclick="absoluteReset()">Reset all data</button>
        </div>
      </div>
    `;
    root.appendChild(fallbackDiv);
    return;
  }
  const liturgical = LITURGICAL_HOURS[G.liturgicalHour];
  if(liturgical) setMood(liturgical.mood);
  else setMood(scene.mood||'neutral');
  const visitKey='visited_'+G.scene, isFirstVisit=!hasFlag(visitKey);
  if(isFirstVisit){ setFlag(visitKey); if(scene.on_enter){ if(scene.on_enter.note)addNote(scene.on_enter.note); if(scene.on_enter.flag)setFlag(scene.on_enter.flag); if(scene.on_enter.thought)offerSounding(scene.on_enter.thought); } }
  const wrap=document.createElement('div'); wrap.className='game';
  const kenosisOpacity = getKenosisOpacity();
  if(kenosisOpacity<1) wrap.style.opacity=kenosisOpacity;
  const hdr=document.createElement('div'); hdr.className='game-header';
  const si=document.createElement('div'); si.className='save-indicator'; si.textContent='◦ autosaved'; si.style.display='none'; hdr.appendChild(si);
  const moodCls=scene.mood==='uncanny'?' uncanny':scene.mood==='revelation'?' revelation':'';
  const lb=document.createElement('div'); lb.className='location-bar'+moodCls; lb.textContent=scene.location; hdr.appendChild(lb);
  const sb=document.createElement('div'); sb.className='sbar';
  Object.entries(G.stats).forEach(([k,v])=>{ const d=document.createElement('div'); d.className='stat'; d.innerHTML=k+' <span class="stat-val">'+v+'</span>'+(STAT_TIPS[k]?'<span class="stat-tip">'+STAT_TIPS[k]+'</span>':''); sb.appendChild(d); });
  if (G.theosis >= 33) {
    const theosisDiv = document.createElement('div'); theosisDiv.className='stat theosis-stat';
    theosisDiv.innerHTML = 'theosis <span class="stat-val">'+G.theosis+'</span><span class="stat-tip">Union with divine</span>';
    sb.appendChild(theosisDiv);
  }
  hdr.appendChild(sb);
  const tags=[];
  G.charisms.forEach(id=>{const c=findCharism(id);if(c)tags.push(`<span class="ctag" title="${c.desc}">${c.name}</span>`);});
  const cc=Object.values(G.cover).filter(Boolean).length; if(cc>0)tags.push('<span class="cover-tag">cover '+cc+'/5</span>');
  if(G.coverIntegrity<3){ const ci=G.coverIntegrity===0?'blown':G.coverIntegrity===1?'thin':'questioned'; tags.push(`<span class="cover-tag" style="border-color:var(--rust);color:var(--rust)">cover ${ci}</span>`); }
  const tc=G.soundings.taken.length+G.soundings.settled.length, ta=G.soundings.available.length;
  if(tc>0||ta>0)tags.push(`<span class="breviary-tag" title="${tc} taken or settled. ${ta} waiting. Open Breviary to manage.">⚓ ${tc}/${MAX_SOUNDINGS}${ta?' +'+ta:''}</span>`);
  if(tags.length){ const cb=document.createElement('div'); cb.className='cbar'; cb.innerHTML=tags.join(''); hdr.appendChild(cb); }
  wrap.appendChild(hdr);
  const body=document.createElement('div'); body.className='game-body';
  if(scene.art&&_registries.art[scene.art]){ const art=document.createElement('pre'); art.className='art-block'; art.textContent=_registries.art[scene.art]; body.appendChild(art); }
  if(G.lastReaction){ const rp=document.createElement('p'); rp.className='sp sp-reaction'; rp.textContent=G.lastReaction; body.appendChild(rp); G.lastReaction=null; }
  let rawText = scene.iconLayers ? resolveLayeredText(scene) : getSceneText(scene);
  rawText = injectMicroLines(rawText, scene);
  rawText = injectGhostText(rawText, G.scene);
  rawText = applyPastLifeLines(rawText, G.scene);
  const stxt=document.createElement('div');
  const wakingCharisms=['anamnesis','kenosis','tathagatagarbha','apophasis'];
  const hasWaking = G.charisms.some(id=>wakingCharisms.includes(id));
  const isHalo = (scene.mood==='revelation') || hasWaking;
  stxt.className='stxt'+(isHalo?' stxt-halo':'');
  const showAnam=G.playCount>0&&scene.anamnesis;
  rawText.forEach((raw,idx)=>{
    if(typeof raw==='string'&&raw.startsWith('__GHOST__:')){ const gp=document.createElement('p'); gp.className='sp sp-ghost'; gp.textContent=raw.replace('__GHOST__:',''); stxt.appendChild(gp); return; }
    const p=document.createElement('p'); p.className='sp'; p.innerHTML=processText(raw); stxt.appendChild(p);
    if(showAnam&&scene.anamnesis&&scene.anamnesis.after===idx){ const ap=document.createElement('p'); ap.className='sp sp-anamnesis'; ap.innerHTML=processText(scene.anamnesis.text); stxt.appendChild(ap); if(scene.anamnesis.note)addNote(scene.anamnesis.note); }
  });
  body.appendChild(stxt);
  const cd=document.createElement('div'); cd.className='choices';
  if(scene.return_to){ const rb=document.createElement('button'); rb.className='choice choice-return'; rb.textContent=scene.return_label||'Return.'; rb.onclick=()=>navigate(scene.return_to); cd.appendChild(rb); }
  if(scene.choices){
    scene.choices.forEach(ch=>{
      if(ch.hide_if&&hasFlag(ch.hide_if))return;
      if(ch.show_if&&!hasFlag(ch.show_if))return;
      if(ch.once&&ch.next&&hasFlag('visited_'+ch.next))return;
      const btn=document.createElement('button');
      const locked = isChoiceLocked(ch);
      if(locked){
        if(G.mode==='open')return;
        btn.className='choice choice-locked'; btn.disabled=true;
        let hint=processText(ch.text);
        if(ch.requires_stat)hint+=` [${ch.requires_stat[0]} ${ch.requires_stat[1]}+]`;
        if(ch.requires_charism)hint+=` [charism: ${ch.requires_charism}]`;
        if(ch.requires_playcount!==undefined)hint+=` [crossing ${ch.requires_playcount+1}+]`;
        if(ch.requires_item)hint+=` [requires: ${ch.requires_item}]`;
        if(ch.requires_theosis)hint+=` [theosis ${ch.requires_theosis}+]`;
        if(ch.requires_companion)hint+=` [companion: ${ch.requires_companion}]`;
        if(ch.requires_reputation_min){ for(const[id,min]of Object.entries(ch.requires_reputation_min)) hint+=` [${id}≥${min}]`; }
        if(ch.requires_quest_state){ for(const[id,state]of Object.entries(ch.requires_quest_state)) hint+=` [${id}=${state}]`; }
        if(ch.requires_belief) hint+=` [belief: ${ch.requires_belief}]`;
        if(ch.requires_knowledge) hint+=` [knowledge: ${ch.requires_knowledge}]`;
        if(ch.requires_past_flag) hint+=` [past: ${ch.requires_past_flag}]`;
        btn.textContent=hint;
      } else {
        const tv=ch.next&&hasFlag('visited_'+ch.next)&&scene.hub;
        let cls='choice';
        if(ch.type==='silence') cls+=' choice-silence';
        if(ch.style==='cold')cls+=' choice-cold';
        if(ch.style==='return')cls+=' choice-return';
        if(ch.style==='vespers')cls+=' choice-vespers';
        if(ch.cover_set)cls+=' choice-cover';
        if(ch.requires_charism)cls+=' choice-charism';
        if(tv)cls+=' choice-visited';
        btn.className=cls; btn.innerHTML=(tv?'◦ ':'')+processText(ch.text);
        if(ch.cover_set&&!hasFlag('cover_'+ch.cover_set.key+'_set')){ const lbl=document.createElement('span'); lbl.className='cover-label'; lbl.textContent='⬥ establishing cover'; btn.appendChild(lbl); }
        if(ch.requires_charism){ const lbl=document.createElement('span'); lbl.className='charism-label'; lbl.textContent='◈ '+ch.requires_charism; btn.appendChild(lbl); }
        if(ch.give_item){ const lbl=document.createElement('span'); lbl.className='item-label'; lbl.textContent='+ '+ch.give_item; btn.appendChild(lbl); }
        if(ch.take_item){ const lbl=document.createElement('span'); lbl.className='item-label'; lbl.textContent='- '+ch.take_item; btn.appendChild(lbl); }
        if(ch.advance_time){ const lbl=document.createElement('span'); lbl.className='time-label'; lbl.textContent=`⏱ +${ch.advance_time}h`; btn.appendChild(lbl); }
        if(ch.mod_reputation){ const lbl=document.createElement('span'); lbl.className='reputation-label'; lbl.textContent=Object.entries(ch.mod_reputation).map(([id,d])=>`${id} ${d>0?'+'+d:d}`).join(', '); btn.appendChild(lbl); }
        if(ch.set_quest_state){ const lbl=document.createElement('span'); lbl.className='quest-label'; lbl.textContent=Object.entries(ch.set_quest_state).map(([id,s])=>`${id}→${s}`).join(', '); btn.appendChild(lbl); }
        if(ch.roll && typeof ch.roll === 'object'){ btn.onclick=()=>startRoll(ch); }
        else{ btn.onclick=()=>applyChoice(ch); }
      }
      cd.appendChild(btn);
    });
  }
  body.appendChild(cd);
  if(G.notes.length){
    const od=document.createElement('div'); od.className='obs-section';
    const ot=document.createElement('div'); ot.className='obs-title'; ot.textContent='observations'; od.appendChild(ot);
    const cats=[{label:'People',test:k=>k.startsWith('met_')},{label:'Cover',test:k=>k.startsWith('cover_')},{label:'Events',test:k=>!k.startsWith('met_')&&!k.startsWith('cover_')&&!k.startsWith('charism_')}];
    const shown=new Set();
    cats.forEach(cat=>{ const items=[...G.notes].reverse().filter(k=>cat.test(k)&&!shown.has(k)).slice(0,3); if(!items.length)return; const sec=document.createElement('div'); sec.style.cssText='font-size:.6rem;color:var(--amber-dim);letter-spacing:.12em;text-transform:uppercase;margin:.4rem 0 .2rem;'; sec.textContent=cat.label; od.appendChild(sec); items.forEach(k=>{ shown.add(k); const d=document.createElement('div'); d.className='obs-item'; d.textContent='• '+noteLabel(k); od.appendChild(d); }); });
    body.appendChild(od);
  }
  const rb2=document.createElement('div'); rb2.className='restart-bar';
  if(G.confirmRestart){ const msg=document.createElement('span'); msg.className='confirm-msg'; msg.textContent='End this crossing?'; rb2.appendChild(msg); const yes=document.createElement('button'); yes.className='btn confirm-yes'; yes.textContent='Yes — return to shore'; yes.onclick=doRestart; rb2.appendChild(yes); const no=document.createElement('button'); no.className='btn confirm-no'; no.textContent='No — continue'; no.onclick=()=>{G.confirmRestart=false;render();}; rb2.appendChild(no); }
  else{ const rbt=document.createElement('button'); rbt.className='btn restart-btn'; rbt.textContent='abandon crossing'; rbt.onclick=()=>{G.confirmRestart=true;render();}; rb2.appendChild(rbt); }
  body.appendChild(rb2); wrap.appendChild(body); root.appendChild(wrap);
  const ab=document.createElement('button');ab.id='audio-btn';
  ab.style.cssText='position:fixed;top:.55rem;right:.8rem;background:none;border:none;font-family:\'Courier Prime\',monospace;font-size:.7rem;color:var(--dim);cursor:pointer;z-index:200;letter-spacing:.08em;padding:.2rem .4rem;';
  ab.textContent=_audioOn?'♪ on':'♪ off';ab.onclick=toggleAudio;root.appendChild(ab);
  const bnav=document.createElement('div');bnav.id='bottom-nav';
  bnav.style.cssText='position:fixed;bottom:0;left:0;width:100%;z-index:100;display:flex;justify-content:center;gap:0;background:rgba(6,8,12,0.96);border-top:1px solid var(--border);';
  [
    {label:'observations',fn:()=>openPanel('notes'),cls:''},
    {label:'status',fn:()=>openPanel('status'),cls:''},
    {label:'breviary'+(G.soundings.available.length?' ⚑':''),fn:()=>openPanel('breviary'),cls:G.soundings.available.length?' has-available':''},
    {label:'glossary',fn:()=>openPanel('glossary'),cls:''},
    {label:'map',fn:()=>openPanel('map'),cls:''}
  ].forEach(({label,fn,cls})=>{
    const b=document.createElement('button');
    b.style.cssText='flex:1;background:none;border:none;border-right:1px solid var(--border);font-family:\'Courier Prime\',monospace;font-size:.66rem;letter-spacing:.07em;padding:.55rem .3rem;cursor:pointer;color:var(--dim);';
    b.className=cls;b.textContent=label;b.onclick=fn;bnav.appendChild(b);
  });
  root.appendChild(bnav);
  if(G.panelOpen==='notes')renderNotesPanel(root);
  if(G.panelOpen==='status')renderStatusPanel(root);
  if(G.panelOpen==='breviary')renderBreviaryPanel(root);
  if(G.panelOpen==='glossary')renderGlossaryPanel(root);
  if(G.panelOpen==='map')renderMapPanelSide(root);
}

// ── STAT_TIPS ───────────────────────────────────────────────
const STAT_TIPS = _registries.statTips;

// ── INITIALISATION ─────────────────────────────────────────
loadMetaUnlocks();
if (typeof _actx !== 'undefined') initBuiltinSfx();
render();

window.SOBORNOST = {
  registerCharisms, registerSounding, registerNote, registerArt,
  registerGlossaryEntry, registerStatTip, registerRollModifier, setAvailableModes,
  setIconWordFunction, setHarbourWordFunction, setShipWordFunction, setObjectDescriptionFunction,
  allCharisms, findCharism, noteLabel, iconWord, harbourWord, shipWord, objectDescription,
  learn, comeToBelieve, contradict, knows, believes, pushConsequence,
  registerScenePool, addToScenePool, navigateToPool, scheduleEvent,
  getStance, setStance, modStance, registerRitual, startRitual, ritualNextPhase,
  registerTranslation, registerPostEventShift, registerPastLifeLine, registerMapNode,
  registerSfx, playSfx, registerItem,
  addCompanion, removeCompanion, hasCompanion, getCompanion, modCompanionStat, setCompanionCharism,
  unlockMeta, hasMeta, exportAnalytics,
  registerTheosisTagValue, setTheosisTiers, incrementTheosis, flashTheosisLight,
  registerNameMapping,
  registerScenes,
  validateContent,
  setAtmosphereEnabled: (enabled) => { ENABLE_ATMOSPHERE = enabled; if(!enabled && canvas) canvas.style.display='none'; else if(enabled && canvas) canvas.style.display='block'; },
  G, render
};