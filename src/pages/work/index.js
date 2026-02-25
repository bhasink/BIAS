import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../../../components/header/header'
import Footer2 from '../../../components/footer/footer2'
import HoverVideoPlayer from 'react-hover-video-player'
import { useRouter } from 'next/router'
import axios from 'axios'
import Head from 'next/head'
import ContentLoader from 'react-content-loader'
import YouTube from 'react-youtube'

const Work = () => {
  const [productionData, setProductionData] = useState([])
  const [courseMode, setCourseMode] = useState('production')
  const [filterCoursesLastPage, setFilterCoursesLastPage] = useState(false)
  const [loader, setLoader] = useState(false)
  const [loaderN, setLoaderN] = useState(false)
  const [currentPageFilter, setCurrentPageFilter] = useState(1)
  const [total, setTotal] = useState(1)
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      const _id = router.query._id
      const data = localStorage.getItem('mode');

      if(data == '' || data == undefined){
        listing()
      }else{
        filtersLoadMore(data)
      }
      //   console.log(router.query)
    }
  }, [router.isReady])


//   useEffect(() => {
//     router.beforePopState(({ as }) => {
//       const data = localStorage.getItem();
//       console.log('dfdf')
//       console.log(data)

//       filtersLoadMore(data)
//         return true;
//     });

//     return () => {
//         router.beforePopState(() => true);
//     };
// }, [router]); 

// useEffect(() => {
//   window.onpopstate = () => {
//     const data = localStorage.getItem('mode');
//       console.log('dfdf')
//       console.log(data)

