import { FiX } from "react-icons/fi";
import Modal from "../modal/Modal";
import PhoneInput from "../../utility/phone-input/PhoneInput";
import { useState } from "react";

type LoginProps = {
    openLogin: boolean;
    setOpenLogin: (openLogin: boolean) => void;
};

const Login = ({ openLogin, setOpenLogin }: LoginProps) => {
    const [number, setNumber] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let phoneNumber = `+998${number.split(" ").join("")}`;
        console.log(phoneNumber);
    };

    return (
        <Modal isOpen={openLogin} onClose={() => setOpenLogin(false)}>
            <div className="bg-white rounded-2xl w-full p-6">
                <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl duration-150"
                    onClick={() => setOpenLogin(false)}
                >
                    <FiX />
                </button>
                <h2 className="text-xl font-bold text-center mb-4">
                    Telefon raqamingizni kiriting
                </h2>
                <p className="text-sm text-center text-gray-500 mb-6">
                    Tasdiqlash kodini SMS orqali yuboramiz
                </p>
                <form onSubmit={handleSubmit}>
                    <PhoneInput value={number} onChange={setNumber} />
                    <button
                        type="submit"
                        className="w-full bg-primary text-white p-2.5 text-sm mt-5 hover:bg-primary-hover duration-150 rounded"
                    >
                        Kodni olish
                    </button>
                </form>
                <p className="text-xs text-center text-gray-500 mt-4">
                    Avtorizatsiyadan o'tish orqali siz{" "}
                    <span className="text-blue-500 underline cursor-pointer">
                        shaxsiy ma'lumotlarni qayta ishlash siyosatiga
                    </span>{" "}
                    rozilik bildirasiz
                </p>
            </div>
        </Modal>
    );
};
export default Login;
