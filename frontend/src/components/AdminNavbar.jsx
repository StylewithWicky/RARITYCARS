import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Car, Calendar, LogOut, 
  ExternalLink, Settings, ShieldAlert 
} from "lucide-react";
import styles from "../styles/NavBar.module.css";

const AdminNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");

    navigate('/login');
  };

  const navItems = [
    { path: '/mkuru/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/mkuru/fleet', label: 'Fleet', icon: <Car size={18} /> },
    { path: '/mkuru/bookings', label: 'Bookings', icon: <Calendar size={18} /> },
    { path: '/mkuru/settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <nav className={styles.adminNav}>
      <div className={styles.navContainer}>
        
        
        <div className={styles.logoWrapper}>
          <Link to="/mkuru/dashboard" className={styles.logoLink}>
            <div className={styles.mkuruBadge}>MKURU</div>
            <div className={styles.logoText}>
              <span className={styles.brandName}>RARITY</span>
              <span className={styles.adminTag}>Control Panel</span>
            </div>
          </Link>
        </div>

        <ul className={styles.navLinks}>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`${styles.link} ${
                  location.pathname === item.path ? styles.active : ""
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

       
        <div className={styles.navActions}>
         
          <Link to="/" target="_blank" className={styles.liveSiteLink}>
            View Showroom <ExternalLink size={14} />
          </Link>
          
          <div className={styles.divider}></div>
          
          
          <button 
            onClick={handleLogout} 
            className={styles.logoutBtn} 
            title="Terminate Session"
          >
            <LogOut size={20} />
            <span className={styles.logoutText}>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavBar;