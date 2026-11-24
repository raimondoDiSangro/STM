// ================= CONTENT 3: map, hospital, act IV, minigames, endings, title =================
function drawCheeseGuy(g, a, t, big) {
  const k = big ? 1 : 0.62, bob = a.walking ? -Math.abs(Math.sin(a.phase)) * 4 : Math.sin(t * 2 + (big ? 0 : 1.3)) * 1.5;
  g.save(); g.translate(0, bob); g.scale(k, k);
  [[-22, 0.15], [22, 0]].forEach(([x, s]) => { rect(g, x - 7, -40, 14, 40, shade('#f4f0e6', s + 0.2)); poly(g, [x - 10, -6, x + 18, -6, x + 20, 0, x - 10, 0], '#2a1a14'); });
  ell(g, 0, -120, 78, 82, '#f2e3b6'); ell(g, -20, -134, 42, 40, '#fbf2d2'); ell(g, 22, -100, 50, 46, 'rgba(200,170,100,.25)');
  g.strokeStyle = '#8a6a3a'; g.lineWidth = 3; g.beginPath(); g.moveTo(0, -202); g.lineTo(0, -38); g.moveTo(-78, -120); g.quadraticCurveTo(0, -100, 78, -120); g.stroke();
  poly(g, [-60, -160, -20, -190, -6, -80, -40, -60], '#f6f6f0'); poly(g, [60, -160, 20, -190, 6, -80, 40, -60], '#ecece4'); poly(g, [-10, -184, 10, -184, 6, -150, -6, -150], '#c8283a');
  ell(g, 0, -210, 26, 20, '#f2e3b6');
  poly(g, [-30, -222, 30, -222, 22, -228, 16, -252, -16, -252, -22, -228], '#2a2a32'); rect(g, -18, -236, 36, 6, '#c8283a');
  poly(g, [-14, -214, 24, -214, 22, -206, -12, -206], '#141016');
  poly(g, [-4, -200, 34, -204, 40, -196, 22, -198, 8, -194, -6, -196], '#2a1a10');
  if (a.talk) ell(g, 14, -190, 7, 2 + Math.abs(Math.sin(t * 15)) * 4, '#5a1a1a');
  const arm = big ? -0.9 + Math.sin(t * 2) * 0.25 : 0.5;
  const [hx, hy] = limb(g, 66, -150, arm, 60, 18, 14, '#ecece4'); ell(g, hx, hy, 9, 9, '#f2e3b6');
  if (big) { rect(g, hx, hy - 3, 26, 6, '#6a3a1a'); ell(g, hx + 28, hy, 3, 3, '#ff7a2a'); }
  limb(g, -66, -150, -0.3, 56, 18, 14, '#d8d8d0');
  g.restore();
}
Object.assign(ACTORS, {
  stazionario: { name: 'Lo Stazionario', color: '#a8e0ff', h: 215, alpha: 0.62, noShadow: true, draw: (g, a, t) => { g.translate(0, Math.sin(t * 1.5) * 6 - 10); person(g, a, t, { skin: '#c8e8f0', top: '#3a5a9a', bottom: '#2a3a6a', shoe: '#1a2a4a', hair: '#e8f0f8', hairStyle: 'bald', mus: '#e8f0f8', seed: 15, hat: g => { poly(g, [-18, -22, 18, -28, 22, -18, -16, -14], '#2a3a6a'); rect(g, -2, -28, 14, 4, '#f1c232'); }, armF: 0.4, hand: (g, x, y) => { rect(g, x - 1, y - 30, 2, 30, '#c8c8c8'); ell(g, x, y - 34, 10, 8, '#c8283a'); } }); }, parla: () => stazTalk(), useWith: { phone: () => diasporaCall() } },
  pallone: { name: 'Don Pallone', color: '#fff0a0', h: 260, w: 150, draw: (g, a, t) => drawCheeseGuy(g, a, t, true), parla: () => boss() },
  goon1: { name: 'Pallonaro', color: '#e8d8a0', h: 165, w: 100, draw: (g, a, t) => drawCheeseGuy(g, a, t, false), parla: () => goonTalk() },
  goon2: { name: 'Pallonaro', color: '#e8d8a0', h: 165, w: 100, draw: (g, a, t) => drawCheeseGuy(g, a, t, false), parla: () => goonTalk() }
});

// ---------- Map of the Murgia ----------
const MAPLOC = [
  { id: 'gravina', name: 'Gravina in Puglia', x: 360, y: 250, cond: () => S.act >= 2 && S.act < 4, go: () => goto('piazza', 1000, 500, -1) },
  { id: 'ospedale', name: 'Ospedale (sala d\'attesa)', x: 520, y: 440, cond: () => S.act >= 2, go: () => goto('ospedale', 160, 505, 1) },
  { id: 'altamura', name: 'Altamura', x: 640, y: 210, cond: () => S.act >= 2 && S.act < 4, go: () => goto('altamura', 760, 520, -1) },
  { id: 'matera', name: 'Matera', x: 960, y: 380, cond: () => F('pulo_done') && S.act < 4, go: async () => { if (!F('drive_done')) { await fadeTo(1); RT.fade = 0; RT.fadeTo = 0; await runMode(DRIVE); setF('drive_done'); setF('duo'); await goto('sassi', 480, 515, 1); } else await goto('belvedere', 1000, 510, -1); } },
  { id: 'santeramo', name: 'Santeramo', x: 860, y: 140, cond: () => true, go: async () => { if ((S.count.santeramo || 0) >= 5 && S.act >= 2) return goto('santeramo', 140, 505, 1); const n = bump('santeramo', 5, 'santeramo'); await say('narr', ['Santeramo non esiste.', 'Ti ho detto che Santeramo non esiste.', 'Santeramo è una leggenda, come la piscina comunale.', 'Ancora? Santeramo. Non. Esiste.', 'Va bene, esiste. Contento? Clicca di nuovo, se proprio insisti.'][Math.min(n - 1, 4)]); } },
  { id: 'stazione', name: 'Gravina — Stazione', x: 250, y: 160, cond: () => S.act === 4, go: () => goto('stazione', 160, 505, 1) },
  { id: 'cisterna', name: 'Gravina — Cisterna', x: 560, y: 300, cond: () => S.act === 4, go: () => goto('cisterna', 160, 505, 1) },
  { id: 'fiera', name: 'Gravina — Fiera', x: 300, y: 400, cond: () => S.act === 4, go: () => goto('fiera', 160, 505, 1) }
];
SC.mappa = {
  name: 'La Murgia', mood: 'mappa', amb: 'vento', noPlayer: true,
  bg(g) {
    rect(g, 0, 0, W, SH, '#3a2a22');
    poly(g, [60, 30, 1220, 20, 1240, 530, 40, 540], '#e8d6a8');
    rect(g, 60, 30, 1170, 500, lg(g, 0, 30, 0, 530, 'rgba(255,240,200,.3)', 'rgba(120,80,30,.25)'));
    SEED(71); for (let i = 0; i < 30; i++) ell(g, 80 + sr() * 1120, 50 + sr() * 460, 30 + sr() * 70, 12 + sr() * 26, 'rgba(140,150,80,.22)');
    for (let i = 0; i < 12; i++) { const x = 120 + sr() * 1040, y = 60 + sr() * 420; poly(g, [x - 20, y + 10, x, y - 14, x + 20, y + 10], 'rgba(120,90,50,.35)'); }
    g.strokeStyle = 'rgba(90,60,30,.55)'; g.lineWidth = 3; g.setLineDash([10, 8]);
    [[360, 250, 640, 210], [640, 210, 960, 380], [360, 250, 470, 330], [640, 210, 860, 140], [360, 250, 960, 380]].forEach(([a, b, c, d]) => { g.beginPath(); g.moveTo(a, b); g.quadraticCurveTo((a + c) / 2, (b + d) / 2 - 40, c, d); g.stroke(); });
    g.setLineDash([]);
    g.strokeStyle = 'rgba(60,120,160,.5)'; g.lineWidth = 6; g.beginPath(); g.moveTo(980, 60); g.quadraticCurveTo(1010, 260, 1040, 520); g.stroke();
    txt(g, 'LA MURGIA', 640, 500, '800 44px Eczar, Bitter, serif', 'rgba(90,50,20,.55)');
    txt(g, 'SS96', 520, 300, 'italic 700 16px serif', 'rgba(90,50,20,.6)');
    g.save(); g.translate(1130, 110); g.strokeStyle = 'rgba(90,50,20,.6)'; g.lineWidth = 2; g.beginPath(); g.arc(0, 0, 40, 0, 7); g.stroke(); poly(g, [0, -50, 8, 0, 0, 50, -8, 0], 'rgba(160,40,30,.7)'); txt(g, 'N', 0, -56, '800 16px serif', 'rgba(90,50,20,.8)'); g.restore();
    txt(g, 'Scegli una destinazione', 640, 70, '700 20px "Alegreya Sans", "Fira Sans", sans-serif', 'rgba(70,40,20,.8)');
  },
  anim(g, t) {
    if (S.act === 4) { rect(g, 0, 0, W, SH, 'rgba(10,20,60,.45)'); for (let i = 0; i < 40; i++) ell(g, (i * 137) % W, (i * 71) % 200 + 20, 1.5, 1.5, 'rgba(255,255,255,' + (0.4 + 0.4 * Math.sin(t * 2 + i)) + ')'); }
    for (const L of MAPLOC) {
      const on = L.cond(), hv = RT.hover && RT.hover.id === L.id; if (!on) continue;
      const r = hv ? 14 : 10;
      if (on) { glow(g, L.x, L.y, 40, hv ? 'rgba(255,200,80,.6)' : 'rgba(255,200,80,.25)'); }
      ell(g, L.x, L.y, r, r, on ? '#c8283a' : 'rgba(90,70,50,.5)'); ell(g, L.x, L.y, r * 0.4, r * 0.4, '#fff4d8');
      txt(g, L.name, L.x, L.y - 20, '800 19px Eczar, Bitter, serif', on ? '#3a1a0a' : 'rgba(90,70,50,.55)', 'center', on ? ['rgba(255,240,210,.85)', 5] : null);
    }
    // the Punto on the road
    const k = (t * 0.06) % 1; g.save(); g.translate(lerp(360, 640, k), lerp(250, 210, k) - Math.sin(k * Math.PI) * 30); g.scale(0.22, 0.22); drawPunto(g, 0, 0, 1); g.restore();
  },
  hot: MAPLOC.map(L => ({ id: L.id, name: L.name, r: [L.x - 70, L.y - 44, 140, 64], cond: L.cond, def: 'usa', hl: false, usa: L.go, guarda: L.go, parla: L.go, prendi: L.go, dai: L.go, sciacqua: L.go }))
};

