import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Button from "../../utility/button/Button";
import { useState } from "react";
import Modal from "../../utility/modal/Modal";
import { toast } from "react-toastify";
import { useAddSpareMutation } from "../../features/spare-parts/spare-parts";
import { useGetCarsQuery } from "../../features/cars/carSlice";
import { useGetSpareCatsQuery } from "../../features/spare-parts/spare-categories";
import Select from "react-select";
import { useGetBrandsQuery } from "../../features/brands/brands";

export type SpareFormInputs = {
  name_uz: string;
  name_ru?: string;
  description_uz: string;
  description_ru?: string;
  brand_id: number;
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

type OptionType = {
  value: string;
  label: string;
};

export default function AddSpareParts() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<SpareFormInputs>();

  const { data: categoriesData } = useGetSpareCatsQuery({});
  const { data: vehiclesData } = useGetCarsQuery({ page: 1, limit: 100 });
  const { data: brandsData } = useGetBrandsQuery({});
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
    setGalleryImages((prev) => prev.filter((img) => img !== url));
  };

  const handleRemoveMainImage = () => {
    setSelectedImage(null);
  };

  const onSubmit: SubmitHandler<SpareFormInputs> = async (formData) => {
    if (selectedImage) formData.cover_image = selectedImage;
    if (galleryImages.length) formData.images = galleryImages;

    try {
      await addSpare(formData).unwrap();
      toast.success("Ehtiyot qism muvaffaqiyatli qo‘shildi!");
      reset();
      setSelectedImage(null);
      setGalleryImages([]);
    } catch (err: any) {
      toast.error(err?.data?.message || "Xatolik yuz berdi");
      console.error(err);
    }
  };

  const categories: CatsProps[] = categoriesData || [];
  const cars: CarObject[] = vehiclesData?.items || [];
  const brandList: Brand[] = brandsData?.items || [];

  const carOptions: OptionType[] = cars.map((car) => ({
    value: car.id || "",
    label: car.name_uz,
  }));

  const imageURL = import.meta.env.VITE_S3_PUBLIC_URL as string;

  return (
    <div className="flex flex-col gap-6 p-6">
      {isModalOpen && (
        <Modal
          type={modalType}
          onClose={() => setIsModalOpen(false)}
          onSelect={handleImageSelect}
        />
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-black">
          Ehtiyot qism qo‘shish
        </h1>
        <Button path="/admin/spare-parts" className="px-5">
          Orqaga
        </Button>
      </div>

      <form
        className="grid grid-cols-3 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Left Form */}
        <div className="col-span-2 grid grid-cols-4 gap-4">
          <div className="col-span-2">
            <label className="text-sm font-medium">Ehtiyot qism nomi</label>
            <input
              type="text"
              {...register("name_uz", { required: "Nomi majburiy" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            />
            {errors.name_uz && (
              <p className="text-red-500 text-sm">{errors.name_uz.message}</p>
            )}
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium">OEM code</label>
            <input
              type="text"
              {...register("oem_code", { required: "OEM code majburiy" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            />
            {errors.oem_code && (
              <p className="text-red-500 text-sm">{errors.oem_code.message}</p>
            )}
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium">Brand</label>
            <select
              {...register("brand_id", {
                required: "Avtomobil turi kerak",
                valueAsNumber: true,
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            >
              <option value="">Tanlang</option>
              {brandList
                .filter((b) => b.brand_type === "spare_part")
                .map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
            </select>
            {errors.brand_id && (
              <p className="text-red-500 text-sm">{errors.brand_id.message}</p>
            )}
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium">Narx</label>
            <input
              type="number"
              {...register("price", {
                required: "Narx majburiy",
                valueAsNumber: true,
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium">Avtomobil turi</label>
            <select
              {...register("vehicle_id", { required: "Avtomobil turi kerak" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            >
              <option value="">Tanlang</option>
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.name_uz}
                </option>
              ))}
            </select>
            {errors.vehicle_id && (
              <p className="text-red-500 text-sm">
                {errors.vehicle_id.message}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium">Bo‘lim</label>
            <select
              {...register("category_id", {
                required: "Bo‘lim majburiy",
                valueAsNumber: true,
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            >
              <option value="">Tanlang</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title_uz}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="text-red-500 text-sm">
                {errors.category_id.message}
              </p>
            )}
          </div>

          <div className="col-span-4">
            <label className="text-sm font-medium">Mos avtomobillar</label>
            <Controller
              name="applicable_models"
              control={control}
              defaultValue={[]}
              render={({ field: { value, onChange, ...rest } }) => (
                <Select
                  {...rest}
                  isMulti
                  options={carOptions}
                  placeholder="Tanlang"
                  value={carOptions.filter((opt) => value.includes(opt.value))}
                  onChange={(selected) =>
                    onChange((selected as OptionType[]).map((opt) => opt.value))
                  }
                />
              )}
            />
          </div>

          <div className="col-span-4">
            <label className="text-sm font-medium">Izoh</label>
            <textarea
              {...register("description_uz", { required: "Izoh majburiy" })}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            />
            {errors.description_uz && (
              <p className="text-red-500 text-sm">
                {errors.description_uz.message}
              </p>
            )}
          </div>
        </div>

        {/* Right Panel - Image upload */}
        <div className="col-span-1 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium">Asosiy rasm</label>
            <button
              type="button"
              className="w-full px-4 py-2 bg-blue-600 text-base mt-1 text-white rounded-md hover:bg-blue-700"
              onClick={() => {
                setModalType("single");
                setIsModalOpen(true);
              }}
            >
              Rasm tanlash
            </button>
            {selectedImage && (
              <div className="relative mt-2 h-48 w-full">
                <img
                  src={`${imageURL}${selectedImage}`}
                  className="rounded-md object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={handleRemoveMainImage}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-5 h-5 flex justify-center items-center"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Gallery rasmlar</label>
            <button
              type="button"
              className="w-full px-4 py-2 text-base bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-1"
              onClick={() => {
                setModalType("gallery");
                setIsModalOpen(true);
              }}
            >
              Gallery tanlash
            </button>
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {galleryImages.map((img, idx) => (
                  <div key={idx} className="relative h-24">
                    <img
                      src={`${imageURL}${img}`}
                      className="object-cover w-full h-full rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(img)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex justify-center items-center"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
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
      </form>
    </div>
  );
}
