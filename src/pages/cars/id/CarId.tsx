import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetCarByIdQuery,
  useGetCarsQuery,
} from "../../../features/cars/carSlice";
import Header from "../../../components/header/Header";
import ModelViewer from "../../../utility/Model/Model";
import { RiFullscreenLine } from "react-icons/ri";
import {
  useAddCommentMutation,
  useGetCommentQuery,
} from "../../../features/blogs/blogs";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectCurrentUserData } from "../../../features/auth/authSlice";
import Rating from "../../../utility/rating/Rating";
import { useState } from "react";
import defaultImg from "../../../assets/dealer-default-img.png";
import { useTranslation } from "react-i18next";
import Image from "../../../components/image/Image";
import { Section } from "../../home/Categories";
import CardCar from "../../../components/card/CardCar";

import {
  useAddComparisonMutation,
  useDeleteComparisonMutation,
  useGetComparisonsQuery,
} from "../../../features/compare/compare";

export default function CarId() {
  const { id } = useParams<{ id: string }>();
  const { register, reset, handleSubmit } = useForm<Comments>();
  const [addComment] = useAddCommentMutation();
  const [addCompare] = useAddComparisonMutation();
  const [deleteFromCompare] = useDeleteComparisonMutation();
  const [months, setMonths] = useState<number>(3);
  const userData = useSelector(selectCurrentUserData);
  const { data: comparedData } = useGetComparisonsQuery(
    {},
    { skip: !!userData }
  );
  const comparedCars: CarObject[] = comparedData || [];
  const { data, isLoading } = useGetCarByIdQuery(id!);
  const { data: carsData } = useGetCarsQuery({ page: 1 });
  const car: CarObject = data;
  const [carRating, setCarRating] = useState<number>(car?.rating || 0);
  const { data: comments = [] } = useGetCommentQuery({
    target_id: id!,
    target_type: "vehicle",
  });

  const cars: CarObject[] = carsData?.items || [];
  const [showAllComments, setShowAllComments] = useState(false);
  const visibleComments = showAllComments
    ? comments ?? []
    : comments?.slice(0, 3) ?? [];

  const navigate = useNavigate();
  const { t } = useTranslation();
  if (isLoading) {
    return <h1>{t("loading")}...</h1>;
  }

  const releatedCars = cars.filter((item) =>
    item.name_uz.toLowerCase().includes(car.name_uz.toLowerCase())
  );

  const onSubmit: SubmitHandler<Comments> = async (data) => {
    const commentData = {
      target_id: id,
      target_type: "vehicle",
      rating: carRating,
      comment: data.comment,
    };

    try {
      await addComment(commentData)
        .unwrap()
        .then(() => {
          toast.success("Kommentariyangiz yuborildi!");
          reset();
          setCarRating(car.rating!);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const monthlyPayment = Math.round(Number(car.price) / months);
  const isCompared = comparedCars.some((car: CarObject) => car.id === id);

  const handleCompare = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.stopPropagation();
    try {
      if (isCompared) {
        await deleteFromCompare(id);
        toast.info("Taqqoslashdan olib tashlandi");
      } else {
        const response = await addCompare([id]).unwrap();
        if (response) {
          toast.success("Taqqoslashga qo'shildi!");
        }
      }
    } catch (error) {
      console.error("Compare xatolik:", error);
      toast.error("Amaliyot bajarilmadi. Iltimos, qayta urinib ko‘ring.");
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full pb-5">
      <Header title={car.name_uz} image={car.cover_image} />
      <div className="flex flex-col gap-4 py-5 my-container">
        <div className="flex gap-4">
          <div className="basis-[40%] flex gap-2">
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
            </div>
            <div className="grid grid-cols-1 gap-2 w-full items-start">
              {car.images?.slice(0, 3).map((img, ind) => (
                <div key={ind} className="relative">
                  <Image
                    src={img}
                    alt={img}
                    className="w-full h-[110px] object-cover"
                  />
                  {ind === 2 && car.images && car.images.length > 3 && (
                    <Link
                      to={`/cars/${car.name_uz}/gallery/${car.id}`}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-lg font-semibold"
                    >
                      +{car.images.length - 3}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4">
            <h1 className="text-4xl font-bold capitalize">{car.name_uz}</h1>
            <div className="flex items-center gap-4 mt-10">
              <h1 className="text-xl">{car.rating}</h1>
              <Rating rating={carRating} setRating={setCarRating} />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xl text-gray-500">
                Dealerdagi narx:{" "}
                <span className="text-3xl text-primary">
                  {Number(car.price)}$
                </span>
              </p>
              <div className="grid grid-cols-2 gap-4">
                <p className="col-span-1 text-xl text-gray-500">
                  Ishlab chiqaruvchi:{" "}
                  <span className="text-black">{car.brand?.name}</span>
                </p>
                <p className="col-span-1 text-xl text-gray-500">
                  Daraja: <span className="text-black">{car.vehicle_type}</span>
                </p>
                <p className="col-span-1 text-xl text-gray-500">
                  Bosib o'tish masofasi:{" "}
                  <span className="text-black">460km</span>
                </p>
                <p className="col-span-1 text-xl text-gray-500">
                  Battarey saqlash hajmi:{" "}
                  <span className="text-black">100kwh</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="bg-primary text-white text-base px-4 py-2"
                onClick={() => navigate(`/cars/parametrs/${car.id}`)}
              >
                Konfiguratisa
              </button>
              <button
                onClick={(e) => handleCompare(e, car.id!)}
                className="bg-primary text-white text-base px-4 py-2"
              >
                {isCompared ? "O'chirish" : "Taqqoslash"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-20">
        <div className="flex flex-col gap-4 w-2/3">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-normal">Qo'shimcha ma'lumot</h1>
            <p className="text-gray-500">{car.description_uz}</p>
          </div>
          <div>
            <div>
              <h1 className="text-xl font-normal">
                Comments{" "}
                <span className="text-base text-gray-500">
                  ({comments?.length})
                </span>
              </h1>

              <div className="flex flex-col mt-4 overflow-hidden">
                {visibleComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="py-4 first:border-t border-b flex gap-2 w-full relative min-h-32"
                  >
                    <div className="w-10 h-10 rounded-full">
                      <img
                        src={defaultImg}
                        alt=""
                        className="w-full h-full object-cover border rounded-full"
                      />
                    </div>
                    <div className="w-full">
                      <h1 className="text-sm">Anonymous</h1>
                      <p>{comment.comment}</p>
                    </div>
                    <p className="absolute bottom-2 right-2 text-gray-400 text-sm">
                      4 hour ago
                    </p>
                  </div>
                ))}
              </div>

              {comments.length > 3 && (
                <button
                  onClick={() => setShowAllComments(!showAllComments)}
                  className="mt-2 hover:underline"
                >
                  {showAllComments ? "Show Less" : "Show All Comments"}
                </button>
              )}
            </div>
            {userData && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-4 flex flex-col gap-4"
              >
                <textarea
                  className="w-full bg-transparent ring-1 p-4 ring-grey focus-within:ring-2 focus-within:ring-primary outline-none duration-300"
                  placeholder="Fikringizni yozing..."
                  {...register("comment", {
                    required: "Ushbu joy bo'sh bo'lmasligi kerak",
                  })}
                  required
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-hover text-white p-2 duration-150"
                >
                  Yuborish
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-normal">
              O'xshash avtomobillar{" "}
              <span className="text-base text-gray-500">
                ({releatedCars.length})
              </span>
            </h1>
            <div className="grid grid-cols-3 gap-4">
              {releatedCars.map((car) => (
                <CardCar key={car.id} vehicle={car} />
              ))}
            </div>
          </div>
        </div>

        <div className="w-1/2 border p-10">
          <div className="border rounded p-6 bg-gray-50 shadow-md mb-5">
            <h2 className="text-2xl font-semibold mb-4">Muddatli to'lov</h2>

            <label
              htmlFor="monthsRange"
              className="block mb-2 text-lg font-medium"
            >
              Muddatni tanlang:{" "}
              <span className="text-primary">{months} oy</span>
            </label>

            <input
              id="monthsRange"
              type="range"
              min="1"
              max="60"
              step="1"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full accent-primary"
            />

            <p className="mt-4 text-xl">
              <span className="font-semibold">Oyiga to'lov:</span>{" "}
              <span className="text-primary text-2xl">{monthlyPayment}$</span>
            </p>
          </div>
          <div className="flex-1">
            <Section
              name={t("home-page.popular-ranking")}
              value="popular-ranking"
              title={t("home-page.popular-ranking")}
              salesData={cars.slice(0, 3) || []}
            />
            <Section
              name={t("home-page.new-cars")}
              value="new-cars"
              title={t("home-page.new-cars")}
              salesData={[...(cars || [])].reverse().slice(0, 3)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
