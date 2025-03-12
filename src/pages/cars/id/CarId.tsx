import { useNavigate, useParams } from "react-router-dom";
import { useGetCarByIdQuery } from "../../../features/cars/carSlice";
import Header from "../../../components/header/Header";
import ModelViewer from "../../../utility/Model/Model";
import { RiFullscreenLine } from "react-icons/ri";
import Button from "../../../utility/button/Button";

export default function CarId() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data, isLoading } = useGetCarByIdQuery(id!);
    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    const car: CarObject = data;
    return (
        <div className="flex flex-col gap-4 w-full">
            <Header title={car.specifics[0].name_uz} />
            <div className="flex flex-col gap-4 py-5 my-container">
                <h1 className="text-4xl font-bold capitalize">
                    {car.specifics[0].name_uz}
                </h1>
                <div className="flex gap-4">
                    <div className="basis-1/2 flex gap-2">
                        <div className="w-full h-[350px] bg-gray-300 relative">
                            <ModelViewer />
                            <button className="bg-primary text-white text-sm px-2 py-1 absolute bottom-2 left-2">
                                Barcha rasmlarni ko'rish
                            </button>
                            <button
                                onClick={() =>
                                    navigate(`/cars/3dmodel/panorama`)
                                }
                                className="absolute bottom-2 right-2"
                            >
                                <RiFullscreenLine className="text-2xl" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-2 w-full items-start">
                            {car.images?.slice(0, 3).map((img, ind) => (
                                <div key={ind}>
                                    <img
                                        src={`http://89.223.126.64:8080/api/${img.path}`}
                                        alt={img.path}
                                        className="w-full h-[110px] object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="basis-1/2 flex flex-col justify-between p-6">
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold text-gray-500">
                                Price on Diller:
                            </p>
                            <p className="text-xl text-primary">
                                ${car.specifics[0].price}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold text-gray-500">
                                Manufacturer's suggested retail price:
                            </p>
                            <p>{car.specifics[0].price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold text-gray-500">
                                Manufacturer:
                            </p>
                            <p>{car.specifics[0].brand.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold text-gray-500">
                                Duration:
                            </p>
                            <p>630km</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-semibold text-gray-500">
                                Fast Charger:
                            </p>
                            <p>0,17h</p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() =>
                                    navigate(`/cars/parametrs/${car.id}`)
                                }
                                className="border-red-500 border text-base text-black px-4 py-2"
                            >
                                Parametrs
                            </button>
                            <Button className="px-4">Calculation</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
