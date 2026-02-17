import React, { useEffect, useState } from 'react';
import { Mail, RefreshCw, Loader2, ExternalLink } from 'lucide-react';
import styles from '../styles/AdminDashboard.module.css';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchInquiries = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/mkuru/inquiry/all`);
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setInquiries(data);
    } catch (err) {
      console.error("Concierge Fetch Error:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    const statusMap = { 'new': 'contacted', 'contacted': 'converted', 'converted': 'new' };
    const nextStatus = statusMap[currentStatus] || 'new';

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/mkuru/inquiry/${id}/status?new_status=${nextStatus}`, {
        method: 'PATCH'
      });
      if (res.ok) fetchInquiries();
    } catch (err) {
      alert("Status synchronization failed.");
    }
  };

  const getStatusStyle = (status) => {
    if (status === 'new') return styles.pending;
    if (status === 'contacted') return styles.confirmed;
    if (status === 'converted') return styles.converted; 
    return '';
  };

  if (loading) return (
    <div className={styles.loader}>
      <Loader2 className="animate-spin text-cyan-400" size={40} />
      <p className="font-mono text-[10px] tracking-[0.3em] mt-4 uppercase">Accessing_Concierge_Vault</p>
    </div>
  );

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className="px-4">
          <h1 className="text-xl md:text-3xl font-black tracking-tighter uppercase">CONCIERGE_INBOX</h1>
          <p className="text-[10px] md:text-xs opacity-50 font-mono text-cyan-400">LEAD_ACQUISITION_PROTOCOL</p>
        </div>
        <button 
          onClick={fetchInquiries} 
          className="p-2 mr-4 hover:bg-white/5 rounded-full transition-colors"
          disabled={isRefreshing}
        >
          <RefreshCw size={18} className={`${isRefreshing ? 'animate-spin' : ''} text-slate-500`} />
        </button>
      </header>

      <div className={`${styles.tableCard} mx-4 md:mx-0 overflow-x-auto border border-white/5`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Client_Identity</th>
              <th>Interest_Core</th>
              <th>Status_Cycle</th>
              <th className="text-right">Reach_Out</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length > 0 ? inquiries.map((inq) => (
              <tr key={inq.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="font-mono text-[10px] opacity-40">
                  {new Date(inq.created_at).toLocaleDateString()}
                  <br />
                  <span className="text-[9px]">{new Date(inq.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </td>
                <td>
                  <div className="flex flex-col">
                    <span className="font-bold text-white text-sm tracking-tight">{inq.name}</span>
                    <span className="text-[10px] opacity-40 font-mono lowercase">{inq.email}</span>
                  </div>
                </td>
                <td>
                  <span className={`${styles.categoryBadge} border border-[#c5a059]/20`}>
                    {inq.type || 'General Inquiry'}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => toggleStatus(inq.id, inq.status)}
                    className={`${styles.statusBadge} ${getStatusStyle(inq.status)} cursor-pointer border-none transition-all active:scale-90 hover:brightness-125`}
                  >
                    {inq.status.toUpperCase()}
                  </button>
                </td>
                <td className="text-right">
                  <div className="flex justify-end gap-4 px-2">
                    <a 
                      href={`mailto:${inq.email}?subject=Rarity Concierge - Re: Your Inquiry`} 
                      className="text-cyan-400/60 hover:text-cyan-400 transition-colors p-2"
                    >
                      <Mail size={18} />
                    </a>
                    <button className="text-slate-600 hover:text-white transition-colors p-2">
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="text-center py-24 opacity-30 font-mono text-[10px] uppercase tracking-widest">
                  Inbox_Empty: No_Active_Leads
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminInquiries;