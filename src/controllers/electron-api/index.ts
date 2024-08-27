import { BrowserWindow, ipcMain } from "electron";
import { electronApiMethods, SendTorrentIdOpt } from "./methods";
import { DownloadTorrent } from "@/controllers/download-torrent";
import { downloadPath } from "@/config/downloadPath";

export { electronApiMethods } from "./methods";

export default class ElectronAPI {
    static init() {
        ipcMain.on(
            electronApiMethods.sendTorrentId,
            (event, { id }: SendTorrentIdOpt) => {
                if (id instanceof ArrayBuffer) id = Buffer.from(id);

                DownloadTorrent.add(
                    id,
                    downloadPath,
                    BrowserWindow.getAllWindows()[0],
                    event
                );
            }
        );
    }
}
