import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import { useFlashStore } from '@/stores/flash';

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export default async function apiFetch(path, options = {}) {
    const auth = useAuthStore();
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(options.headers || {}),
    }

    const isFormData = options.body instanceof FormData
    if (isFormData) {
        delete headers['Content-Type']
    }

    if (auth.token) {
        headers['Authorization'] = `Bearer ${auth.token}`
    }

    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        auth.logout()

        const flash = useFlashStore();

        flash.flash('Votre session a expiré, veuillez vous reconnecter.', 'danger')

        const currentRoute = router.currentRoute.value
        const requiresAuth = !!currentRoute.meta.requiresAuth

        if (requiresAuth) {
            router.push({ name: 'login', query: { expire: 1 } })
        }
    }

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

    // JUST FOR DEVELOPPEMENT FOR TESTING LOADER
    if (import.meta.env.VITE_DEVELOPPER_MODE === 'true') {
        await new Promise(r => setTimeout(r, 400)); // 400 ms
    }

    return payload
}