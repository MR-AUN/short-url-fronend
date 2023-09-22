import { getInfoCsr } from "@/src/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetUserInfo = () => {
    return useQuery(["me"], () => getInfoCsr());
};

