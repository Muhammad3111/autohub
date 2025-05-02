import { FiChevronRight } from "react-icons/fi";
import Slider from "../../components/slider/Slider";
import { useEffect, useState, useCallback, memo, useContext } from "react";
import { articles } from "../../mock/data.json";
import { useLazyGetBlogsByCategoryQuery } from "../../features/blogs/blogs";
import { BiLike } from "react-icons/bi";
import { LuEye } from "react-icons/lu";
import Pagination from "../../utility/pagination/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { useGetCarsQuery } from "../../features/cars/carSlice";
import Image from "../../components/image/Image";
import { useTranslation } from "react-i18next";
import { Context } from "../../context/Context";
import VideoPlayer from "../../utility/videoPlayer/VideoPlayer";

const SalesCard = memo(({ data, rank }: { data: CarObject; rank: number }) => {
    const rankColor =
        rank === 1
            ? "bg-[#FFC900]"
            : rank === 2
            ? "bg-[#E1BF98]"
            : rank === 3
            ? "bg-[#E6E3E6]"
            : "bg-gray-300";
    const { t } = useTranslation();

    return (
        <Link
            to={`/cars/${data.model}/${data.id}`}
            className='flex justify-between items-center cursor-pointer'
        >
            <div className='flex items-center gap-5'>
                <div
                    className={`ranking-sales ${rankColor} w-5 h-6 flex items-center justify-center text-sm`}
                >
                    {rank}
                </div>
                <Image
                    src={data.cover_image!}
                    alt={data.name_uz}
                    width={120}
                    className='border h-20 object-cover'
                />
            </div>
            <div className='text-center'>
                <h2>{data.name_uz}</h2>
                <p className='text-primary'>{data.price} $</p>
            </div>

            <button className='bg-primary text-white p-2 text-sm hover:bg-primary-hover duration-150'>
                {t("home-page.check-the")}
            </button>
        </Link>
    );
});

export const Section = ({
    title,
    salesData,
    name,
    value
}: {
    title: string;
    salesData: CarObject[];
    name: string;
    value: string;
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const context = useContext(Context);
    if (!context) {
        throw new Error("Ushbu component contextdan tashqarida ishlatilmoqda");
    }

    const { setSelected } = context;

    return (
        <div className='flex-1 mb-4'>
            <div className='flex items-center justify-between border-b pb-5 mb-5'>
                <h1 className='text-xl'>{title}</h1>
                <button
                    onClick={() => {
                        navigate(`/cars/${value}`);
                        setSelected({ name, value });
                    }}
                    className='flex items-center gap-1 text-dark text-xl'
                >
                    <p>{t("home-page.overall-list")}</p>
                    <FiChevronRight />
                </button>
            </div>

            <div className='flex flex-col gap-5'>
                {salesData.map((data, index) => (
                    <SalesCard key={data.id} data={data} rank={index + 1} />
                ))}
            </div>
        </div>
    );
};

const Categories = () => {
    const [activeTab, setActiveTab] = useState<string>("news");
    const articlesData: Articles[] = articles;
    const { data: carsData } = useGetCarsQuery({
        page: 1
    });
    const { t } = useTranslation();

    const [currentPage, setCurrentPage] = useState<number>(1);
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
        return <h2>{t("loading")}...</h2>;
    }

    console.log(carsData);

    return (
        <div>
            <div className='flex justify-between gap-20'>
                <div>
                    <Slider />
                </div>

                <Section
                    title={t("home-page.sales-ranking")}
                    salesData={
                        carsData?.items
                            ?.filter((car) => car.most_sold)
                            ?.sort((a, b) => b.most_sold - a.most_sold)
                            ?.slice(0, 3) || []
                    }
                    name={t("home-page.sales-ranking")}
                    value={"sales-ranking"}
                />
            </div>

            <div className='flex justify-between gap-20 mt-10'>
                <div className='w-[950px] mt-[9px]'>
                    <div className='w-full h-10 border-b flex items-center gap-10 text-xl'>
                        {articlesData.map((item, index) => (
                            <button
                                key={index}
                                className={`text-lg ${
                                    activeTab === item.value
                                        ? "text-primary"
                                        : "text-gray-500"
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

                    <div className='flex flex-col justify-start gap-6 mt-5'>
                        {posts.length > 0 ? (
                            posts.map((data) => (
                                <Link
                                    to={`/news/${data.id}`}
                                    key={data.id}
                                    className='cursor-pointer flex items-start gap-5 relative'
                                >
                                    {data.video_link ? (
                                        <VideoPlayer
                                            width='250'
                                            height='150'
                                            url={data.video_link}
                                        />
                                    ) : (
                                        <Image
                                            width={200}
                                            src={
                                                data.cover_image || "post-image"
                                            }
                                            alt={data.title_uz}
                                        />
                                    )}
                                    <div>
                                        <h2 className='text-xl font-medium'>
                                            {data.title_uz.length >= 33
                                                ? `${data.title_uz.slice(
                                                      0,
                                                      33
                                                  )}...`
                                                : data.title_uz}
                                        </h2>
                                        <p className='text-gray-400'>
                                            {data.content_uz.length >= 33
                                                ? `${data.content_uz.slice(
                                                      0,
                                                      33
                                                  )}...`
                                                : data.content_uz}
                                        </p>
                                    </div>

                                    <div className='absolute bottom-0 right-2 flex items-center gap-6 text-sm'>
                                        <div className='flex items-center gap-1'>
                                            <LuEye />
                                            <p>{data.view_count}</p>
                                        </div>
                                        <div className='flex items-center gap-1'>
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

                <div className='flex-1'>
                    <Section
                        name={t("home-page.popular-ranking")}
                        value='popular-ranking'
                        title={t("home-page.popular-ranking")}
                        salesData={
                            carsData?.items
                                ?.filter((car) => car.rating != undefined)
                                ?.sort((a, b) => b.rating - a.rating)
                                ?.slice(0, 3) || []
                        }
                    />
                    <Section
                        name={t("home-page.new-cars")}
                        value='new-cars'
                        title={t("home-page.new-cars")}
                        salesData={
                            carsData?.items
                                ?.filter((car) => car.year != null)
                                ?.sort((a, b) => b.year - a.year)
                                ?.slice(0, 3) || []
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default Categories;
