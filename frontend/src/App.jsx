import React, { useState } from 'react';
import Map from './components/Map';
import WeatherDisplay from './components/WeatherDisplay';
import CoordinateInput from './components/CoordinateInput';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { weatherAPI } from './services/api';

const AppContent = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  const handleLocationSelect = async (lat, lon) => {
    setLoading(true);
    setError(null);

    try {
      const [currentData, forecastData] = await Promise.all([
        weatherAPI.getCurrentWeather(lat, lon),
        weatherAPI.getForecast(lat, lon)
      ]);

      setCurrentWeather(currentData);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const appStyle = {
    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f0f2f5',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const mapSectionStyle = {
    padding: '40px 20px',
    background: theme === 'dark'
        ? 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)'
        : 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
    color: 'white',
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
  };

  const mapContainerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  };

  const loadingStyle = {
    textAlign: 'center',
    padding: '60px 20px',
    fontSize: '1.2rem',
    color: 'white',
    background: theme === 'dark'
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    margin: '20px',
    borderRadius: '20px',
  };

  const loadingIconStyle = {
    fontSize: '4rem',
    marginBottom: '20px',
    display: 'block',
    animation: 'pulse 2s infinite',
  };

  const errorStyle = {
    textAlign: 'center',
    padding: '40px 20px',
    color: 'white',
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
    borderRadius: '20px',
    margin: '20px',
    boxShadow: '0 8px 32px rgba(255, 107, 107, 0.3)',
  };

  const errorIconStyle = {
    fontSize: '3rem',
    marginBottom: '15px',
    display: 'block',
  };

  return (
      <div style={appStyle}>
        <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>

        <ThemeToggle />

        <div style={mapSectionStyle}>
          <div style={mapContainerStyle}>
            <Map onLocationSelect={handleLocationSelect} theme={theme} />
            <CoordinateInput onLocationSelect={handleLocationSelect} />
          </div>
        </div>

        {loading && (
            <div style={loadingStyle}>
              <span style={loadingIconStyle}>🌤️</span>
              <div style={{ fontSize: '1.4rem', fontWeight: '600' }}>
                Loading weather data...
              </div>
              <div style={{ fontSize: '1rem', opacity: '0.8', marginTop: '10px' }}>
                Please wait while we fetch the latest weather information
              </div>
            </div>
        )}

        {error && (
            <div style={errorStyle}>
              <span style={errorIconStyle}>⚠️</span>
              <div style={{ fontSize: '1.3rem', fontWeight: '600' }}>
                Weather data could not be loaded
              </div>
              <div style={{ fontSize: '1rem', opacity: '0.9', marginTop: '10px' }}>
                {error}
              </div>
            </div>
        )}

        <WeatherDisplay
            currentWeather={currentWeather}
            forecast={forecast}
        />
      </div>
  );
};

const App = () => {
  return (
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
  );
};

export default App;