// ═══════════════════════════════════════════════════════════
// СПАСИБО ENGINE v1.0 – FIXED (G declared before atmosphere)
// ═══════════════════════════════════════════════════════════

// ── ATMOSPHERE (canvas, functions) ──────────────────────────
const canvas = document.getElementById('atmos'), ctx = canvas.getContext('2d');
let mood='neutral',targetMood='neutral',moodLerp=1,fogParts=[],rainDrops=[],T=0;
let atmosMods = { fogMult:1.0, lampWarm:0, lampFlicker:true };
function resize(){canvas.width=innerWidth;canvas.height=innerHeight;initRain();}
resize();addEventListener('resize',resize);
function initFog(){fogParts=[];for(let i=0;i<22;i++)fogParts.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:80+Math.random()*140,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.08,ph:Math.random()*Math.PI*2,base:.025+Math.random()*.05});}initFog();
function initRain(){const p=porthole();rainDrops=[];for(let i=0;i<24;i++)rainDrops.push({x:p.x+(Math.random()-.5)*p.r*2,y:p.y+(Math.random()-.5)*p.r*2,len:5+Math.random()*9,spd:1.2+Math.random()*2});}
function porthole(){const r=Math.min(canvas.width,canvas.height)*.085;return{x:canvas.width-r-28,y:r+28,r};}
const MOOD={neutral:[130,170,190,6,8,12],tense:[140,90,70,10,6,4],uncanny:[60,130,170,4,8,14],revelation:[200,190,140,12,14,10]};
function setMood(m){if(!m||m===targetMood)return;targetMood=m;moodLerp=0;}
function lerpN(a,b,t){return a+(b-a)*t;}

// ── GLOBAL STATE (MOVED UP) ─────────────────────────────────
let G = {
  phase:'title',mode:'attended',
  stats:{vigilance:0,composure:0,communion:0,doubt:0},
  charisms:[],
  cover:{posting:null,background:null,denomination:null,connection:null,left:null},
  coverIntegrity:5,
  soundings:{available:[],taken:[],settled:[]},soundingPending:null,
  notes:[],flags:new Set(),
  scene:'chapel_waking',lastReaction:null,
  panelOpen:null,confirmRestart:false,tutorialDone:false,
  playCount:parseInt(localStorage.getItem('spasibo_plays')||'0'),
  pastFlags:JSON.parse(localStorage.getItem('spasibo_past_flags')||'[]'),
};

// refresh atmos modifiers (safe after G is defined)
function refreshAtmosMods(){
  const s = G.soundings.settled;
  atmosMods.fogMult = s.includes('gnoti_seauton') ? 0.55 : 1.0;
  atmosMods.lampWarm = s.includes('magnificat') ? 0.08 : 0;
  atmosMods.lampFlicker = !s.includes('null_set');
}

// ── DRAW FUNCTIONS (now G is safe to read) ──────────────────
function drawAtmos(){
  T+=.008;
  if(moodLerp<1){moodLerp=Math.min(1,moodLerp+.008);if(moodLerp>=1)mood=targetMood;}
  const cm=MOOD[mood]||MOOD.neutral,tm=MOOD[targetMood]||MOOD.neutral,t=moodLerp;
  const fr=lerpN(cm[0],tm[0],t),fg=lerpN(cm[1],tm[1],t),fb=lerpN(cm[2],tm[2],t);
  const br=lerpN(cm[3],tm[3],t),bg=lerpN(cm[4],tm[4],t),bb=lerpN(cm[5],tm[5],t);
  ctx.fillStyle=`rgb(${br|0},${bg|0},${bb|0})`;ctx.fillRect(0,0,canvas.width,canvas.height);
  const moodFog=mood==='tense'?2.5:(mood==='uncanny'?0.6:(mood==='revelation'?0.3:1));
  const effectiveFog=moodFog*atmosMods.fogMult;
  for(const p of fogParts){
    p.x+=p.vx;p.y+=p.vy;p.ph+=.004;
    if(p.x<-p.r)p.x=canvas.width+p.r;if(p.x>canvas.width+p.r)p.x=-p.r;
    if(p.y<-p.r)p.y=canvas.height+p.r;if(p.y>canvas.height+p.r)p.y=-p.r;
    const op=(p.base+Math.sin(p.ph)*.012)*effectiveFog;
    const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
    g.addColorStop(0,`rgba(${fr|0},${fg|0},${fb|0},${op.toFixed(3)})`);
    g.addColorStop(1,`rgba(${fr|0},${fg|0},${fb|0},0)`);
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
  }
  const lx=canvas.width*.12,ly=canvas.height*.08;
  const lg=ctx.createRadialGradient(lx,ly,0,lx,ly,Math.min(canvas.width,canvas.height)*.28);
  let li=0.09+Math.sin(T*.4)*.008;
  if(mood==='tense'&&atmosMods.lampFlicker)li+=Math.sin(T*4.5)*.03;
  if(mood==='revelation')li=.28;if(mood==='uncanny')li=.04;
  const lampR=176+Math.round(atmosMods.lampWarm*40),lampG=120-Math.round(atmosMods.lampWarm*20),lampB=40;
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
  const soboWarm = G && G.soundings && G.soundings.settled.includes('sobornost');
  ctx.strokeStyle=`rgba(${soboWarm?80:60},${soboWarm?110:100},${soboWarm?120:130},${mood==='uncanny'?0.5:0.25})`;ctx.lineWidth=.8;
  for(let i=0;i<6;i++){const wy=y+r*.2+i*r*.12+Math.sin(T*.6+i*1.2)*2;ctx.beginPath();ctx.moveTo(x-r,wy);ctx.quadraticCurveTo(x,wy+Math.sin(T+i)*3,x+r,wy);ctx.stroke();}
  if(mood!=='uncanny'&&mood!=='revelation'){
    ctx.strokeStyle=`rgba(100,150,180,${mood==='tense'?0.35:0.18})`;ctx.lineWidth=.6;
    for(const d of rainDrops){d.y+=d.spd;if(d.y>y+r){d.y=y-r;d.x=x+(Math.random()-.5)*r*2;}ctx.beginPath();ctx.moveTo(d.x,d.y);ctx.lineTo(d.x-1,d.y+d.len);ctx.stroke();}
  }
  ctx.restore();ctx.strokeStyle='#2a3c48';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(x,y,r*.87,0,Math.PI*2);ctx.stroke();
}
drawAtmos();

