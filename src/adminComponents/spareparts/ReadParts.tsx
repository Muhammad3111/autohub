import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type Data = {
  id: number;
  image: string;
  name: string;
  brand: string;
  applicable_models: string;
  oem_code: string;
  description: string;
  status: boolean;
  price: number;
  vehicle_id: number;
};

const data: Data[] = [
  {
    id: 1,
    image: "https://via.placeholder.com/50",
    name: "Product 1",
    brand: "Brand A",
    applicable_models: "Model X, Model Y",
    oem_code: "OEM12345",
    description: "Description 1",
    status: true,
    price: 100,
    vehicle_id: 1,
  },
  {
    id: 2,
    image: "https://via.placeholder.com/50",
    name: "Product 2",
    brand: "Brand B",
    applicable_models: "Model Z",
    oem_code: "OEM67890",
    description: "Description 2",
    status: false,
    price: 200,
    vehicle_id: 2,
  },
  // Qo'shimcha ma'lumotlar qo'shishingiz mumkin
];

const ReadParts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Data;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: keyof Data) => {
    setSortConfig((prevConfig) =>
      prevConfig?.key === key && prevConfig.direction === "asc"
        ? { key, direction: "desc" }
        : { key, direction: "asc" }
    );
  };

  const filteredData = data.filter((item) =>
    [item.name, item.brand, item.applicable_models].some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="">
      {/* Qidiruv input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Nomi, Brandi yoki Modeli bo'yicha izlang..."
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>

      {/* Jadval */}
      <div className="overflow-x-auto rounded-md">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Rasm</th>
              <th className="px-4 py-2 flex items-center gap-1">
                Nom{" "}
                <button onClick={() => handleSort("name")}>
                  {sortConfig?.key === "name" &&
                  sortConfig.direction === "asc" ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </button>
              </th>
              <th className="px-4 py-2">Brand</th>
              <th className="px-4 py-2">Avtomobil Modeli</th>
              <th className="px-4 py-2">OEM Code</th>
              <th className="px-4 py-2">Izoh</th>
              <th className="px-4 py-2">Holat</th>
              <th className="px-4 py-2 flex items-center gap-1">
                Narx{" "}
                <button onClick={() => handleSort("price")}>
                  {sortConfig?.key === "price" &&
                  sortConfig.direction === "asc" ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2 text-center">{item.id}</td>
                <td className="px-4 py-2 text-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2 text-center">{item.brand}</td>
                <td className="px-4 py-2 text-center">{item.applicable_models}</td>
                <td className="px-4 py-2 text-center">{item.oem_code}</td>
                <td className="px-4 py-2 text-center">{item.description}</td>
                <td className="px-4 py-2 text-center">
                  {item.status ? "Active" : "Inactive"}
                </td>
                <td className="px-4 py-2 text-center">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReadParts;
