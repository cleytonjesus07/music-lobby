import Card from "../../components/Card"
import Image from "next/image"
import Loading from "../../components/Loading"
import { useContext, memo, lazy } from "react"
import { appCtx } from "../../Context/AppContext"
import MusicTiles from "../../components/MusicTiles"
const Section = lazy(() => import("../../components/Section"))
function InicioPage({ songsYouMightLike, recents, data, setAlbum, setPage, getArtistMusicsDetails }) {
    const { translate } = useContext(appCtx);
    return (
        <>
            <div className="bg-gradient-to-b from-black to-neutral-900 ">
                <Section key={"#SongsYouMightLike"} title={`😊 ${translate.mainScreen.musicsMightLike}`} seeMore={false}>
                    {songsYouMightLike
                        ?
                        (
                            songsYouMightLike?.map(
                                ({ Album: { album_cover,
                                    Artist: { id_artist } },
                                    Music: { music_title } },
                                    index
                                ) => <MusicTiles
                                        key={index}
                                        id_artist={id_artist}
                                        setPage={setPage}
                                        setAlbum={setAlbum}
                                        album_cover={album_cover}
                                        music_title={music_title}
                                        getArtistMusicsDetails={getArtistMusicsDetails}
                                    />
                            )
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
                            recents.map(
                                ({ Album: { album_cover,
                                    Artist: { id_artist, artist_bio } },
                                    Music: { music_title } },
                                    i
                                ) => <Card key={i}
                                        onClick={() => getArtistMusicsDetails(id_artist, setAlbum, setPage)}
                                        title={music_title}
                                        cover={album_cover}
                                        desc={artist_bio}
                                    />
                            )
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


export default memo(InicioPage);