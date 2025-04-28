import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import BrandsFilter from "../../utility/filter/BrandsFilter";
import { MdLocationPin } from "react-icons/md";
import { useGetDealersQuery } from "../../features/auth/authApiSlice";
import { FiClock } from "react-icons/fi";
import { formatDateTime } from "../../hooks/useFormatDateTime";
import { useTranslation } from "react-i18next";
import Image from "../../components/image/Image";

const Services = () => {
  const { data } = useGetDealersQuery({ page: 1, type: "service" });
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <Header title="Services" />
      <div className="grid grid-cols-7 gap-4">
        <BrandsFilter />
        <div className="col-span-6 bg-white">
          <div className="flex flex-col gap-4 p-10">
            {data ? (
              data.map((item) => (
                <Link
                  to={`/services/${item.id}`}
                  state={item}
                  key={item.id}
                  className="w-full bg-white p-5 hover:bg-primary hover:bg-opacity-5 border hover:border-primary duration-150 flex gap-8 relative"
                >
                  <Image
                    src={item.avatar}
                    alt={item.workplace_name}
                    className="h-[150px] object-cover"
                    width={200}
                  />

                  <div className="flex flex-col gap-2">
                    <h1 className="font-normal text-lg cursor-pointer leading-5">
                      {item.workplace_name}
                    </h1>

                    <div className="text-sm flex items-center gap-1">
                      <FiClock className="text-2xl text-gray-500" />
                      <p>{formatDateTime(item.created_at)}</p>
                    </div>
                    <div className="text-sm flex items-center gap-1">
                      <MdLocationPin className="text-2xl text-gray-500" />
                      <p>
                        {item.region}, {item.city}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 absolute bottom-4 right-4">
                    <button className="border border-black p-2 text-sm">
                      Free consultation
                    </button>
                    <button className="border border-primary p-2 text-sm text-primary hover:bg-primary hover:text-white duration-150">
                      Check the quotation
                    </button>
                  </div>
                </Link>
              ))
            ) : (
              <h2>{t("not-found")}</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Services;
