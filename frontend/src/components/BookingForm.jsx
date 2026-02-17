import React from 'react';
import { MapPin, Calendar, Clock, Search, Car, ShieldCheck, Box } from 'lucide-react';
import styles from '../styles/BookingBar.module.css';

const BookingBar = ({ vehicleType, setVehicleType, onSearch }) => {
  const today = new Date().toISOString().slice(0, 16);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    
    if (onSearch) onSearch(data);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.filterRow}>
          <button 
            type="button"
            className={`${styles.filterBtn} ${vehicleType === 'all' ? styles.active : ''}`}
            onClick={() => setVehicleType('all')}
          >
            All Vehicles
          </button>
          <button 
            type="button"
            className={`${styles.filterBtn} ${vehicleType === 'suv' ? styles.active : ''}`}
            onClick={() => setVehicleType('suv')}
          >
            <ShieldCheck size={16} /> SUVs & 4x4s
          </button>
          <button 
            type="button"
            className={`${styles.filterBtn} ${vehicleType === 'sedan' ? styles.active : ''}`}
            onClick={() => setVehicleType('sedan')}
          >
            <Box size={16} /> Luxury Sedans
          </button>
        </div>

        <div className={styles.header}>
          <Car size={20} className={styles.accentIcon} />
          <h3>Find Your Rare Experience</h3>
        </div>
        
        <form className={styles.formGrid} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label><MapPin size={14} /> Pickup</label>
            <select name="pickupLocation" className={styles.selectField} required>
              <option value="westlands">Westlands HQ</option>
              <option value="jkia">JKIA Airport</option>
              <option value="delivery">Custom Delivery</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label><Calendar size={14} /> From</label>
            <input name="startDate" type="datetime-local" min={today} className={styles.inputField} required />
          </div>

          <div className={styles.inputGroup}>
            <label><Clock size={14} /> Until</label>
            <input name="endDate" type="datetime-local" min={today} className={styles.inputField} required />
          </div>

          <button type="submit" className={styles.searchBtn}>
            <span>Search</span>
            <Search size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingBar;