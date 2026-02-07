import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, ShieldCheck } from 'lucide-react';
import client from '../api/client';
import '../styles/VehicleDetails.css';

const VehicleDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    if (!slug || slug === 'pending') return;

    
    client.get(`/vehicles/${slug}`)
      .then(res => {
        console.log("Vehicle found:", res.data);
        setVehicle(res.data);
      })
      .catch(err => {
        console.error("Fetch error details:", err.response?.data || err.message);
      });
  }, [slug]);
  if (!vehicle) return <div className="loader">Loading...</div>;

  return (
    <div className="detail-page">
      <nav className="detail-nav">
        <button onClick={() => navigate(-1)} className="back-btn">
          <ArrowLeft size={18} /> Back to Fleet
        </button>
      </nav>

      <div className="detail-container">
        <div className="gallery-section">
          
          <img 
            src={vehicle.image_url} 
            alt={`${vehicle.brand} ${vehicle.model}`} 
            className="main-img" 
          />
        </div>

        <div className="info-section">
          <header>
            <span className="category-label">{vehicle.category}</span>
            <h1>{vehicle.brand} {vehicle.model}</h1>
            <p className="price-display">
              ${vehicle.daily_rate} <span>per day</span>
            </p>
          </header>

          <div className="basic-info-row">
             <div className="info-item">
                <Calendar size={18} /> 
                <span>Year: <strong>{vehicle.year}</strong></span>
             </div>
             <div className="info-item">
                <Tag size={18} /> 
                <span>ID: <strong>#{vehicle.id}</strong></span>
             </div>
          </div>

          <div className="booking-summary">
            <p>Ready to drive the {vehicle.brand} {vehicle.model}?</p>
            <button className="book-btn-final">Book Now</button>
          </div>

          <div className="status-badge">
            <ShieldCheck size={16} /> Instant Confirmation Available
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;