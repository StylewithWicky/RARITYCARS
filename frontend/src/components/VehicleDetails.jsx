// src/pages/VehicleDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Calendar, Fuel } from 'lucide-react';
import client from '../api/client';
import '../styles/VehicleDetails.css';

const VehicleDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    client.get(`/vehicles/${slug}`)
      .then(res => setVehicle(res.data))
      .catch(() => navigate('/'));
  }, [slug, navigate]);

  if (!vehicle) return <div className="loader">Loading...</div>;

  return (
    <div className="detail-page">
      <nav className="detail-nav">
        <button onClick={() => navigate(-1)}><ArrowLeft /> Back to Fleet</button>
      </nav>

      <div className="detail-container">
        <div className="gallery-section">
          <img src={vehicle.image_url} alt={vehicle.name} className="main-img" />
        </div>

        <div className="info-section">
          <header>
            <span className="category">{vehicle.category}</span>
            <h1>{vehicle.name}</h1>
            <p className="price-big">${vehicle.price_per_day} <span>per day</span></p>
          </header>

          <div className="details-grid">
            <div className="detail-tile"><Fuel /> <span>Fuel</span> <strong>{vehicle.fuel_type}</strong></div>
            <div className="detail-tile"><Calendar /> <span>Year</span> <strong>{vehicle.year}</strong></div>
            <div className="detail-tile"><Shield /> <span>Status</span> <strong>Available</strong></div>
          </div>

          <p className="description">{vehicle.description}</p>
          
          <button className="book-btn-final">Book This Vehicle Now</button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;