// ---------- Hospital waiting room (the bitter ending) ----------
SC.ospedale = {
  name: 'Ospedale, sala d\'attesa', mood: 'ospedale', amb: 'ospedale', walk: { x0: 110, x1: 1170, y0: 470, y1: 545 }, scale: [0.95, 1.05], start: [160, 505],
  bg(g) {
    rect(g, 0, 0, W, 480, lg(g, 0, 0, 0, 480, '#c8dcd0', '#a8c0b4')); rect(g, 0, 300, W, 180, '#8aa89a');
    rect(g, 0, 470, W, 90, '#b8b8a8'); for (let i = 0; i < 16; i++) rect(g, i * 80, 470, 2, 90, 'rgba(0,0,0,.1)');
    for (let i = 0; i < 4; i++) rect(g, 200 + i * 280, 30, 180, 12, '#f4fff8');
    // chairs row
    for (let i = 0; i < 8; i++) { const x = 330 + i * 80; poly(g, [x, 390, x + 60, 390, x + 56, 430, x + 4, 430], '#3a7ac0'); poly(g, [x, 340, x + 60, 340, x + 60, 392, x, 392], '#2a6ab0'); rect(g, x + 6, 430, 4, 40, '#555'); rect(g, x + 50, 430, 4, 40, '#555'); }
    rect(g, 900, 90, 260, 120, '#1a1a1a'); txt(g, 'ORA SERVIAMO', 1030, 122, '700 18px sans-serif', '#ff6a3a');
    poly(g, [120, 100, 260, 104, 258, 280, 118, 276], '#f4f0e0'); txt(g, 'TEMPI DI ATTESA', 189, 140, '800 15px sans-serif', '#b0302a'); txt(g, 'Ortopedia: 2029', 189, 180, '700 13px sans-serif', '#333'); txt(g, 'Cardiologia: 2031', 189, 204, '700 13px sans-serif', '#333'); txt(g, 'Pronto soccorso:', 189, 228, '700 13px sans-serif', '#333'); txt(g, 'pronto, ma tra un po\'', 189, 248, 'italic 700 12px sans-serif', '#333');
    rect(g, 1180, 300, 60, 120, '#d8343a'); txt(g, 'TICKET', 1210, 340, '800 12px sans-serif', '#fff'); rect(g, 1190, 350, 40, 30, '#1a1a1a');
    rect(g, 0, 300, 70, 180, '#f4ecd8');
  },
  anim(g, t) {
    const n = RT.wait ? Math.max(1, 23 - Math.floor((RT.t - RT.wait.t0) / 6)) : 23;
    txt(g, String(n), 1030, 190, '800 56px monospace', (t % 1) < 0.85 ? '#ff6a3a' : '#7a2a1a');
  },
  hot: [
    { id: 'esci', name: 'Uscita', r: [0, 300, 70, 180], at: [130, 505], exit: ['mappa'] },
    { id: 'sedie', name: 'Sedie della sala d\'attesa', r: [320, 330, 650, 140], at: [640, 500],
      guarda: 'Sedie di plastica blu. Ognuna ha visto almeno tre generazioni di attese.',
      usa: async () => { await P('Mi siedo. Il mio numero è il 4.512. Ora serviamo il 23.'); await P('Se resto qui fermo senza toccare niente... prima o poi tocca a me. O no?'); RT.wait = { t0: RT.t, said: 0 }; RT.hud = waitHud; } },
    { id: 'tabellone', name: 'Tabellone', r: [900, 90, 260, 120], at: [1030, 500], guarda: 'Il tabellone dei numeri. Ogni tanto il numero scende invece di salire. Qui il tempo va all\'indietro.' },
    { id: 'tempi', name: 'Tempi di attesa', r: [118, 100, 142, 180], at: [190, 500], guarda: 'Ortopedia: 2029. Cardiologia: 2031. Il cuore può aspettare, dicono.' },
    { id: 'ticket', name: 'Distributore di numeri', r: [1180, 300, 60, 120], at: [1160, 505], usa: 'Prendo il numero: 4.513. Tanto vale avere un numero di scorta.', guarda: 'Il distributore di numeri. Unico macchinario dell\'ospedale che funziona sempre.' }
  ],
  tick() {
    if (!RT.wait) return;
    if (RT.lastClick > RT.wait.t0 + 0.2) { RT.wait = null; RT.hud = null; return; }
    const e = RT.t - RT.wait.t0;
    const msgs = [[20, 'Sono passati venti secondi. Mi sembrano vent\'anni.'], [40, 'Il numero è sceso. Com\'è possibile?'], [60, 'Ho la barba. Prima non l\'avevo.'], [75, 'Forse... forse dovrei andarmene. Molto lontano.']];
    if (RT.wait.said < msgs.length && e > msgs[RT.wait.said][0]) { const m = msgs[RT.wait.said][1]; RT.wait.said++; say(S.player, m); }
    if (e > 90 && !RT.wait.done) { RT.wait.done = true; RT.hud = null; run(() => ending('emigrante')); }
  }
};
function waitHud(g) { if (!RT.wait) return; const e = Math.floor(RT.t - RT.wait.t0); g.fillStyle = 'rgba(15,10,24,.75)'; rr(g, 440, 500, 400, 44, 10); g.fill(); txt(g, 'In attesa... ' + e + ' s  (clic per alzarti)', 640, 530, '700 20px "Alegreya Sans", "Fira Sans", sans-serif', '#f4ead6'); }

