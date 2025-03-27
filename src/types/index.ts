export type AuthState = {
    userData?: UserDataType | null;
    accessToken?: string | null;
    refreshToken?: string | null;
    language?: string | null;
    isLogin?: boolean | null;
};

export type UserDataType = {
    phone_number: string;
    role: string;
    username: string;
    name: string;
};

export type InputState = {
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
};
