import { useState } from "react";
import Filter from "../../utility/filter/Filter";
import Header from "../../components/header/Header";
import data from "../../mock/data.json";
import CImage from "../../assets/car-category.png";
import AboutSlider from "../about-us/AboutSlider";
import CardCar from "../../components/card/CardCar";
import { useGetCarsQuery } from "../../features/cars/carSlice";

type Collection = {
  id: number;
  title: string;
  icon: string;
};

const Cars = () => {
  const [filters, setFilters] = useState({
    name_uz: "",
    brand: "",
    model: "",
    price: 0,
  });
  const { data: cars } = useGetCarsQuery({ page: 1 });
  const collections: Collection[] = data.collection;

  return (
    <div>
      <Header title="Avtomobillar" />
      <div className="flex flex-col gap-4 my-container pt-10">
        <div className="flex flex-col gap-4 items-center">
          <Filter setFilters={setFilters} filters={filters} />
        </div>
        <div className="flex flex-col gap-4 p-10 bg-white">
          <h1 className="text-4xl font-semibold text-center">
            Avtomobil klassifikatsiyasi:
            <span className="text-primary"> Korpus (Kuzov) turlari</span>
          </h1>
          <div className="grid grid-cols-6 gap-4 ">
            {collections.map((c) => (
              <div
                key={c.id}
                className="flex flex-col items-center gap-2 col-span-1 shadow-md border bg-grey hover:border-red-500 duration-300 p-4"
              >
                <img
                  src={c.icon || CImage}
                  alt={c.title}
                  className="w-14 h-14 object-contain"
                />
                <h3 className="text-xl font-semibold">{c.title}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 p-10">
          <h1 className="text-4xl font-semibold text-center">
            Eng ommabop
            <span className="text-primary"> Avtomobil brendlari</span>
          </h1>
          <div className="px-20">
            <AboutSlider />
          </div>
        </div>
        <div className="flex flex-col gap-4 p-10 bg-white">
          <h1 className="text-4xl font-semibold text-center">
            Eng reytingi baland{" "}
            <span className="text-primary">Avtomobillar</span>
          </h1>
          <div className="grid grid-cols-3 gap-4">
            {cars?.items.slice(0, 6).map((car) => (
              <CardCar key={car.id} vehicle={car} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cars;
