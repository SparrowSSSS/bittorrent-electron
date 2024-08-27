import type { Torrent } from "webtorrent";
import { WebtorrentClient } from "@/controllers/webtorrent-client";
import { BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import { electronApiMethods } from "@/controllers/electron-api";
import { catchError } from "@/lib/catchError";
import DownloadData from "~/interfaces/DownloadData";
import {
    getErrorMethod,
    getReturnMethod,
    SetPauseOpt
} from "../electron-api/methods";
import { TorrentId } from "~/types";

export class DownloadTorrent {
    private static torrent: Torrent;
    private static window: BrowserWindow;

    static add(
        torrentId: TorrentId,
        path: string,
        window: BrowserWindow,
        event: IpcMainEvent
    ) {
        this.window = window;

        WebtorrentClient.add(
            torrentId,
            path,
            (torrent) => this.action(torrent),
            () => {
                event.sender.send(
                    getReturnMethod(electronApiMethods.sendTorrentId)
                );
            },
            () => {
                event.sender.send(
                    getErrorMethod(electronApiMethods.sendTorrentId)
                );
            }
        );
    }

    static eventListener() {
        ipcMain.on(electronApiMethods.destroyDownload, () => {
            this.torrent.destroy();
        });

        ipcMain.on(
            electronApiMethods.setPause,
            (event, { state }: SetPauseOpt) => {
                if (state) {
                    this.torrent.destroy({}, () => {
                        event.sender.send(
                            getReturnMethod(electronApiMethods.setPause)
                        );
                    });
                } else {
                    WebtorrentClient.add(
                        this.torrent.magnetURI,
                        this.torrent.path,
                        (torrent) => this.action(torrent),
                        () => {
                            event.sender.send(
                                getReturnMethod(electronApiMethods.setPause)
                            );
                        }
                    );
                }
            }
        );
    }

    private static action(torrent: Torrent) {
        this.torrent = torrent;

        torrent.on("download", () =>
            this.window.webContents.send(electronApiMethods.getDownloadData, {
                progress: torrent.progress,
                timeRemaining: torrent.timeRemaining,
                speed: torrent.downloadSpeed,
                magnetUrl: torrent.magnetURI
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
