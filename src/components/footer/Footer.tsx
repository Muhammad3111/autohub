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

                <div className="grid grid-cols-3 gap-4">
                    <ul>
                        Address
                        <li>Uzbekistan, Tashkent</li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto">
                <div className="w-full  h-1 line"></div>
                <p className="text-sm font-medium text-gray-200 mt-4">
                    @ 2024 Autohub. All Rights Reserved
                </p>
            </div>
        </div>
    );
};

export default Footer;
