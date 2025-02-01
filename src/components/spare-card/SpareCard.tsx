import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Rating from "../../utility/rating/Rating";
import { SiBrandfolder } from "react-icons/si";
import { LuNotepadText } from "react-icons/lu";
import { IoCarSportOutline } from "react-icons/io5";

type Props = {
  spares: SpareParts;
};

const CardCar = ({ spares }: Props) => {
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const toggleSave = () => setIsSaved((prev) => !prev);

  return (
    <div
      onClick={() => navigate(`/cars/${spares.id}`)}
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
          src={`http://89.223.126.64:8080/api/${spares.cover_image}`}
          alt={spares.name_uz || "car-image.png"}
          className="w-full h-60 object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-4 hover:bg-primary hover:text-white h-full">
        <span className="bg-green-600/20 px-2 py-1 rounded-md text-center text-sm text-black w-max group-hover:bg-white">
          {spares.oem_code}
        </span>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold truncate">{spares.name_uz}</h1>
          <strong className="text-lg font-semibold">
            {Number(spares.price).toLocaleString()}$
          </strong>
        </div>
        <div className="border-y-2 py-4 flex flex-col gap-2 h-32">
          <p className="text-sm text-gray-500 line-clamp-3 group-hover:text-white">
            {spares.description_uz}
          </p>
          <div className="flex items-end gap-2">
            <Rating rating={spares.rating} /> <sup>{spares.rating}+Reviews</sup>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SiBrandfolder className="text-xl" />
            <span>{spares.brand_id}</span>
          </div>
          <div className="flex items-center gap-2">
            <LuNotepadText className="text-xl" />
            <span>{spares.category_id}</span>
          </div>
          <div className="flex items-center gap-2">
            <IoCarSportOutline className="text-xl" />
            <span>{spares.vehicle.name_uz}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCar;
