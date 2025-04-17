import { Element, scroller } from "react-scroll";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCarByIdsQuery } from "../../../features/cars/carSlice";
import Image from "../../../components/image/Image";

// Types

type ItemsChildren = {
  ckey: string;
  cvalue: string;
};

type ConfigurationItems = {
  id: number;
  name: string;
  children: ItemsChildren[];
};

type Brand = {
  id: number;
  name: string;
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

  const [activeCategory, setActiveCategory] = useState<string | null>("cat0");

  const handleScrollToCategory = (id: string) => {
    setActiveCategory(id);
    scroller.scrollTo(id, {
      duration: 800,
      smooth: "easeInOutQuart",
      offset: -80,
      containerId: "tableContainer",
    });
  };

  if (isLoading) return <h1>Loading...</h1>;

  const carParam: CarObjects[] = data?.items || [];

  // Grouping configurations by category name and merging values across cars
  const groupedConfigs = new Map<string, Map<string, string[]>>();

  carParam.forEach((car) => {
    car.configurations.forEach((config) => {
      const configName = config.name;
      if (!groupedConfigs.has(configName)) {
        groupedConfigs.set(configName, new Map());
      }
      const keyMap = groupedConfigs.get(configName)!;
      config.children.forEach((child) => {
        if (!keyMap.has(child.ckey)) {
          keyMap.set(child.ckey, []);
        }
        keyMap.get(child.ckey)!.push(child.cvalue);
      });
    });
  });

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 px-4 py-6 overflow-y-auto h-full fixed scrollbar-thin">
        <h2 className="text-xl font-bold mb-4">Kategoriyalar</h2>
        {Array.from(groupedConfigs.keys()).map((categoryName, idx) => (
          <button
            key={idx}
            onClick={() => handleScrollToCategory(`cat${idx}`)}
            className={`block w-full text-left p-2 cursor-pointer ${
              activeCategory === `cat${idx}`
                ? "bg-primary text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {categoryName}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div
        id="tableContainer"
        className="w-full ml-64 p-6 overflow-auto h-screen"
      >
        <div className="mt-20">
          <h1 className="text-2xl font-semibold mb-4">
            Topilgan avtomobillar soni: {carParam.length}
          </h1>
          <div className="flex gap-4 mb-8">
            {carParam.map((car) => (
              <div
                key={car.id}
                className="border rounded p-4 shadow w-64 text-center"
              >
                <Image
                  src={car.cover_image}
                  alt={car.name_uz}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold">{car.name_uz}</h3>
                <p className="text-gray-600">
                  {car.price} {car.currency}
                </p>
              </div>
            ))}
          </div>
        </div>

        {Array.from(groupedConfigs.entries()).map(
          ([configName, keyMap], idx) => (
            <Element key={idx} name={`cat${idx}`}>
              <h2 className="text-xl font-semibold bg-gray-200 p-2 mt-6">
                {configName}
              </h2>
              <table className="w-full border-collapse border border-gray-300 mb-6">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 w-[20%] text-left">
                      Xususiyat nomi
                    </th>
                    {carParam.map((_, carIdx) => (
                      <th
                        key={carIdx}
                        className="border border-gray-300 px-4 py-2 text-left"
                      ></th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from(keyMap.entries()).map(([ckey, values]) => (
                    <tr key={ckey}>
                      <td className="border border-gray-300 px-4 py-2 font-medium">
                        {ckey}
                      </td>
                      {carParam.map((_, valIdx) => (
                        <td
                          key={valIdx}
                          className="border border-gray-300 px-4 py-2"
                        >
                          {values[valIdx] || "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Element>
          )
        )}
      </div>
    </div>
  );
}
