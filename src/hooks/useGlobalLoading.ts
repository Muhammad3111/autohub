import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { QueryStatus } from "@reduxjs/toolkit/query";

const useGlobalLoading = () => {
    const isLoading = useSelector((state: RootState) => {
        const api = state.api;

        if (!api?.queries) return false;

        for (let query of Object.values(api.queries)) {
            if (query?.status === QueryStatus.pending) {
                return true;
            }
        }

        return false;
    });

    return isLoading;
};

export default useGlobalLoading;
