import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import {
    selectCurrentAccessToken,
    selectCurrentIsLogin,
} from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import Language from "./Language";
import { useEffect, useState } from "react";
import { useLazyAuthDetailQuery } from "../../features/auth/authApiSlice";
import Loading from "../loading/Loading";
import Login from "../login/Login";

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
        <div className="fixed w-full top-0 z-20 bg-dark">
            {isLoading && <Loading />}
            <div className="max-w-[1440px] mx-auto h-[72px] flex items-center justify-between text-white">
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
                            } px-4 py-2 font-medium text-base`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-6">
                    <Language />

                    {/* {!isLogin && (
                        <button
                            onClick={() => setOpenLogin(true)}
                            className="flex items-center gap-2 rounded-full font-medium"
                        >
                            <FiUser className="text-xl" />
                            Kirish
                        </button>
                    )} */}
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
            {openLogin && (
                <Login openLogin={openLogin} setOpenLogin={setOpenLogin} />
            )}
        </div>
    );
};

export default Navbar;
