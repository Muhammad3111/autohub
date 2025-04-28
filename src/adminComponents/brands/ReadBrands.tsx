import { useState } from "react";
import { useGetBrandsQuery } from "../../features/brands/brands";
import DeleteBrand from "./DeleteBrand";
import { MdOutlineEdit } from "react-icons/md";
import Pagination from "../../utility/pagination/Pagination";
import { useDebounce } from "../../utility/hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ReadBrands = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // 🔹 Debounced qidiruv (500ms kechikish bilan)
  const debouncedSearch = useDebounce(searchQuery, 500);

  // 🔹 Ma’lumotlarni olish (paginatsiya bilan)
  const { data, isLoading } = useGetBrandsQuery({ page: currentPage });

  // 🔹 Yuklanish jarayoni
  if (isLoading) {
    return (
      <h1 className="text-center text-gray-500 text-lg">{t("loading")}...</h1>
    );
  }

  // 🔹 Brendlarni olish va qidiruv bo‘yicha filtrlash
  const brands: Brand[] = data?.items || [];
  const filteredData = brands.filter((item) =>
    item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="px-4">
      {/* 🔹 Qidiruv input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Brend nomi bo'yicha izlang..."
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>

      {/* 🔹 Jadval */}
      <div className="overflow-y-auto rounded h-[65vh] bg-white border border-gray-300">
        <table className="min-w-full border border-gray-300">
          <thead className="sticky top-0 bg-gray-200">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Rasm</th>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Turi</th>
              <th className="px-4 py-2">Xarakat</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-100 transition"
                >
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 text-center">
                    <img
                      src={`https://usc1.contabostorage.com/c3e282af10b9439688d5390b60ed4045:autohub/${item.image}`}
                      alt={item.name}
                      className="w-12 h-12 rounded-full mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">{item.name}</td>
                  <td className="px-4 py-2 text-center">
                    {item.brand_type === "vehicle"
                      ? "Avtomobil"
                      : "Ehtiyot qisim"}
                  </td>
                  <td className="px-4 py-2 text-center flex justify-center gap-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/brands/update/${item.id}`)
                      }
                      className="text-blue-500 text-xl"
                    >
                      <MdOutlineEdit />
                    </button>
                    <DeleteBrand id={item.id || 0} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  Hech narsa topilmadi
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Paginatsiya */}
      <div className="mt-4">
        <Pagination
          totalPages={data?.metadata?.total_pages || 1}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ReadBrands;
