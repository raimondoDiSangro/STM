// ================= CONTENT 1: cast, items, prologue, act I =================
// ---------- cast ----------
const pSit = (p) => ({ ...p, sit: true });
Object.assign(ACTORS, {
  sciac: { name: 'Sciacquone', color: '#ffd76a', draw: drawSciac, h: 230, w: 100, speed: 210 },
  santino: { name: 'Santino', color: '#8fd3ff', h: 225, speed: 240, draw: (g, a, t) => person(g, a, t, SANTINO_SPEC),
    parla: async () => { if (S.player === 'santino') return P('Parlo da solo? Come il consiglio comunale.'); await santinoTalk(); } },
  radio: { name: 'Radio SuperTeleMurgia', color: '#ff9e7a', box: true, draw: () => {} },
  narr: { name: '', color: '#f4ead6', box: true, draw: () => {} },
  anna: { name: 'Anna', color: '#c8f0a8', box: true, draw: () => {} },
  pens1: { name: 'Pensionato con la coppola', color: '#f3c9a0', h: 160, draw: (g, a, t) => person(g, a, t, pSit({ skin: '#d8977a', top: '#6b5036', bottom: '#4a4a52', hair: '#d9d4c8', hairStyle: 'bald', mus: '#e8e2d6', seed: 0.3, armF: 0.9, hat: g => { poly(g, [-20, -18, 16, -26, 30, -20, 14, -16, -18, -10], '#55606a'); } })), parla: () => pensTalk() },
  pens2: { name: 'Pensionato col gilet', color: '#e6d39a', h: 160, draw: (g, a, t) => person(g, a, t, pSit({ skin: '#e0a882', top: '#c9b07a', bottom: '#3c3a44', hair: '#efefe6', hairStyle: 'bald', glasses: '#2a2020', belly: 1, seed: 1.7, armF: 1.1 })), parla: () => pensTalk() },
  barista: { name: 'Barista', color: '#ffb38a', h: 220, at: () => [560, 470], draw: (g, a, t) => person(g, a, t, { skin: '#d9996e', top: '#1d1a22', bottom: '#222', hair: '#1a1214', hairStyle: 'slick', mus: '#1a1214', seed: 0.9, torsoFx: (g, h, s, bw) => { poly(g, [-6, s + 4, 10, s + 4, 6, h + 6, -2, h + 6], '#f2efe8'); }, armF: (a, t) => 0.9 + Math.sin(t * 2) * 0.2 }), parla: () => baristaTalk() },
  nonna: { name: 'Nonna Telegiornale', color: '#f7a8d0', h: 160, draw: (g, a, t) => person(g, a, t, pSit({ skin: '#e6b090', top: '#25202a', bottom: '#25202a', hair: '#b8b2ac', hairStyle: 'bun', glasses: '#a08040', seed: 2.2, head: 1.05, armF: 0.6 })), parla: () => nonnaTalk(), giveWith: { taralli: () => nonnaTaralli() } },
  vicino: { name: 'Vicino dei fuochi', color: '#ffcf6a', h: 150, noShadow: true, at: () => [930, 470], draw: (g, a, t) => person(g, a, t, { skin: '#d48d68', top: '#efeee6', bottom: '#2d3e66', hair: '#2a1a14', hairStyle: 'messy', belly: 1.4, seed: 3, armF: (a, t) => -2.2 + Math.sin(t * 3) * 0.3, hand: (g, x, y, t) => { rect(g, x - 3, y - 30, 6, 30, '#c23a2a'); ell(g, x, y - 32, 3, 3, '#ffd76a'); } }),
    parla: () => vicinoTalk() },
  impA: { name: 'Sportello A', color: '#f3b3e0', h: 200, noShadow: true, at: () => [330, 470], draw: (g, a, t) => person(g, a, t, { skin: '#e0a882', top: '#8a5a9a', hair: '#5a2a1a', hairStyle: 'curly', glasses: '#331a22', seed: 4 }), parla: () => sportelloTalk('A'), giveWith: { timbro: () => stampIt('A') }, useWith: { timbro: () => stampIt('A') } },
  impB: { name: 'Sportello B', color: '#b3d3f3', h: 200, noShadow: true, at: () => [950, 470], draw: (g, a, t) => person(g, a, t, { skin: '#d79a74', top: '#3a4a5a', hair: '#3a2a20', hairStyle: 'comb', seed: 5, torsoFx: (g, h, s) => { poly(g, [0, s, 6, s, 5, s + 40, 2, s + 44, -1, s + 40], '#b02a2a'); } }), parla: () => sportelloTalk('B'), giveWith: { timbro: () => stampIt('B') }, useWith: { timbro: () => stampIt('B') } },
  assessora: { name: 'Assessora Dossier', color: '#ff8fa0', h: 215, noShadow: true, at: () => [520, 500], draw: (g, a, t) => person(g, a, t, { skin: '#eab08e', top: '#b8283a', bottom: '#b8283a', hair: '#141014', hairStyle: 'bob', glasses: '#141014', seed: 6, armF: (a, t) => 1.2 + Math.sin(t * 1.5) * 0.3 }), parla: () => assessoraTalk(), giveWith: { sacco: () => assessoraSacco(), '*': i => TRASH.includes(i) ? say('assessora', 'Un solo rifiuto non è un progetto. È un incidente. Me ne serve un concept unitario.') : say('assessora', 'Non è identitario. Non dialoga col territorio.') } },
  sindaco: { name: 'Il Sindaco Eterno', color: '#9ff0b0', h: 225, noShadow: true, at: () => S.scene === 'sindaco' ? [640, 500] : null, draw: (g, a, t) => person(g, a, t, { skin: '#e8a882', top: '#3b3b46', bottom: '#2e2e36', hair: '#6a5040', hairStyle: 'comb', belly: 1.2, seed: 7, torsoFx: (g, h, s, bw) => { poly(g, [-bw, s + 10, -bw + 10, s + 4, bw + 6, h - 2, bw - 4, h + 6], '#2f9a4a'); poly(g, [-bw + 4, s + 14, -bw + 12, s + 8, bw + 4, h - 8, bw - 6, h], '#f4f4ee'); poly(g, [-bw + 8, s + 18, -bw + 14, s + 13, bw + 2, h - 14, bw - 8, h - 6], '#d8343a'); } }), parla: () => sindacoTalk() }
});
// ---------- items ----------
const ic = {
  plunger: g => { g.rotate(0.5); rect(g, -3, -26, 6, 40, '#a8743a'); poly(g, [-15, 12, 15, 12, 10, 24, -10, 24], '#c0283a'); },
  toothpick: g => { g.rotate(-0.6); rect(g, -26, -1.5, 52, 3, '#e8cf9a'); },
  taralli: g => { [[-12, 4], [8, 6], [-2, -8]].forEach(([x, y]) => { g.beginPath(); g.arc(x, y, 10, 0, 7); g.lineWidth = 6; g.strokeStyle = '#d9a556'; g.stroke(); }); },
  pallone: g => { ell(g, 0, 4, 20, 16, '#f2e3b6'); ell(g, -5, 0, 10, 7, '#fff8de'); g.strokeStyle = '#8a6a3a'; g.lineWidth = 2; g.beginPath(); g.moveTo(0, -12); g.lineTo(0, 20); g.moveTo(-20, 4); g.lineTo(20, 4); g.stroke(); poly(g, [-3, -12, 3, -12, 0, -22], '#8a6a3a'); },
  timbro: g => { ell(g, 0, 6, 18, 12, '#f2e3b6'); rect(g, -4, -18, 8, 18, '#e8cf9a'); txt(g, 'OK', 0, 12, '800 12px sans-serif', '#b0302a'); },
  pass: g => { rect(g, -20, -14, 40, 28, '#f4ecd8'); ell(g, 8, 4, 8, 6, 'rgba(176,48,42,.7)'); rect(g, -14, -8, 16, 3, '#555'); rect(g, -14, -2, 12, 3, '#555'); },
  bottiglia: g => { rect(g, -6, -10, 12, 30, 'rgba(120,200,220,.8)'); rect(g, -3, -20, 6, 10, 'rgba(120,200,220,.8)'); rect(g, -4, -24, 8, 4, '#2a6ab0'); },
  lattina: g => { rect(g, -10, -16, 20, 32, '#c8283a'); rect(g, -10, -16, 20, 5, '#ccc'); txt(g, '~', 0, 6, '800 16px sans-serif', '#fff'); },
  scarpa: g => { poly(g, [-22, 8, -18, -8, 0, -6, 8, 2, 22, 4, 22, 12, -22, 12], '#6a4a3a'); },
  busta: g => { poly(g, [-14, -16, -6, -10, 6, -10, 14, -16, 16, 16, -16, 16], 'rgba(240,240,250,.9)'); },
  mascherina: g => { rect(g, -16, -9, 32, 18, '#a8d0e8'); g.strokeStyle = '#fff'; g.lineWidth = 2; g.strokeRect(-16, -9, 32, 18); },
  sacco: g => { poly(g, [-18, -6, 18, -6, 22, 20, -22, 20], '#2a2a30'); poly(g, [-8, -6, 8, -6, 4, -16, -4, -16], '#2a2a30'); txt(g, 'ARTE', 0, 12, '800 11px sans-serif', '#ffd76a'); },
  parere: g => { rect(g, -18, -22, 36, 44, '#fbf6e8'); for (let i = 0; i < 5; i++) rect(g, -12, -14 + i * 6, 24, 2, '#888'); ell(g, 8, 14, 7, 7, '#2f9a4a'); },
  scala: g => { g.rotate(0.4); rect(g, -12, -26, 4, 52, '#a06a3a'); rect(g, 8, -26, 4, 52, '#a06a3a'); for (let i = 0; i < 5; i++) rect(g, -10, -20 + i * 10, 20, 3, '#c48a4a'); },
  volantino: g => { rect(g, -18, -22, 36, 44, '#f6e37a'); txt(g, '1987', 0, -4, '800 12px sans-serif', '#2a5aa0'); txt(g, 'PISCINA!', 0, 10, '800 9px sans-serif', '#b0302a'); },
  ordinanza: g => { rect(g, -18, -22, 36, 44, '#fff'); txt(g, 'ORD.', 0, -2, '800 12px sans-serif', '#333'); ell(g, 6, 12, 8, 6, 'rgba(176,48,42,.7)'); },
  phone: g => { rr(g, -12, -22, 24, 44, 5); g.fillStyle = '#c8a050'; g.fill(); rect(g, -9, -17, 18, 30, '#4aa8d8'); },
  pane: g => { ell(g, 0, 4, 24, 16, '#b8782e'); ell(g, -4, -2, 16, 9, '#d89a4a'); g.strokeStyle = '#8a5520'; g.lineWidth = 2; g.beginPath(); g.moveTo(-12, 0); g.lineTo(10, -6); g.stroke(); },
  libro: g => { rect(g, -18, -20, 36, 40, '#5a2a1a'); rect(g, -15, -17, 30, 34, '#7a3a22'); txt(g, '€', 0, 7, '800 18px sans-serif', '#f1c232'); },
  tovagliolo: g => { poly(g, [-20, -16, 20, -18, 18, 18, -18, 16], '#f4f0e6'); g.strokeStyle = '#c8283a'; g.lineWidth = 2; g.strokeRect(-14, -12, 28, 26); },
  diploma: g => { poly(g, [-20, -16, 20, -18, 18, 18, -18, 16], '#f4f0e6'); txt(g, 'DIPL.', 0, 2, '800 10px serif', '#333'); ell(g, 10, 10, 6, 6, '#c8283a'); },
  dente: g => { poly(g, [-10, -14, 10, -14, 12, 0, 6, 16, 2, 4, -2, 4, -6, 16, -12, 0], '#f1c232'); ell(g, -3, -8, 3, 2, '#fff6c0'); },
  pennarello: g => { g.rotate(-0.7); rect(g, -22, -4, 38, 8, '#222'); rect(g, 16, -3, 8, 6, '#e8e8e8'); },
  tanica: g => { rr(g, -16, -18, 32, 38, 5); g.fillStyle = '#3a8fd0'; g.fill(); rect(g, -6, -24, 12, 6, '#2a2a2a'); ell(g, -4, 2, 6, 10, 'rgba(255,255,255,.3)'); }
};
const it = (id, name, look, x = {}) => { ITEMS[id] = { name, look, icon: ic[id], ...x }; };
it('plunger', 'Sturalavandini', 'Il mio sturalavandini. La spada dei veri eroi.', { sciac: 'Si sciacqua da solo, è autopulente.' });
it('toothpick', 'Stuzzicadenti', 'Uno stuzzicadenti del bar. Leggermente usato. Da chi, non lo voglio sapere.', { combine: { pallone: () => makeStamp() } });
it('taralli', 'Taralli', 'Taralli al finocchietto. Moneta corrente nei vicoli di Gravina.');
it('pallone', 'Pallone di Gravina', 'Un pallone di Gravina: formaggio stagionato, duro, rotondo. Come certi assessori.', { combine: { toothpick: () => makeStamp() } });
it('timbro', 'Timbro di formaggio', 'Un timbro intagliato nel pallone. Dice «APPROVATO». Profuma di autenticità.');
it('pass', 'Lasciapassare', 'Lasciapassare per il piano nobile. Timbrato, controtimbrato e leggermente unto.');
const TRASH = ['bottiglia', 'lattina', 'scarpa', 'busta', 'mascherina'];
it('bottiglia', 'Bottiglia di plastica', 'Specie autoctona della pineta.');
it('lattina', 'Lattina', 'Una lattina accartocciata. Ha più carattere di un consigliere.');
it('scarpa', 'Scarpa spaiata', 'Una scarpa sola. L\'altra sarà alla Fiera.');
it('busta', 'Busta di plastica', 'Vola come un sogno. Inquina come un progetto.');
it('mascherina', 'Mascherina', 'Del 2020. Un reperto archeologico.');
it('sacco', "Sacco d'Arte Contemporanea", 'Cinque rifiuti della pineta. Messi insieme, sono una denuncia sociale.');
it('parere', 'Parere Favorevole', "Il parere favorevole dell'Assessora. Ora sono ufficialmente cultura.");
it('scala', 'Scala del vicino', 'Una scala a pioli. Arriva fino al primo piano. Come le ambizioni del Comune.');
it('volantino', 'Volantino del 1987', '«ENTRO L\'ESTATE PROSSIMA: LA PISCINA COMUNALE!» Data: 1987.');
it('ordinanza', 'Ordinanza anti-scorie', "Un'ordinanza firmata dal sindaco. Vieta le scorie. E promette una piscina.");
it('phone', 'Telefonino di Santino', 'Il telefonino di Santino. Cover leopardata, 3% di batteria, 400 contatti chiamati «cugino».',
  { talk: 'Pronto, cugino? ...Il cugino risponde solo a Santino.', combine: { tovagliolo: () => makeDiploma() } });
