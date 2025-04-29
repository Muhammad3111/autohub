import { useState, memo, useContext, useMemo } from "react";

import Pagination from "../../utility/pagination/Pagination";
import { Link } from "react-router-dom";
import { useGetCarsQuery } from "../../features/cars/carSlice";
import Image from "../../components/image/Image";
import { useTranslation } from "react-i18next";
import { Context } from "../../context/Context";
import Header from "../../components/header/Header";
import Rating from "../../utility/rating/Rating";
import InfoCard from "../../components/infoCard/InfoCard";
import { useGetBlogsByCategoryQuery } from "../../features/blogs/blogs";
import Loading from "../../components/loading/Loading";

const RankingsCard = memo(
  ({ data, rank }: { data: CarObject; rank: number }) => {
    const rankColor =
      rank === 1
        ? "bg-[#FFC900]"
        : rank === 2
        ? "bg-[#E1BF98]"
        : rank === 3
        ? "bg-[#E6E3E6]"
        : "bg-gray-300";
    const { t } = useTranslation();
    const [rating, setRating] = useState(data.rating || 0);
    return (
      <div className="flex justify-between items-center cursor-pointer hover:bg-white hover:border hover:border-gray-200 border border-transparent p-2 duration-300">
        <div className="flex items-center gap-5">
          <div
            className={`ranking-sales ${rankColor} w-5 h-6 flex items-center justify-center text-sm`}
          >
            {rank}
          </div>
          <Image
            src={data.cover_image!}
            alt={data.name_uz}
            width={120}
            className="border h-20 object-cover"
          />
        </div>
        <div className="text-center">
          <h2>{data.name_uz}</h2>
          <p className="text-primary">{data.price} $</p>
          <p className="text-black">{data.year}</p>
          <div className="flex items-center gap-4">
            <Link
              to={`/cars/parametrs/${data.id}`}
              className="hover:text-primary duration-150"
            >
              konfiguratsiya
            </Link>
            <Link
              to={`/cars/gallery${data.id}`}
              className="hover:text-primary duration-150"
            >
              rasmlar
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl">{rating}</h2>
          <Rating rating={rating} setRating={setRating} readonly={true} />
        </div>

        <div className="text-center">
          <h2 className="text-xl">{data.most_sold}</h2>
          <p className="text-primary">Sotilgan</p>
        </div>

        <Link
          to={`/cars/${data.name_uz}/${data.id}`}
          className="bg-primary text-white p-2 text-sm hover:bg-primary-hover duration-150"
        >
          {t("home-page.check-the")}
        </Link>
      </div>
    );
  }
);

export const RankingSection = ({
  title,
  salesData,
  value,
}: {
  title: string;
  salesData: CarObject[];
  value: string;
}) => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Ushbu component contextdan tashqarida ishlatilmoqda");
  }

  // Sort funksiyasi
  const sortedSalesData = useMemo(() => {
    const sorted = [...salesData];

    if (value === "most_sold") {
      return sorted.sort((a, b) => (b.most_sold || 0) - (a.most_sold || 0));
    } else if (value === "popular_cars") {
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (value === "new_cars") {
      return sorted.sort((a, b) => (b.year || 0) - (a.year || 0));
    } else {
      return sorted;
    }
  }, [salesData, value]);

  return (
    <div className="flex-1 mb-4">
      <div className="flex items-center justify-between border-b pb-5 mb-5">
        <h1 className="text-sm text-gray-500">{title}</h1>
      </div>

      <div className="flex flex-col gap-5">
        {sortedSalesData.map((data, index) => (
          <RankingsCard key={data.id} data={data} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};

const Ratings = () => {
  const [activeTab, setActiveTab] = useState<string>("most_sold");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: carsData, isLoading } = useGetCarsQuery({
    page: currentPage,
  });
  const { data: news } = useGetBlogsByCategoryQuery({ category: "news" });
  const { t } = useTranslation();

  const totalPages = carsData?.metadata?.total_pages || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const tabs = t("Ranking", { returnObjects: true }) as {
    title: string;
    value: string;
  }[];

  const blogs: Blogs[] = news?.items || [];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Header title={t("sidebar.ratings")} />

      <div className="grid grid-cols-4 gap-20 mt-10">
        <div className="col-span-3 mt-[9px]">
          <div className="w-full h-10 border-b flex items-center gap-10 text-xl">
            {tabs.map((item, index) => (
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
                {t(`${item.title}`)}
              </button>
            ))}
          </div>

          <div className="flex flex-col justify-start gap-6 mt-5">
            <RankingSection
              value={activeTab}
              title={t("Warnings.info_change_date")}
              salesData={carsData?.items.slice(0, 3) || []}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          {blogs
            .filter((blog) => blog.category === "news")
            .map((blog) => (
              <InfoCard key={blog.id} {...blog} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Ratings;
