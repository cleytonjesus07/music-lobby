
import { useContext, useEffect, useState } from "react"
import AsideMenu from "../components/AsideMenu"
import Card from "../components/Card"
import MusicDetails from "../components/Details"
import Section from "../components/Section"
import TopMenu from "../components/TopMenu"
import { songCtx } from "../Context/SongContext"
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

  async function getArtistMusicsDetails(id_artist) {

    await supabase
      .from("MusicsOnAlbums")
      .select(`
        id_music(*),
        Album:id_album(
            album_cover,
            Artist:id_artist(*)
        )
    `).in("Album.id_artist", [id_artist])
      .then(({ data }) => {
        return data.filter(({ Album }) => Album !== null)[0]
      })
      .then(setAlbum)
      .then(() => setSeeAlbum(true));
  }



  return (
    <>
      <AsideMenu closeMusicDetails={closeMusicDetails} />
      <TopMenu />
      <main className="ml-56 max-md:ml-0">
        {seeAlbum
          ?
          <MusicDetails />
          :
          (
            <>
              <div className="bg-gradient-to-b from-black to-neutral-900">
                <Section key={"#recent"} title={"Adicionados recentemente"}>
                  {recents.slice(0, 5).map(({ Album: { album_cover, Artist: { id_artist, artist_bio } }, Music: { music_title } }, i) => {
                    return (

                      <Card key={i}
                        onClick={() => {
                          getArtistMusicsDetails(id_artist)
                        }}
                        title={music_title}
                        cover={album_cover}
                        desc={artist_bio} />
                    )
                  })}
                </Section>
              </div>
              {
                data.map(({ id_category, category_title, CategoriesOnAlbums }) => {
                  return (
                    <Section key={id_category} title={category_title}>
                      {CategoriesOnAlbums.map(({ Album: { id_album, album_title, album_cover, Artist: { id_artist, artist_bio }, Music } }) => {

                        return (

                          <Card key={id_album}
                            onClick={() => {
                              getArtistMusicsDetails(id_artist)
                            }}
                            title={album_title}
                            cover={album_cover}
                            desc={artist_bio} />
                        )
                      })}
                    </Section>
                  )
                })
              }
            </>
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
      `).order("id_music", { ascending: false })
  const recents = data2.data

  return {
    props: { data, recents }, // will be passed to the page component as props
  }
}