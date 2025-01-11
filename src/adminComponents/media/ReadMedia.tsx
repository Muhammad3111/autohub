import { useState } from "react";
import { useGetUrlsQuery } from "../../features/media/mediaSlice";
import DeleteMedia from "./DeleteMedia";

const ReadMedia = () => {
  const [page, setPage] = useState(1);
  const perPage = 100; // 4 ustunda ko'rsatiladi

  const { data, isLoading, error } = useGetUrlsQuery({
    page,
    per_page: perPage,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading media!</div>;

  const totalPages = Math.ceil((data?.total || 0) / perPage);

  return (
    <div>
      <div className="h-[70vh] overflow-y-auto scrollbar-thin">
        <div className="grid grid-cols-5 gap-4">
          {data?.urls.map((url, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg overflow-hidden shadow-sm group relative"
            >
              <img
                src={`http://89.223.126.64:8080${url}`}
                alt={`Media ${index}`}
                className="w-full h-40 object-cover"
              />
              <DeleteMedia url={url} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-gray-700">
          Sahifa: {page} | Jami: {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReadMedia;
