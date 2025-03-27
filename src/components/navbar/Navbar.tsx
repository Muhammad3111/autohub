import { Link, useNavigate } from "react-router-dom";
import { FiDownload, FiUser } from "react-icons/fi";
import {
    selectCurrentAccessToken,
    selectCurrentUserData,
} from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import Language from "./Language";
import { useContext, useEffect, useState } from "react";
import Login from "../login/Login";
import { LuMenu } from "react-icons/lu";
import Search from "../search/Search";
import { Context } from "../../context/Context";
import { FaRegHandshake } from "react-icons/fa6";
import { useLazyAuthDetailQuery } from "../../features/auth/authApiSlice";
import Loading from "../loading/Loading";

const Navbar = () => {
    const navigate = useNavigate();
    const token = useSelector(selectCurrentAccessToken);
    const userData = useSelector(selectCurrentUserData);
    const [detailTrigger, { isLoading }] = useLazyAuthDetailQuery();

    useEffect(() => {
        if (token) {
            detailTrigger({ token });
        }
    }, [token]);

    const [openLogin, setOpenLogin] = useState(false);

    const context = useContext(Context);
    if (!context) {
        throw new Error("Ushbu component contextdan tashqarida ishlatilmoqda");
    }

    const { setSidebarOpen } = context;

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="fixed top-0 left-0 z-20 bg-light w-full shadow-sm">
            <div className="h-[72px] flex items-center justify-between px-6">
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

                    <button className="flex items-center gap-2 p-1.5 px-2">
                        <FiDownload className="text-lg" />
                        <p>App download</p>
                    </button>
                    <button className="flex items-center gap-2 p-1.5 px-2">
                        <FaRegHandshake className="text-lg" />
                        <p>Partner</p>
                    </button>

                    {!userData && (
                        <button
                            onClick={() => setOpenLogin(true)}
                            className="flex items-center gap-2 rounded-full font-medium"
                        >
                            <FiUser className="text-xl" />
                            Kirish
                        </button>
                    )}

                    {userData && (
                        <button
                            onClick={() => navigate("/profile")}
                            className="font-medium flex items-center gap-2"
                        >
                            <p>{userData.first_name}</p>
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
