interface ISigninPayload {
    email: string
    password: string
}

interface ISigninResponse {
    id: string
    email: string
    accessToken:string
}

interface ISignupPayload {
    email: string
    username: string
    password: string
}