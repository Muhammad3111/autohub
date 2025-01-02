import  { useState } from "react";
import { IoSpeedometerOutline } from "react-icons/io5";
import { PiGasCan } from "react-icons/pi";
import { TbPropeller } from "react-icons/tb";

const carsData = [
  {
    id: 1,
    name: "Tucson",
    price: "16000$",
    year: 2021,
    engine: "2.0L",
    power: "150HP",
    body: "SUV",
    color: "Qizil",
    mileage: "12.000 km",
    transmission: "Avtomat",
    fuel: "Benzin",
    image: "https://imgd.aeplcdn.com/664x374/n/dkalcva_1596121.jpg?q=80",
  },
  {
    id: 2,
    name: "Santa Fe",
    price: "18000$",
    year: 2022,
    engine: "2.4L",
    power: "180HP",
    body: "SUV",
    color: "Oq",
    mileage: "8.000 km",
    transmission: "Avtomat",
    fuel: "Benzin",
    image: "https://imgd.aeplcdn.com/664x374/n/dkalcva_1596121.jpg?q=80",
  },
  // Qo'shimcha ma'lumotlar qo'shishingiz mumkin
];

export default function ReadCars() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCars = carsData.filter((car) =>
    car.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Qidiruv input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Mashina nomi bo'yicha qidirish..."
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>

      {/* Mashinalar ro'yxati */}
      <div className="grid grid-cols-3 gap-4">
        {filteredCars.map((car) => (
          <div
            key={car.id}
            className="col-span-1 flex flex-col rounded-xl shadow-lg border-2 overflow-hidden"
          >
            <div>
              <img src={car.image} alt={car.name} className="w-full h-56" />
            </div>
            <div className="flex flex-col items-start gap-6 p-4">
              <div className="flex items-start justify-between w-full">
                <h1 className="text-2xl font-bold">{car.name}</h1>
                <p className="text-lg font-bold">{car.price}</p>
              </div>
              <ul className="flex flex-wrap gap-2">
                <li className="p-2 border rounded-md shadow-md">
                  Yil: {car.year}
                </li>
                <li className="p-2 border rounded-md shadow-md">
                  Motor: {car.engine}
                </li>
                <li className="p-2 border rounded-md shadow-md">
                  Quvvat: {car.power}
                </li>
                <li className="p-2 border rounded-md shadow-md">
                  Kuzov: {car.body}
                </li>
                <li className="p-2 border rounded-md shadow-md">
                  Rang: {car.color}
                </li>
              </ul>
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <IoSpeedometerOutline className="text-2xl" />
                  <p className="text-base font-bold">{car.mileage}</p>
                </div>
                <div className="flex items-center gap-2">
                  <TbPropeller className="text-2xl" />
                  <p className="text-base font-bold">{car.transmission}</p>
                </div>
                <div className="flex items-center gap-2">
                  <PiGasCan className="text-2xl" />
                  <p className="text-base font-bold">{car.fuel}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
