import { API_SHORTER } from "@/lib/utils"

export const shorter = async (body: ShorterPayload): Promise<ShorterResponse> => {
    const result = await API_SHORTER.post(`shorter`, body).then(
        (response) => response.data
    )

    return result
}

export const getAllShortByUser = async (): Promise<ShorterResponse[]> => {
    const result = await API_SHORTER.get(`shorter`).then((response) => response.data);
    return result
};

export const getShortSsr = async (short_id: string | undefined): Promise<ShorterResponse> => {
    return API_SHORTER.get(`shorter/${short_id}`).then(
        (response) => response.data
    );
};
