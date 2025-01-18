import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/autohub-logo.jpg";
import { FiSearch, FiUser } from "react-icons/fi";
import { selectCurrentUserData } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import Language from "./Language";
import NavHeader from "./NavHeader";

const Navbar = () => {
    const navigate = useNavigate();
    const userData = useSelector(selectCurrentUserData);
    const { pathname } = useLocation();

    return (
        <div className="sticky top-0 left-0 z-20">
            <div className="w-full h-14 bg-white flex items-center justify-center">
                <div className="flex items-center justify-between my-container h-full">
                    <Link
                        to={"/"}
                        className="text-2xl font-semibold flex items-center gap-4"
                    >
                        <img src={Logo} alt="" width={40} />
                        <p>Autohub</p>
                    </Link>

                    {pathname !== "/" && (
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
                    )}

                    <div className="flex items-center gap-4">
                        {!userData && (
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => navigate("/sign-in")}
                                    className="flex items-center gap-2 px-6 bg-primary text-white py-2 rounded-full"
                                >
                                    <FiUser />
                                    Kirish
                                </button>

                                <button
                                    onClick={() => navigate("/sign-up")}
                                    className="flex items-center gap-2 px-6 bg-primary text-white py-2 rounded-full"
                                >
                                    Ro'yxatdan o'tish
                                </button>
                            </div>
                        )}

                        <Language />
                        {userData && (
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
            <NavHeader />
        </div>
    );
};

export default Navbar;
