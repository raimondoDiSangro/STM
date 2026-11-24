// ================= AUDIO: generative score, ambience, sfx =================
const AU = { c: null, level: 2, mood: null, moodName: null, ambName: null, themes: {} };
const SCL = { maj: [0, 2, 4, 5, 7, 9, 11], min: [0, 2, 3, 5, 7, 8, 10], harm: [0, 2, 3, 5, 7, 8, 11], dor: [0, 2, 3, 5, 7, 9, 10], mix: [0, 2, 4, 5, 7, 9, 10] };
const mtof = m => 440 * Math.pow(2, (m - 69) / 12);

// ---- mood library: each is a little band with its own habits ----
const MOODS = {
  title: { bpm: 84, meter: 6, root: 50, scale: 'harm', progs: [[0, 3, 4, 0], [0, 5, 3, 4], [0, 0, 3, 4]], bass: ['tuba', 'oompah'], comp: ['acc', 'stab'], leads: ['mand', 'clar', 'acc'], perc: 'tamb', dens: .7, comic: .5 },
  bagno: { bpm: 66, meter: 4, root: 48, scale: 'min', progs: [[0, 5, 3, 4], [0, 3, 0, 4], [0, 6, 5, 4]], bass: ['pizz', 'sparse'], comp: ['glock', 'arp'], leads: ['clar', 'bassoon', 'glock'], perc: 'drip', dens: .35, comic: .6 },
  piazza: { bpm: 88, meter: 6, root: 53, scale: 'maj', progs: [[0, 3, 4, 0], [0, 4, 5, 3], [0, 1, 4, 0], [3, 4, 0, 0]], bass: ['tuba', 'oompah'], comp: ['acc', 'stab'], leads: ['mand', 'clar', 'acc', 'flute'], perc: 'tamb', dens: .55, comic: .45 },
  bar: { bpm: 96, meter: 4, root: 50, scale: 'mix', progs: [[0, 5, 1, 4], [0, 3, 4, 3], [1, 4, 0, 5]], bass: ['pizz', 'walk'], comp: ['guit', 'stab'], leads: ['clar', 'acc', 'mand'], perc: 'brush', dens: .5, comic: .35 },
  vicolo: { bpm: 72, meter: 6, root: 52, scale: 'min', progs: [[0, 3, 6, 2], [0, 5, 3, 4], [0, 4, 0, 4]], bass: ['guit', 'drone'], comp: ['mand', 'trem'], leads: ['mand', 'flute', 'clar'], perc: null, dens: .45, comic: .25 },
  palazzo: { bpm: 104, meter: 4, root: 50, scale: 'harm', progs: [[0, 4, 0, 4], [0, 3, 4, 0], [5, 4, 0, 0]], bass: ['bassoon', 'walk'], comp: ['pizz', 'stab'], leads: ['bassoon', 'clar', 'glock'], perc: 'block', dens: .5, comic: .7 },
  pineta: { bpm: 70, meter: 4, root: 55, scale: 'maj', progs: [[0, 3, 0, 4], [0, 5, 3, 4], [3, 0, 4, 0]], bass: ['guit', 'sparse'], comp: ['strings', 'pad'], leads: ['flute', 'glock', 'clar'], perc: null, dens: .4, comic: .3 },
  ospedale: { bpm: 60, meter: 4, root: 53, scale: 'maj', progs: [[0, 3, 0, 4], [0, 0, 3, 3]], bass: ['pizz', 'sparse'], comp: ['glock', 'pad'], leads: ['glock', 'flute'], perc: 'tick', dens: .25, comic: .5 },
  mappa: { bpm: 80, meter: 6, root: 50, scale: 'maj', progs: [[0, 4, 5, 3], [0, 3, 4, 0], [5, 3, 4, 0]], bass: ['pizz', 'oompah'], comp: ['acc', 'pad'], leads: ['acc', 'mand', 'flute'], perc: null, dens: .5, comic: .2 },
  altamura: { bpm: 76, meter: 4, root: 50, scale: 'dor', progs: [[0, 3, 0, 6], [0, 6, 3, 4], [0, 1, 0, 6]], bass: ['organ', 'drone'], comp: ['mand', 'trem'], leads: ['mand', 'clar', 'organ'], perc: 'tamb', dens: .45, comic: .3 },
  forno: { bpm: 112, meter: 6, root: 52, scale: 'harm', progs: [[0, 3, 4, 0], [0, 5, 4, 4]], bass: ['tuba', 'oompah'], comp: ['acc', 'stab'], leads: ['mand', 'kazoo', 'acc'], perc: 'tamb', dens: .65, comic: .6 },
  pulo: { bpm: 54, meter: 4, root: 45, scale: 'min', progs: [[0, 5, 0, 6], [0, 3, 5, 4]], bass: ['strings', 'drone'], comp: ['glock', 'arp'], leads: ['flute', 'glock'], perc: 'drip', dens: .25, comic: .1 },
  matera: { bpm: 82, meter: 4, root: 51, scale: 'maj', progs: [[0, 5, 3, 4], [0, 4, 5, 3], [3, 4, 0, 0]], bass: ['pizz', 'walk'], comp: ['strings', 'pad'], leads: ['horn', 'glock', 'flute'], perc: 'tamb', dens: .5, comic: .4 },
  set: { bpm: 120, meter: 4, root: 50, scale: 'maj', progs: [[0, 3, 4, 4], [0, 5, 3, 4]], bass: ['tuba', 'oompah'], comp: ['strings', 'stab'], leads: ['horn', 'kazoo', 'glock'], perc: 'snare', dens: .6, comic: .65 },
  drive: { bpm: 150, meter: 4, root: 53, scale: 'maj', progs: [[0, 4, 0, 4], [0, 3, 4, 0]], bass: ['tuba', 'oompah'], comp: ['acc', 'stab'], leads: ['clar', 'kazoo', 'mand'], perc: 'snare', dens: .8, comic: .5 },
  notte: { bpm: 64, meter: 6, root: 50, scale: 'harm', progs: [[0, 3, 4, 0], [0, 5, 6, 4], [0, 3, 0, 4]], bass: ['guit', 'drone'], comp: ['mand', 'trem'], leads: ['clar', 'flute', 'mand'], perc: null, dens: .35, comic: .2 },
  boss: { bpm: 132, meter: 6, root: 52, scale: 'harm', progs: [[0, 3, 4, 0], [0, 5, 4, 4], [0, 0, 4, 4]], bass: ['tuba', 'oompah'], comp: ['acc', 'stab'], leads: ['kazoo', 'mand', 'clar'], perc: 'tamb', dens: .8, comic: .55 },
  finale: { bpm: 112, meter: 4, root: 55, scale: 'maj', progs: [[0, 3, 4, 0], [0, 5, 3, 4], [0, 4, 0, 4]], bass: ['tuba', 'oompah'], comp: ['horn', 'stab'], leads: ['horn', 'clar', 'glock'], perc: 'snare', dens: .7, comic: .3 },
  triste: { bpm: 60, meter: 4, root: 50, scale: 'min', progs: [[0, 5, 3, 4], [0, 3, 6, 4]], bass: ['pizz', 'sparse'], comp: ['acc', 'pad'], leads: ['acc', 'clar'], perc: null, dens: .3, comic: 0 }
};

