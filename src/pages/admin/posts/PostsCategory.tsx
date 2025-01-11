import BlogCat from "../../../adminComponents/posts/categories/BlogCat";

export default function PostCategories() {
  return (
    <div className="flex flex-col gap-4 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Blog bo'limlari</h1>
      </div>
      <BlogCat />
    </div>
  );
}
