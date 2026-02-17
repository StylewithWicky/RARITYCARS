import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TawkChat = () => {
  const location = useLocation();

  useEffect(() => {
  
    const propertyId = import.meta.env.VITE_TAWK_PROPERTY_ID;
    const widgetId = import.meta.env.VITE_TAWK_WIDGET_ID;

   
    console.log("Tawk.to IDs:", { propertyId, widgetId });

    if (!propertyId || !widgetId) {
      console.error("Tawk.to IDs are missing from .env file!");
      return;
    }

   
    if (!document.getElementById('tawk-script')) {
      const s1 = document.createElement("script");
      const s0 = document.getElementsByTagName("script")[0];
      s1.id = 'tawk-script';
      s1.async = true;
    
      s1.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    }

 
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_API.onLoad = function() {
      if (window.location.pathname.startsWith('/mkuru')) {
        window.Tawk_API.hideWidget();
      }
    };
  }, []);


  useEffect(() => {
    if (window.Tawk_API && typeof window.Tawk_API.hideWidget === 'function') {
      if (location.pathname.startsWith('/mkuru')) {
        window.Tawk_API.hideWidget();
      } else {
        window.Tawk_API.showWidget();
      }
    }
  }, [location]);

  return null;
};

export default TawkChat;