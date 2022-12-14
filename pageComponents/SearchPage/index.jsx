import { useContext, useEffect, useState } from "react";
import Card from "../../components/Card";
import Section from "../../components/Section";
import { appCtx } from "../../Context/AppContext";
import supabase from "../../supabase";
import { useRouter } from "next/router"
export default function SearchPage({ getArtistMusicsDetails, setAlbum }) {
    const router = useRouter();
    const { search: { deferredValue } } = useContext(appCtx)
    const [musics, setMusics] = useState([]);
    const [filteredMusics, setFilteredMusics] = useState(musics);

    useEffect(() => {
        router.push("/", `/search?q=${deferredValue}`, { shallow: false })
        if (!deferredValue.length) {
            router.push("/", "/search", { shallow: false })
            setFilteredMusics(musics)
        } else {
            setFilteredMusics(musics.filter((music) => {
                return music.Music?.music_title?.toLowerCase().includes(deferredValue.toLowerCase());
            }))
        }
    }, [deferredValue])
    useEffect(() => {
        router.push("/", "/search", { shallow: false })
        async function fetchMusics() {
            const { data } = await supabase
                .from("MusicsOnAlbums")
                .select(`
                Music:id_music(*),
                Album:id_album(*,Artist:id_artist(id_artist,artist_name,artist_bio))
        `)
            setMusics(data);
            setFilteredMusics(data)
        }
        fetchMusics();
    }, [])

    if (!filteredMusics.length && !musics.length) {
        return (
            <span>
                Carregando...
            </span>
        )
    }

    if (!filteredMusics.length) {
        return <span>
            Nenhuma música encontrada. {':('}
        </span>
    }
    return (
        <Section title={"Pesquisar"} wrap={true} justifyCenter={true}>
            {filteredMusics.map(({ Music: { id_music, music_title }, Album: { album_cover, Artist: { id_artist, artist_bio } } }) => {
                return <Card key={id_music} cover={album_cover} desc={artist_bio} title={music_title} onClick={() => getArtistMusicsDetails(id_artist, setAlbum)} />
            })}
        </Section>
    )
}