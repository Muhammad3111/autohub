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
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type RegisterInput = {
    username: string;
    password: string;
    confirmPassword: string;
    phone_number: string;
    role: "user" | "dealer";
};

const SignUp = () => {
    const [isShow, setIsShow] = useState(false);
    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const [isOtpMode, setIsOtpMode] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        control,
    } = useForm<RegisterInput>({
        defaultValues: {
            role: "user",
        },
    });

    const [smsCode, setSmsCode] = useState("");
    const [role, setRole] = useState<"user" | "dealer">("user");

    const [registerUser] = useRegisterMutation();

    const handleCreate: SubmitHandler<RegisterInput> = async (data) => {
        if (data.password !== data.confirmPassword) {
            toast.error("Parol bir xil emas!");
            return;
        }

        await registerUser(data)
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
                    <form onSubmit={handleSubmit(handleCreate)}>
                        <h1 className="text-center text-2xl font-medium">
                            Ro'yxatdan o'tish
                        </h1>

                        <div className="mb-4">
                            <div className="flex items-center relative mt-8">
                                <div className="absolute left-2">
                                    <FiUser className="text-xl" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Foydalanuvchi nomi"
                                    className={`border w-full outline-none h-10 rounded text-sm indent-9 font-medium ${
                                        errors.username && "border-red-500"
                                    }`}
                                    {...register("username", {
                                        required: "Foydalanuvchi nomi majburiy",
                                    })}
                                />
                            </div>
                            {errors.username && (
                                <span className="text-red-500 text-sm">
                                    {errors.username.message}
                                </span>
                            )}
                        </div>
                        <div className="mb-4">
                            <div className="flex items-center relative mt-8">
                                <div className="absolute left-2">
                                    <MdOutlineVpnKey className="text-xl" />
                                </div>
                                <input
                                    type={isShow ? "text" : "password"}
                                    placeholder="Parol"
                                    className={`border w-full outline-none h-10 rounded text-sm indent-9 font-medium ${
                                        errors.password && "border-red-500"
                                    } ${
                                        watch("password") !==
                                            watch("confirmPassword") &&
                                        "border-red-500"
                                    }`}
                                    {...register("password", {
                                        required: "Parol majburiy",
                                    })}
                                />

                                <button
                                    type="button"
                                    className="absolute right-2.5 text-xl"
                                    onClick={() => setIsShow((prev) => !prev)}
                                >
                                    {isShow ? <BiHide /> : <BiShow />}
                                </button>
                            </div>
                            {errors.password && (
                                <span className="text-red-500 text-sm">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>

                        <div className="mb-4">
                            <div className="flex items-center relative mt-8">
                                <div className="absolute left-2">
                                    <MdOutlineVpnKey className="text-xl" />
                                </div>
                                <input
                                    type={isShowConfirm ? "text" : "password"}
                                    placeholder="Parolni tasdiqlash"
                                    className={`border w-full outline-none h-10 rounded text-sm indent-9 font-medium ${
                                        errors.confirmPassword &&
                                        "border-red-500"
                                    } ${
                                        watch("password") !==
                                            watch("confirmPassword") &&
                                        "border-red-500"
                                    }`}
                                    {...register("confirmPassword", {
                                        required: "Parolni takrorlang",
                                    })}
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

                            {errors.confirmPassword && (
                                <span className="text-red-500 text-sm">
                                    {errors.confirmPassword.message}
                                </span>
                            )}
                        </div>

                        <div className="mb-4">
                            <div className="flex items-center relative mt-8">
                                <div className="absolute left-2">
                                    <MdCall className="text-xl" />
                                </div>
                                <Controller
                                    name="phone_number"
                                    control={control}
                                    rules={{
                                        required: "Telefon raqam majburiy",
                                        pattern: {
                                            value: /^\+998 \d{2} \d{3} \d{2} \d{2}$/,
                                            message: "Telefon raqam noto'g'ri",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <PatternFormat
                                            {...field}
                                            format="+998 ## ### ## ##"
                                            mask=" "
                                            placeholder="+998 90 123 45 67"
                                            className={`border w-full outline-none h-10 rounded text-sm indent-9 font-medium ${
                                                errors.phone_number &&
                                                "border-red-500"
                                            }`}
                                            onValueChange={(values) => {
                                                field.onChange(
                                                    values.formattedValue
                                                ); // Faqat formatlangan qiymatni saqlaymiz
                                            }}
                                        />
                                    )}
                                />
                            </div>

                            {errors.phone_number && (
                                <span className="text-red-500 text-sm">
                                    {errors.phone_number.message}
                                </span>
                            )}
                        </div>

                        <SwitchRole role={role} setRole={setRole} />

                        <button
                            type="submit"
                            className="w-full font-medium bg-primary text-white rounded h-10"
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
                        username={watch("username")}
                        phone={watch("phone_number")}
                        handleBackToForm={handleBackToForm}
                    />
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SignUp;
