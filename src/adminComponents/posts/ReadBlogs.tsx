import { useState } from "react";
import { useGetBlogsQuery } from "../../features/blogs/blogs";
import { MdEdit } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import Pagination from "../../utility/pagination/Pagination";
import { useDebounce } from "../../utility/hooks/useDebounce";

const ReadBlogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Debounced qidiruv (500ms kechikish bilan)
  const debouncedSearch = useDebounce(searchQuery, 500);

  // 🔹 Ma’lumotlarni olish (paginatsiya bilan)
  const { data, isLoading } = useGetBlogsQuery({ page: currentPage });

  // 🔹 Yuklanish jarayoni
  if (isLoading) {
    return (
      <h1 className="text-center text-gray-500 text-lg">Yuklanmoqda...</h1>
    );
  }

  // 🔹 Bloglarni olish va qidiruv bo‘yicha filtrlash
  const blogs: Blogs[] = data?.items || [];
  const filteredData = blogs.filter((item) =>
    item.title_uz.toLowerCase().includes(debouncedSearch.toLowerCase())
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
              <th className="px-4 py-2">Sarlavha</th>
              <th className="px-4 py-2">Bo‘lim</th>
              <th className="px-4 py-2">Tavsif</th>
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
                      src={item.cover_image || "blog-images.jpg"}
                      alt={item.title_uz}
                      className="w-12 h-12 rounded-full mx-auto"
                    />
                  </td>
                  <td className="px-4 py-2">{item.title_uz}</td>
                  <td className="px-4 py-2 text-center">{item.category}</td>
                  <td className="px-4 py-2 text-center truncate max-w-[200px]">
                    {item.content_uz}
                  </td>
                  <td className="px-4 py-2 text-center flex justify-center gap-2">
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

export default ReadBlogs;
