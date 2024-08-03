import { ipcMain } from "electron";
import electronApiMethods from "./methods";
import fSendMagnetUrl from "./send-torrent-id";

export default class ElectronAPI {
    static init() {
        ipcMain.on(electronApiMethods.sendTorrentId, fSendMagnetUrl);
    }
}
