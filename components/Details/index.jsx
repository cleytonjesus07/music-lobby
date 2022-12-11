import Image from "next/image";
import { BsArrowDownCircleFill } from "react-icons/bs"
import { useContext, useEffect, useRef, useState } from "react";
import { songCtx } from "../../Context/SongContext";
import supabase from "../../supabase";

export default function MusicDetails() {
    const {
        albumList: { album: {
            Album: { album_cover, Artist: { id_artist, artist_name, artist_bio } },

        } },
        soundPlayer: {
            setShowPlayer
        },
        currentMusic: {
            setMusic
        },
        playingMusic: { playingMusicId, setPlayingMusicId },
        isPlaying: { playing, setPlaying }
    } = useContext(songCtx);



    const [list, setList] = useState([]);
    useEffect(() => {
        async function fetchMusics() {
            let { data } = await supabase
                .from("Artist")
                .select(`
                    *,
                    Album(*,MusicsOnAlbums(Music:id_music(*)))
                `).in("Album.id_artist", [id_artist])
            data = data.
                filter(({ Album }) => Album.length)
                .filter((arr) => setList(arr.Album[0]))
        }
        fetchMusics();
    }, [])

 



    async function getMusic(id_artist, id_music, i) {

        if (playingMusicId.id === id_music) {
            /* Bloquear quando faz a requisição para a mesma música */
            return;
        }

        setPlaying(false)

        const { data } = await supabase
            .from("Album")
            .select(`*,Artist(*),
        MusicsOnAlbums(Music(*))
`).eq('id_artist', id_artist)
        setMusic(data[0])
        setPlayingMusicId({ id: id_music, index: i });
        setShowPlayer(true)
    }

    return (
        <>
            <div>
                <section className="relative flex  items-center w-full h-96 bg-neutral-900 bg-top bg-cover bg-no-repeat" style={{ backgroundImage: `url(${album_cover})` }}>
                    <div className="flex flex-col justify-center space-y-5 bg-gradient-to-r from-black to-transparent h-full w-[100%] px-10 max-md:items-center">
                        <h2 className="font-bold text-5xl">{artist_name}</h2>
                        <div className="w-1/2 max-lg:w-full  bg-black
                    p-4 rounded-md bg-opacity-70 ">
                            {artist_bio}
                        </div>
                        <div className="absolute right-20 top-20 max-lg:hidden">
                            <div className="relative  w-80 h-80 rotate-12 shadow-md shadow-black ">
                                <Image src={album_cover} fill sizes="100%" alt={"Imagem da capa do álbum"} className="object-cover" />
                            </div>
                        </div>
                    </div>
                </section>
                <div className="bg-gradient-to-t from-black to-neutral-800 h-screen w-full">
                    <div className="w-full py-4  bg-black flex items-center">
                        <BsArrowDownCircleFill className="ml-12 w-5 h-5" />
                        <span className="font-semibold text-1xl ml-2 ">Musics/Soundtracks</span>
                    </div>
                    {list?.MusicsOnAlbums?.length
                        &&
                        (
                            <ul className="block p-10">
                                {list?.MusicsOnAlbums?.map(({ Music: { id_music, music_title } }, i) =>
                                (
                                    <li key={id_music} onClick={() => getMusic(list.id_artist, id_music, i)} className={`${((id_music === playingMusicId.id) && playing) ? "bg-white text-neutral-900 " : "bg-gradient-to-r from-neutral-900 to-neutral-600 scale-[.9]"} p-4 rounded-lg opacity-70 hover:opacity-100 transition-all cursor-pointer my-2 flex items-center `}>
                                        {((id_music === playingMusicId.id) && playing) && <Image src={"/audio/audiowave.gif"} width={20} height={20} className="mr-2" alt="gif" />}
                                        <span className={`font-bold mr-1  group-span ${((id_music === playingMusicId.id) && playing) && "bg-white text-neutral-900"}`}>{i + 1}</span> - {music_title}
                                    </li>
                                )
                                )}
                            </ul>
                        )
                    }
                </div>
            </div>
        </>
    )
}