import React, { useState, useEffect } from 'react';
import { Edit, Trash2, AlertCircle, Loader2, Car } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from '../styles/AdminDashboard.module.css';

const ProductGrid = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/vehicles`);
      if (!res.ok) throw new Error("FAULT_COMMUNICATION_FAILURE");
      const data = await res.json();
      setVehicles(data || []);
    } catch (err) {
      setError(err.message);
      console.error("🚨 Inventory Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVehicles(); }, []);

  const handleDelete = async (slug, name) => {
    const secureConfirm = window.confirm(`CRITICAL_ACTION: Permanently purge ${name} from Rarity Vault?`);
    
    if (secureConfirm) {
      try {
        const res = await fetch(`${baseUrl}/api/vehicles/${slug}`, { 
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });

        if (res.ok) {
          setVehicles(prev => prev.filter(v => v.slug !== slug));
        } else {
          alert("PURGE_REJECTED: Asset may be locked or restricted.");
        }
      } catch (err) {
        console.error("Delete failed:", err);
        alert("NETWORK_STABILITY_ERROR");
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="animate-spin text-gold mb-4" size={32} />
      <p className="font-mono text-[10px] tracking-widest opacity-50 uppercase">Syncing_Inventory_Vault</p>
    </div>
  );

  return (
    <div className={styles.tableCard}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className="uppercase tracking-widest text-[10px]">Asset_Profile</th>
            <th className="uppercase tracking-widest text-[10px]">Category</th>
            <th className="uppercase tracking-widest text-[10px]">Rate_Daily</th>
            <th className="uppercase tracking-widest text-[10px]">Status</th>
            <th className="text-right uppercase tracking-widest text-[10px]">Command_Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.length > 0 ? vehicles.map((v) => (
            <tr key={v.id || v.slug} className="hover:bg-white/[0.02] transition-colors">
              <td className={styles.carInfo}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 rounded bg-slate-900 overflow-hidden border border-white/10 flex-shrink-0">
                    {v.image_url ? (
                      <img src={v.image_url} alt={v.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center opacity-20"><Car size={16}/></div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-bold tracking-tight uppercase">{v.name}</span>
                    <span className="text-[9px] font-mono text-slate-500">{v.slug}</span>
                  </div>
                </div>
              </td>
              <td>
                <span className={styles.categoryBadge}>{v.category?.toUpperCase()}</span>
              </td>
              <td className="font-mono text-sm text-cyan-400">
                KES {v.price_per_day?.toLocaleString()}
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${v.is_available !== false ? 'bg-cyan-400' : 'bg-red-500'}`} />
                  <span className="text-[10px] font-bold" style={{ color: v.is_available !== false ? '#00f2ff' : '#f87171' }}>
                    {v.is_available !== false ? 'ONLINE' : 'OFFLINE'}
                  </span>
                </div>
              </td>
              <td>
                <div className="flex justify-end gap-4 px-2">
                  <Link 
                    to={`/mkuru/edit/${v.slug}`} 
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <Edit size={18} />
                  </Link>
                  <button 
                    className="text-slate-700 hover:text-red-500 transition-colors bg-none border-none cursor-pointer" 
                    onClick={() => handleDelete(v.slug, v.name)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5" className="text-center py-20">
                <AlertCircle className="mx-auto mb-2 opacity-20" size={32} />
                <p className="font-mono text-[10px] uppercase opacity-30">No_Assets_Detected_In_Sector</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductGrid;