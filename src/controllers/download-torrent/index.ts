import type { Torrent } from "webtorrent";
import TorrentId from "~/types/TorrentId";
import { WebtorrentClient } from "@/controllers/webtorrent-client";
import { BrowserWindow, ipcMain } from "electron";
import { electronApiMethods } from "@/controllers/electron-api";
import { catchError } from "@/lib/catchError";
import DownloadData from "~/interfaces/DownloadData";

export class DownloadTorrent {
    private static torrent: Torrent;
    private static window: BrowserWindow;

    static add(torrentId: TorrentId, path: string, window: BrowserWindow) {
        this.window = window;

        const client = WebtorrentClient.getClient();

        client.add(torrentId, { path }, (torrent) => this.action(torrent));
    }

    static eventListener() {
        ipcMain.on(electronApiMethods.destroyDownload, () => {
            if (this.torrent) this.torrent.destroy();
        });

        ipcMain.on(electronApiMethods.setPause, (_, state: boolean) => {
            if (this.torrent) {
                if (state) {
                    this.torrent.destroy();
                } else {
                    const client = WebtorrentClient.getClient();

                    client.add(
                        this.torrent.magnetURI,
                        { path: this.torrent.path },
                        (torrent) => this.action(torrent)
                    );
                }
            }
        });
    }

    private static action(torrent: Torrent) {
        this.torrent = torrent;

        torrent.on("download", () =>
            this.window.webContents.send(electronApiMethods.getDownloadData, {
                progress: torrent.progress,
                timeRemaining: torrent.timeRemaining,
                speed: torrent.downloadSpeed
            } as DownloadData)
        );

        torrent.on("done", () => {
            this.window.webContents.send(electronApiMethods.finishDowload);

            torrent.destroy();
        });

        torrent.on("error", (err) => {
            catchError(err);
        });
    }
}