it('pane', 'Pane di Altamura', 'Pane di Altamura DOP. Duro come un mattone, buono come la nonna. Ottimo come ponte.');
it('libro', 'Libro mastro', 'Il libro mastro del Clan dei Pallonari. Scritto a matita, cancellato a penna.');
it('tovagliolo', 'Tovagliolo', 'Un tovagliolo di stoffa da hotel di lusso. Costa più della mia casa.', { combine: { phone: () => makeDiploma() } });
it('diploma', 'Diploma su tovagliolo', '«Diploma di Igienista Dentale — Università della Vita». Stampato dal cugino.');
it('dente', "Dente d'oro", "Un dente d'oro. Era mio. Ora è un investimento.");
it('pennarello', 'Pennarello indelebile', 'Un pennarello indelebile. Scrive su tutto. Tranne sui contratti.');
it('tanica', "Tanica d'acqua turistica", "Acqua presa all'hotel dei turisti. A Gravina vale più dell'oro.");

// ---------- helpers ----------
async function makeStamp() { take('toothpick'); take('pallone'); give('timbro'); await P('Intaglio il pallone con lo stuzzicadenti... Ecco: un timbro! «APPROVATO». Più autentico di quelli veri.'); }
function pickTrash(id) {
  setF('t_' + id); give(id);
  if (TRASH.every(t => F('t_' + t))) {
    TRASH.forEach(t => take(t)); give('sacco', true); achieve('ecologista');
    return P("Cinque rifiuti! Li metto in un sacco e lo chiamo «Sacco d'Arte Contemporanea». La pineta è pulita e io sono un artista.");
  }
  return P(ITEMS[id].look + ' (' + TRASH.filter(t => F('t_' + t)).length + '/5)');
}

// ---------- Anna, the hint hotline ----------
const HINTS = [
  [() => S.act === 0 && !has('plunger'), "La informiamo che l'attrezzo idraulico da Lei cercato giace sul pavimento, ai sensi della normativa sulle pulizie mai fatte."],
  [() => S.act === 0, 'Si consiglia di applicare lo sturalavandini alla porta. È una procedura idraulica, ma anche amministrativa.'],
  [() => S.act === 1 && !F('bar_fixed'), 'Il barista di Piazza della Repubblica offre taralli a chi risolve problemi di natura sanitaria. Il Suo attrezzo è idoneo.'],
  [() => S.act === 1 && !F('got_toothpick'), 'Sul bancone del bar giace uno stuzzicadenti. Si ricorda che il materiale gratuito va sempre preso.'],
  [() => S.act === 1 && !F('nonna_fed'), 'Nonna Telegiornale, nel vicolo, scambia formaggi e pettegolezzi in cambio di taralli.'],
  [() => S.act === 1 && !F('sportello_ok') && !has('timbro'), 'Per forgiare un timbro valido si suggerisce l\'impiego di prodotti caseari locali a forma sferica e di uno strumento appuntito.'],
  [() => S.act === 1 && !F('sportello_ok'), 'Il timbro va consegnato a uno dei due sportelli. Uno qualsiasi: tanto si rimandano a vicenda.'],
  [() => S.act === 1 && !F('assessora_ok') && !has('sacco'), 'L\'Assessora accetta solo progetti identitari. Si segnala la presenza di cinque rifiuti artistici nella pineta comunale.'],
  [() => S.act === 1 && !F('assessora_ok'), 'Il Suo sacco di rifiuti è pronto per essere consegnato all\'Assessora come opera d\'arte.'],
  [() => S.act === 1 && !F('neighbour_away') && !has('scala'), 'La porta del sindaco è chiusa. Si suggerisce l\'ingresso dalla finestra, con una scala. Il vicino dei fuochi ne ha una. Nonna Telegiornale sa come distrarlo.'],
  [() => S.act === 1 && !has('scala') && !F('ladder_up'), 'Il vicino si è allontanato. La scala è incustodita. Si ricorda che incustodito, a Gravina, significa disponibile.'],
  [() => S.act === 1 && !F('ladder_up'), 'Si suggerisce di applicare la scala alla finestra del primo piano del Palazzo di Città, in piazza.'],
  [() => S.act === 1 && !F('met_mayor'), 'Il sindaco riceve chi ha il parere favorevole. Glielo mostri e parli con lui.'],
  [() => S.act === 1 && !F('know_cinema') && !has('volantino') && !F('swapped'), 'Il sindaco firma tutto ciò che legge. I pensionati in piazza ricordano un vecchio volantino del 1987.'],
  [() => S.act === 1 && !F('mimi_gone') && !has('invito') && !F('got_apron') && !has('volantino') && !F('swapped'), 'Zì Mimì sorveglia il Cinema Imperiale. Desidera un invito alla cena di gala sul Ponte. Per entrarvi serve un travestimento da cameriere: il barista ha grembiuli in abbondanza.'],
  [() => S.act === 1 && !F('mimi_gone') && !has('invito') && !F('waiter') && !has('volantino') && !F('swapped'), 'Indossi il grembiule (Usa grembiule) e si presenti alla cena di gala sul Ponte Acquedotto, a destra della piazza.'],
  [() => S.act === 1 && !F('mimi_gone') && !has('invito') && !has('volantino') && !F('swapped'), 'Sulla tavolata del Ponte c\'è un invito nominativo. Un cameriere può prenderlo senza destare sospetti.'],
  [() => S.act === 1 && !F('mimi_gone') && !has('volantino') && !F('swapped'), 'Consegni l\'invito a Zì Mimì, davanti al cinema nel vicolo.'],
  [() => S.act === 1 && !F('cinema_light') && !has('volantino') && !F('swapped'), 'Il cinema è al buio. Il proiettore funziona ancora, a differenza del Comune.'],
  [() => S.act === 1 && !has('volantino') && !F('swapped'), 'Il volantino è sotto un sedile della fila 7. Ora che c\'è luce, lo vedrà.'],
  [() => S.act === 1 && !F('swapped'), 'Si consiglia di usare il volantino con il discorso sulla scrivania del sindaco.'],
  [() => S.act === 1 && !F('ordinanza'), 'Ora inviti il sindaco a leggere il suo discorso.'],
  [() => S.act === 1, 'La pratica è conclusa. Torni in piazza dalla finestra.'],
  [() => S.act === 2 && !F('atm_calm'), "Il Bancomat è traumatizzato. Si consiglia l'uso del telefonino di Santino: contiene una registrazione molto rilassante."],
  [() => S.act === 2 && !F('read_chats'), 'La Punto di Santino è stata ricoperta di documenti. Si consiglia di leggerli.'],
  [() => S.act === 2 && !F('duel_won'), 'Il fornaio non lascia passare nessuno senza un duello di pane. Si consiglia di rispondere a tono. Con arguzia, non con educazione.'],
  [() => S.act === 2 && !F('safe_open'), 'La combinazione è il numero di inaugurazioni della rotonda. Il sindaco ne ha parlato. Si ricorda che il numero è undici.'],
  [() => S.act === 2 && !F('pane_bridge'), 'Il Pulo è profondo. Il pane di Altamura è duro. Si faccia due conti.'],
  [() => S.act === 2 && !has('marca') && !has('euro16'), "L'Uomo di Altamura accetta documenti solo con marca da bollo da 16 euro. Il Bancomat, ora calmo, potrebbe erogarli."],
  [() => S.act === 2 && !has('marca'), 'La tabaccheria in piazza vende marche da bollo. Solo con importo esatto.'],
  [() => S.act === 2, "Consegni all'Uomo di Altamura il libro mastro. La marca da bollo ce l'ha già."],
  [() => S.act === 3 && !has('tanica') && !F('water'), 'Al Belvedere, il tubo dell\'hotel porta acqua ai turisti. Sciacquone sa come invertire il flusso.'],
  [() => S.act === 3 && !has('tovagliolo') && !has('diploma') && !F('guard_ok'), 'Al Belvedere c\'è un tovagliolo di lusso. Sciacquone lo farebbe appassire: lo faccia prendere a Santino.'],
  [() => S.act === 3 && !has('diploma') && !has('dente') && !F('guard_ok'), 'Santino ha un cugino che stampa diplomi. Usi il telefonino con il tovagliolo, giocando come Santino.'],
  [() => S.act === 3 && !has('dente') && !F('guard_ok'), "Il dentista abusivo farà il dente d'oro a chi gli porta un diploma."],
  [() => S.act === 3 && !F('guard_ok'), "La guardia del set accetta oro. Il dente d'oro va benissimo."],
  [() => S.act === 3 && !has('pennarello'), 'Davanti allo studio del dentista c\'è un pennarello indelebile.'],
  [() => S.act === 3 && !F('regista_away'), 'Il regista non si allontana dal ciak. Gli offra del vero cibo di strada italiano: un panino col tonno, per esempio, come quello trovato nella cassaforte del forno.'],
  [() => S.act === 3, 'Usi il pennarello con il ciak del regista. Riscriva la storia.'],
  [() => S.act === 4 && !F('pool_done'), "La cisterna abbandonata attende l'acqua. Lei ha una tanica."],
  [() => S.act === 4 && !F('station_open'), "Facoltativo ma consigliato: Lo Stazionario aspetta un passeggero. La diaspora è a una videochiamata di distanza."],
  [() => S.act === 4 && !has('relazione') && !has('lanterna'), 'Le prove contro il Clan sono sotto la Fiera, nelle grotte. Si procuri una luce: c\'è una lanterna sulla bancarella dei panini.'],
  [() => S.act === 4 && !has('relazione') && !has('fenicottero'), 'Nelle grotte c\'è un lago. Si consiglia un mezzo di galleggiamento: alla piscina comunale c\'è un fenicottero gonfiabile.'],
  [() => S.act === 4 && !has('relazione') && !F('password_ok'), 'La guardia delle grotte chiede la parola d\'ordine: la frase preferita del sindaco. Le guardie in piscina possono confermarlo.'],
  [() => S.act === 4 && !has('relazione'), 'Nella chiesa rupestre, attraversi il lago sul fenicottero e recuperi la relazione geologica.'],
  [() => S.act === 4, 'Don Pallone è alla Fiera. Lo sconfigga con le armi della burocrazia: osservazioni puntuali.']
];
async function annaHint() {
  AU.sfx('phone'); await sleep(900);
  const h = HINTS.find(([c]) => c());
  await say('anna', 'Segreteria SuperTeleMurgia, sono Anna. In riferimento alla Sua richiesta:');
  await say('anna', h ? h[1] : 'La Sua pratica è conclusa. Si goda la leggenda.');
  await say('anna', 'Distinti saluti.', 1200);
}
async function santinoTalk() {
  await dialog('santino', [
    { t: 'Santino, che facciamo adesso?', run: async () => { const h = HINTS.find(([c]) => c()); await say('santino', h ? 'Tengo nu cugino che dice: ' + h[1].charAt(0).toLowerCase() + h[1].slice(1) : 'Abbiamo finito, compà. Andiamo a mangiare.'); } },
    { t: 'Raccontami di te.', once: true, run: () => line('santino', 'Io? Conosco tutti, risolvo niente. Ho un cugino per ogni problema.', 'Uno fa i diplomi, uno fa le patenti, uno fa il consigliere. Fanno tutti la stessa cosa.') },
    { t: 'Bella tuta.', once: true, run: () => line('santino', "Acetato originale 1996. Respira come un sacchetto del discount.") },
    { t: 'Niente, andiamo.', run: async () => 'end' }
  ]);
}

