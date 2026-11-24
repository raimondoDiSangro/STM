// ================= CONTENT 4: expansion — gala, cinema, caves, Santeramo, side quests =================
// ---------- new items ----------
Object.assign(ic, {
  grembiule: g => { poly(g, [-16, -10, 16, -10, 20, 22, -20, 22], '#f8f8f4'); poly(g, [-10, -20, 10, -20, 12, -10, -12, -10], '#f8f8f4'); g.strokeStyle = '#999'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(-10, -20); g.lineTo(-18, -26); g.moveTo(10, -20); g.lineTo(18, -26); g.stroke(); },
  invito: g => { rect(g, -20, -14, 40, 28, '#f6ecd0'); g.strokeStyle = '#c8a040'; g.lineWidth = 2; g.strokeRect(-17, -11, 34, 22); txt(g, 'VIP', 0, 5, '800 11px serif', '#8a2a2a'); },
  euro16: g => { rect(g, -22, -10, 30, 18, '#8ab06a'); rect(g, -10, -4, 30, 18, '#5a9ad0'); txt(g, '16€', 5, 10, '800 10px sans-serif', '#fff'); },
  marca: g => { rect(g, -14, -16, 28, 32, '#fff'); g.strokeStyle = '#c8283a'; g.setLineDash([2, 2]); g.strokeRect(-14, -16, 28, 32); g.setLineDash([]); rect(g, -9, -11, 18, 22, '#d86a8a'); txt(g, '16', 0, 5, '800 11px sans-serif', '#fff'); },
  panino: g => { ell(g, 0, 0, 22, 12, '#d8a050'); rect(g, -20, -2, 40, 5, '#8ab05a'); rect(g, -19, 2, 38, 4, '#e8b0a0'); ell(g, 0, -4, 20, 8, '#e8b868'); },
  lanterna: g => { rect(g, -10, -14, 20, 26, '#3a3a3a'); rect(g, -7, -11, 14, 20, '#ffd76a'); glow(g, 0, -1, 22, 'rgba(255,220,120,.5)'); g.strokeStyle = '#3a3a3a'; g.lineWidth = 2; g.beginPath(); g.arc(0, -16, 6, Math.PI, 0); g.stroke(); },
  fenicottero: g => { ell(g, -2, 8, 22, 10, '#ff7ab0'); poly(g, [12, 4, 16, -20, 22, -22, 20, -16, 16, 4], '#ff7ab0'); poly(g, [22, -22, 28, -20, 22, -18], '#2a2a2a'); },
  relazione: g => { rect(g, -16, -22, 32, 44, '#e8dcb0'); for (let i = 0; i < 5; i++) rect(g, -11, -14 + i * 6, 22, 2, '#8a7a5a'); txt(g, '1890', 0, 16, '800 9px serif', '#5a3a1a'); },
  carbonella: g => { poly(g, [-16, -6, 16, -6, 20, 18, -20, 18], '#7a5a3a'); for (let i = 0; i < 5; i++) ell(g, -10 + i * 5, -8 + (i % 2) * 3, 5, 4, '#2a2a2a'); },
  bombetta: g => { ell(g, 0, 2, 16, 14, '#a8582a'); ell(g, -4, -2, 8, 6, '#c8783a'); rect(g, -1, -24, 2, 40, '#c8a878'); glow(g, 0, 0, 26, 'rgba(255,210,80,.35)'); }
});
it('grembiule', 'Grembiule da cameriere', 'Un grembiule bianco del Bar Centrale. Con questo addosso sono invisibile ai ricchi.', { use: async () => { if (F('waiter')) { setF('waiter', false); return P('Tolgo il grembiule. Torno pagliaccio a tempo pieno.'); } setF('waiter'); achieve('cameriere'); await P('Indosso il grembiule e un papillon immaginario. Ora sono personale di sala: nessuno guarda mai il personale di sala.'); } });
it('invito', 'Invito alla cena di gala', '«Cena Fuori dal Comune — 110 coperti sul Ponte Acquedotto». Intestato a un assessore regionale. Che tanto non viene mai.');
it('euro16', 'Sedici euro', 'Sedici euro, erogati da un bancomat traumatizzato. Il prelievo più emozionante della mia vita.');
it('marca', 'Marca da bollo', 'Una marca da bollo da 16 euro. Il vero cemento della Repubblica italiana.');
it('panino', 'Panino col tonno', 'Un panino col tonno dimenticato nella cassaforte del Clan. Ha visto cose. Profuma di cose.');
it('lanterna', 'Lanterna', 'Una lanterna della bancarella dei panini. Fa più luce di tutta l\'illuminazione pubblica.');
it('fenicottero', 'Fenicottero gonfiabile', 'Il fenicottero della piscina comunale. Galleggia, sorride, giudica.');
it('relazione', 'Relazione geologica 1890', '«Sotto la Fiera: grotte, cunicoli, falde acquifere. Non costruirci niente di pesante.» Firmato da un ingegnere del 1890 che aveva già capito tutto.');
it('carbonella', 'Carbonella', 'Carbonella del barbecue abusivo della pineta. Abusiva ma di qualità.');
it('bombetta', 'Bombetta di Santeramo', 'Una bombetta d\'oro: carne, formaggio e mistero. Chi la mangia diventa pazientissimo.');

