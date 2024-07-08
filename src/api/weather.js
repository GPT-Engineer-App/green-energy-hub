import { toast } from "sonner";

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherData = async (city) => {
  if (!API_KEY) {
    console.error('OpenWeatherMap API key is not set');
    toast.error('Weather data is currently unavailable. Please try again later.');
    return null;
  }

  try {
    const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
    
    if (!response.ok) {
      throw new Error('Weather data not found');
    }

    const data = await response.json();
    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      city: data.name,
      country: data.sys.country,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    toast.error('Failed to fetch weather data. Please try again.');
    return null;
  }
};