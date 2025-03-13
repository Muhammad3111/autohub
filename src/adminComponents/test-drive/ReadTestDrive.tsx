import { useState } from "react";
import { useGetTestDriveQuery } from "../../features/test-drive/test-drive";
import Pagination from "../../utility/pagination/Pagination";
import { useDebounce } from "../../utility/hooks/useDebounce";

const ReadTestDrive = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Debounced qidiruv (500ms kechikish bilan)
  const debouncedSearch = useDebounce(searchQuery, 500);

  // 🔹 Ma’lumotlarni olish (paginatsiya bilan)
  const { data, isLoading } = useGetTestDriveQuery({ page: currentPage });

  // 🔹 Yuklanish jarayoni
  if (isLoading) {
    return <h1>Yuklanmoqda...</h1>;
  }

  // 🔹 Test drive ro'yxatini olish va qidiruv bo‘yicha filtrlash
  const testDrives: TestDrive[] = data?.items || [];
  const filteredData = testDrives.filter((item) =>
    item.volunteer_name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="px-4">
      {/* 🔹 Qidiruv input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Foydalanuvchi nomi bo'yicha izlang..."
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>

      {/* 🔹 Jadval */}
      <div className="overflow-y-auto rounded-lg h-[65vh] bg-white">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Foydalanuvchi</th>
              <th className="px-4 py-2">Telefon</th>
              <th className="px-4 py-2">Avtomobil</th>
              <th className="px-4 py-2">Sana</th>
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
                    {item.volunteer_name}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {item.volunteer_phone}
                  </td>
                  <td className="px-4 py-2 text-center">{item.vehicle_id}</td>
                  <td className="px-4 py-2 text-center">{item.test_date}</td>
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
      <div className="mt-0">
        <Pagination
          totalPages={data?.total_pages || 1}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ReadTestDrive;
