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
    setSongs(old => ({ ...old, items: data }))
    /* Tentando manter as musicas selecionadas em algum storage */
    /* pages.data = {data,recents} */
  }, [])

  useEffect(() => {
    const weekend = 604800016.56;
    const data = JSON.parse(localStorage.getItem("songsSorted"));
    if (!localStorage.getItem("songsSorted") || new Date().getTime() > data.expiredAt) {
      const storage = {
        data: sortMusics(songsOfTheWeek),
        expiredAt: new Date().getTime() + weekend
      }
      localStorage.setItem("songsSorted", JSON.stringify(storage));

    }
    setMusicsOfTheWeek(data?.data.slice(0, 5));
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
      `).order("id_music", { ascending: false })
  const recents = data2.data.slice(0, 5);
  const date = new Date();
  let songsOfTheWeek = data2.data;




  return {
    props: { data, recents, songsOfTheWeek }, // will be passed to the page component as props
  }
}

function sortMusics(arr) {
  const nonRepeat = [];

  for (let index = 0; index < arr.length; index++) {
    const temp = parseInt(Math.random() * (arr.length));
    if (nonRepeat.indexOf(temp) <= -1) {
      nonRepeat.push(temp)
    } else {
      index--;
    }
  }

  const musicsSorted = [];
  nonRepeat.forEach(old => musicsSorted.push(arr[old]))

console.log(musicsSorted)
  return musicsSorted;
}