import { useState, useEffect } from "react";
import { useGetS3ObjectsQuery } from "../../features/media/mediaSlice";

const SkeletonCard = () => (
  <div className="w-full h-40 bg-gray-300 animate-pulse rounded-lg" />
);

const ReadMedia = () => {
  const [previousTokens, setPreviousTokens] = useState<string[]>([]);
  const [continuationToken, setContinuationToken] = useState<
    string | undefined
  >(undefined);

  const { data, isFetching, refetch } = useGetS3ObjectsQuery({
    bucket: "autohub",
    prefix: "uploads/",
    continuationToken,
    maxKeys: 20,
  });

  const media = data?.keys || [];
  const hasMore = data?.isTruncated || false;
  const nextToken = data?.nextContinuationToken;

  const handleNext = () => {
    if (nextToken) {
      setPreviousTokens((prev) => [...prev, continuationToken || ""]);
      setContinuationToken(nextToken);
    }
  };

  const handlePrevious = () => {
    const prevTokensCopy = [...previousTokens];
    const prevToken = prevTokensCopy.pop();
    setPreviousTokens(prevTokensCopy);
    setContinuationToken(prevToken);
  };

  useEffect(() => {
    refetch(); // Har safar continuation token o‘zgarsa, yangi malumot oladi
  }, [continuationToken, refetch]);

  const imageURL = import.meta.env.VITE_S3_PUBLIC_URL as string;

  return (
    <div className="h-[75vh] overflow-y-auto scrollbar-thin px-4 flex flex-col justify-between">
      <div className="grid grid-cols-5 gap-4">
        {isFetching
          ? Array.from({ length: 10 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : media.map((url, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg overflow-hidden shadow-sm group relative"
              >
                <img
                  src={`${imageURL}${url}`}
                  alt={`Media ${index}`}
                  width="200"
                  height="160"
                  loading="lazy"
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
      </div>

      {!isFetching && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handlePrevious}
            disabled={previousTokens.length < 1}
            className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!hasMore}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ReadMedia;
