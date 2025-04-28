import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { useGetBrandsQuery } from "../../features/brands/brands";
import Image from "../../components/image/Image";
import { FaArrowRight } from "react-icons/fa6";

const AboutSlider = () => {
    const context = useContext(Context);
    const navigate = useNavigate();
    const { t } = useTranslation();

    if (!context) {
        throw new Error(
            "Ushbu component context providerdan tashqarida ishlatilmoqda"
        );
    }

    const { setSelected } = context;

    const { data: carBrandData, isLoading } = useGetBrandsQuery({ page: 1 });
    const carBrands = carBrandData?.items.filter(
        (car) => car.brand_type === "vehicle"
    );
    return (
        <div>
            <div className="w-full py-5 mt-5 grid grid-cols-10 gap-4 justify-items-center bg-light relative">
                {isLoading ? (
                    <h2>{t("loading")}...</h2>
                ) : carBrands?.length ? (
                    carBrands.slice(0, 10).map((item) => (
                        <Link
                            key={item.id}
                            className="flex flex-col items-center justify-between gap-2 text-center"
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
                            <p className="text-dark uppercase">{item.name}</p>
                        </Link>
                    ))
                ) : (
                    <h2>{t("home-page.brands-not-found")}</h2>
                )}
            </div>

            <div className="w-full flex items-center justify-center mt-10">
                {carBrands?.length && (
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
export default AboutSlider;
