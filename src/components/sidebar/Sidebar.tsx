import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";

type NavLinkType = {
    name: string;
    path: string;
};

const Sidebar = () => {
    const location = useLocation();
    const pathname = location.pathname;

    const navLinks: NavLinkType[] = [
        { name: "Bosh sahifa", path: "/" },
        { name: "Biz haqimizda", path: "/about-us" },
        { name: "Avtomobillar", path: "/cars" },
        { name: "Extiyot qismlar", path: "/spare-parts" },
        { name: "Servislar", path: "/services" },
        { name: "Dillerlar", path: "/dealers" },
        { name: "Yangiliklar", path: "/news" },
        { name: "Aloqa", path: "/contact" },
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
            className={`fixed top-[72px] left-0 h-[calc(100vh-72px)] bg-dark duration-150 overflow-hidden whitespace-nowrap
            ${sidebarOpen ? "w-52 px-3" : "w-0 px-0"}`}
        >
            <div className="flex flex-col gap-1">
                {navLinks.map((item, index) => {
                    const isActive = pathname === item.path;

                    return (
                        <Link
                            key={index}
                            to={item.path}
                            className={`px-4 py-2 font-medium text-base ${
                                isActive
                                    ? "bg-primary text-white"
                                    : "text-white"
                            }`}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
