import { useState } from "react";
import { useGetBlogsQuery } from "../../features/blogs/blogs";

const ReadBlogs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useGetBlogsQuery({ page: 1 });

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  const blogs: Blogs[] = data?.items || [];

  const filteredData = blogs.filter((item) =>
    [item.title_uz].some((field) =>
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
              <th className="px-4 py-2 flex items-center gap-1">Sarlavha</th>
              <th className="px-4 py-2">Bo'lim</th>
              <th className="px-4 py-2">Content</th>
              <th className="px-4 py-2 flex items-center gap-1">Xarakat </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2 text-center">{index}</td>
                <td className="px-4 py-2 text-center">
                  <img
                    src={item.cover_image || "blog-images.jpg"}
                    alt={item.title_uz}
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="px-4 py-2 line-clamp-1">{item.title_uz}</td>
                <td className="px-4 py-2 text-center">{item.category}</td>
                <td className="px-4 py-2 text-center line-clamp-1">
                  {item.content_uz}
                </td>
                <td className="px-4 py-2 text-center">
                  <button>.</button>
                  <button>.</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReadBlogs;
