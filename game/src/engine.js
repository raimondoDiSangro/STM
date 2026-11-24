// ================= ENGINE =================
const W = 1280, H = 720, SH = 560;
const cv = document.getElementById('game');
const ctx = cv.getContext('2d');
let DPR = 1, BG = null, BGKEY = '';
const SC = {}, ACTORS = {}, ITEMS = {};
const S = { scene: null, inv: [], flags: {}, act: 0, player: 'sciac', ach: {}, count: {}, pos: null };
const RT = {
  actors: {}, verb: null, item: null, hover: null, mouse: { x: -1, y: -1 }, busy: 0,
  speech: null, dlg: null, mode: null, fade: 1, fadeTo: 1, fadeRes: null, fadeSpd: 4,
  toasts: [], t: 0, banner: null, hud: null, invOff: 0, uiHover: null, started: false
};
const rand = a => a[Math.floor(Math.random() * a.length)];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, k) => a + (b - a) * k;
const F = k => !!S.flags[k];
const setF = (k, v = true) => { S.flags[k] = v; };
const has = id => S.inv.includes(id);
const sleep = ms => new Promise(r => setTimeout(r, ms));

function give(id, quiet) {
  if (!has(id)) S.inv.push(id);
  const n = S.inv.indexOf(id);
  RT.invOff = Math.max(0, Math.floor(n / 5) - 1) * 5;
  if (!quiet) { AU.sfx('pickup'); toast('Preso: ' + ITEMS[id].name, 'item'); }
}
function take(id) { S.inv = S.inv.filter(i => i !== id); if (RT.item === id) RT.item = null; RT.invOff = Math.min(RT.invOff, Math.max(0, (Math.ceil(S.inv.length / 5) - 2) * 5)); }

// ---------- achievements ----------
const ACH = {
  scarico: 'Scarico Perfetto — 50 sciacquate', santeramo: 'Santeramo — esiste? No.',
  estate: "Entro l'Estate Prossima", ecologista: 'Ecologista — la pineta ringrazia',
  cugino: 'Tengo nu Cugggino', matera: 'Matera, right?', ferroviere: 'Ferroviere — il treno è arrivato',
  emigrante: 'Emigrante', inaugurazione: 'Inaugurazione', pane: 'Duellante del Pane', fine: 'La Leggenda dello Sciacquone',
  cameriere: 'Cameriere di Gala', speleologo: 'Speleologo', santeramo2: 'Santeramo esiste davvero'
};
function achieve(k) {
  let a = {}; try { a = JSON.parse(localStorage.getItem('stm_ach') || '{}'); } catch (e) {}
  if (a[k]) return; a[k] = 1; S.ach[k] = 1;
  try { localStorage.setItem('stm_ach', JSON.stringify(a)); } catch (e) {}
  toast('Trofeo: ' + ACH[k], 'ach'); AU.sfx('ach');
  if (window.steam) try { window.steam.achieve('ACH_' + k.toUpperCase()); } catch (e) {}
}
function bump(k, n, ach) { S.count[k] = (S.count[k] || 0) + 1; if (S.count[k] >= n && ach) achieve(ach); return S.count[k]; }
function toast(text, kind) { RT.toasts.push({ text, kind, t0: RT.t }); }

// ---------- save ----------
function save() {
  if (!S.scene || RT.mode) return;
  const pl = RT.actors[S.player];
  try {
    localStorage.setItem('stm_save', JSON.stringify({ scene: S.scene, inv: S.inv, flags: S.flags, act: S.act, player: S.player, count: S.count, pos: pl ? [pl.x, pl.y, pl.dir] : null }));
  } catch (e) {}
}
function loadSave() { try { const s = JSON.parse(localStorage.getItem('stm_save')); return s && s.scene && SC[s.scene] ? s : null; } catch (e) { return null; } }

// ---------- sizing ----------
function resize() {
  const box = document.getElementById('wrap');
  const s = Math.min(box.clientWidth / W, box.clientHeight / H);
  cv.style.width = Math.floor(W * s) + 'px'; cv.style.height = Math.floor(H * s) + 'px';
  const d = clamp((window.devicePixelRatio || 1) * s, 0.75, 2);
  if (Math.abs(d - DPR) > 0.05 || !cv.width) { DPR = d; cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR); BG = null; }
}
window.addEventListener('resize', resize);

