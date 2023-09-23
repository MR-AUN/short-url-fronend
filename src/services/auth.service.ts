import { API_USER } from "@/lib/utils"

export const signin = async (body: ISigninPayload): Promise<void> => {
    const result = await API_USER.post(`auths/signin/`, body).then(
        (response) =>
            response.data
    )

    console.log(result);


    localStorage.setItem("tokens", JSON.stringify(result))
    return result
}

export const signout = async (): Promise<void> => {

    return localStorage.removeItem("tokens");
};

export const signup = async (body: ISignupPayload): Promise<void> => {
    const result = await API_USER.post(`/auths/signup`, body).then(
        (response) => response.data
    );

    localStorage.setItem("tokens", JSON.stringify(result))
    return result;
};


// export const getInfoSsr = async (): Promise<ISigninResponse> => {
//     console.log('local',localStorage.getItem("tokens") as string);
//     return API_USER.get(`users/me`, {
//         headers: {

//         },
//         withCredentials: true,
//     }).then(
//         (response) => response.data
//     );
// };

export const getInfoCsr = async (): Promise<ISigninResponse > => {
    try {
        const tokensString = localStorage.getItem('tokens');
        const tokens: { accessToken: string } | null = tokensString ? JSON.parse(tokensString) : null;

        const response = await API_USER.get(`users/me`, {
            headers: {
                'Authorization': `Bearer ${tokens?.accessToken}`,
                "Content-Type": 'application/json',
            },
        });
        const { user_id, email, } = response.data;

        return { id: user_id, email, accessToken: '' }
    } catch (error) {
        return  { id: "", email: '', accessToken: '' }
    }
};
