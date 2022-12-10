module.exports = {
    playSong(audioRef, src, setPlaying) {
        if (!src) {
            return;
        }

        audioRef.current.play().then(() => {
            setPlaying(true)
        })
    },
    pauseSong(audioRef, src, setPlaying) {
        if (!src || audioRef.current.paused) {
            return;
        }
        setPlaying(false)
        audioRef.current.pause();


    },
    forward(setIndex, musicas) {
        setIndex(old => {

            if (old.refId >= (musicas - 1)) {
                return { ...old, refId: 0 };
            }

            return { ...old, refId: old + 1 };

        })
    },
    backward(setIndex, musicas) {

        setIndex(old => {

            if (old.refId <= 0) {
                return { ...old, refId: 0 };
            }

            return { ...old, refId: old - 1 };

        })
    }
}