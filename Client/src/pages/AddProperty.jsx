import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddProperty = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    image: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/properties', form);
    alert('Property added successfully!');
    setForm({ title: '', description: '', price: '', location: '', image: '' });
    navigate('/listings');
  };

  return (
    <div className="form-container">
      <h2>Add New Property</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" placeholder="Title" value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <textarea placeholder="Description" value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <input type="number" placeholder="Price per night" value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input type="text" placeholder="Location" value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })} required />
        <input type="text" placeholder="Image URL" value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })} required />
        <button type="submit" className="btn">Add Property</button>
      </form>
    </div>
  );
};

export default AddProperty;
