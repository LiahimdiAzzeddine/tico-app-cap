import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "./swiper-custom.css";
import "./welcome.css"
import Intro1 from "./Intro1";
import Intro2 from "./Intro2";
import Intro3 from "./Intro3";
import Intro4 from "./intro4";
import Intro5 from "./intro5";
import Intro6 from "./intro6";

function WelcomeSlider() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Swiper
        modules={[Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        <SwiperSlide>
          <Intro1/>
        </SwiperSlide>

        <SwiperSlide>
        <Intro2/>
        </SwiperSlide>

        <SwiperSlide>
        <Intro3/>
        </SwiperSlide>

        <SwiperSlide>
        <Intro4/>
        </SwiperSlide>

        <SwiperSlide>
        <Intro5/>
        </SwiperSlide>

        <SwiperSlide>
        <Intro6/>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default WelcomeSlider;
