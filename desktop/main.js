// SuperTeleMurgia — Electron wrapper for Steam
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const pkg = require('./package.json');

// ---------- Steam ----------
// Steam must be initialised before the window exists, or the overlay can't hook in.
let steam = null;
try {
  const sw = require('steamworks.js');
  steam = sw.init(pkg.steam.appId);
  if (pkg.steam.overlay) sw.electronEnableSteamOverlay();
  console.log('Steam OK:', steam.localplayer.getName());
} catch (e) {
  // Not launched from Steam, or Steam not running: the game still works, just without achievements.
  console.warn('Steam non disponibile:', e && e.message);
}

let win = null;
function createWindow() {
  win = new BrowserWindow({
    width: 1280, height: 720, useContentSize: true,
    minWidth: 960, minHeight: 540,
    fullscreen: true,
    backgroundColor: '#120c18',
    autoHideMenuBar: true,
    title: 'SuperTeleMurgia',
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      autoplayPolicy: 'no-user-gesture-required'
    }
  });
  win.setMenu(null);
  win.loadFile(path.join(__dirname, 'game', 'index.html'));
  // F11 or Alt+Enter: fullscreen / window
  win.webContents.on('before-input-event', (e, input) => {
    if (input.type !== 'keyDown') return;
    if (input.key === 'F11' || (input.alt && input.key === 'Enter')) { win.setFullScreen(!win.isFullScreen()); e.preventDefault(); }
  });
  // never open external windows from inside the game
  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
}

ipcMain.on('steam:achieve', (_e, id) => {
  if (!steam || typeof id !== 'string' || !/^ACH_[A-Z0-9]+$/.test(id)) return;
  try { if (!steam.achievement.isActivated(id)) steam.achievement.activate(id); } catch (e) { console.warn('achievement', id, e && e.message); }
});
ipcMain.on('app:fullscreen', () => { if (win) win.setFullScreen(!win.isFullScreen()); });
ipcMain.on('app:quit', () => app.quit());

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
