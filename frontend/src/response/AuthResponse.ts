export interface IUser {
    email: string,
    isActivated: Boolean,
    id: string
}

export interface AuthResponse {
    accessToken: string,
    refreshToken: string,
    user: IUser;
}

