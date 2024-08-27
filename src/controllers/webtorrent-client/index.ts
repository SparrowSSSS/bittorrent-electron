import { catchError } from "@/lib/catchError";
import type { Instance, Torrent } from "webtorrent";
import { TorrentId } from "~/types";

export class WebtorrentClient {
    private static client: Instance;
    private static errCall: () => void;

    static async init() {
        const WebTorrent = await import("webtorrent");

        this.client = new WebTorrent.default();

        this.client.on("error", (err) => {
            catchError(err);

            this.errCall();
        });
    }

    static destroy() {
        this.client.destroy();
    }

    static add(
        torrentId: TorrentId,
        path: string,
        action: (torrent: Torrent) => void,
        returnCall?: () => void,
        errorCall?: () => void
    ) {
        this.client.add(torrentId, { path }, (torrent) => {
            action(torrent);

            returnCall();
        });

        this.errCall = errorCall;
    }
}