// ---------- new cast ----------
Object.assign(ACTORS, {
  mimi: { name: 'Zì Mimì Abusivo', color: '#ffb070', h: 210, draw: (g, a, t) => person(g, a, t, { skin: '#d28a62', top: '#e8a83a', bottom: '#5a5a62', shoe: '#b8b8b0', hair: '#3a3a3a', hairStyle: 'bald', mus: '#3a3a3a', belly: 1.6, wide: 28, seed: 16,
    hat: g => { ell(g, 0, -26, 24, 12, '#f1c232'); rect(g, -26, -24, 52, 4, '#d8a82a'); }, hand: (g, x, y, t) => { rect(g, x, y - 3, 22, 5, '#6a3a1a'); ell(g, x + 23, y - 1, 3, 3, '#ff7a2a'); if ((t * 2) % 1 < 0.5) ell(g, x + 26, y - 10 - ((t * 20) % 14), 4, 4, 'rgba(220,220,220,.5)'); } }),
    parla: () => mimiTalk(), giveWith: { invito: () => mimiInvite() } },
  maitre: { name: 'Il Maître', color: '#e8e0ff', h: 225, draw: (g, a, t) => person(g, a, t, { skin: '#ecc0a0', top: '#141018', bottom: '#141018', hair: '#c8c8c8', hairStyle: 'slick', mus: '#c8c8c8', seed: 17, H: 1.06, wide: 20, armF: 0.95,
    torsoFx: (g, h, s) => { poly(g, [-4, s + 2, 10, s + 2, 4, s + 40], '#f8f8f4'); poly(g, [-2, s + 4, 4, s + 8, 10, s + 4, 4, s + 10], '#1a1a1a'); }, hand: (g, x, y) => { ell(g, x + 6, y - 10, 22, 4, '#e8e8e8'); } }),
    parla: () => maitreTalk() },
  ospite1: { name: 'Influencer del food', color: '#ffb8e8', h: 160, draw: (g, a, t) => person(g, a, t, pSit({ skin: '#f0c0a0', top: '#e85a9a', bottom: '#2a2a3a', hair: '#f0d070', hairStyle: 'bob', shades: true, seed: 18, armF: (a, t) => -1.6 + Math.sin(t * 2) * 0.2, hand: (g, x, y) => { rr(g, x - 6, y - 18, 12, 20, 2); g.fillStyle = '#222'; g.fill(); } })), parla: () => galaTalk() },
  ospite2: { name: 'Assessore regionale (in incognito)', color: '#c8f0c8', h: 160, draw: (g, a, t) => person(g, a, t, pSit({ skin: '#e2a07a', top: '#2a3a5a', bottom: '#2a2a3a', hair: '#5a4a3a', hairStyle: 'comb', glasses: '#141014', mus: '#5a4a3a', belly: 1.3, seed: 19, armF: 1.2 })), parla: () => galaTalk() },
  peppino: { name: 'Peppino il Pallonaro', color: '#e8d8a0', h: 165, w: 100, draw: (g, a, t) => { if (!F('password_ok')) g.rotate(-0.08); drawCheeseGuy(g, a, t, false); }, parla: () => peppinoTalk() },
  vigile: { name: 'Vigile di Santeramo', color: '#c0e0ff', h: 220, draw: (g, a, t) => person(g, a, t, { skin: '#d8a07a', top: '#1a2a5a', bottom: '#1a2a5a', hair: '#2a1a10', hairStyle: 'slick', mus: '#2a1a10', seed: 20, armF: (a, t) => -2.4 + Math.sin(t * 4) * 0.4,
    hat: g => { poly(g, [-20, -22, 20, -26, 24, -40, -16, -38], '#f4f4f4'); rect(g, -20, -26, 42, 5, '#1a1a1a'); }, torsoFx: (g, h, s) => { poly(g, [-18, s + 6, 22, h - 10, 18, h - 4, -22, s + 12], '#f4f4f4'); } }),
    parla: () => vigileTalk() },
  macellaio: { name: 'Il Fornellaio', color: '#ffc0a0', h: 225, draw: (g, a, t) => person(g, a, t, { skin: '#d8906a', top: '#f4f0e8', bottom: '#3a3a44', hair: '#2a1a10', hairStyle: 'bald', beard: '#2a1a10', belly: 1.5, wide: 27, seed: 21,
    torsoFx: (g, h, s, bw) => { poly(g, [-bw + 4, s + 16, bw + 4, s + 16, bw + 6, h + 4, -bw + 2, h + 4], '#e8e0d8'); ell(g, 6, (h + s) / 2 + 12, 8, 6, 'rgba(180,40,40,.5)'); }, hand: (g, x, y) => { rect(g, x - 2, y - 30, 4, 30, '#9a9aa4'); for (let i = 0; i < 3; i++) ell(g, x, y - 30 + i * 9, 5, 4, '#a8582a'); } }),
    parla: () => macellaioTalk(), giveWith: { carbonella: () => macellaioCarbon() } },
  tabaccaia: { name: 'La Tabaccaia', color: '#f0d0a0', h: 160, at: () => [350, 470], noShadow: true, draw: (g, a, t) => person(g, a, t, { skin: '#e8b090', top: '#7a3a6a', hair: '#8a3a2a', hairStyle: 'curly', glasses: '#8a6a2a', seed: 22, armF: 0.8 }), parla: () => tabaccaiaTalk(), giveWith: { euro16: () => tabaccaiaMarca() } },
  barbuto: { name: 'Paziente in attesa dal 2019', color: '#d8d8c0', h: 160, draw: (g, a, t) => person(g, a, t, pSit({ skin: '#e0a882', top: '#7a8a9a', bottom: '#4a4a52', hair: '#e8e8e0', hairStyle: 'messy', beard: '#e8e8e0', seed: 23, armF: 0.7, extra: (g, h, s) => { poly(g, [-4, s - 26, 18, s - 26, 22, s + 60, 6, s + 78, -8, s + 60], '#ececE4'); } })), parla: () => pazientiTalk('barbuto') },
  uncinetto: { name: 'Signora con l\'uncinetto', color: '#f8c0d8', h: 160, draw: (g, a, t) => person(g, a, t, pSit({ skin: '#ecbc98', top: '#5a6a3a', bottom: '#3a3a44', hair: '#c8c0c8', hairStyle: 'bun', glasses: '#6a4a3a', seed: 24, armF: (a, t) => 1.3 + Math.sin(t * 9) * 0.12, extra: (g, h, s) => { for (let i = 0; i < 14; i++) rect(g, 30 + i * 14, h + 30 + Math.sin(i) * 3, 14, 9, ['#e85a6a', '#f1c232', '#5aa0d8'][i % 3]); } })), parla: () => pazientiTalk('uncinetto') },
  scheletro: { name: 'Scheletro col numero 12', color: '#f0f0f0', h: 160, draw: (g, a, t) => drawSkeleton(g, a, t), parla: () => pazientiTalk('scheletro') }
});
function drawSkeleton(g, a, t) {
  const b = '#f2efe4'; g.save(); g.translate(0, Math.sin(t * 1.2) * 0.8);
  rect(g, -3, -128, 6, 70, b); for (let i = 0; i < 5; i++) { g.strokeStyle = b; g.lineWidth = 4; g.beginPath(); g.ellipse(0, -118 + i * 12, 16 - i, 5, 0, 0, Math.PI); g.stroke(); }
  limb(g, -2, -58, 1.5, 44, 7, 6, b); limb(g, 38, -60, 0.05, 54, 6, 5, b); limb(g, 2, -58, 1.5, 40, 7, 6, '#e2dfd4'); limb(g, 36, -60, 0.08, 52, 6, 5, '#e2dfd4');
  limb(g, 4, -120, 0.8, 46, 6, 5, b);
  ell(g, 2, -152, 20, 22, b); ell(g, 9, -156, 5, 6, '#2a2a2a'); ell(g, -3, -156, 4, 6, '#2a2a2a'); poly(g, [3, -148, 7, -142, -1, -142], '#2a2a2a'); for (let i = 0; i < 5; i++) rect(g, -6 + i * 4, -138, 3, 5, '#d8d4c8');
  rr(g, 30, -100, 30, 22, 3); g.fillStyle = '#ffffff'; g.fill(); txt(g, '12', 45, -84, '800 14px sans-serif', '#c8283a');
  g.restore();
}

// ---------- Bar: apron hanging on the wall ----------
SC.bar.props.push({ y: 300, cond: () => !F('got_apron'), draw: g => { rect(g, 908, 250, 4, 10, '#555'); poly(g, [890, 258, 930, 258, 936, 320, 884, 320], '#f8f8f4'); poly(g, [898, 248, 922, 248, 926, 258, 894, 258], '#f8f8f4'); } });
SC.bar.hot.push({ id: 'grembiule', name: 'Grembiule da cameriere', r: [880, 240, 60, 85], at: [910, 480], cond: () => !F('got_apron'),
  guarda: 'Un grembiule appeso al muro. Bianco, stirato, professionale. Il contrario di me.',
  prendi: async () => { if (!F('bar_fixed')) return say('barista', 'Giù le mani dal grembiule! È per il personale. Tu al massimo sei un problema.'); setF('got_apron'); give('grembiule'); await say('barista', 'Prendilo pure, eroe del bagno. Ma riportalo lavato. Cioè, non riportarlo proprio.'); } });

