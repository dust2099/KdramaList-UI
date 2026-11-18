const BASE_URL = import.meta.env.VITE_API_URL;

let accessToken: string | null = null

export const setAccessToken = (token: string | null) => {
    accessToken = token
}

export async function refreshAccessToken(): Promise<string> {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
    })

    if (!response.ok) {
        setAccessToken(null)
        throw new Error('Failed to refresh access token')
    }

    const data: { accessToken: string } = await response.json()
    setAccessToken(data.accessToken)
    return data.accessToken
}

export async function authFetch(
    endpoint: string, 
    options: RequestInit = {}  
    ): Promise<Response> {
        const headers = new Headers(options.headers);
        headers.set('Content-Type', 'application/json');

        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }

        let response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers,
            credentials: 'include',
        });

        if (response.status === 401) {
            const newToken = await refreshAccessToken();
            headers.set('Authorization', `Bearer ${newToken}`);

            response = await fetch(`${BASE_URL}${endpoint}`, {
                ...options,
                headers,
                credentials: 'include',
        });
    }

    return response;
}
