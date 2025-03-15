import { Link, useLocation } from "react-router-dom";
import CarImage from "../../assets/login-car.webp";

type HeaderProps = {
    title: string;
    image?: string;
};

const Header = ({ title, image = CarImage }: HeaderProps) => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    // ID larni odam tushunadigan nomlarga o‘zgartirish
    const formatBreadcrumbName = (name: string) => {
        if (name.length === 36) return "Ma'lumot";
        return decodeURIComponent(name);
    };

    return (
        <div className="mb-8 mt-20">
            <div className="w-full h-52 bg-light shadow-md px-10 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold mb-4">{title}</h1>

                    {/* Breadcrumb */}
                    <nav className="text-gray-600 text-sm">
                        <Link to="/" className="hover:underline">
                            Bosh sahifa
                        </Link>
                        {pathnames.map((path, index) => {
                            const routeTo = `/${pathnames
                                .slice(0, index + 1)
                                .join("/")}`;
                            const isLast = index === pathnames.length - 1;

                            return (
                                <span key={routeTo}>
                                    <span className="mx-2">/</span>
                                    {isLast ? (
                                        <span className="text-black font-medium">
                                            {formatBreadcrumbName(path)}
                                        </span>
                                    ) : (
                                        <Link
                                            to={routeTo}
                                            className="hover:underline"
                                        >
                                            {formatBreadcrumbName(path)}
                                        </Link>
                                    )}
                                </span>
                            );
                        })}
                    </nav>
                </div>
                <img src={image} width={200} alt={title} />
            </div>
        </div>
    );
};

export default Header;
