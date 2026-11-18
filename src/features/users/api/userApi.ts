import { authFetch, setAccessToken } from "../../../lib/authFetch";
import type { AuthResponse, LoginCredentials, UpdateUserPayload, User } from "../types/userTypes";

const BASE_URL = import.meta.env.VITE_API_URL;

export const userApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const res = await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(credentials),
        })

        if (!res.ok) {
            const err = await res.json()
            throw new Error(err.message || 'Login failed')
        }

        const data: AuthResponse = await res.json()
        setAccessToken(data.accessToken)
        return data

    },

    updateUser: async ( id:number, payload: UpdateUserPayload): Promise<User> => {
        const res = await authFetch(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        })

        if (!res.ok) {
            const err = await res.json()
            throw new Error(err.error || 'Update failed')
        }

        const data: { user: User } = await res.json()
        return data.user
    },

    logout: async (): Promise<void> => {
        await authFetch('/users/logout', {
            method: 'POST',
            credentials: 'include',
        })
        setAccessToken(null)
    }
}