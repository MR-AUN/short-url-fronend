import { API_USER } from "@/lib/utils"

export const signin = async (body: ISigninPayload): Promise<void> => {
    const result = await API_USER.post(`auths/signin/`, body).then(
        (response) => response.data
    )

    return result
}

export const signout = async (): Promise<void> => {
    await API_USER.post(`auths/signout`).then(
        (response) => response.data
    );
};

export const signup = async (body: ISignupPayload): Promise<void> => {
    const result = await API_USER.post(`/auths/signup`, body).then(
        (response) => response.data
    );
    return result;
};


export const getInfoSsr = async (cookie: string | undefined): Promise<ISigninResponse> => {
    return API_USER.get(`users/me`, {
        headers: { cookie },
        withCredentials: true,
    }).then(
        (response) => response.data
    );
};

export const getInfoCsr = async (): Promise<ISigninResponse> => {
    const response = await API_USER.get(`users/me`);
    const { user_id, email, } = response.data;

    return { id: user_id, email, accessToken: '' }
};
