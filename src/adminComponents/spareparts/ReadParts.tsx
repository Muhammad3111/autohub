import { useState } from "react";
import { useGetSparesQuery } from "../../features/spare-parts/spare-parts";

const ReadParts = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useGetSparesQuery({});

  const spareParts: SpareParts[] = data?.items || [];
  const filteredData = spareParts.filter((item) =>
    [item.name_uz].some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Brand</th>
              <th className="px-4 py-2">OEM Code</th>
              <th className="px-4 py-2">Izoh</th>
              <th className="px-4 py-2">Holat</th>
              <th className="px-4 py-2">Narx</th>
              <th className="px-4 py-2">Harakat</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <th colSpan={9}>Yuklanmoqda...</th>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 text-center">
                    <img
                      src={item.cover_image}
                      alt={item.name_uz}
                      className="w-12 h-12 rounded-full mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2">{item.name_uz}</td>
                  <td className="px-4 py-2 text-center">{item.brand_id}</td>
                  <td className="px-4 py-2 text-center">{item.oem_code}</td>
                  <td className="px-4 py-2 text-center">
                    {item.description_uz}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {item.status ? "Active" : "Inactive"}
                  </td>
                  <td className="px-4 py-2 text-center">{item.price}</td>
                  <td></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReadParts;
