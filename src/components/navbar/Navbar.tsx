import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/autohub-logo.jpg";
import { useLazyAuthDetailQuery } from "../../features/auth/authApiSlice";
import { FiUser } from "react-icons/fi";
import { selectCurrentAccessToken } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Language from "./Language";

const Navbar = () => {
    const navigate = useNavigate();
    const accessToken = useSelector(selectCurrentAccessToken);
    const [detailTrigger, { data }] = useLazyAuthDetailQuery<any>();

    useEffect(() => {
        if (accessToken) {
            detailTrigger({ token: accessToken });
        }
    }, [accessToken, detailTrigger]);

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
                    {!data && (
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
                    {data && (
                        <button
                            onClick={() => navigate("/profile")}
                            className="text-xl font-bold"
                        >
                            <p>{data?.user?.username}</p>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
