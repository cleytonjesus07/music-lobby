import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import AsideMenu from "../components/AsideMenu"
import Card from "../components/Card"
import Section from "../components/Section"
import TopMenu from "../components/TopMenu"
import { songCtx } from "../Context/SongContext"
import supabase from "../supabase"


Home.title = "Web Player"
export default function Home({ data }) {
  const { songsCtx: { setSongs }, currentMusic: { setMusic }, soundPlayer: { setShowPlayer } } = useContext(songCtx);
  const [seeAlbum, setSeeAlbum] = useState({ ok: false, index: 0 });

  function closeMusicDetails() {
    setSeeAlbum(false);
  }

  useEffect(() => {
    setSongs(old => ({ ...old, items: data }))
  }, [])



  async function getMusic(id_music) {
    await supabase
      .from("Music")
      .select(`
            *,
            Album:id_album(album_cover,Artist:id_artist(artist_name))
        `)
      .in('id_music', [id_music]).then(({ data }) => setMusic(data[0])).then(() => setShowPlayer(true));
  }

  return (
    <>
      <AsideMenu closeMusicDetails={closeMusicDetails} />
      <TopMenu />
      <main className="ml-56">
        {seeAlbum.ok
          ?
          <MusicDetails items={items} seeAlbum={seeAlbum} />
          :
          (
            data.map(({ id_category, category_title, CategoriesOnAlbums }) => {
              return (
                <Section key={id_category} title={category_title}>
                  {CategoriesOnAlbums.map(({ Album: { id_album, album_title, album_cover, Artist: { artist_bio }, Music } }) => {
                    return (

                      <Card key={id_album} onClick={() => getMusic(Music[0]?.id_music)} title={album_title} cover={album_cover} desc={artist_bio} />
                    )
                  })}
                </Section>
              )
            })

          )
        }
      </main>
    </>
  )
}

function MusicDetails({ items, seeAlbum }) {
  const {
    title,
    artist,
    cover
  } = items[seeAlbum.index];
  return (
    <div>
      <section className="relative flex  items-center w-full h-[250px] bg-neutral-900 bg-top bg-cover bg-no-repeat" style={{ backgroundImage: `url(${cover})` }}>
        <div className="flex flex-col justify-center space-y-5 bg-gradient-to-r from-black to-transparent h-full w-[100%]">
          <h2 className="font-bold text-7xl">{artist}</h2>

          <div className="absolute right-10 top-10 rotate-12 shadow-md shadow-black">
            <Image src={cover} width={200} height={200} />
          </div>
        </div>

      </section>
    </div>
  )
}


export async function getServerSideProps() {

  const { data } = await supabase
    .from("Category")
    .select(`
            id_category,
            category_title,
            CategoriesOnAlbums(
                Album:id_album(
                    *,
                    Artist:id_artist(artist_bio),
                    Music(*)
                )
            )
        `);

  return {
    props: { data }, // will be passed to the page component as props
  }
}