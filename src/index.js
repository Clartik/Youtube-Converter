const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const ytdl = require('ytdl-core');

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 960,
        height: 540,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadFile("index.html");

    mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

ipcMain.handle('ytdl:getBasicInfo', async (event, url) => {
    return await ytdl.getBasicInfo(url);
});