// ---------- Piazza: road to the bridge ----------
const _pzbg = SC.piazza.bg;
SC.piazza.bg = g => { _pzbg(g); sign(g, 1150, 395, 120, 26, 'Ponte →', '#5a3a1a', '#ffd76a', '700 14px "Alegreya Sans", "Fira Sans", sans-serif'); };
SC.piazza.hot.push({ id: 'ponteX', name: 'Verso il Ponte Acquedotto', r: [1150, 380, 130, 60], at: [1200, 445], exit: ['ponte', 130, 500, 1], cond: () => S.act <= 1 || !F('act1done') });

// ---------- Ponte Acquedotto: the 110-guest gala ----------
SC.ponte = {
  name: 'Ponte Acquedotto — Cena di gala', mood: 'set', amb: 'vento', walk: { x0: 90, x1: 1200, y0: 470, y1: 545 }, scale: [0.92, 1.03], start: [130, 500],
  npcs: () => [['maitre', 540, 498, -1], ['ospite1', 820, 452, 1, 0.92], ['ospite2', 1010, 452, -1, 0.92]],
  bg(g) {
    sky(g, '#2a4a8a', '#c88a8a', '#f6b070', '#f08a5a'); glow(g, 900, 330, 380, 'rgba(255,190,120,.5)');
    poly(g, [0, 300, 200, 270, 420, 310, 640, 280, 900, 320, 1120, 290, 1280, 310, 1280, 420, 0, 420], '#8a6a5a');
    poly(g, [0, 360, 300, 340, 640, 370, 1000, 345, 1280, 365, 1280, 440, 0, 440], '#5a4a4a');
    SEED(111); for (let i = 0; i < 26; i++) { const x = sr() * W, y = 300 + sr() * 50; rect(g, x, y, 18, 14, '#c8a080'); rect(g, x + 6, y + 6, 5, 8, '#4a3030'); }
    rect(g, 0, 440, W, 120, lg(g, 0, 440, 0, 560, '#d8c4a0', '#b4a07a'));
    rect(g, 0, 436, W, 10, '#c8b08a'); for (let x = 0; x < W; x += 36) rect(g, x, 410, 8, 30, '#c8b08a'); rect(g, 0, 404, W, 8, '#d8c4a0');
    g.save(); g.strokeStyle = 'rgba(0,0,0,.12)'; g.lineWidth = 2; for (let x = -200; x < W + 200; x += 60) { g.beginPath(); g.moveTo(x, 446); g.lineTo(x + (x - 640) * 0.35, 560); g.stroke(); } g.restore();
    sign(g, 250, 330, 280, 50, 'CENA FUORI DAL COMUNE', '#1a1a2a', '#f1c232', '800 18px Eczar, Bitter, serif'); txt(g, '110 coperti · solo su invito', 390, 396, '700 13px "Alegreya Sans", "Fira Sans", sans-serif', '#fff4e0'); rect(g, 386, 380, 8, 60, '#3a2a2a');
  },
  anim(g, t) { lights(g, t, 600, 1280, 60, 50, ['#ffe8a0', '#fff4d0']); lights(g, t + 2, 0, 700, 90, 40, ['#ffe8a0', '#fff4d0']); },
  props: [{ y: 470, draw: (g, t) => {
    poly(g, [640, 440, 1280, 440, 1280, 476, 620, 476], '#fbf8f0'); rect(g, 620, 476, 660, 24, '#e8e2d4');
    for (let i = 0; i < 9; i++) { const x = 670 + i * 70; ell(g, x, 446, 14, 4, '#fff'); rect(g, x - 2, 424, 3, 18, 'rgba(200,220,240,.7)'); ell(g, x, 422, 6, 7, 'rgba(160,40,60,.6)'); }
    for (let i = 0; i < 4; i++) { const x = 700 + i * 160; rect(g, x - 2, 404, 4, 36, '#f4f0e0'); ell(g, x, 400, 3, 6 + Math.sin(t * 9 + i) * 1.5, '#ffd76a'); glow(g, x, 398, 24, 'rgba(255,210,120,.4)'); }
    ell(g, 940, 438, 26, 12, '#f2e3b6');
    if (!F('got_invite')) { g.save(); g.translate(765, 432); g.rotate(-0.12); rect(g, -26, -14, 52, 28, '#fff4d0'); g.strokeStyle = '#c8a040'; g.lineWidth = 2; g.strokeRect(-22, -10, 44, 20); txt(g, 'INVITO', 0, 5, '800 11px Eczar, Bitter, serif', '#8a2a2a'); g.restore(); const k = (t * 1.3) % 1; g.save(); g.globalCompositeOperation = 'lighter'; glow(g, 765, 430, 30 + k * 10, 'rgba(255,220,120,' + (0.5 - k * 0.4) + ')'); g.restore(); }
  } }],
  hot: [
    { id: 'piazza', name: 'Torna in piazza', r: [0, 300, 60, 260], at: [110, 500], exit: ['piazza', 1180, 450, -1] },
    { id: 'invito', name: 'Invito sul tavolo', r: [725, 405, 80, 60], at: [700, 505], cond: () => !F('got_invite'),
      guarda: 'Un segnaposto elegante: «Assessore regionale — Invito personale». L\'assessore è seduto altrove, in incognito, a mangiare gratis.',
      prendi: async () => { if (!F('waiter')) return say('maitre', 'Signore! Non tocchi i segnaposti! Lei non è né ospite né personale. Lei è... un evento atmosferico.'); setF('got_invite'); give('invito'); await say('maitre', 'Bravo, ragazzo nuovo, sparecchia pure quel cartoncino. E sorridi meno, mi fai paura.'); } },
    { id: 'tavolata', name: 'Tavolata di gala', r: [620, 400, 660, 100], at: [640, 505], hl: false,
      guarda: 'Una tavolata di 110 coperti sul ponte romano. Menù: pallone di Gravina, orecchiette, cialledda. Prezzo: un rene. Il Comune incassa: zero.',
      prendi: () => F('waiter') ? P('Un cameriere non mangia. Un cameriere guarda mangiare. È il lavoro più triste del mondo.') : say('maitre', 'Lei non è sulla lista. Non è nemmeno sulla lista d\'attesa.'),
      sciacqua: 'Fluuush! Gli ospiti applaudono: pensano sia una performance di arte contemporanea a chilometro zero.' },
    { id: 'gravina', name: 'Gravina', r: [0, 250, 1280, 150], hl: false, guarda: 'Sotto il ponte, la gravina. Un canyon che ha visto passare romani, normanni, briganti e ora influencer.' }
  ],
  async enter() { if (!F('ponte_seen')) { setF('ponte_seen'); await P('Il Ponte Acquedotto, apparecchiato per 110 persone. Il ponte è pubblico, la cena è privata, il conto è segreto.'); } }
};
async function maitreTalk() {
  await dialog('maitre', [
    { t: 'Posso partecipare alla cena?', run: () => F('waiter') ? say('maitre', 'Lei è personale! Al lavoro. Il tavolo dell\'assessore ha bisogno di essere sparecchiato.') : line('maitre', 'Lei? Con quel naso? Qui si entra solo su invito. O se si è personale di sala, ovviamente.', 'Ma non mi sembra il tipo. Il personale di sala almeno ha un grembiule.') },
    { t: 'Quanto costa la cena?', once: true, run: () => say('maitre', 'Duecentoventi euro a coperto. Il Comune ci ha concesso il ponte gratis, per valorizzare il territorio. Il territorio, infatti, è molto valorizzato. Sul mio conto.') },
    { t: 'Chi sono gli ospiti?', once: true, run: () => say('maitre', 'Influencer, assessori in incognito, un console onorario di non so dove, e due americani che pensano di essere a Matera.') },
    { t: 'Arrivederci.', run: async () => 'end' }
  ]);
}
async function galaTalk() {
  await dialog('gala', [
    { t: 'Buonasera, come va la cena?', run: async () => { await say('ospite1', 'Divina! Ho già fatto quaranta storie. Nessuna col cibo, tutte col mio profilo.'); await say('ospite2', 'Io non sono qui. Sono in commissione bilancio. Mi passi il formaggio?'); } },
    { t: 'Lei è un assessore regionale?', once: true, run: () => say('ospite2', 'No. Sì. Dipende. Se è per una lamentela, sono solo un tizio coi baffi.') },
    { t: 'Che ne pensate del Clan dei Pallonari?', once: true, run: () => say('ospite1', 'Don Pallone? Mi ha regalato un buono per il McPallon\'s. Lo userò per un contenuto ironico. Forse.') },
    { t: 'Buon appetito.', run: async () => 'end' }
  ]);
}

