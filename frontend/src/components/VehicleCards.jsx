// src/components/VehicleCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Gauge, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import "../styles/VehicleCard.css";

const VehicleCard = ({ vehicle }) => {
  return (
    <motion.div whileHover={{ y: -5 }} className="vehicle-card">
      <Link to={`/vehicles/${vehicle.slug}`} className="card-link">
        <div className="image-wrapper">
          <img src={vehicle.image_url} alt={vehicle.name} />
          <span className="badge">{vehicle.category}</span>
        </div>
        
        <div className="card-body">
          <div className="card-header">
            <h3>{vehicle.name}</h3>
            <span className="price">${vehicle.price_per_day}<span>/day</span></span>
          </div>
          
          <div className="card-specs">
            <div className="spec"><Users size={14}/> {vehicle.seats} Seats</div>
            <div className="spec"><Gauge size={14}/> {vehicle.transmission}</div>
          </div>

          <button className="view-btn">
            View Details <ArrowRight size={16} />
          </button>
        </div>
      </Link>
    </motion.div>
  );
};

export default VehicleCard;