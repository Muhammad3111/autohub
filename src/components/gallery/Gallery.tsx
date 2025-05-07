import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "../image/Image";
import { FiX } from "react-icons/fi";

interface GalleryProps {
    car: CarObject;
}

const Gallery: React.FC<GalleryProps> = ({ car }) => {
    const { t } = useTranslation();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const images =
        car.images?.filter((img): img is string => img != null && img !== "") ||
        [];

    const openModal = (image: string) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <div
                            key={index}
                            className="relative cursor-pointer overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                            onClick={() => openModal(image)}
                        >
                            <Image
                                src={image}
                                alt={`${car.name_uz} - Image ${index + 1}`}
                                className="w-full h-48 object-cover"
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center col-span-full">
                        {t("no-images-available")}
                    </p>
                )}
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                    onClick={handleOverlayClick}
                >
                    <div className="relative max-w-4xl w-full">
                        <Image
                            src={selectedImage}
                            alt="Fullscreen car image"
                            className="w-full h-auto max-h-[80vh] object-contain"
                        />
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-white text-3xl"
                        >
                            <FiX />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
