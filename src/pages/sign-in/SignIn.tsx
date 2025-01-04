import Header from "../../components/header/Header";
import { FiUser } from "react-icons/fi";
import { MdOutlineVpnKey } from "react-icons/md";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../components/footer/Footer";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";

const SignIn = () => {
    const [isShow, setIsShow] = useState(false);
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        username: false,
        password: false,
    });

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        let newErrors = {
            username: !username,
            password: !password,
        };

        setErrors(newErrors);

        if (Object.values(newErrors).includes(true)) {
            toast.error("Barcha maydonlarni to'ldiring!");
            return;
        }

        await login({ username, password })
            .unwrap()
            .then((res) => {
                toast.success("Kirish muvaffaqqiyatli bajarildi!");
                navigate("/");
                dispatch(
                    setCredentials({
                        accessToken: res.access,
                        refreshToken: res.refresh,
                    })
                );
            })
            .catch((err) => {
                toast.error(err.data.detail);
            });
    };

    return (
        <div className="flex flex-col items-center gap-20">
            <Header title="Kirish" />

            <form
                onSubmit={handleLogin}
                className="w-[400px] min-h-[450px] bg-white rounded shadow-custom p-10"
            >
                <h1 className="text-center text-2xl font-medium">Kirish</h1>

                <div className="flex items-center relative mt-8 mb-4">
                    <div className="absolute left-2">
                        <FiUser className="text-xl" />
                    </div>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Foydalanuvchi nomi"
                        className={`border w-full outline-none h-10 rounded text-sm indent-9 font-medium ${
                            errors.username ? "border-red-500" : ""
                        }`}
                        onFocus={() =>
                            setErrors({ ...errors, username: false })
                        }
                    />
                </div>

                <div className="flex items-center relative mt-8 mb-4">
                    <div className="absolute left-2">
                        <MdOutlineVpnKey className="text-xl" />
                    </div>
                    <input
                        type={isShow ? "text" : "password"}
                        placeholder="Parol"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`border w-full outline-none h-10 rounded text-sm indent-9 font-medium ${
                            errors.password ? "border-red-500" : ""
                        }`}
                        onFocus={() =>
                            setErrors({ ...errors, password: false })
                        }
                    />

                    {password.length > 0 && (
                        <button
                            type="button"
                            className="absolute right-2.5 text-xl"
                        >
                            {isShow ? (
                                <BiHide onClick={() => setIsShow(false)} />
                            ) : (
                                <BiShow onClick={() => setIsShow(true)} />
                            )}
                        </button>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full font-medium bg-primary hover:bg-primary-hover duration-150 text-white rounded h-10"
                >
                    {isLoading ? "Kirish..." : "Kirish"}
                </button>

                <div className="flex items-center gap-2 mt-6">
                    <div className="w-full h-[2px] bg-gray-200"></div>
                    <p className="font-medium text-sm text-gray-400">Yoki</p>
                    <div className="w-full h-[2px] bg-gray-200"></div>
                </div>

                <button
                    onClick={() => navigate("/sign-up")}
                    type="button"
                    className="w-full font-medium border-2 rounded h-10 mt-10"
                >
                    Ro'yxatdan o'tish
                </button>
            </form>
            <Footer />
        </div>
    );
};

export default SignIn;
