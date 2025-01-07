import useGlobalLoading from "../../hooks/useGlobalLoading";
import Loading from "./Loading";

const GlobalLoading = () => {
    const isLoading = useGlobalLoading();

    if (!isLoading) return null;

    return <Loading />;
};

export default GlobalLoading;
