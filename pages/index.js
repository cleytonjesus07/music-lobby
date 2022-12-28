import { useContext, useEffect, useState } from "react"
import AsideMenu from "../components/AsideMenu"
import TopMenu from "../components/TopMenu"
import { songCtx } from "../Context/SongContext"
import supabase from "../supabase"
import { appCtx } from "../Context/AppContext"
import { expStorage } from "../utils/storage"
import PagesManager from "../pageComponents/pagesManager"
import { queryClient } from "../utils/rquery"
import { dehydrate } from "@tanstack/react-query"


Home.title = "Web Player"

export default function Home({ dehydratedState }) {
  const categories = dehydratedState.queries[0].state.data;
  const songs = dehydratedState.queries[1].state.data;
  const { page: { page, setPage } } = useContext(appCtx);
  const { songsCtx: { setSongs }, albumList: { setAlbum }, soundPlayer: { showPlayer } } = useContext(songCtx);
  const [songsYouMightLike, setSongsYouMightLike] = useState();


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
    const ttl = ((60 * 60) * 24)
    const key = "songsSorted";
    const storage = { data: songs.songsSorted }
    const ex = new expStorage(localStorage);
    const data = (ex.getItem(key)) ? ex.getJson(key) : ex.setItem(key, JSON.stringify(storage), ttl);
    setSongsYouMightLike(data?.data);
  }



  useEffect(() => {
    setSongs(old => ({ ...old, items: categories }))
    getData();
  }, [])

  return (
    <>
      <AsideMenu />
      <TopMenu />
      <BackgroundAnimated />
      <main className={`ml-56 ${showPlayer && 'mb-28'} max-md:ml-0 max-md:flex max-md:flex-col max-md:justify-center max-md:w-full`}>
        <PagesManager page={page} data={categories} getArtistMusicsDetails={getArtistMusicsDetails} recents={songs.recents} setAlbum={setAlbum} setPage={setPage} songsYouMightLike={songsYouMightLike} />
      </main>
    </>
  )
}





const getCategories = async () => {
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

  return data;
}

const getSongsSorted = async () => {
  const { data } = await supabase.
    from("MusicsOnAlbums")
    .select(`
       Music:id_music(*),
       Album:id_album(*,Artist:id_artist(*))
    `).order("id_music", { ascending: false })
  const recents = data.slice(0, 5);
  const songsSorted = sortMusics(data);
  return ({
    recents,
    songsSorted
  });
}



export async function getServerSideProps() {
  try {
    await queryClient.prefetchQuery({ queryKey: ['categories'], queryFn: () => getCategories() });
    await queryClient.prefetchQuery({ queryKey: ['songs'], queryFn: () => getSongsSorted() });
    return {
      props: { dehydratedState: dehydrate(queryClient) }, // will be passed to the page component as props
    }
  } catch (error) {
    console.log({ error })
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



/* ----------------------------------------------------------------- */

/* Background */
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