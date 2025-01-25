import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../utility/button/Button";
import { TfiArrowTopRight } from "react-icons/tfi";
import BannerImage from "../../assets/login-car.webp";

const Banner = () => {
    const cars = [
        {
            image: BannerImage,
            name: "Cadillac Escalade IQ.",
            brand: "Cadillac",
            msrp: "24,045",
            mfg: "27 / 31",
        },
        {
            image: BannerImage,
            name: "BMW E46 Series",
            brand: "BMW",
            msrp: "34,045",
            mfg: "22 / 16",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === cars.length - 1 ? 0 : prevIndex + 1
        );
    };

    const currentCar = cars[currentIndex];

    return (
        <div
            className="bg-secondary flex items-center justify-center duration-200"
            style={{ height: "calc(100vh - 64px)" }}
        >
            <div className="px-10 xl:px-10 2xl:px-0">
                <h1 className="text-gray-300 uppercase font-bold select-none text-[40px] sm:text-[50px] md:text-[60px] lg:text-[80px] xl:text-[120px] 2xl:text-[120px]">
                    {currentCar.brand}
                </h1>

                <div className="relative flex items-center justify-between  xl:h-[83%]">
                    <div className="flex flex-col items-start w-[280px] z-20">
                        <p>Find your Car</p>
                        <p className="text-4xl font-medium mt-2 w-">
                            {currentCar.name}
                        </p>

                        <Button>Order Now</Button>

                        <Link
                            to={"/"}
                            className="mt-10 flex items-center gap-2"
                        >
                            <p>Test Drive</p>
                            <TfiArrowTopRight />
                        </Link>
                    </div>

                    <img
                        src={currentCar.image}
                        width={750}
                        alt={currentCar.name}
                    />

                    <div className="flex flex-col gap-10">
                        <div>
                            <p>Starting MSRP</p>
                            <p className="text-4xl font-bold mt-2">
                                $ {currentCar.msrp}
                            </p>
                        </div>
                        <div>
                            <p>Est. MFG</p>
                            <p className="text-4xl font-bold mt-2">
                                {currentCar.mfg}
                            </p>
                        </div>

                        <button onClick={handleNext}>
                            <img
                                src={currentCar.image}
                                width={200}
                                alt="Next Car"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
