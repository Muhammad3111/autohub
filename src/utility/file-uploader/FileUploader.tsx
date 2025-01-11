import React, { useState, useRef } from "react";
import { useAddUrlMutation } from "../../features/media/mediaSlice";

export default function FileUploader({ height = "55vh" }: { height?: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [addUrl] = useAddUrlMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).filter((file) => {
        if (file.size > 20 * 1024 * 1024) {
          // 20MB limit
          alert(
            `File ${file.name} exceeds the 20MB size limit and will not be added.`
          );
          return false;
        }
        return true;
      });

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      simulateProgress(newFiles);
    }
  };

  const simulateProgress = (newFiles: File[]) => {
    const newProgress: { [key: string]: number } = {};
    newFiles.forEach((file) => {
      newProgress[file.name] = 0;
    });
    setUploadProgress((prev) => ({ ...prev, ...newProgress }));

    newFiles.forEach((file) => {
      const fileSize = file.size;
      const increment = Math.max(1000 / fileSize, 1);

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          const updatedProgress = { ...prev };
          if (updatedProgress[file.name] < 100) {
            updatedProgress[file.name] += increment;
          } else {
            clearInterval(interval);
          }
          return updatedProgress;
        });
      }, 100);
    });
  };

  const handleRemoveFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    setUploadProgress((prev) => {
      const updatedProgress = { ...prev };
      delete updatedProgress[fileName];
      return updatedProgress;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (files.length === 0) {
      console.error("No files to submit.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file, file.name);
    });

    try {
      await addUrl(formData).unwrap();
      alert("Files uploaded successfully!");
      setFiles([]);
      setUploadProgress({});
    } catch (error) {
      console.error("Error submitting files:", error);
    }
  };

  const handleCustomUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label
        htmlFor="upload"
        className="h-14 flex gap-4 items-center justify-center w-full border-2 border-dashed border-gray-700 rounded-lg shadow-lg cursor-pointer"
      >
        <p className="text-base font-semibold text-gray-400">
          Har bir fayl hajmi (20MB) dan ko'p bo'lmasligi kerak.
        </p>
        <button
          type="button"
          onClick={handleCustomUploadClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Faylni tanlash
        </button>

        <input
          id="upload"
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      <div className={`overflow-y-auto scrollbar-thin h-[${height}]`}>
        <div className="mt-4 grid grid-cols-4 gap-4">
          {files.map((file) => (
            <div
              key={file.name}
              className="relative w-full h-32 bg-gray-200 overflow-hidden rounded-lg"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button
                onClick={() => handleRemoveFile(file.name)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center z-40"
              >
                &times;
              </button>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div
                  className="absolute bottom-0 left-0 w-full bg-blue-600 wave-animation"
                  style={{
                    height: `${Math.min(uploadProgress[file.name] || 0, 100)}%`,
                  }}
                ></div>
                <span className="text-white font-bold z-10">
                  {Math.min(uploadProgress[file.name] || 0, 100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-end mt-4">
        <button
          type="submit"
          className="w-max mt-1 text-base bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={
            files.length === 0 ||
            Object.values(uploadProgress).some((progress) => progress < 100)
          }
        >
          Jo'natish
        </button>
      </div>
    </form>
  );
}
