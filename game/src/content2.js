// ================= CONTENT 2: act II (Altamura) and act III (Matera) =================
const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
ACTORS.sciac.parla = async () => {
  if (S.player !== 'santino') return P('Parlo da solo da anni. Si chiama podcast.');
  await dialog('sciacB', [
    { t: 'Compà, come stai?', run: () => say('sciac', 'Puzzo, quindi esisto.') },
    { t: 'Che facciamo adesso?', run: async () => { const h = HINTS.find(([c]) => c()); await say('sciac', h ? 'Anna direbbe: ' + h[1].charAt(0).toLowerCase() + h[1].slice(1) : 'Abbiamo vinto. Andiamo a casa.'); } },
    { t: 'Niente, andiamo.', run: async () => 'end' }
  ]);
};
Object.assign(ACTORS, {
  cugino: { name: 'Il cugino', color: '#d0b0ff', box: true, draw: () => {} },
  atm: { name: 'Bancomat Esploso', color: '#9ff0e0', h: 190, w: 90, noShadow: true, at: () => [1010, 500],
    draw: (g, a, t) => {
      const j = F('atm_calm') ? 0 : Math.sin(t * 47) * 1.5;
      g.translate(j, 0);
      rect(g, -45, -190, 90, 150, '#5a5a62'); rect(g, -45, -190, 90, 150, lg(g, 0, -190, 0, -40, 'rgba(0,0,0,.1)', 'rgba(0,0,0,.5)'));
      poly(g, [-45, -190, -20, -190, -30, -150, -45, -120], '#1a1418'); poly(g, [30, -60, 45, -80, 45, -40, 20, -40], '#1a1418');
      rect(g, -32, -175, 64, 46, '#0a1a18'); rect(g, -28, -171, 56, 38, F('atm_calm') ? '#3aa88a' : '#2a6a6a');
      const sc = F('atm_calm') ? 0 : 1;
      ell(g, -12, -156, 6, 7 + sc * 2, '#e8fff8'); ell(g, 12, -156, 6, 7 + sc * 2, '#e8fff8'); ell(g, -11, -155, 2.5, 3, '#0a1a18'); ell(g, 13, -155, 2.5, 3, '#0a1a18');
      if (a.talk) ell(g, 0, -140, 7, 2 + Math.abs(Math.sin(t * 16)) * 4, '#0a1a18'); else { g.strokeStyle = '#0a1a18'; g.lineWidth = 2; g.beginPath(); if (F('atm_calm')) g.arc(0, -146, 7, 0.2, Math.PI - 0.2); else { g.moveTo(-8, -140); g.lineTo(-3, -143); g.lineTo(3, -139); g.lineTo(8, -142); } g.stroke(); }
      for (let i = 0; i < 9; i++) rect(g, -26 + (i % 3) * 14, -118 + Math.floor(i / 3) * 12, 10, 8, '#8a8a92');
      rect(g, -24, -76, 48, 6, '#0a0a0a');
      if (!F('atm_calm') && Math.sin(t * 7) > 0.9) { g.save(); g.globalCompositeOperation = 'lighter'; glow(g, -30, -150, 20, 'rgba(255,200,80,.9)'); g.restore(); }
    },
    parla: () => atmTalk(), useWith: { phone: () => atmCalm() }, guarda: 'Un bancomat esploso. Annerito, tremante, traumatizzato. Eroga solo ansia.' },
  fornaio: { name: 'Mastro Panetto', color: '#ffe0a0', h: 225, at: () => [600, 500], draw: (g, a, t) => person(g, a, t, { skin: '#e2a07a', top: '#f4f0e6', bottom: '#4a4a52', hair: '#3a2a20', hairStyle: 'slick', mus: '#3a2a20', belly: 1.3, seed: 8, armF: (a, t) => 0.4 + Math.sin(t * 3) * 0.2,
    hat: g => { rect(g, -14, -44, 30, 16, '#fbfbf6'); ell(g, 1, -48, 20, 12, '#fbfbf6'); ell(g, -6, -52, 10, 8, '#fff'); },
    torsoFx: (g, h, s, bw) => { poly(g, [-bw + 4, s + 20, bw + 2, s + 20, bw + 6, h + 4, -bw + 2, h + 4], '#fbfbf6'); ell(g, 8, (h + s) / 2 + 10, 8, 5, 'rgba(200,180,150,.5)'); } }),
    parla: () => fornaioTalk() },
  uomo: { name: "L'Uomo di Altamura", color: '#d8c090', h: 215, draw: (g, a, t) => person(g, a, t, { skin: '#b07a4e', top: '#b07a4e', bottom: '#6a4a2a', shoe: '#8a5a3a', hair: '#4a2e1a', hairStyle: 'messy', beard: '#4a2e1a', brow: '#2a1a0a', seed: 9, wide: 28, H: 0.98, nose: 4,
    torsoFx: (g, h, s, bw) => { poly(g, [-bw, h + 6, bw + 2, h + 6, bw + 6, h - 16, -bw - 2, h - 16], '#7a5a2a'); poly(g, [0, s + 2, 8, s + 2, 6, s + 46, 3, s + 52, 0, s + 46], '#2a4aa0'); },
    hand: (g, x, y) => { rect(g, x - 18, y, 36, 26, '#3a2414'); rect(g, x - 6, y - 6, 12, 6, '#3a2414'); } }),
    parla: () => uomoTalk(), giveWith: { libro: () => uomoLibro() } },
  turista1: { name: 'Turista americano', color: '#ffb0b0', h: 215, draw: (g, a, t) => person(g, a, t, { skin: '#f0b8a0', top: '#e8584a', bottom: '#d8c8a0', shoe: '#e8e8e8', hair: '#c8a060', hairStyle: 'comb', belly: 1.5, seed: 10,
    torsoFx: (g, h, s) => { for (let i = 0; i < 6; i++) ell(g, -14 + (i % 3) * 14, s + 18 + Math.floor(i / 3) * 26, 5, 4, '#f1e232'); rect(g, -4, s + 6, 18, 12, '#1a1a1a'); ell(g, 5, s + 12, 4, 4, '#4a6a8a'); },
    hat: g => { poly(g, [-26, -20, 30, -20, 20, -26, 14, -40, -10, -40, -16, -26], '#e8dcb0'); } }), parla: () => turistiTalk() },
  turista2: { name: 'Turista americana', color: '#ffd0f0', h: 205, draw: (g, a, t) => person(g, a, t, { skin: '#f4c4a8', top: '#3ac0c0', bottom: '#f4f0e6', shoe: '#e8e8e8', hair: '#f0d070', hairStyle: 'bob', shades: true, seed: 11 }), parla: () => turistiTalk() },
  dentista: { name: 'Il Dentista (quasi)', color: '#c0f0ff', h: 220, draw: (g, a, t) => person(g, a, t, { skin: '#dfa27a', top: '#f6f6f2', bottom: '#3a3a44', hair: '#1a1416', hairStyle: 'slick', mus: '#1a1416', seed: 12,
    hat: g => { ell(g, 6, -30, 9, 9, '#c8d0d8'); ell(g, 6, -30, 5, 5, '#f4f8ff'); }, hand: (g, x, y) => { rect(g, x - 2, y - 24, 4, 24, '#c8c8d0'); ell(g, x, y - 26, 4, 3, '#e8e8f0'); } }),
    parla: () => dentistaTalk(), giveWith: { diploma: () => dentistaDiploma() } },
  guardia: { name: 'Guardia del set', color: '#e0e0e0', h: 235, draw: (g, a, t) => person(g, a, t, { skin: '#c88a64', top: '#1a1a20', bottom: '#1a1a20', hair: '#141014', hairStyle: 'bald', shades: true, wide: 30, H: 1.08, seed: 13, armF: 0.05, armB: -0.05, torsoFx: (g, h, s) => { poly(g, [-2, s, 8, s, 4, s + 30], '#f4f4f4'); } }),
    parla: () => guardiaTalk(), giveWith: { dente: () => guardiaDente() } },
  regista: { name: 'Il Regista Americano', color: '#ffcf80', h: 225, draw: (g, a, t) => person(g, a, t, { skin: '#f0b090', top: '#c8a870', bottom: '#3a4a6a', hair: '#8a6a4a', hairStyle: 'comb', shades: true, seed: 14,
    hat: g => { poly(g, [-34, -22, 36, -24, 28, -30, 18, -30, 16, -46, -12, -46, -14, -30, -26, -28], '#8a5a2a'); poly(g, [-14, -32, 16, -32, 16, -36, -14, -36], '#3a2414'); },
    armF: (a, t) => -1.4 + Math.sin(t * 2) * 0.2, hand: (g, x, y) => { poly(g, [x, y - 6, x + 34, y - 18, x + 34, y + 10, x, y + 4], '#e8e8e8'); } }),
    parla: () => registaTalk() }
});