// ---------- actors ----------
function mkActor(id, x, y, dir, scale) {
  return { id, x, y, dir: dir || 1, tx: x, ty: y, walking: false, phase: 0, talk: 0, fixedScale: scale, res: null, hidden: false };
}
function scaleAt(y) {
  const sc = SC[S.scene]; if (!sc || !sc.walk) return 1;
  const [s0, s1] = sc.scale || [0.85, 1];
  const k = clamp((y - sc.walk.y0) / Math.max(1, sc.walk.y1 - sc.walk.y0), 0, 1);
  return lerp(s0, s1, k);
}
function aScale(a) { return a.fixedScale || scaleAt(a.y); }
function clampWalk(x, y) {
  const w = SC[S.scene].walk; if (!w) return [x, y];
  return [clamp(x, w.x0, w.x1), clamp(y, w.y0, w.y1)];
}
function walkTo(id, x, y) {
  const a = RT.actors[id]; if (!a) return Promise.resolve();
  [x, y] = clampWalk(x, y);
  if (Math.hypot(a.x - x, a.y - y) < 4) { a.walking = false; return Promise.resolve(); }
  if (a.res) a.res();
  a.tx = x; a.ty = y; a.walking = true; a.dir = x < a.x ? -1 : 1;
  return new Promise(r => a.res = r);
}
function face(id, x) { const a = RT.actors[id]; if (a) a.dir = x < a.x ? -1 : 1; }
function hideActor(id, h = true) { if (RT.actors[id]) RT.actors[id].hidden = h; }
function addActor(id, x, y, dir, scale) { RT.actors[id] = mkActor(id, x, y, dir, scale); return RT.actors[id]; }

// ---------- speech ----------
function say(id, text, ms) {
  return new Promise(res => {
    const dur = ms || clamp(text.length * 58, 1400, 7000);
    RT.speech = { id, text, end: RT.t + dur / 1000, res };
    const a = RT.actors[id]; if (a) a.talk = 1;
  });
}
const P = t => say(S.player, t);
function skipSpeech() { if (RT.speech) RT.speech.end = RT.t; }
async function line(id, ...ts) { for (const t of ts) await say(id, t); }

// ---------- fade / banner ----------
function fadeTo(v, spd = 4) { RT.fadeTo = v; RT.fadeSpd = spd; return new Promise(r => { if (Math.abs(RT.fade - v) < 0.01) r(); else RT.fadeRes = r; }); }
function banner(title, sub, ms = 3200) { RT.banner = { title, sub, t0: RT.t, dur: ms / 1000 }; return sleep(ms); }

// ---------- scene switching ----------
function enterScene(id, x, y, dir) {
  const sc = SC[id]; S.scene = id; RT.actors = {}; BG = null; RT.hover = null; RT.wait = null; RT.hud = null;
  if (!sc.noPlayer) {
    const p = x == null ? (sc.start || [640, (sc.walk.y0 + sc.walk.y1) / 2]) : [x, y];
    const [px, py] = clampWalk(p[0], p[1]);
    addActor(S.player, px, py, dir || 1);
    if (F('duo')) { const o = S.player === 'sciac' ? 'santino' : 'sciac'; const [ox, oy] = clampWalk(px - 90 * (dir || 1), py + 6); addActor(o, ox, oy, dir || 1); }
  }
  (sc.npcs ? sc.npcs() : []).forEach(n => addActor(...n));
  AU.setMood(sc.mood, sc.amb);
  save();
}
async function goto(id, x, y, dir) {
  RT.busy++;
  try {
    await fadeTo(1, 5); enterScene(id, x, y, dir); await sleep(60); await fadeTo(0, 4);
    const sc = SC[id]; if (sc.enter) await sc.enter();
  } finally { RT.busy--; }
}
async function run(fn) {
  RT.busy++;
  try { await fn(); } catch (e) { console.error(e); } finally { RT.busy--; RT.verb = null; RT.item = null; save(); }
}

