import { BrowserWindow } from "electron";
import TorrentId from "~/types/TorrentId";
import { Buffer } from "buffer";
import { downloadPath } from "@/config/downloadPath";
import { DownloadTorrent } from "@/controllers/download-torrent";

export default function fSendTorrentId(id: TorrentId, window: BrowserWindow) {
    if (id instanceof ArrayBuffer) id = Buffer.from(id);

    DownloadTorrent.add(id, downloadPath, window);
}
