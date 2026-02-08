import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, XCircle, ShieldCheck, 
  Settings, Zap, TrendingUp, Users 
} from 'lucide-react';
import '../styles/AboutUs.module.css';

const AboutRarity = () => {
  const inclusions = [
    "Comprehensive Insurance", "A-B-C Service (8000km)", "Tyre Replacement", 
    "Battery Replacement", "Accident Repairs", "Fleet Management Support",
    "Tracking Reports", "Driver Training", "24/7 Road Rescue"
  ];

  const exclusions = [
    "Fuel", "Driver", "Car Wash", "Contaminated Fuel Damage", "Travel outside Kenya"
  ];

  return (
    <div className="rarity-about-page">
      {/* SECTION 1: HERO STORY */}
      <section className="about-hero">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="hero-text-content"
        >
          <span className="text-gold tracking-[5px] uppercase text-xs font-bold">Kenyan Success Story</span>
          <h1>The Home of Easy Car Leasing.</h1>
          <p className="mt-6 text-gray-600 text-lg">
            We offer so much more than just a car. Rarity specializes in 
            <strong> flexible off-balance sheet assets</strong> to help you excel.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="vision-mission-box p-12 bg-navy text-white rounded-3xl"
        >
          <div className="mb-10">
            <h4 className="text-gold flex items-center gap-2 mb-2"><TrendingUp size={20}/> VISION</h4>
            <p className="text-gray-300">To be the leading B2B Car leasing and rental Company in East Africa.</p>
          </div>
          <div>
            <h4 className="text-gold flex items-center gap-2 mb-2"><Zap size={20}/> MISSION</h4>
            <p className="text-gray-300">Delivering value, convenience, and peace of mind through managed solutions.</p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: LEASE LOGIC (WET VS DRY) */}
      <section className="lease-logic-section">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-navy">Why B2B Rental?</h2>
          <p className="text-gray-500 mt-4">Understanding the "Wet Lease" advantage that Rarity provides.</p>
        </div>

        <div className="comparison-grid">
          <motion.div whileHover={{y:-10}} className="lease-card">
            <h4 className="text-xl font-bold mb-4">Dry Lease</h4>
            <p className="text-sm text-gray-500">Standard rental. You get the vehicle, you handle the rest. Best for those who already have a fleet team.</p>
          </motion.div>

          <motion.div whileHover={{y:-10}} className="lease-card highlight">
            <div className="flex justify-between items-start">
                <h4 className="text-xl font-bold mb-4">Wet Lease (The Rarity Way)</h4>
                <span className="bg-gold text-white text-[10px] px-2 py-1 rounded">RECOMMENDED</span>
            </div>
            <p className="text-sm text-gray-700">A managed asset including tracking, insurance, and full service. Peace of mind included.</p>
          </motion.div>
        </div>
      </section>

      
      <section className="bg-white py-20 px-[10%]">
        <div className="flex items-center gap-4 mb-12">
            <div className="h-[2px] w-20 bg-gold"></div>
            <h2 className="text-2xl font-bold uppercase tracking-widest">The Rarity Value Chain</h2>
        </div>

        <div className="inclusion-grid">
          {inclusions.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="check-item"
            >
              <CheckCircle2 size={20} className="check-icon" />
              <span>{item}</span>
            </motion.div>
          ))}
        </div>

        
        <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }}
            className="exclusion-box"
        >
          <h4 className="flex items-center gap-2 text-red-600 font-bold mb-4">
            <XCircle size={20} /> WHAT OUR LEASE EXCLUDES
          </h4>
          <div className="flex flex-wrap gap-6 text-sm text-red-800 font-medium">
            {exclusions.map((item, i) => (
                <span key={i}>• {item}</span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 bg-navy text-white text-center">
        <h3 className="text-3xl font-bold mb-6">Save big with our affordable car rental!</h3>
        <button className="bg-gold text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform">
          GET STARTED WITHIN 1 HOUR
        </button>
      </section>
    </div>
  );
};

export default AboutRarity;