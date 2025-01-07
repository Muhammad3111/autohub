import React, { useState, useEffect } from "react"; // Import your API hook
import { useGetUrlsQuery } from "../../features/media/mediaSlice";
import AddMedia from "../../components/media/AddMedia";

type ModalProps = {
  onClose: () => void;
  onSelect: (url: string | string[]) => void;
  type: "single" | "gallery";
};

const Modal: React.FC<ModalProps> = ({ onClose, onSelect, type }) => {
  const [activeTab, setActiveTab] = useState<"upload" | "media">("upload");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 100; // 4 columns shown per page

  const { data, isLoading, error } = useGetUrlsQuery({
    page,
    per_page: perPage,
  });

  useEffect(() => {
    if (data && data.urls) {
      setUploadedImages(data.urls);
    }
  }, [data]);

  const handleImageToggle = (url: string) => {
    if (type === "single") {
      setSelectedImage(url);
    } else {
      if (selectedImages.includes(url)) {
        setSelectedImages((prev) => prev.filter((image) => image !== url));
      } else {
        setSelectedImages((prev) => [...prev, url]);
      }
    }
  };

  const handleDone = () => {
    if (type === "single" && selectedImage) {
      onSelect(selectedImage);
    } else if (type === "gallery") {
      onSelect(selectedImages);
    }
    onClose();
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-md shadow-lg w-3/4 h-3/4 p-4 flex flex-col">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-bold">Image Manager</h2>
          <button
            onClick={onClose}
            className="text-red-600 hover:text-red-800 font-semibold"
          >
            Close
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab("upload")}
            className={`flex-1 py-2 text-center ${
              activeTab === "upload" ? "bg-gray-100 font-semibold" : ""
            }`}
          >
            Faylni yuklash
          </button>
          <button
            onClick={() => setActiveTab("media")}
            className={`flex-1 py-2 text-center ${
              activeTab === "media" ? "bg-gray-100 font-semibold" : ""
            }`}
          >
            Media
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error loading images</div>
          ) : activeTab === "upload" ? (
            <AddMedia />
          ) : (
            <>
              <div className="grid grid-cols-4 gap-4">
                {uploadedImages.map((url, index) => (
                  <div
                    key={index}
                    className={`relative cursor-pointer border rounded-md overflow-hidden shadow-sm hover:shadow-md ${
                      type === "single" && selectedImage === url
                        ? "border-blue-500"
                        : ""
                    }`}
                    onClick={() => handleImageToggle(url)}
                  >
                    <img
                      src={`http://89.223.126.64:8080${url}`}
                      alt={`Media ${index}`}
                      className="w-full h-32 object-cover"
                    />
                    {type === "single" && selectedImage === url && (
                      <div className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-sm bg-green-500 text-white rounded-full">
                        ✓
                      </div>
                    )}
                    {type === "gallery" && selectedImages.includes(url) && (
                      <div className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-sm bg-green-500 text-white rounded-full">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  disabled={uploadedImages.length < perPage}
                  onClick={handleNextPage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleDone}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
