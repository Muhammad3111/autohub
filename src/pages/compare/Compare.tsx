import { Element, scroller } from "react-scroll";
import { useState } from "react";
import {
  useDeleteComparisonMutation,
  useGetComparisonsQuery,
} from "../../features/compare/compare";
import Image from "../../components/image/Image";
import TreeSelectComponent from "../../utility/treeSelect/TreeSelectComponent";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

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

export default function Compare() {
  const { data, isLoading } = useGetComparisonsQuery({});
  const [activeCategory, setActiveCategory] = useState<string | null>("cat0");
  const [deleteCar] = useDeleteComparisonMutation();
  const navigate = useNavigate();
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

  const carParam: CarObjects[] = data || [];
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

  const handleDeleteCar = async (id: string) => {
    await deleteCar(id);
  };

  return (
    <div className="flex h-screen">
      {carParam.length > 0 ? (
        <>
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
                <div className="bg-white font-bold px-4 py-2 border border-gray-300 items-center flex">
                  <h1 className="text-xl font-normal">
                    Mavjud Modellar Soni:{" "}
                    <span className="text-black text-2xl">
                      {carParam.length}
                    </span>
                  </h1>
                </div>
                {carParam.map((car) => (
                  <div
                    key={car.id}
                    className="border border-gray-300 px-4 py-2 flex flex-col gap-2 items-center bg-white"
                  >
                    <div className="flex justify-end w-full">
                      <button onClick={() => handleDeleteCar(car.id)}>
                        <IoMdClose className="hover:text-primary duration-300" />
                      </button>
                    </div>
                    <Image
                      src={car.cover_image}
                      alt={car.name_uz}
                      className="w-full h-32 object-cover rounded"
                    />
                    <div className="flex items-center justify-between w-full">
                      <h3 className="text-sm font-semibold">{car.name_uz}</h3>
                      <p className="text-lg text-primary">
                        {car.price} {car.currency}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="border border-gray-300 px-4 py-2 flex flex-col items-center justify-center bg-white">
                  <TreeSelectComponent />
                </div>
              </div>

              {/* Har bir konfiguratsiya blok */}
              <div
                id="tableContainer"
                className="h-[70vh] overflow-y-auto scrollbar-thin mt-4"
              >
                {Array.from(groupedConfigs.entries()).map(
                  ([configName, keyMap], idx) => (
                    <Element key={idx} name={`cat${idx}`}>
                      <h2 className="text-xl font-semibold bg-primary/50 px-4 py-2 text-black">
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
                          <div className="px-4 py-2 bg-gray-50 font-medium border border-gray-300 text-lg">
                            {ckey}
                          </div>

                          {/* Cvalue – avtomobillar bo‘yicha qiymatlar */}
                          {carParam.map((_, idx) => (
                            <div
                              key={idx}
                              className="px-4 py-2 border border-gray-300 bg-white text-sm text-center"
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
        </>
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
          <h1 className="text-2xl font-semibold">
            Hech qanday avtomobil topilmadi Iltimos avtomobillar sahifasidan
            biror bir avtomobilni tanlang
          </h1>
          <button
            onClick={() => navigate("/cars")}
            className="text-lg p-2 w-full bg-primary text-white"
          >
            Avtomobillar sahifasiga o'tish
          </button>
        </div>
      )}
      {/* Sidebar */}
    </div>
  );
}
