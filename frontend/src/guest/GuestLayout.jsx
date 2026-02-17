import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/NavBar'; 
import styles from '../styles/GuestLayout.module.css';
import Footer from '../components/Footer';

const GuestLayout = () => {
  const { pathname } = useLocation();

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={styles.layoutWrapper}>
      <Navbar />

      <main className={styles.mainContent}>
        <Outlet /> 
      </main>

      <Footer/>

      
    </div>
  );
};

export default GuestLayout;

