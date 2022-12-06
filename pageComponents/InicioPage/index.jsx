import Card from "../../components/Card"
import Section from "../../components/Section"
import supabase from "../../supabase"

export default function InicioPage({ recents, data, setAlbum, setSeeAlbum }) {
    return (
        <>
            <div className="bg-gradient-to-b from-black to-neutral-900">
                <Section key={"#recent"} title={"Adicionados recentemente"}>
                    {recents.map(({ Album: { album_cover, Artist: { id_artist, artist_bio } }, Music: { music_title } }, i) => {
                        return (

                            <Card  key={i}
                                onClick={() => {
                                    getArtistMusicsDetails(id_artist, setAlbum, setSeeAlbum)
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
                                            getArtistMusicsDetails(id_artist, setAlbum, setSeeAlbum)
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


async function getArtistMusicsDetails(id_artist, setAlbum, setSeeAlbum) {
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
        .then(() => setSeeAlbum(true));
}