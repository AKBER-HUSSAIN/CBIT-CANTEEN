import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api" }); // Ensure this matches the backend URL

// ✅ Add Authorization Header if User is Logged In
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    console.log("🔍 Token from localStorage:", token); // Log the token for debugging
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
