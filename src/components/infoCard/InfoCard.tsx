import { useNavigate } from "react-router-dom";
import Image from "../image/Image";

export default function InfoCard(props: Blogs) {
  const navigate = useNavigate();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // JSda oylar 0 dan boshlanadi
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };
  return (
    <div className="group flex flex-col gap-4 col-span-1 border px-4 py-8 shadow-md relative col-span-1">
      <h1 className="text-primary text-2xl line-clamp-3 text-center">
        {props.title_uz}
      </h1>
      <Image
        src={props.cover_image || "info_image"}
        alt="info-image"
        className="h-96 w-full object-cover"
      />
      <p className="text-center">
        Yangilangan sana: {formatDate(props.created_at)}
      </p>
      <div className="flex flex-col gap-4 p-4 shadow-lg absolute bg-white w-[90%] left-1/2 -translate-x-1/2 bottom-5 translate-y-10 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0 transition-all duration-300">
        <div className="flex flex-col gap-2 items-center">
          <p>Yangilangan sana: {formatDate(props.created_at)}</p>
          <p>Narx: Kelishuv asosida</p>
          <p>Formati: Excel</p>
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/contact")}
            className="p-2 text-center border bg-red-600 text-white text-lg hover:bg-red-700"
          >
            Buyurtma berish
          </button>
          <button
            onClick={() => navigate(`/news/${props.id}`)}
            className="p-2 text-center border bg-blue-500 text-white text-lg hover:bg-blue-600"
          >
            Batafsil
          </button>
        </div>
      </div>
    </div>
  );
}
