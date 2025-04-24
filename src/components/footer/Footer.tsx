import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

type Display = {
    display?: string;
};

const Footer = ({ display }: Display) => {
    const { pathname } = useLocation();
    const links = ["/compare"];

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
                        Autohub
                    </Link>
                    <div className="my-6 text-sm font-normal text-white">
                        Research has had a very large influence on my life. I
                        have learned most of what I know through research.
                    </div>
                </div>
                <div>
                    <p className="text-xl font-medium mb-4 text-white">
                        Address
                    </p>
                    <ul className="text-sm text-white font-light leading-7">
                        <li>30, Commercial Road Raton Australia - 47889 45</li>
                        <li>
                            Mail: solutions@example.com
                            <br />
                            Ph: 012 456 789 0123
                        </li>
                    </ul>
                </div>
                <div>
                    <div className="text-xl text-white">
                        Call Centre: 90 123 45 67
                    </div>

                    <div className="mt-4">
                        <p className="text-xl text-white">Follow Us</p>
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
                    @ 2024 Autohub. All Rights Reserved
                </p>
            </div>
        </div>
    );
};

export default Footer;
