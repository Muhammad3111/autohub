import { FiArrowLeft } from "react-icons/fi";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "../../utility/phone-input/PhoneInput";

type RegisterFormProps = {
    onBack: () => void;
    onSubmit: (data: AuthRegister) => void;
    cancel: () => void;
    loading: boolean;
};

const RegisterForm = ({
    onBack,
    onSubmit,
    cancel,
    loading,
}: RegisterFormProps) => {
    const {
        handleSubmit,
        register,
        control,
        watch,
        formState: { errors, isValid },
    } = useForm<AuthRegister>({
        defaultValues: {
            user_data: {
                first_name: "",
                last_name: "",
                avatar: "",
                phone_number: "",
                role: "user",
            },
            dealer_data: {
                workplace_name: "",
                region: "",
                city: "",
                address: "",
                avatar: "",
                working_hours: "",
                info: "",
                work_phone: "",
            },
        },
        mode: "onChange",
    });

    const selectedRole = watch("user_data.role");

    const handleRegister = (data: AuthRegister) => {
        const submitData: AuthRegister = {
            user_data: data.user_data,
            dealer_data:
                selectedRole !== "user"
                    ? data.dealer_data
                    : ({} as AuthRegister["dealer_data"]),
        };

        onSubmit(submitData);
        cancel();
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
                Ro'yxatdan o'tish
            </h2>
            <p className="text-sm text-center text-gray-500 mb-6">
                Iltimos, ma'lumotlaringizni to'ldiring
            </p>

            <form onSubmit={handleSubmit(handleRegister)}>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="first_name">
                        Ismingiz
                    </label>
                    <input
                        id="first_name"
                        {...register("user_data.first_name", {
                            required: "Ismingiz majburiy",
                        })}
                        className="w-full bg-transparent indent-2 h-10 ring-1 ring-grey focus-within:ring-2 focus-within:ring-primary outline-none duration-300"
                        placeholder="Ismingiz"
                        autoComplete="off"
                    />
                    {errors.user_data?.first_name && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.user_data.first_name.message}
                        </p>
                    )}
                </div>

                {selectedRole === "user" && (
                    <>
                        <div className="mb-4">
                            <label className="block mb-1" htmlFor="last_name">
                                Familiyangiz (ixtiyoriy)
                            </label>
                            <input
                                id="last_name"
                                {...register("user_data.last_name")}
                                className="w-full bg-transparent indent-2 h-10 ring-1 ring-grey focus-within:ring-2 focus-within:ring-primary outline-none duration-300"
                                placeholder="Familiyangiz"
                                autoComplete="off"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                className="block mb-1"
                                htmlFor="phone_number"
                            >
                                Telefon raqam
                            </label>
                            <Controller
                                name="user_data.phone_number"
                                control={control}
                                rules={{
                                    required: "Telefon raqam majburiy",
                                    minLength: {
                                        value: 12,
                                        message:
                                            "Telefon raqami to‘liq kiritilishi kerak",
                                    },
                                }}
                                render={({ field }) => (
                                    <PhoneInput
                                        isRegister
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.user_data?.phone_number && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.user_data.phone_number.message}
                                </p>
                            )}
                        </div>
                    </>
                )}

                {selectedRole !== "user" && (
                    <>
                        <div className="mb-4">
                            <label
                                className="block mb-1"
                                htmlFor="workplace_name"
                            >
                                Ish joyi nomi
                            </label>
                            <input
                                id="workplace_name"
                                {...register("dealer_data.workplace_name", {
                                    required: "Ish joyi nomi majburiy",
                                })}
                                className="w-full bg-transparent indent-2 h-10 ring-1 ring-grey focus-within:ring-2 focus-within:ring-primary outline-none duration-300"
                                placeholder="Masalan: AutoSalon"
                                autoComplete="off"
                            />
                            {errors.dealer_data?.workplace_name && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.dealer_data.workplace_name.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1" htmlFor="work_phone">
                                Ish telefoni
                            </label>
                            <Controller
                                name="dealer_data.work_phone"
                                control={control}
                                rules={{
                                    required: "Ish telefoni majburiy",
                                    minLength: {
                                        value: 12,
                                        message:
                                            "Ish telefoni to‘liq kiritilishi kerak",
                                    },
                                }}
                                render={({ field }) => (
                                    <PhoneInput
                                        isRegister
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.dealer_data?.work_phone && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.dealer_data.work_phone.message}
                                </p>
                            )}
                        </div>
                    </>
                )}

                <div className="mb-4">
                    <label className="block mb-1" htmlFor="role">
                        Rolini tanlang
                    </label>
                    <select
                        id="role"
                        {...register("user_data.role", {
                            required: "Role tanlash majburiy",
                        })}
                        className="w-full bg-transparent indent-2 h-10 ring-1 ring-grey focus:ring-2 focus:ring-primary outline-none duration-300"
                    >
                        <option value="user">User</option>
                        <option value="dealer">Dealer</option>
                        <option value="service">Service</option>
                    </select>
                    {errors.user_data?.role && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.user_data.role.message}
                        </p>
                    )}
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={cancel}
                        className="w-[48%] bg-gray-200 text-black p-2.5 rounded hover:bg-gray-300 duration-150"
                    >
                        Bekor qilish
                    </button>

                    <button
                        type="submit"
                        disabled={!isValid || loading}
                        className={`w-[48%] p-1 rounded text-white ${
                            isValid
                                ? "bg-primary hover:bg-primary-hover"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Ro'yxatdan o'tish {loading && "..."}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
