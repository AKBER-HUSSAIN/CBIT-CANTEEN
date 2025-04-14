import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000/api" }); // Ensure this matches the backend URL

// ✅ Add Authorization Header if User is Logged In
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    console.log("🔍 Token from localStorage:", token); // Log the token for debugging
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const getPersonalizedRecommendations = async (userId) => {
    try {
        const response = await API.get(`/recommendations/personalized/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching personalized recommendations:", error);
        throw error;
    }
};

export default API;
