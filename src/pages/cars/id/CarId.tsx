import { useNavigate, useParams } from "react-router-dom";
import { useGetCarByIdQuery } from "../../../features/cars/carSlice";
import Header from "../../../components/header/Header";
import ModelViewer from "../../../utility/Model/Model";
import { RiFullscreenLine } from "react-icons/ri";

export default function CarId() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useGetCarByIdQuery(id!);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const car: CarObject = data;
  return (
    <div className="flex flex-col gap-4 max-w-[1400px] mx-auto">
      <Header title={car.specifics[0].name_uz} />
      <div className="flex flex-col gap-4 py-5 my-container">
        <h1 className="text-4xl font-bold capitalize">
          {car.specifics[0].name_uz}
        </h1>
        <div className="flex items-center gap-4">
          <div className="basis-1/2 flex gap-2">
            <div className="w-full h-[350px] bg-gray-300 relative">
              <ModelViewer />
              <button className="bg-primary text-white text-sm px-2 py-1 absolute bottom-2 left-2">
                Barcha rasmlarni ko'rish
              </button>
              <button
                onClick={() => navigate(`/cars/3dmodel/panorama`)}
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
          <div className="basis-1/2 flex flec-col">
            <div>
              <p>Price on Diller</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
