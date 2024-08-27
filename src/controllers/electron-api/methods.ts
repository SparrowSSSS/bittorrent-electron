import { TorrentId } from "~/types";

export const electronApiMethods = {
    sendTorrentId: "send-torrent-id",
    getDownloadData: "get-download-data",
    startDownload: "start-download",
    setPause: "set-pause",
    finishDowload: "finish-download",
    destroyDownload: "destroy-download"
};

export const getReturnMethod = (method: string) => {
    return method + "-return";
};

export const getErrorMethod = (method: string) => {
    return method + "-error";
};

export interface SendTorrentIdOpt {
    id: TorrentId;
}

export interface SetPauseOpt {
    state: boolean;
}
