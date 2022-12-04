
import { createContext, useState } from "react"
export const songCtx = createContext();

export default function SongContext({ children }) {
    const [songs, setSongs] = useState({ items: [], index: 0 });
    const [music, setMusic] = useState({});
    const [album, setAlbum] = useState();
    const [showPlayer, setShowPlayer] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);


    /*   async function getMusics() {
          let res = await methods.musics();
  
          console.log(res)
          setSongs({ ...songs, items: res });
      }
  
      useEffect(() => {
          getMusics();
      }, [])
   */

    return (
        <songCtx.Provider
            value={{
                songsCtx: { songs, setSongs },
                soundPlayer: { showPlayer, setShowPlayer },
                albumList: { album, setAlbum },
                currentMusic: { music, setMusic },
                asideMenu: { openMenu, setOpenMenu }
            }}>
            {children}
        </songCtx.Provider>
    )
}