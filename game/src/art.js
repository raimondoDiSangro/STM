// ================= ART: cut-paper drawing kit =================
let _seed = 1;
function SEED(s) { _seed = s; }
function sr() { _seed = (_seed * 16807) % 2147483647; return (_seed - 1) / 2147483646; }
function poly(g, p, f) { g.beginPath(); g.moveTo(p[0], p[1]); for (let i = 2; i < p.length; i += 2) g.lineTo(p[i], p[i + 1]); g.closePath(); g.fillStyle = f; g.fill(); }
function rect(g, x, y, w, h, f) { g.fillStyle = f; g.fillRect(x, y, w, h); }
function ell(g, x, y, rx, ry, f, rot = 0) { g.beginPath(); g.ellipse(x, y, Math.abs(rx), Math.abs(ry), rot, 0, Math.PI * 2); g.fillStyle = f; g.fill(); }
function lg(g, x0, y0, x1, y1, ...cs) { const l = g.createLinearGradient(x0, y0, x1, y1); cs.forEach((c, i) => l.addColorStop(i / (cs.length - 1), c)); return l; }
function rg(g, x, y, r, ...cs) { const l = g.createRadialGradient(x, y, 0, x, y, r); cs.forEach((c, i) => l.addColorStop(i / (cs.length - 1), c)); return l; }
// on touch screens the on-screen prompts say "Tocca" instead of "Clic"
function touchWords(s) { return s.replace('Frecce ← → (o clic) per cambiare corsia', 'Tocca a sinistra o a destra per cambiare corsia').replace(/\bClic\b/g, 'Tocca').replace(/\bclic\b/g, 'tocca'); }
function txt(g, s, x, y, font, col, align = 'center', stroke) { if (TOUCH.on && typeof s === 'string' && s.indexOf('lic') >= 0) s = touchWords(s); g.font = font; g.textAlign = align; if (stroke) { g.lineWidth = stroke[1]; g.strokeStyle = stroke[0]; g.lineJoin = 'round'; g.strokeText(s, x, y); } g.fillStyle = col; g.fillText(s, x, y); }
let GRAIN = null;
function finishBg(g) {
  if (!GRAIN) { GRAIN = document.createElement('canvas'); GRAIN.width = GRAIN.height = 220; const gg = GRAIN.getContext('2d'), id = gg.createImageData(220, 220); for (let i = 0; i < id.data.length; i += 4) { const v = Math.random() * 255; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 255; } gg.putImageData(id, 0, 0); }
  g.save(); g.globalAlpha = 0.07; g.globalCompositeOperation = 'overlay'; g.fillStyle = g.createPattern(GRAIN, 'repeat'); g.fillRect(0, 0, W, SH); g.restore();
  g.save(); g.fillStyle = rg(g, W / 2, SH * 0.45, W * 0.75, 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(20,8,30,.42)'); g.fillRect(0, 0, W, SH); g.restore();
}
// ---- scenery ----
function sky(g, ...cs) { rect(g, 0, 0, W, SH, lg(g, 0, 0, 0, SH * 0.8, ...cs)); }
function glow(g, x, y, r, col) { g.fillStyle = rg(g, x, y, r, col, 'rgba(0,0,0,0)'); g.fillRect(x - r, y - r, r * 2, r * 2); }
function cloud(g, x, y, w, c1, c2) { poly(g, [x, y, x + w * 0.2, y - w * 0.09, x + w * 0.45, y - w * 0.12, x + w * 0.7, y - w * 0.07, x + w, y], c1); poly(g, [x + w * 0.1, y, x + w * 0.9, y, x + w * 0.75, y + w * 0.03, x + w * 0.2, y + w * 0.03], c2); }
function hills(g, y, amp, col, n = 6, seed = 3) { SEED(seed); const p = [0, SH]; for (let i = 0; i <= n; i++) p.push(i * W / n, y - sr() * amp); p.push(W, SH); poly(g, p, col); }
function blocks(g, x, y, w, h, col, bh = 22, alpha = 0.18) { g.save(); g.globalAlpha = alpha; g.strokeStyle = col; g.lineWidth = 1.5; for (let yy = y + bh; yy < y + h; yy += bh) { g.beginPath(); g.moveTo(x, yy); g.lineTo(x + w, yy); g.stroke(); const off = ((yy / bh) % 2) * 25; for (let xx = x + off; xx < x + w; xx += 50 + sr() * 20) { g.beginPath(); g.moveTo(xx, yy - bh); g.lineTo(xx, yy); g.stroke(); } } g.restore(); }
function winArch(g, x, y, w, h, o = {}) {
  const shut = o.shut || '#3d6b4f', glass = o.glass || '#2a2238', frame = o.frame || 'rgba(255,240,210,.5)';
  poly(g, [x - 6, y + h + 6, x + w + 6, y + h + 6, x + w + 10, y + h + 14, x - 10, y + h + 14], o.sill || 'rgba(255,240,215,.55)');
  g.beginPath(); g.moveTo(x, y + h); g.lineTo(x, y + w / 2); g.arc(x + w / 2, y + w / 2, w / 2, Math.PI, 0); g.lineTo(x + w, y + h); g.closePath(); g.fillStyle = glass; g.fill();
  if (o.lit) { g.fillStyle = rg(g, x + w / 2, y + h * 0.6, h, o.lit, 'rgba(0,0,0,0)'); g.fill(); }
  g.strokeStyle = frame; g.lineWidth = 2; g.beginPath(); g.moveTo(x + w / 2, y + 4); g.lineTo(x + w / 2, y + h); g.moveTo(x, y + h * 0.55); g.lineTo(x + w, y + h * 0.55); g.stroke();
  if (o.open !== false) { poly(g, [x - w * 0.48, y + w * 0.3, x, y + w * 0.25, x, y + h, x - w * 0.48, y + h + 3], shut); poly(g, [x + w, y + w * 0.25, x + w * 1.48, y + w * 0.3, x + w * 1.48, y + h + 3, x + w, y + h], shut); g.save(); g.globalAlpha = 0.25; g.strokeStyle = '#000'; for (let i = 1; i < 8; i++) { const yy = y + w * 0.3 + i * (h - w * 0.3) / 8; g.beginPath(); g.moveTo(x - w * 0.46, yy); g.lineTo(x - 2, yy); g.moveTo(x + w + 2, yy); g.lineTo(x + w * 1.46, yy); g.stroke(); } g.restore(); }
  else { poly(g, [x, y + w * 0.4, x + w, y + w * 0.4, x + w, y + h, x, y + h], shut); }
}
function doorArch(g, x, y, w, h, col, dark = 'rgba(0,0,0,.35)') { g.beginPath(); g.moveTo(x, y + h); g.lineTo(x, y + w / 2); g.arc(x + w / 2, y + w / 2, w / 2, Math.PI, 0); g.lineTo(x + w, y + h); g.closePath(); g.fillStyle = col; g.fill(); g.fillStyle = dark; g.fillRect(x + w / 2 - 1, y + w / 2, 2, h - w / 2); g.save(); g.globalAlpha = 0.2; for (let i = 0; i < 4; i++) rect(g, x + 8 + i * (w - 16) / 4, y + w * 0.6, (w - 16) / 4 - 6, h - w * 0.7, '#000'); g.restore(); }
function facade(g, o) {
  const { x, y, w, h } = o; const lean = o.lean || 0, side = o.side || 0;
  if (side) poly(g, side > 0 ? [x + w, y, x + w + side, y + 18, x + w + side, y + h, x + w, y + h] : [x, y, x + side, y + 18, x + side, y + h, x, y + h], o.shade || 'rgba(0,0,0,.3)');
  poly(g, [x + lean, y, x + w + lean, y, x + w, y + h, x, y + h], o.wall);
  blocks(g, x, y, w, h, o.line || '#4a2e1a', o.bh || 24, o.ba || 0.15);
  rect(g, x, y + h - 40, w, 40, 'rgba(40,20,30,.12)');
  g.fillStyle = lg(g, 0, y, 0, y + h, 'rgba(255,220,170,.0)', 'rgba(40,10,40,.22)'); g.fillRect(x, y, w, h);
  if (o.cornice !== false) { poly(g, [x - 10 + lean, y - 14, x + w + 10 + lean, y - 14, x + w + 4 + lean, y + 4, x - 4 + lean, y + 4], o.corn || 'rgba(255,240,215,.55)'); poly(g, [x - 4 + lean, y + 4, x + w + 4 + lean, y + 4, x + w + lean, y + 10, x + lean, y + 10], 'rgba(0,0,0,.18)'); }
  if (o.win) { const { rows, cols, ww, wh, top, gapY } = o.win; for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const wx = x + (c + 0.5) * w / cols - ww / 2, wy = y + top + r * (gapY || wh + 50); winArch(g, wx, wy, ww, wh, o.wo || {}); } }
}
function cobbles(g, y0, y1, c1, c2, line = 'rgba(0,0,0,.12)') {
  rect(g, 0, y0, W, y1 - y0, lg(g, 0, y0, 0, y1, c1, c2));
  g.save(); g.strokeStyle = line; g.lineWidth = 1.5;
  for (let i = 0, y = y0 + 6; y < y1; i++) { const step = 8 + i * 5; g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); const bw = 30 + i * 12; for (let x = (i % 2) * bw / 2; x < W; x += bw) { g.beginPath(); g.moveTo(x, y); g.lineTo(x + (x - W / 2) * 0.04, y + step); g.stroke(); } y += step; }
  g.restore();
}
function rays(g, x, y, ang, spread, len, col, n = 5) { g.save(); g.globalCompositeOperation = 'lighter'; for (let i = 0; i < n; i++) { const a = ang + (i / (n - 1) - 0.5) * spread, w = 0.04 + sr() * 0.05; g.fillStyle = lg(g, x, y, x + Math.cos(a) * len, y + Math.sin(a) * len, col, 'rgba(0,0,0,0)'); g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a - w) * len, y + Math.sin(a - w) * len); g.lineTo(x + Math.cos(a + w) * len, y + Math.sin(a + w) * len); g.closePath(); g.fill(); } g.restore(); }
function pine(g, x, y, s, c1 = '#2f4a2c', c2 = '#46663a', tr = '#5a3a28') {
  poly(g, [x - 6 * s, y, x + 6 * s, y, x + 3 * s, y - 150 * s, x + 40 * s, y - 210 * s, x + 30 * s, y - 214 * s, x - 2 * s, y - 165 * s, x - 30 * s, y - 205 * s, x - 38 * s, y - 200 * s, x - 3 * s, y - 150 * s], tr);
  const blob = (cx, cy, rx, ry) => { ell(g, cx, cy + 6 * s, rx, ry, c1); ell(g, cx - rx * 0.1, cy - ry * 0.25, rx * 0.85, ry * 0.7, c2); };
  blob(x - 40 * s, y - 220 * s, 75 * s, 26 * s); blob(x + 45 * s, y - 225 * s, 80 * s, 28 * s); blob(x, y - 245 * s, 95 * s, 30 * s);
}
function cypress(g, x, y, s, c = '#26402a') { poly(g, [x, y - 200 * s, x + 18 * s, y - 120 * s, x + 20 * s, y - 30 * s, x + 6 * s, y, x - 6 * s, y, x - 20 * s, y - 30 * s, x - 18 * s, y - 120 * s], c); poly(g, [x, y - 200 * s, x + 18 * s, y - 120 * s, x + 20 * s, y - 30 * s, x + 6 * s, y, x, y], 'rgba(0,0,0,.18)'); }
function lights(g, t, x0, x1, y, sag, cols, n = 18) {
  g.save(); g.strokeStyle = 'rgba(40,30,20,.6)'; g.lineWidth = 1.5; g.beginPath();
  for (let i = 0; i <= n; i++) { const k = i / n, xx = lerp(x0, x1, k), yy = y + Math.sin(k * Math.PI) * sag; i ? g.lineTo(xx, yy) : g.moveTo(xx, yy); } g.stroke();
  g.globalCompositeOperation = 'lighter';
  for (let i = 0; i <= n; i++) { const k = i / n, xx = lerp(x0, x1, k), yy = y + Math.sin(k * Math.PI) * sag; const c = cols[i % cols.length], fl = 0.65 + 0.35 * Math.sin(t * 3 + i * 1.7); g.globalAlpha = fl; glow(g, xx, yy + 4, 16, c); ell(g, xx, yy + 4, 3.2, 3.8, '#fff6dd'); }
  g.restore();
}
function sign(g, x, y, w, h, s, bgc, fg, font = '800 22px Eczar, Bitter, Georgia, serif') { poly(g, [x, y, x + w, y, x + w - 3, y + h, x + 3, y + h], bgc); poly(g, [x, y + h - 5, x + w, y + h - 5, x + w - 3, y + h, x + 3, y + h], 'rgba(0,0,0,.25)'); txt(g, s, x + w / 2, y + h / 2 + 8, font, fg); }
function shadowFloor(g, x, y, rx, ry, a = 0.25) { ell(g, x, y, rx, ry, 'rgba(10,0,20,' + a + ')'); }

