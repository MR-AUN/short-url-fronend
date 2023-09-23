import { API_SHORTER } from "@/lib/utils"

export const shorter = async (body: ShorterPayload): Promise<ShorterResponse> => {
    const tokensString = localStorage.getItem('tokens');
    const tokens: { accessToken: string } | null = tokensString ? JSON.parse(tokensString) : null;
    const result = await API_SHORTER.post(`shorter`, body, {
        headers: {
            'Authorization': `Bearer ${tokens?.accessToken}`,
            "Content-Type": 'application/json',
        }
    }).then(
        (response) => response.data
    )

    return result
}

export const getAllShortByUser = async (): Promise<ShorterResponse[]> => {
    const tokensString = localStorage.getItem('tokens');
    const tokens: { accessToken: string } | null = tokensString ? JSON.parse(tokensString) : null;
    const result = await API_SHORTER.get(`shorter`, {
        headers: {
            'Authorization': `Bearer ${tokens?.accessToken}`,
            "Content-Type": 'application/json',
        },
    }).then((response) => response.data);
    return result
};

export const getShortSsr = async (short_id: string | undefined): Promise<ShorterResponse> => {
    return API_SHORTER.get(`shorter/${short_id}`).then(
        (response) => response.data
    );
};
