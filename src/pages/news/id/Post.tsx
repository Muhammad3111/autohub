import { Link, useLocation, useParams } from "react-router-dom";
import Header from "../../../components/header/Header";
import {
    useAddCommentMutation,
    useDislikeBlogMutation,
    useGetBlogByIdQuery,
    useGetCommentQuery,
    useUpdateLikeMutation
} from "../../../features/blogs/blogs";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
    selectCurrentAccessToken,
    selectCurrentUserData,
    updateUserLikes
} from "../../../features/auth/authSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Login from "../../../components/login/Login";
import { memo, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { useGetCarsQuery } from "../../../features/cars/carSlice";
import defaultImg from "../../../assets/dealer-default-img.png";
import Image from "../../../components/image/Image";
import { useTranslation } from "react-i18next";
import { IoShareSocialOutline } from "react-icons/io5";

const SalesCard = memo(({ data, rank }: { data: CarObject; rank: number }) => {
    const rankColor =
        rank === 1
            ? "bg-[#FFC900]"
            : rank === 2
            ? "bg-[#E1BF98]"
            : rank === 3
            ? "bg-[#E6E3E6]"
            : "bg-gray-300";

    return (
        <Link
            to={`/cars/${data.model}/${data.id}`}
            className='flex justify-between items-center cursor-pointer'
        >
            <div className='flex items-center gap-5'>
                <div
                    className={`ranking-sales ${rankColor} w-5 h-6 flex items-center justify-center text-sm`}
                >
                    {rank}
                </div>
                <Image
                    src={data.cover_image!}
                    alt={data.name_uz}
                    width={120}
                    className='border h-20 object-cover'
                />
            </div>
            <div className='text-center'>
                <h2>{data.name_uz}</h2>
                <p className='text-primary'>{data.price} $</p>
            </div>

            <button className='bg-primary text-white p-2 text-sm hover:bg-primary-hover duration-150'>
                Check the
            </button>
        </Link>
    );
});

const Section = ({
    title,
    salesData
}: {
    title: string;
    salesData: CarObject[];
}) => (
    <div className='flex-1 mb-4'>
        <div className='flex items-center justify-between border-b pb-5 mb-5'>
            <h1 className='text-xl'>{title}</h1>
            <button className='flex items-center gap-1 text-dark text-xl'>
                <p>Overall list</p>
                <FiChevronRight />
            </button>
        </div>

        <div className='flex flex-col gap-5'>
            {salesData.map((data, index) => (
                <SalesCard key={data.id} data={data} rank={index + 1} />
            ))}
        </div>
    </div>
);

export default function Post() {
    const { id } = useParams<{ id: string }>();
    const { register, reset, handleSubmit } = useForm<Comments>();
    const { data: post, isLoading } = useGetBlogByIdQuery(id!);
    const [updateBlogLike] = useUpdateLikeMutation();
    const [dislikeBlog] = useDislikeBlogMutation();
    const [addComment] = useAddCommentMutation();
    const { t } = useTranslation();
    const token = useSelector(selectCurrentAccessToken);
    const dispatch = useDispatch();
    const userData = useSelector(selectCurrentUserData);
    const { data: carsData } = useGetCarsQuery({
        page: 1
    });
    const [openLogin, setOpenLogin] = useState(false);
    const { pathname } = useLocation();

    const { data: comments = [] } = useGetCommentQuery({
        target_id: id!,
        target_type: "article"
    });
    const [showAllComments, setShowAllComments] = useState(false);
    const visibleComments = showAllComments
        ? comments ?? []
        : comments?.slice(0, 3) ?? [];

    if (isLoading || !post) {
        return <h1>{t("loading")}...</h1>;
    }

    const handleLikeDislike = async (
        type: "like" | "dislike",
        mutation: any
    ) => {
        if (!token || !userData) {
            setOpenLogin(true);
            return;
        }

        if (type === "like" && isPostLiked) return;
        if (type === "dislike" && isPostDisliked) return;

        try {
            await mutation(id!)
                .unwrap()
                .then(() => {
                    dispatch(updateUserLikes({ postId: id!, type }));
                });
        } catch (error) {
            console.error(`Error on ${type}:`, error);
            toast.error(`Failed to ${type} the post.`);

            dispatch(
                updateUserLikes({
                    postId: id!,
                    type: type === "like" ? "dislike" : "like"
                })
            );
        }
    };

    const onSubmit: SubmitHandler<Comments> = async (data) => {
        if (!token || !userData) {
            setOpenLogin(true);
            return;
        }

        const commentData = {
            target_id: id,
            comment: data.comment,
            target_type: "article",
            rating: 0
        };

        try {
            await addComment(commentData)
                .unwrap()
                .then(() => {
                    toast.success("Kommentariyangiz yuborildi!");
                    reset();
                });
        } catch (error) {
            console.error("Comment error:", error);
            toast.error("Komment yuborilmadi!");
        }
    };

    const isPostLiked = userData?.likes?.includes(post.id);
    const isPostDisliked = userData?.dislikes?.includes(post.id);

    const handleShareBlog = async () => {
        try {
            await navigator.clipboard.writeText(
                window.location.origin + pathname
            );
            toast.success("Nusxalandi!");
        } catch (err) {
            console.error("Nusxalab bo‘lmadi:", err);
        }
    };

    return (
        <div>
            <Header title={post.title_uz} />

            <div className='flex justify-between gap-20'>
                <div className='flex items-start py-5 w-full'>
                    <div className='w-full flex flex-col gap-4'>
                        <div className='max-w-[900px]'>
                            <h1 className='text-4xl font-bold capitalize break-words'>
                                {post.title_uz}
                            </h1>
                        </div>

                        <div className='flex justify-between items-center'>
                            <p>{post.category}</p>
                        </div>

                        <div className='w-full h-96 border'>
                            <Image
                                src={post.cover_image}
                                alt='post-image'
                                className='object-cover w-full h-full'
                            />
                        </div>

                        <div>
                            <p>{post.content_uz}</p>
                        </div>

                        <div className='flex items-center justify-end gap-4'>
                            <button
                                className={`flex items-center gap-2 text-gray-400`}
                                onClick={() =>
                                    handleLikeDislike("like", updateBlogLike)
                                }
                            >
                                <span>{post.like_count || 0}</span>
                                {isPostLiked ? (
                                    <BiSolidLike size={22} />
                                ) : (
                                    <BiLike size={22} />
                                )}
                            </button>

                            <button
                                className={`flex items-center gap-2 text-gray-400`}
                                onClick={() =>
                                    handleLikeDislike("dislike", dislikeBlog)
                                }
                            >
                                {isPostDisliked ? (
                                    <BiSolidDislike size={22} />
                                ) : (
                                    <BiDislike size={22} />
                                )}
                            </button>

                            <button
                                onClick={handleShareBlog}
                                className='text-gray-400 text-2xl'
                            >
                                <IoShareSocialOutline />
                            </button>
                        </div>

                        <div>
                            <div>
                                <span className='text-xl font-normal mr-2'>
                                    Comments
                                </span>
                                <span className='text-base text-gray-500'>
                                    ({comments?.length})
                                </span>
                            </div>

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

                            {userData ? (
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
                                    />
                                    <button
                                        type='submit'
                                        className='bg-primary hover:bg-primary-hover text-white p-2 duration-150'
                                    >
                                        Yuborish
                                    </button>
                                </form>
                            ) : (
                                <div className='mt-4'>
                                    <button
                                        onClick={() => setOpenLogin(true)}
                                        className='text-blue-500 underline'
                                    >
                                        Komment yozish uchun kiring
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='mt-5 w-1/2'>
                    <Section
                        title='Sales ranking'
                        salesData={carsData?.items.slice(0, 3) || []}
                    />
                </div>
            </div>

            {openLogin && (
                <Login openLogin={openLogin} setOpenLogin={setOpenLogin} />
            )}
        </div>
    );
}
