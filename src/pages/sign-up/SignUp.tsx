import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { MdCall, MdOutlineVpnKey } from "react-icons/md";
import { BiHide, BiShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import OtpInput from "../../utility/otp-input/OtpInput";
import { toast } from "react-toastify";
import { PatternFormat } from "react-number-format";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const SignUp = () => {
    const [isShow, setIsShow] = useState(false);
    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const [isOtpMode, setIsOtpMode] = useState(false);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [smsCode, setSmsCode] = useState("");

    const [errors, setErrors] = useState({
        username: false,
        password: false,
        confirmPassword: false,
        phone: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let newErrors = {
            username: !username,
            password: !password,
            confirmPassword: !confirmPassword,
            phone: !phone,
        };

        setErrors(newErrors);

        if (Object.values(newErrors).includes(true)) {
            toast.error("All fields are required!");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            setErrors({ ...newErrors, confirmPassword: true });
            return;
        }

        if (phone.split(" ").join("").length !== 13) {
            toast.error("Phone number is not valid!");
            setErrors({ ...newErrors, phone: true });
            return;
        }

        toast.success("Account created successfully! Verify with OTP.");
        setIsOtpMode(true);
    };

    const handleBackToForm = () => {
        setIsOtpMode(false);
    };

    const handleVerify = () => {
        console.log(smsCode);
    };

    return (
        <div className="flex flex-col items-center gap-20">
            <Header title="Sign Up" />
            <div className="w-[400px] min-h-[200px] bg-white rounded shadow-custom p-10">
                {!isOtpMode ? (
                    <form onSubmit={handleSubmit}>
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
                                className={`border w-full outline-none h-10 rounded text-sm indent-9 font-medium ${
                                    errors.username ? "border-red-500" : ""
                                }`}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                                placeholder="Create password"
                                className={`border w-full outline-none h-10 rounded text-sm indent-9 font-medium ${
                                    errors.password ? "border-red-500" : ""
                                }`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() =>
                                    setErrors({ ...errors, password: false })
                                }
                            />

                            <button
                                type="button"
                                className="absolute right-2.5 text-xl"
                                onClick={() => setIsShow((prev) => !prev)}
                            >
                                {isShow ? <BiHide /> : <BiShow />}
                            </button>
                        </div>

                        <div className="flex items-center relative mt-8 mb-4">
                            <div className="absolute left-2">
                                <MdOutlineVpnKey className="text-xl" />
                            </div>
                            <input
                                type={isShowConfirm ? "text" : "password"}
                                placeholder="Confirm password"
                                className={`border w-full outline-none h-10 rounded text-sm indent-9 font-medium ${
                                    errors.confirmPassword
                                        ? "border-red-500"
                                        : ""
                                }`}
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                onFocus={() =>
                                    setErrors({
                                        ...errors,
                                        confirmPassword: false,
                                    })
                                }
                            />

                            <button
                                type="button"
                                className="absolute right-2.5 text-xl"
                                onClick={() =>
                                    setIsShowConfirm((prev) => !prev)
                                }
                            >
                                {isShowConfirm ? <BiHide /> : <BiShow />}
                            </button>
                        </div>

                        <div className="flex items-center relative mt-8 mb-4">
                            <div className="absolute left-2">
                                <MdCall className="text-xl" />
                            </div>
                            <PatternFormat
                                format="+998 ## ### ## ##"
                                mask=" "
                                placeholder="90 123 45 67"
                                className={`border w-full outline-none h-10 rounded text-sm indent-9 font-medium ${
                                    errors.phone ? "border-red-500" : ""
                                }`}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                onFocus={() =>
                                    setErrors({ ...errors, phone: false })
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full font-medium bg-black text-white rounded h-10"
                        >
                            Create Account
                        </button>

                        <div className="flex items-center gap-2 mt-6">
                            <div className="w-full h-[2px] bg-gray-200"></div>
                            <p className="font-medium text-sm text-gray-400">
                                Or
                            </p>
                            <div className="w-full h-[2px] bg-gray-200"></div>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/sign-in")}
                            className="w-full font-medium border-2 rounded h-10 mt-10"
                        >
                            Login
                        </button>
                    </form>
                ) : (
                    <div className="relative flex flex-col gap-6 items-center justify-center w-full">
                        <h1 className="text-2xl font-medium">Verify</h1>
                        <p>Your code was sent to {phone}</p>
                        <OtpInput
                            length={4}
                            onChangeOtp={(otp) => {
                                if (otp.length === 4) {
                                    setSmsCode(otp);
                                }
                            }}
                        />
                        <div className="flex items-center gap-4">
                            <button
                                className="border py-2 px-6 rounded"
                                onClick={handleBackToForm}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleVerify}
                                className="bg-blue-500 text-white py-2 px-6 rounded"
                            >
                                Verify
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <p className="text-sm">Didn't receive the code?</p>
                            <button className="text-blue-500 underline">
                                Request again
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SignUp;
