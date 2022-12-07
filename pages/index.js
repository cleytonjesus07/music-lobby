
import { useContext, useEffect } from "react"
import AsideMenu from "../components/AsideMenu"
import MusicDetails from "../components/Details"
import TopMenu from "../components/TopMenu"
import { songCtx } from "../Context/SongContext"
import InicioPage from "../pageComponents/InicioPage"
import supabase from "../supabase"

import { appCtx } from "../Context/AppContext"
import SearchPage from "../pageComponents/SearchPage"

Home.title = "Web Player"
export default function Home({ data, recents }) {
  const { page: { page, setPage } } = useContext(appCtx);
  const { songsCtx: { setSongs }, albumList: { album, setAlbum }, soundPlayer: { setShowPlayer } } = useContext(songCtx);
  async function getArtistMusicsDetails(id_artist, setAlbum) {
    await supabase
      .from("MusicsOnAlbums")
      .select(`
        id_music(*),
        Album:id_album(
            album_cover,
            album_title,
            Artist:id_artist(*)
        )
    `).in("Album.id_artist", [id_artist])
      .then(({ data }) => {
        return data.filter(({ Album }) => Album !== null)[0]
      })
      .then(setAlbum)
      .then(() => setPage("details"));
  }
  const pageManager = {
    pages: (page) => {
      /* Páginas */
      switch (page) {
        case "início":
          return <InicioPage recents={recents} data={data} setAlbum={setAlbum} setPage={setPage} getArtistMusicsDetails={getArtistMusicsDetails} />
        case "pesquisar":
          return <SearchPage data={data} getArtistMusicsDetails={getArtistMusicsDetails} setPage={setPage} setAlbum={setAlbum} />
        case "details":
          return <MusicDetails />
        default:
          break;
      }
    }
  }


  useEffect(() => {
    /* pages.data = {data,recents} */
    setSongs(old => ({ ...old, items: data }))
  }, [])

  return (
    <>
      <AsideMenu />
      <TopMenu />
      <main className="ml-56 max-md:ml-0 max-md:flex max-md:flex-col max-md:justify-center max-md:w-full ">
        {pageManager.pages(page)}
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