// ---------- Altamura: Piazza del Duomo ----------
SC.altamura = {
  name: 'Altamura, Piazza Duomo', mood: 'altamura', amb: 'piazza', walk: { x0: 70, x1: 1210, y0: 440, y1: 545 }, scale: [0.82, 1.0], start: [700, 500],
  npcs: () => [['atm', 1010, 440, 1, 1], ...(!F('duo') ? [['santino', 880, 505, -1]] : [])],
  bg(g) {
    sky(g, '#5a8fc8', '#a8c8e0', '#f0d8b0', '#e8b07a');
    glow(g, 300, 100, 340, 'rgba(255,220,170,.35)');
    cloud(g, 900, 70, 280, 'rgba(255,245,230,.8)', 'rgba(220,200,200,.5)');
    // cathedral
    const cx = 640;
    facade(g, { x: cx - 210, y: 150, w: 420, h: 290, wall: '#ecd0a6', line: '#7a5a3a' });
    poly(g, [cx - 210, 150, cx, 80, cx + 210, 150], '#e2c296');
    [cx - 270, cx + 210].forEach(x => { facade(g, { x, y: 40, w: 60, h: 400, wall: '#e6c89a', line: '#7a5a3a' }); poly(g, [x - 4, 40, x + 30, -20, x + 64, 40], '#c08a5a'); winArch(g, x + 15, 70, 30, 60, { open: false, shut: '#3a2a40' }); winArch(g, x + 15, 180, 30, 60, { open: false, shut: '#3a2a40' }); });
    ell(g, cx, 230, 56, 56, '#a8865e'); ell(g, cx, 230, 46, 46, '#3a2a48'); for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; g.strokeStyle = '#d8b888'; g.lineWidth = 3; g.beginPath(); g.moveTo(cx, 230); g.lineTo(cx + Math.cos(a) * 46, 230 + Math.sin(a) * 46); g.stroke(); } ell(g, cx, 230, 10, 10, '#d8b888');
    for (let k = 0; k < 3; k++) { g.beginPath(); g.moveTo(cx - 70 + k * 10, 440); g.lineTo(cx - 70 + k * 10, 360); g.arc(cx, 360, 70 - k * 10, Math.PI, 0); g.lineTo(cx + 70 - k * 10, 440); g.fillStyle = ['#c8a070', '#b08a5a', '#4a3020'][k]; g.fill(); }
    ell(g, cx - 90, 420, 14, 20, '#b8986e'); ell(g, cx + 90, 420, 14, 20, '#b8986e');
    // forno
    facade(g, { x: 20, y: 160, w: 360, h: 280, wall: '#d8b080', line: '#6a4a2a', win: { rows: 1, cols: 2, ww: 46, wh: 72, top: 30 }, wo: { shut: '#6a3a2a' } });
    sign(g, 90, 280, 220, 40, 'FORNO ANTICO', '#5a2a14', '#ffd76a', '800 24px Eczar, Bitter, serif');
    rect(g, 140, 330, 100, 110, '#2a1810'); rect(g, 146, 336, 88, 104, lg(g, 0, 336, 0, 440, '#ffb060', '#c86a2a'));
    // bank
    facade(g, { x: 880, y: 140, w: 400, h: 300, wall: '#e0d6c6', line: '#5a5a5a', win: { rows: 1, cols: 3, ww: 46, wh: 72, top: 30 }, wo: { shut: '#4a4a5a', open: false } });
    sign(g, 1060, 270, 180, 34, 'BANCA DELLA MURGIA', '#2a3a5a', '#fff', '800 15px "Alegreya Sans", "Fira Sans", sans-serif');
    g.fillStyle = rg(g, 1010, 330, 140, 'rgba(20,10,10,.85)', 'rgba(20,10,10,0)'); g.fillRect(860, 190, 300, 260);
    for (let i = 0; i < 10; i++) { const a = sr() * 6.28; poly(g, [1010, 330, 1010 + Math.cos(a) * (90 + sr() * 60), 330 + Math.sin(a) * (90 + sr() * 60), 1010 + Math.cos(a + 0.1) * 70, 330 + Math.sin(a + 0.1) * 70], 'rgba(10,5,5,.5)'); }
    poly(g, [1090, 330, 1200, 330, 1200, 440, 1090, 440], '#2a2a32'); poly(g, [1090, 330, 1200, 330, 1196, 336, 1094, 336], '#8a8a92');
    cobbles(g, 436, SH, '#d4ae7e', '#a8845a');
    SEED(21); for (let i = 0; i < 18; i++) poly(g, [990 + sr() * 120, 450 + sr() * 30, 996 + sr() * 120, 448 + sr() * 30, 994 + sr() * 120, 456 + sr() * 30], 'rgba(200,230,255,.6)');
    // pulo path
    rect(g, 1230, 300, 50, 140, '#7a9a5a'); sign(g, 1150, 360, 110, 26, 'Pulo →', '#2f6a3a', '#fff', '700 14px "Alegreya Sans", "Fira Sans", sans-serif');
    rays(g, 300, -40, 1.0, 0.8, 800, 'rgba(255,220,170,.1)', 5);
  },
  anim(g, t) { lights(g, t, 0, 1280, 60, 70, ['#ffd76a', '#ff9a6a', '#ffe8a0']); for (let i = 0; i < 4; i++) { const x = (i * 300 + t * 25) % 1400 - 60, y = 110 + Math.sin(t + i) * 30; g.strokeStyle = '#2a2030'; g.lineWidth = 2; g.beginPath(); g.moveTo(x - 9, y - 3 + Math.sin(t * 11 + i) * 3); g.lineTo(x, y); g.lineTo(x + 9, y - 3 + Math.sin(t * 11 + i) * 3); g.stroke(); } },
  props: [{ y: 545, draw: g => drawPunto(g, 560, 548, 0.85, true) }],
  hot: [
    { id: 'forno', name: 'Forno Antico', r: [140, 330, 100, 110], at: [190, 450], exit: ['forno', 160, 505, 1], guarda: 'Il Forno Antico. Profumo di pane, legna e segreti.' },
    { id: 'pulo', name: 'Sentiero per il Pulo', r: [1220, 290, 60, 160], at: [1200, 460], exit: ['pulo', 150, 490, 1] },
    { id: 'punto', name: 'La Punto di Santino', r: [440, 440, 260, 110], at: [720, 525], def: 'usa', exit: ['mappa'], usa: () => goto('mappa'),
      guarda: async () => { await P('Qualcuno ha tappezzato la Punto di Santino con le chat stampate di un tradimento!'); await P('Leggo: «Amore, la combinazione della cassaforte del forno è il numero di volte che il sindaco di Gravina ha inaugurato la rotonda. Cancella questa chat.»'); await P('Non l\'ha cancellata. L\'ha stampata. E la fidanzata l\'ha incollata sulla prima Punto che passava.'); setF('read_chats'); if (!F('duo') && RT.actors.santino) await say('santino', 'La mia Punto! E non è manco mia la chat! Io sono fidanzato con la Punto!'); } },
    { id: 'duomo', name: 'Cattedrale di Altamura', r: [430, 80, 420, 280], at: [640, 450], guarda: 'La Cattedrale di Altamura, voluta da Federico II. Lui sì che faceva le opere pubbliche in tempo.' },
    { id: 'banca', name: 'Banca della Murgia', r: [1090, 260, 190, 180], at: [1150, 460], guarda: 'La banca. Dopo l\'esplosione, hanno messo un cartello: «Si accettano solo prelievi in contanti».', usa: 'Chiusa. Riapre quando torna il coraggio al bancomat.' }
  ],
  async enter() { if (!F('alt_seen')) { setF('alt_seen'); await P('Altamura! La città del pane, dell\'Uomo preistorico e dei bancomat che esplodono.'); if (RT.actors.santino) await say('santino', 'Il cugino della banca dice: «Chiedete al bancomat, ha visto tutto». Poi ha attaccato. Aveva paura.'); } }
};
async function atmTalk() {
  if (F('atm_calm')) return dialog('atm2', [
    { t: 'Mi servono 16 euro.', cond: () => !F('got_euro'), run: async () => { setF('got_euro'); AU.sfx('cash'); await say('atm', 'Per te, che mi hai salvato la vita: un prelievo. Uno solo. Sedici euro esatti, l\'importo di una marca da bollo. Lo so, ho visto passare tante pratiche.'); give('euro16'); } },
    { t: 'Ripetimi dove passano i soldi del Clan.', run: () => say('atm', 'Dal Forno Antico. Il panettiere li cuoce nel pane e li nasconde nella cassaforte del retro.') },
    { t: 'Stai meglio?', run: () => say('atm', 'Sì. Il silenzio della Fiera mi ha curato. È il nulla più rilassante d\'Europa.') },
    { t: 'Ciao, bancomat.', run: async () => 'end' }]);
  await dialog('atm', [
    { t: 'Ciao! Posso fare un prelievo?', run: async () => { AU.sfx('crash'); await say('atm', 'AAAH! Prelievo?! No, grazie! Ho già dato! Tutto! Anche la tastiera!'); } },
    { t: 'Chi ti ha fatto esplodere?', run: () => line('atm', 'Non lo so! Ero qui, tranquillo, erogavo... e BUM! Ora ogni rumore mi fa tremare.', 'Se solo sentissi qualcosa di rilassante... un posto dove non succede mai niente...') },
    { t: 'Sai qualcosa del Clan dei Pallonari?', run: () => say('atm', 'Lo so, lo so! Ma se parlo, tremo. E se tremo, sputo scontrini. Calmami prima.') },
    { t: 'Ciao.', run: async () => 'end' }
  ]);
}
async function atmCalm() {
  if (F('atm_calm')) return P('È già calmo. Se gli faccio sentire altro silenzio, si addormenta.');
  await P('Ti faccio sentire una cosa. Due ore di silenzio della Fiera di San Giorgio.');
  AU.hush(true); await sleep(1500);
  await say('atm', '...'); await say('atm', '......Che pace. Nessuno compra niente. Nessuno vende niente. Non succede niente.');
  setF('atm_calm'); AU.hush(false); AU.sfx('cash');
  await say('atm', 'Ora posso parlare. I soldi del Clan passano dal Forno Antico! Il panettiere li cuoce nel pane e li chiude nella cassaforte del retro.');
  await say('atm', 'Ma attento: Mastro Panetto non fa passare nessuno senza un duello di pane.');
}

