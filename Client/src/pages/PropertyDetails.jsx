import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import BookingModal from '../components/BookingModal';
import GoogleMap from '../components/GoogleMap';
import ReviewList from '../components/ReviewList'; 

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    api.get(`/properties/${id}`).then(res => setProperty(res.data));
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <div className="details-page">
      <img src={property.image} alt={property.title} className="details-img" />
      <div className="details-info">
        <h2>{property.title}</h2>
        <p>{property.description}</p>
        <p><strong>₹{property.price}</strong> / night</p>
        <p>Location: {property.location}</p>

        <button className="btn" onClick={() => setShowBooking(true)}>
          Book Now
        </button>

        {/* <h4>Map Location</h4>
        {property.coords && <GoogleMap lat={property.coords.lat} lng={property.coords.lng} />} */}

        <ReviewList />
      </div>

      {showBooking && (
        <BookingModal propertyId={property._id} onClose={() => setShowBooking(false)} />
      )}
    </div>
  );
};

export default PropertyDetails;
