import React, { useEffect, useState } from "react";
import axios from "axios";

const UserRecommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.get("/api/ai/recommendations", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setRecommendations(response.data.recommendations);
            } catch (err) {
                setError("Failed to fetch recommendations");
            }
        };

        fetchRecommendations();
    }, []);

    return (
        <div>
            <h2>Recommended for You</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {recommendations.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserRecommendations;