// ---------- PROLOGUE: Fiera toilet ----------
SC.bagno = {
  name: 'Bagno della Fiera', mood: 'bagno', amb: 'drip', walk: { x0: 230, x1: 1030, y0: 455, y1: 540 }, scale: [0.98, 1.08], start: [420, 500],
  bg(g) {
    rect(g, 0, 0, W, 140, lg(g, 0, 0, 0, 140, '#b9a58a', '#a8937a'));
    for (let i = 0; i < 9; i++) poly(g, [i * 150 + sr() * 40, 140, i * 150 + 60 + sr() * 40, 140, i * 150 + 40, 100 + sr() * 30], '#8e7a64');
    rect(g, 0, 140, W, 310, '#3d7a76');
    g.save(); g.strokeStyle = 'rgba(10,40,40,.35)'; g.lineWidth = 2; for (let x = 0; x < W; x += 44) { g.beginPath(); g.moveTo(x, 140); g.lineTo(x, 450); g.stroke(); } for (let y = 140; y < 450; y += 44) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); } g.restore();
    for (let i = 0; i < 26; i++) rect(g, Math.floor(sr() * 29) * 44 + 2, 140 + Math.floor(sr() * 7) * 44 + 2, 40, 40, sr() < 0.5 ? '#4c8c86' : '#2e605c');
    rect(g, 0, 140, W, 310, lg(g, 0, 140, 0, 450, 'rgba(0,0,0,0)', 'rgba(60,40,10,.35)'));
    // floor
    rect(g, 0, 450, W, 110, '#2b2a33');
    for (let r = 0; r < 4; r++) for (let c = -2; c < 22; c++) { const y0 = 450 + r * r * 8 + r * 14, y1 = 450 + (r + 1) * (r + 1) * 8 + (r + 1) * 14; const k0 = 1 + r * 0.25, k1 = 1 + (r + 1) * 0.25, cw = 64; if ((r + c) % 2) poly(g, [W / 2 + (c * cw - W / 2) * k0, y0, W / 2 + ((c + 1) * cw - W / 2) * k0, y0, W / 2 + ((c + 1) * cw - W / 2) * k1, y1, W / 2 + (c * cw - W / 2) * k1, y1], '#d6cdb8'); }
    rect(g, 0, 450, W, 110, lg(g, 0, 450, 0, 560, 'rgba(40,20,40,.3)', 'rgba(0,0,0,0)'));
    ell(g, 760, 520, 70, 12, 'rgba(120,90,40,.35)');
    // mirror + sink
    rect(g, 255, 165, 160, 180, '#6b5236'); rect(g, 265, 175, 140, 160, lg(g, 265, 175, 405, 335, '#9fc4c8', '#5f8a90'));
    g.strokeStyle = 'rgba(255,255,255,.6)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(330, 175); g.lineTo(350, 250); g.lineTo(300, 300); g.moveTo(350, 250); g.lineTo(400, 270); g.stroke();
    poly(g, [280, 350, 395, 350, 385, 380, 290, 380], '#e8e4da'); rect(g, 325, 380, 25, 70, '#d4cfc4'); rect(g, 333, 340, 8, 12, '#b0b0b8');
    // toilet
    rect(g, 545, 250, 100, 58, '#ebe7dd'); rect(g, 545, 300, 100, 8, '#cfc9bc'); rect(g, 590, 140, 8, 110, '#8a8a90'); g.strokeStyle = '#777'; g.lineWidth = 2; g.beginPath(); g.moveTo(640, 250); g.lineTo(640, 200); g.stroke(); ell(g, 640, 205, 5, 7, '#ccc');
    poly(g, [560, 330, 630, 330, 640, 420, 550, 420], '#e6e1d6'); ell(g, 595, 340, 52, 18, '#f2eee6'); ell(g, 595, 342, 38, 11, '#5d7a7a'); poly(g, [570, 420, 620, 420, 615, 450, 575, 450], '#d8d2c6');
    // radio shelf
    rect(g, 800, 290, 140, 10, '#6b4a2e'); rr(g, 822, 238, 96, 54, 8); g.fillStyle = '#b8462e'; g.fill(); ell(g, 850, 266, 16, 16, '#3a2018'); rect(g, 878, 250, 30, 8, '#f1c232'); g.strokeStyle = '#555'; g.lineWidth = 2; g.beginPath(); g.moveTo(905, 238); g.lineTo(930, 200); g.stroke();
    // poster
    poly(g, [700, 160, 780, 164, 778, 270, 698, 266], '#e9d9a8'); txt(g, 'FIERA', 739, 196, '800 20px Eczar, Bitter, serif', '#b0302a'); txt(g, 'S. GIORGIO', 739, 218, '700 13px sans-serif', '#333'); txt(g, '1998', 739, 250, '800 26px Eczar, Bitter, serif', '#2a5aa0');
    // exit door
    rect(g, 995, 160, 200, 300, '#4a3022'); rect(g, 1010, 175, 170, 285, lg(g, 1010, 175, 1180, 460, '#8a5a3a', '#6a4028'));
    rect(g, 1020, 190, 150, 110, 'rgba(0,0,0,.12)'); rect(g, 1020, 315, 150, 130, 'rgba(0,0,0,.12)'); ell(g, 1035, 330, 8, 8, '#d0a040');
    sign(g, 1040, 200, 110, 34, 'USCITA', '#2f8a4a', '#fff', '800 20px "Alegreya Sans", "Fira Sans", sans-serif');
    rays(g, 1100, 0, 1.9, 0.6, 520, 'rgba(255,240,200,.08)', 4);
  },
  anim(g, t) {
    const on = Math.sin(t * 13) > -0.85 && !(t % 5 < 0.15);
    rect(g, 470, 118, 260, 10, on ? '#f4fff8' : '#7a8a88');
    if (on) { g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = lg(g, 0, 120, 0, 460, 'rgba(200,255,240,.14)', 'rgba(0,0,0,0)'); g.beginPath(); g.moveTo(470, 125); g.lineTo(730, 125); g.lineTo(900, 460); g.lineTo(300, 460); g.fill(); g.restore(); }
    if (F('bagno_open')) { rect(g, 1010, 175, 170, 285, '#1a1018'); g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = lg(g, 1010, 0, 1180, 0, 'rgba(255,220,150,.6)', 'rgba(255,200,120,.2)'); g.fillRect(1010, 175, 170, 285); g.restore(); }
  },
  props: [{ y: 505, cond: () => !F('got_plunger'), draw: g => { g.save(); g.translate(735, 505); g.rotate(-0.15); rect(g, -3, -78, 6, 70, '#a8743a'); poly(g, [-22, -10, 22, -10, 16, 4, -16, 4], '#c0283a'); g.restore(); } }],
  hot: [
    { id: 'porta', name: 'Porta', r: [995, 160, 200, 300], at: [1010, 500], exit: ['piazza', 140, 480, 1],
      exitIf: async () => { if (F('bagno_open')) return true; AU.sfx('door'); await P('È chiusa da fuori. Come tutto in questa città.'); return false; },
      guarda: () => P(F('bagno_open') ? 'Aperta! Fuori ci sono la piazza, la luce e i problemi.' : 'La porta del bagno. Chiusa da fuori. Come tutto in questa città.'),
      usa: () => P('Spingo, tiro... niente. Serve un attrezzo idraulico. O un miracolo di San Giorgio.'),
      useWith: { plunger: async () => { if (F('bagno_open')) return P('È già aperta.'); AU.sfx('boing'); setF('bagno_open'); S.act = 1; await P('Sblock! Ha funzionato! Per la prima volta un\'opera pubblica a Gravina è stata sbloccata.'); } } },
    { id: 'plunger', name: 'Sturalavandini', r: [700, 420, 70, 95], at: [700, 510], cond: () => !F('got_plunger'),
      guarda: 'Uno sturalavandini. La spada dei veri eroi.', prendi: async () => { setF('got_plunger'); give('plunger'); await P('Lo prendo. Con questo in mano mi sento un cavaliere. Un cavaliere idraulico.'); }, sciacqua: 'Lo sturalavandini non si sciacqua. Si rispetta.' },
    { id: 'specchio', name: 'Specchio', r: [255, 165, 160, 180], at: [335, 480], guarda: 'Bello come un cantiere abbandonato. Ma con più personalità.', usa: 'Mi specchio. Lo specchio si incrina un altro po\'.' },
    { id: 'lavandino', name: 'Lavandino', r: [280, 345, 120, 50], at: [335, 480], usa: 'Esce acqua marrone. Almeno è acqua: in Murgia è già un lusso.', guarda: 'Un lavandino. Rubinetto girato a destra per l\'acqua calda, a sinistra per quella fredda. Esce sempre la stessa: nessuna.' },
    { id: 'water', name: 'Water', r: [545, 250, 100, 200], at: [595, 470], guarda: 'Il water della Fiera. Senza tavoletta. Chissà chi l\'ha presa.', usa: 'Non ora. Ho già dato.', sciacqua: "Fluuush! Funziona! È l'unica cosa che funziona alla Fiera di San Giorgio.", prendi: 'La tavoletta ce l\'ho già. La porto al collo, con eleganza.' },
    { id: 'radio', name: 'Radio', r: [815, 200, 120, 95], at: [860, 470], guarda: "Radio SuperTeleMurgia. L'unica fonte che non ha mai detto la verità per sbaglio.",
      usa: async () => { await say('radio', 'Replica: il Clan dei Pallonari vince la gara per il deposito nazionale delle scorie. Porta tre posti di lavoro e un parcheggio.'); await say('radio', 'Il sindaco commenta: «Valuteremo entro l\'estate prossima».'); },
      parla: 'Pronto, radio? ...È a senso unico. Come le strade del centro.' },
    { id: 'poster', name: 'Manifesto della Fiera', r: [698, 160, 82, 110], at: [740, 470], guarda: 'Fiera di San Giorgio 1998. L\'ultima volta che hanno cambiato il manifesto. E la carta igienica.' }
  ],
  async enter() {
    if (F('intro')) return; setF('intro');
    await banner('Prologo', 'Lo Scarico');
    await line('sciac', 'Dove sono? Che puzza...', '...ah no, sono io.');
    await say('radio', 'Notizia bomba! Il Clan dei Pallonari si aggiudica il deposito nazionale delle scorie nucleari sotto la Fiera di San Giorgio!');
    await say('radio', 'Don Pallone dichiara: «Porta lavoro. Tre posti. Due sono di mio cognato». Il sindaco: «Valuteremo entro l\'estate prossima».');
    await line('sciac', 'Le scorie a Gravina?! Qua l\'unica scoria autorizzata sono io!', 'Devo uscire da questo bagno e fermare il Clan. Prima però devo uscire da questo bagno.');
    toast('Clic per camminare e agire. Tasto destro: guarda. ☎ Anna ti aiuta.', 'item');
  }
};

