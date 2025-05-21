import React, { useState, useMemo } from "react";
import { IoMdClose } from "react-icons/io";
import { useGetS3ObjectsQuery } from "../../features/media/mediaSlice";
import FileUploader from "../file-uploader/FileUploader";
import { useDebounce } from "../hooks/useDebounce";
import ModelViewer from "../Model/Model";

type ModalProps = {
  onClose: () => void;
  onSelect: (url: string | string[]) => void;
  type: "single" | "gallery";
};

const Modal: React.FC<ModalProps> = ({ onClose, onSelect, type }) => {
  const [activeTab, setActiveTab] = useState<"upload" | "media">("upload");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [continuationToken, setContinuationToken] = useState<
    string | undefined
  >(undefined);
  const [prevTokens, setPrevTokens] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [sortOrder, setSortOrder] = useState<
    "all" | "image" | "video" | "3d" | "other"
  >("all");

  const { data } = useGetS3ObjectsQuery({
    bucket: "autohub",
    prefix: "uploads/",
    continuationToken,
    maxKeys: 20,
    search: debouncedSearch,
  });

  const uploadedFiles = useMemo(() => {
    const filtered = (data?.objects || []).filter((obj) =>
      obj.key.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const mapped = filtered.map((item: any) => {
      const ext =
        "." + item.key.toLowerCase().split(".").pop()?.split("?")[0] || "";

      const isImage = /\.(jpe?g|png|webp|gif|bmp|svg|avif)$/i.test(ext);
      const isVideo = /\.(mp4|mov|webm|avi|mkv)$/i.test(ext);
      const is3DModel = /\.(glb|gltf|fbx|obj)$/i.test(ext);

      let type: "image" | "video" | "3d" | "other" = "other";

      if (isImage) type = "image";
      else if (isVideo) type = "video";
      else if (is3DModel) type = "3d";

      return {
        url: item.key,
        lastModified: new Date(item.lastModified),
        size: item.size,
        type,
      };
    });

    if (sortOrder === "all") return mapped;
    return mapped.filter((item) => item.type === sortOrder);
  }, [data?.objects, searchTerm, sortOrder]);

  const handleNext = () => {
    if (data?.nextContinuationToken) {
      setPrevTokens((prev) => [...prev, continuationToken || ""]);
      setContinuationToken(data.nextContinuationToken);
    }
  };

  const handlePrevious = () => {
    const copy = [...prevTokens];
    const prev = copy.pop();
    setPrevTokens(copy);
    setContinuationToken(prev);
  };

  const handleImageToggle = (url: string) => {
    if (type === "single") {
      setSelectedImage(url);
    } else {
      setSelectedImages((prev) =>
        prev.includes(url) ? prev.filter((img) => img !== url) : [...prev, url]
      );
    }
  };

  const handleDone = () => {
    if (type === "single" && selectedImage) onSelect(selectedImage);
    else if (type === "gallery") onSelect(selectedImages);
    onClose();
  };

  const imageURL = import.meta.env.VITE_S3_PUBLIC_URL as string;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-3/4 h-[90%] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Fayl Manager</h2>
          <button onClick={onClose}>
            <IoMdClose size={24} className="text-red-600 hover:text-red-800" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-2 ${
              activeTab === "upload" ? "bg-gray-100 font-bold" : ""
            }`}
            onClick={() => setActiveTab("upload")}
          >
            Yuklash
          </button>
          <button
            className={`flex-1 py-2 ${
              activeTab === "media" ? "bg-gray-100 font-bold" : ""
            }`}
            onClick={() => setActiveTab("media")}
          >
            Media
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "upload" ? (
            <FileUploader />
          ) : (
            <>
              {/* Search and Filter */}
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Faylni qidiring..."
                  className="flex-1 px-3 py-2 border rounded-md"
                />
                <select
                  value={sortOrder}
                  onChange={(e) =>
                    setSortOrder(
                      e.target.value as
                        | "all"
                        | "image"
                        | "video"
                        | "3d"
                        | "other"
                    )
                  }
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">Hammasi</option>
                  <option value="image">Rasmlar</option>
                  <option value="video">Videolar</option>
                  <option value="3d">3D Modellar</option>
                  <option value="other">Boshqa Fayllar</option>
                </select>
              </div>

              {/* Media Grid */}
              <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
                {uploadedFiles.map((item, index) => (
                  <div
                    key={index}
                    className={`relative border rounded-md overflow-hidden cursor-pointer ${
                      selectedImages.includes(item.url) ||
                      selectedImage === item.url
                        ? "border-blue-500"
                        : ""
                    }`}
                    onClick={() => handleImageToggle(item.url)}
                  >
                    {item.type === "image" ? (
                      <img
                        src={`${imageURL}${item.url}`}
                        alt={`Media ${index}`}
                        width="200"
                        height="160"
                        loading="lazy"
                        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : item.type === "video" ? (
                      <video
                        src={`${imageURL}${item.url}`}
                        controls
                        className="w-full h-40 object-cover"
                      />
                    ) : item.type === "3d" ? (
                      <div className="w-full h-40 flex items-center justify-center bg-black text-white text-sm px-2 text-center">
                        <ModelViewer
                          fileName={`${imageURL}${item.url}`}
                          width={300}
                          height={160}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-800 text-sm px-2 text-center">
                        Fayl: {item.url.split("/").pop()}
                      </div>
                    )}
                    {(type === "single" && selectedImage === item.url) ||
                    (type === "gallery" &&
                      selectedImages.includes(item.url)) ? (
                      <div className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-white bg-green-500 rounded-full">
                        ✓
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={handlePrevious}
                  disabled={prevTokens.length < 1}
                  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                  Oldingi
                </button>
                <button
                  onClick={handleNext}
                  disabled={!data?.isTruncated}
                  className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                >
                  Keyingi
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-end">
          <button
            onClick={handleDone}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Tanlash
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
