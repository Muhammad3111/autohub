import React, { useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";

type ImageUploaderProps = {
  onImageChange?: (file: File | null) => void;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange }) => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        if (onImageChange) {
          onImageChange(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = () => {
    setImage(null);
    if (onImageChange) {
      onImageChange(null);
    }
  };

  return (
    <div className="col-span-1 items-start relative row-span-1">
      <label
        htmlFor="image-input"
        className="relative cursor-pointer w-full h-44 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-blue-500 transition"
      >
        {image ? (
          <img
            src={image}
            alt="Selected"
            className="w-full h-full object-cover"
          />
        ) : (
          <FaPhotoVideo className="text-gray-400 text-4xl" />
        )}
        <input
          id="image-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
      {image && (
        <button
        type="button"
          onClick={handleResetImage}
          className="mt-4 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition absolute left-1/2 transform -translate-x-1/2 top-10"
        >
          Change Image
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
