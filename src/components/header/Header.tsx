import { Link, useLocation } from "react-router-dom";
import CarImage from "../../assets/login-car.webp";
import { useTranslation } from "react-i18next";
import Image from "../image/Image";
import { useGetAdsQuery } from "../../features/ads/ads";

type HeaderProps = {
  title: string;
  image?: string;
};

const Header = ({ title, image }: HeaderProps) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const { data, isSuccess } = useGetAdsQuery({});
  const { t } = useTranslation();

  const formatBreadcrumbName = (name: string) => {
    if (name.length === 36) return t("information");
    return decodeURIComponent(name);
  };

  const ads: AdsType[] = data || [];
  const currentPage = pathnames[pathnames.length - 1];

  return (
    <div className="mb-8 mt-20">
      <div className="w-full h-40 bg-light shadow-md px-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-4 capitalize">{title}</h1>

          <nav className="text-gray-600 text-sm">
            <Link to="/" className="hover:underline">
              {t("sidebar.home")}
            </Link>
            {pathnames.map((path, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1;

              return (
                <span key={routeTo}>
                  <span className="mx-2">/</span>
                  {isLast ? (
                    <span className="text-black font-medium capitalize">
                      {formatBreadcrumbName(path)}
                    </span>
                  ) : (
                    <Link to={routeTo} className="hover:underline capitalize">
                      {formatBreadcrumbName(path)}
                    </Link>
                  )}
                </span>
              );
            })}
          </nav>
        </div>
        <div>
          {isSuccess ? (
            ads
              .filter((ad) => ad.page === currentPage)
              .map((ad) => (
                <Image
                  key={ad.id}
                  src={ad.image_url}
                  width={800}
                  alt={ad.title}
                  className="h-32 object-cover"
                />
              ))
          ) : (
            <h1>Reklama yo'q...</h1>
          )}
        </div>
        {image ? (
          <Image src={image} width={200} alt={title} />
        ) : (
          <img src={CarImage} width={200} alt={title} />
        )}
      </div>
    </div>
  );
};

export default Header;
