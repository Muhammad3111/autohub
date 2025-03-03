// import sedanImg from "../../assets/sedan-category.png";
// import suvImg from "../../assets/suv-category.png";
// import mpvImg from "../../assets/mpv-category.png";
// import sportImg from "../../assets/sport-category.png";
// import minivanImg from "../../assets/minivan-category.png";
// import pickupImg from "../../assets/pickup-category.png";
// import vanImg from "../../assets/van-category.png";

// import bmwBrand from "../../assets/bmw-brand.png";
// import nissanBrand from "../../assets/nissan-brand.png";
// import audiBrand from "../../assets/audi-brand.png";
// import fordBrand from "../../assets/ford-brand.png";
// import mazdaBrand from "../../assets/mazda-brand.png";
// import hondaBrand from "../../assets/honda-brand.png";

import { useContext } from "react";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { collection, brands } from "../../mock/data.json";

const Brands = () => {
    const context = useContext(Context);
    const navigate = useNavigate();

    if (!context) {
        throw new Error(
            "Ushbu component context providerdan tashqarida ishlatilmoqda"
        );
    }

    const { setModel } = context;

    const carModels: Collection[] = collection;
    const carBrands: Brand[] = brands;

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mt-10 w-full">
                {carModels.slice(1).map((item, index) => (
                    <button
                        onClick={() => {
                            setModel(item.title);
                            navigate(`/cars/${item.title}`);
                        }}
                        key={index}
                    >
                        <img src={item.icon} alt="" width={80} />
                        <p className="text-dark uppercase mt-2">{item.title}</p>
                    </button>
                ))}
            </div>

            <div className="border-t w-full pt-5 mt-5 grid grid-cols-10 grid-rows-5 gap-4 justify-items-center [grid-auto-flow:column]">
                {carBrands
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((item) => (
                        <button
                            key={item.id}
                            className="flex flex-col items-center gap-2 text-center"
                        >
                            {/* <img src={item.image} alt={item.name} width={40} /> */}
                            <p className="text-dark uppercase">{item.name}</p>
                        </button>
                    ))}
            </div>
        </div>
    );
};

export default Brands;
