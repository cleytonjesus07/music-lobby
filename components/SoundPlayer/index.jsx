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
        albumList: { album },
        currentMusic: {
            Music
        },
        choice: { setIdMusic },
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

        /*  if (items.length <= 1) {
             return;
         } */
        setToInit()
    }, [music])

    useEffect(() => {
        if (!playing) return;
        document.title = titleAba;
    }, [playing])

    function setToInit() {
        setPlaying(false);
        audioRef.current.currentTime = 0;
        timeBarRef.current.style.width = "0px";
        audioRef.current.pause();
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
            setIdMusic(null)
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
        return <button type={"button"} className="absolute right-3 top-2 cursor-pointer opacity-40 hover:opacity-100 transition-all p-1 max-sm:w-10" title="close" onClick={() => close()}><VscChromeClose className="w-full h-full" /></button>
    }


    return (
        <div id="player" className={`fixed flex bottom-2 right-5 rounded-md w-80 h-32  bg-neutral-800 ${showPlayer ? 'show' : 'hide'} max-sm:top-0 max-sm:left-0 max-sm:w-full max-sm:h-screen max-sm:flex-col max-sm:items-center max-sm:py-10 `}>
            <CloseSoundPlayer />
            <div className="h-full w-1/3 mx-5 flex items-center justify-center max-sm:w-full ">
                <div className={`w-20 h-20 bg-white rounded-full relative flex items-center justify-center bg-center bg-cover bg-no-repeat ${playing ? 'spin' : ''} max-sm:w-[calc(100%/.9)] max-sm:h-[calc(100%/.9)] max-sm:max-w-[300px] max-sm:max-h-[300px]`} style={{ backgroundImage: `url(${music?.Album?.album_cover})` }}>
                    <span className="h-3 w-3 bg-neutral-800 absolute rounded-full max-sm:w-1/6 max-sm:h-1/6"></span>
                </div>
            </div>
            
            <div className="w-full flex flex-col justify-center space-y-1 px-3">
                <h2 className="font-bold">{music?.Music?.music_title}</h2>
                <span className="font-extralight text-xs">{music?.Album?.Artist?.artist_name}</span>
                <div className={`relative w-full h-[2px] max-sm:h-1 bg-neutral-600 rounded-md flex items-center `}>
                    <div ref={timeBarRef} className={`h-full  bg-white rounded-tl-md rounded-bl-md`}>
                    </div>
                    <span className="w-2 h-2 relative -left-1  rounded-full bg-white"></span>
                </div>
                <div className="text-center">
                    <span className="text-[10px] max-sm:text-base">{(timestamps.currentTime?.minutes < 10) ? '0' + timestamps.currentTime?.minutes : timestamps.currentTime?.minutes} : {(timestamps.currentTime?.seconds < 10) ? '0' + timestamps.currentTime?.seconds : timestamps.currentTime?.seconds} / {`${timestamps.duration?.minutes < 10 ? '0' + timestamps.duration?.minutes : timestamps.duration?.minutes} : ${timestamps.duration?.seconds < 10 ? '0' + timestamps.duration?.seconds : timestamps.duration?.seconds}`}</span>
                </div>
                <div className="flex justify-center space-x-2 buttons">
                    <div className="hover:cursor-pointer opacity-40 hover:opacity-100  transition-all" title={"backward"}>
                        <IoMdSkipBackward className="button" onClick={() => backward(setSongs, setPlaying)} />
                    </div>
                    {!playing
                        ?
                        (
                            <div className="hover:cursor-pointer opacity-40 hover:opacity-100 transition-all" title={"play"}>
                                <BsFillPlayCircleFill className="button" onClick={() => playSong(audioRef, audioRef.current.src, music)} />
                            </div>

                        )
                        :
                        (
                            <div className="hover:cursor-pointer opacity-40 hover:opacity-100 transition-all" title={"pause"}>
                                <BsPauseCircleFill className="button" onClick={() => pauseSong(audioRef, audioRef.current.src, music)} />
                            </div>
                        )}
                    <div className="hover:cursor-pointer opacity-40 hover:opacity-100 transition-all" title={"forward"}>
                        <IoMdSkipForward className="button" onClick={() => forward(setSongs, setPlaying)} />
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
            ></audio>
        </div>
    )
}