// ---------- ACT IV: Stazione ----------
SC.stazione = {
  name: 'Stazione di Gravina (di notte)', mood: 'notte', amb: 'notte', walk: { x0: 110, x1: 1180, y0: 470, y1: 545 }, scale: [0.92, 1.03], start: [160, 505],
  npcs: () => [['stazionario', 760, 480, -1]],
  bg(g) {
    sky(g, '#0a1030', '#1a2a5a', '#3a3a6a');
    SEED(81); for (let i = 0; i < 90; i++) ell(g, sr() * W, sr() * 260, sr() * 1.6 + 0.4, sr() * 1.6 + 0.4, 'rgba(255,255,240,' + (0.3 + sr() * 0.6) + ')');
    ell(g, 1080, 90, 40, 40, '#f4f0d8'); glow(g, 1080, 90, 160, 'rgba(240,240,200,.25)'); ell(g, 1068, 80, 8, 8, 'rgba(200,200,180,.6)');
    facade(g, { x: 120, y: 120, w: 620, h: 220, wall: '#8a7a8a', line: '#2a1a2a', win: { rows: 1, cols: 4, ww: 50, wh: 80, top: 40 }, wo: { shut: '#3a4a3a', glass: '#1a1a2a' } });
    sign(g, 280, 90, 300, 40, 'GRAVINA IN PUGLIA', '#2a3a6a', '#f4f4f4', '800 20px Eczar, Bitter, serif');
    ell(g, 860, 170, 44, 44, '#e8e4d8'); ell(g, 860, 170, 38, 38, '#f8f4e8'); g.strokeStyle = '#1a1a1a'; g.lineWidth = 4; g.beginPath(); g.moveTo(860, 170); g.lineTo(860, 142); g.moveTo(860, 170); g.lineTo(880, 178); g.stroke(); txt(g, '2016', 860, 236, '800 16px sans-serif', '#e8e4d8'); rect(g, 856, 214, 8, 130, '#3a3a4a');
    rect(g, 0, 340, W, 30, '#5a5a6a'); rect(g, 0, 370, W, 70, '#2a2a34');
    g.strokeStyle = '#8a6a4a'; g.lineWidth = 6; for (let x = -20; x < W; x += 40) { g.beginPath(); g.moveTo(x, 440); g.lineTo(x + 20, 372); g.stroke(); }
    rect(g, 0, 388, W, 6, '#9a9aa4'); rect(g, 0, 420, W, 6, '#9a9aa4');
    SEED(83); for (let i = 0; i < 30; i++) ell(g, sr() * W, 380 + sr() * 50, 10 + sr() * 16, 5, 'rgba(80,120,60,.7)');
    rect(g, 0, 440, W, 120, lg(g, 0, 440, 0, 560, '#6a6a7a', '#4a4a5a')); rect(g, 0, 440, W, 8, '#e8e0a0');
    poly(g, [960, 260, 1060, 264, 1058, 330, 958, 326], '#1a1a2a'); txt(g, 'PARTENZE', 1009, 284, '700 13px monospace', '#ffb03a'); txt(g, 'BARI .... SOPPRESSO', 1009, 302, '600 10px monospace', '#ffb03a'); txt(g, 'MATERA .. MAI', 1009, 318, '600 10px monospace', '#ffb03a');
  },
  anim(g, t) {
    if (RT.trainT != null || F('station_open')) { const k = RT.trainT != null ? Math.min(1, (RT.t - RT.trainT) / 4) : 1; const x = lerp(1400, 240, 1 - Math.pow(1 - k, 3)); g.save(); g.translate(x, 0); for (let c = 0; c < 3; c++) { const cx = c * 330; poly(g, [cx, 290, cx + 310, 290, cx + 316, 300, cx + 316, 430, cx, 430], c ? '#c8c8d0' : '#d8343a'); rect(g, cx + 10, 300, 296, 8, '#2a4aa0'); for (let w = 0; w < 5; w++) rect(g, cx + 24 + w * 56, 320, 42, 46, '#f6e0a0'); ell(g, cx + 60, 432, 14, 14, '#1a1a1a'); ell(g, cx + 250, 432, 14, 14, '#1a1a1a'); } glow(g, 0, 380, 120, 'rgba(255,240,180,.5)'); g.restore(); }
  },
  hot: [
    { id: 'esci', name: 'Verso la mappa', r: [0, 300, 60, 260], at: [130, 505], exit: ['mappa'] },
    { id: 'orologio', name: 'Orologio fermo', r: [810, 120, 100, 130], at: [860, 500], guarda: 'L\'orologio della stazione. Fermo al 2016. Come il trasporto pubblico.' },
    { id: 'binari', name: 'Binari', r: [0, 370, 1280, 70], hl: false, at: [640, 480], guarda: () => P(F('station_open') ? 'Un treno! Vero! Con le ruote! Gravina è di nuovo collegata al mondo!' : 'Binari arrugginiti. Ci crescono le margherite. Il treno più recente è passato nel 2016.'), sciacqua: 'Fluuush! Ora i binari sono puliti. Manca solo il treno. E i soldi. E la volontà.' },
    { id: 'partenze', name: 'Tabellone partenze', r: [958, 260, 102, 70], at: [1010, 500], guarda: 'Bari: soppresso. Matera: mai. Altamura: a piedi.' }
  ]
};
async function stazTalk() {
  await dialog('staz', [
    { t: 'Ma tu sei un fantasma?', once: true, run: async () => { await say('stazionario', 'Signori viaggiatori, il treno regionale per Bari è in arrivo... con un ritardo di dieci anni.'); await P('Ma tu sei morto?'); await say('stazionario', 'No. Sono in attesa di ricollocamento.'); } },
    { t: 'Quando riapre la stazione?', run: () => F('station_open') ? say('stazionario', 'È riaperta! Grazie a voi e alla diaspora. Il prossimo treno è... adesso! Che emozione!') : line('stazionario', 'Lo chieda all\'assessore. L\'assessore lo chiederà alla Regione. La Regione chiederà a me. E io sono un fantasma.', 'Basterebbe un passeggero. Uno solo. Ma da dieci anni non viene nessuno. Sono partiti tutti... con l\'autobus.') },
    { t: 'Posso avere un biglietto?', once: true, run: () => say('stazionario', 'Certo. Valido dal 2016. Non obliterare: non c\'è la macchinetta.') },
    { t: 'E se trovassi tanti passeggeri?', cond: () => !F('station_open'), once: true, run: () => line('stazionario', 'Tanti? Allora il treno sarebbe obbligato ad arrivare. È la legge.', 'Ma chi viene a Gravina? Solo chi è partito, quando torna a Natale. E sono sparsi in tutto il mondo.') },
    { t: 'Buonanotte.', run: async () => 'end' }
  ]);
}
async function diasporaCall() {
  if (F('station_open')) return say('stazionario', 'Il treno è già arrivato! Non chiamate più, sennò arriva anche il pullman.');
  await P('Il telefonino di Santino! Chiamo tutti i gravinesi emigrati in una videochiamata. Se sono collegati, diventano passeggeri!');
  if (F('duo')) await say('santino', 'Ho 400 cugini sparsi nel mondo. Uno per continente. Più due in Germania.');
  let ok = false;
  while (!ok) {
    ok = await runMode(DIASPORA);
    if (!ok) { await P('Troppa gente si è disconnessa. Il WiFi della Murgia colpisce ancora. Riproviamo?'); const c = await choose(['Riprova la videochiamata', 'Lascia stare per ora']); if (c === 1) return; }
  }
  setF('station_open'); RT.trainT = RT.t; AU.sfx('train'); achieve('ferroviere');
  await sleep(2500);
  await say('stazionario', 'Il treno! IL TRENO! Dopo dieci anni! ...Ah, è un regionale. Va bene uguale. Piango lo stesso.');
  await P('Quaranta emigrati collegati in video: il treno è obbligato ad arrivare. Gravina è di nuovo sulla mappa ferroviaria!');
}
const DIASPORA = {
  full: true,
  init() {
    const who = [['Peppino', 'Stoccarda'], ['Mariella', 'Torino'], ['Savino', 'Wolfsburg'], ['Rosa', 'Milano'], ['Michele', 'Londra'], ['Angela', 'Atlanta'], ['Nicola', 'Toronto'], ['Lucia', 'Zurigo'], ['Vito', 'Buenos Aires'], ['Tina', 'Bologna'], ['Franco', 'Bruxelles'], ['Carmela', 'Bari (per lavoro)']];
    this.tiles = who.map(([n, c], i) => ({ n, c, st: 'on', k: 0, hue: (i * 47) % 360 }));
    this.t = 0; this.next = 1.2; this.dur = 32; this.res = null; this.msg = null;
  },
  conn() { return this.tiles.filter(x => x.st === 'on').length; },
  rect(i) { return [140 + (i % 4) * 255, 120 + Math.floor(i / 4) * 140, 235, 124]; },
  update(dt) {
    if (this.res != null) return;
    this.t += dt; this.next -= dt;
    if (this.next <= 0) { const on = this.tiles.filter(x => x.st === 'on'); if (on.length) { const x = rand(on); x.st = 'drop'; x.k = 2.6 - Math.min(1.2, this.t / 30); AU.sfx('beep'); } this.next = Math.max(0.45, 1.3 - this.t / 30) * (0.6 + Math.random() * 0.8); }
    for (const x of this.tiles) { if (x.st === 'drop') { x.k -= dt; if (x.k <= 0) { x.st = 'off'; AU.sfx('fail'); } } else if (x.st === 'rec') { x.k -= dt; if (x.k <= 0) x.st = 'on'; } }
    if (this.tiles.filter(x => x.st === 'off').length >= 6) { this.res = false; setTimeout(() => this.done(false), 1600); }
    else if (this.t >= this.dur) { this.res = true; AU.sfx('win'); setTimeout(() => this.done(true), 1600); }
  },
  click(x, y) { if (this.res != null) return; this.tiles.forEach((tl, i) => { if (inR(x, y, this.rect(i)) && tl.st !== 'on' && tl.st !== 'rec') { tl.st = tl.st === 'off' ? 'rec' : 'on'; tl.k = 1.2; AU.sfx('click'); } }); },
  draw(g, t) {
    rect(g, 0, 0, W, H, lg(g, 0, 0, 0, H, '#1a2a4a', '#0a1020'));
    txt(g, 'VIDEOCHIAMATA DELLA DIASPORA GRAVINESE', W / 2, 60, '800 30px Eczar, Bitter, serif', '#ffd76a');
    txt(g, 'Clicca chi lampeggia prima che cada la linea. Resisti fino alla fine!', W / 2, 96, '700 19px "Alegreya Sans", "Fira Sans", sans-serif', '#d8e4f4');
    this.tiles.forEach((tl, i) => {
      const [x, y, w, h] = this.rect(i);
      g.fillStyle = tl.st === 'off' ? '#2a2a32' : tl.st === 'drop' ? ((t * 6) % 1 < 0.5 ? '#8a2a2a' : '#4a2a3a') : '#2a3a5a'; rr(g, x, y, w, h, 12); g.fill();
      if (tl.st !== 'off') { g.save(); g.translate(x + 60, y + 104); const fake = { walking: false, phase: 0, talk: tl.st === 'on' && Math.sin(t * 3 + i) > 0.6 }; g.scale(0.42, 0.42); person(g, fake, t + i, { skin: ['#e2a07a', '#d48d68', '#f0c0a0', '#c88a64'][i % 4], top: 'hsl(' + tl.hue + ',50%,45%)', hair: ['#2a1a14', '#6a4a2a', '#c8a060', '#b8b2ac'][i % 4], hairStyle: ['slick', 'bob', 'comb', 'curly', 'bun', 'bald'][i % 6], seed: i }); g.restore(); }
      txt(g, tl.n, x + 160, y + 46, '800 22px "Alegreya Sans", "Fira Sans", sans-serif', '#fff'); txt(g, tl.c, x + 160, y + 72, '600 16px "Alegreya Sans", "Fira Sans", sans-serif', '#a8c0e0');
      txt(g, tl.st === 'on' ? '● in linea' : tl.st === 'drop' ? 'SEGNALE DEBOLE!' : tl.st === 'rec' ? 'riconnessione…' : 'disconnesso', x + 160, y + 102, '700 15px "Alegreya Sans", "Fira Sans", sans-serif', tl.st === 'on' ? '#7aff9a' : tl.st === 'drop' ? '#ffd76a' : '#9a9aa4');
    });
    const k = Math.min(1, this.t / this.dur); rect(g, 240, 560, 800, 18, '#2a2a3a'); rect(g, 240, 560, 800 * k, 18, '#ffd76a');
    txt(g, 'Collegati: ' + this.conn() + ' / 12', W / 2, 620, '800 24px Eczar, Bitter, serif', '#fff');
    if (this.res != null) { rect(g, 0, 300, W, 120, 'rgba(0,0,0,.7)'); txt(g, this.res ? 'Tutti in linea! Il treno sta arrivando!' : 'Troppe disconnessioni...', W / 2, 375, '800 40px Eczar, Bitter, serif', this.res ? '#7aff9a' : '#ff8a7a'); }
  }
};

