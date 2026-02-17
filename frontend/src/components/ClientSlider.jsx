import React from 'react';
import styles from '../styles/ClientSlider.module.css';

const ClientSlider = () => {
  const logos = [
    { id: 1, name: 'Partner 1', url: 'https://www.stunnergroup.com/wp-content/uploads/2019/08/kengen.jpg' },
    { id: 2, name: 'Partner 2', url: 'https://upload.wikimedia.org/wikipedia/commons/7/72/DeloitteNewLogo.jpg' },
    { id: 3, name: 'Partner 3', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4WIdXwPt9wd6mRLTFmJiCAeb3LdtixhbzvQ&s' },
    { id: 4, name: 'Partner 4', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvAyloIpgXjoc1HELl-YblMCXHIIoMMX7uYQ&s' },
    { id: 5, name: 'Partner 5', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf3uhOOtbBFL15vDKf4EFxXKnajCaWfaWYyg&s' },
    { id: 6, name: 'Partner 6', url: 'https://logos-world.net/wp-content/uploads/2020/08/DHL-Emblem.png' },
    { id: 7, name: 'Partner 7', url: 'https://i0.wp.com/www.tenderyetu.com/wp-content/uploads/2023/01/United-States-International-University-tender.png?fit=700%2C398&ssl=1' },
    { id: 8, name: 'Partner 8' ,url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxu4zzUjU52OUk-XiilzohjZZfMoNTfP8DEQ&s' },
    { id: 9, name: 'Partner 9' ,url: 'https://au.int/sites/default/files/pages/31823-img-au_logo.jpg' },
    { id: 10, name: 'Partner 10' ,url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Le6Py0VlfOVc-XZDOtq7aOA0ev7IGzOhug&s' },
    { id: 11, name: 'Partner 11' ,url: 'https://www.iisd.org/sites/default/files/2021-05/gizlogo-unternehmen-de-rgb-300.jpg' },
    { id: 12, name: 'Partner 12' ,url: 'https://globaldevincubator.org/wp-content/uploads/2023/11/Official-GDI-Logo.png' },
    { id: 13, name: 'Partner 13' ,url: 'https://pbs.twimg.com/profile_images/1075310339707846656/j-AXIX3S_400x400.jpg' },
    { id: 14, name: 'Partner 14' ,url: 'https://ar20.efghldg.com/images/newlogo.png' },
    {id :15, name: 'Partner 15',url:'https://upload.wikimedia.org/wikipedia/commons/f/f3/Bollore_Logistics_Logo.png'}
  ];

  const displayLogos = [...logos, ...logos, ...logos];

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <span className={styles.label}>Trusted by Industry Leaders</span>
        
        <div className={styles.marquee}>
          <div className={styles.track}>
            {displayLogos.map((logo, index) => (
              <div key={index} className={styles.logoBox}>
                <img 
                  src={logo.url} 
                  alt={logo.name} 
                  className={styles.logo} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientSlider;