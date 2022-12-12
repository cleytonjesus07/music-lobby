import { useContext, useEffect, useRef, useState } from "react"
import { BsFillPlayCircleFill, BsPauseCircleFill } from "react-icons/bs"
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io"
import { VscChromeClose } from "react-icons/vsc"
import { appCtx } from "../../Context/AppContext";
import { songCtx } from "../../Context/SongContext";
import { pauseSong, playSong, forward, backward } from "./controls";

export default function SoundPlayer() {
    const [isReady,setIsReady] = useState(false);
    const { scroll: { lockScroll } } = useContext(appCtx)
    const { currentMusic: {
        music
    },
        soundPlayer: { showPlayer, setShowPlayer },
        albumList: { album },

        playingMusic: { playingMusicId, setPlayingMusicId },
        isPlaying: { playing, setPlaying }
    } = useContext(songCtx);

    const audioRef = useRef();
    const timeBarRef = useRef();
    const [timestamps, setTimestamps] = useState({
        currentTime: {
            minutes: 0,
            seconds: 0
        },
        duration: {
            minutes: 0,
            seconds: 0
        }
    });

    let titleAba = document.title;

    useEffect(() => {
        audioRef.current.setAttribute("disabled", true)
    }, [])

    useEffect(() => {
        setIsReady(false);
        setPlayingMusicId({ ...playingMusicId, id: music?.MusicsOnAlbums[playingMusicId?.index].Music.id_music })
    }, [playingMusicId.index])


    useEffect(() => {
        switch (playing) {
            case true:
                document.title = `Tocando: ${music?.MusicsOnAlbums[playingMusicId.index]?.Music?.music_title}`
                break;
            case false:
                document.title = `Pausado: ${music?.MusicsOnAlbums[playingMusicId.index]?.Music?.music_title}`;
                break;
            default:
                document.title = titleAba;
                break;
        }

    }, [playing, playingMusicId])

    function setToInit() {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        timeBarRef.current.value = 0;

        if (playingMusicId.index >= (music?.MusicsOnAlbums?.length - 1)) {
            return setPlayingMusicId({ ...playingMusicId, index: 0 });
        } else {
            return setPlayingMusicId({ ...playingMusicId, index: (playingMusicId.index + 1) })
        }
    }

    function updateBar(e) {

        const { duration, currentTime } = e.target
        timeBarRef.current.value = (currentTime * (100 / duration));

        songTimeStamp(Math.floor(currentTime), Math.floor(duration));
        return;
    }

    function seekTo(e) {
        audioRef.current.currentTime = audioRef.current.duration * (e.target.value / 100);
    }

    function songTimeStamp(segundos) {
        const minutes = Math.floor(segundos / 60);
        let seconds = (segundos % 60);

        setTimestamps(old => {
            return {
                ...old,
                currentTime: {
                    minutes,
                    seconds,
                }
            }
        })

    }



    function close() {
        setPlayingMusicId({ id: null, index: null })
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setPlaying(false);
        setShowPlayer(false);
        setTimestamps(old => {
            return {
                ...old,
                currentTime: {
                    minutes: 0,
                    seconds: 0
                },
                duration: {
                    minutes: 0,
                    seconds: 0
                }
            }
        })
    }





    return (
        <div id="player" className={`fixed z-50 flex bottom-2 right-5 rounded-md w-80 h-32  bg-neutral-800 ${(showPlayer) ? 'show' : 'hide'} max-sm:top-0 max-sm:left-0 max-sm:w-full max-sm:h-screen max-sm:flex-col max-sm:items-center max-sm:py-10 `}>
            {/* Close Btn */}
            <button type={"button"} className="absolute right-3 top-2 cursor-pointer opacity-40 hover:opacity-100 transition-all p-1 max-sm:w-10" title="close" onClick={() => close()}><VscChromeClose className="w-full h-full" /></button>
            <div className="h-full w-1/3 mx-5 flex items-center justify-center max-sm:w-full ">
                <div className={`w-20 h-20 bg-white rounded-full relative flex items-center justify-center bg-center bg-cover bg-no-repeat ${playing ? 'spin' : ''} max-sm:w-[calc(100%/.6)] max-sm:h-[calc(100%/.6)] max-sm:max-w-[300px] max-sm:max-h-[300px]`} style={{ backgroundImage: `url(${music?.album_cover})` }}>
                    <span className="h-3 w-3 bg-neutral-800 absolute rounded-full max-sm:w-1/6 max-sm:h-1/6"></span>
                </div>
            </div>

            <div className="w-full flex flex-col justify-center  px-3">
                <h2 className="font-bold text-sm">{music?.MusicsOnAlbums[playingMusicId.index]?.Music?.music_title}</h2>
                <span className="font-extralight text-xs">{music?.Artist?.artist_name}</span>
                <div className={`relative w-full  max-sm:h-full rounded-md flex flex-col items-center max-sm:my-9 mt-4 h-5  `}>
                    <input id="range" type={"range"} min={0} max={100} ref={timeBarRef} onChange={seekTo} className={`rounded-md overflow-hidden w-full h-full max-sm:h-[2em] `} />
                    <div className="flex w-full justify-between">
                        <span className="text-xs">{(timestamps.currentTime?.minutes < 10) ? '0' + timestamps.currentTime?.minutes : timestamps.currentTime?.minutes} : {(timestamps.currentTime?.seconds < 10) ? '0' + timestamps.currentTime?.seconds : timestamps.currentTime?.seconds} </span>
                        <span className="text-xs">{timestamps.duration?.minutes < 10 ? '0' + timestamps.duration?.minutes : timestamps.duration?.minutes} : {timestamps.duration?.seconds < 10 ? '0' + timestamps.duration?.seconds : timestamps.duration?.seconds}</span>
                    </div>
                </div>
                {isReady ?
                    (
                        <div className="flex justify-center space-x-2 buttons">
                            {(music?.MusicsOnAlbums.length > 1) &&
                                (
                                    <div className="hover:cursor-pointer opacity-40 hover:opacity-100  transition-all" title={"backward"}>
                                        <IoMdSkipBackward className="button" onClick={() => backward(setPlayingMusicId, music.MusicsOnAlbums.length, music, playingMusicId)} />
                                    </div>
                                )}
                            {!playing
                                ?
                                (
                                    <div className="hover:cursor-pointer opacity-40 hover:opacity-100 transition-all" title={"play"}>
                                        <BsFillPlayCircleFill className="button" onClick={() => playSong(audioRef, audioRef.current.src, setPlaying)} />
                                    </div>

                                )
                                :
                                (
                                    <div className="hover:cursor-pointer opacity-40 hover:opacity-100 transition-all" title={"pause"}>
                                        <BsPauseCircleFill className="button" onClick={() => pauseSong(audioRef, audioRef.current.src, setPlaying)} />
                                    </div>
                                )}
                            {(music?.MusicsOnAlbums.length > 1) &&
                                (
                                    <div className="hover:cursor-pointer opacity-40 hover:opacity-100 transition-all" title={"forward"}>
                                        <IoMdSkipForward className="button" onClick={() => forward(setPlayingMusicId, music.MusicsOnAlbums.length, music, playingMusicId)} />
                                    </div>
                                )}
                        </div>
                    )
                :
                (
                    <span className="text-xs text-center">Um momento...</span>
                )
                }
            </div>
            <audio ref={audioRef}
                className="absolute hidden "
                src={music?.MusicsOnAlbums[playingMusicId.index]?.Music?.music_link}
                onLoadStart={() => timeBarRef.current.value = 0}
                onLoadedData={() => {
                    timeBarRef.current.removeAttribute("disabled");
                }}
                /* onPlaying={() => setPlaying(true)} */
                /* onPause={() => setPlaying(false)} */
                onTimeUpdate={(e) => updateBar(e)}
                onDurationChange={(e) => {
                    setTimestamps(old => {
                        const minutes = (Math.floor(e.target.duration / 60));
                        const seconds = (Math.floor(e.target?.duration % 60));
                        return {
                            ...old,
                            duration: {
                                minutes,
                                seconds
                            }
                        }
                    })
                }}
                onEnded={setToInit}
                onCanPlay={() => {
                    playSong(audioRef, audioRef.current.src, setPlaying)
                    setIsReady(true);
                }}
            ></audio>
        </div >
    )
}