AU.init = function () {
  if (AU.c) { if (AU.c.state !== 'running') AU.c.resume(); return; }
  let c; try { c = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
  AU.c = c;
  const comp = c.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 3; comp.connect(c.destination);
  AU.master = c.createGain(); AU.master.gain.value = AU.level ? 0.85 : 0; AU.master.connect(comp);
  AU.musBus = c.createGain(); AU.musBus.gain.value = AU.level === 2 ? 1 : 0; AU.musBus.connect(AU.master);
  AU.mus = c.createGain(); AU.mus.gain.value = 0.42; AU.mus.connect(AU.musBus);
  AU.amb = c.createGain(); AU.amb.gain.value = 0.55; AU.amb.connect(AU.master);
  AU.fx = c.createGain(); AU.fx.gain.value = 0.7; AU.fx.connect(AU.master);
  AU.rev = c.createConvolver(); AU.rev.buffer = impulse(c, 2.8, 2.4);
  const rg = c.createGain(); rg.gain.value = 0.5; AU.rev.connect(rg); rg.connect(AU.master);
  const s1 = c.createGain(); s1.gain.value = 0.32; AU.musBus.connect(s1); s1.connect(AU.rev);
  const s2 = c.createGain(); s2.gain.value = 0.25; AU.fx.connect(s2); s2.connect(AU.rev);
  const s3 = c.createGain(); s3.gain.value = 0.3; AU.amb.connect(s3); s3.connect(AU.rev);
  AU.noise = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
  const d = AU.noise.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  AU.nextT = c.currentTime + 0.2;
  setInterval(AU.tick, 40);
  if (AU.pending) { const p = AU.pending; AU.pending = null; AU.setMood(p[0], p[1]); }
};
function impulse(c, sec, decay) {
  const len = c.sampleRate * sec, b = c.createBuffer(2, len, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) { const d = b.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay); }
  return b;
}
AU.hush = function (on) { if (!AU.c) return; AU.mus.gain.cancelScheduledValues(AU.c.currentTime); AU.mus.gain.setTargetAtTime(on ? 0.0001 : 0.42, AU.c.currentTime, 0.3); };
AU.setLevel = function (l) {
  AU.level = l; try { localStorage.setItem('stm_snd', l); } catch (e) {}
  if (!AU.c) return; const t = AU.c.currentTime;
  AU.master.gain.setTargetAtTime(l ? 0.85 : 0, t, 0.1); AU.musBus.gain.setTargetAtTime(l === 2 ? 1 : 0, t, 0.2);
};
try { const l = localStorage.getItem('stm_snd'); if (l != null) AU.level = +l; } catch (e) {}

// ---------- basic building blocks ----------
function osc(type, f, t) { const o = AU.c.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, t); return o; }
function gn(v) { const g = AU.c.createGain(); g.gain.value = v; return g; }
function flt(type, f, q) { const b = AU.c.createBiquadFilter(); b.type = type; b.frequency.value = f; if (q) b.Q.value = q; return b; }
function env(g, t, a, peak, dec, sus, dur, rel) {
  const p = g.gain; p.setValueAtTime(0.0001, t); p.linearRampToValueAtTime(peak, t + a);
  p.setTargetAtTime(peak * sus, t + a, dec / 3); p.setTargetAtTime(0.0001, t + Math.max(a, dur), rel / 3);
  return t + Math.max(a, dur) + rel * 2;
}
function noiseSrc(t) { const s = AU.c.createBufferSource(); s.buffer = AU.noise; s.loop = true; s.start(t, Math.random() * 1.5); return s; }
function vib(o, t, rate, cents, delay) { const l = osc('sine', rate, t), lg = gn(0); lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(cents, t + (delay || 0.2)); l.connect(lg); lg.connect(o.detune); l.start(t); return l; }