// ---------- Forno Antico ----------
SC.forno = {
  name: 'Forno Antico', mood: 'forno', amb: 'bar', walk: { x0: 110, x1: 1000, y0: 470, y1: 545 }, scale: [0.98, 1.06], start: [160, 505],
  npcs: () => [['fornaio', 700, 470, -1, 0.97]],
  bg(g) {
    rect(g, 0, 0, W, 470, lg(g, 0, 0, 0, 470, '#6a3a22', '#9a5a32'));
    SEED(31); for (let y = 0; y < 470; y += 26) for (let x = (y / 26 % 2) * 30; x < W; x += 60) rect(g, x + 2, y + 2, 56, 22, sr() < 0.5 ? 'rgba(120,60,30,.4)' : 'rgba(60,30,15,.25)');
    // oven
    g.beginPath(); g.moveTo(980, 470); g.lineTo(980, 260); g.quadraticCurveTo(1130, 120, 1280, 260); g.lineTo(1280, 470); g.fillStyle = '#8a5a3a'; g.fill();
    g.beginPath(); g.moveTo(1050, 430); g.lineTo(1050, 340); g.quadraticCurveTo(1130, 270, 1210, 340); g.lineTo(1210, 430); g.fillStyle = '#1a0a06'; g.fill();
    // shelves with bread
    [150, 240].forEach(y => { rect(g, 360, y, 560, 10, '#4a2a14'); for (let i = 0; i < 9; i++) { ell(g, 395 + i * 60, y - 16, 26, 16, '#b8782e'); ell(g, 390 + i * 60, y - 20, 16, 8, '#d89a4a'); } });
    // back room with safe
    rect(g, 130, 170, 200, 300, '#2a1810'); rect(g, 142, 182, 176, 288, '#3a2418');
    rect(g, 170, 280, 120, 130, '#4a4a52'); rect(g, 178, 288, 104, 114, '#5a5a64'); ell(g, 230, 345, 22, 22, '#3a3a42'); ell(g, 230, 345, 14, 14, '#8a8a92'); rect(g, 228, 325, 4, 16, '#2a2a2a');
    sign(g, 150, 190, 160, 30, 'RETRO — PRIVATO', '#f4ecd8', '#8a2a1a', '800 14px "Alegreya Sans", "Fira Sans", sans-serif');
    // flour sacks
    [[420, 470], [470, 470], [445, 440]].forEach(([x, y]) => { poly(g, [x - 30, y, x + 30, y, x + 24, y - 50, x - 24, y - 50], '#e8e0cc'); txt(g, 'FARINA', x, y - 20, '700 10px sans-serif', '#8a6a3a'); });
    rect(g, 0, 470, W, 90, '#5a3a22'); for (let i = 0; i < 20; i++) rect(g, i * 64, 470, 2, 90, 'rgba(0,0,0,.2)');
    rect(g, 0, 300, 90, 170, '#f6d8a0');
  },
  anim(g, t) {
    g.save(); g.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 7; i++) { const x = 1080 + i * 18, h = 40 + Math.sin(t * 9 + i * 1.7) * 18 + Math.sin(t * 5 + i) * 10; poly(g, [x - 12, 430, x + 12, 430, x + Math.sin(t * 6 + i) * 6, 430 - h], ['#ff8a2a', '#ffb24a', '#ff6a1a'][i % 3]); }
    glow(g, 1130, 400, 220 + Math.sin(t * 8) * 10, 'rgba(255,140,40,.32)'); g.restore();
  },
  props: [{ y: 480, draw: g => { poly(g, [520, 380, 900, 380, 910, 392, 510, 392], '#c89a5a'); rect(g, 515, 392, 390, 86, '#6a3a1a'); for (let i = 0; i < 5; i++) { ell(g, 560 + i * 75, 372, 30, 14, '#b8782e'); ell(g, 556 + i * 75, 368, 18, 7, '#d89a4a'); } } }],
  hot: [
    { id: 'esci', name: 'Uscita', r: [0, 300, 90, 170], at: [130, 505], exit: ['altamura', 190, 455, 1] },
    { id: 'cassaforte', name: 'Cassaforte', r: [170, 280, 120, 130], at: [230, 495],
      guarda: () => P(F('safe_open') ? 'La cassaforte, aperta e vuota. Come le casse del Comune.' : 'Una cassaforte. Ha una tastiera numerica. E un adesivo: «Qui non ci sono soldi del Clan».'),
      usa: async () => {
        if (F('safe_open')) return P('Già aperta. Dentro ora c\'è solo un panino col tonno, abbandonato.');
        if (!F('duel_won')) return say('fornaio', 'Ehi! Nel retro non si passa! Prima mi devi battere a duello di pane!');
        const ok = await runMode(KEYPAD);
        if (ok) { AU.sfx('success'); setF('safe_open'); await P('Undici! Click! Si apre! Dentro c\'è il libro mastro del Clan dei Pallonari! E un panino col tonno abbandonato.'); give('libro'); give('panino'); }
        else { AU.sfx('fail'); await P(F('read_chats') ? 'Sbagliato. Il numero delle inaugurazioni... quante erano?' : 'Non conosco la combinazione. Qualcuno, da qualche parte, l\'avrà scritta.'); }
      } },
    { id: 'forno', name: 'Forno a legna', r: [990, 250, 290, 220], at: [960, 505], guarda: 'Il forno a legna. Acceso dal 1891. L\'unica cosa ad Altamura che non si spegne mai.', sciacqua: 'Fluuush! Il fuoco sfrigola e il fornaio mi guarda come se avessi bestemmiato.', usa: 'Mi brucerei il naso. E il naso è il mio capitale.' },
    { id: 'pani', name: 'Pane di Altamura', r: [360, 110, 560, 150], at: [640, 500], guarda: 'Pane di Altamura DOP. Crosta spessa tre centimetri. Dura una settimana. Come un governo.', prendi: () => say('fornaio', 'Giù le mani! Il pane si conquista! A duello!') },
    { id: 'farina', name: 'Sacchi di farina', r: [380, 400, 130, 75], at: [440, 505], guarda: 'Farina. Tanta farina. Il Clan ci nasconde anche le banconote, a giudicare da quella che spunta.', sciacqua: 'Fluuush. Ora la farina è impasto. Ho appena inventato il pane liquido.' }
  ]
};
const INSULTS = [
  ['Il tuo pane è moscio come la politica gravinese!', 'E il tuo è duro come la testa del tuo sindaco.', ['Moscio sarai tu, e pure tua zia.', 'Veramente io non faccio il pane.']],
  ['A Gravina il lievito non si alza nemmeno con un decreto!', 'Almeno il nostro decreto esiste. Il vostro è ancora in conferenza dei servizi.', ['Il lievito lo compriamo ad Altamura.', 'Ma che ne sai tu del lievito?']],
  ['Puzzi più di una discarica abusiva!', 'Grazie, ho fatto il corso alla pineta comunale.', ['Non è vero, mi sono lavato a Pasqua.', 'E tu puzzi di farina!']],
  ["Altamura ha l'Uomo di Neanderthal, voi che avete?", 'Noi lo abbiamo eletto.', ['Abbiamo il ponte del film di spie!', 'Il pallone di Gravina.']],
  ['Il tuo forno è così freddo che ci conservano le scorie!', 'Allora sei tu che hai vinto l\'appalto?', ['Il mio forno non esiste.', 'Freddo sei tu, come il tuo caffè.']]
];
async function fornaioTalk() {
  await dialog('fornaio', [
    { t: 'Che bel pane!', run: () => say('fornaio', 'Pane di Altamura DOP! Duro fuori, morbido dentro, come me. Ma io sono più duro.') },
    { t: 'Devo entrare nel retro.', cond: () => !F('duel_won'), run: () => line('fornaio', 'Nel retro passa solo chi mi batte a duello di pane!', 'Le regole sono semplici: io ti insulto, tu rispondi meglio. Tre risposte giuste e passi.') },
    { t: 'Ti sfido a duello di pane!', cond: () => !F('duel_won'), run: async () => { const w = await duel(); if (w) return 'end'; } },
    { t: 'Che ne pensi del Clan dei Pallonari?', once: true, run: () => say('fornaio', 'Il Clan? Mai sentito. Questi sacchi pieni di banconote sono... farina. Farina di tipo 500 euro.') },
    { t: 'Ciao, Mastro Panetto.', run: async () => 'end' }
  ]);
}
async function duel() {
  await say('fornaio', 'In guardia! Pagnotta alla mano!'); AU.setMood('forno');
  let ok = 0, ko = 0;
  for (const [ins, good, bads] of shuffle(INSULTS)) {
    await say('fornaio', ins);
    const opts = shuffle([good, ...bads]); const i = await choose(opts); await P(opts[i]);
    if (opts[i] === good) { ok++; AU.sfx('bread'); await say('fornaio', rand(['Ahia! Questa brucia più del forno.', 'Colpito! Ma il mio lievito non si arrende!', 'Ugh! Mi hai incrinato la crosta!'])); }
    else { ko++; AU.sfx('fail'); await say('fornaio', rand(['Ahahah! Risposta più insipida del pane senza sale!', 'Ma che dici? Sei cotto a metà!', 'Patetico. Neanche un grissino risponderebbe così.'])); }
    if (ok >= 3) {
      AU.sfx('win'); setF('duel_won'); achieve('pane');
      await say('fornaio', 'Basta! Mi arrendo! Sei il primo a battermi da quando ho perso contro mia suocera.');
      await say('fornaio', 'Tieni, il mio pane migliore. Duro come il granito. E il retro... il retro è tuo. Io non ho visto niente.');
      give('pane'); return true;
    }
    if (ko >= 2) { await say('fornaio', 'Hai perso! Torna quando avrai la lingua più affilata del mio coltello da pane.'); await P('Devo trovare risposte più velenose. Riproviamo.'); return false; }
  }
  return false;
}
const KEYPAD = {
  init() { this.code = ''; this.msg = 'COMBINAZIONE'; },
  btns() { const b = []; '1234567890'.split('').forEach((d, i) => b.push({ d, r: i < 9 ? [470 + (i % 3) * 120, 200 + Math.floor(i / 3) * 80, 100, 66] : [590, 440, 100, 66] })); b.push({ d: 'C', r: [470, 440, 100, 66] }); b.push({ d: 'OK', r: [710, 440, 100, 66] }); b.push({ d: 'X', r: [830, 80, 60, 50] }); return b; },
  draw(g) {
    g.fillStyle = 'rgba(10,6,14,.7)'; g.fillRect(0, 0, W, H);
    rect(g, 430, 70, 470, 470, '#4a4a52'); rect(g, 440, 80, 450, 450, '#5a5a64');
    rect(g, 470, 110, 340, 70, '#0a1a14'); txt(g, this.code || this.msg, 640, 160, '800 40px monospace', '#5aff9a');
    for (const b of this.btns()) { const hv = inR(RT.mouse.x, RT.mouse.y, b.r); g.fillStyle = hv ? '#9a9aa4' : '#7a7a84'; rr(g, ...b.r, 10); g.fill(); txt(g, b.d, b.r[0] + b.r[2] / 2, b.r[1] + b.r[3] / 2 + 12, '800 30px "Alegreya Sans", "Fira Sans", sans-serif', '#1a1a20'); }
  },
  click(x, y) { for (const b of this.btns()) if (inR(x, y, b.r)) { AU.sfx('beep'); if (b.d === 'X') return this.done(false); if (b.d === 'C') { this.code = ''; return; } if (b.d === 'OK') return this.done(this.code === '11'); if (this.code.length < 6) this.code += b.d; } },
  key(k) { if (/^[0-9]$/.test(k) && this.code.length < 6) { this.code += k; AU.sfx('beep'); } else if (k === 'Enter') this.done(this.code === '11'); else if (k === 'Escape') this.done(false); else if (k === 'Backspace') this.code = this.code.slice(0, -1); }
};

