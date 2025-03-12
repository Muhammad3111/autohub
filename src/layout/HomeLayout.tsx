import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

const HomeLayout = () => {
    return (
        <div className="w-full h-screen relative">
            <Navbar />
            <Sidebar />
            <main className="ml-[260px] p-10">
                <Outlet />
            </main>
            <footer className="ml-[260px]">
                <Footer />
            </footer>
        </div>
    );
};

export default HomeLayout;
