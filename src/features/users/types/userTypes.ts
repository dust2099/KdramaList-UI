export interface User {
    id: number;
    username: string;
    email: string;
    created_at: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface UpdateUserPayload {
    username?: string;
    email?: string;
    password?: string;
}

export interface AuthResponse {
    accessToken: string;
    user: User;
}