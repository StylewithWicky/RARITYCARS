import React, { useState, useEffect } from 'react';
import VehicleCard from './VehicleCard';
import styles from './Fleet.module.css';

const FleetSection = ({ activeFilter }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        // Points to your Python FastAPI server
        const response = await fetch(`http://localhost:8000/api/vehicles?category=${activeFilter}`);
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Backend connection failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [activeFilter]);

  if (loading) return <div className={styles.loader}>Accessing Rarity Vault...</div>;

  return (
    <section className={styles.fleetWrapper}>
      <div className={styles.grid}>
        {cars.map((car) => (
          <VehicleCard key={car.id} car={car} />
        ))}
      </div>
      {cars.length === 0 && (
        <p className={styles.noResults}>No {activeFilter}s available right now.</p>
      )}
    </section>
  );
};

export default FleetSection;