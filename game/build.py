"""Builds every version of SuperTeleMurgia from game/src.

    python game/build.py

Outputs (all generated, not committed):
  dist/web/index.html      full game for browsers / itch.io (Google Fonts)
  dist/demo/index.html     free demo: stops after Act I
  dist/dev/index.html      full game + window.__G debug hooks (used by tests)
  dist/dev/game.js         same script on its own, for `node --check`
  desktop/game/index.html  Steam / Electron build (bundled offline fonts)
  launcher/game.html       page embedded in the lightweight Windows .exe
"""
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / 'game' / 'src'
ORDER = ['engine.js', 'audio.js', 'art.js', 'content1.js', 'content2.js', 'content3.js', 'content4.js']

body = '\n'.join((SRC / f).read_text(encoding='utf-8') for f in ORDER)
debug = ("\nwindow.__G = { S, RT, SC, ACTORS, ITEMS, goto, doAct, give, take, F, setF, run, enterScene, pick, AU, MOODS, dialog, HINTS, newGame, MAPLOC, ending, DRIVE, DIASPORA, KEYPAD, TITLE, combine, invAct, ENDINGS, ACH,"
         " art: { drawSciac, person, SANTINO_SPEC, drawBridge, drawPunto, drawCheeseGuy, lights, sky, glow, txt, rr, ell, poly, rect, lg, rg, pine, cypress, hills, facade, winArch, cloud, shade, rays, finishBg, SEED } };\n")
shell = (SRC / 'shell.html').read_text(encoding='utf-8')


def wrap(js):
    return "'use strict';\n{\n" + js + "\n}"


def page(js, local_fonts=False, demo=False):
    html = shell
    if local_fonts:
        start = html.index('<link rel="preconnect"')
        end = html.index('rel="stylesheet">') + len('rel="stylesheet">')
        html = html[:start] + '<link rel="stylesheet" href="fonts/fonts.css">' + html[end:]
    if demo:
        html = html.replace('<script>\n/*__GAME__*/', '<script>window.__DEMO__ = true;</script>\n<script>\n/*__GAME__*/', 1)
    return html.replace('/*__GAME__*/', wrap(js))


def write(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding='utf-8')
    print('  ', path.relative_to(ROOT))


print('Building SuperTeleMurgia:')
write(ROOT / 'dist' / 'web' / 'index.html', page(body))
write(ROOT / 'dist' / 'demo' / 'index.html', page(body, demo=True))
write(ROOT / 'dist' / 'dev' / 'index.html', page(body + debug))
write(ROOT / 'dist' / 'dev' / 'game.js', wrap(body + debug))
write(ROOT / 'desktop' / 'game' / 'index.html', page(body, local_fonts=True))
write(ROOT / 'launcher' / 'game.html', page(body))
print('Done.')
