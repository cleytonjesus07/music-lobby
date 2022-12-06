import Image from "next/image";
import { BsArrowDownCircleFill } from "react-icons/bs"
import { useContext, useEffect, useState } from "react";
import { songCtx } from "../../Context/SongContext";
import supabase from "../../supabase";

export default function MusicDetails() {
    const { songsCtx: { setSongs },
        albumList: { album: {
            Album: { album_cover, album_title, Artist: { id_artist, artist_name, artist_bio } },

        } },
        soundPlayer: {
            setShowPlayer
        },
        currentMusic: {
            music: {
                Album,
                Music
            }
            ,
            setMusic
        },
        choice: { idMusic, setIdMusic },
        isPlaying: { playing }
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
                .filter((arr) => setList(arr.Album[0].MusicsOnAlbums))
        }
        fetchMusics();
    }, [])




    async function getMusic(id_music) {

        if (id_music === idMusic) {
            return;
        }
        /* await supabase
            .from("Music")
            .select(`*,
            Album:id_album(album_cover,Artist:id_artist(id_artist,artist_name,artist_bio))
 
            `)
            .in("id_music", [id_music]) */
        await supabase
            .from("MusicsOnAlbums")
            .select(`
                Music:id_music(*),
                Album:id_album(*,Artist:id_artist(artist_name))
        `).in("Music.id_music", [id_music])
            .then(({ data }) => {
                const choiceMusic = data.filter(({ Music }) => Music !== null)[0];
                setMusic(choiceMusic)
                setIdMusic(id_music);
            })
            .then(setShowPlayer(true))
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
                    {list.length
                        &&
                        (
                            <ul className="block p-10">
                                {list.map(({ Music: { id_music, music_title } }, i) =>
                                (
                                    <>
                                        <li key={id_music} onClick={() => getMusic(id_music)} className={`${(idMusic === id_music && playing) ? "bg-white text-neutral-900" : "bg-gradient-to-r from-neutral-900 to-neutral-600"} p-4 rounded-lg opacity-70 hover:opacity-100 transition-all cursor-pointer my-2 flex items-center`}>
                                            {(idMusic === id_music && playing) && <Image src={"/audio/audiowave.gif"} width={20} height={20} className="mr-2" />}
                                            <span className={`font-bold mr-1 group-span ${(idMusic === id_music && playing) && "bg-white text-neutral-900"}`}>{i + 1}</span> - {music_title}
                                        </li>
                                    </>
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