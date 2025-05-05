import { useParams } from "react-router-dom";
import { useGetCarByIdQuery } from "../../../features/cars/carSlice";
import Loading from "../../../components/loading/Loading";
import Header from "../../../components/header/Header";
import Image from "../../../components/image/Image";

export default function Gallery() {
  const { galleryId } = useParams<{ galleryId: string }>();
  const { data, isLoading } = useGetCarByIdQuery(galleryId!);

  if (isLoading) {
    return <Loading />;
  }

  const car: CarObject = data;

  return (
    <div className="w-full">
      <Header title={car.name_uz} image={car.cover_image} />
      <div className="grid grid-cols-4 gap-4">
        {car.images?.map((image) => (
          <div className="col-span-1">
            <Image
              src={image}
              width={400}
              alt={image}
              className="h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
