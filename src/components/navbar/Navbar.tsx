import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/autohub-logo.jpg";
import { useAuthDetailQuery } from "../../app/auth";
import UzbFlag from "../../assets/uzbekistan-flag.png";
import RusFlag from "../../assets/russian-flag.png";
import { FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

type DataType = {
    data: any;
};

const Navbar = () => {
    const navigate = useNavigate();
    const { isLogin, language, setLanguage } = useAuth();

    const { data } = useAuthDetailQuery<DataType>();

    // console.log(data);

    return (
        <div className="w-full h-14 sticky top-0 left-0 z-40 bg-white flex items-center justify-center">
            <div className="flex items-center justify-between container h-full">
                <Link
                    to={"/"}
                    className="text-2xl font-semibold flex items-center gap-4"
                >
                    <img src={Logo} alt="" width={40} />
                    <p>Autohub</p>
                </Link>

                <div className="flex items-center gap-4">
                    {isLogin ? (
                        <button
                            onClick={() => navigate("/profile")}
                            className="text-xl font-bold"
                        >
                            <p>{data?.user?.username}</p>
                        </button>
                    ) : (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate("/sign-in")}
                                className="flex items-center gap-2 px-6 bg-third text-white py-2 rounded-full"
                            >
                                <FiUser />
                                Kirish
                            </button>

                            <button
                                onClick={() => navigate("/sign-up")}
                                className="flex items-center gap-2 px-6 bg-third text-white py-2 rounded-full"
                            >
                                Ro'yxatdan o'tish
                            </button>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <button
                            disabled={language === "uz"}
                            onClick={() => setLanguage("uz")}
                            className={`${
                                language === "uz" ? "opacity-50" : "opacity-100"
                            } flex items-center gap-1`}
                        >
                            <img src={UzbFlag} alt="" width={40} />
                        </button>
                        <button
                            disabled={language === "ru"}
                            onClick={() => setLanguage("ru")}
                            className={`${
                                language === "ru" ? "opacity-50" : "opacity-100"
                            } flex items-center gap-1`}
                        >
                            <img src={RusFlag} alt="" width={40} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
