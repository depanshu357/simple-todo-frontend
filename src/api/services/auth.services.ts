import type { GoogleLoginData, GoogleLoginResponse, LoginData, LoginResponse, SignUpData, SignUpRespone } from "../../types/Auth"
import client from "../client"

const authClient = client.create({
    baseURL: `${client.defaults.baseURL}/auth`
})

export const authService = {
    async singup(data: SignUpData): Promise<SignUpRespone> {
        const response = authClient.post('/signup', data);
        return (await response).data;
    },
    async login(data: LoginData): Promise<LoginResponse> {
        const response = authClient.post('/login', data);
        return (await response).data;
    },
    async googleLogin(data: GoogleLoginData): Promise<GoogleLoginResponse> {
        console.log(data);
        const response = authClient.post('/google-login', data);
        return (await response).data;
    } 
}