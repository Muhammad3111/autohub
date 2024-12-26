import { useState } from "react";
import OtpInput from "../../utility/otp-input/OtpInput";
import { useVerifyMutation } from "../../app/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";

type OtpFormProps = {
    code: string;
    username: string;
    phone: string;
    handleBackToForm: () => void;
};

const OtpForm: React.FC<OtpFormProps> = ({
    code,
    username,
    phone,
    handleBackToForm,
}) => {
    const [smsCode, setSmsCode] = useState<string>("");
    const [verifyUser, { isLoading }] = useVerifyMutation();
    const navigate = useNavigate();

    const handleVerify = async () => {
        await verifyUser({ username, code: smsCode })
            .then((res) => {
                toast.success("Login success !");
                navigate("/");

                useLocalStorage.setItem({
                    key: "token",
                    value: res.data.access_token,
                    isJson: true,
                });
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="relative flex flex-col gap-6 items-center justify-center w-full">
            <h1 className="text-2xl font-medium">Verify</h1>

            <p>{code}</p>

            <p>Your code was sent to {phone}</p>
            <OtpInput
                length={5}
                onChangeOtp={(otp) => {
                    if (otp.length === 5) {
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
                    disabled={isLoading}
                >
                    {isLoading ? "Verifying..." : "Verify"}
                </button>
            </div>

            <div className="flex items-center gap-2">
                <p className="text-sm">Didn't receive the code?</p>
                <button className="text-blue-500 underline">
                    Request again
                </button>
            </div>
        </div>
    );
};

export default OtpForm;
