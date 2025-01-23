import { useEffect, useState } from "react";
import CardCar from "../../components/card/CardCar";
import { useGetCarsQuery } from "../../features/cars/carSlice";
import Pagination from "../../utility/pagination/Pagination";
import Filter from "../../utility/filter/Filter";

const Cars = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        name_uz: "",
        brand: "",
        model: "",
        price: 0,
    });
    const { data } = useGetCarsQuery({
        page: currentPage,
        limit: 12,
        name_uz: filters.name_uz,
        brand: filters.brand,
        model: filters.model,
        price: filters.price,
    });
    useEffect(() => {
        if (data?.total_pages) {
            setTotalPages(data.total_pages); // Birinchi so‘rov amalga oshirilgandan keyin skip-ni true qilib qo‘yish
        }
    }, [data?.total_pages]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page); // Sahifani yangilaydi
    };
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold">Avtomobillar</h1>
                <div className="flex items-center gap-1">
                    <a
                        href="#"
                        className="text-gray-500 hover:text-primary duration-300"
                    >
                        Bosh Sahifa
                    </a>{" "}
                    <span className="text-black">- Avtomobillar</span>
                </div>
            </div>
            <div className="flex flex-col gap-4 bg-white">
                <div className="flex flex-col gap-4 items-center">
                    <h1>Avtomobilingizni</h1>
                    <Filter setFilters={setFilters} filters={filters} />
                </div>
                <div className="grid grid-cols-4 gap-4 py-6">
                    {data?.items.map((car) => (
                        <CardCar key={car.id} vehicle={car} />
                    ))}
                </div>
            </div>
            <div className="w-full">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};
export default Cars;
