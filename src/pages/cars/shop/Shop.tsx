import { useParams } from "react-router-dom";
import Header from "../../../components/header/Header";
import data from "../../../mock/data.json";
import CImage from "../../../assets/car-category.png";
import { useGetCarsQuery } from "../../../features/cars/carSlice";
import CardCar from "../../../components/card/CardCar";
import { useState } from "react";
import Pagination from "../../../utility/pagination/Pagination";
import Checkbox from "../../../utility/checkbox/Checkbox";

export default function Shop() {
  const { slug } = useParams<{ slug: string }>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: carsData } = useGetCarsQuery({ page: 1, model: slug });
  const collections: Collection[] = data.collection;
  const cars: CarObject[] = carsData?.items || [];
  const total_pages = carsData?.metadata?.total_pages || 1;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col">
      <Header title={slug || ""} />
      <div className="flex gap-4 py-5 my-container p-10 bg-white">
        <div className="flex flex-col gap-4 basis-1/4 bg-grey p-4">
          <h1 className="text-3xl font-semibold text-center">Kuzov turlari</h1>
          <div className="flex flex-col divide-y-2 divide-gray-300">
            {collections.map((c) => (
              <div
                key={c.id}
                className="flex justify-between items-center hover:text-primary duration-300 py-2 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <h3 className="text-base font-semibold">{c.title}</h3>
                </div>
                <img
                  src={c.icon || CImage}
                  alt={c.title}
                  className="w-8 h-8 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="grdi grid-cols-3 gap-4 basis-3/4">
          {cars?.length > 0 ? (
            cars
              .slice(0, 6)
              .map((car) => <CardCar key={car.id} vehicle={car} />)
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
  );
}
