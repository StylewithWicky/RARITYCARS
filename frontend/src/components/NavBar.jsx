import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Car, ChevronDown, PhoneCall, CheckCircle } from "lucide-react";
import styles from "./Navbar.module.css";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setSidebar] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Mock live data - this would ideally come from an API
  const fleetStatus = {
    executive: 4,
    suvs: 2,
    safari: 0,
    buses: 1
  };

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setSidebar(false);
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ""}`}>
      <div className={styles.navContainer}>
        
        {/* BRAND LOGO */}
        <div className={styles.logoWrapper}>
          <Link to="/" className={styles.logoLink}>
            <Car size={32} className={styles.logoIcon} />
            <div className={styles.logoText}>
              <span className={styles.brandName}>RARITY</span>
              <span className={styles.brandSub}>RENT-A-CAR</span>
            </div>
          </Link>
        </div>

        {/* DESKTOP LINKS */}
        <ul className={styles.navLinks}>
          <li><Link to="/" className={styles.link}>Home</Link></li>
          
          <li 
            className={styles.dropdownWrapper}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className={styles.link}>
              Our Fleet <ChevronDown size={14} className={isDropdownOpen ? styles.rotate : ""} />
            </button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={styles.megaMenu}
                >
                  {[
                    { id: 'executive', label: 'Executive Sedans' },
                    { id: 'suvs', label: 'Luxury SUVs' },
                    { id: 'safari', label: 'Safari 4x4' },
                    { id: 'buses', label: 'Corporate Buses' }
                  ].map((item) => (
                    <button key={item.id} className={styles.megaItem} onClick={() => navigate(`/fleet/${item.id}`)}>
                      <span className={styles.itemLabel}>{item.label}</span>
                      <div className={styles.statusIndicator}>
                        <span className={`${styles.pulse} ${fleetStatus[item.id] > 0 ? styles.online : styles.offline}`}></span>
                        <span className={styles.countText}>
                          {fleetStatus[item.id] > 0 ? `${fleetStatus[item.id]} Available` : 'Fully Booked'}
                        </span>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <li><button onClick={() => scrollToSection('about-section')} className={styles.link}>About</button></li>
          <li><button onClick={() => scrollToSection('services-section')} className={styles.link}>Services</button></li>
        </ul>

        {/* ACTIONS */}
        <div className={styles.navActions}>
          <a href="tel:+254700000000" className={styles.phoneLink}>
            <PhoneCall size={18} />
            <div className={styles.phoneText}>
               <span>24/7 Support</span>
               <strong>+254 700...</strong>
            </div>
          </a>
          <button className={styles.ctaButton} onClick={() => navigate('/booking')}>
            BOOK NOW
          </button>
          <button onClick={() => setSidebar(true)} className={styles.menuToggle}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className={styles.overlay} 
              onClick={() => setSidebar(false)} 
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={styles.sidebar}
            >
              <div className={styles.sidebarHeader}>
                <span className={styles.brandName}>RARITY</span>
                <button onClick={() => setSidebar(false)}><X size={32} /></button>
              </div>
              <ul className={styles.sidebarLinks}>
                <li><Link to="/" onClick={() => setSidebar(false)}>Home</Link></li>
                <li><button onClick={() => {navigate('/fleet'); setSidebar(false)}}>View Fleet</button></li>
                <li><button onClick={() => scrollToSection('about-section')}>About Us</button></li>
                <li><button onClick={() => scrollToSection('services-section')}>Our Services</button></li>
                <li><button onClick={() => scrollToSection('contact-section')}>Contact Us</button></li>
              </ul>
              <div className={styles.sidebarFooter}>
                <button className={styles.ctaButtonFull}>RESERVE A VEHICLE</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;