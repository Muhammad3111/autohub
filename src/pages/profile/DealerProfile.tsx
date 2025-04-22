import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../features/auth/authSlice";
import { useRef, useState } from "react";
import { PatternFormat } from "react-number-format";
import { BsCardImage } from "react-icons/bs";
import { FiCamera } from "react-icons/fi";
import { useUpdateProfileMutation } from "../../features/auth/authApiSlice";

type InputState = {
    workplace_name: string;
    region: string;
    city: string;
    address: string;
    work_phone: string;
    info: string;
    working_hours: string;
    phone_number: string;
    avatar: string;
};

type DealerProfileProps = {
    userData: UserDataType;
};

const getUpdatedFields = <T extends Record<string, any>>(
    original: T,
    updated: T
) => {
    const staff_data: Partial<T> = {};

    Object.keys(updated).forEach((key) => {
        const typedKey = key as keyof T;
        if (
            JSON.stringify(original[typedKey]) !==
            JSON.stringify(updated[typedKey])
        ) {
            staff_data[typedKey] = updated[typedKey];
        }
    });

    return { staff_data };
};

const DealerProfile = ({ userData }: DealerProfileProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isChangeInput, setIsChangeInput] = useState<boolean>(false);
    const [updateAuth] = useUpdateProfileMutation();

    const avatarRef = useRef<HTMLInputElement>(null);
    const bannerRef = useRef<HTMLInputElement>(null);

    const [banner, setBanner] = useState<string>("");

    const [formState, setFormState] = useState<InputState>({
        workplace_name: userData.workplace_name || "",
        region: userData.region || "",
        city: userData.city || "",
        address: userData.address || "",
        work_phone: userData.phone_number,
        info: userData.info || "",
        working_hours: userData.working_hours || "",
        phone_number: userData.phone_number || "",
        avatar: userData.avatar || ""
    });

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        type: "avatar" | "banner"
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === "avatar") {
                    setFormState((prevState) => ({
                        ...prevState,
                        avatar: reader.result as string
                    }));
                } else {
                    setBanner(reader.result as string);
                }
                setIsChangeInput(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogout = () => {
        dispatch(logOut());
        navigate("/");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));

        setIsChangeInput(true);
    };

    const handleSave = async () => {
        const updatedFields = getUpdatedFields(
            {
                workplace_name: userData.workplace_name,
                region: userData.region,
                city: userData.city,
                address: userData.address,
                work_phone: userData.phone_number,
                info: userData.info,
                working_hours: userData.working_hours,
                phone_number: userData.phone_number,
                avatar: userData.avatar
            },
            formState
        );

        if (Object.keys(updatedFields.staff_data).length === 0 && !banner) {
            console.log("O‘zgarish topilmadi.");
            return;
        }

        try {
            await updateAuth({
                staff_data: updatedFields.staff_data
            }).unwrap();
            setIsChangeInput(false);
        } catch (err) {
            console.error("Profilni yangilashda xatolik:", err);
        }
    };

    const handleCancel = () => {
        setFormState({
            workplace_name: userData.workplace_name || "",
            region: userData.region || "",
            city: userData.city || "",
            address: userData.address || "",
            work_phone: userData.phone_number,
            info: userData.info || "",
            working_hours: userData.working_hours || "",
            phone_number: userData.phone_number || "",
            avatar: userData.avatar || ""
        });

        setIsChangeInput(false);
    };

    return (
        <div className='w-full h-full border border-[#ccc] rounded-md p-10 mb-10'>
            <h1 className='text-xl font-medium mb-10'>Ma'lumotlarim</h1>

            <div className='flex justify-between w-full gap-52'>
                <div
                    onClick={() => avatarRef.current?.click()}
                    className='w-48 h-48 rounded-full overflow-hidden bg-gray-200 relative mx-auto'
                >
                    {formState.avatar ? (
                        <img
                            src={formState.avatar}
                            alt='Avatar'
                            className='w-full h-full object-cover cursor-pointer'
                        />
                    ) : (
                        <FiCamera className='text-7xl text-primary absolute inset-0 m-auto cursor-pointer' />
                    )}
                    <input
                        type='file'
                        accept='image/*'
                        ref={avatarRef}
                        onChange={(e) => handleImageChange(e, "avatar")}
                        style={{ display: "none" }}
                    />
                </div>
                <div
                    onClick={() => bannerRef.current?.click()}
                    className='flex-1 h-52 bg-gray-200 rounded-md flex items-center justify-center relative'
                >
                    {banner ? (
                        <img
                            src={banner}
                            alt='Banner'
                            className='w-full h-full object-cover rounded-md cursor-pointer'
                        />
                    ) : (
                        <BsCardImage className='text-9xl text-[#aaa] cursor-pointer' />
                    )}
                    <input
                        type='file'
                        accept='image/*'
                        ref={bannerRef}
                        onChange={(e) => handleImageChange(e, "banner")}
                        style={{ display: "none" }}
                    />
                </div>
            </div>

            <div className='flex flex-col gap-10 mt-10'>
                <div className='grid grid-cols-2 flex-1 gap-10'>
                    <div className='flex flex-col w-full gap-1'>
                        <label
                            htmlFor='workplace_name'
                            className='font-semibold text-gray-500'
                        >
                            Korxona nomi
                        </label>
                        <input
                            type='text'
                            name='workplace_name'
                            id='workplace_name'
                            className='h-[50px] indent-4 rounded-md outline-none text-lg border focus:border-primary duration-150'
                            value={formState.workplace_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-1'>
                        <label
                            htmlFor='region'
                            className='font-semibold text-gray-500'
                        >
                            Viloyat
                        </label>
                        <input
                            type='text'
                            id='region'
                            name='region'
                            className='h-[50px] indent-4 rounded-md outline-none text-lg border focus:border-primary duration-150'
                            value={formState.region}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-1'>
                        <label
                            htmlFor='city'
                            className='font-semibold text-gray-500'
                        >
                            Shahar
                        </label>
                        <input
                            type='text'
                            id='city'
                            name='city'
                            className='h-[50px] indent-4 rounded-md outline-none text-lg border focus:border-primary duration-150'
                            value={formState.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-1'>
                        <label
                            htmlFor='address'
                            className='font-semibold text-gray-500'
                        >
                            Manzil
                        </label>
                        <input
                            type='text'
                            id='address'
                            name='address'
                            className='h-[50px] indent-4 rounded-md outline-none text-lg border focus:border-primary duration-150'
                            value={formState.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-1'>
                        <label
                            htmlFor='phone_number'
                            className='font-semibold text-gray-500'
                        >
                            Profile telefon raqami
                        </label>
                        <PatternFormat
                            className='h-[50px] indent-4 rounded-md outline-none text-lg border focus:border-primary duration-150'
                            format='+### ## ### ## ##'
                            placeholder='+998'
                            value={formState.phone_number}
                            onChange={handleChange}
                            name='phone_number'
                            id='phone_number'
                            disabled
                        />
                    </div>
                </div>

                <div className='flex items-center justify-between w-full'>
                    <button
                        onClick={handleLogout}
                        className='text-lg text-red-500 px-8 py-2 rounded hover:bg-red-200 duration-150'
                    >
                        Tizimdan chiqish
                    </button>
                    <div className='flex items-center justify-end gap-2'>
                        {isChangeInput && (
                            <button
                                onClick={handleCancel}
                                className='py-2 text-lg px-8 rounded hover:bg-[#ddd] duration-150'
                            >
                                Bekor qilish
                            </button>
                        )}
                        {isChangeInput && (
                            <button
                                onClick={handleSave}
                                className='py-2 text-lg bg-primary text-white px-8 rounded hover:bg-primary-hover duration-150'
                            >
                                Saqlash
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DealerProfile;
