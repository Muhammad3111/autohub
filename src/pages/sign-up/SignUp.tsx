import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { MdCall, MdOutlineVpnKey } from "react-icons/md";
import { BiHide, BiShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PatternFormat } from "react-number-format";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import SwitchRole from "./SwitchRole";
import { useRegisterMutation } from "../../features/auth/authApiSlice";
import OtpForm from "./OtpForm";

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
    const [role, setRole] = useState<"user" | "dealer">("user");

    const [registerUser] = useRegisterMutation();

    const [errors, setErrors] = useState({
        username: false,
        password: false,
        confirmPassword: false,
        phone: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let newErrors = {
            username: !username,
            password: !password,
            confirmPassword: !confirmPassword,
            phone: !phone,
        };

        setErrors(newErrors);

        if (Object.values(newErrors).includes(true)) {
            toast.error("Barcha maydonlarni to'ldiring!");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Parol bir xil emas!");
            setErrors({ ...newErrors, confirmPassword: true });
            return;
        }

        if (phone.split(" ").join("").length !== 13) {
            toast.error("Telefon raqam noto'g'ri!");
            setErrors({ ...newErrors, phone: true });
            return;
        }

        let newData = {
            username,
            password,
            phone_number: phone,
            role,
        };

        await registerUser(newData)
            .then((res: any) => {
                if (res?.data) {
                    setSmsCode(res?.data?.code);
                    setIsOtpMode(true);
                } else {
                    toast.error(res?.error?.data?.detail);
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error(err?.error.data.detail);
            });
    };

    const handleBackToForm = () => {
        setIsOtpMode(false);
    };

    return (
        <div className="flex flex-col items-center gap-20">
            <Header title="Ro'yxatdan o'tish" />
            <div className="w-[400px] min-h-[200px] bg-white rounded shadow-custom p-10">
                {!isOtpMode ? (
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-center text-2xl font-medium">
                            Ro'yxatdan o'tish
                        </h1>

                        <div className="flex items-center relative mt-8 mb-4">
                            <div className="absolute left-2">
                                <FiUser className="text-xl" />
                            </div>
                            <input
                                type="text"
                                placeholder="Foydalanuvchi nomi"
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
                                placeholder="Parol"
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
                                placeholder="Parolni tasdiqlash"
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

                        <SwitchRole role={role} setRole={setRole} />

                        <button
                            type="submit"
                            className="w-full font-medium bg-black text-white rounded h-10"
                        >
                            Ro'yxatdan o'tish
                        </button>

                        <div className="flex items-center gap-2 mt-6">
                            <div className="w-full h-[2px] bg-gray-200"></div>
                            <p className="font-medium text-sm text-gray-400">
                                Yoki
                            </p>
                            <div className="w-full h-[2px] bg-gray-200"></div>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/sign-in")}
                            className="w-full font-medium border-2 rounded h-10 mt-10"
                        >
                            Kirish
                        </button>
                    </form>
                ) : (
                    <OtpForm
                        code={smsCode}
                        username={username}
                        phone={phone}
                        handleBackToForm={handleBackToForm}
                    />
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SignUp;
