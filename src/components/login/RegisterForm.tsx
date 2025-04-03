import { FiArrowLeft } from "react-icons/fi";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "../../utility/phone-input/PhoneInput";
import { useTranslation } from "react-i18next";

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
    loading
}: RegisterFormProps) => {
    const {
        handleSubmit,
        register,
        control,
        watch,
        formState: { errors, isValid },
        setValue
    } = useForm<AuthRegister>({
        defaultValues: {
            user_data: {
                first_name: "",
                last_name: "",
                avatar: "",
                role: "user"
            },
            staff_data: {
                workplace_name: "",
                region: "",
                city: "",
                address: "",
                avatar: "",
                working_hours: "",
                info: "",
                work_phone: "",
                stype: ""
            }
        },
        mode: "onChange"
    });

    const selectedRole = watch("user_data.role");
    const { t } = useTranslation();
    const handleRegister = (data: AuthRegister) => {
        const submitData: AuthRegister = {
            user_data: data.user_data,
            staff_data: data.staff_data
        };

        onSubmit(submitData);
    };

    return (
        <div className='w-full p-6 relative'>
            <button
                className='absolute top-4 left-4 text-gray-500 hover:text-gray-700 duration-150'
                onClick={onBack}
            >
                <FiArrowLeft size={20} />
            </button>

            <h2 className='text-xl font-bold text-center mb-4'>
                {t("auth-form.sign-up")}
            </h2>
            <p className='text-sm text-center text-gray-500 mb-6'>
                {t("auth-form.please-full-information")}
            </p>

            <form onSubmit={handleSubmit(handleRegister)}>
                <div className='mb-4'>
                    <label className='block mb-1' htmlFor='first_name'>
                        {t("auth-form.firstname")}
                    </label>
                    <input
                        id='first_name'
                        {...register("user_data.first_name", {
                            required: "Ismingiz majburiy"
                        })}
                        className='w-full bg-transparent indent-2 h-10 ring-1 ring-grey focus-within:ring-2 focus-within:ring-primary outline-none duration-300'
                        placeholder={t("auth-form.enter-your-firstname")}
                        autoComplete='off'
                    />
                    {errors.user_data?.first_name && (
                        <p className='text-red-500 text-xs mt-1'>
                            {errors.user_data.first_name.message}
                        </p>
                    )}
                </div>

                {selectedRole === "user" && (
                    <>
                        <div className='mb-4'>
                            <label className='block mb-1' htmlFor='last_name'>
                                {t("auth-form.lastname")} (
                                {t("auth-form.optional")})
                            </label>
                            <input
                                id='last_name'
                                {...register("user_data.last_name")}
                                className='w-full bg-transparent indent-2 h-10 ring-1 ring-grey focus-within:ring-2 focus-within:ring-primary outline-none duration-300'
                                placeholder={t("auth-form.enter-your-lastname")}
                                autoComplete='off'
                            />
                        </div>
                    </>
                )}

                {selectedRole !== "user" && (
                    <>
                        <div className='mb-4'>
                            <label
                                className='block mb-1'
                                htmlFor='workplace_name'
                            >
                                {t("auth-form.enter-workplace-name")}
                            </label>
                            <input
                                id='workplace_name'
                                {...register("staff_data.workplace_name", {
                                    required: "Ish joyi nomi majburiy"
                                })}
                                className='w-full bg-transparent indent-2 h-10 ring-1 ring-grey focus-within:ring-2 focus-within:ring-primary outline-none duration-300'
                                placeholder={`${t(
                                    "auth-form.for-example"
                                )}: BMW`}
                                autoComplete='off'
                            />
                            {errors.staff_data?.workplace_name && (
                                <p className='text-red-500 text-xs mt-1'>
                                    {errors.staff_data.workplace_name.message}
                                </p>
                            )}
                        </div>

                        <div className='mb-4'>
                            <label className='block mb-1' htmlFor='work_phone'>
                                {t("auth-form.work-phone")}
                            </label>
                            <Controller
                                name='staff_data.work_phone'
                                control={control}
                                rules={{
                                    required: "Ish telefoni majburiy",
                                    minLength: {
                                        value: 12,
                                        message:
                                            "Ish telefoni to‘liq kiritilishi kerak"
                                    }
                                }}
                                render={({ field }) => (
                                    <PhoneInput
                                        isRegister
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.staff_data?.work_phone && (
                                <p className='text-red-500 text-xs mt-1'>
                                    {errors.staff_data.work_phone.message}
                                </p>
                            )}
                        </div>
                    </>
                )}

                <div className='mb-4'>
                    <label className='block mb-1' htmlFor='role'>
                        {t("auth-form.select-role")}
                    </label>
                    <select
                        id='role'
                        {...register("user_data.role", {
                            required: "Role tanlash majburiy",
                            onChange: (e) =>
                                setValue(
                                    "staff_data.stype",
                                    e.target.value === "staff"
                                        ? "dealer"
                                        : "service"
                                )
                        })}
                        className='w-full bg-transparent indent-2 h-10 ring-1 ring-grey focus:ring-2 focus:ring-primary outline-none duration-300'
                    >
                        <option value='user'>{t("auth-form.user-role")}</option>
                        <option value='staff'>
                            {t("auth-form.staff-role")}
                        </option>
                    </select>

                    {errors.user_data?.role && (
                        <p className='text-red-500 text-xs mt-1'>
                            {errors.user_data.role.message}
                        </p>
                    )}
                </div>

                <div className='flex justify-between mt-6'>
                    <button
                        type='button'
                        onClick={cancel}
                        className='w-[48%] bg-gray-200 text-black p-2.5 rounded hover:bg-gray-300 duration-150'
                    >
                        {t("auth-form.cancel")}
                    </button>

                    <button
                        type='submit'
                        disabled={!isValid || loading}
                        className={`w-[48%] p-1 rounded text-white ${
                            isValid
                                ? "bg-primary hover:bg-primary-hover"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        {t("auth-form.sign-up")} {loading && "..."}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
