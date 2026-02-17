import React, { useState, useEffect } from 'react';
import { ShieldCheck, User, Search, Loader2, Clock, Activity } from 'lucide-react';
import styles from '../styles/AdminDashboard.module.css';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/mkuru/audit/logs`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setLogs(data || []);
    } catch (error) {
      console.error("Audit Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(); }, []);

  const filteredLogs = logs.filter(log => 
    log.target?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.details?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className={styles.loaderWrapper || "flex flex-col items-center justify-center min-h-screen bg-[#0b0e14] text-white"}>
      <Loader2 className="animate-spin text-[#c5a059]" size={40} />
      <p className="font-mono text-[10px] tracking-[0.3em] mt-4 uppercase">Initializing_Secure_Audit_Stream</p>
    </div>
  );

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className="px-4">
          <h1 className="flex items-center gap-3 text-xl md:text-2xl font-black">
            <ShieldCheck className="text-emerald-500" size={28} /> AUDIT_TRAIL
          </h1>
          <p className="text-[10px] md:text-xs opacity-50 font-mono text-emerald-500/70">
            SEC_MONITOR_ACTIVE // {logs.length} EVENTS_RECORDED
          </p>
        </div>
        
        <div className="hidden md:flex items-center bg-[#12161d] border border-[#232931] rounded-lg px-4 py-2 mr-4">
          <Search size={16} className="text-slate-500 mr-2" />
          <input 
            type="text" 
            placeholder="FILTER_LOGS..." 
            className="bg-transparent border-none outline-none text-white text-xs w-64 font-mono"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      
      <div className="md:hidden px-4 mb-4">
        <div className="flex items-center bg-[#12161d] border border-[#232931] rounded-lg px-4 py-3">
          <Search size={18} className="text-slate-500 mr-2" />
          <input 
            type="text" 
            placeholder="FILTER_LOGS..." 
            className="bg-transparent border-none outline-none text-white text-sm w-full font-mono"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={`${styles.tableCard} mx-4 md:mx-0 overflow-x-auto border border-white/5`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className="whitespace-nowrap uppercase tracking-widest text-[10px]">Timestamp</th>
              <th className="whitespace-nowrap uppercase tracking-widest text-[10px]">Action</th>
              <th className="whitespace-nowrap uppercase tracking-widest text-[10px]">Admin</th>
              <th className="whitespace-nowrap uppercase tracking-widest text-[10px]">Target</th>
              <th className="whitespace-nowrap uppercase tracking-widest text-[10px]">System_Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="text-[10px] font-mono text-slate-500 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="opacity-50" />
                    {new Date(log.timestamp).toLocaleString([], { 
                      month: 'short', 
                      day: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </div>
                </td>
                <td>
                  <span className={`text-[9px] font-black px-2 py-1 rounded-sm ${
                    log.action === 'DELETE' || log.action === 'PURGE' 
                    ? 'bg-red-900/20 text-red-500 border border-red-500/20' 
                    : 'bg-emerald-900/20 text-emerald-500 border border-emerald-500/20'
                  }`}>
                    {log.action}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <div className="w-5 h-5 rounded-full bg-[#c5a059]/10 flex items-center justify-center">
                      <User size={10} className="text-[#c5a059]" />
                    </div>
                    <span className="text-xs text-slate-300 font-medium">{log.user}</span>
                  </div>
                </td>
                <td>
                  <span className="text-xs font-bold text-white uppercase tracking-tight whitespace-nowrap">
                    {log.target}
                  </span>
                </td>
                <td className="min-w-[300px]">
                  <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                    <span className="opacity-30 mr-1">&gt;</span> {log.details}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredLogs.length === 0 && (
          <div className="py-32 text-center text-slate-600">
            <Activity size={40} className="mx-auto mb-4 opacity-10 animate-pulse" />
            <p className="font-mono text-[10px] uppercase tracking-widest">Zero_Activity_Matches_Filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditLogs;