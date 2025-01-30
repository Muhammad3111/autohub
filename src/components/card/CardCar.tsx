import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { TbPropeller, TbSteeringWheelFilled } from "react-icons/tb";
import { PiGasCan } from "react-icons/pi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Rating from "../../utility/rating/Rating";

type Props = {
  vehicle: CarObject;
};

const CardCar = ({ vehicle }: Props) => {
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const toggleSave = () => setIsSaved((prev) => !prev);

  return (
    <div
      onClick={() => navigate(`/cars/${vehicle.id}`)}
      className="w-full min-h-[400px] bg-white flex flex-col duration-300 justify-between group relative shadow-md hover:shadow-lg border-2 cursor-pointer hover:border-primary"
    >
      {/* Save Button */}
      <button
        className="absolute right-6 top-6 p-1 bg-gray-300 border-2 border-gray-400 rounded-full"
        onClick={toggleSave}
      >
        {isSaved ? (
          <AiFillHeart className="text-xl text-red-500 " />
        ) : (
          <AiOutlineHeart className="text-xl text-gray-500 hover:text-primary duration-300" />
        )}
      </button>
      <div>
        <img
          src={vehicle.cover_image}
          alt={vehicle.specifics[0].name_uz || "car-image.png"}
          className="w-full h-60 object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-4 hover:bg-primary hover:text-white">
        <span className="bg-green-600/20 px-2 py-1 rounded-md text-center text-sm text-black w-max group-hover:bg-white">
          {vehicle.specifics[0].brand.name}
        </span>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold truncate">
            {vehicle.specifics[0].name_uz}
          </h1>
          <strong className="text-lg font-semibold">
            {Number(vehicle.specifics[0].price).toLocaleString()}
            {vehicle.specifics[0].currency === "USD" ? "$" : "UZS"}
          </strong>
        </div>
        <div className="border-y-2 py-4 flex flex-col gap-2">
          <p className="text-sm text-gray-500 line-clamp-3 group-hover:text-white">
            {vehicle.specifics[0].description_uz}
          </p>
          <div className="flex items-end gap-2">
            <Rating rating={vehicle.rating} />{" "}
            <sup>{vehicle.rating}+Reviews</sup>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TbSteeringWheelFilled className="text-xl" />
            <span>{vehicle.specifics[0].drive_type}</span>
          </div>
          <div className="flex items-center gap-2">
            <TbPropeller className="text-xl" />
            <span>{vehicle.specifics[0].transmission}</span>
          </div>
          <div className="flex items-center gap-2">
            <PiGasCan className="text-xl" />
            <span>{vehicle.specifics[0].engine_type}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCar;