// ---------- Pulo di Altamura ----------
SC.pulo = {
  name: 'Pulo di Altamura', mood: 'pulo', amb: 'vento', walk: { x0: 100, x1: 1180, y0: 455, y1: 545 }, scale: [0.82, 0.98], start: [150, 495],
  npcs: () => F('pane_bridge') ? [['uomo', 800, 480, -1]] : [],
  bg(g) {
    sky(g, '#4f86c0', '#a8c8e0', '#e8dcc0');
    hills(g, 210, 30, '#9aa878', 8, 4);
    rect(g, 0, 200, W, 360, '#b0a070');
    ell(g, 640, 330, 520, 150, '#7a6a4a'); ell(g, 640, 340, 480, 128, '#5a4e36'); ell(g, 640, 352, 430, 104, '#3e3626'); ell(g, 640, 366, 360, 76, '#2a2418'); ell(g, 640, 380, 260, 44, '#1a160e');
    SEED(41); for (let i = 0; i < 40; i++) { const a = sr() * Math.PI * 2, rx = 480 + sr() * 30, ry = 130; ell(g, 640 + Math.cos(a) * rx, 340 + Math.sin(a) * ry, 24 + sr() * 20, 10 + sr() * 8, ['#4a6a3a', '#5a7a3a', '#6a8a4a'][i % 3]); }
    for (let i = 0; i < 6; i++) { g.strokeStyle = 'rgba(0,0,0,.15)'; g.lineWidth = 2; g.beginPath(); g.ellipse(640, 340 + i * 8, 500 - i * 40, 140 - i * 18, 0, 0, Math.PI); g.stroke(); }
    rect(g, 0, 450, W, 110, lg(g, 0, 450, 0, 560, '#c8b080', '#a08a5a'));
    sign(g, 140, 360, 200, 56, 'PULO DI ALTAMURA', '#5a3a1a', '#fff', '800 18px Eczar, Bitter, serif'); txt(g, 'Profondità: 92 m', 240, 410, '700 12px sans-serif', '#f4ecd8'); rect(g, 236, 416, 8, 40, '#5a3a1a');
    [[60, 470], [1220, 460], [1100, 480]].forEach(([x, y]) => { ell(g, x, y - 20, 40, 30, '#5a7a3a'); ell(g, x - 10, y - 30, 26, 18, '#6a8a4a'); });
    rays(g, 900, -30, 1.9, 0.6, 600, 'rgba(255,250,220,.1)', 4);
  },
  anim(g, t) { for (let i = 0; i < 3; i++) { const x = 400 + Math.sin(t * 0.3 + i * 2) * 300, y = 120 + Math.sin(t * 0.5 + i) * 30; g.strokeStyle = '#2a2a2a'; g.lineWidth = 2; g.beginPath(); g.moveTo(x - 14, y - 4 + Math.sin(t * 3 + i) * 2); g.lineTo(x, y); g.lineTo(x + 14, y - 4 + Math.sin(t * 3 + i) * 2); g.stroke(); } },
  props: [{ y: 452, cond: () => F('pane_bridge'), draw: g => { g.save(); g.translate(640, 400); g.rotate(-0.06); ell(g, 0, 0, 230, 40, '#9a6024'); ell(g, -10, -12, 200, 24, '#c8803a'); ell(g, -30, -20, 120, 10, '#e0a050'); g.strokeStyle = '#7a4818'; g.lineWidth = 4; for (let i = -3; i < 4; i++) { g.beginPath(); g.moveTo(i * 50 - 14, -24); g.lineTo(i * 50 + 14, -4); g.stroke(); } g.restore(); } }],
  hot: [
    { id: 'via', name: 'Verso la piazza', r: [0, 280, 60, 280], at: [120, 495], exit: ['altamura', 1180, 470, -1] },
    { id: 'voragine', name: 'Il Pulo', r: [200, 220, 880, 220], at: [640, 465], hl: false,
      guarda: 'Il Pulo: una dolina di 92 metri. Un buco enorme. Come il bilancio comunale. Laggiù vive qualcuno da 150.000 anni.',
      usa: 'Scendere a mani nude? Non sono mica un consigliere regionale, abituato ad arrampicarsi.',
      sciacqua: 'Fluuush! L\'eco risponde: «...uuush... uush...». Laggiù qualcuno borbotta: «Ancora con questi turisti».',
      parla: async () => { await P('C\'È QUALCUNO?'); await say('narr', '...una voce dal fondo: «Sono in pausa caffè dal Pleistocene. Lasciate un documento.»'); },
      useWith: { pane: async () => { take('pane'); setF('pane_bridge'); AU.sfx('bread'); await P('Lancio il pane di Altamura nel Pulo... si incastra tra le pareti! È così duro che fa da scala!'); await sleep(400); addActor('uomo', 900, 470, -1); AU.sfx('boing'); await say('uomo', 'Chi lancia il pane DOP nel mio ufficio? Ah, un visitatore. Prego, prenda il numero.'); } } }
  ]
};
async function uomoTalk() {
  await dialog('uomo', [
    { t: 'Chi sei?', once: true, run: () => line('uomo', "Sono l'Uomo di Altamura. 150.000 anni di servizio. L'unico dipendente pubblico della Murgia che non si è mai messo in malattia.") },
    { t: 'Cosa sai del Clan dei Pallonari?', run: () => has('libro') ? say('uomo', 'Mi porti le prove. Io lavoro solo con documenti. Lei ce l\'ha, quel libro: me lo dia.') : say('uomo', 'Mi porti delle prove. Documenti, registri, ricevute. Io non lavoro con le chiacchiere: per quelle c\'è il consiglio comunale.') },
    { t: 'Perché hai la cravatta?', once: true, run: () => line('uomo', 'Dress code. Mi hanno nominato Dirigente ad Interim nel 1993. L\'interim dura ancora.') },
    { t: 'Ciao, collega.', run: async () => 'end' }
  ]);
}
async function uomoLibro() {
  if (!has('marca')) return line('uomo', 'Un libro mastro! Molto bene. Ma senza marca da bollo da sedici euro questo documento, giuridicamente, non esiste.', 'Torni con la marca. Io intanto aspetto. Sono bravo ad aspettare: ho iniziato nel Pleistocene.');
  take('marca'); take('libro'); setF('pulo_done');
  await say('uomo', 'Vediamo... Partita doppia, cancellature, conti in pallone di Gravina... Ecco. Chiaro come la crosta del pane.');
  await say('uomo', 'Il Clan vuole costruire un McPallon\'s proprio sopra il deposito di scorie. «Per coprire l\'odore», c\'è scritto.');
  await say('uomo', 'E chi finanzia tutto? Un regista americano. Sta girando un film colossal e, per la location, si è preso... il Ponte Acquedotto di Gravina.');
  await P('Si è preso il PONTE? E dove l\'ha messo?!');
  await say('radio', 'Ultim\'ora! Il Ponte Acquedotto di Gravina è sparito nella notte! È stato avvistato a Matera, sul set di un film. Nei titoli di coda: «Location: Matera».');
  await P('Matera! Di nuovo! Santino, scalda la Punto: andiamo a riprenderci il ponte!');
  S.act = 3; AU.sfx('sting');
  await banner('Atto III', 'Matera, la Rivale');
  await say('uomo', 'Buona fortuna. E se passate da Matera, salutatemi i Sassi. Abitavamo lì prima che costassero due milioni.');
}

