import { FiCamera } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../features/auth/authSlice";
import { useRef, useState } from "react";
import { PatternFormat } from "react-number-format";

type UserProfileProps = {
    userData: UserDataType;
};

const UserProfile = ({ userData }: UserProfileProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isChangeInput, setIsChangeInput] = useState<boolean>(false);

    const profilePhoto = useRef<HTMLInputElement>(null);
    const [formState, setFormState] = useState<UserDataType>({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        role: userData.role || "",
        phone_number: userData.phone_number || "",
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

    const handleSave = () => {
        setIsChangeInput(false);
    };

    const handleCancel = () => {
        setFormState({
            first_name: "",
            last_name: "",
            role: "",
            phone_number: "",
        });

        setIsChangeInput(false);
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
                            htmlFor="first_name"
                            className="font-semibold text-gray-500"
                        >
                            Ism
                        </label>
                        <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            className="h-[50px] indent-4 rounded-md outline-none text-lg border focus:border-[#aaa] duration-150"
                            value={formState.first_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label
                            htmlFor="last_name"
                            className="font-semibold text-gray-500"
                        >
                            Familiya
                        </label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            className="h-[50px] indent-4 rounded-md outline-none text-lg border focus:border-[#aaa] duration-150"
                            value={formState.last_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label
                            htmlFor="phone_number"
                            className="font-semibold text-gray-500"
                        >
                            Telefon raqam
                        </label>
                        <PatternFormat
                            className="h-[50px] indent-4 rounded-md outline-none text-lg border focus:border-[#aaa] duration-150"
                            format="+998 ## ### ## ##"
                            placeholder="+998"
                            value={formState.phone_number}
                            onChange={handleChange}
                            name="phone_number"
                            id="phone_number"
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
                        <button
                            onClick={handleCancel}
                            className="py-2 text-lg px-8 rounded hover:bg-[#ddd] duration-150"
                        >
                            Bekor qilish
                        </button>
                    )}
                    {isChangeInput && (
                        <button
                            onClick={handleSave}
                            className="py-2 text-lg bg-primary text-white px-8 rounded hover:bg-primary-hover duration-150"
                        >
                            Saqlash
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
export default UserProfile;
