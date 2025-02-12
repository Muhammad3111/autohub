import sedanImg from "../../assets/sedan-category.png";
import suvImg from "../../assets/suv-category.png";
import mpvImg from "../../assets/mpv-category.png";
import sportImg from "../../assets/sport-category.png";
import minivanImg from "../../assets/minivan-category.png";
import pickupImg from "../../assets/pickup-category.png";
import vanImg from "../../assets/van-category.png";

import bmwBrand from "../../assets/bmw-brand.png";
import nissanBrand from "../../assets/nissan-brand.png";
import audiBrand from "../../assets/audi-brand.png";
import fordBrand from "../../assets/ford-brand.png";
import mazdaBrand from "../../assets/mazda-brand.png";
import hondaBrand from "../../assets/honda-brand.png";

type CarModels = {
    name: string;
    img: string;
};

const Brands = () => {
    const carModels: CarModels[] = [
        {
            name: "sedan",
            img: sedanImg,
        },
        {
            name: "suv",
            img: suvImg,
        },
        {
            name: "mpv",
            img: mpvImg,
        },
        {
            name: "sport car",
            img: sportImg,
        },
        {
            name: "minivan",
            img: minivanImg,
        },
        {
            name: "pick up",
            img: pickupImg,
        },
        {
            name: "van",
            img: vanImg,
        },
    ];

    const carBrands: CarModels[] = [
        {
            name: "bmw",
            img: bmwBrand,
        },
        {
            name: "nissan",
            img: nissanBrand,
        },
        {
            name: "audi",
            img: audiBrand,
        },
        {
            name: "ford",
            img: fordBrand,
        },
        {
            name: "mazda",
            img: mazdaBrand,
        },
        {
            name: "honda",
            img: hondaBrand,
        },
        {
            name: "nissan",
            img: nissanBrand,
        },
        {
            name: "audi",
            img: audiBrand,
        },
        {
            name: "ford",
            img: fordBrand,
        },
        {
            name: "mazda",
            img: mazdaBrand,
        },
    ];

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mt-10 w-full">
                {carModels.map((item, index) => (
                    <button key={index}>
                        <img src={item.img} alt="" width={80} />
                        <p className="text-dark uppercase mt-2">{item.name}</p>
                    </button>
                ))}
            </div>

            <div className="border-t w-full pt-5 mt-5 flex items-center justify-between">
                {carBrands.map((item, index) => (
                    <button
                        key={index}
                        className="flex flex-col items-center gap-2"
                    >
                        <img src={item.img} alt="" width={40} />
                        <p className="text-dark uppercase">{item.name}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Brands;
