import { FiSearch } from "react-icons/fi";
import { LuCircleUser } from "react-icons/lu";
import { PiBellSimple } from "react-icons/pi";
import Language from "../../components/navbar/Language";

export default function TopHeader() {
  return (
    <div className="p-4 shadow-md border-b-2 flex items-center justify-between bg-white">
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
      <div className="flex items-center gap-10">
        <Language />
        <PiBellSimple className="text-3xl cursor-pointer hover:text-primary/50 duration-300" />
        <div className="flex gap-2 items-center">
          <LuCircleUser className="text-5xl" />
          <div className="flex flex-col cursor-pointer">
            <h1 className="text-xl text-black">Muhammad</h1>
            <p className="text-sm text-gray-300">admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
