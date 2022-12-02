import Head from 'next/head'
import SoundPlayer from '../SoundPlayer'

export default ({ children, title }) => {
    return (
        <>
            <Head>
                <title>Music Lobby - {title}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {children}
            <SoundPlayer />
        </>
    )
}