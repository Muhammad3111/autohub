import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import { collection } from "../../mock/data.json";
import CardCar from "../../components/card/CardCar";
import { useGetCarsQuery } from "../../features/cars/carSlice";
import Button from "../../utility/button/Button";
import { Context } from "../../context/Context";
import SkeletonByCars from "../../components/skeletons/SkeletonByCars";
import { useTranslation } from "react-i18next";
import Image from "../../components/image/Image";
import { useGetBrandsQuery } from "../../features/brands/brands";
import { carIcons } from "../../utility/carIcons/carIcons";

const Cars = () => {
    const context = useContext(Context);
    const navigate = useNavigate();
    const {
        data: carsData,
        isLoading,
        isSuccess,
    } = useGetCarsQuery({ page: 1 });
    const { t } = useTranslation();

    if (!context) {
        throw new Error("Ushbu component contextdan tashqarida ishlatilmoqda");
    }

    const { setModel, setSelected } = context;
    const cars = carsData?.items || [];
    const rawCollection = collection.map((item) => {
        const value = item.value as CarType;
        return {
            ...item,
            icon: carIcons[value],
        };
    });
    const { data: carBrands, isLoading: carBrandLoading } = useGetBrandsQuery({
        page: 1,
    });

    return (
        <div className="w-full">
            <Header title={t("cars-page.header-title")} />
            <div className="flex flex-col gap-4">
                {collection.length > 1 && (
                    <div className="flex flex-col gap-4 p-10 bg-white">
                        <h1 className="text-4xl font-semibold inline-flex gap-2 justify-center flex-wrap">
                            {t("cars-page.header-title")}:
                            <span className="text-primary">
                                {t("cars-page.corpus")} {t("cars-page.types")}
                            </span>
                        </h1>
                        <div className="grid grid-cols-8 gap-4">
                            {rawCollection.slice(1).map((c) => (
                                <div
                                    key={c.id}
                                    className="flex flex-col items-center gap-2 col-span-1 shadow-md border bg-grey hover:border-red-500 duration-300 p-4 cursor-pointer"
                                    onClick={() => {
                                        setModel(c.title);
                                        navigate(`/cars/${c.title}`);
                                    }}
                                >
                                    <img
                                        src={c.icon.white}
                                        alt=""
                                        className="w-32 h-20 object-cover"
                                    />
                                    <h3 className="text-lg font-semibold text-center">
                                        {t(`home-page.brand-${c.value}`)}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-4 mt-10">
                    <h1 className="text-4xl font-semibold inline-flex gap-2 justify-center flex-wrap">
                        {t("cars-page.most-popular")}:
                        <span className="text-primary">
                            {t("cars-page.car-brands")}
                        </span>
                    </h1>
                    <div className="w-full py-5 mt-5 grid grid-cols-10 gap-4 justify-items-center bg-light relative">
                        {carBrandLoading ? (
                            <h2>{t("loading")}...</h2>
                        ) : carBrands?.items?.length ? (
                            carBrands.items.slice(0, 10).map((item) => (
                                <Link
                                    key={item.id}
                                    className="flex flex-col items-center gap-2 text-center"
                                    to={`/cars/${item.name}`}
                                    state={item}
                                    onClick={() =>
                                        setSelected({
                                            name: item.name,
                                            value: item.name,
                                        })
                                    }
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={40}
                                    />
                                    <p className="text-dark uppercase">
                                        {item.name}
                                    </p>
                                </Link>
                            ))
                        ) : (
                            <h2>{t("home-page.brands-not-found")}</h2>
                        )}
                    </div>
                    <div className="col-span-full flex justify-center">
                        <Link to={"/brands"}>
                            <Button className="px-4">
                                {t("cars-page.see-all-brands")}
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col gap-4 p-10 bg-white">
                    <h1 className="text-4xl font-semibold text-center mb-4">
                        {t("cars-page.highest-rating")}
                        <span className="text-primary">
                            {t("cars-page.header-title")}
                        </span>
                    </h1>
                    <div className="grid grid-cols-4 gap-4">
                        {isLoading ? (
                            <SkeletonByCars />
                        ) : isSuccess && cars.length > 0 ? (
                            cars
                                .slice(0, 8)
                                .map((car) => (
                                    <CardCar key={car.id} vehicle={car} />
                                ))
                        ) : (
                            <div className="col-span-full text-2xl font-semibold text-center py-10 bg-grey">
                                <h1 className="text-3xl font-normal text-primary">
                                    Ma'lumotlar topilmadi
                                </h1>
                            </div>
                        )}
                    </div>

                    {cars.length > 6 && (
                        <div className="col-span-full flex justify-center">
                            <Button className="px-4">Barchasini ko'rish</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cars;
