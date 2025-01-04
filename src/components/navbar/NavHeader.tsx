import { Link } from "react-router-dom";

import AboutImg from "../../assets/info-icon.png";
import CarsImg from "../../assets/cars-icon.png";
import SparePartsImg from "../../assets/spare-parts.png";
import ServiceImg from "../../assets/service-icon.png";
import DealerImg from "../../assets/dealer-icon.png";
import NewsImg from "../../assets/news-icon.png";
import ContactImg from "../../assets/contact-icon.png";

const Header = () => {
    const links = [
        {
            name: "Biz haqimizda",
            img: AboutImg,
            path: "/about",
        },
        {
            name: "Avtomobillar",
            img: CarsImg,
            path: "/cars",
        },
        {
            name: "Extiyot qismlar",
            img: SparePartsImg,
            path: "/spareparts",
        },
        {
            name: "Servislar",
            img: ServiceImg,
            path: "/services",
        },
        {
            name: "Dillerlar",
            img: DealerImg,
            path: "/dealers",
        },
        {
            name: "Yangiliklar",
            img: NewsImg,
            path: "/news",
        },
        {
            name: "Aloqa",
            img: ContactImg,
            path: "/contact",
        },
    ];
    return (
        <div className="w-full h-12 mb-5 bg-white border-t-2">
            <div className="flex items-center h-full justify-between container mx-auto">
                {links.map((item, index) => (
                    <Link
                        to={item.path}
                        key={index}
                        className="font-medium text-lg flex items-center gap-2"
                    >
                        <img src={item.img} width={20} alt="" />
                        <p>{item.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default Header;
