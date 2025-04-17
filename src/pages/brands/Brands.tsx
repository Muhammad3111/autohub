import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Image from "../../components/image/Image";
import { useGetBrandsQuery } from "../../features/brands/brands";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useTranslation } from "react-i18next";

const Brands = () => {
    const { data } = useGetBrandsQuery({ page: 1 });
    const { t } = useTranslation();

    const context = useContext(Context);
    if (!context) {
        throw new Error(
            "Ushbu component context providerdan tashqarida ishlatilmoqda"
        );
    }
    const { setSelected } = context;

    return (
        <div className='mt-20'>
            <Header title='Brands' />

            <div className='grid grid-cols-5 gap-10'>
                {data?.items ? (
                    data?.items.map((brand) => (
                        <Link
                            to={`/cars/${brand.name}`}
                            key={brand.id}
                            className='bg-white px-10 py-7 flex items-center gap-10 shadow-md'
                            state={brand}
                            onClick={() =>
                                setSelected({
                                    name: brand.name,
                                    value: brand.name
                                })
                            }
                        >
                            <Image
                                src={brand.image}
                                alt={brand.name}
                                width={50}
                            />
                            <h2 className='font-semibold text-xl'>
                                {brand.name}
                            </h2>
                        </Link>
                    ))
                ) : (
                    <div className='flex items-center justify-center col-span-5'>
                        <h2 className='font-medium text-4xl'>
                            {t("home-page.brands-not-found")}
                        </h2>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Brands;