// ---------- instruments ----------
const INST = {
  acc(t, m, dur, v, out) { const f = mtof(m), g = gn(0), lp = flt('lowpass', 1500, 0.8); const os = [osc('sawtooth', f, t), osc('sawtooth', f, t), osc('square', f / 2, t)]; os[0].detune.value = -7; os[1].detune.value = 8; const l = vib(os[0], t, 5.2, 6, 0.15); os.forEach(o => { o.connect(lp); o.start(t); }); lp.connect(g); g.connect(out); const e = env(g, t, 0.05, 0.05 * v, 0.3, 0.75, dur, 0.12); os.forEach(o => o.stop(e)); l.stop(e); },
  mand(t, m, dur, v, out) { const f = mtof(m); const hits = dur > 0.32 ? Math.floor(dur / 0.075) : 1; for (let i = 0; i < hits; i++) { const tt = t + i * 0.075, g = gn(0), o = osc('sawtooth', f, tt), bp = flt('bandpass', 2400, 0.9), hp = flt('highpass', 300); o.detune.value = (Math.random() - .5) * 8; o.connect(bp); bp.connect(hp); hp.connect(g); g.connect(out); const pk = 0.16 * v * (i ? 0.55 + 0.2 * Math.random() : 1); g.gain.setValueAtTime(pk, tt); g.gain.exponentialRampToValueAtTime(0.001, tt + (hits > 1 ? 0.09 : 0.32)); o.start(tt); o.stop(tt + 0.4); } },
  guit(t, m, dur, v, out) { const f = mtof(m), g = gn(0), o = osc('triangle', f, t), o2 = osc('sine', f * 2, t), lp = flt('lowpass', 2200); o.connect(lp); o2.connect(lp); lp.connect(g); g.connect(out); g.gain.setValueAtTime(0.2 * v, t); g.gain.exponentialRampToValueAtTime(0.001, t + Math.min(1.4, dur + 0.5)); o.start(t); o2.start(t); o.stop(t + 1.5); o2.stop(t + 1.5); },
  tuba(t, m, dur, v, out) { const f = mtof(m), g = gn(0), o = osc('sawtooth', f, t), o2 = osc('sine', f, t), lp = flt('lowpass', 420, 1.2); o.connect(lp); o2.connect(g); lp.connect(g); g.connect(out); const e = env(g, t, 0.025, 0.2 * v, 0.15, 0.6, Math.min(dur, 0.3), 0.08); o.start(t); o2.start(t); o.stop(e); o2.stop(e); },
  pizz(t, m, dur, v, out) { const f = mtof(m), g = gn(0), o = osc('triangle', f, t), lp = flt('lowpass', 1800); o.connect(lp); lp.connect(g); g.connect(out); g.gain.setValueAtTime(0.3 * v, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.35); o.start(t); o.stop(t + 0.4); },
  clar(t, m, dur, v, out) { const f = mtof(m), g = gn(0), o = osc('square', f, t), lp = flt('lowpass', 1300, 0.7); const l = vib(o, t, 5, 9, 0.35); o.connect(lp); lp.connect(g); g.connect(out); const e = env(g, t, 0.04, 0.07 * v, 0.2, 0.8, dur, 0.1); o.start(t); o.stop(e); l.stop(e); },
  bassoon(t, m, dur, v, out) { const f = mtof(m), g = gn(0), o = osc('square', f, t), lp = flt('lowpass', 650, 2); o.connect(lp); lp.connect(g); g.connect(out); const e = env(g, t, 0.03, 0.11 * v, 0.15, 0.7, dur, 0.08); o.start(t); o.stop(e); },
  flute(t, m, dur, v, out) { const f = mtof(m), g = gn(0), o = osc('sine', f, t), o2 = osc('triangle', f * 2, t), og = gn(0.12); const l = vib(o, t, 5.4, 10, 0.3); o2.connect(og); og.connect(g); o.connect(g); const n = noiseSrc(t), bp = flt('bandpass', f * 2, 6), ng = gn(0.035); n.connect(bp); bp.connect(ng); ng.connect(g); g.connect(out); const e = env(g, t, 0.07, 0.11 * v, 0.2, 0.8, dur, 0.15); o.start(t); o2.start(t); [o, o2, n].forEach(x => x.stop(e)); l.stop(e); },
  glock(t, m, dur, v, out) { const f = mtof(m + 12), g = gn(0), o = osc('sine', f, t), o2 = osc('sine', f * 2.76, t), g2 = gn(0.25); o.connect(g); o2.connect(g2); g2.connect(g); g.connect(out); g.gain.setValueAtTime(0.09 * v, t); g.gain.exponentialRampToValueAtTime(0.001, t + 1.3); o.start(t); o2.start(t); o.stop(t + 1.4); o2.stop(t + 1.4); },
  organ(t, m, dur, v, out) { const g = gn(0); [1, 2, 3, 4].forEach((h, i) => { const o = osc('sine', mtof(m) * h, t), og = gn([1, .5, .3, .2][i]); o.connect(og); og.connect(g); o.start(t); o.stop(t + dur + 0.8); }); g.connect(out); env(g, t, 0.12, 0.045 * v, 0.3, 0.9, dur, 0.3); },
  strings(t, m, dur, v, out) { const f = mtof(m), g = gn(0), lp = flt('lowpass', 1700); [-9, 0, 10].forEach(d => { const o = osc('sawtooth', f, t); o.detune.value = d; o.connect(lp); o.start(t); o.stop(t + dur + 1.2); }); lp.connect(g); g.connect(out); env(g, t, 0.35, 0.03 * v, 0.4, 0.9, dur, 0.5); },
  horn(t, m, dur, v, out) { const f = mtof(m), g = gn(0), o = osc('sawtooth', f, t), lp = flt('lowpass', 500, 1.5); lp.frequency.setValueAtTime(400, t); lp.frequency.linearRampToValueAtTime(1300, t + 0.08); lp.frequency.setTargetAtTime(800, t + 0.1, 0.2); o.connect(lp); lp.connect(g); g.connect(out); const e = env(g, t, 0.05, 0.08 * v, 0.2, 0.8, dur, 0.12); o.start(t); o.stop(e); },
  kazoo(t, m, dur, v, out) { const f = mtof(m), g = gn(0), o = osc('sawtooth', f, t), b1 = flt('bandpass', 900, 4), b2 = flt('bandpass', 1600, 5); o.frequency.setValueAtTime(f * 0.97, t); o.frequency.linearRampToValueAtTime(f, t + 0.06); const l = vib(o, t, 6.5, 18, 0.1); o.connect(b1); o.connect(b2); b1.connect(g); b2.connect(g); g.connect(out); const e = env(g, t, 0.03, 0.13 * v, 0.1, 0.85, dur, 0.06); o.start(t); o.stop(e); l.stop(e); }
};
const DRUM = {
  tamb(t, v) { const n = noiseSrc(t), hp = flt('highpass', 6500), g = gn(0); n.connect(hp); hp.connect(g); g.connect(AU.mus); g.gain.setValueAtTime(0.06 * v, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.12); n.stop(t + 0.15); },
  brush(t, v) { const n = noiseSrc(t), bp = flt('bandpass', 3500, 0.8), g = gn(0); n.connect(bp); bp.connect(g); g.connect(AU.mus); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.04 * v, t + 0.03); g.gain.exponentialRampToValueAtTime(0.001, t + 0.22); n.stop(t + 0.25); },
  kick(t, v) { const o = osc('sine', 110, t), g = gn(0); o.frequency.exponentialRampToValueAtTime(42, t + 0.12); o.connect(g); g.connect(AU.mus); g.gain.setValueAtTime(0.35 * v, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.2); o.start(t); o.stop(t + 0.22); },
  block(t, v, hi) { const o = osc('sine', hi ? 1500 : 1050, t), g = gn(0); o.connect(g); g.connect(AU.mus); g.gain.setValueAtTime(0.12 * v, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.06); o.start(t); o.stop(t + 0.08); },
  snare(t, v) { const n = noiseSrc(t), bp = flt('bandpass', 2200, 0.7), g = gn(0); n.connect(bp); bp.connect(g); g.connect(AU.mus); g.gain.setValueAtTime(0.07 * v, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.13); n.stop(t + 0.15); },
  drip(t, v) { const o = osc('sine', 1800 + Math.random() * 900, t), g = gn(0); o.frequency.exponentialRampToValueAtTime(500, t + 0.09); o.connect(g); g.connect(AU.mus); g.gain.setValueAtTime(0.05 * v, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.12); o.start(t); o.stop(t + 0.13); }
};

