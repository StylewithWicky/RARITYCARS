import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, XCircle, TrendingUp, Zap 
} from 'lucide-react';
import styles from '../styles/AboutUs.module.css';

const AboutRarity = () => {
  const inclusions = [
    "Comprehensive Insurance", "A-B-C Service (8000km)", "Tyre Replacement", 
    "Battery Replacement", "Accident Repairs", "Fleet Management Support",
    "Tracking Reports", "Driver Training", "24/7 Road Rescue"
  ];

  const exclusions = [
    "Fuel", "Driver", "Car Wash", "Contaminated Fuel Damage", "Travel outside Kenya"
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div id="about-section" className={styles.rarityAboutPage}>
      
      <section className={styles.aboutHero}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.heroSubLabel}>Kenyan Success Story</span>
          <h1>The Home of <br/><span className={styles.textGold}>Easy Car Leasing.</span></h1>
          <p>
            We offer so much more than just a car. Rarity specializes in 
            <strong> flexible off-balance sheet assets</strong> to help your business excel in East Africa.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={styles.visionMissionBox}
        >
          <div className={styles.visionItem}>
            <h4><TrendingUp size={20} className={styles.textGold}/> VISION</h4>
            <p>To be the leading B2B Car leasing and rental Company in East Africa.</p>
          </div>
          <div className={styles.missionItem}>
            <h4><Zap size={20} className={styles.textGold}/> MISSION</h4>
            <p>Delivering value, convenience, and peace of mind through managed solutions.</p>
          </div>
        </motion.div>
      </section>

      <section className={styles.leaseLogicSection}>
        <motion.div {...fadeInUp} className={styles.sectionHeader}>
          <h2>Why B2B Rental?</h2>
          <p>Understanding the "Wet Lease" advantage that Rarity provides.</p>
        </motion.div>

        <div className={styles.comparisonGrid}>
          <motion.div 
            {...fadeInUp}
            whileHover={{ y: -5 }} 
            className={styles.leaseCard}
          >
            <h3>Dry Lease</h3>
            <p>Standard rental. You get the vehicle, you handle the rest. Best for those who already have an internal fleet management team.</p>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            whileHover={{ y: -5 }} 
            className={`${styles.leaseCard} ${styles.highlight}`}
          >
            <div className={styles.cardHeader}>
                <h3>Wet Lease</h3>
                <span className={styles.recommendedBadge}>RECOMMENDED</span>
            </div>
            <p>The Rarity Way. A fully managed asset including tracking, insurance, and maintenance. Total peace of mind included.</p>
          </motion.div>
        </div>
      </section>

      <section className={styles.valueChainSection}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={styles.valueChainTitle}
        >
            <div className={styles.goldLine}></div>
            <h2>The Rarity Value Chain</h2>
        </motion.div>

        <div className={styles.inclusionGrid}>
          {inclusions.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className={styles.checkItem}
            >
              <CheckCircle2 size={18} className={styles.checkIcon} />
              <span>{item}</span>
            </motion.div>
          ))}
        </div>

        <motion.div 
          {...fadeInUp}
          className={styles.exclusionBox}
        >
          <h4><XCircle size={18} /> WHAT OUR LEASE EXCLUDES</h4>
          <div className={styles.exclusionList}>
            {exclusions.map((item, i) => (
                <span key={i}>• {item}</span>
            ))}
          </div>
        </motion.div>
      </section>

      <section className={styles.ctaSection}>
        <motion.div {...fadeInUp}>
          <h3>Save big with our affordable car rental!</h3>
          <button className={styles.ctaButton}>
            GET STARTED WITHIN 1 HOUR
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutRarity;