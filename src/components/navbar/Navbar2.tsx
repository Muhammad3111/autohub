import { FiMenu, FiSearch, FiUser } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/autohub-logo.jpg";

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
                `px-4 xl:px-6 font-medium pt-2.5 text-base transition duration-200 ${
                    isActive
                        ? "bg-primary text-white shadow-second"
                        : "text-gray-700 hover:text-primary duration-200"
                }`
            }
        >
            {item.title}
        </NavLink>
    ));
};

const Navbar2 = () => {
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
        <div className="w-full h-16 sticky top-0 left-0 z-40 bg-white flex items-center justify-between pl-6 lg:pl-16 gap-20">
            <Link to={"/"} className="text-2xl font-semibold ">
                <div className="hidden lg:flex gap-2">
                    <p>Autohub</p>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                    </div>
                </div>

                <div className="lg:hidden w-[60px] h-[60px]">
                    <img src={Logo} alt="" className="w-full h-full" />
                </div>
            </Link>

            <div className=" flex lg:hidden border rounded h-10 bg-white w-full">
                <div className="flex items-center justify-center">
                    <FiSearch className="text-xl text-gray-400 mx-2" />
                </div>
                <input
                    type="text"
                    placeholder="Search Now"
                    className="outline-none rounded h-full text-sm"
                />
            </div>

            <div className="border-b-2 border-primary h-full flex gap-0 lg:gap-4 xl:gap-10">
                <nav className="hidden lg:flex h-full pt-2">
                    {renderNavItems(items)}
                </nav>

                <div className="hidden lg:flex items-center gap-0 xl:gap-4 ">
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
                </div>

                <button className="flex items-center justify-center text-white bg-primary h-full px-10">
                    <FiMenu className="text-xl" />
                </button>
            </div>
        </div>
    );
};

export default Navbar2;
