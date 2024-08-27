// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-script

import { contextBridge, ipcRenderer } from "electron";
import ElectronAPI from "~/interfaces/ElectronAPI";
import {
    electronApiMethods,
    getErrorMethod,
    getReturnMethod
} from "./controllers/electron-api/methods";
import { TwoChannelsMethod } from "~/types";

const getTwoChannelsMethod = <T>(method: string): TwoChannelsMethod<T> => {
    return (opt, callback, errCallback) => {
        ipcRenderer.send(method, opt);

        const errorMethod = getErrorMethod(method);
        const returnMethod = getReturnMethod(method);

        ipcRenderer.on(errorMethod, () => {
            errCallback();

            ipcRenderer.removeAllListeners(errorMethod);
        });

        ipcRenderer.on(returnMethod, () => {
            callback();

            ipcRenderer.removeAllListeners(returnMethod);
        });
    };
};

const api: ElectronAPI = {
    sendTorrentId: getTwoChannelsMethod(electronApiMethods.sendTorrentId),
    getDownloadData: (callback) =>
        ipcRenderer.on(electronApiMethods.getDownloadData, (_, data) =>
            callback(data)
        ),
    finishDowload: (callback) =>
        ipcRenderer.on(electronApiMethods.finishDowload, callback),
    setPause: getTwoChannelsMethod(electronApiMethods.setPause),
    destroyDownload: () => ipcRenderer.send(electronApiMethods.destroyDownload)
};

contextBridge.exposeInMainWorld("electronAPI", api);
