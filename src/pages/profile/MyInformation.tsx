import { FiCamera } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut, selectCurrentUserData } from "../../features/auth/authSlice";
import { useRef, useState } from "react";

type InputState = {
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
};

const MyInformation = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isChangeInput, setIsChangeInput] = useState<boolean>(false);
    const userData = useSelector(selectCurrentUserData);
    console.log(userData);

    const profilePhoto = useRef<HTMLInputElement>(null);
    const [formState, setFormState] = useState<InputState>({
        name: "",
        surname: "",
        phoneNumber: "",
        email: "",
    });

    const handleLogout = () => {
        dispatch(logOut());
        navigate("/");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        const hasValue = Object.values({ ...formState, [name]: value }).some(
            (val) => val.trim() !== ""
        );
        setIsChangeInput(hasValue);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log("Tanlangan fayl:", file);
        }
    };

    const handleButtonClick = () => {
        profilePhoto.current?.click();
    };

    return (
        <div className="w-full h-full border border-[#ccc] rounded-md p-10">
            <h1 className="text-xl font-medium mb-10">Ma'lumotlarim</h1>
            <div className="flex gap-20">
                <div>
                    <button
                        className="w-[200px] h-[200px] bg-white rounded flex items-center justify-center cursor-pointer"
                        onClick={handleButtonClick}
                    >
                        <FiCamera className="text-5xl text-[#aaa]" />
                    </button>

                    <input
                        type="file"
                        accept="image/*"
                        ref={profilePhoto}
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                </div>
                <div className="grid grid-cols-2 flex-1 gap-10">
                    <div className="flex flex-col w-full gap-1">
                        <label
                            htmlFor="name"
                            className="font-semibold text-gray-500"
                        >
                            Ism
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="h-[50px] indent-4 rounded-md outline-none text-lg border focus:border-[#aaa] duration-150"
                            value={formState.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label
                            htmlFor="surname"
                            className="font-semibold text-gray-500"
                        >
                            Familiya
                        </label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            className="h-[50px] indent-4 rounded-md outline-none text-lg border focus:border-[#aaa] duration-150"
                            value={formState.surname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label
                            htmlFor="phoneNumber"
                            className="font-semibold text-gray-500"
                        >
                            Telefon raqam
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            className="h-[50px] indent-4 rounded-md outline-none text-lg border focus:border-[#aaa] duration-150"
                            value={formState.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label
                            htmlFor="email"
                            className="font-semibold text-gray-500"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="h-[50px] indent-4 rounded-md outline-none text-lg border focus:border-[#aaa] duration-150"
                            value={formState.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <div className="w-full flex items-center justify-between mt-10">
                <button
                    onClick={handleLogout}
                    className="text-lg text-red-500 px-8 py-2 rounded hover:bg-red-200 duration-150"
                >
                    Tizimdan chiqish
                </button>
                <div className="flex items-center gap-2">
                    {isChangeInput && (
                        <button className="py-2 text-lg px-8 rounded hover:bg-[#ddd] duration-150">
                            Bekor qilish
                        </button>
                    )}
                    <button className="py-2 text-lg bg-primary text-white px-8 rounded hover:bg-primary-hover duration-150">
                        Saqlash
                    </button>
                </div>
            </div>
        </div>
    );
};
export default MyInformation;