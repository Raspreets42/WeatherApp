import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Utility to fix invalid longitudes like 439.07
const normalizeLng = (lng) => {
    return ((lng + 180) % 360 + 360) % 360 - 180;
};

const LocationMarker = ({ onLocationSelect }) => {
    const [position, setPosition] = useState(null);

    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            const validLng = normalizeLng(lng);
            setPosition([lat, validLng]);
            onLocationSelect(lat, validLng);
        },
    });

    return position === null ? null : (
        <Marker position={position} />
    );
};

const Map = ({ onLocationSelect, theme }) => {
    const mapStyle = {
        height: '400px',
        width: '100%',
        borderRadius: '8px',
        border: theme === 'dark' ? '1px solid #555' : '1px solid #ddd'
    };

    return (
        <div style={mapStyle}>
            <MapContainer
                center={[21.1466, 79.0888]}  // Nagpur
                zoom={12}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker onLocationSelect={onLocationSelect} />
            </MapContainer>
        </div>
    );
};

export default Map;