// ---------- ACT IV: Cisterna ----------
SC.cisterna = {
  name: 'La cisterna abbandonata', mood: 'notte', amb: 'notte', walk: { x0: 110, x1: 1180, y0: 470, y1: 545 }, scale: [0.9, 1.03], start: [160, 505],
  npcs: () => F('pool_done') ? [['sindaco', 900, 500, -1], ['goon1', 1040, 490, -1], ['goon2', 1130, 505, -1]] : [],
  bg(g) {
    sky(g, '#0a1030', '#1a2a5a', '#3a3a6a');
    SEED(91); for (let i = 0; i < 80; i++) ell(g, sr() * W, sr() * 240, sr() * 1.5 + 0.4, sr() * 1.5 + 0.4, 'rgba(255,255,240,' + (0.3 + sr() * 0.6) + ')');
    ell(g, 200, 80, 30, 30, '#f4f0d8'); glow(g, 200, 80, 130, 'rgba(240,240,200,.22)');
    hills(g, 300, 40, '#1a1a3a', 6, 9);
    rect(g, 0, 300, W, 260, lg(g, 0, 300, 0, 560, '#3a3a4a', '#2a2a34'));
    ell(g, 640, 430, 420, 60, '#5a5a66'); rect(g, 220, 250, 840, 180, '#7a7a86'); ell(g, 640, 250, 420, 50, '#8a8a96'); ell(g, 640, 252, 400, 42, '#2a2a34');
    rect(g, 220, 250, 840, 180, lg(g, 220, 0, 1060, 0, 'rgba(0,0,0,.35)', 'rgba(0,0,0,0)', 'rgba(0,0,0,.4)'));
    for (let i = 0; i < 8; i++) rect(g, 240 + i * 105, 270, 3, 150, 'rgba(0,0,0,.2)');
    txt(g, 'PISCINA 1987?', 520, 360, '800 34px "Alegreya Sans", "Fira Sans", sans-serif', 'rgba(255,120,160,.7)'); txt(g, 'ENTRO L\'ESTATE', 820, 400, '800 22px "Alegreya Sans", "Fira Sans", sans-serif', 'rgba(120,220,255,.6)');
    for (let i = 0; i < 9; i++) rect(g, 1068 + 8, 250 + i * 20, 24, 4, '#9a9aa4'); rect(g, 1068, 240, 4, 190, '#9a9aa4'); rect(g, 1100, 240, 4, 190, '#9a9aa4');
    g.strokeStyle = 'rgba(160,160,170,.6)'; g.lineWidth = 1.5; for (let x = 0; x < W; x += 30) { g.beginPath(); g.moveTo(x, 440); g.lineTo(x + 30, 470); g.moveTo(x + 30, 440); g.lineTo(x, 470); g.stroke(); } rect(g, 0, 438, W, 3, '#9a9aa4');
    rect(g, 0, 470, W, 90, lg(g, 0, 470, 0, 560, '#4a4a54', '#34343c'));
  },
  anim(g, t) {
    if (F('pool_done')) {
      ell(g, 640, 254, 398, 40, '#2a9ad8'); if (!F('got_flamingo')) { g.save(); g.globalCompositeOperation = 'lighter'; for (let i = 0; i < 10; i++) ell(g, 300 + i * 70 + Math.sin(t + i) * 10, 250 + Math.sin(t * 2 + i) * 6, 30, 3, 'rgba(160,230,255,.3)'); glow(g, 640, 250, 400, 'rgba(60,160,255,.25)'); g.restore();
      g.save(); g.translate(560 + Math.sin(t * 0.5) * 60, 248 + Math.sin(t * 2) * 2); ell(g, 0, 0, 40, 10, '#ff7ab0'); poly(g, [26, -4, 34, -40, 44, -46, 40, -36, 32, -2], '#ff7ab0'); poly(g, [44, -46, 54, -42, 44, -40], '#2a2a2a'); g.restore(); }
      lights(g, t, 200, 1080, 200, 30, ['#ffd76a', '#ff7ab0', '#7ad0ff']);
      sign(g, 520, 150, 240, 40, 'PISCINA COMUNALE', '#2a9ad8', '#fff', '800 20px Eczar, Bitter, serif');
    }
  },
  hot: [
    { id: 'esci', name: 'Verso la mappa', r: [0, 300, 60, 260], at: [130, 505], exit: ['mappa'] },
    { id: 'vasca', name: () => F('pool_done') ? 'Piscina comunale' : 'Cisterna vuota', r: [220, 200, 840, 230], at: [640, 485], hl: false,
      guarda: () => P(F('pool_done') ? 'La piscina comunale di Gravina! Promessa nel 1987, realizzata stanotte con acqua rubata a Matera. È la politica più efficiente della storia.' : 'Una cisterna abbandonata. Qualcuno ci ha scritto «PISCINA 1987?». Ha la forma di una promessa.'),
      sciacqua: () => P(F('pool_done') ? 'Fluuush! Ora c\'è anche l\'onda. Piscina con idromassaggio.' : 'Fluuush... Ma non esce niente. Mi serve acqua vera.'),
      useWith: { tanica: async () => {
        take('tanica'); setF('pool_done'); AU.sfx('splash'); await sleep(600); AU.sfx('splash');
        await P('Svuoto la tanica nella cisterna... L\'acqua turistica di Matera riempie tutto! Gravina ha una PISCINA!');
        AU.sfx('car'); addActor('sindaco', 1300, 500, -1); await walkTo('sindaco', 900, 500);
        await say('sindaco', 'Cittadini! Inauguro la piscina comunale! Promessa mantenuta! Da me! Come avevo sempre detto: entro l\'estate prossima!');
        addActor('goon1', 1320, 490, -1); addActor('goon2', 1360, 505, -1); walkTo('goon1', 1040, 490); await walkTo('goon2', 1130, 505);
        await say('goon1', 'Una piscina?! Gratis?! Selfie col sindaco! Lasciamo la Fiera, tanto Don Pallone è chiuso dentro con la sua burrata!');
        await P('Le guardie del Clan hanno abbandonato la Fiera! È il momento: Don Pallone è solo!');
      } } }
  ]
};
async function goonTalk() { if (F('pool_done') && S.scene === 'cisterna') return dialog('goons', [{ t: 'Il capo dov\'è?', run: () => say('goon1', 'Alla Fiera. Le prove le ha nascoste giù nelle grotte, sotto la botola. Ma c\'è Peppino di guardia.') }, { t: 'Qual è la parola d\'ordine per le grotte?', run: async () => { setF('know_pw'); await say('goon2', 'Facile: la frase preferita del sindaco. Quella che dice sempre quando promette qualcosa.'); await say('goon1', 'Shhh! Non dirglielo!... Vabbè, ormai. Siamo in ferie.'); } }, { t: 'Buon bagno.', run: async () => 'end' }]); await say(RT.hover && RT.hover.id === 'goon2' ? 'goon2' : 'goon1', F('pool_done') ? rand(['Lasciaci in pace, stiamo facendo il bagno. Primo bagno a Gravina dal 1987.', 'Il capo? È alla Fiera, da solo. A noi la piscina, a lui le scorie.']) : rand(['Non si passa. Ordine di Don Pallone.', 'Il capo dice che le scorie portano lavoro. Il nostro lavoro è non far passare te.'])); }

