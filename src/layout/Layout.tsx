import Sidebar from "../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import TopHeader from "../components/topheader/TopHeader";

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
