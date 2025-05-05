/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { toast } from "react-toastify";
import { useAddCarMutation } from "../../features/cars/carSlice";
import { useGetBrandsQuery } from "../../features/brands/brands";
import Button from "../../utility/button/Button";
import Modal from "../../utility/modal/Modal";
import ExcelUploader from "../../utility/excelParser/ExcelParser";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { collection } from "../../mock/data.json";

const LoadingSkeleton = () => (
  <div className="flex flex-col gap-4 p-6">
    <div className="h-10 bg-gray-300 animate-pulse rounded w-1/2" />
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="h-12 bg-gray-200 animate-pulse rounded" />
      ))}
    </div>
  </div>
);

type InputFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>; // 🔹 Endi name aniq `Path<T>` bo‘ldi
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  required?: boolean;
  type?: string;
  className?: string;
};

export default function AddCar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CarObject>({
    defaultValues: { configurations: [], currency: "$" },
  });

  const [addCar] = useAddCarMutation();
  const { data, isLoading } = useGetBrandsQuery({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"single" | "gallery">("single");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const { pathname } = useLocation();

  const brands = useMemo(
    () =>
      (data?.items || [])
        .filter((b) => b.brand_type === "vehicle")
        .map((b: any) => ({
          id: b.id,
          name: b.name,
        })),
    [data]
  );

  const engineTypes = [
    { id: "Gasoline", name: "Gasoline" },
    { id: "Petrol", name: "Petrol" },
    { id: "Diesel", name: "Diesel" },
    { id: "Propane", name: "Propane" },
    { id: "Electric", name: "Electric" },
    { id: "Hybrid", name: "Hybrid" },
  ];

  const driveTypes = [
    { id: "FWD", name: "FWD" },
    { id: "RWD", name: "RWD" },
    { id: "AWD", name: "AWD" },
  ];

  const transmissions = [
    { id: "Manual", name: "Manual" },
    { id: "Automatic", name: "Automatic" },
  ];

  const vehicleType = collection.slice(1).map((type) => {
    return {
      id: type.title,
      name: type.title,
    };
  });

  const handleImageSelect = (url: string | string[]) => {
    if (modalType === "single" && typeof url === "string") {
      setSelectedImage(url);
    } else if (Array.isArray(url)) {
      setGalleryImages((prev) => [...prev, ...url]);
    }
    setIsModalOpen(false);
  };

  const handleRemoveImage = (url: string) => {
    setGalleryImages((prev) => prev.filter((image) => image !== url));
  };

  const handleRemoveMainImage = () => {
    setSelectedImage(null);
  };

  const onSubmit: SubmitHandler<CarObject> = async (formData) => {
    try {
      const carData = {
        ...formData,
        cover_image: selectedImage || undefined,
        images: galleryImages.length > 0 ? galleryImages : undefined,
      };
      await addCar(carData);
      toast.success("Avtomobil muvaffaqiyatli qo'shildi");
      reset();
      setSelectedImage(null);
      setGalleryImages([]);
    } catch (error) {
      toast.error("Avtomobil qo'shishda xatolik yuz berdi");
      console.error(error);
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div
      className={`flex flex-col gap-4 ${
        pathname.includes("/admin") ? "p-6" : "p-0"
      }`}
    >
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onSelect={handleImageSelect}
          type={modalType}
        />
      )}

      <div className="flex justify-between items-center">
        {pathname.includes("/admin") && (
          <h1 className="text-2xl text-black">Avtomobil Qo'shish</h1>
        )}
        {pathname.includes("/admin") && (
          <Button path={"/admin/cars"} className="px-4">
            Orqaga
          </Button>
        )}
      </div>

      <form
        className="grid grid-cols-3 w-full gap-4 items-start"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-2 grid grid-cols-4 gap-4">
          <InputField
            label="Avtomobil nomi"
            name="name_uz"
            register={register}
            errors={errors}
            required
          />
          <SelectField
            label="Brand"
            name="brand_id"
            register={register}
            options={brands}
            errors={errors}
            defaultValue={brands[0]?.id}
          />
          <InputField
            label="Model"
            name="model"
            register={register}
            errors={errors}
            required
          />
          <InputField
            label="Yil"
            name="year"
            register={register}
            errors={errors}
            required
            type="number"
          />
          <div className="flex gap-4 w-full col-span-2">
            <InputField
              label="Narx"
              name="price"
              register={register}
              errors={errors}
              required
              type="number"
            />
            <InputField
              label="Sotilgan soni"
              name="most_sold"
              register={register}
              errors={errors}
              required
              type="number"
            />
          </div>
          <ExcelUploader register={register} setValue={setValue} />
          <SelectField
            label="Avtomobil turi"
            name="vehicle_type"
            register={register}
            options={vehicleType}
            defaultValue={vehicleType[0].id}
          />
          <SelectField
            label="Harakat turi"
            name="drive_type"
            register={register}
            options={driveTypes}
            defaultValue={driveTypes[0].id}
          />
          <SelectField
            label="Transmissiya"
            name="transmission"
            register={register}
            options={transmissions}
            defaultValue={transmissions[0].id}
          />
          <SelectField
            label="Dvigitel turi"
            name="engine_type"
            register={register}
            options={engineTypes}
            defaultValue={engineTypes[0].id}
          />
          <div className="col-span-4">
            <label
              htmlFor="description_uz"
              className="block text-sm font-medium text-gray-700"
            >
              Qoshimcha ma'lumot
              <textarea
                rows={5}
                className=" mt-1 block w-full border-gray-300 rounded-md p-2 border"
                id="description_uz"
                {...register("description_uz")}
              ></textarea>
            </label>
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700">
              Asosiy rasmni tanlash
            </label>
            <button
              type="button"
              onClick={() => {
                setModalType("single");
                setIsModalOpen(true);
              }}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Rasm tanlang
            </button>
            {selectedImage && (
              <div className="relative w-full h-48">
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
              Gallery rasmlarini tanlash
            </label>
            <button
              type="button"
              onClick={() => {
                setModalType("gallery");
                setIsModalOpen(true);
              }}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Rasmlarni tanlang
            </button>
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {galleryImages.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={`https://usc1.contabostorage.com/c3e282af10b9439688d5390b60ed4045:autohub/${url}`}
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

// 🔹 InputField - Custom Input
const InputField = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  required = false,
  type = "text",
  className,
}: InputFieldProps<T>) => (
  <div className="col-span-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      {...register(name, { required })}
      className={`mt-1 block w-full border-gray-300 rounded-md p-2 border ${className}`}
    />
    {errors?.[name] && (
      <span className="text-red-500 text-sm">
        {String(errors[name]?.message)}
      </span>
    )}
  </div>
);

// 🔹 SelectField - Custom Select
const SelectField = ({
  label,
  name,
  register,
  options,
  errors,
  isLoading = false,
  defaultValue,
}: {
  label: string;
  name: keyof CarObject;
  register: any;
  options: string[] | { id: number | string; name: string }[];
  errors?: any;
  isLoading?: boolean;
  defaultValue?: string | number;
}) => {
  const { t } = useTranslation();
  return (
    <div className="col-span-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        defaultValue={defaultValue}
        {...register(name)}
        className="mt-1 block w-full border-gray-300 rounded-md p-2 border"
      >
        {isLoading ? (
          <option>{t("loading")}...</option>
        ) : (
          options.map((option) =>
            typeof option === "string" ? (
              <option key={option} value={option}>
                {option}
              </option>
            ) : (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            )
          )
        )}
      </select>
      {errors?.[name] && (
        <span className="text-red-500 text-sm">{errors[name]?.message}</span>
      )}
    </div>
  );
};
