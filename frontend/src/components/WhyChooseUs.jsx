import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, EyeOff, Globe } from 'lucide-react';
import styles from '../styles/WhyChooseUs.module.css';

const WhyChooseUs = () => {
  const points = [
    {
      icon: <ShieldCheck size={28} />,
      title: "Unmatched Reliability",
      desc: "Our fleet undergoes rigorous 150-point inspections to ensure your business never stops moving."
    },
    {
      icon: <Zap size={28} />,
      title: "Rapid Deployment",
      desc: "Get approved and behind the wheel in under 60 minutes with our streamlined KYC process."
    },
    {
      icon: <EyeOff size={28} />,
      title: "No Hidden Costs",
      desc: "Transparent, off-balance sheet leasing. What you see is exactly what you pay—zero surprises."
    },
    {
      icon: <Globe size={28} />,
      title: "Regional Reach",
      desc: "The leading B2B leasing partner across East Africa, providing borderless corporate support."
    }
  ];

  return (
    <section className={styles.whySection}>
      <div className={styles.mainContainer}>
        
        {/* Left Side: Editorial Content */}
        <div className={styles.textContent}>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={styles.subTitle}
          >
            The Rarity Standard
          </motion.span>
          <h2 className={styles.mainTitle}>
            Designed for <span className={styles.goldText}>Excellence</span>, <br />
            Built for Scale.
          </h2>
          <p className={styles.description}>
            We don't just provide vehicles; we provide the operational backbone 
            that allows your business to excel without the burden of asset depreciation.
          </p>
          
          <div className={styles.statsRow}>
            <div>
              <h4 className={styles.goldText}>500+</h4>
              <p>Fleet Size</p>
            </div>
            <div className={styles.divider}></div>
            <div>
              <h4 className={styles.goldText}>99%</h4>
              <p>Uptime Rate</p>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Cards */}
        <div className={styles.cardsGrid}>
          {points.map((item, index) => (
            <motion.div 
              key={index}
              className={styles.featureCard}
              whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 1)' }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.iconCircle}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;