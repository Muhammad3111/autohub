import toast from "react-hot-toast";
import Header from "../../components/header/Header";
import { FiUser } from "react-icons/fi";
import { MdOutlineVpnKey } from "react-icons/md";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [isShow, setIsShow] = useState(false);
    const navigate = useNavigate();

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex flex-col items-center gap-20">
            <Header title="Sign In" />
            <div className="w-[400px] h-[450px] bg-white rounded shadow-custom p-10">
                <h1 className="text-center text-2xl font-medium">Login</h1>

                <div className="flex items-center relative mt-8 mb-4">
                    <div className="absolute left-2">
                        <FiUser className="text-xl" />
                    </div>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter username"
                        className="border w-full outline-none h-10 rounded text-sm indent-9 font-medium"
                    />
                </div>

                <div className="flex items-center relative mt-8 mb-4">
                    <div className="absolute left-2">
                        <MdOutlineVpnKey className="text-xl" />
                    </div>
                    <input
                        type={isShow ? "text" : "password"}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border w-full outline-none h-10 rounded text-sm indent-9 font-medium"
                    />

                    {password.length > 0 && (
                        <button className="absolute right-2.5 text-xl">
                            {isShow ? (
                                <BiHide onClick={() => setIsShow(false)} />
                            ) : (
                                <BiShow onClick={() => setIsShow(true)} />
                            )}
                        </button>
                    )}
                </div>

                <button
                    onClick={() => {
                        toast.success("Login success!");
                    }}
                    className="w-full font-medium bg-black text-white rounded h-10"
                >
                    Submit
                </button>

                <div className="flex items-center gap-2 mt-6">
                    <div className="w-full h-[2px] bg-gray-200"></div>
                    <p className="font-medium text-sm text-gray-400">Or</p>
                    <div className="w-full h-[2px] bg-gray-200"></div>
                </div>

                <button
                    onClick={() => navigate("/sign-up")}
                    className="w-full font-medium border-2 rounded h-10 mt-10"
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default SignIn;
