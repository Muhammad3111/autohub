import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper/modules";

import Slide1 from "../../assets/our-partner-mg.png";
import Slide2 from "../../assets/our-partner-tesla.png";
import Slide3 from "../../assets/our-partner-isuzu.png";
import Slide4 from "../../assets/our-partner-bmw.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AboutSlider = () => {
    const descriptions = [
        "Morris Garages",
        "Tesla",
        "Isuzu",
        "BMW",
        "Morris Garages",
        "Isuzu",
        "Tesla",
        "BMW",
        "Morris Garages",
        "Isuzu",
        "Tesla",
    ];

    return (
        <div className="relative">
            <button
                className="absolute -left-16 z-10 p-3 bg-gray-300 rounded-full -translate-y-1/2 top-1/2"
                id="prevButton"
            >
                <FaChevronLeft size={20} />
            </button>

            <div className="w-full">
                <Swiper
                    spaceBetween={30}
                    slidesPerView={10}
                    navigation={{
                        nextEl: "#nextButton",
                        prevEl: "#prevButton",
                    }}
                    modules={[Autoplay, Navigation]}
                    loop={true}
                    className="mySwiper"
                >
                    {[
                        Slide1,
                        Slide2,
                        Slide3,
                        Slide4,
                        Slide1,
                        Slide3,
                        Slide2,
                        Slide4,
                        Slide1,
                        Slide3,
                        Slide2,
                    ].map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative bg-white my-2 border-2 w-full h-[100px] flex items-center justify-center rounded cursor-pointer group hover:bg-black hover:bg-opacity-20 duration-150">
                                <img
                                    src={slide}
                                    alt={`slide ${index + 1}`}
                                    width={70}
                                    className="object-contain"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-opacity-60 text-white uppercase font-semibold text-center p-2 translate-y-full group-hover:bottom-1/2 group-hover:translate-y-1/2 duration-300">
                                    {descriptions[index]}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <button
                className="absolute -right-16 z-10 p-3 bg-gray-300 rounded-full -translate-y-1/2 top-1/2"
                id="nextButton"
            >
                <FaChevronRight size={20} />
            </button>
        </div>
    );
};

export default AboutSlider;
