import React, { useState } from "react";

type ModalProps = {
  onClose: () => void;
  onSelect: (url: string | string[]) => void;
  type: "single" | "gallery";
};

const Modal: React.FC<ModalProps> = ({ onClose, onSelect, type }) => {
  const [activeTab, setActiveTab] = useState<"upload" | "media">("upload");
  const [uploadedImages, setUploadedImages] = useState<string[]>([
    "/media/uploads/image1.png",
    "/media/uploads/image2.png",
    "/media/uploads/image3.png",
    "/media/uploads/image4.png",
  ]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newUrls = Array.from(files).map(
        (file) => URL.createObjectURL(file) // Temporary file URLs
      );
      setUploadedImages((prev) => [...prev, ...newUrls]);
      if (type === "single" && newUrls.length > 0) {
        setSelectedImage(newUrls[0]);
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
            Upload File
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
          {activeTab === "upload" && (
            <div className="flex flex-col items-center justify-center h-full">
              <input
                type="file"
                multiple={type === "gallery"}
                onChange={handleFileUpload}
                className="mb-4"
              />
              <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Upload File
              </button>
            </div>
          )}

          {activeTab === "media" && (
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
                    src={url}
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
