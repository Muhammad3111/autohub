import { CiBoxes } from "react-icons/ci";
import { IoCarSportOutline, IoChatbubblesOutline } from "react-icons/io5";
import { LuNotebookText, LuUsersRound } from "react-icons/lu";
import { MdOutlineSpeakerNotes } from "react-icons/md";

export default function Dashboard() {
  return (
    <div className="px-6 py-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="flex gap-10 items-center col-span-1 shadow-lg rounded-xl p-6 border-2">
          <div>
            <IoCarSportOutline className="text-7xl" />
          </div>
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-2xl text-black">200</h1>
            <p className="text-base text-gray-400">Cars</p>
          </div>
        </div>
        <div className="flex gap-10 items-center col-span-1 shadow-lg rounded-xl p-6 border-2">
          <div>
            <CiBoxes className="text-7xl" />
          </div>
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-2xl text-black">350</h1>
            <p className="text-base text-gray-400">Spare Parts</p>
          </div>
        </div>
        <div className="flex gap-10 items-center col-span-1 shadow-lg rounded-xl p-6 border-2">
          <div>
            <MdOutlineSpeakerNotes className="text-7xl" />
          </div>
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-2xl text-black">275</h1>
            <p className="text-base text-gray-400">Posts</p>
          </div>
        </div>
        <div className="flex gap-10 items-center col-span-1 shadow-lg rounded-xl p-6 border-2">
          <div>
            <LuNotebookText className="text-7xl" />
          </div>
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-2xl text-black">75</h1>
            <p className="text-base text-gray-400">Test Drive Orders</p>
          </div>
        </div>
        <div className="flex gap-10 items-center col-span-1 shadow-lg rounded-xl p-6 border-2">
          <div>
            <IoChatbubblesOutline className="text-7xl" />
          </div>
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-2xl text-black">2000</h1>
            <p className="text-base text-gray-400">Comments</p>
          </div>
        </div>
        <div className="flex gap-10 items-center col-span-1 shadow-lg rounded-xl p-6 border-2">
          <div>
            <LuUsersRound className="text-7xl" />
          </div>
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-2xl text-black">250</h1>
            <p className="text-base text-gray-400">Users</p>
          </div>
        </div>
      </div>
    </div>
  );
}