// ---------- ACT IV: Fiera di notte ----------
SC.fiera = {
  name: 'Fiera di San Giorgio (di notte)', mood: 'notte', amb: 'fiera', walk: { x0: 110, x1: 1180, y0: 470, y1: 545 }, scale: [0.9, 1.03], start: [160, 505],
  npcs: () => F('boss_done') ? [] : F('pool_done') ? [['pallone', 820, 490, -1]] : [['goon1', 560, 495, -1], ['goon2', 640, 505, -1]],
  bg(g) {
    sky(g, '#06081e', '#141c48', '#2a2a5a');
    SEED(101); for (let i = 0; i < 100; i++) ell(g, sr() * W, sr() * 260, sr() * 1.5 + 0.4, sr() * 1.5 + 0.4, 'rgba(255,255,240,' + (0.3 + sr() * 0.6) + ')');
    g.save(); g.translate(1080, 260); g.strokeStyle = '#3a3a5a'; g.lineWidth = 4; g.beginPath(); g.arc(0, 0, 150, 0, 7); g.stroke(); for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(a) * 150, Math.sin(a) * 150); g.stroke(); rect(g, Math.cos(a) * 150 - 12, Math.sin(a) * 150, 24, 18, '#3a3a5a'); } g.restore(); rect(g, 1074, 260, 12, 200, '#2a2a4a');
    [[60, 'TORRONE'], [300, 'CALZINI'], [540, 'PANINI'], [780, 'MATERASSI']].forEach(([x, s], i) => { rect(g, x, 250, 200, 190, '#3a2a3a'); for (let k = 0; k < 5; k++) poly(g, [x + k * 40, 230, x + k * 40 + 40, 230, x + k * 40 + 44, 262, x + k * 40 - 4, 262], k % 2 ? '#e8e0d0' : ['#c8283a', '#2a6ab0', '#2f9a4a', '#f1c232'][i]); rect(g, x + 10, 280, 180, 100, '#1a1420'); txt(g, s, x + 100, 340, '800 20px "Alegreya Sans", "Fira Sans", sans-serif', 'rgba(255,255,255,.25)'); txt(g, 'CHIUSO', x + 100, 420, '800 16px sans-serif', '#8a6a6a'); });
    rect(g, 0, 440, W, 120, lg(g, 0, 440, 0, 560, '#3a3440', '#24202a'));
    g.save(); g.translate(1000, 470); rect(g, -40, -10, 80, 10, '#5a3a2a'); poly(g, [-50, -40, 40, -50, 50, -30, 20, -20, -40, -20], '#6a3a22'); poly(g, [40, -50, 60, -70, 64, -50, 50, -30], '#6a3a22'); poly(g, [56, -72, 50, -86, 62, -76], '#e8e0d0'); g.restore();
    sign(g, 380, 40, 520, 60, 'FIERA DI SAN GIORGIO', '#5a1a2a', '#ffd76a', '800 34px Eczar, Bitter, serif');
  },
  anim(g, t) {
    lights(g, t, 0, 1280, 120, 40, ['#ffd76a', '#ff6a6a', '#7ad0ff', '#9aff8a']);
    const pulse = 0.6 + 0.4 * Math.sin(t * 3);
    g.save(); g.translate(640, 455); rect(g, -40, -90, 80, 90, '#e0c020'); for (let i = 0; i < 3; i++) rect(g, -40, -80 + i * 28, 80, 6, '#2a2a2a');
    ell(g, 0, -45, 16, 16, '#2a2a2a'); for (let i = 0; i < 3; i++) { const a = i * 2.094 - 1.57; poly(g, [0, -45, Math.cos(a - 0.4) * 15, -45 + Math.sin(a - 0.4) * 15, Math.cos(a + 0.4) * 15, -45 + Math.sin(a + 0.4) * 15], '#e0c020'); }
    if (!F('boss_done')) { g.globalCompositeOperation = 'lighter'; glow(g, 0, -60, 160 * pulse, 'rgba(120,255,80,.4)'); } else { g.globalCompositeOperation = 'source-over'; poly(g, [-60, -110, 60, -100, 56, -76, -64, -86], '#f4f0e0'); txt(g, 'PRATICA SOSPESA', -2, -86, '800 13px sans-serif', '#b0302a'); }
    g.restore();
  },
  hot: [
    { id: 'esci', name: 'Verso la mappa', r: [0, 300, 60, 260], at: [130, 505], exit: ['mappa'] },
    { id: 'fusto', name: 'Fusto di scorie', r: [590, 350, 100, 110], at: [560, 500], guarda: () => P(F('boss_done') ? 'Il fusto di scorie, bloccato dalla burocrazia per trent\'anni. Il Comune lo userà come portavasi.' : 'Un fusto di scorie nucleari. Brilla di verde. Il Clan lo chiama «illuminazione pubblica».'), prendi: 'Lo tocco e mi spuntano due nasi rossi. No grazie.', sciacqua: 'Fluuush! Non si sciacqua la radioattività. Neanche io sono così potente.' },
    { id: 'toro', name: 'Toro meccanico', r: [940, 380, 130, 100], at: [960, 505], guarda: 'Il toro meccanico. L\'attrazione principale della Fiera dal 1998. Funziona a monete da 500 lire.' },
    { id: 'bancarelle', name: 'Bancarelle chiuse', r: [60, 230, 920, 210], hl: false, at: [500, 500], guarda: 'Torrone, calzini, panini, materassi. Tutto chiuso. La Fiera di San Giorgio in piena attività.' }
  ],
  async enter() { if (!F('pool_done') && !F('fiera_seen')) { setF('fiera_seen'); await P('La Fiera di San Giorgio, di notte. Le guardie del Clan bloccano tutto. Devo distrarle.'); } }
};
const ATTACKS = [
  ['Il deposito porta lavoro! Tre posti di lavoro!', 'Osservazione n. 1: due posti su tre sono di tuo cognato. Conflitto di interessi.', ['Il lavoro nobilita l\'uomo, ma tu no.', 'Io non lavoro, sono un pagliaccio.']],
  ['Il sito è idoneo! L\'ha detto la Regione!', 'Osservazione n. 2: sotto la Fiera ci sono le grotte. Lo dice la geologia, non la Regione.', ['La Regione non conta.', 'E allora? Anche io sono idoneo.']],
  ['Ho già vinto l\'appalto! Ho la firma di tutti!', 'Osservazione n. 3: la gara è stata pubblicata su un sito senza WiFi. Nessuno ha potuto partecipare. Nulla.', ['La firma è falsa come il tuo formaggio!', 'Anch\'io ho una firma. Guarda: Sciacquone.']],
  ['Nessuno legge le osservazioni dei cittadini!', 'Osservazione finale: le ho mandate per PEC, con ricevuta di consegna. E la PEC è per sempre.', ['Le leggo io, ad alta voce!', 'Allora le canto. In do maggiore.']]
];
async function boss() {
  if (!has('relazione')) { await say('pallone', 'Osservazioni? Senza documenti sono chiacchiere da bar. Le prove stanno sotto terra, dove tu non scenderai mai.'); return P('Sotto terra... Le grotte sotto la Fiera! Devo trovare un modo di scendere.'); }
  await say('pallone', 'Sciacquone, Sciacquone... tu mi fai venire l\'acidità.');
  await P('Dev\'essere il latte scaduto con cui ti hanno fatto.');
  await say('pallone', 'Ti faccio una proposta che non puoi rifiutare... Vattene. Tanto qui non funziona neanche il WiFi.');
  const c = await choose(['Ti sfido! Con le armi della burocrazia!', 'Fammi entrare nel Clan.', 'Ci penso. Torno dopo.']);
  if (c === 1) { await P('Fammi entrare nel Clan.'); await say('pallone', 'Prima devi superare il colloquio: raccomandazione di tre zii e un curriculum su carta oleata.'); return; }
  if (c === 2) { await P('Ci penso. Torno dopo.'); return say('pallone', 'Bravo. Pensaci entro l\'estate prossima.'); }
  await P('Ti sfido! Con le armi della burocrazia: osservazioni durante la consultazione pubblica!');
  await say('pallone', 'Hahaha! La burocrazia? È casa mia! Avanti!');
  AU.setMood('boss');
  const st = { hp: 4, pz: 3, max: 3 };
  if (has('bombetta')) { take('bombetta'); st.pz = st.max = 5; await P('Prima di cominciare, mangio la bombetta di Santeramo. Pazienza: più due.'); }
  RT.hud = g => { g.save(); g.fillStyle = 'rgba(15,10,24,.78)'; rr(g, 330, 14, 620, 70, 12); g.fill(); txt(g, 'Pratica di Don Pallone', 480, 40, '800 17px "Alegreya Sans", "Fira Sans", sans-serif', '#fff0a0'); rect(g, 380, 50, 200, 16, '#3a2a2a'); rect(g, 380, 50, 200 * st.hp / 4, 16, '#7aff6a'); txt(g, 'Pazienza di Sciacquone', 800, 40, '800 17px "Alegreya Sans", "Fira Sans", sans-serif', '#ffd76a'); rect(g, 700, 50, 200, 16, '#3a2a2a'); rect(g, 700, 50, 200 * st.pz / st.max, 16, '#ff8a6a'); g.restore(); };
  try {
    for (const [atk, good, bads] of ATTACKS) {
      let hit = false;
      while (!hit) {
        await say('pallone', atk);
        const opts = shuffle([good, ...bads]), i = await choose(opts); await P(opts[i]);
        if (opts[i] === good) { hit = true; st.hp--; AU.sfx('stamp'); await say('pallone', rand(['Argh! Un\'osservazione puntuale! La mia pratica si allunga!', 'No! Ora devo rispondere entro novanta giorni!', 'Maledizione! Serve un\'integrazione documentale!'])); }
        else { st.pz--; AU.sfx('fail'); await say('pallone', rand(['Ahahah! Questa non è un\'osservazione, è una battuta!', 'Respinta per vizio di forma!', 'Irricevibile! Ritenta, pagliaccio!'])); if (st.pz <= 0) { await P('Ho perso la pazienza... Devo ricominciare la pratica da capo.'); await say('pallone', 'Torna quando avrai studiato il codice degli appalti, buffone.'); return; } }
      }
    }
  } finally { RT.hud = null; }
  setF('boss_done'); AU.sfx('sting');
  await say('pallone', 'NOOO! Quattro osservazioni! La mia pratica... SOSPESA PER TRENT\'ANNI!');
  await say('pallone', 'Il mio deposito... il mio McPallon\'s... tutto bloccato in conferenza dei servizi! È la fine di un formaggio!');
  hideActor('pallone'); AU.sfx('boing');
  await P('Don Pallone è rotolato via giù per la gravina. Le scorie sono bloccate dalla stessa burocrazia che blocca tutto il resto.');
  await P('Per la prima volta, la burocrazia di Gravina ha salvato Gravina.');
  await ending(F('station_open') ? 'buono' : 'neutro');
}

