import React from 'react';

const HourlyChart = ({ hourlyData, hourlyUnits, selectedDate, theme }) => {
    // Filter hourly data for the selected date
    const selectedDateStr = selectedDate.split('T')[0];
    const filteredData = hourlyData.time
        .map((time, index) => ({
            time: time,
            temperature: hourlyData.temperature_2m[index] + hourlyUnits.temperature_2m,
            humidity: hourlyData.relative_humidity_2m[index] + hourlyUnits.relative_humidity_2m,
            windspeed: (hourlyData.wind_speed_10m[index]).toFixed(2) + ' ' + hourlyUnits.wind_speed_10m,
            precipitation: (hourlyData.precipitation[index]).toFixed(2) + ' ' + hourlyUnits.precipitation,
            rain: (hourlyData.rain[index] || 0).toFixed(2) + ' ' + hourlyUnits.rain,
            cloudCover: hourlyData.cloud_cover[index] + ' ' + hourlyUnits.cloud_cover,
            weathercode: hourlyData.weather_code[index]
        }))
        .filter(item => item.time.startsWith(selectedDateStr));

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

    const containerStyle = {
        maxHeight: '80vh',
        overflowY: 'auto',
        padding: '20px',
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '30px',
        padding: '20px',
        background: theme === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(255, 255, 255, 0.2)',
        borderRadius: '15px',
        backdropFilter: 'blur(10px)',
    };

    const headerTextStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'white',
        margin: '0 0 10px 0',
    };

    const subHeaderStyle = {
        fontSize: '1rem',
        color: 'rgba(255, 255, 255, 0.8)',
        margin: '0',
    };

    // Responsive grid - 6, 4, 3, 1 cards per row
    const hourlyGridStyle = {
        display: 'grid',
        gap: '20px',
        marginTop: '20px',
        // Mobile first approach
        gridTemplateColumns: '1fr',

        // Media queries simulation through JavaScript
        '@media (min-width: 640px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
        },
        '@media (min-width: 1024px)': {
            gridTemplateColumns: 'repeat(4, 1fr)',
        },
        '@media (min-width: 1400px)': {
            gridTemplateColumns: 'repeat(6, 1fr)',
        }
    };

    const hourlyCardStyle = {
        background: theme === 'dark'
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white',
        padding: '20px',
        borderRadius: '15px',
        textAlign: 'center',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        overflow: 'hidden',
    };

    const timeStyle = {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        opacity: '0.9',
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '8px 12px',
        borderRadius: '20px',
        display: 'inline-block',
    };

    const iconStyle = {
        fontSize: '3rem',
        margin: '5px 0',
        display: 'block',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
    };

    const tempStyle = {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        marginBottom: '15px',
        background: 'linear-gradient(45deg, #fff, #f0f0f0)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    };

    const detailsContainerStyle = {
        display: 'grid',
        gap: '8px',
        fontSize: '0.85rem',
        opacity: '0.9',
        lineHeight: '1.4',
    };

    const detailRowStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '6px 10px',
        borderRadius: '8px',
        backdropFilter: 'blur(5px)',
    };

    const detailRowStyleWeatherStatus = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '6px 10px',
        borderRadius: '8px',
        backdropFilter: 'blur(5px)',
    };

    const detailLabelStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontWeight: '400',
        fontSize: '0.7rem',
    };

    const detailValueStyle = {
        fontWeight: '400',
        fontSize: '0.7rem',
    };

    // CSS for responsive grid (since we can't use CSS modules in this context)
    const responsiveGridCSS = `
        @media (min-width: 640px) {
            .hourly-grid {
                grid-template-columns: repeat(3, 1fr) !important;
            }
        }
        @media (min-width: 1024px) {
            .hourly-grid {
                grid-template-columns: repeat(4, 1fr) !important;
            }
        }
        @media (min-width: 1400px) {
            .hourly-grid {
                grid-template-columns: repeat(6, 1fr) !important;
            }
        }
    `;

    return (
        <div style={containerStyle}>
            <style>{responsiveGridCSS}</style>

            <div style={headerStyle}>
                <h3 style={headerTextStyle}>📊 Hourly Weather Details</h3>
                <p style={subHeaderStyle}>
                    {filteredData.length} hours of detailed weather data
                </p>
            </div>

            <div
                className="hourly-grid"
                style={{
                    display: 'grid',
                    gap: '20px',
                    marginBottom: '15px',
                    gridTemplateColumns: '1fr', // Default for mobile
                }}
            >
                {filteredData.map((item, index) => (
                    <div
                        key={index}
                        style={hourlyCardStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                        }}
                    >
                        <div style={timeStyle}>
                            {new Date(item.time).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>

                        <div style={iconStyle}>
                            {getWeatherIcon(item.weathercode)}
                        </div>

                        <div style={tempStyle}>
                            {item.temperature}
                        </div>

                        <div style={detailsContainerStyle}>
                            <div style={detailRowStyle}>
                                <span style={detailLabelStyle}>
                                    <span>💧</span>
                                    <span>Humidity</span>
                                </span>
                                <span style={detailValueStyle}>{item.humidity}</span>
                            </div>

                            <div style={detailRowStyle}>
                                <span style={detailLabelStyle}>
                                    <span>💨</span>
                                    <span>Wind</span>
                                </span>
                                <span style={detailValueStyle}>{item.windspeed}</span>
                            </div>

                            <div style={detailRowStyle}>
                                <span style={detailLabelStyle}>
                                    <span>🌧️</span>
                                    <span>Precipitation</span>
                                </span>
                                <span style={detailValueStyle}>{item.precipitation}</span>
                            </div>

                            <div style={detailRowStyle}>
                                <span style={detailLabelStyle}>
                                    <span>☔</span>
                                    <span>Rain</span>
                                </span>
                                <span style={detailValueStyle}>{item.rain}</span>
                            </div>

                            <div style={detailRowStyle}>
                                <span style={detailLabelStyle}>
                                    <span>☁️</span>
                                    <span>Cloud Cover</span>
                                </span>
                                <span style={detailValueStyle}>{item.cloudCover}</span>
                            </div>

                            <div style={detailRowStyleWeatherStatus}>
                                <span>{getWeatherIcon(item.weathercode)} </span>
                                <span> {getWeatherDescription(item.weathercode)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HourlyChart;
