const electron = require("electron");
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;
let MainWindow;

app.on('ready', () => {
    MainWindow = new BrowserWindow({});
    MainWindow.loadURL(`file://${__dirname}/index.html`)
})

ipcMain.on('video_submit',  (event, path) => {
    ffmpeg.ffprobe(path, (err, metadata) => {
        MainWindow.webContents.send('video_metadata', metadata.format.duration)
    })
})