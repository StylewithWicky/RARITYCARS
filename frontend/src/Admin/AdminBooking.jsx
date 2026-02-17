import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, ShieldAlert, X } from 'lucide-react';
import styles from '../styles/AdminDashboard.module.css';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/bookings/`);
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Sync Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (id, status) => {
    if (status === 'cancelled') {
      setSelectedId(id);
      setShowModal(true);
    } else {
      updateStatus(id, 'confirmed');
    }
  };

  const updateStatus = async (id, status, cancelReason = "") => {
    try {
      const query = `new_status=${status}${cancelReason ? `&reason=${encodeURIComponent(cancelReason)}` : ''}`;
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/bookings/${id}/status?${query}`, {
        method: 'PATCH'
      });

      if (res.ok) {
        setShowModal(false);
        setReason("");
        fetchBookings();
      }
    } catch (err) {
      alert("System failed to update status.");
    }
  };

  if (loading) return <div className={styles.loader}><div className={styles.spinner}></div></div>;

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className="px-4">
          <h1 className="text-xl md:text-3xl font-black">RESERVATION_LOG</h1>
          <p className="text-xs md:text-sm opacity-60">Review and authorize fleet requests</p>
        </div>
      </header>

      <div className={`${styles.tableCard} mx-4 md:mx-0 overflow-x-auto`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Vehicle</th>
              <th>Period</th>
              <th>Total</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td className="font-mono text-[10px] opacity-40">#RC-{b.id}</td>
                <td>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm">{b.vehicle_brand}</span>
                    <span className="text-cyan-400 text-[10px] uppercase tracking-wider">{b.vehicle_model}</span>
                  </div>
                </td>
                <td className="text-[11px] leading-tight text-slate-400">
                  {new Date(b.start_date).toLocaleDateString()} <br/>
                  <span className="opacity-30 text-[9px]">to</span> {new Date(b.end_date).toLocaleDateString()}
                </td>
                <td className="font-mono text-emerald-500 text-sm whitespace-nowrap">
                  KES {b.total_price?.toLocaleString()}
                </td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[b.status?.toLowerCase()]}`}>
                    {b.status}
                  </span>
                </td>
                <td>
                  <div className="flex justify-center gap-6 md:gap-4 px-2">
                    <CheckCircle 
                      size={24}
                      className="text-emerald-500 cursor-pointer active:scale-90 transition-transform" 
                      onClick={() => handleAction(b.id, 'confirmed')}
                    />
                    <XCircle 
                      size={24}
                      className="text-red-500 cursor-pointer active:scale-90 transition-transform" 
                      onClick={() => handleAction(b.id, 'cancelled')}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-end md:items-center justify-center z-50 p-0 md:p-4">
          <div className="bg-[#0f1217] border-t md:border border-red-900/30 w-full max-w-md rounded-t-3xl md:rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-red-500 font-black text-sm tracking-tighter flex items-center gap-2">
                <ShieldAlert size={18}/> DENY_RESERVATION
              </h3>
              <div className="p-2 -mr-2 opacity-50" onClick={() => setShowModal(false)}>
                <X size={20} />
              </div>
            </div>
            
            <p className="text-slate-400 text-xs mb-4 leading-relaxed">
              Required: Specify the reason for declining this request. This will be sent to the client.
            </p>

            <textarea 
              className="w-full bg-black border border-slate-800 rounded-xl p-4 text-white text-sm focus:border-red-600 outline-none transition-all placeholder:text-slate-700"
              rows="4"
              placeholder="Reason for cancellation..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />

            <div className="flex flex-col md:flex-row gap-3 mt-8">
              <button 
                className="w-full bg-red-600 text-white py-4 md:py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-500 active:scale-95 transition-all order-1 md:order-2"
                onClick={() => updateStatus(selectedId, 'cancelled', reason)}
              >
                Confirm Denial
              </button>
              <button 
                className="w-full bg-slate-900 text-slate-400 py-4 md:py-3 rounded-xl font-bold text-xs uppercase hover:bg-slate-800 transition-all order-2 md:order-1"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;