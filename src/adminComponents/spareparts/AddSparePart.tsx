import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../../utility/button/Button";
import { useState } from "react";
import Modal from "../../utility/modal/Modal";
import { toast } from "react-toastify";
import { useAddSpareMutation } from "../../features/spare-parts/spare-parts";
import { useGetCarsQuery } from "../../features/cars/carSlice";
import { useGetCatsQuery } from "../../features/spare-parts/spare-categories";
import Select from "react-select";

export type SpareFormInputs = {
  name_uz: string;
  name_ru?: string;
  description_uz: string;
  description_ru?: string;
  brand: string;
  applicable_models: string[];
  cover_image: string;
  images: string[];
  category_id: number;
  oem_code: string;
  status: boolean;
  price: number;
  vehicle_id: string;
};

type CatsProps = {
  id: string;
  title_uz: string;
  title_ru: string;
};

type CarsProps = {
  id: string;
  name_uz: string;
  name_ru: string;
};

export default function AddSpareParts() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SpareFormInputs>();
  const { data, isLoading } = useGetCatsQuery({});
  const { data: vehicles } = useGetCarsQuery({ page: 1, limit: 10 });
  const [addSpare] = useAddSpareMutation();
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
  const onSubmit: SubmitHandler<SpareFormInputs> = async (data) => {
    if (selectedImage) {
      data.cover_image = selectedImage;
    }
    if (galleryImages.length > 0) {
      data.images = galleryImages;
    }

    try {
      await addSpare(data);
      toast.success("Ehtiyot qisim muvaffaqiyatli qo'shildi");
      reset();
      setSelectedImage(null);
      setGalleryImages([]);
    } catch (error) {
      toast.error("Ehtiyot qisim qo'shishda xatolik yuz berdi");
      console.error(error);
    }
  };

  const categories: CatsProps[] = data || [];
  const cars: CarsProps[] = vehicles?.vehicles || [];
  const options = cars.map((car) => {
    return { value: car.id, label: car.name_uz };
  });

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
        <h1 className="text-2xl text-black">Ehtiyot qisim Qo'shish</h1>
        <Button
          path="/admin/cars"
          className="mt-0 flex items-center gap-2 px-5"
        >
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
              Ehtiyot qisim nomi
            </label>
            <input
              type="text"
              {...register("name_uz", {
                required: "Ehtiyot qisim nomi majburiy",
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            />
            {errors.name_uz && (
              <span className="text-red-500 text-sm">
                {errors.name_uz.message}
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
              Narx
            </label>
            <input
              type="number"
              {...register("price", {
                required: "Narxni belgilash majburiy",
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
            <select
              {...register("vehicle_id", {
                required: "Avtomobil turi majburiy",
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            >
              {cars.map((c) => (
                <option value={c.id}>{c.name_uz}</option>
              ))}
            </select>
            {errors.vehicle_id && (
              <span className="text-red-500 text-sm">
                {errors.vehicle_id.message}
              </span>
            )}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Bo'lim nomi
            </label>
            <select
              {...register("category_id", {
                required: "Bo'lim nomi tanlash majburiy",
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            >
              {isLoading ? (
                <option>Loading...</option>
              ) : (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title_uz}
                  </option>
                ))
              )}
            </select>
            {errors.vehicle_id && (
              <span className="text-red-500 text-sm">
                {errors.vehicle_id.message}
              </span>
            )}
          </div>
          <div className="col-span-4">
            <Select options={options} />
          </div>
          <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-700">
              Izoh
            </label>
            <textarea
              {...register("description_uz", {
                required: "Description is required",
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
              rows={4}
            ></textarea>
            {errors.description_uz && (
              <span className="text-red-500 text-sm">
                {errors.description_uz.message}
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
                  src={`http://89.223.126.64:8080${selectedImage}`}
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
                      src={`http://89.223.126.64:8080${url}`}
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
        </div>
      </form>
    </div>
  );
}
