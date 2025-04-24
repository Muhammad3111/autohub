import { LuCircleUser } from "react-icons/lu";
import { PiBellSimple } from "react-icons/pi";
import Language from "../../components/navbar/Language";
import { useSelector } from "react-redux";
import { selectCurrentUserData } from "../../features/auth/authSlice";

export default function TopHeader() {
  const userData = useSelector(selectCurrentUserData);

  return (
    <div className="p-4 shadow-md border-b-2 flex items-center justify-end bg-white">
      <div className="flex items-center gap-10">
        <Language />
        <PiBellSimple className="text-3xl cursor-pointer hover:text-primary/50 duration-300" />
        <div className="flex gap-2 items-center">
          <LuCircleUser className="text-5xl" />
          {userData ? (
            <div className="flex flex-col cursor-pointer">
              <h1 className="text-xl text-black">{userData?.first_name}</h1>
              <p className="text-sm text-gray-300">{userData?.role}</p>
            </div>
          ) : (
            <div className="flex flex-col cursor-pointer">
              <h1 className="text-xl text-black">Yuklanmoqda...</h1>
              <p className="text-sm text-gray-300">Yuklanmoqda...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
