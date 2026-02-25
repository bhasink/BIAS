import '../../styles/globals.css'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { RemoveScrollBar } from 'react-remove-scroll-bar'
import shortid from "shortid";

function Loading() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [img, setImg] = useState(null)

  useEffect(() => {
    setImg('sws_anime.gif?v=1')
    const handleStart = (url) => url !== router.asPath && setLoading(true)
    const handleComplete = (url) =>
      url === router.asPath &&
      setTimeout(() => {
        setLoading(false)
        setImg(null)
      }, 1000)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  const getRandomKey = () => {
    return shortid.generate();
  }

  return (
    loading && (
      <>
        <RemoveScrollBar />
        <div className="spinner-wrapper">
          <div className="sub-lg">
            <div className="lgo">
              <img
                src={
                  `${process.env.NEXT_PUBLIC_B_API}`+ img
                }
                className="navbar-brand-img blg"
                alt="logo"
                style={{'display':'block'}}
              />
              <span></span>
            </div>
          </div>
        </div>
      </>
    )
  )
}

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  
  useEffect(() =>{
    setTimeout(() => setLoading(true), 1000);
   })

  return (
    <>

<Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
        <meta name="google-site-verification" content="LBCBAXhyCpyhKJBaIJcpwox1qd_HbXb1KuVc4yve4-Y" />
        <title>BIAS - Best Production Studio in India</title>
        <link href="https://api.swstudios.in//images/favicon_sw.png" rel="shortcut icon" type="image/x-icon" />
       
        </Head>  


     {!loading ? (
<>
 <div className="spinner-wrapper">
          <div className="sub-lg">
            <div className="lgo">
              <img
                src={
                  `${process.env.NEXT_PUBLIC_B_API}sws_anime.gif?v=1`
                }
                className="navbar-brand-img blg"
                alt="logo"
                style={{'display':'block'}}
              />
              <span></span>
            </div>
          </div>
        </div>
</>
) : (
 <>
 <Loading />
  <Component {...pageProps} />
 </>
)}
     
    </>
  )
}

export default MyApp
