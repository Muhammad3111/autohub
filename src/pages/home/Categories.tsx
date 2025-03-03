import { FiChevronRight } from "react-icons/fi";
import Slider from "../../components/slider/Slider";
import { useState } from "react";
import { salesModels, videoData } from "../../mock/data.json";

const Categories = () => {
    const [activeTab, setActiveTab] = useState<null | string>("recommend");

    const salesData: SalesRankingType[] = salesModels;

    const videosData: VideosType[] = videoData;

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
                        <button
                            className={`${
                                activeTab === "recommend"
                                    ? "text-primary"
                                    : "text-gray-500"
                            }`}
                            disabled={activeTab === "recommend"}
                            onClick={() => setActiveTab("recommend")}
                        >
                            Recommend
                        </button>
                        <button
                            className={`${
                                activeTab === "new-car"
                                    ? "text-primary"
                                    : "text-gray-500"
                            }`}
                            disabled={activeTab === "new-car"}
                            onClick={() => setActiveTab("new-car")}
                        >
                            New car
                        </button>
                        <button
                            className={`${
                                activeTab === "luxury-car"
                                    ? "text-primary"
                                    : "text-gray-500"
                            }`}
                            disabled={activeTab === "luxury-car"}
                            onClick={() => setActiveTab("luxury-car")}
                        >
                            Luxury car
                        </button>
                    </div>

                    <div className="flex flex-col gap-5 mt-5">
                        {videosData.map((data, index) => (
                            <div
                                key={index}
                                className="cursor-pointer flex items-end gap-5"
                            >
                                <video
                                    src={data.video}
                                    width={160}
                                    className="border h-[100px]"
                                />

                                <div>
                                    <h2 className="text-xl font-medium">
                                        {data.title.length >= 139
                                            ? `${data.title.slice(0, 139)}...`
                                            : data.title}
                                    </h2>
                                    <div className="flex items-center gap-10 text-gray-400">
                                        <p>{data.desc}</p>
                                        <p>{data.created_at}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
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
