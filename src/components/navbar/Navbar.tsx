import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/autohub-logo.jpg";
import { FiUser } from "react-icons/fi";
import { selectCurrentUserData } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import Language from "./Language";
import NavHeader from "./NavHeader";

const Navbar = () => {
    const navigate = useNavigate();
    const userData = useSelector(selectCurrentUserData);

    return (
        <>
            <div className="w-full h-14 bg-white flex items-center justify-center">
                <div className="flex items-center justify-between container h-full">
                    <Link
                        to={"/"}
                        className="text-2xl font-semibold flex items-center gap-4"
                    >
                        <img src={Logo} alt="" width={40} />
                        <p>Autohub</p>
                    </Link>

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
        </>
    );
};

export default Navbar;
