import { useState } from "react";
import { FiX } from "react-icons/fi";
import Modal from "../modal/Modal";
import PhoneInput from "../../utility/phone-input/PhoneInput";
import OTPForm from "./OtpForm";
import { SubmitHandler, useForm, Controller } from "react-hook-form";

type LoginProps = {
    openLogin: boolean;
    setOpenLogin: (openLogin: boolean) => void;
};

type LoginInput = {
    phone_number: string;
};

const Login = ({ openLogin, setOpenLogin }: LoginProps) => {
    const [step, setStep] = useState<"phone" | "otp">("phone");

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        defaultValues: {
            phone_number: "",
        },
    });

    const handleLogin: SubmitHandler<LoginInput> = async (data) => {
        console.log("Submitted data:", data);
        setStep("otp");
    };

    const handleOtpSubmit = (otp: string) => {
        console.log("Entered OTP:", otp);
    };

    return (
        <Modal isOpen={openLogin}>
            <div className="bg-white rounded-2xl w-full relative overflow-hidden">
                {step === "phone" && (
                    <button
                        type="button"
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl duration-150 z-10"
                        onClick={() => setOpenLogin(false)}
                    >
                        <FiX />
                    </button>
                )}

                <div
                    className={`flex transition-transform duration-500 ${
                        step === "otp" ? "-translate-x-1/2" : "translate-x-0"
                    } w-[200%]`}
                >
                    <div className="w-1/2 p-6">
                        <h2 className="text-xl font-bold text-center mb-4">
                            Telefon raqamingizni kiriting
                        </h2>
                        <p className="text-sm text-center text-gray-500 mb-6">
                            Tasdiqlash kodini SMS orqali yuboramiz
                        </p>

                        <form onSubmit={handleSubmit(handleLogin)}>
                            <Controller
                                name="phone_number"
                                control={control}
                                rules={{
                                    required: "Telefon raqami majburiy",
                                    minLength: {
                                        value: 13,
                                        message:
                                            "Telefon raqami to‘liq kiritilishi kerak",
                                    },
                                }}
                                render={({ field }) => (
                                    <PhoneInput
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />

                            {errors.phone_number && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.phone_number.message}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-primary text-white p-2.5 text-sm mt-5 hover:bg-primary-hover duration-150 rounded"
                            >
                                Kodni olish
                            </button>
                        </form>
                    </div>

                    {step === "otp" && (
                        <div className="w-1/2">
                            <OTPForm
                                onBack={() => setStep("phone")}
                                onSubmit={handleOtpSubmit}
                                cancel={() => setOpenLogin(false)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default Login;
