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
        <div className="m-10 relative">
            <button
                className="custom-prev absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-gray-800 text-white rounded-full shadow hover:bg-gray-700"
                id="prevButton"
            >
                <FaChevronLeft size={20} />
            </button>
            <button
                className="custom-next absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-gray-800 text-white rounded-full shadow hover:bg-gray-700"
                id="nextButton"
            >
                <FaChevronRight size={20} />
            </button>

            <div style={{ width: "100%", maxWidth: "100%", margin: "0 auto" }}>
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
                            className="slide-image"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src={Slide2}
                            alt="slide 2"
                            className="slide-image"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src={Slide3}
                            alt="slide 3"
                            className="slide-image"
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default Slider;
