import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import {
    selectCurrentAccessToken,
    selectCurrentIsLogin,
} from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import Language from "./Language";
import { useContext, useEffect, useState } from "react";
import { useLazyAuthDetailQuery } from "../../features/auth/authApiSlice";
import Loading from "../loading/Loading";
import Login from "../login/Login";
import { LuMenu } from "react-icons/lu";
import Search from "../search/Search";
import { Context } from "../../context/Context";

const Navbar = () => {
    const navigate = useNavigate();
    const token = useSelector(selectCurrentAccessToken);
    const isLogin = useSelector(selectCurrentIsLogin);
    const [detailTrigger, { data: userData, isLoading }]: any =
        useLazyAuthDetailQuery();

    const [openLogin, setOpenLogin] = useState(false);

    useEffect(() => {
        detailTrigger({ token: token });
    }, [userData, token, isLogin]);

    const context = useContext(Context);
    if (!context) {
        throw new Error("Ushbu component contextdan tashqarida ishlatilmoqda");
    }

    const { setSidebarOpen } = context;

    return (
        <div className="fixed top-0 left-0 z-20 bg-dark w-full">
            {isLoading && <Loading />}
            <div className="h-[72px] flex items-center justify-between text-white px-6">
                <div className="flex items-center gap-8">
                    <button
                        onClick={() => setSidebarOpen((prev) => !prev)}
                        className="text-3xl"
                    >
                        <LuMenu />
                    </button>

                    <Link to={"/"} className="text-2xl font-semibold">
                        <p>Autohub</p>
                    </Link>
                </div>

                <Search />

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
