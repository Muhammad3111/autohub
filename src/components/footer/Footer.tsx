import { useTranslation } from "react-i18next";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

type Display = {
    display?: string;
};

const Footer = ({ display }: Display) => {
    const { pathname } = useLocation();
    const links = ["/compare"];
    const { t } = useTranslation();

    const shouldHideFooter = links.some((route) =>
        pathname.startsWith(`${route}`)
    );

    if (shouldHideFooter || display === "none") {
        return <></>;
    }

    return (
        <div
            className={`w-full bg-dark pb-2 mt-10 ${
                display === "none" ? "hidden" : ""
            }`}
        >
            <div className="flex justify-between relative p-10">
                <div className="w-[300px] font-medium">
                    <Link to={"/"} className="text-3xl text-white">
                        GoAvto
                    </Link>
                    <div className="my-6 text-sm font-normal text-white">
                        {t("footer.research_statement")}
                    </div>
                </div>
                <div>
                    <p className="text-xl font-medium mb-4 text-white">
                        {t("footer.address_title")}
                    </p>
                    <ul className="text-sm text-white font-light leading-7">
                        <li>{t("footer.address")}</li>
                        <li>
                            {t("footer.email")}
                            <br />
                            {t("footer.phone")}
                        </li>
                    </ul>
                </div>
                <div>
                    <div className="text-xl text-white">
                        {t("footer.call_centre")}
                    </div>

                    <div className="mt-4">
                        <p className="text-xl text-white">
                            {t("footer.follow_us")}
                        </p>
                        <div className="flex items-center gap-2 mt-4 text-primary">
                            <button className="p-2 bg-grey rounded-sm hover:text-white hover:bg-primary duration-150">
                                <FiInstagram />
                            </button>
                            <button className="p-2 bg-grey rounded-sm hover:text-white hover:bg-primary duration-150">
                                <FiFacebook />
                            </button>
                            <button className="p-2 bg-grey rounded-sm hover:text-white hover:bg-primary duration-150">
                                <FiYoutube />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-0">
                <div className="w-full h-[1px] bg-grey"></div>
                <p className="text-white mt-2 text-center text-xs">
                    {t("footer.copyright")}
                </p>
            </div>
        </div>
    );
};

export default Footer;
