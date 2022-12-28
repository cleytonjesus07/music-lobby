import { memo } from "react"
import { useContext, useEffect, useRef, useState } from "react"
import { BsFillPlayCircleFill, BsPauseCircleFill } from "react-icons/bs"
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io"
import { VscChromeClose } from "react-icons/vsc"
import { appCtx } from "../../Context/AppContext";
import { songCtx } from "../../Context/SongContext";
import { pauseSong, playSong, forward, backward } from "./controls";

const ButtonsSoundplayerMemo = memo(ButtonsSoundplayer)
const CloseBtnMemo = memo(CloseBtn);

function CloseBtn({ handleClose }) {

    return (
        <div className="absolute right-3 top-2 space-x-4">
            <button type={"button"} className=" cursor-pointer opacity-40 transition-all p-1 max-sm:w-10  hover:opacity-100   rounded-full" title="close" onClick={() => handleClose()}><VscChromeClose className="w-full h-full" /></button>
        </div>
    )
}

function ButtonsSoundplayer({ music, playingMusicId, setPlayingMusicId, playing, audioRef, setPlaying }) {
    return (
        <div className="flex justify-center space-x-2 buttons">
            {(music.length > 1) &&
                (
                    <div className="hover:cursor-pointer opacity-40 hover:opacity-100  transition-all" title={"backward"}>
                        <IoMdSkipBackward
                            className="button"
                            onClick={() => {
                                backward(setPlayingMusicId, music.length)
                            }} />
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
            {(music.length > 1) &&
                (
                    <div className="hover:cursor-pointer opacity-40 hover:opacity-100 transition-all" title={"forward"}>
                        <IoMdSkipForward
                            className="button"
                            onClick={() => {
                                forward(setPlayingMusicId, music.length);
                            }} />
                    </div>
                )}
        </div>
    )
}


export default function SoundPlayer() {
    const containerSoundplayerRef = useRef();
    const [isReady, setIsReady] = useState(false);
    const { translate } = useContext(appCtx);
    const { currentMusic: {
        musicRef
    },
        soundPlayer: { showPlayer, setShowPlayer },
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

    useEffect(() => {
        audioRef.current.setAttribute("disabled", true);
    }, [])

    useEffect(() => {
        setIsReady(false);
        setPlaying(false)
        setPlayingMusicId({ ...playingMusicId, id: musicRef.current.music[playingMusicId.index]?.id });
    }, [playingMusicId.index])

    function setToInit() {
        setPlaying(false)
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        timeBarRef.current.value = 0;

        if (playingMusicId.index >= (musicRef.current?.music?.length - 1)) {
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
        if (!isReady && !playing) {
            timeBarRef.current.value = 0;
            return;
        }
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



    function handleClose() {
        setPlayingMusicId({ id: null, index: null })
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setPlaying(null);
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
        <div ref={containerSoundplayerRef} className={`fixed bottom-0 left-0 flex z-50 justify-center w-full py-3  bg-black ${(showPlayer) ? 'show' : 'hide'} max-sm:top-0 max-sm:left-0 max-sm:w-full max-sm:h-screen max-sm:flex-col max-sm:items-center max-sm:py-10 `}>
            {/* Close Btn */}
            <CloseBtnMemo handleClose={handleClose} />
            <div className="h-full w-auto mx-5 flex items-center justify-center max-sm:w-full ">
                <div className={`w-20 h-20 bg-white rounded-full relative flex items-center justify-center bg-center bg-cover bg-no-repeat ${playing ? 'spin' : ''} max-sm:w-[calc(100%/.6)] max-sm:h-[calc(100%/.6)] max-sm:max-w-[300px] max-sm:max-h-[300px]`} style={{ backgroundImage: `url(${musicRef.current?.cover})` }}>
                    <span className=" h-3 w-3 bg-black absolute rounded-full max-sm:w-[40px] max-sm:h-[40px]"></span>
                </div>
            </div>

            <div className="w-1/4 max-sm:w-full flex flex-col justify-center  px-3">
                <span className="font-bold text-sm w-[calc(100%-25px)]">{musicRef.current.music[playingMusicId.index]?.name}</span>
                <span className="font-extralight text-xs">{musicRef.current?.artist}</span>
                <div className={`relative w-full  max-sm:h-full rounded-md flex flex-col items-center max-sm:my-9 mt-4 h-5  `}>
                    <input id="range" type={"range"} min={0} max={100} ref={timeBarRef} onChange={seekTo} className={`rounded-md overflow-hidden w-full h-full max-sm:h-[2em] `} />
                    <div className="flex w-full justify-between">
                        <span className="text-xs">{(timestamps.currentTime?.minutes < 10) ? '0' + timestamps.currentTime?.minutes : timestamps.currentTime?.minutes} : {(timestamps.currentTime?.seconds < 10) ? '0' + timestamps.currentTime?.seconds : timestamps.currentTime?.seconds} </span>
                        <span className="text-xs">{timestamps.duration?.minutes < 10 ? '0' + timestamps.duration?.minutes : timestamps.duration?.minutes} : {timestamps.duration?.seconds < 10 ? '0' + timestamps.duration?.seconds : timestamps.duration?.seconds}</span>
                    </div>
                </div>
                {(isReady && musicRef.current) ?
                    (
                        <ButtonsSoundplayerMemo music={musicRef.current.music} playingMusicId={playingMusicId} setPlayingMusicId={setPlayingMusicId} playing={playing} audioRef={audioRef} setPlaying={setPlaying} />
                    )
                    :
                    (
                        <span className="text-xs text-center">{translate.soundPlayerScreen.wait}</span>
                    )
                }
            </div>
            <audio ref={audioRef}
                className="absolute hidden "
                src={musicRef.current.music[playingMusicId.index]?.google_drive}
                onLoadStart={() => timeBarRef.current.value = 0}
                onLoadedData={() => {
                    /* sss */
                    timeBarRef.current.removeAttribute("disabled");
                }}
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