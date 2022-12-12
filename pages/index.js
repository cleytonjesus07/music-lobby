
import { useContext, useEffect, useRef, useState } from "react"
import AsideMenu from "../components/AsideMenu"
import MusicDetails from "../components/Details"
import TopMenu from "../components/TopMenu"
import { songCtx } from "../Context/SongContext"
import InicioPage from "../pageComponents/InicioPage"
import supabase from "../supabase"

import { appCtx } from "../Context/AppContext"
import SearchPage from "../pageComponents/SearchPage"
const oneWeek = 604800016.56;
Home.title = "Web Player"
export default function Home({ data, recents, songsOfTheWeek }) {
  const customMusicFavorites = [0, 1, 3, 4, 8];
  const timeoutRef = useRef();
  const { page: { page, setPage } } = useContext(appCtx);
  const { songsCtx: { setSongs }, albumList: { album, setAlbum }, soundPlayer: { setShowPlayer } } = useContext(songCtx);
  const [musicsOfTheWeek, setMusicsOfTheWeek] = useState(songsOfTheWeek.slice(0, 5));


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
          return <InicioPage musicsOfTheWeek={musicsOfTheWeek} recents={recents} data={data} setAlbum={setAlbum} setPage={setPage} getArtistMusicsDetails={getArtistMusicsDetails} />
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

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setMusicsOfTheWeek(() => {
        return songsOfTheWeek.map(sortMusics).slice(0, 5)
      })
    }, oneWeek);

    return () => clearTimeout(timeoutRef.current)
  })
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
      `).order("id_music", { ascending: false })
  const recents = data2.data.slice(0, 5);


  let songsOfTheWeek = data2.data.map(sortMusics);

  return {
    props: { data, recents, songsOfTheWeek }, // will be passed to the page component as props
  }
}

function sortMusics(song, i, arr) {
  const numberSorted = (Math.floor((Math.random() * (arr.length - 1))))
  return arr[numberSorted];
}