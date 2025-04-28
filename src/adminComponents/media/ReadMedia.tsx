import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useGetS3ObjectsQuery } from "../../features/media/mediaSlice";
import DeleteMedia from "./DeleteMedia";
import StorageManager from "./StorageManager";
import { useDebounce } from "../../utility/hooks/useDebounce";

const SkeletonCard = () => (
  <div className="w-full h-40 bg-gray-300 animate-pulse rounded-lg" />
);

const ReadMedia = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [sortOrder, setSortOrder] = useState<"newest" | "older">("newest");
  const [continuationToken, setContinuationToken] = useState<
    string | undefined
  >();
  const [mediaList, setMediaList] = useState<
    { url: string; lastModified: Date; size: number; type: string }[]
  >([]);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, isFetching } = useGetS3ObjectsQuery({
    bucket: "autohub",
    prefix: "uploads/",
    continuationToken,
    maxKeys: 20,
    search: debouncedSearch,
  });

  const imageURL = import.meta.env.VITE_S3_PUBLIC_URL as string;

  useEffect(() => {
    setMediaList([]);
    setContinuationToken(undefined);
  }, [debouncedSearch]);

  useEffect(() => {
    if (data?.objects) {
      const newItems = data.objects
        .map((item: any) => {
          const ext = item.key.toLowerCase().split(".").pop();
          let type: "image" | "video" | "other" = "other";
          if (
            ["jpg", "jpeg", "png", "webp", "gif", "svg", "avif"].includes(ext)
          )
            type = "image";
          else if (["mp4", "mov", "webm", "avi", "mkv"].includes(ext))
            type = "video";

          return {
            url: item.key,
            lastModified: new Date(item.lastModified),
            size: item.size,
            type,
          };
        })
        .filter(
          (newItem) =>
            !mediaList.some((existing) => existing.url === newItem.url)
        );

      // ✅ MUHIM: Boshqa `mediaList`ga bog‘liq bo‘lmagan tarzda update qilamiz
      setMediaList((prev) => {
        const unique = newItems.filter(
          (newItem) => !prev.some((old) => old.url === newItem.url)
        );
        return [...prev, ...unique];
      });
    }
  }, [data?.objects]);

  const filteredMedia = useMemo(() => {
    const sorted = [...mediaList].sort((a, b) =>
      sortOrder === "newest"
        ? b.lastModified.getTime() - a.lastModified.getTime()
        : a.lastModified.getTime() - b.lastModified.getTime()
    );
    return sorted;
  }, [mediaList, sortOrder]);

  const loadMore = useCallback(() => {
    if (data?.isTruncated && data?.nextContinuationToken && !isFetching) {
      setContinuationToken(data.nextContinuationToken);
    }
  }, [data, isFetching]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "200px" }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <input
          placeholder="Media nomini qidiring..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <div className="w-1/2">
          {mediaList.length > 0 && <StorageManager objects={mediaList} />}
        </div>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "newest" | "older")}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
        >
          <option value="newest">Yangi</option>
          <option value="older">Eski</option>
        </select>
      </div>
      <div className="h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-5 gap-4">
          {filteredMedia.map((item, index) => (
            <div
              key={item.url + index}
              className="border border-gray-300 rounded-lg overflow-hidden shadow-sm group relative"
            >
              <img
                src={`${imageURL}${item.url}`}
                alt={`Media ${index}`}
                width="200"
                height="160"
                loading="lazy"
                className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <DeleteMedia keyName={item.url} />
            </div>
          ))}

          {isFetching &&
            Array.from({ length: 10 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
        </div>
      </div>

      {/* Intersection trigger */}
      <div ref={observerRef} className="h-0"></div>
    </div>
  );
};

export default ReadMedia;
