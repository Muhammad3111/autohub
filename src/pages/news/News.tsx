import { useState } from "react";
import Header from "../../components/header/Header";
import BlogCard from "../../components/blog/BlogCard";
import { useGetBlogsQuery } from "../../features/blogs/blogs";
import BlogSidebar from "../../components/blog/BlogSidebar";
import Pagination from "../../utility/pagination/Pagination";
import { useTranslation } from "react-i18next";

const SpareParts = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { data } = useGetBlogsQuery({ page: currentPage });
    const { t } = useTranslation();

    const posts: Blogs[] = data?.items || [];
    const totalPages = data?.metadata?.total_pages || 1;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="w-full">
            <Header title={t("news-page.header-title")} />
            <div>
                <div className="flex items-start gap-4 my-container p-10 bg-white">
                    <div className="grid grid-cols-1 basis-3/4">
                        {posts.map((blog) => (
                            <BlogCard key={blog.id} blogs={blog} />
                        ))}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                    <div className="basis-1/4 w-full">
                        <BlogSidebar blogs={posts} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpareParts;