// ── PERSISTENCE ─────────────────────────────────────────────
const SAVE_KEY='spasibo_save',PLAY_KEY='spasibo_plays',FLAGS_KEY='spasibo_past_flags',ENDINGS_KEY='spasibo_endings';


// ── UTILITIES ────────────────────────────────────────────────
function noteLabel(k){const n=NOTES[k];if(!n)return k;return typeof n==='function'?n():n;}
function hasFlag(f){return G.flags.has(f);}
function setFlag(f){if(f)G.flags.add(f);}
function addNote(key){
  if(!key||G.notes.includes(key))return;
  G.notes.push(key);
  const l=noteLabel(key);showToast(l.length>52?l.slice(0,52)+'…':l,'note');
}
function applyEffect(e){if(!e)return;for(const[k,v]of Object.entries(e))if(G.stats[k]!==undefined)G.stats[k]=Math.max(0,G.stats[k]+v);}
function setCover(key,value){G.cover[key]=value;setFlag('cover_'+key+'_set');}
function showToast(msg,type){
  const old=document.querySelector('.note-toast');if(old)old.remove();
  const t=document.createElement('div');
  t.className='note-toast'+(type==='sounding'?' sounding-toast':'');
  t.textContent=msg;document.body.appendChild(t);
  setTimeout(()=>{if(t.parentNode)t.remove();},3200);
}
function allCharisms(){return[...CHARISMS.sleeping,...CHARISMS.waking];}
function findCharism(id){return allCharisms().find(c=>c.id===id);}
function hasCharism(id){return G.charisms.includes(id);}

// ── COVER INTEGRITY ──────────────────────────────────────────
// Roll a d6 + composure bonus vs. difficulty
// Returns: 'success', 'partial', 'failure'
function rollCover(difficulty){
  const roll=Math.ceil(Math.random()*6);
  const bonus=Math.floor(G.stats.composure/2);
  const total=roll+bonus;
  if(total>=difficulty+2)return'success';
  if(total>=difficulty)return'partial';
  return'failure';
}
function degradeCover(amount){
  G.coverIntegrity=Math.max(0,G.coverIntegrity-amount);
  if(G.coverIntegrity<=0&&!hasFlag('cover_blown')){
    // Route to confrontation on next corridor visit
    setFlag('cover_compromised');
    showToast('Your cover is compromised.','note');
  }else if(G.coverIntegrity===1){
    showToast('Your cover is thin.','note');
  }else if(G.coverIntegrity===2){
    showToast('Your cover has been questioned.','note');
  }
}

const STAT_TIPS={
  vigilance:'Vigilance — attention, pattern recognition. Gates investigation and observation choices.',
  composure:'Composure — self-possession under pressure. Gates approaches requiring steadiness. Improves cover rolls.',
  communion:'Communion — openness, pastoral presence. Gates relational and confessional choices.',
  doubt:'Doubt — theological uncertainty as a tool. Gates apophatic and memory choices.',
};

// ── SAVE / LOAD ──────────────────────────────────────────────
function saveGame(){
  try{
    localStorage.setItem(SAVE_KEY,JSON.stringify({stats:G.stats,charisms:G.charisms,soundings:G.soundings,cover:G.cover,coverIntegrity:G.coverIntegrity,notes:G.notes,flags:[...G.flags],scene:G.scene,mode:G.mode,lastReaction:G.lastReaction,tutorialDone:G.tutorialDone,coverIntegrity:G.coverIntegrity}));
    const el=document.querySelector('.save-indicator');
    if(el){el.style.display='block';el.style.animation='none';void el.offsetWidth;el.style.animation='save-flash 2.2s ease forwards';setTimeout(()=>{if(el)el.style.display='none';},2300);}
  }catch(e){console.warn('Save:',e);}
}
function loadGame(){
  try{
    const raw=localStorage.getItem(SAVE_KEY);if(!raw)return false;const s=JSON.parse(raw);
    G.stats=s.stats||G.stats;G.charisms=s.charisms||[];
    G.soundings=s.soundings||{available:[],taken:[],settled:[]};
    G.cover=s.cover||G.cover;G.coverIntegrity=s.coverIntegrity!==undefined?s.coverIntegrity:3;
    G.notes=s.notes||[];G.flags=new Set(s.flags||[]);G.scene=s.scene||'chapel_waking';
    G.mode=s.mode||'attended';G.lastReaction=s.lastReaction||null;
    G.tutorialDone=s.tutorialDone||false;G.coverIntegrity=s.coverIntegrity!==undefined?s.coverIntegrity:5;
    G.phase='game';refreshAtmosMods();return true;
  }catch(e){console.warn('Load:',e);return false;}
}
function commitPlay(){
  G.playCount++;
  try{
    localStorage.setItem(PLAY_KEY,G.playCount.toString());
    const m=[...new Set([...G.pastFlags,...G.flags])];
    localStorage.setItem(FLAGS_KEY,JSON.stringify(m));G.pastFlags=m;
    // Track ending reached
    const endingFlag=G.flags.has('visited_ending_facilitate')?'facilitate':G.flags.has('visited_ending_intercept')?'intercept':G.flags.has('visited_ending_witness')?'witness':null;
    if(endingFlag){try{const eh=JSON.parse(localStorage.getItem(ENDINGS_KEY)||'[]');if(!eh.find(e=>e.play===G.playCount&&e.ending===endingFlag))eh.push({play:G.playCount,ending:endingFlag,charisms:[...G.charisms]});localStorage.setItem(ENDINGS_KEY,JSON.stringify(eh));}catch(e){}}
  }catch(e){}
}