//       filtersLoadMore(data)
//   }  
// })

  

  const listing = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/listing`)

      const get_production_data = data.data.get_production_data.data
      setProductionData(get_production_data)
      setTotal(data.data.get_production_data.total)
      setCurrentPageFilter(2)

      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  const filtersLoadMore = async (data) => {
    let type
    setFilterCoursesLastPage(false)
    setCurrentPageFilter(2)
    setLoaderN(true)

    if (data == 'production') {
      type = 'production'
      setCourseMode('production')
      localStorage.setItem('mode', 'production');
    } else if (data == 'short-video') {
      type = 'short-video'
      setCourseMode('short-video')
      localStorage.setItem('mode', 'short-video');
    } else if (data == 'animation') {
      type = 'animation'
      setCourseMode('animation')
      localStorage.setItem('mode', 'animation');
    } else if (data == 'photoshoot') {
      type = 'photoshoot'
      setCourseMode('photoshoot')
      localStorage.setItem('mode', 'photoshoot');
    }else if (data == 'reels') {
      type = 'reels'
      setCourseMode('reels')
      localStorage.setItem('mode', 'reels');
    } else {
      type = ''
      setCourseMode('')
      localStorage.setItem('mode', '');
    }

    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      }

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/filter-data`,
        {
          type: type,
        },
        config,
      )

      const get_work = data.data.get_work.data
      setProductionData(get_work)
      setTotal(data.data.get_work.total)

      setLoaderN(false)

      console.log(data)
    } catch (err) {
      console.log(err)
      setLoaderN(false)
    }
  }
  

  const filtersLoadMoreData = async (data) => {
    setCurrentPageFilter(currentPageFilter+1)
    setLoader(true)

    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      }

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/filter-data?page=${currentPageFilter}`,
        {
          type: courseMode,
        },
        config,
      )

      const get_work = data.data.get_work.data
      const get_work_last_page = data.data.get_work.last_page

      setProductionData((oldArray) => [...oldArray, ...get_work])

      if (get_work_last_page == currentPageFilter) {
        setFilterCoursesLastPage(true)
      }

      setLoader(false)

      console.log(data)
    } catch (err) {
      console.log(err)
      setLoader(false)
    }
  }

  const opts = {
    height: '460',
    width: '315',
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
    },
  }

  return (
    <>
      <Header />
      <Head>
        <link rel="stylesheet" type="text/css" href="/themeblackstyle.css" />
      </Head>

      <section className="workshopareas">
        <div className="container">
          <div className="tabnormcta">
            <button
              onClick={() => filtersLoadMore('production')}
              className={
                courseMode == 'production'
                  ? 'btn-group btn-group-toggle active'
                  : 'btn-group btn-group-toggle'
              }
            >
              Production
            </button>
            <button
              onClick={() => filtersLoadMore('animation')}
              className={
                courseMode == 'animation'
                  ? 'btn-group btn-group-toggle active'
                  : 'btn-group btn-group-toggle'
              }
            >
              Animation
            </button>
            <button
              onClick={() => filtersLoadMore('photoshoot')}
              className={
                courseMode == 'photoshoot'
                  ? 'btn-group btn-group-toggle active'
                  : 'btn-group btn-group-toggle'
              }
            >
              Photoshoot
            </button>

            { <button
              onClick={() => filtersLoadMore('reels')}
              className={
                courseMode == 'reels'
                  ? 'btn-group btn-group-toggle active'
                  : 'btn-group btn-group-toggle'
              }
            >
              Reels
            </button> }
          </div>

          <div
            className={
              courseMode == 'photoshoot'
                ? 
                'courseallpnsd vdo-sects picshots'
                : 
                courseMode == 'reels' 
                ?
                 'courseallpnsd vdo-sects reelshots' 
                :'courseallpnsd vdo-sects'
                
            } 
          >
            <div className="row">
            
            {loaderN ? (
              
              <ContentLoader     viewBox="0 0 700 250">
                
              <rect x="12" y="" rx="2" ry="2" width="211" height="211" />
              <rect x="240" y="0" rx="2" ry="2" width="211" height="211" />
              <rect x="467" y="0" rx="2" ry="2" width="211" height="211" />
              <rect x="12" y="283" rx="2" ry="2" width="211" height="211" />
              <rect x="240" y="281" rx="2" ry="2" width="211" height="211" />
              <rect x="468" y="279" rx="2" ry="2" width="211" height="211" />     
                             </ContentLoader>
                  ) : (
           
                    <>

              {productionData &&
                productionData.map((production, key) => (
                 
<div key={key} className='col-md-4 aa fadeq' id={'hover-target-app'+key}>
                    <div className='laysets'>
                      <div className='photolyers vdopls'>
                      <Link href={`work/${production.slug}`}>

            {production.file_type == 'photoshoot' && (           
                 
                    <img
                      src={
                        `${process.env.NEXT_PUBLIC_B_API}work/images/thumbnail/` +
                        production.thumbnail
                      }
                      className="img-fluid"
                    />

                    )} 


{production.file_type == 'reels' && (           
                 
                 <YouTube videoId={production.original_video} opts={opts}  />

                 )} 


{production.file_type == 'animation' || production.file_type == 'production' ? (           
              
<HoverVideoPlayer
           videoSrc={
            `${process.env.NEXT_PUBLIC_B_API}work/videos/short-video/` +
            production.short_video
          }   
          hoverTarget={() => document.getElementById("hover-target-app"+key)}               
          loadingStateTimeout={1000}
                    pausedOverlay={
                      <img
                        src={
                            `${process.env.NEXT_PUBLIC_B_API}work/images/thumbnail/` +
                            production.thumbnail
                          }          
                          // className="img-fluid"
                          style={{
                          // width: '100%',
                          // height: '100%',
                          // objectFit: 'cover',
                        }}
                      />
                    }
                    loadingOverlay={
                      <div className="loading-overlay">Loading</div>
                    }
                    restartOnPaused
                    preload="none"
                  />

): ""}

</Link>

                    </div>
                    <h5>{production.name}</h5>
                    <p>{production.short_desc}</p>

                    {production.file_type != 'reels' && (           
                 
                
                 <Link href={`work/${production.slug}`}>Read More</Link>
                 )} 


                   


                    </div>
                  </div>
                ))}
</>
                  )}
                  


            </div>
          </div>

       

          {total > 6 && (
            <div className="text-center pt-4">
              {filterCoursesLastPage ? (
                <p> {/*Yay! you have seen all */}</p>
              ) : (
                <>
                  {loader ? (
                    <p> Loading...</p>
                  ) : (
                    <a onClick={filtersLoadMoreData} className="orangectathms">
                      View more
                    </a>
                  )}
                </>
              )}
            </div>
          )}

          {total <= 0 && (
            <div className="text-center pt-4">
              <p> Oops! No data available!!</p>
            </div>
          )}
        </div>
      </section>

      <Footer2 />
    </>
  )
}

export default Work
