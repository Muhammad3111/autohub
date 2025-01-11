/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { IoBanOutline, IoSpeedometerOutline } from "react-icons/io5";
import { PiGasCan } from "react-icons/pi";
import { TbPropeller } from "react-icons/tb";
import { useGetCarsQuery } from "../../features/cars/carSlice";
import DeleteCar from "./DeleteCar";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type Image = {
  id: string;
  path: string;
  created_at: string;
};

export type Vehicle = {
  brand: string;
  name_uz: string;
  name_ru: string;
  model: string;
  year: number;
  transmission: string;
  vehicle_type: string;
  price: number;
  engine_type: string;
  drive_type: string;
  color_uz: string;
  color_ru: string;
  cover_image: string | null;
  images: Image[];
  properties: string | null;
  description_uz: string;
  description_ru: string;
  id: string;
  view_count: number;
  created_at: string;
  updated_at: string;
};

export default function ReadCars() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 12; // 4 ustunda ko'rsatiladi
  const [filteredCars, setFilteredCars] = useState<Vehicle[]>([]);
  const { data, isLoading } = useGetCarsQuery({ page, limit: perPage });
  const navigate = useNavigate();
  useEffect(() => {
    if (data && data.vehicles) {
      const filtered = data.vehicles.filter((car: any) =>
        car.name_uz.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCars(filtered);
    }
  }, [data, searchQuery]);

  const handleNextPage = () => {
    if (data && page < data.total_pages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      {/* Qidiruv input */}
      <div className="mb-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Mashina nomi bo'yicha qidirish..."
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>

      {/* Mashinalar ro'yxati */}
      <div className="h-[60vh] overflow-y-auto scrollbar-thin flex items-center justify-center">
        <div className="grid grid-cols-4 gap-4 w-full">
          {isLoading ? (
            <p>Loading...</p>
          ) : filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div
                key={car.id}
                className="col-span-1 flex flex-col rounded-xl shadow-lg border-2 overflow-hidden bg-white"
              >
                <div className="relative group">
                  <img
                    src={`http://89.223.126.64:8080${
                      car.cover_image || "placeholder.jpg"
                    }`}
                    alt={car.name_uz}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => navigate(`/admin/cars/update/${car.id}`)}
                    className="group-hover:opacity-100 opacity-0 rounded-full absolute top-2 right-12 bg-blue-600 text-white p-2 duration-300 z-40"
                  >
                    <MdOutlineEdit className="text-lg" />
                  </button>
                  <DeleteCar id={car.id} />
                </div>
                <div className="flex flex-col items-start gap-6 p-4">
                  <div className="flex items-start justify-between w-full">
                    <h1 className="text-lg font-bold">{car.name_uz}</h1>
                    <p className="text-lg font-bold">{car.price} UZS</p>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    <li className="p-1.5 border rounded-md shadow-md text-sm">
                      Yil: {car.year}
                    </li>
                    <li className="p-1.5 border rounded-md shadow-md text-sm">
                      Motor: {car.engine_type}
                    </li>
                    <li className="p-1.5 border rounded-md shadow-md text-sm">
                      Transmissiya: {car.transmission}
                    </li>
                    <li className="p-1.5 border rounded-md shadow-md text-sm">
                      Rang: {car.color_uz}
                    </li>
                  </ul>
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                      <IoSpeedometerOutline className="text-xl" />
                      <p className="text-base font-normal">{car.drive_type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <TbPropeller className="text-xl" />
                      <p className="text-base font-normal">
                        {car.transmission}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <PiGasCan className="text-xl" />
                      <p className="text-base font-normal">{car.engine_type}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full col-span-4 flex items-center justify-center gap-4">
              <h1 className="text-2xl font-semibold">
                Ma'lumotlar mavjud emas
              </h1>
              <IoBanOutline className="text-4xl" />
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <p>
          Page {page} of {data?.total_pages || 1}
        </p>
        <button
          onClick={handleNextPage}
          disabled={data && page >= data.total_pages}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