// ---------- generative composer ----------
function degMidi(md, n) { const sc = SCL[md.scale], o = Math.floor(n / 7), i = ((n % 7) + 7) % 7; return md.root + (md.shift || 0) + 12 * o + sc[i]; }
function chordTones(c) { return [c, c + 2, c + 4]; }
function stepsPerBar(md) { return md.meter === 6 ? 12 : 16; }
function stepDur(md) { return md.meter === 6 ? 10 / md.bpm : 15 / md.bpm; }
function genMotif(md) {
  const n = stepsPerBar(md);
  const cells = md.meter === 6 ? [[0, 2, 4, 6, 8, 10], [0, 4, 6, 10], [0, 3, 6, 8], [0, 6, 8], [0, 2, 6, 8, 10], [0, 4, 6]] : [[0, 4, 8, 12], [0, 2, 4, 8, 12], [0, 6, 8, 12], [0, 3, 6, 8, 12, 14], [0, 8, 12], [0, 4, 6, 8, 14], [2, 4, 8, 10, 12]];
  const cell = rand(cells); let d = rand([2, 4, 7, 4]);
  return cell.map((s, i) => { if (i) d += rand([-2, -1, -1, 1, 1, 2, 0, 3, -3]); d = clamp(d, -1, 10); const next = cell[i + 1] == null ? n : cell[i + 1]; return { s, d, len: Math.max(1, next - s) }; });
}
function varyMotif(m) {
  const k = Math.random(), c = m.map(x => ({ ...x }));
  if (k < 0.3) c.forEach(x => x.d += rand([-2, -1, 1, 2]));
  else if (k < 0.55) { const i = c.length - 1; c[i].d += rand([-2, 2, 3, -3]); if (c[i - 1]) c[i - 1].d += rand([-1, 1]); }
  else if (k < 0.75) { const f = c[0].d; c.forEach(x => x.d = f - (x.d - f)); }
  else if (c.length > 2) c.splice(1 + Math.floor(Math.random() * (c.length - 2)), 1);
  c.forEach(x => x.d = clamp(x.d, -2, 11));
  return c;
}
function newPhrase(st) {
  const md = st.md;
  st.prog = (st.prog && Math.random() < 0.4) ? st.prog : rand(md.progs);
  st.mel = null;
  if (st.layer.mel) {
    let base = AU.themes[st.name];
    if (!base || Math.random() < 0.35) { base = genMotif(md); if (!AU.themes[st.name]) AU.themes[st.name] = base; }
    const plan = rand([['a', 'v', 'a', 'c'], ['a', 'a', 'v', 'c'], ['a', 'v', 'v', 'c'], ['a', 'r', 'a', 'c'], ['a', 'v', 'r', 'r']]);
    st.mel = plan.map(p => {
      if (p === 'r') return [];
      if (p === 'c') { const m = varyMotif(base).slice(0, 2); m.push({ s: m.length ? Math.min(stepsPerBar(md) - 4, m[m.length - 1].s + 4) : 0, d: 0, len: 6 }); return m; }
      return p === 'a' ? base : varyMotif(base);
    });
  }
}
function newSection(st) {
  const md = st.md;
  st.sec++;
  st.layer = {
    mel: st.sec === 0 ? false : Math.random() < 0.8,
    comp: Math.random() < 0.85,
    bass: Math.random() < 0.95,
    perc: !!md.perc && (st.sec === 0 ? false : Math.random() < 0.65)
  };
  st.lead = md.leads[(st.sec + Math.floor(Math.random() * 2)) % md.leads.length];
  st.oct = rand([7, 7, 14, 7]);
  if (Math.random() < 0.2 && st.sec > 1) md.shift = rand([0, 0, 5, -2, 2]);
}
AU.setMood = function (name, amb) {
  if (!AU.c) { AU.pending = [name, amb]; return; }
  if (amb !== AU.ambName) AU.setAmb(amb);
  if (!name || name === AU.moodName) return;
  const t = AU.c.currentTime;
  AU.mus.gain.cancelScheduledValues(t); AU.mus.gain.setTargetAtTime(0.0001, t, 0.25);
  AU.moodName = name;
  setTimeout(() => {
    const md = { ...MOODS[name], shift: 0 };
    AU.mood = { name, md, bar: 0, step: 0, sec: -1, breathAt: 20 + Math.floor(Math.random() * 16), breath: 0 };
    newSection(AU.mood); newPhrase(AU.mood);
    AU.nextT = AU.c.currentTime + 0.1;
    AU.mus.gain.cancelScheduledValues(AU.c.currentTime); AU.mus.gain.setTargetAtTime(0.42, AU.c.currentTime, 0.4);
  }, 650);
};
AU.tick = function () {
  if (!AU.c) return;
  const now = AU.c.currentTime;
  AU.ambTick(now);
  const st = AU.mood; if (!st) return;
  if (AU.nextT < now - 0.5) AU.nextT = now + 0.05;
  while (AU.nextT < now + 0.25) { AU.step(st, AU.nextT); AU.nextT += stepDur(st.md); }
};
AU.step = function (st, t) {
  const md = st.md, n = stepsPerBar(md), s = st.step, sd = stepDur(md);
  const barInPh = st.bar % 4;
  if (s === 0) {
    if (st.bar > 0 && st.bar % 16 === 0) newSection(st);
    if (barInPh === 0 && st.bar > 0) newPhrase(st);
    if (st.bar === st.breathAt) { st.breath = rand([1, 2]); st.breathAt = st.bar + 22 + Math.floor(Math.random() * 18); }
  }
  const breathing = st.breath > 0;
  const chord = st.prog[barInPh], ct = chordTones(chord);
  const hum = () => (Math.random() - 0.5) * 0.012;
  const vel = 0.75 + Math.random() * 0.25;
  // bass
  const [bInst, bSty] = md.bass;
  if (st.layer.bass && !breathing) {
    const root = degMidi(md, chord) - 12, fifth = degMidi(md, chord + 4) - 12;
    const half = n / 2;
    if (bSty === 'oompah') { if (s === 0) INST[bInst](t + hum(), root, sd * 2, vel, AU.mus); else if (s === half) INST[bInst](t + hum(), Math.random() < 0.7 ? fifth : root, sd * 2, vel * 0.9, AU.mus); }
    else if (bSty === 'walk') { if (s % 4 === 0) { const pool = [root, fifth, degMidi(md, chord + 2) - 12, root + 12, degMidi(md, chord + 1) - 12]; INST[bInst](t + hum(), s === 0 ? root : rand(pool), sd * 3, vel, AU.mus); } }
    else if (bSty === 'drone') { if (s === 0) INST[bInst](t, root, sd * n * 0.95, 0.8, AU.mus); }
    else if (bSty === 'sparse') { if (s === 0 || (s === half && Math.random() < 0.4)) INST[bInst](t + hum(), s ? fifth : root, sd * 4, vel * 0.8, AU.mus); }
  }
  // comp
  const [cInst, cSty] = md.comp;
  if (st.layer.comp && !breathing) {
    const notes = ct.map(d => degMidi(md, d));
    if (cSty === 'stab') { const pos = md.meter === 6 ? [2, 4, 8, 10] : [4, 12]; if (pos.includes(s) && Math.random() < 0.92) notes.forEach(m => INST[cInst](t + hum(), m, sd * 1.3, vel * 0.7, AU.mus)); }
    else if (cSty === 'arp') { if (s % (md.meter === 6 ? 2 : 4) === 0 && Math.random() < 0.7) INST[cInst](t + hum(), notes[(s / 2) % 3 | 0] + (Math.random() < 0.3 ? 12 : 0), sd * 2, vel * 0.6, AU.mus); }
    else if (cSty === 'pad') { if (s === 0) notes.forEach(m => INST[cInst](t, m, sd * n * 0.95, 0.7, AU.mus)); }
    else if (cSty === 'trem') { if (s === 0 && Math.random() < 0.8) INST[cInst](t, rand(notes) + 12, sd * n * 0.5, 0.45, AU.mus); }
  }
  // melody
  if (st.layer.mel && st.mel && !breathing) {
    const bar = st.mel[barInPh] || [];
    for (const nt of bar) if (nt.s === s) {
      let d = nt.d;
      if (s === 0 || s === n / 2) { let best = d, bd = 99; for (const c of ct) for (const o of [-7, 0, 7]) { const x = c + o; if (Math.abs(x - d) < bd) { bd = Math.abs(x - d); best = x; } } d = best; }
      INST[st.lead](t + hum(), degMidi(md, d + st.oct), sd * nt.len * 0.92, vel, AU.mus);
    }
  }
  // percussion
  if (st.layer.perc && !breathing) {
    const p = md.perc;
    if (p === 'tamb') { if ((md.meter === 6 ? s % 2 === 0 : s % 4 === 2) && Math.random() < 0.85) DRUM.tamb(t + hum(), s % 6 === 0 ? 1 : 0.6); }
    else if (p === 'brush') { if (s % 4 === 0) DRUM.brush(t, s % 8 === 4 ? 1 : 0.6); if (s % 8 === 6 && Math.random() < 0.5) DRUM.brush(t, 0.4); }
    else if (p === 'block') { if (s % 4 === 0) DRUM.block(t, 0.7, s === 0); }
    else if (p === 'snare') { if (s % 8 === 4) DRUM.snare(t, 1); if (s === 0) DRUM.kick(t, 0.8); if (s % 2 === 1 && Math.random() < 0.15) DRUM.snare(t, 0.4); }
    else if (p === 'drip') { if (Math.random() < 0.05) DRUM.drip(t + Math.random() * 0.05, 1); }
    else if (p === 'tick') { if (s % 4 === 0) DRUM.block(t, 0.35, s % 8 === 0); }
  }
  // comic fills at phrase ends
  if (barInPh === 3 && s === n - 4 && !breathing && Math.random() < md.comic * 0.35) AU.fill(st, t);
  // advance
  st.step++;
  if (st.step >= n) { st.step = 0; st.bar++; if (st.breath > 0) st.breath--; }
};
AU.fill = function (st, t) {
  const md = st.md, sd = stepDur(md), r = Math.random();
  if (r < 0.35) { const o = osc('sawtooth', mtof(degMidi(md, 4) - 12), t), g = gn(0), lp = flt('lowpass', 500); o.frequency.exponentialRampToValueAtTime(mtof(degMidi(md, 0) - 24), t + sd * 3); o.connect(lp); lp.connect(g); g.connect(AU.mus); env(g, t, 0.02, 0.14, 0.2, 0.8, sd * 3, 0.05); o.start(t); o.stop(t + sd * 3 + 0.2); }
  else if (r < 0.7) { [0, 2, 4, 7].forEach((d, i) => INST.glock(t + i * sd * 0.6, degMidi(md, d + 7), sd, 0.7, AU.mus)); }
  else { INST.kazoo(t, degMidi(md, 4), sd * 1.5, 0.8, AU.mus); INST.kazoo(t + sd * 2, degMidi(md, 3), sd * 1.5, 0.8, AU.mus); }
};