// ---------- Vicolo: the Cinema Imperiale and Zì Mimì ----------
const _vcbg = SC.vicolo.bg;
SC.vicolo.bg = g => {
  _vcbg(g);
  rect(g, 862, 300, 150, 150, '#3a2030'); poly(g, [850, 296, 1024, 296, 1018, 318, 856, 318], '#c8283a');
  txt(g, 'CINEMA IMPERIALE', 937, 313, '800 13px Eczar, Bitter, serif', '#ffd76a');
  rect(g, 880, 330, 112, 120, '#5a2a1a'); rect(g, 934, 330, 4, 120, '#3a1a10');
  poly(g, [870, 360, 900, 362, 898, 410, 868, 408], '#e8d8a8'); txt(g, 'CHIUSO', 884, 390, '800 8px sans-serif', '#b0302a');
};
const _vcnpcs = SC.vicolo.npcs;
SC.vicolo.npcs = () => [..._vcnpcs(), ...(!F('mimi_gone') ? [['mimi', 840, 500, 1]] : [])];
SC.vicolo.props.push({ y: 455, cond: () => !F('mimi_gone'), draw: (g, t) => { g.save(); g.translate(700, 470); ell(g, 0, 0, 40, 10, 'rgba(0,0,0,.25)'); rect(g, -26, -60, 8, 60, '#c86a2a'); g.rotate(Math.sin(t * 1.5) * 0.04); ell(g, 10, -60, 40, 30, '#e8a83a'); ell(g, 0, -66, 24, 18, '#f1c232'); g.restore(); ell(g, 670, 470, 10, 10, '#2a2a2a'); ell(g, 730, 470, 10, 10, '#2a2a2a'); } });
SC.vicolo.hot.push({ id: 'cinema', name: 'Cinema Imperiale', r: [862, 296, 150, 154], at: [930, 470], exit: ['cinema', 160, 505, 1],
  guarda: 'Il Cinema Imperiale. Chiuso dal 2003. Zì Mimì ci vuole fare «dodici monolocali con vista gravina». La gravina è dall\'altra parte del paese.',
  exitIf: async () => { if (F('mimi_gone')) return true; await say('mimi', 'Alt! Cantiere! Qui dentro non entra nessuno finché non ho finito di demolire. Cioè, di cominciare a demolire.'); return false; } });
async function mimiTalk() {
  await dialog('mimi', [
    { t: 'Devo entrare nel cinema.', run: () => line('mimi', 'Nel cinema? Ma qua è tutto cantiere! Giù tutto, su i monolocali. «Cinema Imperiale Residence», ci scrivo.', 'Da qui non mi muovo. Tranne per una cosa: quella cena di gala sul Ponte. Duecentoventi euro. Ci vanno tutti quelli che firmano le licenze.') },
    { t: 'Perché vuoi andare alla cena?', once: true, run: () => line('mimi', 'Perché lì ci sono gli assessori, e tra un\'orecchietta e l\'altra si firmano più varianti al piano regolatore che in dieci anni di consiglio comunale.', 'Ma senza invito non entro. Il maître mi ha già cacciato due volte. La terza mi ha chiamato «abusivo». Che è vero, ma non si dice.') },
    { t: 'Cosa c\'era in questo cinema?', once: true, run: () => say('mimi', 'Film, bambini, primi baci, la Corazzata Murgiana in versione restaurata. Tutta roba che non rende al metro quadro.') },
    { t: 'Ciao, Zì Mimì.', run: async () => 'end' }
  ]);
}
async function mimiInvite() {
  take('invito'); setF('mimi_gone');
  await say('mimi', 'Un invito per la cena di gala?! Intestato a un assessore regionale! Stasera non sono abusivo, sono istituzionale!');
  await say('mimi', 'Il cinema? Fai quello che vuoi, tanto domani lo demolisco. Forse. Se arriva la variante.');
  await walkTo('mimi', 1300, 505); hideActor('mimi');
}