// ── SOUNDINGS ────────────────────────────────────────────────
const MAX_SOUNDINGS=4,SOUNDING_THRESHOLD=8;
function soundingSlotsFull(){return G.soundings.taken.length+G.soundings.settled.length>=MAX_SOUNDINGS;}
function offerSounding(id){
  if(!id||!SOUNDINGS[id])return;
  if(G.soundings.available.includes(id)||G.soundings.taken.some(t=>t.id===id)||G.soundings.settled.includes(id))return;
  G.soundings.available.push(id);showToast('Sounding: '+SOUNDINGS[id].name,'sounding');
}
function takeSounding(id){
  if(G.soundings.taken.some(t=>t.id===id)||G.soundings.settled.includes(id))return;
  if(soundingSlotsFull()){G.soundingPending=id;G.panelOpen='breviary';render();return;}
  G.soundings.available=G.soundings.available.filter(x=>x!==id);
  G.soundings.taken.push({id,progress:0});G.soundingPending=null;
  showToast(SOUNDINGS[id].name+': taking the sounding.','sounding');render();
}
function suspendSounding(id){
  const entry=G.soundings.taken.find(t=>t.id===id);if(!entry)return;
  G.soundings.taken=G.soundings.taken.filter(t=>t.id!==id);
  G.soundings.available.push(id);
  showToast(SOUNDINGS[id].name+': suspended.','sounding');render();
}
function releaseSounding(id){
  G.soundings.taken=G.soundings.taken.filter(t=>t.id!==id);
  const pending=G.soundingPending;G.soundingPending=null;
  if(pending){setTimeout(()=>takeSounding(pending),50);}else render();
}
function tickSoundings(){
  const settled=[];
  G.soundings.taken=G.soundings.taken.map(t=>{
    const p=t.progress+1;
    if(p>=SOUNDING_THRESHOLD){settled.push(t.id);return null;}
    return{id:t.id,progress:p};
  }).filter(Boolean);
  settled.forEach(id=>{
    G.soundings.settled.push(id);
    const s=SOUNDINGS[id];if(s&&s.effect)applyEffect(s.effect);
    showToast(s.name+': settled.','sounding');
    refreshAtmosMods(); // Update visual effects when sounding settles
  });
}
function soundingBar(p){const f=Math.round((p/SOUNDING_THRESHOLD)*8);return'█'.repeat(f)+'░'.repeat(8-f);}

// ── ANAMNESIS GHOST TEXT ─────────────────────────────────────
// On replay with Anamnesis charism, inject ghost lines into certain scenes
const GHOST_TEXT={
  // scene_id: [index_after_which_to_inject, ghost_text]
  merky_meet:   [0, 'You have had this conversation before. The coffee was the same temperature.'],
  pavel_intro:  [1, 'He has told you his name on other crossings. It has always been Pavel.'],
  chapel_waking:[3, 'The {ICON} has been in a different position before. You are certain of it.'],
};
function injectGhostText(rawText,sceneId){
  if(!hasCharism('anamnesis')||G.playCount<1)return rawText;
  const ghost=GHOST_TEXT[sceneId];
  if(!ghost)return rawText;
  const[idx,txt]=ghost;
  const result=[...rawText];
  result.splice(idx+1,0,'__GHOST__:'+txt);
  return result;
}

// ── TEXT PROCESSING ──────────────────────────────────────────
function processText(raw){
  if(typeof raw==='function')raw=raw(G);
  return raw
    .replace(/{ICON}/g,iconWord())
    .replace(/Спасибо/g,'<span class="sp-cold">Спасибо</span>')
    .replace(/───+/g,'<span class="sp-dim">$&</span>');
}

// ── RENDER ───────────────────────────────────────────────────
function render(){
  const root=document.getElementById('root');root.innerHTML='';
  if(typeof IS_DEMO!=='undefined'&&IS_DEMO){
    const b=document.createElement('div');b.className='demo-banner';
    b.textContent='⚓ DEMO — СПАСИБО — First Crossing Preview';root.appendChild(b);
  }
  if(G.phase==='title')renderTitle(root);
  else if(G.phase==='mode')renderMode(root);
  else if(G.phase==='charism')renderCharism(root);
  else if(G.phase==='game')renderGame(root);
  else if(G.phase==='memorial')renderMemorial(root);
}

function renderTitle(root){
  setMood('neutral');
  const replay=G.playCount>0,hasSave=!!localStorage.getItem(SAVE_KEY);
  const isDemo=typeof IS_DEMO!=='undefined'&&IS_DEMO;
  const d=document.createElement('div');d.className='title-screen';
  d.innerHTML=`
    <div class="title-cyrillic">СПАСИБО</div>
    <div style="font-size:.72rem;color:var(--dim);letter-spacing:.3em;text-transform:uppercase;margin-bottom:.2rem">Spasibo</div>
    <div style="font-size:.68rem;color:var(--amber-dim);letter-spacing:.18em;font-style:italic;margin-bottom:${isDemo?'1.2':'3.5'}rem">Thank You</div>
    ${isDemo?'<div style="font-size:.8rem;color:var(--amber);border:1px solid var(--amber-dim);padding:.5rem 1.2rem;margin-bottom:2.5rem;letter-spacing:.1em">DEMO VERSION — Act One Only</div>':''}
    <pre style="font-size:.62rem;color:var(--border-mid);white-space:pre;line-height:1.3;margin-bottom:3rem">
            ___
       ____/ | \\____
  ~~~~|______________|~~~~
    ~~~~~~~~~~~~~~~~~~~~~~~~~~</pre>
    <div style="font-size:.78rem;color:${replay?'var(--cold-dim)':'var(--dim)'};letter-spacing:.12em;font-style:italic;margin-bottom:2rem">${replay?'another crossing.':'a crossing.'}</div>
    <div style="display:flex;flex-direction:column;gap:.6rem;align-items:center">
      ${hasSave?`<button class="btn" onclick="continueGame()">Continue crossing</button>
                 <button class="btn btn-sm" onclick="G.phase='mode';render()">New crossing</button>`
               :`<button class="btn" onclick="G.phase='mode';render()">Begin the crossing</button>`}
    </div>
    ${replay?`<div style="margin-top:.8rem;font-size:.66rem;color:var(--dim);letter-spacing:.1em">crossing ${G.playCount+1}</div>`:''}
    <div style="margin-top:2.5rem;display:flex;gap:.8rem;justify-content:center">
      <button class="btn btn-sm" onclick="G.phase='memorial';render()" style="color:var(--cold-dim)">the memorial</button>
      <button class="btn btn-sm" onclick="absoluteReset()" style="color:var(--border-mid);font-size:.6rem">reset all</button>
    </div>
  `;
  root.appendChild(d);
}
function continueGame(){if(loadGame())render();else{G.phase='mode';render();}}
function absoluteReset(){
  if(!confirm('Reset all crossings to zero? This cannot be undone.'))return;
  try{localStorage.removeItem(SAVE_KEY);localStorage.removeItem(PLAY_KEY);localStorage.removeItem(FLAGS_KEY);}catch(e){}
  G={phase:'title',mode:'attended',stats:{vigilance:0,composure:0,communion:0,doubt:0},charisms:[],cover:{posting:null,background:null,denomination:null,connection:null,left:null},coverIntegrity:3,soundings:{available:[],taken:[],settled:[]},soundingPending:null,notes:[],flags:new Set(),scene:'chapel_waking',lastReaction:null,panelOpen:null,confirmRestart:false,tutorialDone:false,playCount:0,pastFlags:[]};
  render();
}

