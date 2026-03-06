import '../../styles/globals.css'
import { useState, useEffect, useRef } from 'react'
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
    setImg('/images/BIAS_Loading-animation_2.gif?v=1')
    const handleStart = (url) => url !== router.asPath && setLoading(true)
    const handleComplete = (url) =>
      url === router.asPath &&
      setTimeout(() => {
        setLoading(false)
        setImg(null)
      }, 2500)

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
                   img
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
  const timerRef = useRef(null);
  const imgRef = useRef(null);

  const startLoaderTimer = () => {
    const GIF_DURATION = 2500; // match your gif length

    if (timerRef.current) return;

    timerRef.current = setTimeout(() => {
      setLoading(true);
    }, GIF_DURATION);
  };

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      startLoaderTimer();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <>

<Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
        <meta name="google-site-verification" content="LBCBAXhyCpyhKJBaIJcpwox1qd_HbXb1KuVc4yve4-Y" />
        <title>BIAS - Best Production Studio in India</title>
        <link href="/images/BIAS_Feviconq.png" rel="shortcut icon" type="image/x-icon" />
       
        </Head>  


     {!loading ? (
<>
 <div className="spinner-wrapper">
          <div className="sub-lg">
            <div className="lgo">
              <img
                ref={imgRef}
                src="/images/BIAS_Loading-animation_2.gif?v=1"
                className="navbar-brand-img blg"
                alt="logo"
                style={{ display: 'block' }}
                onLoad={startLoaderTimer}
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
