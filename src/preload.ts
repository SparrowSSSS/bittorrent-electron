// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import ElectronAPI from "~/interfaces/ElectronAPI";
import electronApiMethods from "./electron-api/methods";

const api: ElectronAPI = {
    sendTorrentId: (id) =>
        ipcRenderer.send(electronApiMethods.sendTorrentId, id)
};

contextBridge.exposeInMainWorld("electronAPI", api);