// ---------- Matera: Sassi ----------
SC.sassi = {
  name: 'Matera, i Sassi', mood: 'matera', amb: 'matera', walk: { x0: 70, x1: 1210, y0: 450, y1: 545 }, scale: [0.82, 1.0], start: [480, 515],
  npcs: () => [['dentista', 300, 485, 1], ['turista1', 600, 470, 1], ['turista2', 680, 476, -1], ['guardia', 1080, 480, -1]],
  bg(g) {
    sky(g, '#3f7cc0', '#9ac0e0', '#f4d8a8', '#e8a870');
    glow(g, 1050, 140, 320, 'rgba(255,200,140,.4)');
    // tiers of Sassi
    SEED(51);
    for (let row = 0; row < 6; row++) {
      const y = 90 + row * 58, c = ['#d8c098', '#d0b68c', '#c8ac82', '#c2a478', '#baa070', '#b09466'][row];
      for (let x = -40 + (row % 2) * 40; x < W; x += 70 + sr() * 50) {
        const w = 60 + sr() * 60, h = 50 + sr() * 30;
        poly(g, [x, y + h, x, y + 10, x + w * 0.5, y + sr() * 6, x + w, y + 8, x + w, y + h], c);
        poly(g, [x + w, y + 8, x + w + 14, y + 16, x + w + 14, y + h, x + w, y + h], 'rgba(60,30,20,.25)');
        if (sr() < 0.7) { g.beginPath(); const dx = x + w * 0.3, dw = w * 0.32; g.moveTo(dx, y + h); g.lineTo(dx, y + h * 0.5); g.arc(dx + dw / 2, y + h * 0.5, dw / 2, Math.PI, 0); g.lineTo(dx + dw, y + h); g.fillStyle = '#2a1e22'; g.fill(); }
        if (sr() < 0.3) rect(g, x + w * 0.7, y + 18, 10, 12, '#3a2a30');
      }
    }
    // church on top
    facade(g, { x: 760, y: 30, w: 120, h: 100, wall: '#e6d0a8', line: '#6a4a2a' }); poly(g, [760, 30, 820, 0, 880, 30], '#c8a070');
    facade(g, { x: 880, y: -40, w: 40, h: 170, wall: '#e0c8a0', line: '#6a4a2a' }); poly(g, [880, -40, 900, -70, 920, -40], '#b08a5a');
    // ground
    cobbles(g, 440, SH, '#d8c098', '#b09466');
    // dentist studio
    rect(g, 100, 300, 160, 150, '#c8b08a'); doorArch(g, 140, 340, 80, 110, '#4a6a8a');
    sign(g, 90, 300, 180, 34, 'STUDIO DENTISTICO', '#f4f8ff', '#2a4a8a', '800 15px "Alegreya Sans", "Fira Sans", sans-serif'); txt(g, '(quasi)', 180, 352, 'italic 700 14px sans-serif', '#2a4a8a');
    rect(g, 330, 400, 70, 8, '#8a6a4a'); rect(g, 336, 408, 6, 40, '#6a4a2a'); rect(g, 388, 408, 6, 40, '#6a4a2a');
    // set barrier
    rect(g, 1130, 260, 150, 190, '#2a2a30'); sign(g, 1132, 270, 146, 50, 'SET', '#f1c232', '#1a1a1a', '800 30px Eczar, Bitter, serif'); txt(g, 'VIETATO L\'INGRESSO', 1205, 340, '800 12px sans-serif', '#f1c232');
    for (let i = 0; i < 6; i++) poly(g, [1000 + i * 40, 420, 1040 + i * 40, 420, 1036 + i * 40, 432, 996 + i * 40, 432], i % 2 ? '#fff' : '#c8283a');
    rect(g, 996, 420, 6, 40, '#555'); rect(g, 1236, 420, 6, 40, '#555');
    rect(g, 0, 330, 50, 230, 'rgba(255,220,160,.18)');
  },
  props: [{ y: 450, cond: () => !F('got_pen'), draw: g => { g.save(); g.translate(365, 396); g.rotate(-0.3); rect(g, -16, -3, 30, 6, '#222'); rect(g, 12, -2, 6, 4, '#eee'); g.restore(); } }],
  hot: [
    { id: 'belv', name: 'Verso il Belvedere', r: [0, 330, 50, 230], at: [110, 500], exit: ['belvedere', 1150, 500, -1] },
    { id: 'set', name: 'Ingresso del set', r: [1130, 260, 150, 200], at: [1180, 495], exit: ['set', 160, 505, 1],
      exitIf: async () => { if (F('guard_ok')) return true; await say('guardia', 'Alt. Set chiuso. Solo personale autorizzato. E tu non sembri autorizzato a niente.'); return false; } },
    { id: 'studio', name: 'Studio dentistico (quasi)', r: [90, 300, 180, 150], at: [180, 470], guarda: 'Lo studio del dentista. Sotto «Studio Dentistico» qualcuno ha aggiunto «(quasi)» con lo scotch.', usa: 'Dentro c\'è una poltrona da barbiere e una tenaglia da idraulico. Preferisco restare fuori.' },
    { id: 'pen', name: 'Pennarello indelebile', r: [340, 382, 50, 26], at: [360, 485], cond: () => !F('got_pen'), guarda: 'Un pennarello indelebile sul tavolino del dentista. Lo usa per firmare le fatture. Le sue.', prendi: async () => { setF('got_pen'); give('pennarello'); await P('Lo prendo. Il dentista non se ne accorge: sta contando i denti degli altri.'); } },
    { id: 'sassi', name: 'I Sassi', r: [0, 30, 1280, 330], at: null, hl: false, guarda: 'I Sassi di Matera. Una volta erano una vergogna nazionale. Ora sono patrimonio UNESCO e un monolocale costa come un castello.' }
  ],
  async enter() { if (!F('sassi_seen')) { setF('sassi_seen'); await say('santino', 'Matera, compà. Tutto bello, tutto pulito, tutto caro. Qua anche i piccioni hanno il B&B.'); await P('Il set è là in fondo. Ma c\'è una guardia grossa come un consiglio di amministrazione.'); toast('Ora puoi scambiare personaggio: tasto in basso a destra', 'item'); } }
};
async function turistiTalk() {
  await dialog('turisti', [
    { t: 'Siete di Matera?', run: async () => { await say('turista1', 'No, from Ohio! We bought a cave! Two million dollars! Very authentic!'); await say('turista2', 'No stairs inside. Only outside. Two million stairs.'); } },
    { t: 'Conoscete Gravina?', once: true, run: async () => { await say('turista1', 'Gravina? Is that a pasta?'); await say('turista2', 'I think it\'s a cheese. Round. Very aggressive.'); } },
    { t: 'Vi piace Matera?', once: true, run: async () => { await say('turista2', 'We love it! The Wi-Fi is terrible, the water is for tourists only, the neighbours left in 1952. So authentic!'); } },
    { t: 'Che fate con quel tovagliolo, al Belvedere?', cond: () => !F('got_napkin'), once: true, run: () => say('turista1', 'Oh, the napkin! Hotel napkin, sixty dollars. We left it at the table. Take it, honey, we have twelve.') },
    { t: 'Bye bye!', run: async () => 'end' }
  ]);
}
async function dentistaTalk() {
  await dialog('dentista', [
    { t: 'Lei è un dentista?', once: true, run: () => line('dentista', 'Sono un dentista. Quasi. Avevo il diploma di igienista. Poi l\'ho perso. Ma la passione no.') },
    { t: "Mi serve un dente d'oro.", cond: () => !F('got_tooth'), run: () => line('dentista', "Un dente d'oro? Te lo faccio a prezzo amico. Te ne tolgo uno e te lo restituisco dorato.", 'Però senza un diploma la legge dice che non posso. Portami un diploma qualsiasi e chiudo un occhio. Anche due.') },
    { t: 'Come va il lavoro?', once: true, run: () => say('dentista', 'Benissimo! I turisti pagano in dollari e non capiscono quando dico «ops».') },
    { t: 'Arrivederci, dottore.', run: async () => 'end' }
  ]);
}
async function dentistaDiploma() {
  take('diploma'); setF('got_tooth');
  await say('dentista', 'Un diploma su un tovagliolo di lusso! «Università della Vita»! Perfetto, è più di quello che avevo.');
  if (S.player === 'santino') { await say('dentista', 'Apra la bocca.'); await say('santino', 'Non a me! A lui!'); }
  await say('dentista', 'Sciacquone, apra bene... ecco... CRACK!'); AU.sfx('crash');
  await say('sciac', 'AAAAH! Ma era quello sano!');
  await say('dentista', 'Ops. Comunque eccolo, dorato. Tutto compreso. Lo scontrino non esiste.');
  give('dente');
}
async function guardiaTalk() {
  await dialog('guardia', [
    { t: 'Posso entrare nel set?', cond: () => !F('guard_ok'), run: () => line('guardia', 'No. Solo personale autorizzato.', 'A meno che... non mi dimostri il tuo valore. In oro. Io accetto solo oro. Il resto mi annoia.') },
    { t: 'Che film state girando?', once: true, run: () => say('guardia', 'Un colossal. Un eroe americano salva un paesino del Sud dai cattivi del Sud. Non l\'ho letto, ma l\'ho già visto altre cento volte.') },
    { t: 'Ciao.', run: async () => 'end' }
  ]);
}
async function guardiaDente() {
  take('dente'); setF('guard_ok'); AU.sfx('cash');
  await say('guardia', "Oro... un dente d'oro ancora caldo. Va bene. Non ho visto niente. Neanche voi due, e con quel naso è difficile.");
}

