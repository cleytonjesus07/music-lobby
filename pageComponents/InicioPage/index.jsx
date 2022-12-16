import Card from "../../components/Card"
import Section from "../../components/Section"
import Image from "next/image"
import Loading from "../../components/Loading"
import { useContext } from "react"
import { appCtx } from "../../Context/AppContext"
export default function InicioPage({ songsYouMightLike, recents, data, setAlbum, setPage, getArtistMusicsDetails }) {
    const {translate} = useContext(appCtx);
    return (
        <>
            <div className="bg-gradient-to-b from-black to-neutral-900 ">
                <Section key={"#SongsYouMightLike"} title={`😊 ${translate.mainScreen.musicsMightLike}`} seeMore={false}>
                    {songsYouMightLike
                        ?
                        (
                            songsYouMightLike?.map(({ Album: { album_cover, Artist: { id_artist, artist_bio } }, Music: { music_title } }, i) => {
                                return (

                                    <div key={i} onClick={() => getArtistMusicsDetails(id_artist, setAlbum, setPage)} className="musicTile bg-gradient-to-b from-neutral-800 to-neutral-900 flex  w-80 hover:to-neutral-700 hover:from-neutral-700 transition-all mx-2 my-4  cursor-pointer rounded-lg overflow-hidden  min-w-[calc(200px)] max-sm:w-[100%] relative " style={{ margin: "10px", height: 80, backgroundImage: `url(${album_cover})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                                        <div className="max-md:hidden absolute  overflow-hidden   bg-neutral-900  bg-center bg-no-repeat bg-cover" style={{ width: 90, height: 90, left: "-20px", borderRadius: "0 100px 100px 0" }}>
                                            <Image src={album_cover} decoding="sync" loading="eager" fill sizes="(max-width: 768px) 100%,(max-width: 1200px) 50%,33%" style={{ objectFit: "cover", objectPosition: "top" }} alt="album cover" />
                                        </div>
                                        <div className="flex  bg-black bg-opacity-70  w-full px-10" style={{ justifyContent: "end", alignItems: "center" }}>
                                            <span className=" text-sm font-bold  bg-black bg-opacity-70 text-center  rounded-md  p-2 line-clamp-2" style={{ zIndex: 10 }} >{music_title}</span>
                                        </div>
                                    </div>
                                )
                            })
                        )
                        :
                        (
                            <Loading />
                        )
                    }
                </Section>
                <Section key={"#recent"} title={translate.mainScreen.addRecents} seeMore={false}>
                    {recents
                        ?
                        (
                            recents.map(({ Album: { album_cover, Artist: { id_artist, artist_bio } }, Music: { music_title } }, i) => {
                                return (

                                    <Card key={i}
                                        onClick={() => {
                                            getArtistMusicsDetails(id_artist, setAlbum, setPage)
                                        }}
                                        title={music_title}
                                        cover={album_cover}
                                        desc={artist_bio} />
                                )
                            })
                        )
                        :
                        (
                            <Loading />
                        )}
                </Section>
            </div>
            {data
                ?
                (

                    data.map(({ id_category, category_title, CategoriesOnAlbums }) => {
                        return (
                            <Section key={id_category} title={category_title} seeMore={true}>
                                {CategoriesOnAlbums.map(({ Album: { id_album, album_title, album_cover, Artist: { id_artist, artist_bio } } }) => {

                                    return (

                                        <Card key={id_album}
                                            onClick={() => {
                                                getArtistMusicsDetails(id_artist, setAlbum, setPage)
                                            }}
                                            title={album_title}
                                            cover={album_cover}
                                            desc={artist_bio} />
                                    )
                                })}
                            </Section>
                        )
                    })

                )
                :
                (
                    <Loading />
                )
            }
        </>
    )
}


