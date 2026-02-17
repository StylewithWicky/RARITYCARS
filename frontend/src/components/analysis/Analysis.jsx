import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './Analytics.module.css';

const PerformanceTracker = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/mkuru/analytics/real-time`)
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  if (!stats) return <p>Loading Rarity Intelligence...</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.statsHeader}>
        <div className={styles.miniCard}>
          <span>Top Asset</span>
          <strong>{stats.top_earner_name}</strong>
          <small>KES {stats.top_earner_revenue.toLocaleString()}</small>
        </div>
        <div className={styles.miniCard}>
          <span>Busiest Month</span>
          <strong>{stats.peak_month}</strong>
        </div>
      </div>

      <div className={styles.chartBox}>
        <h3>Revenue Flow</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.chart_data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip cursor={{fill: '#f5f5f5'}} />
            <Bar dataKey="revenue" fill="#c5a059" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};