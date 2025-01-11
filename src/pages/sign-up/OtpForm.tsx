import { useState } from "react";
import OtpInput from "../../utility/otp-input/OtpInput";
import {
    useLazyAuthDetailQuery,
    useVerifyMutation,
} from "../../features/auth/authApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";

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
    const [detailTrigger] = useLazyAuthDetailQuery();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleVerify = async () => {
        await verifyUser({ username, code: smsCode })
            .unwrap()
            .then((res: any) => {
                toast.success("Ro'yxatdan o'tish muvaffaqqiyatli bajarildi!");

                if (res.token) {
                    detailTrigger({ token: res.token.access })
                        .unwrap()
                        .then((authData) => {
                            if (authData) {
                                dispatch(
                                    setCredentials({
                                        accessToken: res.token.access,
                                        refreshToken: res.token.refresh,
                                        userData: authData,
                                    })
                                );
                            }
                        });
                }
                navigate("/");
            })
            .catch((err) => {
                toast.error(err.detail);
            });
    };

    return (
        <div className="relative flex flex-col gap-6 items-center justify-center w-full">
            <h1 className="text-2xl font-medium">Tasdiqlash</h1>

            <p>{code}</p>

            <p>Sms {phone} raqamga yuborildi!</p>
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
                    Bekor qilish
                </button>
                <button
                    onClick={handleVerify}
                    className="bg-primary text-white py-2 px-6 rounded"
                    disabled={isLoading}
                >
                    {isLoading ? "Tasdiqlash..." : "Tasdiqlash"}
                </button>
            </div>

            <div className="flex items-center gap-2">
                <p className="text-sm">Sms kod xali kelmadimi ?</p>
                <button className="text-prbg-primary underline">
                    Qayta jo'natish
                </button>
            </div>
        </div>
    );
};

export default OtpForm;
