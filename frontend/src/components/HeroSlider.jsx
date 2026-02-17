import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Shield, Crown, Car, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/HeroSlider.module.css";

const HeroSlider = () => {
  const [liveSlides, setLiveSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
        const res = await fetch(`${baseUrl}/api/vehicles`);
        const data = await res.json();

        
        const formattedSlides = data.slice(0, 5).map((vehicle, index) => ({
          id: vehicle.id,
          title: `${vehicle.brand} \n${vehicle.model}`,
          carName: `${vehicle.brand} ${vehicle.model}`,
          price: Number(vehicle.daily_rate).toLocaleString(),
          tagline: vehicle.category.toUpperCase() + " // ELITE FLEET",
          image: vehicle.image_url,
          slug: vehicle.slug,
          category: vehicle.category,
          // Alternate themes/icons based on index or category
          theme: index % 2 === 0 ? "#00f2ff" : "#c5a059",
          icon: index % 2 === 0 ? <Shield size={20} /> : <Crown size={20} />
        }));

        setLiveSlides(formattedSlides);
      } catch (err) {
        console.error("Slider Connection Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

 
  useEffect(() => {
    if (liveSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === liveSlides.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, [liveSlides]);

  if (loading) return (
    <div className={styles.heroLoader}>
      <Loader2 className="animate-spin" color="#00f2ff" size={40} />
      <p>INITIALIZING VAULT DISPLAY...</p>
    </div>
  );

  if (liveSlides.length === 0) return null;

  const activeSlide = liveSlides[current];

  return (
    <section className={styles.heroContainer}>
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeSlide.id}
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
              style={{ backgroundColor: `${activeSlide.theme}22`, color: activeSlide.theme }}
            >
              {activeSlide.icon}
              <span>{activeSlide.tagline}</span>
            </motion.div>

            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={styles.headline}
            >
              {activeSlide.title.split('\n').map((t, i) => <span key={i}>{t}<br/></span>)}
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
                <span className={styles.val}>{activeSlide.price}</span>
                <span className={styles.perDay}>/Day</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className={styles.btnGroup}
            >
              <button 
                className={styles.primaryBtn} 
                onClick={() => navigate(`/products/${activeSlide.category}/${activeSlide.slug}`)}
              >
                VIEW DETAILS
              </button>
              <button className={styles.secondaryBtn} onClick={() => navigate('/fleet')}>
                OUR FULL FLEET
              </button>
            </motion.div>
          </div>

          <div className={styles.vehicleDisplay}>
            <motion.img 
              key={`img-${activeSlide.id}`}
              src={activeSlide.image}
              initial={{ x: 200, opacity: 0, rotate: 5 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              exit={{ x: -200, opacity: 0 }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
              className={styles.carImg}
              alt={activeSlide.carName}
            />
            <div className={styles.glow} style={{ background: `radial-gradient(circle, ${activeSlide.theme}33 0%, transparent 70%)` }} />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className={styles.navDots}>
        {liveSlides.map((_, i) => (
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