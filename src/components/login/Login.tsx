import { useState } from "react";
import { FiX } from "react-icons/fi";
import Modal from "../modal/Modal";
import PhoneInput from "../../utility/phone-input/PhoneInput";
import OTPForm from "./OtpForm";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import RegisterForm from "./RegisterForm";
import {
    useLazyAuthDetailQuery,
    useRegisterMutation,
    useSendOtpMutation,
    useVerifyOtpMutation,
} from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";

type LoginProps = {
    openLogin: boolean;
    setOpenLogin: (openLogin: boolean) => void;
};

const Login = ({ openLogin, setOpenLogin }: LoginProps) => {
    const [step, setStep] = useState<"phone" | "otp" | "register">("phone");
    const [code, setCode] = useState("");

    const [sendOtp, { isLoading: otpLoading }] = useSendOtpMutation();
    const [verifyOtp, { isLoading: verifyLoading }] = useVerifyOtpMutation();
    const [authRegister, { isLoading: registerLoading }] =
        useRegisterMutation();
    const [detailTrigger] = useLazyAuthDetailQuery();
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
        reset,
    } = useForm<AuthSendOtp>({
        defaultValues: {
            phone_number: "",
        },
    });

    const handleLogin: SubmitHandler<AuthSendOtp> = async (data) => {
        const formattedPhone = `+998${data.phone_number.split(" ").join("")}`;
        try {
            const res = await sendOtp({
                phone_number: formattedPhone,
            }).unwrap();
            setCode(res.otp);
            setStep("otp");
        } catch (error) {
            console.error("OTP yuborishda xatolik:", error);
        }
    };

    const handleOtpSubmit = async (otp: string) => {
        await verifyOtp({
            phone_number: `+998${getValues("phone_number")
                .split(" ")
                .join("")}`,
            otp,
        })
            .unwrap()
            .then((res) => {
                if (res.access_token) {
                    detailTrigger({ token: res.access_token })
                        .unwrap()
                        .then((authData) => {
                            if (authData) {
                                dispatch(
                                    setCredentials({
                                        accessToken: res.access_token,
                                        refreshToken: res.refresh_token,
                                        userData: authData,
                                    })
                                );
                                setOpenLogin(false);
                                setStep("phone");
                                reset();
                            }
                        });
                } else {
                    setStep("register");
                }
            });
    };

    const handleRegisterSubmit = async (data: AuthRegister) => {
        const formattedPhone = `+998${getValues("phone_number")
            .split(" ")
            .join("")}`;

        const registerPayload: AuthRegister =
            data.user_data.role === "user"
                ? {
                      user_data: {
                          ...data.user_data,
                          phone_number: formattedPhone,
                      },
                  }
                : {
                      dealer_data: {
                          ...data.dealer_data,
                          work_phone: `+998${data.dealer_data?.work_phone
                              .split(" ")
                              .join("")}`,
                      },
                      user_data: {
                          ...data.user_data,
                          phone_number: formattedPhone,
                      },
                  };

        try {
            const res = await authRegister(registerPayload).unwrap();
            if (res.token) {
                const authData = await detailTrigger({
                    token: res.token.access,
                }).unwrap();
                if (authData) {
                    dispatch(
                        setCredentials({
                            accessToken: res.token.access,
                            refreshToken: res.token.refresh,
                            userData: authData,
                        })
                    );
                    setOpenLogin(false);
                    setStep("phone");
                    reset();
                }
            }
            setStep("phone");
            reset();
            setOpenLogin(false);
        } catch (error) {
            console.error("Ro'yxatdan o'tishda xatolik:", error);
        }
    };

    return (
        <Modal isOpen={openLogin}>
            <div
                className={`bg-white rounded-2xl w-full relative overflow-hidden`}
            >
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
                    style={{
                        transform:
                            step === "phone"
                                ? "translateX(0%)"
                                : step === "otp"
                                ? "translateX(-100%)"
                                : "translateX(-200%)",
                        height:
                            step === "phone"
                                ? "250px"
                                : step === "otp"
                                ? "280px"
                                : "500px",
                    }}
                    className={`flex transition-transform duration-500`}
                >
                    <div className="w-full flex-shrink-0 p-6">
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
                                        isRegister={false}
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
                                disabled={otpLoading}
                            >
                                Kodni olish{otpLoading && "..."}
                            </button>
                        </form>
                    </div>

                    <div className="w-full flex-shrink-0">
                        <OTPForm
                            onBack={() => setStep("phone")}
                            onSubmit={handleOtpSubmit}
                            cancel={() => setOpenLogin(false)}
                            code={code}
                            loading={verifyLoading}
                            phoneNumber={`+998${getValues("phone_number")
                                .split(" ")
                                .join("")}`}
                        />
                    </div>

                    <div className="w-full flex-shrink-0">
                        <RegisterForm
                            onBack={() => setStep("otp")}
                            onSubmit={handleRegisterSubmit}
                            cancel={() => setOpenLogin(false)}
                            loading={registerLoading}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default Login;
