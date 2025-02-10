import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiUser, FiX } from "react-icons/fi";
import {
    selectCurrentAccessToken,
    selectCurrentIsLogin,
} from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import Language from "./Language";
import { useEffect, useState } from "react";
import { useLazyAuthDetailQuery } from "../../features/auth/authApiSlice";
import Loading from "../loading/Loading";
import Modal from "../modal/Modal";
import { PatternFormat } from "react-number-format";

type NavLinkType = {
    name: string;
    path: string;
};

const Navbar = () => {
    const navigate = useNavigate();
    const token = useSelector(selectCurrentAccessToken);
    const isLogin = useSelector(selectCurrentIsLogin);
    const [detailTrigger, { data: userData, isLoading }]: any =
        useLazyAuthDetailQuery();

    const { pathname } = useLocation();

    const [openLogin, setOpenLogin] = useState(false);

    useEffect(() => {
        detailTrigger({ token: token });
    }, [userData, token, isLogin]);

    const navLinks: NavLinkType[] = [
        {
            name: "Bosh sahifa",
            path: "/",
        },
        {
            name: "Biz haqimizda",
            path: "/about-us",
        },
        {
            name: "Avtomobillar",
            path: "/cars",
        },
        {
            name: "Extiyot qismlar",
            path: "/spare-parts",
        },
        {
            name: "Servislar",
            path: "/services",
        },
        {
            name: "Dillerlar",
            path: "/dealers",
        },
        {
            name: "Yangiliklar",
            path: "/news",
        },
        {
            name: "Aloqa",
            path: "/contact",
        },
    ];

    return (
        <div className="fixed w-full top-0 left-0 z-20 bg-dark">
            {isLoading && <Loading />}
            <div className="w-[1440px] mx-auto h-[72px] flex items-center justify-between text-white">
                <Link to={"/"} className="text-2xl font-semibold">
                    <p>Autohub</p>
                </Link>

                <div className="flex items-center gap-1">
                    {navLinks.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className={`${
                                pathname === item.path
                                    ? "bg-primary text-white"
                                    : "text-white"
                            } px-4 py-2 font-medium`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-6">
                    <Language />

                    {!isLogin && (
                        <button
                            onClick={() => setOpenLogin(true)}
                            className="flex items-center gap-2 rounded-full font-medium"
                        >
                            <FiUser className="text-xl" />
                            Kirish
                        </button>
                    )}

                    {userData && isLogin && (
                        <button
                            onClick={() => navigate("/profile")}
                            className="text-xl font-bold"
                        >
                            <p>{userData?.username}</p>
                        </button>
                    )}
                </div>
            </div>
            <Modal isOpen={openLogin} onClose={() => setOpenLogin(false)}>
                <div className="bg-white rounded-2xl w-full p-6">
                    <button
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl duration-150"
                        onClick={() => setOpenLogin(false)}
                    >
                        <FiX />
                    </button>
                    <h2 className="text-xl font-bold text-center mb-4">
                        Telefon raqamingizni kiriting
                    </h2>
                    <p className="text-sm text-center text-gray-500 mb-6">
                        Tasdiqlash kodini SMS orqali yuboramiz
                    </p>
                    <div>
                        <PatternFormat
                            format="+998 ## ###-##-##"
                            mask=" "
                            placeholder="+998 90 123 45 67"
                            className="w-full ring-1 ring-grey focus:ring-2 focus:ring-primary outline-none duration-300 h-10 text-sm indent-3 rounded"
                        />
                        <button className="w-full bg-primary text-white p-2.5 text-sm mt-5 hover:bg-primary-hover duration-150 rounded">
                            Kodni olish
                        </button>
                    </div>
                    <p className="text-xs text-center text-gray-500 mt-4">
                        Avtorizatsiyadan o'tish orqali siz{" "}
                        <span className="text-blue-500 underline cursor-pointer">
                            shaxsiy ma'lumotlarni qayta ishlash siyosatiga
                        </span>{" "}
                        rozilik bildirasiz
                    </p>
                </div>
            </Modal>
        </div>
    );
};

export default Navbar;
