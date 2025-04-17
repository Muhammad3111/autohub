import { useContext, useRef } from "react";
import { useGetBrandsQuery } from "../../features/brands/brands";
import { useTranslation } from "react-i18next";
import Image from "../../components/image/Image";
import { Context } from "../../context/Context";

export default function BrandsFilter() {
    const { data, isLoading } = useGetBrandsQuery({ page: 1 });
    const { t } = useTranslation();
    const brandSectionRef = useRef<HTMLDivElement | null>(null);
    const brandListRef = useRef<HTMLDivElement | null>(null);
    const context = useContext(Context);
    if (!context) {
        throw new Error(
            "Ushbu component context providerdan tashqarida ishlatilmoqda"
        );
    }
    const { setSelected, selected } = context;
    if (isLoading) return <h2>{t("loading")}...</h2>;

    const brands: Brand[] = data?.items || [];

    const sortedBrands = [...brands]
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter((brand) => brand.brand_type === "vehicle");
    return (
        <div
            ref={brandSectionRef}
            className={`flex flex-col basis-1/4 bg-grey h-[90vh]`}
        >
            <div className='flex  h-full border-gray-300'>
                <div className='flex flex-col w-full relative'>
                    <div
                        ref={brandListRef}
                        className='flex-1 flex flex-col gap-2 overflow-y-auto border-gray-300 scrollbar-thin'
                    >
                        {sortedBrands.map((brand) => {
                            const currentLetter = brand.name[0];

                            return (
                                <button
                                    onClick={() =>
                                        setSelected({
                                            name: brand.name,
                                            value: brand.name
                                        })
                                    }
                                    key={brand.id}
                                    data-letter={currentLetter}
                                >
                                    <div className='flex items-center gap-4 cursor-pointer hover:text-primary duration-300 px-2'>
                                        <Image
                                            src={brand.image}
                                            alt={brand.name}
                                            className='w-10 h-10 object-contain'
                                        />
                                        <h3
                                            className={`text-base font-semibold ${
                                                selected.name === brand.name &&
                                                "text-primary"
                                            }`}
                                        >
                                            {brand.name}
                                        </h3>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
