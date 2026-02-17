import { useEffect } from 'react';

const TawkChat = () => {
    useEffect(() => {
       
        const propertyId = import.meta.env.VITE_TAWK_PROPERTY_ID;
        const widgetId = import.meta.env.VITE_TAWK_WIDGET_ID;

        if (!propertyId || !widgetId) {
            console.warn("Tawk.to IDs missing. Check your .env file.");
            return;
        }

        var s1 = document.createElement("script"),
            s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);

        
        return () => {
            const allScripts = document.getElementsByTagName("script");
            for (let s of allScripts) {
                if (s.src.includes("tawk.to")) {
                    s.parentNode.removeChild(s);
                }
            }
        };
    }, []);

    return null;
};

export default TawkChat;