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

module.exports = { getGeminiRecommendations };