// ---------- picking ----------
function hotRect(h) { return typeof h.r === 'function' ? h.r() : h.r; }
function actorRect(a) {
  const s = aScale(a), d = ACTORS[a.id];
  const w = (d.w || 70) * s, hh = (d.h || 210) * s;
  return [a.x - w / 2, a.y - hh, w, hh];
}
function inR(x, y, r) { return r && x >= r[0] && y >= r[1] && x <= r[0] + r[2] && y <= r[1] + r[3]; }
function pick(x, y) {
  if (y >= SH) return null;
  const sc = SC[S.scene];
  const acts = Object.values(RT.actors).filter(a => a.id !== S.player && !a.hidden && !ACTORS[a.id].noPick).sort((a, b) => b.y - a.y);
  for (const a of acts) if (inR(x, y, actorRect(a))) {
    const d = ACTORS[a.id], pl = RT.actors[S.player];
    let at = d.at ? d.at() : null;
    if (!at && pl) { const s = aScale(a); at = [a.x + (pl.x < a.x ? -100 : 100) * s, a.y]; }
    return { kind: 'actor', id: a.id, ref: d, name: d.name, at };
  }
  const hs = (sc.hot || []).filter(h => !h.cond || h.cond());
  // smallest hotspot under the cursor wins, so small objects on top of big areas stay clickable
  let best = null, bestA = Infinity;
  for (const h of hs) { const r = hotRect(h); if (inR(x, y, r) && r[2] * r[3] < bestA) { best = h; bestA = r[2] * r[3]; } }
  if (best) { const h = best; return { kind: 'hot', id: h.id, ref: h, name: typeof h.name === 'function' ? h.name() : h.name, at: h.at ? (typeof h.at === 'function' ? h.at() : h.at) : null }; }
  return null;
}

// ---------- verbs ----------
const VERBS = [['guarda', 'Guarda'], ['prendi', 'Prendi'], ['usa', 'Usa'], ['parla', 'Parla'], ['dai', 'Dai'], ['sciacqua', 'Sciacqua']];
const VNAME = Object.fromEntries(VERBS);
const FAILS = {
  guarda: ['Niente di speciale. Come il piano urbanistico.', 'Lo guardo. Lui non guarda me.', 'Interessante quanto un consiglio comunale.'],
  prendi: ['Non posso prenderlo. È di proprietà comunale, cioè di nessuno.', 'Troppo pesante. Come la burocrazia.', 'Meglio di no. Qualcuno lo sta già rubando.'],
  usa: ['Questa idea è peggio del piano urbanistico.', 'Non funziona. Benvenuto in Murgia.', 'Non ha senso. Quindi a Gravina potrebbe diventare legge.'],
  parla: ['Ha più risposte di un consigliere comunale.', 'Silenzio. Almeno lui non promette niente.', 'Non mi risponde. Starà aspettando un timbro.'],
  dai: ['Non credo lo voglia.', 'Tienitelo, dice lo sguardo.', 'Non accetta regali. Solo raccomandazioni.'],
  sciacqua: ['Fluuush. Non è servito a niente, ma mi sento meglio.', "Fluuush! Lo sciacquone è l'unica opera pubblica che funziona.", 'Fluuush. Ho fatto più io in un secondo che la giunta in dieci anni.'],
  santinoSciac: ['Io non sciacquo, compà. Io mi profumo.', 'Lo sciacquone lo fa Sciacquone. Io faccio il manager.']
};
async function doAct(verb, hit, item) {
  const pl = RT.actors[S.player];
  if (hit.at && pl) await walkTo(S.player, hit.at[0], hit.at[1]);
  if (pl) { const r = hit.kind === 'actor' ? actorRect(RT.actors[hit.id]) : hotRect(hit.ref); face(S.player, r[0] + r[2] / 2); }
  const h = hit.ref;
  if (verb === 'vai' && h.exit) {
    if (h.exitIf) { const ok = await h.exitIf(); if (!ok) return; }
    const e = typeof h.exit === 'function' ? h.exit() : h.exit;
    return goto(e[0], e[1], e[2], e[3]);
  }
  if (verb === 'sciacqua') {
    if (S.player === 'santino') return P(rand(FAILS.santinoSciac));
    AU.sfx('flush'); bump('sciac', 50, 'scarico');
  }
  if (item && (verb === 'usa' || verb === 'dai')) {
    const tab = verb === 'usa' ? h.useWith : h.giveWith;
    const fn = tab && (tab[item] || tab['*']);
    if (fn) return fn(item);
    if (verb === 'dai' && hit.kind === 'hot') return P('Dare qualcosa a un oggetto? Nemmeno in Regione.');
    AU.sfx('fail'); return P(rand(FAILS[verb]));
  }
  const fn = h[verb];
  if (typeof fn === 'function') return fn();
  if (typeof fn === 'string') return P(fn);
  if (Array.isArray(fn)) return line(S.player, ...fn);
  if (verb === 'dai') return P('Dare cosa?');
  if (verb !== 'guarda' && verb !== 'sciacqua') AU.sfx('fail');
  return P(rand(FAILS[verb] || FAILS.usa));
}
function defaultVerb(hit) { const h = hit.ref; if (h.def) return h.def; if (h.exit) return 'vai'; return hit.kind === 'actor' ? 'parla' : 'guarda'; }

