import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Car, ChevronDown, PhoneCall } from "lucide-react";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setSidebar] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleNavigation = (id) => {
    setSidebar(false);
    
    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
       navigate(`/#${id}`);
    }
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ""}`}>
      <div className={styles.navContainer}>
        
        
        
        <div className={styles.logoWrapper}>
          <Link to="/" className={styles.logoLink} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <Car size={32} className={styles.logoIcon} />
            <div className={styles.logoText}>
              <span className={styles.brandName}>RARITY</span>
              <span className={styles.brandSub}>RENT-A-CAR</span>
            </div>
          </Link>
        </div>

       
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
                    <button key={item.id} className={styles.megaItem} onClick={() => {navigate(`/fleet/${item.id}`); setIsDropdownOpen(false);}}>
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

          <li>
            <button onClick={() => handleNavigation('about-section')} className={styles.link}>
              About Us
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation('contact-section')} className={styles.link}>
              Contact Us
            </button>
          </li>
        </ul>

       
        <div className={styles.navActions}>
          <div className={styles.phoneContainer}>
            <PhoneCall size={20} className={styles.phoneIcon} />
            <div className={styles.phoneText}>
              <span>24/7 Support</span>
              <div className={styles.numberStack}>
                <a href="tel:+254769986861" className={styles.phoneNumber}>+254 769 986 861</a>
                <a href="tel:+254714633463" className={styles.phoneNumber}>+254 714 633 463</a>
              </div>
            </div>
          </div>

          <button className={styles.ctaButton} onClick={() => navigate('/booking')}>
            BOOK NOW
          </button>
          
          <button onClick={() => setSidebar(true)} className={styles.menuToggle}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      
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
                <div className={styles.logoText}>
                    <span className={styles.brandName}>RARITY</span>
                </div>
                <button className={styles.closeBtn} onClick={() => setSidebar(false)}><X size={32} /></button>
              </div>
              <ul className={styles.sidebarLinks}>
                <li><Link to="/" onClick={() => setSidebar(false)}>Home</Link></li>
                <li><button onClick={() => {navigate('/fleet'); setSidebar(false)}}>View Fleet</button></li>
                <li><button onClick={() => handleNavigation('about-section')}>About Us</button></li>
                <li><button onClick={() => handleNavigation('contact-section')}>Contact Us</button></li>
              </ul>
              <div className={styles.sidebarFooter}>
                <button 
                   className={styles.ctaButtonFull} 
                   onClick={() => {navigate('/booking'); setSidebar(false);}}
                >
                  RESERVE A VEHICLE
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;