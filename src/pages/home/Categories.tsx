import { FiChevronRight } from "react-icons/fi";
import Slider from "../../components/slider/Slider";
import { useEffect, useState } from "react";
import { salesModels, articles } from "../../mock/data.json";
import { useLazyGetBlogsByCategoryQuery } from "../../features/blogs/blogs";
import { useFormatDateTime } from "../../hooks/useFormatDateTime";
import { BiLike } from "react-icons/bi";
import { LuEye } from "react-icons/lu";
import Pagination from "../../utility/pagination/Pagination";

const Categories = () => {
    const [activeTab, setActiveTab] = useState<string>("news");

    const salesData: SalesRankingType[] = salesModels;

    const articlesData: Articles[] = articles;

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [blogTrigger, { data, isLoading }] = useLazyGetBlogsByCategoryQuery();

    const posts: Blogs[] = data?.items || [];
    const totalPages = data?.metadata?.total_pages || 1;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        blogTrigger({ page: page });
    };

    useEffect(() => {
        blogTrigger({ category: activeTab });
    }, [activeTab]);

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <div className="flex justify-between gap-10">
                <div>
                    <Slider />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between border-b pb-5 mb-5">
                        <h1 className="text-xl">Sales ranking</h1>
                        <button className="flex items-center gap-1 text-dark text-xl">
                            <p>Overall list</p>
                            <FiChevronRight />
                        </button>
                    </div>

                    <div className="flex flex-col gap-5">
                        {salesData.map((data, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center cursor-pointer"
                            >
                                <div className="flex items-center gap-5">
                                    <div
                                        className={`ranking-sales ${
                                            data.rank === 1
                                                ? "bg-[#FFC900]"
                                                : data.rank === 2
                                                ? "bg-[#E1BF98]"
                                                : data.rank === 3
                                                ? "bg-[#E6E3E6]"
                                                : "bg-gray-300"
                                        } w-5 h-6 flex items-center justify-center text-sm`}
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
                                    <p className="text-primary">
                                        {data.price} $
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Sales volume: {data.volume}
                                    </p>
                                </div>

                                <button className="bg-primary text-white p-2 text-sm hover:bg-primary-hover duration-150">
                                    Check the
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-between gap-10 mt-10">
                <div className="w-[850px] mt-[9px]">
                    <div className="w-full h-10 border-b flex items-center gap-10 text-xl">
                        {articlesData.map((item, index) => (
                            <button
                                key={index}
                                className={`${
                                    activeTab === item.value
                                        ? "text-primary"
                                        : "text-gray-500"
                                }`}
                                disabled={activeTab === item.value}
                                onClick={() => setActiveTab(item.value)}
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
                                        <div className="flex items-center gap-10 text-gray-400">
                                            <p>
                                                {data.content_uz.length >= 139
                                                    ? `${data.content_uz.slice(
                                                          0,
                                                          139
                                                      )}...`
                                                    : data.content_uz}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 right-2 flex items-center gap-6 text-sm">
                                        <div className="flex items-center gap-1">
                                            <LuEye />
                                            <p>{data.view_count}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <BiLike />
                                            <p>
                                                {data.like_count
                                                    ? data.like_count
                                                    : 0}
                                            </p>
                                        </div>
                                        <p>
                                            {useFormatDateTime(data.created_at)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>
                                <p>No blogs found for this category.</p>
                            </div>
                        )}

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex-1">
                        <div className="flex items-center justify-between border-b pb-5 mb-5">
                            <h1 className="text-xl">Popularity ranking</h1>
                            <button className="flex items-center gap-1 text-dark text-xl">
                                <p>Overall list</p>
                                <FiChevronRight />
                            </button>
                        </div>

                        <div className="flex flex-col gap-5">
                            {salesData.map((data, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center cursor-pointer"
                                >
                                    <div className="flex items-center gap-5">
                                        <div
                                            className={`ranking-sales ${
                                                data.rank === 1
                                                    ? "bg-[#FFC900]"
                                                    : data.rank === 2
                                                    ? "bg-[#E1BF98]"
                                                    : data.rank === 3
                                                    ? "bg-[#E6E3E6]"
                                                    : "bg-gray-300"
                                            } w-5 h-6 flex items-center justify-center text-sm`}
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
                                        <p className="text-primary">
                                            {data.price} $
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Sales volume: {data.volume}
                                        </p>
                                    </div>

                                    <button className="bg-primary text-white p-2 text-sm hover:bg-primary-hover duration-150">
                                        Check the
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 mt-10">
                        <div className="flex items-center justify-between border-b pb-5 mb-5">
                            <h1 className="text-xl">New cars</h1>
                            <button className="flex items-center gap-1 text-dark text-xl">
                                <p>Overall list</p>
                                <FiChevronRight />
                            </button>
                        </div>

                        <div className="flex flex-col gap-5">
                            {salesData.map((data, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center cursor-pointer"
                                >
                                    <div className="flex items-center gap-5">
                                        <div
                                            className={`ranking-sales ${
                                                data.rank === 1
                                                    ? "bg-[#FFC900]"
                                                    : data.rank === 2
                                                    ? "bg-[#E1BF98]"
                                                    : data.rank === 3
                                                    ? "bg-[#E6E3E6]"
                                                    : "bg-gray-300"
                                            } w-5 h-6 flex items-center justify-center text-sm`}
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
                                        <p className="text-primary">
                                            {data.price} $
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Sales volume: {data.volume}
                                        </p>
                                    </div>

                                    <button className="bg-primary text-white p-2 text-sm hover:bg-primary-hover duration-150">
                                        Check the
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Categories;
