import React, { useState } from "react";
import axios from "axios";

const ChefOrderPrediction = () => {
    const [timeSlot, setTimeSlot] = useState("Lunch");
    const [day, setDay] = useState("Monday");
    const [predictions, setPredictions] = useState([]);
    const [error, setError] = useState("");

    const handlePredict = async () => {
        try {
            const response = await axios.post(
                "/api/ai/predict-orders",
                { timeSlot, day },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            setPredictions(response.data.prediction);
        } catch (err) {
            setError("Failed to fetch predictions");
        }
    };

    return (
        <div>
            <h2>Order Prediction</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
                <label>
                    Time Slot:
                    <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                    </select>
                </label>
                <label>
                    Day:
                    <select value={day} onChange={(e) => setDay(e.target.value)}>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                </label>
                <button onClick={handlePredict}>Predict</button>
            </div>
            <ul>
                {predictions.map((prediction, index) => (
                    <li key={index}>
                        {prediction.item}: {prediction.predictedQuantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChefOrderPrediction;
