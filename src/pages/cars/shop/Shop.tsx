import Header from "../../../components/header/Header";
import { useGetCarsQuery } from "../../../features/cars/carSlice";
import { useContext, useState } from "react";
import Pagination from "../../../utility/pagination/Pagination";
import BrandsFilter from "../../../utility/filter/BrandsFilter";
import VehicleFilter from "../../../utility/filter/VehiclesFilter";
import ShopCard from "../../../components/card/ShopCard";
import { Context } from "../../../context/Context";
import { useTranslation } from "react-i18next";

export default function Shop() {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "Ushbu component context providerdan tashqarida ishlatilmoqda"
    );
  }
  const { price, model, brand, selected } = context;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { t } = useTranslation();
  const { data: carsData } = useGetCarsQuery({
    page: 1,
    brand,
    vehicle_type: model === "Cheksiz" ? "" : model,
    price_gt: price.start,
    price_lt: price.end,
  });
  const cars: CarObject[] = carsData?.items || [];
  const total_pages = carsData?.metadata?.total_pages || 1;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredCars = cars.filter((car) => {
    if (selected.name && car.name_uz) {
      return car.name_uz.toLowerCase().includes(selected.value.toLowerCase());
    } else if (selected.value === "sales-ranking") {
      return car.view_count > 0;
    } else if (selected.value === "popular-ranking") {
      return car.rating !== undefined && car.rating > 0;
    } else if (selected.value === "new-car") {
      return car.created_at !== null;
    }
    return true;
  });

  return (
    <div className="w-full">
      <Header title={t("cars-page.header-title")} />
      <div className="flex flex-col">
        <div className="grid grid-cols-7 gap-4 my-container bg-white">
          {/* Brendlar bo'limi */}
          <BrandsFilter />
          {/* Mashinalar bo'limi */}
          <div className="grid grid-cols-5 gap-4 basis-3/4 items-start pt-4 col-span-6">
            <div className="col-span-5">
              <VehicleFilter />
            </div>
            {cars?.length > 0 ? (
              filteredCars.map((car) => <ShopCard key={car.id} vehicle={car} />)
            ) : (
              <div className="col-span-full text-2xl font-semibold text-center py-10 bg-grey">
                <h1 className="text-3xl font-normal text-primary">
                  {t("not-found")}
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
