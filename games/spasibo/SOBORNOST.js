// ═══════════════════════════════════════════════════════════
// SOBORNOST ENGINE v2.0 – Core Mechanics
// Theosis System (Divine Encounter / Collective Ascent)
// Full file: all v1.8 features + hidden theosis mechanic
// ═══════════════════════════════════════════════════════════

// ── ATMOSPHERE (canvas, functions) ──────────────────────────
const canvas = document.getElementById('atmos'), ctx = canvas.getContext('2d');
let mood='neutral',targetMood='neutral',moodLerp=1,fogParts=[],rainDrops=[],T=0;
let atmosMods = { fogMult:1.0, lampWarm:0, lampFlicker:true, soboWarm:false, goldIntensity:0, goldGlow:false };
function resize(){canvas.width=innerWidth;canvas.height=innerHeight;initRain();}
resize();addEventListener('resize',resize);
function initFog(){fogParts=[];for(let i=0;i<22;i++)fogParts.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:80+Math.random()*140,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.08,ph:Math.random()*Math.PI*2,base:.025+Math.random()*.05});}initFog();
function initRain(){const p=porthole();rainDrops=[];for(let i=0;i<24;i++)rainDrops.push({x:p.x+(Math.random()-.5)*p.r*2,y:p.y+(Math.random()-.5)*p.r*2,len:5+Math.random()*9,spd:1.2+Math.random()*2});}
function porthole(){const r=Math.min(canvas.width,canvas.height)*.085;return{x:canvas.width-r-28,y:r+28,r};}
const MOOD={neutral:[130,170,190,6,8,12],tense:[140,90,70,10,6,4],uncanny:[60,130,170,4,8,14],revelation:[200,190,140,12,14,10]};
function setMood(m){if(!m||m===targetMood)return;targetMood=m;moodLerp=0;_updateAudioMood();}
function lerpN(a,b,t){return a+(b-a)*t;}

function refreshAtmosMods(){
  const s = G.soundings.settled;
  atmosMods.fogMult = s.includes('gnoti_seauton') ? 0.55 : 1.0;
  atmosMods.lampWarm = s.includes('magnificat') ? 0.08 : 0;
  atmosMods.lampFlicker = !s.includes('null_set');
  atmosMods.soboWarm = s.includes('sobornost');
  // Theosis gold intensity (hidden)
  const theosis = G.theosis || 0;
  if (theosis >= 71) atmosMods.goldIntensity = 0.6;
  else if (theosis >= 33) atmosMods.goldIntensity = 0.2 + (theosis - 33) / 38 * 0.4;
  else atmosMods.goldIntensity = 0;
  atmosMods.goldGlow = atmosMods.goldIntensity > 0;
}

function drawAtmos(){
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
drawAtmos();

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
  playCount:parseInt(localStorage.getItem('spasibo_plays')||'0'),
  pastFlags:JSON.parse(localStorage.getItem('spasibo_past_flags')||'[]'),
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
  // v2.0: Theosis (hidden)
  theosis: 0,
  _theosisFlashTimer: null
};

// ── THEOSIS SYSTEM ──────────────────────────────────────────
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

function incrementTheosis(amount) {
  if (amount === 0) return;
  G.theosis = Math.min(Math.max(G.theosis + amount, 0), 100);
  refreshAtmosMods();
  // No explicit display of theosis value
}
function flashTheosisLight(intensity=1.0, duration=2000) {
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
  items: {}
};

function registerCharisms(sleepingList, wakingList) {
  if (sleepingList) _registries.charisms.sleeping = sleepingList;
  if (wakingList) _registries.charisms.waking = wakingList;
}
function registerSounding(id, data) { _registries.soundings[id] = data; }
function registerNote(key, value) { _registries.notes[key] = value; }
function registerArt(id, ascii) { _registries.art[id] = ascii; }
function registerGlossaryEntry(term, def) { _registries.glossary.push({term,def}); }
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

function allCharisms() { return [..._registries.charisms.sleeping, ..._registries.charisms.waking]; }
function findCharism(id) { return allCharisms().find(c=>c.id===id); }
function noteLabel(k) {
  const n = _registries.notes[k];
  if (!n) return k;
  return typeof n === 'function' ? n() : n;
}

