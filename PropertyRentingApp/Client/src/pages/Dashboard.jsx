import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    api.get('/properties/').then(res => setProperties(res.data));
  }, []);

  return (
    <div className="dashboard">
      <h2>Your Dashboard</h2>
      {properties.length === 0 ? (
        <p>No properties added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Price</th>
              <th>Bookings</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(p => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.location}</td>
                <td>₹{p.price}</td>
                <td>{p.bookings?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
