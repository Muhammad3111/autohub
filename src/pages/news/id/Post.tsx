import { useParams } from "react-router-dom";
import Header from "../../../components/header/Header";
import { useGetBlogByIdQuery } from "../../../features/blogs/blogs";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useState } from "react";

export default function Post() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetBlogByIdQuery(id!);
  const [like, setLike] = useState<boolean>(false);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const post: Blogs = data;

  return (
    <div className="flex flex-col gap-4 mx-auto max-w-[1400px]">
      <Header title={post.title_uz} />
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
            <img src={post.cover_image || "placeholder.jpg"} alt="post-image" />
          </div>
          <div>
            <p>{post.content_uz}</p>
          </div>
          <div className="flex items-center justify-end">
            <button
              onClick={() => setLike(!like)}
              className="flex items-center gap-2"
            >
              {like ? (
                <BiSolidLike className="text-xl" />
              ) : (
                <BiLike className="text-xl" />
              )}
              <span>{post.like_count === null ? 0 : post.like_count}</span>
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-normal">
              Comments <span className="text-base text-gray-500">(0)</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