function renderMode(root){
  const d=document.createElement('div');d.className='sel-screen';
  d.innerHTML=`<div class="sel-h">How will you cross?</div>
    <div class="sel-sub">Can be changed on a new crossing.</div>
    <div class="sel-grid">
      <div class="sel-opt${G.mode==='attended'?' chosen':''}" onclick="G.mode='attended';render()">
        <div class="sel-name">First Crossing</div>
        <div class="sel-desc">Mechanics visible. Locked choices show their requirements.</div>
      </div>
      <div class="sel-opt${G.mode==='open'?' chosen':''}" onclick="G.mode='open';render()">
        <div class="sel-name">Open Water</div>
        <div class="sel-desc">Less held. Locked choices are simply absent.</div>
      </div>
    </div>
    <button class="btn" onclick="G.phase='charism';render()">Continue</button>`;
  root.appendChild(d);
}

function selCharism(id){
  const showWaking=G.playCount>=2,max=showWaking?2:1;
  if(G.charisms.includes(id)){G.charisms=G.charisms.filter(x=>x!==id);}
  else if(G.charisms.length<max){G.charisms=[...G.charisms,id];}
  render();
}
function renderCharism(root){
  const showWaking=G.playCount>=2,max=showWaking?2:1;
  const div=document.createElement('div');div.className='sel-screen';
  let html=`<div class="sel-h">A charism.</div>
    <div class="sel-sub">Not a skill. Something given — though it needs to be used to mean anything.
    ${showWaking?`<br><span style="color:var(--cold);font-size:.8rem">Something new is available. Choose up to two.</span>`:''}
    </div><div class="sel-section">Sleeping</div>`;
  CHARISMS.sleeping.forEach(c=>{html+=`<div class="sel-opt${G.charisms.includes(c.id)?' chosen-cold':''}" onclick="selCharism('${c.id}')"><div class="sel-name sel-name-cold">${c.name}</div><div class="sel-desc">${c.desc}</div></div>`;});
  if(showWaking){
    html+=`<div class="sel-section sel-section-cold">Waking</div>`;
    CHARISMS.waking.forEach(c=>{html+=`<div class="sel-opt${G.charisms.includes(c.id)?' chosen-cold':''}" onclick="selCharism('${c.id}')"><div class="sel-name sel-name-cold">${c.name}</div><div class="sel-desc">${c.desc}</div></div>`;});
  }
  html+=`<div style="font-size:.76rem;color:var(--dim);text-align:center;margin:.8rem 0">${G.charisms.length}/${max} chosen</div>`;
  html+=`<button class="btn btn-cold" style="margin-top:.5rem" ${G.charisms.length===0?'disabled':''} onclick="beginGame()">Board the ship</button>`;
  div.innerHTML=html;root.appendChild(div);
}
function beginGame(){
  if(!G.charisms.length)return;
  G.charisms.forEach(id=>addNote('charism_'+id));
  if(G.charisms.includes('kenosis'))offerSounding('kenosis_thought');
  if(G.charisms.includes('apophasis'))offerSounding('via_negativa');
  G.phase='game';G.scene='chapel_waking';refreshAtmosMods();render();
}

// ── TUTORIAL ─────────────────────────────────────────────────
function renderTutorial(root){
  const div=document.createElement('div');div.className='tutorial-overlay';
  div.innerHTML=`<div class="tutorial-box">
    <div class="tutorial-h">Before you board</div>
    <div class="tutorial-item"><strong>Status bar</strong> — top of screen. Four stats: Vigilance, Composure, Communion, Doubt. Hover each for details. They open and close choices.</div>
    <div class="tutorial-item"><strong>The Breviary</strong> <span class="key">breviary</span> — centre bottom. Soundings are contemplations that surface through choices. Take them deliberately. They develop over time and settle into permanent effects. Four slots total.</div>
    <div class="tutorial-item"><strong>Observations</strong> <span class="key">observations</span> — right bottom. Notes from what you have found and who you have met.</div>
    <div class="tutorial-item"><strong>Status</strong> <span class="key">status</span> — left bottom. Your cover story, charisms, cover integrity, and crossing number.</div>
    <div class="tutorial-item"><strong>Abandon crossing</strong> — at the bottom of each scene. Ends the current crossing.</div>
    <button class="btn" style="margin-top:1.5rem;width:100%" onclick="dismissTutorial()">Board the ship</button>
  </div>`;
  root.appendChild(div);
}
function dismissTutorial(){G.tutorialDone=true;saveGame();render();}

