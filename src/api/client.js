import { useAuthStore } from '@/stores/auth'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export default async function apiFetch(path, options = {}) {
    const auth = useAuthStore();
    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    }

    if (auth.token) {
        headers['Authorization'] = `Bearer ${auth.token}`
    }

    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        let error = response.statusText;
        try {
            const data = await response.json();
            error = data.message || JSON.stringify(json);
        } catch { }
        throw new Error(`${error}`)
    }
    if (response.status === 204) return null
    return response.json()
}