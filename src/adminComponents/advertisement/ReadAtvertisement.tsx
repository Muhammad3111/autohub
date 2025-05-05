import { useState } from "react";
import Pagination from "../../utility/pagination/Pagination";
import { useDebounce } from "../../utility/hooks/useDebounce";
import { useTranslation } from "react-i18next";
import { useGetAdsQuery } from "../../features/ads/ads";
import DeleteAds from "./DeleteAds";
import Image from "../../components/image/Image";

const ReadAdvertisement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();

  // 🔹 Debounced qidiruv (500ms kechikish bilan)
  const debouncedSearch = useDebounce(searchQuery, 500);

  // 🔹 Ma’lumotlarni olish (paginatsiya bilan)
  const { data, isLoading } = useGetAdsQuery({});

  // 🔹 Yuklanish jarayoni
  if (isLoading) {
    return (
      <h1 className="text-center text-gray-500 text-lg">{t("loading")}...</h1>
    );
  }

  // 🔹 Brendlarni olish va qidiruv bo‘yicha filtrlash
  const ads: AdsType[] = data || [];
  const filteredData = ads.filter((item) =>
    item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
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
              <th className="px-4 py-2">Link</th>
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
                      src={`${item.image_url}`}
                      alt={item.title}
                      className="w-12 h-12 rounded-full mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2 text-center">{item.title}</td>
                  <td className="px-4 py-2 text-center">{item.url}</td>
                  <td className="px-4 py-2 text-center flex justify-center gap-2">
                    <DeleteAds id={item.id || 0} />
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

export default ReadAdvertisement;
