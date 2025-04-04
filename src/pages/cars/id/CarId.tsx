import { useNavigate, useParams } from "react-router-dom";
import { useGetCarByIdQuery } from "../../../features/cars/carSlice";
import Header from "../../../components/header/Header";
import ModelViewer from "../../../utility/Model/Model";
import { RiFullscreenLine } from "react-icons/ri";
import {
    useAddCommentMutation,
    useGetCommentQuery
} from "../../../features/blogs/blogs";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectCurrentUserData } from "../../../features/auth/authSlice";
import Rating from "../../../utility/rating/Rating";
import { useState } from "react";
import defaultImg from "../../../assets/dealer-default-img.png";
import { useTranslation } from "react-i18next";

export default function CarId() {
    const { id } = useParams<{ id: string }>();
    const { register, reset, handleSubmit } = useForm<Comments>();
    const [addComment] = useAddCommentMutation();
    const userData = useSelector(selectCurrentUserData);
    const { data, isLoading } = useGetCarByIdQuery(id!);
    const car: CarObject = data;
    const [carRating, setCarRating] = useState<number>(car?.rating || 0);
    const { data: comments = [] } = useGetCommentQuery({
        target_id: id!,
        target_type: "vehicle"
    });
    const [showAllComments, setShowAllComments] = useState(false);
    const visibleComments = showAllComments
        ? comments ?? []
        : comments?.slice(0, 3) ?? [];

    const navigate = useNavigate();
    const { t } = useTranslation();
    if (isLoading) {
        return <h1>{t("loading")}...</h1>;
    }

    const onSubmit: SubmitHandler<Comments> = async (data) => {
        const commentData = {
            target_id: id,
            target_type: "vehicle",
            rating: carRating,
            comment: data.comment
        };

        try {
            await addComment(commentData)
                .unwrap()
                .then(() => {
                    toast.success("Kommentariyangiz yuborildi!");
                    reset();
                    setCarRating(car.rating!);
                });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='flex flex-col gap-4 w-full pb-5'>
            <Header title={car.name_uz} />
            <div className='flex flex-col gap-4 py-5 my-container'>
                <h1 className='text-4xl font-bold capitalize'>{car.name_uz}</h1>
                <div className='flex gap-4'>
                    <div className='basis-1/2 flex gap-2'>
                        <div className='w-full h-[350px] bg-gray-300 relative'>
                            <ModelViewer />
                            <button className='bg-primary text-white text-sm px-2 py-1 absolute bottom-2 left-2'>
                                Barcha rasmlarni ko'rish
                            </button>
                            <button
                                onClick={() =>
                                    navigate(`/cars/3dmodel/panorama`)
                                }
                                className='absolute bottom-2 right-2'
                            >
                                <RiFullscreenLine className='text-2xl' />
                            </button>
                        </div>
                        <div className='grid grid-cols-1 gap-2 w-full items-start'>
                            {car.images?.slice(0, 3).map((img, ind) => (
                                <div key={ind}>
                                    <img
                                        src={`http://89.223.126.64:8080/api/${img}`}
                                        alt={img}
                                        className='w-full h-[110px] object-cover'
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() =>
                                navigate(`/cars/parametrs/${car.id}`)
                            }
                        >
                            Konfiguratisa
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex justify-between gap-20'>
                <div className='w-full'>
                    <div>
                        <div>
                            <h1 className='text-xl font-normal'>
                                Comments{" "}
                                <span className='text-base text-gray-500'>
                                    ({comments?.length})
                                </span>
                            </h1>

                            <div className='flex flex-col mt-4'>
                                {visibleComments.map((comment) => (
                                    <div
                                        key={comment.id}
                                        className='py-4 first:border-t border-b flex gap-2 w-full relative min-h-32'
                                    >
                                        <div className='w-10 h-10 rounded-full'>
                                            <img
                                                src={defaultImg}
                                                alt=''
                                                className='w-full h-full object-cover border rounded-full'
                                            />
                                        </div>
                                        <div className='w-full'>
                                            <h1 className='text-sm'>
                                                Anonymous
                                            </h1>
                                            <p>{comment.comment}</p>
                                        </div>
                                        <p className='absolute bottom-2 right-2 text-gray-400 text-sm'>
                                            4 hour ago
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {comments.length > 3 && (
                                <button
                                    onClick={() =>
                                        setShowAllComments(!showAllComments)
                                    }
                                    className='mt-2 hover:underline'
                                >
                                    {showAllComments
                                        ? "Show Less"
                                        : "Show All Comments"}
                                </button>
                            )}
                        </div>
                        <div className='flex items-center gap-4 mt-10'>
                            <h1 className='text-xl'>{car.rating}</h1>
                            <Rating
                                rating={carRating}
                                setRating={setCarRating}
                            />
                        </div>
                        {userData && (
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className='mt-4 flex flex-col gap-4'
                            >
                                <textarea
                                    className='w-full bg-transparent ring-1 p-4 ring-grey focus-within:ring-2 focus-within:ring-primary outline-none duration-300'
                                    placeholder='Fikringizni yozing...'
                                    {...register("comment", {
                                        required:
                                            "Ushbu joy bo'sh bo'lmasligi kerak"
                                    })}
                                    required
                                />
                                <button
                                    type='submit'
                                    className='bg-primary hover:bg-primary-hover text-white p-2 duration-150'
                                >
                                    Yuborish
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <div className='w-1/2 border p-10'></div>
            </div>
        </div>
    );
}
