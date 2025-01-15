import { useEffect, useState } from "react";
import CardCar from "../../components/card/CardCar";
import { useGetCarsQuery } from "../../features/cars/carSlice";
import Pagination from "../../utility/pagination/Pagination";

const Cars = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { data } = useGetCarsQuery({ page: currentPage, limit: 12 });
  useEffect(() => {
    if (data?.total_pages) {
      setTotalPages(data.total_pages);
    }
  }, [data?.total_pages]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Sahifani yangilaydi
  };
  return (
    <div className="flex flex-col gap-4 container mx-auto">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Avtomobillar</h1>
        <div className="flex items-center gap-1">
          <a href="#" className="text-gray-500 hover:text-primary duration-300">
            Bosh Sahifa
          </a>{" "}
          <span className="text-gray-500">- Avtomobillar</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 bg-white py-6">
        {data?.vehicles.map((car) => (
          <CardCar key={car.id} vehicle={car} />
        ))}
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
