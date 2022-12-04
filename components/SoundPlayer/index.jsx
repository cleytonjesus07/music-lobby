import { useContext, useEffect, useRef, useState } from "react"
import { BsFillPlayCircleFill, BsPauseCircleFill } from "react-icons/bs"
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io"
import { VscChromeClose } from "react-icons/vsc"
import { songCtx } from "../../Context/SongContext";
import { pauseSong, playSong, forward, backward } from "./controls";

export default function SoundPlayer() {
    const { currentMusic: {
        music
    },
        soundPlayer: { showPlayer, setShowPlayer },
        albumList: { album } } = useContext(songCtx);

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

    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        if (!audioRef.current.src && !audioRef.current) {
            return;
        }
    }, [])

    useEffect(() => {

        /*  if (items.length <= 1) {
             return;
         } */
        setToInit()
    }, [music])

    function setToInit() {
        setPlaying(false);
        audioRef.current.currentTime = 0;
        timeBarRef.current.style.width = "0%";
        audioRef.current.pause();

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

    function updateBar(e) {
        const { duration, currentTime } = e.target
        timeBarRef.current.style.width = `${((currentTime / duration) * 100)}%`;
        songTimeStamp(Math.floor(currentTime), Math.floor(duration));
        return;
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



    function CloseSoundPlayer() {
        const close = () => {
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
        return <button type={"button"} className="absolute right-3 top-2 cursor-pointer opacity-40 hover:opacity-100 transition-all p-1 " title="close" onClick={() => close()}><VscChromeClose className="w-full h-full" /></button>
    }


    return (
        <div id="player" className={`fixed flex bottom-2 right-5 rounded-md w-80 h-32 bg-neutral-800 ${showPlayer ? 'show' : 'hide'}`}>
            <CloseSoundPlayer />
            <div className="h-full w-1/3 mx-5 flex items-center justify-center">
                <div className={`w-20 h-20 bg-white rounded-full relative flex items-center justify-center bg-center bg-cover bg-no-repeat ${playing ? 'spin' : ''}`} style={{ backgroundImage: `url(${music?.Album?.album_cover})` }}>
                    <span className="h-5 w-5 bg-neutral-800 absolute rounded-full"></span>
                </div>
            </div>
            <div className="w-full flex flex-col justify-center space-y-1 px-3">
                <h2 className="font-bold">{music?.Music?.music_title}</h2>
                <span className="font-extralight text-xs">{music?.Album?.Artist?.artist_name}</span>
                <div className="relative w-full h-[2px] bg-neutral-600 rounded-md flex items-center ">
                    <div ref={timeBarRef} className={`h-full  bg-white`}>
                    </div>
                    <span className="w-2 h-2 rounded-full  bg-white"></span>
                </div>
                <div className="text-center">
                    <span className="text-[10px]">{(timestamps.currentTime?.minutes < 10) ? '0' + timestamps.currentTime?.minutes : timestamps.currentTime?.minutes} : {(timestamps.currentTime?.seconds < 10) ? '0' + timestamps.currentTime?.seconds : timestamps.currentTime?.seconds} / {`${timestamps.duration?.minutes < 10 ? '0' + timestamps.duration?.minutes : timestamps.duration?.minutes} : ${timestamps.duration?.seconds < 10 ? '0' + timestamps.duration?.seconds : timestamps.duration?.seconds}`}</span>
                </div>
                <div className="flex justify-center space-x-2">
                    <div className="hover:cursor-pointer opacity-40 hover:opacity-100 transition-all" title={"backward"}>
                        <IoMdSkipBackward onClick={() => backward(setSongs, setPlaying)} />
                    </div>
                    {!playing
                        ?
                        (
                            <div className="hover:cursor-pointer opacity-40 hover:opacity-100 transition-all" title={"play"}>
                                <BsFillPlayCircleFill onClick={() => playSong(audioRef, audioRef.current.src)} />
                            </div>

                        )
                        :
                        (
                            <div className="hover:cursor-pointer opacity-40 hover:opacity-100 transition-all" title={"pause"}>
                                <BsPauseCircleFill onClick={() => pauseSong(audioRef, audioRef.current.src)} />
                            </div>
                        )}
                    <div className="hover:cursor-pointer opacity-40 hover:opacity-100 transition-all" title={"forward"}>
                        <IoMdSkipForward onClick={() => forward(setSongs, setPlaying)} />
                    </div>
                </div>
            </div>
            <audio ref={audioRef}
                className="absolute hidden "
                src={music?.Music?.music_link}
                controls
                onPlaying={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onTimeUpdate={(e) => updateBar(e)}
                onLoadedData={(e) => {
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
            ></audio>
        </div>
    )
}