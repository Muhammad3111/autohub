import { useNavigate } from "react-router-dom";
import { IoSpeedometerOutline } from "react-icons/io5";
import { TbPropeller } from "react-icons/tb";
import { PiGasCan } from "react-icons/pi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import { useGetCarsQuery } from "../../features/cars/carSlice";

const Card = () => {
  const navigate = useNavigate();

  const [isSaved, setIsSaved] = useState<null | number>(null);

  const { data } = useGetCarsQuery({ page: 1, limit: 6 });

  return (
    <div>
      <h1 className="mt-10 mb-5 text-4xl font-semibold text-[#4a5568] tracking-wide text-center">
        Avtomobillar
      </h1>

      <div className="grid grid-cols-4 mt-10 gap-12">
        {data?.items.map((item) => (
          <div
            key={item.id}
            className="w-full min-h-[400px] bg-white rounded-lg flex flex-col justify-start p-5 relative cursor-pointer"
          >
            <button className="absolute right-5 top-5">
              {isSaved ? (
                <AiFillHeart
                  className="text-3xl"
                  onClick={() => setIsSaved(0)}
                />
              ) : (
                <AiOutlineHeart
                  className="text-3xl"
                  onClick={() => setIsSaved(1)}
                />
              )}
            </button>

            <div className="w-full h-52 flex items-center justify-center">
              <img
                src={`http://89.223.126.64:8080${
                  item.cover_image || "placeholder.jpg"
                }`}
                alt={item.name_uz}
                className="h-full duration-150 w-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between w-full mt-2 border-b-2 pb-2">
              <p className="text-xl font-semibold">{item.name_uz}</p>

              <p className="font-medium text-lg">${item.price}</p>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              <button className="bg-grey px-5 py-2 rounded flex text-sm gap-1 capitalize hover:bg-primary hover:bg-opacity-30 duration-150">
                <p>{"yili:"}</p>
                <p>{item.year}</p>
              </button>
              {item.properties.map((pro, inx) => (
                <button
                  key={inx}
                  className="bg-grey px-5 py-2 rounded flex text-sm gap-1 capitalize hover:bg-primary hover:bg-opacity-30 duration-150"
                >
                  <p>{pro.key_uz}:</p>
                  <p>{pro.value_uz}</p>
                </button>
              ))}
              <button className="bg-grey px-5 py-2 rounded flex text-sm gap-1 capitalize hover:bg-primary hover:bg-opacity-30 duration-150">
                <p>{"rangi:"}</p>
                <p>{item.color_uz}</p>
              </button>
            </div>

            <div className="flex items-end w-full h-full">
              <div className="flex items-center justify-between w-full mt-2 border-t-2 pt-2">
                <div className="flex items-center gap-2 hover:text-primary duration-150">
                  <IoSpeedometerOutline className="text-xl" />
                  <p className="text-base font-normal">{item.drive_type}</p>
                </div>

                <div className="flex items-center gap-2 hover:text-primary duration-150">
                  <TbPropeller className="text-xl" />
                  <p className="text-base font-normal">{item.transmission}</p>
                </div>

                <div className="flex items-center gap-2 hover:text-primary duration-150">
                  <PiGasCan className="text-xl" />
                  <p className="text-base font-normal">{item.engine_type}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => navigate("/cars")}
          className="bg-primary hover:bg-primary-hover duration-150 text-white text-lg px-8 py-3 rounded-lg"
        >
          Barchasini ko'rish
        </button>
      </div>
    </div>
  );
};
export default Card;
