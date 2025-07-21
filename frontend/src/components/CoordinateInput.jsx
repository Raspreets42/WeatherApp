import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const CoordinateInput = ({ onLocationSelect }) => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const { theme } = useTheme();

    const handleSubmit = (e) => {
        e.preventDefault();
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);

        if (isNaN(lat) || isNaN(lon)) {
            alert('Please enter valid coordinates');
            return;
        }

        if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
            alert('Please enter valid coordinate ranges (lat: -90 to 90, lon: -180 to 180)');
            return;
        }

        onLocationSelect(lat, lon);
    };

    const containerStyle = {
        marginTop: '30px',
        padding: '25px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
    };

    const titleStyle = {
        color: 'white',
        fontSize: '1.2rem',
        marginBottom: '20px',
        textAlign: 'center',
        fontWeight: '600',
    };

    const formStyle = {
        display: 'flex',
        gap: '15px',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
    };

    const inputStyle = {
        padding: '12px 15px',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        fontSize: '16px',
        minWidth: '150px',
        backdropFilter: 'blur(5px)',
        transition: 'all 0.3s ease',
    };

    const buttonStyle = {
        padding: '12px 25px',
        borderRadius: '10px',
        border: 'none',
        background: 'linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%)',
        color: 'white',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
    };

    return (
        <div style={containerStyle}>
            <h3 style={titleStyle}>🌍 Enter Coordinates Manually</h3>
            <form onSubmit={handleSubmit} style={formStyle}>
                <input
                    type="number"
                    step="any"
                    placeholder="Latitude (e.g., 21.162)"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                    }}
                    onBlur={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    }}
                />
                <input
                    type="number"
                    step="any"
                    placeholder="Longitude (e.g., 79.1228)"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                    }}
                    onBlur={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    }}
                />
                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
                    }}
                >
                    🔍 Get Weather
                </button>
            </form>
        </div>
    );
};

export default CoordinateInput;