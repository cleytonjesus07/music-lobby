import Layout from '../components/Layout'
import AppContext from '../Context/AppContext'
import SongContext from '../Context/SongContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AppContext>
      <SongContext>
        <Layout title={Component.title}>
          <Component {...pageProps} />
        </Layout>
      </SongContext>
    </AppContext>
  )
}

export default MyApp
