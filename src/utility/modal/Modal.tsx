import React, { useState, useMemo } from "react";
import { IoMdClose } from "react-icons/io";
import { useGetS3ObjectsQuery } from "../../features/media/mediaSlice";
import Image from "../../components/image/Image";
import FileUploader from "../file-uploader/FileUploader";
import { useDebounce } from "../hooks/useDebounce";

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
  const [sortOrder, setSortOrder] = useState<"newest" | "older">("newest");

  const { data } = useGetS3ObjectsQuery({
    bucket: "autohub",
    prefix: "uploads/",
    continuationToken,
    maxKeys: 20,
    search: debouncedSearch,
  });

  const uploadedImages = useMemo(() => {
    const filtered = (data?.objects || []).filter((obj) =>
      obj.key.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filtered.sort((a, b) =>
      sortOrder === "newest"
        ? b.lastModified.localeCompare(a.lastModified)
        : a.lastModified.localeCompare(b.lastModified)
    );
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
                    setSortOrder(e.target.value as "newest" | "older")
                  }
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="newest">Yangi</option>
                  <option value="older">Eski</option>
                </select>
              </div>

              {/* Media Grid */}
              <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
                {uploadedImages.map((item, index) => (
                  <div
                    key={index}
                    className={`relative border rounded-md overflow-hidden cursor-pointer ${
                      selectedImages.includes(item.key) ||
                      selectedImage === item.key
                        ? "border-blue-500"
                        : ""
                    }`}
                    onClick={() => handleImageToggle(item.key)}
                  >
                    <Image
                      src={item.key}
                      alt={`Image ${index}`}
                      className="w-full h-32 object-cover"
                    />
                    {(type === "single" && selectedImage === item.key) ||
                    (type === "gallery" &&
                      selectedImages.includes(item.key)) ? (
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
