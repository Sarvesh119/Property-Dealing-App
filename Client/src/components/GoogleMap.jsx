import React, { useEffect } from 'react';
import L from 'leaflet';

const GoogleMap = ({ lat, lng }) => {
  useEffect(() => {
    const map = L.map('map').setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([lat, lng]).addTo(map);
  }, [lat, lng]);

  return <div id="map" style={{ height: '300px', borderRadius: '10px' }} />;
};

export default GoogleMap;
