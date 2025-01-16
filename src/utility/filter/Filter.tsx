import React from "react";

interface FilterProps {
  filters: {
    name_uz: string;
    brand: string;
    model: string;
    price: number;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      name_uz: string;
      brand: string;
      model: string;
      price: number;
    }>
  >;
}

export default function Filter({ filters, setFilters }: FilterProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [id]: id === "price" ? Number(value) : value,
    }));
  };

  return (
    <form className="flex items-center gap-4 w-2/3">
      <label htmlFor="name" className="w-full">
        Avtomobil nomi
        <input
          id="name_uz"
          placeholder="Misol: Tucson"
          type="text"
          value={filters.name_uz}
          className="w-full py-2 text-base px-4 rounded-md focus:outline-none border"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="brand" className="w-full">
        Brand
        <input
          id="brand"
          placeholder="Misol: Hyundai"
          type="text"
          className="w-full py-2 text-base px-4 rounded-md focus:outline-none border"
          value={filters.brand}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="model" className="w-full">
        Model
        <input
          id="model"
          placeholder="Misol: Crossover"
          type="text"
          className="w-full py-2 text-base px-4 rounded-md focus:outline-none border"
          value={filters.model}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="price" className="w-full">
        Narx
        <input
          id="price"
          type="range"
          min="0"
          max="100"
          className="w-full py-2 text-base px-4 rounded-md focus:outline-none border"
          value={filters.price}
          onChange={handleChange}
        />
      </label>
    </form>
  );
}
