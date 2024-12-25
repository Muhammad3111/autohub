import { useState } from "react";
import {
  LuLayoutDashboard,
  LuNotebookText,
  LuUsersRound,
} from "react-icons/lu";
import Logo from "../../assets/autohub-logo.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCarSportOutline, IoChatbubblesOutline } from "react-icons/io5";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { RiMenuFold3Line } from "react-icons/ri";
import { CiBoxes } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPostsOpen, setIsPostsOpen] = useState(false); // Submenu holati

  const togglePostsMenu = () => {
    setIsPostsOpen((prev) => !prev);
    navigate("/admin/posts");
  };

  return (
    <div className="w-72 shadow-lg border-2 border-gray-200 h-screen flex flex-col gap-4 bg-white">
      <div className="flex items-center justify-between px-2">
        <div
          className="flex justify-center items-center h-16 gap-2 cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          <img src={Logo} alt="" className="w-10 object-cover" />
          <h1 className="text-black text-2xl">AutoHub</h1>
        </div>
        <RiMenuFold3Line className="text-xl cursor-pointer" />
      </div>
      <ul className="flex flex-col items-start px-2">
        <li
          onClick={() => navigate("/admin/dashboard")}
          className={`px-4 py-2 ${
            location.pathname === "/admin/dashboard"
              ? "bg-primary text-white"
              : "bg-transparent text-black"
          } text-base font-semibold w-full rounded-xl cursor-pointer hover:bg-primary/50 hover:text-white duration-300 flex items-center gap-2`}
        >
          <LuLayoutDashboard className="text-2xl" />
          Dashboard
        </li>
        <li
          onClick={() => navigate("/admin/cars")}
          className={`px-4 py-2 ${
            location.pathname === "/admin/cars"
              ? "bg-primary text-white"
              : "bg-transparent text-black"
          } text-base font-semibold w-full rounded-xl cursor-pointer hover:bg-primary/50 hover:text-white duration-300 flex items-center gap-2`}
        >
          <IoCarSportOutline className="text-2xl" />
          Cars
        </li>
        <li
          onClick={() => navigate("/admin/spare-parts")}
          className={`px-4 py-2 ${
            location.pathname === "/admin/spare-parts"
              ? "bg-primary text-white"
              : "bg-transparent text-black"
          } text-base font-semibold w-full rounded-xl cursor-pointer hover:bg-primary/50 hover:text-white duration-300 flex items-center gap-2`}
        >
          <CiBoxes className="text-2xl" />
          Spare Parts
        </li>
        <li className="w-full">
          <div
            onClick={togglePostsMenu}
            className={`px-4 py-2 ${
              location.pathname.startsWith("/admin/posts")
                ? "bg-primary text-white"
                : "bg-transparent text-black"
            } ${
              isPostsOpen ? "rounded-t-xl" : "rounded-xl"
            } text-base font-semibold w-full  cursor-pointer hover:bg-primary/50 hover:text-white duration-300 flex items-center justify-between`}
          >
            <div className="flex items-center gap-2">
              <MdOutlineSpeakerNotes className="text-2xl" />
              Posts
            </div>
            <span className="text-lg">
              {isPostsOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </div>
          <ul
            className={`pl-4 overflow-hidden transition-all duration-300 rounded-b-xl ${
              location.pathname.startsWith("/admin/posts")
                ? "bg-primary text-white"
                : "bg-transparent text-black"
            }  ${isPostsOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <li
              onClick={() => navigate("/admin/posts/category")}
              className="px-6 py-2 text-white hover:text-black duration-300 cursor-pointer rounded-xl"
            >
              Category
            </li>
            <li
              onClick={() => navigate("/admin/posts")}
              className="px-6 py-2 text-white hover:text-black duration-300 rounded-xl cursor-pointer"
            >
              All Posts
            </li>
          </ul>
        </li>
        <li
          onClick={() => navigate("/admin/test-drive")}
          className={`px-4 py-2 ${
            location.pathname === "/admin/test-drive"
              ? "bg-primary text-white"
              : "bg-transparent text-black"
          } text-base font-semibold w-full rounded-xl cursor-pointer hover:bg-primary/50 hover:text-white duration-300 flex items-center gap-2`}
        >
          <LuNotebookText className="text-2xl" />
          Test Drive
        </li>
        <li
          onClick={() => navigate("/admin/comments")}
          className={`px-4 py-2 ${
            location.pathname === "/admin/comments"
              ? "bg-primary text-white"
              : "bg-transparent text-black"
          } text-base font-semibold w-full rounded-xl cursor-pointer hover:bg-primary/50 hover:text-white duration-300 flex items-center gap-2`}
        >
          <IoChatbubblesOutline className="text-2xl" />
          Comments
        </li>
        <li
          onClick={() => navigate("/admin/users")}
          className={`px-4 py-2 ${
            location.pathname === "/admin/users"
              ? "bg-primary text-white"
              : "bg-transparent text-black"
          } text-base font-semibold w-full rounded-xl cursor-pointer hover:bg-primary/50 hover:text-white duration-300 flex items-center gap-2`}
        >
          <LuUsersRound className="text-2xl" />
          Users
        </li>
      </ul>
    </div>
  );
}
