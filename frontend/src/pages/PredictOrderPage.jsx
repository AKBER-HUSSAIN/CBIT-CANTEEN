import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaChartLine, FaCalendarAlt, FaArrowLeft, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import MenuHeader from '../components/MenuHeader';
import MenuFooter from '../components/MenuFooter';

const PredictOrderPage = () => {
    const [timeslot, setTimeslot] = useState('');
    const [day, setDay] = useState('');
    const [predictions, setPredictions] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const navigate = useNavigate();

    const timeslots = ['Breakfast', 'Lunch', 'Dinner'];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        // Fetch menu items when component mounts
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/menu/items', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setMenuItems(response.data);
            } catch (err) {
                console.error('Error fetching menu items:', err);
            }
        };
        fetchMenuItems();
    }, []);

    const handlePredict = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                'http://localhost:3000/api/ai/predict-orders',
                { timeslot, day },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );

            console.log('API Response:', response.data); // Debug log

            // Check if we have predictions in the response
            if (response.data && response.data.prediction && Array.isArray(response.data.prediction)) {
                // Process each prediction and match with menu items
                const processedPredictions = response.data.prediction
                    .map(pred => {
                        const menuItem = menuItems.find(item =>
                            item.name.toLowerCase() === pred.item.toLowerCase()
                        );
                        if (menuItem) {
                            return {
                                item: menuItem.name,
                                predictedQuantity: pred.predictedQuantity,
                                price: menuItem.price,
                                category: menuItem.category
                            };
                        }
                        return {
                            item: pred.item,
                            predictedQuantity: pred.predictedQuantity,
                            price: 0,
                            category: 'Other'
                        };
                    })
                    .filter(pred => pred.predictedQuantity > 0);

                setPredictions(processedPredictions);
            } else {
                setPredictions([]);
                setError('No predictions received from the server');
            }
        } catch (err) {
            console.error('Prediction Error:', err);
            setError('Failed to get predictions. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <MenuHeader />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <motion.button
                        onClick={() => navigate("/chef-dashboard")}
                        className="mb-8 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                        whileHover={{ x: -5 }}
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Dashboard
                    </motion.button>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                            <FaChartLine className="mr-3 text-indigo-600" />
                            Order Prediction System
                        </h1>
                        <p className="text-lg text-gray-600">Predict order quantities based on time slot and day</p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Form Section */}
                        <motion.form
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            onSubmit={handlePredict}
                            className="bg-white p-8 rounded-2xl shadow-xl"
                        >
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FaClock className="inline mr-2" />
                                    Select Time Slot
                                </label>
                                <select
                                    value={timeslot}
                                    onChange={(e) => setTimeslot(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Choose a time slot</option>
                                    {timeslots.map((slot) => (
                                        <option key={slot} value={slot}>{slot}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <FaCalendarAlt className="inline mr-2" />
                                    Select Day
                                </label>
                                <select
                                    value={day}
                                    onChange={(e) => setDay(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Choose a day</option>
                                    {days.map((d) => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-4 rounded-lg text-white font-medium text-lg shadow-lg 
                                    ${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'}
                                    transition-all duration-300`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                                        Predicting...
                                    </div>
                                ) : (
                                    'Get Predictions'
                                )}
                            </motion.button>
                        </motion.form>

                        {/* Results Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="bg-white p-8 rounded-2xl shadow-xl"
                        >
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Predicted Orders</h2>

                            {error && (
                                <div className="p-4 bg-red-50 rounded-lg text-red-600 mb-6">
                                    <p>{error}</p>
                                </div>
                            )}

                            {predictions ? (
                                <div className="space-y-4">
                                    {predictions.length > 0 ? predictions.map((prediction, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl shadow-sm"
                                        >
                                            <div className="flex flex-col">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h3 className="text-lg font-medium text-gray-900">
                                                        {prediction.item}
                                                    </h3>
                                                    <span className="text-xl font-semibold text-indigo-600">
                                                        {prediction.predictedQuantity}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-sm text-gray-600">
                                                    <span>{prediction.category}</span>
                                                    <span>₹{prediction.price}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )) : (
                                        <div className="text-center py-4">
                                            <p className="text-gray-500">No predictions available for the selected criteria</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <FaChartLine className="mx-auto text-4xl text-gray-300 mb-4" />
                                    <p className="text-gray-500">Select a time slot and day to see order predictions</p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
            <MenuFooter />
        </>
    );
};

export default PredictOrderPage; 