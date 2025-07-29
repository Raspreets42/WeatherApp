const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const OPEN_METEO_URL = process.env.OPEN_METEO_URL || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const formatHourlyWeatherData = (hourlyData) => {
    const timeList = hourlyData.time || [];
    const weatherData = [];

    for (let i = 0; i < timeList.length; i++) {
        try {
            const dt = new Date(timeList[i]);
            const formattedTime = dt.toLocaleString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).replace(/(\d+)\/(\d+)\/(\d+),?/, '$2-$1-$3 ');

            const weatherObj = {
                cloud_cover: hourlyData.cloud_cover?.[i] ?? null,
                precipitation: hourlyData.precipitation?.[i] ?? null,
                rain: hourlyData.rain?.[i] ?? null,
                relative_humidity_2m: hourlyData.relative_humidity_2m?.[i] ?? null,
                temperature_2m: hourlyData.temperature_2m?.[i] ?? null,
                wind_speed_10m: hourlyData.wind_speed_10m?.[i] ?? null,
                evapotranspiration: hourlyData.evapotranspiration?.[i] ?? null,
                time: formattedTime.trim(),
                timestamp: dt.toISOString()
            };

            weatherData.push(weatherObj);
        } catch (error) {
            console.error(`Error processing time index ${i}:`, error);
        }
    }

    return weatherData;
};

const formatWeatherData = (data) => {
    hourlyWeatherData = formatHourlyWeatherData(data.hourly)
    currentData = data.current_weather
    const ind = findCurrentWeatherDataIndex(data.hourly.time, data.current_weather.time)
    const obj = {
        time: currentData.time,
        interval: currentData.interval,
        temperature: currentData.temperature,
        windspeed: currentData.windspeed,
        winddirection: currentData.winddirection,
        is_day: currentData.is_day,
        weathercode: currentData.weathercode,
        cloud_cover: hourlyWeatherData[ind].cloud_cover,
        evapotranspiration: hourlyWeatherData[ind].evapotranspiration,
        relative_humidity_2m: hourlyWeatherData[ind].relative_humidity_2m,
        rain: hourlyWeatherData[ind].rain,
        precipitation: hourlyWeatherData[ind].precipitation
    }
    data.current_weather = obj
    return data;
}

function findCurrentWeatherDataIndex(weatherData, currentTimeISO) {
    const index = weatherData.findIndex(entry => entry.slice(0, 13) == currentTimeISO.slice(0, 13))
    return index
}

// Open-Meteo API functions
const fetchCurrentWeather = async (lat, lon) => {
    try {
        hourly = "temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code,cloud_cover,rain,precipitation,evapotranspiration"
        const response = await axios.get(
            `${OPEN_METEO_URL}forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=${hourly}&timezone=IST`
        );
        const transformedResponse = formatWeatherData(response.data)
        return transformedResponse;
    } catch (error) {
        throw new Error('Failed to fetch current weather');
    }
};

const fetchForecast = async (lat, lon) => {
    try {
        daily = "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,windspeed_10m_max"
        const response = await axios.get(
            `${OPEN_METEO_URL}forecast?latitude=${lat}&longitude=${lon}&daily=${daily}&timezone=auto&forecast_days=7`
        );
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch forecast');
    }
};

// Routes
app.get('/api', async (req, res) => {
    res.status(200).json({ message: "Server running on port 5000", status: 200 });
});

app.get('/api/weather/current/:lat/:lon', async (req, res) => {
    try {
        const { lat, lon } = req.params;
        const weatherData = await fetchCurrentWeather(lat, lon);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/weather/forecast/:lat/:lon', async (req, res) => {
    try {
        const { lat, lon } = req.params;
        const forecastData = await fetchForecast(lat, lon);
        res.json(forecastData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});