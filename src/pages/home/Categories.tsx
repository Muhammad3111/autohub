import { useState } from "react";
import SearchInput from "../../utility/search-input/SearchInput";
import CarImg from "../../assets/login-car.webp";
import CarCategory from "../../assets/car-category.png";
// import { useTranslation } from "react-i18next";

type CarModels = {
    name: string;
    img: string;
};

const Categories = () => {
    const [search, setSearch] = useState<string>("");
    // const { t } = useTranslation();

    const carModels: CarModels[] = [
        {
            name: "suv",
            img: CarCategory,
        },
        {
            name: "coupe",
            img: CarCategory,
        },
        {
            name: "sedan",
            img: CarCategory,
        },
        {
            name: "roadstar",
            img: CarCategory,
        },
        {
            name: "liftback",
            img: CarCategory,
        },
        {
            name: "euv",
            img: CarCategory,
        },
        {
            name: "targa",
            img: CarCategory,
        },
    ];

    return (
        <div className="w-full">
            <div
                className={` rounded-lg overflow-hidden relative flex flex-col items-center`}
            >
                <div className="w-[70%]">
                    <SearchInput search={search} setSearch={setSearch} />
                </div>

                <img src={CarImg} alt="" width={800} />
                <div className="flex items-center justify-around mt-10 w-full">
                    {carModels.map((item, index) => (
                        <button
                            key={index}
                            className="group duration-150 rounded"
                        >
                            <img src={item.img} alt="" width={70} />
                            <p className="font-semibold text-sm uppercase group-hover:text-primary duration-150">
                                {item.name}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;
