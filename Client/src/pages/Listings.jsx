import React, { useEffect, useState } from 'react';
import api from '../services/api';
import PropertyCard from '../components/PropertyCard';

const Listings = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    api.get('/properties/').then(res => setProperties(res.data));
  }, []);

  return (
    <div className="listings-page">
      <h2>Available Properties</h2>
      <div className="property-grid">
        {properties.length > 0 ? (
          properties.map(p => <PropertyCard key={p._id} property={p} />)
        ) : (
          <p>No properties listed yet.</p>
        )}
      </div>
    </div>
  );
};

export default Listings;
