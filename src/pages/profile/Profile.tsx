import { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import UserLikedCars from "./UserLikedCars";
import { useSelector } from "react-redux";
import { selectCurrentAccessToken } from "../../features/auth/authSlice";
import DealerProfile from "./DealerProfile";
import MyCreateCar from "./MyCreateCar";
import Loading from "../../components/loading/Loading";
import { useAuthDetailQuery } from "../../features/auth/authApiSlice";

const Profile = () => {
    const token = useSelector(selectCurrentAccessToken);
    const { data, isLoading } = useAuthDetailQuery({ token });
    const userData: UserDataType = data ?? ({} as UserDataType);

    const [activeTab, setActiveTab] = useState<
        "userProfile" | "likedCar" | "dealerProfile" | "myCreateCars"
    >("userProfile");

    useEffect(() => {
        if (userData?.role === "staff") {
            setActiveTab("dealerProfile");
        }
    }, [userData?.role]);

    const renderTabContent = () => {
        if (
            activeTab === "userProfile" &&
            (userData.role === "user" || userData.role === "admin")
        ) {
            return <UserProfile userData={userData} />;
        }

        if (
            activeTab === "dealerProfile" &&
            (userData.role === "staff" || userData.role === "service")
        ) {
            return <DealerProfile userData={userData} />;
        }

        if (
            activeTab === "likedCar" &&
            (userData.role === "user" || userData.role === "admin")
        ) {
            return <UserLikedCars />;
        }

        if (activeTab === "myCreateCars" && userData.role === "staff") {
            return <MyCreateCar />;
        }

        return null;
    };

    if (!userData || isLoading) {
        return <Loading />;
    }

    return (
        <div className='min-h-[614px]'>
            <div className='my-10 font-medium text-2xl'>
                {userData.first_name}
            </div>

            <div className='flex justify-between gap-20'>
                <div className='w-[400px] flex flex-col gap-1'>
                    {(userData.role === "user" ||
                        userData.role === "admin") && (
                        <>
                            <button
                                onClick={() => setActiveTab("userProfile")}
                                className={`w-full h-11 text-lg text-left pl-5 rounded ${
                                    activeTab === "userProfile"
                                        ? "bg-[#ddd]"
                                        : ""
                                }`}
                            >
                                Ma'lumotlarim
                            </button>
                            <button
                                onClick={() => setActiveTab("likedCar")}
                                className={`w-full h-11 text-lg text-left pl-5 rounded ${
                                    activeTab === "likedCar" ? "bg-[#ddd]" : ""
                                }`}
                            >
                                Sevimlilar
                            </button>
                        </>
                    )}

                    {(userData.role === "staff" ||
                        userData.role === "service") && (
                        <>
                            <button
                                onClick={() => setActiveTab("dealerProfile")}
                                className={`w-full h-11 text-lg text-left pl-5 rounded ${
                                    activeTab === "dealerProfile"
                                        ? "bg-[#ddd]"
                                        : ""
                                }`}
                            >
                                Ma'lumotlarim
                            </button>
                            <button
                                onClick={() => setActiveTab("myCreateCars")}
                                className={`w-full h-11 text-lg text-left pl-5 rounded ${
                                    activeTab === "myCreateCars"
                                        ? "bg-[#ddd]"
                                        : ""
                                }`}
                            >
                                Mening mashinalarim
                            </button>
                        </>
                    )}
                </div>

                {/* Content section */}
                <div className='flex-1'>{renderTabContent()}</div>
            </div>
        </div>
    );
};
export default Profile;
