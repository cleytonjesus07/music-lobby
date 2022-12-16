import { useRouter } from "next/router"
import { useEffect, useState, memo } from "react";
import Section from "../../components/Section";
import supabase from "../../supabase";
import Card from "../../components/Card"
import Loading from "../../components/Loading";

let cache = {}

function ShowAll({ getArtistMusicsDetails, setAlbum }) {
    const router = useRouter();
    const [musics, setMusics] = useState([]);
    async function fetchMusicsByCategory() {
        let { data } = await supabase
            .from("CategoriesOnMusics")
            .select(`
        Category(category_title),
        Music(music_title,MusicsOnAlbums(Album(album_cover,Artist(id_artist,artist_bio))))  
    `).eq("Category.category_title", router.query.cat)
        data = data.filter((music) => (music.Category !== null))
        setMusics(data);
    }

    useEffect(() => {
        if (musics.length) {
            if (Object.keys(cache).indexOf(router.query.cat) == -1) {
                cache[router.query.cat] = musics;
            }
        }

    }, [musics])

    useEffect(() => {
        /* if (Object.keys(cache).length > 0) {
            if (cache[`${router.query.cat}`]?.length > 0) {
                console.log("caching...")
                setMusics(cache[router.query.cat]);
            }

        } */

        return () => {
            setMusics(old => old.length = 0)
        }
    }, [])

    useEffect(() => {
        if (router.query.cat) {
            if (Object.keys(cache).indexOf(router.query.cat) == -1) {
                fetchMusicsByCategory();
            } else {
                setMusics(cache[router.query.cat])
            }
        }

    }, [router.query])

    return (
        <Section title={router.query.cat} wrap={true} >
            {(!musics.length)
                ?
                (
                    <Loading />
                )
                :
                (
                    musics.map(({ Music: { music_title, MusicsOnAlbums: [{ Album: { album_cover, Artist: { id_artist, artist_bio } } }] } }, i) => {
                        return <Card key={i} title={music_title} cover={album_cover} desc={artist_bio} onClick={() => getArtistMusicsDetails(id_artist, setAlbum)} />
                    })
                )
            }
        </Section>
    )
}

export default memo(ShowAll);