// ---------- ACT I: Piazza della Repubblica ----------
function drawPunto(g, x, y, s = 1, chats) {
  g.save(); g.translate(x, y); g.scale(s, s);
  shadowFloor(g, 0, 0, 150, 18, 0.3);
  poly(g, [-140, -20, -130, -60, -70, -66, -40, -110, 60, -112, 100, -66, 140, -58, 148, -20, 140, -8, -140, -8], '#d8d2c2');
  poly(g, [-140, -20, 148, -20, 140, -8, -140, -8], '#9a9488');
  poly(g, [-30, -102, 54, -104, 86, -68, -60, -66], chats ? '#f4f0e0' : '#4a6a8a');
  if (chats) { g.save(); g.globalAlpha = 0.8; for (let i = 0; i < 8; i++) { rect(g, -50 + (i % 4) * 34, -98 + Math.floor(i / 4) * 16, 28, 4, '#3a8fd0'); rect(g, -44 + (i % 4) * 34, -90 + Math.floor(i / 4) * 16, 22, 3, '#888'); } g.restore(); poly(g, [-130, -56, -74, -62, -72, -26, -128, -24], '#f4f0e0'); txt(g, '♥ TRADITORE ♥', -100, -36, '800 9px sans-serif', '#c8283a'); poly(g, [96, -64, 136, -56, 138, -28, 100, -26], '#f4f0e0'); }
  poly(g, [110, -118, 150, -122, 148, -110, 106, -108], '#c8283a'); rect(g, 120, -112, 6, 10, '#333');
  [[-90, -4], [90, -4]].forEach(([wx, wy]) => { ell(g, wx, wy, 30, 30, '#1c1a20'); ell(g, wx, wy, 14, 14, '#9a9aa4'); });
  ell(g, 142, -44, 7, 9, '#ffe9a0');
  g.restore();
}
SC.piazza = {
  name: 'Piazza della Repubblica, Gravina', mood: 'piazza', amb: 'piazza', walk: { x0: 70, x1: 1210, y0: 438, y1: 545 }, scale: [0.82, 1.0], start: [600, 490],
  npcs: () => [['pens1', 395, 505, 1, 0.92], ['pens2', 480, 505, -1, 0.92], ...(F('act1done') && S.act === 2 && !F('santino_left_piazza') ? [] : [])],
  bg(g) {
    sky(g, '#6fa9d6', '#b7cfe0', '#f6d3a0', '#f2a866');
    glow(g, 900, 120, 380, 'rgba(255,214,150,.45)');
    cloud(g, 120, 90, 260, 'rgba(255,240,225,.75)', 'rgba(230,200,190,.5)'); cloud(g, 760, 60, 300, 'rgba(255,240,225,.7)', 'rgba(230,200,190,.5)');
    // cathedral far
    facade(g, { x: 470, y: 150, w: 330, h: 290, wall: '#e9cc9e', line: '#6a4a2a', win: null, cornice: true });
    poly(g, [470, 150, 635, 70, 800, 150], '#e2c08e'); poly(g, [635, 70, 800, 150, 780, 150, 635, 84], 'rgba(0,0,0,.12)');
    ell(g, 635, 215, 44, 44, '#8a6a4a'); ell(g, 635, 215, 36, 36, '#3a2a40'); for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; g.strokeStyle = '#c9a676'; g.lineWidth = 3; g.beginPath(); g.moveTo(635, 215); g.lineTo(635 + Math.cos(a) * 36, 215 + Math.sin(a) * 36); g.stroke(); }
    doorArch(g, 595, 330, 80, 110, '#5a3a28');
    facade(g, { x: 800, y: 60, w: 70, h: 380, wall: '#e2c290', line: '#6a4a2a', cornice: true }); poly(g, [800, 60, 835, 10, 870, 60], '#c99a66'); winArch(g, 818, 90, 34, 60, { open: false, shut: '#3a2a40' });
    // pineta path
    rect(g, 870, 250, 40, 190, '#6a8a4a'); ell(g, 890, 250, 60, 40, '#4a6a3a'); sign(g, 860, 330, 70, 26, 'Pineta →', '#2f6a3a', '#fff', '700 14px "Alegreya Sans", "Fira Sans", sans-serif');
    // Palazzo di Città
    facade(g, { x: 40, y: 70, w: 400, h: 370, wall: '#e3b789', shade: '#b8865e', side: 20, line: '#6a3a1a', win: { rows: 2, cols: 3, ww: 54, wh: 90, top: 60, gapY: 150 }, wo: { shut: '#2f6a4a' } });
    rect(g, 50, 248, 380, 10, 'rgba(255,240,215,.6)');
    rect(g, 100, 250, 150, 8, '#3a2a2a'); for (let i = 0; i < 10; i++) rect(g, 104 + i * 15, 230, 3, 20, '#3a2a2a'); rect(g, 100, 228, 150, 4, '#3a2a2a');
    doorArch(g, 188, 300, 96, 140, '#5a3020');
    sign(g, 140, 270, 190, 26, 'PALAZZO DI CITTÀ', '#efe0c0', '#5a3020', '800 15px Eczar, Bitter, serif');
    [[160, '#2f9a4a', '#f4f4ee', '#d8343a'], [320, '#2a4aa0', '#2a4aa0', '#2a4aa0']].forEach(([fx, a, b, c]) => { rect(g, fx, 40, 4, 70, '#8a7a6a'); rect(g, fx + 4, 44, 18, 40, a); rect(g, fx + 22, 44, 18, 40, b); rect(g, fx + 40, 44, 18, 40, c); });
    rect(g, 0, 180, 40, 260, '#2a1f2a'); rect(g, 0, 180, 40, 260, lg(g, 0, 0, 40, 0, '#120a14', 'rgba(40,30,40,.5)'));
    // bar
    facade(g, { x: 920, y: 120, w: 360, h: 320, wall: '#dba878', line: '#6a3a1a', win: { rows: 1, cols: 3, ww: 48, wh: 80, top: 40 }, wo: { shut: '#7a3a2a' } });
    for (let i = 0; i < 9; i++) poly(g, [920 + i * 40, 280, 960 + i * 40, 280, 966 + i * 40, 320, 926 + i * 40, 320], i % 2 ? '#f4efe4' : '#c8283a');
    poly(g, [920, 320, 1280, 320, 1280, 330, 920, 330], 'rgba(0,0,0,.25)');
    sign(g, 1000, 238, 200, 34, 'BAR CENTRALE', '#2a1a14', '#ffd76a', '800 22px Eczar, Bitter, serif');
    rect(g, 1010, 335, 90, 105, '#2a1814'); rect(g, 1016, 340, 78, 100, lg(g, 0, 340, 0, 440, '#6a3a22', '#3a2014'));
    rect(g, 1130, 350, 110, 80, '#3a2a40'); rect(g, 1130, 350, 110, 80, 'rgba(255,200,120,.25)');
    // ground
    cobbles(g, 432, SH, '#c99868', '#a8784e');
    rect(g, 0, 432, W, 10, 'rgba(80,40,20,.25)');
    // fountain + statue
    ell(g, 680, 470, 120, 22, '#b88a5e'); ell(g, 680, 462, 110, 18, '#7aa8b8'); ell(g, 680, 462, 90, 12, '#9ac8d4');
    rect(g, 664, 330, 32, 135, '#d8c4a4'); rect(g, 656, 320, 48, 14, '#e8d6b6');
    poly(g, [668, 320, 692, 320, 694, 270, 704, 240, 690, 232, 696, 214, 680, 206, 666, 214, 672, 232, 658, 244, 666, 270], '#8a9a8a'); rect(g, 700, 230, 4, 30, '#7a8a7a');
    // bench
    rect(g, 330, 440, 220, 12, '#7a4a2a'); rect(g, 330, 456, 220, 8, '#6a3a22'); rect(g, 330, 470, 220, 10, '#8a5a32'); rect(g, 340, 480, 8, 28, '#3a2a2a'); rect(g, 530, 480, 8, 28, '#3a2a2a');
    // café tables
    [[1060, 470], [1190, 490]].forEach(([x, y]) => { ell(g, x, y - 52, 34, 9, '#e8e2d4'); rect(g, x - 3, y - 52, 6, 50, '#555'); ell(g, x, y, 18, 4, 'rgba(0,0,0,.3)'); });
    rays(g, 1000, -40, 2.1, 0.7, 760, 'rgba(255,220,160,.12)', 6);
  },
  anim(g, t) {
    lights(g, t, 40, 920, 40, 60, ['#ffd76a', '#ff7a6a', '#7ad0ff', '#9aff8a']);
    lights(g, t + 1, 440, 1280, 120, 50, ['#ffb0e0', '#ffd76a', '#7ad0ff']);
    if (F('ladder_up')) { g.save(); g.translate(180, 440); g.rotate(-0.06); rect(g, -18, -300, 6, 300, '#a06a3a'); rect(g, 18, -300, 6, 300, '#a06a3a'); for (let i = 0; i < 12; i++) rect(g, -14, -290 + i * 25, 34, 5, '#c48a4a'); g.restore(); }
    // swallows
    for (let i = 0; i < 3; i++) { const x = (t * 60 + i * 400) % 1500 - 100, y = 70 + Math.sin(t * 2 + i) * 20 + i * 18; g.strokeStyle = '#2a2030'; g.lineWidth = 2; g.beginPath(); g.moveTo(x - 8, y - 3 + Math.sin(t * 12 + i) * 3); g.lineTo(x, y); g.lineTo(x + 8, y - 3 + Math.sin(t * 12 + i) * 3); g.stroke(); }
    // fountain sparkle
    for (let i = 0; i < 6; i++) { const k = (t * 0.8 + i / 6) % 1; ell(g, 680 + Math.sin(i * 2) * 60 * k, 462 - Math.sin(k * Math.PI) * 30, 2, 2, 'rgba(255,255,255,.7)'); }
  },
  props: [{ y: 548, cond: () => F('act1done'), draw: g => drawPunto(g, 1120, 548, 0.85) }],
  hot: [
    { id: 'vicolo', name: 'Vicolo del centro storico', r: [0, 180, 40, 365], at: [80, 480], exit: ['vicolo', 1150, 490, -1] },
    { id: 'pineta', name: 'Via per la Pineta', r: [860, 240, 60, 200], at: [890, 445], exit: ['pineta', 140, 490, 1] },
    { id: 'bar', name: 'Bar Centrale', r: [1010, 335, 90, 105], at: [1055, 450], exit: ['bar', 140, 500, 1], guarda: "Il Bar Centrale. Dal 1962 il vero centro decisionale di Gravina." },
    { id: 'palazzo', name: 'Palazzo di Città', r: [188, 300, 96, 140], at: [236, 450], exit: ['atrio', 140, 500, 1], guarda: 'Il Palazzo di Città. Dentro: la burocrazia. Fuori: chi la aspetta dal 1974.' },
    { id: 'finestra', name: 'Finestra del sindaco', r: [125, 125, 90, 120], at: [200, 450], cond: () => !F('ladder_up'),
      guarda: "La finestra dell'ufficio del sindaco, al primo piano. Si sente qualcuno che si applaude da solo.",
      useWith: { scala: async () => { if (!F('assessora_ok')) return P("Senza il parere dell'Assessora il sindaco non mi riceve. Neanche dalla finestra."); take('scala'); setF('ladder_up'); AU.sfx('door'); await P('Appoggio la scala alla finestra. Effrazione istituzionale!'); } } },
    { id: 'scalaSu', name: 'Scala verso la finestra', r: [150, 130, 70, 310], at: [200, 450], cond: () => F('ladder_up'), def: 'usa', usa: () => goto('sindaco', 280, 500, 1), guarda: 'La scala del vicino. Porta dritta al potere.', prendi: 'Mi serve ancora. È il mio ascensore per il potere.', exit: ['sindaco', 280, 500, 1] },
    { id: 'statua', name: 'Statua del benefattore', r: [650, 205, 60, 260], at: [600, 480], guarda: 'La statua di un benefattore. Ha fatto più lui da morto che la giunta da viva.', sciacqua: 'Fluuush! La fontana ora ha più acqua. Il Comune ringrazia, ma non paga.' },
    { id: 'cattedrale', name: 'Cattedrale', r: [470, 80, 330, 250], at: [635, 445], guarda: 'La Cattedrale. Mille anni di storia, e il parcheggio lo stanno ancora progettando.' },
    { id: 'punto', name: 'La Punto di Santino', r: [1000, 440, 280, 110], at: [990, 520], cond: () => F('act1done'), def: 'usa', usa: () => goto('mappa'), guarda: 'La Fiat Punto di Santino. Ha uno spoiler, tre ammaccature e zero revisioni.', exit: ['mappa'] }
  ],
  async enter() {
    if (F('ordinanza') && !F('act1done')) await act1End();
    else if (!F('piazza_seen')) { setF('piazza_seen'); await banner('Atto I', 'Gravina, Capitale della Cultura (di Niente)'); await P('Aria! Luce! Pensionati! Devo entrare in Comune e fermare le scorie.'); }
  }
};
async function pensTalk() {
  await dialog('pens', [
    { t: 'Buongiorno! Sapete dov\'è il sindaco?', run: () => line('pens1', 'In foto. Sempre in foto. Dal vivo non l\'ha visto mai nessuno.') },
    { t: 'Ma voi state sempre qua?', once: true, run: async () => { await say('pens2', 'Dal 1974. Abbiamo visto chiudere la stazione, la fiera e tre matrimoni.'); await say('pens1', 'Il suo, il mio e quello del sindaco.'); } },
    { t: 'Che ne pensate delle scorie nucleari?', once: true, run: async () => { await say('pens1', 'Meglio le scorie che niente. Almeno di notte fanno luce.'); await say('pens2', 'E ci risparmiamo la bolletta.'); } },
    { t: 'Vestito da pagliaccio alle dieci di mattina, eh?', once: true, run: async () => { await say('pens1', 'Pensavamo fossi un assessore.'); await say('pens2', 'Gli assessori hanno il naso meno rosso.'); } },
    { t: 'Il sindaco firma qualunque cosa legga, vero?', cond: () => F('met_mayor') && !F('got_volantino'), run: async () => { setF('know_cinema'); await say('pens2', 'Firma tutto, quello. Nel 1987 ha promesso la piscina e ha firmato pure il volantino.'); await say('pens1', 'Il volantino ce l\'avevamo noi. L\'abbiamo perso al Cinema Imperiale, nel vicolo, durante «La Corazzata Murgiana». Sala 2, fila 7.'); await say('pens2', 'Ma sbrigati: Zì Mimì vuole demolire il cinema per farci i monolocali con vista gravina.'); } },
    { t: 'Arrivederci.', run: async () => 'end' }
  ], 'pens');
}

