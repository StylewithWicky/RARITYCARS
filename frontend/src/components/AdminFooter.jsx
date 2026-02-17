import React from "react";
import { ShieldCheck, Database, Zap } from "lucide-react";
import styles from "../../styles/AdminFooter.module.css";

const AdminFooter = () => {
  return (
    <footer className={styles.adminFooter}>
      <div className={styles.container}>
        
        <div className={styles.statusGroup}>
          <div className={styles.statusItem}>
            <Zap size={14} className={styles.activeIcon} />
            <span>System: <strong>Operational</strong></span>
          </div>
          <div className={`${styles.statusItem} ${styles.hideMobile}`}>
            <Database size={14} />
            <span>DB Latency: <strong>24ms</strong></span>
          </div>
        </div>

        <div className={styles.centerNote}>
          <ShieldCheck size={14} className={styles.shieldIcon} />
          <span>Secure Session</span>
        </div>

        <div className={styles.infoGroup}>
          <span className={`${styles.versionTag} ${styles.hideMobile}`}>v2.4.0-stable</span>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} <strong>MKURU</strong>
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default AdminFooter;