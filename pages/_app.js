import { Suspense, lazy } from "react"
import AppContext from '../Context/AppContext'
const Layout = lazy(() => import('../components/Layout'))
import SongContext from '../Context/SongContext'
import '../styles/globals.css'
import Loading from "../components/Loading"
import ReactQuery from "../utils/rquery"
function MyApp({ Component, pageProps }) {
  return (
    <Suspense fallback={<Loading />}>
      <ReactQuery pageProps={pageProps}>
        <AppContext>
          <SongContext>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SongContext>
        </AppContext>
      </ReactQuery>
    </Suspense>
  )
}

export default MyApp
