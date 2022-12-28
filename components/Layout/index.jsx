import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { songCtx } from '../../Context/SongContext'
import SoundPlayer from '../SoundPlayer'

export default function Layout({ children, title }) {
    const [pageTitle, setPageTitle] = useState(`Music Lobby - ${title}`);

    const { currentMusic: { musicRef }, playingMusic: { playingMusicId }, soundPlayer: { showPlayer }, isPlaying: { playing } } = useContext(songCtx);

    useEffect(() => {

        /*  switch (playing) {
          case true:
              pageTitleRef.current = `Tocando: ${music?.Musics[playingMusicId.index]?.Music?.music_title}`;
              break;
          case false:
              pageTitleRef.current = `Pausado: ${music?.Musics[playingMusicId.index]?.Music?.music_title}`;
              break;
          default:
              pageTitleRef.current = `Music Lobby - ${title}`;
              break;
      } */
    }, [])

    


    useEffect(() => {
        if (!showPlayer) {
            setPageTitle(`Music Lobby - ${title}`);
        } else {
            setPageTitle(`${playing ? 'Tocando: ' : 'Pausado: '}${musicRef.current.music[playingMusicId?.index]?.name}`)
        }
    }, [showPlayer, playing])

    return (
        <>
            <Head>
                <meta charSet='utf-8' />
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <title>{pageTitle}</title>

            </Head>
            {children}
            {showPlayer && <SoundPlayer />}
        </>
    )
}