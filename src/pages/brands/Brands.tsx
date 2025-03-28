import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Image from "../../components/image/Image";
import { useGetBrandsQuery } from "../../features/brands/brands";

const Brands = () => {
    const { data } = useGetBrandsQuery({ page: 1 });

    return (
        <div className="mt-20">
            <Header title="Brands" />

            <div className="grid grid-cols-5 gap-10">
                {data?.items.map((brand) => (
                    <Link
                        to={`/brands/${brand.name}-${brand.id}`}
                        key={brand.id}
                        className="bg-white px-10 py-7 flex items-center gap-10 shadow-md"
                        state={brand}
                    >
                        <Image src={brand.image} alt={brand.name} width={50} />
                        <h2 className="font-semibold text-xl">{brand.name}</h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default Brands;
