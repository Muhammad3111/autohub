import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

type Display = {
    display?: string;
};

const Footer = ({ display }: Display) => {
    const { pathname } = useLocation();
    const links = [
        "/about-us",
        "/cars",
        "/spare-parts",
        "/services",
        "/dealers",
        "/news",
    ];

    const shouldHideFooter = links.some((route) =>
        pathname.startsWith(`${route}/`)
    );

    if (shouldHideFooter || display === "none") {
        return <></>;
    }

    return (
        <div
            className={`w-full bg-dark p-10 mt-10 ${
                display === "none" ? "hidden" : ""
            }`}
        >
            <div className="flex justify-between relative max-w-[1440px] mx-auto">
                <div className=" w-[300px] font-medium">
                    <Link to={"/"} className="text-3xl text-white">
                        Autohub
                    </Link>
                    <p className="my-6 text-sm font-normal text-white">
                        Research has had a very large influence on my life. I
                        have learned most of what I know through research.
                    </p>

                    <p className="text-2xl text-white">
                        Call Centre: 90 123 45 67
                    </p>

                    <div className="mt-10">
                        <p className="text-xl text-white">Follow Us</p>
                        <div className="flex items-center gap-2 mt-4 text-primary">
                            <button className="p-2 bg-grey rounded-sm">
                                <FiInstagram />
                            </button>
                            <button className="p-2 bg-grey rounded-sm">
                                <FiFacebook />
                            </button>
                            <button className="p-2 bg-grey rounded-sm">
                                <FiYoutube />
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text-xl font-medium mb-4 text-white">
                        Our Brands
                    </p>
                    <ul className="text-base font-light leading-7 text-white">
                        <li>Jaguar</li>
                        <li>BMW</li>
                        <li>Tayota</li>
                        <li>Hyundai</li>
                        <li>Honda</li>
                    </ul>
                </div>

                <div>
                    <p className="text-xl font-medium mb-4 text-white">
                        Quick Links
                    </p>
                    <ul className="text-base text-white font-light leading-7">
                        <li>About Us</li>
                        <li>News</li>
                        <li>Gallery</li>
                        <li>Contact Us</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-20">
                    <div>
                        <p className="text-xl font-medium mb-4 text-white">
                            Address
                        </p>
                        <ul className="text-sm text-white font-light leading-7">
                            <li>
                                30, Commercial Road Raton Australia - 47889 45
                            </li>
                            <li>
                                Mail: solutions@example.com
                                <br />
                                Ph: 012 456 789 0123
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-xl font-medium mb-4 text-white">
                            Branch Address
                        </p>
                        <ul className="text-sm text-white font-light leading-7">
                            <li>
                                167 great portland street, DEON Australia -
                                47889 55
                            </li>
                            <li>
                                Mail: solutions@example.com
                                <br />
                                Ph: 012 456 789 0459
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-16">
                <div className="w-full  h-1 bg-grey"></div>
                <p className="text-base font-medium text-white mt-8 text-center">
                    @ 2024 Autohub. All Rights Reserved
                </p>
            </div>
        </div>
    );
};

export default Footer;
