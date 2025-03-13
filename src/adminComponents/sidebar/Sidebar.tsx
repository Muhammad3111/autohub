import { useEffect, useState } from "react";
import { LuLayoutDashboard, LuNotebookText } from "react-icons/lu";
import Logo from "../../assets/autohub-logo.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCarSportOutline } from "react-icons/io5";
import { MdOutlinePermMedia, MdOutlineSpeakerNotes } from "react-icons/md";
import { RiMenuFold3Line } from "react-icons/ri";
import { CiBoxes } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TbBrandAppstore } from "react-icons/tb";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPostsOpen, setIsPostsOpen] = useState(""); // Submenu holati
  const [toggleLink, setToggleLink] = useState<string>("");
  useEffect(() => {
    if (!location.pathname.includes(toggleLink)) {
      setIsPostsOpen("");
    }
  }, [location.pathname, toggleLink]);

  const togglePostsMenu = (link: string) => {
    if (isPostsOpen === link) {
      setIsPostsOpen(""); // Submenyuni yopish
    } else {
      setIsPostsOpen(link); // Submenyuni ochish
      navigate(link); // Linkka o'tish
      setToggleLink(link); // Aktiv linkni belgilash
    }
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
            location.pathname.includes("/admin/dashboard")
              ? "bg-primary text-white"
              : "bg-transparent text-black"
          } text-base font-semibold w-full rounded-xl cursor-pointer hover:bg-primary/50 hover:text-white duration-300 flex items-center gap-2`}
        >
          <LuLayoutDashboard className="text-2xl" />
          Dashboard
        </li>
        <li
          onClick={() => navigate("/admin/media")}
          className={`px-4 py-2 ${
            location.pathname.includes("/admin/media")
              ? "bg-primary text-white"
              : "bg-transparent text-black"
          } text-base font-semibold w-full rounded-xl cursor-pointer hover:bg-primary/50 hover:text-white duration-300 flex items-center gap-2`}
        >
          <MdOutlinePermMedia className="text-2xl" />
          Media
        </li>
        <li
          onClick={() => navigate("/admin/brands")}
          className={`px-4 py-2 ${
            location.pathname.includes("/admin/brands")
              ? "bg-primary text-white"
              : "bg-transparent text-black"
          } text-base font-semibold w-full rounded-xl cursor-pointer hover:bg-primary/50 hover:text-white duration-300 flex items-center gap-2`}
        >
          <TbBrandAppstore className="text-2xl" />
          Brandlar
        </li>
        <li
          onClick={() => navigate("/admin/cars")}
          className={`px-4 py-2 ${
            location.pathname.includes("/admin/cars")
              ? "bg-primary text-white"
              : "bg-transparent text-black"
          } text-base font-semibold w-full rounded-xl cursor-pointer hover:bg-primary/50 hover:text-white duration-300 flex items-center gap-2`}
        >
          <IoCarSportOutline className="text-2xl" />
          Cars
        </li>
        <li className="w-full">
          <div
            onClick={() => togglePostsMenu("/admin/spare-parts")}
            className={`px-4 py-2 ${
              location.pathname.includes("/admin/spare-parts")
                ? "bg-primary text-white"
                : "bg-transparent text-black"
            } ${
              isPostsOpen === "/admin/spare-parts"
                ? "rounded-t-xl"
                : "rounded-xl"
            } text-base font-semibold w-full  cursor-pointer hover:bg-primary/50 hover:text-white duration-300 flex items-center justify-between`}
          >
            <div className="flex items-center gap-2">
              <CiBoxes className="text-2xl" />
              Spare Parts
            </div>
            <span className="text-lg">
              {isPostsOpen === "/admin/spare-parts" ? (
                <IoIosArrowUp />
              ) : (
                <IoIosArrowDown />
              )}
            </span>
          </div>
          <ul
            className={`pl-4 overflow-hidden transition-all duration-300 rounded-b-xl ${
              location.pathname.startsWith("/admin/spare-parts")
                ? "bg-primary text-white"
                : "bg-transparent text-black"
            }  ${
              isPostsOpen === "/admin/spare-parts"
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <li
              onClick={() => navigate("/admin/spare-parts/categories")}
              className="px-6 py-2 text-white hover:text-black duration-300 cursor-pointer rounded-xl"
            >
              Bo'limar
            </li>
            <li
              onClick={() => navigate("/admin/spare-parts")}
              className="px-6 py-2 text-white hover:text-black duration-300 rounded-xl cursor-pointer"
            >
              Barcha ehtiyot qismlar
            </li>
          </ul>
        </li>
        <li className="w-full">
          <div
            onClick={() => navigate("/admin/posts")}
            className={`px-4 py-2 ${
              location.pathname.includes("/admin/posts")
                ? "bg-primary text-white"
                : "bg-transparent text-black"
            } rounded-xl text-base font-semibold w-full  cursor-pointer hover:bg-primary/50 hover:text-white duration-300 flex items-center justify-between`}
          >
            <div className="flex items-center gap-2">
              <MdOutlineSpeakerNotes className="text-2xl" />
              Bloglar
            </div>
          </div>
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
        {/* <li
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
        </li> */}
      </ul>
    </div>
  );
}
