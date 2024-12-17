import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiMenu, FiSearch, FiUser } from "react-icons/fi";

type NavItem = {
    title: string;
    path: string;
};

const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => (
        <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
                `px-4 py-3 font-medium rounded text-base transition duration-200 ${
                    isActive
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:text-primary duration-200"
                }`
            }
        >
            {item.title}
        </NavLink>
    ));
};

const Navbar: React.FC = () => {
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const items: NavItem[] = [
        {
            title: "Home",
            path: "/",
        },
        {
            title: "Pages",
            path: "/pages",
        },
        {
            title: "Shop",
            path: "/shop",
        },
        {
            title: "Listings",
            path: "/listings",
        },
        {
            title: "Contact Us",
            path: "/contact",
        },
    ];

    return (
        <div
            className={`container mx-auto p-2 flex items-center justify-between bg-white h-16 sticky rounded transition-all duration-200 z-50 ${
                sticky ? "top-0 shadow-md" : "top-[10px]"
            }`}
            style={{ transition: "top 0.3s ease-in-out" }}
        >
            <nav>{renderNavItems(items)}</nav>

            <Link to={"/"} className="font-semibold text-2xl">
                Autohub
            </Link>

            <div className="flex items-center gap-10">
                <div className="flex border rounded h-10 bg-white">
                    <div className="flex items-center justify-center">
                        <FiSearch className="text-xl text-gray-400 mx-2" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search Now"
                        className="outline-none rounded h-full text-sm"
                    />
                </div>

                <Link
                    to={"/sign-in"}
                    className="flex items-center justify-center gap-2 duration-200 px-4 rounded"
                >
                    <FiUser className="text-xl" />
                    <p>Sign In</p>
                </Link>

                <button className="flex items-center justify-center text-white bg-primary py-3 px-10 rounded">
                    <FiMenu className="text-xl" />
                </button>
            </div>
        </div>
    );
};

export default Navbar;
