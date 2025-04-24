import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import FileUploader from "../file-uploader/FileUploader"; // shu yerga import qil
import { useGetS3ObjectsQuery } from "../../features/media/mediaSlice";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const { data, isFetching, refetch } = useGetS3ObjectsQuery({
    bucket: "autohub",
    prefix: "uploads/",
    continuationToken,
    maxKeys: 20,
  });

  const uploadedImages = data?.keys || [];
  const hasMore = data?.isTruncated || false;
  const nextToken = data?.nextContinuationToken;

  useEffect(() => {
    refetch();
  }, [continuationToken, refetch]);

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
    if (nextToken) {
      setPrevTokens((prev) => [...prev, continuationToken || ""]);
      setContinuationToken(nextToken);
    }
  };

  const handlePreviousPage = () => {
    const prevTokensCopy = [...prevTokens];
    const prevToken = prevTokensCopy.pop();
    setPrevTokens(prevTokensCopy);
    setContinuationToken(prevToken);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-md shadow-lg w-3/4 h-[90%] p-4 flex flex-col">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-bold">Fayl Manager</h2>
          <button
            onClick={onClose}
            className="text-red-600 hover:text-red-800 font-semibold"
          >
            <IoMdClose className="text-2xl" />
          </button>
        </div>

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

        <div className="flex-1">
          {isFetching ? (
            <div>{t("loading")}...</div>
          ) : activeTab === "upload" ? (
            <FileUploader />
          ) : (
            <>
              <div className="scrollbar-thin h-[55vh] overflow-y-auto">
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
                        src={`https://usc1.contabostorage.com/c3e282af10b9439688d5390b60ed4045:autohub/${url}`}
                        alt={`Media ${index}`}
                        className="w-full h-32 object-cover"
                      />
                      {(type === "single" && selectedImage === url) ||
                      (type === "gallery" && selectedImages.includes(url)) ? (
                        <div className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-sm bg-green-500 text-white rounded-full">
                          ✓
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={handlePreviousPage}
                  disabled={prevTokens.length < 1}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  disabled={!hasMore}
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
