import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import Image from 'next/image'
import HoverVideoPlayer from 'react-hover-video-player'
import { useRouter } from 'next/router'
import axios from 'axios'
var $ = require('jquery')
if (typeof window !== 'undefined') {
  window.$ = window.jQuery = require('jquery')
}
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import dynamic from 'next/dynamic'
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
})
import { NextSeo } from 'next-seo'
// import { gsap } from 'gsap/dist/gsap'
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { notification } from 'antd'
// gsap.registerPlugin(ScrollTrigger)

const Index = () => {
  const [featuredItem, setFeaturedItem] = useState([])
  const [featuredItemShoot, setFeaturedItemShoot] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [looking, setLooking] = useState('')
  const [represent, setRepresent] = useState('')
  const [loading, setLoading] = useState(false)
  const [width, setWidth] = useState(window.innerWidth);
  const router = useRouter()

  useEffect(() => {
    const [red, green, blue] = [253, 106, 2]
    const section1 = document.querySelector('.section1')
    window.addEventListener('scroll', () => {
      let y = 1 + (window.scrollY || window.pageYOffset) / 30
      y = y < 1 ? 1 : y
      const [r, g, b] = [red / y, green / y, blue / y].map(Math.round)
      section1.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    })
  }, [])

  useEffect(() => {
    if (router.isReady) {
      const _id = router.query._id
      getFeaturedItem()
    }
  }, [router.isReady])

  const getFeaturedItem = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/featured-work`,
      )

      console.log(data)

      const getF_data = data.data.get_featured_work
      const getF_data_Shoot = data.data.get_featured_work_shoot

      setFeaturedItem(getF_data)
      setFeaturedItemShoot(getF_data_Shoot)

      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  function handleWindowSizeChange() {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const isMobile = width <= 768

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (name == '') {
      openNotificationWithIcon('error', 'Please enter the name!')
      return false
    }

    if (looking == '') {
      openNotificationWithIcon('error', 'Please enter the looking for field!')
      return false
    }

    if (represent == '') {
      openNotificationWithIcon('error', 'Please enter the represent field!')
      return false
    }

    if (mobile == '') {
      openNotificationWithIcon('error', 'Please enter the mobile!')
      return false
    }

    if (!mobile.match('[0-9]{10}')) {
      openNotificationWithIcon('error', 'Please enter the valid mobile number!')
      return false
    }

    if (email == '') {
      openNotificationWithIcon('error', 'Please enter the email!')
      return false
    }

    if (IsEmail(email) == false) {
      openNotificationWithIcon('error', 'Please enter the correct email!')
      return false
    }

    setLoading(true)

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/contact`,
        {
          name,
          email,
          mobile,
          looking,
          represent,
        },
      )

      setLoading(false)

      notification['success']({
        message: 'success!',
        description: 'Form has been submitted successfully!',
        duration: 4,
        placement: 'bottomRight',
        bottom: 65,
      })

      router.push('/thanks')
    } catch (err) {
      setLoading(false)
    }
  }

  const IsEmail = (email) => {
    let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    if (!regex.test(email)) {
      return false
    } else {
      return true
    }
  }

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: 'Error!',
      description: msg,
      duration: 5,
      placement: 'bottomRight',
      bottom: 65,
    })
  }

  const state = {
    responsive_hrngcomps: {
      0: {
        items: 1,
        nav: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        autoplayHoverPause: true,
        loop: true,
      },
      300: {
        items: 1,
        nav: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 3000,
        autoplayHoverPause: true,
        loop: true,
      },

      766: {
        items: 3,
        nav: false,
        dots: false,
        loop: true,
      },

      1200: {
        items: 4,
        margin: 30,
        nav: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 3000,
        autoplayHoverPause: true,
        center: false,
      },
    },
  }

  return (
    <>

    <NextSeo
        title="BIAS - Best Production Studio in India"
        description="BIAS is a leading Integrated Production agency in India that provides high-quality video film services."
      />

      <Header />
    <div className='mainhome'>
      <section className="blpt homebannnerk revealer">
        {/*<img src="./images/bannerhome.jpg" class="desktopayout img-fluid"> */}
        <video
          id="vid"
          playsInline="playsinline"
          preload="auto"
          autoPlay="autoplay"
          muted="muted"
          loop="loop"
          className="videoadaptsdesktop"
          // poster="https://api.swstudios.in/work/images/thumbnail/realme-escape-the-infinite.jpg"
        >
          {isMobile && (
            <source
              src={`${process.env.NEXT_PUBLIC_B_API}brandmobile.mp4?v=1`}
              type="video/mp4"
            />
          )}

          {!isMobile && (
            <source
              src={`${process.env.NEXT_PUBLIC_B_API}mvideo.mp4?v=4`}
              type="video/mp4"
            />
          )}
        </video>
        {/*<img src="./images/mobbanner.jpg" class="mobstopayout img-fluid">*/}
      </section>

      <section className="blpt whowres whtxt d-flex section1" id="about">
        <div className="container align-self-center">
          <div className="row">
            <div className="col-md-4 text-center position-relative">
              <h2 className="mnsub">
                Who are <span className="strsp"><img src="/images/strokewe-yellow.png" /> we?</span>
              </h2>
              <div className="movablelines" />
            </div>
            <div className="col-md-8 mwd-tx">
              <p>
                
Attention is the rarest commodity in modern storytelling.
<br />  <span> BIAS Studios</span> exists to create work that earns it.

                 <br /> We are a hybrid creative lab producing films, photography, animation and AI-driven visual storytelling for brands navigating an ever-evolving media landscape.

              </p>
              <p>
               Unexpected ideas. Serious craft.

                <br /> And if the idea demands it, we’ll happily make a banana wear a suit.

              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="whtpt latestwrk pd-thm pd-topm">
        <div className="container">
          <div className="mainhd text-center">
            <h4 className="cntheads">
              <span>Our </span> latest work
            </h4>
          </div>
        </div>

        {featuredItem &&
          featuredItem.map((featuredItm, key) => (
            <div className="vdo-sects" id={'hover-target' + key} key={key}>
              <div className="container">
                <div className="row">
                  <div className="col-md-6 vdopls">
                  <Link href={`work/${featuredItm.slug}`}>
                    <HoverVideoPlayer
                      videoSrc={
                        `${process.env.NEXT_PUBLIC_B_API}work/videos/short-video/` +
                        featuredItm.short_video
                      }
                      
                      hoverTarget={() =>
                        document.getElementById('hover-target' + key)
                      }
                      loadingStateTimeout={1000}
                      pausedOverlay={
                        <img
                          src={
                            `${process.env.NEXT_PUBLIC_B_API}work/images/thumbnail/` +
                            featuredItm.thumbnail
                          }
                          className="vdtms"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      }
                      loadingOverlay={
                        <div className="loading-overlay">Loading...</div>
                      }
                      restartOnPaused
                      preload="metadata"
                    /></Link>
                  </div>
                  <div className="col-md-6">
                    <h5>{featuredItm.name}</h5>
                    <p>{featuredItm.short_desc}</p>
                    <Link href={`work/${featuredItm.slug}`}>Read More</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

        <div className="morevdo">
          <div className="container">
            <Link href="/work" className="mnsub">
              View more <span  className="strsp"><img src="./images/strokewe-yellow.png"/> work </span>{' '}
              <img src="./images/mrarr-yellow.png" />
            </Link>
          </div>
        </div>
      </section>

      {featuredItemShoot.length && (
        <section className="blpt mprojs whowres whtxt">
          <div className="container align-self-center">
            <div className="mainhd text-center">
              <h4 className="cntheads">
                <span>Photoshoot </span> projects
              </h4>
            </div>

            <OwlCarousel
              className="whygridsphn owl-carousel owl-theme"
              loop
              responsive={state.responsive_hrngcomps}
              nav
            >
              {featuredItemShoot &&
                featuredItemShoot.map((featuredItemSht, key) => (
                  <div className="item" key={key}>
                    <Link href={`work/${featuredItemSht.slug}`}>
                      <img
                        src={
                          `${process.env.NEXT_PUBLIC_B_API}work/images/thumbnail/` +
                          featuredItemSht.thumbnail
                        }
                      />
                      <div className="bdorg" />
                      <h6>{featuredItemSht.name}</h6>
                      <p>{featuredItemSht.short_desc.substring(0, 200)}</p>
                    </Link>
                  </div>
                ))}
            </OwlCarousel>
          </div>
        </section>
      )}
      <section className="whtpt pd-thm workbrn pd-topm" id="clients">
        <div className="container">
          <div className="mainhd text-center">
            <h4 className="cntheads">
              <span>Brands </span> we work with
            </h4>
          </div>
          {/*<div class="brandssld">
			<img src="./images/brandsslate.jpg" class="img-fluid">
		</div>*/}
          <div className="brandssld">
            <div className="row justify-content-center">
              <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/9new.png?v=4`}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/7.png`}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/2.png`}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/3.png`}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/16.png`}
                  className="img-fluid"
                />
              </div>

              <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/8.png`}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/1n.png`}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/18.png`}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/4.png`}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/6.png`}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/5.png`}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/10.png`}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/11new.png?v=22`}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/12.png`}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/13.png`}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/14.png`}
                  className="img-fluid"
                />
              </div>

              

              <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/21.png`}
                  className="img-fluid"
                />
              </div>

              <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/20.png`}
                  className="img-fluid"
                />
              </div>

              <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/17new.png?v=2`}
                  className="img-fluid"
                />
              </div>

              <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/15.png`}
                  className="img-fluid"
                />
              </div>

              <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/23.png`}
                  className="img-fluid"
                />
              </div>

              

              <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/22.png?v=2`}
                  className="img-fluid"
                />
              </div>

             <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/25.png?v=2`}
                  className="img-fluid"
                />
              </div>

              <div className="col-md-2 col-4 blk">
                <img
                  src={`${process.env.NEXT_PUBLIC_B_API}/images/swclients/24.png`}
                  className="img-fluid"
                />
              </div>
              

             
            </div>
          </div>
        </div>
      </section>
      <section className="blpt lttalks pd-thm pd-topm" id="getintouch">
        <div className="container align-self-center">
          <div className="mainhd text-center">
            <h4 className="cntheads">
              <span>Impressed? </span> Let’s talk!
            </h4>
          </div>
          <div className="mnformsty">
            <form onSubmit={handleSubmit}>
              <div className="form-group  row">
                <div className="col-md-2">
                  <label>
                    <b>Hello, my name is</b>
                  </label>
                </div>
                <div className="col-md-4">
                  <input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-md-2 loolesscrf">
                  <label>
                    <b>I’m looking for</b>
                  </label>
                </div>
                <div className="col-md-3">
                  <input
                    name="looking"
                    value={looking}
                    onChange={(e) => setLooking(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-md-2">
                  <label>
                    <b>I represent/work at </b>
                  </label>
                </div>
                <div className="col-md-4">
                  <input
                    name="represent"
                    value={represent}
                    onChange={(e) => setRepresent(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-md-2 loolesscrf">
                  <label>
                    <b>Contact me on</b>
                  </label>
                </div>
                <div className="col-md-3">
                  <input
                    name="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-md-2 dropleswdths">
                  <label>
                    <b>Drop a mail at</b>
                  </label>
                </div>
                <div className="col-md-4">
                  <input
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-md-12 text-center">
                  <button className="ytthemects">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  )
}

export default Index
