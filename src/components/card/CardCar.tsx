import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoSpeedometerOutline } from "react-icons/io5";
import { TbPropeller } from "react-icons/tb";
import { PiGasCan } from "react-icons/pi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Vehicle = {
  id: string;
  name_uz: string;
  year: number;
  transmission: string;
  vehicle_type: string;
  price: number;
  engine_type: string;
  color_uz: string;
  drive_type: string;
  properties: { key_uz: string | null; value_uz: string | null }[];
  cover_image: string | null;
};

type Props = {
  vehicle: Vehicle;
};

const CardCar = ({ vehicle }: Props) => {
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const toggleSave = () => setIsSaved((prev) => !prev);

  return (
    <div
      onClick={() => navigate(`/cars/${vehicle.id}`)}
      className="w-full min-h-[400px] bg-white rounded-lg flex flex-col p-5 relative shadow-md hover:shadow-lg duration-200 border-2 cursor-pointer hover:border-primary"
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
            vehicle.cover_image || "placeholder.jpg"
          }`}
          alt={vehicle.name_uz}
          className="h-full w-full object-cover rounded-lg"
        />
      </div>

      {/* Title and Price */}
      <div className="flex justify-between items-center mt-3 border-b-2 pb-2">
        <p className="text-xl font-semibold">{vehicle.name_uz}</p>
        <p className="font-medium text-lg text-primary">${vehicle.price}</p>
      </div>

      {/* Properties */}
      <div className="mt-3 flex flex-wrap gap-2">
        <Property label="Yili" value={vehicle.year.toString()} />
        {vehicle.properties.map((prop, index) => (
          <Property
            key={index}
            label={prop.key_uz || ""}
            value={prop.value_uz || ""}
          />
        ))}
        <Property label="Rangi" value={vehicle.color_uz} />
      </div>

      {/* Additional Info */}
      <div className="flex justify-between items-center mt-3 border-t-2 pt-2">
        <Info icon={<IoSpeedometerOutline />} text={vehicle.drive_type} />
        <Info icon={<TbPropeller />} text={vehicle.transmission} />
        <Info icon={<PiGasCan />} text={vehicle.engine_type} />
      </div>
    </div>
  );
};

type PropertyProps = { label: string; value: string };
const Property = ({ label, value }: PropertyProps) => (
  <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm flex gap-1">
    <p className="font-medium">{label}:</p>
    <p>{value}</p>
  </div>
);

type InfoProps = { icon: JSX.Element; text: string };
const Info = ({ icon, text }: InfoProps) => (
  <div className="flex items-center gap-2 text-gray-600 hover:text-primary duration-150">
    {icon}
    <p className="text-base">{text}</p>
  </div>
);

export default CardCar;
