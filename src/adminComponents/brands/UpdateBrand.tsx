import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../../utility/button/Button";
import { useState, useEffect } from "react";
import Modal from "../../utility/modal/Modal";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  useGetBrandyIdQuery,
  useUpdateBrandMutation,
} from "../../features/brands/brands";
import { useTranslation } from "react-i18next";
import Image from "../../components/image/Image";

export default function UpdateBrand() {
  const { brandId } = useParams<{ brandId: string }>();
  const { t } = useTranslation();
  const { data, isLoading } = useGetBrandyIdQuery(Number(brandId!));
  const [updateBrand] = useUpdateBrandMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"single" | "gallery">("single");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Brand>({
    defaultValues: data,
  });

  useEffect(() => {
    if (data) {
      (Object.keys(data) as (keyof Brand)[]).forEach((key) => {
        setValue(key, data[key]);
      });
      setSelectedImage(data.image || null);
    }
  }, [data, setValue]);

  const handleImageSelect = (url: string | string[]) => {
    if (modalType === "single" && typeof url === "string") {
      setSelectedImage(url);
    }
    setIsModalOpen(false);
  };

  const handleRemoveMainImage = () => {
    setSelectedImage(null);
  };

  const onSubmit: SubmitHandler<Brand> = async (data) => {
    if (selectedImage) {
      data.image = selectedImage;
    }

    try {
      await updateBrand({ id: Number(brandId!), brandData: data });
      toast.success("Brand muvaffaqiyatli yangilandi");
    } catch (error) {
      console.error(error);
      toast.error("Brand yangilashda xatolik yuz berdi");
    }
  };

  if (isLoading) {
    return <p>{t("loading")}...</p>;
  }

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
        <h1 className="text-2xl text-black">Brandni Yangilash</h1>
        <Button
          path="/admin/brands"
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
              Brand nomi
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Brand nomi majburiy",
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-700">
              Brand turi
            </label>
            <select
              defaultValue={"vehicle"}
              {...register("brand_type", {
                required: "Brnad turi majburiy",
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            >
              <option value="vehicle">Avtomobil</option>
              <option value="spare_part">Ehtiyot qisim</option>
            </select>
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
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
                Yangilash
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
                <Image
                  src={`${selectedImage}`}
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
        </div>
      </form>
    </div>
  );
}
