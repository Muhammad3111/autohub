import { useState, useMemo } from "react";
import { useGetCarsQuery } from "../../features/cars/carSlice";
import { Link } from "react-router-dom";
import SkeletonByHome from "../../components/skeletons/SkeletonByHome";

const CarPrices = () => {
    const [selectedPrice, setSelectedPrice] = useState(0);
    const { data, isLoading } = useGetCarsQuery({ page: 1 });
    const [isFiltering, setIsFiltering] = useState(false);

    const cars = useMemo(() => data?.items || [], [data]);

    const filteredCars = cars.filter((car) => {
        const price = car.specifics[0].price;
        switch (selectedPrice) {
            case 1:
                return price < 20000;
            case 2:
                return price >= 20000 && price <= 50000;
            case 3:
                return price > 50000 && price <= 70000;
            case 4:
                return price > 70000 && price <= 100000;
            case 5:
                return price > 100000 && price <= 150000;
            case 6:
                return price > 150000;
            default:
                return car.view_count > 0;
        }
    });

    const handleChangeFiltering = (index: number) => {
        setIsFiltering(true);
        setSelectedPrice(index);

        const timer = setTimeout(() => {
            setIsFiltering(false);
        }, 500);

        return () => clearTimeout(timer);
    };

    return (
        <div className="w-full min-h-[300px] border">
            <div className="w-full h-10 border-b flex items-center bg-grey">
                {[
                    "Popular",
                    "Less than 20 000 $",
                    "20 000 $ - 50 000 $",
                    "50 000 $ - 70 000 $",
                    "70 000 $ - 100 000 $",
                    "100 000 $ - 150 000 $",
                    "More than 150 000 $",
                ].map((label, index) => (
                    <button
                        key={index}
                        className={`px-6 h-full ${
                            selectedPrice === index
                                ? "bg-primary text-white"
                                : ""
                        }`}
                        disabled={selectedPrice === index}
                        onClick={() => handleChangeFiltering(index)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {isLoading || isFiltering ? (
                <SkeletonByHome />
            ) : (
                <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
                    {filteredCars.length > 0 ? (
                        filteredCars.map((item) => (
                            <Link
                                to={`/cars/${item?.specifics[0].brand.name}/${item.id}`}
                                key={item.id}
                                className="border p-2 text-center hover:border-primary duration-300 group w-full"
                            >
                                <img
                                    width={150}
                                    src={`http://89.223.126.64:8080/api/${item.cover_image}`}
                                    alt={item.specifics[0].name_uz}
                                    loading="lazy"
                                    className="group-hover:scale-105 duration-300 object-cover h-40"
                                />
                                <p>{item.specifics[0].name_uz}</p>
                                <p>
                                    ${item.specifics[0].price.toLocaleString()}
                                </p>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-500 whitespace-nowrap">
                            No cars found for this price range.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CarPrices;
