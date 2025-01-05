import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../../utility/button/Button";
import { useAddCarMutation } from "../../features/cars/carSlice";
import { useState } from "react";
import Modal from "../../utility/modal/Modal";
import KeyValueInputs from "../../utility/keyvalueinputs/KeyValue";

type CarFormInputs = {
  name_uz: string;
  name_ru: string;
  brand: string;
  model: string;
  year: number;
  transmission: string;
  vehicle_type: string;
  price: number;
  engine_type: string;
  color: string;
  drive_type: string;
  properties: Record<string, string>;
  description: string;
  cover_image?: string;
  images?: string[];
};

export default function AddCar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CarFormInputs>();

  const [addCar] = useAddCarMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"single" | "gallery">("single");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const handleImageSelect = (url: string | string[]) => {
    if (modalType === "single" && typeof url === "string") {
      setSelectedImage(url);
    } else if (Array.isArray(url)) {
      setGalleryImages((prev) => [...prev, ...url]);
    } else if (typeof url === "string") {
      setGalleryImages((prev) => [...prev, url]);
    }
    setIsModalOpen(false);
  };

  const handleRemoveImage = (url: string) => {
    setGalleryImages((prev) => prev.filter((image) => image !== url));
  };

  const handleRemoveMainImage = () => {
    setSelectedImage(null);
  };
  const onSubmit: SubmitHandler<CarFormInputs> = async (data) => {
    if (selectedImage) {
      data.cover_image = selectedImage;
    }
    if (galleryImages.length > 0) {
      data.images = galleryImages;
    }
    await addCar(data);
    // console.log(data);
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
        <h1 className="text-2xl text-black">Avtomobil Qo'shish</h1>
        <Button
          path="/admin/cars"
          className="mt-0 flex items-center gap-2 px-5"
        >
          Orqaga
        </Button>
      </div>
      <form
        className="grid grid-cols-3 w-full gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-2 grid grid-cols-4 gap-4">
          <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-700">
              Avtomobil nomi
            </label>
            <input
              type="text"
              {...register("name_uz", { required: "Avtomobil nomi majburiy" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            />
            {errors.brand && (
              <span className="text-red-500 text-sm">
                {errors.brand.message}
              </span>
            )}
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <input
              type="text"
              {...register("brand", { required: "Brand yozish majburiy" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            />
            {errors.brand && (
              <span className="text-red-500 text-sm">
                {errors.brand.message}
              </span>
            )}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Model
            </label>
            <input
              type="text"
              {...register("model", { required: "Model is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            />
            {errors.model && (
              <span className="text-red-500 text-sm">
                {errors.model.message}
              </span>
            )}
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Yil
            </label>
            <input
              type="number"
              {...register("year", {
                required: "Yilini kirtish majburiy",
                valueAsNumber: true,
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            />
            {errors.year && (
              <span className="text-red-500 text-sm">
                {errors.year.message}
              </span>
            )}
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Narx
            </label>
            <input
              type="number"
              {...register("price", {
                required: "Narx majburiy",
                valueAsNumber: true,
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            />
            {errors.price && (
              <span className="text-red-500 text-sm">
                {errors.price.message}
              </span>
            )}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Avtomobil turi
            </label>
            <input
              type="text"
              {...register("vehicle_type", {
                required: "Avtomobil turi majburiy",
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            />
            {errors.vehicle_type && (
              <span className="text-red-500 text-sm">
                {errors.vehicle_type.message}
              </span>
            )}
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Rang
            </label>
            <input
              type="text"
              {...register("color", { required: "Rang majburiy" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            />
            {errors.color && (
              <span className="text-red-500 text-sm">
                {errors.color.message}
              </span>
            )}
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Transmissiya
            </label>
            <select
              defaultValue={"Left"}
              {...register("drive_type")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2.5"
            >
              <option value="Left">Chap</option>
              <option value="Right">O'ng</option>
            </select>
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Transmissiya
            </label>
            <select
              defaultValue={"Automatic"}
              {...register("transmission")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2.5"
            >
              <option value="Automatic">Avtomat</option>
              <option value="Manual">Mexanika</option>
            </select>
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Mator turi
            </label>
            <select
              defaultValue={"Gasoline"}
              {...register("engine_type")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2.5"
            >
              <option value="Gasoline">Gaz</option>
              <option value="Petrol">Benzin</option>
              <option value="Diesel">Dizel</option>
              <option value="Hybrid">Gibrid</option>
              <option value="Electric">Elektr</option>
              <option value="Propane">Propan</option>
            </select>
          </div>

          <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-700">
              Izoh
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
              rows={4}
            ></textarea>
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700">
              Ma'lumotlarni saqlash
              <button
                type="submit"
                className="w-full mt-1 text-base bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Saqlash
              </button>
            </label>
          </div>
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700">
              Avtomobil rasmini qo'shish
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
                  src={selectedImage}
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
              Avtomobil galleryasini qo'shish
              <button
                type="button"
                onClick={() => {
                  setModalType("gallery");
                  setIsModalOpen(true);
                }}
                className="w-full px-4 py-2 text-base bg-green-600 text-white rounded-md hover:bg-green-700 mt-1"
              >
                Rasm tanlang
              </button>
            </label>
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {galleryImages.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Gallery ${index}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(url)}
                      className="absolute top-2 right-2 bg-red-600 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <KeyValueInputs name="properties" register={register} />
        </div>
      </form>
    </div>
  );
}
