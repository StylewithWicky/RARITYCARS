import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Youtube, Twitter, ShieldCheck } from "lucide-react";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
       
        <div className={styles.section}>
          <h3 className={styles.brandTitle}>Rarity Rent-A-Car</h3>
          <p className={styles.description}>
            Experience the pinnacle of automotive excellence. We provide 
            premium vehicle leasing for those who demand performance, 
            luxury, and reliability in every journey.
          </p>
        </div>

        
        <div className={styles.section}>
          <h4 className={styles.heading}>Company</h4>
          <ul className={styles.links}>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/fleet">The Fleet</Link></li>
            <li><Link to="/location">Location</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        
        <div className={styles.section}>
          <h4 className={styles.heading}>Working Hours</h4>
          <ul className={styles.hoursList}>
            <li><span>Mon - Fri:</span> 09:00AM - 09:00PM</li>
            <li><span>Sat:</span> 09:00AM - 07:00PM</li>
            <li><span>Sun:</span> Closed</li>
          </ul>
        </div>

       
        <div className={styles.section}>
          <h4 className={styles.heading}>Follow Us</h4>
          <ul className={styles.contactList}>
            <li>
              <Phone size={16} className={styles.icon} /> 
              <a href="tel:+254769986861">(254) 769-986-861</a>
            </li>
            <li>
              <Phone size={16} className={styles.icon} /> 
              <a href="tel:+254714633463">(254) 714-633-463</a>
            </li>
            <li>
              <Mail size={16} className={styles.icon} /> 
              <a href="mailto:Cars@raritycars.co.ke">Cars@raritycars.co.ke</a>
            </li>
          </ul>
        </div>
      </div>

      
      
      <div className={styles.bottomBar}>
        <div className={styles.bottomContent}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} <strong>RARITY RENT-A-CAR</strong>. All Rights Reserved.
          </p>
          
          <div className={styles.socials}>
            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={18} /></a>
            <Link to="/login" className={styles.secretLink}>
               <ShieldCheck size={14} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;