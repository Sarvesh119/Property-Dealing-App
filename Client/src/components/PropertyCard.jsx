import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => (
  <div className="property-card">
    <img src={property.image ?? "https://img.freepik.com/free-photo/3d-rendering-beautiful-comtemporary-luxury-bedroom-suite-hotel-with-tv_105762-2058.jpg?semt=ais_hybrid&w=740&q=80"} alt={property.title} />
    <div className="property-info">
      <h3>{property.title}</h3>
      <p>{property.location}</p>
      <p>₹{property.price}/night</p>
      <Link to={`/property/${property._id}`} className="btn">View Details</Link>
    </div>
  </div>
);

export default PropertyCard;
