import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import AsideMenu from "../components/AsideMenu"
import Card from "../components/Card"
import Section from "../components/Section"
import TopMenu from "../components/TopMenu"
import { songCtx } from "../Context/SongContext"


Home.title = "Web Player"
export default function Home({ categories }) {
  const { songsCtx: { setSongs }, currentMusic: { setMusic }, soundPlayer: { setShowPlayer } } = useContext(songCtx);
  const [seeAlbum, setSeeAlbum] = useState({ ok: false, index: 0 });

  function closeMusicDetails() {
    setSeeAlbum(false);
  }

  useEffect(() => {
    setSongs(old => ({ ...old, items: categories }))
  }, [])



  async function getMusic(id_album) {
    let data = await fetch(`/api/music?id_album=${id_album}`);
    data = await data.json().then(setMusic).then(() => setShowPlayer(true));


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
            categories.map(({ id_category, category_title, categoriesOnAlbums }) => {
              return (
                <Section key={id_category} title={category_title}>
                  {categoriesOnAlbums.map(({ album: { id_album, album_title, album_cover, artist: { artist_bio } } }) => {
                    return (
                      <Card key={id_album} onClick={() => getMusic(id_album)} title={album_title} cover={album_cover} desc={artist_bio} />
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


export async function getServerSideProps(context) {
  /* dlnitCSn7iVdhkIH */
  let data = await fetch(`/api/category`);
  data = await data.json();
  console.log({ data })
  return {
    props: { categories: data }, // will be passed to the page component as props
  }
}