async function combine(a, b) {
  const A = ITEMS[a], B = ITEMS[b];
  const fn = (A.combine && A.combine[b]) || (B.combine && B.combine[a]);
  if (fn) return fn();
  AU.sfx('fail');
  return P(rand(['Unire ' + A.name.toLowerCase() + ' e ' + B.name.toLowerCase() + '? Neanche un assessore ci penserebbe.', 'Non si combinano. Come Gravina e Altamura.']));
}
async function invAct(verb, id) {
  const it = ITEMS[id];
  if (verb === 'guarda' || !verb) return P(typeof it.look === 'function' ? it.look() : it.look);
  if (verb === 'prendi') return P('Ce l\'ho già. Nel tutù.');
  if (verb === 'sciacqua') { if (S.player === 'santino') return P(rand(FAILS.santinoSciac)); AU.sfx('flush'); bump('sciac', 50, 'scarico'); return P(it.sciac || 'Meglio di no. Mi serve ancora.'); }
  if (verb === 'parla') return P(it.talk || 'Pronto? ...Non risponde. Come il Comune.');
  if (verb === 'usa' && it.use) return it.use();
  return P(rand(FAILS.usa));
}

// ---------- dialogue ----------
// opts: [{t, cond, once, id, run}] ; returns when an option returns 'end'
async function dialog(npc, opts, key) {
  key = key || npc;
  while (true) {
    const list = opts.filter((o, i) => (!o.cond || o.cond()) && !(o.once && F('dl_' + key + '_' + (o.id || i))));
    if (!list.length) return;
    const pickI = await new Promise(r => { RT.dlg = { list, res: r, hover: -1 }; });
    RT.dlg = null;
    const o = list[pickI];
    const idx = opts.indexOf(o);
    if (o.once) setF('dl_' + key + '_' + (o.id || idx));
    if (o.say !== false) await P(o.t);
    const r = o.run ? await o.run() : 'end';
    if (r === 'end') return;
  }
}
async function choose(options) { // simple one-shot choice, returns index
  const list = options.map(t => ({ t }));
  const i = await new Promise(r => { RT.dlg = { list, res: r, hover: -1 }; });
  RT.dlg = null; return i;
}

// ---------- modes (minigames / screens) ----------
function runMode(m) { return new Promise(res => { m.done = v => { RT.mode = null; res(v); }; RT.mode = m; if (m.init) m.init(); }); }