// ---------- Bar Centrale ----------
SC.bar = {
  name: 'Bar Centrale', mood: 'bar', amb: 'bar', walk: { x0: 120, x1: 1090, y0: 465, y1: 545 }, scale: [0.98, 1.08], start: [160, 505],
  npcs: () => [['barista', 560, 432, 1, 1]],
  bg(g) {
    rect(g, 0, 0, W, 470, lg(g, 0, 0, 0, 470, '#5a3424', '#7a4a32'));
    for (let x = 0; x < W; x += 80) rect(g, x, 0, 4, 470, 'rgba(0,0,0,.15)');
    rect(g, 0, 300, W, 8, '#3a2014');
    // shelves + bottles
    [[200, 90], [200, 160]].forEach(([sx, sy]) => { rect(g, sx, sy + 50, 700, 8, '#3a2014'); for (let i = 0; i < 22; i++) { const bx = sx + 14 + i * 31, h = 30 + sr() * 24, c = ['#3a7a4a', '#8a2a2a', '#c89a3a', '#2a4a7a', '#e8e0d0'][i % 5]; rect(g, bx, sy + 50 - h, 14, h, c); rect(g, bx + 4, sy + 50 - h - 10, 6, 10, c); rect(g, bx + 2, sy + 50 - h + 6, 4, h - 12, 'rgba(255,255,255,.25)'); } });
    rect(g, 420, 20, 280, 60, '#2a1a14'); txt(g, 'CAFFÈ ESPRESSO', 560, 60, '800 26px Eczar, Bitter, serif', '#ffd76a');
    // poster + calendar
    poly(g, [940, 90, 1040, 94, 1038, 230, 938, 226], '#e9d9a8'); txt(g, 'GRAVINA', 989, 130, '800 18px Eczar, Bitter, serif', '#2a5aa0'); txt(g, 'CAMPIONE', 989, 156, '700 13px sans-serif', '#333'); txt(g, '1978', 989, 196, '800 28px Eczar, Bitter, serif', '#b0302a');
    // WC door
    rect(g, 1080, 170, 150, 300, '#3a2214'); rect(g, 1092, 182, 126, 288, lg(g, 0, 182, 0, 470, '#7a4a2a', '#5a3420')); ell(g, 1105, 340, 7, 7, '#c8a040');
    sign(g, 1095, 210, 120, 40, 'FUORI SERVIZIO', '#f4f0e0', '#b0302a', '800 13px "Alegreya Sans", "Fira Sans", sans-serif'); txt(g, 'WC', 1155, 300, '800 36px Eczar, Bitter, serif', 'rgba(255,240,200,.5)');
    // entrance light
    rect(g, 0, 160, 100, 310, '#f6d8a0'); rays(g, 0, 300, 0.25, 0.8, 900, 'rgba(255,220,160,.12)', 5);
    // floor
    rect(g, 0, 460, W, 100, '#8a6a4a'); for (let i = 0; i < 14; i++) for (let j = 0; j < 4; j++) if ((i + j) % 2) rect(g, i * 92 + j * 10, 460 + j * 25, 92, 25, '#a8845a');
    rect(g, 0, 460, W, 100, lg(g, 0, 460, 0, 560, 'rgba(0,0,0,.25)', 'rgba(0,0,0,0)'));
  },
  props: [{ y: 452, draw: (g, t) => {
    poly(g, [280, 330, 860, 330, 880, 345, 260, 345], '#c89a5a'); rect(g, 270, 345, 600, 110, '#5a3324'); for (let i = 0; i < 6; i++) rect(g, 290 + i * 98, 360, 80, 80, 'rgba(0,0,0,.15)');
    rect(g, 330, 270, 110, 62, '#c8ccd4'); rect(g, 336, 276, 98, 18, '#e8ecf2'); rect(g, 350, 312, 12, 18, '#2a2a2a'); rect(g, 400, 312, 12, 18, '#2a2a2a'); ell(g, 385, 270, 14, 6, '#b03a2a');
    const st = (Math.sin(t * 0.8) + 1) / 2; for (let i = 0; i < 3; i++) ell(g, 360 + i * 20, 255 - st * 20 - i * 6, 8 + st * 6, 5 + st * 4, 'rgba(255,255,255,' + (0.15 - st * 0.1) + ')');
    if (!F('got_toothpick')) { rect(g, 700, 322, 34, 10, '#e8e0d0'); for (let i = 0; i < 5; i++) rect(g, 704 + i * 6, 306, 2, 18, '#e8cf9a'); }
    ell(g, 600, 328, 16, 5, '#fff'); rect(g, 593, 316, 14, 12, '#fff');
  } }],
  hot: [
    { id: 'uscita', name: 'Uscita', r: [0, 160, 100, 310], at: [130, 505], exit: ['piazza', 1055, 470, -1] },
    { id: 'wc', name: 'Bagno del bar', r: [1080, 170, 150, 300], at: [1060, 505], guarda: () => P(F('bar_fixed') ? 'Il bagno del bar. Funziona! Il barista ha pianto di gioia.' : 'Il bagno del bar. «Fuori servizio» dal Giubileo del 2000.'),
      usa: 'Lo apro... e lo richiudo subito. Lì dentro c\'è un ecosistema.',
      useWith: { plunger: async () => { if (F('bar_fixed')) return P('Già sbloccato. Ora è il bagno più bello di Gravina.'); AU.sfx('flush'); await P('Entro con lo sturalavandini. Ciuff, ciuff... SBLOCK!'); setF('bar_fixed'); AU.sfx('success'); await say('barista', 'Il bagno! Funziona! Dopo ventisei anni! Tieni, taralli al finocchietto. Offre la casa.'); give('taralli'); } },
      sciacqua: async () => { if (!F('bar_fixed')) return P('Fluuush... Glu glu. È intasato. Serve un attrezzo.'); return P('Fluuush! Musica per le mie orecchie.'); } },
    { id: 'stuzz', name: 'Stuzzicadenti', r: [695, 300, 50, 36], at: [700, 470], cond: () => !F('got_toothpick'), guarda: 'Stuzzicadenti di legno. Gratis. La parola più bella di Gravina.', prendi: async () => { setF('got_toothpick'); give('toothpick'); await P('Ne prendo uno. Il barista finge di non vedere.'); } },
    { id: 'macchina', name: 'Macchina del caffè', r: [330, 250, 110, 82], at: [400, 470], guarda: 'Una macchina del caffè del 1979. Fa un caffè che ti resuscita e una bolletta che ti uccide.', usa: 'Il barista mi guarda. La macchina del caffè è sua. Anche il territorio.', sciacqua: 'Fluuush. La macchina del caffè fa pssshhh in risposta. Ci siamo capiti.' },
    { id: 'bottiglie', name: 'Bottiglie', r: [200, 80, 700, 140], at: [560, 470], guarda: 'Amari locali. Ognuno cura qualcosa. Nessuno cura la politica.', prendi: 'Il barista ha gli occhi anche sulla nuca.' },
    { id: 'poster2', name: 'Poster', r: [938, 90, 102, 140], at: [980, 480], guarda: 'Gravina Campione 1978. Di cosa, nessuno lo ricorda. Ma il poster resta.' }
  ]
};
async function baristaTalk() {
  await dialog('barista', [
    { t: 'Un caffè, per favore.', run: () => line('barista', "Il caffè c'è. L'acqua no. Torna quando finiscono l'acquedotto.") },
    { t: 'Posso usare il bagno?', cond: () => !F('bar_fixed'), run: () => line('barista', 'Fuori servizio dal Giubileo. Se lo sblocchi, ti offro i taralli. Parola di barista.') },
    { t: 'Che si dice in paese?', run: async () => { await say('barista', rand(["Dicono che il Clan dei Pallonari vuole le scorie sotto la Fiera. Io dico: purché portino parcheggi.", "Dicono che apre un McPallon's. I giovani sono contenti: finalmente un posto dove fare il colloquio e non essere presi.", 'Dicono che Nonna Telegiornale sa tutto di tutti. Sta nel vicolo. Ama i taralli.'])); } },
    { t: 'Chi è Nonna Telegiornale?', once: true, run: () => line('barista', 'La più grande agenzia stampa della Murgia. Sta nel vicolo, sulla sedia. Paga in taralli, informa in tempo reale.') },
    { t: 'Ciao, grazie.', run: async () => 'end' }
  ]);
}

