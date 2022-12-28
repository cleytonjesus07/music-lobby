import Image from "next/image";
import Loading from "../../components/Loading";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { useContext, useEffect, useState, memo } from "react";
import { songCtx } from "../../Context/SongContext";
import { appCtx } from "../../Context/AppContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function MusicDetails() {
    const {
        albumList: { album: {
            Album: { album_cover, Artist: { id_artist, artist_name, artist_bio } },
        } },
        soundPlayer: {
            setShowPlayer
        },
        currentMusic: {
            musicRef
        },
        playingMusic: { playingMusicId, setPlayingMusicId },
        isPlaying: { playing, setPlaying }
    } = useContext(songCtx);
    const { translate } = useContext(appCtx);
    const [list, setList] = useState([]);
    const { isLoading, isError } = useQuery({
        queryKey: ['artist', id_artist], queryFn: async () => {
            if (!id_artist) {
                return;
            }
            const response = axios.post("/api/getAlbumByArtist", { id_artist })

            return response;
        }, cacheTime: 8 * 60 * 1000,
        refetchOnWindowFocus: false,
        onSuccess: ({ data }) => setList(data),
        onError: (error) => console.log({ error })
    })









    function getMusic(id_music, music, i) {
        if (playingMusicId.id === id_music) {
            /* Bloquear quando faz a requisição para a mesma música */
            return;
        }

        setPlaying(false)


        musicRef.current = {
            artist: list.data.artist_name,
            cover: list.data.Album[0].album_cover,
            music
        }
        setPlayingMusicId({ id: id_music, index: i });
        setShowPlayer(true)
    }

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <h2>Algo deu errado.</h2>
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
                        <span className="font-semibold text-1xl ml-2 ">{translate.details.title}</span>
                    </div>
                    {list.musics
                        ?
                        (
                            <ul className="block p-10">
                                {list.musics?.map(({ id, name }, i) => {
                                    return (
                                        <li key={id} onClick={() => getMusic(id, list.musics, i)} className={`${((id === playingMusicId.id) && playing) ? "bg-white text-neutral-900 " : "bg-gradient-to-r from-neutral-900 to-neutral-600 scale-[.9]"} p-4 rounded-lg opacity-70 hover:opacity-100 transition-all cursor-pointer my-2 flex items-center `}>
                                            {((id === playingMusicId.id) && playing) && <Image src={"/gif/audiowave.gif"} width={20} height={20} className="mr-2" alt="gif" />}
                                            <span className={`font-bold mr-1  group-span ${((id === playingMusicId.id) && playing) && "bg-white text-neutral-900"}`}>{i + 1}</span> - {name}
                                        </li>
                                    )
                                })}
                            </ul>
                        )
                        :
                        (
                            <Loading />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default memo(MusicDetails)