// ── GAME RENDER ──────────────────────────────────────────────
function renderGame(root){
  if(!G.tutorialDone&&G.scene==='chapel_waking'){renderTutorial(root);return;}

  // Cover integrity: route to confrontation if compromised and in corridor
  if(hasFlag('cover_compromised')&&!hasFlag('cover_blown')&&G.scene==='corridor_first'){
    G.scene='merky_confrontation';
  }

  const scene=SCENES[G.scene];
  if(!scene){root.innerHTML+=`<p style="padding:2rem;color:var(--rust)">Scene not found: ${G.scene}</p>`;return;}
  setMood(scene.mood||'neutral');saveGame();

  const visitKey='visited_'+G.scene,isFirstVisit=!hasFlag(visitKey);
  if(isFirstVisit){
    setFlag(visitKey);
    if(scene.on_enter){
      if(scene.on_enter.note)addNote(scene.on_enter.note);
      if(scene.on_enter.flag)setFlag(scene.on_enter.flag);
      if(scene.on_enter.thought)offerSounding(scene.on_enter.thought);
    }
  }

  const wrap=document.createElement('div');wrap.className='game';

  // Header
  const hdr=document.createElement('div');hdr.className='game-header';
  const si=document.createElement('div');si.className='save-indicator';si.textContent='◦ autosaved';si.style.display='none';hdr.appendChild(si);
  const moodCls=scene.mood==='uncanny'?' uncanny':scene.mood==='revelation'?' revelation':'';
  const lb=document.createElement('div');lb.className='location-bar'+moodCls;lb.textContent=scene.location;hdr.appendChild(lb);
  // Stats with tooltips
  const sb=document.createElement('div');sb.className='sbar';
  Object.entries(G.stats).forEach(([k,v])=>{
    const d=document.createElement('div');d.className='stat';
    d.innerHTML=k+' <span class="stat-val">'+v+'</span>'+(STAT_TIPS[k]?'<span class="stat-tip">'+STAT_TIPS[k]+'</span>':'');
    sb.appendChild(d);
  });
  hdr.appendChild(sb);
  // Tags
  const tags=[];
  G.charisms.forEach(id=>{const c=findCharism(id);if(c)tags.push('<span class="ctag">'+c.name+'</span>');});
  const cc=Object.values(G.cover).filter(Boolean).length;if(cc>0)tags.push('<span class="cover-tag">cover '+cc+'/5</span>');
  // Cover integrity indicator
  if(G.coverIntegrity<3){
    const ci=G.coverIntegrity===0?'blown':G.coverIntegrity===1?'thin':'questioned';
    tags.push(`<span class="cover-tag" style="border-color:var(--rust);color:var(--rust)">cover ${ci}</span>`);
  }
  const tc=G.soundings.taken.length+G.soundings.settled.length,ta=G.soundings.available.length;
  if(tc>0||ta>0)tags.push('<span class="breviary-tag">⚓ '+tc+'/'+MAX_SOUNDINGS+(ta?' +'+ta:'')+'</span>');
  if(tags.length){const cb=document.createElement('div');cb.className='cbar';cb.innerHTML=tags.join('');hdr.appendChild(cb);}
  wrap.appendChild(hdr);

  // Body
  const body=document.createElement('div');body.className='game-body';
  if(scene.art&&ART[scene.art]){const art=document.createElement('pre');art.className='art-block';art.textContent=ART[scene.art];body.appendChild(art);}
  if(G.lastReaction){
    const rp=document.createElement('p');rp.className='sp sp-reaction';rp.textContent=G.lastReaction;body.appendChild(rp);
    G.lastReaction=null;
  }

  // Text with anamnesis ghost injection
  let rawText=typeof scene.text==='function'?scene.text(G):scene.text;
  rawText=injectGhostText(rawText,G.scene);
  const stxt=document.createElement('div');stxt.className='stxt';
  const showAnam=G.playCount>0&&scene.anamnesis;
  rawText.forEach((raw,idx)=>{
    if(typeof raw==='string'&&raw.startsWith('__GHOST__:')){
      const gp=document.createElement('p');gp.className='sp sp-ghost';
      gp.textContent=raw.replace('__GHOST__:','');stxt.appendChild(gp);return;
    }
    const p=document.createElement('p');p.className='sp';p.innerHTML=processText(raw);stxt.appendChild(p);
    if(showAnam&&scene.anamnesis&&scene.anamnesis.after===idx){
      const ap=document.createElement('p');ap.className='sp sp-anamnesis';ap.innerHTML=processText(scene.anamnesis.text);stxt.appendChild(ap);
      if(scene.anamnesis.note)addNote(scene.anamnesis.note);
    }
  });
  body.appendChild(stxt);

  // Choices
  const cd=document.createElement('div');cd.className='choices';
  if(scene.return_to){const rb=document.createElement('button');rb.className='choice choice-return';rb.textContent=scene.return_label||'Return.';rb.onclick=()=>navigate(scene.return_to);cd.appendChild(rb);}
  scene.choices.forEach(ch=>{
    if(ch.hide_if&&hasFlag(ch.hide_if))return;
    if(ch.show_if&&!hasFlag(ch.show_if))return;
    if(ch.once&&ch.next&&hasFlag('visited_'+ch.next))return;
    const btn=document.createElement('button');let locked=false;
    if(ch.requires_flag&&!hasFlag(ch.requires_flag))locked=true;
    if(ch.requires_stat){const[s,m]=ch.requires_stat;if((G.stats[s]||0)<m)locked=true;}
    if(ch.requires_charism&&!hasCharism(ch.requires_charism))locked=true;
    if(ch.requires_playcount!==undefined&&G.playCount<ch.requires_playcount)locked=true;
    if(ch.requires_charism==='kenosis'&&G.coverIntegrity>=8)locked=true;
    // Cover integrity: if carrying too much false self, Kenosis is harder to use
    if(ch.requires_charism==='kenosis'&&G.coverIntegrity>=8)locked=true;
    if(ch.requires_playcount!==undefined&&G.playCount<ch.requires_playcount)locked=true;
    if(locked){
      if(G.mode==='open')return;
      btn.className='choice choice-locked';btn.disabled=true;
      let hint=processText(ch.text);
      if(ch.requires_stat)hint+=` [${ch.requires_stat[0]} ${ch.requires_stat[1]}+]`;
      if(ch.requires_charism)hint+=` [charism: ${ch.requires_charism}]`;
      if(ch.requires_playcount!==undefined)hint+=` [crossing ${ch.requires_playcount+1}+]`;
      btn.textContent=hint;
    }else{
      const tv=ch.next&&hasFlag('visited_'+ch.next)&&scene.hub;
      let cls='choice';
      if(ch.style==='cold')cls+=' choice-cold';
      if(ch.style==='return')cls+=' choice-return';
      if(ch.style==='vespers')cls+=' choice-vespers';
      if(ch.cover_set)cls+=' choice-cover';
      if(ch.requires_charism)cls+=' choice-charism';
      if(tv)cls+=' choice-visited';
      btn.className=cls;btn.innerHTML=(tv?'◦ ':'')+processText(ch.text);
      if(ch.cover_set&&!hasFlag('cover_'+ch.cover_set.key+'_set')){const lbl=document.createElement('span');lbl.className='cover-label';lbl.textContent='⬥ establishing cover';btn.appendChild(lbl);}
      if(ch.requires_charism){const lbl=document.createElement('span');lbl.className='charism-label';lbl.textContent='◈ '+ch.requires_charism;btn.appendChild(lbl);}
      btn.onclick=()=>applyChoice(ch);
    }
    cd.appendChild(btn);
  });
  body.appendChild(cd);

  // Observations
  if(G.notes.length){
    const od=document.createElement('div');od.className='obs-section';
    const ot=document.createElement('div');ot.className='obs-title';ot.textContent='observations';od.appendChild(ot);
    const cats=[
      {label:'People',  test:k=>k.startsWith('met_')},
      {label:'Cover',   test:k=>k.startsWith('cover_')},
      {label:'Events',  test:k=>!k.startsWith('met_')&&!k.startsWith('cover_')&&!k.startsWith('charism_')},
    ];
    const shown=new Set();
    cats.forEach(cat=>{
      const items=[...G.notes].reverse().filter(k=>cat.test(k)&&!shown.has(k)).slice(0,3);
      if(!items.length)return;
      const sec=document.createElement('div');sec.style.cssText='font-size:.6rem;color:var(--amber-dim);letter-spacing:.12em;text-transform:uppercase;margin:.4rem 0 .2rem;';sec.textContent=cat.label;od.appendChild(sec);
      items.forEach(k=>{shown.add(k);const d=document.createElement('div');d.className='obs-item';d.textContent='• '+noteLabel(k);od.appendChild(d);});
    });
    body.appendChild(od);
  }

  // Restart
  const rb2=document.createElement('div');rb2.className='restart-bar';
  if(G.confirmRestart){
    const msg=document.createElement('span');msg.className='confirm-msg';msg.textContent='End this crossing?';rb2.appendChild(msg);
    const yes=document.createElement('button');yes.className='btn confirm-yes';yes.textContent='Yes — return to shore';yes.onclick=doRestart;rb2.appendChild(yes);
    const no=document.createElement('button');no.className='btn confirm-no';no.textContent='No — continue';no.onclick=()=>{G.confirmRestart=false;render();};rb2.appendChild(no);
  }else{
    const rbt=document.createElement('button');rbt.className='btn restart-btn';rbt.textContent='abandon crossing';rbt.onclick=()=>{G.confirmRestart=true;render();};rb2.appendChild(rbt);
  }
  body.appendChild(rb2);wrap.appendChild(body);root.appendChild(wrap);

  const gb=document.createElement('button');gb.style.cssText='position:fixed;bottom:3.4rem;right:1.2rem;background:rgba(10,14,20,0.85);border:1px solid var(--border);font-family:\'Courier Prime\',monospace;font-size:.62rem;letter-spacing:.08em;padding:.3rem .55rem;cursor:pointer;color:var(--dim);z-index:100;';gb.textContent='glossary';gb.onclick=()=>openPanel('glossary');root.appendChild(gb);
  const nb=document.createElement('button');nb.className='notes-btn';nb.textContent='observations';nb.onclick=()=>openPanel('notes');root.appendChild(nb);
  const sb2=document.createElement('button');sb2.className='status-btn';sb2.textContent='status';sb2.onclick=()=>openPanel('status');root.appendChild(sb2);
  const bb=document.createElement('button');bb.className='breviary-btn'+(G.soundings.available.length?' has-available':'');bb.textContent='breviary';bb.onclick=()=>openPanel('breviary');root.appendChild(bb);
  if(G.panelOpen==='notes')renderNotesPanel(root);
  if(G.panelOpen==='status')renderStatusPanel(root);
  if(G.panelOpen==='breviary')renderBreviaryPanel(root);
  if(G.panelOpen==='glossary')renderGlossaryPanel(root);
}

