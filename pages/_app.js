import { Suspense, lazy } from "react"
import AppContext from '../Context/AppContext'
const Layout = lazy(() => import('../components/Layout'))
import SongContext from '../Context/SongContext'
import '../styles/globals.css'
import Loading from "../components/Loading"
function MyApp({ Component, pageProps }) {
  return (
    <Suspense fallback={<Loading />}>
      <AppContext>
        <SongContext>
          <Layout title={Component.title}>
            <Component {...pageProps} />
          </Layout>
        </SongContext>
      </AppContext>
    </Suspense>
  )
}

export default MyApp
