import { Navigate, useLocation, useParams } from "react-router-dom";
import Header from "../../../components/header/Header";
import Image from "../../../components/image/Image";

const DealerId = () => {
    const location = useLocation();
    const state = location.state as DealersType;
    const { id } = useParams<{ id: string }>();

    if (state?.id !== id) {
        return <Navigate to={"/not-found"} />;
    }

    return (
        <div>
            <Header title={state.workplace_name} />
            {state?.id === id && (
                <div className='mt-20 p-10 shadow-md bg-white flex items-center justify-between gap-20'>
                    <div className='w-full h-[380px]'></div>
                    <div className='w-full h-[380px]'>
                        <Image src={state.avatar} alt='' />
                    </div>
                </div>
            )}
        </div>
    );
};
export default DealerId;
