"""Automated full playthrough: plays the whole game to the good ending and fails on any error.

    pip install playwright && python -m playwright install chromium
    python game/build.py && python tests/playthrough.py
"""
import asyncio, json, os, sys, pathlib
from playwright.async_api import async_playwright
GOOD = None
GAME = pathlib.Path(__file__).resolve().parent.parent / 'dist' / 'dev' / 'index.html'
ERRS, FAILS, RESULT = [], [], {}
async def main():
  try:
    await main2()
  except Exception as e:
    print("EXC", repr(e))
async def main2():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=os.environ.get('CHROME_PATH') or None, args=['--autoplay-policy=no-user-gesture-required', '--no-sandbox'])
        pg = await b.new_page(viewport={'width':1280,'height':720})
        errs=[]
        pg.on('pageerror', lambda e: errs.append('PAGEERROR '+str(e)))
        pg.on('console', lambda m: errs.append('CONSOLE '+m.text) if m.type=='error' else None)
        await pg.goto(GAME.as_uri())
        await pg.wait_for_timeout(3000)
        
        # install auto-pilot
        await pg.evaluate("""() => {
          const G = window.__G; G.AU.init();
          window.GOOD = new Set([...(window.INS||[])]);
          window.ANS = [];
          setInterval(() => {
            const RT = G.RT;
            if (RT.speech) RT.speech.end = RT.t;
            if (RT.dlg) {
              const list = RT.dlg.list.map(o => o.t);
              let i = -1;
              for (let k = 0; k < list.length; k++) if (window.GOODA && window.GOODA.includes(list[k])) i = k;
              if (i < 0 && window.ANS.length) { const a = window.ANS[0]; i = list.findIndex(t => t.includes(a)); if (i >= 0) window.ANS.shift(); }
              if (i < 0) i = list.length - 1;
              window.LOG = (window.LOG||[]); window.LOG.push('pick: ' + list[i]);
              RT.dlg.res(i);
            }
            if (RT.mode && RT.mode !== G.TITLE) {
              const m = RT.mode;
              if (m === G.KEYPAD) { m.code = '11'; m.done(true); }
              else if (m === G.DRIVE) { m.done(true); }
              else if (m === G.DIASPORA) { m.done(true); }
              else if (m.full && m.t0 != null) { m.ready = true; m.done(); }
            }
          }, 30);
          for (const k in G.ACTORS) G.ACTORS[k].speed = 3000;
        }""")
        # collect correct answers from game data
        await pg.evaluate("() => { window.GOODA = []; }")
        await pg.evaluate("""() => { const G = window.__G; G.RT.mode && G.RT.mode.done && G.RT.mode.done(); G.newGame(); return G.goto('bagno'); }""")
        await pg.wait_for_timeout(800)
        async def act(verb, id, item=None, answers=None):
            if answers: await pg.evaluate("a => { window.ANS = a; }", answers)
            r = await asyncio.wait_for(pg.evaluate("""async ([verb, id, item]) => {
              const G = window.__G, S = G.S, RT = G.RT;
              let hit = null;
              if (RT.actors[id] && id !== S.player) { const d = G.ACTORS[id]; hit = { kind: 'actor', id, ref: d, name: d.name, at: d.at ? d.at() : [RT.actors[id].x - 90, RT.actors[id].y] }; }
              else { const h = (G.SC[S.scene].hot || []).find(h => h.id === id && (!h.cond || h.cond())); if (!h) return 'NOHOT ' + id + ' in ' + S.scene; hit = { kind: 'hot', id, ref: h, name: h.name, at: h.at ? (typeof h.at === 'function' ? h.at() : h.at) : null }; }
              await G.run(() => G.doAct(verb, hit, item));
              await new Promise(r => setTimeout(r, 50));
              while (RT.busy || (RT.mode && RT.mode !== G.TITLE)) await new Promise(r => setTimeout(r, 50));
              return S.scene + ' | inv=' + S.inv.join(',') + ' | act=' + S.act;
            }""", [verb, id, item]), 40)
            print(f'{verb:9s} {id:12s} {item or "":10s} -> {r}')
            if 'NOHOT' in r: FAILS.append(f'{verb} {id}')
            return r
        async def comb(a,b):
            r = await pg.evaluate("async ([a,b]) => { const G = window.__G; await G.run(() => G.combine(a,b)); while (G.RT.busy) await new Promise(r=>setTimeout(r,50)); return G.S.inv.join(','); }", [a,b]); print('combine',a,b,'->',r)
        async def shot(n): await pg.wait_for_timeout(200)
        async def useinv(i):
            r = await pg.evaluate("async i => { const G = window.__G; await G.run(() => G.invAct('usa', i)); while (G.RT.busy) await new Promise(r=>setTimeout(r,50)); return Object.keys(G.S.flags).includes('waiter'); }", i); print('use', i, r)
        async def setp(pl): await pg.evaluate("pl => { window.__G.S.player = pl; }", pl)
        await pg.evaluate("""() => { const G = window.__G; window.GOODA = [];
           const src = [G.ENDINGS]; }""")
        await pg.evaluate("""() => { window.GOODA = ["E il tuo è duro come la testa del tuo sindaco.","Almeno il nostro decreto esiste. Il vostro è ancora in conferenza dei servizi.","Grazie, ho fatto il corso alla pineta comunale.","Noi lo abbiamo eletto.","Allora sei tu che hai vinto l'appalto?",
          "Osservazione n. 1: due posti su tre sono di tuo cognato. Conflitto di interessi.","Osservazione n. 2: sotto la Fiera ci sono le grotte. Lo dice la geologia, non la Regione.","Osservazione n. 3: la gara è stata pubblicata su un sito senza WiFi. Nessuno ha potuto partecipare. Nulla.","Osservazione finale: le ho mandate per PEC, con ricevuta di consegna. E la PEC è per sempre.","Ti sfido! Con le armi della burocrazia!", "Entro l'estate prossima."]; }""")
        await shot('01_bagno')
        await act('prendi','plunger'); await act('usa','porta','plunger'); await act('vai','porta')
        await act('vai','bar'); await act('usa','wc','plunger'); await act('prendi','stuzz'); await act('prendi','grembiule'); await act('vai','uscita')
        await act('vai','vicolo'); await act('dai','nonna','taralli'); await act('parla','nonna',answers=['scala']); await act('prendi','scalaV')
        await comb('toothpick','pallone')
        await act('vai','piazzaX'); await act('vai','pineta'); await act('prendi','bbq')
        for t in ['bottiglia','lattina','scarpa','busta','mascherina']: await act('prendi',t)
        await act('vai','via'); await act('vai','palazzo'); await act('dai','impA','timbro'); await act('vai','scale'); await act('dai','assessora','sacco')
        await act('vai','giu'); await act('vai','esci'); await act('usa','finestra','scala'); await act('vai','scalaSu')
        await act('parla','sindaco',answers=['parere','rotonda']); await act('vai','finestra')
        await act('parla','pens1',answers=['firma qualunque'])
        await useinv('grembiule'); await act('vai','ponteX'); await shot('30_ponte'); await act('prendi','invito'); await act('vai','piazza')
        await act('vai','vicolo'); await shot('31_vicolo_mimi'); await act('dai','mimi','invito'); await act('vai','cinema'); await shot('32_cinema_dark'); await act('usa','proiettore'); await shot('33_cinema_light'); await act('prendi','fila7'); await act('vai','esci')
        await act('vai','piazzaX'); await act('vai','scalaSu'); await act('usa','discorso','volantino'); await act('parla','sindaco',answers=['legga'])
        await act('vai','finestra')
        await act('vai','punto'); await act('usa','santeramo'); await act('usa','santeramo'); await act('usa','santeramo'); await act('usa','santeramo'); await act('usa','santeramo'); await act('usa','santeramo'); await shot('34_santeramo')
        await act('parla','vigile',answers=['pagliaccio']); await act('dai','macellaio','carbonella'); await shot('35_santeramo_in'); await act('vai','mappa')
        await act('usa','ospedale'); await shot('36_ospedale'); await act('parla','barbuto'); await act('vai','esci')
        await act('usa','altamura'); await act('usa','atm','phone'); await act('parla','atm',answers=['16 euro']); await act('dai','tabaccaia','euro16'); await shot('37_altamura_tabacchi')
        await act('guarda','punto'); await act('vai','forno'); await act('parla','fornaio',answers=['sfido']); await act('usa','cassaforte'); await act('vai','esci'); await act('vai','pulo')
        await act('usa','voragine','pane'); await act('dai','uomo','libro')
        await act('vai','via'); await act('vai','punto'); await act('usa','matera')
        await act('prendi','pen'); await act('vai','belv'); await act('sciacqua','tubo'); await setp('santino'); await act('prendi','tovagliolo'); await comb('phone','tovagliolo'); await setp('sciac')
        await act('vai','sassi'); await act('dai','dentista','diploma'); await act('dai','guardia','dente'); await act('vai','set'); await act('usa','ciak','pennarello'); await act('dai','regista','panino'); await act('usa','ciak','pennarello')
        await act('usa','stazione'); await act('usa','stazionario','phone'); await act('vai','esci')
        await act('usa','cisterna'); await act('usa','vasca','tanica'); await act('prendi','fenicottero'); await act('parla','goon1',answers=['parola']); await act('vai','esci')
        await act('usa','fiera'); await act('parla','pallone'); await act('prendi','lanterna'); await act('vai','botola'); await shot('38_grotte'); await act('vai','galleria'); await act('parla','peppino'); await act('vai','galleria'); await shot('39_chiesa')
        await act('usa','lago','fenicottero'); await act('vai','indietro'); await act('vai','su'); await act('parla','pallone')
        await pg.wait_for_timeout(1500); await shot('24_after')
        st = await pg.evaluate("() => JSON.stringify({scene: window.__G.S.scene, flags: Object.keys(window.__G.S.flags).filter(k=>!k.startsWith('dl_')), mode: !!window.__G.RT.mode})")
        print(st)
        log = await pg.evaluate("() => (window.LOG||[]).slice(-12)")
        print('\n'.join(log))
        print('ERRORS:', len(errs)); print('\n'.join(errs[:30])); ERRS.extend(errs); RESULT['boss_done'] = 'boss_done' in json.loads(st)['flags']
        await b.close()
asyncio.run(main())
ok = not ERRS and not FAILS and RESULT.get('boss_done')
print('\nRESULT:', 'PASS — game finished, no errors' if ok else f'FAIL errors={ERRS[:5]} missing={FAILS} finished={RESULT.get("boss_done")}')
sys.exit(0 if ok else 1)