// ---------- Cinema Imperiale (interior) ----------
SC.cinema = {
  name: 'Cinema Imperiale', mood: 'notte', amb: 'drip', walk: { x0: 110, x1: 1170, y0: 470, y1: 545 }, scale: [0.95, 1.05], start: [160, 505],
  bg(g) {
    rect(g, 0, 0, W, SH, '#2a1418'); rect(g, 0, 0, W, 70, '#3a1a20');
    for (let i = 0; i < 12; i++) rect(g, i * 110, 70, 50, 320, 'rgba(120,20,30,.4)');
    rect(g, 330, 70, 620, 250, '#e8e4d8'); rect(g, 320, 60, 640, 10, '#8a6a2a'); rect(g, 320, 320, 640, 10, '#8a6a2a');
    poly(g, [250, 60, 330, 60, 330, 330, 290, 340], '#8a1a2a'); poly(g, [950, 60, 1030, 60, 990, 340, 950, 330], '#8a1a2a');
    rect(g, 1150, 40, 90, 60, '#1a0a0c'); rect(g, 1160, 50, 70, 40, '#2a2a3a');
    for (let r = 0; r < 4; r++) { const y = 360 + r * 28, n = 12 + r; for (let i = 0; i < n; i++) { const w = 1100 / n, x = 90 + i * w + r * 8; poly(g, [x, y, x + w - 8, y, x + w - 6, y + 30, x + 2, y + 30], r % 2 ? '#8a1a2a' : '#a8243a'); rect(g, x + 2, y - 10, w - 12, 12, '#6a1020'); } }
    rect(g, 0, 470, W, 90, '#3a1a1a'); for (let i = 0; i < 20; i++) rect(g, i * 64, 470, 2, 90, 'rgba(0,0,0,.25)');
    rect(g, 0, 300, 70, 170, '#4a3a3a');
    txt(g, 'FILA 7', 1080, 352, '800 14px sans-serif', '#d8c8a8');
  },
  anim(g, t) {
    if (F('cinema_light')) {
      g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = lg(g, 1190, 70, 640, 200, 'rgba(255,250,220,.25)', 'rgba(255,250,220,.05)'); g.beginPath(); g.moveTo(1190, 70); g.lineTo(330, 80); g.lineTo(330, 310); g.closePath(); g.fill(); g.restore();
      rect(g, 336, 76, 608, 238, '#9aa0a0');
      const k = Math.floor(t * 0.4) % 3;
      if (k === 0) { rect(g, 336, 200, 608, 114, '#5a5a62'); poly(g, [420, 200, 880, 200, 840, 150, 600, 140, 460, 160], '#3a3a42'); rect(g, 600, 100, 14, 50, '#2a2a32'); txt(g, 'LA CORAZZATA MURGIANA', 640, 290, '800 22px Eczar, Bitter, serif', '#f4f4f4'); }
      else if (k === 1) { rect(g, 336, 76, 608, 238, '#3a3a40'); ell(g, 640, 200, 80, 90, '#d8d0c8'); ell(g, 620, 180, 10, 12, '#2a2a2a'); ell(g, 660, 180, 10, 12, '#2a2a2a'); ell(g, 640, 240, 24, 30, '#2a2a2a'); txt(g, '«Salperemo entro l\'estate prossima!» — l\'ammiraglio, 1987', 640, 300, 'italic 700 14px sans-serif', '#f4f4f4'); }
      else { rect(g, 336, 76, 608, 238, '#6a6a70'); txt(g, 'FINE', 640, 210, '800 60px Eczar, Bitter, serif', '#f4f4f4'); txt(g, 'Regia: un sindaco qualsiasi', 640, 260, '700 16px sans-serif', '#e4e4e4'); }
      for (let i = 0; i < 30; i++) ell(g, 336 + Math.random() * 608, 76 + Math.random() * 238, 1, 1, 'rgba(255,255,255,.5)');
    } else { g.fillStyle = 'rgba(5,2,8,.78)'; g.fillRect(0, 0, W, SH); glow(g, 40, 400, 220, 'rgba(255,220,160,.25)'); }
    if (F('cinema_light') && !F('got_volantino')) { rect(g, 1006, 404, 30, 20, '#f6e37a'); }
  },
  hot: [
    { id: 'esci', name: 'Uscita nel vicolo', r: [0, 300, 70, 170], at: [130, 505], exit: ['vicolo', 930, 480, -1] },
    { id: 'proiettore', name: 'Proiettore', r: [1150, 40, 90, 60], at: [1150, 505],
      guarda: () => P(F('cinema_light') ? 'Il proiettore funziona! L\'unica macchina del 1971 ancora in servizio a Gravina, insieme al sindaco.' : 'Lassù, nella cabina, c\'è il vecchio proiettore. Al buio non vedo niente: né i sedili né il volantino.'),
      usa: async () => { if (F('cinema_light')) return P('È già acceso. Se lo spengo, il film non finisce mai. Come i lavori pubblici.'); setF('cinema_light'); AU.sfx('boing'); await P('Salgo in cabina e accendo il proiettore... Trrrrr... Luce! E parte «La Corazzata Murgiana», versione restaurata da nessuno.'); } },
    { id: 'schermo', name: 'Schermo', r: [330, 70, 620, 250], at: [640, 500], hl: false, guarda: () => P(F('cinema_light') ? 'Il film più lungo della storia del cinema pugliese. Dura tre ore e racconta una nave che non parte mai.' : 'Uno schermo bianco nel buio. Come un bando comunale.'), sciacqua: 'Fluuush! Sullo schermo appare per un attimo una scritta: «Intervallo». Poi torna il film.' },
    { id: 'fila7', name: 'Fila 7', r: [980, 380, 90, 60], at: [1000, 505], cond: () => F('cinema_light') && !F('got_volantino'),
      guarda: 'Sotto un sedile della fila 7 c\'è un foglio giallo. Il volantino del 1987!', prendi: async () => { setF('got_volantino'); give('volantino'); await P('Il volantino del 1987! «ENTRO L\'ESTATE PROSSIMA: LA PISCINA COMUNALE!» Profuma di popcorn e di promesse mancate.'); } },
    { id: 'sedili', name: 'Poltroncine', r: [90, 350, 1100, 120], at: [640, 500], hl: false, guarda: () => P(F('cinema_light') ? 'Poltroncine di velluto rosso. In fila 7 c\'è qualcosa di giallo.' : 'Al buio non vedo niente. Sento solo i ricordi. E un topo.'), usa: 'Mi siedo un attimo... no, non è il momento. Ho una città da salvare e un volantino da trovare.' }
  ]
};

// ---------- Altamura: the tobacconist ----------
const _albg = SC.altamura.bg;
SC.altamura.bg = g => { _albg(g); poly(g, [290, 330, 420, 330, 414, 440, 296, 440], '#3a4a6a'); rect(g, 300, 360, 110, 50, '#1a1a2a'); poly(g, [284, 316, 426, 316, 420, 334, 290, 334], '#1a1a2a'); txt(g, 'T  TABACCHI', 355, 330, '800 13px sans-serif', '#f4f4f4'); rect(g, 296, 404, 118, 36, '#4a5a7a'); };
const _alnpcs = SC.altamura.npcs;
SC.altamura.npcs = () => [..._alnpcs(), ['tabaccaia', 355, 412, 1, 0.75]];
async function tabaccaiaTalk() {
  await dialog('tabacchi', [
    { t: 'Vendete marche da bollo?', run: () => line('tabaccaia', 'Certo. Da sedici euro. Importo esatto: non ho resto da quando hanno inventato il POS e io l\'ho rifiutato.') },
    { t: 'Accettate carte?', once: true, run: () => say('tabaccaia', 'Accetto solo contanti, gratta e vinci vincenti, e confidenze sul vicinato.') },
    { t: 'Ciao.', run: async () => 'end' }
  ]);
}
async function tabaccaiaMarca() { take('euro16'); give('marca'); AU.sfx('stamp'); await say('tabaccaia', 'Sedici euro esatti! Lei è il primo da dieci anni. Ecco la marca da bollo. La lecchi con rispetto.'); }

// ---------- Set: the director and the tuna sandwich ----------
ACTORS.regista.giveWith = { panino: async () => {
  take('panino'); setF('regista_away');
  await say('regista', 'Is this... authentic Italian street food? Found in a mafia safe? THIS is the movie! Camera two, follow me! We\'re shooting the sandwich!');
  await walkTo('regista', 1300, 490); hideActor('regista');
  await P('Se n\'è andato a filmare il panino. Il ciak è libero.');
} };

// ---------- Pineta: charcoal from the illegal barbecue ----------
{ const h = SC.pineta.hot.find(x => x.id === 'bbq'); h.prendi = async () => { if (F('got_carbon')) return P('Ho già preso la carbonella. Il resto lo lascio per la grigliata abusiva di domenica.'); setF('got_carbon'); give('carbonella'); await P('Raccolgo un po\' di carbonella dal barbecue abusivo. È ancora tiepida: la grigliata è appena finita, e anche il regolamento.'); }; }

// ---------- Cisterna: the inflatable flamingo ----------
SC.cisterna.hot.push({ id: 'fenicottero', name: 'Fenicottero gonfiabile', r: [480, 200, 220, 70], at: [600, 490], cond: () => F('pool_done') && !F('got_flamingo'), hl: false,
  guarda: 'Un fenicottero gonfiabile galleggia nella piscina comunale. Ha l\'aria di chi ne ha viste tante.',
  prendi: async () => { setF('got_flamingo'); give('fenicottero'); await say('sindaco', 'Ehi! Quello è patrimonio comunale! ...Va bene, prendilo. Tanto lo inauguro un\'altra volta.'); } });

