import { app, BrowserWindow, Menu, shell } from 'electron';
import * as path from 'path';
import * as isDev from 'electron-is-dev';
import { mainMenu } from './keyboard-shortcuts';
import { cleanup, setupIpcController } from './ipc-controller';

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 300,
    minWidth: 400,
    minHeight: 250,
    titleBarStyle: 'hiddenInset',
    titleBarOverlay: {
      color: '#2f3241',
      symbolColor: '#74b1be',
      height: 60
    },
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      preload: path.join(__dirname, "preload.ts") // use a preload script
    }
  });
  
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  
  Menu.setApplicationMenu(mainMenu);
  setupIpcController();

  // trust
  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  })

  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    cleanup();
    app.quit();
  }
});

app.on("quit", () => {
  cleanup();
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
