const { contextBridge, ipcRenderer } = require("electron");

const API = {
    getBasicInfo: (msg) => ipcRenderer.invoke("ytdl:getBasicInfo", msg)
}

contextBridge.exposeInMainWorld("api", API);