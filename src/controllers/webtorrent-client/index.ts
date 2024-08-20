import { catchError } from "@/lib/catchError";
import type { Instance } from "webtorrent";

export class WebtorrentClient {
    private static client: Instance;

    static async init() {
        const WebTorrent = await import("webtorrent");

        this.client = new WebTorrent.default();

        this.client.on("error", (err) => {
            catchError(err);
        });
    }

    static getClient() {
        return this.client;
    }
}
