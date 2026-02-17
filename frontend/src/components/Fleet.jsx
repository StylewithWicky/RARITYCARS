import React, { useState, useEffect } from 'react';
import VehicleCard from './VehicleCards';
import styles from '../styles/Fleet.module.css';

const FleetSection = ({ activeFilter = 'all', onRentClick }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
       
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"; 
        const categoryParam = activeFilter === 'all' ? '' : activeFilter;
        const url = `${baseUrl}/api/vehicles${categoryParam ? `?category=${categoryParam}` : ''}`;
        
        console.log("📡 Fetching Fleet from:", url);

        const response = await fetch(url);
        
        if (!response.ok) throw new Error("Fleet retrieval failed");
        
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("🚨 Mkuru Backend connection failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [activeFilter]);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.spinner}></div>
        <p>Accessing Rarity Vault...</p>
      </div>
    );
  }

  return (
    <section className={styles.fleetWrapper}>
      <div className={styles.grid}>
        {cars.map((item) => (
          <VehicleCard 
            key={item.id} 
            vehicle={item} 
            onRentClick={() => onRentClick(item)} 
          />
        ))}
      </div>
      
      {cars.length === 0 && (
        <div className={styles.emptyState}>
          <p className={styles.noResults}>
            Currently, all our {activeFilter === 'all' ? 'premium vehicles' : activeFilter} are fully booked.
          </p>
          <button onClick={() => window.location.reload()} className={styles.retryBtn}>
            Refresh Fleet
          </button>
        </div>
      )}
    </section>
  );
};

export default FleetSection;