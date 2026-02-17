import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Send, Clock, Globe, Loader2, CheckCircle } from "lucide-react";
import styles from "../styles/ContactUs.module.css";

const ContactUs = () => {

  const [formState, setFormState] = useState({ 
    name: "", 
    email: "", 
    type: "Fleet Rental", 
    message: "" 
  });

  const [status, setStatus] = useState("idle");

  const locations = [
    { name: "Headquarters", phone: ["+254 769 986 861", "+254 714 633 463"], email: "info@raritycars.com", city: "Nairobi, Kenya" },
    { name: "JKIA Airport", phone: ["+254 769 986 861"], email: "jkia@raritycars.com", city: "Nairobi, Kenya" },
    { name: "Mombasa Airport", phone: ["+254 769 986 861"], email: "mombasa@raritycars.com", city: "Mombasa, Kenya" }
  ];

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/mkuru/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", type: "Fleet Rental", message: "" });
        
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    }
  };

  return (
    <section id="contact-section" className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={styles.subtitle}>
            Concierge Services
          </motion.span>
          <h2 className={styles.mainTitle}>Need Additional <span>Information?</span></h2>
          <p className={styles.subText}>Our luxury fleet and expert team are at your service across Kenya.</p>
        </div>

        <div className={styles.mainGrid}>
          <div className={styles.locationGrid}>
            {locations.map((loc, index) => (
              <motion.div 
                key={index}
                className={styles.infoCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3>{loc.name}</h3>
                <div className={styles.cardDetail}>
                  <Phone size={16} className={styles.iconGold} />
                  <div className={styles.numbers}>
                    {loc.phone.map((p, i) => <a key={i} href={`tel:${p.replace(/\s/g, '')}`}>{p}</a>)}
                  </div>
                </div>
                <div className={styles.cardDetail}>
                  <Mail size={16} className={styles.iconGold} />
                  <a href={`mailto:${loc.email}`}>{loc.email}</a>
                </div>
                <div className={styles.cardDetail}>
                  <MapPin size={16} className={styles.iconGold} />
                  <span>{loc.city}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className={styles.formWrapper}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            
            <AnimatePresence>
              {status === "success" && (
                <motion.div 
                  className={styles.successOverlay}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                  <CheckCircle size={48} className="text-emerald-500 mb-4" />
                  <h3>Message Received</h3>
                  <p>A concierge will contact you shortly.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form className={styles.luxuryForm} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  placeholder="e.g. John Doe" 
                  required 
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  placeholder="john@example.com" 
                  required 
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Inquiry Type</label>
                <select 
                  value={formState.type}
                  onChange={(e) => setFormState({...formState, type: e.target.value})}
                >
                  <option>Fleet Rental</option>
                  <option>Airport Transfer</option>
                  <option>Long-term Leasing</option>
                  <option>Safari Inquiry</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Message</label>
                <textarea 
                  rows="4" 
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  placeholder="How can we assist you today?"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className={styles.submitBtn} 
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>Processing... <Loader2 size={18} className="animate-spin" /></>
                ) : (
                  <>Request Consultation <Send size={18} /></>
                )}
              </button>

              {status === "error" && (
                <p className="text-red-500 text-xs mt-2 text-center">
                  Connection error. Please try again later.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;