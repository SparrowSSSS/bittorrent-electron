import { TwoChannelsMethod } from "~/types";
import DownloadData from "./DownloadData";
import { SendTorrentIdOpt, SetPauseOpt } from "@/controllers/electron-api/methods";

export default interface ElectronAPI {
    sendTorrentId: TwoChannelsMethod<SendTorrentIdOpt>;
    getDownloadData: (callback: (data: DownloadData) => void) => void;
    finishDowload: (callback: () => void) => void;
    setPause: TwoChannelsMethod<SetPauseOpt>;
    destroyDownload: () => void;
}
