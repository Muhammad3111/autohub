import { useState } from "react";
import Filter from "../../utility/filter/Filter";
import Header from "../../components/header/Header";

const Cars = () => {
  const [filters, setFilters] = useState({
    name_uz: "",
    brand: "",
    model: "",
    price: 0,
  });

  return (
    <div>
      <Header title="Avtomobillar" />
      <div className="flex flex-col gap-4 my-container pt-10">
        <div className="flex flex-col gap-4 items-center">
          <Filter setFilters={setFilters} filters={filters} />
        </div>
        <div className="grid grid-cols-4 gap-4 py-6"></div>
      </div>
    </div>
  );
};
export default Cars;
