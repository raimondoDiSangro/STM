"""Touch-screen test: plays the opening on an emulated Android phone (landscape, touch only).

    python game/build.py && python tests/touch.py

Checks tap-to-act, verb buttons, hold-to-look, the reveal lens, the big dialog panel,
the Android back button hook and the driving minigame, and saves screenshots in tests/shots/.
"""
import asyncio, os, pathlib, sys
from playwright.async_api import async_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
GAME = ROOT / 'dist' / 'dev' / 'index.html'
SHOTS = ROOT / 'tests' / 'shots'
FAILS = []


def check(ok, what):
    print(('  ok   ' if ok else '  FAIL ') + what)
    if not ok: FAILS.append(what)


async def main():
    SHOTS.mkdir(exist_ok=True)
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=os.environ.get('CHROME_PATH') or None, args=['--no-sandbox', '--autoplay-policy=no-user-gesture-required'])
        ctx = await b.new_context(viewport={'width': 915, 'height': 412}, device_scale_factor=2.625, is_mobile=True, has_touch=True,
                                  user_agent='Mozilla/5.0 (Linux; Android 15; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Mobile Safari/537.36')
        # pretend to be inside the Android app
        await ctx.add_init_script("window.AndroidHost = { haptic(k){ (window.HAPTIC = window.HAPTIC || []).push(k); }, quit(){ window.QUIT = true; } };")
        pg = await ctx.new_page()
        errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
        await pg.goto(GAME.as_uri()); await pg.wait_for_timeout(2500)
        cdp = await ctx.new_cdp_session(pg)
        box = await pg.evaluate("() => { const r = document.getElementById('game').getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; }")

        def to_page(x, y): return {'x': box[0] + x * box[2] / 1280, 'y': box[1] + y * box[3] / 720}
        async def touch(kind, x, y):
            await cdp.send('Input.dispatchTouchEvent', {'type': kind, 'touchPoints': [] if kind == 'touchEnd' else [to_page(x, y)]})
        async def tap(x, y, hold=60):
            await touch('touchStart', x, y); await pg.wait_for_timeout(hold); await touch('touchEnd', x, y); await pg.wait_for_timeout(120)
        async def ev(js): return await pg.evaluate(js)
        async def speedup(): await ev("() => { for (const k in __G.ACTORS) __G.ACTORS[k].speed = 2500; }")
        async def wait_idle(ms=8000):
            for _ in range(ms // 100):
                if await ev("() => !__G.RT.busy && !__G.RT.speech"): return
                await ev("() => { if (__G.RT.speech) __G.RT.speech.end = __G.RT.t; }"); await pg.wait_for_timeout(100)

        check(await ev("() => __G.RT.mode === __G.TITLE"), 'title screen up')
        await pg.screenshot(path=str(SHOTS / 'touch-title.png'))
        check(await ev("() => __G.TITLE.btns().some(b => b.id === 'quit')"), 'title has "Esci dal gioco" on Android')
        nb = await ev("() => __G.TITLE.btns().find(b => b.id === 'new').r")
        await tap(nb[0] + nb[2] / 2, nb[1] + nb[3] / 2)
        await pg.wait_for_timeout(1500); await speedup(); await wait_idle()
        check(await ev("() => __G.S.scene === 'bagno'"), 'tap "Nuova partita" starts the game')
        check(await ev("() => document.querySelector('canvas') && true"), 'canvas present')

        # reveal lens
        await tap(50, 50)
        await pg.wait_for_timeout(300)
        check(await ev("() => __G.RT.reveal != null"), 'lens reveals hotspots')
        await pg.screenshot(path=str(SHOTS / 'touch-reveal.png'))
        await pg.wait_for_timeout(3500)

        # hold to look at the mirror
        await touch('touchStart', 335, 245); await pg.wait_for_timeout(700)
        said = await ev("() => __G.RT.speech && __G.RT.speech.text")
        await touch('touchEnd', 335, 245)
        check(bool(said), 'hold = Guarda (mirror): ' + str(said)[:50])
        check(await ev("() => (window.HAPTIC || []).includes(1)"), 'long press buzzes')
        await wait_idle()

        # probe: drag finger from floor onto the plunger, release = default action, label follows the finger
        await touch('touchStart', 600, 520); await pg.wait_for_timeout(80)
        for i in range(1, 8): await touch('touchMove', 600 + i * 22, 520 - i * 6); await pg.wait_for_timeout(30)
        await pg.wait_for_timeout(100)
        lab = await ev("() => __G.RT.hover && __G.RT.hover.id")
        await pg.screenshot(path=str(SHOTS / 'touch-probe.png'))
        await touch('touchEnd', 735, 478); await pg.wait_for_timeout(200)
        check(lab == 'plunger', 'dragging the finger shows the hotspot under it: ' + str(lab))
        await wait_idle()

        # verb button Prendi, then a slightly-off tap on the plunger (fuzzy pick)
        v = await ev("() => { const r = [18 + 152, 594, 144, 52]; return r; }")
        await tap(v[0] + v[2] / 2, v[1] + v[3] / 2)
        check(await ev("() => __G.RT.verb === 'prendi'"), 'tap verb "Prendi"')
        await tap(700 - 18, 470)  # just left of the plunger's box
        await pg.wait_for_timeout(600); await wait_idle()
        check(await ev("() => __G.S.inv.includes('sturalavandini') || __G.S.inv.length > 0"), 'near-miss tap still picks up the plunger')

        # dialog panel: open the Android back menu
        await ev("() => window.__stmBack()")
        await pg.wait_for_timeout(300)
        check(await ev("() => !!__G.RT.dlg && __G.RT.dlg.list.some(o => o.t.startsWith('Esci'))"), 'back button opens the menu with Esci')
        await pg.screenshot(path=str(SHOTS / 'touch-menu.png'))
        r0 = await ev("() => { const n = __G.RT.dlg.list.length, rh = Math.min(64, Math.floor((720 - 60) / n)); return [30, 720 - 12 - n * rh, 1220, rh - 8]; }")
        await tap(r0[0] + 200, r0[1] + r0[3] / 2)
        await pg.wait_for_timeout(300)
        check(await ev("() => !__G.RT.dlg"), 'tap a big dialog row (Riprendi)')

        # long press on an inventory item = look
        await wait_idle()
        await touch('touchStart', 492 + 57, 594 + 26); await pg.wait_for_timeout(700)
        it = await ev("() => __G.RT.speech && __G.RT.speech.text"); await touch('touchEnd', 492 + 57, 620)
        check(bool(it), 'hold on inventory item = Guarda: ' + str(it)[:50])
        await wait_idle()

        # a real conversation in the bar
        await ev("() => __G.goto('bar')"); await pg.wait_for_timeout(1500); await speedup(); await wait_idle()
        npc = await ev("() => { const a = Object.values(__G.RT.actors).find(a => a.id !== __G.S.player && !a.hidden && !__G.ACTORS[a.id].noPick); return a ? [a.id, a.x, a.y] : null; }")
        if npc:
            await ev("() => { __G.RT.verb = 'parla'; }")
            await tap(npc[1], npc[2] - 80)
            for _ in range(60):
                if await ev("() => !!__G.RT.dlg"): break
                await ev("() => { if (__G.RT.speech) __G.RT.speech.end = __G.RT.t; }"); await pg.wait_for_timeout(100)
            check(await ev("() => !!__G.RT.dlg"), 'talking to ' + npc[0] + ' opens the touch dialog panel')
            await pg.screenshot(path=str(SHOTS / 'touch-dialog.png'))
            n = await ev("() => __G.RT.dlg ? __G.RT.dlg.list.length : 0")
            if n:
                r = await ev("() => { const n = __G.RT.dlg.list.length, rh = Math.min(64, Math.floor((720 - 60) / n)); return [30, 720 - 12 - n * rh + (n - 1) * rh, 1220, rh - 8]; }")
                await tap(r[0] + 300, r[1] + r[3] / 2); await pg.wait_for_timeout(400)
                check(await ev("() => !__G.RT.dlg || __G.RT.speech"), 'tapping the last option answers')
            await wait_idle(15000)
            for _ in range(10):
                if not await ev("() => !!__G.RT.dlg"): break
                await ev("() => __G.RT.dlg.res(__G.RT.dlg.list.length - 1)"); await pg.wait_for_timeout(200); await wait_idle()

        # driving minigame wording + lane change by tap
        await ev("() => { __G.RT.mode = null; }")
        await ev("() => { window.__drive = new Promise(r => { const m = __G.DRIVE; m.done = v => { __G.RT.mode = null; r(v); }; __G.RT.mode = m; m.init(); }); }")
        await pg.wait_for_timeout(600)
        await pg.screenshot(path=str(SHOTS / 'touch-drive.png'))
        lane0 = await ev("() => __G.DRIVE.lane"); await tap(200, 500)
        check(await ev("() => __G.DRIVE.lane") == lane0 - 1, 'tap left of the car changes lane')
        await ev("() => __G.DRIVE.done(true)")

        # pause / resume hooks
        await ev("() => { window.__stmPause(); window.__stmResume(); }")
        await ev("() => window.__stmBack()")  # opens the menu in the bar
        await pg.wait_for_timeout(200)
        await ev("() => { if (__G.RT.dlg) __G.RT.dlg.res(__G.RT.dlg.list.findIndex(o => o.t.startsWith('Esci'))); }")
        await pg.wait_for_timeout(300)
        check(await ev("() => window.QUIT === true"), 'Esci calls AndroidHost.quit()')

        check(not errs, 'no JavaScript errors' + ('' if not errs else ': ' + ' | '.join(errs[:3])))
        await b.close()
    print('\nRESULT:', 'PASS' if not FAILS else 'FAIL (' + str(len(FAILS)) + ')')
    sys.exit(1 if FAILS else 0)

asyncio.run(main())