// ---------- Vicolo ----------
SC.vicolo = {
  name: 'Vicolo del centro storico', mood: 'vicolo', amb: 'vicolo', walk: { x0: 80, x1: 1190, y0: 450, y1: 545 }, scale: [0.86, 1.02], start: [1100, 490],
  npcs: () => [['nonna', 300, 490, 1, 0.95], ...(!F('neighbour_away') ? [['vicino', 930, 262, -1, 0.82]] : [])],
  bg(g) {
    sky(g, '#7ab0d8', '#d6e0dc', '#f4cfa0');
    // far arch + stairs
    facade(g, { x: 430, y: 120, w: 420, h: 330, wall: '#d9b88e', line: '#6a4a2a', cornice: false });
    g.beginPath(); g.moveTo(560, 450); g.lineTo(560, 300); g.arc(640, 300, 80, Math.PI, 0); g.lineTo(720, 450); g.fillStyle = '#3a2a3a'; g.fill();
    for (let i = 0; i < 6; i++) rect(g, 560 + i * 4, 420 - i * 22, 160 - i * 8, 22, i % 2 ? '#c9a678' : '#b8956a');
    rect(g, 560, 300, 160, 150, lg(g, 0, 300, 0, 450, 'rgba(255,220,160,.3)', 'rgba(0,0,0,0)'));
    // left houses
    facade(g, { x: -20, y: 40, w: 460, h: 410, wall: '#e2c194', line: '#6a4a2a', side: 30, shade: '#b08a5e', win: { rows: 2, cols: 2, ww: 56, wh: 86, top: 50, gapY: 150 }, wo: { shut: '#4a7a9a' } });
    doorArch(g, 220, 320, 90, 130, '#6a3a22');
    // right houses
    facade(g, { x: 850, y: 60, w: 450, h: 390, wall: '#d6b080', line: '#6a4a2a', side: -30, shade: '#a87e52', win: { rows: 1, cols: 2, ww: 56, wh: 86, top: 60 }, wo: { shut: '#8a4a3a' } });
    rect(g, 900, 296, 210, 50, 'rgba(0,0,0,.08)'); doorArch(g, 960, 170, 70, 100, '#3a2420');
    // laundry
    g.strokeStyle = '#4a3a2a'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(440, 150); g.quadraticCurveTo(645, 190, 850, 150); g.stroke();
    ['#e85a6a', '#f4f0e4', '#5aa0d8', '#f1c232', '#f4f0e4', '#7ac87a'].forEach((c, i) => { const x = 480 + i * 60, y = 160 + Math.sin(i / 5 * Math.PI) * 26; poly(g, [x, y, x + 40, y, x + 36, y + 50, x + 4, y + 50], c); });
    // pots
    [[120, 450], [760, 450]].forEach(([x, y]) => { poly(g, [x - 22, y - 40, x + 22, y - 40, x + 16, y, x - 16, y], '#b85a3a'); ell(g, x, y - 52, 30, 22, '#4a8a3a'); ell(g, x - 10, y - 66, 8, 8, '#e85a8a'); ell(g, x + 12, y - 60, 7, 7, '#f1c232'); });
    cobbles(g, 448, SH, '#bf9a6e', '#9a7650');
    // chair for nonna
    rect(g, 270, 432, 70, 8, '#8a5a32'); rect(g, 272, 380, 6, 60, '#7a4a2a'); rect(g, 332, 380, 6, 60, '#7a4a2a'); rect(g, 272, 440, 6, 50, '#7a4a2a'); rect(g, 332, 440, 6, 50, '#7a4a2a');
  },
  anim(g, t) {
    // balcony railing drawn over neighbour (as fg in props below)
    if (!F('neighbour_away')) {
      const k = (t % 5.5) / 5.5;
      if (k < 0.25) { const y = 250 - k * 4 * 200; ell(g, 960, y, 3, 6, '#ffd76a'); }
      else if (k < 0.5) { const r = (k - 0.25) * 4 * 120, a = 1 - (k - 0.25) * 4; g.save(); g.globalAlpha = a; g.globalCompositeOperation = 'lighter'; for (let i = 0; i < 16; i++) { const an = i / 16 * Math.PI * 2; ell(g, 960 + Math.cos(an) * r, 60 + Math.sin(an) * r, 3, 3, ['#ff6a6a', '#ffd76a', '#7ad0ff', '#9aff8a'][i % 4]); } g.restore(); if (k < 0.27 && !RT.fw) { RT.fw = 1; AU.sfx('fire'); } }
      else RT.fw = 0;
    }
  },
  props: [
    { y: 263, draw: g => { rect(g, 860, 262, 210, 10, '#3a2a2a'); for (let i = 0; i < 14; i++) rect(g, 866 + i * 15, 216, 3, 46, '#3a2a2a'); rect(g, 860, 212, 210, 5, '#3a2a2a'); poly(g, [856, 272, 1074, 272, 1064, 290, 866, 290], '#c9a476'); if (!F('neighbour_away')) { g.save(); g.translate(880, 250); rect(g, 0, 0, 150, 5, '#a06a3a'); rect(g, 0, 12, 150, 5, '#a06a3a'); g.restore(); } } },
    { y: 520, cond: () => F('neighbour_away') && !F('got_scala'), draw: g => { g.save(); g.translate(1090, 520); g.rotate(-0.12); rect(g, -18, -250, 6, 250, '#a06a3a'); rect(g, 18, -250, 6, 250, '#a06a3a'); for (let i = 0; i < 10; i++) rect(g, -14, -240 + i * 25, 34, 5, '#c48a4a'); g.restore(); } }
  ],
  hot: [
    { id: 'piazzaX', name: 'Verso la piazza', r: [1220, 200, 60, 345], at: [1180, 495], exit: ['piazza', 100, 480, 1] },
    { id: 'scalaV', name: 'Scala', r: [1050, 260, 80, 260], at: [1060, 510], cond: () => F('neighbour_away') && !F('got_scala'), guarda: 'La scala del vicino, incustodita. A Gravina «incustodito» vuol dire «disponibile».', prendi: async () => { setF('got_scala'); give('scala'); await P('La prendo in prestito. Prestito comunale: non si restituisce mai.'); } },
    { id: 'scalaB', name: 'Scala sul balcone', r: [870, 240, 170, 30], at: [960, 480], cond: () => !F('neighbour_away'), guarda: 'Sul balcone c\'è una scala. Il vicino ci appoggia i fuochi d\'artificio.', prendi: 'È lassù, sul balcone. E il vicino la sorveglia con l\'accendino in mano.' },
    { id: 'arco', name: 'Arco di tufo', r: [560, 220, 160, 230], at: [640, 455], guarda: 'Un arco di tufo del Seicento. Regge da quattrocento anni. Il Comune lo ristruttura dal 2009.' },
    { id: 'panni', name: 'Panni stesi', r: [470, 150, 360, 70], at: [640, 470], guarda: 'Biancheria al vento. Il vero sistema di comunicazione del vicolo: un lenzuolo rosso vuol dire «c\'è il sugo».', prendi: 'Rubare le mutande di una signora di Gravina? Preferisco le scorie.' },
    { id: 'porta', name: 'Porta', r: [220, 320, 90, 130], at: [265, 470], usa: 'È casa di Nonna. Entrare senza invito è peggio che non salutare.', guarda: 'La porta di Nonna Telegiornale. Aperta sempre, chiusa mai, come la sua bocca.' }
  ]
};
async function nonnaTalk() {
  await dialog('nonna', [
    { t: 'Buongiorno, signora!', once: true, run: async () => { await say('nonna', 'Io non dico niente... però...'); await say('nonna', 'Il sindaco si tinge i capelli, l\'assessora dorme coi dossier, e il vicino là sopra spara i botti ogni volta che il sindaco parla in TV.'); } },
    { t: 'Ha un pallone di Gravina?', cond: () => !F('nonna_fed'), run: () => line('nonna', 'Ce l\'ho, stagionato quaranta giorni nella grotta. Ma niente è gratis, figlio mio.', 'Portami dei taralli. Il dentista me li ha vietati, quindi li voglio di più.') },
    { t: 'Mi serve la scala del vicino.', cond: () => !F('neighbour_away'), run: async () => {
      if (!F('nonna_fed')) return line('nonna', 'Prima i taralli, poi i favori. È la legge del vicolo.');
      await say('nonna', 'Quello? Lo faccio sparire io. Chiamo sua cugina e le dico che ho saputo una cosa...'); AU.sfx('phone'); await sleep(1000);
      await say('nonna', 'Pronto, Carmela? Hai sentito di tuo cugino? No? ...Ah, non lo sai? Allora vieni qua che te lo dico. Anzi, vai da lui.');
      await say('vicino', 'COSA?! Mia cugina sta venendo? E chi ha parlato?! Arrivo, arrivo!'); AU.sfx('door');
      hideActor('vicino'); setF('neighbour_away'); await say('nonna', 'Visto? Il pettegolezzo è più veloce della fibra ottica.'); } },
    { t: 'Cosa sa del Clan dei Pallonari?', once: true, run: () => line('nonna', 'Don Pallone? Faceva il casaro. Poi ha visto una serie in TV e si è messo in testa di fare il boss.', 'È rotondo, bianco e stagionato male. Come il suo formaggio.') },
    { t: 'Arrivederci, nonna.', run: async () => 'end' }
  ]);
}
async function nonnaTaralli() {
  take('taralli'); setF('nonna_fed');
  await say('nonna', 'Taralli al finocchietto! Ah, il profumo del peccato. Tieni, il mio pallone di Gravina. Stagionato in grotta, duro come la Regione.');
  give('pallone');
}
async function vicinoTalk() {
  await dialog('vicino', [
    { t: 'Ehi, lei sul balcone!', run: () => line('vicino', 'Ogni volta che il sindaco parla in TV, io sparo un botto. Così almeno qualcuno lo ascolta!') },
    { t: 'Mi presta la scala?', run: () => line('vicino', 'La scala? Neanche morto! Ci appendo i fuochi per la festa patronale. E per il funerale del sindaco, se arriva prima.') },
    { t: 'Ha una cugina?', once: true, run: () => line('vicino', 'Carmela. Parla più di Nonna Telegiornale. Se viene a sapere qualcosa, vado di corsa a smentire.') },
    { t: 'Niente, buona giornata.', run: async () => 'end' }
  ]);
}

// ---------- Atrio del Palazzo ----------
SC.atrio = {
  name: 'Atrio del Palazzo di Città', mood: 'palazzo', amb: 'palazzo', walk: { x0: 110, x1: 1170, y0: 465, y1: 545 }, scale: [0.95, 1.05], start: [150, 505],
  npcs: () => [['impA', 330, 400, 1, 0.8], ['impB', 950, 400, -1, 0.8]],
  bg(g) {
    rect(g, 0, 0, W, 470, lg(g, 0, 0, 0, 470, '#d8c3a0', '#b89a76'));
    rect(g, 0, 0, W, 60, '#8a6a4a'); for (let i = 0; i < 16; i++) poly(g, [i * 80, 60, i * 80 + 80, 60, i * 80 + 70, 80, i * 80 + 10, 80], '#a8865e');
    // columns
    [70, 520, 760, 1210].forEach(x => { rect(g, x - 26, 80, 52, 390, '#e8dcc4'); rect(g, x - 26, 80, 18, 390, 'rgba(0,0,0,.1)'); rect(g, x - 34, 80, 68, 20, '#f0e6d2'); rect(g, x - 34, 450, 68, 20, '#d0c0a4'); });
    // stairs + carpet
    for (let i = 0; i < 8; i++) { const y = 450 - i * 26, w = 220 - i * 10; rect(g, 640 - w / 2, y, w, 26, i % 2 ? '#d8ccb4' : '#c8baa0'); rect(g, 640 - w / 4, y, w / 2, 26, i % 2 ? '#a8283a' : '#94202f'); }
    rect(g, 560, 120, 160, 120, '#6a4a2a'); rect(g, 572, 132, 136, 96, '#3a5a4a'); ell(g, 640, 168, 26, 30, '#e0a882'); rect(g, 610, 196, 60, 32, '#3b3b46'); poly(g, [612, 200, 668, 226, 664, 230, 610, 206], '#2f9a4a'); poly(g, [612, 146, 668, 146, 660, 136, 620, 138], '#6a5040'); txt(g, 'IL SINDACO', 640, 258, '800 14px Eczar, Bitter, serif', '#5a3a1a');
    // sportelli
    [[200, 'A', 'Rilascio Timbri'], [820, 'B', 'Ufficio Timbri']].forEach(([x, l, s]) => {
      rect(g, x - 20, 190, 300, 280, '#8a6a4a'); rect(g, x, 230, 260, 160, '#3a4a4a'); rect(g, x, 230, 260, 160, lg(g, 0, 230, 0, 390, 'rgba(180,220,230,.15)', 'rgba(0,0,0,.2)'));
      sign(g, x + 20, 196, 220, 30, 'SPORTELLO ' + l, '#f4ecd8', '#5a3020', '800 17px Eczar, Bitter, serif'); txt(g, s, x + 130, 452, '700 15px "Alegreya Sans", "Fira Sans", sans-serif', '#f4ecd8');
    });
    // floor
    rect(g, 0, 465, W, 95, '#c8c0b0');
    for (let i = 0; i < 16; i++) for (let j = 0; j < 4; j++) if ((i + j) % 2) rect(g, i * 80 + j * 8 - 20, 465 + j * 24, 80, 24, '#8a2a2a');
    rect(g, 0, 465, W, 95, lg(g, 0, 465, 0, 560, 'rgba(0,0,0,.2)', 'rgba(0,0,0,0)'));
    rect(g, 0, 300, 70, 170, '#f6e0b0'); rays(g, 30, 300, 0.1, 0.6, 600, 'rgba(255,230,180,.1)', 4);
    // rope queue
    [380, 470, 560].forEach(x => { rect(g, x - 3, 430, 6, 50, '#c8a040'); ell(g, x, 430, 6, 6, '#e8c050'); }); g.strokeStyle = '#a8283a'; g.lineWidth = 4; g.beginPath(); g.moveTo(380, 438); g.quadraticCurveTo(425, 455, 470, 438); g.quadraticCurveTo(515, 455, 560, 438); g.stroke();
  },
  props: [{ y: 401, draw: g => { [200, 820].forEach(x => { rect(g, x - 10, 382, 280, 18, '#6a4a2a'); rect(g, x - 10, 400, 280, 70, '#7a5a3a'); g.save(); g.globalAlpha = 0.35; for (let i = 0; i < 14; i++) rect(g, x + i * 19, 230, 2, 152, '#c8c0a0'); g.restore(); }); } }],
  hot: [
    { id: 'esci', name: 'Uscita in piazza', r: [0, 300, 70, 170], at: [130, 505], exit: ['piazza', 236, 460, 1] },
    { id: 'scale', name: 'Scalinata al piano nobile', r: [540, 260, 200, 210], at: [640, 470], exit: ['assessora', 150, 500, 1],
      exitIf: async () => { if (F('sportello_ok')) return true; await P('Un usciere invisibile mi sbarra la strada: «Senza lasciapassare, non si sale». È invisibile ma ha un timbro.'); return false; } },
    { id: 'ritratto', name: 'Ritratto del sindaco', r: [560, 120, 160, 140], at: [640, 470], guarda: 'Il ritratto ufficiale del sindaco. Lo cambiano a ogni mandato. È sempre lui.', sciacqua: 'Fluuush. Il ritratto non si scompone. Ha visto di peggio.' }
  ]
};
async function sportelloTalk(w) {
  const me = w === 'A' ? 'impA' : 'impB', other = w === 'A' ? 'B' : 'A';
  setF('talk' + w);
  await dialog('sport' + w, [
    { t: 'Buongiorno, devo salire al piano nobile.', run: async () => {
      if (F('sportello_ok')) return say(me, 'Lei ha già il lasciapassare. Non mi confonda, che poi devo rifare tutto.');
      if (w === 'A') await say(me, 'Per salire serve il lasciapassare. Per il lasciapassare serve il timbro dello Sportello B.');
      else await say(me, 'Certamente. Mi porti il modulo timbrato dallo Sportello A, e le do il timbro.');
      if (F('talkA') && F('talkB')) { await P('Aspetta: A mi manda da B, B mi manda da A. È un loop infinito. Come le promesse elettorali.'); await P('Mi serve un timbro mio. Fatto in casa.'); }
    } },
    { t: 'Ma lo Sportello ' + other + ' dice di venire da lei.', cond: () => F('talk' + other) && !F('sportello_ok'), run: () => say(me, 'Lo Sportello ' + other + ' dice tante cose. Io seguo la procedura. La procedura dice: Sportello ' + other + '.') },
    { t: 'Quanto ci vuole di solito?', once: true, run: () => say(me, w === 'A' ? 'Dipende. Il signore prima di lei è in fila dal 1998. Ha una barba bellissima.' : 'Da sei a otto mandati elettorali. Sette, se cambia il governo.') },
    { t: 'Grazie, arrivederci.', run: async () => 'end' }
  ], 'sport' + w);
}
async function stampIt(w) {
  if (F('sportello_ok')) return say(w === 'A' ? 'impA' : 'impB', 'Lei è già timbrato. Più di così è un tatuaggio.');
  const me = w === 'A' ? 'impA' : 'impB';
  await P('Ecco il modulo. Timbrato.'); AU.sfx('stamp');
  await say(me, 'Vediamo... «APPROVATO». Un timbro validissimo. Ha un profumo... di autenticità. E di cantina.');
  await say(me, 'Ecco il lasciapassare per il piano nobile. Lo conservi: non ne facciamo un altro fino al 2031.');
  take('timbro'); give('pass'); setF('sportello_ok');
}

