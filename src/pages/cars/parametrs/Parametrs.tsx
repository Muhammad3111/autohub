import { Element, scroller } from "react-scroll";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCarByIdsQuery } from "../../../features/cars/carSlice";

type ItemsChildren = {
  ckey: string;
  cvalue: string;
};

type ConfigurationItems = {
  id: number;
  name: string;
  children: ItemsChildren[];
};

type CarObjects = {
  id: string;
  model_file: string;
  name_uz: string;
  name_ru: string;
  brand_id: number;
  model: string;
  year: number;
  transmission: string;
  vehicle_type: string;
  price: number;
  engine_type: string;
  drive_type: string;
  cover_image: string;
  currency: string;
  images: string[];
  rating: number;
  configurations: ConfigurationItems[];
  brand: Brand;
};

export default function Parametrs() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetCarByIdsQuery(id!);

    const [activeCategory, setActiveCategory] = useState<string | null>(`cat0`);

    const handleScrollToCategory = (id: string) => {
        setActiveCategory(id);
        scroller.scrollTo(id, {
            duration: 800,
            smooth: "easeInOutQuart",
            offset: -80,
            containerId: "tableContainer"
        });
    };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  const carParam: CarObjects[] = data || [];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 px-4 py-6 overflow-y-auto h-full fixed scrollbar-thin">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        {carParam[0].configurations.map((category) => (
          <button
            key={category.id}
            onClick={() => handleScrollToCategory(`cat${category.id}`)}
            className={`block w-full text-left p-2 cursor-pointer ${
              activeCategory === `cat${category.id}`
                ? "bg-primary text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div
        id="tableContainer"
        className="w-full ml-64 p-6 overflow-auto h-screen"
      >
        <div className="mt-20 border flex">
          <div className="border p-4 w-[calc(100%/7)]">
            <p> A total of {carParam.length} categories</p>
            <h1 className="text-2xl font-semibold">Car Parameters</h1>
          </div>
          {carParam.map((car) => (
            <div key={car.id} className="border p-4 w-[calc(100%/7)]">
              <h1 className="text-xl font-semibold">{car.name_uz}</h1>
              <p>{Number(car.price)}$</p>
            </div>
          ))}
        </div>
        {carParam[0].configurations.map((category) => (
          <Element key={category.id} name={`cat${category.id}`}>
            <h2 className="text-xl font-semibold bg-gray-200 p-2">
              {category.name}
            </h2>
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                <tr className="border-b">
                  {/* Faqat bitta ckey (birinchi childdan) */}
                  <td className="border border-gray-300 px-4 py-2 w-[calc(100%/7)] font-bold">
                    {category.children[0]?.ckey || "-"}
                  </td>

                  {/* Barcha cvalue lar (children bo‘ylab map) */}
                  <td className="border border-gray-300 px-4 py-2 w-[calc(100%/7)]">
                    {category.children.map((sub, idx) => (
                      <div key={idx}>{sub.cvalue}</div>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </Element>
        ))}
      </div>
    </div>
  );
}
