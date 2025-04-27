import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUtensils, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PersonalizedMealGenerator = () => {
    const [mealType, setMealType] = useState("");
    const [spicyLevel, setSpicyLevel] = useState("");
    const [calories, setCalories] = useState("");
    const [minBudget, setMinBudget] = useState("");
    const [maxBudget, setMaxBudget] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:3000/api/ai/personalized",
                {
                    mealType,
                    spicyLevel,
                    calories,
                    minBudget,
                    maxBudget,
                },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            setRecommendations(response.data.recommendations);
            setError(null);
        } catch (err) {
            setError("Failed to generate recommendations. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <motion.button
                    onClick={() => navigate("/menu")}
                    className="mb-8 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    whileHover={{ x: -5 }}
                >
                    <FaArrowLeft className="mr-2" />
                    Back to Menu
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                        <FaUtensils className="mr-3 text-blue-600" />
                        Personalized Meal Generator
                    </h1>
                    <p className="text-lg text-gray-600">Tell us your preferences, and we'll recommend the perfect meal for you!</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form Section */}
                    <motion.form
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        onSubmit={handleSubmit}
                        className="bg-white p-8 rounded-2xl shadow-xl"
                    >
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Meal Type</label>
                                <select
                                    value={mealType}
                                    onChange={(e) => setMealType(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Select Meal Type</option>
                                    <option value="Veg">Vegetarian</option>
                                    <option value="Non-Veg">Non-Vegetarian</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Spicy Level</label>
                                <select
                                    value={spicyLevel}
                                    onChange={(e) => setSpicyLevel(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Select Spicy Level</option>
                                    <option value="Mild">Mild</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hot">Hot</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Calories</label>
                                <input
                                    type="number"
                                    value={calories}
                                    onChange={(e) => setCalories(e.target.value)}
                                    placeholder="Enter calories"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Min Budget (₹)</label>
                                    <input
                                        type="number"
                                        value={minBudget}
                                        onChange={(e) => setMinBudget(e.target.value)}
                                        placeholder="Min"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Budget (₹)</label>
                                    <input
                                        type="number"
                                        value={maxBudget}
                                        onChange={(e) => setMaxBudget(e.target.value)}
                                        placeholder="Max"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            disabled={loading}
                            className={`w-full mt-8 py-4 rounded-lg text-white font-medium text-lg shadow-lg 
                                ${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'}
                                transition-all duration-300`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                                    Generating...
                                </div>
                            ) : (
                                'Get Recommendations'
                            )}
                        </motion.button>
                    </motion.form>

                    {/* Recommendations Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-white p-8 rounded-2xl shadow-xl"
                    >
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recommended Meals</h2>

                        {error && (
                            <div className="p-4 bg-red-50 rounded-lg text-red-600 mb-6">
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="space-y-4">
                            {recommendations.length > 0 ? (
                                recommendations.slice(1).map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <h3 className="text-xl font-medium text-gray-900 mb-3">{item}</h3>
                                        <motion.button
                                            onClick={() => navigate(`/menu`)}
                                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Order Now
                                        </motion.button>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <FaUtensils className="mx-auto text-4xl text-gray-300 mb-4" />
                                    <p className="text-gray-500">No recommendations yet. Fill out the form to get personalized suggestions!</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default PersonalizedMealGenerator;
