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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Media Page</h1>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {data?.urls.map((url, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-sm group relative"
          >
            <img
              src={`http://89.223.126.64:8080${url}`}
              alt={`Media ${index}`}
              className="w-full h-48 object-cover"
            />
            <DeleteMedia url={url} />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-gray-700">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReadMedia;
