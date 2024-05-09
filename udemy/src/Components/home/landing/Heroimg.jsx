import React, { useEffect } from 'react'
import "./heroimg.css"
import banner1 from "../../../assets/lights-spotlight-banner.jpg"
import banner2 from "../../../assets/lights-spotlight-banner-2.jpg"
import banner3 from "../../../assets/lights-spotlight-banner-3.jpg"
import banner4 from "../../../assets/lights-spotlight-banner-5.jpg"
import { Swiper, SwiperSlide } from 'swiper/react';
import Aos from 'aos'
import 'aos/dist/aos.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/scrollbar';
import { EffectFade,Keyboard,Autoplay} from 'swiper/modules';

const Heroimg = () => {
 
  useEffect(()=>{
    Aos.init({duration:2000})
  })

  return (
    <section className='herioimg' data-aos="fade-up-right">
            <Swiper
            scrollbar={true}
        spaceBetween={30}
        effect={'fade'}
        grabCursor={true}
        modules={[EffectFade,Keyboard,Autoplay]}
        className="mySwiper"
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide >
             <img src={banner1} alt="" />
             <div  className="title" data-swiper-parallax="300">
            <p>Light up your home </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
             <img src={banner2} alt="" />
             <div  className="title" data-swiper-parallax="300">
            <p>One stop shop for</p>
            <p>lighting up your space</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
             <img src={banner3} alt="" />
             <div  className="title" data-swiper-parallax="300">
            <p>Elevate your space and lifestyle</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
             <img src={banner4} alt="" />
             <div  className="title" data-swiper-parallax="300">
            <p>Statement light that add to your home decor</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  )
}

export default Heroimg