import React from 'react';
import { MapPin, Phone, Clock, Navigation, ShieldCheck } from 'lucide-react';
import styles from '@/styles/LocationSection.module.css';

const LocationSection = () => {
  
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.255567346857!2d36.7997534!3d-1.2613586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1741ef313f5d%3A0x6d36e053a479b183!2sWestlands%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1700000000000";

  const handleDirections = () => {
    const address = "Westlands, Nairobi, Kenya"; 
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <section id="location-section" className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.infoSide}>
          <h2 className={styles.heading}>The Rarity Showroom</h2>
          <p className={styles.subheading}>
            Visit our private collection and experience automotive excellence firsthand.
          </p>

          <div className={styles.detailsList}>
            <div className={styles.detailItem}>
              <MapPin className={styles.icon} />
              <div>
                <h4>Showroom Address</h4>
                <p>Elite Plaza, Westlands. Nairobi, Kenya</p>
              </div>
            </div>

            <div className={styles.detailItem}>
              <Phone className={styles.icon} />
              <div>
                <h4>Concierge Line</h4>
                <p>+254 769 986 861</p>
              </div>
            </div>

            <div className={styles.detailItem}>
              <Clock className={styles.icon} />
              <div>
                <h4>Opening Hours</h4>
                <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                <p className={styles.smallNote}>Sundays by Appointment Only</p>
              </div>
            </div>

            <div className={styles.detailItem}>
              <ShieldCheck className={styles.icon} />
              <div>
                <h4>Secure Viewings</h4>
                <p>Fully guarded facility with private viewing bays.</p>
              </div>
            </div>
          </div>

          <button onClick={handleDirections} className={styles.directionBtn}>
            <Navigation size={18} /> Get Navigation
          </button>
        </div>

        <div className={styles.mapSide}>
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Rarity Showroom Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;