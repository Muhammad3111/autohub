import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TbPropeller, TbSteeringWheelFilled } from "react-icons/tb";
import { PiGasCan } from "react-icons/pi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Rating from "../../utility/rating/Rating";
import { useGetBrandyIdQuery } from "../../features/brands/brands";

type Props = {
  vehicle: CarObject;
};

const CardCar = ({ vehicle }: Props) => {
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const toggleSave = () => setIsSaved((prev) => !prev);
  const { data: brands } = useGetBrandyIdQuery(vehicle.brand_id!);
  const brand: Brand = brands;
  return (
    <div
      onClick={() => navigate(`/cars/${brand.name}/${vehicle.id}`)}
      className="w-full min-h-[400px] bg-white flex flex-col duration-300 justify-between group relative shadow-md hover:shadow-lg border-2 cursor-pointer hover:border-primary"
    >
      {/* Save Button */}
      <button
        className="absolute right-2 top-2 p-1 bg-gray-300 border-2 border-gray-400 rounded-full"
        onClick={(e) => {
          e.stopPropagation();
          toggleSave();
        }}
      >
        {isSaved ? (
          <AiFillHeart className="text-xl text-red-500 " />
        ) : (
          <AiOutlineHeart className="text-xl text-gray-500 hover:text-primary duration-300" />
        )}
      </button>
      <div>
        <img
          src={`http://89.223.126.64:8080/api/${vehicle.cover_image}`}
          alt={vehicle.name_uz || "car-image.png"}
          className="w-full h-60 object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-4 group-hover:bg-primary group-hover:text-white h-full">
        <span className="bg-green-600/20 px-2 py-1 rounded-md text-center text-sm text-black w-max group-hover:bg-white">
          {brand.name}
        </span>
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold truncate basis-1/2">
            {vehicle.name_uz}
          </h1>
        </div>
        <div className="border-y-2 py-4 flex flex-col gap-2 h-32">
          <div className="flex items-end gap-2">
            <Rating rating={vehicle.rating || 0} />{" "}
            <sup>{vehicle.rating}+Reviews</sup>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TbSteeringWheelFilled className="text-xl" />
            <span>{vehicle.drive_type}</span>
          </div>
          <div className="flex items-center gap-2">
            <TbPropeller className="text-xl" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-2">
            <PiGasCan className="text-xl" />
            <span>{vehicle.engine_type}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCar;
