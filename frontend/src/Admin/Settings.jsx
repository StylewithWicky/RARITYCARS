import React from 'react';
import { Settings as SettingsIcon, Save, Globe, Bell, Shield } from 'lucide-react';
import styles from '../styles/AdminDashboard.module.css';

const Settings = () => {
  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div>
          <h2><SettingsIcon size={24} /> Global Fleet Settings</h2>
          <p>Configure business rules and system parameters</p>
        </div>
        <button className={styles.addBtn}><Save size={18} /> Save Changes</button>
      </header>

      <div className={styles.statsGrid}>
        
        <div className={styles.card}>
          <div className="flex items-center gap-2 mb-4 text-[#c5a059]">
            <Globe size={18} /> <h3>Localization</h3>
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-xs text-slate-500">Base Currency: **KES (Shillings)**</label>
            <label className="text-xs text-slate-500">Timezone: **Nairobi (GMT+3)**</label>
          </div>
        </div>

        
        <div className={styles.card}>
          <div className="flex items-center gap-2 mb-4 text-cyan-400">
            <Shield size={18} /> <h3>Rental Logic</h3>
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-xs text-slate-500 text-white">Maintenance Buffer: **1 Day**</label>
            <label className="text-xs text-slate-500">Minimum Rental Period: **24 Hours**</label>
          </div>
        </div>
      </div>

      <div className={styles.tableCard} style={{ padding: '2rem' }}>
         <h3 className="text-white mb-4">Email Notifications</h3>
         <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-white/5">
            <div>
              <p className="text-sm font-bold">Booking Notifications</p>
              <p className="text-xs text-slate-500">Notify manager when a new request is made.</p>
            </div>
            <div className="w-10 h-5 bg-cyan-500 rounded-full relative">
               <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
            </div>
         </div>
      </div>
    </div>
  );
};

export default Settings;