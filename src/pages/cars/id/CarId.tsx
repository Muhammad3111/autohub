import { useNavigate, useParams } from "react-router-dom";
import { useGetCarByIdQuery } from "../../../features/cars/carSlice";
import Header from "../../../components/header/Header";
import ModelViewer from "../../../utility/Model/Model";
import { RiFullscreenLine } from "react-icons/ri";
import { useAddCommentMutation } from "../../../features/blogs/blogs";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectCurrentUserData } from "../../../features/auth/authSlice";
import Rating from "../../../utility/rating/Rating";

export default function CarId() {
  const { id } = useParams<{ id: string }>();
  const { register, reset, handleSubmit } = useForm<Comments>();
  const [addComment] = useAddCommentMutation();
  const userData = useSelector(selectCurrentUserData);

  const navigate = useNavigate();
  const { data, isLoading } = useGetCarByIdQuery(id!);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const onSubmit: SubmitHandler<Comments> = async (data) => {
    const formData = new FormData();
    if (id) {
      formData.append("target_id", id);
      formData.append("target_type", "vehicle");
      formData.append("comment", data.comment);
    }

    try {
      await addComment(formData);
      toast.success("Comment muvaffaqiyatli qo'shildi");
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const car: CarObject = data;
  return (
    <div className="flex flex-col gap-4 w-full">
      <Header title={car.specifics[0].name_uz} />
      <div className="flex flex-col gap-4 py-5 my-container">
        <h1 className="text-4xl font-bold capitalize">
          {car.specifics[0].name_uz}
        </h1>
        <div className="flex gap-4">
          <div className="basis-1/2 flex gap-2">
            <div className="w-full h-[350px] bg-gray-300 relative">
              <ModelViewer />
              <button className="bg-primary text-white text-sm px-2 py-1 absolute bottom-2 left-2">
                Barcha rasmlarni ko'rish
              </button>
              <button
                onClick={() => navigate(`/cars/3dmodel/panorama`)}
                className="absolute bottom-2 right-2"
              >
                <RiFullscreenLine className="text-2xl" />
              </button>
              <button></button>
            </div>
            <div className="grid grid-cols-1 gap-2 w-full items-start">
              {car.images?.slice(0, 3).map((img, ind) => (
                <div key={ind}>
                  <img
                    src={`http://89.223.126.64:8080/api/${img.path}`}
                    alt={img.path}
                    className="w-full h-[110px] object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-4">
          <h1 className="text-xl">{car.rating}</h1>
          <Rating rating={car.rating} />
        </div>
        <div>
          <h1 className="text-2xl font-normal">
            Comments <span className="text-base text-gray-500">(0)</span>
          </h1>
          {userData && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 flex flex-col gap-2"
            >
              <textarea
                className="border rounded p-2"
                placeholder="Fikringizni yozing..."
                {...register("comment", {
                  required: "Ushbu joy bo'sh bo'lmasligi kerak",
                })}
                required
              />
              <button type="submit" className="bg-primary text-white p-2">
                Yuborish
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