// ---------- Matera: Belvedere ----------
SC.belvedere = {
  name: 'Belvedere di Matera', mood: 'matera', amb: 'vento', walk: { x0: 70, x1: 1210, y0: 460, y1: 545 }, scale: [0.85, 1.0], start: [1150, 500],
  bg(g) {
    sky(g, '#4a86c8', '#a8cce4', '#f6dcb0');
    // far Sassi across the ravine
    SEED(61); for (let row = 0; row < 4; row++) for (let x = 300 + row * 10; x < 1280; x += 30 + sr() * 30) { const y = 130 + row * 36, w = 26 + sr() * 30; rect(g, x, y, w, 30, ['#e0cca8', '#d8c09a', '#ceb48e', '#c4a882'][row]); if (sr() < 0.6) rect(g, x + w * 0.4, y + 14, 8, 16, '#3a2a2e'); }
    facade(g, { x: 900, y: 70, w: 70, h: 60, wall: '#eadab8', line: '#6a4a2a' }); poly(g, [900, 70, 935, 46, 970, 70], '#c8a070');
    // ravine
    poly(g, [280, 290, 1280, 280, 1280, 420, 280, 430], '#8a7a5a'); poly(g, [280, 330, 1280, 320, 1280, 400, 280, 410], '#6a5a40'); poly(g, [500, 400, 1100, 395, 1000, 430, 600, 432], '#3a5a3a');
    // hotel
    facade(g, { x: 0, y: 60, w: 320, h: 390, wall: '#f0e6d2', line: '#8a7a6a', win: { rows: 3, cols: 2, ww: 50, wh: 70, top: 40, gapY: 110 }, wo: { shut: '#2a3a5a' } });
    sign(g, 30, 30, 260, 40, 'GRAND HOTEL SASSI ★★★★★', '#2a2a3a', '#f1c232', '800 15px "Alegreya Sans", "Fira Sans", sans-serif');
    // pipe
    rect(g, 316, 120, 14, 330, '#7a8a94'); rect(g, 316, 120, 120, 14, '#7a8a94'); rect(g, 436, 120, 14, 200, '#7a8a94'); ell(g, 443, 330, 26, 10, '#9aa8b0'); rect(g, 318, 300, 10, 10, '#c8283a');
    txt(g, 'ACQUA RISERVATA AI CLIENTI', 220, 470, '700 12px sans-serif', '#2a2a3a');
    ell(g, 443, 360, 60, 18, '#3aa0d8'); ell(g, 443, 355, 50, 12, '#7ad0f0');
    // railing
    rect(g, 330, 440, 950, 8, '#4a3a2a'); for (let i = 0; i < 30; i++) rect(g, 340 + i * 32, 400, 4, 44, '#4a3a2a'); rect(g, 330, 396, 950, 6, '#4a3a2a');
    rect(g, 0, 450, W, 110, lg(g, 0, 450, 0, 560, '#d8c4a0', '#b4a07a'));
    // table
    ell(g, 640, 440, 60, 14, '#f4f0e6'); rect(g, 636, 440, 8, 50, '#555'); [[580, 470], [700, 470]].forEach(([x, y]) => { rect(g, x - 14, y - 36, 28, 6, '#8a6a4a'); rect(g, x - 12, y - 30, 4, 30, '#6a4a2a'); rect(g, x + 8, y - 30, 4, 30, '#6a4a2a'); });
  },
  props: [{ y: 548, draw: g => drawPunto(g, 1000, 548, 0.8) }, { y: 441, cond: () => !F('got_napkin'), draw: g => poly(g, [620, 430, 660, 428, 664, 438, 618, 440], '#ffffff') }],
  hot: [
    { id: 'sassi', name: 'Verso i Sassi', r: [1230, 300, 50, 260], at: [1190, 500], exit: ['sassi', 120, 500, 1] },
    { id: 'tubo', name: "Tubo dell'hotel", r: [310, 110, 150, 270], at: [380, 500],
      guarda: "Il tubo porta l'acqua alla fontana dei clienti dell'hotel. A Matera c'è un piano acqua per i turisti. A Gravina, il piano è pregare.",
      usa: 'Lo giro? Non si gira. È saldato. Come i privilegi.',
      sciacqua: async () => { if (F('water')) return P('La Punto è già piena d\'acqua. Se ne prendo altra, Santino deve guidare in apnea.'); setF('water'); AU.sfx('splash'); await P('Sciacquone al contrario! FLUUUSH... Il flusso si inverte! L\'acqua dell\'hotel finisce nella tanica della Punto!'); give('tanica'); await say('santino', 'Compà, la Punto ha più acqua dell\'acquedotto pugliese!'); } },
    { id: 'tovagliolo', name: 'Tovagliolo di lusso', r: [605, 418, 70, 30], at: [600, 500], cond: () => !F('got_napkin'),
      guarda: 'Un tovagliolo di stoffa dell\'hotel. Ricamato a mano. Costa più della mia carriera.',
      prendi: async () => { if (S.player === 'sciac') return P('Appena mi avvicino, il tovagliolo si affloscia dallo schifo. Meglio che lo prenda Santino.'); setF('got_napkin'); give('tovagliolo'); await P('Lo prendo con eleganza. Acetato e lino: un incontro di culture.'); } },
    { id: 'punto', name: 'La Punto di Santino', r: [880, 455, 240, 100], at: [860, 520], def: 'usa', exit: ['mappa'], usa: () => goto('mappa'), guarda: 'La Punto. Parcheggiata in zona blu, gialla e rossa contemporaneamente.' },
    { id: 'vista', name: 'Panorama sui Sassi', r: [330, 60, 950, 330], hl: false, guarda: 'Che vista. Matera è bellissima. Mi dà fastidio quanto è bella.' },
    { id: 'hotel', name: 'Grand Hotel Sassi', r: [0, 30, 310, 420], at: [200, 500], guarda: 'Cinque stelle. Una per ogni anno che a Gravina aspettiamo l\'acqua.', usa: 'Il portiere mi squadra: «Signore, il carnevale è a febbraio».' }
  ]
};
async function makeDiploma() {
  if (S.player !== 'santino') return P('Il cugino di Santino risponde solo a Santino. È una questione di famiglia. Devo far giocare lui.');
  if (!has('tovagliolo')) return P('Mi serve qualcosa su cui stampare.');
  AU.sfx('phone'); await sleep(900);
  await say('santino', 'Cugino! Mi serve un diploma. Di igienista dentale. Su un tovagliolo.');
  await say('cugino', 'Su tovagliolo? Quello costa di più, è carta pregiata. Dammi due minuti... Mandato!');
  AU.sfx('stamp'); take('tovagliolo'); give('diploma'); achieve('cugino');
  await say('santino', 'Tengo nu cugggino. Te l\'avevo detto, compà.');
}

// ---------- Matera: the film set ----------
SC.set = {
  name: 'Set del Regista Americano', mood: 'set', amb: 'vento', walk: { x0: 110, x1: 1180, y0: 465, y1: 545 }, scale: [0.9, 1.02], start: [160, 505],
  npcs: () => [['regista', 820, 490, -1]],
  bg(g) {
    sky(g, '#3a6ab0', '#88b0d8', '#f0d0a0');
    poly(g, [0, 120, 260, 160, 360, 300, 380, 470, 0, 470], '#b89a6a'); poly(g, [1280, 140, 1020, 170, 920, 300, 900, 470, 1280, 470], '#a88a5a');
    poly(g, [360, 300, 920, 300, 900, 470, 380, 470], '#5a4a36'); poly(g, [400, 420, 880, 420, 870, 470, 410, 470], '#3a5a3a');
    if (!F('bridge_gone')) drawBridge(g, 330, 210, 620);
    // lights and camera
    [[180, 260], [1090, 250]].forEach(([x, y]) => { rect(g, x - 3, y, 6, 200, '#2a2a2a'); poly(g, [x - 30, y - 30, x + 30, y - 30, x + 40, y + 10, x - 40, y + 10], '#1a1a1a'); ell(g, x, y + 4, 28, 10, '#fff8d0'); });
    rect(g, 0, 465, W, 95, lg(g, 0, 465, 0, 560, '#c8b48a', '#a8946a'));
    g.strokeStyle = '#6a5a4a'; g.lineWidth = 4; [[0, 520, 1280, 520], [0, 540, 1280, 540]].forEach(([a, b, c, d]) => { g.beginPath(); g.moveTo(a, b); g.lineTo(c, d); g.stroke(); });
    // camera on dolly
    rect(g, 470, 430, 120, 20, '#3a3a3a'); ell(g, 490, 452, 12, 12, '#1a1a1a'); ell(g, 570, 452, 12, 12, '#1a1a1a'); rect(g, 520, 360, 10, 70, '#2a2a2a'); rect(g, 490, 320, 90, 50, '#1a1a1a'); ell(g, 490, 345, 22, 22, '#2a2a3a'); ell(g, 490, 345, 12, 12, '#4a6a9a'); ell(g, 560, 314, 18, 18, '#1a1a1a');
    // director's chair
    rect(g, 960, 420, 80, 8, '#7a4a2a'); rect(g, 960, 370, 80, 30, '#2a2a3a'); txt(g, 'DIRECTOR', 1000, 391, '800 13px sans-serif', '#fff'); rect(g, 962, 428, 6, 40, '#7a4a2a'); rect(g, 1032, 428, 6, 40, '#7a4a2a');
  },
  anim(g, t) {
    if (F('bridge_gone') && RT.bridgeT != null) { const k = Math.min(1, (RT.t - RT.bridgeT) / 4); g.save(); g.translate(0, -k * 420); drawBridge(g, 330, 210, 620); for (let i = 0; i < 3; i++) { const hx = 420 + i * 220, hy = 120; g.strokeStyle = '#2a2a2a'; g.lineWidth = 2; g.beginPath(); g.moveTo(hx, hy + 40); g.lineTo(hx, 210); g.stroke(); ell(g, hx, hy + 30, 34, 14, '#3a4a3a'); g.fillStyle = '#2a2a2a'; g.fillRect(hx - 60 * Math.cos(t * 30), hy + 12, 120 * Math.cos(t * 30), 3); } g.restore(); }
  },
  props: [{ y: 466, cond: () => !F('ciak_done'), draw: g => { g.save(); g.translate(1000, 418); poly(g, [-22, -2, 22, -2, 22, -26, -22, -26], '#1a1a1a'); for (let i = 0; i < 4; i++) poly(g, [-22 + i * 12, -26, -16 + i * 12, -26, -10 + i * 12, -36, -16 + i * 12, -36], '#fff'); txt(g, 'MATERA', 0, -9, '800 9px sans-serif', '#fff'); g.restore(); } },
    { y: 466, cond: () => F('ciak_done'), draw: g => { g.save(); g.translate(1000, 418); poly(g, [-22, -2, 22, -2, 22, -26, -22, -26], '#1a1a1a'); txt(g, 'GRAVINA', 0, -9, '800 9px sans-serif', '#f1c232'); g.restore(); } }],
  hot: [
    { id: 'esci', name: 'Torna ai Sassi', r: [0, 300, 70, 265], at: [140, 505], exit: ['sassi', 1150, 495, -1] },
    { id: 'ponte', name: 'Il Ponte Acquedotto (rubato)', r: [330, 200, 620, 140], hl: false, cond: () => !F('bridge_gone'), guarda: 'Il Ponte Acquedotto di Gravina! Incastrato in un burrone di Matera, illuminato come un monumento loro.', prendi: 'È un ponte di 90 metri. Neanche col tutù lo sollevo.' },
    { id: 'ciak', name: 'Ciak', r: [970, 380, 60, 45], at: [960, 510], cond: () => !F('ciak_done'),
      guarda: 'Il ciak del film. C\'è scritto: «MATERA — Scena 1 — Il ponte antico». Scritto col gesso. Cancellabile.',
      prendi: () => say('regista', 'Hey! Don\'t touch my clapperboard! That\'s Hollywood property!'),
      useWith: { pennarello: () => ciakSwap() } },
    { id: 'camera', name: 'Macchina da presa', r: [470, 300, 130, 160], at: [530, 505], guarda: 'Una cinepresa da milioni di dollari. Inquadra il nostro ponte e scrive il nome di un\'altra città.', sciacqua: 'Fluuush! L\'obiettivo si appanna. Il regista grida: «Fog! Beautiful! Very Mediterranean!»' }
  ]
};
function drawBridge(g, x, y, w) {
  poly(g, [x, y, x + w, y, x + w, y + 26, x, y + 26], '#d8c4a0'); poly(g, [x, y + 26, x + w, y + 26, x + w, y + 34, x, y + 34], '#b8a07a');
  const n = 7, aw = w / n;
  for (let i = 0; i < n; i++) { const ax = x + i * aw; poly(g, [ax, y + 34, ax + 16, y + 34, ax + 14, y + 260, ax + 2, y + 260], '#c8b08a'); g.beginPath(); g.moveTo(ax + 16, y + 260); g.lineTo(ax + 16, y + 90); g.arc(ax + aw / 2 + 8, y + 90, aw / 2 - 8, Math.PI, 0); g.lineTo(ax + aw, y + 260); g.lineTo(ax + aw, y + 34); g.lineTo(ax + 16, y + 34); g.fillStyle = '#d0b890'; g.fill(); }
  poly(g, [x + w - 2, y + 34, x + w + 12, y + 34, x + w + 10, y + 260, x + w - 2, y + 260], '#c8b08a');
  for (let i = 0; i < 20; i++) rect(g, x + 6 + i * w / 20, y - 12, 4, 12, '#b8a07a'); rect(g, x, y - 14, w, 4, '#b8a07a');
}
async function registaTalk() {
  await dialog('regista', [
    { t: 'Quel ponte è di Gravina!', run: async () => { await say('regista', 'Gravina? Is that a pasta?'); await say(S.player === 'sciac' ? 'santino' : 'sciac', 'No, è il paese che vi ha fatto girare gratis e voi l\'avete messo nei titoli come «location: Southern Italy».'); } },
    { t: 'Perché non pagate i comuni?', once: true, run: async () => { await say('regista', 'In America even the smallest town signs a contract. You guys just gave me a selfie and a plate of orecchiette.'); await say('sciac', 'E aveva ragione lui. Questa è la cosa che fa più male.'); } },
    { t: 'Di cosa parla il film?', once: true, run: () => say('regista', 'A handsome American hero saves a poor little Italian village from evil Italian villains. It\'s original. Nobody did it before. Except everybody.') },
    { t: 'Cosa c\'entra il Clan dei Pallonari?', once: true, run: () => say('regista', 'Mr. Pallone? Lovely man. Round. He gave me the bridge in exchange for product placement. His fast food will be in the movie. McPallon\'s: the cheese you can\'t refuse.') },
    { t: 'Bye.', run: async () => 'end' }
  ]);
}
async function ciakSwap() {
  if (!F('regista_away')) return say('regista', 'Hey! Don\'t touch my clapperboard! I never leave this chair. Unless there\'s authentic Italian street food.');
  if (!has('tanica') && !F('water')) return P(S.player === 'santino' ? 'Aspetta. Appena il ponte torna, scappiamo. Prima prendiamo l\'acqua al Belvedere: a Gravina serve più di un ponte.' : 'Aspetta. Se il ponte torna, ce ne andiamo di corsa. Prima prendiamo l\'acqua al Belvedere: a Gravina serve.');
  setF('ciak_done'); AU.sfx('stamp');
  await P('Cancello «MATERA» e scrivo, a caratteri cubitali: «GRAVINA». Con pennarello indelebile. Come la nostra rabbia.');
  if (!RT.actors.regista || RT.actors.regista.hidden) { addActor('regista', 1300, 490, -1); await walkTo('regista', 820, 490); }
  await say('regista', 'Ok people! Scene one! The ancient bridge of... ACTION!');
  await say('regista', '...wait. The clapperboard says GRAVINA. The bridge is from... Gravina? Then the location... the contract... the lawyers!');
  await say('regista', 'NO! Hollywood can\'t pay a small town! Get it out of my shot! Send it back! NOW!');
  setF('bridge_gone'); RT.bridgeT = RT.t; AU.sfx('heli'); await sleep(1500); AU.sfx('heli');
  await sleep(2200);
  await say('narr', 'Tre elicotteri riportano il Ponte Acquedotto a Gravina. In sottofondo, la musica di un film di spie suonata dalla banda di paese.', 5200);
  achieve('matera'); take('pennarello');
  await P('Matera, right? No. GRAVINA. E ora, a casa: Don Pallone ci aspetta.');
  S.act = 4; AU.sfx('sting');
  await banner('Atto IV', 'La Notte delle Scorie');
  await goto('mappa');
}