// ---------- Fiera: lantern and the trapdoor ----------
SC.fiera.props = (SC.fiera.props || []).concat([
  { y: 440, cond: () => !F('got_lantern'), draw: (g, t) => { rect(g, 646, 290, 3, 16, '#3a3a3a'); rect(g, 638, 306, 20, 26, '#3a3a3a'); rect(g, 641, 309, 14, 20, '#ffd76a'); glow(g, 648, 318, 40 + Math.sin(t * 7) * 3, 'rgba(255,210,120,.45)'); } },
  { y: 471, cond: () => F('pool_done'), draw: g => { poly(g, [360, 470, 470, 470, 480, 500, 350, 500], '#2a2420'); poly(g, [360, 470, 470, 470, 476, 462, 366, 444], '#6a4a2a'); txt(g, 'USCITA D\'EMERGENZA DEL CLAN', 418, 462, '800 7px sans-serif', '#f1c232'); } }
]);
SC.fiera.hot.push(
  { id: 'lanterna', name: 'Lanterna', r: [630, 286, 40, 50], at: [640, 500], cond: () => !F('got_lantern'), guarda: 'Una lanterna sulla bancarella dei panini. L\'unica luce della Fiera che non sia radioattiva.', prendi: async () => { setF('got_lantern'); give('lanterna'); await P('Prendo la lanterna. Il paninaro non c\'è dal 1998: considero la cosa un prestito a lunghissimo termine.'); } },
  { id: 'botola', name: 'Botola del Clan', r: [340, 440, 150, 65], at: [415, 510], cond: () => F('pool_done'), exit: ['grotte', 150, 505, 1],
    guarda: 'Una botola aperta: «Uscita d\'emergenza del Clan». Una scaletta scende nel buio, verso le grotte sotto la Fiera.',
    exitIf: async () => { if (has('lanterna')) return true; await P('Laggiù è buio pesto. Senza una luce mi rompo l\'unico naso che ho.'); return false; } }
);

// ---------- ACT IV: Le Grotte ----------
SC.grotte = {
  name: 'Le grotte sotto la Fiera', mood: 'pulo', amb: 'cave', walk: { x0: 110, x1: 1180, y0: 470, y1: 545 }, scale: [0.92, 1.03], start: [150, 505],
  npcs: () => [['peppino', F('password_ok') ? 1120 : 900, 500, -1]],
  bg(g) {
    rect(g, 0, 0, W, SH, lg(g, 0, 0, 0, SH, '#2a221e', '#4a3a30', '#3a2e26'));
    SEED(121); for (let i = 0; i < 40; i++) { const x = sr() * W, w = 20 + sr() * 50; poly(g, [x, 0, x + w, 0, x + w / 2, 30 + sr() * 90], ['#3a2e28', '#4a3a32', '#2e2620'][i % 3]); }
    for (let i = 0; i < 18; i++) { const x = sr() * W, y = 70 + sr() * 300; ell(g, x, y, 40 + sr() * 80, 18 + sr() * 30, 'rgba(90,70,55,.35)'); }
    for (let i = 0; i < 6; i++) { const x = 180 + i * 150, y = 400 - (i % 2) * 40; g.save(); g.translate(x, y); rect(g, -26, -60, 52, 60, '#c8a820'); for (let k = 0; k < 3; k++) rect(g, -26, -54 + k * 18, 52, 4, '#2a2a2a'); ell(g, 0, -30, 10, 10, '#2a2a2a'); g.restore(); }
    rect(g, 0, 460, W, 100, lg(g, 0, 460, 0, 560, '#5a4a3a', '#3a2e24'));
    rect(g, 60, 160, 14, 310, '#6a5a4a'); rect(g, 96, 160, 14, 310, '#6a5a4a'); for (let i = 0; i < 11; i++) rect(g, 60, 180 + i * 28, 50, 6, '#7a6a58');
    g.beginPath(); g.moveTo(1180, 470); g.lineTo(1180, 270); g.quadraticCurveTo(1230, 220, 1280, 270); g.lineTo(1280, 470); g.fillStyle = '#120c0a'; g.fill();
  },
  anim(g, t) {
    g.save(); g.globalCompositeOperation = 'lighter'; for (let i = 0; i < 6; i++) { const x = 180 + i * 150, y = 370 - (i % 2) * 40; glow(g, x, y, 70 + Math.sin(t * 2 + i) * 8, 'rgba(110,255,80,.14)'); } g.restore();
    if (!F('password_ok')) { const k = (t * 0.6) % 1; txt(g, 'Z', 930 + k * 30, 330 - k * 60, '800 ' + (14 + k * 16) + 'px sans-serif', 'rgba(255,255,255,' + (1 - k) + ')'); txt(g, 'z', 950 + ((k + .5) % 1) * 30, 330 - ((k + .5) % 1) * 60, '800 16px sans-serif', 'rgba(255,255,255,' + (1 - (k + .5) % 1) + ')'); }
  },
  fg(g, t) { const p = RT.actors[S.player]; const x = p ? p.x : 200, y = p ? p.y - 110 : 400; const r = 330 + Math.sin(t * 9) * 6 + Math.sin(t * 3.3) * 4; g.fillStyle = rg(g, x, y, r, 'rgba(8,4,10,0)', 'rgba(8,4,10,0)', 'rgba(8,4,10,.55)', 'rgba(8,4,10,.94)'); g.fillRect(0, 0, W, SH); },
  hot: [
    { id: 'su', name: 'Scaletta verso la Fiera', r: [50, 150, 70, 320], at: [140, 505], exit: ['fiera', 415, 515, 1] },
    { id: 'galleria', name: 'Galleria verso la chiesa rupestre', r: [1180, 250, 100, 220], at: [1170, 505], exit: ['chiesa', 160, 505, 1],
      exitIf: async () => { if (F('password_ok')) return true; await P('Peppino il Pallonaro dorme sdraiato davanti alla galleria. Russa in fa diesis. Devo svegliarlo.'); return false; } },
    { id: 'fusti', name: 'Fusti di scorie', r: [150, 320, 900, 100], at: [640, 505], hl: false, guarda: 'Decine di fusti di scorie, nascosti nelle grotte. Su uno c\'è scritto a pennarello: «Provvisorio».', sciacqua: 'Fluuush! Niente da fare: le scorie non si sciacquano. Si osservano. Per iscritto.' }
  ],
  async enter() { if (!F('grotte_seen')) { setF('grotte_seen'); achieve('speleologo'); await P('Le grotte sotto la Fiera. Fusti di scorie dappertutto. L\'ingegnere del 1890 aveva ragione: sotto Gravina c\'è un altro paese.'); } }
};
async function peppinoTalk() {
  if (F('password_ok')) return say('peppino', 'Passa, passa. Io torno a dormire. Il lavoro nobilita, ma il sonno di più.');
  await say('peppino', 'Grrr... chi è? Mamma? ...No, aspetta. Alt! Parola d\'ordine!');
  const opts = shuffle(['Entro l\'estate prossima.', 'Apriti sesamo.', 'Porta lavoro.', 'Tengo nu cugino.']);
  const i = await choose(opts); await P(opts[i]);
  if (opts[i] === 'Entro l\'estate prossima.') { setF('password_ok'); AU.sfx('success'); await say('peppino', 'Esatto! La frase del sindaco. Passa pure. E se vedi Don Pallone, digli che sto facendo la ronda. Con gli occhi chiusi, ma la sto facendo.'); RT.actors.peppino && walkTo('peppino', 1120, 500); }
  else { AU.sfx('fail'); await say('peppino', 'Sbagliato! La parola d\'ordine è la frase preferita del sindaco. Cioè... non te l\'ho detto. Torno a dormire.'); }
}