function navigate(id){
  const isNew=!hasFlag('visited_'+id);
  G.scene=id;if(isNew)tickSoundings();window.scrollTo(0,0);render();
}
function applyChoice(ch){
  applyEffect(ch.effect);
  if(ch.set_flag)setFlag(ch.set_flag);if(ch.set_flag2)setFlag(ch.set_flag2);
  if(ch.set_note)addNote(ch.set_note);if(ch.cover_set)setCover(ch.cover_set.key,ch.cover_set.value);
  if(ch.thought)offerSounding(ch.thought);
  // Cover roll on cover-challenging choices
  if(ch.cover_check){
    const result=rollCover(ch.cover_check);
    if(result==='failure')degradeCover(1);
    else if(result==='partial'&&ch.cover_partial)setFlag(ch.cover_partial);
    G.lastReaction=ch.reaction||(result==='success'?null:result==='partial'?'Something in their expression shifts. Not accusation. Attention.':'They hold the answer for a moment too long.');
  }else{
    G.lastReaction=ch.reaction||null;
  // Cover integrity: using cover charism options raises it; sincerity moments lower it
  if(ch.cover_set&&hasCharism('cover'))G.coverIntegrity=Math.min(10,G.coverIntegrity+1);
  if(ch.set_flag==='cover_integrity_reduced')G.coverIntegrity=Math.max(0,G.coverIntegrity-2);
  }
  if(ch.next==='__new_play__'){newPlay();return;}
  if(ch.next&&ch.next.startsWith('pavel_'))setFlag('met_pavel_flag');
  navigate(ch.next);
}
function newPlay(){
  commitPlay();
  G.stats={vigilance:0,composure:0,communion:0,doubt:0};G.charisms=[];
  G.soundings={available:[],taken:[],settled:[]};G.soundingPending=null;
  G.cover={posting:null,background:null,denomination:null,connection:null,left:null};
  G.coverIntegrity=3;
  G.notes=[];G.flags=new Set();G.scene='chapel_waking';
  G.lastReaction=null;G.phase='charism';G.panelOpen=null;G.confirmRestart=false;
  refreshAtmosMods();render();
}
function doRestart(){
  commitPlay();try{localStorage.removeItem(SAVE_KEY);}catch(e){}
  G.phase='title';G.flags=new Set();G.notes=[];
  G.stats={vigilance:0,composure:0,communion:0,doubt:0};G.charisms=[];
  G.soundings={available:[],taken:[],settled:[]};G.soundingPending=null;
  G.cover={posting:null,background:null,denomination:null,connection:null,left:null};
  G.coverIntegrity=3;G.lastReaction=null;G.panelOpen=null;G.confirmRestart=false;G.scene='chapel_waking';
  refreshAtmosMods();render();
}
function openPanel(w){G.panelOpen=G.panelOpen===w?null:w;render();}
function mkOverlay(fn){const o=document.createElement('div');o.className='overlay-bg';o.onclick=fn;return o;}

