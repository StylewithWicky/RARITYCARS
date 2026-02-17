import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit3, Trash2, Car, Loader2 } from 'lucide-react';
import styles from '../styles/AdminDashboard.module.css';

const AdminFleetList = () => {
  const [fleet, setFleet] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    fetchFleet();
  }, []);

  const fetchFleet = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/vehicles`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (!res.ok) throw new Error("Vault Access Denied");
      const data = await res.json();
      setFleet(data || []);
    } catch (err) {
      console.error("🚨 Mkuru Fleet Retrieval Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug, brand, model) => {
    const confirmDelete = window.confirm(`PROCEED WITH CAUTION: Permanently de-list the ${brand} ${model} from Rarity Vault?`);
    
    if (confirmDelete) {
      try {
        const response = await fetch(`${baseUrl}/api/vehicles/${slug}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });

        if (response.ok) {
          setFleet(prevFleet => prevFleet.filter(car => car.slug !== slug));
        } else {
          alert("Purge failed. Asset may be locked.");
        }
      } catch (err) {
        console.error("Delete Error:", err);
        alert("Connection severed during purge.");
      }
    }
  };

  if (loading) return (
    <div className={styles.loaderContainer}>
      <Loader2 className={styles.spinner} size={40} />
      <p className="font-mono text-xs tracking-widest uppercase mt-4">Syncing_Inventory...</p>
    </div>
  );

  return (
    <div className={styles.fleetList}>
      <header className={styles.header}>
        <div className="px-4">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-black">
            <Car size={24} className="text-gold" /> LIVE_INVENTORY
          </h2>
          <p className="text-xs opacity-50 font-mono">ASSET_CONTROL_CENTER</p>
        </div>
      </header>

      <div className={`${styles.tableCard} mx-4 md:mx-0 overflow-x-auto`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Category</th>
              <th>Rate</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fleet.length > 0 ? fleet.map(car => (
              <tr key={car.id}>
                <td>
                    <div className="flex flex-col">
                        <strong className="text-white text-sm whitespace-nowrap">{car.brand} {car.model}</strong>
                        <small className="text-[10px] text-slate-500 font-mono">{car.slug}</small>
                    </div>
                </td>
                <td><span className={styles.categoryBadge}>{car.category}</span></td>
                <td className="font-mono text-sm">KES {Number(car.daily_rate)?.toLocaleString()}</td>
                <td>
                    <span className="text-[11px] font-bold" style={{ color: car.is_available !== false ? '#00f2ff' : '#f87171' }}>
                        {car.is_available !== false ? '● ONLINE' : '● OFFLINE'}
                    </span>
                </td>
                <td>
                  <div className="flex justify-end gap-6 md:gap-4 px-2">
                    <Link 
                        to={`/mkuru/products/${car.category}/${car.slug}`} 
                        className="text-slate-400 hover:text-cyan-400 active:scale-90 transition-all"
                    >
                      <Edit3 size={20} />
                    </Link>
                    
                    <button 
                        onClick={() => handleDelete(car.slug, car.brand, car.model)}
                        className="text-red-900/50 hover:text-red-500 active:scale-90 transition-all bg-none border-none cursor-pointer p-0"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="text-center py-20">
                  <p className="text-slate-500 mb-4">No assets found in vault.</p>
                  <Link to="/mkuru/upload" className="text-cyan-400 font-bold uppercase text-xs tracking-widest border border-cyan-400/30 px-4 py-2 rounded-lg">
                    Initialize New Asset
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFleetList;