import { useForm } from "react-hook-form";
import { useUpdateSpareCatMutation } from "../../../features/spare-parts/spare-categories";
import { toast } from "react-toastify";
import React from "react";

type Categories = {
  id: number | null;
  title_uz: string;
  title_ru?: string;
  setChangeComponent: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UpdateCategory({
  id,
  title_uz,
  title_ru,
  setChangeComponent,
}: Categories) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Categories>({
    defaultValues: { id, title_uz, title_ru },
  });
  const [upadateCat] = useUpdateSpareCatMutation();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await upadateCat({ id, catData: data });
      toast.success("Bo'lim muvaffaqiyatli qo'shildi");
      reset();
      setChangeComponent(false);
    } catch (error) {
      toast.error("Xatolik yuz berdi");
      console.error("Error adding category:", error);
    }
  });
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 col-span-1">
      <div className="col-span-1">
        <label className="block text-sm font-medium text-gray-700">
          Bo'lim nomi
        </label>
        <input
          type="text"
          {...register("title_uz", { required: "Rang majburiy" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 p-2"
        />
        {errors.title_uz && (
          <span className="text-red-500 text-sm">
            {errors.title_uz.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="w-full mt-1 text-base bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Yangilash
      </button>
    </form>
  );
}
