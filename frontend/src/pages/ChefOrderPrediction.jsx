import React, { useState } from 'react';
import axios from 'axios';

const ChefOrderPrediction = () => {
    const [day, setDay] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handle day change
    const handleDayChange = (e) => setDay(e.target.value);

    // Handle time slot change
    const handleTimeSlotChange = (e) => setTimeSlot(e.target.value);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!day || !timeSlot) {
            setError('Please select both day and time slot');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:3000/api/ai/predict-orders', { timeSlot, day });
            setPredictions(response.data.prediction);
        } catch (err) {
            console.error('Prediction Error:', err);
            setError('Failed to fetch predictions');
        }
        setLoading(false);
    };

    return (
        <div className="chef-order-prediction p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Order Prediction for Today</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div className="flex space-x-4">
                    <select value={day} onChange={handleDayChange} className="p-2 border rounded-lg">
                        <option value="">Select Day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                    <select value={timeSlot} onChange={handleTimeSlotChange} className="p-2 border rounded-lg">
                        <option value="">Select Time Slot</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                    </select>
                </div>
                {error && <div className="text-red-500">{error}</div>}
                <button type="submit" className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                    Get Predictions
                </button>
            </form>

            {loading && <div className="mt-4 text-gray-500">Loading...</div>}

            {predictions.length > 0 && (
                <div className="predictions mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {predictions.map((item, index) => (
                        <div key={index} className="card bg-blue-100 p-4 rounded-lg shadow-lg hover:scale-105 transition-all">
                            <h3 className="text-xl font-semibold text-blue-800">{item.item}</h3>
                            <p className="text-lg text-blue-600">Predicted Quantity: {item.predictedQuantity}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChefOrderPrediction;
