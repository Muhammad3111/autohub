import { useParams } from "react-router-dom";
import { useGetSpareByIdQuery } from "../../../features/spare-parts/spare-parts";
import Header from "../../../components/header/Header";
import { useTranslation } from "react-i18next";
import Image from "../../../components/image/Image";
import {
  useAddCommentMutation,
  useGetCommentQuery,
} from "../../../features/blogs/blogs";
import { SubmitHandler, useForm } from "react-hook-form";
import defaultImg from "../../../assets/dealer-default-img.png";
import { toast } from "react-toastify";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUserData } from "../../../features/auth/authSlice";
import Rating from "../../../utility/rating/Rating";

export default function SpareId() {
  const { id } = useParams<{ id: string }>();
  const { register, reset, handleSubmit } = useForm<Comments>();
  const [addComment] = useAddCommentMutation();
  const userData = useSelector(selectCurrentUserData);
  const { data, isLoading } = useGetSpareByIdQuery(id!);
  const [spareRating, setSpareRating] = useState<number>(0);
  const { data: comments = [] } = useGetCommentQuery({
    target_id: id!,
    target_type: "spare_part",
  });
  const { t } = useTranslation();
  const [showAllComments, setShowAllComments] = useState(false);
  const visibleComments = showAllComments
    ? comments ?? []
    : comments?.slice(0, 3) ?? [];

  if (isLoading) {
    return <h1>{t("loading")}...</h1>;
  }

  const spare: SpareParts = data;
  const onSubmit: SubmitHandler<Comments> = async (data) => {
    const commentData = {
      target_id: id,
      target_type: "spare_part",
      rating: spareRating,
      comment: data.comment,
    };

    try {
      await addComment(commentData)
        .unwrap()
        .then(() => {
          toast.success("Kommentariyangiz yuborildi!");
          reset();
          setSpareRating(spare.rating!);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      <Header title={spare.name_uz} />
      <div className="flex flex-col gap-4 py-5 my-container p-10">
        <div className="flex items-center gap-4">
          <div className="basis-1/2">
            <Image
              src={`${spare.cover_image || "placeholder.jpg"}`}
              alt={spare.name_uz}
              className="w-full h-[450px] object-cover"
            />
          </div>
          <div className="basis-1/2 grid grid-cols-2 gap-4">
            {spare.images?.slice(0, 4).map((img, ind) => (
              <div key={ind}>
                <Image
                  src={`${img}`}
                  alt={"spare image"}
                  className="w-full h-[217px] object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <h1 className="text-4xl font-bold capitalize">{spare.name_uz}</h1>
          <div className="flex items-center gap-4 mt-10">
            <h1 className="text-xl">{spare.rating}</h1>
            <Rating
              rating={spareRating > 0 ? spareRating : spare.rating}
              setRating={setSpareRating}
            />
          </div>
        </div>
        <div>{spare.description_uz}</div>
        <div className="flex justify-between gap-20">
          <div className="flex flex-col gap-4 w-full">
            <div>
              <div>
                <h1 className="text-xl font-normal">
                  Comments{" "}
                  <span className="text-base text-gray-500">
                    ({comments?.length})
                  </span>
                </h1>

                <div className="flex flex-col mt-4">
                  {visibleComments.map((comment) => (
                    <div
                      key={comment.id}
                      className="py-4 first:border-t border-b flex gap-2 w-full relative min-h-32"
                    >
                      <div className="w-10 h-10 rounded-full">
                        <img
                          src={defaultImg}
                          alt=""
                          className="w-full h-full object-cover border rounded-full"
                        />
                      </div>
                      <div className="w-full">
                        <h1 className="text-sm">Anonymous</h1>
                        <p>{comment.comment}</p>
                      </div>
                      <p className="absolute bottom-2 right-2 text-gray-400 text-sm">
                        4 hour ago
                      </p>
                    </div>
                  ))}
                </div>

                {comments.length > 3 && (
                  <button
                    onClick={() => setShowAllComments(!showAllComments)}
                    className="mt-2 hover:underline"
                  >
                    {showAllComments ? "Show Less" : "Show All Comments"}
                  </button>
                )}
              </div>
              {userData && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-4 flex flex-col gap-4"
                >
                  <textarea
                    className="w-full bg-transparent ring-1 p-4 ring-grey focus-within:ring-2 focus-within:ring-primary outline-none duration-300"
                    placeholder="Fikringizni yozing..."
                    {...register("comment", {
                      required: "Ushbu joy bo'sh bo'lmasligi kerak",
                    })}
                    required
                  />
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-hover text-white p-2 duration-150"
                  >
                    Yuborish
                  </button>
                </form>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="text-xl font-normal">
                O'xshash avtomobillar{" "}
                <span className="text-base text-gray-500"></span>
              </h1>
              <div className="grid grid-cols-3 gap-4"></div>
            </div>
          </div>

          <div className="w-1/2 border p-10">
            <div className="flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
