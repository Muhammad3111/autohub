import Header from "../../components/header/Header";
import { FiUser } from "react-icons/fi";
import { MdOutlineVpnKey } from "react-icons/md";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    useLazyAuthDetailQuery,
    useLoginMutation,
} from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { getFromLocalStorage } from "../../hooks/useGetFromLocalStorage";

type LoginInput = {
    username: string;
    password: string;
};

const SignIn = () => {
    const [isShow, setIsShow] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<LoginInput>();
    const [login, { isLoading }] = useLoginMutation();
    const [detailTrigger] = useLazyAuthDetailQuery();
    const dispatch = useDispatch();

    const handleLogin: SubmitHandler<LoginInput> = async (data) => {
        await login(data)
            .unwrap()
            .then((res) => {
                if (res.access) {
                    dispatch(
                        setCredentials({
                            accessToken: res.access,
                            refreshToken: res.refresh,
                        })
                    );

                    let accessToken = getFromLocalStorage("accessToken", null);

                    detailTrigger({ token: accessToken })
                        .unwrap()
                        .then((authData) => {
                            if (authData) {
                                toast.success(
                                    "Kirish muvaffaqqiyatli bajarildi!"
                                );
                                reset();
                                dispatch(
                                    setCredentials({
                                        accessToken: res.access,
                                        refreshToken: res.refresh,
                                        userData: authData,
                                    })
                                );
                                navigate("/");
                            }
                        });
                } else {
                    console.log(res);
                }
            })
            .catch((err) => {
                toast.error(err.data.detail);
            });
    };

    return (
        <div className="flex flex-col items-center gap-20 bg-white">
            <Header title="Kirish" />

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="w-[400px] min-h-[450px] bg-white rounded shadow-custom p-10"
            >
                <h1 className="text-center text-2xl font-medium">Kirish</h1>

                <div className="mb-4">
                    <div className="flex items-center relative mt-8">
                        <div className="absolute left-2">
                            <FiUser className="text-xl" />
                        </div>
                        <input
                            type="text"
                            {...register("username", {
                                required: "Foydalanuvchi nomi majburiy",
                            })}
                            placeholder="Foydalanuvchi nomi"
                            className={`border w-full outline-none h-10 rounded text-sm indent-9 font-medium ${
                                errors.username && "border-red-500"
                            }`}
                        />
                    </div>
                    {errors.username && (
                        <span className="text-red-500 text-sm">
                            {errors.username.message}
                        </span>
                    )}
                </div>

                <div className="mb-4">
                    <div className="flex items-center relative mt-8">
                        <div className="absolute left-2">
                            <MdOutlineVpnKey className="text-xl" />
                        </div>
                        <input
                            type={isShow ? "text" : "password"}
                            placeholder="Parol"
                            {...register("password", {
                                required: "Parol majburiy",
                            })}
                            className={`border w-full outline-none h-10 rounded text-sm indent-9 font-medium ${
                                errors.password && "border-red-500"
                            }`}
                        />

                        {watch("password") && watch("password").length > 0 && (
                            <button
                                type="button"
                                className="absolute right-2.5 text-xl"
                            >
                                {isShow ? (
                                    <BiHide onClick={() => setIsShow(false)} />
                                ) : (
                                    <BiShow onClick={() => setIsShow(true)} />
                                )}
                            </button>
                        )}
                    </div>
                    {errors.password && (
                        <span className="text-red-500 text-sm">
                            {errors.password.message}
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full font-medium bg-primary hover:bg-primary-hover duration-150 text-white rounded h-10"
                >
                    {isLoading ? "Kirish..." : "Kirish"}
                </button>

                <div className="flex items-center gap-2 mt-6">
                    <div className="w-full h-[2px] bg-gray-200"></div>
                    <p className="font-medium text-sm text-gray-400">Yoki</p>
                    <div className="w-full h-[2px] bg-gray-200"></div>
                </div>

                <button
                    onClick={() => navigate("/sign-up")}
                    type="button"
                    className="w-full font-medium border-2 rounded h-10 mt-10"
                >
                    Ro'yxatdan o'tish
                </button>
            </form>
        </div>
    );
};

export default SignIn;