// ---------- input ----------
function toLocal(e) { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * H / r.height]; }
cv.addEventListener('pointermove', e => { const [x, y] = toLocal(e); RT.mouse.x = x; RT.mouse.y = y; if (RT.mode && RT.mode.move) RT.mode.move(x, y); else updateHover(); });
cv.addEventListener('contextmenu', e => e.preventDefault());
cv.addEventListener('pointerdown', e => {
  const [x, y] = toLocal(e); RT.mouse.x = x; RT.mouse.y = y; RT.lastClick = RT.t;
  AU.init();
  if (RT.mode) { RT.mode.click && RT.mode.click(x, y, e.button); return; }
  if (RT.speech) { skipSpeech(); return; }
  if (RT.dlg) { const i = dlgIndexAt(x, y); if (i >= 0) RT.dlg.res(i); return; }
  if (RT.busy) return;
  if (y >= SH) return uiClick(x, y, e.button);
  updateHover();
  const hit = RT.hover;
  if (e.button === 2) { if (hit) run(() => doAct('guarda', hit)); return; }
  if (hit) {
    const v = RT.verb || defaultVerb(hit); const it = RT.item;
    if ((v === 'usa' || v === 'dai') && !it && v === 'dai') { RT.verb = null; return run(() => P('Dare cosa? Scegli un oggetto.')); }
    run(() => doAct(v, hit, it));
  } else if (!SC[S.scene].noPlayer) {
    RT.verb = null; RT.item = null;
    const pl = RT.actors[S.player];
    if (pl) walkTo(S.player, x, y);
  }
});
window.addEventListener('keydown', e => {
  AU.init();
  if (RT.mode && RT.mode.key) { RT.mode.key(e.key); e.preventDefault(); return; }
  if (e.key === ' ' || e.key === 'Escape' || e.key === '.') { skipSpeech(); e.preventDefault(); }
  const m = { g: 'guarda', p: 'prendi', u: 'usa', t: 'parla', d: 'dai', s: 'sciacqua' }[e.key.toLowerCase()];
  if (m && !RT.busy && !RT.dlg) { RT.verb = m; RT.item = null; }
});
function updateHover() {
  const { x, y } = RT.mouse;
  RT.uiHover = null;
  if (RT.mode || !S.scene || !SC[S.scene]) { RT.hover = null; return; }
  if (y >= SH) { RT.hover = null; RT.uiHover = uiAt(x, y); return; }
  RT.hover = RT.busy ? null : pick(x, y);
}

// ---------- UI layout ----------
const UI = {
  verb: i => [18 + (i % 3) * 152, 594 + Math.floor(i / 3) * 60, 144, 52],
  slot: i => [492 + (i % 5) * 122, 594 + Math.floor(i / 5) * 60, 114, 52],
  up: [1106, 594, 34, 52], down: [1106, 654, 34, 52],
  btn: i => [1150, 590 + i * 42, 116, 36]
};
function uiButtons() {
  const b = [['anna', 'Anna'], ['sound', ['Silenzio', 'Solo effetti', 'Musica'][AU.level]]];
  if (F('duo')) b.push(['swap', S.player === 'sciac' ? '→ Santino' : '→ Sciacquone']);
  else b.push(['menu', 'Menu']);
  return b;
}
function uiAt(x, y) {
  if (RT.dlg) return null;
  for (let i = 0; i < 6; i++) if (inR(x, y, UI.verb(i))) return { t: 'verb', v: VERBS[i][0] };
  for (let i = 0; i < 10; i++) if (inR(x, y, UI.slot(i))) { const id = S.inv[RT.invOff + i]; if (id) return { t: 'inv', id }; }
  if (inR(x, y, UI.up)) return { t: 'up' }; if (inR(x, y, UI.down)) return { t: 'down' };
  const bs = uiButtons(); for (let i = 0; i < bs.length; i++) if (inR(x, y, UI.btn(i))) return { t: 'btn', id: bs[i][0] };
  return null;
}
function uiClick(x, y, btn) {
  const u = uiAt(x, y); if (!u) return;
  AU.sfx('click');
  if (u.t === 'inv' && btn === 2) return run(() => invAct('guarda', u.id));
  if (u.t === 'verb') { RT.verb = RT.verb === u.v ? null : u.v; RT.item = null; return; }
  if (u.t === 'up') { RT.invOff = Math.max(0, RT.invOff - 5); return; }
  if (u.t === 'down') { if (RT.invOff + 10 < S.inv.length) RT.invOff += 5; return; }
  if (u.t === 'inv') {
    const v = RT.verb;
    if ((v === 'usa' || v === 'dai') && RT.item && RT.item !== u.id) { const a = RT.item; return run(() => v === 'usa' ? combine(a, u.id) : P('Darlo a me stesso? Sarebbe come la giunta che si autopremia.')); }
    if (v === 'usa' || v === 'dai') { if (v === 'usa' && ITEMS[u.id].use) return run(() => invAct('usa', u.id)); RT.item = u.id; return; }
    if (!v) { RT.verb = 'usa'; RT.item = u.id; return; }
    return run(() => invAct(v, u.id));
  }
  if (u.t === 'btn') {
    if (u.id === 'sound') { AU.setLevel((AU.level + 2) % 3); return; }
    if (u.id === 'anna') return run(annaHint);
    if (u.id === 'swap') return swapPlayer();
    if (u.id === 'menu') return run(menuScreen);
  }
}
function swapPlayer() {
  if (RT.busy) return;
  S.player = S.player === 'sciac' ? 'santino' : 'sciac';
  RT.verb = null; RT.item = null; AU.sfx('swap');
  toast('Ora giochi con ' + ACTORS[S.player].name, 'item');
}
function sentence() {
  if (RT.dlg) return '';
  const v = RT.verb, it = RT.item;
  const hn = RT.hover ? RT.hover.name : (RT.uiHover && RT.uiHover.t === 'inv' ? ITEMS[RT.uiHover.id].name : '');
  if (!v) return hn ? (RT.hover ? (VNAME[defaultVerb(RT.hover)] || (defaultVerb(RT.hover) === 'vai' ? 'Vai a' : '')) + ' ' + hn : hn) : '';
  if (it) return VNAME[v] + ' ' + ITEMS[it].name + (v === 'usa' ? ' con ' : ' a ') + (hn && hn !== ITEMS[it].name ? hn : '…');
  return VNAME[v] + ' ' + hn;
}

