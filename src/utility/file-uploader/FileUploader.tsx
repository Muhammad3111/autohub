import React, { useState, useRef } from "react";
import { toast } from "react-toastify"; // shu yerga s3Api faylingdan to‘g‘ri import qil
import { useUploadToS3Mutation } from "../../features/media/mediaSlice";

export default function FileUploader({ height = "55vh" }: { height?: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadToS3, { isLoading }] = useUploadToS3Mutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).filter((file) => {
        if (file.size > 20 * 1024 * 1024) {
          toast.error(`Fayl ${file.name} 20MB dan katta — qo‘shilmaydi.`);
          return false;
        }
        return true;
      });

      setFiles((prev) => [...prev, ...newFiles]);
      simulateProgress(newFiles);
    }
  };

  const simulateProgress = (newFiles: File[]) => {
    newFiles.forEach((file) => {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          const currentProgress = (prev[file.name] || 0) + 10;
          if (currentProgress >= 100) clearInterval(interval);
          return { ...prev, [file.name]: Math.min(currentProgress, 100) };
        });
      }, 150);
    });
  };

  const handleRemoveFile = (fileName: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
    setUploadProgress((prev) => {
      const updated = { ...prev };
      delete updated[fileName];
      return updated;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (files.length === 0) {
      toast.warning("Hech qanday fayl tanlanmagan.");
      return;
    }

    try {
      for (const file of files) {
        const key = `uploads/${Date.now()}_${file.name}`;
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        await uploadToS3({
          bucket: "autohub",
          key,
          body: uint8Array,
          contentType: file.type || "application/octet-stream",
        }).unwrap();

        console.log(`✅ ${file.name} muvaffaqiyatli yuklandi!`);
      }

      toast.success("Barcha fayllar S3’ga muvaffaqiyatli yuklandi!");
      setFiles([]);
      setUploadProgress({});
    } catch (error) {
      console.error("❌ Yuklashda xato:", error);
      toast.error("Yuklashda xato yuz berdi.");
    }
  };

  const handleCustomUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div
        onClick={handleCustomUploadClick}
        className="h-14 flex gap-4 items-center justify-center w-full border-2 border-dashed border-gray-700 rounded-lg shadow-lg cursor-pointer"
      >
        <p className="text-base font-semibold text-gray-400">
          Fayl hajmi 20MB dan oshmasligi kerak.
        </p>
        <button
          type="button"
          onClick={handleCustomUploadClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Faylni tanlash
        </button>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className={`overflow-y-auto scrollbar-thin h-[${height}]`}>
        <div className="mt-4 grid grid-cols-4 gap-4">
          {files.map((file) => (
            <div
              key={file.name}
              className="relative w-full h-32 bg-gray-200 overflow-hidden rounded-lg shadow"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button
                onClick={() => handleRemoveFile(file.name)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center z-50"
              >
                &times;
              </button>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
                <div
                  className="w-full bg-blue-600"
                  style={{
                    height: `${Math.min(uploadProgress[file.name] || 0, 100)}%`,
                    transition: "height 0.2s",
                  }}
                />
                <span className="absolute bottom-2 left-2 text-white font-bold z-10">
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
          className="w-max text-base bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          disabled={files.length === 0 || isLoading}
        >
          {isLoading ? "Yuklanmoqda..." : "S3'ga yuklash"}
        </button>
      </div>
    </form>
  );
}
