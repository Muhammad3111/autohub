import { Link } from "react-router-dom";

import AboutImg from "../../assets/info-icon.png";
import CarsImg from "../../assets/cars-icon.png";
import SparePartsImg from "../../assets/spare-parts.png";
import ServiceImg from "../../assets/service-icon.png";
import DealerImg from "../../assets/dealer-icon.png";
import NewsImg from "../../assets/news-icon.png";
import ContactImg from "../../assets/contact-icon.png";
import { useTranslation } from "react-i18next";

const Header = () => {
    const { t } = useTranslation();

    const links = [
        {
            name: t("aboutUs"),
            img: AboutImg,
            path: "/about-us",
        },
        {
            name: t("cars"),
            img: CarsImg,
            path: "/cars",
        },
        {
            name: t("spareParts"),
            img: SparePartsImg,
            path: "/spare-parts",
        },
        {
            name: t("services"),
            img: ServiceImg,
            path: "/services",
        },
        {
            name: t("dealers"),
            img: DealerImg,
            path: "/dealers",
        },
        {
            name: t("news"),
            img: NewsImg,
            path: "/news",
        },
        {
            name: t("contact"),
            img: ContactImg,
            path: "/contact",
        },
    ];
    return (
        <div className="w-full h-12 bg-white border-t-2 border-b-2">
            <div className="flex items-center h-full justify-between my-container">
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
