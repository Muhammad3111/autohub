import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "../../utility/phone-input/PhoneInput";
import { CiLocationOn, CiMail, CiPhone, CiTimer } from "react-icons/ci";

type PartnerFormValues = {
    full_name: string;
    phone_number: string;
    workplace_name: string;
    message: string;
};

const AboutPartner = () => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<PartnerFormValues>({
        defaultValues: {
            full_name: "",
            phone_number: "",
            workplace_name: "",
            message: ""
        }
    });

    const phoneNumber = watch("phone_number");

    const onSubmit = (data: PartnerFormValues) => {
        console.log("Form Data:", data);
    };

    return (
        <div className='bg-white mt-10 flex items-center justify-between p-20'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-4 w-full bg-white'
            >
                <h1 className='text-2xl font-medium'>
                    Biz bilan hamkor bo'ling!
                </h1>

                <div className='flex flex-col gap-1'>
                    <label htmlFor='full_name' className='block mb-1'>
                        To'liq ismingiz
                    </label>
                    <input
                        {...register("full_name", { required: "Ism majburiy" })}
                        id='full_name'
                        className='w-full bg-transparent indent-2 h-10 ring-1 ring-grey focus-within:ring-2 focus-within:ring-primary outline-none duration-300'
                        placeholder="To'liq ismingizni kiriting"
                        autoComplete='off'
                    />
                    {errors.full_name && (
                        <span className='text-red-500 text-sm'>
                            {errors.full_name.message}
                        </span>
                    )}
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor='phone_number' className='block mb-1'>
                        Telefon raqam
                    </label>
                    <PhoneInput
                        value={phoneNumber}
                        onChange={(value: string) =>
                            setValue("phone_number", value)
                        }
                        isRegister={true}
                    />
                    {errors.phone_number && (
                        <span className='text-red-500 text-sm'>
                            {errors.phone_number.message}
                        </span>
                    )}
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor='workplace_name' className='block mb-1'>
                        Korxona nomi
                    </label>
                    <input
                        {...register("workplace_name", {
                            required: "Korxona nomi majburiy"
                        })}
                        id='workplace_name'
                        className='w-full bg-transparent indent-2 h-10 ring-1 ring-grey focus-within:ring-2 focus-within:ring-primary outline-none duration-300'
                        placeholder='Korxona nomini kiriting'
                        autoComplete='off'
                    />
                    {errors.workplace_name && (
                        <span className='text-red-500 text-sm'>
                            {errors.workplace_name.message}
                        </span>
                    )}
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor='message' className='block mb-1'>
                        Xabar
                    </label>
                    <textarea
                        {...register("message", { required: "Xabar majburiy" })}
                        id='message'
                        placeholder={t("contact-page.message")}
                        className='h-[200px] p-4 rounded-md outline-none text-lg border focus:border-primary duration-150 col-span-2'
                    ></textarea>
                    {errors.message && (
                        <span className='text-red-500 text-sm'>
                            {errors.message.message}
                        </span>
                    )}
                </div>

                <button
                    type='submit'
                    className='mt-4 bg-primary hover:bg-primary-hover text-white py-2 px-5 rounded-md'
                >
                    Yuborish
                </button>
            </form>

            <div className='grid grid-cols-2 items-center w-full gap-40'>
                <div className='flex flex-col items-center gap-1 group cursor-pointer'>
                    <div className='w-20 h-20 flex flex-col items-center justify-center text-5xl border text-[#aaa] group-hover:text-primary border-[#aaa] group-hover:border-primary rounded-full duration-150'>
                        <CiLocationOn />
                    </div>
                    <p className='text-[#aaa] group-hover:text-primary duration-150 text-center'>
                        Namangan Region, <br /> Namangan City
                    </p>
                </div>
                <div className='flex flex-col items-center gap-1 group cursor-pointer'>
                    <div className='w-20 h-20 flex flex-col items-center justify-center text-5xl border text-[#aaa] group-hover:text-primary border-[#aaa] group-hover:border-primary rounded-full duration-150'>
                        <CiMail />
                    </div>
                    <p className='text-[#aaa] group-hover:text-primary duration-150'>
                        info@example.com <br /> contact@example.com
                    </p>
                </div>
                <div className='flex flex-col items-center gap-1 group cursor-pointer'>
                    <div className='w-20 h-20 flex flex-col items-center justify-center text-5xl border text-[#aaa] group-hover:text-primary border-[#aaa] group-hover:border-primary rounded-full duration-150'>
                        <CiPhone />
                    </div>
                    <p className='text-[#aaa] group-hover:text-primary duration-150'>
                        +998 77 269 47 77 <br />
                        +998 99 919 31 11
                    </p>
                </div>
                <div className='flex flex-col items-center gap-1 group cursor-pointer'>
                    <div className='w-20 h-20 flex flex-col items-center justify-center text-5xl border text-[#aaa] group-hover:text-primary border-[#aaa] group-hover:border-primary rounded-full duration-150'>
                        <CiTimer />
                    </div>
                    <p className='text-[#aaa] group-hover:text-primary duration-150 text-center'>
                        Mon - Sat : 9am to 6pm <br /> Sunday : Closed
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPartner;
