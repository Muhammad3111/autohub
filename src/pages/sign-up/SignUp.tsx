import toast from "react-hot-toast";
import Header from "../../components/header/Header";
import { FiUser } from "react-icons/fi";
import { MdCall, MdOutlineVpnKey } from "react-icons/md";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [isShow, setIsShow] = useState(false);
    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center gap-20">
            <Header title="Sign Up" />
            <div className="w-[400px] min-h-[450px] bg-white rounded shadow-custom p-10">
                <h1 className="text-center text-2xl font-medium">
                    Create Account
                </h1>

                <div className="flex items-center relative mt-8 mb-4">
                    <div className="absolute left-2">
                        <FiUser className="text-xl" />
                    </div>
                    <input
                        type="text"
                        placeholder="Create username"
                        className="border w-full outline-none h-10 rounded text-sm indent-9 font-medium"
                    />
                </div>

                <div className="flex items-center relative mt-8 mb-4">
                    <div className="absolute left-2">
                        <MdOutlineVpnKey className="text-xl" />
                    </div>
                    <input
                        type={isShow ? "text" : "password"}
                        placeholder="Create password"
                        className="border w-full outline-none h-10 rounded text-sm indent-9 font-medium"
                    />

                    <button className="absolute right-2.5 text-xl">
                        {isShow ? (
                            <BiHide onClick={() => setIsShow(false)} />
                        ) : (
                            <BiShow onClick={() => setIsShow(true)} />
                        )}
                    </button>
                </div>

                <div className="flex items-center relative mt-8 mb-4">
                    <div className="absolute left-2">
                        <MdOutlineVpnKey className="text-xl" />
                    </div>
                    <input
                        type={isShowConfirm ? "text" : "password"}
                        placeholder="Confirm password"
                        className="border w-full outline-none h-10 rounded text-sm indent-9 font-medium"
                    />

                    <button className="absolute right-2.5 text-xl">
                        {isShowConfirm ? (
                            <BiHide onClick={() => setIsShowConfirm(false)} />
                        ) : (
                            <BiShow onClick={() => setIsShowConfirm(true)} />
                        )}
                    </button>
                </div>

                <div className="flex items-center relative mt-8 mb-4">
                    <div className="absolute left-2">
                        <MdCall className="text-xl" />
                    </div>
                    <input
                        type="text"
                        placeholder="Enter phone number"
                        className="border w-full outline-none h-10 rounded text-sm indent-9 font-medium"
                    />
                </div>

                <button
                    onClick={() => {
                        toast.success("Login success!");
                    }}
                    className="w-full font-medium bg-black text-white rounded h-10"
                >
                    Create Account
                </button>

                <div className="flex items-center gap-2 mt-6">
                    <div className="w-full h-[2px] bg-gray-200"></div>
                    <p className="font-medium text-sm text-gray-400">Or</p>
                    <div className="w-full h-[2px] bg-gray-200"></div>
                </div>

                <button
                    onClick={() => navigate("/sign-in")}
                    className="w-full font-medium border-2 rounded h-10 mt-10"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default SignUp;