function renderNotesPanel(root){
  const p=document.createElement('div');p.className='side-panel side-panel-r';
  const h=document.createElement('h3');h.style.color='var(--amber)';
  h.innerHTML='<button class="panel-close" onclick="openPanel(\'notes\')">✕</button>Observations';p.appendChild(h);
  if(!G.notes.length){const d=document.createElement('div');d.className='panel-empty';d.textContent='Nothing noted yet.';p.appendChild(d);}
  else{
    const cats=[
      {label:'People',   test:k=>k.startsWith('met_')},
      {label:'Cover',    test:k=>k.startsWith('cover_')},
      {label:'Charisms', test:k=>k.startsWith('charism_')},
      {label:'Events',   test:k=>!k.startsWith('met_')&&!k.startsWith('cover_')&&!k.startsWith('charism_')},
    ];
    const shown=new Set();
    cats.forEach(cat=>{
      const items=[...G.notes].reverse().filter(k=>cat.test(k)&&!shown.has(k));
      if(!items.length)return;
      const sec=document.createElement('div');sec.className='panel-sec';sec.textContent=cat.label;p.appendChild(sec);
      items.forEach(k=>{shown.add(k);const d=document.createElement('div');d.className='panel-item';d.textContent='• '+noteLabel(k);p.appendChild(d);});
    });
  }
  root.appendChild(mkOverlay(()=>openPanel('notes')));root.appendChild(p);
}

function renderStatusPanel(root){
  const cl={posting:'Reason here',background:'Prior work',denomination:'Declared tradition',connection:'Claims to know',left:'Left behind'};
  const coverLabels={posting_requested:'Requested posting',posting_assigned:'Assigned — no choice',posting_escape:'Needed to leave',posting_summoned:'Summoned by someone',bg_teacher:'Former teacher',bg_medical:'Medical background',bg_functionary:'Civil service',bg_scholar:'Long-term student',denom_orthodox:'Orthodox',denom_protestant:'Protestant',denom_ecumenical:'Ecumenical',denom_catholic:'Catholic'};
  const p=document.createElement('div');p.className='side-panel side-panel-l';
  const h=document.createElement('h3');h.style.color='var(--cold)';
  h.innerHTML='<button class="panel-close" onclick="openPanel(\'status\')">✕</button>Status';p.appendChild(h);
  const addSec=t=>{const s=document.createElement('div');s.className='panel-sec';s.textContent=t;p.appendChild(s);};
  const addRow=(a,b,bc)=>{const r=document.createElement('div');r.className='stat-row';r.innerHTML=`<span class="stat-label">${a}</span><span style="color:${bc||'var(--bright)'};font-weight:bold;font-size:.86rem">${b}</span>`;p.appendChild(r);};
  addSec('Stats');Object.entries(G.stats).forEach(([k,v])=>addRow(k,v));
  addSec('Charisms');
  if(!G.charisms.length){const d=document.createElement('div');d.className='panel-empty';d.textContent='None.';p.appendChild(d);}
  else G.charisms.forEach(id=>{const c=findCharism(id);if(!c)return;const d=document.createElement('div');d.className='panel-item';d.innerHTML='<strong style="color:var(--cold)">'+c.name+'</strong><br>'+c.desc;p.appendChild(d);});
  // Cover integrity
  addSec('Cover');
  const intLabelMap={3:'Intact',2:'Questioned',1:'Thin',0:'Blown'};
  const intColMap={3:'var(--amber)',2:'var(--amber-dim)',1:'var(--rust)',0:'var(--rust)'};
  addRow('Integrity',intLabelMap[G.coverIntegrity]||G.coverIntegrity,intColMap[G.coverIntegrity]);
  Object.entries(G.cover).forEach(([k,v])=>{const val=v?(coverLabels[v]||v.replace(/_/g,' ')):'—';addRow(cl[k]||k,val,v?'var(--amber)':'var(--dim)');});
  addSec('Crossing');addRow('number',G.playCount+1);
  root.appendChild(mkOverlay(()=>openPanel('status')));root.appendChild(p);
}

