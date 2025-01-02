import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../../utility/button/Button";
import ImageUploader from "../../utility/file-uploader/ImageUploader";
import MultiImageUploader from "../../utility/file-uploader/MultiImageUploader";

type CarFormInputs = {
  name: string;
  brand: string;
  model: string;
  year: number;
  transmission: string;
  vehicle_type: string;
  price: 0;
  engine_type: string;
  color: string;
  description: string;
};

export default function AddCar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CarFormInputs>();

  const onSubmit: SubmitHandler<CarFormInputs> = async (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-4 p-6">
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
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Avtomobil nomi
            </label>
            <input
              type="text"
              {...register("name", { required: "Avtomobil nomi majburiy" })}
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

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Year
            </label>
            <input
              type="number"
              {...register("year", {
                required: "Year is required",
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

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Vehicle Type
            </label>
            <input
              type="text"
              {...register("vehicle_type", {
                required: "Vehicle type is required",
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            />
            {errors.vehicle_type && (
              <span className="text-red-500 text-sm">
                {errors.vehicle_type.message}
              </span>
            )}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              {...register("price", {
                required: "Price is required",
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
              Color
            </label>
            <input
              type="text"
              {...register("color", { required: "Color is required" })}
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
            <input
              type="text"
              {...register("transmission")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Mator turi
            </label>
            <input
              type="text"
              {...register("engine_type")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
            />
          </div>

          <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
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
        <div className="col-span-1 flex flex-col gap-4">
          <div className="flex flex-col gap-2 col-span-full row-span-1">
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
          <ImageUploader />
          <MultiImageUploader />
        </div>
      </form>
    </div>
  );
}
