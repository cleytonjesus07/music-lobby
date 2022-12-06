
import { useContext, useEffect, useState } from "react"
import AsideMenu from "../components/AsideMenu"
import MusicDetails from "../components/Details"
import TopMenu from "../components/TopMenu"
import { songCtx } from "../Context/SongContext"
import InicioPage from "../pageComponents/InicioPage"
import supabase from "../supabase"


Home.title = "Web Player"
export default function Home({ data, recents }) {
  const { songsCtx: { setSongs }, albumList: { album, setAlbum }, soundPlayer: { setShowPlayer } } = useContext(songCtx);
  const [seeAlbum, setSeeAlbum] = useState(false);

  function closeMusicDetails() {
    setSeeAlbum(false);
  }

  useEffect(() => {
    setSongs(old => ({ ...old, items: data }))
  }, [])

  return (
    <>
      <AsideMenu closeMusicDetails={closeMusicDetails} />
      <TopMenu />
      <main className="ml-56 max-md:ml-0 max-md:flex max-md:flex-col max-md:justify-center max-md:w-full">
        {seeAlbum
          ?
          <MusicDetails />
          :
          (
            <InicioPage recents={recents} data={data} setAlbum={setAlbum} setSeeAlbum={setSeeAlbum} />
          )
        }
      </main>
    </>
  )
}




export async function getServerSideProps() {

  const { data } = await supabase
    .from("Category")
    .select(
      `
       *,
       CategoriesOnAlbums(
          *,
          Album:id_album(
              *,
              Artist:id_artist(*),
              MusicsOnAlbums(id_music(*))
          )
      )
      `
    )

  const data2 = await supabase.
    from("MusicsOnAlbums")
    .select(`
         Music:id_music(*),
         Album:id_album(*,Artist:id_artist(*))
      `).order("id_music", { ascending: false }).limit(5)
  const recents = data2.data

  return {
    props: { data, recents }, // will be passed to the page component as props
  }
}