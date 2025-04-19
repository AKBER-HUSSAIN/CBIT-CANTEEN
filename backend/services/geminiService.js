const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const getGeminiRecommendations = async (orderItems) => {
    const prompt = `
You are a food recommendation engine.
The user frequently orders: ${orderItems.join(", ")}.
Suggest 5 unique food items they might enjoy.
Use bullet points, and don't include any descriptions.
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


const generatePersonalizedMealRecommendation = async (preferences) => {
    const { mealType, spicyLevel, calories, minBudget, maxBudget } = preferences;

    const prompt = `
You are a food recommendation engine.
The user prefers the following:
- Meal Type: ${mealType} (Veg/Non-Veg)
- Spicy Level: ${spicyLevel} (Spicy/Mild)
- Calorie Preferences: ${calories} (Low/Medium/High)
- Budget Range: ₹${minBudget} - ₹${maxBudget}

Suggest 5 unique food items based on these preferences. Use bullet points, and don't include any descriptions.
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
