import { getAllShortByUser } from "@/src/services/shorter.service";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetAllShortByUser = () => {
    return useQuery(["shorter"], () => getAllShortByUser(), {
        onError: (error: AxiosError) => {
            console.log(error)
        },
        keepPreviousData: true
    });
};
