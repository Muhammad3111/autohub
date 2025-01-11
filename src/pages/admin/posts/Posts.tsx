import ReadBlogs from "../../../adminComponents/posts/ReadBlogs";
import Button from "../../../utility/button/Button";

export default function Posts() {
  return (
    <div className="flex flex-col gap-4 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Bloglar</h1>
        <Button
          className="mt-0 flex items-center gap-2 px-5"
          path="/admin/posts/add"
        >
          Blog Qo'shish
        </Button>
      </div>
      <ReadBlogs />
    </div>
  );
}
