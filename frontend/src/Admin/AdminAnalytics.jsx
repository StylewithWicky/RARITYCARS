import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Activity, Award, AlertCircle } from 'lucide-react';
import styles from '../styles/AdminDashboard.module.css';

const AdminAnalytics = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/mkuru/analytics/real-time`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (error) return (
    <div className="flex items-center justify-center bg-black text-red-500 p-10 h-screen text-center">
      <div>
        <AlertCircle className="mx-auto mb-4" size={48} />
        <h2 className="text-xl font-bold">SYSTEM_ERROR</h2>
        <p className="opacity-70 mt-2">{error}</p>
      </div>
    </div>
  );

  if (loading || !data) return (
    <div className={styles.dashboardContainer} style={{ backgroundColor: '#000', height: '100vh' }}>
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <p className="tracking-widest text-xs mt-4">CONNECTING_TO_FLEET_SERVER...</p>
      </div>
    </div>
  );

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className="px-4 md:px-0">
          <h1 className="text-2xl md:text-3xl font-black">FLEET_INTELLIGENCE</h1>
          <p className="opacity-50 text-sm">Rarity Cars Analytics Engine</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-0">
        <div className={styles.card}>
          <div className="flex justify-between items-start">
            <h3 className="text-xs uppercase opacity-50">Total Revenue</h3>
            <DollarSign size={16} className="text-gold" />
          </div>
          <p className="text-xl md:text-2xl font-bold mt-2">
            KES {data?.total_revenue_overall?.toLocaleString() || "0"}
          </p>
        </div>

        <div className={styles.card}>
          <div className="flex justify-between items-start">
            <h3 className="text-xs uppercase opacity-50">Active Rentals</h3>
            <Activity size={16} className="text-purple-400" />
          </div>
          <p className="text-xl md:text-2xl font-bold mt-2">{data?.active_rentals_count || 0}</p>
        </div>

        <div className={styles.card}>
          <div className="flex justify-between items-start">
            <h3 className="text-xs uppercase opacity-50">Utilization</h3>
            <TrendingUp size={16} className="text-emerald-400" />
          </div>
          <p className="text-xl md:text-2xl font-bold mt-2">{data?.fleet_utilization || 0}%</p>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-purple-500 h-full transition-all duration-1000" 
              style={{width: `${data?.fleet_utilization || 0}%`}} 
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 p-4 md:p-0">
        <div className={styles.tableCard}>
          <div className="p-5">
            <h3 className="text-white text-xs tracking-widest uppercase mb-6">Revenue History</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.chart_data || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{backgroundColor: '#0f1217', border: '1px solid #1e293b', borderRadius: '8px'}} 
                  />
                  <Bar dataKey="revenue" fill="#c5a059" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className={`${styles.tableCard} overflow-x-auto`}>
          <div className="p-5 border-b border-slate-800">
            <h3 className="text-white text-xs tracking-widest uppercase">Top Performing Fleet</h3>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Trips</th>
                <th className="text-right">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {data?.ranking_list?.map((car, idx) => (
                <tr key={idx}>
                  <td className="font-medium">{car.name}</td>
                  <td className="opacity-60">{car.booking_count}</td>
                  <td className="text-emerald-500 font-mono text-right">
                    {car.total_revenue?.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;