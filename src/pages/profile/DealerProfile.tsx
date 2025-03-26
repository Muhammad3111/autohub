import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../features/auth/authSlice";
import { useRef, useState } from "react";
import { PatternFormat } from "react-number-format";
import { BsCardImage } from "react-icons/bs";
import { FiCamera } from "react-icons/fi";

type InputState = {
    workplace_name: string;
    region: string;
    city: string;
    address: string;
    contact_number: string;
    info: string;
    working_hours: string;
};

type DealerProfileProps = {
    userData: UserDataType;
};

const DealerProfile = ({ userData }: DealerProfileProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isChangeInput, setIsChangeInput] = useState<boolean>(false);

    const profilePhoto = useRef<HTMLInputElement>(null);
    const [formState, setFormState] = useState<InputState>({
        workplace_name: "",
        region: "",
        city: "",
        address: "",
        contact_number: userData.phone_number,
        info: "",
        working_hours: "",
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
            workplace_name: "",
            region: "",
            city: "",
            address: "",
            contact_number: "",
            info: "",
            working_hours: "",
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
        <div className="w-full h-full border border-[#ccc] rounded-md p-10 mb-10">
            <h1 className="text-xl font-medium mb-10">Ma'lumotlarim</h1>
            <div className="flex flex-col gap-20">
                <div className="flex items-center gap-20">
                    <div>
                        <button
                            className="w-[250px] h-[250px] bg-white rounded-full flex items-center justify-center cursor-pointer"
                            onClick={handleButtonClick}
                        >
                            <FiCamera className="text-7xl text-[#aaa]" />
                        </button>

                        <p className="text-center mt-2 font-semibold text-gray-500">
                            Avatar
                        </p>

                        <input
                            type="file"
                            accept="image/*"
                            ref={profilePhoto}
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                    </div>
                    <div className="w-full">
                        <button
                            className="w-full h-[300px] bg-white rounded flex items-center justify-center cursor-pointer"
                            onClick={handleButtonClick}
                        >
                            <BsCardImage className="text-9xl text-[#aaa]" />
                        </button>

                        <p className="text-center mt-2 font-semibold text-gray-500">
                            Korxona rasmi
                        </p>

                        <input
                            type="file"
                            accept="image/*"
                            ref={profilePhoto}
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 flex-1 gap-10">
                    <div className="flex flex-col w-full gap-1">
                        <label
                            htmlFor="workplace_name"
                            className="font-semibold text-gray-500"
                        >
                            Korxona nomi
                        </label>
                        <input
                            type="text"
                            name="workplace_name"
                            id="workplace_name"
                            className="h-[50px] indent-4 rounded-md outline-none text-lg border focus:border-[#aaa] duration-150"
                            value={formState.workplace_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label
                            htmlFor="region"
                            className="font-semibold text-gray-500"
                        >
                            Viloyat
                        </label>
                        <input
                            type="text"
                            id="region"
                            name="region"
                            className="h-[50px] indent-4 rounded-md outline-none text-lg border focus:border-[#aaa] duration-150"
                            value={formState.region}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label
                            htmlFor="city"
                            className="font-semibold text-gray-500"
                        >
                            Shahar
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            className="h-[50px] indent-4 rounded-md outline-none text-lg border focus:border-[#aaa] duration-150"
                            value={formState.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label
                            htmlFor="address"
                            className="font-semibold text-gray-500"
                        >
                            Manzil
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            className="h-[50px] indent-4 rounded-md outline-none text-lg border focus:border-[#aaa] duration-150"
                            value={formState.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label
                            htmlFor="info"
                            className="font-semibold text-gray-500"
                        >
                            Informatsiya
                        </label>
                        <input
                            type="text"
                            id="info"
                            name="info"
                            className="h-[50px] indent-4 rounded-md outline-none text-lg border focus:border-[#aaa] duration-150"
                            value={formState.info}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label
                            htmlFor="working_hours"
                            className="font-semibold text-gray-500"
                        >
                            Ish vaqtlari
                        </label>
                        <input
                            type="text"
                            id="working_hours"
                            name="working_hours"
                            className="h-[50px] indent-4 rounded-md outline-none text-lg border focus:border-[#aaa] duration-150"
                            value={formState.working_hours}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label
                            htmlFor="contact_number"
                            className="font-semibold text-gray-500"
                        >
                            Telefon raqam
                        </label>
                        <PatternFormat
                            className="h-[50px] indent-4 rounded-md outline-none text-lg border focus:border-[#aaa] duration-150"
                            format="+### ## ### ## ##"
                            placeholder="+998"
                            value={formState.contact_number}
                            onChange={handleChange}
                            name="contact_number"
                            id="contact_number"
                        />
                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label
                            htmlFor=""
                            className="font-semibold text-gray-500 invisible"
                        >
                            Telefon raqam
                        </label>
                        <div className="flex items-center justify-end gap-2">
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
            </div>

            <button
                onClick={handleLogout}
                className="text-lg text-red-500 px-8 py-2 rounded hover:bg-red-200 duration-150 mt-10"
            >
                Tizimdan chiqish
            </button>
        </div>
    );
};
export default DealerProfile;
