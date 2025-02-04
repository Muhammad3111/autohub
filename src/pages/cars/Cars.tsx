import { useState } from "react";
import Filter from "../../utility/filter/Filter";
import Header from "../../components/header/Header";
import data from "../../mock/data.json";
import CImage from "../../assets/car-category.png";
import AboutSlider from "../about-us/AboutSlider";
import CardCar from "../../components/card/CardCar";
import { useGetCarsQuery } from "../../features/cars/carSlice";
import Button from "../../utility/button/Button";
import { useNavigate } from "react-router-dom";

const Cars = () => {
  const [filters, setFilters] = useState({
    name_uz: "",
    brand: "",
    model: "",
    price: 0,
  });

  const { data: carsData } = useGetCarsQuery({ page: 1 });
  const navigate = useNavigate();

  const collections: Collection[] = data.collection;
  const cars: CarObject[] = carsData?.items || [];
  return (
    <div>
      <Header title="Avtomobillar" />
      <div className="flex flex-col gap-4 my-container pt-10">
        <div className="flex flex-col gap-4 items-center">
          <Filter setFilters={setFilters} filters={filters} />
        </div>
        <div className="flex flex-col gap-4 p-10 bg-white">
          <h1 className="text-4xl font-semibold text-center">
            Avtomobillar:
            <span className="text-primary"> Korpus (Kuzov) turlari</span>
          </h1>
          <div className="grid grid-cols-6 gap-4 ">
            {collections.map((c) => (
              <div
                key={c.id}
                className="flex flex-col items-center gap-2 col-span-1 shadow-md border bg-grey hover:border-red-500 duration-300 p-4 cursor-pointer"
                onClick={() => navigate(`/cars/models/${c.title}`)}
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
          <div className="col-span-full flex justify-center">
            <Button className="px-4">Barcha brendlarni ko'rish</Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-10 bg-white">
          <h1 className="text-4xl font-semibold text-center">
            Eng reytingi baland{" "}
            <span className="text-primary">Avtomobillar</span>
          </h1>
          <div className="grid grid-cols-4 gap-4">
            {cars?.length > 0 ? (
              cars
                .slice(0, 8)
                .map((car) => <CardCar key={car.id} vehicle={car} />)
            ) : (
              <div className="col-span-full text-2xl font-semibold text-center py-10 bg-grey">
                <h1 className="text-3xl font-normal text-primary">
                  Ma'lumotlar topilmadi
                </h1>
              </div>
            )}
            {cars.length > 6 && (
              <div className="col-span-full flex justify-center">
                <Button className="px-4">Barchasini ko'rish</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cars;
