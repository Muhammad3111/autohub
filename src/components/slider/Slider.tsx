import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import Slide1 from "../../assets/1slider.webp";
import Slide2 from "../../assets/2slider.webp";
import Slide3 from "../../assets/3slider.webp";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Slider = () => {
    return (
        <div className="relative group w-[950px] max-w-[950px] mx-auto">
            {/* Prev Button */}
            <button
                className="custom-prev absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black bg-opacity-50 text-white rounded-full shadow opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                id="prevButton"
            >
                <FaChevronLeft size={20} />
            </button>

            {/* Next Button */}
            <button
                className="custom-next absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black bg-opacity-50 text-white rounded-full shadow opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                id="nextButton"
            >
                <FaChevronRight size={20} />
            </button>

            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={{
                    nextEl: "#nextButton",
                    prevEl: "#prevButton",
                }}
                modules={[Autoplay, Pagination, Navigation]}
                loop={true}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img
                        src={Slide1}
                        alt="slide 1"
                        className="slide-image w-full"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={Slide2}
                        alt="slide 2"
                        className="slide-image w-full"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={Slide3}
                        alt="slide 3"
                        className="slide-image w-full"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;
