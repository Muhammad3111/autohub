import { useMemo } from "react";

const TOTAL_BYTES = 250 * 1024 * 1024 * 1024; // 250 GB

const formatSize = (bytes: number): string => {
  if (bytes >= 1024 ** 3) return (bytes / 1024 ** 3).toFixed(2) + "GB";
  if (bytes >= 1024 ** 2) return (bytes / 1024 ** 2).toFixed(2) + "MB";
  if (bytes >= 1024) return (bytes / 1024).toFixed(2) + "KB";
  return bytes + " B";
};

const formatPercent = (bytes: number): string => {
  const val = (bytes / TOTAL_BYTES) * 100;
  return val < 0.01 ? "<0.01%" : val.toFixed(2) + "%";
};

const StorageManager = ({ objects }: { objects: any[] }) => {
  const { imageSize, videoSize, otherSize } = useMemo(() => {
    return objects.reduce(
      (acc, obj) => {
        const size = obj?.size || 0;
        if (obj.type === "image") acc.imageSize += size;
        else if (obj.type === "video") acc.videoSize += size;
        else acc.otherSize += size;
        return acc;
      },
      { imageSize: 0, videoSize: 0, otherSize: 0 }
    );
  }, [objects]);

  //   const totalUsed = imageSize + videoSize + otherSize;

  const imagePercent = (imageSize / TOTAL_BYTES) * 100;
  const videoPercent = (videoSize / TOTAL_BYTES) * 100;
  const otherPercent = 100 - imagePercent - videoPercent;

  return (
    <div className="">
      <div className="relative w-full bg-gray-200 rounded-md h-10 overflow-hidden text-[11px] leading-5 text-white">
        {/* Images */}
        <div
          className="h-full bg-green-500 absolute left-0 top-0 flex items-center pl-1 z-20"
          style={{ width: `${imagePercent}%` }}
        >
          {imageSize > 0 && (
            <div className="text-white-500 flex items-center gap-1 text-sm">
              <span>Rasmlar:</span> <span>{formatSize(imageSize)}</span>
              <span>{formatPercent(imageSize)}</span>
            </div>
          )}
        </div>

        {/* Videos */}
        <div
          className="h-full bg-blue-500 absolute top-0 flex items-center pl-1"
          style={{
            left: `${imagePercent}%`,
            width: `${videoPercent}%`,
          }}
        >
          {videoSize > 0 && (
            <span>
              Videolar: {formatSize(videoSize)} ({formatPercent(videoSize)})
            </span>
          )}
        </div>

        {/* Others */}
        <div
          className="h-full bg-gray-500 absolute top-0 flex items-center pl-1"
          style={{
            left: `${imagePercent + videoPercent}%`,
            width: `${otherPercent}%`,
          }}
        >
          {otherSize > 0 && (
            <span>
              Boshqa: {formatSize(otherSize)} ({formatPercent(otherSize)})
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorageManager;
