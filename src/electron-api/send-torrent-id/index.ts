import { IpcMainEvent } from "electron";
import TorrentId from "~/types/TorrentId";
import { Buffer } from "buffer";

export default async function fSendTorrentId(
    event: IpcMainEvent,
    id: TorrentId
) {
    if (id instanceof ArrayBuffer) id = Buffer.from(id);

    const WebTorrent = await import("webtorrent");

    const client = new WebTorrent.default();

    client.add(id, { path: "./downloads/" }, function (torrent) {
        console.log("log");
    });
}
