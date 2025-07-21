import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const weatherAPI = {
    getCurrentWeather: async (lat, lon) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/weather/current/${lat}/${lon}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch current weather');
        }
    },

    getForecast: async (lat, lon) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/weather/forecast/${lat}/${lon}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch forecast');
        }
    },

    saveWeatherData: async (data) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/weather/save`, data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to save weather data');
        }
    },

    getWeatherHistory: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/weather/history`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch weather history');
        }
    }
};
