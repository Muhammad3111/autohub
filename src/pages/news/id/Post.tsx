import { useParams } from "react-router-dom";
import Header from "../../../components/header/Header";
import {
  useAddCommentMutation,
  useGetBlogByIdQuery,
  useUpdateLikeMutation,
} from "../../../features/blogs/blogs";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useSelector } from "react-redux";
import { selectCurrentUserData } from "../../../features/auth/authSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Post() {
  const { id } = useParams<{ id: string }>();
  const { register, reset, handleSubmit } = useForm<Comments>();
  const { data, isLoading } = useGetBlogByIdQuery(id!);
  const [updateBlogLike, { isSuccess }] = useUpdateLikeMutation();
  const [addComment] = useAddCommentMutation();
  const userData = useSelector(selectCurrentUserData);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const handleLike = async () => {
    try {
      await updateBlogLike(id!);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<Comments> = async (data) => {
    if (id) {
      data.target_id = id;
    }
    try {
      await addComment(data);
      toast.success("Comment muvaffaqiyatli qo'shildi");
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const post: Blogs = data;

  return (
    <div>
      <Header title={post.title_uz} />
      <div className="flex flex-col gap-4 mx-auto max-w-[1440px]">
        <div className="flex items-start py-5">
          <div className="basis-3/4 flex flex-col gap-4">
            <div>
              <h1 className="text-4xl font-bold capitalize">{post.title_uz}</h1>
            </div>
            <div className="flex justify-between items-center">
              <p>{post.category}</p>
              <p>{post.author_id}</p>
            </div>
            <div className="w-full h-96 border">
              <img
                src={post.cover_image || "placeholder.jpg"}
                alt="post-image"
              />
            </div>
            <div>
              <p>{post.content_uz}</p>
            </div>
            <div className="flex items-center justify-end">
              <button className="flex items-center gap-2" onClick={handleLike}>
                {!isSuccess ? (
                  <BiSolidLike className="text-gray-500" />
                ) : (
                  <BiLike />
                )}
                <span>{post.like_count || 0}</span>
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-normal">
                Comments <span className="text-base text-gray-500">(0)</span>
              </h1>
              {userData && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-4 flex flex-col gap-2"
                >
                  <label className="font-semibold">{userData.username}</label>
                  <textarea
                    className="border rounded p-2"
                    placeholder="Fikringizni yozing..."
                    {...register("comment", {
                      required: "Ushbu joy bo'sh bo'lmasligi kerak",
                    })}
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded p-2" 
                  >
                    Yuborish
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
