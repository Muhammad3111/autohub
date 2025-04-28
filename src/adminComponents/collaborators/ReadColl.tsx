import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import Pagination from "../../utility/pagination/Pagination";
import { useDebounce } from "../../utility/hooks/useDebounce";
import { useTranslation } from "react-i18next";
import Image from "../../components/image/Image";
import { useGetCollaboratorsQuery } from "../../features/collobarators/collobarators";

export type WorkplaceItem = {
  workplace_name: string;
  region: string;
  city: string;
  address: string;
  work_phone: string;
  info: string;
  working_hours: string;
  avatar: string;
  id: string;
  rating: number;
  user: UserType;
  created_at: string;
  updated_at: string;
  reviews: null | any;
  is_verified: null | boolean;
  stype: string;
};

type UserType = {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  avatar: string;
  role: "staff" | "admin" | string;
  status: "active" | "inactive" | string;
};

const ReadColl = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();
  // 🔹 Debounced qidiruv (500ms kechikish bilan)
  const debouncedSearch = useDebounce(searchQuery, 500);

  // 🔹 Ma’lumotlarni olish (paginatsiya bilan)
  const { data, isLoading } = useGetCollaboratorsQuery({
    page: 1,
    staff_type: "dealer",
  });

  // 🔹 Yuklanish jarayoni
  if (isLoading) {
    return (
      <h1 className="text-center text-gray-500 text-lg">{t("loading")}...</h1>
    );
  }

  // 🔹 Bloglarni olish va qidiruv bo‘yicha filtrlash
  const users: WorkplaceItem[] = data?.items || [];
  const filteredData = users.filter((item) =>
    item.user.first_name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="px-4">
      {/* 🔹 Qidiruv input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Sarlavha bo'yicha izlang..."
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>

      {/* 🔹 Jadval */}
      <div className="overflow-y-auto rounded h-[65vh]  bg-white">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Rasm</th>
              <th className="px-4 py-2">Ism Familiya</th>
              <th className="px-4 py-2">Tel Raqam</th>
              <th className="px-4 py-2">Korxona</th>
              <th className="px-4 py-2">Manzil</th>
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
                    <Image
                      src={item.avatar || "blog-images.jpg"}
                      alt={item.user.first_name}
                      className="w-12 h-12 rounded-full mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">
                    {item.user.first_name} {item.user.last_name}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {item.user.phone_number}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {item.workplace_name}
                  </td>
                  <td className="px-4 py-2 text-center truncate max-w-[200px]">
                    {item.address}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button className="text-blue-500 text-xl">
                      <MdEdit />
                    </button>
                    <button className="text-red-500 text-xl">
                      <BsTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
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
          totalPages={data?.metadata.total_pages || 1}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ReadColl;
