import React, { useState, useEffect } from 'react';
import { Check, X, MessageSquare, Calendar, Loader2, Tag, Phone } from 'lucide-react';
import styles from '../styles/AdminDashboard.module.css';

const BookingTable = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/bookings`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (!res.ok) throw new Error("Access Denied");
      const data = await res.json();
      setBookings(data || []);
    } catch (err) {
      console.error("🚨 Reservation Sync Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${baseUrl}/api/bookings/${id}/status?new_status=${status}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) fetchBookings();
    } catch (err) {
      alert("Operational failure: Could not update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return '#00f2ff';
      case 'pending': return '#fbbf24';
      case 'cancelled': return '#f87171';
      case 'completed': return '#10b981';
      default: return '#94a3b8';
    }
  };

  if (loading) return (
    <div className={styles.loaderContainer}>
      <Loader2 className={styles.spinner} size={40} />
      <p className="font-mono text-xs tracking-[0.3em] uppercase mt-4">Syncing_Reservations...</p>
    </div>
  );

  return (
    <div className={styles.fleetList}>
      <header className={styles.header}>
        <div className="px-4">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-black">
            <Calendar size={24} className="text-gold" /> RESERVATION_VAULT
          </h2>
          <p className="text-[10px] opacity-50 font-mono text-cyan-400">ACTIVE_BOOKING_LOGS</p>
        </div>
      </header>

      <div className={`${styles.tableCard} mx-4 md:mx-0 overflow-x-auto border border-white/5`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className="uppercase tracking-widest text-[10px]">Client</th>
              <th className="uppercase tracking-widest text-[10px]">Asset</th>
              <th className="uppercase tracking-widest text-[10px]">Period_&_Rate</th>
              <th className="uppercase tracking-widest text-[10px]">Status</th>
              <th className="text-right uppercase tracking-widest text-[10px]">Concierge_Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? bookings.map((b) => (
              <tr key={b.id} className={updatingId === b.id ? "opacity-40 pointer-events-none" : ""}>
                <td>
                  <div className="flex flex-col">
                    <strong className="text-white text-sm tracking-tight uppercase">{b.customer_name}</strong>
                    <div className="flex items-center gap-1 opacity-50 text-[10px] font-mono">
                      <Phone size={10} /> {b.customer_phone}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-gold opacity-70" />
                    <span className="text-xs font-bold text-slate-200">{b.vehicle_brand} {b.vehicle_model}</span>
                  </div>
                </td>
                <td>
                  <div className="font-mono text-[11px] leading-tight">
                    <span className="opacity-60">{new Date(b.start_date).toLocaleDateString()}</span>
                    <span className="mx-1 opacity-30">→</span>
                    <span className="opacity-60">{new Date(b.end_date).toLocaleDateString()}</span>
                    <div className="text-cyan-400 font-black mt-1">KES {b.total_price?.toLocaleString()}</div>
                  </div>
                </td>
                <td>
                  <span 
                    className="text-[9px] font-black px-2 py-1 rounded-sm border"
                    style={{ 
                      color: getStatusColor(b.status), 
                      borderColor: `${getStatusColor(b.status)}33`,
                      backgroundColor: `${getStatusColor(b.status)}11` 
                    }}
                  >
                    {b.status.toUpperCase()}
                  </span>
                </td>
                <td>
                  <div className="flex justify-end gap-5 px-2">
                    <button 
                      onClick={() => handleStatusChange(b.id, 'confirmed')} 
                      className="text-emerald-500 hover:scale-125 transition-all bg-none border-none cursor-pointer"
                      title="Confirm Booking"
                    >
                      <Check size={18} strokeWidth={3} />
                    </button>
                    <button 
                      onClick={() => handleStatusChange(b.id, 'cancelled')} 
                      className="text-red-500 hover:scale-125 transition-all bg-none border-none cursor-pointer"
                      title="Void Booking"
                    >
                      <X size={18} strokeWidth={3} />
                    </button>
                    <a 
                      href={`https://wa.me/${b.customer_phone.replace(/\+/g, '')}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-cyan-400 hover:scale-125 transition-all"
                      title="WhatsApp Client"
                    >
                      <MessageSquare size={18} />
                    </a>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="text-center py-20 opacity-30 font-mono text-xs uppercase tracking-[0.2em]">
                  No_Active_Reservations_Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;