import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import { Link } from "react-router-dom";
import FooterImage from "../../assets/footer-earth.svg";

const Footer = () => {
    return (
        <div className="w-full h-[600px] bg-black p-16">
            <div className="container mx-auto flex justify-between">
                <div className="text-white w-[300px] font-medium">
                    <Link to={"/"} className="text-3xl ">
                        Autohub
                    </Link>
                    <p className="my-6 text-sm font-normal">
                        Research has had a very large influence on my life. I
                        have learned most of what I know through research.
                    </p>

                    <p className="text-2xl">Call Centre: 90 123 45 67</p>

                    <div className="mt-10">
                        <p className="text-xl">Follow Us</p>
                        <div className="flex items-center gap-2 mt-4 text-primary">
                            <button className="p-2 bg-gray-900 rounded-sm">
                                <FiInstagram />
                            </button>
                            <button className="p-2 bg-gray-900 rounded-sm">
                                <FiFacebook />
                            </button>
                            <button className="p-2 bg-gray-900 rounded-sm">
                                <FiYoutube />
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={FooterImage} width={400} alt="" />
                </div>

                <div className="grid grid-cols-3 gap-20 text-white relative">
                    <ul className="text-sm text-gray-300 font-light leading-7 w-[200px] flex flex-col gap-2">
                        <p className="text-xl font-medium text-white">
                            Address
                        </p>
                        <li>30, Commercial Road Raton Australia - 47889 45</li>
                        <li>
                            Mail : solutions@example.com Ph : 012 456 789 0123
                        </li>

                        <ul className="text-sm text-gray-300 font-light leading-7 w-[200px] flex flex-col gap-2 mt-10">
                            <p className="text-xl font-medium text-white">
                                Branch Address
                            </p>

                            <li>
                                167 great portland street, DEON Australia -
                                47889 55
                            </li>
                            <li>
                                Mail : solutions@example.com Ph : 012 456 789
                                0459
                            </li>
                        </ul>
                    </ul>
                    <ul className="text-sm text-gray-300 font-light leading-6 flex flex-col">
                        <p className="text-xl font-medium text-white mb-2">
                            Quick Links
                        </p>

                        <Link to={"/"} className="footer__link">
                            Home
                        </Link>
                        <Link to={"/"} className="footer__link">
                            About Us
                        </Link>
                        <Link to={"/"} className="footer__link">
                            Career
                        </Link>
                        <Link to={"/"} className="footer__link">
                            Latest
                        </Link>
                        <Link to={"/"} className="footer__link">
                            News
                        </Link>
                        <Link to={"/"} className="footer__link">
                            Gallery
                        </Link>
                        <Link to={"/"} className="footer__link">
                            Contact Us
                        </Link>
                    </ul>
                    <ul className="text-sm text-gray-300 font-light leading-6 flex flex-col">
                        <p className="text-xl font-medium text-white mb-2">
                            Our Brands
                        </p>

                        <Link to={"/"} className="footer__link">
                            Jaquar
                        </Link>
                        <Link to={"/"} className="footer__link">
                            BMW
                        </Link>
                        <Link to={"/"} className="footer__link">
                            Tayota
                        </Link>
                        <Link to={"/"} className="footer__link">
                            Hyundai
                        </Link>
                        <Link to={"/"} className="footer__link">
                            Maruthi
                        </Link>
                        <Link to={"/"} className="footer__link">
                            Honda
                        </Link>
                    </ul>

                    <div className="absolute bottom-10 right-0 w-[480px] h-[100px]">
                        <h1 className="text-xl font-medium text-white">
                            Newsletter
                        </h1>
                        <div className="mt-4 h-[45px]">
                            <input
                                type="text"
                                placeholder="Your Email"
                                className="outline-none border bg-transparent border-gray-400 rounded-tl rounded-bl text-sm indent-3 h-full w-[260px]"
                            />
                            <button className="bg-primary text-white h-full rounded-tr rounded-br text-sm px-5">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-16">
                <div className="w-full  h-1 line"></div>
                <p className="text-sm font-medium text-gray-300 mt-8">
                    @ 2024 Autohub. All Rights Reserved
                </p>
            </div>
        </div>
    );
};

export default Footer;
