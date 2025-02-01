import { useParams } from "react-router-dom";
import { useGetCarByIdQuery } from "../../../features/cars/carSlice";
import Button from "../../../utility/button/Button";
import { IoCarSportOutline } from "react-icons/io5";
import { PiGasCan } from "react-icons/pi";
import { BsCalendar2Date } from "react-icons/bs";
import { TbPropeller, TbSteeringWheel } from "react-icons/tb";
import Header from "../../../components/header/Header";

export default function CarId() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetCarByIdQuery(id!);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const car: CarObject = data;
  return (
    <div className="flex flex-col gap-4">
      <Header title={car.specifics[0].name_uz} />
      <div className="flex flex-col gap-4 py-5 my-container p-10">
        <div className="flex items-center gap-4">
          <div className="basis-1/2">
            <img
              src={`http://89.223.126.64:8080/api/${
                car.cover_image || "placeholder.jpg"
              }`}
              alt={car.specifics[0].name_uz}
              className="w-full h-[450px] object-cover"
            />
          </div>
          <div className="basis-1/2 grid grid-cols-2 gap-4">
            {car.images?.slice(0, 4).map((img, ind) => (
              <div key={ind}>
                <img
                  src={`http://89.223.126.64:8080/api/${img.path}`}
                  alt={img.path}
                  className="w-full h-[217px] object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between py-4 border-b-2 border-gray-400">
          <h1 className="text-4xl font-bold capitalize">
            {car.specifics[0].name_uz}
          </h1>
          <div className="flex items-center gap-10">
            <Button className="bg-black text-white px-4">
              Apply for Test Driver
            </Button>
            <h2 className="text-2xl font-bold text-primary">
              ${Number(car.specifics[0].price).toLocaleString()}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4 py-4 border-b-2 border-gray-400">
          <div className="col-span-full">
            <h1 className="text-2xl font-semibold">Car Overview</h1>
          </div>
          <div className="col-span-1 rounded-md border border-black p-4 flex items-center justify-center gap-6 bg-white">
            <IoCarSportOutline className="text-5xl" />
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">Body</h2>
              <p className="text-sm text-gray-500">1100Kg - 1700Kg</p>
            </div>
          </div>
          <div className="col-span-1 rounded-md border border-black p-4 flex items-center justify-center gap-6 bg-white">
            <PiGasCan className="text-5xl" />
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">Fuel Type</h2>
              <p className="text-sm text-gray-500">
                {car.specifics[0].engine_type}
              </p>
            </div>
          </div>
          <div className="col-span-1 rounded-md border border-black p-4 flex items-center justify-center gap-6 bg-white">
            <BsCalendar2Date className="text-5xl" />
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">Year</h2>
              <p className="text-sm text-gray-500">{car.specifics[0].year}</p>
            </div>
          </div>
          <div className="col-span-1 rounded-md border border-black p-4 flex items-center justify-center gap-6 bg-white">
            <TbPropeller className="text-5xl" />
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">Transmission</h2>
              <p className="text-sm text-gray-500">
                {car.specifics[0].transmission}
              </p>
            </div>
          </div>
          <div className="col-span-1 rounded-md border border-black p-4 flex items-center justify-center gap-6 bg-white">
            <TbSteeringWheel className="text-5xl" />
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">Drive Type</h2>
              <p className="text-sm text-gray-500">
                {car.specifics[0].drive_type}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-3 gap-4">
          <div className="col-span-3 row-span-1">
            <h1 className="text-2xl font-semibold">Car Description</h1>
            <p className="text-sm">{car.specifics[0].description_uz}</p>
          </div>
          <div className="col-span-1 row-span-3 bg-white p-4 flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Vehicles details</h1>
            <div className="flex flex-col divide-y">
              {car.measurements.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-4"
                >
                  <h2 className="text-sm font-semibold text-black">
                    {item.length}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {item.gross_vehicle_weight}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-3 row-span-1 flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Car Special Features</h1>
            <div className="grid grid-cols-3 gap-4">
              {car.properties.map((item, index) => (
                <div
                  className="col-span-1 flex items-center gap-4 bg-white p-2"
                  key={index}
                >
                  <h2 className="text-base font-semibold capitalize text-gray-500">
                    {item.key_uz}:
                  </h2>
                  <p className="text-base capitalize">{item.value_uz}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
