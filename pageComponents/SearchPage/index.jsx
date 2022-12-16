import { useContext, useEffect, useState, memo } from "react";
import Card from "../../components/Card";
import Section from "../../components/Section";
import { appCtx } from "../../Context/AppContext";
import supabase from "../../supabase";
import { useRouter } from "next/router"
import Loading from "../../components/Loading";

let cache = null;

function SearchPage({ getArtistMusicsDetails, setAlbum }) {
    const router = useRouter();
    const { search: { deferredValue }, translate } = useContext(appCtx)
    const [musics, setMusics] = useState([]);
    const [filteredMusics, setFilteredMusics] = useState();

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

        if (!cache) {
            fetchMusics();
        } else {
            setMusics(cache);
            setFilteredMusics(cache);
        }

    }, [])

    useEffect(() => {
        if (musics.length) {
            cache = musics;
        }
    }, [musics])

    if (!filteredMusics?.length && !musics?.length) {
        return <Loading />
    }
    if (!filteredMusics?.length) {
        return <div className="flex justify-center font-bold text-lg ">{translate.searchScreen.notFound}</div>
    }

    return (
        <Section title={translate.asideMenu.search} wrap={true} justifyCenter={true}>
            {filteredMusics.map(({ Music: { id_music, music_title }, Album: { album_cover, Artist: { id_artist, artist_bio } } }) => {
                return <Card key={id_music} cover={album_cover} desc={artist_bio} title={music_title} onClick={() => getArtistMusicsDetails(id_artist, setAlbum)} />
            })}
        </Section>
    )
}

export default memo(SearchPage);