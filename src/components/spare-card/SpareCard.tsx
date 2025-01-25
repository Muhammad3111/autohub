import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuNotepadText } from "react-icons/lu";
import { SiBrandfolder } from "react-icons/si";
import { IoCarSportOutline } from "react-icons/io5";

type ApplicableModel = {
  id: string;
  name_uz: string;
  name_ru: string;
};

type Vehicle = {
  id: string;
  name_uz: string;
  name_ru: string;
};

export type Product = {
  name_uz: string;
  name_ru: string;
  description_uz: string | null;
  description_ru: string | null;
  brand_id: number;
  applicable_models: ApplicableModel[];
  cover_image: string | null;
  images: string[]; // Tasvirlar ro'yxati
  category_id: number;
  oem_code: string;
  status: boolean;
  price: number;
  vehicle_id: string;
  id: string;
  vehicle: Vehicle;
};

type Props = {
  spares: Product;
};

const SpareCard = ({ spares }: Props) => {
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const toggleSave = () => setIsSaved((prev) => !prev);

  return (
    <div
      onClick={() => navigate(`/cars/${spares.id}`)}
      className="w-full min-h-[400px] bg-white rounded-lg flex flex-col justify-between p-5 relative shadow-md hover:shadow-lg duration-200 border-2 cursor-pointer hover:border-primary"
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

      {/* Image */}
      <div className="w-full h-52 flex items-center justify-center">
        <img
          src={`http://89.223.126.64:8080${
            spares.cover_image || "placeholder.jpg"
          }`}
          alt={spares.name_uz}
          className="h-full w-full object-cover rounded-lg"
        />
      </div>

      {/* Title and Price */}
      <div className="flex justify-between items-center mt-3 border-b-2 pb-2">
        <p className="text-xl font-semibold w-2/3 truncate">{spares.name_uz}</p>
        <p className="font-medium text-lg text-primary">${spares.price}</p>
      </div>

      {/* Properties */}
      <div className="mt-3 flex flex-wrap gap-2">
        {spares.applicable_models.slice(0, 5).map((prop, index) => (
          <Property key={index} value={prop.name_uz || ""} />
        ))}
      </div>

      {/* Additional Info */}
      <div className="flex justify-between items-center mt-3 border-t-2 pt-2">
        <Info icon={<SiBrandfolder />} text={spares.brand_id} />
        <Info icon={<LuNotepadText />} text={spares.category_id} />
        <Info icon={<IoCarSportOutline />} text={spares.vehicle.name_uz} />
      </div>
    </div>
  );
};

type PropertyProps = { value: string };
const Property = ({ value }: PropertyProps) => (
  <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm flex gap-1">
    <p>{value}</p>
  </div>
);

type InfoProps = { icon: JSX.Element; text: string | number };
const Info = ({ icon, text }: InfoProps) => (
  <div className="flex items-center gap-2 text-gray-600 hover:text-primary duration-150">
    {icon}
    <p className="text-base">{text}</p>
  </div>
);

export default SpareCard;