// ---------- endings ----------
const ENDINGS = {
  buono: { title: 'Lo Scarico Totale', mood: 'finale', lines: ['La Murgia è salva.', 'Il treno è tornato a Gravina. La piscina è piena. Il ponte è a casa.', 'Don Pallone vende formaggi a Santeramo, che non esiste.', 'Il sindaco si prende tutto il merito.', 'Taglia un nastro sulla tomba di Sciacquone.', 'Sciacquone non è morto. Ma il nastro era già pagato.', '', 'Fluuush.'] },
  neutro: { title: 'Il Dossier', mood: 'triste', lines: ['Le scorie sono bloccate. Il ponte è a casa. La piscina è piena.', 'Ma il treno non è mai arrivato.', 'L\'Assessora scrive un dossier sull\'impresa: sessantaquattro pagine.', 'Sulla carta, Gravina è perfetta.', 'Nella realtà, per andare a Bari servono ancora due ore.', '', '(Suggerimento: alla stazione aspettano un passeggero. O quaranta.)'] },
  emigrante: { title: "L'Emigrante", mood: 'triste', lines: ['Sciacquone aspetta. E aspetta. E aspetta.', 'Il suo numero non viene mai chiamato.', 'Un giorno si alza, prende la valigia e parte.', 'Atlanta, Georgia. Una tavola calda aperta ventiquattro ore su ventiquattro.', 'Gli servono il caffè in tre secondi. Senza timbro.', 'Per la prima volta, si sente a casa.', 'Ma ogni tanto, la notte, sente lo sciacquone di Gravina che lo chiama.'] }
};
async function ending(kind) {
  if (kind === 'emigrante') achieve('emigrante'); else achieve('fine');
  RT.speech = null; RT.dlg = null;
  try { localStorage.removeItem('stm_save'); } catch (e) {}
  await fadeTo(1, 2);
  AU.setMood(ENDINGS[kind].mood, 'none'); RT.fade = 0; RT.fadeTo = 0;
  await runMode(endingMode(kind));
  await fadeTo(1, 3); RT.fade = 1;
  showTitle();
}
function endingMode(kind) {
  const E = ENDINGS[kind];
  return {
    full: true, t0: null,
    init() { this.t0 = RT.t; },
    draw(g, t) {
      const e = t - this.t0;
      rect(g, 0, 0, W, H, kind === 'emigrante' ? lg(g, 0, 0, 0, H, '#1a1a3a', '#3a2a4a', '#e8885a') : lg(g, 0, 0, 0, H, '#2a4a8a', '#f0c080', '#e8885a'));
      if (kind === 'emigrante') { rect(g, 0, 480, W, 240, '#1a1418'); rect(g, 700, 300, 420, 200, '#e8e0c8'); rect(g, 700, 280, 420, 40, '#e8c020'); txt(g, 'OPEN 24 HOURS', 910, 308, '800 24px "Alegreya Sans", "Fira Sans", sans-serif', '#1a1418'); for (let i = 0; i < 5; i++) rect(g, 720 + i * 80, 340, 60, 70, '#f6e0a0'); glow(g, 910, 380, 300, 'rgba(255,220,140,.3)'); }
      else { drawBridge(g, 140, 300, 1000); rect(g, 0, 560, W, 160, '#5a4a36'); lights(g, t, 0, W, 110, 60, ['#ffd76a', '#ff6a6a', '#7ad0ff', '#9aff8a']); for (let i = 0; i < 14; i++) { const k = ((t * 0.3 + i / 14) % 1); g.save(); g.globalAlpha = 1 - k; ell(g, 200 + i * 70, 300 - k * 260, 4, 4, ['#ffd76a', '#ff6a6a', '#7ad0ff'][i % 3]); g.restore(); } }
      const fake = { walking: false, phase: 0, talk: false, id: 'sciac' };
      g.save(); g.translate(kind === 'emigrante' ? 520 : 640, 660); g.scale(1.3, 1.3); drawSciac(g, fake, t); g.restore();
      g.fillStyle = 'rgba(10,6,16,.55)'; g.fillRect(0, 0, W, 250);
      txt(g, 'FINALE: ' + E.title, W / 2, 70, '800 50px Eczar, Bitter, serif', '#ffd76a');
      E.lines.forEach((l, i) => { const a = clamp((e - 1 - i * 1.6) * 1.5, 0, 1); if (a > 0) { g.save(); g.globalAlpha = a; txt(g, l, W / 2, 110 + i * 19 * 1.2, '700 20px "Alegreya Sans", "Fira Sans", sans-serif', '#f4ead6'); g.restore(); } });
      if (e > 2 + E.lines.length * 1.6) {
        let a = {}; try { a = JSON.parse(localStorage.getItem('stm_ach') || '{}'); } catch (er) {}
        txt(g, 'Trofei: ' + Object.keys(a).length + ' / ' + Object.keys(ACH).length + '   ·   Clic per tornare al titolo', W / 2, 700, '700 20px "Alegreya Sans", "Fira Sans", sans-serif', (t % 1.2) < 0.9 ? '#fff' : '#ccc');
        this.ready = true;
      }
    },
    click() { if (this.ready) this.done(); }
  };
}

