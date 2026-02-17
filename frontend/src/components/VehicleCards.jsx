import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Gauge, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import "../styles/VehicleCard.css";

const VehicleCard = ({ vehicle }) => {
  const location = useLocation();
  const isMkuruView = location.pathname.startsWith('/mkuru');
  
  
  const assetIdentifier = vehicle.slug || vehicle.id;
  
  const detailPath = isMkuruView 
    ? `/mkuru/products/${vehicle.category}/${assetIdentifier}` 
    : `/products/${vehicle.category}/${assetIdentifier}`;

  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }} 
      className="vehicle-card-wrapper"
    >
      <Link to={detailPath} className="card-link-container">
        <div className="image-frame">
          <img 
            src={vehicle.image_url} 
            alt={`${vehicle.brand} ${vehicle.model}`} 
            loading="lazy"
          />
          <div className="category-tag">{vehicle.category}</div>
        </div>
        
        <div className="card-content">
          <div className="card-main-info">
            <h3 className="vehicle-name">
                <span className="brand-accent">{vehicle.brand}</span> {vehicle.model}
            </h3>
            
            <div className="price-tag-wrapper">
              <span className="currency">KES</span>
              <span className="amount">{Number(vehicle.daily_rate)?.toLocaleString()}</span>
              <span className="period">/day</span>
            </div>
          </div>
          
          <div className="spec-divider" />

          <div className="card-specs-row">
            <div className="spec-pill">
                <Users size={14} className="spec-icon"/> 
                <span>{vehicle.seats || 5} Seats</span>
            </div>
            <div className="spec-pill">
                <Gauge size={14} className="spec-icon"/> 
                <span>{vehicle.transmission || 'Auto'}</span>
            </div>
          </div>

          <button className="rarity-action-btn">
            {isMkuruView ? "SYSTEM: MANAGE" : "VIEW DETAILS"} 
            <ArrowRight size={16} className="btn-arrow" />
          </button>
        </div>
      </Link>
    </motion.div>
  );
};

export default VehicleCard;