// ---------- ACT IV: the rock church ----------
SC.chiesa = {
  name: 'Chiesa rupestre sotterranea', mood: 'pulo', amb: 'cave', walk: { x0: 110, x1: 1180, y0: 480, y1: 545 }, scale: [0.94, 1.03], start: [160, 510],
  bg(g) {
    rect(g, 0, 0, W, SH, lg(g, 0, 0, 0, SH, '#3a2e28', '#5a463a', '#3a2e26'));
    for (let i = 0; i < 5; i++) { const x = 100 + i * 240; g.beginPath(); g.moveTo(x, 330); g.lineTo(x, 140); g.quadraticCurveTo(x + 100, 40, x + 200, 140); g.lineTo(x + 200, 330); g.fillStyle = '#4a3a30'; g.fill(); }
    [[150, '#8a4a3a'], [390, '#3a5a7a'], [870, '#6a7a3a'], [1110, '#8a5a2a']].forEach(([x, c]) => { rect(g, x, 160, 110, 150, 'rgba(0,0,0,.2)'); rect(g, x + 6, 166, 98, 138, c); ell(g, x + 55, 200, 22, 22, 'rgba(240,200,80,.75)'); ell(g, x + 55, 204, 14, 16, '#d8b090'); poly(g, [x + 32, 300, x + 78, 300, x + 70, 224, x + 40, 224], 'rgba(240,230,210,.8)'); });
    rect(g, 0, 320, W, 110, lg(g, 0, 320, 0, 430, '#1a3a4a', '#0a2030'));
    poly(g, [560, 340, 720, 340, 740, 380, 540, 380], '#6a5a4a'); rect(g, 600, 300, 80, 44, '#8a7a6a'); rect(g, 596, 296, 88, 8, '#a8987a');
    rect(g, 0, 430, W, 130, lg(g, 0, 430, 0, 560, '#5a4a3a', '#3a2e24'));
    rect(g, 0, 300, 60, 180, '#120c0a');
  },
  anim(g, t) {
    g.save(); g.globalCompositeOperation = 'lighter'; for (let i = 0; i < 9; i++) ell(g, 100 + i * 140 + Math.sin(t + i) * 20, 360 + (i % 3) * 18, 50, 2, 'rgba(160,220,255,.18)'); g.restore();
    [[200, 440], [420, 440], [860, 440], [1080, 440], [640, 296]].forEach(([x, y], i) => { rect(g, x - 3, y - 20, 6, 20, '#f4ecd8'); ell(g, x, y - 26, 3, 6 + Math.sin(t * 10 + i) * 1.5, '#ffd76a'); g.save(); g.globalCompositeOperation = 'lighter'; glow(g, x, y - 26, 60, 'rgba(255,200,120,.3)'); g.restore(); });
    if (!F('got_relazione')) { rect(g, 624, 286, 32, 12, '#e8dcb0'); }
  },
  fg(g, t) { const p = RT.actors[S.player]; const x = p ? p.x : 200, y = p ? p.y - 110 : 400; g.fillStyle = rg(g, x, y, 520, 'rgba(8,4,10,0)', 'rgba(8,4,10,0)', 'rgba(8,4,10,.6)'); g.fillRect(0, 0, W, SH); },
  hot: [
    { id: 'indietro', name: 'Torna nelle grotte', r: [0, 300, 60, 180], at: [130, 510], exit: ['grotte', 1150, 505, -1] },
    { id: 'lago', name: 'Lago sotterraneo', r: [0, 320, 1280, 110], at: [640, 490], hl: false,
      guarda: 'Un lago sotterraneo, nero e immobile. Dall\'altra parte, sull\'altare, c\'è un vecchio fascicolo.',
      usa: 'A nuoto? Il tutù si inzuppa e poi peso il doppio. Mi serve qualcosa che galleggi.',
      sciacqua: 'Fluuush! Il lago fa un\'onda lunga, poi torna immobile. Mi giudica.',
      useWith: { fenicottero: async () => {
        if (F('got_relazione')) return P('Ho già la relazione. Il fenicottero ha bisogno di riposo.');
        take('fenicottero'); await P('Gonfio il fenicottero, salgo a bordo e remo con lo sturalavandini.');
        await fadeTo(1, 2); await say('narr', 'Sciacquone attraversa il lago sotterraneo su un fenicottero gonfiabile, cantando «O sole mio» con un\'eco da cattedrale.', 4200);
        setF('got_relazione'); give('relazione'); AU.sfx('pickup'); await fadeTo(0, 2);
        await P('La relazione geologica del 1890! «Sotto la Fiera: grotte. Non costruirci niente di pesante.» Ecco la mia osservazione numero due.');
      } } },
    { id: 'affreschi', name: 'Affreschi', r: [140, 150, 1090, 170], at: [640, 500], hl: false, guarda: 'Affreschi di santi di mille anni fa. Hanno visto i saraceni, i normanni e ora un pagliaccio. Non battono ciglio.' },
    { id: 'altare', name: 'Altare con fascicolo', r: [560, 280, 160, 100], at: [640, 495], cond: () => !F('got_relazione'), guarda: 'Sull\'altare, oltre il lago, c\'è un fascicolo ingiallito. Non ci arrivo a piedi.', prendi: 'È dall\'altra parte del lago. Ho le braccia lunghe, ma non così tanto.' }
  ],
  async enter() { if (!F('chiesa_seen')) { setF('chiesa_seen'); await P('Una chiesa scavata nella roccia, con un lago sotterraneo. Bellissima. E il Clan ci voleva mettere le scorie accanto.'); } }
};