// ---------- the SS96 driving minigame ----------
const DRIVE = {
  full: true,
  init() { this.reset(); },
  reset() { this.t = 0; this.lane = 1; this.x = 640; this.obs = []; this.next = 1; this.fines = 0; this.caps = 0; this.res = null; this.flash = 0; this.dur = 38; this.scroll = 0; },
  laneX(l) { return 470 + l * 170; },
  update(dt) {
    if (this.res) return;
    this.t += dt; const sp = 360 + this.t * 9; this.scroll += sp * dt;
    this.x += (this.laneX(this.lane) - this.x) * Math.min(1, dt * 12);
    this.next -= dt;
    if (this.next <= 0) { const ty = Math.random() < 0.22 ? 'cap' : Math.random() < 0.55 ? 'velox' : 'buca'; this.obs.push({ l: Math.floor(Math.random() * 3), y: -60, ty, hit: false }); if (Math.random() < 0.35 + this.t / 80) this.obs.push({ l: Math.floor(Math.random() * 3), y: -260, ty: Math.random() < 0.5 ? 'buca' : 'velox', hit: false }); this.next = Math.max(0.45, 1.05 - this.t / 60); }
    for (const o of this.obs) { o.y += sp * dt; if (!o.hit && o.y > 560 && o.y < 660 && Math.abs(this.laneX(o.l) - this.x) < 80) { o.hit = true; if (o.ty === 'cap') { this.caps++; AU.sfx('pickup'); } else { this.fines++; this.flash = 0.25; AU.sfx(o.ty === 'velox' ? 'flash' : 'crash'); } } }
    this.obs = this.obs.filter(o => o.y < 800 && !(o.hit && o.ty === 'cap'));
    this.flash = Math.max(0, this.flash - dt);
    if (this.fines >= 10) { this.res = 'lose'; AU.sfx('fail'); }
    else if (this.t >= this.dur) { this.res = 'win'; AU.sfx('win'); }
  },
  key(k) { if (this.res) { if (k === 'Enter' || k === ' ') this.after(); return; } if (k === 'ArrowLeft' || k === 'a' || k === 'A') this.lane = Math.max(0, this.lane - 1); if (k === 'ArrowRight' || k === 'd' || k === 'D') this.lane = Math.min(2, this.lane + 1); },
  click(x) { if (this.res) return this.after(); if (x < this.x) this.lane = Math.max(0, this.lane - 1); else this.lane = Math.min(2, this.lane + 1); },
  after() { if (this.res === 'win') return this.done(true); this.reset(); },
  draw(g, t) {
    rect(g, 0, 0, W, H, '#c8b060');
    SEED(5); const off = this.scroll % 160;
    for (let y = -160; y < H + 160; y += 160) { [[60, '#a8a050'], [1140, '#b8a858']].forEach(([x, c]) => { rect(g, x - 60, y + off, 180, 80, c); }); g.strokeStyle = '#d8d0b8'; g.lineWidth = 6; g.beginPath(); g.moveTo(330, y + off); g.lineTo(330, y + off + 120); g.moveTo(950, y + off + 40); g.lineTo(950, y + off + 160); g.stroke(); }
    for (let y = -200; y < H + 200; y += 220) { const yy = y + (this.scroll * 1) % 220; ell(g, 140, yy, 50, 24, '#6a8a3a'); ell(g, 1150, yy + 90, 56, 26, '#5a7a32'); }
    rect(g, 370, 0, 540, H, '#4a4a52'); rect(g, 370, 0, 8, H, '#e8e8e0'); rect(g, 902, 0, 8, H, '#e8e8e0');
    for (let y = -80; y < H + 80; y += 80) { const yy = y + this.scroll % 80; rect(g, 553, yy, 6, 40, '#f1e232'); rect(g, 723, yy, 6, 40, '#f1e232'); }
    for (const o of this.obs) { const x = this.laneX(o.l);
      if (o.ty === 'buca') { ell(g, x, o.y, 50, 22, '#1a1a1e'); ell(g, x + 6, o.y + 4, 38, 14, '#2a2a30'); }
      else if (o.ty === 'velox') { rect(g, x - 34, o.y - 40, 68, 52, '#d8d8dc'); rect(g, x - 26, o.y - 32, 52, 22, '#1a1a1e'); ell(g, x, o.y - 21, 9, 9, '#4a6a9a'); txt(g, 'AUTOVELOX', x, o.y + 6, '800 11px sans-serif', '#c8283a'); if ((t * 4) % 1 < 0.2) glow(g, x, o.y - 21, 50, 'rgba(255,255,255,.8)'); }
      else { ell(g, x, o.y, 22, 22, '#c8c8d0'); ell(g, x, o.y, 12, 12, '#8a8a94'); glow(g, x, o.y, 40, 'rgba(255,240,150,.4)'); } }
    // Punto, top view
    g.save(); g.translate(this.x, 610); g.rotate((this.laneX(this.lane) - this.x) / 900);
    ell(g, 0, 8, 56, 86, 'rgba(0,0,0,.25)'); rr(g, -44, -78, 88, 156, 22); g.fillStyle = '#d8d2c2'; g.fill(); rr(g, -34, -44, 68, 44, 10); g.fillStyle = '#4a6a8a'; g.fill(); rr(g, -32, 20, 64, 30, 8); g.fillStyle = '#4a6a8a'; g.fill(); rect(g, -40, 62, 80, 8, '#c8283a'); ell(g, -30, -74, 8, 5, '#ffe9a0'); ell(g, 30, -74, 8, 5, '#ffe9a0');
    ell(g, -12, -22, 9, 9, '#f0812a'); ell(g, 14, -22, 9, 9, '#151013'); g.restore();
    if (this.flash > 0) { g.fillStyle = 'rgba(255,255,255,' + this.flash * 3 + ')'; g.fillRect(0, 0, W, H); }
    g.fillStyle = 'rgba(15,10,24,.78)'; rr(g, 20, 20, 330, 120, 12); g.fill();
    txt(g, 'SS96 → MATERA', 40, 56, '800 26px Eczar, Bitter, serif', '#ffd76a', 'left'); txt(g, 'Multe: ' + this.fines + ' / 10', 40, 90, '700 22px "Alegreya Sans", "Fira Sans", sans-serif', this.fines > 6 ? '#ff8a7a' : '#fff', 'left'); txt(g, 'Coprimozzi: ' + this.caps, 40, 122, '700 20px "Alegreya Sans", "Fira Sans", sans-serif', '#c8e8ff', 'left');
    const k = Math.min(1, this.t / this.dur); rect(g, 940, 40, 300, 16, '#2a2a3a'); rect(g, 940, 40, 300 * k, 16, '#ffd76a'); txt(g, 'Gravina', 940, 80, '700 15px sans-serif', '#1a1a1a', 'left'); txt(g, 'Matera', 1240, 80, '700 15px sans-serif', '#1a1a1a', 'right');
    if (this.t < 3 && !this.res) { g.fillStyle = 'rgba(15,10,24,.75)'; rr(g, 340, 300, 600, 110, 14); g.fill(); txt(g, 'Frecce ← → (o clic) per cambiare corsia', W / 2, 345, '800 24px "Alegreya Sans", "Fira Sans", sans-serif', '#fff'); txt(g, 'Evita buche e autovelox. 10 multe e lavori per Matera.', W / 2, 382, '700 19px "Alegreya Sans", "Fira Sans", sans-serif', '#ffd76a'); }
    if (this.res) { rect(g, 0, 260, W, 200, 'rgba(10,6,16,.82)'); txt(g, this.res === 'win' ? 'Arrivati a Matera!' : 'Dieci multe! Lavori per l\'ufficio turistico di Matera. Per sempre.', W / 2, 340, '800 ' + (this.res === 'win' ? 48 : 30) + 'px Eczar, Bitter, serif', this.res === 'win' ? '#7aff9a' : '#ff8a7a'); txt(g, this.res === 'win' ? 'Clic per continuare' : 'Clic per riprovare (Santino giura di guidare meglio)', W / 2, 400, '700 22px "Alegreya Sans", "Fira Sans", sans-serif', '#fff'); }
  }
};

