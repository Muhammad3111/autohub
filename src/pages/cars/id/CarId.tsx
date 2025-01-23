import { useParams } from "react-router-dom";
import { useGetCarByIdQuery } from "../../../features/cars/carSlice";
import Button from "../../../utility/button/Button";
import { IoCarSportOutline } from "react-icons/io5";
import { PiGasCan } from "react-icons/pi";
import { BsCalendar2Date } from "react-icons/bs";
import { TbPropeller, TbSteeringWheel } from "react-icons/tb";

type CarData = {
    id?: string;
    name_uz: string;
    name_ru: string;
    brand_id: number;
    model: string;
    year: number;
    transmission: string;
    vehicle_type: string;
    price: number;
    engine_type: string;
    color_uz: string;
    color_ru: string;
    drive_type: string;
    properties: Record<string, string>;
    description_uz: string;
    description_ru: string;
    cover_image?: { id: string; path: string };
    images?: { id: string; path: string }[];
};

export default function CarId() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetCarByIdQuery(id!);
    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    const car: CarData = data;
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 px-28 py-5">
                <h1 className="text-4xl font-bold">{car.name_uz}</h1>
                <div className="flex items-center gap-1">
                    <a
                        href="#"
                        className="text-gray-500 hover:text-primary duration-300"
                    >
                        Bosh Sahifa
                    </a>{" "}
                    <span className="text-gray-500">- Avtomobillar</span>
                    <span>- {car.name_uz}</span>
                </div>
            </div>
            <div className="flex flex-col gap-4 bg-white py-5 px-28">
                <div className="flex items-center gap-4">
                    <div className="basis-1/2">
                        <img
                            src={`http://89.223.126.64:8080${
                                car.cover_image?.path || "placeholder.jpg"
                            }`}
                            alt={car.name_uz}
                            className="w-full h-[450px] object-cover"
                        />
                    </div>
                    <div className="basis-1/2 grid grid-cols-2 gap-4">
                        {car.images?.slice(0, 4).map((img, ind) => (
                            <div key={ind}>
                                <img
                                    src={`http://89.223.126.64:8080${img.path}`}
                                    alt={img.path}
                                    className="w-full h-[217px] object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between py-4 border-b-2">
                    <h1 className="text-4xl font-bold capitalize">
                        {car.name_uz}
                    </h1>
                    <div className="flex items-center gap-10">
                        <Button className="bg-black text-white px-4">
                            Apply for Test Driver
                        </Button>
                        <h2 className="text-2xl font-bold text-primary">
                            ${car.price}
                        </h2>
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-4 py-4 border-b-2">
                    <div className="col-span-full">
                        <h1 className="text-2xl font-semibold">Car Overview</h1>
                    </div>
                    <div className="col-span-1 rounded-md border border-black p-4 flex items-center justify-center gap-6">
                        <IoCarSportOutline className="text-5xl" />
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold">Body</h2>
                            <p className="text-sm text-gray-500">
                                1100Kg - 1700Kg
                            </p>
                        </div>
                    </div>
                    <div className="col-span-1 rounded-md border border-black p-4 flex items-center justify-center gap-6">
                        <PiGasCan className="text-5xl" />
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold">FuelType</h2>
                            <p className="text-sm text-gray-500">
                                {car.engine_type}
                            </p>
                        </div>
                    </div>
                    <div className="col-span-1 rounded-md border border-black p-4 flex items-center justify-center gap-6">
                        <BsCalendar2Date className="text-5xl" />
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold">Year</h2>
                            <p className="text-sm text-gray-500">{car.year}</p>
                        </div>
                    </div>
                    <div className="col-span-1 rounded-md border border-black p-4 flex items-center justify-center gap-6">
                        <TbPropeller className="text-5xl" />
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold">
                                Transmission
                            </h2>
                            <p className="text-sm text-gray-500">
                                {car.transmission}
                            </p>
                        </div>
                    </div>
                    <div className="col-span-1 rounded-md border border-black p-4 flex items-center justify-center gap-6">
                        <TbSteeringWheel className="text-5xl" />
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold">
                                Drive Type
                            </h2>
                            <p className="text-sm text-gray-500">
                                {car.drive_type}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-4 grid-rows-3 gap-4">
                    <div className="col-span-4 row-span-1">
                        <h1 className="text-2xl font-semibold">
                            Car Description
                        </h1>
                    </div>
                    <div className="col-span-3 row-span-1 rounded-md">
                        <p className="text-sm">{car.description_uz}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
