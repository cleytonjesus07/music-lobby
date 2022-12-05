module.exports = {
    playSong(audioRef, src, music) {
        if (!src) {
            return;
        }
        audioRef.current.play().then(() => {
            document.title = `Tocando: ${music?.Music?.music_title}`
        })
    },
    pauseSong(audioRef, src, music) {
        if (!src || audioRef.current.paused) {
            return;
        }

        audioRef.current.pause();
        document.title = `Pausado: ${music?.Music?.music_title}`
    },
    forward(setSongs) {
        setSongs(old => {
            return {
                ...old,
                index: (old.index < (old.items.length - 1)) ? old.index + 1 : 0
            }
        })
    },
    backward(setSongs) {
        setSongs(old => {
            return {
                ...old,
                index: (old.index <= 0) ? (old.items.length - 1) : old.index - 1
            }
        })
    }
}