// ---------- dialog option hit ----------
function dlgIndexAt(x, y) {
  if (!RT.dlg || y < SH + 18) return -1;
  const i = Math.floor((y - SH - 22) / 27);
  return i >= 0 && i < RT.dlg.list.length && x > 20 && x < 1130 ? i : -1;
}

// ---------- update ----------
let last = performance.now();
function update(dt) {
  RT.t += dt;
  // fade
  if (RT.fade !== RT.fadeTo) {
    const d = RT.fadeTo - RT.fade, st = RT.fadeSpd * dt;
    RT.fade = Math.abs(d) <= st ? RT.fadeTo : RT.fade + Math.sign(d) * st;
    if (RT.fade === RT.fadeTo && RT.fadeRes) { const r = RT.fadeRes; RT.fadeRes = null; r(); }
  }
  if (RT.mode) { RT.mode.update && RT.mode.update(dt); return; }
  // speech
  if (RT.speech && RT.t >= RT.speech.end) { const sp = RT.speech; RT.speech = null; const a = RT.actors[sp.id]; if (a) a.talk = 0; sp.res(); }
  // actors
  for (const a of Object.values(RT.actors)) {
    if (a.walking) {
      const s = aScale(a), sp = (ACTORS[a.id].speed || 230) * s * dt;
      const dx = a.tx - a.x, dy = (a.ty - a.y), d = Math.hypot(dx, dy * 1.6);
      if (d <= sp) { a.x = a.tx; a.y = a.ty; a.walking = false; if (a.res) { const r = a.res; a.res = null; r(); } }
      else { a.x += dx / d * sp; a.y += dy * 1.6 / d * sp / 1.6; a.phase += dt * 9; if (Math.abs(dx) > 2) a.dir = dx < 0 ? -1 : 1; }
    } else a.phase = 0;
  }
  // follower in duo mode
  if (F('duo')) {
    const o = RT.actors[S.player === 'sciac' ? 'santino' : 'sciac'], p = RT.actors[S.player];
    if (o && p && !o.walking && !RT.busy && Math.hypot(o.x - p.x, o.y - p.y) > 170 && !p.walking) walkTo(o.id, p.x - 95 * p.dir, p.y + 8);
  }
  if (SC[S.scene] && SC[S.scene].tick) SC[S.scene].tick(dt);
  RT.toasts = RT.toasts.filter(t => RT.t - t.t0 < 3.4);
  updateHover();
}