// ---------- Piano nobile: Assessora Dossier ----------
SC.assessora = {
  name: 'Piano nobile', mood: 'palazzo', amb: 'palazzo', walk: { x0: 110, x1: 1150, y0: 480, y1: 545 }, scale: [0.98, 1.05], start: [150, 510],
  npcs: () => [['assessora', 640, 452, -1, 0.95]],
  bg(g) {
    rect(g, 0, 0, W, 480, lg(g, 0, 0, 0, 480, '#efdcbc', '#d4b88e'));
    rect(g, 0, 0, W, 70, lg(g, 0, 0, 0, 70, '#9ac0d8', '#d8e8f0')); for (let i = 0; i < 6; i++) cloud(g, i * 230, 50, 160, 'rgba(255,255,255,.7)', 'rgba(255,220,220,.3)');
    rect(g, 0, 70, W, 14, '#c8a060');
    // paintings
    [[200, 140, '#6a8a5a'], [380, 150, '#8a4a3a']].forEach(([x, y, c]) => { rect(g, x - 6, y - 6, 132, 102, '#b88a3a'); rect(g, x, y, 120, 90, c); hills(g, 0, 0, 'rgba(0,0,0,0)'); ell(g, x + 60, y + 70, 50, 20, 'rgba(255,255,255,.15)'); });
    // culture poster
    rect(g, 820, 110, 150, 210, '#2a5aa0'); txt(g, 'GRAVINA', 895, 160, '800 24px Eczar, Bitter, serif', '#ffd76a'); txt(g, 'CAPITALE', 895, 196, '800 18px Eczar, Bitter, serif', '#fff'); txt(g, 'DELLA CULTURA', 895, 220, '700 13px sans-serif', '#fff'); txt(g, '(di qualcosa)', 895, 250, 'italic 600 13px sans-serif', '#ffd76a'); txt(g, '2027', 895, 300, '800 34px Eczar, Bitter, serif', '#fff');
    // mayor door
    rect(g, 1030, 180, 170, 300, '#5a3020'); rect(g, 1045, 195, 140, 285, lg(g, 0, 195, 0, 480, '#8a5232', '#6a3a22')); ell(g, 1060, 340, 8, 8, '#e8c050');
    sign(g, 1048, 210, 134, 44, 'SINDACO', '#f4ecd8', '#5a3020', '800 20px Eczar, Bitter, serif'); txt(g, 'In riunione', 1115, 280, 'italic 700 14px sans-serif', '#f4ecd8'); txt(g, '(con sé stesso)', 1115, 298, 'italic 600 12px sans-serif', '#f4ecd8');
    rect(g, 0, 200, 70, 280, '#3a2a30'); for (let i = 0; i < 6; i++) rect(g, 0, 460 - i * 40, 70 - i * 6, 20, '#c8b898');
    rect(g, 0, 478, W, 82, '#7a5a3a'); for (let i = 0; i < 20; i++) rect(g, i * 70, 478, 2, 82, 'rgba(0,0,0,.15)'); rect(g, 200, 490, 880, 50, 'rgba(160,30,40,.55)');
  },
  props: [{ y: 470, draw: (g, t) => {
    poly(g, [480, 388, 820, 388, 830, 398, 470, 398], '#9a6a3a'); rect(g, 476, 398, 350, 76, '#7a4a2a'); rect(g, 490, 410, 150, 54, 'rgba(0,0,0,.15)'); rect(g, 660, 410, 150, 54, 'rgba(0,0,0,.15)');
    for (let i = 0; i < 9; i++) { const c = ['#c8283a', '#2a5aa0', '#f1c232', '#3a8a4a'][i % 4]; rect(g, 500 + Math.sin(i * 1.3) * 6, 384 - i * 26, 90, 24, c); rect(g, 506 + Math.sin(i * 1.3) * 6, 390 - i * 26, 60, 4, 'rgba(255,255,255,.5)'); }
    txt(g, 'DOSSIER', 545 + Math.sin(8 * 1.3) * 6, 172, '800 12px sans-serif', '#fff');
  } }],
  hot: [
    { id: 'giu', name: "Scale per l'atrio", r: [0, 200, 70, 280], at: [130, 510], exit: ['atrio', 640, 480, 1] },
    { id: 'portaS', name: 'Porta del sindaco', r: [1030, 180, 170, 300], at: [1100, 505], guarda: 'La porta del sindaco. «In riunione (con sé stesso)». Dentro, qualcuno si applaude da solo.', usa: 'Chiusa a chiave. Busso: «Il sindaco riceve dalla finestra», dice una voce. Una voce che è sua.', sciacqua: 'Fluuush. Dall\'altra parte, il sindaco grida: «Chi ha tirato lo sciacquone durante il mio discorso?!»' },
    { id: 'dossier', name: 'Torre di dossier', r: [490, 150, 110, 250], at: [520, 500], guarda: 'Sessantaquattro pagine per dossier. Nove dossier. Nessuno letto.', prendi: 'Se ne tolgo uno, crolla tutto. Come il bilancio.' },
    { id: 'poster', name: 'Manifesto della Capitale', r: [820, 110, 150, 210], at: [895, 505], guarda: 'Gravina Capitale della Cultura 2027. Sotto, a matita, qualcuno ha scritto: «e l\'acqua?»' }
  ]
};
async function assessoraTalk() {
  await dialog('assessora', [
    { t: 'Chi è lei?', once: true, run: () => line('assessora', 'Assessora alla Cultura, al Turismo, alla Narrazione Identitaria, ai Dossier e ai Dossier sui Dossier.') },
    { t: 'Devo parlare col sindaco.', cond: () => !F('assessora_ok'), run: () => line('assessora', 'Il sindaco riceve solo progetti culturali con parere favorevole.', 'Mi presenti un progetto identitario. Qualcosa che dialoghi col territorio. Col suo ventre generativo.') },
    { t: 'Che cos\'è un ventre generativo?', once: true, run: async () => { await say('assessora', 'Le gravine sono metafore di una dimensione intima, che porta nutrimento e trasformazione. Proprio come un ventre.'); await P('Ho capito. Cioè, non ho capito niente. Quindi è cultura.'); } },
    { t: 'Cosa ne pensa delle scorie?', once: true, run: () => line('assessora', 'Le scorie sono una narrazione. Se le chiamiamo «installazione permanente», diventano un attrattore turistico.') },
    { t: 'La porta del sindaco è chiusa.', cond: () => F('assessora_ok'), run: () => line('assessora', 'Il sindaco riceve dalla finestra. È una scelta di comunicazione. Più vicina ai cittadini. Più alta, anche.') },
    { t: 'Arrivederci.', run: async () => 'end' }
  ]);
}
async function assessoraSacco() {
  take('sacco'); AU.sfx('success');
  await say('assessora', 'Ma questo è... è... arte contemporanea! Rifiuti della pineta! Denuncia sociale! Materiali poveri! Un dialogo col territorio!');
  await say('assessora', 'Parere favorevolissimo. Lo mettiamo nel dossier. Pagina 65. Il sindaco riceve dalla finestra: la porta è solo simbolica.');
  give('parere'); take('pass'); setF('assessora_ok');
}

