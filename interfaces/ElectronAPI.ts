import TorrentId from "~/types/TorrentId";

export default interface ElectronAPI {
    sendTorrentId: (id: TorrentId) => void
}