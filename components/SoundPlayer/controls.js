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
    forward(setIndex, musicas,id) {
        
        setIndex(old => {
            
            if (old.refId >= (musicas - 1)) {
                
                return { id, refId: 0 };
            }
            console.log(old.refId)
            return { id, refId: (old.refId + 1) };

        })
    },
    backward(setIndex,musicas,id) {

        setIndex(old => {

            if (old.refId <= 0) {
                return { id, refId: (musicas - 1) };
            }

            return { id, refId: (old.refId - 1) };

        })
    }
}