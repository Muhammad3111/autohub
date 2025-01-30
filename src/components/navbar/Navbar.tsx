import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import {
    selectCurrentAccessToken,
    selectCurrentIsLogin,
} from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import Language from "./Language";
import { useEffect } from "react";
import { useLazyAuthDetailQuery } from "../../features/auth/authApiSlice";
import Loading from "../loading/Loading";

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

    useEffect(() => {
        detailTrigger({ token: token });
    }, [userData, token, isLogin]);

    const navLinks: NavLinkType[] = [
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
        <div className="sticky top-0 left-0 z-20">
            {isLoading && <Loading />}
            <div className="w-full h-20 bg-white flex items-center justify-between px-10">
                <Link to={"/"} className="text-2xl font-semibold">
                    <p>Autohub</p>
                </Link>

                <div className="flex items-center gap-3">
                    {navLinks.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className={`${
                                pathname === item.path
                                    ? "bg-primary text-white"
                                    : "text-black"
                            } px-4 py-3 font-medium`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* {pathname !== "/" && (
                        <div className="flex h-10 items-center w-1/3">
                            <input
                                type="text"
                                placeholder="Search cars"
                                className="outline-none h-full border indent-4 rounded-tl rounded-bl w-[90%]"
                            />
                            <button className="w-14 h-full bg-primary hover:bg-primary-hover duration-150 text-white flex items-center justify-center text-xl rounded-tr rounded-br">
                                <FiSearch />
                            </button>
                        </div>
                    )} */}

                <div className="flex items-center gap-6">
                    <Language />

                    {!isLogin && (
                        <button
                            onClick={() => navigate("/sign-in")}
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
        </div>
    );
};

export default Navbar;
