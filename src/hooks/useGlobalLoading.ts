import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { QueryStatus } from "@reduxjs/toolkit/query";

const useGlobalLoading = () => {
    const isLoading = useSelector((state: RootState) => {
        const api = state.api;

        if (!api?.queries) return false;

        return Object.values(api.queries).some((query) => {
            const status = query?.status;
            return status === QueryStatus.pending;
        });
    });

    return isLoading;
};

export default useGlobalLoading;
