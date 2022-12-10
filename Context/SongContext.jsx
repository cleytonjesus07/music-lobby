
import { createContext, useEffect, useState } from "react"
export const songCtx = createContext();

export default function SongContext({ children }) {
    const [songs, setSongs] = useState({ items: [], index: 0 });
    const [music, setMusic] = useState({});
    const [album, setAlbum] = useState();
    const [showPlayer, setShowPlayer] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [idMusic, setIdMusic] = useState({ id: Number(0), refId: Number(0) });
    const [playing, setPlaying] = useState(false);

    /*   async function getMusics() {
          let res = await methods.musics();
  
          console.log(res)
          setSongs({ ...songs, items: res });
      }
  
      useEffect(() => {
          getMusics();
      }, [])
   */

    useEffect(() => {
        if (document.body.clientWidth < 640 && showPlayer) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [showPlayer])

    return (
        <songCtx.Provider
            value={{
                songsCtx: { songs, setSongs },
                soundPlayer: { showPlayer, setShowPlayer },
                isPlaying: { playing, setPlaying },
                albumList: { album, setAlbum },
                currentMusic: { music, setMusic },
                choice: { idMusic, setIdMusic },
                asideMenu: { openMenu, setOpenMenu }
            }}>
            {children}
        </songCtx.Provider>
    )
}