// ---------- Ufficio del sindaco ----------
SC.sindaco = {
  name: 'Ufficio del sindaco', mood: 'palazzo', amb: 'palazzo', walk: { x0: 220, x1: 1100, y0: 480, y1: 545 }, scale: [0.98, 1.05], start: [280, 505],
  npcs: () => [['sindaco', 820, 455, -1, 0.95]],
  bg(g) {
    rect(g, 0, 0, W, 480, '#6a2026'); g.save(); g.globalAlpha = 0.14; for (let y = 20; y < 480; y += 60) for (let x = (y / 60 % 2) * 40; x < W; x += 80) { ell(g, x, y, 14, 22, '#f1c232'); ell(g, x, y, 6, 10, '#6a2026'); } g.restore();
    rect(g, 0, 0, W, 480, lg(g, 0, 0, 0, 480, 'rgba(0,0,0,0)', 'rgba(20,0,10,.35)'));
    // window (exit)
    rect(g, 40, 110, 190, 280, '#4a2a1a'); rect(g, 54, 124, 162, 252, lg(g, 0, 124, 0, 376, '#8ac0e0', '#f6d3a0')); rect(g, 130, 124, 8, 252, '#4a2a1a'); rect(g, 54, 240, 162, 8, '#4a2a1a');
    rect(g, 70, 320, 8, 60, '#a06a3a'); rect(g, 190, 320, 8, 60, '#a06a3a'); rect(g, 70, 340, 128, 5, '#c48a4a'); rect(g, 70, 366, 128, 5, '#c48a4a');
    // flags + portrait + photos
    [[300, '#2f9a4a', '#f4f4ee', '#d8343a'], [1180, '#2a4aa0', '#2a4aa0', '#2a4aa0']].forEach(([x, a, b, c]) => { rect(g, x, 100, 5, 360, '#c8a040'); poly(g, [x + 5, 110, x + 35, 120, x + 30, 260, x + 5, 250], a); poly(g, [x + 35, 120, x + 55, 126, x + 50, 266, x + 30, 260], b); poly(g, [x + 55, 126, x + 75, 132, x + 70, 272, x + 50, 266], c); });
    rect(g, 560, 90, 200, 150, '#c8a040'); rect(g, 572, 102, 176, 126, '#2a3a4a'); ell(g, 660, 150, 30, 34, '#e8a882'); rect(g, 620, 182, 80, 46, '#3b3b46'); txt(g, 'IO', 660, 262, '800 18px Eczar, Bitter, serif', '#f1c232');
    rect(g, 420, 140, 100, 80, '#e8e0d0'); ell(g, 470, 180, 30, 20, '#7a7a7a'); ell(g, 470, 180, 16, 10, '#5a8a4a'); txt(g, '11×', 470, 240, '800 16px sans-serif', '#f1c232');
    // golden scissors
    g.save(); g.translate(880, 160); g.strokeStyle = '#f1c232'; g.lineWidth = 5; g.beginPath(); g.arc(-14, 0, 12, 0, 7); g.arc(14, 0, 12, 0, 7); g.stroke(); poly(g, [-6, -6, 40, -60, 44, -56, 0, 0], '#f1c232'); poly(g, [6, -6, -40, -60, -44, -56, 0, 0], '#e0b020'); g.restore();
    // cutout
    g.save(); g.translate(1040, 470); poly(g, [-40, 0, 40, 0, 44, -180, 30, -200, 18, -250, -18, -250, -30, -200, -44, -180], '#c8b08a'); ell(g, 0, -225, 24, 28, '#e8a882'); rect(g, -36, -195, 72, 150, '#3b3b46'); poly(g, [-36, -190, 36, -100, 36, -86, -36, -176], '#2f9a4a'); poly(g, [-14, -238, 18, -236, 14, -252, -10, -252], '#6a5040'); g.strokeStyle = '#3a1418'; g.lineWidth = 3; g.beginPath(); g.arc(0, -218, 10, 0.2, Math.PI - 0.2); g.stroke(); rect(g, -6, 0, 12, 10, '#8a7050'); g.restore();
    rect(g, 0, 478, W, 82, '#4a2a1a'); rect(g, 260, 490, 760, 60, 'rgba(160,120,40,.35)');
  },
  props: [{ y: 470, draw: g => {
    poly(g, [600, 380, 1000, 380, 1015, 394, 585, 394], '#8a5a2a'); rect(g, 590, 394, 420, 80, '#6a3a1a'); rect(g, 606, 406, 180, 58, 'rgba(0,0,0,.15)'); rect(g, 806, 406, 190, 58, 'rgba(0,0,0,.15)');
    if (!F('ordinanza')) { poly(g, [640, 372, 700, 368, 704, 384, 644, 386], F('swapped') ? '#f6e37a' : '#fbf6e8'); }
    rect(g, 920, 360, 6, 24, '#2a2a2a'); poly(g, [905, 350, 940, 350, 934, 362, 911, 362], '#2a2a2a');
  } }],
  hot: [
    { id: 'finestra', name: 'Finestra (scendi in piazza)', r: [40, 110, 190, 280], at: [240, 505], exit: ['piazza', 230, 460, 1] },
    { id: 'discorso', name: 'Discorso del sindaco', r: [630, 355, 85, 35], at: [640, 505], cond: () => !F('ordinanza'),
      guarda: () => P(F('swapped') ? 'Il discorso ora è il volantino del 1987. Più promesse, stesso stile.' : 'Il discorso: «Fermeremo le scorie entro l\'estate prossima». Lo stesso dal 1987, con le date corrette a penna.'),
      prendi: 'Se tocco il discorso, il sindaco non sa più cosa pensare.',
      useWith: { volantino: async () => { take('volantino'); setF('swapped'); await P('Sostituisco il discorso con il volantino del 1987. Lui legge tutto quello che c\'è scritto, no? Vediamo.'); } } },
    { id: 'sagoma', name: 'Sagoma del sindaco', r: [990, 210, 100, 260], at: [960, 510], guarda: 'La sagoma di cartone del sindaco. Più presente dell\'originale, e meno costosa.', parla: 'Ciao, sagoma. ...Risponde uguale al sindaco vero.', prendi: 'Me la porterei a casa, ma poi chi inaugura le rotonde?' },
    { id: 'foto', name: 'Foto della rotonda', r: [420, 140, 100, 110], at: [470, 505], guarda: async () => { await P('Una foto della rotonda di via Bari. Sotto c\'è scritto «11×». L\'ha inaugurata undici volte.'); achieve('inaugurazione'); } },
    { id: 'forbici', name: "Forbici d'oro", r: [830, 100, 100, 80], at: [880, 505], guarda: 'Forbici d\'oro per i nastri. Ne ha consumate undici paia sulla stessa rotonda.', prendi: 'Se gliele prendo, il sindaco smette di esistere. Non sa fare altro.' }
  ]
};
async function sindacoTalk() {
  await dialog('sindaco', [
    { t: 'Signor sindaco, deve firmare contro le scorie!', run: async () => { await say('sindaco', 'Certo! Assolutamente! Entro l\'estate prossima.'); bump('estate', 3, 'estate'); } },
    { t: 'Ho il parere favorevole dell\'Assessora.', cond: () => has('parere') && !F('met_mayor'), run: async () => { take('parere'); setF('met_mayor'); await say('sindaco', 'Ah, un progetto culturale! Benissimo. Allora tra poco leggo il mio discorso e firmo quello che c\'è scritto.'); await say('sindaco', 'Io firmo sempre quello che c\'è scritto. È la mia coerenza.'); await P('Firma quello che legge... Interessante.'); } },
    { t: 'Signor sindaco, legga il suo discorso!', cond: () => F('met_mayor') && !F('ordinanza'), run: async () => {
      if (!F('swapped')) { await say('sindaco', 'Cittadini! Fermeremo le scorie entro... l\'estate prossima. Grazie, grazie.'); await P('Ha letto il solito discorso. Devo cambiare quello che c\'è scritto.'); return; }
      await say('sindaco', 'Cittadini! Entro l\'estate prossima... aspetta. Qui c\'è scritto: «firmo subito un\'ordinanza contro le scorie e costruisco la piscina comunale». Data: 1987.');
      await say('sindaco', 'Beh. Se c\'è scritto, firmo. Io sono coerente.'); AU.sfx('stamp');
      await say('sindaco', 'Ecco! Ordinanza anti-scorie! E la piscina... la piscina entro l\'estate prossima.'); give('ordinanza'); setF('ordinanza'); AU.sfx('success');
      await P('Ce l\'ho! Scendo dalla finestra e lo annuncio a tutta la piazza!'); return 'end'; } },
    { t: 'Quante volte ha inaugurato la rotonda?', run: async () => { await say('sindaco', 'Undici! Undici volte! E alla dodicesima ci mettiamo pure la rotonda.'); achieve('inaugurazione'); setF('know11'); } },
    { t: 'Perché riceve dalla finestra?', once: true, run: () => line('sindaco', 'Vicinanza ai cittadini. E poi dalla porta entrano quelli che chiedono le cose.') },
    { t: 'Arrivederci.', run: async () => 'end' }
  ]);
}

// ---------- Pineta ----------
const TRASHPOS = { bottiglia: [210, 505], lattina: [470, 470], scarpa: [760, 525], busta: [990, 480], mascherina: [1130, 462] };
SC.pineta = {
  name: 'Pineta comunale', mood: 'pineta', amb: 'pineta', walk: { x0: 80, x1: 1200, y0: 440, y1: 545 }, scale: [0.8, 1.0], start: [140, 490],
  bg(g) {
    sky(g, '#5f9fd6', '#a9d0e8', '#e8e8c8');
    hills(g, 380, 60, '#8aa87a', 5, 2); hills(g, 410, 40, '#6a8a5a', 7, 5);
    rect(g, 0, 420, W, 140, lg(g, 0, 420, 0, 560, '#c9a46a', '#9a7a48'));
    SEED(11); for (let i = 0; i < 60; i++) ell(g, sr() * W, 430 + sr() * 130, 20 + sr() * 40, 4 + sr() * 5, 'rgba(90,60,30,.18)');
    [[100, 450, 1.1], [380, 430, 0.9], [640, 445, 1.25], [930, 430, 0.95], [1180, 450, 1.15]].forEach(([x, y, s]) => pine(g, x, y, s));
    for (let i = 0; i < 30; i++) ell(g, sr() * W, 440 + sr() * 110, 24 + sr() * 30, 6, 'rgba(255,240,180,.16)');
    rays(g, 700, -30, 1.75, 0.9, 600, 'rgba(255,250,200,.14)', 7);
    sign(g, 300, 330, 230, 60, 'PINETA COMUNALE', '#2f5a3a', '#fff', '800 20px Eczar, Bitter, serif'); txt(g, 'Capitale della Cultura 2027', 415, 384, '700 13px "Alegreya Sans", "Fira Sans", sans-serif', '#f4ecd8'); rect(g, 410, 392, 8, 50, '#5a3a28');
    poly(g, [850, 450, 900, 450, 894, 400, 856, 400], '#4a6a8a'); poly(g, [850, 400, 900, 400, 906, 392, 844, 392], '#3a5a7a'); ell(g, 875, 398, 28, 8, '#2a2a2a'); poly(g, [858, 398, 880, 380, 870, 400], '#c8c0b0'); poly(g, [880, 396, 900, 386, 892, 400], '#c8283a');
    rect(g, 560, 440, 70, 30, '#2a2a2a'); rect(g, 566, 432, 58, 10, '#3a3a3a'); ell(g, 595, 430, 22, 4, '#555'); rect(g, 566, 470, 4, 20, '#2a2a2a'); rect(g, 620, 470, 4, 20, '#2a2a2a');
    rect(g, 0, 300, 50, 260, 'rgba(255,220,160,.25)');
  },
  anim(g, t) {
    // squirrels in hazmat suits
    [[650, 300, 0], [380, 290, 1.4]].forEach(([x, y, o]) => { const yy = y + Math.sin(t * 1.3 + o) * 40; g.save(); g.translate(x + 8, yy); ell(g, 0, 0, 10, 14, '#f1d232'); ell(g, 0, -14, 8, 8, '#f1d232'); ell(g, 3, -14, 5, 4, 'rgba(120,200,240,.8)'); ell(g, -10, 8, 6, 14, '#a86a3a', 0.5); g.restore(); });
    // drifting needles / leaves
    for (let i = 0; i < 8; i++) { const k = (t * 0.07 + i / 8) % 1; ell(g, (i * 170 + t * 20) % W, k * 450, 3, 1.5, 'rgba(90,70,40,.6)', t + i); }
  },
  props: TRASH.map(id => ({ y: TRASHPOS[id][1], cond: () => !F('t_' + id), draw: g => { g.save(); g.translate(TRASHPOS[id][0], TRASHPOS[id][1] - 14); g.scale(1.2, 1.2); ic[id](g); g.restore(); } })),
  hot: [
    { id: 'via', name: 'Verso la piazza', r: [0, 300, 50, 260], at: [110, 490], exit: ['piazza', 890, 455, 1] },
    ...TRASH.map(id => ({ id, name: ITEMS[id].name, r: [TRASHPOS[id][0] - 34, TRASHPOS[id][1] - 50, 68, 60], at: [TRASHPOS[id][0] - 40, TRASHPOS[id][1] + 4], cond: () => !F('t_' + id), def: 'prendi', guarda: ITEMS[id].look, prendi: () => pickTrash(id), sciacqua: 'Fluuush. Il rifiuto resta. È più radicato della giunta.' })),
    { id: 'cestino', name: 'Cestino comunale', r: [840, 375, 70, 80], at: [870, 470], guarda: 'Il cestino comunale. Pieno dal 2019. Ormai è un monumento.', usa: 'Ci butterei i rifiuti, ma è già pieno. Di altri rifiuti. E di un piccione.' },
    { id: 'bbq', name: 'Barbecue bruciato', r: [555, 425, 80, 60], at: [595, 495], guarda: 'Un barbecue abusivo. Qui ogni domenica si griglia la salsiccia e il regolamento comunale.' },
    { id: 'scoiattoli', name: 'Scoiattoli in tuta anti-contaminazione', r: [360, 250, 320, 100], at: [520, 470], guarda: 'Scoiattoli in tuta gialla. Si preparano alle scorie. Loro sì che hanno un piano.', parla: 'Gli scoiattoli mi guardano attraverso il visore e scuotono la testa.' },
    { id: 'insegna', name: 'Insegna', r: [300, 330, 230, 70], at: [415, 470], guarda: 'Pineta Comunale. Capitale della Cultura 2027. La cultura del picnic, soprattutto.' }
  ]
};

// ---------- end of Act I ----------
async function act1End() {
  setF('act1done'); S.act = 2; take('grembiule'); setF('waiter', false);
  await P('Cittadini di Gravina! Ho l\'ordinanza anti-scorie! Firmata dal sindaco!');
  await say('pens1', 'Bravo! Fammela vedere.'); await say('pens2', '...Amico, guarda il retro. C\'è scritto «valida solo se pubblicata sul sito del Comune».');
  await say('radio', 'Ultim\'ora! Il sito del Comune è irraggiungibile: Don Pallone ha comprato la password del WiFi del Palazzo di Città!');
  await say('radio', 'Don Pallone dichiara: «L\'ordinanza non esiste finché non la carica qualcuno. E qui nessuno carica niente da anni».');
  take('ordinanza'); await P('Maledetto formaggio! Uso l\'ordinanza per incartare i taralli. Mi serve sapere chi finanzia il Clan.');
  addActor('santino', 1290, 500, -1); AU.sfx('car'); await walkTo('santino', 900, 500);
  await say('santino', 'Compà! Sciacquone! Ti cercavo. Sono Santino. Tengo nu cuggino che lavora in banca ad Altamura.');
  await say('santino', 'Dice che i soldi del Clan passano da là. Ho la Punto qua fuori. Il serbatoio è vuoto, ma la speranza è piena.');
  await say('santino', 'Tieni il mio telefonino. C\'è dentro di tutto: contatti, foto della Fiera, e due ore di registrazione del silenzio della Fiera di San Giorgio.');
  give('phone'); await P('Il silenzio della Fiera? Perché l\'hai registrato?'); await say('santino', 'Per dormire, compà. È rilassante. Non succede mai niente.');
  await say('santino', 'Sali sulla Punto quando sei pronto. Andiamo ad Altamura!');
  await walkTo('santino', 1290, 520); hideActor('santino');
  if (window.__DEMO__) return demoEnd();
  await banner('Atto II', 'Altamura, il Pane e il Botto');
}
