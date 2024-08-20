// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-script

import { contextBridge, ipcRenderer } from "electron";
import ElectronAPI from "~/interfaces/ElectronAPI";
import { electronApiMethods } from "./controllers/electron-api/methods";

const api: ElectronAPI = {
    sendTorrentId: (id) =>
        ipcRenderer.send(electronApiMethods.sendTorrentId, id),
    getDownloadData: (callback) =>
        ipcRenderer.on(electronApiMethods.getDownloadData, (_, data) =>
            callback(data)
        ),
    finishDowload: (callback) =>
        ipcRenderer.on(electronApiMethods.finishDowload, callback),
    setPause: (state) => ipcRenderer.send(electronApiMethods.setPause, state),
    destroyDownload: () => ipcRenderer.send(electronApiMethods.destroyDownload),
};

contextBridge.exposeInMainWorld("electronAPI", api);
