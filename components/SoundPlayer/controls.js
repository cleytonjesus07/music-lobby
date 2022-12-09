module.exports = {
    playSong(audioRef, src,setPlaying) {
        if (!src) {
            return;
        }

        audioRef.current.play().then(() => {
            
            setPlaying(true)
        })
    },
    pauseSong(audioRef, src,setPlaying) {
        if (!src || audioRef.current.paused) {
            return;
        }
        setPlaying(false)
        audioRef.current.pause();
       
        
    },
    forward(setIndex, musicas) {
        setIndex(old => {

            if (old >= (musicas - 1)) {
                return 0;
            }

            return (old + 1);

        })
    },
    backward(setIndex, musicas) {
        
        setIndex(old => {
           
            if (old <= 0) {
                return (musicas - 1);
            }

            return (old - 1);

        })
    }
}