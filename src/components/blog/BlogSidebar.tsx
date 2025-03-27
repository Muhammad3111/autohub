import { IoIosArrowRoundForward } from "react-icons/io";

type Props = {
  blogs: Blogs[];
};

export default function BlogSidebar({ blogs }: Props) {
  const categoryMap = new Map<string, number>();

  blogs.forEach((article) => {
    categoryMap.set(
      article.category,
      (categoryMap.get(article.category) || 0) + 1
    );
  });

  const categoryArray = Array.from(categoryMap, ([category, count]) => ({
    category,
    count,
  }));

  return (
    <div className="flex flex-col">
      <form action="" className="relative w-full">
        <input
          type="text"
          className="border pl-4 pr-10 py-2.5 text-base w-full focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Izlash..."
        />
        <button className="absolute right-1 top-1 user-select-none bg-white">
          <IoIosArrowRoundForward className="text-4xl" />
        </button>
      </form>
      <div className="flex flex-col bg-grey p-4 mt-10">
        <h1 className="text-3xl font-bold text-center mb-5">Bo'limlar</h1>
        <div className="flex flex-col divide-y-2 divide-gray-300">
          {categoryArray.length > 0 ? (
            categoryArray.map((c, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <h2 className="text-base font-semibold">{c.category}</h2>
                <span className="text-base font-normal">{c.count}</span>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-grey">
              <h1 className="text-3xl font-normal text-primary">
                Ma'lumotlar topilmadi
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
