import { useAuthStore } from '@/stores/auth'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export default async function apiFetch(path, options = {}) {
    const auth = useAuthStore();
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(options.headers || {}),
    }

    if (auth.token) {
        headers['Authorization'] = `Bearer ${auth.token}`
    }

    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers,
    });

    let payload
    const raw = await response.text()
    try {
        payload = JSON.parse(raw)
    } catch {
        payload = raw
    }

    if (!response.ok) {
        const msg =
            (payload && payload.detail) ||
            (typeof payload === 'string' && payload) ||
            response.statusText

        throw new Error(msg)
    }

    if (response.status === 204) {
        return null
    }

    return payload
}