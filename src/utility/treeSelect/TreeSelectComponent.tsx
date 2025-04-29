/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useGetBrandsQuery } from "../../features/brands/brands"; // <-- Lazy query kerak
import { useLazyGetCarsQuery } from "../../features/cars/carSlice";
// loading uchun simple spinner component

const TreeSelectComponent = () => {
  const { data: brandData, isLoading: brandsLoading } = useGetBrandsQuery({
    page: 1,
  });

  const [loadCars, { isFetching: carsLoading }] = useLazyGetCarsQuery({}); // lazy fetch cars
  const [brands, setBrands] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);
  const [cars, setCars] = useState<any[]>([]);

  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [selectedCar, setSelectedCar] = useState<any>(null);

  useEffect(() => {
    if (brandData?.items) {
      setBrands(brandData.items);
    }
  }, [brandData]);

  const handleBrandSelect = async (brand: any) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSelectedCar(null);
    setModels([]);
    setCars([]);

    // brand tanlanganda cars olib model unique qilamiz
    const { data } = await loadCars({ page: 1, brand: brand.name });
    if (data?.items) {
      const modelsList = Array.from(
        new Set(data.items.map((car: any) => car.model))
      ).map((model) => ({
        model,
      }));
      setModels(modelsList);
    }
  };

  const handleModelSelect = async (modelName: string) => {
    setSelectedModel(modelName);
    setSelectedCar(null);
    setCars([]);

    const { data } = await loadCars({
      page: 1,
      brand: selectedBrand.name,
      model: modelName,
    });
    if (data?.items) {
      setCars(data.items);
    }
  };

  const handleCarSelect = (car: any) => {
    setSelectedCar(car);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Brand tanlash */}
      <div>
        <h4>Brand tanlang</h4>
        {brandsLoading ? (
          <h1>Loading...</h1>
        ) : (
          <ul className="border rounded p-2">
            {brands.map((brand) => (
              <li
                key={brand.id}
                onClick={() => handleBrandSelect(brand)}
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                {brand.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Model tanlash */}
      {selectedBrand && (
        <div>
          <h4>Model tanlang</h4>
          {carsLoading ? (
            <h1>Loading...</h1>
          ) : models.length > 0 ? (
            <ul className="border rounded p-2">
              {models.map((model) => (
                <li
                  key={model.model}
                  onClick={() => handleModelSelect(model.model)}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                >
                  {model.model}
                </li>
              ))}
            </ul>
          ) : (
            <div>Model mavjud emas</div>
          )}
        </div>
      )}

      {/* Car tanlash */}
      {selectedModel && (
        <div>
          <h4>Avtomobil tanlang</h4>
          {carsLoading ? (
            <h1>Loading...</h1>
          ) : cars.length > 0 ? (
            <ul className="border rounded p-2">
              {cars.map((car) => (
                <li
                  key={car.id}
                  onClick={() => handleCarSelect(car)}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                >
                  {car.name_uz || car.name_ru || car.model}
                </li>
              ))}
            </ul>
          ) : (
            <div>Avtomobil topilmadi</div>
          )}
        </div>
      )}

      {/* Tanlangan car */}
      {selectedCar && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h4 className="font-bold">Tanlangan Avtomobil:</h4>
          <div>Model: {selectedCar.model}</div>
          <div>Yili: {selectedCar.year}</div>
          <div>Transmission: {selectedCar.transmission}</div>
        </div>
      )}
    </div>
  );
};

export default TreeSelectComponent;
