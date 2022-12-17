import { useContext, useEffect, useState } from "react"
import AsideMenu from "../components/AsideMenu"
import MusicDetails from "../components/Details"
import TopMenu from "../components/TopMenu"
import { songCtx } from "../Context/SongContext"
import InicioPage from "../pageComponents/InicioPage"
import supabase from "../supabase"
import { appCtx } from "../Context/AppContext"
import SearchPage from "../pageComponents/SearchPage"
import ShowAll from "../pageComponents/ShowAll"


Home.title = "Web Player"

export default function Home({ data, recents, songsSorted }) {
  const { page: { page, setPage } } = useContext(appCtx);
  const { songsCtx: { setSongs }, albumList: { setAlbum } } = useContext(songCtx);
  const [songsYouMightLike, setSongsYouMightLike] = useState();
  const pages = {
    inicio: <InicioPage songsYouMightLike={songsYouMightLike} recents={recents} data={data} setAlbum={setAlbum} setPage={setPage} getArtistMusicsDetails={getArtistMusicsDetails} />,
    pesquisar: <SearchPage data={data} getArtistMusicsDetails={getArtistMusicsDetails} setPage={setPage} setAlbum={setAlbum} />,
    details: <MusicDetails />,
    showAll: <ShowAll getArtistMusicsDetails={getArtistMusicsDetails} setAlbum={setAlbum} />
  }

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
    `).in("Album.Artist.id_artist", [id_artist])
      .then(({ data }) => {
        return data.filter(({ Album: { Artist } }) => Artist !== null)[0]
      })
      .then(setAlbum)
      .then(() => setPage("details"));
  }

  function getData() {
    const day = 86400000;
    const data = JSON.parse(localStorage.getItem("songsSorted"));
    if (!data?.data || !localStorage.getItem("songsSorted") || new Date().getTime() > data.expiredAt) {
      const storage = {
        data: songsSorted,
        expiredAt: new Date().getTime() + day
      }
      localStorage.setItem("songsSorted", JSON.stringify(storage));
    }
    /* data?.data */
    setSongsYouMightLike(data?.data);
  }



  useEffect(() => {
    getData();
    setSongs(old => ({ ...old, items: data }))
  }, [])

  return (
    <>
      <AsideMenu />
      <TopMenu />
      <BackgroundAnimated />
      <main className="ml-56 max-md:ml-0 max-md:flex max-md:flex-col max-md:justify-center max-md:w-full ">
        {pages[page]}
      </main>
    </>
  )
}

function BackgroundAnimated() {
  return (
    <ul className="background -z-50">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
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
  let songsSorted = sortMusics(data2.data);
  return {
    props: { data, recents, songsSorted }, // will be passed to the page component as props
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
  return musicsSorted.slice(0, 5);
}