import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Button from "../../utility/button/Button";
import { useState } from "react";
import Modal from "../../utility/modal/Modal";
import { toast } from "react-toastify";
import { useGetCarsQuery } from "../../features/cars/carSlice";
import { useAddBlogMutation } from "../../features/blogs/blogs";
import Select from "react-select";
import Image from "../../components/image/Image";
import { articles } from "../../mock/data.json";

export default function AddBlog() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<Blogs>();
  const { data: vehicles, isLoading } = useGetCarsQuery({ page: 1, limit: 10 });
  const [addBlog] = useAddBlogMutation();
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
  const onSubmit: SubmitHandler<Blogs> = async (data) => {
    if (selectedImage) {
      data.cover_image = selectedImage;
    }
    if (galleryImages.length > 0) {
      data.images = galleryImages;
    }

    try {
      await addBlog(data);
      toast.success("Blog muvaffaqiyatli qo'shildi");
      reset();
      setSelectedImage(null);
      setGalleryImages([]);
    } catch (error) {
      console.error(error);
    }
  };

  const cars: CarObject[] = vehicles?.items || [];
  const carsOption = cars.map((car) => {
    return {
      value: car.id || "",
      label: car.name_uz,
    };
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
        <h1 className="text-2xl text-black">Blog Qo'shish</h1>
        <Button
          path="/admin/posts"
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
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Blog nomi
            </label>
            <input
              type="text"
              {...register("title_uz", { required: "Blog majburiy" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            />
            {errors.title_uz && (
              <span className="text-red-500 text-sm">
                {errors.title_uz.message}
              </span>
            )}
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Video link
            </label>
            <input
              type="text"
              {...register("video_link")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Bo'lim nomi
            </label>
            <select
              {...register("category", {
                required: "Bo'limni tanlash majburiy",
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            >
              <option value="">Tanlang</option>
              {articles.map((blog) => (
                <option key={blog.value} value={blog.value}>
                  {blog.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Avtomobil turi
            </label>
            {/* <select
              {...register("vehicle_id")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            >
              {isLoading ? (
                <option>Loading...</option>
              ) : (
                cars.map((c) => <option value={c.id}>{c.name_uz}</option>)
              )}
            </select> */}
            <Controller
              name="vehicle_id"
              control={control}
              rules={{ required: "Avtomobil turi majburiy" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={carsOption}
                  isLoading={isLoading}
                  isClearable={true}
                  isSearchable={true}
                  className="basic-single mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2"
                  classNamePrefix="select"
                  value={
                    carsOption.find((option) => option.value === field.value) ||
                    null
                  } // ✅ `value` obyekt sifatida bo'lishi kerak
                  onChange={(selectedOption) =>
                    field.onChange(selectedOption?.value)
                  }
                />
              )}
            />
            {errors.vehicle_id && (
              <span className="text-red-500 text-sm">
                {errors.vehicle_id.message}
              </span>
            )}
          </div>

          <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-700">
              Izoh
            </label>
            <textarea
              {...register("content_uz", {
                required: "Description is required",
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
              rows={4}
            ></textarea>
            {errors.content_uz && (
              <span className="text-red-500 text-sm">
                {errors.content_uz.message}
              </span>
            )}
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700">
              Blog rasmini qo'shish
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
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700">
              Blog galleryasini qo'shish
              <button
                type="button"
                onClick={() => {
                  setModalType("gallery");
                  setIsModalOpen(true);
                }}
                className="w-full px-4 py-2 text-base bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-1"
              >
                Rasm tanlang
              </button>
            </label>
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {galleryImages.map((url, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={`${url}`}
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
