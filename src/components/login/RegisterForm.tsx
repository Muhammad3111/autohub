import { FiArrowLeft } from "react-icons/fi";
import { useForm } from "react-hook-form";

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
        formState: { errors, isValid },
    } = useForm<AuthRegister>({
        defaultValues: {
            phone_number: "",
            first_name: "",
            last_name: "",
            role: "user",
        },
        mode: "onChange",
        shouldUnregister: false,
    });

    const handleRegister = (data: AuthRegister) => {
        onSubmit(data);
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
                        To'liq ism
                    </label>
                    <input
                        id="first_name"
                        type="text"
                        {...register("first_name", {
                            required: "Ism majburiy",
                        })}
                        className="w-full bg-transparent indent-2 h-10 ring-1 ring-grey focus-within:ring-2 focus-within:ring-primary outline-none duration-300"
                        placeholder="Ismingizni kiriting"
                        autoComplete="off"
                    />
                    {errors.first_name?.message && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.first_name.message}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="last_name">
                        To'liq ism
                    </label>
                    <input
                        id="last_name"
                        type="text"
                        {...register("last_name")}
                        className="w-full bg-transparent indent-2 h-10 ring-1 ring-grey focus-within:ring-2 focus-within:ring-primary outline-none duration-300"
                        placeholder="Familiya kiriting ( ixtiyoriy )"
                        autoComplete="off"
                    />
                    {errors.last_name?.message && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.last_name.message}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block mb-1" htmlFor="role">
                        Role tanlang
                    </label>
                    <select
                        id="role"
                        {...register("role", {
                            required: "Role tanlash majburiy",
                        })}
                        className="w-full bg-transparent indent-2 h-10 ring-1 ring-grey focus-within:ring-2 focus-within:ring-primary outline-none duration-300"
                        defaultValue="user"
                    >
                        <option value="user">User</option>
                        <option value="dealer">Dealer</option>
                        <option value="service">Service</option>
                    </select>
                    {errors.role?.message && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.role.message}
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
                        className={`w-[48%] p-2.5 rounded text-white ${
                            isValid
                                ? "bg-primary hover:bg-primary-hover"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!isValid || loading}
                    >
                        Ro'yxatdan o'tish{loading && "..."}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