// ---------- render ----------
function buildBg() {
  const c = document.createElement('canvas'); c.width = Math.round(W * DPR); c.height = Math.round(SH * DPR);
  const g = c.getContext('2d'); g.scale(DPR, DPR); SEED(7);
  SC[S.scene].bg(g); finishBg(g); BG = c; BGKEY = S.scene + DPR;
}
function render() {
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  if (RT.mode && RT.mode.full) { RT.mode.draw(ctx, RT.t); drawToasts(); drawFade(); return; }
  if (!S.scene) { ctx.fillStyle = '#120c18'; ctx.fillRect(0, 0, W, H); drawFade(); return; }
  const sc = SC[S.scene];
  if (!BG || BGKEY !== S.scene + DPR) buildBg();
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, SH); ctx.clip();
  ctx.drawImage(BG, 0, 0, W, SH);
  if (sc.anim) sc.anim(ctx, RT.t);
  const list = [];
  for (const a of Object.values(RT.actors)) if (!a.hidden) list.push({ y: a.y, d: () => drawActor(ctx, a, RT.t) });
  for (const p of (sc.props || [])) if (!p.cond || p.cond()) list.push({ y: p.y, d: () => p.draw(ctx, RT.t) });
  list.sort((a, b) => a.y - b.y).forEach(o => o.d());
  if (sc.fg) sc.fg(ctx, RT.t);
  ctx.restore();
  drawSpeech(ctx);
  if (RT.hud) RT.hud(ctx, RT.t);
  drawUI(ctx);
  drawBanner(ctx);
  if (RT.mode && RT.mode.draw) RT.mode.draw(ctx, RT.t);
  drawToasts(); drawFade();
}
function drawFade() { if (RT.fade > 0.001) { ctx.fillStyle = 'rgba(10,6,14,' + RT.fade + ')'; ctx.fillRect(0, 0, W, H); } }
function drawBanner(g) {
  const b = RT.banner; if (!b) return;
  const k = (RT.t - b.t0) / b.dur; if (k > 1) { RT.banner = null; return; }
  const a = Math.min(1, k * 6, (1 - k) * 5);
  g.save(); g.globalAlpha = a;
  g.fillStyle = 'rgba(12,8,20,.72)'; g.fillRect(0, 190, W, 170);
  g.textAlign = 'center'; g.fillStyle = '#ffd98a'; g.font = '800 58px Eczar, Bitter, Georgia, serif'; g.fillText(b.title, W / 2, 272);
  if (b.sub) { g.fillStyle = '#f3e7d3'; g.font = '600 26px "Alegreya Sans", "Fira Sans", sans-serif'; g.fillText(b.sub, W / 2, 318); }
  g.restore();
}
function drawToasts() {
  RT.toasts.forEach((t, i) => {
    const k = RT.t - t.t0, a = Math.min(1, k * 5, (3.4 - k) * 3);
    ctx.save(); ctx.globalAlpha = Math.max(0, a); ctx.font = '700 20px "Alegreya Sans", "Fira Sans", sans-serif';
    const w = ctx.measureText(t.text).width + 36, x = W - w - 16, y = 16 + i * 46;
    ctx.fillStyle = t.kind === 'ach' ? 'rgba(120,60,10,.92)' : 'rgba(20,14,30,.85)'; rr(ctx, x, y, w, 38, 10); ctx.fill();
    ctx.fillStyle = t.kind === 'ach' ? '#ffd76a' : '#f4ead6'; ctx.textAlign = 'left'; ctx.fillText(t.text, x + 18, y + 26); ctx.restore();
  });
}
function rr(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
function wrapText(g, text, maxW) {
  const words = text.split(' '), lines = []; let cur = '';
  for (const w of words) { const t = cur ? cur + ' ' + w : w; if (g.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; }
  if (cur) lines.push(cur); return lines;
}
function drawSpeech(g) {
  const sp = RT.speech; if (!sp) return;
  const d = ACTORS[sp.id] || { color: '#fff' };
  g.save(); g.font = '800 25px "Alegreya Sans", "Fira Sans", sans-serif'; g.textAlign = 'center'; g.lineJoin = 'round';
  const lines = wrapText(g, sp.text, 560);
  let x = W / 2, y = 70;
  const a = RT.actors[sp.id];
  if (a && !a.hidden) { const r = actorRect(a); x = clamp(a.x, 300, W - 300); y = Math.max(40 + lines.length * 0, r[1] - 18 - (lines.length - 1) * 29); y = Math.max(y, 36); }
  else if (d.box) { g.fillStyle = 'rgba(15,10,24,.78)'; rr(g, W / 2 - 330, 24, 660, 26 + lines.length * 30, 12); g.fill(); y = 56; }
  lines.forEach((l, i) => { const yy = y + i * 29; g.lineWidth = 6; g.strokeStyle = 'rgba(10,6,16,.92)'; g.strokeText(l, x, yy); g.fillStyle = d.color || '#fff'; g.fillText(l, x, yy); });
  g.restore();
}
function drawUI(g) {
  g.save();
  const pg = g.createLinearGradient(0, SH, 0, H); pg.addColorStop(0, '#2a1d2e'); pg.addColorStop(1, '#160f1b');
  g.fillStyle = pg; g.fillRect(0, SH, W, H - SH);
  g.fillStyle = '#c98a3c'; g.fillRect(0, SH, W, 3);
  g.font = '700 21px "Alegreya Sans", "Fira Sans", sans-serif'; g.textAlign = 'center'; g.fillStyle = '#ffe2a6';
  g.fillText(sentence(), W / 2, SH + 24);
  if (RT.dlg) {
    g.textAlign = 'left'; g.font = '700 22px "Alegreya Sans", "Fira Sans", sans-serif';
    const hi = dlgIndexAt(RT.mouse.x, RT.mouse.y);
    RT.dlg.list.forEach((o, i) => { g.fillStyle = i === hi ? '#ffd56b' : '#d9c7e6'; g.fillText('› ' + o.t, 34, SH + 42 + i * 27); });
    g.restore(); return;
  }
  VERBS.forEach(([v, n], i) => {
    const r = UI.verb(i), on = RT.verb === v, hv = RT.uiHover && RT.uiHover.t === 'verb' && RT.uiHover.v === v;
    g.fillStyle = on ? '#c4762c' : hv ? '#4a3550' : '#33243a'; rr(g, r[0], r[1], r[2], r[3], 9); g.fill();
    g.fillStyle = on ? '#fff3d6' : v === 'sciacqua' ? '#8fd3ff' : '#ecdcc0'; g.font = '800 23px Eczar, Bitter, Georgia, serif'; g.textAlign = 'center';
    g.fillText(n, r[0] + r[2] / 2, r[1] + 34);
  });
  for (let i = 0; i < 10; i++) {
    const r = UI.slot(i), id = S.inv[RT.invOff + i];
    const sel = id && RT.item === id, hv = RT.uiHover && RT.uiHover.t === 'inv' && RT.uiHover.id === id;
    g.fillStyle = sel ? '#6b4a2a' : hv ? '#3e2d44' : '#241a2a'; rr(g, r[0], r[1], r[2], r[3], 8); g.fill();
    if (id) { g.save(); g.translate(r[0] + r[2] / 2, r[1] + r[3] / 2); ITEMS[id].icon(g); g.restore(); }
  }
  [UI.up, UI.down].forEach((r, i) => { g.fillStyle = '#2f2236'; rr(g, r[0], r[1], r[2], r[3], 7); g.fill(); g.fillStyle = '#d8c3a0'; g.beginPath(); const cx = r[0] + 17, cy = r[1] + 26; if (i === 0) { g.moveTo(cx - 9, cy + 5); g.lineTo(cx + 9, cy + 5); g.lineTo(cx, cy - 7); } else { g.moveTo(cx - 9, cy - 5); g.lineTo(cx + 9, cy - 5); g.lineTo(cx, cy + 7); } g.fill(); });
  uiButtons().forEach(([id, n], i) => {
    const r = UI.btn(i), hv = RT.uiHover && RT.uiHover.t === 'btn' && RT.uiHover.id === id;
    g.fillStyle = hv ? '#5b3f2a' : '#3a2a22'; rr(g, r[0], r[1], r[2], r[3], 8); g.fill();
    g.fillStyle = id === 'anna' ? '#ffcf8a' : '#e9dcc6'; g.font = '700 18px "Alegreya Sans", "Fira Sans", sans-serif'; g.textAlign = 'center'; g.fillText(id === 'anna' ? '☎ ' + n : n, r[0] + r[2] / 2, r[1] + 24);
  });
  g.restore();
}

// ---------- main loop ----------
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  requestAnimationFrame(frame);
  try { update(dt); } catch (e) { console.error(e); }
  try { render(); } catch (e) { console.error(e); ctx.restore && ctx.restore(); }
}
