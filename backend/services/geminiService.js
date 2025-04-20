const axios = require('axios');
const Menu = require("../models/FoodModel"); // Import Mongoose model

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// ✅ FETCH MENU ITEMS
const fetchAvailableMenuItems = async () => {
    const menuItems = await Menu.find({});
    return menuItems.map(item => item.name);
};

// ✅ AI RECOMMENDATIONS BASED ON USER'S ORDER HISTORY
const getGeminiRecommendations = async (orderItems) => {
    try {
        const availableItems = await fetchAvailableMenuItems();

        const prompt = `
You are a food recommendation engine for a college canteen.
The user frequently orders: ${orderItems.join(", ")}.

Based on their preferences, suggest 5 unique food items they might enjoy.

IMPORTANT: Only suggest items from the following available menu:
${availableItems.join(", ")}

Respond in bullet points. No descriptions.
`;

        const response = await axios.post(
            GEMINI_ENDPOINT,
            {
                contents: [
                    {
                        role: "user",
                        parts: [{ text: prompt }],
                    },
                ],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const rawText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

        const recommendations = rawText
            .split("\n")
            .map(line => line.replace(/^[-*]\s*/, "").trim())
            .filter(item => item.length > 0);

        return recommendations;
    } catch (error) {
        console.error("Gemini AI Error:", error?.response?.data || error.message);
        return [];
    }
};






const predictChefOrders = async (pastOrders, timeSlot, day) => {
    const prompt = `
You are a helpful canteen assistant.

Based on these past food orders:
${JSON.stringify(pastOrders, null, 2)}

Predict the food items most likely to be ordered on "${day}" during "${timeSlot}".

Respond strictly in valid JSON format without any additional text, comments, or formatting:
[
  { "item": "Dosa", "predictedQuantity": 15 },
  { "item": "Idli", "predictedQuantity": 10 }
]
`;

    try {
        const response = await axios.post(
            GEMINI_ENDPOINT,
            {
                contents: [
                    {
                        role: "user",
                        parts: [{ text: prompt }],
                    },
                ],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const rawText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

        // Sanitize the response to ensure valid JSON
        const sanitizedText = rawText.trim().replace(/```json|```/g, "");

        return JSON.parse(sanitizedText);
    } catch (error) {
        console.error("Gemini AI Error:", error?.response?.data || error.message);
        return [];
    }
};


// ✅ PERSONALIZED MEAL GENERATOR (BASED ON USER PREFERENCES)
const generatePersonalizedMealRecommendation = async (preferences) => {
    const { mealType, spicyLevel, calories, minBudget, maxBudget } = preferences;

    try {
        const availableItems = await fetchAvailableMenuItems();

        const prompt = `
You are a food recommendation engine for a college canteen.

User preferences:
- Meal Type: ${mealType} (Veg/Non-Veg)
- Spicy Level: ${spicyLevel}
- Calories: ${calories}
- Budget: ₹${minBudget} - ₹${maxBudget}

IMPORTANT: Only suggest items from the available menu below:
${availableItems.join(", ")}

Suggest 5 food items that best match these preferences.
Use bullet points only. No descriptions.
`;

        const response = await axios.post(
            GEMINI_ENDPOINT,
            {
                contents: [
                    {
                        role: "user",
                        parts: [{ text: prompt }],
                    },
                ],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const rawText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

        const recommendations = rawText
            .split("\n")
            .map(line => line.replace(/^[-*]\s*/, "").trim())
            .filter(item => item.length > 0);

        return recommendations;
    } catch (error) {
        console.error("Gemini AI Error:", error?.response?.data || error.message);
        return [];
    }
};

module.exports = { getGeminiRecommendations, predictChefOrders, generatePersonalizedMealRecommendation };
