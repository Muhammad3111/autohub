import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../../utility/button/Button";
import { useState } from "react";
import Modal from "../../utility/modal/Modal";
import { toast } from "react-toastify";
import { useAddAdsMutation } from "../../features/ads/ads";

export default function AddAdvertisement() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdsType>();

  const [addAds] = useAddAdsMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"single" | "gallery">("single");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageSelect = (url: string | string[]) => {
    if (modalType === "single" && typeof url === "string") {
      setSelectedImage(url);
    }
    setIsModalOpen(false);
  };

  const handleRemoveMainImage = () => {
    setSelectedImage(null);
  };
  const onSubmit: SubmitHandler<AdsType> = async (data) => {
    if (selectedImage) {
      data.image_url = selectedImage;
    }

    try {
      await addAds(data);
      toast.success("Reklama muvaffaqiyatli qo'shildi");
      reset();
      setSelectedImage(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onSelect={handleImageSelect}
          type={modalType}
        />
      )}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-black">Reklama Qo'shish</h1>
        <Button path="/admin/ads" className="mt-0 flex items-center gap-2 px-5">
          Orqaga
        </Button>
      </div>
      <form
        className="grid grid-cols-3 w-full gap-4 items-start"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-2 grid grid-cols-4 gap-4">
          <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-700">
              Reklama nomi
            </label>
            <input
              type="text"
              {...register("title", {
                required: "Reklama nomi majburiy",
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-700">
              Reklama linki
            </label>
            <input
              type="text"
              {...register("url")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            />
            {errors.url && (
              <span className="text-red-500 text-sm">{errors.url.message}</span>
            )}
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700">
              Reklama rasmini qo'shish
              <button
                type="button"
                onClick={() => {
                  setModalType("single");
                  setIsModalOpen(true);
                }}
                className="w-full px-4 py-2 bg-blue-600 text-base mt-1 text-white rounded-md hover:bg-blue-700"
              >
                Rasm tanlang
              </button>
            </label>
            {selectedImage && (
              <div className="mb-4 relative w-full h-48">
                <img
                  src={`https://usc1.contabostorage.com/c3e282af10b9439688d5390b60ed4045:autohub/${selectedImage}`}
                  alt="Selected"
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  onClick={handleRemoveMainImage}
                  className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700">
              Ma'lumotlarni saqlash
              <button
                type="submit"
                className="w-full mt-1 text-base bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                Saqlash
              </button>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
