import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Shield, Crown } from "lucide-react";
import styles from "../styles/HeroSlider.module.css";

const slides = [
  {
    id: 1,
    title: "The King of \nOff-Road Luxury.",
    carName: "Toyota Prado",
    price: "15,000",
    tagline: "Unmatched Reliability",
    image: "/prado.png", 
    theme: "#c5a059",
    icon: <Shield size={20} />,
  },
  {
    id: 2,
    title: "Executive Class \nRedefined.",
    carName: "Mercedes S-Class",
    price: "45,000",
    tagline: "Ultimate Prestige",
    image: "/mercedes.png",
    theme: "#64748b",
    icon: <Crown size={20} />,
  }
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);


  const handleBookNow = () => {
    const bookingSection = document.getElementById("booking-form");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.heroContainer}>
      <AnimatePresence mode="wait">
        <motion.div 
          key={slides[current].id}
          className={styles.slide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          
          <div className={styles.content}>
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={styles.badge}
              style={{ backgroundColor: `${slides[current].theme}22`, color: slides[current].theme }}
            >
              {slides[current].icon}
              <span>{slides[current].tagline}</span>
            </motion.div>

            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={styles.headline}
            >
              {slides[current].title.split('\n').map((t, i) => <span key={i}>{t}<br/></span>)}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className={styles.priceTicker}
            >
              <span className={styles.from}>Rates starting at</span>
              <div className={styles.priceAmount}>
                <span className={styles.currency}>KES</span>
                <span className={styles.val}>{slides[current].price}</span>
                <span className={styles.perDay}>/Day</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className={styles.btnGroup}
            >
              <button className={styles.primaryBtn} onClick={handleBookNow}>BOOK THIS CAR</button>
              <button className={styles.secondaryBtn}>OUR FULL FLEET</button>
            </motion.div>
          </div>

          
          <div className={styles.vehicleDisplay}>
            <motion.img 
              key={`img-${slides[current].id}`}
              src={slides[current].image}
              initial={{ x: 200, opacity: 0, rotate: 5 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
              className={styles.carImg}
            />
            
            <div className={styles.glow} style={{ background: `radial-gradient(circle, ${slides[current].theme}33 0%, transparent 70%)` }} />
          </div>
        </motion.div>
      </AnimatePresence>

      
      <div className={styles.navDots}>
        {slides.map((_, i) => (
          <div 
            key={i} 
            className={`${styles.dot} ${current === i ? styles.activeDot : ""}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;