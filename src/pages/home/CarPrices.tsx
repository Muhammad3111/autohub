import { useContext } from "react";
import { useGetCarsQuery } from "../../features/cars/carSlice";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { priceButtons } from "../../mock/data.json";
import Image from "../../components/image/Image";
import { useTranslation } from "react-i18next";

const CarPrices = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error(
            "Ushbu component context providerdan tashqarida ishlatilmoqda"
        );
    }

    const { setPrice, price } = context;

    const changePrice = (id: number, start: number, end: number) => {
        setPrice({ id, start, end });
    };

    const priceData: PriceButton[] = priceButtons;
    const { t } = useTranslation();
    const { data: carsData, isLoading } = useGetCarsQuery({
        page: 1,
        price_gt: price.start,
        price_lt: price.end
    });

    if (isLoading) {
        return <h2>{t("loading")}...</h2>;
    }

    const cars = carsData?.items || [];

    return (
        <div className='w-full min-h-[300px] border'>
            <div className='w-full h-10 border-b flex items-center bg-grey'>
                {priceData.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => changePrice(p.id, p.start, p.end)}
                        className={`text-base h-full px-4 ${
                            p.id === price.id
                                ? "bg-primary text-white"
                                : "bg-transparent"
                        } duration-150`}
                    >
                        {p.end === 0
                            ? p.start === 0
                                ? t("home-page.brand-all")
                                : `85K`
                            : p.end === 15000
                            ? `15K`
                            : p.title}
                    </button>
                ))}
            </div>

            <div className='p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4'>
                {cars.length > 0 ? (
                    cars.slice(0, 7).map((item) => (
                        <Link
                            to={`/cars/${item?.brand_id}/${item.id}`}
                            key={item.id}
                            className='border p-2 text-center hover:border-primary duration-300 group w-full'
                        >
                            <Image
                                src={item.cover_image || ""}
                                alt={item.name_uz}
                                loading='lazy'
                                className='group-hover:scale-105 duration-300 object-cover w-full h-40'
                            />
                            <p>{item.name_uz}</p>
                            <p>${item.price.toLocaleString()}</p>
                        </Link>
                    ))
                ) : (
                    <p className='text-gray-500 whitespace-nowrap'>
                        {t("not-found")}
                    </p>
                )}
            </div>
        </div>
    );
};

export default CarPrices;
