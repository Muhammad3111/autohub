import { useContext } from "react";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { collection } from "../../mock/data.json";
import { useGetBrandsQuery } from "../../features/brands/brands";

const Brands = () => {
  const context = useContext(Context);
  const navigate = useNavigate();

  if (!context) {
    throw new Error(
      "Ushbu component context providerdan tashqarida ishlatilmoqda"
    );
  }

  const { setModel } = context;

  const carModels: Collection[] = collection;
  const { data: carBrands, isLoading } = useGetBrandsQuery({ page: 1 });
  const imageURL = import.meta.env.VITE_S3_PUBLIC_URL as string;
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mt-20 w-full bg-light p-6">
        {carModels.slice(1).map((item, index) => (
          <button
            onClick={() => {
              setModel(item.title);
              navigate(`/cars/${item.title}`);
            }}
            key={index}
            className="flex flex-col items-center gap-1"
          >
            <p className="text-dark uppercase">{item.title}</p>
          </button>
        ))}
      </div>

      <div className="w-full py-5 mt-5 grid grid-cols-10 gap-4 justify-items-center bg-light">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : carBrands?.items?.length ? (
          carBrands.items.slice(0, 10).map((item) => (
            <button
              key={item.id}
              className="flex flex-col items-center gap-2 text-center"
            >
              <img
                src={`${imageURL}${item.image}`}
                alt={item.name}
                width={40}
              />
              <p className="text-dark uppercase">{item.name}</p>
            </button>
          ))
        ) : (
          <h2>Brands not found</h2>
        )}
      </div>
    </div>
  );
};

export default Brands;
