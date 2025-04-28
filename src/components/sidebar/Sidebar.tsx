import { ReactElement, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import { GoHome } from "react-icons/go";
import { TfiCup } from "react-icons/tfi";
import { IoCarSportOutline, IoNewspaperOutline } from "react-icons/io5";
import { BsBuilding, BsBuildingGear, BsInfoCircle } from "react-icons/bs";
import { CiBoxes } from "react-icons/ci";
import { MdOutlinePhone } from "react-icons/md";
import { useTranslation } from "react-i18next";

type NavLinkType = {
  name: string;
  path: string;
  icon: ReactElement;
};

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { t } = useTranslation();
  const navLinks: NavLinkType[] = [
    { name: t("sidebar.home"), path: "/", icon: <GoHome /> },
    { name: t("sidebar.cars"), path: "/cars", icon: <IoCarSportOutline /> },
    { name: t("sidebar.dealers"), path: "/dealers", icon: <BsBuilding /> },
    {
      name: t("sidebar.services"),
      path: "/services",
      icon: <BsBuildingGear />,
    },
    {
      name: t("sidebar.spare-parts"),
      path: "/spare-parts",
      icon: <CiBoxes />,
    },
    {
      name: t("sidebar.ratings"),
      path: "/ratings",
      icon: <TfiCup />,
    },
    {
      name: t("sidebar.news"),
      path: "/news",
      icon: <IoNewspaperOutline />,
    },
    {
      name: t("sidebar.about-us"),
      path: "/about-us",
      icon: <BsInfoCircle />,
    },
    {
      name: t("sidebar.contact"),
      path: "/contact",
      icon: <MdOutlinePhone />,
    },
  ];

  const context = useContext(Context);

  if (!context) {
    throw new Error(
      "Ushbu component Context.Provider dan tashqarida ishlatilmoqda"
    );
  }

  const { sidebarOpen } = context;

  return (
    <div
      className={`fixed top-[72px] left-0 h-[calc(100vh-72px)] bg-light-500 duration-150 overflow-hidden whitespace-nowrap
            ${sidebarOpen ? "w-60 px-3" : "w-0 px-0"}`}
    >
      <div className="flex flex-col gap-1 mt-2">
        {navLinks.map((item, index) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`px-4 py-2.5 hover:bg-primary flex items-center gap-2 duration-150 w-40 ${
                isActive ? "bg-primary text-white " : "hover:bg-opacity-20"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