// ---------- title screen & menu ----------
function newGame() {
  S.scene = null; S.inv = []; S.flags = {}; S.act = 0; S.player = 'sciac'; S.count = {};
  RT.verb = null; RT.item = null; RT.trainT = null; RT.bridgeT = null; RT.wait = null; RT.hud = null; RT.invOff = 0;
}
const TITLE = {
  full: true,
  init() { this.save = loadSave(); AU.setMood('title', 'piazza'); },
  btns() { const b = [['new', 'Nuova partita']]; if (this.save) b.unshift(['cont', 'Continua']); b.push(['snd', 'Audio: ' + ['spento', 'solo effetti', 'tutto acceso'][AU.level]]); if (window.steam) b.push(['quit', 'Esci dal gioco']); return b.map((x, i) => ({ id: x[0], t: x[1], r: [490, 420 + i * 62, 300, 52] })); },
  draw(g, t) {
    rect(g, 0, 0, W, H, lg(g, 0, 0, 0, H, '#1a2a5a', '#6a5a8a', '#f0a870', '#e8885a'));
    glow(g, 640, 330, 520, 'rgba(255,200,140,.35)');
    for (let i = 0; i < 50; i++) ell(g, (i * 211) % W, (i * 89) % 220, 1.4, 1.4, 'rgba(255,255,240,' + (0.3 + 0.3 * Math.sin(t + i)) + ')');
    poly(g, [0, 480, 120, 400, 260, 430, 420, 380, 600, 420, 760, 370, 920, 410, 1100, 380, 1280, 420, 1280, 720, 0, 720], '#2a1e2e');
    drawBridge(g, 180, 470, 920);
    rect(g, 0, 640, W, 80, '#1a1218');
    lights(g, t, 0, W, 30, 70, ['#ffd76a', '#ff6a6a', '#7ad0ff', '#9aff8a']);
    txt(g, 'SuperTeleMurgia', W / 2, 150, '800 92px Eczar, Bitter, serif', '#ffd76a', 'center', ['#3a1020', 10]);
    txt(g, 'La Leggenda dello Sciacquone', W / 2, 210, '800 40px Eczar, Bitter, serif', '#fff4e0', 'center', ['#3a1020', 7]);
    txt(g, 'Un\'avventura punta-e-clicca nella Murgia', W / 2, 252, '700 22px "Alegreya Sans", "Fira Sans", sans-serif', '#ffe2c8');
    const fake = { walking: false, phase: 0, talk: Math.sin(t * 0.7) > 0.7, id: 'sciac' };
    g.save(); g.translate(240, 640); g.scale(1.25, 1.25); drawSciac(g, fake, t); g.restore();
    const f2 = { walking: false, phase: 0, talk: false, id: 'santino' }; g.save(); g.translate(1060, 640); g.scale(-1.1, 1.1); person(g, f2, t, SANTINO_SPEC); g.restore();
    for (const b of this.btns()) { const hv = inR(RT.mouse.x, RT.mouse.y, b.r); g.fillStyle = hv ? '#c4762c' : 'rgba(40,24,40,.85)'; rr(g, ...b.r, 12); g.fill(); txt(g, b.t, b.r[0] + b.r[2] / 2, b.r[1] + 35, '800 25px Eczar, Bitter, serif', hv ? '#fff' : '#ffe2a6'); }
    txt(g, 'Satira di pura fantasia. Ogni riferimento a fatti o persone reali è puramente casuale. Se ti offendi, sei tu il pagliaccio.', W / 2, 702, '600 15px "Alegreya Sans", "Fira Sans", sans-serif', 'rgba(255,240,220,.7)');
  },
  click(x, y) {
    for (const b of this.btns()) if (inR(x, y, b.r)) {
      AU.sfx('click');
      if (b.id === 'snd') { AU.setLevel((AU.level + 2) % 3); return; } if (b.id === 'quit') { window.steam.quit(); return; }
      if (b.id === 'new') { this.done(); newGame(); RT.fade = 1; goto('bagno'); return; }
      if (b.id === 'cont') { const s = this.save; this.done(); newGame(); Object.assign(S, { inv: s.inv, flags: s.flags, act: s.act, player: s.player, count: s.count || {} }); RT.fade = 1; const p = s.pos || []; goto(s.scene, p[0], p[1], p[2]); return; }
    }
  },
  key(k) { if (k === 'Enter') this.click(640, this.btns()[0].r[1] + 10); }
};
function showTitle() { RT.fade = 1; S.scene = null; runMode(TITLE); fadeTo(0, 2); }
async function menuScreen() {
  const opts = ['Riprendi', 'Torna al titolo (la partita è salvata)', 'Ricomincia da capo'];
  if (window.steam) opts.push('Schermo intero / finestra', 'Esci dal gioco (la partita è salvata)');
  const c = await choose(opts);
  if (c === 3) { window.steam.toggleFullscreen(); return; }
  if (c === 4) { save(); window.steam.quit(); return; }
  if (c === 1) { save(); await fadeTo(1, 4); showTitle(); }
  if (c === 2) { const d = await choose(['No, continuo a giocare', 'Sì, ricomincia dal bagno della Fiera']); if (d === 1) { try { localStorage.removeItem('stm_save'); } catch (e) {} await fadeTo(1, 4); newGame(); goto('bagno'); } }
}

// ---------- boot ----------
(async function boot() {
  resize();
  try { await Promise.race([Promise.all([document.fonts.load('800 30px Eczar'), document.fonts.load('700 20px "Alegreya Sans"'), document.fonts.load('800 20px "Alegreya Sans"'), document.fonts.load('800 30px Bitter'), document.fonts.load('700 20px "Fira Sans"'), document.fonts.load('800 20px "Fira Sans"')]), sleep(2500)]); } catch (e) {}
  requestAnimationFrame(frame);
  if (window.steam) { try { const a = JSON.parse(localStorage.getItem('stm_ach') || '{}'); Object.keys(a).forEach(k => window.steam.achieve('ACH_' + k.toUpperCase())); } catch (e) {} }
  if (window.__TEST__) return;
  showTitle();
})();
