import axios from "axios";

const API = axios.create({ baseURL: "https://cbit-canteen-1.onrender.com/api" }); // Updated to deployed backend URL

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
