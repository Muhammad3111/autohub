/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useForm,
  SubmitHandler,
  FieldValues,
  Path,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import Button from "../../utility/button/Button";
import {
  useUpdateCarMutation,
  useGetCarByIdQuery,
} from "../../features/cars/carSlice";
import { useState, useEffect, useMemo } from "react";
import Modal from "../../utility/modal/Modal";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useGetBrandsQuery } from "../../features/brands/brands";
import ExcelUploader from "../../utility/excelParser/ExcelParser";

type InputFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>; // 🔹 Endi name aniq `Path<T>` bo‘ldi
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  required?: boolean;
  type?: string;
};

export default function UpdateCar() {
  const { carId } = useParams<{ carId: string }>();
  const { data: carData, isLoading: carLoading } = useGetCarByIdQuery(carId!);
  const [updateCar] = useUpdateCarMutation();
  const { data: brandData, isLoading: brandLoading } = useGetBrandsQuery({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"single" | "gallery">("single");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const brands = useMemo(
    () =>
      (brandData?.items || []).map((b: any) => ({
        id: b.id,
        name: b.name,
      })),
    [brandData]
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

  const currency = [
    { id: "$", name: "$" },
    { id: "UZS", name: "UZS" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CarObject>({
    defaultValues: carData,
  });

  useEffect(() => {
    if (carData) {
      (Object.keys(carData) as (keyof CarObject)[]).forEach((key) => {
        setValue(key, carData[key]);
      });
      setSelectedImage(carData.cover_image || null);
      const imagePaths = carData.images?.map((img: string) => img) || [];
      setGalleryImages(imagePaths);
    }
  }, [carData, setValue]);

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

  const onSubmit: SubmitHandler<CarObject> = async (formData) => {
    if (selectedImage) formData.cover_image = selectedImage;
    if (galleryImages.length > 0) formData.images = galleryImages;

    try {
      await updateCar({ id: carId!, carData: formData });
      toast.success("Avtomobil muvaffaqiyatli yangilandi");
    } catch (error) {
      toast.error("Yangilashda xatolik yuz berdi", error as any);
    }
  };

  const handleRemoveImage = (url: string) => {
    setGalleryImages((prev) => prev.filter((image) => image !== url));
  };

  const handleRemoveMainImage = () => {
    setSelectedImage(null);
  };

  if (carLoading || brandLoading) {
    return <p>Yuklanmoqda...</p>;
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
        <h1 className="text-2xl text-black">Avtomobil Yangilash</h1>
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
            <SelectField
              label="Valyuta"
              name="currency"
              register={register}
              options={currency}
              defaultValue={currency[0].name}
            />
          </div>
          <ExcelUploader register={register} setValue={setValue} />
          <InputField
            label="Avtomobil turi"
            name="vehicle_type"
            register={register}
            errors={errors}
            required
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
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Rasm tanlang
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
          <button
            type="submit"
            className="w-full mt-2 py-2 bg-red-600 text-white text-base rounded flex items-center justify-center hover:bg-red-700"
          >
            Saqlash
          </button>
        </div>
      </form>
    </div>
  );
}

const InputField = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  required = false,
  type = "text",
}: InputFieldProps<T>) => (
  <div className="col-span-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      {...register(name, { required })}
      className="mt-1 block w-full border-gray-300 rounded-md p-2 border"
    />
    {errors?.[name] && (
      <span className="text-red-500 text-sm">
        {String(errors[name]?.message)}
      </span>
    )}
  </div>
);

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
}) => (
  <div className="col-span-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      defaultValue={defaultValue}
      {...register(name)}
      className="mt-1 block w-full border-gray-300 rounded-md p-2 border"
    >
      {isLoading ? (
        <option>Loading...</option>
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
