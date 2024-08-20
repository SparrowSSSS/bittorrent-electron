import TorrentId from "~/types/TorrentId";
import DownloadData from "./DownloadData";

export default interface ElectronAPI {
    sendTorrentId: (id: TorrentId) => void;
    getDownloadData: (callback: (data: DownloadData) => void) => void;
    finishDowload: (callback: () => void) => void;
    setPause: (state: boolean) => void;
    destroyDownload: () => void;
}
