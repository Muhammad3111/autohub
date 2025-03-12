import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { useContext, useEffect } from "react";
import { Context } from "../context/Context";

const HomeLayout = () => {
    const location = useLocation();
    const pathname = location.pathname;

    const context = useContext(Context);
    if (!context) {
        throw new Error("Ushbu component contextdan tashqarida ishlatilmoqda");
    }

    const { sidebarOpen, setSidebarOpen } = context;

    useEffect(() => {
        if (pathname.startsWith("/cars/parametrs")) {
            setSidebarOpen(false);
        }
    }, [pathname, setSidebarOpen]);

    return (
        <div className="w-full h-screen relative">
            <Navbar />

            <Sidebar />

            <main
                className={`duration-150 ${sidebarOpen ? "ml-52" : "ml-0"} ${
                    !pathname.startsWith("/cars/parametrs") ? "p-10" : ""
                }`}
            >
                <Outlet />
            </main>

            <footer
                className={`duration-150 ${sidebarOpen ? "ml-52" : "ml-0"}`}
            >
                <Footer />
            </footer>
        </div>
    );
};

export default HomeLayout;
