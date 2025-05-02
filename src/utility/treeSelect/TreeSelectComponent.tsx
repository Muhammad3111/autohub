import { useState } from "react";
import { useGetBrandsQuery } from "../../features/brands/brands";
import { useLazyGetCarsQuery } from "../../features/cars/carSlice";
import Image from "../../components/image/Image";
import { useAddComparisonMutation } from "../../features/compare/compare";

const TreeSelectComponent = () => {
  const { data: brandData, isLoading: brandsLoading } = useGetBrandsQuery({
    page: 1,
  });
  const [getCars, { isFetching: carsLoading }] = useLazyGetCarsQuery();

  const [open, setOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [addComparisons] = useAddComparisonMutation();
  const [models, setModels] = useState<string[]>([]);
  const [cars, setCars] = useState<CarObject[]>([]);

  const handleBrandSelect = async (brand: Brand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSelectedCar(null);
    setCars([]);
    setModels([]);

    const { data } = await getCars({ page: 1, brand: brand.name });
    if (data?.items) {
      const uniqueModels = Array.from(
        new Set(data.items.map((car: CarObject) => car.model))
      );
      setModels(uniqueModels);
    }
  };

  const handleModelSelect = async (model: string) => {
    setSelectedModel(model);
    setSelectedCar(null);
    setCars([]);

    const { data } = await getCars({
      page: 1,
      brand: selectedBrand.name,
      model,
    });
    if (data?.items) {
      setCars(data.items);
    }
  };

  const handleReset = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedCar(null);
    setCars([]);
    setModels([]);
  };

  const handleCarSelect = async (car: CarObject) => {
    setSelectedCar(car);
    setOpen(false); // close dropdown
    await addComparisons([car.id || ""]);
    handleReset();
  };

  const resetModel = () => {
    setSelectedModel(null);
    setSelectedCar(null);
    setCars([]);
  };

  const resetBrand = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedCar(null);
    setModels([]);
    setCars([]);
  };

  return (
    <div className="relative w-80">
      {/* Dropdown toggle */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="border px-4 py-2 bg-white rounded cursor-pointer flex justify-between items-center"
      >
        <span className="truncate">
          {selectedCar
            ? selectedCar.name_uz || selectedCar.name_ru || selectedCar.model
            : "Avtomobil tanlang"}
        </span>

        {selectedCar && (
          <span
            onClick={(e) => {
              e.stopPropagation(); // dropdown ochilishini to‘xtatamiz
              handleReset();
            }}
            className="ml-2 text-gray-400 hover:text-red-500 cursor-pointer"
          >
            ✕
          </span>
        )}
      </div>
      {/* Dropdown content */}
      {open && (
        <div className="absolute mt-2 z-50 bg-white border shadow-md rounded w-full max-h-96 overflow-auto p-2 space-y-2">
          {/* Header */}
          <div className="flex gap-2 text-sm text-gray-600 border-b pb-2 items-center flex-wrap">
            {selectedBrand && (
              <span
                onClick={resetBrand}
                className="flex items-center gap-1 hover:text-red-700 cursor-pointer"
              >
                <button className="text-red-500">←</button>
                {selectedBrand.name}
              </span>
            )}
            {selectedModel && (
              <span
                onClick={resetModel}
                className="flex items-center gap-1 hover:text-red-700 cursor-pointer"
              >
                <button className="text-red-500">←</button>
                {selectedModel}
              </span>
            )}
          </div>

          {/* Level: Brand */}
          {!selectedBrand && !brandsLoading && (
            <div className="max-h-64 overflow-y-auto">
              {brandData?.items?.map((brand: Brand) => (
                <div
                  key={brand.id}
                  onClick={() => handleBrandSelect(brand)}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex gap-2 items-center"
                >
                  <Image src={brand.image} width={20} alt={brand.name} />
                  {brand.name}
                </div>
              ))}
            </div>
          )}

          {/* Level: Model */}
          {selectedBrand && !selectedModel && (
            <>
              {carsLoading ? (
                <div className="text-center py-4">Yuklanmoqda...</div>
              ) : (
                <div className="max-h-64 overflow-y-auto">
                  {models.length > 0 ? (
                    models.map((model) => (
                      <div
                        key={model}
                        onClick={() => handleModelSelect(model)}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {model}
                      </div>
                    ))
                  ) : (
                    <div className="text-center">
                      <h1 className="text-sm">Modellar topilmadi</h1>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Level: Cars */}
          {selectedModel && (
            <>
              {carsLoading ? (
                <div className="text-center py-4">Yuklanmoqda...</div>
              ) : (
                <div className="max-h-64 overflow-y-auto">
                  {cars.length > 0 ? (
                    cars.map((car: CarObject) => (
                      <div
                        key={car.id}
                        onClick={() => handleCarSelect(car)}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {car.name_uz || car.name_ru || car.model}
                      </div>
                    ))
                  ) : (
                    <div className="text-center">
                      <h1 className="text-sm">Avtomobillar topilmadi</h1>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TreeSelectComponent;
