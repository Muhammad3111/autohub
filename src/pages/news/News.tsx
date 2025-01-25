import Header from "../../components/header/Header";
import { useEffect, useState } from "react";
import Pagination from "../../utility/pagination/Pagination";
import BlogCard from "../../components/blog/BlogCard";
import { useGetBlogsQuery } from "../../features/blogs/blogs";

const SpareParts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { data } = useGetBlogsQuery({ page: currentPage });
  useEffect(() => {
    if (data?.total_pages) {
      setTotalPages(data.total_pages); // Birinchi so‘rov amalga oshirilgandan keyin skip-ni true qilib qo‘yish
    }
  }, [data?.total_pages]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Sahifani yangilaydi
  };

  return (
    <div>
      <Header title="Yangiliklar" />
      <div className="flex flex-col gap-4 my-container pt-10">
        <div className="grid grid-cols-4 gap-4 py-6">
          {data?.items.map((blog) => (
            <BlogCard key={blog.id} blogs={blog} />
          ))}
        </div>
      </div>
      <div className="w-full">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
export default SpareParts;
