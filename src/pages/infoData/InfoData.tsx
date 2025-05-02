import { useGetBlogsByCategoryQuery } from "../../features/blogs/blogs";
import InfoCard from "../../components/infoCard/InfoCard";
import Header from "../../components/header/Header";
import { useTranslation } from "react-i18next";

export default function InfoData() {
  const { data: news } = useGetBlogsByCategoryQuery({ category: "news" });
  const { t } = useTranslation();
  const blogs: Blogs[] = news?.items || [];
  return (
    <div className="w-full">
      <Header title={t("sidebar.information")} />
      <div className="grid grid-cols-4 items-center gap-10 px-20">
        {blogs
          .filter((blog) => blog.category === "news")
          .map((blog) => (
            <InfoCard key={blog.id} {...blog} />
          ))}
      </div>
    </div>
  );
}
