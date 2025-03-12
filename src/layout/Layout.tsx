import { Outlet } from "react-router-dom";
import TopHeader from "../adminComponents/topheader/TopHeader";
import Sidebar from "../adminComponents/sidebar/Sidebar";

export default function Layout() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <TopHeader />
                <div className="h-[88vh] overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
