import { useContext, useEffect, useState } from "react";
import Card from "../../components/Card";
import Section from "../../components/Section";
import { appCtx } from "../../Context/AppContext";
import supabase from "../../supabase";

export default function SearchPage({ getArtistMusicsDetails, setAlbum }) {
    const { search: { search } } = useContext(appCtx)
    const [musics, setMusics] = useState([]);
    const [filteredMusics, setFilteredMusics] = useState(musics);

    useEffect(() => {
        console.log(musics)
        if (!search.length) {
            setFilteredMusics(musics)
        } else {
            setFilteredMusics(musics.filter((music) => {
                return music.Music?.music_title?.toLowerCase().includes(search.toLowerCase());
            }))
        }
    }, [search])
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
        fetchMusics();
    }, [])


    useEffect(() => {
        console.log(musics)
    }, [musics])


    if (!filteredMusics.length && !musics.length) {
        return (
            <span>
                Carregando...
            </span>
        )
    }

    if(!filteredMusics.length){
        return <span>
            Nenhuma música encontrada. {':('}
        </span>
    }
    return (
        <Section title={"Pesquisar"} wrap={"flex-wrap"}>
            {filteredMusics.map(({ Music: { id_music, music_title }, Album: { album_cover, Artist: { id_artist, artist_bio } } }) => {
                return <Card key={id_music} cover={album_cover} desc={artist_bio} title={music_title} onClick={() => getArtistMusicsDetails(id_artist, setAlbum)} />
            })}
        </Section>
    )
}