function renderBreviaryPanel(root){
  const p=document.createElement('div');p.className='side-panel side-panel-c';
  const taken=G.soundings.taken.length,settled=G.soundings.settled.length,total=taken+settled;
  const h=document.createElement('h3');h.style.color='var(--thought)';
  h.innerHTML=`<button class="panel-close" onclick="G.soundingPending=null;openPanel('breviary')">✕</button>The Breviary <span class="breviary-count">${total}/${MAX_SOUNDINGS} soundings taken</span>`;
  p.appendChild(h);
  if(G.soundingPending){
    const pd=SOUNDINGS[G.soundingPending];const warn=document.createElement('div');
    warn.className='breviary-warn';warn.textContent='Breviary full. To take "'+pd.name+'", suspend or release a sounding below.';p.appendChild(warn);
  }
  if(G.soundings.available.length){
    const s=document.createElement('div');s.className='panel-sec';s.textContent='Available — not yet taken';p.appendChild(s);
    G.soundings.available.forEach(id=>{
      const snd=SOUNDINGS[id];if(!snd)return;
      const card=document.createElement('div');card.className='sounding-card';
      const effectStr=snd.effect?Object.entries(snd.effect).map(([k,v])=>(v>0?'+':'')+v+' '+k).join(', '):'';
      card.innerHTML='<div class="sounding-name">'+snd.name+'</div><div class="sounding-fragment">'+snd.fragment+'</div><div class="sounding-origin">'+snd.origin+'</div><div class="sounding-body">'+processText(snd.taking)+'</div>'+(effectStr?'<div class="sounding-preview">When settled: '+effectStr+'</div>':'');
      const full=soundingSlotsFull()&&!G.soundingPending;
      const btn=document.createElement('button');btn.className='sounding-btn sounding-btn-take';
      btn.textContent=full?'Breviary full — suspend or release first':'Take this sounding';
      btn.disabled=full;if(!full)btn.onclick=()=>takeSounding(id);
      card.appendChild(btn);p.appendChild(card);
    });
  }
  if(G.soundings.taken.length){
    const s=document.createElement('div');s.className='panel-sec';s.textContent='Taking — in progress';p.appendChild(s);
    G.soundings.taken.forEach(({id,progress})=>{
      const snd=SOUNDINGS[id];if(!snd)return;
      const card=document.createElement('div');card.className='sounding-card';
      card.innerHTML='<div class="sounding-name">'+snd.name+'</div><div class="sounding-progress">'+soundingBar(progress)+' '+progress+'/'+SOUNDING_THRESHOLD+'</div><div class="sounding-body">'+processText(snd.taking)+'</div>';
      const btns=document.createElement('div');btns.style.cssText='display:flex;gap:.4rem;margin-top:.5rem;';
      const susp=document.createElement('button');susp.className='sounding-btn sounding-btn-suspend';susp.textContent='Suspend';susp.onclick=()=>suspendSounding(id);btns.appendChild(susp);
      const rel=document.createElement('button');rel.className='sounding-btn sounding-btn-release';rel.textContent='Release (permanent)';rel.onclick=()=>{if(confirm('Release "'+snd.name+'"?\nThis sounding will be lost permanently.'))releaseSounding(id);};btns.appendChild(rel);
      card.appendChild(btns);p.appendChild(card);
    });
  }
  if(G.soundings.settled.length){
    const s=document.createElement('div');s.className='panel-sec';s.textContent='Settled';p.appendChild(s);
    G.soundings.settled.forEach(id=>{
      const snd=SOUNDINGS[id];if(!snd)return;
      const card=document.createElement('div');card.className='sounding-card sounding-settled';
      card.innerHTML='<div class="sounding-name">'+snd.name+' ●</div><div class="sounding-body">'+processText(snd.settled)+'</div><div class="sounding-effect">'+snd.effect_desc+'</div>';
      p.appendChild(card);
    });
  }
  if(!total&&!G.soundings.available.length){
    const d=document.createElement('div');d.className='panel-empty';d.textContent='No soundings yet. They surface through choices — and must be deliberately taken.';p.appendChild(d);
  }
  root.appendChild(mkOverlay(()=>{G.soundingPending=null;openPanel('breviary');}));root.appendChild(p);
}

// ── MEMORIAL SCREEN ──────────────────────────────────────────
function returnToTitle(){G.phase='title';render();}
function renderMemorial(root) {
  try {
    const endings = JSON.parse(localStorage.getItem(ENDINGS_KEY)||'[]');
    const plays = parseInt(localStorage.getItem(PLAY_KEY)||'0');
    const endingNames = { intercept: 'Intercept — authentication signed', facilitate: 'Facilitate — return enabled', witness: 'Witness — delay created' };
    const div = document.createElement('div'); div.className = 'sel-screen'; div.style.animation = 'fi .4s ease';
    let html = '<div class="sel-h" style="color:var(--cold)">The Memorial</div>';
    html += `<div style="font-size:.82rem;color:var(--dim);text-align:center;margin-bottom:2rem;font-style:italic">Crossings completed: ${plays}</div>`;
    if (!endings.length) {
      html += '<div style="font-size:.84rem;color:var(--dim);text-align:center;font-style:italic;margin-bottom:2rem">No crossings recorded yet.</div>';
    } else {
      html += '<div class="panel-sec" style="text-align:center">Endings reached</div>';
      const seen = new Set();
      endings.forEach(e => {
        if (!seen.has(e.ending)) {
          seen.add(e.ending);
          html += `<div style="border:1px solid var(--border-mid);padding:.8rem 1rem;margin-bottom:.6rem;background:rgba(10,14,20,0.5)">
            <div style="font-size:.88rem;color:var(--cold);margin-bottom:.3rem">${endingNames[e.ending]||e.ending}</div>
            <div style="font-size:.74rem;color:var(--dim)">First reached: crossing ${e.play+1}${e.charisms&&e.charisms.length?' · charism: '+e.charisms.join(', '):''}</div>
          </div>`;
        }
      });
      const endingSet = new Set(endings.map(e=>e.ending));
      const missing = ['intercept','facilitate','witness'].filter(e=>!endingSet.has(e));
      if (missing.length) {
        html += '<div style="font-size:.76rem;color:var(--border-mid);font-style:italic;margin-top:.5rem">';
        missing.forEach(e => { html += `<div>— ${endingNames[e]} (not yet reached)</div>`; });
        html += '</div>';
      }
    }
    html += '<button class="btn btn-sm" style="margin-top:2rem;display:block" onclick="returnToTitle()">Return</button>';
    div.innerHTML = html; root.appendChild(div);
  } catch(e) { root.innerHTML += '<p style="padding:2rem;color:var(--rust)">Memorial unavailable.</p>'; }
}

// ── GLOSSARY PANEL ────────────────────────────────────────────
function closeGlossary(){openPanel('glossary');}
function renderGlossaryPanel(root) {
  const p = document.createElement('div'); p.className = 'side-panel side-panel-r';
  p.style.width = 'min(420px,94vw)';
  const h = document.createElement('h3'); h.style.color = 'var(--cold)';
  h.innerHTML = '<button class="panel-close" onclick="closeGlossary()">✕</button>Glossary'; p.appendChild(h);
  GLOSSARY.forEach(({term,def}) => {
    const d = document.createElement('div'); d.style.marginBottom = '1.1rem';
    d.innerHTML = `<div style="font-size:.84rem;color:var(--amber);margin-bottom:.25rem;font-family:'Special Elite',serif">${term}</div><div style="font-size:.8rem;color:var(--text);line-height:1.72">${def}</div>`;
    p.appendChild(d);
  });
  root.appendChild(mkOverlay(closeGlossary)); root.appendChild(p);
}


render();
