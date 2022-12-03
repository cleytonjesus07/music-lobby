import methods from "../pocketbase/index";
import { createContext, useEffect, useState } from "react"
export const songCtx = createContext();

export default function SongContext({ children }) {
    const [songs, setSongs] = useState({ items: [], index: 0 });
    const [music, setMusic] = useState();
    const [showPlayer, setShowPlayer] = useState(false);

   

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
        <songCtx.Provider value={{ songsCtx: { songs, setSongs }, soundPlayer: { showPlayer, setShowPlayer }, currentMusic: { music, setMusic } }}>
            {children}
        </songCtx.Provider>
    )
}