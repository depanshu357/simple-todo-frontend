import axios from "axios";

const client = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',  // Skip ngrok interstitial page
    },
})

export default client;