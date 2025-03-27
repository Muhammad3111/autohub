import React, { useRef, useState, useEffect } from "react";

type OtpInputProps = {
    length: number;
    onChangeOtp: (otp: string) => void;
};

const OtpInput: React.FC<OtpInputProps> = ({ length, onChangeOtp }) => {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    const handleChange = (value: string, index: number) => {
        if (!/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        onChangeOtp(newOtp.join(""));

        if (index < length - 1 && value) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (index: number) => {
        if (otp[index] === "") return;

        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        onChangeOtp(newOtp.join(""));

        if (index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex space-x-2">
            {otp.map((data, index) => (
                <input
                    key={index}
                    ref={(el) => (inputsRef.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={data}
                    className="w-12 h-12 border-[2px] text-xl font-medium rounded-lg text-center border-gray-300 focus:outline-none focus:border-primary duration-200 outline-none"
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => {
                        if (e.key === "Backspace") {
                            handleBackspace(index);
                        }
                    }}
                />
            ))}
        </div>
    );
};

export default OtpInput;
