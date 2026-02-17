import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/HeroSlider';
import BookingBar from '../components/BookingForm';
import FleetSection from '../components/Fleet';
import ClientSlider from '../components/ClientSlider';
import WhyChooseUs from '../components/WhyChooseUs';
import AboutRarity from '../components/AboutUs';
import ContactUs from '../components/ContactUs';

const Home = ({ vehicleType, setVehicleType }) => {
  const fleetRef = useRef(null);
  const location = useLocation();
  
  // NEW: State to hold the user's selected search dates
  const [searchCriteria, setSearchCriteria] = useState(null);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const handleSearch = (searchData) => {
    // 1. Update the search criteria (passed to FleetSection)
    setSearchCriteria(searchData);
    
    // 2. Log for debugging
    console.log("Searching fleet for:", searchData);
    
    // 3. Smooth scroll to fleet
    fleetRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  const sectionStyle = {
    scrollMarginTop: '100px',
    paddingTop: '40px',
    paddingBottom: '40px'
  };

  return (
    <div className="home-container">
      <Hero />
      
      <BookingBar 
        vehicleType={vehicleType} 
        setVehicleType={setVehicleType} 
        onSearch={handleSearch} 
      />
      
      {/* Fleet Section Wrapper - Now receiving searchCriteria */}
      <div ref={fleetRef} style={{ scrollMarginTop: '120px' }}>
        <FleetSection 
          activeFilter={vehicleType} 
          searchCriteria={searchCriteria} 
        />
      </div>

      <section id="about-section" style={sectionStyle}>
        <AboutRarity />
      </section>

      <WhyChooseUs />
      <ClientSlider />

      <section 
        id="contact-section" 
        style={{ 
          ...sectionStyle, 
          minHeight: '600px', 
          paddingBottom: '100px' 
        }}
      >
        <ContactUs />
      </section>
    </div>
  );
};

export default Home;