import { useNavigate } from "react-router-dom";
import Button from "../../utility/button/Button";
import Image from "../image/Image";

type Props = {
    blogs: Blogs;
};

const BlogCard = ({ blogs }: Props) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/news/${blogs.id}`)}
            className="w-full h-full bg-white flex flex-col gap-4 relative duration-200 cursor-pointer mb-10"
        >
            {/* Image */}
            <div className="w-full h-96 flex items-center justify-center border-2">
                <Image
                    src={blogs.cover_image!}
                    alt={blogs.title_uz}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="flex items-center gap-4">
                <span className="py-2 px-4 bg-green-600/20">
                    {blogs.category}
                </span>
            </div>
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold truncate">
                    {blogs.title_uz}
                </h1>
                <p className="text-base font-normal line-clamp-4">
                    {blogs.content_uz}
                </p>
            </div>
            <div>
                <Button className="px-4">Batafsil</Button>
            </div>
        </div>
    );
};

export default BlogCard;
