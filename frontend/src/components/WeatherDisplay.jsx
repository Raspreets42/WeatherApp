import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import HourlyChart from './HourlyChart';

const WeatherDisplay = ({ currentWeather, forecast }) => {
    const { theme } = useTheme();
    const [selectedDay, setSelectedDay] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const getWeatherIcon = (code) => {
        const iconMap = {
            0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
            45: '🌫️', 48: '🌫️',
            51: '🌦️', 53: '🌦️', 55: '🌧️',
            61: '🌧️', 63: '🌧️', 65: '⛈️',
            71: '🌨️', 73: '❄️', 75: '❄️',
            80: '🌦️', 81: '🌧️', 82: '⛈️',
            95: '⛈️', 96: '⛈️', 99: '⛈️'
        };
        return iconMap[code] || '🌤️';
    };

    const getWeatherDescription = (code) => {
        const weatherCodes = {
            0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
            45: 'Foggy', 48: 'Depositing rime fog',
            51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
            61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
            71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow',
            80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
            95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail'
        };
        return weatherCodes[code] || 'Unknown';
    };

    const mainContainerStyle = {
        padding: '20px',
        background: theme === 'dark'
            ? 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    };

    const currentWeatherStyle = {
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(15px)',
        borderRadius: '20px',
        padding: '40px',
        margin: '20px 0',
        color: 'white',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
    };

    const mainWeatherInfoStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '20px',
    };

    const temperatureStyle = {
        fontSize: '3rem',
        fontWeight: 'bold',
        margin: '0',
        background: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: '1',
    };

    const descriptionStyle = {
        fontSize: '1rem',
        margin: '10px 0 0 0',
        opacity: '0.9',
        fontWeight: '500',
    };

    const lastUpdateStyle = {
        fontSize: '0.8rem',
        margin: '8px 0 0 0',
        opacity: '0.9',
        fontWeight: '400',
    };

    const weatherIconStyle = {
        fontSize: '4rem',
        marginRight: '25px',
        animation: 'float 3s ease-in-out infinite',
    };

    const weatherInfoGrid = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginTop: '20px',
    };

    const infoCardStyle = {
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '25px',
        borderRadius: '15px',
        textAlign: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        border: '1px solid rgba(255, 255, 255, 0.1)',
    };

    const forecastContainerStyle = {
        margin: '40px 0',
    };

    const forecastTitleStyle = {
        color: 'white',
        fontSize: '2.5rem',
        marginBottom: '30px',
        textAlign: 'center',
        fontWeight: '600',
    };

    const forecastGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '25px',
        marginTop: '20px',
    };

    const forecastCardStyle = {
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(15px)',
        borderRadius: '20px',
        padding: '30px',
        color: 'white',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
    };

    const dateStyle = {
        fontSize: '1.3rem',
        fontWeight: 'bold',
        marginBottom: '10px',
        textAlign: 'center',
    };

    const forecastIconStyle = {
        fontSize: '4rem',
        margin: '15px 0',
        display: 'block',
        textAlign: 'center',
    };

    const tempRangeStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
    };

    const highTempStyle = {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#ff6b6b',
    };

    const lowTempStyle = {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#4dabf7',
    };

    const weatherDetailsStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px',
        marginBottom: '20px',
    };

    const detailItemStyle = {
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.9rem',
        opacity: '0.9',
    };

    const conditionStyle = {
        fontSize: '1rem',
        opacity: '0.9',
        marginBottom: '20px',
        textAlign: 'center',
    };

    const viewMoreButtonStyle = {
        background: 'linear-gradient(45deg, #ff6b6b, #ffa500)',
        border: 'none',
        color: 'white',
        padding: '12px 25px',
        borderRadius: '25px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
        width: '100%',
        boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
    };

    const modalStyle = {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
        backdropFilter: 'blur(5px)',
    };

    const modalContentStyle = {
        background: theme === 'dark'
            ? 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)'
            : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        borderRadius: '20px',
        padding: '0',
        maxWidth: '95%',
        width: '90%',
        maxHeight: '95%',
        overflow: 'hidden',
        position: 'relative',
        color: 'white',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    };

    const modalHeaderStyle = {
        padding: '30px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
    };

    const closeButtonStyle = {
        position: 'absolute',
        top: '20px',
        right: '25px',
        background: 'rgba(255, 255, 255, 0.2)',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: 'white',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
    };

    const emptyStateStyle = {
        textAlign: 'center',
        padding: '60px 20px',
        color: 'white',
    };

    const emptyIconStyle = {
        fontSize: '4rem',
        marginBottom: '20px',
        display: 'block',
    };

    const emptyTextStyle = {
        fontSize: '1.5rem',
        margin: '0',
        opacity: '0.9',
    };

    const openModal = (dayIndex) => {
        setSelectedDay(dayIndex);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedDay(null);
    };

    if (!currentWeather && !forecast) {
        return (
            <div style={mainContainerStyle}>
                <div style={currentWeatherStyle}>
                    <div style={emptyStateStyle}>
                        <span style={emptyIconStyle}>🌍</span>
                        <h2 style={emptyTextStyle}>
                            Click on the map or enter coordinates to get weather information
                        </h2>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={mainContainerStyle}>
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

            {currentWeather && (
                <div style={currentWeatherStyle}>
                    <div style={mainWeatherInfoStyle}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={weatherIconStyle}>
                                {getWeatherIcon(currentWeather.current_weather.weathercode)}
                            </div>
                            <div>
                                <h1 style={temperatureStyle}>
                                    {Math.round(currentWeather.current_weather.temperature)}°C
                                </h1>
                                <p style={descriptionStyle}>
                                    {getWeatherDescription(currentWeather.current_weather.weathercode)}
                                </p>
                                <p style={lastUpdateStyle}>
                                    Last Updated: {new Date(currentWeather.current_weather.time).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                })}, {new Date(currentWeather.current_weather.time).toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div style={weatherInfoGrid}>
                        <div
                            style={infoCardStyle}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>💧</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                                {currentWeather.current_weather.relative_humidity_2m}
                                {currentWeather.hourly_units.relative_humidity_2m}
                            </div>
                            <div style={{ opacity: '0.8', fontSize: '1rem' }}>Humidity</div>
                        </div>

                        <div
                            style={infoCardStyle}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>💨</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                                {currentWeather.current_weather.windspeed}
                                {currentWeather.hourly_units.wind_speed_10m}
                            </div>
                            <div style={{ opacity: '0.8', fontSize: '1rem' }}>Wind Speed</div>
                        </div>

                        <div
                            style={infoCardStyle}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🧭</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                                {currentWeather.current_weather.winddirection}
                                {currentWeather.hourly_units.wind_direction_10m}
                            </div>
                            <div style={{ opacity: '0.8', fontSize: '1rem' }}>Wind Direction</div>
                        </div>

                        <div
                            style={infoCardStyle}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>⛈</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                                {currentWeather.current_weather.rain}
                                {currentWeather.hourly_units.rain}
                            </div>
                            <div style={{ opacity: '0.8', fontSize: '1rem' }}>Rainfall</div>
                        </div>

                        <div
                            style={infoCardStyle}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>⛈</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                                {currentWeather.current_weather.precipitation}
                                {currentWeather.hourly_units.precipitation}
                            </div>
                            <div style={{ opacity: '0.8', fontSize: '1rem' }}>Precipitation</div>
                        </div>

                        <div
                            style={infoCardStyle}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>⛈</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                                {currentWeather.current_weather.cloud_cover}
                                {currentWeather.hourly_units.cloud_cover}
                            </div>
                            <div style={{ opacity: '0.8', fontSize: '1rem' }}>Cloud Cover</div>
                        </div>
                    </div>
                </div>
            )}

            {forecast && (
                <div style={forecastContainerStyle}>
                    <h2 style={forecastTitleStyle}>7-Day Forecast</h2>
                    <div style={forecastGridStyle}>
                        {forecast.daily.time.map((date, index) => (
                            <div
                                key={index}
                                style={forecastCardStyle}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                                }}
                            >
                                <div style={dateStyle}>
                                    {new Date(date).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </div>

                                <div style={forecastIconStyle}>
                                    {getWeatherIcon(forecast.daily.weather_code[index])}
                                </div>

                                <div style={tempRangeStyle}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={highTempStyle}>
                                            {Math.round(forecast.daily.temperature_2m_max[index])}°
                                        </div>
                                        <div style={{ fontSize: '0.9rem', opacity: '0.8' }}>High</div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={lowTempStyle}>
                                            {Math.round(forecast.daily.temperature_2m_min[index])}°
                                        </div>
                                        <div style={{ fontSize: '0.9rem', opacity: '0.8' }}>Low</div>
                                    </div>
                                </div>

                                <div style={weatherDetailsStyle}>
                                    <div style={detailItemStyle}>
                                        <span style={{ marginRight: '8px', fontSize: '1.2rem' }}>🌧️</span>
                                        <span>{forecast.daily.precipitation_sum[index]}mm</span>
                                    </div>
                                    <div style={detailItemStyle}>
                                        <span style={{ marginRight: '8px', fontSize: '1.2rem' }}>💨</span>
                                        <span>{Math.round(forecast.daily.windspeed_10m_max[index])} km/h</span>
                                    </div>
                                </div>

                                <div style={conditionStyle}>
                                    {getWeatherDescription(forecast.daily.weather_code[index])}
                                </div>

                                <button
                                    style={viewMoreButtonStyle}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'scale(1.05)';
                                        e.target.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'scale(1)';
                                        e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openModal(index);
                                    }}
                                >
                                    📊 View Hourly Data
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {showModal && selectedDay !== null && (
                <div style={modalStyle} onClick={closeModal}>
                    <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                        <div style={modalHeaderStyle}>
                            <button
                                style={closeButtonStyle}
                                onClick={closeModal}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                                    e.target.style.transform = 'scale(1.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                                    e.target.style.transform = 'scale(1)';
                                }}
                            >
                                ×
                            </button>
                            <h2 style={{ margin: '0', fontSize: '1.8rem' }}>
                                📅 {new Date(forecast.daily.time[selectedDay]).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                            </h2>
                        </div>
                        <HourlyChart
                            hourlyData={currentWeather.hourly}
                            hourlyUnits={currentWeather.hourly_units}
                            selectedDate={forecast.daily.time[selectedDay]}
                            theme={theme}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherDisplay;