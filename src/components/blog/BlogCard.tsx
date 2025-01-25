import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Blogs } from "../../features/blogs/blogs";
import { LuNotepadText } from "react-icons/lu";

type Props = {
  blogs: Blogs;
};

const BlogCard = ({ blogs }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/cars/${blogs.id}`)}
      className="w-full min-h-[400px] bg-white rounded-lg flex flex-col justify-between p-5 relative shadow-md hover:shadow-lg duration-200 border-2 cursor-pointer hover:border-primary"
    >
      {/* Image */}
      <div className="w-full h-52 flex items-center justify-center">
        <img
          src={`http://89.223.126.64:8080${
            blogs.cover_image || "placeholder.jpg"
          }`}
          alt={blogs.title_uz}
          className="h-full w-full object-cover rounded-lg"
        />
      </div>

      {/* Title and Price */}
      <div className="flex justify-between items-center mt-3 border-b-2 pb-2">
        <p className="text-xl font-semibold w-3/4 truncate">{blogs.title_uz}</p>
        <p className="font-medium text-lg text-primary w-1/4 line-clamp-1">
          ${blogs.author_id}
        </p>
      </div>

      {/* Properties */}
      <div className="mt-3 flex flex-wrap gap-2">
        <p className="text-gray-500 text-base line-clamp-4 w-full">
          {blogs.content_uz}
        </p>
      </div>

      {/* Additional Info */}
      <div className="flex justify-between items-center mt-3 border-t-2 pt-2">
        <Info icon={<LuNotepadText />} text={blogs.category} />
        <Info icon={<IoEyeOutline />} text={blogs.view_count || "0"} />
      </div>
    </div>
  );
};

type InfoProps = { icon: JSX.Element; text: string | number };
const Info = ({ icon, text }: InfoProps) => (
  <div className="flex items-center gap-2 text-gray-600 hover:text-primary duration-150">
    {icon}
    <p className="text-base">{text}</p>
  </div>
);

export default BlogCard;
