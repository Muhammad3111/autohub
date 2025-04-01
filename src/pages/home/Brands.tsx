import { useContext } from "react";
import { Context } from "../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { collection } from "../../mock/data.json";
import { useGetBrandsQuery } from "../../features/brands/brands";
import { FaArrowRight } from "react-icons/fa6";
import Image from "../../components/image/Image";
import { useTranslation } from "react-i18next";

const Brands = () => {
    const context = useContext(Context);
    const navigate = useNavigate();
    const { t } = useTranslation();

    if (!context) {
        throw new Error(
            "Ushbu component context providerdan tashqarida ishlatilmoqda"
        );
    }

    const { setModel } = context;

    const carModels: Collection[] = collection;
    const { data: carBrands, isLoading } = useGetBrandsQuery({ page: 1 });

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mt-20 w-full bg-light p-6">
                {carModels.slice(1).map((item, index) => (
                    <button
                        onClick={() => {
                            setModel(item.title);
                            navigate(`/cars/${item.title}`);
                        }}
                        key={index}
                        className="flex flex-col items-center gap-1"
                    >
                        <p className="text-dark uppercase">{item.title}</p>
                    </button>
                ))}
            </div>

            <div className="w-full py-5 mt-5 grid grid-cols-10 gap-4 justify-items-center bg-light relative">
                {isLoading ? (
                    <h2>{t("loading")}...</h2>
                ) : carBrands?.items?.length ? (
                    carBrands.items.slice(0, 10).map((item) => (
                        <Link
                            key={item.id}
                            className="flex flex-col items-center gap-2 text-center"
                            to={`/brands/${item.name}-${item.id}`}
                            state={item}
                        >
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={40}
                            />
                            <p className="text-dark uppercase">{item.name}</p>
                        </Link>
                    ))
                ) : (
                    <h2>{t("home-page.brands-not-found")}</h2>
                )}
            </div>

            <div className="w-full flex items-center justify-center mt-10">
                {carBrands?.items.length && (
                    <div>
                        <button
                            onClick={() => navigate("/brands")}
                            className="bg-primary hover:bg-primary-hover text-white py-2 px-4 flex items-center gap-1 duration-150"
                        >
                            <p>{t("home-page.all-brands")}</p>
                            <FaArrowRight />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Brands;
