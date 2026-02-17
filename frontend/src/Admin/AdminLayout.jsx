import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Car, 
  Upload, 
  LogOut, 
  Settings, 
  Calendar,
  BarChart3,
  MessageSquare,
  Menu,
  X
} from 'lucide-react';
import styles from '../styles/AdminLayout.module.css';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const closeMenu = () => setIsMobileMenuOpen(false);
  const isActive = (path) => location.pathname === path ? styles.active : '';

  
  const breadcrumbs = location.pathname
    .split('/')
    .filter(p => p && p !== 'mkuru');

  return (
    <div className={styles.adminWrapper}>
      
      <header className="md:hidden flex items-center justify-between p-4 bg-[#12161d] border-b border-white/10 sticky top-0 z-[110] w-full">
        <div className="flex items-center gap-2">
          <span className="font-black tracking-tighter text-[#c5a059]">RARITY</span>
          <span className="text-[10px] bg-[#c5a059] text-black px-1.5 py-0.5 rounded font-bold">ADMIN</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-1">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      
      <aside className={`${styles.sidebar} ${isMobileMenuOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.brand}>
          <span className={styles.logoText}>RARITY</span>
          <span className={styles.badge}>ADMIN</span>
        </div>

        <nav className={styles.sideNav}>
          <Link to="/mkuru" className={`${styles.navItem} ${isActive('/mkuru')}`} onClick={closeMenu}>
            <LayoutDashboard size={20} /> <span>Dashboard</span>
          </Link>

          <Link to="/mkuru/fleet" className={`${styles.navItem} ${isActive('/mkuru/fleet')}`} onClick={closeMenu}>
            <Car size={20} /> <span>Manage Fleet</span>
          </Link>

          <Link to="/mkuru/bookings" className={`${styles.navItem} ${isActive('/mkuru/bookings')}`} onClick={closeMenu}>
            <Calendar size={20} /> <span>Reservations</span>
          </Link>

          <Link to="/mkuru/inquiries" className={`${styles.navItem} ${isActive('/mkuru/inquiries')}`} onClick={closeMenu}>
            <MessageSquare size={20} /> <span>Concierge Inbox</span>
          </Link>

          <Link to="/mkuru/analytics" className={`${styles.navItem} ${isActive('/mkuru/analytics')}`} onClick={closeMenu}>
            <BarChart3 size={20} /> <span>Intelligence</span>
          </Link>

          <Link to="/mkuru/upload" className={`${styles.navItem} ${isActive('/mkuru/upload')}`} onClick={closeMenu}>
            <Upload size={20} /> <span>Add New Vehicle</span>
          </Link>

          <div className="mt-auto border-t border-white/5 pt-4">
            <Link to="/mkuru/settings" className={`${styles.navItem} ${isActive('/mkuru/settings')}`} onClick={closeMenu}>
              <Settings size={20} /> <span>Settings</span>
            </Link>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              <LogOut size={20} /> Logout
            </button>
          </div>
        </nav>
      </aside>

      
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] md:hidden" onClick={closeMenu} />
      )}

      
      <main className={styles.adminMain}>
      
        <header className={`${styles.adminHeader} hidden md:flex`}>
          <div className={styles.headerLeft}>
            <h2 className="uppercase font-black tracking-widest text-[10px] opacity-40">System_Control_Panel</h2>
            <p className={styles.breadcrumb}>
              Mkuru {breadcrumbs.length > 0 ? `> ${breadcrumbs.join(' > ')}` : '> Core'}
            </p>
          </div>
          <div className={styles.adminProfile}>
            <div className="text-right hidden lg:block">
              <p className="text-white text-xs font-bold">Admin Manager</p>
              <p className="text-[9px] text-gold opacity-60 font-mono tracking-tighter">SESSION_ACTIVE</p>
            </div>
            <div className={styles.avatar}>M</div>
          </div>
        </header>

        <section className={styles.contentArea}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;