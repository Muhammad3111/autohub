import { MdOutlineEdit } from "react-icons/md";
import { useGetSpareCatsQuery } from "../../../features/spare-parts/spare-categories";
import DeleteCat from "./DeleteCat";
import AddCategory from "./AddCategory";
import { useState } from "react";
import UpdateCategory from "./UpdateCat";

export default function ReadCategory() {
  const { data, isLoading } = useGetSpareCatsQuery({});
  const [updateCat, setUpdateCat] = useState<SpareCategories | null>(null);
  const [changeComponent, setChangeComponent] = useState<boolean>(false);
  if (isLoading) return <p>Loading...</p>;
  const categories: SpareCategories[] = data;

  const changeComponentFn = (cat: SpareCategories) => {
    setUpdateCat(cat);
    setChangeComponent(true);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {changeComponent ? (
        <UpdateCategory
          id={updateCat?.id || null}
          title_uz={updateCat?.title_uz || ""}
          title_ru={updateCat?.title_ru}
          setChangeComponent={setChangeComponent}
        />
      ) : (
        <AddCategory />
      )}

      <div className="flex flex-col border-2 rounded-md col-span-1 bg-white">
        <div className="grid grid-cols-4 items-center">
          <div className="col-span-1 px-4 py-1">
            <p className="text-lg font-bold">ID</p>
          </div>
          <div className="col-span-2 px-4 py-1">
            <p className="text-lg font-bold">Bo'lim nomi</p>
          </div>
          <div className="col-span-1 px-4 py-1">
            <p className="text-lg font-bold">Xarakatlar</p>
          </div>
        </div>
        <div className="h-[70vh] overflow-y-auto">
          {categories.map((cat, index) => (
            <div
              key={cat.id}
              className="grid grid-cols-4 border-y-2 items-center"
            >
              <div className="col-span-1 px-4 py-1">
                <p>#{index + 1}</p>
              </div>
              <div className="col-span-2 px-4 py-1">
                <p>{cat.title_uz}</p>
              </div>
              <div className="col-span-1 flex gap-4 items-center px-4 py-1">
                <button
                  className="rounded-full bg-blue-600 text-white p-2 duration-300 z-40"
                  onClick={() => changeComponentFn(cat)}
                >
                  <MdOutlineEdit className="text-lg" />
                </button>
                <DeleteCat id={cat.id || null} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
