import Layout from '../components/Layout'
import SongContext from '../Context/SongContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <SongContext>
      <Layout title={Component.title}>
        <Component {...pageProps} />
      </Layout>
    </SongContext>
  )
}

export default MyApp
