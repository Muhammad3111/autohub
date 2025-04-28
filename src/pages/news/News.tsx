import { useCallback, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { useLazyGetBlogsByCategoryQuery } from "../../features/blogs/blogs";
import BlogSidebar from "../../components/blog/BlogSidebar";
import Pagination from "../../utility/pagination/Pagination";
import { useTranslation } from "react-i18next";
import { articles } from "../../mock/data.json";
import { Link } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import { BiLike } from "react-icons/bi";
import Image from "../../components/image/Image";
import VideoPlayer from "../../utility/videoPlayer/VideoPlayer";
import Loading from "../../components/loading/Loading";

const SpareParts = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const articlesData: Articles[] = articles;
  const [activeTab, setActiveTab] = useState<string>("news");
  const { t } = useTranslation();

  const [blogTrigger, { data, isLoading }] = useLazyGetBlogsByCategoryQuery();
  const posts: Blogs[] = data?.items || [];
  const totalPages = data?.metadata?.total_pages || 1;

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      blogTrigger({ page, category: activeTab });
    },
    [activeTab, blogTrigger]
  );

  useEffect(() => {
    blogTrigger({ category: activeTab, page: currentPage });
  }, [activeTab, blogTrigger, currentPage]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <Header title={t("news-page.header-title")} />
      <div>
        <div className="flex items-start gap-4 my-container p-10 bg-white">
          <div className="w-full mt-[9px]">
            <div className="w-full h-10 border-b flex items-center gap-10 text-xl">
              {articlesData.map((item, index) => (
                <button
                  key={index}
                  className={`${
                    activeTab === item.value ? "text-primary" : "text-gray-500"
                  }`}
                  onClick={() => {
                    setActiveTab(item.value);
                    setCurrentPage(1);
                  }}
                >
                  {t(`home-page.${item.value}`)}
                </button>
              ))}
            </div>

            <div className="flex flex-col justify-start gap-6 mt-5">
              {posts.length > 0 ? (
                posts.map((data) => (
                  <Link
                    to={`/news/${data.id}`}
                    key={data.id}
                    className="cursor-pointer flex items-start gap-5 relative"
                  >
                    {data.video_link ? (
                      <VideoPlayer
                        url={data.video_link}
                        width="400"
                        height="200"
                      />
                    ) : (
                      <Image
                        src={data.cover_image || "blog.jpg"}
                        alt={data.title_uz}
                      />
                    )}
                    <div>
                      <h2 className="text-xl font-medium">
                        {data.title_uz.length >= 139
                          ? `${data.title_uz.slice(0, 139)}...`
                          : data.title_uz}
                      </h2>
                      <p className="text-gray-400">
                        {data.content_uz.length >= 139
                          ? `${data.content_uz.slice(0, 139)}...`
                          : data.content_uz}
                      </p>
                    </div>

                    <div className="absolute bottom-0 right-2 flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1">
                        <LuEye />
                        <p>{data.view_count}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <BiLike />
                        <p>{data.like_count || 0}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>{t("home-page.blogs-not-found")}</p>
              )}

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
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
