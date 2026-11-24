// Exposes a tiny, safe bridge to the game as window.steam
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('steam', {
  achieve: id => ipcRenderer.send('steam:achieve', String(id)),
  toggleFullscreen: () => ipcRenderer.send('app:fullscreen'),
  quit: () => ipcRenderer.send('app:quit')
});