// ---- characters ----
function limb(g, x0, y0, ang, len, w0, w1, col) {
  const x1 = x0 + Math.sin(ang) * len, y1 = y0 + Math.cos(ang) * len, nx = Math.cos(ang), ny = -Math.sin(ang);
  poly(g, [x0 - nx * w0 / 2, y0 - ny * w0 / 2, x0 + nx * w0 / 2, y0 + ny * w0 / 2, x1 + nx * w1 / 2, y1 + ny * w1 / 2, x1 - nx * w1 / 2, y1 - ny * w1 / 2], col);
  return [x1, y1];
}
function shade(c, k) { // darken a #rrggbb by k (0..1)
  const n = parseInt(c.slice(1), 16); let r = n >> 16, gg = (n >> 8) & 255, b = n & 255;
  r = Math.round(r * (1 - k) + 20 * k); gg = Math.round(gg * (1 - k) + 8 * k); b = Math.round(b * (1 - k) + 40 * k);
  return '#' + ((1 << 24) + (r << 16) + (gg << 8) + b).toString(16).slice(1);
}
function drawActor(g, a, t) {
  const d = ACTORS[a.id]; const s = aScale(a);
  g.save(); g.translate(a.x, a.y);
  if (!d.noShadow) shadowFloor(g, 0, 0, 42 * s * (d.w ? d.w / 70 : 1), 9 * s);
  g.scale(a.dir * s, s);
  if (d.alpha) g.globalAlpha = d.alpha + 0.08 * Math.sin(t * 2);
  d.draw(g, a, t);
  g.restore();
}
function mouth(g, x, y, talk, t, w = 9) { if (talk) { const o = 2 + Math.abs(Math.sin(t * 17)) * 5; ell(g, x, y, w * 0.55, o, '#3a1418'); } else { g.strokeStyle = '#3a1418'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(x - w / 2, y); g.lineTo(x + w / 2, y - 1); g.stroke(); } }
function eye(g, x, y, t, seed = 0, r = 3.2) { const blink = ((t + seed) % 4.3) < 0.12; if (blink) { g.strokeStyle = '#201018'; g.lineWidth = 2; g.beginPath(); g.moveTo(x - 4, y); g.lineTo(x + 4, y); g.stroke(); } else { ell(g, x, y, r + 1.6, r + 2.2, '#fff8ee'); ell(g, x + 1.4, y + 0.5, r * 0.75, r, '#201018'); } }
// generic person, facing +x, feet at 0
function person(g, a, t, p) {
  const walk = a.walking, ph = a.phase, sw = walk ? Math.sin(ph) * 0.5 : 0;
  const bob = walk ? -Math.abs(Math.sin(ph)) * 5 : Math.sin(t * 1.6 + (p.seed || 0)) * 1.2;
  const H = p.H || 1, hipY = (p.sit ? -58 : -88) * H, shY = hipY - 72 * H * (p.torso || 1);
  const skin = p.skin || '#e2a07a', top = p.top || '#456', bot = p.bottom || '#333', shoe = p.shoe || '#2a1a14';
  const sk2 = shade(skin, 0.25), top2 = shade(top, 0.28), bot2 = shade(bot, 0.3);
  g.save(); g.translate(0, bob);
  // back arm
  const armA = p.armB != null ? p.armB : -sw * 0.8 - 0.1;
  const [bhx, bhy] = limb(g, -6, shY + 8, armA, 66 * H, 15, 11, top2); ell(g, bhx, bhy + 4, 7, 8, sk2);
  // legs
  if (p.sit) {
    [[-6, bot2, shoe], [6, bot, shoe]].forEach(([o, c, sh], i) => { poly(g, [-14 + o, hipY - 8, 40 + o, hipY - 6, 40 + o, hipY + 10, -14 + o, hipY + 12], c); const [fx, fy] = limb(g, 34 + o, hipY + 2, 0.05, 54, 16, 12, c); poly(g, [fx - 8, fy - 6, fx + 18, fy - 4, fx + 20, fy + 2, fx - 8, fy + 2], i ? sh : shade(sh, 0.2)); });
  } else {
    const L = 86 * H;
    [[sw, bot2, shade(shoe, 0.25)], [-sw, bot, shoe]].forEach(([an, c, sh]) => { const [fx, fy] = limb(g, 0, hipY, an, L, p.thigh || 19, 12, c); poly(g, [fx - 9, fy - 8, fx + 15, fy - 6, fx + 18, fy, fx - 9, fy], sh); if (p.flip) { g.fillStyle = skin; g.fillRect(fx - 6, fy - 12, 14, 5); } });
  }
  // torso
  const bw = p.wide || 24, belly = (p.belly || 0) * 18;
  poly(g, [-bw + 2, hipY + 6, bw, hipY + 6, bw + 4 + belly, (hipY + shY) / 2 + 8, bw + 4, shY + 6, 6, shY - 4, -bw - 2, shY + 6, -bw - 4, (hipY + shY) / 2], top);
  poly(g, [-bw + 2, hipY + 6, -2, hipY + 6, 0, shY, -bw - 2, shY + 6, -bw - 4, (hipY + shY) / 2], top2);
  if (p.torsoFx) p.torsoFx(g, hipY, shY, bw, t);
  // neck + head
  const hy = shY - 26 * H;
  poly(g, [-6, shY + 2, 8, shY + 2, 7, hy + 8, -5, hy + 8], sk2);
  g.save(); g.translate(2, hy); if (p.headTilt) g.rotate(p.headTilt);
  const hs = p.head || 1; g.scale(hs, hs);
  poly(g, [-16, 12, 12, 14, 19, -2, 15, -22, -2, -29, -18, -19], skin);
  poly(g, [-16, 12, -2, 14, -6, -26, -18, -19], sk2);
  ell(g, -5, -2, 5, 7, sk2);
  if (p.hair) p.hairFx ? p.hairFx(g, p.hair, t) : hairStyle(g, p.hairStyle, p.hair);
  poly(g, [15, -10, 30 + (p.nose || 0), 0, 15, 4], p.noseCol || shade(skin, 0.12));
  eye(g, 8, -9, t, p.seed || 0);
  g.strokeStyle = p.brow || p.hair || '#2a1a10'; g.lineWidth = 3; g.beginPath(); g.moveTo(3, -16 - (a.talk ? Math.sin(t * 6) * 1.5 : 0)); g.lineTo(14, -15); g.stroke();
  if (p.glasses) { g.strokeStyle = p.glasses; g.lineWidth = 2.5; g.strokeRect(2, -14, 14, 10); g.beginPath(); g.moveTo(2, -10); g.lineTo(-6, -9); g.stroke(); }
  if (p.shades) poly(g, [1, -15, 20, -14, 19, -6, 3, -6], '#151018');
  if (p.mus) poly(g, [6, 5, 26, 4, 24, 10, 16, 8, 8, 11], p.mus);
  if (p.beard) poly(g, [-12, 6, 16, 6, 14, 20, 0, 26, -12, 18], p.beard);
  mouth(g, 14, 8, a.talk, t, 9);
  if (p.hat) p.hat(g, t);
  g.restore();
  // front arm
  const armF = p.armF != null ? (typeof p.armF === 'function' ? p.armF(a, t) : p.armF) : sw * 0.8 + 0.1;
  const [hx, hy2] = limb(g, 8, shY + 8, armF, 66 * H, 16, 12, top); ell(g, hx, hy2 + 4, 7.5, 8.5, skin);
  if (p.hand) p.hand(g, hx, hy2 + 4, t);
  if (p.extra) p.extra(g, hipY, shY, t, a);
  g.restore();
}
function hairStyle(g, st, c) {
  if (st === 'slick') { poly(g, [-20, -12, -16, -28, 0, -34, 16, -28, 20, -18, 6, -22, -8, -18], c); }
  else if (st === 'bald') { poly(g, [-20, -10, -16, -18, -10, -12, -14, 0], c); }
  else if (st === 'bun') { poly(g, [-20, -6, -18, -24, -2, -32, 16, -26, 18, -16, -6, -18], c); ell(g, -16, -28, 9, 9, c); }
  else if (st === 'bob') { poly(g, [-22, 16, -22, -20, -4, -34, 18, -26, 22, -12, 10, -20, -6, -14, -10, 16], c); }
  else if (st === 'curly') { for (let i = 0; i < 6; i++) ell(g, -16 + i * 6, -26 + Math.sin(i * 2) * 3, 7, 7, c); ell(g, -18, -10, 7, 9, c); }
  else if (st === 'comb') { poly(g, [-20, -8, -18, -22, 4, -30, 20, -24, -4, -26, -14, -14], c); }
  else if (st === 'messy') { poly(g, [-22, -4, -24, -22, -10, -38, 0, -30, 10, -40, 18, -26, 24, -20, 12, -22, -6, -20, -14, -8], c); }
}
// ---- the hero: Sciacquone il Pagliaccione ----
function drawSciac(g, a, t) {
  const walk = a.walking, ph = a.phase, sw = walk ? Math.sin(ph) * 0.42 : 0;
  const bob = walk ? -Math.abs(Math.sin(ph)) * 6 : Math.sin(t * 1.8) * 1.5;
  const wob = walk ? Math.sin(ph) * 0.07 : Math.sin(t * 1.1) * 0.015;
  g.save(); g.translate(0, bob); g.rotate(wob);
  // legs: striped stockings
  [[sw, '#b8323a', 0.25], [-sw, '#e0444a', 0]].forEach(([an, c, k]) => {
    const [fx, fy] = limb(g, 0, -62, an, 56, 18, 14, c);
    for (let i = 1; i < 4; i++) { const yy = -62 + i * 14; const xx = Math.sin(an) * (i * 14); poly(g, [xx - 9, yy, xx + 9, yy, xx + 9, yy + 5, xx - 9, yy + 5], shade('#f4ecd8', k)); }
    poly(g, [fx - 14, fy - 10, fx + 34, fy - 12, fx + 42, fy - 2, fx + 30, fy + 3, fx - 14, fy + 2], shade('#f1c232', k));
    poly(g, [fx - 14, fy - 2, fx + 40, fy - 2, fx + 30, fy + 3, fx - 14, fy + 2], shade('#c08a14', k));
  });
  // tutu
  const tu = []; for (let i = 0; i <= 12; i++) { const x = -62 + i * 10.5; tu.push(x, i % 2 ? -50 : -40); } tu.push(48, -76, -50, -76);
  poly(g, tu, '#f08bb4'); poly(g, [-56, -64, 46, -64, 44, -74, -52, -74], '#d0608f');
  // belly (polka dots)
  ell(g, 2, -112, 50, 50, '#f6efe2'); ell(g, -12, -108, 38, 44, '#e3d8c8');
  ell(g, 10, -116, 36, 38, '#fbf6ec');
  if (S.flags.waiter) { poly(g, [-30, -130, 40, -130, 46, -60, -36, -60], '#f8f8f4'); poly(g, [-30, -130, 40, -130, 38, -122, -28, -122], '#d8d8d0'); poly(g, [-6, -152, 2, -146, -6, -140], '#1a1a1a'); poly(g, [10, -152, 2, -146, 10, -140], '#1a1a1a'); ell(g, 2, -146, 3, 3, '#1a1a1a'); }
  [[-20, -130, '#3a8fd0'], [22, -98, '#e0444a'], [6, -140, '#f1c232'], [-16, -92, '#5fb85a'], [30, -132, '#3a8fd0']].forEach(([x, y, c]) => ell(g, x, y, 6, 6, c));
  // back arm
  const [bx, by] = limb(g, -30, -136, -sw * 0.7 - 0.2, 54, 16, 12, '#e3d8c8'); ell(g, bx, by + 4, 9, 9, '#ffffff');
  // toilet seat collar
  ell(g, 2, -160, 46, 14, '#fbfbf6'); ell(g, 2, -161, 30, 7, '#c9c2b4'); ell(g, -44, -160, 5, 5, '#b9b2a8');
  // head
  g.save(); g.translate(6, -186);
  poly(g, [-22, 10, 18, 12, 26, -6, 20, -26, 0, -32, -20, -24, -26, -6], '#fbf3ea');
  poly(g, [-22, 10, -4, 12, -10, -30, -20, -24, -26, -6], '#e9ddcf');
  // orange hair tufts
  poly(g, [-26, -6, -40, -18, -34, -2, -44, 2, -30, 6], '#f0812a'); poly(g, [-22, -24, -34, -38, -14, -30], '#f0812a');
  // little cone hat
  poly(g, [-10, -28, 14, -30, 4, -64], '#5b8fd8'); poly(g, [-10, -28, 2, -29, 4, -64], '#4570b8'); ell(g, 4, -66, 6, 6, '#f1c232');
  // eye with blue diamond
  poly(g, [10, -22, 18, -12, 10, -2, 2, -12], '#5b8fd8'); eye(g, 10, -12, t, 1.3, 3);
  g.strokeStyle = '#2a1a10'; g.lineWidth = 3; g.beginPath(); g.moveTo(3, -24 - (a.talk ? Math.abs(Math.sin(t * 5)) * 3 : 0)); g.lineTo(17, -26); g.stroke();
  ell(g, 0, 2, 8, 6, 'rgba(240,110,120,.55)');
  // big red nose
  ell(g, 28, -6, 11, 11, '#e0323a'); ell(g, 31, -9, 3.5, 3, 'rgba(255,255,255,.7)');
  // mouth: big painted smile
  if (a.talk) { const o = 3 + Math.abs(Math.sin(t * 16)) * 6; ell(g, 14, 9, 9, o, '#7a1420'); ell(g, 14, 9 + o * 0.4, 5, o * 0.4, '#e86a7a'); }
  else { g.strokeStyle = '#c42a34'; g.lineWidth = 4; g.beginPath(); g.moveTo(2, 4); g.quadraticCurveTo(14, 14, 24, 4); g.stroke(); }
  g.restore();
  // front arm + plunger
  const arm = a.pose === 'flush' ? -2.4 : sw * 0.7 + 0.25;
  const [hx, hy] = limb(g, 34, -136, arm, 54, 17, 13, '#f6efe2'); ell(g, hx, hy + 4, 9.5, 9.5, '#ffffff');
  if (has('plunger')) { g.save(); g.translate(hx, hy + 4); g.rotate(arm * 0.6 - 0.25); rect(g, -3, -6, 6, 64, '#a8743a'); rect(g, -3, -6, 3, 64, '#c58d4a'); poly(g, [-20, 58, 20, 58, 14, 72, -14, 72], '#c0283a'); poly(g, [-20, 58, 0, 58, -2, 72, -14, 72], '#981c2c'); g.restore(); }
  g.restore();
}
// ---- Santino ----
const SANTINO_SPEC = {
  H: 1.08, skin: '#d99a6c', top: '#2c54b4', bottom: '#2c54b4', shoe: '#1d1d1d', flip: true, hair: '#151013', hairStyle: 'slick', wide: 21, seed: 2,
  torsoFx: (g, hipY, shY, bw) => { poly(g, [bw - 2, hipY + 6, bw + 3, hipY + 6, bw + 8, shY + 6, bw + 3, shY + 6], '#f2f2f2'); g.strokeStyle = '#f1c232'; g.lineWidth = 3; g.beginPath(); g.arc(4, shY + 2, 13, 0.2, Math.PI - 0.2); g.stroke(); ell(g, 4, shY + 16, 5, 5, '#f1c232'); },
  hat: g => { poly(g, [-4, -30, 18, -29, 17, -24, -3, -25], '#141019'); poly(g, [17, -29, 22, -28, 21, -24, 17, -24], '#f1c232'); }
};
