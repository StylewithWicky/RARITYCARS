import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Car, Key, AlertCircle, Plus, Loader2 } from 'lucide-react';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCars: 0,
    availableNow: 0,
    activeBookings: 0,
    fleet: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/mkuru/fleet-summary`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <Loader2 className="animate-spin text-[#c5a059]" size={48} />
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className="px-4 md:px-0">
          <h1 className="text-xl md:text-3xl font-black tracking-tighter uppercase">Mkuru Fleet Control</h1>
          <p className="text-xs md:text-sm opacity-50 font-mono">CORE_INVENTORY_ENGINE</p>
        </div>
        <Link to="/mkuru/upload" className={styles.addBtn}>
          <Plus size={18} /> <span className="hidden md:inline">Add New Car</span><span className="md:hidden">Add</span>
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-0 mb-10">
        <div className={styles.card}>
          <div className="flex justify-between items-start">
            <Car size={28} color="#c5a059" />
            <span className="text-[10px] bg-[#c5a059]/10 text-[#c5a059] px-2 py-1 rounded">FLEET</span>
          </div>
          <div className="mt-4">
            <h3 className="text-xs uppercase text-slate-500 font-bold">Total Fleet</h3>
            <p className="text-3xl font-black">{stats.totalCars}</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className="flex justify-between items-start">
            <Key size={28} color="#4ade80" />
            <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-1 rounded">READY</span>
          </div>
          <div className="mt-4">
            <h3 className="text-xs uppercase text-slate-500 font-bold">Available</h3>
            <p className="text-3xl font-black">{stats.availableNow}</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className="flex justify-between items-start">
            <AlertCircle size={28} color="#e53e3e" />
            <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-1 rounded">ACTIVE</span>
          </div>
          <div className="mt-4">
            <h3 className="text-xs uppercase text-slate-500 font-bold">Booked</h3>
            <p className="text-3xl font-black">{stats.activeBookings}</p>
          </div>
        </div>
      </div>

      <section className={`${styles.fleetList} px-4 md:px-0`}>
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
          <div className="w-2 h-2 bg-[#c5a059] rounded-full animate-pulse" /> Live Inventory
        </h2>
        
        <div className={`${styles.tableCard} overflow-x-auto rounded-2xl border border-white/5`}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className="whitespace-nowrap">Vehicle</th>
                <th className="whitespace-nowrap">Class</th>
                <th className="whitespace-nowrap">Price/Day</th>
                <th className="text-right whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {stats.fleet?.length > 0 ? (
                stats.fleet.map(car => (
                  <tr key={car.id}>
                    <td>
                      <div className="flex flex-col">
                        <strong className="text-white text-sm">{car.name}</strong>
                        <span className="text-[10px] opacity-30 font-mono">ID: {car.id.slice(0,8)}</span>
                      </div>
                    </td>
                    <td><span className={styles.categoryBadge}>{car.category}</span></td>
                    <td className="font-mono text-sm text-[#c5a059]">KES {car.price?.toLocaleString()}</td>
                    <td className="text-right">
                      <Link 
                        to={`/mkuru/products/${car.category}/${car.id}`} 
                        className="bg-white/5 hover:bg-[#c5a059] hover:text-black transition-all px-4 py-2 rounded-lg text-[10px] font-black uppercase"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-12 text-slate-600 font-mono text-xs uppercase tracking-widest">
                    No vehicles found in fleet server.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;