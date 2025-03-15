import { FiChevronRight } from "react-icons/fi";
import Slider from "../../components/slider/Slider";
import { useEffect, useState, useCallback, memo } from "react";
import { salesModels, articles } from "../../mock/data.json";
import { useLazyGetBlogsByCategoryQuery } from "../../features/blogs/blogs";
import { BiLike } from "react-icons/bi";
import { LuEye } from "react-icons/lu";
import Pagination from "../../utility/pagination/Pagination";

// 🟢 Reusable Component: SalesCard
const SalesCard = memo(({ data }: { data: SalesRankingType }) => {
    const rankColor =
        data.rank === 1
            ? "bg-[#FFC900]"
            : data.rank === 2
            ? "bg-[#E1BF98]"
            : data.rank === 3
            ? "bg-[#E6E3E6]"
            : "bg-gray-300";

    return (
        <div className="flex justify-between items-center cursor-pointer">
            <div className="flex items-center gap-5">
                <div
                    className={`ranking-sales ${rankColor} w-5 h-6 flex items-center justify-center text-sm`}
                >
                    {data.rank}
                </div>
                <img
                    src={data.img}
                    alt={data.model}
                    className="border"
                    width={120}
                    height={60}
                />
            </div>
            <div>
                <h2>{data.model}</h2>
                <p className="text-primary">{data.price} $</p>
                <p className="text-sm text-gray-500">
                    Sales volume: {data.volume}
                </p>
            </div>

            <button className="bg-primary text-white p-2 text-sm hover:bg-primary-hover duration-150">
                Check the
            </button>
        </div>
    );
});

// 🟢 Reusable Component: Section
const Section = ({
    title,
    salesData,
}: {
    title: string;
    salesData: SalesRankingType[];
}) => (
    <div className="flex-1">
        <div className="flex items-center justify-between border-b pb-5 mb-5">
            <h1 className="text-xl">{title}</h1>
            <button className="flex items-center gap-1 text-dark text-xl">
                <p>Overall list</p>
                <FiChevronRight />
            </button>
        </div>

        <div className="flex flex-col gap-5">
            {salesData.map((data, index) => (
                <SalesCard key={index} data={data} />
            ))}
        </div>
    </div>
);

const Categories = () => {
    const [activeTab, setActiveTab] = useState<string>("news");
    const salesData: SalesRankingType[] = salesModels;
    const articlesData: Articles[] = articles;

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
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <div className="flex justify-between gap-20">
                {/* Left side - Slider */}
                <div>
                    <Slider />
                </div>

                <Section title="Sales ranking" salesData={salesData} />
            </div>

            <div className="flex justify-between gap-20 mt-10">
                {/* Blog posts */}
                <div className="w-[950px] mt-[9px]">
                    <div className="w-full h-10 border-b flex items-center gap-10 text-xl">
                        {articlesData.map((item, index) => (
                            <button
                                key={index}
                                className={`${
                                    activeTab === item.value
                                        ? "text-primary"
                                        : "text-gray-500"
                                }`}
                                onClick={() => {
                                    setActiveTab(item.value);
                                    setCurrentPage(1);
                                }}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col justify-start gap-6 mt-5">
                        {posts.length > 0 ? (
                            posts.map((data) => (
                                <div
                                    key={data.id}
                                    className="cursor-pointer flex items-start gap-5 relative"
                                >
                                    <video
                                        src={data.video_link}
                                        width={160}
                                        className="border h-[110px]"
                                    />
                                    <div>
                                        <h2 className="text-xl font-medium">
                                            {data.title_uz.length >= 139
                                                ? `${data.title_uz.slice(
                                                      0,
                                                      139
                                                  )}...`
                                                : data.title_uz}
                                        </h2>
                                        <p className="text-gray-400">
                                            {data.content_uz.length >= 139
                                                ? `${data.content_uz.slice(
                                                      0,
                                                      139
                                                  )}...`
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
                                </div>
                            ))
                        ) : (
                            <p>No blogs found for this category.</p>
                        )}

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>

                {/* Popularity ranking and New cars */}
                <div className="flex-1">
                    <Section title="Popularity ranking" salesData={salesData} />
                    <Section title="New cars" salesData={salesData} />
                </div>
            </div>
        </div>
    );
};

export default Categories;
