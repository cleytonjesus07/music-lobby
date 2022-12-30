import { useRouter } from "next/router"
import { useState, memo } from "react";
import Section from "../../components/Section";
import supabase from "../../supabase";
import Card from "../../components/Card"
import Loading from "../../components/Loading";
import { useQuery } from "@tanstack/react-query";

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
        return data;
    }
    const { isLoading } = useQuery({
        queryKey: ['category', router.query.cat],
        queryFn: fetchMusicsByCategory,
        cacheTime: 8 * 60 * 1000,
        onSuccess: (data) => {
            data = data.filter((music) => (music.Category !== null))
            setMusics(data);
        }
    })
    if (isLoading) {
        return <Loading />
    }
    return (
        <Section title={router.query.cat} wrap={true} justifyCenter={true} >
            {musics.map(({ Music: { music_title, MusicsOnAlbums: [{ Album: { album_cover, Artist: { id_artist, artist_bio } } }] } }, i) => {
                return <Card key={i} title={music_title} cover={album_cover} desc={artist_bio} onClick={() => getArtistMusicsDetails(id_artist, setAlbum)} />
            })}
        </Section>
    )
}

export default memo(ShowAll);