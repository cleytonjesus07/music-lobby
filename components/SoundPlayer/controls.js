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
        if (audioRef.current.play() != undefined) {
            audioRef.current.pause();
        }


    },
    forward(setPlayingMusicId, musicas) {
        setPlayingMusicId(old => {

            if (old.index >= (musicas - 1)) {

                return { ...old, index: 0 };
            }
            return { ...old, index: (old.index + 1) };

        })
    },
    backward(setPlayingMusicId, musicas) {
        setPlayingMusicId(old => {

            if (old.index <= 0) {
                return { ...old, index: (musicas - 1) };
            }

            return { ...old, index: (old.index - 1) };

        })
    }
}