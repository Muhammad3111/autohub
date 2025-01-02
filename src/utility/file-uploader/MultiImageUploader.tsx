import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

type MultiImageUploaderProps = {
  onImagesChange?: (files: File[] | null) => void;
};

const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({
  onImagesChange,
}) => {
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);

  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => {
        const url = URL.createObjectURL(file);
        return { file, url };
      });
      setImages((prev) => [...prev, ...newImages]);
      if (onImagesChange) {
        onImagesChange([
          ...images.map((img) => img.file),
          ...newImages.map((img) => img.file),
        ]);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    if (onImagesChange) {
      onImagesChange(updatedImages.map((img) => img.file));
    }
  };

  return (
    <div className="flex flex-col items-start row-span-1">
      <label
        htmlFor="multi-image-input"
        className="relative cursor-pointer w-full h-10 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center gap-2 overflow-hidden hover:border-blue-500 transition mb-4"
      >
        <p>Gallereya rasm qo'shish</p>
        <FaPlus className="text-black text-xl" />
        <input
          id="multi-image-input"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImagesChange}
        />
      </label>
      <div className="flex gap-4 overflow-x-auto max-w-[390px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {images.map((img, index) => (
          <div key={index} className="relative w-32 h-32 flex-shrink-0">
            <img
              src={img.url}
              alt={`Selected ${index}`}
              className="w-full h-full object-contain rounded-md"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white text-sm rounded-full hover:bg-red-600 w-5 h-5 flex items-center justify-center"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiImageUploader;
