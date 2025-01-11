import { useState } from "react";
import { BrandData, useGetBrandsQuery } from "../../features/brands/brands";
import DeleteBrand from "./DeleteBrand";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ReadBrands = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useGetBrandsQuery({ page: 1, limit: 10 });
  const navigate = useNavigate();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const brands: BrandData[] = data?.brands || [];

  const filteredData = brands.filter((item) =>
    [item.name].some((field) =>
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
          placeholder="Nomi bo'yicha izlang..."
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
              <th className="px-4 py-2">Nom </th>
              <th className="px-4 py-2">Xarakat</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2 text-center">{item.id}</td>
                <td className="px-4 py-2 text-center">
                  <img
                    src={`http://89.223.126.64:8080${item.image}`}
                    alt={item.name}
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="px-4 py-2 text-center">{item.name}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => navigate(`/admin/brands/update/${item.id}`)}
                    className="rounded-full bg-blue-600 text-white p-2 mr-4"
                  >
                    <MdOutlineEdit className="text-lg" />
                  </button>
                  <DeleteBrand id={item.id || 0} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReadBrands;