// ---------- SECRET: Santeramo ----------
SC.santeramo = {
  name: 'Santeramo in Colle (che non esiste)', mood: 'forno', amb: 'piazza', scale: [0.84, 1.0], start: [140, 505],
  get walk() { return { x0: 80, x1: F('santeramo_in') ? 1200 : 520, y0: 450, y1: 545 }; },
  npcs: () => [['vigile', F('santeramo_in') ? 380 : 580, 500, -1], ['macellaio', 960, 470, -1]],
  bg(g) {
    sky(g, '#7a9ac0', '#c8c0b0', '#e8c8a0');
    facade(g, { x: 0, y: 120, w: 360, h: 320, wall: '#e0c8a0', line: '#6a4a2a', win: { rows: 1, cols: 2, ww: 46, wh: 70, top: 40 }, wo: { shut: '#4a6a3a' } });
    facade(g, { x: 700, y: 100, w: 580, h: 340, wall: '#d8b888', line: '#6a4a2a', win: { rows: 1, cols: 4, ww: 46, wh: 70, top: 40 }, wo: { shut: '#8a3a2a' } });
    for (let i = 0; i < 3; i++) { const x = 760 + i * 170; rect(g, x, 300, 140, 140, '#3a1a14'); rect(g, x, 290, 140, 14, '#c8283a'); txt(g, 'FORNELLO PRONTO', x + 70, 301, '800 10px sans-serif', '#fff'); rect(g, x + 10, 360, 120, 18, '#2a2a2a'); for (let k = 0; k < 8; k++) ell(g, x + 20 + k * 14, 356, 5, 4, '#a8582a'); }
    sign(g, 380, 210, 300, 60, 'SANTERAMO IN COLLE', '#2a4a8a', '#fff', '800 22px Eczar, Bitter, serif'); txt(g, 'Comune inesistente dal 1999', 530, 290, 'italic 700 14px "Alegreya Sans", "Fira Sans", sans-serif', '#3a2a1a');
    cobbles(g, 440, SH, '#c8a478', '#a07c52');
    rect(g, 520, 380, 12, 80, '#c8283a'); rect(g, 532, 380, 160, 10, '#c8283a');
  },
  anim(g, t) {
    for (let i = 0; i < 12; i++) { const k = (t * 0.25 + i / 12) % 1, x = 790 + (i % 3) * 170 + Math.sin(t + i) * 20; g.save(); g.globalAlpha = (1 - k) * 0.35; ell(g, x + k * 30, 340 - k * 300, 30 + k * 60, 20 + k * 30, '#e8e4e0'); g.restore(); }
    g.save(); g.globalCompositeOperation = 'lighter'; for (let i = 0; i < 3; i++) glow(g, 830 + i * 170, 370, 60 + Math.sin(t * 8 + i) * 6, 'rgba(255,120,40,.3)'); g.restore();
  },
  hot: [
    { id: 'mappa', name: 'Torna alla mappa', r: [0, 300, 60, 260], at: [110, 505], exit: ['mappa'] },
    { id: 'sbarra', name: 'Sbarra', r: [520, 370, 180, 90], at: [480, 505], cond: () => !F('santeramo_in'), guarda: 'Una sbarra con un cartello: «Accesso consentito solo a chi non esiste».' },
    { id: 'fornelli', name: 'Fornelli pronti', r: [740, 280, 520, 160], at: [960, 510], hl: false, guarda: 'Macellerie con la brace accesa: scegli la carne e te la cuociono sul momento. Il profumo arriva fino a Gravina. Ecco perché a Gravina abbiamo sempre fame.' }
  ],
  async enter() { if (!F('santeramo_seen')) { setF('santeramo_seen'); achieve('santeramo2'); await P('Santeramo esiste! C\'è fumo, carne alla brace e un vigile. Perché tutti dicevano che non esisteva?'); } }
};
async function vigileTalk() {
  await dialog('vigile', [
    { t: 'Ma Santeramo esiste?', run: () => line('vigile', 'Ufficialmente no. Abbiamo smesso di esistere nel 1999, per motivi fiscali. La Regione non ci manda le multe, noi non le mandiamo niente.', 'Si entra solo se anche lei non esiste.') },
    { t: 'Neanche io esisto: sono un pagliaccio.', cond: () => !F('santeramo_in'), run: async () => { setF('santeramo_in'); await say('vigile', 'Un pagliaccio senza codice fiscale? Benvenuto. Non l\'ho vista entrare, e lei non mi ha visto qui.'); RT.actors.vigile && walkTo('vigile', 380, 500); } },
    { t: 'Perché tutti dicono che non esiste?', once: true, run: () => say('vigile', 'Perché glielo diciamo noi. Altrimenti ci vengono tutti a mangiare la carne e finisce la brace.') },
    { t: 'Arrivederci.', run: async () => 'end' }
  ]);
}
async function macellaioTalk() {
  if (!F('santeramo_in')) return say('vigile', 'Alt! Il fornellaio serve solo chi non esiste. Lei, per ora, esiste troppo.');
  await dialog('macellaio', [
    { t: 'Che buon profumo!', run: () => say('macellaio', 'Bombette, zampina, gnummareddi. Ma oggi la brace è debole. Mi è finita la carbonella buona, quella abusiva.') },
    { t: 'Cos\'è la bombetta d\'oro?', once: true, run: () => line('macellaio', 'Una bombetta speciale: chi la mangia diventa pazientissimo. Ci ho fatto la fila in posta senza perdere la calma.', 'Te la do se mi porti della carbonella. Di quella fatta col legno della pineta di Gravina, che è proibita e quindi più buona.') },
    { t: 'Ciao.', run: async () => 'end' }
  ]);
}
async function macellaioCarbon() {
  if (!F('santeramo_in')) return say('vigile', 'Alt! Prima di commerciare con noi, deve dimostrare di non esistere.');
  take('carbonella'); AU.sfx('success');
  await say('macellaio', 'Carbonella abusiva della pineta di Gravina! Il profumo del contrabbando! Ecco la bombetta d\'oro. Mangiala solo nel momento del bisogno.');
  give('bombetta');
}

// ---------- Hospital: now with people waiting ----------
SC.ospedale.npcs = () => [['barbuto', 420, 470, 1, 0.95], ['uncinetto', 660, 470, -1, 0.95], ['scheletro', 840, 470, -1, 0.95]];
async function pazientiTalk(who) {
  const L = {
    barbuto: [['In attesa da quanto?', 'Dal 2019. Quando sono arrivato avevo i capelli neri e una mascherina. Ora ho la barba e un nipote laureato.'], ['Per cosa aspetta?', 'Una visita per l\'unghia incarnita. Nel frattempo è guarita, poi si è incarnita di nuovo. Non perdo il turno per così poco.']],
    uncinetto: [['Cosa sta facendo?', 'Una sciarpa. Quaranta metri. Ho cominciato quando ho preso il numero. Quando chiamano me, la regalo all\'infermiera.'], ['Il medico arriva?', 'Il medico è in ferie fino all\'estate prossima. Quale estate, non l\'hanno specificato.']],
    scheletro: [['Signore? Tutto bene?', '...'], ['Ha il numero 12.', 'Il tabellone segna 23. Il numero 12 è stato chiamato nel 2016. Era in bagno.']]
  }[who];
  const speaker = who;
  await dialog('paz_' + who, [...L.map(([q, a]) => ({ t: q, run: () => say(speaker, a) })), { t: 'Buona attesa.', run: async () => 'end' }]);
}

// ---------- Uomo di Altamura also accepts the stamp first ----------
ACTORS.uomo.giveWith.marca = () => has('libro') ? uomoLibro() : say('uomo', 'Una marca da bollo senza documento è come un timbro senza sportello. Mi porti anche le prove.');

// ---------- demo build: stops after Act I ----------
ENDINGS.demo = { title: 'Fine della demo', mood: 'finale', lines: ['Sciacquone ha conquistato Gravina... ma il Clan dei Pallonari è ancora libero.', 'Ti aspettano Altamura, Matera, le grotte sotto la Fiera,', 'un bancomat traumatizzato, un regista americano e Santeramo (che non esiste).', '', 'Il gioco completo costa meno di un caffè al bar.', 'Lo trovi sulla stessa pagina dove hai giocato questa demo.', '', 'Grazie per aver giocato!'] };
async function demoEnd() {
  RT.speech = null; RT.dlg = null;
  await fadeTo(1, 2);
  AU.setMood('finale', 'none'); RT.fade = 0; RT.fadeTo = 0;
  await runMode(endingMode('demo'));
  await fadeTo(1, 3); RT.fade = 1;
  showTitle();
}
