import { useParams } from "react-router-dom";
import { useGetSpareByIdQuery } from "../../../features/spare-parts/spare-parts";
import Button from "../../../utility/button/Button";
import Header from "../../../components/header/Header";

export default function SpareId() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetSpareByIdQuery(id!);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const spare: SpareParts = data;

  return (
    <div className="max-w-[1400px] mx-auto">
      <Header title={spare.name_uz} />
      <div className="flex flex-col gap-4 py-5 my-container p-10">
        <div className="flex items-center gap-4">
          <div className="basis-1/2">
            <img
              src={`http://89.223.126.64:8080/api/${
                spare.cover_image || "placeholder.jpg"
              }`}
              alt={spare.name_uz}
              className="w-full h-[450px] object-cover"
            />
          </div>
          <div className="basis-1/2 grid grid-cols-2 gap-4">
            {spare.images?.slice(0, 4).map((img, ind) => (
              <div key={ind}>
                <img
                  src={`http://89.223.126.64:8080/api/${img.path}`}
                  alt={img.path}
                  className="w-full h-[217px] object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between py-4 border-b-2 border-gray-400">
          <h1 className="text-4xl font-bold capitalize">{spare.name_uz}</h1>
          <div className="flex items-center gap-10">
            <Button className="bg-black text-white px-4">
              Apply for Test Driver
            </Button>
            <h2 className="text-2xl font-bold text-primary">
              ${Number(spare.price).toLocaleString()}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
