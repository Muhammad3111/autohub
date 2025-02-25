import Header from "../../../components/header/Header";
import { useGetCarsQuery } from "../../../features/cars/carSlice";
import { useContext, useState } from "react";
import Pagination from "../../../utility/pagination/Pagination";
import BrandsFilter from "../../../utility/filter/BrandsFilter";
import VehicleFilter from "../../../utility/filter/VehiclesFilter";
import ShopCard from "../../../components/card/ShopCard";
import { Context } from "../../../context/Context";

export default function Shop() {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "Ushbu component context providerdan tashqarida ishlatilmoqda"
    );
  }
  const { price, model, brand } = context;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: carsData } = useGetCarsQuery({
    page: 1,
    brand,
    model: model === "Cheksiz" ? "" : model,
    price_gt: price.start,
    price_lt: price.end,
  });
  const cars: CarObject[] = carsData?.items || [];
  const total_pages = carsData?.metadata?.total_pages || 1;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full">
      <Header title={"Avtomobillar"} />
      <div className="flex flex-col max-w-[1440px] mx-auto">
        <div className="flex gap-4 py-5 my-container bg-white">
          {/* Brendlar bo'limi */}
          <BrandsFilter />
          {/* Mashinalar bo'limi */}
          <div className="grid grid-cols-4 gap-4 basis-3/4 items-start">
            <div className="col-span-4">
              <VehicleFilter />
            </div>
            {cars?.length > 0 ? (
              cars.map((car) => <ShopCard key={car.id} vehicle={car} />)
            ) : (
              <div className="col-span-full text-2xl font-semibold text-center py-10 bg-grey">
                <h1 className="text-3xl font-normal text-primary">
                  Ma'lumotlar topilmadi
                </h1>
              </div>
            )}
            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={total_pages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
