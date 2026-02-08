import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Search, Car } from 'lucide-react';
import styles from '../styles/BookingBar.module.css';

const BookingBar = () => {
    const [vehicleType, setVehicleType] = useState('all');

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.filterRow}>
          <button 
            className={`${styles.filterBtn} ${vehicleType === 'all' ? styles.active : ''}`}
            onClick={() => setVehicleType('all')}
          >
            All Vehicles
          </button>
          <button 
            className={`${styles.filterBtn} ${vehicleType === 'suv' ? styles.active : ''}`}
            onClick={() => setVehicleType('suv')}
          >
            <ShieldCheck size={16} /> SUVs & 4x4s
          </button>
          <button 
            className={`${styles.filterBtn} ${vehicleType === 'sedan' ? styles.active : ''}`}
            onClick={() => setVehicleType('sedan')}
          >
            <Box size={16} /> Luxury Sedans
          </button>
        </div>

        <div className={styles.header}>
          <Car size={20} className={styles.accentIcon} />
          <h3>Book Your Ride</h3>
        </div>
        
        <form className={styles.formGrid}>
          
          <div className={styles.inputGroup}>
            <label><MapPin size={14} /> Pickup Location</label>
            <select className={styles.selectField}>
              <option value="">Choose Pickup Location</option>
              <option value="jkia">JKIA Airport</option>
              <option value="westlands">Westlands HQ</option>
            </select>
          </div>

         
          <div className={styles.inputGroup}>
            <label><MapPin size={14} /> Drop-off Location</label>
            <select className={styles.selectField}>
              <option value="">Choose Drop-off Location</option>
              <option value="jkia">JKIA Airport</option>
              <option value="westlands">Westlands HQ</option>
            </select>
          </div>

          
          <div className={styles.inputGroup}>
            <label><Calendar size={14} /> Pickup Date & Time</label>
            <input type="datetime-local" className={styles.inputField} />
          </div>

         
          <div className={styles.inputGroup}>
            <label><Clock size={14} /> Return Date & Time</label>
            <input type="datetime-local" className={styles.inputField} />
          </div>

          
          <button type="submit" className={styles.searchBtn}>
            <span>Find A Vehicle</span>
            <Search size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingBar;