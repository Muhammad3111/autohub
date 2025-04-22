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
      <div className="w-64 bg-gray-100 px-4 py-6 overflow-y-auto h-full fixed scrollbar-thin mt-16">
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
      <div className="w-full ml-64 p-6 overflow-auto h-screen">
        <div className="mt-16">
          {/* Avtomobillar Header */}
          <div
            className={`grid`}
            style={{
              gridTemplateColumns: `200px repeat(${
                carParam.length > 4 ? carParam.length : 4
              }, minmax(200px, 1fr))`,
              gap: "1px",
            }}
          >
            <div className="bg-white font-bold px-4 py-2 border border-gray-300">
              <h1 className="text-xl font-normal mb-6">
                Mavjud Modellar Soni:{" "}
                <span className="text-black text-2xl">{carParam.length}</span>
              </h1>
            </div>
            {carParam.map((car) => (
              <div
                key={car.id}
                className="border border-gray-300 px-4 py-2 flex flex-col items-center bg-white"
              >
                <Image
                  src={car.cover_image}
                  alt={car.name_uz}
                  className="w-full h-32 object-cover rounded mb-1"
                />
                <h3 className="text-sm font-semibold">{car.name_uz}</h3>
                <p className="text-xs text-gray-600">
                  {car.price} {car.currency}
                </p>
              </div>
            ))}
          </div>

          {/* Har bir konfiguratsiya blok */}
          <div
            id="tableContainer"
            className="h-[70vh] overflow-y-auto scrollbar-thin w-full"
          >
            {Array.from(groupedConfigs.entries()).map(
              ([configName, keyMap], idx) => (
                <Element key={idx} name={`cat${idx}`}>
                  <h2 className="text-xl font-semibold bg-primary px-4 py-2 text-white">
                    {configName}
                  </h2>

                  {Array.from(keyMap.entries()).map(([ckey, values]) => (
                    <div
                      key={ckey}
                      className="grid border border-gray-200"
                      style={{
                        gridTemplateColumns: `200px repeat(${
                          carParam.length > 4 ? carParam.length : 4
                        }, minmax(200px, 1fr))`,
                        gap: "1px",
                      }}
                    >
                      {/* Ckey – xususiyat nomi */}
                      <div className="px-4 py-2 bg-gray-50 font-medium border border-gray-300">
                        {ckey}
                      </div>

                      {/* Cvalue – avtomobillar bo‘yicha qiymatlar */}
                      {carParam.map((_, idx) => (
                        <div
                          key={idx}
                          className="px-4 py-2 border border-gray-300 bg-white text-sm"
                        >
                          {values[idx] || "-"}
                        </div>
                      ))}
                    </div>
                  ))}
                </Element>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
