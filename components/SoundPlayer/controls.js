module.exports = {
    playSong(audioRef, src) {
        if (!src) {
            return;
        }
        audioRef.current.play()
    },
    pauseSong(audioRef, src) {
        if (!src || audioRef.current.paused) {
            return;
        }
        audioRef.current.pause();
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