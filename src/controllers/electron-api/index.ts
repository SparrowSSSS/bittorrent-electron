import { BrowserWindow, ipcMain } from "electron";
import { electronApiMethods } from "./methods";
import fSendMagnetUrl from "./send-torrent-id";
import TorrentId from "~/types/TorrentId";

export { electronApiMethods } from "./methods";

export default class ElectronAPI {
    static init() {
        ipcMain.on(electronApiMethods.sendTorrentId, (_, id: TorrentId) =>
            fSendMagnetUrl(id, BrowserWindow.getAllWindows()[0])
        );
    }
}