// ---------- ambience ----------
const AMB = {
  drip: { bed: [['lowpass', 200, 0.05], ['bandpass', 60, 0.02]], ev: [[1.5, 'drip']] },
  piazza: { bed: [['bandpass', 600, 0.06]], ev: [[5, 'swallow'], [14, 'vespa'], [30, 'bell']] },
  bar: { bed: [['bandpass', 700, 0.07]], ev: [[4, 'clink'], [12, 'hiss']] },
  vicolo: { bed: [['bandpass', 500, 0.03]], ev: [[4, 'bird'], [16, 'tv']] },
  palazzo: { bed: [['lowpass', 300, 0.03]], ev: [[2.5, 'type'], [9, 'fax'], [1, 'clock']] },
  pineta: { bed: [['bandpass', 5200, 0.025, 24], ['lowpass', 400, 0.04]], ev: [[3, 'bird']] },
  ospedale: { bed: [['bandpass', 120, 0.03]], ev: [[9, 'dindon'], [6, 'cough']] },
  cave: { bed: [['lowpass', 260, 0.08]], ev: [[2, 'drip']] },
  matera: { bed: [['bandpass', 650, 0.05], ['lowpass', 300, 0.03]], ev: [[5, 'shutter'], [6, 'bird']] },
  notte: { bed: [['lowpass', 350, 0.03]], ev: [[0.9, 'cricket'], [14, 'owl']] },
  fiera: { bed: [['lowpass', 180, 0.06], ['bandpass', 80, 0.03]], ev: [[1, 'cricket'], [10, 'creak']] },
  vento: { bed: [['lowpass', 500, 0.05]], ev: [[8, 'bird']] }
};
AU.setAmb = function (name) {
  AU.ambName = name;
  if (!AU.c) return;
  const t = AU.c.currentTime;
  (AU.ambNodes || []).forEach(n => { try { n.g.gain.setTargetAtTime(0.0001, t, 0.4); n.s.stop(t + 2); } catch (e) {} });
  AU.ambNodes = []; AU.ambEv = [];
  const a = AMB[name]; if (!a) return;
  a.bed.forEach(([ty, f, v, trem]) => {
    const s = noiseSrc(t), fl = flt(ty, f, ty === 'bandpass' ? (trem ? 6 : 0.8) : 0.7), g = gn(0.0001);
    s.connect(fl); fl.connect(g); g.connect(AU.amb); g.gain.setTargetAtTime(v, t, 0.8);
    const l = osc('sine', trem || 0.08 + Math.random() * 0.1, t), lg = gn(v * (trem ? 0.9 : 0.4)); l.connect(lg); lg.connect(g.gain); l.start(t); l.stop(t + 3600);
    AU.ambNodes.push({ s, g });
  });
  AU.ambEv = a.ev.map(([every, k]) => ({ every, k, next: t + Math.random() * every }));
};
AU.ambTick = function (now) {
  for (const e of AU.ambEv || []) if (now >= e.next) { e.next = now + e.every * (0.5 + Math.random()); AU.ambEvent(e.k, now + 0.05); }
};
AU.ambEvent = function (k, t) {
  const out = AU.amb, c = AU.c;
  const blip = (f0, f1, d, v, type = 'sine') => { const o = osc(type, f0, t), g = gn(0); o.frequency.exponentialRampToValueAtTime(f1, t + d); o.connect(g); g.connect(out); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.001, t + d); o.start(t); o.stop(t + d + 0.02); };
  const nz = (ty, f, d, v, q) => { const s = noiseSrc(t), fl = flt(ty, f, q), g = gn(0); s.connect(fl); fl.connect(g); g.connect(out); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + d * 0.2); g.gain.exponentialRampToValueAtTime(0.001, t + d); s.stop(t + d + 0.05); };
  switch (k) {
    case 'drip': blip(1400 + Math.random() * 1400, 400, 0.12, 0.08); break;
    case 'swallow': for (let i = 0; i < 3; i++) setTimeout(() => AU.c && blip(5200, 3600, 0.07, 0.025), i * 110); break;
    case 'bird': { const f = 2400 + Math.random() * 1800; for (let i = 0; i < 2 + (Math.random() * 3 | 0); i++) setTimeout(() => AU.c && blip(f, f * 1.3, 0.09, 0.03), i * 140); } break;
    case 'vespa': { const o = osc('sawtooth', 70, t), lp = flt('lowpass', 600), g = gn(0); o.frequency.linearRampToValueAtTime(120, t + 1.4); o.frequency.linearRampToValueAtTime(80, t + 3); o.connect(lp); lp.connect(g); g.connect(out); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.05, t + 1.4); g.gain.linearRampToValueAtTime(0.0001, t + 3); o.start(t); o.stop(t + 3.1); } break;
    case 'bell': [0, 1.6, 3.2].forEach(d => { const tt = t + d; [1, 2.4, 3.0].forEach((h, i) => { const o = osc('sine', 392 * h, tt), g = gn(0); o.connect(g); g.connect(out); g.gain.setValueAtTime(0.04 / (i + 1), tt); g.gain.exponentialRampToValueAtTime(0.0005, tt + 3); o.start(tt); o.stop(tt + 3); }); }); break;
    case 'clink': blip(3400, 3300, 0.15, 0.03, 'triangle'); break;
    case 'hiss': nz('highpass', 3000, 1.8, 0.04); break;
    case 'tv': nz('bandpass', 1100, 1.5, 0.02, 3); break;
    case 'type': for (let i = 0; i < 4 + (Math.random() * 6 | 0); i++) setTimeout(() => AU.c && DRUM.block(AU.c.currentTime, 0.12, true), i * 90 + Math.random() * 40); break;
    case 'fax': [0, 0.25].forEach(d => { const o = osc('square', 1300, t + d), g = gn(0); o.connect(g); g.connect(out); g.gain.setValueAtTime(0.012, t + d); g.gain.setValueAtTime(0, t + d + 0.18); o.start(t + d); o.stop(t + d + 0.2); }); break;
    case 'clock': blip(2200, 2100, 0.03, 0.015); break;
    case 'dindon': [659, 523].forEach((f, i) => { const o = osc('sine', f, t + i * 0.45), g = gn(0); o.connect(g); g.connect(out); g.gain.setValueAtTime(0.05, t + i * 0.45); g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.45 + 1.2); o.start(t + i * 0.45); o.stop(t + i * 0.45 + 1.3); }); break;
    case 'cough': nz('bandpass', 500, 0.25, 0.05, 1); break;
    case 'shutter': nz('highpass', 4000, 0.06, 0.04); break;
    case 'cricket': for (let i = 0; i < 3; i++) { const o = osc('sine', 4300, t + i * 0.05), g = gn(0); o.connect(g); g.connect(out); g.gain.setValueAtTime(0.01, t + i * 0.05); g.gain.setValueAtTime(0, t + i * 0.05 + 0.03); o.start(t + i * 0.05); o.stop(t + i * 0.05 + 0.035); } break;
    case 'owl': [0, 0.5].forEach(d => { const o = osc('sine', 420, t + d), g = gn(0); o.frequency.linearRampToValueAtTime(380, t + d + 0.4); o.connect(g); g.connect(out); g.gain.setValueAtTime(0.0001, t + d); g.gain.linearRampToValueAtTime(0.03, t + d + 0.1); g.gain.exponentialRampToValueAtTime(0.001, t + d + 0.45); o.start(t + d); o.stop(t + d + 0.5); }); break;
    case 'creak': blip(180, 140, 0.6, 0.02, 'sawtooth'); break;
  }
};

