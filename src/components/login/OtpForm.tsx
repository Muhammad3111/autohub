import { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useForm, Controller } from "react-hook-form";

type OTPFormProps = {
    onBack: () => void;
    onSubmit: (otp: string) => void;
    cancel: () => void;
};

type OTPInput = {
    otp: string[];
};

const OTPForm = ({ onBack, onSubmit, cancel }: OTPFormProps) => {
    const [countdown, setCountdown] = useState(60);
    const [resendCount, setResendCount] = useState(0);
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { isValid },
    } = useForm<OTPInput>({
        defaultValues: {
            otp: ["", "", "", "", ""],
        },
        mode: "onChange",
    });

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleResendCode = () => {
        const nextTime = resendCount >= 3 ? resendCount * 60 : 60;
        setCountdown(nextTime);
        setResendCount(resendCount + 1);
    };

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const currentOtp = getValues("otp");
        currentOtp[index] = value;
        setValue("otp", currentOtp, { shouldValidate: true });

        if (value && index < 4) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const handleOtpDelete = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key !== "Backspace") return;

        const currentOtp = getValues("otp");

        if (index === 4 || currentOtp[index] === "") {
            for (let i = index; i >= 0; i--) {
                if (currentOtp[i] !== "") {
                    currentOtp[i] = "";
                    setValue("otp", currentOtp, { shouldValidate: true });
                    document.getElementById(`otp-${i}`)?.focus();
                    break;
                }
            }
        } else {
            currentOtp[index] = "";
            setValue("otp", currentOtp, { shouldValidate: true });
            if (index > 0) {
                document.getElementById(`otp-${index - 1}`)?.focus();
            }
        }
    };

    const onSubmitOTP = (data: OTPInput) => {
        onSubmit(data.otp.join(""));
    };

    return (
        <div className="w-full p-6 relative">
            <button
                className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 duration-150"
                onClick={onBack}
            >
                <FiArrowLeft size={20} />
            </button>

            <h2 className="text-xl font-bold text-center mb-4">
                SMS kodni kiriting
            </h2>
            <p className="text-sm text-center text-gray-500 mb-6">
                Kodni telefoningizga yubordik
            </p>

            <form onSubmit={handleSubmit(onSubmitOTP)}>
                <div className="flex justify-center gap-3 mb-4">
                    {watch("otp").map((_digit, index) => (
                        <Controller
                            key={index}
                            name={`otp.${index}`}
                            control={control}
                            rules={{
                                required:
                                    "Barcha maydonlar to‘ldirilishi kerak",
                            }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id={`otp-${index}`}
                                    type="text"
                                    maxLength={1}
                                    value={field.value}
                                    onChange={(e) =>
                                        handleOtpChange(index, e.target.value)
                                    }
                                    onKeyDown={(e) => handleOtpDelete(index, e)}
                                    className="w-10 h-10 border rounded text-center text-xl ring-1 ring-grey focus:ring-2 focus:ring-primary outline-none duration-300"
                                    autoComplete="off"
                                />
                            )}
                        />
                    ))}
                </div>

                {countdown > 0 ? (
                    <p className="text-center text-gray-500">
                        Kodni qayta yuborish mumkin:{" "}
                        <span className="font-bold text-black">
                            {countdown} soniya
                        </span>
                    </p>
                ) : (
                    <button
                        type="button"
                        className="w-full text-blue-500 underline text-center"
                        onClick={handleResendCode}
                    >
                        Kodni qayta yuborish
                    </button>
                )}

                <div className="flex justify-between mt-5">
                    <button
                        type="button"
                        className="w-[48%] bg-gray-200 text-black p-2.5 rounded"
                        onClick={cancel}
                    >
                        Bekor qilish
                    </button>
                    <button
                        type="submit"
                        className={`w-[48%] p-2.5 rounded text-white ${
                            isValid
                                ? "bg-primary hover:bg-primary-hover"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!isValid}
                    >
                        Tasdiqlash
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OTPForm;
