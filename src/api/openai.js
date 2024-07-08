import { toast } from "sonner";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

export const fetchRecommendations = async (prompt) => {
  if (!API_KEY) {
    console.error('OpenAI API key is not set');
    toast.error('Recommendations are currently unavailable. Please try again later.');
    return null;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recommendations');
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    toast.error('Failed to fetch recommendations. Please try again.');
    return null;
  }
};