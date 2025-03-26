import { useParams } from "react-router-dom";
import Header from "../../../components/header/Header";
import {
    useAddCommentMutation,
    useDislikeBlogMutation,
    useGetBlogByIdQuery,
    useUpdateLikeMutation,
} from "../../../features/blogs/blogs";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { useSelector } from "react-redux";
import { selectCurrentAccessToken } from "../../../features/auth/authSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Login from "../../../components/login/Login";
import { memo, useEffect, useState } from "react";
import { useLazyAuthDetailQuery } from "../../../features/auth/authApiSlice";
import { FiChevronRight } from "react-icons/fi";
import { useGetCarsQuery } from "../../../features/cars/carSlice";

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
        <div className="flex justify-between items-center cursor-pointer">
            <div className="flex items-center gap-5">
                <div
                    className={`ranking-sales ${rankColor} w-5 h-6 flex items-center justify-center text-sm`}
                >
                    {rank}
                </div>
                <img
                    src={data.cover_image || "/placeholder-car.jpg"}
                    alt={data.name_uz}
                    className="border"
                    width={120}
                    height={60}
                />
            </div>
            <div className="text-center">
                <h2>{data.name_uz}</h2>
                <p className="text-primary">{data.price} $</p>
            </div>

            <button className="bg-primary text-white p-2 text-sm hover:bg-primary-hover duration-150">
                Check the
            </button>
        </div>
    );
});

const Section = ({
    title,
    salesData,
}: {
    title: string;
    salesData: CarObject[];
}) => (
    <div className="flex-1 mb-4">
        <div className="flex items-center justify-between border-b pb-5 mb-5">
            <h1 className="text-xl">{title}</h1>
            <button className="flex items-center gap-1 text-dark text-xl">
                <p>Overall list</p>
                <FiChevronRight />
            </button>
        </div>

        <div className="flex flex-col gap-5">
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

    const token = useSelector(selectCurrentAccessToken);
    const [triggerUserDetail, { data: userData }]: any =
        useLazyAuthDetailQuery();
    const { data: carsData } = useGetCarsQuery({
        page: 1,
    });
    const [openLogin, setOpenLogin] = useState(false);

    useEffect(() => {
        if (token) {
            triggerUserDetail(token);
        }
    }, [token]);

    if (isLoading || !post) {
        return <h1>Loading...</h1>;
    }

    const handleLikeDislike = async (
        action: "like" | "dislike",
        mutation: any
    ) => {
        if (!token || !userData) {
            setOpenLogin(true);
            return;
        }

        if (action === "like" && isPostLiked) {
            return;
        }

        if (action === "dislike" && isPostDisliked) {
            return;
        }

        try {
            await mutation(id!).unwrap();
            triggerUserDetail(token);
        } catch (error) {
            console.error(`Error on ${action}:`, error);
            toast.error(`Failed to ${action} the post.`);
        }
    };

    const onSubmit: SubmitHandler<Comments> = async (data) => {
        if (!token || !userData) {
            setOpenLogin(true);
            return;
        }

        const formData = new FormData();
        formData.append("target_id", id!);
        formData.append("comment", data.comment);

        try {
            await addComment(formData).unwrap();
            toast.success("Kommentariyangiz yuborildi!");
            reset();
            triggerUserDetail(token);
        } catch (error) {
            console.error("Comment error:", error);
            toast.error("Komment yuborilmadi!");
        }
    };

    const isPostLiked = userData?.likes?.includes(post.id);
    const isPostDisliked = userData?.disLikes?.includes(post.id);

    return (
        <div>
            <Header title={post.title_uz} />

            <div className="flex justify-between">
                <div className="flex justify-between gap-10">
                    <div className="flex items-start py-5">
                        <div className="basis-3/4 flex flex-col gap-4">
                            <div>
                                <h1 className="text-4xl font-bold capitalize">
                                    {post.title_uz}
                                </h1>
                            </div>

                            <div className="flex justify-between items-center">
                                <p>{post.category}</p>
                            </div>

                            <div className="w-full h-96 border">
                                <img
                                    src={post.cover_image || "placeholder.jpg"}
                                    alt="post-image"
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            <div>
                                <p>{post.content_uz}</p>
                            </div>

                            <div className="flex items-center justify-end gap-4">
                                <button
                                    className={`flex items-center gap-2 ${
                                        isPostLiked
                                            ? "text-blue-600"
                                            : "text-gray-500"
                                    }`}
                                    onClick={() =>
                                        handleLikeDislike(
                                            "like",
                                            updateBlogLike
                                        )
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
                                    className={`flex items-center gap-2 ${
                                        isPostDisliked
                                            ? "text-red-600"
                                            : "text-gray-500"
                                    }`}
                                    onClick={() =>
                                        handleLikeDislike(
                                            "dislike",
                                            dislikeBlog
                                        )
                                    }
                                >
                                    {isPostDisliked ? (
                                        <BiSolidDislike size={22} />
                                    ) : (
                                        <BiDislike size={22} />
                                    )}
                                </button>
                            </div>

                            <div>
                                <h1 className="text-2xl font-normal">
                                    Comments{" "}
                                    <span className="text-base text-gray-500">
                                        ({post.comments?.length || 0})
                                    </span>
                                </h1>

                                {userData ? (
                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="mt-4 flex flex-col gap-2"
                                    >
                                        <textarea
                                            className="border rounded p-2"
                                            placeholder="Fikringizni yozing..."
                                            {...register("comment", {
                                                required:
                                                    "Ushbu joy bo'sh bo'lmasligi kerak",
                                            })}
                                        />
                                        <button
                                            type="submit"
                                            className="bg-primary text-white p-2 rounded"
                                        >
                                            Yuborish
                                        </button>
                                    </form>
                                ) : (
                                    <div className="mt-4">
                                        <button
                                            onClick={() => setOpenLogin(true)}
                                            className="text-blue-500 underline"
                                        >
                                            Komment yozish uchun kiring
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full mt-10">
                        <Section
                            title="Sales ranking"
                            salesData={carsData?.items.slice(0, 3) || []}
                        />
                    </div>
                </div>
            </div>

            {openLogin && (
                <Login openLogin={openLogin} setOpenLogin={setOpenLogin} />
            )}
        </div>
    );
}
