import { useTranslation } from "react-i18next";
import Header from "../../components/header/Header";
import { useEffect, useState } from "react";
import {
    useGetSearchDataQuery,
    useLazyGetSearchDataQuery,
} from "../../features/search/search";
import Image from "../../components/image/Image";
import { Link } from "react-router-dom";
import Rating from "../../utility/rating/Rating";

interface SearchDataTabs {
    title: string;
    value: "article" | "dealer" | "service" | "vehicle" | "spare_part";
}

type RankingsCardProps = {
    type: "vehicle" | "dealer" | "service" | "article" | "spare_part";
    rank: number;
    data: CarObject | DealersType | Blogs | SpareParts;
};

const RankingsCard = ({ data, rank, type }: RankingsCardProps) => {
    const { t } = useTranslation();
    const [rating, setRating] = useState((data as any).rating || 0);

    const rankColor =
        rank === 1
            ? "bg-[#FFC900]"
            : rank === 2
            ? "bg-[#E1BF98]"
            : rank === 3
            ? "bg-[#E6E3E6]"
            : "bg-gray-300";

    let image = "";
    let title = "";
    let price: number | null = null;
    let year: number | null = null;
    let id = "";

    switch (type) {
        case "vehicle":
            const vehicle = data as CarObject;
            image = vehicle.cover_image || "";
            title = vehicle.name_uz;
            price = vehicle.price;
            year = vehicle.year;
            id = vehicle.id || "";
            break;
        case "dealer":
        case "service":
            const dealer = data as DealersType;
            image = dealer.avatar;
            title = dealer.workplace_name;
            id = dealer.id;
            break;
        case "article":
            const article = data as Blogs;
            image = article.cover_image || "";
            title = article.title_uz;
            id = article.id;
            break;
        case "spare_part":
            const part = data as SpareParts;
            image = part.cover_image;
            title = part.name_uz;
            price = part.price;
            id = part.id;
            break;
    }

    return (
        <div className="flex justify-between items-center cursor-pointer hover:bg-white hover:border hover:border-gray-200 border border-transparent p-2 duration-300">
            <div className="flex items-center gap-5">
                <div
                    className={`ranking-sales ${rankColor} w-5 h-6 flex items-center justify-center text-sm`}
                >
                    {rank}
                </div>
                <Image
                    src={image}
                    alt={title}
                    width={120}
                    className="border h-20 object-cover"
                />
            </div>

            <div className="text-center">
                <h2>{title}</h2>
                {price !== null && <p className="text-primary">{price} $</p>}
                {year !== null && <p className="text-black">{year}</p>}

                {type === "vehicle" && (
                    <div className="flex items-center gap-4">
                        <Link
                            to={`/cars/parametrs/${id}`}
                            className="hover:text-primary duration-150"
                        >
                            konfiguratsiya
                        </Link>
                        <Link
                            to={`/cars/gallery${id}`}
                            className="hover:text-primary duration-150"
                        >
                            rasmlar
                        </Link>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <h2 className="text-xl">{rating}</h2>
                <Rating rating={rating} setRating={setRating} readonly={true} />
            </div>

            <Link
                to={
                    type === "vehicle"
                        ? `/cars/${title}/${id}`
                        : type === "dealer"
                        ? `/dealers/${id}`
                        : type === "service"
                        ? `/services/${id}`
                        : type === "article"
                        ? `/news/${id}`
                        : type === "spare_part"
                        ? `/spare-parts/${id}`
                        : `/${type}/${id}`
                }
                state={data}
                className="bg-primary text-white p-2 text-sm hover:bg-primary-hover duration-150"
            >
                {t("home-page.check-the")}
            </Link>
        </div>
    );
};

const SearchData = () => {
    const { t } = useTranslation();
    const searchText = "b";
    const [selectedTab, setSelectedTab] = useState<
        "article" | "dealer" | "vehicle" | "spare_part" | "service"
    >("vehicle");

    const tabs: SearchDataTabs[] = [
        {
            title: t("sidebar.cars"),
            value: "vehicle",
        },
        {
            title: t("sidebar.dealers"),
            value: "dealer",
        },
        {
            title: t("sidebar.services"),
            value: "service",
        },
        {
            title: t("sidebar.news"),
            value: "article",
        },
        {
            title: t("sidebar.spare-parts"),
            value: "spare_part",
        },
    ];

    const { data: searchTabs } = useGetSearchDataQuery({
        page: 1,
        query: searchText,
    });
    const [searchTrigger, { data: searchData, isFetching }] =
        useLazyGetSearchDataQuery();

    const filterData = searchData?.items as
        | CarObject[]
        | DealersType[]
        | Blogs[]
        | SpareParts[];

    useEffect(() => {
        if (selectedTab) {
            searchTrigger(
                {
                    type: selectedTab,
                    page: 1,
                    query: searchText.toLowerCase(),
                },
                true
            );
        }
    }, [selectedTab]);

    return (
        <div className="mt-20">
            <Header title={t("navbar.search")} />
            <div className="w-full py-5 border-b flex items-center gap-5">
                {tabs.map((item, index) => (
                    <button
                        key={index}
                        className={`text-lg font-medium disabled:cursor-default flex gap-2 items-center ${
                            selectedTab === item.value
                                ? "text-primary"
                                : "text-gray-500"
                        }`}
                        disabled={selectedTab === item.value}
                        onClick={() => setSelectedTab(item.value)}
                    >
                        {item.title}
                        <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                            {searchTabs?.metadata?.[item.value]}
                        </div>
                    </button>
                ))}
            </div>

            <div className="w-full min-h-[500px] bg-white mt-5 shadow-sm">
                <div className="w-full h-full p-10">
                    {filterData?.length ? (
                        filterData.map((item, inx) => (
                            <RankingsCard
                                key={inx}
                                rank={inx + 1}
                                data={item}
                                type={selectedTab}
                            />
                        ))
                    ) : (
                        <p className="text-xl">{t("not-found")}</p>
                    )}
                </div>
                {isFetching && (
                    <div className="w-full flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-solid rounded-full border-primary border-t-transparent animate-spin"></div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default SearchData;