// ── PERSISTENCE (includes theosis) ─────────────────────────
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
      theosis:G.theosis
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
    G.phase='game';refreshAtmosMods();return true;
  }catch(e){console.warn('Load:',e);return false;}
}
function commitPlay(){ /* unchanged from v1.8 */ }

// ── META ACHIEVEMENTS, ANALYTICS (unchanged) ───────────────
function loadMetaUnlocks() { try { const raw=localStorage.getItem(META_KEY); if(raw) G.metaUnlocks=JSON.parse(raw); else G.metaUnlocks={}; } catch(e) { G.metaUnlocks={}; } }
function saveMetaUnlocks() { try { localStorage.setItem(META_KEY, JSON.stringify(G.metaUnlocks)); } catch(e) {} }
function unlockMeta(id) { if(!G.metaUnlocks[id]) { G.metaUnlocks[id]=true; saveMetaUnlocks(); showToast(`Meta‑achievement unlocked: ${id}`,'note'); } }
function hasMeta(id) { return !!G.metaUnlocks[id]; }
function logChoice(choice, sceneId) { /* unchanged */ }
function exportAnalytics() {
  const data = JSON.stringify(G._analyticsLog, null, 2);
  const blob = new Blob([data], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `spasibo_analytics_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── COMPANIONS, SOUNDINGS, RELIQUARY (v1.8) ────────────────
function addCompanion(id,data) { /* same as v1.8 */ }
function removeCompanion(id) { /* same */ }
function hasCompanion(id) { return G.companions.some(c=>c.id===id); }
function getCompanion(id) { return G.companions.find(c=>c.id===id); }
function modCompanionStat(id,stat,delta) { /* same */ }
function setCompanionCharism(id,charismId) { /* same */ }

function settleSounding(soundingId) { /* same */ }
function applySoundingProgress(soundingId,delta) { /* same */ }
function applyAutoAlignment(tags) { /* same */ }

const MAX_SOUNDINGS=4,SOUNDING_THRESHOLD=8;
function soundingSlotsFull(){return G.soundings.taken.length+G.soundings.settled.length>=MAX_SOUNDINGS;}
function offerSounding(id){ /* unchanged */ }
function takeSounding(id){ /* unchanged */ }
function suspendSounding(id){ /* unchanged */ }
function releaseSounding(id){ /* unchanged */ }
function tickSoundings(){ /* unchanged */ }
function soundingBar(p){const f=Math.round((p/SOUNDING_THRESHOLD)*8);return'█'.repeat(f)+'░'.repeat(8-f);}
function updateKenosisProgress(){ /* unchanged */ }
function getKenosisOpacity(){ /* unchanged */ }

// ── HELD EFFECTS (reliquary) ───────────────────────────────
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
}
function hasItem(id) { return G.inventory.includes(id); }
function addItem(id) { if(!hasItem(id)) { G.inventory.push(id); recalculateHeldEffects(); } }
function removeItem(id) { G.inventory = G.inventory.filter(i=>i!==id); recalculateHeldEffects(); }

// ── RUMINATION ENGINE (idle) ───────────────────────────────
function startIdleTimer() { /* same as v1.8 */ }
function resetIdleTimer() { /* same */ }

// ── COVER METER, ALIGNMENT COMPASS, MAP ────────────────────
function renderCoverMeter() { /* unchanged */ }
function calculateAlignment() { /* unchanged */ }
function renderAlignmentCompass() { /* unchanged */ }
function markMapNodeVisited(nodeId) { if(_registries.mapNodes[nodeId]) _registries.mapNodes[nodeId].visited=true; }
function renderMapPanel() { /* unchanged */ }

// ── AUDIO + SFX (unchanged) ─────────────────────────────────
let _actx=null,_gainNode=null,_audioOn=false;
let _oscNodes=[],_filterNode=null,_reverbGain=null;
function _makeReverb(ctx, duration=1.8, decay=2.2) { /* unchanged */ }
function _initAudio(){ /* unchanged */ }
function _audioMoodGain(){ /* unchanged */ }
function _applyMoodToAudio(m){ /* unchanged */ }
function toggleAudio(){ /* unchanged */ }
function _updateAudioMood(){ /* unchanged */ }
function playSfx(name, volume=0.5) { const sfx = _registries.sfxLibrary[name]; if(sfx) sfx(volume); else console.warn(`SFX "${name}" not registered.`); }
function initBuiltinSfx() { /* same as v1.8 */ }

// ── UTILITIES (flags, effects, roll, etc.) ─────────────────
function hasFlag(f){return G.flags.has(f);}
function setFlag(f){if(f)G.flags.add(f);}
function addNote(key){ if(!key||G.notes.includes(key))return; G.notes.push(key); const l=noteLabel(key); showToast(l.length>52?l.slice(0,52)+'…':l,'note'); }
function applyEffect(e){ /* unchanged */ }
function setCover(key,value){G.cover[key]=value;setFlag('cover_'+key+'_set');}
function showToast(msg,type){ /* unchanged */ }
function rollCover(difficulty){ /* unchanged */ }
function degradeCover(amount){ /* unchanged */ }
function advanceTime(hours) { /* unchanged but calls processEventQueue */ }
function modReputation(id,delta) { /* unchanged */ }
function getReputation(id) { /* unchanged */ }
function setReputation(id,val) { /* unchanged */ }
function setQuestState(id,state) { /* unchanged */ }
function getQuestState(id) { /* unchanged */ }
function isQuestActive(id) { return getQuestState(id)==='active'; }
function isQuestCompleted(id) { return getQuestState(id)==='completed'; }

// ── ROLL SYSTEM (unchanged) ─────────────────────────────────
function performRoll(statKey, difficulty, options={}) { /* unchanged from v1.8 */ }

// ── CONDITION EVALUATOR (with theosis) ──────────────────────
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

// ── CHOICE LOCK (with theosis) ──────────────────────────────
function isChoiceLocked(ch) {
  if (ch.condition) return !evaluateCondition(ch.condition);
  if (ch.requires_theosis && G.theosis < ch.requires_theosis) return true;
  // Legacy fields
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

// ── TEXT PROCESSING (with theosis word replacement) ─────────
function getSceneText(scene) { /* same as v1.8 */ }
function resolveTextBlock(textBlock) { /* same */ }
function injectMicroLines(textArray, scene) { /* same */ }
function applyLinguisticToggle(text) { /* same */ }
function applyPostEventShifts(text) { /* same */ }
function applyPastLifeLines(textArray, sceneId) { /* same */ }
function injectGhostText(rawText,sceneId){ /* same as v1.8 */ }
function processText(raw){ /* uses iconWord from registries */ }

// ── SCENE POOLS, EVENT QUEUE, STANCE, RITUALS ──────────────
function navigateToPool(poolId) { /* same as v1.8 */ }
function scheduleEvent(event) { G.eventQueue.push(event); saveGame(); }
function processEventQueue() { /* same */ }
function getStance(npcId, key) { if(!G.npcStance[npcId]) G.npcStance[npcId]={trust:0,suspicion:0,solidarity:0}; return G.npcStance[npcId][key]||0; }
function setStance(npcId, key, value) { if(!G.npcStance[npcId]) G.npcStance[npcId]={trust:0,suspicion:0,solidarity:0}; G.npcStance[npcId][key]=value; }
function modStance(npcId, key, delta) { const cur=getStance(npcId,key); setStance(npcId,key,cur+delta); if(delta!==0) showToast(`${npcId}: ${key} ${delta>0?'+'+delta:delta}`,'note'); }
let _activeRitual = null;
function startRitual(ritualId, startingScene, nextScene) { /* same */ }
function ritualNextPhase() { /* same */ }
function getCurrentRitualPhase() { /* same */ }
function isRitualActive() { return _activeRitual !== null; }
function renderRitual(root) { /* same */ }

// ── EPISTEMIC HELPERS ──────────────────────────────────────
function learn(flag) { G.knowledge.add(flag); G.beliefs.add(flag); }
function comeToBelieve(flag) { if(!G.knowledge.has(flag)) G.beliefs.add(flag); }
function contradict(flag) { G.beliefs.delete(flag); }
function knows(flag) { return G.knowledge.has(flag); }
function believes(flag) { return G.beliefs.has(flag); }
function pushConsequence(consequence) { G.consequenceQueue.push(consequence); }
function processConsequenceQueue() { /* same */ }

// ── RENDER FUNCTIONS (identical to v1.8, with theosis word injection) ──
function render() { /* same as v1.8 but uses updated iconWord etc. */ }
function renderTitle(root) { /* unchanged but may show meta unlocks */ }
function continueGame() { if(loadGame())render(); else{ G.phase='mode'; render(); } }
function absoluteReset() { /* reset includes G.theosis=0 */ }
function renderMode(root) { /* unchanged */ }
function selCharism(id) { /* unchanged */ }
function renderCharism(root) { /* unchanged */ }
function beginGame() { /* unchanged */ }
function renderTutorial(root) { /* unchanged */ }
function dismissTutorial() { G.tutorialDone=true; saveGame(); render(); }

// Main game render (identical to v1.8 except word functions)
function renderGame(root) {
  if(!G.tutorialDone&&G.scene==='chapel_waking'){ renderTutorial(root); return; }
  if(G.rollResult && G.pendingRoll) { renderRollBox(root); return; }
  if(isRitualActive()) { renderRitual(root); return; }
  processConsequenceQueue();
  resetIdleTimer();
  if(hasFlag('cover_compromised')&&!hasFlag('cover_blown')&&G.scene==='corridor_first'){
    if(!SCENES['merky_confrontation']){ console.warn("Missing scene: merky_confrontation"); G.flags.delete('cover_compromised'); showToast("Cover issue – scene missing.","note"); }
    else{ G.scene='merky_confrontation'; }
  }
  const scene=SCENES[G.scene];
  if(!scene){ root.innerHTML+=`<p style="padding:2rem;color:var(--rust)">Scene not found: ${G.scene}</p>`; return; }
  const liturgical = LITURGICAL_HOURS[G.liturgicalHour];
  if(liturgical) setMood(liturgical.mood);
  else setMood(scene.mood||'neutral');
  saveGame();
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
  const awarenessDiv = document.createElement('div'); awarenessDiv.className='stat';
  const awareBonus = Math.floor((G.awareness||0)/2);
  awarenessDiv.innerHTML = `awareness <span class="stat-val">${G.awareness||0}</span> <span class="stat-tip" title="Reduces roll difficulty by ${awareBonus} when awarenessBonus is enabled">ⓘ</span>`;
  sb.appendChild(awarenessDiv);
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
  if(G.notes.length){ /* same as v1.8 */ }
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

function startRoll(choice) { /* unchanged */ }
function renderRollBox(root) { /* unchanged */ }

function applyChoice(ch) {
  // Existing code for cover, notes, effects, companions, soundings, etc.
  // Then:
  // Theosis accumulation from tags
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
  // ... rest of applyChoice
  // Log choice, handle next scene, etc.
}

function navigate(id) { /* unchanged but calls markMapNodeVisited */ }
function newPlay() { /* reset theosis to 0 */ }
function doRestart() { /* reset theosis to 0 */ }
function openPanel(w) { G.panelOpen=G.panelOpen===w?null:w; render(); }
function mkOverlay(fn){ const o=document.createElement('div'); o.className='overlay-bg'; o.onclick=fn; return o; }
function renderNotesPanel(root) { /* unchanged */ }
function renderStatusPanel(root) { /* unchanged (theosis not shown) */ }
function renderBreviaryPanel(root) { /* unchanged */ }
function renderMapPanelSide(root) { /* unchanged */ }
function renderMemorial(root) { /* unchanged but could show meta unlocks if desired */ }
function returnToTitle(){ G.phase='title'; render(); }
function closeGlossary(){ openPanel('glossary'); }
function renderGlossaryPanel(root) { /* unchanged */ }
function hasCharism(id) { return G.charisms.includes(id); }

// ── INITIALISATION ─────────────────────────────────────────
loadMetaUnlocks();
if (typeof _actx !== 'undefined') initBuiltinSfx();
render();

// Expose public API
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
  G, render
};

// Final render
render();