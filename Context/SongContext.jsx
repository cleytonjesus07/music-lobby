import { createContext, useRef, useState } from "react"
export const songCtx = createContext();

export default function SongContext({ children }) {
    const [songs, setSongs] = useState({ items: [], index: 0 });
    const [music,setMusic] = useState({});
    const [album, setAlbum] = useState();
    const [showPlayer, setShowPlayer] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [playingMusicId, setPlayingMusicId] = useState({ id: null, index: null });
    const [playing, setPlaying] = useState(false);

    return (
        <songCtx.Provider
            value={{
                songsCtx: { songs, setSongs },
                soundPlayer: { showPlayer, setShowPlayer },
                isPlaying: { playing, setPlaying },
                albumList: { album, setAlbum },
                currentMusic: { music,setMusic},
                playingMusic: { playingMusicId, setPlayingMusicId },
                asideMenu: { openMenu, setOpenMenu }
            }}>
            {children}
        </songCtx.Provider>
    )
}