// ---------- sound effects ----------
AU.sfx = function (k) {
  if (!AU.c) return; const c = AU.c, t = c.currentTime + 0.01, out = AU.fx;
  const tone = (type, f, d, v, t0 = t, f1) => { const o = osc(type, f, t0), g = gn(0); if (f1) o.frequency.exponentialRampToValueAtTime(f1, t0 + d); o.connect(g); g.connect(out); g.gain.setValueAtTime(v, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + d); o.start(t0); o.stop(t0 + d + 0.05); };
  const nz = (ty, f0, f1, d, v, q, t0 = t) => { const s = noiseSrc(t0), fl = flt(ty, f0, q), g = gn(0); fl.frequency.setValueAtTime(f0, t0); fl.frequency.exponentialRampToValueAtTime(f1, t0 + d); s.connect(fl); fl.connect(g); g.connect(out); g.gain.setValueAtTime(0.0001, t0); g.gain.linearRampToValueAtTime(v, t0 + Math.min(0.08, d * 0.2)); g.gain.exponentialRampToValueAtTime(0.001, t0 + d); s.stop(t0 + d + 0.05); };
  switch (k) {
    case 'flush': nz('lowpass', 300, 2600, 0.5, 0.35, 1); nz('lowpass', 2600, 200, 1.2, 0.3, 1, t + 0.45); for (let i = 0; i < 6; i++) tone('sine', 200 + Math.random() * 300, 0.12, 0.08, t + 0.8 + i * 0.12, 90); break;
    case 'pickup': [0, 4, 7, 12].forEach((d, i) => INST.glock(t + i * 0.07, 72 + d, 0.2, 0.9, out)); break;
    case 'fail': INST.kazoo(t, 62, 0.25, 0.9, out); INST.kazoo(t + 0.28, 58, 0.5, 0.9, out); break;
    case 'click': tone('sine', 900, 0.04, 0.03); break;
    case 'ach': [0, 4, 7, 12, 16].forEach((d, i) => INST.horn(t + i * 0.09, 60 + d, 0.3, 1, out)); break;
    case 'swap': tone('triangle', 500, 0.15, 0.08, t, 900); break;
    case 'stamp': tone('sine', 140, 0.25, 0.4, t, 50); nz('lowpass', 800, 200, 0.15, 0.2); break;
    case 'door': tone('sine', 90, 0.4, 0.3, t, 50); nz('bandpass', 400, 200, 0.3, 0.1, 2); break;
    case 'fire': { tone('sine', 1800, 0.7, 0.05, t, 600); nz('lowpass', 3000, 300, 0.6, 0.4, 0.5, t + 0.7); for (let i = 0; i < 8; i++) nz('highpass', 5000, 3000, 0.08, 0.08, 1, t + 0.8 + Math.random() * 0.6); } break;
    case 'phone': for (let i = 0; i < 2; i++) { const t0 = t + i * 0.9; for (let j = 0; j < 10; j++) tone('square', j % 2 ? 1300 : 1500, 0.04, 0.03, t0 + j * 0.04); } break;
    case 'success': [0, 4, 7, 12].forEach((d, i) => { INST.horn(t + i * 0.12, 60 + d, 0.25, 1, out); }); INST.horn(t + 0.5, 72, 0.7, 1, out); break;
    case 'cash': tone('triangle', 2600, 0.3, 0.08); tone('triangle', 3300, 0.4, 0.06, t + 0.08); break;
    case 'train': [0, 1.1].forEach(d => [311, 370, 466].forEach(f => { const o = osc('sawtooth', f, t + d), lp = flt('lowpass', 1200), g = gn(0); o.connect(lp); lp.connect(g); g.connect(out); g.gain.setValueAtTime(0.0001, t + d); g.gain.linearRampToValueAtTime(0.06, t + d + 0.05); g.gain.setValueAtTime(0.06, t + d + 0.8); g.gain.exponentialRampToValueAtTime(0.001, t + d + 1); o.start(t + d); o.stop(t + d + 1.05); })); break;
    case 'heli': { const s = noiseSrc(t), lp = flt('lowpass', 500), g = gn(0); const l = osc('square', 14, t), lg = gn(0.08); l.connect(lg); lg.connect(g.gain); s.connect(lp); lp.connect(g); g.connect(out); g.gain.setValueAtTime(0.08, t); g.gain.linearRampToValueAtTime(0.0001, t + 4); l.start(t); l.stop(t + 4); s.stop(t + 4); } break;
    case 'splash': nz('bandpass', 1200, 300, 0.9, 0.3, 0.7); break;
    case 'bread': tone('sine', 220, 0.18, 0.3, t, 80); nz('lowpass', 1500, 300, 0.1, 0.15); break;
    case 'boing': tone('triangle', 200, 0.5, 0.15, t, 700); break;
    case 'sting': [0, 3, 6].forEach(d => INST.strings(t, 50 + d, 1.2, 1.4, out)); tone('sine', 55, 1.2, 0.2); break;
    case 'crash': nz('lowpass', 4000, 200, 0.5, 0.4, 0.5); tone('sine', 120, 0.3, 0.3, t, 40); break;
    case 'flash': tone('square', 2500, 0.08, 0.04); nz('highpass', 6000, 4000, 0.15, 0.1); break;
    case 'beep': tone('sine', 880, 0.12, 0.06); break;
    case 'car': { const o = osc('sawtooth', 60, t), lp = flt('lowpass', 500), g = gn(0); o.frequency.linearRampToValueAtTime(110, t + 1.2); o.frequency.linearRampToValueAtTime(55, t + 2.2); o.connect(lp); lp.connect(g); g.connect(out); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.1, t + 0.4); g.gain.linearRampToValueAtTime(0.0001, t + 2.4); o.start(t); o.stop(t + 2.5); } break;
    case 'win': [0, 4, 7, 12, 7, 12, 16].forEach((d, i) => INST.clar(t + i * 0.1, 67 + d, 0.12, 1, out)); break;
  }
};
