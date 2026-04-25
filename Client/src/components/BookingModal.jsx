import React, { useState } from 'react';
import api from '../services/api';

const BookingModal = ({ propertyId, onClose }) => {
  const [form, setForm] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/properties/${propertyId}/book`, {
        ...form,
        guests: Number(form.guests),
      });
      console.log("Hello")
      alert('Booking confirmed!');
      onClose();
    } catch (err) {
      console.error(err);
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div className="modal">
      <form className="modal-content" onSubmit={handleSubmit}>
        <h3>Book Property</h3>
        <input
          type="date"
          value={form.checkIn}
          onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
          required
        />
        <input
          type="date"
          value={form.checkOut}
          onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
          required
        />
        <input
          type="number"
          min="1"
          value={form.guests}
          onChange={(e) => setForm({ ...form, guests: e.target.value })}
        />
        <button type="submit" className="btn">Confirm</button>
        <button type="button" onClick={onClose} className="btn cancel">Cancel</button>
      </form>
    </div>
  );
};

export default BookingModal;
