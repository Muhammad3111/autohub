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

type InputFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>; // 🔹 Endi name aniq `Path<T>` bo‘ldi
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  required?: boolean;
  type?: string;
};

export default function AddCar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CarObject>({ defaultValues: { configurations: [] } });
  const [addCar] = useAddCarMutation();
  const { data, isLoading } = useGetBrandsQuery({});

  // 🔹 Modal va rasmlar boshqaruvi
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"single" | "gallery">("single");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  // 🔹 Brendlar ma'lumotini olish va optimallashtirish
  const brands = useMemo(
    () =>
      (data?.items || []).map((b: any) => ({
        id: b.id,
        name: b.name, // 🔹 Faqat `id` va `name` ni olamiz
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

  // 🔹 Yangi avtomobil qo'shish
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

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* 🔹 Modal */}
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
        className="grid grid-cols-3 w-full gap-4 items-start"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* 🔹 Asosiy maydonlar */}
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
            isLoading={isLoading}
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
          <InputField
            label="Narx"
            name="price"
            register={register}
            errors={errors}
            required
            type="number"
          />
          <ExcelUploader register={register} setValue={setValue} />
          <InputField
            label="Avtomobil turi"
            name="vehicle_type"
            register={register}
            errors={errors}
            required
            type="text"
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

        {/* 🔹 Rasm va qo'shimcha ma'lumotlar */}
        <div className="col-span-1 flex flex-col gap-5">
          {/* 🔹 Asosiy rasm tanlash */}
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

          {/* 🔹 Gallery uchun rasm tanlash */}
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

// 🔹 InputField - Custom Input
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
